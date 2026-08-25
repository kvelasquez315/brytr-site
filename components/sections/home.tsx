import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { homeFaqs, pricingFaqs } from "@/content/faqs";
import { iconMap, type IconKey } from "@/content/icon-map";
import { SectionHead, QuoteForm } from "@/components/ui/bits";
import { Faq } from "@/components/sections/faq";

/* THE HOME PAGE SECTIONS.
 *
 * This replaces components/sections/home-phx.tsx, which was phoenixroofingandrepair.com's page
 * rebuilt slot for slot on an explicit brief ("copy their exact layout... the layout should be
 * exactly the same"). It did that faithfully, and the result was the thing the client said next:
 * "the design of this website is just awful, there is way too much text going on and it needs to be
 * simplified."
 *
 * WHAT WENT WRONG IS NOT THE WORD COUNT. It is 1,740 words in <main>, which is ordinary for a
 * marketing home page. The failure is that Phoenix's template gives every section the identical
 * shape -
 *
 *     icon + eyebrow + 54px heading + full lede paragraph
 *       -> three or four sub-items, each with its OWN bold title AND its own paragraph
 *       -> a tick list
 *       -> a button
 *
 * - and the page ran that shape thirteen times. Measured on the live page: 13 sections, 39 headings
 * (1 h1, 12 h2, 26 h3), 2 forms with 10 fields, 65 fully-rounded elements. Every h2 was set at the
 * same clamp(...3.375rem) as the h1, so nothing was subordinate to anything.
 *
 * AND THE SAME PROOF APPEARED SIX TIMES. 5.0 from 196 Google reviews was stated in the hero badge
 * row, in the whole ProofRail section, on the card over the HowWeWork photograph, in the Reviews
 * head, at the foot of Closer, and in the footer. A page does not feel dense because it says a lot;
 * it feels dense because it keeps saying the same thing and the reader cannot tell whether they
 * have already read it.
 *
 * SO: THIRTEEN SECTIONS BECOME NINE, and four whole sections were deleted rather than shrunk.
 *
 *   ProofRail       a full section, eyebrow and 34px heading and a pill, to carry ONE number that
 *                   the hero already states 400px above it. Now one line in the hero.
 *   Founders        Zac and Sam had a section with two cards and six tick rows. They are the
 *                   founders of a two-person-founded company, not a leadership team; they are now
 *                   one sentence in WhoWeAre and a link to /about, which is their page.
 *   WhyTrust        seven ticks, four of which ("own W2 crews", "into fascia never shingles",
 *                   "signed off lit at night and in daylight", "warranty held by us") were already
 *                   the four HowWeWork items word for word. Merged into HowWeWork.
 *   CallToAction    an amber band with a heading, a paragraph and two buttons, 600px above the
 *                   closing section which has a heading, a paragraph, two routes and a form.
 *                   Folded into Closer.
 *
 * AND THE TEMPLATE ITSELF IS BROKEN, on purpose, so nine sections do not read as nine of the same
 * thing. The lede paragraph is now passed on three sections rather than thirteen. Sub-items get a
 * title and a SHORT phrase, not a title and a sentence. The service cards lost their paragraph,
 * their three ticks and their button - the whole card is the link, which is what a card being a
 * link should mean.
 *
 * THE WORDCOUNT, MEASURED RATHER THAN ESTIMATED. 1,740 words in <main> before, 851 after, against a
 * floor of 800 the client set for SEO. Both figures come from scripts/wordcount.mjs, which fetches
 * the rendered page and counts what is actually in <main> - not what is in the JSX, which is a
 * different and much larger number, and not what is in the document, which is larger again for a
 * reason worth knowing about (see the note on the FAQ in section 8).
 *
 * THE GROUND, AND A DELIBERATE DEPARTURE FROM THE RULE AT THE TOP OF globals.css:
 *
 *     1 Hero        primary + photograph   dark
 *     2 SceneWipe   background             light
 *     3 Services    muted                  light
 *     4 WhoWeAre    background             light
 *     5 HowWeWork   raise                  dark
 *     6 Reviews     muted                  light
 *     7 RecentWork  primary                dark
 *     8 Faqs        background             light
 *     9 Closer      muted                  light   -> into the primary footer
 *
 * scripts/section-rhythm.mjs enforces that no two adjacent sections share a ground, and this
 * passes: no two neighbours are the same surface anywhere down the page.
 *
 * WHAT IT DOES BREAK is the unenforced note in globals.css - "support surfaces so the page never
 * runs 3 light or 3 dark in a row" - at sections 2, 3 and 4. That is on instruction. The client:
 * "the site in general just looks dark, which is very weird for a lighting company." SceneWipe was
 * on `raise`, directly under a night-photograph hero, so the first two screens of the site were
 * both dark and the impression was set before a reader reached anything light. Moving it to
 * `background` is what fixes that, and it costs a three-light run made of three DIFFERENT surfaces
 * (background, muted, background) which alternate visibly. Six light sections to three dark, where
 * the page it replaced ran five lights in a row and still read as dark because the two darkest
 * were the first two.
 */

/* ---------- shared parts ---------------------------------------------------- */

function Arrow() {
  return (
    <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
      &rarr;
    </span>
  );
}

function DarkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="tap-44 inline-flex h-12 items-center rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
    >
      {children}
    </Link>
  );
}

function LightPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="tap-44 inline-flex h-12 shrink-0 items-center rounded-full border border-on-dark/35 px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-on-dark/10"
    >
      {children}
    </Link>
  );
}

function Stars({ size = "1rem" }: { size?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="Five out of five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="text-accent" width={size} height={size} fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
        </svg>
      ))}
    </span>
  );
}

/* ==========================================================================
 * 3 - SERVICES.
 *
 * WHAT THIS WAS: five white cards, each with a photograph, a round icon badge, a 21px title, a
 * three-line paragraph, a three-item accent-tick list and a full-width dark pill at the foot. Plus
 * a sixth promo card. That is five paragraphs, fifteen tick rows and six buttons in one section, and
 * a reader scanning for "which of these do I want" had to read 180 words to find out.
 *
 * WHAT IT IS NOW: the photograph, the name, and the one-line `short` that content/services.ts
 * already carries for exactly this purpose. No paragraph, no ticks, no button - THE CARD IS THE
 * LINK, so the button was never anything but a second copy of the card's own href taking up 48px.
 * The detail lives on the service page, which is where somebody who has chosen goes.
 * ========================================================================= */
const SERVICE_CARDS: { slug: string; label: string; icon: IconKey }[] = [
  { slug: "permanent-roofline-lighting", label: "Roofline and eaves", icon: "roofline" },
  { slug: "landscape-lighting", label: "Landscape and beds", icon: "pathLight" },
  { slug: "patio-pergola-bistro-lighting", label: "Patio and pergola", icon: "pergola" },
  { slug: "hardscape-lighting", label: "Walls, steps and coping", icon: "hardscape" },
  { slug: "soffit-lighting", label: "Soffit and architectural", icon: "soffit" },
];

export function Services() {
  const cards = SERVICE_CARDS.map((c) => {
    const s = services.find((x) => x.slug === c.slug);
    return s ? { ...c, svc: s, img: s.photo ? images[s.photo] : undefined } : null;
  }).filter(Boolean);

  return (
    <section className="section bg-muted">
      <div className="shell">
        {/* No lede. The heading is a question a homeowner can answer in one word, and the five
          * answers are directly underneath it. A paragraph here would be explaining the grid. */}
        <SectionHead
          align="center"
          scale="section"
          icon="wholeHome"
          eyebrow="Services"
          title="What are you looking to light?"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const I = iconMap[c!.icon];
            return (
              <Link
                key={c!.slug}
                href={`/services/${c!.slug}`}
                data-spot
                className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  {c!.img?.src && (
                    <Image
                      src={c!.img.src}
                      alt={c!.img.alt}
                      fill
                      sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.04]"
                    />
                  )}
                  <span
                    className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-card text-accent-ink shadow-[var(--shadow-lg)]"
                    aria-hidden
                  >
                    <I className="size-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.2rem] font-bold leading-tight text-foreground">
                    {c!.label}
                    <Arrow />
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{c!.svc.short}</p>
                </div>
              </Link>
            );
          })}

          {/* The sixth cell. Phoenix puts a quiz here; ours is the consultation, which is the same
            * offer without a quiz we do not have. A real install photograph rather than a portrait,
            * because founderZac and founderSam are still null in content/images.ts and a generated
            * face is never going on this site. */}
          <article className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-lg bg-primary p-7">
            {images.walkthroughDusk?.src && (
              <Image
                src={images.walkthroughDusk.src}
                alt={images.walkthroughDusk.alt}
                fill
                sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/45" aria-hidden />
            <div className="relative flex flex-1 flex-col">
              <p className="label text-accent">Free &middot; On site &middot; After dark</p>
              <h3 className="mt-3 font-display text-[1.5rem] font-bold leading-tight text-on-dark">
                Not sure what your house needs?
              </h3>
              <p className="mt-3 text-[0.95rem] leading-snug text-on-dark-muted">
                We walk the property with you after dark and lay the design out on your own elevation.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="/free-design-consultation"
                  className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-card px-6 py-4 font-semibold text-foreground"
                >
                  Book a free design
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 4 - WHO WE ARE. A four-photograph mosaic with the one confirmed figure set into it, against a
 * copy column.
 *
 * THE FOUR FEATURES LOST THEIR PARAGRAPHS. They read, for example, "Whole property / Roofline,
 * soffit, beds, patio and hardscape on one channel and one app." - a title plus a twelve-word
 * sentence, four times, immediately under a lede that had already said the same thing. They are now
 * a title and a phrase. The phrase is there to be glanced at, not read.
 *
 * ZAC AND SAM ARRIVE HERE. Deleting their section did not delete them: the fact that the founders
 * still run the walk-arounds is the single most persuasive thing in that whole deleted section, and
 * it is one sentence. The two cards, the two avatar monograms and the six tick rows were the parts
 * that were not persuasive.
 * ========================================================================= */
const ABOUT_FEATURES: { icon: IconKey; title: string; body: string }[] = [
  { icon: "wholeHome", title: "Whole property", body: "Roofline, beds, patio and hardscape, one app" },
  { icon: "hardHat", title: "Our own crews", body: "W2 employees, never subcontracted" },
  { icon: "seasonal", title: "Every night of the year", body: "Warm white by default, colour when you want it" },
  { icon: "dayNight", title: "Checked twice", body: "Signed off lit, then again in daylight" },
];

export function WhoWeAre() {
  const m = [images.installDayGarage, images.crewRoofFascia, images.walkthroughDusk, images.installDayPavilion];
  return (
    <section className="section bg-background">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        {/* THE MOSAIC IS A FLEX COLUMN, NOT A GRID, and that is load-bearing.
          *
          * It was `grid gap-4` with three fixed rows, so its height was whatever four 4:3 crops and
          * a card happened to add up to - 720px against a copy column of 925px, leaving a 290px
          * hole in the bottom left of the section. That is the site's worst failure mode arriving by
          * arithmetic rather than by layout.
          *
          * Now the two photo rows GROW. The section's height is set by the copy column, the rows
          * split whatever is left after the figure card, and the crops go to `h-full` above lg so
          * they fill rather than letterbox. Both columns end on the same line at every width. */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
            {m.slice(0, 2).map((img, i) =>
              img?.src ? (
                <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary lg:aspect-auto lg:h-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
                </div>
              ) : null
            )}
          </div>

          {/* The one hard figure the client confirmed on camera, set into the mosaic. Its
            * two-line explanation came off: "not a national franchise total" is a comparison
            * nobody was making. */}
          <div className="flex items-center gap-6 rounded-lg bg-muted p-6">
            <p className="u shrink-0 font-display text-[2.75rem] font-bold leading-none text-accent-ink">1.2M</p>
            <h3 className="font-display text-[1.1rem] font-bold leading-snug text-foreground">
              Lights installed around Omaha
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
            {m.slice(2, 4).map((img, i) =>
              img?.src ? (
                <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary lg:aspect-auto lg:h-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <SectionHead
            scale="section"
            icon="roofline"
            eyebrow="Who we are"
            title="Permanent lighting installers, based in Omaha"
          />

          <dl className="mt-8 grid gap-x-10 gap-y-7 border-t border-border pt-8 sm:grid-cols-2">
            {ABOUT_FEATURES.map((f) => {
              const I = iconMap[f.icon];
              return (
                <div key={f.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-muted text-accent-ink" aria-hidden>
                    <I className="size-6" />
                  </span>
                  <div>
                    <dt className="font-display text-[1.02rem] font-bold leading-snug text-foreground">{f.title}</dt>
                    <dd className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">{f.body}</dd>
                  </div>
                </div>
              );
            })}
          </dl>

          {/* Where the deleted Founders section went. */}
          <p className="mt-8 border-t border-border pt-8 text-[1.05rem] leading-relaxed text-muted-foreground">
            Started by{" "}
            <span className="font-semibold text-foreground">
              {site.founders.map((f) => f.name).join(" and ")}
            </span>
            , who both still run the walk-arounds themselves.
          </p>

          <div className="mt-auto pt-8">
            <DarkPill href="/about">More about us</DarkPill>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 5 - HOW WE WORK, on the dark ground, with a daylight photograph in it.
 *
 * THIS IS TWO OLD SECTIONS. "Installed once, and installed properly" had four icon rows; "Why
 * Omaha homeowners trust Brytr" had a seven-item tick list. Four of those seven ticks were the four
 * icon rows restated in fewer words -
 *
 *     "Our own W2 crews, never subcontracted"        <- HOW_ITEMS had this
 *     "Fixed into fascia, never through shingles"    <- and this
 *     "Signed off lit at night and in daylight"      <- and this
 *     "Warranty held by us, not a call center"       <- and this
 *
 * - so the page made the same four claims twice, 900px apart, in two sections with different
 * headings. The remaining three ticks were the free consultation (which the Services promo card
 * and the closing section both carry), concealed wire runs, and the service area (which is in the
 * closing section and the footer).
 *
 * THE RATING CARD CAME OFF THE PHOTOGRAPH. It was the fourth of six places the page said 5.0 / 196.
 * The photograph is better without a card over it, and Reviews is directly below.
 * ========================================================================= */
const HOW_ITEMS: { icon: IconKey; title: string; body: string }[] = [
  { icon: "measured", title: "Measured on site, after dark", body: "Against your own materials, not a catalogue" },
  { icon: "weatherSealed", title: "Into fascia, never shingles", body: "Every penetration sealed as it is made" },
  { icon: "zones", title: "One app, every zone", body: "House, pergola, walls and beds, on saved scenes" },
  { icon: "warranty", title: "We hold the warranty", body: "No portal between you and the crew" },
];

export function HowWeWork() {
  const shot = images.crewRoofFascia;
  return (
    <section className="section bg-raise">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
        <div className="flex flex-col">
          <SectionHead
            onDark
            scale="section"
            icon="hardHat"
            eyebrow="How we work"
            title="Installed once, and installed properly"
            lede="Permanent lighting is drilled into your fascia and left there. How it is fixed and sealed is the whole difference between a run that still looks right in five years and one that does not."
          />

          <ul className="mt-9 grid gap-7 sm:grid-cols-2">
            {HOW_ITEMS.map((h) => {
              const I = iconMap[h.icon];
              return (
                <li key={h.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary text-accent" aria-hidden>
                    <I className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.02rem] font-bold leading-snug text-on-dark">{h.title}</h3>
                    <p className="mt-1 text-[0.9rem] leading-snug text-on-dark-muted">{h.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* The one line worth keeping out of the deleted WhyTrust section: it is the section's
            * whole argument, and it is the reason there are no invented seals on this page. */}
          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-on-dark/15 pt-8">
            <LightPill href="/how-it-works">How an install runs</LightPill>
            <p className="max-w-[34ch] text-[0.92rem] leading-snug text-on-dark-muted">
              Every claim on this page goes in writing before you sign.
            </p>
          </div>
        </div>

        {shot?.src && (
          <div className="relative min-h-[22rem] overflow-hidden rounded-lg bg-primary">
            <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1024px) 28rem, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
 * 6 - WHAT OUR CLIENTS SAY. The page's one loud heading, and the only section that keeps
 * `scale="hero"`.
 *
 * SIX CARDS BECAME THREE. Six verbatim Google reviews is about 270 words of other people's prose in
 * one section, and by the fourth card a reader has stopped reading them and started counting them.
 * Three is a row, reads as a sample, and /reviews has the rest.
 *
 * The ground moved from `raise` to `muted`. The section was the page's dark moment, but what made
 * it loud was the 64px heading, not the ground - and with the drag demo and HowWeWork now both on
 * dark, a third dark band here put three of the first six sections on the same footing. White cards
 * on warm neutral, with the heading doing the shouting.
 *
 * Every word in these cards is verbatim from Google. Dates appear only where Google gave one.
 * ========================================================================= */
export function Reviews() {
  const three = reviews.slice(0, 3);
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            icon="stars"
            eyebrow="Our reviews"
            title="What our clients say"
            lede={`Rated ${reviewProof.average} across ${reviewProof.count} ${reviewProof.platform} reviews.`}
          />
          <DarkPill href="/reviews">Read all {reviewProof.count}</DarkPill>
        </div>

        {/* Staggered: the middle column drops, which is what stops three cards reading as a bar. */}
        <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {three.map((r, i) => (
            <article
              key={r.name}
              className={`relative flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ${
                i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-5" : ""
              }`}
            >
              <span className="pointer-events-none absolute right-6 top-5 font-display text-[3rem] leading-none text-accent/25" aria-hidden>
                &rdquo;
              </span>
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground">
                {r.text}
              </blockquote>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="label text-foreground">{r.name}</p>
                <p className="mt-0.5 text-[0.85rem] text-muted-foreground">
                  Omaha homeowner{r.when ? ` · ${r.when}` : ""}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 7 - RECENT WORK, on the night ground.
 *
 * The grid moved from `muted` to `primary`, and that is the one place on this page where a dark
 * section is an argument rather than a rhythm choice: every photograph in it is a night shot of a
 * lit house, so on a near-black ground the section's only light comes out of the product. On warm
 * neutral the same six frames read as six grey rectangles with captions.
 *
 * The lede came off - "Photographed on the property at night with the system running. None of it is
 * a rendering and none of it is stock." That is true and it is worth saying, so it moved into the
 * heading's own eyebrow row rather than being a third line of prose above a photo grid.
 * ========================================================================= */
const WORK: { key: string; scene: string }[] = [
  { key: "homePrairieTwilight", scene: "Civil twilight, warm white" },
  /* Was seqRedGreen, which is the ninety-second-sequence house from the SAME hover point as the
   * new hero photograph - so the hero and the second tile of this grid would have been one
   * property. Same scene, different house. */
  { key: "christmasRedGreenGables", scene: "The December scene" },
  { key: "poolPergolaDusk", scene: "Pergola run at dusk" },
  { key: "homeBrickGablesGold", scene: "Gables, warm white" },
  { key: "homeShakeBrick", scene: "Eave downlights" },
  { key: "gamedayRedFull", scene: "Game day, one tap" },
];

export function RecentWork() {
  const shots = WORK.map((w) => ({ ...w, img: images[w.key] })).filter((w) => w.img?.src);
  return (
    <section className="section bg-primary">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            onDark
            scale="section"
            icon="christmas"
            eyebrow="Our projects, photographed on site"
            title="Recent work around Omaha"
          />
          <Link
            href="/gallery"
            className="tap-44 inline-flex h-12 shrink-0 items-center rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
          >
            See the full gallery
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((w) => (
            <Link
              key={w.key}
              href="/gallery"
              data-spot
              className="group relative block overflow-hidden rounded-lg bg-raise"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={w.img.src as string}
                  alt={w.img.alt}
                  fill
                  sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary to-transparent px-5 pb-4 pt-10">
                <p className="font-display text-[1rem] font-bold text-on-dark">
                  {w.scene}
                  <Arrow />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 8 - THE QUESTIONS. Eleven of the twenty-five in content/faqs.ts, with the rest on /faq.
 *
 * A COLLAPSED ANSWER IS NOT IN THE HTML, and that is worth writing down because it is easy to
 * believe the opposite and I did.
 *
 * Grepping the home page's response for the text of a CLOSED answer finds it, which looks like
 * proof that Radix server-renders accordion content either way. It is not. What the grep finds is
 * Next's RSC flight payload - the `self.__next_f.push([...])` script at the foot of the document -
 * which carries every prop passed to a client component whether it is rendered or not. Inside
 * <main>, only the one open item's answer exists; Radix unmounts the rest. Checked both ways:
 *
 *     answer of the OPEN item      in <main> DOM: yes    in document: yes
 *     answer of a CLOSED item      in <main> DOM: NO     in document: yes  (flight data only)
 *
 * So these eleven answers are roughly 700 words that a reader can get to in one click and a crawler
 * cannot get to at all. That is the reason app/page.tsx now emits FAQPage schema off this same
 * array - it is the only route by which the answers reach Google, and it is built from `faqItems`
 * rather than a copy so the markup cannot drift from what the accordion shows.
 *
 * WHY THREE QUESTIONS COME FROM `pricingFaqs`. Nine sections landed the page at 834 words against
 * an 800 floor - cleared by 34, which is one edit from breaking. Padding a paragraph would be the
 * wrong fix. These three are genuinely what a homeowner asks on a first visit (what it costs,
 * whether there is finance, whether the cheap option is a worse install) and they were already
 * written, on /pricing, where somebody who has not decided yet never sees them. Picked by question
 * text rather than copied, so the two pages cannot drift apart.
 * ========================================================================= */
const pick = (src: typeof pricingFaqs, ...qs: string[]) =>
  qs.map((q) => src.find((f) => f.q === q)).filter((f): f is (typeof src)[number] => !!f);

export const faqItems = [
  ...homeFaqs,
  ...pick(
    pricingFaqs,
    "Is there a charge for the consultation?",
    "Is financing available?",
    "Is the cheaper hardware a worse install?"
  ),
];

export function Faqs() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            scale="section"
            icon="verified"
            eyebrow="Most asked"
            title="Questions homeowners ask us first"
          />
          <DarkPill href="/faq">Read every question</DarkPill>
        </div>
        <div className="mt-10">
          <Faq items={faqItems} />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 9 - THE CLOSER, which is also the old CallToAction.
 *
 * There used to be an amber band with "Ready for lighting you never have to hang again?", a
 * paragraph and two pills, and then 600px later a closing section with a heading, a paragraph, a
 * phone number, an hours line, the rating for the fifth time, and a form. Two closes in a row, and
 * the first one asked for the same click as the second.
 *
 * One close now. The amber survives as the submit button, which is where amber is supposed to be
 * on this site - the CTA, and the signature channel edge, and nothing else.
 *
 * THE RATING BLOCK CAME OFF. Its argument was that a reader weighing whether to hand over a phone
 * number wants the proof at that moment, which is fair - but it was the fifth statement of 5.0 /
 * 196 on one page, and Reviews is three sections above with three actual reviews in it.
 * ========================================================================= */
export function Closer() {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-20">
        <div className="flex flex-col">
          <SectionHead
            scale="section"
            icon="measured"
            eyebrow="Free consultation"
            title="See it on your house before you buy"
            lede="We come out after dark, walk the property, and show you the design on your own elevation. No charge and no obligation."
          />

          <p className="mt-10 text-base text-muted-foreground">Or call us directly</p>
          <a
            href={site.phoneHref}
            className="u mt-1 block font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold tracking-[-0.03em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>

          <p className="mt-auto pt-8 text-[0.95rem] text-muted-foreground">
            {site.hours.openLabel}. Installing across {site.region}.
          </p>
        </div>
        <QuoteForm variant="compact" heading="Get a free design consultation" />
      </div>
    </section>
  );
}
