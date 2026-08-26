import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/content/services";
import { ChannelFigure } from "@/components/sections/channel-figure";
import { images } from "@/content/images";
import { detailFor } from "@/content/service-detail";
import { systemBySlug } from "@/content/systems";
import { serviceFaqsFor } from "@/content/faqs";
import { PhotoStrip, PhotoPair } from "@/components/sections/photo-parts";
import { metroCities } from "@/content/cities";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { ServiceFigure } from "@/components/sections/service-figures";
import {
  PageHero, PageCta, SpecTable, SectionHead, Check, TextLink,
} from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, serviceSchema, faqSchema } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { serviceValueProp } from "@/content/value-props";

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
/* WHAT YOU GET, NOT WHAT THE OTHER THING COSTS. This was an eight-row sheet setting "Permanent"
 * against "Hung each season", spec by spec. The client: "instead of comparing I would rather this
 * be a section of cards that are designed and colorful showing value it brings."
 *
 * That is a better section for the same facts. A comparison spends half its space describing
 * something the reader is trying to stop doing, and every row made them read the bad option again
 * to understand the good one. These are the same eight rows read forwards: the ladder row becomes
 * nobody goes up a ladder, the storage row becomes nothing in the garage, and the two cost rows
 * collapse into one, because "higher, once" and "one install" were the same point twice.
 *
 * COLOURFUL WITHOUT INVENTING A PALETTE. Each card carries a lit run across its top in a real
 * scene colour, from the six defined in globals.css. They are what a Brytr roofline is actually
 * set to on a given night, so the colour on the card is the product rather than decoration
 * applied to a box, and the section gets its colour from the one place this site is allowed to
 * take it from. */
const valueCards: { scene: string; h: string; p: string }[] = [
  { scene: "warm", h: "One cost, not ten",
    p: "You pay for an install once. The ten year version of hanging lights is ten rentals or ten purchases, and nobody prices it that way at the door." },
  { scene: "amber", h: "Nobody goes up a ladder",
    p: "Not in November to put them up, not in January to take them down, and not in between when a section goes dark." },
  { scene: "red", h: "January is a month, not a job",
    p: "There is nothing to take down, so the weekend you normally lose to it stays yours." },
  { scene: "green", h: "Any colour, any night",
    p: "Warm white on a Tuesday in March, red and green in December, team colours on a Saturday. Same run, from your phone." },
  { scene: "blue", h: "Nothing in the garage",
    p: "No boxes, no tangles, no rental return, and no shelf given up to something used six weeks a year." },
  { scene: "violet", h: "It reads as part of the house",
    p: "Colour matched to your fascia and sealed in once, so from the curb in daylight it is trim rather than a seasonal add-on." },
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
        h1={s.h1}
        lede={s.lede}
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...serviceValueProp(s)} ground="muted" />


      {/* ── WHAT IT IS, AND THE FACTS THAT ONLY APPLY TO IT ── */}
      <section className="section bg-card">
        <div className="shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <SectionHead title={`What ${s.name.toLowerCase()} actually is.`} />
            {/* ONE PARAGRAPH. `secondPara` was a second body paragraph stacked straight under the
              * heading, which rules.md bans and which the p+p count on this page was measuring. The
              * lede carries the definition; the checklist under it carries the specifics. The data
              * stays in content/service-detail.ts rather than being deleted, because it is written
              * per service and is the expensive part. */}
            <div className="prose-body mt-6">
              <p className="text-lg text-foreground">{s.lede}</p>
            </div>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {s.includes.map((i) => <Check key={i}>{i}</Check>)}
            </ul>

            {/* THE DIODE PITCH, DRAWN. This section was 133 words with no photograph, no graphic
              * and no background image, which rules.md calls undesigned outright. It is also the
              * section that says what the product is, and the thing a homeowner actually wants to
              * know at that moment is whether they will see a line or a row of dots. That is a
              * dimension, which a photograph cannot show and a drawing can. Same linework as the
              * eave section on /how-it-works. */}
            <div className="mt-8 overflow-hidden rounded-lg bg-primary p-5 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
              <ChannelFigure variant="pitch" className="block w-full" />
            </div>
          </div>

          <dl className="h-fit rounded-lg bg-background p-6 shadow-[var(--shadow-lg)] ring-1 ring-border">
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
            title="Everything in the written quote."
          />
          {/* THIS WAS A TWO-COLUMN LIST OF BOLD LABEL PLUS ONE LINE, separated by hairlines, and
            * the client on it: "sections should always have more design than this." He is right,
            * and the giveaway is that the section carried no device at all - a heading, a lede,
            * then five paragraphs in a grid. Nothing said what kind of thing the five items were.
            *
            * They are the install, in order: the walk-around, then the channel, then the
            * controller, then the zoning, then both states checked. That is a sequence, and this
            * site already has a device for a sequence, on the home page: `.run`, the lights whose
            * output climbs from the first to the last. Using it here is not decoration bolted on,
            * it is the section finally saying what it is.
            *
            * `on-light` because this ground is limestone. See the note in globals.css: the amber
            * bloom that reads as a diode on the night sections is invisible on warm neutral, so
            * the light variant swaps it for a solid core and a dark ring. */}
          <ol className="run on-light mt-10 lg:grid-cols-2 lg:gap-x-14">
            {/* EVERY LIGHT AT FULL OUTPUT, and that is a correction. The first pass ramped them
              * from dim to bright, which is what the device does on the home page, where the five
              * points ARE the install in order. These are not: on this service they read channel
              * into fascia, mitered transitions, concealed conductor, colour matched. That is a
              * set, not a sequence, and a ramp across it tells the reader there is an order to
              * find. The device still marks the section as ours; it just stops implying time. */}
            {(d?.included ?? []).map(([h, p]) => (
              <li key={h} className="run-stage">
                <span className="run-node" style={{ "--out": 1 } as React.CSSProperties} aria-hidden />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold leading-snug text-foreground">{h}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* THE GABLE RUN, DRAWN, and it is here to break a specific defect. Sections 4 and 5 ran
            * consecutively with no photograph, no graphic and no background image between them:
            * 1,104px of unbroken text in the middle of the page. This section lists what is in the
            * quote, and the mitre at the peak is the line item a reader can actually check from
            * the curb, so it is the one worth drawing. Same linework as the eave section. */}
          <div className="mt-10 overflow-hidden rounded-lg bg-primary p-5 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
            <ChannelFigure variant="run" className="block w-full" />
          </div>

          {sys && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-lg bg-primary px-6 py-5 shadow-[var(--shadow-dark)]">
              {/* NO EYEBROW. "The hardware under it" was a small amber label announcing the
                * subject of the line beneath it, which is the device removed from every section on
                * the home page. Folded into the line it was introducing. */}
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-on-dark">
                  The hardware under it: {sys.name}
                </p>
                <p className="mt-1 text-sm text-on-dark-muted">{sys.short}</p>
              </div>
              <TextLink onDark href={`/lighting-systems/${sys.slug}`}>See the spec</TextLink>
            </div>
          )}
        </div>
      </section>

      {/* THE "ONCE THE CREW HAS GONE" PHOTO STRIP IS GONE, on instruction, from here and from the
        * city template that carried the same section under almost the same heading.
        *
        * What it was: three or four frames of this service, assigned per slug rather than pulled
        * from a shared pool, each captioned against what was in that particular frame. It had just
        * been rebuilt as a numbered sequence, because on the whole-home page the three shots were
        * one house from one drone position and read as a duplicated photograph.
        *
        * Deleted rather than hidden. The `shots` arrays stay in content/service-detail.ts and the
        * city photo pool stays in content/photo-sets.ts, because both are still read by other
        * sections; nothing about removing this section orphans the photographs themselves.
        *
        * PhotoStrip itself is still live on fourteen other pages with fourteen different headings,
        * which is why the component is untouched. */}

      {/* ── THE COMPARISON, WHERE IT IS HONEST ── */}
      {d?.compare && (
        <section className="section bg-card">
          <div className="shell">
            <SectionHead
              title="What you get for installing it once."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {valueCards.map((v) => (
                <li
                  key={v.h}
                  className="flex flex-col overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
                >
                  <span
                    className="scene-band"
                    style={{ "--scene": `var(--scene-${v.scene})` } as React.CSSProperties}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[1.2rem] font-bold leading-snug text-on-dark">{v.h}</h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{v.p}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Ladder time, storage and takedown are the parts customers tell us they underestimated.
            </p>
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
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What people look at next."
          />
          {/* CARDS WITH THE PHOTOGRAPH OF THAT SERVICE. "These service links should be cards side
            * by side with images of that other service."
            *
            * They were stacked full-width text rows inside one framed rack: bold name, grey line,
            * hairline, repeat. That is a table of contents, and it was the only link block on the
            * site with nothing to look at, on the section whose whole job is to make somebody want
            * the next thing. Every service already carries a `photo` key into content/images.ts.
            *
            * This is the same card as `ServiceRows` in page-parts.tsx, which got the same
            * treatment in the same pass, and the two are kept in step deliberately: a reader
            * meeting this block on a service page and on a city page should not see two different
            * ideas of what a service link is. */}
          <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {alsoSee.map((r) => {
              const shot = r.photo ? images[r.photo] : undefined;
              return (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border transition-all duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5"
                  >
                    {shot?.src && (
                      <span className="relative block aspect-16/9 overflow-hidden photo-frame">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 100vw"
                          className="object-cover transition-transform duration-[--dur-base] ease-[--ease-out-expo] group-hover:scale-[1.03]"
                        />
                      </span>
                    )}
                    <span className="flex min-w-0 flex-1 flex-col p-5">
                      <span className="block font-display text-[1.05rem] font-bold leading-snug text-foreground group-hover:text-accent-ink">
                        {r.name}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{r.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── QUESTIONS ── */}
      <section className="section bg-muted">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <SectionHead  title={`${s.name}: what people ask before they book.`} />
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

      <PageCta variant="phone" photos={serviceValueProp(s).photos} 
        /* The questions section above is bg-muted, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="card"
      />
    </Shell>
  );
}
