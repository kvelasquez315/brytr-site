#!/usr/bin/env node
/* NO TWO ADJACENT SECTIONS MAY SHARE A BACKGROUND.
 *
 * The site separates content in a fixed order: whitespace, then a background shift, then
 * elevation. When two sections in a row land on the same ground the middle tool is gone, and what
 * a reader sees is one very long section with a dead strip through it. It is the blank-space
 * failure arriving structurally rather than through a layout mistake, which is why nothing else in
 * the toolchain catches it — every individual section is fine.
 *
 * It happened at scale. Twenty-one adjacencies across fourteen files: seven photograph sections
 * that had picked a ground without looking at their neighbours, seven page closers whose component
 * hard-coded its own ground so the page could not choose, and Reviews and MaterialsSplit sitting
 * on 2,700px of identical warm neutral on the home page with no seam at all.
 *
 * WHAT COUNTS AS A SECTION. A `bg-*` on a <section>, and the four photograph components and
 * PageCta, whose grounds come from props with known defaults.
 *
 * IT NOW COMPARES RESOLVED GROUNDS, NOT CLASS NAMES, and that is the whole point of this
 * revision. `bg-background` and `bg-muted` were two different strings pointing at two warm
 * neutrals about 10 per channel apart - #f1ede4 and #e7e1d4 - so a page could alternate
 * background/muted/background/muted all the way down, pass this gate cleanly, and still
 * scroll as one unbroken beige field. That is exactly what the home page was doing across
 * six of thirteen sections. The two are now the same token, and FAMILY below says so, so a
 * bone section beside another bone section fails no matter which class name it used.
 *
 * `card` is white and is for CARDS. It is not a section ground; using it as one is an error
 * on its own, which is why it maps to bone here and will collide with its neighbours.
 *
 * WHY THE FAMILY CHECK IS SCOPED, and this is a deliberate compromise rather than a fudge.
 * Turning it on everywhere at once surfaced 32 adjacencies across the 78 interior pages -
 * proof that the invisible-beige defect was never a home-page problem, it was the whole
 * site. The client has explicitly deferred the interior pages until the home page is signed
 * off, so rewriting the ground order on 27 templates today would be work he has not asked
 * for and cannot review. So: STRICT holds the family rule on the pages already rebuilt in
 * the new language, everything else keeps the old name-only check, and the run prints the
 * interior debt every single time so it cannot quietly become permanent. Add each interior
 * template to STRICT as it gets rebuilt, and the NOTE count walks itself down to zero.
 *
 * WHAT IS NOT A DEFECT. Two sections in mutually exclusive branches — `{cond && (<section…` next
 * to another, or the two halves of a ternary. Only one of them ever renders. The city template
 * branches three ways on drive-time band and the comparison template three ways on framing, so
 * this exemption is load-bearing, not a convenience.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e === "page.tsx") out.push(p);
  }
  return out;
};

const SECTION = /className="(?:section )?bg-(background|muted|raise|primary|card)"/g;
/* Four grounds, three families. Two neighbours in the same family is the failure. */
const FAMILY = {
  background: "bone",
  muted: "bone",
  card: "bone",
  raise: "navy",
  primary: "night",
};
const fam = (g) => FAMILY[g] ?? g;
/* Pages rebuilt in the four-ground language. Grows one entry at a time; see the note above. */
const STRICT = new Set(["app/page.tsx"]);
const COMPONENT = /<(PhotoStrip|PhotoSplit|PhotoBand|PhotoPair|PageCta)\b/g;
const GROUND = /ground="(background|muted|raise|primary)"/;
/* Defaults must match the components. If you change a default there, change it here. */
const DEFAULTS = {
  PhotoStrip: "raise",
  PhotoSplit: "background",
  PhotoBand: "raise",
  PhotoPair: "muted",
  PageCta: "muted",
};

/* `{cond && (` … `)}` beside another, or `) : (` — only one branch renders. */
const EXCLUSIVE = /\)\s*\}\s*\{[^{}]*?&&\s*\(|\)\s*:\s*\(/s;

const problems = [];
/* Interior-page adjacencies that only the family rule catches. Reported, not fatal, until
   each template is rebuilt and added to STRICT. */
const deferred = [];
for (const file of walk("app")) {
  const src = readFileSync(file, "utf8");
  const events = [];
  for (const m of src.matchAll(SECTION)) events.push([m.index, m[1], "section"]);
  for (const m of src.matchAll(COMPONENT)) {
    const tail = src.slice(m.index, m.index + 1600);
    const g = GROUND.exec(tail);
    events.push([m.index, g ? g[1] : DEFAULTS[m[1]], m[1]]);
  }
  const strict = STRICT.has(file.split(sep).join("/"));
  events.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < events.length; i++) {
    const [posA, groundA] = events[i - 1];
    const [posB, groundB, kindB] = events[i];
    if (fam(groundA) !== fam(groundB)) continue;
    if (EXCLUSIVE.test(src.slice(posA, posB))) continue;
    const line = src.slice(0, posB).split("\n").length;
    const how = groundA === groundB ? `two bg-${groundB}` : `bg-${groundA} then bg-${groundB}, both ${fam(groundB)}`;
    /* A same-NAME clash is fatal everywhere - that is the original rule and scoping the family
       check must not quietly relax it. Only the cross-name, same-family case (bg-muted beside
       bg-background) is deferred, and only on templates not yet rebuilt. */
    const fatal = strict || groundA === groundB;
    (fatal ? problems : deferred).push(`${file}:${line}  ${how} (the second is a ${kindB})`);
  }
}

if (deferred.length) {
  console.log(
    `NOTE  ${deferred.length} bone-on-bone adjacency(ies) still on interior templates not yet` +
    `\n      rebuilt in the four-ground language. Not fatal. Add a template to STRICT in this` +
    `\n      file as you rebuild it and this number comes down.`
  );
}
if (problems.length) {
  console.error(`\nFAIL  ${problems.length} adjacent section(s) share a background:\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nPick a ground from a DIFFERENT FAMILY: bone (background/muted/card), navy (raise) or" +
    "\nnight (primary). Photograph sections and PageCta all take a `ground` prop.\n"
  );
  process.exit(1);
}
console.log("PASS  no two adjacent sections share a background.");
