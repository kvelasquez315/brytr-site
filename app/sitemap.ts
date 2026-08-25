import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { systems } from "@/content/systems";
import { compares } from "@/content/compares";
import { cities } from "@/content/cities";
import { posts } from "@/content/blog";
import { site } from "@/content/site";

/* THE SITEMAP, for Search Console.
 *
 * `lastModified` IS THE ONE THING THIS WAS MISSING, and getting it right mattered more than adding
 * it. Google's guidance is that it uses lastmod when a site reports it consistently and accurately,
 * and ignores the whole signal when it does not - and the fastest way to make it inaccurate is the
 * obvious implementation, `new Date()`, which stamps all seventy-four URLs with the build time.
 * That tells Google every page on the site changed the moment anything was deployed, which is both
 * false and the exact pattern that gets lastmod discounted.
 *
 * There is no date in the content either: content/blog.ts has no published or updated field, so
 * there is nothing to read off the posts themselves.
 *
 * So the date comes from git - the last commit that touched the file a route is actually generated
 * from. That is a real answer to "when did this page last change": /pricing moves when
 * app/pricing/page.tsx moves, every service page moves when content/services.ts moves, and a
 * deploy that only changed the footer moves none of them.
 *
 * IT FAILS SOFT. A shallow clone, a source tarball, or any build container without git in it throws,
 * and then the route ships with no lastmod at all. Omitting the field is correct in that case:
 * Google treats a missing lastmod as "no information", and treats a wrong one as a reason to stop
 * believing the rest.
 */
const gitDates = new Map<string, Date | undefined>();
function lastModified(file: string): Date | undefined {
  if (gitDates.has(file)) return gitDates.get(file);
  let d: Date | undefined;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) {
      const parsed = new Date(iso);
      if (!Number.isNaN(parsed.getTime())) d = parsed;
    }
  } catch {
    /* no git, or the file is untracked. Ship without a date rather than with a false one. */
  }
  gitDates.set(file, d);
  return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (
    p: string,
    priority: number,
    source: string,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"
  ) => ({
    url: `${site.url}${p}`,
    priority,
    changeFrequency,
    lastModified: lastModified(source),
  });

  /* Every route names the file it is generated from. A dynamic route is generated from its content
   * file, not from its `[slug]/page.tsx` template - a change to the template is a change to all
   * eleven service pages, and a change to content/services.ts is too, so either is defensible;
   * the content file is the one that moves when the WORDS move, which is what a crawler cares
   * about. */
  return [
    at("/", 1.0, "components/sections/home.tsx", "weekly"),
    at("/free-design-consultation", 0.9, "app/free-design-consultation/page.tsx"),
    at("/pricing", 0.9, "app/pricing/page.tsx"),
    at("/services", 0.8, "app/services/page.tsx"),
    at("/lighting-systems", 0.8, "app/lighting-systems/page.tsx"),
    at("/compare", 0.8, "app/compare/page.tsx"),
    at("/service-areas", 0.8, "app/service-areas/page.tsx"),
    at("/blog", 0.6, "app/blog/page.tsx", "weekly"),
    at("/about", 0.6, "app/about/page.tsx"),
    at("/how-it-works", 0.6, "app/how-it-works/page.tsx"),
    at("/warranty", 0.6, "app/warranty/page.tsx"),
    at("/reviews", 0.6, "app/reviews/page.tsx"),
    at("/gallery", 0.6, "app/gallery/page.tsx"),
    at("/recent-projects", 0.6, "app/recent-projects/page.tsx"),
    at("/faq", 0.6, "content/faqs.ts"),
    at("/contact", 0.6, "app/contact/page.tsx"),
    ...services.map((s) => at(`/services/${s.slug}`, 0.8, "content/services.ts")),
    ...systems.map((s) => at(`/lighting-systems/${s.slug}`, 0.7, "content/systems.ts")),
    ...compares.map((c) => at(`/compare/${c.slug}`, 0.7, "content/compares.ts")),
    ...cities.map((c) => at(`/service-areas/${c.slug}`, 0.7, "content/cities.ts")),
    ...posts.map((p) => at(`/blog/${p.slug}`, 0.5, "content/blog.ts")),
    at("/privacy-policy", 0.2, "app/privacy-policy/page.tsx", "yearly"),
    at("/terms-of-service", 0.2, "app/terms-of-service/page.tsx", "yearly"),
    at("/accessibility", 0.2, "app/accessibility/page.tsx", "yearly"),
  ];
}
