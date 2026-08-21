import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, postBySlug } from "@/content/blog";
import { photoForPost, relatedByCategory } from "@/content/blog-detail";
import { services } from "@/content/services";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { iconMap } from "@/content/icon-map";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* ONE TEMPLATE, TWELVE POSTS — WAVE 6 of the page-by-page pass.
 *
 * The writing in content/blog.ts is real and each piece has its own argument. What the
 * template around it was doing wrong:
 *   · a flat colour band for a hero, with no photograph on any of the twelve
 *   · a "On this page" table of contents made of <span> elements with no ids to point at.
 *     A navigation control that cannot navigate is worse than none, because the reader
 *     tries it. The headings now carry ids and the entries are anchors.
 *   · "Related services" was `services.slice(0, 3)` — the same three rows on all twelve
 *   · "Read next" was `posts.slice(0, 3)` — the same three posts on all twelve
 *   · a form in the sidebar AND a form in the closer, which is two forms on a page whose
 *     job is to be read
 *
 * content/blog-detail.ts supplies the photograph per slug and the related services per
 * category, so a post about install method points at the install pages and a post about
 * Omaha covenants points at the two things Omaha books.
 *
 * Archetype: home hero (photograph + the form, since a reader who finishes a 7 minute piece
 * is the most qualified visitor on the site) → anchored TOC beside the article → same-
 * category reading. Closer: the phone band, because the hero already carries the form.
 */

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return { title: p.title, description: p.dek.slice(0, 155), alternates: { canonical: `/blog/${p.slug}` } };
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const pic = photoForPost(p.slug);

  /* Same category first, then anything else, so "read next" is a related read rather than
   * the first three entries in the array on all twelve pages. */
  const sameCategory = posts.filter((o) => o.slug !== p.slug && o.category === p.category);
  const others = posts.filter((o) => o.slug !== p.slug && o.category !== p.category);
  const next = [...sameCategory, ...others].slice(0, 3);

  const related = (relatedByCategory[p.category] ?? [])
    .map((sl) => services.find((s) => s.slug === sl))
    .filter((s): s is (typeof services)[number] => !!s);

  const trail = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/blog" },
    { name: p.title, href: `/blog/${p.slug}` },
  ];
  const toc = p.body.filter((b) => b.h).map((b) => b.h!) as string[];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.h1,
          description: p.dek,
          author: { "@type": "Organization", name: "Brytr Co" },
          publisher: { "@type": "Organization", name: "Brytr Co" },
        }}
      />

      <PageHero
        photo={pic?.photo ?? "/img/hero-bg.jpg"}
        photoAlt={pic?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition={pic?.objectPosition ?? "50% 50%"}
        eyebrow={`${p.category} · ${p.read} read`}
        h1={p.h1}
        lede={p.dek}
        trail={trail}
        footnote={
          <>
            Written by Brytr Co from installing and repairing this product in the Omaha metro. Not
            sponsored and not manufacturer copy.{" "}
            <Link href="/blog" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              The other eleven
            </Link>.
          </>
        }
      />

      {/* ── THE ARTICLE ──
        * TOC on the left with real anchors, the piece in the middle, and one
        * panel on the right that differs by category. No second form. */}
      <div className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)_18rem] lg:gap-12">
          <nav aria-label="On this page" className="h-fit">
            <p className="label text-muted-foreground">On this page</p>
            <ul className="mt-4 space-y-2.5 border-l border-border pl-4">
              {toc.map((h) => (
                <li key={h}>
                  <a
                    href={`#${anchor(h)}`}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {h}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Plain anchors. This column scrolls away with the page rather than following you down it.
            </p>
          </nav>

          <article className="max-w-[68ch]">
            <p className="text-lg leading-relaxed text-foreground">
              {p.body[0]?.p}{" "}
              <Link
                href={p.links.href}
                className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
              >
                {p.links.label}
              </Link>.
            </p>
            {p.body.slice(1).map((b, i) => (
              <div key={i}>
                {b.h && (
                  <h2
                    id={anchor(b.h)}
                    className="mt-10 scroll-mt-28 text-[clamp(1.35rem,2.4vw,1.6rem)] text-foreground"
                  >
                    {b.h}
                  </h2>
                )}
                {b.p && <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">{b.p}</p>}
                {b.list && (
                  <ul className="mt-4 space-y-2.5">
                    {b.list.map((li) => (
                      <li key={li} className="flex gap-3">
                        <svg viewBox="0 0 16 16" className="mt-1.5 size-3.5 shrink-0 text-accent" fill="none" aria-hidden>
                          <rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" />
                        </svg>
                        <span className="text-[1.05rem] leading-relaxed text-muted-foreground">{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {b.callout && (
                  <aside className="mt-8 rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
                    <p className="label text-accent">Worth pulling out</p>
                    <p className="mt-2.5 font-display text-lg font-bold leading-snug text-on-dark">
                      {b.callout}
                    </p>
                  </aside>
                )}
              </div>
            ))}
            <div className="mt-10 border-t border-border pt-7">
              <TextLink href={p.links.href}>{p.links.label}</TextLink>
            </div>
          </article>

          <aside className="h-fit space-y-5">
            <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
              <div className="border-b border-border px-6 py-4">
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Pages this touches
                </p>
              </div>
              <ul className="divide-y divide-border">
                {related.map((s) => {
                  const I = iconMap[s.icon];
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3 px-5 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                      >
                        <span className="channel-tile channel-tile--light !size-10 shrink-0" aria-hidden>
                          <I className="size-6" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-foreground group-hover:underline">
                            {s.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-border bg-muted px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                Chosen for the {p.category.toLowerCase()} category rather than sliced off the front of the
                service list.
              </p>
            </div>

            <div className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
              <p className="label text-accent">If this changed your mind</p>
              <p className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">
                The consultation is an hour after dark, costs nothing, and you keep the written quote
                whether or not you ever ring us again.
              </p>
              <div className="mt-5 border-t border-on-dark/12 pt-4">
                <TextLink onDark href="/free-design-consultation">What the hour looks like</TextLink>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── READ NEXT, SAME CATEGORY FIRST ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Read next"
            title={`More on ${p.category.toLowerCase()}.`}
            lede="Same category first, then whatever else is closest. Not the first three entries in the list."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {next.map((o) => (
              <Link
                key={o.slug}
                href={`/blog/${o.slug}`}
                className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5"
              >
                <p className="label text-accent-ink">{o.category}</p>
                <h3 className="mt-2 font-display text-[1.05rem] font-bold leading-snug text-foreground">
                  {o.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {o.dek.split(". ")[0].replace(/\.+$/, "")}.
                </p>
                <p className="u mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  {o.read} read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta variant="phone" panelLink={{ href: "/blog", label: "The rest of the guides" }} />
    </Shell>
  );
}
