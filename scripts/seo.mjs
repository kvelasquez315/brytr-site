#!/usr/bin/env node
/* SEO AUDIT. Every route in the sitemap, checked against what actually renders.
 *
 * The point of doing it this way rather than reading the page files is that metadata on this site
 * comes from four places at once - the root layout's title template, each page's `metadata` export,
 * the content/*.ts entry behind a dynamic route, and the JSON-LD components in lib/schema.tsx. What
 * a crawler gets is the composition of all four, and the only honest way to check that is to fetch
 * it.
 *
 * WHAT IT CHECKS, and why each threshold:
 *
 *   title            present, and <= 60 characters. Google truncates the SERP link at roughly 580px,
 *                    which is about 60 characters at their rendering. Longer is not penalised, it is
 *                    just cut - so the tail is wasted rather than harmful.
 *   description      present, 110-165 characters. Under 110 leaves the snippet padded out by Google
 *                    with page text; over 165 is truncated.
 *   uniqueness       duplicate titles or descriptions across routes are the single most common
 *                    templated-site defect, and they make Google pick one page and ignore the rest.
 *   canonical        every page should declare its own URL, or parameterised variants (utm, gclid)
 *                    fragment the same page across the index.
 *   one h1           exactly one per page.
 *   BreadcrumbList   the JSON-LD, not just the visual trail. It is what produces the breadcrumb in
 *                    the search result instead of a bare URL.
 *   og:image         a share of any page with no image gets a bare link card.
 *
 * Usage:  node scripts/seo.mjs [port]
 */
const port = process.argv[2] ?? "3000";

const sitemapXml = await (await fetch(`http://localhost:${port}/sitemap.xml`)).text();
const routes = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const grab = (html, re) => html.match(re)?.[1]?.trim() ?? "";
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ");

const rows = [];
for (const route of routes) {
  const html = await (await fetch(`http://localhost:${port}${route}`)).text();
  const head = html.split("</head>")[0] ?? html;
  rows.push({
    route,
    title: decode(grab(head, /<title[^>]*>([\s\S]*?)<\/title>/)),
    desc: decode(grab(head, /<meta name="description" content="([^"]*)"/)),
    canonical: grab(head, /<link rel="canonical" href="([^"]*)"/),
    ogImage: grab(head, /<meta property="og:image" content="([^"]*)"/),
    ogTitle: grab(head, /<meta property="og:title" content="([^"]*)"/),
    h1: [...html.matchAll(/<h1\b/g)].length,
    crumb: /"@type":"BreadcrumbList"/.test(html),
    ld: [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]),
  });
}

const dupes = (key) => {
  const seen = new Map();
  for (const r of rows) {
    const v = r[key];
    if (!v) continue;
    if (!seen.has(v)) seen.set(v, []);
    seen.get(v).push(r.route);
  }
  return [...seen.entries()].filter(([, v]) => v.length > 1);
};

const problems = {
  "no title": rows.filter((r) => !r.title),
  "title over 60": rows.filter((r) => r.title.length > 60),
  "no description": rows.filter((r) => !r.desc),
  "description under 110": rows.filter((r) => r.desc && r.desc.length < 110),
  "description over 165": rows.filter((r) => r.desc.length > 165),
  "no canonical": rows.filter((r) => !r.canonical),
  "no og:image": rows.filter((r) => !r.ogImage),
  "h1 not exactly one": rows.filter((r) => r.h1 !== 1),
  "no BreadcrumbList": rows.filter((r) => !r.crumb && r.route !== "/"),
};

console.log(`\n  SEO ACROSS ${rows.length} ROUTES`);
console.log(`  ${"─".repeat(92)}`);
for (const [name, list] of Object.entries(problems)) {
  const mark = list.length ? "FAIL" : " ok ";
  console.log(`  ${mark}  ${name.padEnd(24)} ${list.length}`);
  for (const r of list.slice(0, 4)) {
    const detail =
      name.includes("title") ? `${r.title.length}c  ${r.title}` :
      name.includes("description") ? `${r.desc.length}c  ${r.desc.slice(0, 62)}...` :
      name.includes("h1") ? `${r.h1} h1` : "";
    console.log(`          ${r.route.padEnd(40)} ${detail}`);
  }
  if (list.length > 4) console.log(`          ...and ${list.length - 4} more`);
}

for (const [key, label] of [["title", "titles"], ["desc", "descriptions"]]) {
  const d = dupes(key);
  console.log(`  ${d.length ? "FAIL" : " ok "}  duplicate ${label.padEnd(14)} ${d.length}`);
  for (const [v, list] of d.slice(0, 3)) {
    console.log(`          "${v.slice(0, 54)}..."`);
    console.log(`            ${list.slice(0, 4).join(", ")}${list.length > 4 ? ` +${list.length - 4}` : ""}`);
  }
}

/* EXIT CODE, so this can gate a deploy rather than only inform one. Every check above is a hard
 * requirement - a missing canonical or a duplicate title is never acceptable - so any entry in any
 * bucket fails the run. */
const failed =
  Object.values(problems).reduce((n, l) => n + l.length, 0) +
  dupes("title").length +
  dupes("desc").length;

const schemaTypes = [...new Set(rows.flatMap((r) => r.ld))].sort();
console.log(`\n  structured data types in use: ${schemaTypes.join(", ") || "none"}`);
console.log("");
if (failed) {
  console.error(`FAILED  ${failed} SEO problem(s) across ${rows.length} routes.`);
  process.exit(1);
}
console.log("  PASS  every route has a unique title and description, a canonical, an og:image,");
console.log("        one h1, and breadcrumb markup.");
console.log("");
