#!/usr/bin/env node
/**
 * check.mjs — static rule enforcement for Nexus Advantage sites.
 * Cross-platform (Windows/mac/Linux). No dependencies.
 *
 *   node scripts/check.mjs               # grouped report, exits 1 on blockers
 *   node scripts/check.mjs --summary     # one line per rule
 *   node scripts/check.mjs --rule D1     # drill into one rule, every hit
 *   node scripts/check.mjs --fix-hint
 *   node scripts/check.mjs --warn-only
 *
 * Calibration principle: property-pest-control is an APPROVED site. It should
 * score near-clean. Anything it flags is either a real defect Kaiden wants
 * fixed, or a bug in this file. Never tune by opinion — tune against that repo.
 *
 * Per-client config, nexus.rules.json at repo root:
 *   {
 *     "neverMention": ["licensed", "insured", "bonded", "W-2", "subcontract"],
 *     "allowHex": ["#EA4335"],        // extra permitted literals
 *     "ignore": ["D6"]                 // rule codes to skip entirely
 *   }
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const ARGS = new Set(argv);
const WARN_ONLY = ARGS.has("--warn-only");
const SHOW_FIX = ARGS.has("--fix-hint");
const SUMMARY = ARGS.has("--summary");
const ONLY_RULE = (() => {
  const i = argv.indexOf("--rule");
  return i >= 0 ? argv[i + 1] : null;
})();

const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", "dist", "build", "out", ".shots",
  ".vercel", "coverage", "public", ".turbo", "__pycache__",
]);
const CODE_EXT = new Set([".tsx", ".jsx", ".ts", ".js", ".mjs"]);
const STYLE_EXT = new Set([".css"]);

/* -------------------------------------------------------------- allowlists */
// Platform brand marks whose hex values are prescribed by the platform.
// Using the real Google G colours is correct, not a brand-lock violation.
const BRAND_HEX = new Set([
  "#EA4335", "#4285F4", "#FBBC05", "#34A853", "#4267B2", "#1877F2",
  "#1DA1F2", "#0A66C2", "#E1306C", "#FF0000", "#25D366", "#000000", "#FFFFFF",
].map((s) => s.toUpperCase()));

/* ------------------------------------------------------------------- walk */
function walk(dir, acc = []) {
  let names;
  try { names = readdirSync(dir); } catch { return acc; }
  for (const name of names) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}
const files = walk(ROOT).filter((f) => CODE_EXT.has(extname(f)) || STYLE_EXT.has(extname(f)));

/* ----------------------------------------------------------------- config */
let neverMention = [], allowHex = new Set(BRAND_HEX), ignoreRules = new Set();
const cfgPath = join(ROOT, "nexus.rules.json");
if (existsSync(cfgPath)) {
  try {
    const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
    neverMention = (cfg.neverMention || []).map(String);
    for (const h of cfg.allowHex || []) allowHex.add(String(h).toUpperCase());
    ignoreRules = new Set((cfg.ignore || []).map(String));
  } catch {
    console.error("nexus.rules.json is not valid JSON — ignoring it");
  }
}

/* --------------------------------------------------------------- findings */
const findings = [];
function add(level, rule, file, line, msg, fix) {
  const code = rule.split(" ")[0];
  if (ignoreRules.has(code)) return;
  findings.push({ level, rule, code, file: relative(ROOT, file), line, msg, fix });
}

/* ---------------------------------------------------------------- helpers */
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, (m) => "\n".repeat((m.match(/\n/g) || []).length))
   .replace(/(^|[^:"'`\\])\/\/[^\n]*/g, "$1");

const lineOf = (text, idx) => text.slice(0, idx).split("\n").length;

// className="..." plus template-literal and clsx-ish forms
function classAttrs(text) {
  const out = [];
  const re = /class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{"([^"]*)"\}|\{clsx\(([^)]*)\)\}|\{cn\(([^)]*)\)\})/g;
  let m;
  while ((m = re.exec(text))) {
    const cls = m[1] || m[2] || m[3] || m[4] || m[5] || m[6] || "";
    out.push({ idx: m.index, cls });
  }
  return out;
}

// Is this hex inside an SVG / logo context?
function svgContext(text, idx) {
  const w = text.slice(Math.max(0, idx - 200), idx + 120);
  return /<svg|viewBox|fill\s*=|stroke\s*=|stopColor|gradientUnits|<path|<circle|<rect/i.test(w);
}

/* -------------------------------------------------------------- the rules */
const heroCandidates = [];
let usesPageToken = false;

for (const file of files) {
  let raw;
  try { raw = readFileSync(file, "utf8"); } catch { continue; }
  const text = stripComments(raw);
  const isCode = CODE_EXT.has(extname(file));
  const isCss = STYLE_EXT.has(extname(file));
  const base = basename(file).toLowerCase();

  if (/\bmax-w-page\b/.test(text)) usesPageToken = true;

  /* B1 — a real hero renders a section AND an h1 */
  if (isCode && /hero/.test(base) &&
      /<section\b/.test(text) && /<h1\b/.test(text)) {
    heroCandidates.push(relative(ROOT, file));
  }

  /* D1 — em dashes in shipped copy (raw, so comments count too: they leak) */
  {
    const re = /—/g; let m;
    while ((m = re.exec(raw))) {
      add("BLOCKER", "D1 em-dash", file, lineOf(raw, m.index),
        "em dash in source", "comma, colon, or full stop");
    }
  }

  /* D2 — eyebrow / kicker mechanism */
  {
    const re = /\b(eyebrow|kicker|supertitle)\b/gi; let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "D2 eyebrow", file, lineOf(text, m.index),
        `"${m[1]}" — the eyebrow/kicker mechanism is banned outright`,
        "delete the prop and every usage; do not replace it");
    }
  }

  /* D4 — leading-zero step numbers rendered as content */
  if (isCode) {
    const re = />\s*(0[1-9])\s*</g; let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "D4 leading-zero", file, lineOf(text, m.index),
        `"${m[1]}" rendered as content`, "use words, or drop the number");
    }
  }

  /* D6 — carousels, marquees, tickers, pans */
  {
    const re = /\b(carousel|marquee|ticker|swiper|embla|keen-slider|ken-?burns)\b/gi; let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "D6 motion", file, lineOf(text, m.index),
        `"${m[1]}" — carousels/marquees/tickers/pans are banned`,
        "render it statically as a grid or link strip");
    }
  }

  /* E2 — stock glyph libraries */
  {
    const re = /from\s+["'](lucide-react|react-feather|@heroicons\/[^"']+|react-icons[^"']*)["']/g; let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "E2 stock-icons", file, lineOf(text, m.index),
        `imports ${m[1]}`, "default is NO icons; hand-author the SVG if truly needed");
    }
  }

  /* I1 — per-client never-mention list */
  for (const term of neverMention) {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"); let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "I1 never-mention", file, lineOf(text, m.index),
        `banned for this client: "${m[0]}"`, "remove the claim");
    }
  }

  /* brand-lock — inline hex, excluding SVG/logo context and platform marks */
  if (isCode) {
    const re = /#[0-9a-fA-F]{6}\b/g; let m;
    while ((m = re.exec(text))) {
      const hex = m[0].toUpperCase();
      if (allowHex.has(hex)) continue;
      if (svgContext(text, m.index)) continue;
      add("BLOCKER", "brand-lock", file, lineOf(text, m.index),
        `inline hex ${m[0]}`, "move it into globals.css as a token");
    }
  }

  /* K1 — the silent font-fallback trap */
  if (isCss) {
    const re = /--font-([a-z0-9-]+)\s*:\s*var\(\s*--font-\1\s*\)/g; let m;
    while ((m = re.exec(text))) {
      add("BLOCKER", "K1 font-var", file, lineOf(text, m.index),
        `--font-${m[1]} defined as var(--font-${m[1]}) — self-reference drops headings to the system stack`,
        "point it at the next/font variable, not itself");
    }
  }

  /* -------- element-level: h1 casing (same tag only, no proximity guessing) */
  if (isCode) {
    const re = /<h1\b([^>]*)>/g; let m;
    while ((m = re.exec(text))) {
      if (/\buppercase\b/.test(m[1])) {
        add("BLOCKER", "B5 h1-case", file, lineOf(text, m.index),
          "h1 has the uppercase utility",
          "Title Case: capitalise the first letter of each word");
      }
    }
  }

  /* -------- class-level checks */
  for (const { idx, cls } of classAttrs(text)) {
    const line = lineOf(text, idx);

    /* F1 — page container must use the named token */
    if (/\bmax-w-(7xl|6xl|screen-2xl|\[1[23][0-9]{2}px\])\b/.test(cls) && /\bmx-auto\b/.test(cls)) {
      add("BLOCKER", "F1 container", file, line,
        "page container uses a raw max-w utility instead of max-w-page",
        "swap to max-w-page (96rem / 1536px)");
    }

    /* profile — section padding 40-56px, not 96-128 */
    const py = cls.match(/(?:^|\s)py-(\d+)(?=\s|$)/);
    if (py && Number(py[1]) >= 20 && /\b(bg-|max-w-page|w-full)\b/.test(cls)) {
      add("WARN", "profile padding", file, line,
        `py-${py[1]} (${Number(py[1]) * 4}px) — measured profile is py-10..py-14`,
        "tighten unless this is deliberate hierarchy");
    }

    /* profile — semibold, not bold, on display type */
    if (/\bfont-bold\b/.test(cls) && /\btext-(3xl|4xl|5xl|6xl|7xl)\b/.test(cls)) {
      add("WARN", "profile weight", file, line,
        "font-bold on display type (refined reference: bold 3x, semibold 135x)",
        "use font-semibold");
    }

    /* F5 — rounded, not boxy */
    if (/\brounded-none\b/.test(cls)) {
      add("WARN", "F5 rounded", file, line,
        "rounded-none", "rounded-2xl for cards, rounded-full for chips/buttons");
    }

    /* D7 — no gradient or fade over imagery */
    if (/\bbg-gradient-to-/.test(cls) || /\b(from|via)-(black|transparent)\b/.test(cls)) {
      add("BLOCKER", "D7 no-fade", file, line,
        "gradient / fade over imagery",
        "solid ground, or the minimum flat even tint (B10)");
    }

    /* G4 — plain 50/50 split */
    if (/\b(lg|md):grid-cols-2\b/.test(cls) && !/minmax|fr[_\]]/.test(cls)) {
      add("WARN", "G4 split-ratio", file, line,
        "plain 2-col split — reference uses 0.9fr/1.1fr, alternating",
        "use an asymmetric ratio");
    }
  }
}

/* B1 — more than one real hero */
if (heroCandidates.length > 1) {
  add("BLOCKER", "B1 one-hero", join(ROOT, heroCandidates[0]), 1,
    `${heroCandidates.length} components render a hero section with an h1: ${heroCandidates.join(", ")}`,
    "collapse to one shared hero; only image and wording differ per page");
}

/* F1 — token must exist. Usage in code proves it (Tailwind would fail otherwise). */
if (!usesPageToken) {
  const css = files.filter((f) => STYLE_EXT.has(extname(f)))
    .map((f) => { try { return readFileSync(f, "utf8"); } catch { return ""; } }).join("\n");
  const cfg = ["tailwind.config.ts", "tailwind.config.js", "tailwind.config.mjs"]
    .map((f) => join(ROOT, f)).filter(existsSync)
    .map((f) => readFileSync(f, "utf8")).join("\n");
  if (!/--max-w?-page|--container-site|max-w-page|containerSite/.test(css + cfg)) {
    add("BLOCKER", "F1 token-missing", join(ROOT, "app/globals.css"), 1,
      "no page-width token defined anywhere",
      "add --max-w-page: 96rem in @theme and use max-w-page");
  }
}

/* --------------------------------------------------------------- report */
const groups = new Map();
for (const f of findings) {
  if (ONLY_RULE && f.code !== ONLY_RULE) continue;
  if (!groups.has(f.rule)) groups.set(f.rule, []);
  groups.get(f.rule).push(f);
}
const ordered = [...groups.entries()].sort((a, b) => {
  if (a[1][0].level !== b[1][0].level) return a[1][0].level === "BLOCKER" ? -1 : 1;
  return b[1].length - a[1].length;
});

for (const [rule, list] of ordered) {
  const byFile = new Map();
  for (const f of list) byFile.set(f.file, (byFile.get(f.file) || 0) + 1);
  const level = list[0].level;
  console.log(`\n${level}  ${rule}  —  ${byFile.size} file${byFile.size > 1 ? "s" : ""}, ${list.length} occurrence${list.length > 1 ? "s" : ""}`);
  if (SUMMARY) continue;

  if (ONLY_RULE) {
    for (const f of list) console.log(`   ${f.file}:${f.line}  ${f.msg}`);
  } else {
    const top = [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    for (const [file, n] of top) {
      const first = list.find((f) => f.file === file);
      console.log(`   ${file}:${first.line}${n > 1 ? `  (${n}x)` : ""}`);
    }
    if (byFile.size > 6) console.log(`   ... ${byFile.size - 6} more files`);
    console.log(`   ${list[0].msg}`);
  }
  if (SHOW_FIX && list[0].fix) console.log(`   -> ${list[0].fix}`);
}

const shown = ordered.flatMap(([, l]) => l);
const blockerGroups = ordered.filter(([, l]) => l[0].level === "BLOCKER");
const warnGroups = ordered.filter(([, l]) => l[0].level === "WARN");
const blockerCount = shown.filter((f) => f.level === "BLOCKER").length;

console.log(`\n${"=".repeat(64)}`);
console.log(`${blockerGroups.length} blocker rules (${blockerCount} occurrences), ` +
            `${warnGroups.length} warn rules, ${files.length} files scanned`);
if (!ONLY_RULE && !SUMMARY) console.log(`drill in with:  node scripts/check.mjs --rule <CODE>`);

if (blockerGroups.length && !WARN_ONLY) {
  console.log("\nBLOCKED. Fix the blocker rules above before shipping.\n");
  process.exit(1);
}
console.log(blockerGroups.length ? "\nwarn-only mode: not failing\n" : "\nclean\n");
