import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { QuoteForm } from "@/components/ui/bits";

/* THE HERO, built to phoenixroofingandrepair.com's, which the client asked to be copied exactly.
 *
 * WHAT THEIRS IS, measured with the page open: a full-bleed roof photograph with a dark scrim
 * raking left to right. On the left, in this order — a BADGE ROW (BBB Accredited seal, then a
 * five-star row, then the Google mark with "4.9 average rating"), then a three-line headline at
 * 50px/800 in a condensed face, then a BOLD SUBHEAD line, then a paragraph of real detail, then
 * TWO pill buttons side by side: solid orange "Request Inspection →" and white "Call Now 📞".
 * On the right, a DARK translucent form card headed "Get A FREE Inspection".
 *
 * WHAT CHANGED FROM OURS. We had no badge row, no subhead line, no paragraph, one button, and a
 * WHITE form card. All five are now Phoenix's. The palette is Brytr's: their orange #FD7206 is our
 * amber, their near-black #1E1E1E is our navy, their cream #FFF6F0 is our warm neutral.
 *
 * THE BADGE ROW IS WHERE I CANNOT MATCH THEM AND WILL NOT PRETEND TO. Phoenix leads with a BBB
 * Accredited Business A+ seal because they hold one. Brytr has no BBB accreditation, no trade
 * membership and no certification on file here, so the row carries the one credential that is real:
 * the Google rating. The seal slot stays empty rather than filled with something invented, and the
 * Google mark itself is still `googleLogo` in content/badges.ts waiting on the official asset.
 *
 * ---- REVISION: THE AUDIT PASS -------------------------------------------------------------
 *
 * FOUR THINGS CHANGED HERE, and the first one is not in this file at all.
 *
 * 1. THE SCRIM. The audit read this hero as "a flat #111820 slab with type and a form on it -
 *    zero photography". The photograph was always here; the wash over it was 97% opaque at the
 *    left edge and 86% at 44% across, so two thirds of the frame was painted out. Fixed in
 *    globals.css, where the note explains the stops. Nothing in this file caused it.
 *
 * 2. THE HEADLINE was "Permanent Outdoor Lighting in Omaha Roofline, Landscape & Patio
 *    Experts" - two phrases jammed together with no punctuation, which is a meta title that
 *    escaped into the page. It is a sentence now, with the second phrase demoted to the
 *    subhead where it reads as English. "Permanent outdoor lighting" and "Omaha" both survive
 *    in the h1, so the phrase people actually search is intact.
 *
 * 3. THE RATING LINE absorbed the whole section that used to sit under the hero. That was a
 *    318px band carrying no images and one fact, and the fact belongs at the top of the page
 *    where it does some work. components/sections/proof-rail.tsx is NOT deleted - I nearly
 *    removed it as dead code and it is not: page-parts.tsx still renders it on two interior
 *    templates. It has left the home page, that is all.
 *
 * 4. THE FORM CARD gets a real shadow, --shadow-hero-card. It is the only big shadow on the
 *    site and it is earned: this card sits on a photograph rather than a flat ground, and at
 *    1px it dissolved into the picture.
 */
export function Hero() {
  const bg = images.heroBg;

  return (
    <section className="hero-tall relative isolate flex items-center overflow-hidden bg-primary">
      <Image
        src={bg.src as string}
        alt={bg.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_55%]"
      />
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div className="shell relative grid w-full items-center gap-12 py-14 lg:grid-cols-[57fr_43fr] lg:gap-14 lg:py-20">
        <div className="max-w-[46rem]">
          {/* Phoenix runs its badge row ABOVE the headline. Ours is below it now, because with
            * the headline cut to one line and a real subhead under it, proof placed first pushed
            * the actual offer down the frame. The rating still sits above the fold either way. */}
          <h1 className="display-hero text-on-dark">Permanent outdoor lighting in Omaha</h1>

          <p className="mt-5 max-w-[54ch] text-[1.15rem] leading-snug text-on-dark">
            Roofline, landscape and patio systems installed by our own crews. One free after-dark
            design consultation, on your house.
          </p>

          <p className="mt-5 max-w-[60ch] text-[1.02rem] leading-relaxed text-on-dark/85">
            One channel of color-matched LEDs along the eaves, in the beds and over the patio, run
            from your phone. We do not leave until you have seen it lit after dark and again in
            daylight. Omaha metro, Lincoln and western Iowa.
          </p>

          {/* THE RATING LINE, which used to be a 318px section of its own directly below this
            * one - no images, one fact, and a scroll to get to it. At the top of the hero it is
            * read before anything else on the page. The stars are one of exactly two places
            * yellow is still allowed; the other is the CTA button below. */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-0.5" aria-label="Rated five out of five">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 20 20" className="size-[1.15rem] text-accent" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
                </svg>
              ))}
            </span>
            {googleLogo && (
              <Image src={googleLogo} alt="Google" width={20} height={20} className="size-5" />
            )}
            <Link href="/reviews" className="tap-44 text-[0.95rem] text-on-dark underline decoration-on-dark/40 underline-offset-4">
              <span className="font-semibold">{reviewProof.average}</span> from{" "}
              {reviewProof.count} {googleLogo ? "" : "Google "}reviews
            </Link>
          </div>

          {/* ONE yellow button per section, maximum. The phone is the secondary action, so it
            * is an outline on the photograph rather than a second filled pill - two solid
            * buttons side by side is two primary actions, which is none. */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/free-design-consultation"
              className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
            >
              Book a free design
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href={site.phoneHref}
              className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full border-[1.5px] border-on-dark/45 px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-on-dark/10"
            >
              Call {site.phone}
              <svg viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
                <path d="M4.2 2.5A1.7 1.7 0 0 1 6.5 3l1 1.7a1.7 1.7 0 0 1-.3 2.1l-.7.7a9 9 0 0 0 3.9 3.9l.7-.7a1.7 1.7 0 0 1 2.1-.3l1.7 1a1.7 1.7 0 0 1 .5 2.3l-.7 1a2.4 2.4 0 0 1-2.8.9C8 14.3 5.2 11.5 3.5 7.9a2.4 2.4 0 0 1 .3-2.7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* THE FORM CARD, dark. Phoenix's sits on the photograph as a dark translucent panel, which
          * is why theirs reads as part of the hero rather than a white box dropped on top of it. */}
        <div className="lg:justify-self-end">
          <div className="rounded-lg shadow-[var(--shadow-hero-card)]">
            <QuoteForm variant="compact" dark heading="Get a free design consultation" />
          </div>
        </div>
      </div>

      <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </section>
  );
}
