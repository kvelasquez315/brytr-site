import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { Button } from "@/components/ui/button";
import { QuoteForm, SectionHead } from "@/components/ui/bits";
import { iconMap, type IconKey } from "@/content/icon-map";

/* SIX ROUNDS OF RESTYLING, AND THE PROBLEM WAS THE CONTENT.
 *
 * The client kept saying the same thing and I kept hearing it as a design note: "very jumbled with
 * random things, not pointing out what it's actually talking about", "I'm not really sure what I'm
 * looking at." I answered with layout five times and with section labels once. None of it worked,
 * because the words on the page were the problem.
 *
 * WHAT WAS ACTUALLY WRONG, found by reading content/services.ts instead of the CSS:
 *
 *   THE SERVICES SECTION LISTED THE SAME PRODUCT THREE TIMES. "Permanent Outdoor Lighting",
 *   "Permanent Christmas Lights" and "Permanent Roofline Lighting" are one product, one PART of it,
 *   and one USE of it. Three headings that all say permanent lighting, and no way for a homeowner
 *   to tell them apart, because there is nothing to tell apart.
 *
 *   "WHY HOMEOWNERS CHOOSE US" ANSWERED WITH SKU NAMES. Haven Evolution, Haven Q Series, Haven 9
 *   Series, Haven X Bistro. Somebody else's part numbers, under a heading promising reasons.
 *
 *   THE MENU SAID THE SAME WORD TWICE. "Systems" and "Lighting" as separate top-level items, while
 *   the page said "services" - three words for one thing. Fixed in content/nav.ts.
 *
 * So: the product once, then the four places it goes. Reasons where reasons were promised. And the
 * hardware moved to /lighting-systems, where the person who wants a part number is already headed.
 *
 * THE VISUAL VOCABULARY IS UNCHANGED and still taken off the references with the pages open:
 * propertypest.com is cards at 14.4px on cream and dark-green grounds with eighty-three pills and a
 * shadow so faint it is almost absent; trugreen.com is three ~14px cards and pill buttons;
 * freedomexteriorsusa.com labels every section with an accent eyebrow, a plain headline and one line
 * of explanation. Cards, pills, bento, photography inside the cards, and a header on every section.
 */

/* ---- the shared vocabulary, so the page reads as one system ------------------ */

function Arrow() {
  return (
    <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
      &rarr;
    </span>
  );
}

/* Property Pest sets its card lists with a small accent dot rather than a tick. A dot reads as a
 * specification line; a tick reads as a sales claim. */
function DotList({ items, onDark }: { items: string[]; onDark?: boolean }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span className={`text-[0.95rem] leading-snug ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
            {i}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* Five stars: not a trademark, and the same glyph the trust band uses so the mark means one thing
 * across the site. The Google wordmark stays a slot rather than a drawing. Property Pest writes
 * "Verified Google review" in plain type under the name, which is the honest version of this. */
function Stars({ className, size = "1rem" }: { className?: string; size?: string }) {
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

/* ==============================================================================
 * 3 - OUR SERVICES - ONE product, then the places it goes
 *
 * THIS IS THE REAL FIX, AND IT IS NOT A STYLING ONE. Six rounds of restyling never touched the
 * actual problem, which the client kept describing accurately and I kept mishearing: "very jumbled
 * with random things, not pointing out what it's actually talking about."
 *
 * WHAT WAS HERE. Three cards headed "Permanent Outdoor Lighting", "Permanent Christmas Lights" and
 * "Permanent Roofline Lighting". Those are not three services. They are ONE product (a permanent
 * channel of addressable LEDs on the house), plus one PART of it (the roofline is where the channel
 * goes), plus one USE of it (at Christmas you set the scene to red and green). A homeowner read
 * three headings that all said "permanent lighting" and could not tell what the difference was,
 * because there is no difference. That is the jumble.
 *
 * WHAT IT IS NOW, which is what the client chose: the product ONCE, explained in a wide card at the
 * top, and then the four PLACES it goes underneath - roofline, landscape, patio and pergola,
 * hardscape. Christmas is named inside the product card as a use of the same lights, which is the
 * truth and keeps the search term on the page. Five things on screen, and each one answers a
 * different question instead of restating the last.
 *
 * Each place card carries an amber icon tile. That is the site's own channel-tile device, it makes
 * the four cards scannable as categories rather than a wall of photographs, and it is a deliberate
 * answer to "the design of it is just boring" - the accent was doing almost nothing on this page.
 * ============================================================================ */
const PRODUCT = "permanent-outdoor-lighting";

/* The four places, in the order a house gets done. Every slug is a real page. */
const PLACES: { slug: string; label: string; icon: IconKey }[] = [
  { slug: "permanent-roofline-lighting", label: "Roofline and eaves", icon: "roofline" },
  { slug: "landscape-lighting", label: "Beds, trees and paths", icon: "pathLight" },
  { slug: "patio-pergola-bistro-lighting", label: "Patio and pergola", icon: "pergola" },
  { slug: "hardscape-lighting", label: "Walls, steps and coping", icon: "hardscape" },
];

function svc(slug: string) {
  const s = services.find((x) => x.slug === slug);
  return s ? { ...s, img: s.photo ? images[s.photo] : undefined } : undefined;
}

export function Installs() {
  const product = svc(PRODUCT);
  const places = PLACES.map((p) => ({ ...p, svc: svc(p.slug) })).filter((p) => p.svc);
  if (!product) return null;
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="Our services"
          title="One system. Every place you want light."
          lede="One channel of LEDs and one app, installed once. Start at the roofline and add the rest whenever you like - it is the same system running all of it."
        />

        {/* THE PRODUCT, once. A wide card so it reads as the thing itself rather than as one of
          * four equal options, which is what the old three-up grid made it. */}
        <div className="mt-10 grid overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {product.img?.src && (
            <div className="relative aspect-16/10 w-full lg:aspect-auto lg:min-h-[24rem]">
              <Image
                src={product.img.src}
                alt={product.img.alt}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8 lg:p-10">
            <p className="eyebrow">The product</p>
            <h3 className="display-section mt-3 text-foreground">Permanent outdoor lighting</h3>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted-foreground">
              A slim channel of addressable LEDs, color-matched to your fascia so it disappears in
              daylight, wired once and run from your phone. Warm white every night of the year, and
              any color you want on the nights you want it.
            </p>
            <DotList items={product.includes.slice(0, 3)} />
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button asChild size="md">
                <Link href={`/services/${product.slug}`}>How the system works</Link>
              </Button>
              {/* Christmas is a USE of the product, not a separate service, so it is named here
                * rather than given a card of its own. It is also the term people search for, which
                * is why the link stays on the home page. */}
              <Link
                href="/services/permanent-christmas-lights"
                data-spot
                className="group font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
              >
                Nobody on a ladder in December
                <Arrow />
              </Link>
            </div>
          </div>
        </div>

        {/* THE PLACES it goes. Four, each answering "can you do my ___", which is the question a
          * homeowner actually arrives with. */}
        <p className="eyebrow mt-12">
          <span className="channel-mark" aria-hidden />
          Where it goes
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((p) => {
            const I = iconMap[p.icon];
            return (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                data-spot
                className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                {p.svc!.img?.src && (
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={p.svc!.img.src}
                      alt={p.svc!.img.alt}
                      fill
                      sizes="(min-width:1024px) 23vw, (min-width:640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.05]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className="grid size-10 place-items-center rounded-md bg-accent text-accent-foreground"
                    aria-hidden
                  >
                    <I className="size-6" />
                  </span>
                  <p className="mt-4 font-display text-[1.08rem] font-bold leading-tight text-foreground group-hover:underline decoration-accent decoration-2 underline-offset-4">
                    {p.label}
                  </p>
                  <p className="mt-1.5 flex-1 text-[0.9rem] leading-snug text-muted-foreground">
                    {p.svc!.short}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==============================================================================
 * 7 - REVIEWS - the Google review cards
 *
 * These were three white cards with a star row, and the client had asked for them in exactly those
 * words: "Design these so they look like actual review cards from Google and use the Google logo
 * on it and stars." I deleted them in the de-box round on the strength of a bad reading of a text
 * dump - overriding a direct instruction with an inference, which is the worst item on this whole
 * list. They are back and they are not moving again.
 *
 * Property Pest's version is the same object: white 14px card, star row along the top, the quote,
 * then the name in bold with "Verified Google review" beside it in grey. Above the row: headline,
 * a star row with a one-line subhead, and an outlined pill to read the rest.
 *
 * THE SECTION SITS LATE NOW, where Freedom puts its testimonials. It used to be fourth, which
 * spent the page's proof before the reader had seen any of the work it was about.
 *
 * WHAT IS REAL AND WHAT IS NOT:
 *   the text     verbatim from the review, never tidied or shortened
 *   the name     as Google shows it
 *   the date     only where Google gave one. Four of the six have none, so four carry none.
 *   the stars    every one of these is five, which is why the average is 5.0
 *   the mark     "Verified Google review" in type, because the official Google review-display
 *                asset pack is not on disk. A trademark gets used from its owner's pack or not at
 *                all. `googleLogo` in content/badges.ts renders it the moment the file lands.
 *   no avatars   we do not have their profile pictures, and generating a face for a real named
 *                customer is not a thing this site will ever do.
 * ============================================================================ */
export function Proof() {
  const three = reviews.slice(0, 3);
  return (
    <section className="section bg-background">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <SectionHead
              eyebrow="Reviews"
              title="What Omaha homeowners say"
              lede="Real reviews, quoted word for word, from people whose houses are in the photographs above."
            />
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Stars size="1.1rem" />
              <p className="text-base text-muted-foreground">
                <span className="u font-semibold text-foreground">{reviewProof.average}</span>{" "}
                across <span className="u font-semibold text-foreground">{reviewProof.count}</span>{" "}
                {googleLogo ? "" : "Google "}reviews
              </p>
            </div>
          </div>
          <Link
            href="/reviews"
            className="tap-44 inline-flex h-11 items-center rounded-full border border-border px-6 text-[0.95rem] font-semibold text-foreground transition-colors duration-[--dur-fast] hover:bg-muted"
          >
            Read all reviews
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {three.map((r) => (
            <article key={r.name} className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
              <Stars />
              <blockquote className="mt-4 flex-1 text-[1rem] leading-relaxed text-muted-foreground">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <footer className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-display text-[1rem] font-bold text-foreground">{r.name}</span>
                {googleLogo ? (
                  <Image src={googleLogo} alt="Google" width={18} height={18} className="size-[1.125rem]" />
                ) : null}
                <span className="text-sm text-muted-foreground">
                  {googleLogo ? "review" : "Verified Google review"}
                  {r.when ? ` · ${r.when}` : ""}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==============================================================================
 * 8 - THE BAND - the amber call to action
 *
 * TruGreen runs a coloured call-to-action band across the middle of its home page, and Freedom puts
 * a photographic one just before its footer with two buttons on it. It does two jobs at once: it is
 * the strongest colour on the page, and it is a landmark, so a reader scrolling knows where they
 * are. Amber is defensible on a lighting site because amber IS the product. No eyebrow on this one
 * on purpose - it is an instruction, not a section to read.
 * ============================================================================ */
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
            className="tap-44 inline-flex h-12 items-center rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
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

/* ==============================================================================
 * 5 - OUR WORK - the bento gallery
 *
 * THE HORIZONTAL SCROLL IS GONE. The client: "some random scroll going on, like a little page
 * where we have the whole gallery at." Right again - a scroll container on a home page hides most
 * of its own content behind a gesture nobody is looking for, and neither reference does it
 * anywhere.
 *
 * Property Pest's pests block is the pattern instead: one tall photo card with the type over the
 * photograph, beside a 2x2 of shorter cards, each a photograph with a white body under it carrying
 * a title and one line. Five photographs, all visible at once, all whole houses.
 * ============================================================================ */
/* ORDER MATTERS HERE: the first frame becomes the tall card, which is the largest picture in the
 * section. It has to be one of the twilight shots. Leading with homeBrickGablesGold put the
 * darkest frame in the set at 24rem tall and it read as a black rectangle with a caption on it. */
const WORK: { key: string; scene: string; note: string }[] = [
  { key: "homePrairieTwilight", scene: "Civil twilight", note: "The twenty minutes when this product looks its best." },
  { key: "seqRedGreen", scene: "Red and green", note: "The same house, the December scene, one tap apart." },
  { key: "poolPergolaDusk", scene: "Pergola run", note: "Pool at dusk. The reason people buy the overhead run." },
  { key: "homeBrickGablesGold", scene: "Warm white", note: "A complicated roof. More gables, more corners to get right." },
  { key: "homeShakeBrick", scene: "Warm white", note: "Downlights along every eave and gable." },
];

export function Work() {
  const shots = WORK.map((w) => ({ ...w, img: images[w.key] })).filter((w) => w.img?.src);
  const [hero, ...four] = shots;
  if (!hero) return null;
  return (
    <section className="section bg-primary">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            onDark
            eyebrow="Our work"
            title="Houses we have lit around Omaha"
            lede="Every photograph here is a finished Brytr install, shot on the property at night with the system running. None of it is a rendering."
          />
          <Button asChild size="md"><Link href="/gallery">See the full gallery</Link></Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Link
            href="/gallery"
            data-spot
            className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-lg bg-raise p-7 sm:p-8"
          >
            <Image
              src={hero.img.src as string}
              alt={hero.img.alt}
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 via-45% to-transparent" aria-hidden />
            <div className="relative">
              <p className="eyebrow eyebrow--on-dark">{hero.scene}</p>
              <p className="mt-2 max-w-[30ch] font-display text-[1.35rem] font-bold leading-tight text-on-dark">
                {hero.note}
              </p>
              <p className="label mt-5 text-accent">
                See the gallery
                <Arrow />
              </p>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2">
            {four.map((w) => (
              <Link
                key={w.key}
                href="/gallery"
                data-spot
                className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={w.img.src as string}
                    alt={w.img.alt}
                    fill
                    sizes="(min-width:1024px) 28vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-[1.05rem] font-bold leading-tight text-foreground group-hover:underline decoration-accent decoration-2 underline-offset-4">
                    {w.scene}
                  </p>
                  <p className="mt-1.5 text-[0.9rem] leading-snug text-muted-foreground">{w.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==============================================================================
 * 6 - WHY HOMEOWNERS CHOOSE US - reasons, not part numbers
 *
 * WHAT WAS HERE: four cards headed "Haven Evolution", "Haven Q Series", "Haven 9 Series" and
 * "Haven X Bistro", under a heading that promised reasons to choose Brytr. Those are a
 * manufacturer's SKU names. Nobody shopping for lights on their house knows what a Q Series is, and
 * a section titled "why choose us" that answers with somebody else's part numbers is the clearest
 * case on the page of the client's "random things, not pointing out what it's actually talking
 * about". The client chose reasons; the SKU cards move to /lighting-systems, where the person who
 * wants that detail is already looking for it.
 *
 * The four reasons are the four things the client has actually confirmed about how Brytr works. No
 * warranty term, no licence number, no years-in-business, because none of those are on file here and
 * an invented credential is the one thing this section must never carry.
 *
 * Haven still gets its credit and its internal link, in one line at the foot, which is the right
 * weight for it: the brand matters to the six people who research hardware and to nobody else.
 * ============================================================================ */
const REASONS: { icon: IconKey; title: string; body: string }[] = [
  {
    icon: "hardHat",
    title: "Our own crews, never subcontracted",
    body: "The people on your roof are Brytr employees on Brytr payroll, and it is the same crew from the measure to the handover.",
  },
  {
    icon: "dayNight",
    title: "Checked after dark and in daylight",
    body: "We do not leave until you have seen it lit at night and seen how the channel reads from the street by day.",
  },
  {
    icon: "weatherSealed",
    title: "Into fascia, never shingles",
    body: "Every penetration sealed as it is made, and mitered at every valley, dormer and return so the run turns the corner cleanly.",
  },
  {
    icon: "measured",
    title: "Wire runs you cannot find",
    body: "Nothing dropped down a downspout or dragged across a soffit. The run is concealed the whole way and a sealed cap closes it.",
  },
];

export function Hardware() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="Why homeowners choose us"
          title="The crew that quotes it is the crew that installs it"
          lede="Permanent lighting is drilled into your house once. These are the four things we do differently, and they are the reason it still looks right in five years."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => {
            const I = iconMap[r.icon];
            return (
              <div key={r.title} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <span
                  className="grid size-11 place-items-center rounded-md bg-accent text-accent-foreground"
                  aria-hidden
                >
                  <I className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold leading-snug text-foreground">
                  {r.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            );
          })}
        </div>

        {/* Haven, at the weight it deserves: one line and a link, not four cards of part numbers.
          * The trademark is used as a word here, which is fair use of a brand name we stock - the
          * LOGO is still a slot in content/badges.ts and still needs their dealer kit. */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-lg bg-primary px-7 py-6">
          <p className="text-[0.98rem] text-on-dark-muted">
            We lead with Haven and install every line of it - the roofline channel, the soffit
            fixtures, the ground lighting and the overhead runs.
          </p>
          <Link
            href="/lighting-systems"
            data-spot
            className="group shrink-0 font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
          >
            See the hardware
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==============================================================================
 * 9 - FREE CONSULTATION - the closer
 * ============================================================================ */
export function Closer() {
  return (
    <section className="section bg-background">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-start lg:gap-20">
        <div>
          <SectionHead
            eyebrow="Free consultation"
            title="See it on your house before you buy"
            lede="We come out after dark, walk the property, and show you the design on your own elevation. No charge and no obligation."
          />
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
