import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, systemBySlug } from "@/content/systems";
import { compares } from "@/content/compares";
import { serviceFaqsFor } from "@/content/faqs";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { Elevation } from "@/components/sections/elevation";
import { PageHero, PageCta, BandCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";

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
  const faqs = serviceFaqsFor(s.name);
  const rel = compares.find((c) => c.a.includes(s.name.split(" ")[0]) || c.b.includes(s.name.split(" ")[0]));
  const others = systems.filter((o) => o.slug !== s.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Lighting systems", href: "/lighting-systems" },
    { name: s.name, href: `/lighting-systems/${s.slug}` },
  ];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(faqs)} />
      <Jsonld data={{
        "@context": "https://schema.org", "@type": "Product", name: s.name,
        description: s.lede, brand: { "@type": "Brand", name: s.maker },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "177" },
      }} />

      <PageHero
        eyebrow={s.maker}
        h1={s.h1}
        lede={s.lede}
        trail={trail}
        footnote={
          <>
            We stock a premium and a value tier, so the recommendation is not decided before we arrive.{" "}
            <Link href="/compare" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">Compare all 10 brands</Link>.
          </>
        }
        aside={
          <div className="overflow-hidden rounded-lg bg-raise p-4 ring-1 ring-accent/15 shadow-[var(--shadow-dark)]">
            <div className="overflow-hidden rounded-md">
              <Elevation night massing={s.tier === "Basic" ? "ranch" : s.tier === "Component" ? "wing" : "gable"} lit={{ hex: "#f5c518", label: s.name }} className="block w-full" />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2">
              {s.specs.slice(0, 4).map((sp) => (
                <div key={sp.label} className="rounded-md bg-primary px-3 py-3">
                  <dt className="u text-2xs uppercase tracking-[0.12em] text-on-dark-muted">{sp.label}</dt>
                  <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-on-dark">{sp.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* 2 — cost answer · bone-deep */}
      <section className="section bg-muted">
        <div className="shell grid gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
          <div>
            <SectionHead title="Priced by the foot, not by the package." />
            <p className="u mt-7 text-[3.2rem] font-medium leading-none text-accent-ink">{s.priceFrom ?? s.specs.find((x) => x.label === "Price tier")?.value ?? "By quote"}</p>
            <p className="mt-3 text-sm text-muted-foreground">Per linear foot of roofline, adjusted for complexity.</p>
            <div className="mt-7"><TextLink href="/pricing">See full pricing and financing</TextLink></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Home size", "Linear feet of roofline is the single biggest driver of the number."],
              ["Story count", "A two story costs more per foot than a ranch because of access and time."],
              ["Run complexity", "Dormers, turrets, valleys and separate elevations each add mitered corners and zones."],
            ].map(([h, p]) => (
              <div key={h} className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
                <h3 className="text-base text-foreground">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — specs · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="The specs" title={`${s.name} in full.`} />
          <div className="mt-10">
            <SpecTable onDark={false} caption={`Specifications for ${s.name}`} rows={s.specs.map((x) => ({ spec: x.label, a: x.value }))} headA="Value" />
          </div>
        </div>
      </section>

      {/* 4 — honest review, or what's included for our own tiers · primary */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow={s.ownTier ? "What is included" : "What we think after installing it"}
            title={s.ownTier ? `Everything in a ${s.name} install.` : `${s.name}: the honest read.`}
          />
          <div className={`mt-10 grid gap-5 ${s.limits ? "lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            <article className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="text-xl text-on-dark">{s.ownTier ? "What you get" : "What it does well"}</h3>
              <ul className="mt-5 space-y-3">{s.wins.map((w) => <Check key={w} onDark>{w}</Check>)}</ul>
            </article>
            {s.limits ? (
              <article className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <h3 className="text-xl text-on-dark">Where it falls short</h3>
                <ul className="mt-5 space-y-3">
                  {s.limits.map((l) => (
                    <li key={l} className="flex gap-2.5">
                      <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-on-dark-muted" fill="none" aria-hidden><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" /></svg>
                      <span className="text-[0.95rem] text-on-dark-muted">{l}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-on-dark-muted">
                  We sell this. We are still telling you the downsides, because you will find them anyway
                  and we would rather you find them here.
                </p>
              </article>
            ) : (
              [
                ["Design and commissioning", "Scene library built with you at handover, not left as a manual."],
                ["Verification", "Daylight sightline check plus a full scene walk after dark."],
              ].map(([h, p]) => (
                <article key={h} className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                  <h3 className="text-xl text-on-dark">{h}</h3>
                  <p className="mt-3 text-[0.95rem] text-on-dark-muted">{p}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5 — how it compares · charcoal */}
      {rel && (
        <section className="section bg-raise">
          <div className="shell">
            <SectionHead onDark eyebrow="Head to head" title={`${rel.a} versus ${rel.b}.`} lede={rel.verdict} />
            <div className="mt-9">
              <SpecTable caption={`${rel.a} compared with ${rel.b}`} rows={rel.rows.slice(0, 6)} headA={rel.a} headB={rel.b} />
            </div>
            <div className="mt-7"><TextLink onDark href={`/compare/${rel.slug}`}>See the full comparison</TextLink></div>
          </div>
        </section>
      )}

      {/* 6 — the other systems · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead title="Everything else we install." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/lighting-systems/${o.slug}`} className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <p className="u text-2xs uppercase tracking-[0.14em] text-accent-ink">{o.tier}</p>
                <h3 className="mt-1.5 text-base text-foreground">{o.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — FAQ · bone-deep */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Questions" title={`${s.name}, answered.`} />
          <div className="mt-8 max-w-[76ch]"><Faq items={faqs} /></div>
        </div>
      </section>

      <BandCta title={`Get a quote on ${s.name}.`} body="On-site measure, written number, no obligation." />
      <PageCta />
    </Shell>
  );
}
