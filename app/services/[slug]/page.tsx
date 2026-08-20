import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/content/services";
import { detailFor } from "@/content/service-detail";
import { systemBySlug } from "@/content/systems";
import { serviceFaqsFor } from "@/content/faqs";
import { iconMap } from "@/content/icon-map";
import { metroCities } from "@/content/cities";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { ServiceFigure } from "@/components/sections/service-figures";
import {
  PageHero, PageCta, SpecTable, SectionHead, Check, TextLink,
} from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, serviceSchema, faqSchema } from "@/lib/schema";

/* ONE TEMPLATE, ELEVEN PAGES — and it used to show that.
 *
 * Before this pass every one of the eleven service pages carried: the same six "Step 1…6"
 * cards with identical copy, the same Quick Facts table (including "Roof types: shingle,
 * metal, tile, flat" on the landscape page), the same permanent-versus-hanging comparison
 * table (on the hardscape page, where nobody hangs anything seasonally), the same drawn
 * elevation in the same slot, the same four related services from `slice(0, 4)`, and the
 * same eighteen city tiles. Eleven URLs, one page.
 *
 * Everything that should differ now comes from content/service-detail.ts:
 *   · the facts panel is written for the service, and is true of it
 *   · what is in the quote is that service's list, with no step numbers
 *   · the CENTREPIECE is unique to the service — the eave in section on roofline, beam
 *     angle against overhang depth on soffit, a wall in section on hardscape, the year as
 *     a calendar on Christmas, Saturday beside Sunday on gameday
 *   · the hanging-lights comparison only appears where it is an honest comparison
 *   · what people also look at is chosen, in order, not sliced off the array
 *   · the page closes on a photograph of that service, so eleven pages do not all show
 *     the same house
 *
 * Hero: the form (these pages take leads). Closer: the no-form variant, because two lead
 * forms on one page is the mistake the shared layer was carrying.
 */

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

/* The one comparison that recurs — but only on the pages where somebody genuinely has the
 * choice between installing this once and doing it again every year. */
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
  const d = detailFor(s.slug);
  const sys = s.system ? systemBySlug(s.system) : undefined;
  const faqs = serviceFaqsFor(s.name);
  const alsoSee = (d?.alsoSee ?? [])
    .map((sl) => services.find((r) => r.slug === sl))
    .filter((r): r is (typeof services)[number] => !!r && r.slug !== s.slug);
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
            Installed once by our own crews, and checked in daylight and after dark before we
            leave.{" "}
            <Link href="/pricing" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              How pricing works
            </Link>.
          </>
        }
      />

      {/* ── WHAT IT IS, AND THE FACTS THAT ONLY APPLY TO IT ─────────────── */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <SectionHead title={`What ${s.name.toLowerCase()} actually is.`} />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">{s.lede}</p>
              <p className="text-base text-muted-foreground">
                It is installed once, by our own crew, and it stays on the building. Nothing goes up
                in November and nothing comes down in January.
              </p>
            </div>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {s.includes.map((i) => <Check key={i}>{i}</Check>)}
            </ul>
          </div>

          <dl className="h-fit rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
            <p className="label text-muted-foreground">{s.name}, in short</p>
            {(d?.facts ?? []).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border py-3.5 last:border-0">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="u text-right text-sm font-medium text-foreground">{v}</dd>
              </div>
            ))}
            <div className="mt-5"><TextLink href="/pricing">See pricing and financing</TextLink></div>
          </dl>
        </div>
      </section>

      {/* ── THE CENTREPIECE ────────────────────────────────────────────────
        * One per service, and no two services share one. */}
      {d && (
        <section className="section bg-raise">
          <div className="shell">
            <ServiceFigure figure={d.figure} />
          </div>
        </section>
      )}

      {/* ── WHAT IS IN THE QUOTE ───────────────────────────────────────── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="What is included"
            title="Everything in the written quote."
            lede="Nothing appears on install day that was not on the quote you signed."
          />
          <ul className="mt-10 grid items-start gap-x-10 gap-y-6 lg:grid-cols-2">
            {(d?.included ?? []).map(([h, p]) => (
              <li key={h} className="border-t border-border pt-5">
                <h3 className="font-display text-lg font-bold text-foreground">{h}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ul>

          {sys && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-lg bg-primary px-6 py-5 shadow-[var(--shadow-dark)]">
              <div className="min-w-0 flex-1">
                <p className="label text-accent">The hardware under it</p>
                <p className="mt-1 font-display text-lg font-bold text-on-dark">{sys.name}</p>
                <p className="mt-1 text-sm text-on-dark-muted">{sys.short}</p>
              </div>
              <TextLink onDark href={`/lighting-systems/${sys.slug}`}>See the spec</TextLink>
            </div>
          )}
        </div>
      </section>

      {/* ── THE COMPARISON, WHERE IT IS HONEST ─────────────────────────── */}
      {d?.compare && (
        <section className="section bg-background">
          <div className="shell">
            <SectionHead
              eyebrow="The comparison"
              title="Installed once, against doing it again every year."
              lede="This is the calculation almost nobody runs before they call, and it is usually the one that decides it."
            />
            <div className="mt-10">
              <SpecTable
                onDark={false}
                caption="Permanent lighting compared with hanging lights every season"
                rows={compareRows}
                headA="Permanent"
                headB="Hung each season"
                highlightA
                source="Ladder time, storage and takedown are the parts customers tell us they underestimated."
              />
            </div>
          </div>
        </section>
      )}

      {/* ── THE PROOF SHOT ─────────────────────────────────────────────────
        * A real photograph of THIS service, so the eleven pages do not all
        * close on the same house. */}
      {d?.proofShot && (
        <section className="bg-primary">
          <div className="shell grid items-center gap-8 py-12 lg:grid-cols-[62fr_38fr] lg:gap-14">
            <figure className="overflow-hidden rounded-lg ring-1 ring-on-dark/12">
              <span className="relative block aspect-video">
                <Image
                  src={d.proofShot}
                  alt={`${s.name} on a completed Brytr install in the Omaha metro`}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </span>
            </figure>
            <div>
              <p className="eyebrow eyebrow--on-dark">Our own work</p>
              <p className="mt-4 text-lg leading-relaxed text-on-dark/90">{d.proofCaption}</p>
              <div className="mt-6"><TextLink onDark href="/gallery">See the full gallery</TextLink></div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT PEOPLE LOOK AT NEXT ───────────────────────────────────── */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead title="What people look at next." />
          <div className="mt-9 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
            <ul className="divide-y divide-border">
              {alsoSee.map((r) => {
                const I = iconMap[r.icon];
                return (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group flex items-center gap-4 px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                    >
                      <span className="channel-tile channel-tile--light !size-10 shrink-0" aria-hidden>
                        <I className="size-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                          {r.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">{r.short}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ── QUESTIONS ──────────────────────────────────────────────────── */}
      <section className="section bg-muted">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <SectionHead eyebrow="Questions" title={`${s.name}: what people ask before they book.`} />
            <div className="mt-8"><Faq items={faqs} /></div>
          </div>
          <aside className="h-fit rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
            <h3 className="text-xl text-on-dark">Nearest crews</h3>
            <p className="mt-2 text-sm text-on-dark-muted">Drive from our shop on C Street.</p>
            <ul className="mt-4 divide-y divide-on-dark/10 border-t border-on-dark/10">
              {metroCities.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="flex justify-between gap-4 py-2.5 text-sm text-on-dark-muted hover:text-accent">
                    <span>{c.name}</span><span className="u text-accent">{c.drive}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-on-dark/12 pt-4">
              <TextLink onDark href="/service-areas">Every town we drive to</TextLink>
            </div>
          </aside>
        </div>
      </section>

      <PageCta variant="phone" />
    </Shell>
  );
}
