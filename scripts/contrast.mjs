/* APCA + WCAG check on every text/background pair the site actually uses.
   Run: node scripts/contrast.mjs   (exits non-zero if any pair misses target)

   THE PALETTE IS READ OUT OF app/globals.css, NOT COPIED HERE.
   It used to be a hardcoded object in this file, which made this script a second source of truth
   for the brand colours: the exact failure hex-lock.mjs exists to prevent, sitting inside the
   gate that is supposed to police it. It went unnoticed because a stale copy still passes. It was
   caught when --brand-accent changed from #f5c518 to the real logo yellow #ffba42 and this script
   reported byte-identical numbers to the run before it, which is impossible if it were measuring
   the change. Parsed now, so a token can never drift away from the value being tested, and a
   missing token is a hard failure rather than a silent stale reading. */
import { readFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const token = (name) => {
  const m = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\b`).exec(css);
  if (!m) {
    console.error(`\nFAIL  token --${name} not found in app/globals.css.`);
    console.error("This script reads the palette from the stylesheet. If a token was renamed,");
    console.error("rename it here too rather than pasting its value back in.\n");
    process.exit(1);
  }
  return m[1].toLowerCase();
};
const P = {
  primary:     token("brand-primary"),
  raise:       token("brand-raise"),
  neutral:     token("brand-neutral"),
  neutralDeep: token("brand-neutral-deep"),
  card:        token("card"),
  ink:         token("brand-ink"),
  onDark:      token("on-dark"),
  onDarkMuted: token("on-dark-muted"),
  muted:       token("muted-foreground"),
  accent:      token("brand-accent"),
  accentDeep:  token("brand-accent-deep"),
  accentInk:   token("brand-accent-ink"),
};
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (h) => { const [r, g, b] = hex(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const wcag = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const Y = (h) => { const [r, g, b] = hex(h).map((c) => (c / 255) ** 2.4); return 0.2126729 * r + 0.7151522 * g + 0.0721750 * b; };
function apca(text, bg) {
  let Yt = Y(text), Yb = Y(bg);
  const clamp = (y) => (y < 0.022 ? y + (0.022 - y) ** 1.414 : y);
  Yt = clamp(Yt); Yb = clamp(Yb);
  if (Yb > Yt) return Math.abs((Yb ** 0.56 - Yt ** 0.57) * 1.14 * 100) - 2.7;
  return Math.abs((Yb ** 0.65 - Yt ** 0.62) * 1.14 * 100) - 2.7;
}
const pairs = [
  ["body on neutral", P.ink, P.neutral, 75, 4.5],
  ["body on neutral-deep", P.ink, P.neutralDeep, 75, 4.5],
  ["body on card", P.ink, P.card, 75, 4.5],
  ["muted on neutral", P.muted, P.neutral, 75, 4.5],
  ["muted on card", P.muted, P.card, 75, 4.5],
  ["muted on neutral-deep", P.muted, P.neutralDeep, 75, 4.5],
  ["on-dark on primary", P.onDark, P.primary, 75, 4.5],
  ["on-dark on raise", P.onDark, P.raise, 75, 4.5],
  ["on-dark-muted on primary", P.onDarkMuted, P.primary, 75, 4.5],
  ["on-dark-muted on raise", P.onDarkMuted, P.raise, 75, 4.5],
  ["accent on primary (eyebrow)", P.accent, P.primary, 60, 4.5],
  ["ink on accent (CTA label)", P.ink, P.accent, 75, 4.5],
  ["accentInk on neutral (eyebrow)", P.accentInk, P.neutral, 75, 4.5],
  ["accentInk on card (eyebrow)", P.accentInk, P.card, 75, 4.5],
  ["accentInk on neutral-deep", P.accentInk, P.neutralDeep, 75, 4.5],
];
let fail = 0;
console.log("pair".padEnd(34), "APCA".padStart(7), "WCAG".padStart(7), "  result");
for (const [name, t, b, lcMin, wcMin] of pairs) {
  const lc = Math.abs(apca(t, b)), w = wcag(t, b);
  const ok = lc >= lcMin && w >= wcMin;
  if (!ok) fail = 1;
  console.log(name.padEnd(34), lc.toFixed(1).padStart(7), w.toFixed(2).padStart(7), ok ? "  PASS" : `  FAIL (need Lc ${lcMin} / ${wcMin}:1)`);
}
console.log(fail ? "\nCONTRAST FAILED" : "\nAll pairs pass.");
process.exit(fail);
