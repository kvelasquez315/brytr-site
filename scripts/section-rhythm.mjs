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
 * WHAT IS NOT A DEFECT. Two sections in mutually exclusive branches — `{cond && (<section…` next
 * to another, or the two halves of a ternary. Only one of them ever renders. The city template
 * branches three ways on drive-time band and the comparison template three ways on framing, so
 * this exemption is load-bearing, not a convenience.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e === "page.tsx") out.push(p);
  }
  return out;
};

const SECTION = /className="(?:section )?bg-(background|muted|raise|primary|card)"/g;
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
for (const file of walk("app")) {
  const src = readFileSync(file, "utf8");
  const events = [];
  for (const m of src.matchAll(SECTION)) events.push([m.index, m[1], "section"]);
  for (const m of src.matchAll(COMPONENT)) {
    const tail = src.slice(m.index, m.index + 1600);
    const g = GROUND.exec(tail);
    events.push([m.index, g ? g[1] : DEFAULTS[m[1]], m[1]]);
  }
  events.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < events.length; i++) {
    const [posA, groundA] = events[i - 1];
    const [posB, groundB, kindB] = events[i];
    if (groundA !== groundB) continue;
    if (EXCLUSIVE.test(src.slice(posA, posB))) continue;
    const line = src.slice(0, posB).split("\n").length;
    problems.push(`${file}:${line}  two bg-${groundB} in a row (the second is a ${kindB})`);
  }
}

if (problems.length) {
  console.error(`\nFAIL  ${problems.length} adjacent section(s) share a background:\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nPick a ground that alternates. Photograph sections and PageCta all take a `ground` prop.\n"
  );
  process.exit(1);
}
console.log("PASS  no two adjacent sections share a background.");
