import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { QuoteForm } from "@/components/ui/bits";

/* THE HERO. ONE COMPONENT, EVERY PAGE.
 *
 * The client: "across the entire site, we need to make sure heroes and the trust banner are all the
 * same as how we have it designed on the homepage. The only thing different is going to be the
 * wording that you use for headings and descriptions."
 *
 * WHY THIS IS A NEW FILE RATHER THAN A PATCH. There were two heroes: components/sections/hero.tsx
 * for the home page, and PageHero in page-parts.tsx for the other seventy-three. PageHero was
 * written as a copy of the home hero and its own comment says so - "the home page's hero,
 * unconditionally". Then the home hero was rebuilt five times and PageHero was not, so by the time
 * he asked, the two had drifted on eight separate points:
 *
 *     h1 size          64px (display-hero-lg)      vs  54px
 *     the tagline      amber, under the h1         vs  absent
 *     lede             44ch at 1.15rem             vs  62ch at 1.2rem
 *     the button       white pill, phone glyph     vs  amber Button, no glyph
 *     the form         mini, 3 fields, limestone   vs  compact, 5 fields, white
 *     the trust band   plinth inside the section   vs  ProofRail, a whole separate section
 *     column          27rem                        vs  28rem
 *     height          fills the first screen       vs  py-20
 *
 * Patching PageHero would have closed those eight and left the mechanism that opened them. Two
 * implementations of one design drift by default; there is now one implementation, so "the only
 * thing different is the wording" is enforced by the type signature rather than by remembering.
 *
 * WHAT VARIES: h1, lede, the photograph, and the breadcrumb. That is it.
 *
 * WHAT CAME OUT, because the home hero does not have it and he said only the wording differs:
 *
 *   the eyebrow    twenty-six pages set a small label above the h1. The home hero deliberately has
 *                  NOTHING above its h1 - that is the single biggest thing learned from the Eden
 *                  reference - and on an interior page the breadcrumb directly above it already
 *                  says what section you are in. Two labels doing one job.
 *   `footnote`     eighteen pages passed an extra paragraph under the button. On /contact it stated
 *                  the rating - immediately above a plinth that states the rating.
 *   `stats`        a three-figure row. Zero pages passed it. Dead prop.
 *
 * THE BREADCRUMB STAYS on interior pages and is the one structural difference. It is navigation
 * rather than decoration, the home page has nothing to link back to, and removing it would cost
 * both a wayfinding aid and the breadcrumb schema.
 */

const FALLBACK_HERO = "/img/seq-everyday.jpg";

export function SiteHero({
  h1, lede, photo, photoAlt = "", objectPosition = "50% 50%", breadcrumb,
}: {
  /* The two things that change per page, and the reason this component takes props at all. */
  h1: string;
  lede: string;
  photo?: string;
  photoAlt?: string;
  objectPosition?: string;
  /* Rendered above the h1 on interior pages; the home page passes nothing. */
  breadcrumb?: React.ReactNode;
}) {
  return (
    /* 7.25rem is the chrome above it: the amber announcement strip (40px) and the sticky header
     * (h-19, 76px). `svh` not `vh`, because on mobile browsers `vh` excludes the collapsing address
     * bar and a 100vh hero ends up taller than the screen it is meant to fit. Gated to lg, and
     * min-height not height, so a short laptop grows instead of clipping the form. */
    <section className="bg-primary lg:flex lg:min-h-[calc(100svh-7.25rem)] lg:flex-col">
      <div className="relative isolate flex overflow-hidden lg:flex-1">
        <Image
          src={photo ?? FALLBACK_HERO}
          alt={photoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div className="hero-scrim absolute inset-0" aria-hidden />

        <div className="shell relative grid w-full items-center gap-12 py-16 lg:grid-cols-[1fr_27rem] lg:gap-16 lg:py-20">
          <div className="max-w-[38rem]">
            {breadcrumb}
            <h1 className="display-hero-lg text-on-dark">{h1}</h1>

            <p className="mt-6 max-w-[44ch] text-[1.15rem] leading-relaxed text-on-dark/90">{lede}</p>

            {/* One button, and it is the phone. The form is two columns to the right and its submit
              * is amber, so a second amber "book a consultation" here would be a third route to one
              * action competing with itself. */}
            {/* THE BUTTON HAD NO EDGE. A white pill on a photograph has nothing holding it apart
              * from a bright patch behind it, so it read as undefined - a ring and a real shadow
              * give it a boundary that does not depend on what the image is doing underneath.
              *
              * The glyph is redrawn too. It was a filled handset on a 20 grid whose path ran to the
              * very edge of the viewBox, so the earpiece clipped at small sizes - "the icon isn't
              * fully there". This one is stroked on a 24 grid with room around it. */}
            <a
              href={site.phoneHref}
              className="tap-44 mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-card px-8 text-[1.1rem] font-semibold text-foreground shadow-[var(--shadow-dark)] ring-1 ring-foreground/15 transition-colors duration-[--dur-fast] hover:bg-muted"
            >
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-accent-ink" fill="none"
                   stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6.2C3 14 10 21 17.8 21a2.5 2.5 0 0 0 2.7-2.5v-2a1.4 1.4 0 0 0-1.1-1.4l-3-.6a1.4 1.4 0 0 0-1.4.6l-.8 1.2a12.6 12.6 0 0 1-5.5-5.5l1.2-.8a1.4 1.4 0 0 0 .6-1.4l-.6-3A1.4 1.4 0 0 0 7.5 3.5Z" />
              </svg>
              Call {site.phone}
            </a>
          </div>

          <div className="lg:w-[27rem] lg:justify-self-end">
            <QuoteForm
              variant="mini"
              heading="Free design consultation"
              submitLabel="Request my free design"
              /* An outline as well as the shadow. The card is warm limestone on a night
                * photograph, and the shadow alone let its edge disappear wherever the image behind
                * it happened to be dark. */
              className="bg-background shadow-[var(--shadow-dark)] ring-1 ring-foreground/15"
            />
          </div>
        </div>

        {/* The channel edge, dividing the photograph from the plinth: the lit run along the bottom
          * of the building, with the ground below it. */}
        <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
      </div>

      <TrustPlinth />
    </section>
  );
}

/* THE TRUST BANNER. One centred line, and nothing else on it.
 *
 * This replaces ProofRail on every page, which was a whole section - eyebrow, 34px heading, a
 * shadowed pill, and a link - to carry one number. It is also, exactly, what the client asked for
 * several rounds ago and proof-rail.tsx quoted at the top of itself the entire time: "The trust
 * banner has way too much in it. It should just have reviews and then the Google logo."
 *
 * No `bg-*` class of its own, deliberately: it shows the hero section's own `bg-primary`, which
 * keeps scripts/section-rhythm.mjs seeing ONE ground for the hero rather than two adjacent
 * `bg-primary` events. The photograph's own bottom edge is heavier than flat primary, so the strip
 * still reads as a band beneath the image.
 */
export function TrustPlinth() {
  return (
    <Link
      href={reviewProof.url}
      target="_blank"
      rel="noopener noreferrer"
      /* EVERYTHING UP A STEP, AND THE BAND THE SAME HEIGHT. The client wanted the words bigger
        * "without changing the width or height of that little section", so the padding comes down
        * as the type goes up: 36px numeral at py-6 was an 84px band, 42px numeral at py-5 is 82px. */
      className="shell flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-5 text-center"
    >
      <span className="u font-display text-[2.6rem] font-bold leading-none text-on-dark">
        {reviewProof.average}
      </span>
      <span className="flex items-center gap-1" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 20 20" className="size-[1.6rem] text-accent" fill="currentColor">
            <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
          </svg>
        ))}
      </span>
      <span className="text-[1.25rem] text-on-dark-muted">
        across <span className="u font-semibold text-on-dark">{reviewProof.count}</span> reviews on{" "}
        {googleLogo ? (
          /* `unoptimized` because Next refuses SVG through the image optimizer unless
            * images.dangerouslyAllowSVG is set for the whole site, and this is one first-party
            * file we wrote. See the note in content/badges.ts. */
          <Image
            src={googleLogo}
            alt="Google"
            width={22}
            height={22}
            unoptimized
            className="inline-block size-[1.55rem] translate-y-[-0.15rem]"
          />
        ) : (
          <span className="font-display font-bold text-on-dark">Google</span>
        )}
      </span>
    </Link>
  );
}
