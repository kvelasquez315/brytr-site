#!/usr/bin/env node
/* VISIBLE WORD COUNT for one rendered page, and the section inventory under it.
 *
 * The home page redesign has a floor on it — the client wants 800+ words on / for SEO — and a
 * ceiling that is not a number but a feeling: "way too much text". Neither is checkable by
 * reading the JSX, because the copy is spread across a dozen components and half of it comes
 * out of content/*.ts. So this fetches the rendered page and counts what a reader actually sees.
 *
 * It counts <main> only. The header nav, the footer's forty-five links and the mobile call bar
 * are chrome that appears on all eighty-one pages; folding them into the number would let the
 * home page "pass" a wordcount floor on the strength of its own footer.
 *
 * Usage:  node scripts/wordcount.mjs [path] [port]
 */
const path = process.argv[2] ?? "/";
const port = process.argv[3] ?? "3000";

const res = await fetch(`http://localhost:${port}${path}`);
if (!res.ok) {
  console.error(`FAIL  ${path} returned ${res.status}`);
  process.exit(1);
}
const html = await res.text();

const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
if (!main) {
  console.error("FAIL  no <main> in the response");
  process.exit(1);
}

/* Strip what is not prose: inline scripts and styles first, then tags, then decode the few
 * entities this site actually emits, then collapse whitespace. */
const text = main
  .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&(?:nbsp|#160);/g, " ")
  .replace(/&(?:rarr|#8594);/g, " ")
  .replace(/&(?:amp|#38);/g, "&")
  .replace(/&(?:middot|#183);/g, " ")
  .replace(/&(?:rdquo|ldquo|#8221|#8220);/g, " ")
  .replace(/&[a-z]+;|&#\d+;/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const words = text.split(" ").filter((w) => /[a-z0-9]/i.test(w));

/* The inventory. These are the three counts the client's complaint was actually about:
 * how many bands there are, how many things claim to be a heading, and how many forms. */
const sections = [...main.matchAll(/<section\b/g)].length;
const h1 = [...main.matchAll(/<h1\b/g)].length;
const h2 = [...main.matchAll(/<h2\b/g)].length;
const h3 = [...main.matchAll(/<h3\b/g)].length;
const forms = [...main.matchAll(/<form\b/g)].length;
const fields = [...main.matchAll(/<(?:input|select|textarea)\b/g)].length;
const buttons = [...main.matchAll(/rounded-full/g)].length;

console.log(`\n  ${path}`);
console.log(`  ${"─".repeat(46)}`);
console.log(`  words in <main>   ${words.length}`);
console.log(`  sections          ${sections}`);
console.log(`  headings          ${h1} h1 · ${h2} h2 · ${h3} h3  (${h1 + h2 + h3} total)`);
console.log(`  forms             ${forms}  (${fields} fields)`);
console.log(`  pill elements     ${buttons}`);
console.log("");
