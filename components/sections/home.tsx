import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { cities } from "@/content/cities";
import { reviews, reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { homeFaqs, pricingFaqs } from "@/content/faqs";
import { SectionHead, QuoteForm } from "@/components/ui/bits";
import { Faq } from "@/components/sections/faq";
import { ServiceLeaflet } from "@/components/sections/service-leaflet";

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
 * NO ICONS ANYWHERE. There were ten on this page - seven section-head glyphs and three sets of
 * tiles. The client: "I can't even tell what's going on with them... I would rather we bring our own
 * visual sense to it with our images." Section heads fall back to the channel-mark, which is the
 * brand's amber rule rather than a picture of anything; the feature lists are hairline, bold title,
 * phrase; the service cards lost the badge that sat on top of a photograph of the same thing. The
 * whole set is deleted - see content/icon-map.ts.
 *
 * AND THE FOUNDERS ARE NOT MENTIONED. "I don't want to mention them. We shouldn't be mentioning
 * them." Their section went, then the one sentence that survived into WhoWeAre went too.
 *
 * THE WORDCOUNT, MEASURED RATHER THAN ESTIMATED, by scripts/wordcount.mjs against the rendered page
 * - not the JSX, which is a much larger and irrelevant number:
 *
 *     1,740  before, all of it prose a reader scrolls past
 *       687  after, prose a reader scrolls past
 *       306  the FAQ, mostly folded into collapsed cards but in the HTML (see section 8)
 *       993  total indexable, against the 800 floor the client set for SEO
 *
 * So the page a reader meets is 60% shorter while the page a crawler reads is 43% shorter. That gap
 * is the whole trick, and it is bought by `forceMount` on the accordion rather than by padding.
 *
 * THE MARGIN IS 193 WORDS AND IT USED TO BE 405. Cutting the FAQ from eleven questions to six was
 * the client's call and the right one visually, but it spent half the headroom - so the next round
 * of trimming visible prose has to check this number rather than assume it.
 *
 * THE GROUND, AND A DELIBERATE DEPARTURE FROM THE RULE AT THE TOP OF globals.css:
 *
 *     1 Hero        primary + photograph   dark
 *     2 Services    background             light
 *     3 SceneWipe   muted                  light
 *     4 WhoWeAre    background             light
 *     5 HowWeWork   raise                  dark
 *     6 Reviews     muted                  light
 *     7 RecentWork  primary                dark
 *     8 Faqs        background             light
 *     9 Closer      muted                  light   -> into the primary footer
 *
 * Services is second and the drag demo third, which is the client's call and the right one: an
 * interactive control immediately after the hero asks a visitor to play with something before
 * anyone has told them what is being sold. Claim, then proof.
 *
 * scripts/section-rhythm.mjs enforces that no two adjacent sections share a ground, and this passes
 * - no two neighbours are the same surface anywhere down the page.
 *
 * WHAT IT DOES BREAK is the unenforced note at the top of globals.css, "support surfaces so the page
 * never runs 3 light or 3 dark in a row", at sections 2, 3 and 4. That is on instruction: "the site
 * in general just looks dark, which is very weird for a lighting company." The drag demo used to sit
 * on `raise` directly under a night-photograph hero, so the first two screens were both dark and the
 * impression was set before a reader reached anything light. The three-light run is three DIFFERENT
 * surfaces (background, muted, background) and they alternate visibly. Six light sections to three
 * dark, where the page this replaced ran five lights in a row and still read as dark - because the
 * two darkest were its first two.
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

/* The booking CTA, repeated. The client asked for "more calls to action throughout": the page had
 * one in the hero, one on the Services promo card and one at the very bottom, which left the whole
 * middle - the drag demo, who we are, how we work, the reviews, the work grid - with nothing to
 * click but soft onward links to other pages. This now closes WhoWeAre, HowWeWork and the FAQ. */
function AccentPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="tap-44 inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
    >
      {children}
      <span aria-hidden>&rarr;</span>
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
const SERVICE_CARDS: { slug: string; label: string }[] = [
  { slug: "permanent-roofline-lighting", label: "Roofline and eaves" },
  { slug: "landscape-lighting", label: "Landscape and beds" },
  { slug: "patio-pergola-bistro-lighting", label: "Patio and pergola" },
  { slug: "hardscape-lighting", label: "Walls, steps and coping" },
  { slug: "soffit-lighting", label: "Soffit and architectural" },
];

export function Services() {
  const cards = SERVICE_CARDS.map((c) => {
    const s = services.find((x) => x.slug === c.slug);
    return s ? { ...c, svc: s, img: s.photo ? images[s.photo] : undefined } : null;
  }).filter(Boolean);

  return (
    <section className="section bg-background">
      <div className="shell">
        {/* No lede. The heading is a question a homeowner can answer in one word, and the five
          * answers are directly underneath it. A paragraph here would be explaining the grid. */}
        <SectionHead
          align="center"
          eyebrow="Services"
          title="What are you looking to light?"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
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
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.2rem] font-bold leading-tight text-foreground">
                    {c!.label}
                    <Arrow />
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{c!.svc.short}</p>
                </div>
            </Link>
          ))}

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
 * 4 - WHO WE ARE. Who the company is, and where it will actually drive. One idea, filled.
 *
 * THIRD ATTEMPT, AND THE FIRST TWO FAILED FOR THE SAME REASON. Version one was a four-crop photo
 * mosaic against four icon-tiled features. Version two kept the features, dropped the icons and put
 * them in cards - "very ugly" became "really kind of sucks", and "we have a lot of blank space
 * being created". Both of those are true and both come from one mistake that predates either
 * layout: THIS SECTION HAD NO SUBJECT.
 *
 * It was four unrelated claims wearing a heading. Whole property (which is what Services, two
 * sections up, is entirely about). Every night of the year (which is what the drag demo, one
 * section up, exists to prove). Checked twice (which is a step in How We Work, one section down).
 * And "W2 employees, never subcontracted".
 *
 * So it restated three neighbouring sections and no reader could say what it was for. That is
 * exactly the note from two rounds ago - "a section should not have so much going on to where we
 * are talking about who we are and how we design it, or how the lighting works" - and I fixed the
 * styling of it twice without fixing the thing it was pointing at. Four claims that each belong
 * somewhere else cannot be rescued by better cards.
 *
 * AND THE FOURTH ONE SHOULD NEVER HAVE BEEN THERE. "We probably should not even be mentioning what
 * our employees are." Right: W2 is a payroll classification. It means something to an accountant
 * and nothing to a homeowner deciding who to let onto their roof. The service claim underneath it
 * - the person who quoted your house is the person on the ladder - is worth making, and How We
 * Work makes it. The tax status is not.
 *
 * WHAT THE SECTION IS FOR NOW: who we are, and where we will drive. That is one subject, it is the
 * question a homeowner asks second (right after "what is this"), and the page answered it nowhere -
 * the service area appeared only in one line of small print above the closing form and in the
 * footer. Twenty towns, named, is also real information rather than a claim, which is what fills a
 * section honestly. Blank space is what you get when a layout has less to say than it has room.
 *
 * FOURTH PASS, AND THIS ONE WENT AND LOOKED AT THE REFERENCE. "This section here just isn't doing
 * it for me. There's not much going on here. Look at TrueGreen.com for inspiration on how sections
 * should be laid out and how typography should be."
 *
 * So I opened trugreen.com and read it section by section instead of working from memory, and it
 * corrected an assumption I was about to build on. Three things it actually does:
 *
 *   HEADLINES ARE THREE TO NINE WORDS.  "The difference local pros make." "Let's talk lawn."
 *                                       "Nobody makes lawn care easier than TruGreen."
 *   BODY COPY IS TWELVE TO TWENTY-FOUR. One or two sentences, never a block.
 *   THERE ARE NO STATISTIC ROWS.        Not one on the page. Their content device - the thing that
 *                                       fills every section - is a ROW OF CARDS.
 *
 * That last one is why it was worth fetching rather than remembering: "add more to it" plus "not
 * much going on" reads like an argument for a row of big numbers, and I would have built one. The
 * reference says cards.
 *
 * WHAT WAS WRONG HERE, measured against that. The headline was fine at four words. The lede was
 * THIRTY-SEVEN words over three lines, against their twelve-to-twenty-four. And under it: nothing
 * at all, then a 150px hole, then two buttons - because `mt-auto` pinned the buttons to the bottom
 * of a column whose height came from the photograph beside it. A paragraph and two buttons cannot
 * fill 480px and should not have been asked to.
 *
 * Now: a six-word headline, a twenty-four-word lede, three cards, then the buttons directly under
 * them. The cards carry the three things that are true of the COMPANY and are not claimed anywhere
 * else on the page - local rather than franchised, two brands rather than one, and the same crew
 * from the measure to the handover. That last one is where the old "never subcontracted" line went:
 * same argument, said as a service rather than as a tax status.
 *
 * THE PHOTOGRAPH RUNS THE FULL HEIGHT of the row - `items-stretch` and `h-full`. `items-center`
 * was the cause of an earlier version of the same complaint: a 555px portrait beside a 400px
 * column centres both and leaves 77px of nothing above and below the copy.
 * ========================================================================= */
const ABOUT_CARDS: { title: string; body: string }[] = [
  {
    title: "Local, not a franchise",
    body: "The shop is on C Street in west Omaha and every crew drives out of it. No territory partner, no dispatcher in another state.",
  },
  {
    title: "Two brands on the truck",
    body: "We fit both Haven and Jellyfish, so the system we put on your house is the one that suits it rather than the only one we sell.",
  },
  {
    title: "The same crew, start to finish",
    body: "The people who measure your roofline after dark are the people who fit it, and the people who come back to it.",
  },
];

export function WhoWeAre() {
  const shot = images.installDayGarage;
  return (
    <section className="section bg-background">
      <div className="shell">
        {/* ── who we are ── */}
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div className="flex flex-col">
            <SectionHead
              eyebrow="Who we are"
              title="The difference a local crew makes"
              lede="Brytr is an Omaha company. The shop, the van and the crew are all here, and so is everyone who will be on your roof."
            />

            {/* THREE CARDS, WHICH IS WHAT WAS MISSING. */}
            <ul className="mt-8 grid gap-4">
              {ABOUT_CARDS.map((c) => (
                <li key={c.title} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{c.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{c.body}</p>
                </li>
              ))}
            </ul>

            {/* `mt-9`, NOT `mt-auto`. mt-auto pinned these buttons to the bottom of a column whose
              * height was set by the photograph beside it, so with only a paragraph above them the
              * 150px in between was dead. That gap is the thing in his screenshot. Content sets the
              * height now, and the row sits under the last card. */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <AccentPill href="/free-design-consultation">Book a free design</AccentPill>
              <DarkPill href="/about">More about us</DarkPill>
            </div>
          </div>

          {/* The photograph runs the full height of the row, with the one confirmed figure as an
            * opaque card on its bottom edge - no scrim needed, and no gap above or below it. */}
          <div className="relative min-h-[24rem]">
            {shot?.src && (
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-primary">
                <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1024px) 24rem, 100vw" className="object-cover" />
              </div>
            )}
            <div className="absolute inset-x-5 bottom-5 rounded-lg bg-card p-5 shadow-[var(--shadow-dark)]">
              <p className="u font-display text-[2.5rem] font-bold leading-none text-accent-ink">1.2M</p>
              <h3 className="mt-1.5 font-display text-[1rem] font-bold leading-snug text-foreground">
                Lights installed around Omaha
              </h3>
            </div>
          </div>
        </div>

        {/* ── where we work ──
          *
          * THE MAP IS THE SECTION NOW, and the list is what sits beside it. The client asked for
          * "an embedded leaflet map right there that has pins on all of our different locations",
          * and the component to do it already existed: components/sections/service-leaflet.tsx,
          * built for /service-areas, in exactly this pairing. Every city in content/cities.ts
          * already carries real coordinates, so nothing is plotted by hand.
          *
          * IT IS THE ONE PIECE OF DECORATION-FREE COLOUR ON A LIGHT PAGE, and it earns it: each
          * town is an amber pin with a real glow, so the map reads as a map OF LIGHTS rather than
          * a scatter plot. That is the product, drawn as geography.
          *
          * THE LIST STAYS. A map answers "where roughly" and a list answers "is my town on it",
          * and those are different questions - the second one is the one a homeowner in Gretna is
          * actually asking. The map's own tile-failure fallback is written on the assumption that
          * the list is beside it, so removing the list would break the error state too.
          *
          * No legend. It exists on the component and is genuinely useful on /service-areas, but
          * here it is a third thing to read in a section that has already had two rebuilds for
          * being cluttered. Hovering a pin gives the town and the drive from the shop. */}
        <div className="mt-14 grid items-stretch gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
          <ServiceLeaflet className="min-h-[22rem] w-full lg:min-h-[26rem]" />

          <div className="flex flex-col">
            <p className="label text-accent-ink">Where we work</p>
            <h3 className="mt-3 font-display text-[1.35rem] font-bold leading-tight text-foreground">
              Eighteen towns, and the drive from our shop
            </h3>
            {/* "Do you come to my town" is a lookup, and a lookup wants a list rather than pills
              * or cards. Each name is its own page. */}
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${c.slug}`}
                    className="text-[0.95rem] text-muted-foreground transition-colors duration-[--dur-fast] hover:text-accent-ink hover:underline"
                  >
                    {c.name}
                    {c.state === "IA" ? ", IA" : ""}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <DarkPill href="/service-areas">See every service area</DarkPill>
            </div>
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
const HOW_ITEMS: { title: string; body: string }[] = [
  { title: "Measured on site, after dark", body: "Against your own materials, not a catalogue" },
  { title: "Into fascia, never shingles", body: "Every penetration sealed as it is made" },
  { title: "One app, every zone", body: "House, pergola, walls and beds, on saved scenes" },
  { title: "We hold the warranty", body: "No portal between you and the crew" },
  /* Moved here from the deleted WhoWeAre feature list, where it was one of four unrelated claims.
   * It is the last step of an install, so it belongs at the end of the steps. It also gives this
   * column a fifth row, which is what stops it finishing short of the photograph beside it. */
  { title: "Checked twice before we leave", body: "Signed off lit after dark, then again in daylight" },
];

export function HowWeWork() {
  const shot = images.crewRoofFascia;
  return (
    <section className="section bg-raise">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
        <div className="flex flex-col">
          <SectionHead
            onDark
            eyebrow="How we work"
            title="Installed once, and installed properly"
            /* Was thirty-five words over three lines. The reference holds a section lede to twelve
              * to twenty-four; this is twenty-one and makes the same point. */
            lede="This gets drilled into your fascia and left there. How it is fixed and sealed is the difference at year five."
          />

          {/* THE RUN. One continuous length of channel down the left of the four steps, with the
            * steps clipped onto it - `.run-spine` from app/sections.css, the same device and the
            * same diode pitch as the decision tree on /services.
            *
            * This is what replaced the icon tiles, and it is the answer to "I would rather we bring
            * our own visual sense to it". A pictogram of a hard hat is a picture of a different
            * thing; a length of lit channel beside four steps about how the channel gets installed
            * is the product itself doing the work. It is also the only amber in the section, and
            * amber reading vertically down a dark ground is most of the colour this page has. */}
          <div className="mt-9 flex gap-6">
            <span className="run-spine" aria-hidden />
            <ul className="grid flex-1 gap-6">
              {HOW_ITEMS.map((h) => (
                <li key={h.title}>
                  <h3 className="font-display text-[1.08rem] font-bold leading-snug text-on-dark">{h.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-snug text-on-dark-muted">{h.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-9">
            <div className="flex flex-wrap items-center gap-4">
              <AccentPill href="/free-design-consultation">Book a free design</AccentPill>
              <LightPill href="/how-it-works">How an install runs</LightPill>
            </div>
            {/* The one line worth keeping out of the deleted WhyTrust section: it is that
              * section's whole argument, and the reason there are no invented seals on this page. */}
            <p className="mt-5 max-w-[42ch] text-[0.92rem] leading-snug text-on-dark-muted">
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
            /* THE ONE LOUD HEADING ON THIS PAGE, and it now has to say so. It used to rely on
              * SectionHead defaulting to "hero"; that default flipped to "section" when the
              * redesign rolled out to the other twenty templates, which silently took this
              * heading down to 34px with them. Relying on a default to be the exception was the
              * bug - the exception is the thing that should be written down. */
            scale="hero"
            eyebrow="Our reviews"
            title="What our clients say"
            lede={`Rated ${reviewProof.average} across ${reviewProof.count} ${reviewProof.platform} reviews.`}
          />
          <DarkPill href="/reviews">Read all {reviewProof.count}</DarkPill>
        </div>

        {/* THE STAGGER IS GONE. The middle card dropped 40px and the third 20px, inherited from
          * Phoenix, whose argument for it was that three equal cards read as a bar. The client:
          * "the review sections need to be aligned in a row. Right now, one is higher than the
          * other, and they need to be perfectly aligned."
          *
          * He is right, and the stagger was solving a problem these cards do not have. Phoenix
          * staggers because their cards are all the same height, so a flat row really is a bar.
          * Ours hold three verbatim Google reviews of different lengths, so the ROW already has
          * variety - and offsetting cards that are already unequal reads as a mistake rather than
          * as a rhythm.
          *
          * `items-stretch` (the grid default, so `items-start` came off) plus `flex-1` on the
          * blockquote means all three tops AND all three footers line up exactly, whatever the
          * quotes do in between. That is the alignment he asked for, and it is the reason the
          * quote length no longer shows. */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {three.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]"
            >
              {/* THE GOOGLE MARK REPLACES THE DECORATIVE QUOTE GLYPH that used to sit in this
                * corner - a 48px amber ellipsis at 25% opacity, which was there to fill the corner
                * and said nothing. The mark does a job: it tells a reader where the words came
                * from, which is the only question that matters about a testimonial. Same corner,
                * same weight, actual information.
                *
                * Absolute positioning is gone with it. Stars left, mark right, on one flex row, so
                * neither can overlap a long first line of the quote. */}
              <div className="flex items-center justify-between gap-4">
                <Stars />
                {googleLogo && (
                  <Image
                    src={googleLogo}
                    alt={`Reviewed on ${reviewProof.platform}`}
                    width={20}
                    height={20}
                    unoptimized
                    className="size-5 shrink-0"
                  />
                )}
              </div>
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
 * 8 - THE QUESTIONS. Six of the twenty-five in content/faqs.ts, beside a dark booking panel.
 *
 * SHORTER, AND WITH SOMETHING TO LOOK AT. The client: "the FAQs need to be a whole lot shorter and
 * use more color. We also need more calls to action throughout." Those were two notes and this
 * section answers both, because they had the same cause: eleven full-width white cards on warm
 * limestone is a thousand pixels of beige with nothing in it but chevrons, and it was the longest
 * section on the page by some distance.
 *
 *   ELEVEN BECOMES SIX. Chosen, not sliced - the six a homeowner actually opens with. Can you see
 *   it by day, what does it cost, how long does it take, does it damage the fascia, what happens
 *   when it breaks, and is the consultation free. The other nineteen are on /faq, one click away
 *   and linked from the panel.
 *
 *   THE COLOUR IS A NAVY PANEL BESIDE THEM, not a tint on the cards. Amber stays what it is on
 *   this site - the CTA - so it arrives as the button inside that panel rather than as decoration
 *   on six accordion rows. The panel also fills the left column, so a section that was one tall
 *   pale list is now a composition.
 *
 *   AND IT IS A CALL TO ACTION. A reader who has just read six answers is the most likely person
 *   on the page to book, and until now the section handed them a text link to more questions.
 *
 * THE WORDCOUNT COST IS REAL AND WORTH NAMING. Those five dropped questions were about 230 words of
 * indexable text. The page can afford it - see the count in the header comment - but the FAQ is the
 * cheapest wordcount on this page and it is now carrying less of it, so the visible prose has less
 * room to shrink in future rounds than it did.
 *
 * A COLLAPSED ANSWER IS ONLY IN THE HTML BECAUSE OF `forceMount`, and that is worth writing down
 * because it is easy to believe the opposite and I did. Grepping the response for a CLOSED answer
 * finds it, which looks like proof that Radix server-renders accordion content either way. It is
 * not: what the grep finds is Next's RSC flight payload, which carries every prop passed to a
 * client component whether it renders or not. Inside <main>, only the open item existed. See the
 * note in components/sections/faq.tsx. app/page.tsx emits FAQPage schema off this same array, so
 * the markup cannot drift from what the accordion shows.
 * ========================================================================= */
const pick = <T extends { q: string }>(src: readonly T[], ...qs: string[]) =>
  qs.map((q) => src.find((f) => f.q === q)).filter((f): f is T => !!f);

export const faqItems = [
  ...pick(
    homeFaqs,
    "Can you actually see it during the day?",
    "What does it cost?",
    "How long does an install take?",
    "Does it damage my soffit or fascia?",
    "What happens when a section stops working?"
  ),
  ...pick(pricingFaqs, "Is there a charge for the consultation?"),
];

export function Faqs() {
  return (
    <section className="section bg-background">
      <div className="shell grid items-start gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
        <div className="rounded-lg bg-primary p-8">
          <SectionHead
            onDark
            eyebrow="Most asked"
            title="Questions homeowners ask first"
          />
          <p className="mt-4 text-[0.95rem] leading-relaxed text-on-dark-muted">
            The rest of them, and the answers we give on the walk-around, are on the FAQ page.
          </p>
          {/* `items-start` so the two pills hug their labels. Without it the column stretches them
            * to the panel width and both read as full-width bars, which makes the secondary link
            * look as loud as the booking button. */}
          <div className="mt-8 flex flex-col items-start gap-3">
            <AccentPill href="/free-design-consultation">Book a free design</AccentPill>
            <LightPill href="/faq">Read every question</LightPill>
          </div>
        </div>
        <Faq items={faqItems} />
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
