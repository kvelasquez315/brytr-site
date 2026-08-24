#!/usr/bin/env node
/* THE BOX GATE.
 *
 * WHY THIS EXISTS. The client said the site looked jumbled, then blocky and robotic, then "very
 * AI", then "insanely boxy" — four rounds, same complaint, and each round I rearranged the grids
 * instead of deleting them. A measurement of the built page found 19 outlined rectangles in
 * <main>, four of them arranged as rows of identical cards.
 *
 * The references, measured rather than remembered: trugreen.com ships ZERO classes containing
 * border, rounded, shadow, ring or card. propertypest.com has ONE repeated-card grid on the
 * entire page and quotes its reviews as text on bare ground.
 *
 * So the rule is now mechanical, because a taste rule I have to remember is a rule I have broken
 * four times. A ring or a radius on a CONTENT container is a build failure. The exceptions are
 * listed below and each one has to earn its place by doing a job the ground cannot do.
 *
 * WHAT COUNTS AS EARNING IT:
 *   a form        the edge tells you where the field is. That is the container working.
 *   a control     the wipe handle, a button. You grab it, so it has to look grabbable.
 *   a photograph  overflow-hidden with no ring and no radius is not a box, it is a crop.
 *
 * WHAT DOES NOT:
 *   a review, a product line, a photo caption, an argument, a statistic, a place name.
 *   Those are content. Content sits on the ground.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

/* TWO LISTS, BECAUSE THE DISEASE IS SITE-WIDE AND THE HOME PAGE IS THE ONE BEING SIGNED OFF.
 *
 * ENFORCED is everything the home page renders. It must be zero, and a new box there fails the
 * build. TRACKED is the rest of the section library — 48 boxes across the interior templates when
 * this gate was written, because they were all built to the same wrong pattern. Those get a
 * ratchet rather than a wall: the number is allowed to fall and never to rise, so the interior
 * pass can chip at it without the gate blocking every unrelated commit in the meantime.
 *
 * The UI primitives in components/ui are in neither list. A form field and a button are where a
 * border legitimately lives. */
const ENFORCED = [
  "app/page.tsx",
  "components/sections/hero.tsx",
  "components/sections/proof-rail.tsx",
  "components/sections/home-v2.tsx",
  "components/sections/scene-wipe.tsx",
];
const TRACKED = ["components/sections"];
const TRACKED_BASELINE = 48;

/* A line is exempt only if it is one of these things. Kept short on purpose — a long allowlist
 * is how a gate stops being a gate. */
const EXEMPT = [
  /QuoteForm|<form|Button|button|role="button"/,          // forms and controls
  /cursor-ew-resize|cursor-grab/,                          // the wipe handle
  /rounded-full/,                                          // a disc is a shape, not a card edge
  /^\s*\*/,                                                // inside a block comment
  /^\s*\/\//,
];

const OFFENDERS = [
  { re: /\bring-1\b|\bring-2\b/, what: "ring on a content container" },
  { re: /\brounded-(sm|md|lg|xl|2xl|3xl)\b/, what: "radius on a content container" },
  { re: /\bshadow-\[var\(--shadow-(lg|dark)\)\]/, what: "drop shadow on a container (shadows belong to photography)" },
  /* `border` on its own, i.e. all four edges. Written with lookarounds because `\bborder\b`
   * matches the tail of `border-border` (our token name) and flagged every hairline. */
  { re: /(?<![-\w])border(?![-\w])/, what: "a full border box (use a hairline on one edge, or the ground)" },
];

function walk(p) {
  const out = [];
  const s = statSync(p);
  if (s.isFile()) return p.match(/\.(tsx|ts)$/) ? [p] : [];
  for (const e of readdirSync(p)) out.push(...walk(join(p, e)));
  return out;
}

function scan(paths, report) {
  const hits = [];
  for (const f of paths.flatMap((p) => walk(join(ROOT, p)))) {
    const lines = readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (EXEMPT.some((re) => re.test(line))) return;
      for (const o of OFFENDERS) {
        if (o.re.test(line)) {
          hits.push({ f, i, o, line });
          if (report) {
            console.log(`\nFAIL  ${relative(ROOT, f)}:${i + 1}  ${o.what}`);
            console.log(`      ${line.trim().slice(0, 140)}`);
          }
          break;
        }
      }
    });
  }
  return hits;
}

const enforced = scan(ENFORCED, true);

/* The tracked set is measured over the whole section library, then the enforced files are
 * subtracted so a box on the home page is never double-counted or hidden by the ratchet. */
const enforcedAbs = new Set(ENFORCED.map((p) => join(ROOT, p)));
const tracked = scan(TRACKED, false).filter((h) => !enforcedAbs.has(h.f));

console.log("\n── boxcount ──────────────────────────────────────");
console.log(`home page      ${enforced.length}  (must be 0)`);
console.log(`interior pages ${tracked.length}  (baseline ${TRACKED_BASELINE}, may fall, never rise)`);

let bad = false;
if (enforced.length) {
  console.log("");
  console.log(`FAIL  ${enforced.length} boxed content container(s) on the home page.`);
  console.log("      Content sits on the ground. A container has to do a job the ground cannot:");
  console.log("      a form edge, a grabbable control. A card around a review is not a job.");
  console.log("      trugreen.com ships zero of these. Read the note at the top of this file.");
  bad = true;
}
if (tracked.length > TRACKED_BASELINE) {
  console.log("");
  console.log(`FAIL  interior boxes rose to ${tracked.length} from ${TRACKED_BASELINE}.`);
  console.log("      The interior pass is meant to remove these, not add to them.");
  bad = true;
}
if (bad) process.exit(1);
if (tracked.length < TRACKED_BASELINE) {
  console.log("");
  console.log(`NOTE  interior boxes fell to ${tracked.length}. Lower TRACKED_BASELINE to ${tracked.length}`);
  console.log("      so the ratchet holds the new floor.");
}
console.log("PASS  home page carries no boxed content. Photographs flush, lists ruled, grounds divide.");
console.log("───────────────────────────────────────────────────");
