#!/usr/bin/env python3
"""shoot.py — screenshot the site so Claude can actually look at what it built.

Full-page at desktop/tablet/mobile, plus per-section crops at desktop (a 12000px
full-page shot flattens everything; section crops are where design problems show).

    python scripts/shoot.py --url http://localhost:3000 --out .shots/pass1
    python scripts/shoot.py --url https://x.vercel.app --out .shots/live --paths / /services /about

Then READ the PNGs. That is the point of the script.

One-time setup:
    pip install playwright
    python -m playwright install chromium
"""

import argparse
import json
import pathlib
import re
import sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("\n" + "=" * 62)
    print("FAIL: playwright is not installed, so the screenshot gate cannot run.")
    print("This gate is MANDATORY. Do not continue and do not claim the site")
    print("looks good — you have not seen it.")
    print("=" * 62)
    print("\n    pip install playwright")
    print("    python -m playwright install chromium\n")
    sys.exit(2)

VIEWPORTS = [("desktop", 1440, 900), ("tablet", 768, 1024), ("mobile", 375, 812)]
SECTION_SEL = (
    "main > section, main > div > section, "
    "body > main > *, main > div[class*='section']"
)


def slug(path):
    s = re.sub(r"[^a-z0-9]+", "-", path.strip("/").lower()) or "home"
    return s[:60]


def crop_sections(page, out, name, limit=16):
    page.set_viewport_size({"width": 1440, "height": 900})
    page.wait_for_timeout(400)
    made = []
    for i, h in enumerate(page.query_selector_all(SECTION_SEL)[:limit]):
        try:
            box = h.bounding_box()
            if not box or box["height"] < 120 or box["width"] < 400:
                continue
            h.scroll_into_view_if_needed()
            page.wait_for_timeout(300)
            p = out / f"{name}--section-{i:02d}.png"
            h.screenshot(path=str(p))
            made.append(str(p))
        except Exception:
            continue
    return made


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--out", default=".shots/pass1")
    ap.add_argument("--paths", nargs="*", default=["/"])
    ap.add_argument("--no-sections", action="store_true")
    a = ap.parse_args()

    out = pathlib.Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    report = {"url": a.url, "shots": [], "issues": [], "failed": []}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(device_scale_factor=2)
        page = ctx.new_page()
        page.on("console", lambda m: report["issues"].append({"type": m.type, "text": m.text})
                if m.type == "error" else None)
        page.on("pageerror", lambda e: report["issues"].append({"type": "pageerror", "text": str(e)}))
        page.on("requestfailed", lambda r: report["failed"].append({"url": r.url}))

        for path in a.paths:
            url = a.url.rstrip("/") + path
            name = slug(path)
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                report["failed"].append({"url": url, "reason": f"navigation: {e}"})
                continue
            try:
                page.wait_for_function("() => document.fonts.status === 'loaded'", timeout=6000)
            except Exception:
                report["issues"].append({"type": "fonts", "text": f"fonts not settled on {path}"})
            page.wait_for_timeout(700)

            for label, w, h in VIEWPORTS:
                page.set_viewport_size({"width": w, "height": h})
                page.wait_for_timeout(500)
                shot = out / f"{name}--{label}.png"
                page.screenshot(path=str(shot), full_page=True)
                report["shots"].append(str(shot))
                if page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth + 1"):
                    report["issues"].append(
                        {"type": "layout", "text": f"HORIZONTAL OVERFLOW at {label} ({w}px) on {path}"})

            if not a.no_sections:
                report["shots"] += crop_sections(page, out, name)

        browser.close()

    (out / "report.json").write_text(json.dumps(report, indent=2))
    print(f"\n{len(report['shots'])} screenshots -> {out}")
    for c in report["issues"][:25]:
        print(f"  [{c['type']}] {c['text'][:160]}")
    for f in report["failed"][:15]:
        print(f"  FAILED {f['url'][:120]}")

    print("\n" + "=" * 62)
    print("NOW READ THE SCREENSHOTS with the Read tool. Every section crop.")
    print("Grade against references/rules.md. Triage Blocker / High / Medium.")
    print("Fix, then re-shoot into pass2. Two passes minimum.")
    print("=" * 62 + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
