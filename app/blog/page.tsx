import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts, categories } from "@/content/blog";
import { categoryNote, photoForPost, startHere } from "@/content/blog-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
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
    "Honest guides to permanent outdoor lighting in Omaha: cost, warranties, HOA approval, DIY versus professional install, winter installs, and what actually fails.",
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
        photo={featPic?.photo ?? "/img/christmas-detail.jpg"}
        photoAlt={featPic?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition="50% 48%"
        h1="Answers before you buy, including the ones that do not flatter us."
        lede="Written from installing this product rather than from a manufacturer's brochure. Nothing here is sponsored, nothing is a press release, and where our own premium system loses, it says so."
        trail={trail}
      />

      {/* ── START HERE ──
        * This was a card in the hero's right column, which is now the form on every page. It
        * reads better here anyway: at full width the featured piece gets its own photograph
        * beside it, and a reader who has just been told what this page is gets one obvious
        * way in before the twelve-item list. */}
      <section className="section bg-card">
        <div className="shell">
          <Link
            href={`/blog/${feat.slug}`}
            className="group grid overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border md:grid-cols-[42fr_58fr]"
          >
            {featPic ? (
              <div className="relative min-h-[15rem] md:min-h-[20rem]">
                <Image
                  src={featPic.photo}
                  alt={featPic.photoAlt}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: featPic.objectPosition ?? "50% 50%" }}
                />
              </div>
            ) : null}
            <div className="flex flex-col p-7 lg:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="label flex items-center gap-3 text-accent-ink">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Start here
                </p>
                <p className="u text-xs text-muted-foreground">{feat.read} read</p>
              </div>
              <p className="label mt-6 text-muted-foreground">{feat.category}</p>
              <h2 className="mt-2 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold leading-snug text-foreground group-hover:underline">
                {feat.title}
              </h2>
              <p className="mt-3.5 text-[1.05rem] leading-relaxed text-muted-foreground">
                {startHere[feat.slug] ?? feat.dek}
              </p>
              <p className="u mt-auto pt-7 text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4">
                Read it
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── THE JUMP RACK ──
        * These used to be chips that looked like filters and did nothing: static list
        * items, the first styled active, no state, nothing clickable. They are real
        * anchors now. They also used to carry a count of each group in amber, which is
        * the no-counting rule and a misuse of the accent in one span. */}
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
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-on-dark-muted">
            Anchors, not filters. This rack scrolls away with the page, and nothing on this site is pinned
            except the header.
          </p>
        </div>
      </section>

      {/* ── ONE ROW OF WORK, BETWEEN THE RACK AND THE LIST ──
        * This page is navigation: a feature, a jump rack and twelve rows. Navigation with no
        * pictures is a sitemap, and a reader who is not sure they want to read anything here
        * needs a reason to stay that is not another headline. */}
      <PhotoStrip
        title="Everything below is written from doing this."
        lede="Not sponsored, not manufacturer copy, and not written by somebody who has never been on a roof in February. These are installs by the people who wrote the guides."
        shots={pick("blog-index", 3)}
        cols={3}
        ground="muted"
      />

      {/* ── EVERYTHING, GROUPED ── */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Grouped by what you are trying to decide."
            lede="Roughly the order the questions arrive in: whether to buy at all, what happens to the building, what the hardware and the terms actually are, and the parts that are only true here."
          />

          <div className="mt-10 space-y-12">
            {grouped.map((g) => (
              <div key={g.category} id={slugify(g.category)} className="scroll-mt-28">
                {/* Note under the rule, not beside the heading. */}
                <div className="border-b-2 border-accent pb-3">
                  <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold text-foreground">
                    {g.category}
                  </h3>
                </div>
                <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">{g.note}</p>
                {/* TWO COLUMNS OF ROWS.
                  * Cards in a three-up grid left three of the four groups ending on a hole.
                  * Full-width rows fixed the holes and created a worse problem: a readable
                  * measure is about 80 characters, so every row used the left 800px of a
                  * 1400px container and left the rest bare. Two columns of rows is the answer
                  * to both — the width is used, the measure stays readable, and an odd group
                  * leaves half a short row rather than a third of a tall one. */}
                {/* CSS columns rather than a two-column grid. A grid flows left-to-right and
                  * fills rows, so a group with an odd number of articles left the last cell empty
                  * — measured at roughly 660 x 105px on "Install" and 660 x 130px on "Before you
                  * buy". Columns balance their own height instead, so an odd count means one
                  * column carries one extra row and there is no hole anywhere. */}
                <ul className="mt-5 sm:columns-2 sm:gap-x-14 [&>li]:break-inside-avoid">
                  {g.items.map((p) => (
                    <li key={p.slug} className="border-t border-border">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group block h-full px-1 py-5 transition-colors duration-[--dur-fast] hover:bg-muted"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <h4 className="font-display text-[1.05rem] font-bold leading-snug text-foreground group-hover:underline">
                            {p.title}
                          </h4>
                          <p className="u shrink-0 text-xs text-muted-foreground">{p.read}</p>
                        </div>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {p.dek}
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
