import type { Metadata } from "next";
import Link from "next/link";
import { posts, categories } from "@/content/blog";
import { categoryNote, photoForPost } from "@/content/blog-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /blog — WAVE 6 of the page-by-page pass.
 *
 * What it was: no photograph, a hero stat row that counted the list underneath it ("12
 * guides"), and — the real defect — a row of category chips that LOOKED like filters and
 * were not. Static list items, the first one styled as active, nothing clickable, no state.
 * A control that does nothing is worse than no control, because the reader tries it. Then
 * eleven identical cards in a three-column grid.
 *
 * What it is now. The chips became real anchors, and the posts are grouped under the
 * categories they were written into rather than dumped in publication order. Each group gets
 * a line of framing, and the featured piece keeps the hero aside because "start here" is a
 * genuinely useful thing for a hub to say.
 *
 * Archetype: spec hero (photograph + the featured post as the panel) → jump rack → four
 * grouped sets in one section. Closer: the form.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Resources",
  description:
    "Twelve honest guides to permanent outdoor lighting: cost, warranties, HOA approval, DIY versus professional install, winter installs, and what actually fails.",
  alternates: { canonical: "/blog" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Resources", href: "/blog" }];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function BlogHub() {
  const [feat] = posts;
  const featPic = photoForPost(feat.slug);
  const grouped = categories.map((c) => ({
    category: c,
    note: categoryNote[c] ?? "",
    items: posts.filter((p) => p.category === c),
  }));

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        variant="spec"
        photo={featPic?.photo ?? "/img/christmas-detail.jpg"}
        photoAlt={featPic?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition="50% 48%"
        eyebrow="Resources"
        h1="Answers before you buy, including the ones that do not flatter us."
        lede="Written from installing and repairing this product rather than from a manufacturer's brochure. Nothing here is sponsored, nothing is a press release, and where our own premium system loses, it says so."
        trail={trail}
        aside={
          <Link
            href={`/blog/${feat.slug}`}
            className="group block overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
              <p className="label flex items-center gap-3 text-accent-ink">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Start here
              </p>
              <p className="u text-xs text-muted-foreground">{feat.read} read</p>
            </div>
            <div className="px-6 py-5">
              <p className="label text-muted-foreground">{feat.category}</p>
              <h2 className="mt-2 font-display text-[1.35rem] font-bold leading-snug text-foreground group-hover:underline">
                {feat.title}
              </h2>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">{feat.dek}</p>
            </div>
          </Link>
        }
      />

      {/* ── THE JUMP RACK ──
        * These used to be chips that looked like filters and did nothing. They
        * are anchors now, and each one says how many pieces are under it. */}
      <section className="bg-raise">
        <div className="shell py-10">
          <p className="label text-accent">Jump to</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {grouped.map((g) => (
              <li key={g.category}>
                <a
                  href={`#${slugify(g.category)}`}
                  className="inline-flex items-baseline gap-2.5 rounded-sm border border-on-dark/22 px-4 py-2.5 text-sm text-on-dark-muted transition-colors duration-[--dur-fast] hover:border-accent hover:text-on-dark"
                >
                  {g.category}
                  <span className="u text-xs text-accent">{g.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-on-dark-muted">
            Anchors, not filters. This rack scrolls away with the page — nothing on this site is pinned
            except the header.
          </p>
        </div>
      </section>

      {/* ── EVERYTHING, GROUPED ── */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="All of it"
            title="Grouped by what you are trying to decide."
            lede="Roughly the order the questions arrive in: whether to buy at all, what happens to the building, what the hardware and the terms actually are, and the parts that are only true here."
          />

          <div className="mt-10 space-y-12">
            {grouped.map((g) => (
              <div key={g.category} id={slugify(g.category)} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-accent pb-3">
                  <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold text-foreground">
                    {g.category}
                  </h3>
                  <p className="text-sm text-muted-foreground">{g.note}</p>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {g.items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="flex h-full flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5"
                      >
                        <h4 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                          {p.title}
                        </h4>
                        <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {p.dek}
                        </p>
                        <p className="u mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                          {p.read} read
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
            None of these are sponsored and none of them are manufacturer copy. Where we do not know
            something we say so, and the comparison pages list what we have not verified about each
            competitor.{" "}
            <Link
              href="/compare"
              className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
            >
              How we judged the brands
            </Link>.
          </p>
        </div>
      </section>

      <PageCta omit={["/compare"]} />
    </Shell>
  );
}
