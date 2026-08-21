import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

import { cities } from "@/content/cities";
import { reviews, reviewProof } from "@/content/reviews";
import { homeFaqs } from "@/content/faqs";
import { compares } from "@/content/compares";
import { posts } from "@/content/blog";
import { photoForPost } from "@/content/blog-detail";
import { ServiceLeaflet } from "./service-leaflet";
import { Photo, photoExists } from "@/components/ui/photo";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm, ChannelEdge } from "@/components/ui/bits";
import { Faq } from "./faq";
import { ProjectTabs } from "./project-tabs";
import { IcSceneStack, IcSchedule, IcZones, IcDimmer, IcFinancing, IcSameDay, IcMeasured, IcHoaPaperwork, IcStars, IcVerified, IcHardHat, IcTwoTiers, IcWarranty } from "@/components/icons";

/* 10 — THE APP · asymmetric split reversed · neutral */
const appFeatures = [
  { icon: IcSceneStack, h: "Saved scenes", p: "Build a scene once, tap it forever. Most customers end up with eight to twelve." },
  { icon: IcSchedule, h: "Sunset scheduling", p: "On at dusk, off at 11, all year, without you touching it." },
  { icon: IcZones, h: "Zones per elevation", p: "Front on, back off. Roofline warm white while the pergola runs color." },
  { icon: IcDimmer, h: "Per-zone dimming", p: "One to a hundred percent. Dinner-party bright and Christmas bright are different settings." },
];
export function AppSplit() {
  const hasApp = photoExists("appScreen");
  return (
    <section className="section bg-background">
      <div className="shell grid items-center gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
        <div>
          <SectionHead
            
            title="Every light, every color, from the couch."
            lede="The hardware is what you buy. The app is what you actually use, most nights, for years."
          />
          <ul className="mt-8 space-y-5">
            {appFeatures.map((f) => (
              <li key={f.h} className="flex gap-4">
                <span className="channel-tile channel-tile--light" aria-hidden><f.icon className="size-7" /></span>
                <div>
                  <h3 className="text-lg text-foreground">{f.h}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted-foreground">{f.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8"><TextLink href="/lighting-systems/app-and-controls">See the app and controls</TextLink></div>
        </div>
        <div className="relative">
          {hasApp ? (
            <Photo slot="appScreen" className="mx-auto max-w-sm" sizes="(min-width:1024px) 30vw, 70vw" />
          ) : (
            /* no-photo: render the scene list as real UI rather than a phone mockup image */
            <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-primary p-4 shadow-[var(--shadow-dark)] ring-1 ring-accent/15">
              <div className="flex items-center justify-between px-2 pb-3 pt-1">
                <span className="label text-on-dark-muted">Scenes</span>
                <span className="u text-2xs text-accent">Front elevation</span>
              </div>
              {[["Everyday warm white", "100%", true], ["Husker red", "80%", false], ["Halloween", "70%", false], ["Christmas", "90%", false], ["Fourth of July", "85%", false], ["Off at 11:00 pm", "Scheduled", false]].map(([n, v, on]) => (
                <div key={n as string} className={`mb-2 flex items-center justify-between rounded-md px-3 py-3.5 ${on ? "bg-accent/15 ring-1 ring-accent/40" : "bg-raise"}`}>
                  <span className="text-[0.95rem] text-on-dark">{n as string}</span>
                  <span className="u text-xs text-on-dark-muted">{v as string}</span>
                </div>
              ))}
            </div>
          )}
          {/* second element so the column is genuinely full */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
              <p className="label text-muted-foreground">Zones on a typical home</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex justify-between"><span>Front elevation</span><span className="u text-muted-foreground">Warm white</span></li>
                <li className="flex justify-between"><span>Side elevations</span><span className="u text-muted-foreground">Off</span></li>
                <li className="flex justify-between"><span>Pergola</span><span className="u text-muted-foreground">Dimmed 40%</span></li>
                <li className="flex justify-between"><span>Landscape</span><span className="u text-muted-foreground">Warm white</span></li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
              <p className="label text-muted-foreground">A week of scheduling</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex justify-between"><span>Mon to Thu</span><span className="u text-muted-foreground">Dusk to 10pm</span></li>
                <li className="flex justify-between"><span>Fri and Sat</span><span className="u text-muted-foreground">Dusk to 12am</span></li>
                <li className="flex justify-between"><span>Game days</span><span className="u text-muted-foreground">Team colors</span></li>
                <li className="flex justify-between"><span>Holidays</span><span className="u text-muted-foreground">By calendar</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 — FOUNDERS + STORY · two portrait cards + story column · neutral-deep */
export function Founders() {
  const slots = ["founderZac", "founderSam"];
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead title="Zac and Sam started Brytr in Omaha." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[62fr_38fr] lg:gap-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {site.founders.map((f, i) => (
              <article key={f.name} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                {photoExists(slots[i]) ? (
                  <Photo slot={slots[i]} sizes="(min-width:1024px) 28vw, 50vw" />
                ) : (
                  <div className="aspect-4/5 bg-primary p-6">
                    <div className="flex h-full flex-col justify-end">
                      <span className="u text-[4rem] font-medium leading-none text-accent">
                        {f.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <p className="label mt-3 text-on-dark-muted">{f.role}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl text-foreground">{f.name}</h3>
                  <p className="label mt-1 text-xs text-accent-ink">{f.role}</p>
                  <ul className="mt-4 space-y-2">{f.handles.map((h) => <Check key={h}>{h}</Check>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <div className="prose-body">
            <p className="text-lg text-foreground">
              Brytr is two people who got tired of watching Omaha homeowners get a single quote for a
              single brand and be told it was the only good option.
            </p>
            <p className="mt-4 text-muted-foreground">
              So they built the opposite. Brytr installs every line Haven makes and Jellyfish besides, runs
              its own W2 crews rather than subcontracting the install, and services other companies&rsquo; work
              when those companies stop answering. It&rsquo;s a less profitable way to run a lighting company
              and a much better way to keep a five-star average.
            </p>
            <p className="mt-4 text-muted-foreground">
              Zac handles design and the drone work. Sam handles product, install standards and crew
              training. On most jobs you will meet both of them.
            </p>
            <div className="mt-6"><TextLink href="/about">More about Brytr</TextLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 12 — BRYTR VS THE TYPICAL INSTALLER · comparison table · primary */
const vsRows: [string, string, string][] = [
  ["Who does the install", "Our own W2 crew", "Subcontracted, often a different crew each week"],
  ["When something breaks", "We come out, we hold the warranty", "You chase the manufacturer"],
  ["Brands offered", "Haven and Jellyfish, both installed", "One brand, so one recommendation"],
  ["Day and night verification", "yes", "no"],
  ["Written warranty terms up front", "yes", "no"],
  ["Quote method", "On-site measure, written quote", "Phone estimate, revised on the day"],
  ["Financing", "yes", "no"],
];
function Yes() { return <span className="inline-flex items-center gap-2 text-on-dark"><svg viewBox="0 0 16 16" className="size-4 text-accent" fill="none" aria-hidden><path d="m2.5 8.4 3.2 3.2L13.5 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Yes</span>; }
function No() { return <span className="inline-flex items-center gap-2 text-on-dark-muted"><svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>No</span>; }
const cell = (v: string, muted?: boolean) =>
  v === "yes" ? <Yes /> : v === "no" ? <No /> : <span className={muted ? "on-dark-cell-muted" : "on-dark-cell"}>{v}</span>;

export function VersusTable() {
  return (
    <section className="section bg-primary">
      <div className="shell">
        <SectionHead onDark eyebrow="The difference" title="Brytr versus the typical installer." />
        <div className="mt-10 overflow-x-auto rounded-lg ring-1 ring-on-dark/12">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">How Brytr compares to a typical permanent lighting installer</caption>
            <thead>
              <tr className="bg-raise">
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">&nbsp;</th>
                <th scope="col" className="border-x-2 border-accent px-5 py-4 text-sm font-semibold text-on-dark">
                  <span className="label text-accent">Brytr</span>
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">The typical installer</th>
              </tr>
            </thead>
            <tbody>
              {vsRows.map(([spec, a, b], i) => (
                <tr key={spec} className={i % 2 ? "bg-primary" : "bg-on-dark/[0.03]"}>
                  <th scope="row" className="px-5 py-4 text-[0.95rem] font-medium text-on-dark">{spec}</th>
                  <td className="border-x-2 border-accent px-5 py-4 text-[0.95rem]">{cell(a)}</td>
                  <td className="px-5 py-4 text-[0.95rem]">{cell(b, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* 13 — SERVICE AREA · split, real map left · neutral */
export function ServiceArea() {
  return (
    <section className="section bg-raise">
      <div className="shell">
        <SectionHead
          onDark
          eyebrow="Where we work"
          title="From Elkhorn to Council Bluffs, and out as far as Grand Island."
          lede="Every town below has its own page, with real project photos and the drive from our shop. If yours isn't here, call and ask."
        />
        {/* Two columns, as in the reference: the list of towns on the left where it can be
          * read and clicked, the map on the right doing the geography.
          *
          * The map used to be a fixed 34rem box, which is shorter than eighteen city tiles
          * — so the right half ended in a dead band of background. Both columns are flex
          * columns now and the map takes `flex-1`, so it grows to whatever the list is
          * tall. The legend and the three notes underneath are real pieces, not spacers:
          * they are what the pin colors actually mean and how the drive gets scheduled. */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[44fr_56fr] lg:gap-12">
          <div className="flex flex-col">
            {/* Were white boxes with black text, which the client called boring and was
              * right about — eighteen of them is a lot of empty white. They are dark
              * tiles now, with the drive time in amber, so the list reads as a control
              * panel rather than a table of contents. */}
            {/* AUDIT FIX. These were eighteen identical bordered tiles: nine rows of two
              * on a desktop and eighteen full-width stacked cards on a phone, which is
              * two and a half screens of 60px boxes. It is a LIST of towns — so it is a
              * list now, in one framed rack with hairlines, drive time right-aligned in
              * tabular figures. Same eighteen links, a third of the height, and it stops
              * competing with the card grids elsewhere on the page. */}
            <div className="overflow-hidden rounded-md bg-primary ring-1 ring-on-dark/10">
              <ul className="grid divide-on-dark/10 sm:grid-cols-2 sm:divide-x">
                {cities.map((c) => (
                  <li key={c.slug} className="border-b border-on-dark/10 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                    <Link
                      href={`/service-areas/${c.slug}`}
                      className="flex items-baseline justify-between gap-4 px-4 py-3 transition-colors duration-[--dur-fast] hover:bg-raise"
                    >
                      <span className="font-display text-[0.95rem] font-bold text-on-dark">
                        {c.name}{c.state === "IA" ? ", IA" : ""}
                      </span>
                      <span className="u shrink-0 text-xs text-accent">{c.drive}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4 rounded-md bg-primary px-4 py-4 ring-1 ring-accent/30">
              <div>
                <p className="label text-accent">Your town is not on the list</p>
                <p className="mt-1 text-sm text-on-dark-muted">
                  Tell us where you are. If we can get a crew there, we will say so on the phone.
                </p>
              </div>
              <a href={site.phoneHref} className="u shrink-0 font-display font-bold text-on-dark underline decoration-accent decoration-2 underline-offset-4">
                {site.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* The legend used to be a sibling <ul> right here. It is a prop now, so it cannot
              * outlive the map it describes — see the note on `legend` in ServiceLeaflet. */}
            <ServiceLeaflet legend className="aspect-4/3 lg:aspect-auto lg:min-h-[22rem] lg:flex-1" />

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Same week in the metro", "Within about half an hour of the shop, a crew can be on your roofline within days of the quote being signed."],
                ["Both sides of the river", "Council Bluffs and western Iowa run on the same schedule as Omaha, not as an afterthought."],
                ["Outstate by route day", "Lincoln, Columbus, Norfolk and the towns west are grouped into route days, so the drive is ours."],
              ].map(([h, p]) => (
                <div key={h} className="rounded-md bg-primary p-4 ring-1 ring-on-dark/10">
                  <h3 className="text-[0.95rem] font-bold text-on-dark">{h}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 15 — THE DEADLINE BAND · primary
 *
 * This was the second closer on the page and the emptiest band on it. Centred text in a 1440px
 * field: a 38ch heading, a 60ch paragraph, and the same two buttons — consultation and phone —
 * that the page's actual closer carries three sections later, and that the hero carries as a
 * form above the fold. The page therefore made the identical ask three times with the same
 * component, and the rule is one closer per page.
 *
 * It still has a job the closer does not: there is a real cut-off, and a reader who does not
 * know it cannot act on it. So the band keeps the deadline and loses the duplicate ask. The two
 * outcomes are a small ledger on the right rather than a sentence, because "before this date /
 * after this date" is a table pretending to be prose, and one text link replaces the button
 * pair — the buttons live in the closer, which is where a closer's buttons belong. */
export function CtaBand() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      {/* ONE DATE, ONE BUTTON.
        *
        * This was a headline beside a three-row ledger: booked before November 15 / booked after
        * that / the measure itself. The client on camera: this does not look good, just make it a
        * big thing that says book before November 15 with a booking button, and take those three
        * things out. He is right about why. A mid-page band exists to be acted on, and a ledger
        * asks to be read and compared first — three rows of dates is a table where a decision
        * should be. The one row that carried the deadline is now the headline itself, at four
        * times the size, and the only other object in the band is the button. */}
      <div className="shell flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20">
        <div>
          <p className="label text-accent">Booking now</p>
          <h2 className="mt-4 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.0] text-on-dark">
            Book before November 15 to be lit for Christmas.
          </h2>
        </div>
        <div className="shrink-0">
          <Button asChild size="lg">
            <Link href="/free-design-consultation">Book the on-site measure</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 16 — THE RUN · five lit panels · run-field */
/* THE RUN — one channel, five zones.
 *
 * Third design for this section. It was a 1-2-3-4-5 row (the client's words: "really bad
 * and honestly just super lazy"), then an amber line with nodes clipped onto it — which
 * ran the line straight through the stage headings and left five small squares floating
 * above them with no relationship to anything. Both versions had the same flaw: the
 * timeline was DRAWN OVER the content instead of being made out of it.
 *
 * Now each stage is a panel with a length of lit channel along its top edge, and the runs
 * get brighter left to right — dim at the walk-around, full output with a glow on the
 * night it turns on. The graphic is the story, the section reads as one run cut into five
 * zones, and nothing crosses any text. Each panel also says what you walk away holding,
 * which is the part a homeowner actually wants from a process section.
 */
const steps: [string, string, string, string][] = [
  ["First visit", "Free design consultation",
    "We come out, walk the property, and talk through what you actually want lit. No charge and no obligation.",
    "A plan for your elevation"],
  ["Same visit", "See it on your own house",
    "We show you the app and the scene library on a house like yours, so you're not buying from a brochure.",
    "A look at the system running"],
  ["In writing", "On-site measure and written quote",
    "Linear feet, elevations, zones, hardware. You get a real number in writing, not a range on the phone.",
    "A number you can hold us to"],
  ["Install day", "Installed by our own crew",
    "One day for most homes. Channel into fascia, sealed, mitered at every corner, wire concealed.",
    "A finished run, wire hidden"],
  ["Before we leave", "Checked in daylight and dark",
    "We look at the sightline from the curb in daylight, then walk every scene with you after dark.",
    "Both states, signed off by you"],
];
export function ProcessRow() {
  return (
    /* PHOTO-BACKED DUSK, not a flat panel row.
     *
     * Fourth pass. The client on pass three: "still super boring. Doesn't fit the theme at
     * all." Fair — five tidy panels on a gradient is a layout, not a lighting company.
     *
     * The section is now the thing the copy describes. The background is our own twilight
     * frame, the one where the system is coming up on its own as the light drops, and the
     * scrim runs dusk-blue on the left to full night on the right, so scrolling the row is
     * watching the evening arrive. Each stage sits on a length of real LED run — round
     * diodes at the channel's own spacing, dim at the walk-around and burning at full
     * output with a bloom on the night it turns on. The panels are glass over the
     * photograph rather than solid cards, so the house stays visible behind them.
     *
     * The photograph is a real Omaha install, not a render. */
    <section className="run-field section relative isolate overflow-hidden">
      <Image
        src="/img/g-twilight-yard.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="-z-10 object-cover object-[50%_62%]"
      />
      <div className="run-scrim absolute inset-0 -z-10" aria-hidden />

      <div className="shell relative">
        <SectionHead
          onDark
          eyebrow="How it goes"
          title="From the first walk-around to the night it turns on."
          lede="One visit to decide, one day to install, and nobody leaves until you've seen it lit."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(([kicker, h, p, out], i) => (
            <li
              key={h}
              data-lit={i + 1}
              /* No backdrop-blur: slopcheck flags it, and it is right to — frosted glass is a
                * 2021 UI trend, not a lighting company. Plain transparency over the
                * photograph does the same job and costs nothing to composite. */
              className="run-panel relative flex flex-col rounded-md bg-primary/82 p-5 pt-6 ring-1 ring-on-dark/12"
            >
              <span className="run-seg" aria-hidden />
              <p className="label text-accent">{kicker}</p>
              <h3 className="mt-2 text-lg leading-snug text-on-dark">{h}</h3>
              <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">{p}</p>
              <p className="mt-5 border-t border-on-dark/12 pt-3.5 text-sm text-on-dark">
                <span className="label block text-on-dark-muted">You leave with</span>
                <span className="mt-1 block font-display font-bold">{out}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 17 — REVIEWS · neutral-deep
 * Review TEXT is not seeded (see content/reviews.ts). Until real Google review text
 * is pasted in, this renders the confirmed-proof layout instead of fabricated
 * testimonials. It switches to review cards automatically once the array is filled. */
const proofFacts = [
  { icon: IcStars, h: `${reviewProof.average} average, ${reviewProof.count} reviews`, p: "Every one of them on Google, where you can read them yourself rather than take our word for it." },
  { icon: IcHardHat, h: "W2 crews on every install", p: "Not a subcontractor network. The same people who quoted your job are the ones on the ladder." },
  { icon: IcVerified, h: "Verified in daylight and dark", p: "We don't close a job until you've signed off on both states of the system." },
  { icon: IcTwoTiers, h: "Compared by the installer", p: "We publish where the cheaper hardware beats the expensive hardware we lead with. Ask a single-brand dealer to do that." },
  { icon: IcWarranty, h: "Warranty in writing, up front", p: "Manufacturer coverage plus our workmanship coverage, both on paper before you sign." },
  { icon: IcMeasured, h: "1.2M lights installed locally", p: "All of it in and around Omaha. This is the only market we work in." },
];
/* Five stars, drawn as five. A single star glyph beside a 5.0 reads as one star, which is
 * the opposite of the point. */
function StarRow({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex gap-1" aria-label="Five out of five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`size-4 ${tone === "dark" ? "text-accent-ink" : "text-accent"}`} fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.7L10 14.4 4.9 17.1 6 11.4 1.8 7.5l5.7-.7L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  /* PROOF, AT SIZE.
   *
   * This section rendered a fallback layout for weeks because there was no real review
   * text to show. There is now: the rating and the count come off Brytr's Google
   * Business Profile and every quote is verbatim (see content/reviews.ts for the source
   * of each one). The audit's sharpest finding was that the whole page carried its proof
   * in one 13px grey line, so this is built to be the loudest quiet thing on the page —
   * the score set large, the count beside it, a link to the profile so anyone can check,
   * and one review set at pull-quote size instead of six equal cards. */
  if (reviews.length === 0) {
    return (
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="Omaha says"
            title="What Omaha homeowners say after the crew leaves."
            lede="We'd rather you read the reviews on Google than take our retyping of them. Here's what they consistently mention."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proofFacts.map((f) => (
              <article key={f.h} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <span className="channel-tile channel-tile--light mb-5" aria-hidden><f.icon className="size-7" /></span>
                <h3 className="text-lg text-foreground">{f.h}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{f.p}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <p className="u text-sm text-muted-foreground">
              {reviewProof.average} average · {reviewProof.count} reviews · {reviewProof.platform}
            </p>
            <TextLink href="/reviews">Read the reviews</TextLink>
          </div>
        </div>
      </section>
    );
  }

  /* The left column used to be the pull-quote plus a panel of Google's own review tags with
   * their counts — "Professional team 46", "Outdoor lighting 10". The client, on that panel:
   * "add another review here instead of this."
   *
   * Right, and for a reason worth writing down. A tag with a number beside it is a summary of
   * reviews sitting in a section whose whole job is to show the reviews themselves. It also
   * broke two house rules at once: it counted things, and it put a figure where the reader
   * wanted a sentence. There were eight real reviews on file and only five on the page, so
   * the fix was already in the content. Six now: one at pull-quote size, one beneath it, four
   * beside. */
  const featured = reviews.find((r) => r.feature) ?? reviews[0];
  const others = reviews.filter((r) => r !== featured);
  const second = others[0];
  const rest = others.slice(1, 5); // an even 2 x 2 beside the left column

  /* bg-background, not bg-muted. MaterialsSplit directly below this is bg-muted, so the two
   * sections ran together as one unbroken warm field for 2,700px with no step at the seam — and
   * both of them open with an amber eyebrow over a display heading over one paragraph over a card
   * grid, so there was nothing else telling them apart either.
   *
   * A JSX comment cannot be the first child of a `return (`, which is how this took three
   * attempts: `return ( {/* ... *\/} <section>` parses as an object literal, not an element. */
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="Omaha says"
          title="See what our clients have to say."
        />

        {/* the score, at a size you cannot miss, with the profile one tap away */}
        <div className="mt-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-border pb-8">
          <div className="flex items-end gap-5">
            <p className="u font-display text-[clamp(3.2rem,7vw,5rem)] font-black leading-[0.85] text-foreground">
              {reviewProof.average}
            </p>
            <div className="pb-1">
              <StarRow />
              <p className="mt-2 text-[0.95rem] text-muted-foreground">
                <span className="u font-medium text-foreground">{reviewProof.count}</span> reviews on{" "}
                {reviewProof.platform}, and not a single one below five stars
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={reviewProof.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[0.95rem] font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
            >
              Read them on Google
            </a>
            <TextLink href="/reviews">More on this site</TextLink>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[38fr_62fr]">
          {/* one review at pull-quote size — six equal cards is the layout that made the
            * rest of this page read as machine output */}
          <div className="flex flex-col gap-5">
            <blockquote className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
              <StarRow tone="light" />
              <p className="mt-6 font-display text-[1.35rem] font-bold leading-snug text-on-dark">
                &ldquo;{featured.text}&rdquo;
              </p>
              <footer className="mt-6 border-t border-on-dark/15 pt-4 text-sm text-on-dark-muted">
                {featured.name}
                {featured.when ? ` · ${featured.when}` : ""} · Google review
              </footer>
            </blockquote>

            {/* A sixth review rather than a summary of the other five. `flex-1` so this column
              * still ends level with the 2 x 2 beside it. */}
            {second ? (
              <blockquote className="flex flex-1 flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <StarRow />
                <p className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-muted-foreground">
                  &ldquo;{second.text}&rdquo;
                </p>
                <footer className="mt-5 border-t border-border pt-3 text-sm text-muted-foreground">
                  <span className="font-display font-bold text-foreground">{second.name}</span>
                  {second.when ? ` · ${second.when}` : ""} · Google review
                </footer>
              </blockquote>
            ) : null}
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {rest.map((r) => (
              <li key={r.name + r.text.slice(0, 12)}>
                <blockquote className="flex h-full flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                  <StarRow />
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-border pt-3 text-sm text-muted-foreground">
                    <span className="font-display font-bold text-foreground">{r.name}</span>
                    {r.when ? ` · ${r.when}` : ""}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 18 — FINANCING · benefit list + second form · primary · signature edge #2 */
const finBenefits = [
  { icon: IcFinancing, h: "No money down options", p: "Approved applicants can start with nothing up front." },
  { icon: IcSameDay, h: "Fast approval", p: "Usually while we are still at your kitchen table." },
  { icon: IcMeasured, h: "Free on-site assessment", p: "The measure, the design and the written quote cost nothing." },
  { icon: IcHoaPaperwork, h: "We handle the HOA paperwork", p: "We pull the covenant and submit to your board ourselves." },
];
export function Financing() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      <div className="shell grid items-start gap-10 py-20 lg:grid-cols-[44fr_56fr] lg:gap-14">
        <div>
          <SectionHead onDark eyebrow="Financing" title="Spread it out, or pay it once." />
          <ul className="mt-8 space-y-5">
            {finBenefits.map((b) => (
              <li key={b.h} className="flex gap-4">
                <span className="channel-tile" aria-hidden><b.icon className="size-7" /></span>
                <div>
                  <h3 className="text-lg text-on-dark">{b.h}</h3>
                  <p className="mt-1 text-[0.95rem] text-on-dark-muted">{b.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm text-on-dark-muted">
            Exact terms come from our lending partner and we will show you the real numbers at the
            consultation. We don&rsquo;t advertise a monthly payment that only applies to a perfect credit file.
          </p>
          <div className="mt-6"><TextLink onDark href="/pricing">See full pricing</TextLink></div>
        </div>
        <QuoteForm variant="financing" heading="Check your financing options" submitLabel="Check my financing options" />
      </div>
    </section>
  );
}

/* 19 — FAQ · accordion · neutral */
export function HomeFaq() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead eyebrow="Before you buy" title="The questions we get every week." />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <Faq items={homeFaqs} />
          <aside className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] lg:sticky-0">
            <h3 className="text-xl text-on-dark">Still deciding?</h3>
            <p className="mt-2.5 text-[0.95rem] text-on-dark-muted">
              The consultation is free and we design it on your actual house. Most people decide during it.
            </p>
            <Button asChild size="block" className="mt-5"><Link href="/free-design-consultation">Book a consultation</Link></Button>
            <p className="mt-4 text-sm text-on-dark-muted">Or call <a href={site.phoneHref} className="u text-accent">{site.phone}</a></p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/faq">See all questions</TextLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* 20 — FINAL CTA · split, full form right · neutral-deep */
export function FinalCta() {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-start gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
        <div className="flex flex-col">
          <SectionHead title="See it on your house before you buy." />
          <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
            We measure on site, design it with you after dark, and hand you a written quote. If you
            decide against it, you&rsquo;ve lost an hour and gained a plan.
          </p>
          <ul className="mt-7 space-y-3">
            <Check>Free on-site assessment</Check>
            <Check>Written quote, no pressure</Check>
            <Check>Financing available</Check>
          </ul>

          {/* THE THREE FIGURES ARE OUT. 5.0, 1.2M installed and W2 crews sat here as a stat
            * row; the client on camera, at the closing form: get rid of those three things. A
            * stat row at the point of decision reads as a brochure panel, and the review score
            * is already in the band under every hero on the site, so two of the three were a
            * third statement of something stated twice. Watch the column height here — this
            * block was filling a ~200px hole beside the form, and if that hole comes back the
            * fix is the grid ratio, not another panel of numbers. */}

          <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-border pt-7">
            <p className="text-sm text-muted-foreground">Or call us directly</p>
            <a href={site.phoneHref} className="u text-3xl font-medium text-foreground hover:text-accent-deep">{site.phone}</a>
          </div>
        </div>
        <QuoteForm variant="full" />
      </div>
    </section>
  );
}

export { ProjectTabs };

/* 13b — BRAND COMPARISONS · 3 x 3 grid · neutral-deep
 *
 * Added because the homepage never surfaced these nine pages, and "is Jellyfish any
 * good?" is the highest-intent question a permanent-lighting shopper has. Brytr's
 * actual differentiator is that they stock two systems and will tell you which one is
 * right, so putting the comparisons on the homepage is the argument, not decoration.
 * The blurb is each page's own verdict, clamped — no new copy, nothing invented. */
export function CompareGrid() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="Shopping other brands"
          title="We sell both, so we can tell you which one loses."
          lede="Nine head-to-head comparisons, including the ones where the cheaper system is the honest answer. A single-brand dealer cannot write these pages."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Three, not nine. Nine was a second twelve-card grid on the same page; the
            * other six are one click away and all nine are indexed either way. */}
          {compares
            .filter((c) => ["haven-vs-jellyfish-lighting", "haven-vs-gemstone-lights", "haven-vs-trimlight"].includes(c.slug))
            .map((c) => (
            <article key={c.slug} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
              <p className="label text-accent-ink">
                {c.labor ? "Professional vs DIY" : c.neutral ? "Neither is ours" : "We install both"}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
                {c.a} <span className="text-muted-foreground">vs</span> {c.b}
              </h3>
              <p className="mt-3 line-clamp-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {c.verdict}
              </p>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <TextLink href={`/compare/${c.slug}`}>Read the comparison</TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <TextLink href="/compare">Every brand we are asked about</TextLink>
        </div>
      </div>
    </section>
  );
}

/* 19b — WRITING · 3 posts · neutral
 *
 * The blog had twelve finished articles and not one internal link from the homepage,
 * which is a straight SEO defect as well as a wasted trust signal. Three posts, the
 * ones that answer pre-purchase questions. */
/* TWO SOURCES OF TRUTH IS HOW ONE PHOTOGRAPH ENDS UP ON A PAGE THREE TIMES.
 *
 * This used to be a local `postArt` map naming a file per slug — and content/blog-detail.ts
 * already had a `postPhotos` map doing the identical job for the twelve article pages and the
 * blog index. Two maps, same purpose, maintained by hand. They drifted the moment the archive
 * grew, and the result was visible on the flagship page: christmas-detail.jpg appeared in this
 * row AND in the project tabs, g-gable-detail.jpg appeared here AND in the project tabs, and
 * channel-detail.jpg appeared here AND in the hardware section. A visitor scrolling the home
 * page saw the same three houses twice each and had every reason to conclude the archive was
 * thinner than it is.
 *
 * So this reads the one map. Adding a photograph to an article now changes it everywhere it
 * appears, which is the only arrangement that stays true. The alt text comes with it, rather
 * than being an empty string as it was here. */

export function Writing() {
  const featured = [
    "are-permanent-christmas-lights-worth-it",
    "permanent-lights-vs-hanging-christmas-lights",
    "how-to-choose-a-permanent-lighting-installer",
  ]
    .map((sl) => posts.find((p) => p.slug === sl))
    .filter((p): p is (typeof posts)[number] => !!p);

  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="From the blog"
          title="The questions people ask before they spend the money."
          lede="Written by the people who install it, including the parts that argue against buying. Twelve more on the blog."
        />
        {/* AUDIT FIX. This was three rows with a 256px thumbnail and text stopping at
          * 65% width — the emptiest block on the page, and all three photographs were the
          * same red-and-green house. Three cards now, each image filling its column, each
          * a different subject, and the read time carried so the row is worth scanning. */}
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {featured.map((p) => (
            <article key={p.slug} data-spot className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
              <Link href={`/blog/${p.slug}`} className="group flex flex-1 flex-col">
                <span className="relative block aspect-16/9 overflow-hidden bg-primary">
                  <Image
                    src={photoForPost(p.slug)?.photo ?? "/img/home-shake-brick.jpg"}
                    alt={photoForPost(p.slug)?.photoAlt ?? ""}
                    fill
                    sizes="(min-width:1024px) 32vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: photoForPost(p.slug)?.objectPosition ?? "50% 50%" }}
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="label text-accent-ink">{p.category}</span>
                  <span className="mt-2 block font-display text-xl font-bold leading-snug text-foreground group-hover:underline">
                    {p.title}
                  </span>
                  <span className="mt-2.5 block flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {p.dek}
                  </span>
                  <span className="label mt-5 block border-t border-border pt-4 text-muted-foreground">
                    Read it
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <TextLink href="/blog">Everything we have written</TextLink>
        </div>
      </div>
    </section>
  );
}
