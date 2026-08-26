#!/usr/bin/env node
/**
 * variation.mjs — draw a skin for this build that differs from recent builds.
 *
 *   node scripts/variation.mjs <client-slug>
 *   node scripts/variation.mjs <client-slug> --log      # append the draw to skin-log.json
 *
 * WHY THIS EXISTS
 * A fixed profile produces identical sites. A vague brief produces boring ones.
 * This script gives DIRECTION without giving the DESIGN: it hands you a bounded
 * draw — radius, type pairing, ground rotation, accent strategy, an available
 * form palette, and a device source — chosen to differ from the last three
 * builds. What you make inside those bounds is still design work.
 *
 * It never says "put a colour band at section 4". It says "colour-band is in
 * your palette this build, overlap-card is not, and your ground rotation is
 * dark-led." Many different good pages satisfy that. No two consecutive builds
 * satisfy it the same way.
 *
 * The draw is SEEDED FROM THE CLIENT SLUG, so it is stable across reruns —
 * re-running never silently changes an in-progress build's skin.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const slug = process.argv[2];
const DO_LOG = process.argv.includes("--log");
if (!slug || slug.startsWith("--")) {
  console.error("usage: node scripts/variation.mjs <client-slug> [--log]");
  process.exit(2);
}

/* ---------------------------------------------------------------- seeded rng */
function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(hash(slug));
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
const pickN = (arr, n) => {
  const pool = [...arr], out = [];
  while (out.length < n && pool.length) out.push(...pool.splice(Math.floor(rng() * pool.length), 1));
  return out;
};
const range = (lo, hi, step) => {
  const steps = Math.round((hi - lo) / step);
  return +(lo + Math.round(rng() * steps) * step).toFixed(4);
};

/* -------------------------------------------------------------------- pools */
const RADIUS = ["0.25rem", "0.375rem", "0.5rem", "0.625rem", "0.875rem", "1rem", "1.25rem"];
const TYPE = [
  { display: "Fraunces", body: "Karla" },
  { display: "Newsreader", body: "Public Sans" },
  { display: "Bricolage Grotesque", body: "Libre Franklin" },
  { display: "Libre Franklin", body: "Karla" },
  { display: "Source Serif 4", body: "Instrument Sans" },
  { display: "Instrument Sans", body: "Public Sans" },
  { display: "Oswald", body: "Karla" },
  { display: "Poppins", body: "Public Sans" },
];
const GROUND_ROTATION = [
  { name: "dark-led", spec: "open dark, light middle, dark closer. Dark carries >=30% of height." },
  { name: "colour-spine", spec: "brand colour returns every third section as the structural beat." },
  { name: "photo-banded", spec: "full-bleed photo bands separate every content cluster." },
  { name: "warm-cool", spec: "two light grounds far enough apart to read (dE>=10), plus one dark." },
  { name: "inverted", spec: "dark is the default ground; light sections are the exception." },
];
const ACCENT = [
  "CTA-only: accent appears on buttons and nothing else",
  "ground-band: accent is a full section ground once or twice, never on type",
  "type-accent: accent on one word per section head, plus CTAs",
  "edge-motif: accent as a rule/edge derived from the signature device, plus CTAs",
];
const FORMS = ["full-bleed-photo", "split-left", "split-right", "grid-3", "grid-4",
  "feature-bento", "colour-band", "overlap-card", "map", "accordion", "gallery"];
const DEVICE_SOURCE = [
  "the material the trade installs or applies",
  "the tool the crew actually holds",
  "a measurable process step the customer never sees",
  "the site condition before work starts",
  "the boundary between finished and unfinished work",
];

/* --------------------------------------------------------- recent-build log */
const logPath = join(ROOT, "skin-log.json");
let log = [];
if (existsSync(logPath)) {
  try { log = JSON.parse(readFileSync(logPath, "utf8")); } catch { log = []; }
}
if (!Array.isArray(log)) log = [];
const recent = log.slice(-3);
const usedRadius = new Set(recent.map((r) => r.radiusBase));
const usedType = new Set(recent.map((r) => r.displayFont));
const usedRot = new Set(recent.map((r) => r.groundRotation));
const usedAccent = new Set(recent.map((r) => r.accentStrategy));
const usedDevice = new Set(recent.map((r) => r.deviceSource));

const avoid = (pool, used, key = (x) => x) => {
  const fresh = pool.filter((x) => !used.has(key(x)));
  return fresh.length ? fresh : pool;
};

/* ------------------------------------------------------------------- draw */
const radiusBase = pick(avoid(RADIUS, usedRadius));
const type = pick(avoid(TYPE, usedType, (t) => t.display));
const rotation = pick(avoid(GROUND_ROTATION, usedRot, (r) => r.name));
const accentStrategy = pick(avoid(ACCENT, usedAccent));
const deviceSource = pick(avoid(DEVICE_SOURCE, usedDevice));

// Form palette: 6 forms. full-bleed-photo is always in (>=1 photo band is a budget).
// At least one "structural" form so the page has a spine.
const structural = ["colour-band", "overlap-card", "feature-bento"];
const palette = new Set(["full-bleed-photo", pick(structural)]);
for (const f of pickN(FORMS.filter((f) => !palette.has(f)), 8)) {
  if (palette.size >= 6) break;
  palette.add(f);
}
const excluded = FORMS.filter((f) => !palette.has(f));

// Ranges, not fixed values.
const containerPx = range(1440, 1536, 32);
const sectionPy = range(40, 64, 4);
const typeScale = range(1.2, 1.333, 0.0333);
const lightShareCap = range(0.40, 0.55, 0.05);

const draw = {
  client: slug,
  radiusBase,
  displayFont: type.display,
  bodyFont: type.body,
  groundRotation: rotation.name,
  accentStrategy,
  deviceSource,
  formPalette: [...palette],
  containerPx,
  sectionPy,
  typeScale,
  lightShareCap,
};

/* ----------------------------------------------------------------- output */
const line = "-".repeat(66);
console.log(`\n${line}\nSKIN DRAW — ${slug}\n${line}`);
console.log(`\nThese are BOUNDS, not a design. Fill them however the brand demands.\n`);
console.log(`  radius base        ${radiusBase}   (whole scale derives from this)`);
console.log(`  display / body     ${type.display} / ${type.body}`);
console.log(`  ground rotation    ${rotation.name}`);
console.log(`                     ${rotation.spec}`);
console.log(`  accent strategy    ${accentStrategy}`);
console.log(`  container          ${containerPx}px`);
console.log(`  section padding    ${sectionPy}px desktop`);
console.log(`  type scale ratio   ${typeScale}`);
console.log(`  light ground cap   ${Math.round(lightShareCap * 100)}% of page height`);
console.log(`\n  FORM PALETTE (use these; a 6+ section page needs 4+ distinct)`);
for (const f of draw.formPalette) console.log(`    + ${f}`);
console.log(`\n  EXCLUDED THIS BUILD (do not use)`);
console.log(`    - ${excluded.join(", ")}`);
console.log(`\n  SIGNATURE DEVICE must derive from:`);
console.log(`    ${deviceSource}`);
console.log(`    Name it in DESIGN.md before any component code. Visible in 3+ sections.`);

if (recent.length) {
  console.log(`\n  DIFFERS FROM LAST ${recent.length} BUILD(S): ${recent.map((r) => r.client).join(", ")}`);
  const same = [];
  for (const r of recent) {
    if (r.radiusBase === radiusBase) same.push(`radius matches ${r.client}`);
    if (r.displayFont === type.display) same.push(`display font matches ${r.client}`);
    if (r.groundRotation === rotation.name) same.push(`rotation matches ${r.client}`);
  }
  if (same.length) {
    console.log(`  WARNING — pools exhausted, overlap remains:`);
    for (const s of same) console.log(`    ! ${s}`);
  } else {
    console.log(`  No overlap on radius, font, or rotation.`);
  }
} else {
  console.log(`\n  No skin-log.json history yet — this becomes build #1.`);
}

if (DO_LOG) {
  log.push(draw);
  writeFileSync(logPath, JSON.stringify(log, null, 2) + "\n");
  console.log(`\n  logged to skin-log.json (${log.length} builds)`);
} else {
  console.log(`\n  re-run with --log once the brand is locked, to record it`);
}
console.log(`\n${line}\n`);
