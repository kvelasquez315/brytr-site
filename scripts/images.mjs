#!/usr/bin/env node
/* IMAGE REUSE AUDIT. Which photograph is on which page, and how often.
 *
 * A photography-led site fails quietly in one particular way: the same frame turns up as the hero
 * of six pages, and nobody notices because nobody opens six pages in a row. The reader does, and to
 * them it reads as one house and a thin portfolio - which for a company whose whole argument is
 * "here are the houses we have done" is the worst possible impression.
 *
 * It fails MOST quietly through fallbacks. A shared hero component with a default photo gives every
 * page that forgot to pass one the same picture, and nothing errors.
 *
 * WHAT IT REPORTS:
 *
 *   hero collisions   the priority image on each route - the one filling the hero - grouped by file.
 *                     Two pages sharing a hero is the defect worth fixing first.
 *   overuse           any file appearing on more than a handful of routes.
 *   per-page variety  how many DISTINCT photographs each page shows. A page down to one or two is
 *                     usually a template that never got its own set.
 *   unused            files in public/img that no page renders. Not a bug, but it is the shopping
 *                     list for fixing everything above - there is no point sourcing new photography
 *                     while good frames sit unused.
 *
 * next/image rewrites every src to /_next/image?url=<encoded>, so the real path is recovered from
 * the query rather than read off the attribute.
 *
 * Usage:  node scripts/images.mjs [port]
 */
import { readdirSync } from "node:fs";

const port = process.argv[2] ?? "3000";

const sitemap = await (await fetch(`http://localhost:${port}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

/* Recover the underlying file from whatever next/image emitted. */
const realSrc = (raw) => {
  if (!raw) return null;
  const m = raw.match(/[?&]url=([^&"]+)/);
  const p = m ? decodeURIComponent(m[1]) : raw;
  /* The wordmark is an <img> with priority on it in the header, so it is the first image and the
   * high-priority one on all 74 pages. It is a brand mark, not photography, and counting it made
   * the first run of this report say "74x hero collision" about the logo. */
  if (!p.startsWith("/img/") || /brytr-logo/.test(p)) return null;
  return p;
};

const pages = new Map();      // route -> Set(file)
const usedBy = new Map();     // file  -> Set(route)
const heroes = new Map();     // file  -> [routes]  (priority image only)

for (const route of routes) {
  const html = await (await fetch(`http://localhost:${port}${route}`)).text();
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);

  const files = new Set();
  for (const tag of imgs) {
    const f = realSrc(tag.match(/\ssrc="([^"]+)"/)?.[1]);
    if (f) files.add(f);
  }
  pages.set(route, files);
  for (const f of files) {
    if (!usedBy.has(f)) usedBy.set(f, new Set());
    usedBy.get(f).add(route);
  }

  /* The hero is the one next/image marks priority - it emits fetchpriority="high" for it. */
  const heroTag = imgs.find((t) => /fetchpriority="high"/.test(t)) ?? imgs[0];
  const hero = realSrc(heroTag?.match(/\ssrc="([^"]+)"/)?.[1]);
  if (hero) {
    if (!heroes.has(hero)) heroes.set(hero, []);
    heroes.get(hero).push(route);
  }
}

const collisions = [...heroes.entries()].filter(([, r]) => r.length > 1).sort((a, b) => b[1].length - a[1].length);
console.log(`\n  HERO COLLISIONS — the same photograph opening more than one page`);
console.log(`  ${"─".repeat(92)}`);
if (!collisions.length) console.log("    none");
for (const [file, rs] of collisions) {
  console.log(`  ${String(rs.length).padStart(3)}x  ${file}`);
  console.log(`        ${rs.slice(0, 10).join(", ")}${rs.length > 10 ? ` +${rs.length - 10} more` : ""}`);
}

const overused = [...usedBy.entries()].filter(([, r]) => r.size > 6).sort((a, b) => b[1].size - a[1].size);
console.log(`\n  MOST-REUSED FILES (on more than 6 routes)`);
console.log(`  ${"─".repeat(92)}`);
if (!overused.length) console.log("    none");
for (const [file, rs] of overused.slice(0, 12)) console.log(`  ${String(rs.size).padStart(3)} routes  ${file}`);

const thin = [...pages.entries()].filter(([, f]) => f.size <= 2).sort((a, b) => a[1].size - b[1].size);
console.log(`\n  PAGES SHOWING 2 OR FEWER DISTINCT PHOTOGRAPHS`);
console.log(`  ${"─".repeat(92)}`);
if (!thin.length) console.log("    none");
for (const [route, f] of thin.slice(0, 14)) console.log(`  ${String(f.size)}  ${route}`);
if (thin.length > 14) console.log(`     ...and ${thin.length - 14} more`);

const onDisk = readdirSync("public/img").filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((f) => `/img/${f}`);
const unused = onDisk.filter((f) => !usedBy.has(f));
console.log(`\n  LIBRARY`);
console.log(`  ${"─".repeat(92)}`);
console.log(`    files in public/img   ${onDisk.length}`);
console.log(`    rendered somewhere    ${usedBy.size}`);
console.log(`    never rendered        ${unused.length}`);
if (unused.length) console.log(`      ${unused.slice(0, 18).join("  ")}${unused.length > 18 ? ` +${unused.length - 18}` : ""}`);
/* EXIT CODE. Two hard failures: any two pages opening on the same photograph, and any page that is
 * not one of the three legal pages showing fewer than three. The legal pages are type-only by
 * design - see the note in PageHero - so they are exempt rather than special-cased away. */
const LEGAL = new Set(["/privacy-policy", "/terms-of-service", "/accessibility"]);
const starved = [...pages.entries()].filter(([r, f]) => !LEGAL.has(r) && f.size < 3);
console.log("");
if (collisions.length || starved.length) {
  console.error(
    `FAILED  ${collisions.length} hero collision(s), ${starved.length} page(s) under three photographs.`
  );
  for (const [r, f] of starved) console.error(`        ${r} — ${f.size}`);
  process.exit(1);
}
console.log("  PASS  no two pages share a hero, and every content page shows three or more.");
console.log("");
