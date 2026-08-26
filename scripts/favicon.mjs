#!/usr/bin/env node
/* THE FAVICON, cut from the real logo rather than drawn.
 *
 * THE PROBLEM WITH USING THE LOGO DIRECTLY: brytr-logo-light.png is 2048x906, a 2.26:1 wordmark
 * reading "Brytr". Squashed into a 16x16 browser tab it is four illegible smudges. A favicon has to
 * be square and it has to survive being 16 pixels wide, and a wordmark does neither.
 *
 * WHAT THIS DOES INSTEAD: crops the part of the actual lockup that is already square and already
 * carries the brand - the capital B with the amber four-point sparkle tucked into its shoulder -
 * and sets it on the brand navy. Nothing is redrawn. The letterform and the sparkle are the client's
 * own artwork, at their own proportions, in their own colours; the only additions are the ground
 * and the padding.
 *
 * WHY THE B AND THE SPARKLE TOGETHER, rather than one or the other. The sparkle alone is legible at
 * any size but says nothing - it is a generic star. The B alone is a letter in a common weight. The
 * two together are the thing somebody would recognise from the header, and the sparkle is what makes
 * a bold B specifically Brytr's bold B.
 *
 * THE LIGHT LOCKUP IS THE SOURCE, not the black master: the icon sits on navy, and the white
 * wordmark is the version Brytr publishes for dark grounds. See content/badges.ts for how that file
 * was derived and verified.
 *
 * OUTPUTS, per the Next file conventions in
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md:
 *
 *   app/icon.png         512  the modern favicon; Next emits <link rel="icon"> for it
 *   app/apple-icon.png   180  the iOS home-screen tile. No rounding - iOS masks it itself
 *   app/favicon.ico      16/32/48 multi-size, for /favicon.ico requests that never look at the HTML
 *
 * Usage:  npm run favicon
 */
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/img/brytr-logo-light.png";
/* --brand-primary from app/globals.css. The one place outside a stylesheet that needs it as a
 * value, because a PNG has no tokens - same exemption the Leaflet map already documents. */
const NAVY = { r: 0x11, g: 0x18, b: 0x20, alpha: 1 };

/* ── ISOLATE THE B AND THE SPARKLE BY PIXEL, NOT BY BOX ──
 *
 * A rectangular crop cannot separate these. The lockup reads B, sparkle, r - and the sparkle sits
 * in the B's shoulder with the r's stem rising directly behind it, so the three overlap in x. Every
 * vertical cut is wrong somewhere: cut at the B's edge and the sparkle is sliced in half; cut at the
 * sparkle's right edge and a severed stem of the r comes with it. Both were rendered and looked at
 * before this was written.
 *
 * So the rule is per-pixel rather than per-column: KEEP a pixel if it is part of the B, or if it is
 * amber. The r is neither, and disappears. Nothing is redrawn or repositioned - the B and the
 * sparkle keep the exact shapes and the exact spatial relationship they have in the client's file.
 */
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const isAmber = (r, g, b) => r > 170 && g > 110 && g < 220 && b < 130 && r - b > 90;

/* The B's right edge: the last column before the r's stem. Established by rendering candidates at
 * 560 / 600 / 640 / 694 and looking - 560 is the last one with no stem in it. */
const B_RIGHT = 560;

const out = Buffer.alloc(W * H * 4, 0);
let x0 = Infinity, x1 = -1, y0 = Infinity, y1 = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    const a = data[i + 3];
    if (a < 8) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (x >= B_RIGHT && !isAmber(r, g, b)) continue;
    const o = (y * W + x) * 4;
    out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = a;
    if (a > 128) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
}
const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
console.log(`  source ${W}x${H} — B + sparkle isolated at x ${x0}-${x1}, y ${y0}-${y1} (${cw}x${ch}, ${(cw / ch).toFixed(2)}:1)`);

/* ── the master: the isolated mark, contained in a navy square with even padding ── */
const SIZE = 512;
const INSET = 0.72; // the mark occupies 72% of the tile, leaving a margin that survives OS masking

const mark = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: x0, top: y0, width: cw, height: ch })
  .resize({
    width: Math.round(SIZE * INSET),
    height: Math.round(SIZE * INSET),
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const master = await sharp({
  create: { width: SIZE, height: SIZE, channels: 4, background: NAVY },
})
  .composite([{ input: mark, gravity: "center" }])
  .png()
  .toBuffer();

mkdirSync("app", { recursive: true });
writeFileSync("app/icon.png", master);
await sharp(master).resize(180, 180).toFile("app/apple-icon.png");

/* ── favicon.ico, assembled by hand ──
 *
 * sharp cannot write .ico, and Next only emits <link rel="icon"> for icon.png - so without this,
 * a bare request to /favicon.ico (which plenty of crawlers, feed readers and older browsers make
 * without ever parsing the HTML) 404s.
 *
 * The format is small enough to write: a 6-byte header, one 16-byte directory entry per size, then
 * the image payloads. Modern .ico allows each payload to be a whole PNG, which every browser and
 * Windows Vista onward accept, so the sizes below are just three PNGs with an index in front.
 */
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await sharp(master).resize(s, s).png({ compressionLevel: 9 }).toBuffer());

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);          // reserved
header.writeUInt16LE(1, 2);          // 1 = icon
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0); // width  (0 means 256)
  e.writeUInt8(s === 256 ? 0 : s, 1); // height
  e.writeUInt8(0, 2);                 // palette size, 0 for truecolour
  e.writeUInt8(0, 3);                 // reserved
  e.writeUInt16LE(1, 4);              // colour planes
  e.writeUInt16LE(32, 6);             // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});

writeFileSync("app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

console.log(`  app/icon.png        ${SIZE}x${SIZE}`);
console.log(`  app/apple-icon.png  180x180`);
console.log(`  app/favicon.ico     ${sizes.join(", ")} (${(offset / 1024).toFixed(1)} KB)`);
