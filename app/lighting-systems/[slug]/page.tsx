import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, systemBySlug } from "@/content/systems";
import { detailForSystem } from "@/content/system-detail";
import { compares } from "@/content/compares";
import { serviceFaqsFor } from "@/content/faqs";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { PageHero, PageCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";

/* ONE TEMPLATE, EIGHT HARDWARE PAGES — WAVE 3 of the page-by-page pass.
 *
 * What every one of the eight used to carry:
 *   · the SAME drawn elevation in the hero aside, rotating through three massings, and it
 *     took a hex value as a prop — the one thing the brand lock forbids outside globals.css
 *   · the same three cost drivers ("home size / story count / run complexity"), which is
 *     /pricing's arithmetic printed a ninth time
 *   · `priceFrom` set at 3.2rem, which on six of the eight pages rendered the words
 *     "Signature add-on" as if they were a price
 *   · Product JSON-LD carrying the BUSINESS's aggregateRating — 5.0 from 196 Google reviews
 *     attached to a product, which is not what those reviews are of
 *   · the other seven systems as seven identical cards at the bottom of all eight pages
 *   · two closers
 *
 * What differs now comes from content/systems.ts (already real and already distinct) plus
 * content/system-detail.ts, which adds the three things the template was missing: the
 * photograph that belongs to this system, where it sits in the lineup, and WHERE WE WOULD
 * NOT QUOTE IT. That last one is the section a single-brand dealer cannot publish, and it
 * is the reason the two-tier claim on the rest of the site means anything.
 *
 * Archetype: spec hero (photograph + the top specs, no form) → the spec sheet in full →
 * what it does well facing where it falls short → where it sits → head to head where one
 * exists → questions. Closer: the form, because the hero carries specs instead.
 */

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = systemBySlug(slug);
  if (!s) return {};
  return { title: s.title, description: s.lede.slice(0, 155), alternates: { canonical: `/lighting-systems/${s.slug}` } };
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = systemBySlug(slug);
  if (!s) notFound();
  const d = detailForSystem(s.slug);
  /* serviceFaqsFor opens with "How long does ${name} take to install?", answered "most
   * residential jobs are a single day". On a component or the app that is asking the wrong
   * question and answering it with the whole job's duration, so those pages get their own
   * first question and keep the rest. */
  const generic = serviceFaqsFor(s.name);
  const partish = s.tier === "Component" || s.tier === "Control";
  /* See SystemDetail.against — Basic's sheet is only readable next to Signature's numbers. */
  const against = d?.against ? systems.find((x) => x.slug === d.against) : undefined;
  const faqs = partish
    ? [
        {
          q: `Is ${s.name} quoted separately?`,
          a: "No. It is part of the tier it belongs to, measured with the rest of the house, and it appears on the same written quote rather than as an add-on afterwards.",
        },
        ...generic.slice(1),
      ]
    : generic;
  const rel = compares.find((c) => c.a.includes(s.name.split(" ")[0]) || c.b.includes(s.name.split(" ")[0]));
  const alsoSee = (d?.alsoSee ?? [])
    .map((sl) => systems.find((o) => o.slug === sl))
    .filter((o): o is (typeof systems)[number] => !!o && o.slug !== s.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Lighting systems", href: "/lighting-systems" },
    { name: s.name, href: `/lighting-systems/${s.slug}` },
  ];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(faqs)} />
      {/* Product, with no aggregateRating. The 5.0 belongs to the business on Google and is
        * not a rating of this product, so attaching it here would be a misrepresentation
        * dressed as markup. */}
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: s.name,
          description: s.lede,
          brand: { "@type": "Brand", name: s.maker },
        }}
      />

      {/* The hero used to carry a four-spec summary card in the right column. It is gone,
        * and not only because every hero now carries the form: the section immediately below
        * this one is the same specification at full width with its sources printed. The card
        * was the sheet, abbreviated, four inches above the sheet. */}
      <PageHero
        photo={d?.photo ?? "/img/channel-detail.jpg"}
        photoAlt={d?.photoAlt ?? `${s.name} on a finished Brytr install in the Omaha metro`}
        objectPosition={d?.objectPosition ?? "50% 50%"}
        eyebrow={s.maker}
        h1={s.h1}
        lede={s.lede}
        trail={trail}
        footnote={
          <>
            {d?.position ?? s.short}{" "}
            <Link href="/lighting-systems" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              How the whole lineup fits together
            </Link>.
          </>
        }
      />

      {/* ── THE SPEC SHEET, IN FULL ── */}
      <section className="section bg-background">
        <div className="shell grid items-start gap-10 lg:grid-cols-[62fr_38fr] lg:gap-14">
          <div>
            <SectionHead
              eyebrow="The sheet"
              title={`${s.name}, spec by spec.`}
              lede="Manufacturer figures where they are the manufacturer's, ours where they are ours, and nothing rounded up in either direction."
            />
            <div className="mt-9">
              <SpecTable
                onDark={false}
                caption={`Specifications for ${s.name}`}
                rows={
                  against
                    ? s.specs.map((x) => ({
                        spec: x.label,
                        a: x.value,
                        b: against.specs.find((y) => y.label === x.label)?.value ?? "—",
                      }))
                    : s.specs.map((x) => ({ spec: x.label, a: x.value }))
                }
                headA={against ? s.tier : "Value"}
                headB={against ? against.tier : undefined}
                /* Named the rated-life and weather rows specifically, which the component and
                 * control sheets do not carry — a footnote citing a row that is not on screen
                 * is a reader catching us out. */
                source={
                  d?.specSource
                    ? d.specSource
                    : s.tier === "Component" || s.tier === "Control"
                    ? "Manufacturer figures where the manufacturer publishes them. Anything about how it is installed, or how it behaves on a house we have wired, is ours."
                    : "Rated life and weather ratings are the manufacturer's published figures. Anything about how it is installed is ours."
                }
              />
            </div>
          </div>

          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label text-accent">How this one is priced</p>
            <h3 className="mt-3 font-display text-xl font-bold text-on-dark">
              {s.tier === "Component" || s.tier === "Control"
                ? "Not priced on its own."
                : "By the foot, not by the package."}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-on-dark-muted">
              {s.tier === "Control"
                ? "The app and the controller are part of every install rather than a line item. There is no subscription and nothing to renew."
                : s.tier === "Component"
                ? "This is hardware inside a quote rather than a product you buy from us. What you are quoted is the tier it belongs to, measured on your own roofline."
                : "Linear feet of roofline against a per-foot rate for the tier, then corners, zones and anything added on the same visit. One number for the whole scope, in writing, before we schedule."}
            </p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/pricing">How the number is built</TextLink>
            </div>
            <div className="mt-7 border-t border-on-dark/12 pt-6">
              <p className="label text-on-dark-muted">What you are not paying for</p>
              <ul className="mt-4 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["No design fee", "The consultation, the design and the written quote are free, on either tier."],
                  ["No travel charge", "Anywhere inside the metro. Outstate runs are batched into route days at the same price."],
                  ["No subscription", "The app and the controller are part of the install. Nothing renews and nothing expires."],
                  ["No line on install day", "If it was not on the quote you signed, it is not on the invoice."],
                ].map(([h, p]) => (
                  <li key={h} className="py-3">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* This line used to print on all nine pages. On a component or the app it was
              * pitching a choice the page does not offer — a reader on /app-and-controls was
              * being told one of two tiers is wrong for their house by a page that sells
              * neither. */}
            <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">
              {s.tier === "Component" || s.tier === "Control"
                ? "It goes on whichever tier you end up on, and it is measured with the rest of the house rather than quoted on its own."
                : "Two tiers means one of them is wrong for your house. We will tell you which."}
            </p>
            <div className="mt-4">
              <TextLink onDark href="/free-design-consultation">Get it measured</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT DOES WELL, FACING WHERE IT DOES NOT ──
        * The exclusion is the point. Every one of the eight has one written for
        * it, including both of our own tiers. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow={s.ownTier ? "Our own tier, honestly" : "After installing it"}
            title={s.ownTier ? `Where ${s.tier} is right, and where it is not.` : `${s.name}: the honest read.`}
            lede={
              s.ownTier
                ? "We sell this one. Which is exactly why the right-hand column has to exist — a company with two tiers and no opinion about which house needs which is a company with one tier and a brochure."
                : "We install this hardware, so we have no reason to oversell it and none to trash it. Both columns are what we would tell you standing in your driveway."
            }
          />

          {/* NOT items-start. The two columns hold different numbers of rows — six wins against a
            * paragraph plus two limits on one system, two wins against the same on another — so with
            * items-start the shorter card simply stopped, leaving 680 x 267px of bare page below it
            * on jellyfish-lighting and similar holes on the rest of the nine.
            *
            * Both cards stretch to the row now and each closes with a line pinned to its own foot,
            * so the slack sits inside a card as padding rather than outside one as a hole. The left
            * card had no closing line at all, which is also why it was the short one. */}
          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
              <div className="border-b border-border bg-primary px-6 py-4">
                <p className="label flex items-center gap-3 text-on-dark">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  {s.ownTier ? "What you get" : "What it does well"}
                </p>
              </div>
              <ul className="divide-y divide-border">
                {s.wins.map((w) => (
                  <li key={w} className="px-6 py-4 text-[0.95rem] leading-relaxed text-foreground">{w}</li>
                ))}
              </ul>
              <p className="mt-auto border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                {s.ownTier
                  ? "Every line here is something we would repeat standing in your driveway, because we are the ones who have to come back to it."
                  : "We install this hardware, so none of this is a guess about somebody else's product."}
              </p>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-card ring-1 ring-border">
              <div className="border-b border-border px-6 py-4">
                {/* An open box, not the same standing bar in grey. Two columns badged
                  * identically and told apart by colour alone fails for anyone with a colour
                  * deficiency, and it spends the section marker on the negative column. Same
                  * fix as the Covered / Not covered pair on /warranty. */}
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block size-3 border-2 border-foreground/35" aria-hidden />
                  {d?.notFor.h ?? "Where it falls short"}
                </p>
              </div>
              {d?.notFor && (
                <p className="border-b border-border px-6 py-5 text-[0.95rem] leading-relaxed text-foreground">
                  {d.notFor.p}
                </p>
              )}
              {s.limits && (
                <ul className="divide-y divide-border">
                  {s.limits.map((l) => (
                    <li key={l} className="px-6 py-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {l}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-auto border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                {s.ownTier
                  ? "We would rather lose the upgrade than have you notice this in year two."
                  : "You would find all of this out anyway. We would rather you found it here."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE HARDWARE, INSTALLED ──
        * This is the page the client was looking at when he said the heroes were wrong, and it
        * has the same second problem: below the hero it is a spec sheet, a strengths-and-
        * weaknesses table and a positioning section, with no photograph of the thing anywhere.
        *
        * A specification is a promise about what a product will look like on a building. Three
        * frames of it on actual buildings is the only way to check that promise, and the seed is
        * the slug so the nine hardware pages do not carry the same three. */}
      <PhotoStrip
        eyebrow="On finished installs"
        /* Not "on three houses" — the heading counted the row of photographs directly beneath it,
          * which is the rule I keep breaking, this time on the template that makes nine pages. */
        title="The same hardware, on houses that are nothing like each other."
        lede="Specifications describe a part. These show what the part does to an elevation, which is the only question a homeowner is actually asking."
        shots={pick(`sys-${s.slug}`, 3)}
        cols={3}
        ground="background"
      />

      {/* ── WHERE IT SITS ──
        * Three chosen neighbors, in order, rather than the other seven sliced
        * off the array on all eight pages. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              eyebrow="Where it sits"
              title={
                s.ownTier
                  ? "One of two things that go on a house."
                  : s.tier === "Control"
                  ? "The layer over everything else."
                  : "Hardware inside a tier, not a tier."
              }
            />
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">{d?.position ?? s.short}</p>
            <ul className="mt-7 space-y-3">
              <Check onDark>Installed by our own crews on either tier</Check>
              <Check onDark>Named on the quote rather than implied</Check>
              <Check onDark>Manufacturer terms plus our workmanship coverage</Check>
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/lighting-systems">The whole lineup</TextLink>
              <TextLink onDark href="/warranty">What is covered</TextLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-raise ring-1 ring-on-dark/10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Read next
              </p>
              <p className="text-xs text-on-dark-muted">Chosen, in order</p>
            </div>
            <ul className="divide-y divide-on-dark/10">
              {alsoSee.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/lighting-systems/${o.slug}`}
                    className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-primary"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-display text-[1.05rem] font-bold text-on-dark group-hover:underline">
                        {o.name}
                      </span>
                      {/* Amber only on our own tiers. This printed COMPONENT in the brand
                        * accent next to "Jellyfish Lighting" — a third-party name wearing
                        * our colour. */}
                      <span
                        className={`u shrink-0 text-xs uppercase tracking-[0.08em] ${
                          o.ownTier ? "text-accent" : "text-on-dark-muted"
                        }`}
                      >
                        {o.tier}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-on-dark-muted">
                      {o.short}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── HEAD TO HEAD, WHERE ONE EXISTS ── */}
      {rel && (
        <section className="section bg-raise">
          <div className="shell">
            <SectionHead
              onDark
              eyebrow="Head to head"
              title={`${rel.a} against ${rel.b}.`}
              lede={rel.verdict}
            />
            <div className="mt-9">
              <SpecTable
                caption={`${rel.a} compared with ${rel.b}`}
                rows={rel.rows.slice(0, 6)}
                headA={rel.a}
                headB={rel.b}
              />
            </div>
            <div className="mt-7"><TextLink onDark href={`/compare/${rel.slug}`}>The full comparison</TextLink></div>
          </div>
        </section>
      )}

      {/* ── QUESTIONS ── */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="Questions" title={`${s.name}: what people ask.`} />
          {/* Two columns. This was one 82ch column in a 100rem shell, so the right ~570px of
            * the section was bare on all nine system pages, identically. */}
          <div className="mt-8 grid gap-x-14 lg:grid-cols-2">
            <Faq items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
            <Faq items={faqs.slice(Math.ceil(faqs.length / 2))} />
          </div>
        </div>
      </section>

      <PageCta omit={["/pricing"]} />
    </Shell>
  );
}
