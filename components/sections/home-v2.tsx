import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/ui/bits";

/* BUILT FROM THE REFERENCES THIS TIME, WITH THE REFERENCES ACTUALLY OPEN.
 *
 * Four rounds went wrong for one reason: I never looked at propertypest.com or trugreen.com. I ran
 * them through a markdown converter, which strips every CSS class, saw no `rounded-*` in the
 * output, and concluded neither site used a radius. On that basis I deleted every card on this
 * page, wrote a build gate to keep them out, and removed the Google review cards the client had
 * asked for in so many words. His read of the result was "insanely boxy" and "atrocious". Both
 * were fair.
 *
 * WHAT IS ACTUALLY ON THOSE TWO PAGES, read off the live DOM:
 *
 *   propertypest.com   Cards on every section, 14.4px radius, on cream and dark-green grounds.
 *                      EIGHTY-THREE fully-rounded pills: buttons, chips, town tags. A shadow so
 *                      faint it is almost absent (rgba(26,26,24,.06) 0 1px 2px). Bento asymmetry
 *                      throughout: the pests block is one tall photo card beside a 2x2 of small
 *                      photo-topped cards; the audience block is one tall photo card beside two
 *                      stacked cards with a photo strip down their left edge. Reviews are white
 *                      cards with a rust star row and "Verified Google review" under the name.
 *
 *   trugreen.com       The comparison is three ~14px cards, one near-black and two pale mint.
 *                      Every button is a pill. Big short headline, one accent green.
 *
 * So the vocabulary is THE CARD, THE PILL, THE BENTO, and photography inside the cards. Which is
 * the exact opposite of what I shipped. Everything below is those four things, in Brytr's navy,
 * cream and amber instead of Property Pest's green, cream and rust.
 *
 * AND THE CLIENT OUTRANKS THE REFERENCE WHERE THEY DISAGREE. Property Pest's trust bar is a solid
 * band with three credential badges; he asked for a translucent overlay on the hero with no
 * badges, so that is what it is. He asked for Google-style review cards, so they are back.
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

/* Five stars: not a trademark, and the same glyph the trust bar uses so the mark means one thing
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
 * 2 - WHAT WE INSTALL - the bento: one tall photo card, two stacked beside it
 *
 * WHAT THIS REPLACES. Three full-width rows, photograph one side and copy the other, alternating
 * down the page. The client: "text on the side of images going all the way down, just taking up a
 * ton of space for services." Right on both counts - three services took three screens, and every
 * row was the same shape as the last.
 *
 * Property Pest's audience block is the pattern: a tall photo card with the type set over the
 * bottom of the photograph, and two shorter cards stacked beside it, each with a narrow photo
 * strip down its left edge. Three services, one screen, three different card shapes.
 * ============================================================================ */
const LEAD = ["permanent-outdoor-lighting", "permanent-christmas-lights", "permanent-roofline-lighting"];

function svc(slug: string) {
  const s = services.find((x) => x.slug === slug);
  return s ? { ...s, img: s.photo ? images[s.photo] : undefined } : undefined;
}

export function Installs() {
  const [tall, ...rest] = LEAD.map(svc);
  if (!tall) return null;
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <p className="eyebrow">What we install</p>
            <h2 className="display-hero mt-3 max-w-[24ch] text-foreground">
              Every surface worth lighting.
            </h2>
            <p className="lead mt-4 text-muted-foreground">
              One channel, one controller, one app. Start with the roofline and add to it whenever
              you like.
            </p>
          </div>
          <Button asChild size="md"><Link href="/services">Everything we install</Link></Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.02fr_1fr]">
          <Link
            href={`/services/${tall.slug}`}
            data-spot
            className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg bg-primary p-7 sm:p-9"
          >
            {tall.img?.src && (
              <Image
                src={tall.img.src}
                alt={tall.img.alt}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
              />
            )}
            {/* Scrimmed at the BOTTOM ONLY. At via-primary/70 this covered the middle of an already
              * dark night photograph and the card read as a black rectangle with type on it. */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 via-45% to-transparent" aria-hidden />
            <div className="relative">
              <p className="eyebrow eyebrow--on-dark">The whole property</p>
              <h3 className="display-section mt-2 text-on-dark">{tall.name}</h3>
              <p className="mt-3 max-w-[42ch] text-[0.98rem] leading-relaxed text-on-dark-muted">{tall.short}</p>
              <DotList items={tall.includes.slice(0, 3)} onDark />
              <p className="label mt-6 text-accent">
                Explore the whole-home system
                <Arrow />
              </p>
            </div>
          </Link>

          <div className="grid gap-6">
            {rest.filter(Boolean).map((s) => (
              <Link
                key={s!.slug}
                href={`/services/${s!.slug}`}
                data-spot
                className="group grid overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                {s!.img?.src && (
                  <div className="relative aspect-16/10 sm:aspect-auto">
                    <Image
                      src={s!.img.src}
                      alt={s!.img.alt}
                      fill
                      sizes="(min-width:640px) 10rem, 100vw"
                      className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.05]"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-[1.3rem] font-bold leading-tight text-foreground">{s!.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{s!.short}</p>
                  <DotList items={s!.includes.slice(0, 2)} />
                  <p className="label mt-5 text-accent-ink">
                    {s!.name === "Permanent Christmas Lights" ? "See it at Christmas" : "See how it goes on"}
                    <Arrow />
                  </p>
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
 * 4 - WHAT PEOPLE SAY - the Google review cards, restored
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
            <h2 className="display-hero max-w-[22ch] text-foreground">
              What Omaha homeowners say.
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Stars size="1.1rem" />
              <p className="text-base text-muted-foreground">
                Real, verbatim reviews. <span className="u font-semibold text-foreground">{reviewProof.average}</span>{" "}
                across <span className="u font-semibold text-foreground">{reviewProof.count}</span>{" "}
                {googleLogo ? "" : "Google "}reviews.
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
 * 5 - THE BAND - the amber landmark
 *
 * TruGreen runs a coloured call-to-action band across the middle of its home page, and it does two
 * jobs at once: it is the strongest colour on the page, and it is a landmark, so a reader
 * scrolling knows where they are. Amber is defensible on a lighting site because amber IS the
 * product. Full width, no container, and the button is a pill like everything else now.
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
 * 6 - THE WORK - the bento gallery
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
          <div>
            <p className="eyebrow eyebrow--on-dark">Finished installs</p>
            <h2 className="display-hero mt-3 max-w-[22ch] text-on-dark">
              Houses lit by our lights around Omaha.
            </h2>
            <p className="lead mt-4 text-on-dark-muted">
              Photographed on the property at night with the system running, so what you are
              looking at is the output rather than a rendering of it.
            </p>
          </div>
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
 * 7 - HAVEN, AND WHY US - one section, Property Pest's closing composition
 *
 * This was two sections: a hairline-ruled list of Haven lines, then a separate full-width dark band
 * carrying the crew arguments. Both were flat type on flat ground, and the pair ran two screens.
 *
 * Property Pest closes with a left column of eyebrow, headline, body and a DARK STAT CARD carrying
 * four figures in its accent colour, beside a right column of white cards. That composition holds
 * both of these arguments at once in one screen, and the stat card is where the crew facts belong:
 * they are absolutes, not paragraphs.
 *
 * THE LOGOS ARE STILL A SLOT. Haven and Jellyfish are somebody else's trademarks: used in their
 * own colours from their own asset pack, or not used. `systemLogo` in content/badges.ts renders one
 * per row the moment a file lands. Until then each card carries a real photograph of what that line
 * actually does, which is more use to a homeowner than a wordmark anyway.
 * ============================================================================ */
const HAVEN: { name: string; what: string; slug: string; photo: string }[] = [
  { name: "Haven Evolution", what: "The roofline channel and the diodes that sit in it.", slug: "haven-evolution", photo: "detailGableMiter" },
  { name: "Haven Q Series", what: "Soffit and architectural fixtures, recessed or on track.", slug: "haven-q-series", photo: "serviceSoffit" },
  { name: "Haven 9 Series", what: "Ground level: path, uplight and bed fixtures.", slug: "haven-9-series-landscape-lights", photo: "serviceLandscape" },
  { name: "Haven X Bistro", what: "Overhead runs on a pergola, a patio or a structure.", slug: "haven-x-bistro-lights", photo: "servicePatio" },
];

/* Four absolutes, every one of them confirmed by the client. Nothing goes in a stat card without a
 * source: an invented figure in a stat card is the most quotable lie on a website. */
const CREW_FACTS: [string, string][] = [
  ["W2", "Our own crews, never subcontracted"],
  ["Twice", "Verified after dark and again in daylight"],
  ["Fascia", "Every fixing into board, never shingles"],
  ["Hidden", "Wire runs concealed, and capped at the end"],
];

export function Hardware() {
  return (
    <section className="section bg-muted">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="eyebrow">The hardware, and the crew</p>
          <h2 className="display-section mt-3 text-foreground">
            We lead with Haven, and install every line of it.
          </h2>
          <p className="lead mt-4 text-muted-foreground">
            One manufacturer for the roofline, the soffit, the ground and the overhead runs, so the
            whole property answers to the same app. Installed by the people who quoted it.
          </p>

          <div className="mt-7 rounded-lg bg-primary p-7">
            <dl className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {CREW_FACTS.map(([f, l]) => (
                <div key={l}>
                  <dt className="u font-display text-[1.6rem] font-bold leading-none text-accent">{f}</dt>
                  <dd className="mt-2 text-[0.9rem] leading-snug text-on-dark-muted">{l}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/how-it-works"
              data-spot
              className="group mt-7 inline-block border-t border-on-dark/15 pt-5 font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              See how an install runs, start to finish
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {HAVEN.map((h) => {
            const img = images[h.photo];
            return (
              <Link
                key={h.slug}
                href={`/lighting-systems/${h.slug}`}
                data-spot
                className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                {img?.src && (
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width:640px) 22vw, 100vw"
                      className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.05]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-[1.08rem] font-bold leading-tight text-foreground group-hover:underline decoration-accent decoration-2 underline-offset-4">
                    {h.name}
                  </p>
                  <p className="mt-1.5 flex-1 text-[0.9rem] leading-snug text-muted-foreground">{h.what}</p>
                  <p className="label mt-4 text-accent-ink">
                    See the line
                    <Arrow />
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
 * 8 - THE CLOSER
 * ============================================================================ */
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
