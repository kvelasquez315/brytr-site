import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/ui/bits";

/* ROUND FOUR, AND THE ONE THING THE FIRST THREE ROUNDS ALL MISSED.
 *
 * The client, four times now, in four different ways: jumbled, then blocky and robotic, then
 * "very AI", then "insanely boxy". Every round I rearranged WHICH grid went where. Not once did
 * I delete the grid. The page measured 19 outlined rectangles in `main`, four of them arranged
 * as rows of identical cards: three review cards, six work cards, four hardware rows, and a
 * rounded navy panel floating in a cream field.
 *
 * SO I WENT AND MEASURED THE REFERENCES INSTEAD OF REMEMBERING THEM.
 *
 *   trugreen.com     ZERO classes containing border, rounded, shadow, ring or card. Text sits
 *                    directly on plain ground. Photographs run edge to edge with no frame.
 *   propertypest.com ONE repeated-card grid on the whole page. Reviews are quoted text on bare
 *                    background. The four-step process has no containers at all. Photographs
 *                    bleed off the side of the page.
 *
 * That is not a taste disagreement, it is a measurable gap, and it explains why every round of
 * "better composition" still read as AI. A card is a container drawn around content that does
 * not need containing. Four grids of them is a template being refilled, which is exactly what
 * the client kept saying he was looking at.
 *
 * THE RULE, AND IT IS NOW A BUILD GATE (scripts/boxcount.mjs):
 *
 *   NOTHING ON THIS PAGE GETS A RING OR A RADIUS except a form, because a form is genuinely an
 *   object you type into. Photographs are flush. Captions sit on the ground under the picture,
 *   not on a bar bolted to it. Lists are separated by a hairline or by nothing. Sections are
 *   separated by a change of ground, and two of them now genuinely bleed to the viewport edge
 *   so the page stops reading as boxes inside a 1440px box.
 *
 *   AND NO TWO SECTIONS SHARE AN ARCHETYPE. Staggered rows, then the wipe, then a big-number
 *   pull quote, then the colour band, then a filmstrip that runs off the right edge, then a
 *   ruled list, then a stat strip on dark, then the form. Nine sections, nine shapes.
 */

function Arrow() {
  return (
    <span className="ml-2 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
      &rarr;
    </span>
  );
}

/* Five stars is not a trademark, and it is the same glyph the trust bar uses so the mark means
 * one thing across the site. The Google wordmark is a slot, not a drawing: see content/badges.ts. */
function Stars({ className, size = "1.05rem" }: { className?: string; size?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className ?? ""}`} aria-label="Five out of five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="text-accent" width={size} height={size} fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
        </svg>
      ))}
    </span>
  );
}

/* 2 - WHAT WE INSTALL - staggered wide rows
 *
 * Property Pest's service-types pattern: image one side, copy the other, alternating down the
 * page, so the eye moves across instead of scanning three identical columns. The photographs
 * lost their `rounded-lg` in this pass. A rounded corner on a photograph of a house is a frame
 * around something that already has its own edges.
 */
const LEAD = ["permanent-outdoor-lighting", "permanent-christmas-lights", "permanent-roofline-lighting"];

function ServiceRow({ slug, flip }: { slug: string; flip?: boolean }) {
  const svc = services.find((s) => s.slug === slug);
  const img = svc?.photo ? images[svc.photo] : undefined;
  if (!svc) return null;
  return (
    <Link
      href={`/services/${svc.slug}`}
      data-spot
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {img?.src && (
        <div className={`relative aspect-16/10 w-full overflow-hidden bg-primary ${flip ? "lg:order-2" : ""}`}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className={flip ? "lg:order-1" : ""}>
        <h3 className="display-section text-foreground">{svc.name}</h3>
        <p className="lead mt-3 text-muted-foreground">{svc.short}</p>
        <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
          {svc.includes.slice(0, 3).map((i) => (
            <li key={i} className="text-[1rem] leading-snug text-muted-foreground">{i}</li>
          ))}
        </ul>
        <p className="mt-6 font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
          {svc.name === "Permanent Christmas Lights" ? "See it at Christmas" : "See how it goes on"}
          <Arrow />
        </p>
      </div>
    </Link>
  );
}

export function Installs() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <h2 className="display-hero max-w-[24ch] text-foreground">
              Every surface worth lighting.
            </h2>
            <p className="lead mt-4 text-muted-foreground">
              One channel, one controller, one app. Start with the roofline and add to it whenever
              you like.
            </p>
          </div>
          <Button asChild size="md"><Link href="/services">Everything we install</Link></Button>
        </div>

        <div className="mt-14 space-y-16 lg:space-y-20">
          {LEAD.map((s, i) => <ServiceRow key={s} slug={s} flip={i % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}

/* 4 - WHAT PEOPLE SAY - the big number, and the quotes on bare ground
 *
 * THE THREE CARDS ARE GONE. They were the clearest instance of the whole problem: a review is
 * somebody else's sentence, and putting each one in a ringed, rounded, padded rectangle turns
 * three strangers' words into three identical UI components. Property Pest quotes its reviews as
 * text on plain background, which is what a quotation is.
 *
 * The archetype is the big-number pull quote, which nothing else on the page uses: the score at
 * display size on the left, the reviews stacked on the right with a hairline between them. No
 * container, no radius, no ring.
 *
 * WHAT IS REAL HERE AND WHAT IS NOT:
 *   the text     verbatim from the review, never tidied or shortened
 *   the name     as Google shows it
 *   the date     only where Google gave one. Four of the six have none, so four carry none.
 *                Inventing "3 weeks ago" to even up a row is the small lie that makes a real
 *                review look fabricated.
 *   the stars    every one of these is five, which is why the average is 5.0
 *   no avatars   we do not have their profile pictures, and generating a face for a real named
 *                customer is not a thing this site will ever do. The initial discs went with
 *                the cards and are not missed: they were decoration standing in for a person.
 */
export function Proof() {
  const three = reviews.slice(0, 3);
  return (
    <section className="section bg-background">
      <div className="shell grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-24">
        <div>
          <p className="u font-display text-[clamp(3.5rem,5vw,5rem)] font-bold leading-[0.85] tracking-[-0.04em] text-foreground">
            {reviewProof.average}
          </p>
          <Stars className="mt-5" size="1.15rem" />
          {/* SHORT, BECAUSE THE COLUMN IS 22rem. A display-size headline in a narrow column wraps
            * to four lines, which is the "font is way too big" complaint arriving by a different
            * route: the type was not too big, the measure was too small for it. Either the column
            * widens or the headline shortens, and here the headline shortens. */}
          <h2 className="display-section mt-6 text-foreground">
            What Omaha homeowners say.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Across <span className="u font-semibold text-foreground">{reviewProof.count}</span>{" "}
            {googleLogo ? "" : "Google "}reviews.
          </p>
          <Link
            href="/reviews"
            data-spot
            className="group mt-5 inline-block font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
          >
            Read all of them
            <Arrow />
          </Link>
        </div>

        <ul>
          {three.map((r, i) => (
            <li key={r.name} className={i ? "mt-10 border-t border-border pt-10" : ""}>
              <blockquote className="text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed text-foreground">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Stars size="0.9rem" />
                <span className="font-display text-[0.98rem] font-bold text-foreground">{r.name}</span>
                {r.when && <span className="text-sm text-muted-foreground">{r.when}</span>}
                <span className="text-sm text-muted-foreground">on Google</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 5 - THE BAND
 *
 * The client, on an earlier pass: not enough design or colour. TruGreen puts a coloured
 * call-to-action band across the middle of its home page and it does two jobs at once: it is the
 * strongest colour on the page, and it is a landmark, so a reader scrolling knows where they are.
 * Amber is defensible on a lighting site because amber IS the product. Full width, no container.
 */
export function Band() {
  return (
    <section className="bg-accent">
      <div className="shell flex flex-wrap items-center justify-between gap-x-12 gap-y-7 py-14">
        <div>
          <h2 className="display-section max-w-[26ch] text-accent-foreground">
            Book before November 15 to be lit for Christmas.
          </h2>
          <p className="mt-3 text-lg text-accent-foreground/80">
            One visit to design it, one day to install it, and nobody on a ladder in December.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/free-design-consultation"
            className="tap-44 inline-flex h-12 items-center bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
          >
            Book the on-site measure
          </Link>
          <a href={site.phoneHref} className="u text-lg font-bold text-accent-foreground underline decoration-2 underline-offset-4">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* 6 - THE WORK - a filmstrip that runs off the right edge of the screen
 *
 * WHAT THIS REPLACES, AND WHY THE OLD ONE WAS THE WORST OFFENDER. Six photographs, each with a
 * caption bar bolted underneath, each wrapped in a ring, all six identical, in two rows of three.
 * Read as a card grid because it was one. The caption bar was the tell: the picture and its label
 * were welded into a UI component instead of a picture with a caption under it.
 *
 * Property Pest lets photographs bleed off the side of the page, and that is the move here. The
 * strip starts flush with the shell's left edge and runs past the right edge of the viewport, so
 * roughly three and a half pictures are visible and the cut-off fourth is what tells you to keep
 * going. Nothing is boxed. Each caption sits on the navy ground beneath its picture.
 *
 * 4:3, not 21:9. The earlier full-bleed band paired `aspect-21/9` with `max-h-[24rem]`, which are
 * two rules fighting: the element wanted 814px on a wide screen and the max-height clamped it to
 * 384, so object-cover threw away the top and bottom. The client, exactly right: "way too wide,
 * and cutting off most of the house". A house is not a cinema subject. Never an aspect ratio and
 * a max-height on the same box.
 *
 * The left padding matches the shell's own left edge at every width: below the container cap the
 * calc collapses to the 2rem gutter, above it the strip lines up with the headline above it.
 */
const WORK: { key: string; scene: string; note: string }[] = [
  { key: "homeBrickGablesGold", scene: "Warm white", note: "A complicated roof. More gables means more corners to get right." },
  { key: "seqRedGreen", scene: "Red and green", note: "The same house, the December scene, one tap apart." },
  { key: "poolPergolaDusk", scene: "Pergola run", note: "Pool at dusk. The reason people buy the overhead run." },
  { key: "homeShakeBrick", scene: "Warm white", note: "Downlights along every eave and gable on a traditional elevation." },
  { key: "homeWideRanch", scene: "One long run", note: "The hardest elevation to light. A straight run shows every sag." },
  { key: "homePrairieTwilight", scene: "Civil twilight", note: "The twenty minutes when this product looks its best." },
];

export function Work() {
  const shots = WORK.map((w) => ({ ...w, img: images[w.key] })).filter((w) => w.img?.src);
  return (
    <section className="section bg-primary">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="display-hero max-w-[22ch] text-on-dark">
              Houses lit by our lights around Omaha.
            </h2>
            <p className="lead mt-4 text-on-dark-muted">
              Photographed on the property at night with the system running, so what you are
              looking at is the output rather than a rendering of it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Button asChild size="md"><Link href="/gallery">See the full gallery</Link></Button>
            <Link
              href="/recent-projects"
              className="font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              House by house
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-4 overflow-x-auto pb-2 pl-4 md:gap-6 md:pl-8 lg:pl-[calc((100vw-min(var(--container),100vw))/2+2rem)]">
        {shots.map((w) => (
          <Link
            key={w.key}
            href="/gallery"
            data-spot
            className="group w-[80vw] shrink-0 sm:w-[52vw] lg:w-[28rem]"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={w.img.src as string}
                alt={w.img.alt}
                fill
                sizes="(min-width:1024px) 28rem, (min-width:640px) 52vw, 80vw"
                className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 font-display text-[1.05rem] font-bold leading-tight text-on-dark">
              {w.scene}
              <Arrow />
            </p>
            <p className="mt-1.5 max-w-[36ch] text-[0.92rem] leading-snug text-on-dark-muted">{w.note}</p>
          </Link>
        ))}
        {/* A trailing gutter, so the last picture does not sit hard against the viewport edge
          * when the strip is scrolled to its end. */}
        <span className="w-4 shrink-0 md:w-8" aria-hidden />
      </div>
    </section>
  );
}

/* 7 - THE HARDWARE - a ruled list, not four little cards
 *
 * These were four rounded cards with rings, which is a lot of drawn furniture for what is a list
 * of four product lines. A hairline between rows does the same job with nothing drawn around it,
 * and it is the archetype TruGreen uses for its comparison rows.
 *
 * THE LOGOS ARE THE SAME WALL AS THE GOOGLE MARK. Haven and Jellyfish are somebody else's
 * trademarks. They get used in their own colours from their own asset pack or not at all: not
 * traced from memory, not lifted off a dealer page, not set in Archivo. `systemLogo` in
 * content/badges.ts is the slot; ask Haven's rep for the dealer kit.
 *
 * WHAT FIXES THE COLOUR IS BETTER THAN A LOGO ANYWAY. Each of these four lines IS a place on the
 * property and there is a real photograph of every one: the eave, the soffit, the beds, the
 * pergola. A square thumbnail per row turns a text table into four things you can see, and the
 * colour arrives from the work rather than from a decorative fill.
 */
const HAVEN: { name: string; what: string; slug: string; photo: string }[] = [
  { name: "Haven Evolution", what: "The roofline channel and the diodes that sit in it.", slug: "haven-evolution", photo: "detailGableMiter" },
  { name: "Haven Q Series", what: "Soffit and architectural fixtures, recessed or on track.", slug: "haven-q-series", photo: "serviceSoffit" },
  { name: "Haven 9 Series", what: "Ground level: path, uplight and bed fixtures.", slug: "haven-9-series-landscape-lights", photo: "serviceLandscape" },
  { name: "Haven X Bistro", what: "Overhead runs on a pergola, a patio or a structure.", slug: "haven-x-bistro-lights", photo: "servicePatio" },
];

export function Hardware() {
  return (
    <section className="section bg-muted">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="display-section text-foreground">
            We lead with Haven, and install every line of it.
          </h2>
          <p className="lead mt-5 text-muted-foreground">
            One manufacturer for the roofline, the soffit, the ground and the overhead runs, so the
            whole property answers to the same app.
          </p>
          <Link
            href="/lighting-systems"
            data-spot
            className="group mt-7 inline-block font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
          >
            See every system
            <Arrow />
          </Link>
        </div>

        <ul className="border-t border-border">
          {HAVEN.map((h) => {
            const img = images[h.photo];
            return (
              <li key={h.slug} className="border-b border-border">
                <Link
                  href={`/lighting-systems/${h.slug}`}
                  data-spot
                  className="group flex items-center gap-6 py-5"
                >
                  {img?.src && (
                    <span className="relative block size-20 shrink-0 overflow-hidden bg-primary">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.06]"
                      />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.1rem] font-bold text-foreground group-hover:underline decoration-accent decoration-2 underline-offset-4">
                      {h.name}
                    </span>
                    <span className="mt-1 block text-[0.95rem] leading-snug text-muted-foreground">{h.what}</span>
                  </span>
                  <span className="shrink-0 text-muted-foreground transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 7b - WHY US - the same content, on a full-width ground instead of in a rounded panel
 *
 * This was a `rounded-lg bg-primary` block sitting inside the cream section next door: a navy
 * rectangle with soft corners floating in a field, which is the single most card-like thing a
 * layout can do. It is now its own section, so the navy runs the full width of the browser and
 * the change of ground is the divider. Same four arguments, no container drawn around them.
 */
const CREW: [string, string][] = [
  ["Our own crews, never subcontracted", "The people on your roof are Brytr employees on Brytr payroll, and it is the same crew from the measure to the handover."],
  ["Day and night verification", "We do not leave until you have seen it lit after dark and seen how it reads from the street in daylight."],
  ["Into fascia, never shingles", "Every penetration sealed as it is made, mitred at every valley, dormer and return."],
  ["Concealed wire runs", "Nothing dropped down a downspout or run across a soffit, and a sealed cap closes the run."],
];

export function Crew() {
  return (
    <section className="section bg-primary">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="display-section text-on-dark">
            The people who quote your roof install it.
          </h2>
          <p className="lead mt-5 text-on-dark-muted">
            That is the reason Zac and Sam started Brytr, and it is still the part of this they
            will not hand to anybody else.
          </p>
          <Link
            href="/how-it-works"
            data-spot
            className="group mt-7 inline-block font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
          >
            See how an install runs, start to finish
            <Arrow />
          </Link>
        </div>

        <ul className="grid gap-x-14 gap-y-9 sm:grid-cols-2">
          {CREW.map(([h, p]) => (
            <li key={h} className="border-t border-on-dark/15 pt-5">
              <h3 className="font-display text-[1.05rem] font-bold leading-snug text-on-dark">{h}</h3>
              <p className="mt-2 text-[0.95rem] leading-snug text-on-dark-muted">{p}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 8 - THE CLOSER
 *
 * The form keeps its surface, and it is the only thing on the page that does. A form is genuinely
 * an object you type into: the edge tells you where the fields are. That is a container doing
 * work, which is the whole test.
 */
export function Closer() {
  return (
    <section className="section bg-background">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-start lg:gap-20">
        <div>
          <h2 className="display-hero max-w-[18ch] text-foreground">
            See it on your house before you buy.
          </h2>
          <p className="lead mt-4 text-muted-foreground">
            We come out after dark, walk the property, and show you the design on your own
            elevation. No charge, and no obligation.
          </p>
          <p className="mt-8 text-base text-muted-foreground">Or call us directly</p>
          <a
            href={site.phoneHref}
            className="u mt-1 block font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold tracking-[-0.03em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>
        </div>
        <QuoteForm variant="compact" heading="Get a free design consultation" />
      </div>
    </section>
  );
}
