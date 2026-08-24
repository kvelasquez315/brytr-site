import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { iconMap, type IconKey } from "@/content/icon-map";

/* THE TRUST BAND, built to propertypest.com's, which is what the client asked for.
 *
 * WHAT THEIRS ACTUALLY IS, with the page open in front of me rather than remembered: a SOLID
 * dark-green band sitting directly under the hero, full width. On the left, the colour Google "G",
 * then 5.0 at display size with a rust star row beside it, and "Rated 5.0 across 230+ Google
 * reviews" underneath in small grey. On the right, three items, each a thin circular outlined icon
 * above two lines of small caps: LICENSED & INSURED, AACM & CAI MEMBER, OPEN MON-SAT 8AM-5PM.
 *
 * freedomexteriorsusa.com does the same job one step further: the band under its hero is four
 * figures - 8+ YEARS, 100% LICENSED & INSURED, 26yr WARRANTIES, 4.9 AVERAGE GOOGLE RATING - each
 * with a short accent rule under the number and a caps label below, divided by hairlines. Same
 * idea: the strip under the hero is where a homeowner checks whether you are worth calling.
 *
 * SO THIS IS SOLID AGAIN, AND THAT REVERSES AN EARLIER INSTRUCTION ON PURPOSE. The client asked
 * once for a translucent overlay floating on the hero photograph, and that is what shipped. He has
 * now asked for Property Pest's, and Property Pest's is a solid band. The newer instruction wins.
 * It also fixes two real problems the overlay had: it could only be absolutely positioned inside a
 * `relative` hero, so the interior pages had to render a different version of it, and at 390px it
 * was three rows tall and sat on top of the quote form.
 *
 * WHAT WE CAN HONESTLY PUT ON THE RIGHT. Property Pest's three are a licence, an association
 * membership and opening hours. Brytr has no licence number, insurance certificate or trade
 * membership on file here, and inventing a badge is the one thing a trust bar must never do - a
 * fabricated credential is worse than a thin bar. So the three are things the client has actually
 * confirmed: the hours he gave (nine to nine, six days, closed Sunday), the W2 crews, and the
 * day-and-night verification he described on camera. If he sends the licence and the certificate,
 * they belong here and they replace these.
 *
 * THE GOOGLE MARK IS STILL THE ONE MISSING PIECE. Property Pest's band leads with the real
 * four-colour G and ours cannot until the official review-display asset pack is on disk. A
 * trademark gets used in its owner's own colours from its owner's own pack, or not at all: not
 * traced from memory, not lifted off their page, not set in Archivo. `googleLogo` in
 * content/badges.ts is the slot, and this component renders it the moment a file lands. Until then
 * the score sits on our own star row with the word Google in plain type, which is honest and reads
 * as deliberate rather than broken.
 */

/* Every one of these is a fact the client confirmed. Nothing goes in this row otherwise. */
const CREDENTIALS: { icon: IconKey; a: string; b: string }[] = [
  { icon: "schedule", a: "Open Mon to Sat", b: "9am to 9pm, closed Sunday" },
  { icon: "hardHat", a: "Our own W2 crews", b: "Never subcontracted" },
  { icon: "dayNight", a: "Checked after dark", b: "And again in daylight" },
];

export function ProofRail() {
  return (
    <section className="border-b border-on-dark/10 bg-primary">
      <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-8 py-7">
        {/* THE SCORE. Property Pest sets the number at display size with the stars beside it and
          * the sentence underneath, which is why theirs reads at a glance and our old one-line
          * version did not. */}
        <Link
          href={reviewProof.url}
          target="_blank"
          rel="noopener noreferrer"
          data-spot
          className="group flex items-center gap-4"
        >
          {googleLogo && (
            <Image src={googleLogo} alt="Google" width={34} height={34} className="size-[2.125rem] shrink-0" />
          )}
          <span>
            <span className="flex items-center gap-3">
              <span className="u font-display text-[2rem] font-bold leading-none text-on-dark">
                {reviewProof.average}
              </span>
              <span className="flex items-center gap-0.5" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 20 20" className="size-[1.05rem] text-accent" fill="currentColor">
                    <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
                  </svg>
                ))}
              </span>
            </span>
            <span className="mt-1.5 block text-[0.9rem] text-on-dark-muted">
              Rated {reviewProof.average} across{" "}
              <span className="u font-semibold text-on-dark">{reviewProof.count}</span>
              {googleLogo ? "" : " Google"} reviews
              <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-0.5" aria-hidden>
                &rarr;
              </span>
            </span>
          </span>
        </Link>

        {/* THE CREDENTIALS. Circular outlined icon over two lines, hairline between each, exactly
          * the shape of Property Pest's right-hand side. Our own icons, not imported glyphs. */}
        <ul className="flex flex-wrap items-stretch gap-x-8 gap-y-6 sm:gap-x-10">
          {CREDENTIALS.map((c, i) => {
            const I = iconMap[c.icon];
            return (
              <li
                key={c.a}
                className={`flex items-center gap-3.5 ${i ? "sm:border-l sm:border-on-dark/12 sm:pl-8" : ""}`}
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-on-dark/25 text-accent"
                  aria-hidden
                >
                  <I className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.85rem] font-semibold leading-tight text-on-dark">{c.a}</span>
                  <span className="mt-0.5 block text-[0.8rem] leading-tight text-on-dark-muted">{c.b}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The service area, which Property Pest carries in its top utility strip rather than in the
        * band. We have no top strip, so it sits here as one quiet line. */}
      <div className="shell pb-6">
        <p className="text-[0.85rem] text-on-dark-muted">
          Installing across {site.region}.
        </p>
      </div>
    </section>
  );
}
