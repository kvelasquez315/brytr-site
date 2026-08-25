#!/usr/bin/env node
/* SITE-WIDE TYPOGRAPHY AUDIT, against the rules read off the client's own references.
 *
 * The home page was rebuilt over several rounds and the other twenty templates were not, so the
 * site is currently two designs wearing one set of tokens. Rolling the new one out by opening
 * twenty files and reading them is how you miss half of it; this renders every page and measures.
 *
 * THE RULES, and where each came from:
 *
 *   headline 3-9 words     trugreen.com, measured section by section: "The difference local pros
 *                          make", "Let's talk lawn", "Nobody makes lawn care easier than TruGreen".
 *   lede 12-24 words       same source. One or two sentences under a heading, never a block.
 *   one loud heading       at most one `display-hero` <h2> per page. Every page on this site was
 *                          setting four to six section headings at the same 54px as its own H1.
 *
 * Long headlines are a WARN rather than a fail: a few on this site are product claims that need
 * their length ("Warm white every night. Any colour when you want it."). Ledes over 24 are the ones
 * worth chasing, because that is where the wall-of-text feeling actually comes from.
 *
 * Usage:  node scripts/typography.mjs [port]
 */
const port = process.argv[2] ?? "3000";

/* Every route, from the sitemap the site already generates, so this cannot drift from the pages
 * that actually exist. */
const sitemap = await (await fetch(`http://localhost:${port}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p, i, a) => a.indexOf(p) === i);

const strip = (s) =>
  s.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => strip(s).split(" ").filter(Boolean).length;

let longHeads = 0, longLedes = 0, loudPages = 0, pagesOver = 0;
const rows = [];

for (const route of routes) {
  const res = await fetch(`http://localhost:${port}${route}`);
  if (!res.ok) { rows.push({ route, err: res.status }); continue; }
  const html = await res.text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;

  const heads = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1])).filter(Boolean);
  /* the lede is the <p> SectionHead emits, identified by the max-width it is the only user of */
  const ledes = [...main.matchAll(/max-w-\[62ch\][^>]*>([\s\S]*?)<\/p>/g)].map((m) => strip(m[1])).filter(Boolean);
  const loud = [...main.matchAll(/<h2[^>]*class="[^"]*display-hero[^"]*"/g)].length;

  const badHeads = heads.filter((h) => words(h) > 9);
  const badLedes = ledes.filter((l) => words(l) > 24);

  longHeads += badHeads.length;
  longLedes += badLedes.length;
  if (loud > 1) loudPages++;
  if (badHeads.length || badLedes.length || loud > 1) pagesOver++;

  rows.push({ route, heads: heads.length, ledes: ledes.length, loud, badHeads, badLedes });
}

console.log(`\n  TYPOGRAPHY ACROSS ${routes.length} PAGES`);
console.log(`  ${"─".repeat(94)}`);
for (const r of rows) {
  if (r.err) { console.log(`  ${r.route.padEnd(42)} HTTP ${r.err}`); continue; }
  const flags = [
    r.loud > 1 ? `${r.loud} loud h2` : "",
    r.badHeads.length ? `${r.badHeads.length} long head` : "",
    r.badLedes.length ? `${r.badLedes.length} long lede` : "",
  ].filter(Boolean).join(", ");
  if (!flags) continue;
  console.log(`  ${r.route.padEnd(42)} ${flags}`);
  for (const l of r.badLedes) console.log(`      lede ${String(words(l)).padStart(3)}w  ${l.slice(0, 70)}...`);
  for (const h of r.badHeads) console.log(`      head ${String(words(h)).padStart(3)}w  ${h.slice(0, 70)}`);
}

console.log(`\n  ${"─".repeat(94)}`);
console.log(`  pages with something over    ${pagesOver} of ${routes.length}`);
console.log(`  ledes over 24 words          ${longLedes}`);
console.log(`  headlines over 9 words       ${longHeads}`);
console.log(`  pages with >1 loud heading   ${loudPages}`);
console.log("");
