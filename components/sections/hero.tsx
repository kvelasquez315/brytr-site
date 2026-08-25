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
 */
export function Hero() {
  const bg = images.heroBg;

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src={bg.src as string}
        alt={bg.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_42%]"
      />
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1fr_30rem] lg:gap-16 lg:py-20">
        <div className="max-w-[46rem]">
          {/* THE BADGE ROW. Phoenix puts its proof ABOVE the headline, which is the whole reason
            * their hero reads as credible before you have read a word of it. */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-0.5" aria-label="Rated five out of five">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 20 20" className="size-[1.35rem] text-accent" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
                </svg>
              ))}
            </span>
            <span className="flex items-center gap-2">
              {googleLogo && (
                <Image src={googleLogo} alt="Google" width={22} height={22} className="size-[1.375rem]" />
              )}
              <span className="text-[0.95rem] font-semibold text-on-dark">
                {reviewProof.average} average rating
                <span className="ml-1.5 font-normal text-on-dark-muted">
                  ({reviewProof.count} {googleLogo ? "" : "Google "}reviews)
                </span>
              </span>
            </span>
          </div>

          <h1 className="display-hero mt-6 text-on-dark">
            Permanent Outdoor Lighting in Omaha
            <br className="hidden sm:inline" /> Roofline, Landscape &amp; Patio Experts
          </h1>

          {/* The bold subhead line. Phoenix uses it to state the offer in one sentence, in bold,
            * directly under the headline and before the paragraph. */}
          <p className="mt-5 font-display text-[1.15rem] font-bold leading-snug text-on-dark">
            Free On-Site Design Consultation, After Dark, on Your Own House
          </p>

          <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-on-dark/85">
            Brytr Co installs permanent architectural lighting across the Omaha metro, Lincoln and
            western Iowa. One channel of color-matched LEDs on the roofline, in the beds, over the
            patio, run from your phone. Our own W2 crews, never subcontracted, and we do not leave
            until you have seen it lit after dark and again in daylight.
          </p>

          {/* TWO buttons, Phoenix's pair: the solid accent one asks for the appointment, the white
            * one is for the homeowner who would rather talk than type. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/free-design-consultation"
              className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
            >
              Book a free design
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href={site.phoneHref}
              className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full bg-card px-7 font-semibold text-foreground transition-colors duration-[--dur-fast] hover:bg-muted"
            >
              Call {site.phone}
              <svg viewBox="0 0 20 20" className="size-4 text-accent-ink" fill="currentColor" aria-hidden>
                <path d="M4.2 2.5A1.7 1.7 0 0 1 6.5 3l1 1.7a1.7 1.7 0 0 1-.3 2.1l-.7.7a9 9 0 0 0 3.9 3.9l.7-.7a1.7 1.7 0 0 1 2.1-.3l1.7 1a1.7 1.7 0 0 1 .5 2.3l-.7 1a2.4 2.4 0 0 1-2.8.9C8 14.3 5.2 11.5 3.5 7.9a2.4 2.4 0 0 1 .3-2.7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* THE FORM CARD, dark. Phoenix's sits on the photograph as a dark translucent panel, which
          * is why theirs reads as part of the hero rather than a white box dropped on top of it. */}
        <div className="lg:w-[30rem] lg:justify-self-end">
          <QuoteForm variant="compact" dark heading="Get a Free Design Consultation" />
        </div>
      </div>

      <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </section>
  );
}
