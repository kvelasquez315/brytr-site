import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/content/services";
import { systemBySlug } from "@/content/systems";
import { serviceFaqsFor } from "@/content/faqs";
import { iconMap } from "@/content/icon-map";
import { metroCities } from "@/content/cities";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { Photo, photoExists } from "@/components/ui/photo";
import { Elevation } from "@/components/sections/elevation";
import {
  PageHero, PageCta, BandCta, SpecTable, CityTiles, SectionHead, Check, TextLink,
} from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, serviceSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.lede,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

const compareRows = [
  { spec: "First year cost", a: "Higher, once", b: "Lower, every year" },
  { spec: "Ten year cost", a: "One install", b: "Ten rentals or ten purchases" },
  { spec: "Ladder time", a: "None, ever", b: "Twice a year, in ice" },
  { spec: "January takedown", a: "Nothing to take down", b: "A weekend you will not enjoy" },
  { spec: "Color options", a: "Every color, per night", b: "Whatever you bought" },
  { spec: "Storage", a: "None", b: "Boxes in the garage" },
  { spec: "Damage risk", a: "Sealed into fascia once", b: "New staples and clips annually" },
  { spec: "Resale appeal", a: "Reads as a building feature", b: "Neutral at best" },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const sys = s.system ? systemBySlug(s.system) : undefined;
  const faqs = serviceFaqsFor(s.name);
  const related = services.filter((r) => r.slug !== s.slug).slice(0, 4);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: s.name, href: `/services/${s.slug}` },
  ];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={serviceSchema(s.name, s.lede)} />
      <Jsonld data={faqSchema(faqs)} />

      <PageHero
        eyebrow={s.name}
        h1={s.h1}
        lede={s.lede}
        trail={trail}
        footnote={
          <>
            Installed once by our own crews and verified in daylight and after dark before we leave.{" "}
            <Link href="/pricing" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">How pricing works</Link>.
          </>
        }
        stats={[["1 day", "typical install"], ["18", "cities served"], ["2 tiers", "premium and value"]]}
      />

      {/* 2 — answer block + quick facts · bone */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <SectionHead title={`What ${s.name} means, in plain terms.`} />
            <div className="prose-body mt-6 space-y-4 text-lg text-foreground">
              <p>{s.lede}</p>
              <p className="text-base text-muted-foreground">
                It is installed once, by our own W2 crew, and it stays on the house. There is nothing
                to hang in November and nothing to take down in January. Every run is verified in
                daylight and again after dark before we leave the property.
              </p>
            </div>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {s.includes.map((i) => <Check key={i}>{i}</Check>)}
            </ul>
          </div>
          <dl className="h-fit rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
            <p className="label text-2xs uppercase tracking-[0.14em] text-muted-foreground">Quick facts</p>
            {[
              ["Install time", "One day, most homes"],
              ["Season", "Year round, including winter"],
              ["Warranty", "Manufacturer plus our workmanship"],
              ["Pricing basis", "Linear foot plus complexity"],
              ["Roof types", "Shingle, metal, tile, flat"],
              ["Service area", "18 cities, Omaha to Lincoln"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border py-3.5 last:border-0">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="u text-right text-sm font-medium text-foreground">{v}</dd>
              </div>
            ))}
            <div className="mt-5"><TextLink href="/pricing">See pricing and financing</TextLink></div>
          </dl>
        </div>
      </section>

      {/* 3 — what is included · bone-deep */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="What is included"
            title="Everything in the written quote."
            lede="No line items appear on install day that were not on the quote you signed."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Design", "We walk the property after dark and design to what you actually want lit, not to a package."],
              ["Materials", "Extruded aluminum channel color matched to your fascia, addressable LEDs, sealed terminations."],
              ["Install", "Our own crew. Fastened into fascia and sealed, never through shingles. Mitered at every corner."],
              ["Controls", "Controller sited and commissioned, app set up on your phone, scenes built with you."],
              ["Verification", "Daylight sightline check from the curb, then every scene walked with you after dark."],
              ["Aftercare", "One number to call. We hold the workmanship warranty alongside the manufacturer."],
            ].map(([h, p], i) => (
              <article key={h} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <p className="label text-2xs uppercase tracking-[0.14em] text-accent-ink">Step {i + 1}</p>
                <h3 className="mt-2 text-lg text-foreground">{h}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{p}</p>
              </article>
            ))}
          </div>
          {sys && (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
              <div className="min-w-0 flex-1">
                <p className="label text-2xs uppercase tracking-[0.14em] text-accent-ink">Matching system</p>
                <p className="mt-1 font-display text-lg font-bold text-foreground">{sys.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{sys.short}</p>
              </div>
              <TextLink href={`/lighting-systems/${sys.slug}`}>See the system</TextLink>
            </div>
          )}
        </div>
      </section>

      {/* 4 — full-bleed drawn band · breather between dense sections */}
      <section className="bg-primary">
        <div className="shell py-12">
          {photoExists(s.photo) ? (
            <Photo slot={s.photo!} sizes="100vw" />
          ) : (
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_20rem]">
              <div className="overflow-hidden rounded-lg ring-1 ring-on-dark/12">
                <Elevation night massing="wing" lit={{ hex: "#f5c518", label: "warm white" }} className="block w-full" />
              </div>
              <div>
                <p className="eyebrow eyebrow--on-dark">Measured elevation</p>
                <p className="mt-4 text-on-dark-muted">
                  This is how a run is drawn before anything is fastened to your house: eave line,
                  channel position, zone breaks and linear feet.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5 — comparison table · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="The comparison"
            title="Permanent versus doing it again every year."
            lede="This is the calculation almost nobody runs before they call, and it is the one that decides it."
          />
          <div className="mt-10">
            <SpecTable
              onDark={false}
              caption="Permanent lighting compared with hanging lights every season"
              rows={compareRows}
              headA="Permanent"
              headB="Hung each season"
              highlightA
            />
          </div>
        </div>
      </section>

      {/* 6 — related services · charcoal */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead onDark title="What people usually add." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => {
              const I = iconMap[r.icon];
              return (
                <Link key={r.slug} href={`/services/${r.slug}`} className="flex flex-col rounded-lg bg-primary p-5 ring-1 ring-on-dark/10 transition-all duration-[--dur-base] hover:-translate-y-0.5 hover:ring-accent/40">
                  <span className="channel-tile mb-4" aria-hidden><I className="size-7" /></span>
                  <h3 className="text-lg text-on-dark">{r.name}</h3>
                  <p className="mt-2 text-sm text-on-dark-muted">{r.short}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {r.includes.slice(0, 2).map((x) => <Check key={x} onDark>{x}</Check>)}
                  </ul>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 — city tiles · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead title={`${s.name}, across 18 cities.`} />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>

      {/* 8 — FAQ · bone-deep */}
      <section className="section bg-muted">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <SectionHead eyebrow="Questions" title={`${s.name}: the eight we get most.`} />
            <div className="mt-8"><Faq items={faqs} /></div>
          </div>
          <aside className="h-fit rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
            <h3 className="text-xl text-on-dark">Nearest crews</h3>
            <ul className="mt-4 space-y-2.5">
              {metroCities.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="flex justify-between text-sm text-on-dark-muted hover:text-accent">
                    <span>{c.name}</span><span className="u">{c.drive}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-on-dark/12 pt-5"><TextLink onDark href="/service-areas">All service areas</TextLink></div>
          </aside>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
