import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { QuoteForm } from "@/components/ui/bits";

/* THE HERO.
 *
 * WHAT THIS USED TO BE, and why it went. It was phoenixroofingandrepair.com's hero copied slot
 * for slot: a star row AND a separate Google rating line, a two-line headline that ran the primary
 * keyword and three secondary ones together ("Permanent Outdoor Lighting in Omaha / Roofline,
 * Landscape & Patio Experts"), a bold subhead restating the offer, a four-line paragraph under
 * that, two buttons, and a six-field form card. Nine separate things to read before a homeowner
 * has seen the photograph.
 *
 * The client's verdict on the result was "way too much text... it needs to be simplified", and the
 * hero is where that verdict is earned or lost, because it is the only section most visitors see.
 *
 * WHAT IT IS NOW. Four things: the rating on one line, the headline, one sentence, and the ask.
 *
 *   THE RATING IS ONE ELEMENT, NOT TWO. There was a five-star row and then, beside it, a Google
 *   mark with "5.0 average rating (196 reviews)" — the same claim twice in 40px of each other.
 *   Now: stars, mark, one phrase.
 *
 *   THE HEADLINE CARRIES ONE KEYWORD. "Permanent outdoor lighting in Omaha" is the term this page
 *   ranks for. Roofline, landscape and patio each have their own page and their own H1, and stuffing
 *   all four into one H1 helps none of them.
 *
 *   THE SUBHEAD AND THE PARAGRAPH ARE GONE. Between them they said: free, on site, after dark,
 *   your own house, the metro plus Lincoln plus western Iowa, one channel, colour-matched, roofline
 *   and beds and patio, phone control, W2 crews, not subcontracted, verified lit and in daylight.
 *   Twelve claims in the hero. Eleven of them are made again further down the page in the section
 *   built to make them. One sentence stays.
 *
 *   THE FORM IS THREE FIELDS. Name, phone, city — see the note on `mini` in ui/bits.tsx. The six
 *   -field version was the densest object on the page and it sat on top of the photograph.
 *
 * THE BADGE SLOT STILL CANNOT BE PHOENIX'S. They lead with a BBB Accredited A+ seal because they
 * hold one. Brytr has no accreditation, no trade membership and no manufacturer tier on file, so
 * the row carries the one credential that is real and checkable: the Google rating. `googleLogo`
 * in content/badges.ts is still waiting on the official asset from the Business Profile.
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

      <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_26rem] lg:gap-20 lg:py-24">
        <div className="max-w-[38rem]">
          {/* ONE LINE OF PROOF. Stars, the mark, the claim. Not stars AND a separate rating. */}
          <Link
            href={reviewProof.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-44 inline-flex items-center gap-3 text-on-dark"
          >
            <span className="flex items-center gap-0.5" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 20 20" className="size-[1.15rem] text-accent" fill="currentColor">
                  <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
                </svg>
              ))}
            </span>
            {googleLogo && (
              <Image src={googleLogo} alt="" width={18} height={18} className="size-[1.125rem]" />
            )}
            <span className="text-[0.95rem] font-semibold">
              <span className="u">{reviewProof.average}</span> from{" "}
              <span className="u">{reviewProof.count}</span>{" "}
              {googleLogo ? "" : `${reviewProof.platform} `}reviews
            </span>
          </Link>

          <h1 className="display-hero mt-6 text-on-dark">Permanent outdoor lighting in Omaha</h1>

          <p className="mt-5 max-w-[46ch] text-[1.15rem] leading-relaxed text-on-dark/90">
            Warm white every night, any colour when you want it, and nobody on a ladder in December.
          </p>

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
              className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full border border-on-dark/40 px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-on-dark/10"
            >
              Call {site.phone}
            </a>
          </div>
        </div>

        {/* The form card, dark, so it reads as part of the photograph rather than a white box
          * dropped on top of it. Three fields — the rest of the conversation happens on the phone. */}
        <div className="lg:w-[26rem] lg:justify-self-end">
          <QuoteForm variant="mini" dark heading="Get a free design consultation" submitLabel="Book my free design" />
        </div>
      </div>

      <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </section>
  );
}
