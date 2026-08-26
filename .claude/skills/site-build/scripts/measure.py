#!/usr/bin/env python3
"""measure.py — measure the RENDERED page, not the source.

The static checker (check.mjs) reads code. This reads pixels. It exists because
three of the things Kaiden complains about are invisible in source:

  * "robotic font"      -> the intended face never loaded and fell back to the
                           system stack. Detected via document.fonts.check().
  * "undesigned section"-> a section with no image, no ground shift, and nothing
                           but prose. Measured per section.
  * "too much blank"    -> real container width and real section padding.

Usage:
    python scripts/measure.py --url http://localhost:3000
    python scripts/measure.py --url https://x.vercel.app --paths / /services /about
    python scripts/measure.py --url http://localhost:3000 --json out.json

Exit code 1 if any BLOCKER-level finding is present.

Requires (one time):
    pip install playwright
    python -m playwright install chromium
"""

import argparse
import json
import math
import sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("\nFAIL: playwright is not installed. This gate is mandatory.\n")
    print("    pip install playwright")
    print("    python -m playwright install chromium\n")
    sys.exit(2)

# ----- measured profile targets (references/measured-profile.md) -------------
TARGET_CONTAINER = 1536      # max-w-page
CONTAINER_TOL = 64
SECTION_PY_MIN, SECTION_PY_MAX = 32, 72   # py-8 .. py-18 rendered
MIN_DE_ADJACENT = 10.0       # adjacent section grounds must differ
MIN_WORDS_PAGE = 800
MAX_SECTION_WORD_SHARE = 0.35   # A3: no section hogs the copy
IDEAL_LINE_CH = (45, 95)

JS_MEASURE = r"""
() => {
  const px = v => parseFloat(v) || 0;

  const srgb = c => { c /= 255; return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  function lab(rgb) {
    const [r,g,b] = rgb.map(srgb);
    let X = r*0.4124+g*0.3576+b*0.1805, Y = r*0.2126+g*0.7152+b*0.0722, Z = r*0.0193+g*0.1192+b*0.9505;
    X/=0.95047; Z/=1.08883;
    const f = t => t > 0.008856 ? Math.cbrt(t) : (7.787*t + 16/116);
    const fx=f(X), fy=f(Y), fz=f(Z);
    return [116*fy-16, 500*(fx-fy), 200*(fy-fz)];
  }
  function parseRGB(s) {
    const m = String(s).match(/(\d+(?:\.\d+)?)/g);
    if (!m) return null;
    if (m.length >= 4 && parseFloat(m[3]) === 0) return null;  // transparent
    return [ +m[0], +m[1], +m[2] ];
  }
  // walk up for an effective (non-transparent) background
  function effBg(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parseRGB(getComputedStyle(n).backgroundColor);
      if (c) return c;
      n = n.parentElement;
    }
    return [255,255,255];
  }

  // ---- fonts: is the intended face actually loaded? ----
  function fontInfo(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const stack = cs.fontFamily;
    const first = stack.split(',')[0].replace(/["']/g, '').trim();
    let loaded = null;
    try { loaded = document.fonts.check(`${cs.fontWeight} 16px "${first}"`); } catch (e) { loaded = null; }
    const generic = /^(system-ui|-apple-system|BlinkMacSystemFont|Segoe UI|sans-serif|serif|Arial|Helvetica|Roboto)$/i.test(first);
    return { selector: sel, stack, first, loaded, generic, weight: cs.fontWeight, size: cs.fontSize };
  }

  // ---- container width ----
  let container = null;
  const cands = document.querySelectorAll('main > *, .max-w-page, [class*="max-w-page"], [class*="container"]');
  for (const c of cands) {
    const w = c.getBoundingClientRect().width;
    if (w > 600 && (container === null || w > container)) container = Math.round(w);
  }

  // ---- sections ----
  const nodes = Array.from(document.querySelectorAll('main > section, main > div > section, body > main > *, main > div[class*="section"]'))
    .filter(n => n.getBoundingClientRect().height > 100);
  const seen = new Set();
  const sections = [];
  for (const n of nodes) {
    if (seen.has(n)) continue; seen.add(n);
    const r = n.getBoundingClientRect();
    const cs = getComputedStyle(n);
    const text = (n.innerText || '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const imgs = n.querySelectorAll('img, picture, video').length;
    const svgs = Array.from(n.querySelectorAll('svg')).filter(s => {
      const b = s.getBoundingClientRect(); return b.width >= 48 && b.height >= 48;
    }).length;
    const bgImage = cs.backgroundImage && cs.backgroundImage !== 'none';
    const cards = n.querySelectorAll('[class*="rounded"]').length;
    const table = n.querySelectorAll('table').length;
    sections.push({
      tag: n.tagName.toLowerCase(),
      cls: (n.className || '').toString().slice(0, 120),
      height: Math.round(r.height),
      padTop: Math.round(px(cs.paddingTop)),
      padBottom: Math.round(px(cs.paddingBottom)),
      bg: effBg(n),
      lab: lab(effBg(n)),
      words, imgs, svgs, bgImage, cards, table,
      radius: cs.borderRadius,
    });
  }

  // ---- line length on body copy ----
  const paras = Array.from(document.querySelectorAll('p')).filter(p => (p.innerText||'').trim().length > 80);
  const lineChars = paras.slice(0, 24).map(p => {
    const r = p.getBoundingClientRect();
    const fs = px(getComputedStyle(p).fontSize) || 16;
    return Math.round(r.width / (fs * 0.5));   // ~0.5em average glyph advance
  });

  return {
    title: document.title,
    container,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    fonts: [fontInfo('h1'), fontInfo('h2'), fontInfo('p'), fontInfo('body')].filter(Boolean),
    sections,
    totalWords: (document.querySelector('main')?.innerText || document.body.innerText || '').trim().split(/\s+/).length,
    lineChars,
    h1Count: document.querySelectorAll('h1').length,
    h1Text: (document.querySelector('h1')?.innerText || '').trim(),
  };
}
"""


def de(l1, l2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(l1, l2)))


def analyse(path, m, out):
    def blk(rule, msg):
        out.append(("BLOCKER", path, rule, msg))

    def warn(rule, msg):
        out.append(("WARN", path, rule, msg))

    # ---- fonts (the "robotic font" bug) ----
    for f in m["fonts"]:
        if f["generic"]:
            blk("K1 font", f'{f["selector"]}: first family is "{f["first"]}" — a system fallback, '
                          f'not a real face. Stack: {f["stack"][:80]}')
        elif f["loaded"] is False:
            blk("K1 font", f'{f["selector"]}: "{f["first"]}" is declared but NOT LOADED — '
                          f'the browser is rendering a fallback. This is what "robotic font" means.')

    # ---- container ----
    c = m.get("container")
    if c is None:
        warn("F1 container", "could not measure a page container")
    elif c < TARGET_CONTAINER - CONTAINER_TOL:
        blk("F1 container", f"container renders {c}px, target {TARGET_CONTAINER}px "
                            f"(this is the 'too much blank space on the sides' complaint)")

    # ---- overflow ----
    if m["scrollWidth"] > m["innerWidth"] + 1:
        blk("layout", f'horizontal overflow: scrollWidth {m["scrollWidth"]} > viewport {m["innerWidth"]}')

    # ---- h1 ----
    if m["h1Count"] != 1:
        warn("seo", f'{m["h1Count"]} h1 elements (want exactly 1)')
    if m["h1Text"].isupper() and len(m["h1Text"]) > 3:
        blk("B5 h1-case", f'h1 is ALL CAPS: "{m["h1Text"][:60]}"')

    # ---- word floor ----
    if m["totalWords"] < MIN_WORDS_PAGE:
        warn("A3 words", f'{m["totalWords"]} words in main, floor is {MIN_WORDS_PAGE} '
                         f'(add SECTIONS, do not fatten one)')

    secs = m["sections"]
    if not secs:
        warn("sections", "no sections detected — selector may need tuning for this repo")
        return

    # ---- A3: no section hogs the copy ----
    tw = sum(s["words"] for s in secs) or 1
    for i, s in enumerate(secs):
        share = s["words"] / tw
        if share > MAX_SECTION_WORD_SHARE and s["words"] > 150:
            blk("A3 word-hog", f'section {i} holds {share:.0%} of page copy ({s["words"]} words) — '
                               f'split it into more sections')

    # ---- F3: undesigned sections ----
    for i, s in enumerate(secs):
        has_media = s["imgs"] > 0 or s["bgImage"] or s["svgs"] > 0
        prev_lab = secs[i - 1]["lab"] if i > 0 else None
        ground_shift = prev_lab is not None and de(s["lab"], prev_lab) >= MIN_DE_ADJACENT
        has_form = s["cards"] >= 3 or s["table"] > 0
        score = sum([has_media, ground_shift, has_form])
        if score < 2 and s["words"] > 40:
            blk("F3 undesigned", f'section {i} ({s["words"]}w, {s["imgs"]} img, {s["cards"]} cards): '
                                 f'media={has_media} groundShift={ground_shift} contentForm={has_form} '
                                 f'— needs at least 2 of 3')

    # ---- F4: adjacent grounds ----
    for i in range(1, len(secs)):
        d = de(secs[i]["lab"], secs[i - 1]["lab"])
        if d < MIN_DE_ADJACENT:
            warn("F4 ground", f'sections {i-1}/{i} grounds differ by dE {d:.1f} '
                              f'(want >= {MIN_DE_ADJACENT}) — reads as one flat field')

    # ---- A2: first 3-4 sections image-led ----
    for i, s in enumerate(secs[1:5], start=1):
        if s["imgs"] == 0 and not s["bgImage"] and s["words"] > 120:
            blk("A2 image-led", f'section {i} is in the first 4 slots, has no image, and carries '
                                f'{s["words"]} words — the first 3-4 must be image-led')

    # ---- padding ----
    for i, s in enumerate(secs):
        for edge in ("padTop", "padBottom"):
            v = s[edge]
            if v > SECTION_PY_MAX:
                warn("profile padding", f'section {i} {edge}={v}px, profile is {SECTION_PY_MIN}-{SECTION_PY_MAX}px')

    # ---- line length ----
    long_lines = [n for n in m["lineChars"] if n > IDEAL_LINE_CH[1]]
    if long_lines:
        warn("measure", f'{len(long_lines)} paragraphs exceed {IDEAL_LINE_CH[1]} chars/line '
                        f'(max {max(long_lines)}) — constrain the measure')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--paths", nargs="*", default=["/"])
    ap.add_argument("--json", default=None)
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--warn-only", action="store_true")
    a = ap.parse_args()

    results, out = {}, []
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_context(viewport={"width": a.width, "height": 900},
                             device_scale_factor=1).new_page()
        for path in a.paths:
            url = a.url.rstrip("/") + path
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                out.append(("BLOCKER", path, "nav", f"could not load {url}: {e}"))
                continue
            try:
                page.wait_for_function("() => document.fonts.status === 'loaded'", timeout=6000)
            except Exception:
                pass
            page.wait_for_timeout(600)
            m = page.evaluate(JS_MEASURE)
            results[path] = m
            analyse(path, m, out)
        b.close()

    if a.json:
        with open(a.json, "w", encoding="utf-8") as fh:
            json.dump(results, fh, indent=2)

    blockers = [x for x in out if x[0] == "BLOCKER"]
    warns = [x for x in out if x[0] == "WARN"]
    for level in ("BLOCKER", "WARN"):
        rows = [x for x in out if x[0] == level]
        if not rows:
            continue
        print(f"\n---- {level} ({len(rows)}) ----")
        for _, path, rule, msg in rows:
            print(f"  [{path}] {rule}: {msg}")

    for path, m in results.items():
        s = m["sections"]
        print(f"\n{path}: container={m['container']}px  sections={len(s)}  "
              f"words={m['totalWords']}  images={sum(x['imgs'] for x in s)}")

    print(f"\n{'=' * 60}\n{len(blockers)} blockers, {len(warns)} warnings")
    print("\nNOW LOOK AT THE SCREENSHOTS TOO. Numbers do not catch ugly.\n")
    if blockers and not a.warn_only:
        sys.exit(1)


if __name__ == "__main__":
    main()
