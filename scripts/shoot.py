#!/usr/bin/env python3
"""Screenshot a site so Claude can actually look at what it built.

Captures full-page at desktop / tablet / mobile, plus per-section crops at desktop
(section-level crops are what make design problems visible — a 12000px full-page
screenshot flattens everything), plus console errors.

Usage:
    python shoot.py --url http://localhost:3000 --out .shots/pass1
    python shoot.py --url https://client.vercel.app --out .shots/live --paths / /services /about

Requires: pip install playwright && playwright install chromium
(In the Cowork cloud container, chromium is preinstalled at PLAYWRIGHT_BROWSERS_PATH —
do NOT run `playwright install`.)
"""

import argparse
import json
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

VIEWPORTS = [("desktop", 1440, 900), ("tablet", 768, 1024), ("mobile", 375, 812)]


def slug(path: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", path.strip("/").lower()) or "home"
    return s[:60]


def capture(page, out: pathlib.Path, name: str, label: str, w: int, h: int):
    page.set_viewport_size({"width": w, "height": h})
    page.wait_for_timeout(700)  # let fade-ins settle before judging
    shot = out / f"{name}--{label}.png"
    page.screenshot(path=str(shot), full_page=True)
    return shot


def crop_sections(page, out: pathlib.Path, name: str, limit: int = 14):
    """Crop each top-level section at desktop width. This is where design problems show."""
    page.set_viewport_size({"width": 1440, "height": 900})
    page.wait_for_timeout(500)
    handles = page.query_selector_all(
        "body > *:not(script):not(style), main > section, main > div[class*='section']"
    )
    made = []
    for i, h in enumerate(handles[:limit]):
        try:
            box = h.bounding_box()
            if not box or box["height"] < 120 or box["width"] < 400:
                continue
            h.scroll_into_view_if_needed()
            page.wait_for_timeout(350)
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
    args = ap.parse_args()

    out = pathlib.Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    report = {"url": args.url, "shots": [], "console": [], "failed": []}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(device_scale_factor=2)
        page = ctx.new_page()

        page.on("console", lambda m: report["console"].append(
            {"type": m.type, "text": m.text}) if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: report["console"].append(
            {"type": "pageerror", "text": str(e)}))
        page.on("requestfailed", lambda r: report["failed"].append(
            {"url": r.url, "reason": r.failure}))

        for path in args.paths:
            url = args.url.rstrip("/") + path
            name = slug(path)
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                report["failed"].append({"url": url, "reason": f"navigation: {e}"})
                continue
            page.wait_for_timeout(900)

            for label, w, h in VIEWPORTS:
                report["shots"].append(str(capture(page, out, name, label, w, h)))

            # horizontal-overflow check at every viewport
            for label, w, h in VIEWPORTS:
                page.set_viewport_size({"width": w, "height": h})
                page.wait_for_timeout(250)
                overflow = page.evaluate(
                    "() => document.documentElement.scrollWidth > window.innerWidth + 1")
                if overflow:
                    report["console"].append(
                        {"type": "layout", "text": f"HORIZONTAL OVERFLOW at {label} ({w}px) on {path}"})

            if not args.no_sections:
                report["shots"] += crop_sections(page, out, name)

        browser.close()

    (out / "report.json").write_text(json.dumps(report, indent=2))
    print(f"\n{len(report['shots'])} screenshots -> {out}")
    if report["console"]:
        print(f"\n{len(report['console'])} console/layout issues:")
        for c in report["console"][:25]:
            print(f"  [{c['type']}] {c['text'][:160]}")
    if report["failed"]:
        print(f"\n{len(report['failed'])} failed requests:")
        for f in report["failed"][:15]:
            print(f"  {f['url'][:120]}")
    print("\nNOW READ THE SCREENSHOTS. Grade against references/slop-checklist.md.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
