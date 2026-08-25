import Image from "next/image";
import Link from "next/link";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";

/* THE TRUST BAR, built to the reference the client sent: a slim dark band directly under the
 * hero, the Google mark on the left with the score and a star row beside it, the review count
 * under that, and an underlined link to the full set pushed out to the right edge.
 *
 * WHY IT IS A <div> AND NOT A <section>. It is ~86px of chrome, not a section of the page - it
 * reads as the hero's bottom edge, the way a window's status bar belongs to the window rather
 * than to the document. Keeping it out of the section count is also what stops it breaking the
 * light/dark alternation the eight sections are built on: navy under a night hero is a shelf,
 * whereas navy as a ninth SECTION would put two darks in a row, and there is no slack left in
 * that arithmetic (see the note on the deleted CTA band in home-phx.tsx).
 *
 * WHY ITS OWN FILE. It was written inside home-phx.tsx first, and that was wrong on the same
 * reasoning: that file is the eight Phoenix SECTIONS and says so at the top. This is chrome, it
 * is not one of the eight, and it is the kind of thing the interior templates will want too.
 *
 * OUR COLOURS, and the reference's dark green maps cleanly: their band is our raise (#202b38),
 * their orange stars are our amber, their green underline is our amber. Our numbers: 5.0 from
 * 196, read off the Google Business Profile on 20 Aug 2026 - see content/reviews.ts, which also
 * records that the client's own site still says "135+" and their Instagram "170+".
 *
 * THE GOOGLE MARK IS STILL THE MISSING FILE. `googleLogo` in content/badges.ts is null, so the
 * four-colour G in the reference has nothing to render from. It is a trademark and it gets used
 * from Google's own review-display pack or not at all - I am not drawing an approximation of
 * somebody else's logo. Drop the asset at /public/logo/google.svg and it appears here, and in
 * every other slot that checks for it, with no further change. Until then the word "Google" in
 * the line underneath carries it, which is accurate and claims nothing.
 */
export function TrustBar() {
  return (
    <div className="border-b border-on-dark/10 bg-raise">
      <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-5">
        <div className="flex items-center gap-4">
          {googleLogo && (
            <Image src={googleLogo} alt="Google" width={34} height={34} className="size-[2.125rem] shrink-0" />
          )}
          <div>
            <div className="flex items-center gap-3">
              <span className="u font-display text-[1.6rem] font-bold leading-none text-on-dark">
                {reviewProof.average}
              </span>
              <span className="flex items-center gap-0.5" aria-label="Rated five out of five stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 20 20" className="size-[1.15rem] text-accent" fill="currentColor" aria-hidden>
                    <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
                  </svg>
                ))}
              </span>
            </div>
            <p className="mt-1 text-[0.95rem] leading-none text-on-dark-muted">
              {reviewProof.count} {reviewProof.platform} reviews
            </p>
          </div>
        </div>

        <Link
          href="/reviews"
          className="tap-44 group shrink-0 font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-[6px]"
        >
          Read all {reviewProof.count} reviews
          <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
