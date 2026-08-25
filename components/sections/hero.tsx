import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { QuoteForm } from "@/components/ui/bits";

/* THE HERO, built to edentreepros.com's, which the client brought as the reference: "I want the
 * hero to be more designed like how this Eden one here is designed. It has the banner at the
 * bottom, just with reviews and the Google logo, an image, and an optimized H1 form."
 *
 * WHAT EDEN'S ACTUALLY IS, read off the screenshot rather than remembered:
 *
 *   a full-bleed photograph with an even green-tinted scrim over the whole frame
 *   left column   a 64px H1 on two lines, one paragraph, and ONE button - a pale pill with a
 *                 phone glyph, "Call 402-332-2839". Nothing above the H1 at all.
 *   right column  a CREAM form card, "Free Estimate within 24 Hours", name and phone paired on
 *                 one row, a full-width field under them, a select, and a full-width green submit
 *   under it      a dark strip flush to the bottom of the photograph carrying one centred line:
 *                 4.9, five gold stars, "across 300+ reviews on", the Google mark. Nothing else.
 *
 * WHY IT READS AS DESIGNED AND OURS DID NOT. The H1 is the only thing in its half of the picture.
 * Everything that would have competed with it has been moved somewhere else rather than deleted -
 * the proof is in the strip, the second call to action is the form. Ours had the rating stacked
 * above the H1, so the first thing a reader met was a number, and the headline was the third
 * element down at 54px in a column that also carried two buttons.
 *
 * WHAT CHANGED HERE:
 *
 *   THE RATING MOVED OUT AND GOT BIGGER. It was a small inline row above the H1. It is now the
 *   plinth under the photograph, at 36px, centred, on its own. This is also - exactly - what the
 *   client asked for two rounds ago, quoted in proof-rail.tsx: "The trust banner has way too much
 *   in it. It should just have reviews and then the Google logo."
 *
 *   THE H1 WENT UP TO 64px. See `.display-hero-lg` in globals.css for why that is a fourth type
 *   size rather than a reuse of the section scale.
 *
 *   THE FORM CARD WENT LIGHT. It was `bg-raise`, a dark translucent panel, because the previous
 *   reference (Phoenix) uses one. Eden's is cream, and on a night photograph cream wins: it is the
 *   highest-contrast object in the frame, which is what you want for the one element on the page
 *   whose entire job is to get filled in. `bg-background` is Brytr's warm limestone - the token's
 *   own comment calls it "the daytime state" - and the inputs inside it are already `bg-card`
 *   white, so the card gets Eden's cream-card-with-white-fields separation without touching
 *   field.tsx.
 *
 *   TWO BUTTONS BECAME ONE, AND IT IS THE PHONE. There were two: an amber "Book a free design" and
 *   an outlined "Call". With a form card sitting 200px to the right whose submit is amber and asks
 *   for the same thing, the amber button on the left was a third route to one action. Eden's split
 *   is the right one - the form is the booking path, the single button is for somebody who would
 *   rather talk than type - and it leaves amber doing exactly one job in this section.
 *
 * THE GOOGLE MARK IS STILL MISSING AND IS STILL NOT BEING DRAWN. `googleLogo` in
 * content/badges.ts is `null`; the four-colour G is a trademark and the rule in that file is that
 * it gets used from Google's own asset pack for review displays or not at all. So the plinth sets
 * the word Google in the display face beside a five-star row we drew ourselves, which is not
 * anybody's trademark. Drop the official file at /public/logo/google.svg, set `googleLogo`, and
 * the real mark appears here with no other change - the markup already branches for it.
 */
export function Hero() {
  const bg = images.heroBg;

  return (
    /* THE SECTION FILLS THE FIRST SCREEN ON DESKTOP. The client: "the hero should be a bit longer
     * and fill up the screen on desktop because right now it's a bit short and I'm seeing the next
     * section before."
     *
     * 7.25rem is the chrome above it: the amber announcement strip (min-h-10 plus py-2, so 40px)
     * and the sticky header (h-19, 76px). Subtracting it means the plinth lands exactly on the fold
     * rather than the photograph running under it.
     *
     * `svh` not `vh`, because on mobile browsers `vh` is the viewport WITHOUT the collapsing
     * address bar, so a 100vh hero is taller than the screen it is meant to fit. It is gated to lg
     * anyway - on a phone the hero is as tall as its content and no taller.
     *
     * min-height, not height. On a short laptop (1440x700) the content plus padding exceeds the
     * available 584px and the section grows instead of clipping the form card. */
    <section className="bg-primary lg:flex lg:min-h-[calc(100svh-7.25rem)] lg:flex-col">
      {/* ── the photograph ── */}
      <div className="relative isolate flex overflow-hidden lg:flex-1">
        <Image
          src={bg.src as string}
          alt={bg.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-scrim absolute inset-0" aria-hidden />

        <div className="shell relative grid w-full items-center gap-12 py-16 lg:grid-cols-[1fr_27rem] lg:gap-16 lg:py-20">
          <div className="max-w-[38rem]">
            {/* Nothing above the H1. That is the single biggest difference between this hero and
              * the one it replaces. */}
            <h1 className="display-hero-lg text-on-dark">Permanent outdoor lighting in Omaha</h1>

            {/* THE TAGLINE, WHICH HAS BEEN SITTING IN content/site.ts UNUSED SINCE THE SITE WAS
              * BUILT. Six words that say the entire product argument, in the client's own voice,
              * and they appeared on no page at all.
              *
              * freedomexteriorsusa.com - the client's reference for brand fit - repeats one line
              * twice on its home page, in the hero and again at the close: "We show up when we say
              * we will, do honest work, and never push a project you don't need." That repetition
              * is most of what makes the site feel like it belongs to somebody. This does the same
              * with a line Brytr already owns.
              *
              * In amber, because this is the one place a brand line should carry the brand colour,
              * and because a warm line under a white headline on a night photograph is the product
              * itself. It does not displace the lede: the tagline is the promise and the lede is
              * what the promise means in practice. */}
            <p className="mt-5 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-accent">
              {site.tagline}
            </p>

            <p className="mt-3 max-w-[44ch] text-[1.15rem] leading-relaxed text-on-dark/90">
              Warm white every night, any colour when you want it, and nobody on a ladder in
              December.
            </p>

            <a
              href={site.phoneHref}
              className="tap-44 mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-card px-8 text-[1.05rem] font-semibold text-foreground transition-colors duration-[--dur-fast] hover:bg-muted"
            >
              <svg viewBox="0 0 20 20" className="size-[1.15rem] text-accent-ink" fill="currentColor" aria-hidden>
                <path d="M4.2 2.5A1.7 1.7 0 0 1 6.5 3l1 1.7a1.7 1.7 0 0 1-.3 2.1l-.7.7a9 9 0 0 0 3.9 3.9l.7-.7a1.7 1.7 0 0 1 2.1-.3l1.7 1a1.7 1.7 0 0 1 .5 2.3l-.7 1a2.4 2.4 0 0 1-2.8.9C8 14.3 5.2 11.5 3.5 7.9a2.4 2.4 0 0 1 .3-2.7z" />
              </svg>
              Call {site.phone}
            </a>
          </div>

          <div className="lg:w-[27rem] lg:justify-self-end">
            <QuoteForm
              variant="mini"
              heading="Free design consultation"
              submitLabel="Request my free design"
              className="bg-background shadow-[var(--shadow-dark)]"
            />
          </div>
        </div>

        {/* The channel edge, which now divides the photograph from the plinth instead of closing
          * the section. It is the site's own signature device doing structural work: the lit run
          * along the bottom of the picture, with the ground below it. */}
        <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
      </div>

      {/* ── the plinth: one line, centred, and nothing else on it ──
        *
        * No `bg-*` class of its own, deliberately. It shows the section's own `bg-primary`, which
        * keeps scripts/section-rhythm.mjs seeing ONE ground for the whole hero rather than two
        * adjacent `bg-primary` events. The photograph's own bottom gradient is heavier than flat
        * primary, so the strip still reads as a separate band beneath the image. */}
      <Link
        href={reviewProof.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shell flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-6 text-center"
      >
        <span className="u font-display text-[2.25rem] font-bold leading-none text-on-dark">
          {reviewProof.average}
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 20 20" className="size-[1.4rem] text-accent" fill="currentColor">
              <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
            </svg>
          ))}
        </span>
        <span className="text-[1.05rem] text-on-dark-muted">
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
              className="inline-block size-[1.375rem] translate-y-[-0.15rem]"
            />
          ) : (
            <span className="font-display font-bold text-on-dark">Google</span>
          )}
        </span>
      </Link>
    </section>
  );
}
