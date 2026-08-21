#!/usr/bin/env node
/* NO HEX IN A COMPONENT. THE BRAND LOCK IS THE WHOLE POINT.
 *
 * Every colour on this site is a token in app/globals.css or app/sections.css. That is what makes
 * it possible to change the brand in one file, and it is the difference between a design system
 * and a pile of components that happen to look similar.
 *
 * slopcheck already greps for inline hex, and it missed twenty-eight of them. They were inside
 * ternaries in SVG `fill` attributes and inside a Leaflet options object — `fill={night ? "#1d2836"
 * : "#e9e3d6"}` — which its pattern was not shaped for. The drawing component had a complete
 * twenty-five-value palette living inside it, invisible to the tooling and to anybody looking for
 * where the site's colours are defined.
 *
 * This is deliberately blunt: any six-digit or three-digit hex in a .ts or .tsx file fails, with no
 * pattern-matching cleverness to get wrong. Two escape hatches exist and both are legitimate:
 *
 *   - An SVG attribute takes `var(--token)` directly. Use it.
 *   - JavaScript APIs that need a colour VALUE (Leaflet's vector options) read the custom property
 *     off the document at runtime — see the note in service-leaflet.tsx.
 *
 * If a genuinely new case turns up, add the token to globals.css. Do not add an exemption here.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".next") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if ([".ts", ".tsx"].includes(extname(p))) out.push(p);
  }
  return out;
};

/* Word-boundary anchored so a hash in a URL fragment or an id does not trip it. */
const HEX = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/;

const problems = [];
for (const dir of ["app", "components", "content", "lib"]) {
  for (const file of walk(dir)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      /* A hex quoted inside a comment is documentation — the manifest and several components
       * explain WHICH token they mean by naming its value. That is worth keeping. */
      const code = line.replace(/\/\*.*?\*\//g, "").replace(/^\s*\*.*$/, "").replace(/\/\/.*$/, "");
      const m = HEX.exec(code);
      if (m) problems.push(`${file}:${i + 1}  ${m[0]}  ${line.trim().slice(0, 80)}`);
    });
  }
}

if (problems.length) {
  console.error(`\nFAIL  ${problems.length} hex value(s) outside the stylesheets:\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nAdd a token to app/globals.css and reference it. SVG attributes take var(--token) directly.\n"
  );
  process.exit(1);
}
console.log("PASS  no hex outside app/globals.css and app/sections.css.");
