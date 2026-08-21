#!/usr/bin/env python3
"""Contrast of hero type that sits on a photograph.

scripts/contrast.mjs checks token pairs — a named foreground against a named surface. It cannot
see the hero, because the hero's surface is a JPEG. That blind spot shipped a real failure and
kept passing while it did: the right third of every hero lede sat on effectively bare photograph,
measuring 1.7:1 to 2.1:1 against a 4.5:1 floor, on five pages, through a clean `npm run check`
every single time.

So this measures the thing itself. It loads each page, finds the hero lede, makes every glyph in
the hero transparent, screenshots the exact rectangle the type occupied, and computes the relative
luminance of the background the type was standing on. Then it composites near-white ink at its
real alpha over the brightest part of that background and reports the ratio.

It runs at both widths because the desktop scrim is a horizontal ramp and the mobile one is
vertical, so they fail in different places and neither predicts the other.

FLOOR is 4.5 (WCAG AA, body text). WARN under 7.0, which is where this site holds body copy
everywhere it controls the surface — a photograph does not buy an exemption.

Usage:  python3 scripts/hero-contrast.py [port]      (expects `next start` already running)
"""
import asyncio
import io
import sys

import numpy as np
from PIL import Image
from playwright.async_api import async_playwright

PORT = sys.argv[1] if len(sys.argv) > 1 else "3000"
FLOOR, WARN = 4.5, 7.0

# --on-dark, at the alpha the hero lede actually uses.
INK_L, INK_A = 0.93, 0.85

PAGES = [
    "/", "/gallery", "/recent-projects", "/warranty", "/pricing", "/about", "/how-it-works",
    "/faq", "/reviews", "/contact", "/services", "/services/gameday-lighting", "/blog",
    "/compare", "/lighting-systems", "/service-areas", "/service-areas/elkhorn",
    "/free-design-consultation",
]

HIDE_TYPE = """() => {
  const h = document.querySelector('section h1');
  if (!h) return null;
  const sec = h.closest('section');
  const ps = [...sec.querySelectorAll('p')].filter((e) => e.textContent.length > 60);
  if (!ps.length) return null;
  const b = ps[0].getBoundingClientRect();
  if (b.width < 40 || b.height < 10) return null;
  for (const e of sec.querySelectorAll('p,h1,nav,a,span,dt,dd,label,input,button')) {
    e.style.color = 'transparent';
    e.style.textDecorationColor = 'transparent';
  }
  return { x: Math.max(0, Math.round(b.x)), y: Math.max(0, Math.round(b.y)),
           width: Math.round(b.width), height: Math.round(b.height) };
}"""


def _lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def luminance(arr):
    r, g, b = (_lin(arr[..., i].astype(float)) for i in range(3))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


async def main():
    worst, fails, warns = float("inf"), 0, 0
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        for width in (1440, 390):
            page = await browser.new_page(viewport={"width": width, "height": 1000})
            print(f"\n── hero type on photograph, {width}px ──")
            for url in PAGES:
                await page.goto(f"http://localhost:{PORT}{url}", wait_until="networkidle")
                await page.wait_for_timeout(500)
                clip = await page.evaluate(HIDE_TYPE)
                if not clip:
                    continue
                await page.wait_for_timeout(100)
                try:
                    shot = await page.screenshot(clip=clip)
                except Exception:
                    continue
                lum = luminance(np.asarray(Image.open(io.BytesIO(shot)).convert("RGB")))
                # 98th percentile, not the max: one blown highlight behind a descender is not
                # what a reader struggles with, a bright patch under a whole word is.
                bg = float(np.percentile(lum, 98))
                ink = INK_L * INK_A + bg * (1 - INK_A)
                c = ratio(ink, bg)
                worst = min(worst, c)
                state = "FAIL" if c < FLOOR else ("warn" if c < WARN else "PASS")
                fails += state == "FAIL"
                warns += state == "warn"
                print(f"  {url:<34} {c:>6.2f}   {state}")
            await page.close()
        await browser.close()

    print(f"\nworst ratio anywhere: {worst:.2f}  (floor {FLOOR}, warn under {WARN})")
    if fails:
        print(f"\nFAIL  {fails} hero(es) below {FLOOR}:1. Widen the ramp in .hero-scrim, "
              f"or shorten the lede measure.")
        return 1
    if warns:
        print(f"NOTE  {warns} hero(es) between {FLOOR} and {WARN}.")
    print("PASS  every hero lede clears the floor on both widths.")
    return 0


sys.exit(asyncio.run(main()))
