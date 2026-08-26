/* EVERY LIGHT CARD CARRIES A HAIRLINE.
 *
 * The rule: a card on a light ground is `rounded-* bg-card|bg-background` with
 * `shadow-[var(--shadow-lg)]`, and it must also carry `ring-1 ring-border`.
 *
 * WHY IT IS A RULE AND NOT A PREFERENCE. A white or limestone card on a white or limestone section
 * is separated from its ground by a soft shadow and nothing else, and a soft edge between two
 * near-identical values reads as blur rather than as an object. That is a large part of what the
 * client kept reporting as the site not looking like a big professional site. The hairline is ink
 * at 12 percent: enough to give every card a definite edge, not enough to turn a page into a grid
 * of boxes.
 *
 * WHY IT IS GATED. It went onto the four home page card types first and stayed there. When the
 * rollout came, 39 cards across 19 other templates had drifted without it, which nothing caught,
 * because every card was individually fine. This is the same failure mode as the section rhythm
 * gate: a defect that only exists in the comparison between files.
 *
 * DARK CARDS ARE EXEMPT, and deliberately. On `bg-primary` or `bg-raise` the value difference
 * against the ground is already large, and an outline there reads as a border rather than an edge.
 * Those use `ring-1 ring-on-dark/10` where they need one at all.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components"];
const BACKSLASH = String.fromCharCode(92);

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".tsx")) out.push(p);
  }
  return out;
};

const SHADOW = "shadow-[var(--shadow-lg)]";
const LIGHT = /bg-(card|background)\b/;
const DARK = /bg-(primary|raise)\b/;

const hits = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = readFileSync(file, "utf8");
    if (!src.includes(SHADOW)) continue;
    const lines = src.split("\n");
    lines.forEach((ln, i) => {
      if (!ln.includes(SHADOW) || ln.includes("ring-1")) return;
      /* The ground can sit a line or two up in a wrapped className, or on the other branch of a
       * ternary, so look at a small window rather than the single line. */
      const window = lines.slice(Math.max(0, i - 3), i + 3).join("\n");
      if (!LIGHT.test(window)) return;
      if (DARK.test(ln)) return; // an explicitly dark card on this very line
      hits.push({
        file: relative(".", file).split(BACKSLASH).join("/"),
        line: i + 1,
        text: ln.trim().slice(0, 120),
      });
    });
  }
}

if (hits.length) {
  console.error(`FAIL  ${hits.length} light card(s) with no hairline. Add \`ring-1 ring-border\`.`);
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.text}`);
  process.exit(1);
}
console.log("PASS  every light card carries a hairline.");
