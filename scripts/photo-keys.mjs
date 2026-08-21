#!/usr/bin/env node
/* EVERY PHOTOGRAPH KEY MUST RESOLVE.
 *
 * The photograph components take a manifest key and, by design, render nothing when the key has
 * no file behind it — that is what keeps an unshot slot from becoming a grey placeholder box.
 * The cost of that design is that a TYPO is indistinguishable from an unshot slot: it renders
 * nothing, quietly, and the build stays green.
 *
 * It happened immediately. Three pages were written against `crewRoofFascia` while the manifest
 * called that slot `crewWide`, so the crew photograph — the single most useful image on a
 * warranty page — was silently absent from three pages through a clean tsc, a clean build, a
 * clean contrast run and a clean slopcheck. Nothing in the toolchain could see it, because
 * nothing in the toolchain knows the difference between "no photograph yet" and "wrong name".
 *
 * This does. It reads the manifest, reads every key referenced anywhere else, and fails on any
 * key that is not in the manifest at all. A key that IS in the manifest with src: null is fine
 * and reported as a note — that is a real unshot slot, which is allowed.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (e === "node_modules" || e === ".next" || e === ".git") continue;
    if (statSync(p).isDirectory()) walk(p, out);
    else if ([".ts", ".tsx"].includes(extname(p))) out.push(p);
  }
  return out;
};

const manifest = readFileSync("content/images.ts", "utf8");
const declared = new Map();
for (const m of manifest.matchAll(/^ {2}([A-Za-z][A-Za-z0-9]*): \{ src: (null|")/gm)) {
  declared.set(m[1], m[2] !== "null");
}

/* Only the props that are documented as taking a manifest key. Matching every quoted string
 * would flag half the codebase. */
/* Manifest keys are camelCase and start lowercase. That single constraint is what makes this
 * safe to run over content files: `a:` and `b:` are also the two columns of every comparison row
 * in content/compares.ts, and those values are prose — "IP66", "Yes", "Premium", "Concealed".
 * Requiring a lowercase initial and no whitespace separates a key from a table cell without
 * needing to know which file it came from. */
const KEY_PROPS = /\b(?:photo|a|b)(?::\s*|=)"([a-z][A-Za-z0-9]{2,})"/g;
const NOT_KEYS = new Set([
  "left", "right", "muted", "raise", "primary", "background", "card",
  "full", "compact", "phone", "form", "spec", "map", "type", "photo", "quote",
  "true", "false", "small", "large", "none", "yes", "no", "either", "both",
]);

const problems = [];
for (const file of [...walk("app"), ...walk("components"), ...walk("content")]) {
  if (file.endsWith("content/images.ts")) continue;
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(KEY_PROPS)) {
    const key = m[1];
    if (NOT_KEYS.has(key)) continue;
    if (key.startsWith("/") || key.includes(".")) continue;
    if (!declared.has(key)) {
      const line = src.slice(0, m.index).split("\n").length;
      problems.push(`${file}:${line}  "${key}" is not a slot in content/images.ts`);
    }
  }
}

const unshot = [...declared].filter(([, hasSrc]) => !hasSrc).map(([k]) => k);
if (unshot.length) console.log(`NOTE  slots still awaiting a photograph: ${unshot.join(", ")}`);

if (problems.length) {
  console.error(`\nFAIL  ${problems.length} photograph key(s) do not resolve:\n`);
  for (const p of problems) console.error("  " + p);
  console.error("\nThese render nothing at all. Fix the name or add the slot.\n");
  process.exit(1);
}
console.log(`PASS  every photograph key resolves (${declared.size} slots declared).`);
