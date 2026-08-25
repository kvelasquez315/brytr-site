#!/usr/bin/env node
/* WHICH PHOTOGRAPH CARRIES THE HERO, AND HOW HARD THE SCRIM OVER IT HAS TO BE.
 * Both decided by measurement rather than by adjective.
 *
 * The brief was "can we pick a different image for the hero that makes it look a bit lighter -
 * the site in general just looks dark, which is very weird for a lighting company". Every
 * candidate in content/images.ts is described in prose - "at dusk", "at blue hour", "under a
 * moon" - which ranks them not at all: blue hour on a clear evening and blue hour into an
 * overcast sky are three stops apart and read identically in a caption.
 *
 * WHAT THIS MEASURES
 *
 *   mean       relative luminance of the whole frame, 0-1. How light the photograph is.
 *   typeband   the same over the left 46% only - the strip the H1 and the paragraph stand on.
 *   scrimmed   what that strip becomes once the hero scrim is composited over it, as a mean
 *              and as a 95th percentile. The p95 is the one that matters: a lit window or a
 *              bright patch of sky inside the type band is where contrast actually fails, and
 *              an average hides it. scripts/hero-contrast.py takes the brightest region for the
 *              same reason.
 *   ratio      WCAG contrast of --on-dark against that background, at mean and at p95.
 *
 * WHY THE COMPOSITE IS COMPUTED RATHER THAN SCREENSHOTTED. hero-contrast.py measures the real
 * thing in a real browser and remains the authority, but it needs python, numpy, PIL and
 * playwright and this machine has no python at all. The scrim is a known alpha ramp over a known
 * colour, so the composite is arithmetic - over = photo*(1-a) + primary*a, per pixel, in linear
 * light. Treating the 100deg ramp as horizontal is the same approximation the note in globals.css
 * already reasons with.
 *
 * FLOOR is 4.5 (WCAG AA). TARGET is 7.0, which is where this site holds body copy everywhere it
 * controls the surface; the note in globals.css is explicit that a photograph buys no exemption.
 *
 * Usage:  node scripts/hero-pick.mjs [imageToTestScrimsAgainst]
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/img";
const ON_DARK = [0xf7, 0xf6, 0xf3];
const PRIMARY = [0x11, 0x18, 0x20];

const srgbToLin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lumaOf = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const INK = lumaOf(ON_DARK);
const PRIM = lumaOf(PRIMARY);

/* Named ramps, as [stopFraction, primaryAlpha]. "current" is what is in globals.css today. */
const SCRIMS = {
  current: [[0, 0.97], [0.26, 0.93], [0.44, 0.86], [0.54, 0.68], [0.68, 0.24], [0.78, 0]],
  eased:   [[0, 0.90], [0.26, 0.85], [0.44, 0.78], [0.54, 0.60], [0.68, 0.20], [0.78, 0]],
  light:   [[0, 0.84], [0.26, 0.79], [0.44, 0.70], [0.54, 0.52], [0.66, 0.18], [0.76, 0]],
  lighter: [[0, 0.78], [0.26, 0.72], [0.44, 0.62], [0.54, 0.44], [0.66, 0.15], [0.76, 0]],
  /* IDENTICAL to `current` across the type band and then falling off much harder. The H1 column
   * is capped at 38rem, which ends at 42% of a 1440 viewport - the old ramp was shaped for a
   * 62ch lede ending at 52%, so it was holding 68% primary over ten points of width that no
   * longer has any type on it. Same contrast, considerably more visible photograph. */
  tightened: [[0, 0.97], [0.26, 0.93], [0.44, 0.86], [0.50, 0.60], [0.58, 0.18], [0.64, 0]],
};
const alphaAt = (ramp, x) => {
  for (let i = 1; i < ramp.length; i++) {
    const [x0, a0] = ramp[i - 1], [x1, a1] = ramp[i];
    if (x <= x1) return a0 + ((a1 - a0) * (x - x0)) / (x1 - x0);
  }
  return 0;
};

async function pixels(file) {
  const img = sharp(join(DIR, file));
  const meta = await img.metadata();
  const W = 200, H = Math.max(1, Math.round((200 * meta.height) / meta.width));
  const { data } = await img.resize(W, H, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  const ch = data.length / (W * H);
  return { W, H, ch, data, ar: meta.width / meta.height, px: `${meta.width}x${meta.height}` };
}

/* The type band: left 46% of the frame, and vertically the middle 60% where the H1 and the
 * paragraph actually sit. The old code averaged the full height, which pulled in the dark
 * foreground lawn along the bottom edge and flattered every candidate. */
function bandLumas({ W, H, ch, data }) {
  const out = [];
  for (let y = Math.floor(H * 0.2); y < Math.ceil(H * 0.8); y++) {
    for (let x = 0; x < Math.ceil(W * 0.46); x++) {
      const i = (y * W + x) * ch;
      out.push([x / W, lumaOf([data[i], data[i + 1], data[i + 2]])]);
    }
  }
  return out;
}

const pct = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];

function evaluate(band, ramp) {
  const comp = band.map(([x, l]) => l * (1 - alphaAt(ramp, x)) + PRIM * alphaAt(ramp, x));
  const mean = comp.reduce((a, b) => a + b, 0) / comp.length;
  const p95 = pct([...comp].sort((a, b) => a - b), 0.95);
  return { mean, p95, rMean: ratio(INK, mean), rP95: ratio(INK, p95) };
}

/* ── 1. rank every wide photograph by how light it is ── */
const files = readdirSync(DIR).filter((f) => /\.(jpe?g)$/i.test(f));
const rows = [];
for (const file of files) {
  const p = await pixels(file);
  if (p.ar < 1.5) continue;
  const band = bandLumas(p);
  let whole = 0;
  for (let i = 0; i < p.data.length; i += p.ch) whole += lumaOf([p.data[i], p.data[i + 1], p.data[i + 2]]);
  rows.push({
    file, ar: p.ar, px: p.px,
    /* NOTE the explicit names. These used to be `mean` and a spread of evaluate(), and
     * evaluate() also returns a `mean` - so the composited value silently overwrote the frame
     * brightness and the table printed one number in two columns under two different headings.
     * The ranking was then sorted by the wrong field entirely. */
    frame: whole / (p.W * p.H),
    band: band.reduce((a, [, l]) => a + l, 0) / band.length,
    scrim: evaluate(band, SCRIMS.current),
  });
}
rows.sort((a, b) => b.frame - a.frame);

console.log(`\n  WIDE PHOTOGRAPHS (aspect >= 1.5), BRIGHTEST FIRST, under the CURRENT scrim`);
console.log(`  ${"─".repeat(96)}`);
console.log(`  ${"file".padEnd(28)} ${"ar".padStart(5)}  ${"frame".padStart(7)} ${"typeband".padStart(9)}  ${"scrimmed".padStart(9)} ${"p95".padStart(7)}  ratio`);
for (const r of rows.slice(0, 12)) {
  console.log(
    `  ${r.file.padEnd(28)} ${r.ar.toFixed(2).padStart(5)}  ${r.frame.toFixed(4).padStart(7)} ` +
    `${r.band.toFixed(4).padStart(9)}  ${r.scrim.mean.toFixed(4).padStart(9)} ${r.scrim.p95.toFixed(4).padStart(7)}  ` +
    `${r.scrim.rP95.toFixed(1)}:1  ${r.scrim.rP95 >= 7 ? "ok" : r.scrim.rP95 >= 4.5 ? "warn" : "FAIL"}`
  );
}

/* ── 2. for one chosen image, what each candidate scrim costs ── */
const target = process.argv[2] ?? "seq-everyday.jpg";
const band = bandLumas(await pixels(target));
console.log(`\n  SCRIM OPTIONS over ${target}`);
console.log(`  ${"─".repeat(96)}`);
console.log(`  ${"ramp".padEnd(10)} ${"alpha at 0 / 44%".padEnd(18)} ${"mean L".padStart(8)} ${"p95 L".padStart(8)}  ${"ratio(mean)".padStart(11)} ${"ratio(p95)".padStart(11)}   verdict`);
for (const [name, ramp] of Object.entries(SCRIMS)) {
  const e = evaluate(band, ramp);
  const worst = e.rP95;
  const verdict = worst < 4.5 ? "FAIL" : worst < 7 ? "under the 7.0 house bar" : "ok";
  console.log(
    `  ${name.padEnd(10)} ${`${(ramp[0][1] * 100).toFixed(0)}% / ${(ramp[2][1] * 100).toFixed(0)}%`.padEnd(18)} ` +
    `${e.mean.toFixed(4).padStart(8)} ${e.p95.toFixed(4).padStart(8)}  ` +
    `${e.rMean.toFixed(1).padStart(10)}:1 ${e.rP95.toFixed(1).padStart(10)}:1   ${verdict}`
  );
}
console.log("");
