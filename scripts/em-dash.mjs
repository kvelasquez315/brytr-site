/* NO EM DASHES IN ANYTHING A VISITOR READS. A standing client rule, enforced the way the brand
 * lock is enforced: a gate, not a habit. Rules that live only in a chat log come back.
 *
 * THE WHOLE DIFFICULTY IS TELLING COPY FROM COMMENT. This codebase carries more prose in its
 * comments than on its pages, and those comments are full of em dashes. A flat grep reports 336
 * hits, and almost every one of them is a note to whoever reads the file next, which no browser
 * renders. So this walks each file as a character stream and tracks what it is inside - a line
 * comment, a block comment, a quoted string, a template literal - and reports a dash only when it
 * is NOT inside a comment.
 *
 * It catches three spellings: the literal character, the HTML entity, and the JS escape.
 *
 * CSS is scanned too, for `content:` strings. Markdown is not - the .md files here are project
 * documentation, not pages.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "content", "lib"];
const CODE = /\.(ts|tsx|js|mjs)$/;
const STYLE = /\.css$/;
const BACKSLASH = String.fromCharCode(92);

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) {
      if (e !== "node_modules") walk(p, out);
    } else out.push(p);
  }
  return out;
};

/* Blank out every comment in place, so line numbers stay honest. */
function stripComments(src, css = false) {
  const out = src.split("");
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const d = src[i + 1];
    if (c === "/" && d === "*") {
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] !== "\n") out[i] = " ";
        i++;
      }
      if (i < n) out[i] = " ";
      if (i + 1 < n) out[i + 1] = " ";
      i += 2;
      continue;
    }
    if (!css && c === "/" && d === "/") {
      while (i < n && src[i] !== "\n") {
        out[i] = " ";
        i++;
      }
      continue;
    }
    /* Skip string bodies wholesale. We are not trying to find dashes inside them here - we want
     * them REPORTED - so stepping over the quotes just stops a `//` inside a URL from being read
     * as the start of a comment and blanking the rest of the line. */
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      while (i < n && src[i] !== q) {
        if (src[i] === BACKSLASH) i++;
        i++;
      }
      i++;
      continue;
    }
    i++;
  }
  return out.join("");
}

const NEEDLES = [
  ["—", "em dash"],
  ["&mdash;", "&mdash; entity"],
  [BACKSLASH + "u2014", "unicode escape"],
];

const hits = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const isCss = STYLE.test(file);
    if (!CODE.test(file) && !isCss) continue;
    const src = readFileSync(file, "utf8");
    if (!NEEDLES.some(([s]) => src.includes(s))) continue;
    const bare = stripComments(src, isCss);
    bare.split("\n").forEach((text, idx) => {
      for (const [needle, label] of NEEDLES) {
        if (!text.includes(needle)) continue;
        hits.push({
          file: relative(".", file).split(BACKSLASH).join("/"),
          line: idx + 1,
          label,
          text: text.trim().slice(0, 140),
        });
      }
    });
  }
}

if (hits.length) {
  console.error(`FAIL  ${hits.length} em dash(es) in rendered copy. The rule is none, anywhere on the site.`);
  for (const h of hits) console.error(`  ${h.file}:${h.line}  [${h.label}]  ${h.text}`);
  process.exit(1);
}
console.log("PASS  no em dashes in rendered copy.");
