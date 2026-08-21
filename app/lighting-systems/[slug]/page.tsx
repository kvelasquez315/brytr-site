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
  const faqs = serviceFaqsFor(s.name);
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

      <PageHero
        variant="spec"
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
              How the eight fit together
            </Link>.
          </>
        }
        aside={
          <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
              <p className="label flex items-center gap-3 text-foreground">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                {s.tier === "Control" ? "What it controls" : "The short spec"}
              </p>
              <p className="text-xs text-muted-foreground">{s.maker}</p>
            </div>
            <dl className="grid grid-cols-2 divide-x divide-y divide-border">
              {s.specs.slice(0, 4).map((sp) => (
                <div key={sp.label} className="px-5 py-4">
                  <dt className="label text-muted-foreground">{sp.label}</dt>
                  <dd className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-foreground">
                    {sp.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
              The full sheet is below, and the terms for whichever system you choose are printed on your
              quote rather than promised here.
            </p>
          </div>
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
                rows={s.specs.map((x) => ({ spec: x.label, a: x.value }))}
                headA="Value"
                source="Rated life and weather ratings are the manufacturer's published figures. Anything about how it is installed is ours."
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

            <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">
              Two tiers means one of them is wrong for your house. We will tell you which.
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

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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
            </div>

            <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border">
              <div className="border-b border-border px-6 py-4">
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block h-4 w-1 bg-foreground/25" aria-hidden />
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
              <p className="border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                {s.ownTier
                  ? "We would rather lose the upgrade than have you notice this in year two."
                  : "You would find all of this out anyway. We would rather you found it here."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHERE IT SITS ──
        * Three chosen neighbours, in order, rather than the other seven sliced
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
                      <span className="u shrink-0 text-xs uppercase tracking-[0.08em] text-accent">
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
          <div className="mt-8 max-w-[82ch]"><Faq items={faqs} /></div>
        </div>
      </section>

      <PageCta omit={["/pricing"]} />
    </Shell>
  );
}
