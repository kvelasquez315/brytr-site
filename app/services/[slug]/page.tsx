import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/content/services";
import { images } from "@/content/images";
import { detailFor } from "@/content/service-detail";
import { systemBySlug } from "@/content/systems";
import { serviceFaqsFor } from "@/content/faqs";
import { PhotoStrip, PhotoPair } from "@/components/sections/photo-parts";
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
 *   · the CENTERPIECE is unique to the service — the eave in section on roofline, beam
 *     angle against overhang depth on soffit, a wall in section on hardscape, the year as
 *     a calendar on Christmas, Saturday beside Sunday on gameday
 *   · the hanging-lights comparison only appears where it is an honest comparison
 *   · what people also look at is chosen, in order, not sliced off the array
 *   · the page closes on a photograph of that service, so eleven pages do not all show
 *     the same house
 *
 * Hero: the home page's, on this service's own photograph. Closer: the no-form variant,
 * because the hero already carries the form and two lead forms on one page is the mistake
 * the shared layer was carrying.
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

  /* The hero photograph is THIS service's own shot wherever the archive has one, so every
   * page opens on a different house rather than on one stock hero. Commercial has no
   * photograph of its own yet, so it borrows the closest real thing and is on the shot
   * list. */
  const heroFallback: Record<string, string> = {
    "commercial-outdoor-lighting": "/img/g-pool-blue.jpg",
    "holiday-seasonal-scenes": "/img/scene-halloween.jpg",
    "gameday-lighting": "/img/scene-husker-red.jpg",
  };
  const heroPhoto =
    (s.photo && images[s.photo]?.src) || heroFallback[s.slug] || "/img/hero-bg.jpg";

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={serviceSchema(s.name, s.lede)} />
      <Jsonld data={faqSchema(faqs)} />

      <PageHero
        photo={heroPhoto}
        photoAlt={(s.photo && images[s.photo]?.alt) || `${s.name} on a Brytr install in the Omaha metro`}
        objectPosition="50% 58%"
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

      {/* ── WHAT IT IS, AND THE FACTS THAT ONLY APPLY TO IT ── */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <SectionHead title={`What ${s.name.toLowerCase()} actually is.`} />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">{s.lede}</p>
              {/* Per-service now. See the comment on ServiceDetail.secondPara. */}
              <p className="text-base text-muted-foreground">{d?.secondPara}</p>
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

      {/* ── THE CENTERPIECE ──
        * One per service, and no two services share one. */}
      {d && (
        <section className="section bg-raise">
          {/* THE DRAWING IS CAPPED, NOT STRETCHED.
            *
            * Every figure is drawn on a 0-100 grid at a fixed aspect, and the container was the
            * full shell — so at 1440 the svg rendered 1328px wide and its internal margins scaled
            * up with it. On the hardscape section the drawing itself used the middle sixty percent
            * of that box, which put roughly 180px of empty above it, 130px below, and a 280 x 300px
            * field of nothing at the top right. A technical drawing does not get better at 1328px;
            * it just takes its own whitespace with it.
            *
            * Capped at 62rem and centred. Same drawing, a third less dead panel, and it reads as a
            * plate on a page rather than as a section that failed to fill. */}
          <div className="shell">
            <div className="mx-auto max-w-[62rem]">
              <ServiceFigure figure={d.figure} />
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT IS IN THE QUOTE ── */}
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

      {/* ── PHOTOGRAPHS OF THIS SERVICE ──
        * Assigned per slug in content/service-detail.ts rather than rotated from a pool. On a
        * city page a lit roofline is equally true anywhere in the metro; on a service page the
        * frame has to be of the service, so a shared pool would eventually put a Christmas
        * gable on the hardscape page. Three or four here, and the caption is written against
        * what is in that particular frame. */}
      {d?.shots?.length ? (
        <PhotoStrip
          eyebrow={`${s.name}, installed`}
          title="What it looks like once the crew has gone."
          /* THE LEDE IS PER-SERVICE, and it had to become per-service for two reasons.
           *
           * It used to read "Photographed on nights these were already running, rather than lit
           * for a camera" — a template constant, on every service page. Several services carry
           * daylight frames whose own captions say so, so the section was calling its own images
           * liars. A provenance claim cannot be hard-coded above a set of photographs that
           * varies.
           *
           * And it was one more string-for-string identical line in a template that already had
           * six of them. `proofCaption` is written per service and was sitting in a section further
           * down this page that has since been deleted, so it does the job here. */
          lede={
            d.proofCaption ??
            "Our own installs, photographed as they were rather than staged for a camera."
          }
          shots={d.shots}
          ground="raise"
        />
      ) : null}

      {/* ── THE COMPARISON, WHERE IT IS HONEST ── */}
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

      {/* ── TWO FRAMES OF THE SAME SUBJECT ──
        * Only on the services where such a pair genuinely exists. Two photographs of two
        * different houses side by side under a "before and after" style heading is the kind of
        * thing this trade does constantly and it is a lie; these are registered frames of one
        * subject, and where a service has none, this renders nothing. */}
      {d?.pair ? (
        <PhotoPair
          eyebrow="The same house, twice"
          title={d.pair.title}
          lede={d.pair.lede}
          a={d.pair.a}
          b={d.pair.b}
          aLabel={d.pair.aLabel}
          bLabel={d.pair.bLabel}
          ground="muted"
        />
      ) : null}

      {/* THE PROOF SHOT SECTION WAS DELETED HERE.
        * It was one photograph of this service, eyebrowed "Our own work", with proofCaption beside
        * it and a link to the gallery. The strip above it is three or four photographs of the same
        * service, and seven of the eleven services have `compare: false`, which drops the section
        * between the two — so on those seven pages the reader met two consecutive photo-plus-
        * caption sections carrying the same eyebrow. proofCaption is now the strip's lede, which is
        * where it always belonged, and the gallery is reachable from the nav and the closer. */}

      {/* ── WHAT PEOPLE LOOK AT NEXT ── */}
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

      {/* ── QUESTIONS ── */}
      <section className="section bg-muted">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <SectionHead eyebrow="Questions" title={`${s.name}: what people ask before they book.`} />
            {/* The "Nearest crews" aside is h-fit, so it ended a third of the way down while
              * the accordion carried on alone — roughly 350px of bare column beside the rest
              * of the questions, on all eleven service pages. Two-up from xl, where the
              * column is wide enough for two readable measures. */}
            <div className="mt-8 grid gap-x-12 xl:grid-cols-2">
              <Faq items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
              <Faq items={faqs.slice(Math.ceil(faqs.length / 2))} />
            </div>
          </div>
          {/* NOT h-fit. A previous pass split the accordion two-up to shorten the left column and
            * left this panel `h-fit`, so it still ran out before the questions did — measured at
            * 408 x 265px of bare page in the bottom-right of this section, on all eleven service
            * pages and, in the same shape, on all eighteen city pages.
            *
            * The panel stretches and its footer link is pushed to the bottom. The slack is now
            * inside a card, which reads as padding, instead of outside one, which reads as a hole. */}
          <aside className="flex flex-col rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
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
            <p className="mt-5 text-sm leading-relaxed text-on-dark-muted">
              Drive time changes what we can promise about a service call. It does not change who
              turns up, what goes on the house, or the price per foot.
            </p>
            <div className="mt-auto border-t border-on-dark/12 pt-4">
              <TextLink onDark href="/service-areas">Every town we drive to</TextLink>
            </div>
          </aside>
        </div>
      </section>

      <PageCta variant="phone" 
        /* The questions section above is bg-muted, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="background"
      />
    </Shell>
  );
}
