import Link from "next/link";
import Image from "next/image";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";

/* THE TRUST BAND. One thing on it: the Google rating.
 *
 * The client, on the version that carried the score plus three credential items plus the service
 * area: "The trust banner has way too much in it. It should just have reviews and then the Google
 * logo." So that is all it is now - the mark, the score, the star row, the count, and a link to
 * read them. Six pieces of information became three, on one centred line.
 *
 * WHAT CAME OFF, AND WHERE IT WENT. The hours, the W2 crews and the day-and-night check were three
 * icon items down the right-hand side. The crews and the verification are arguments, not badges, and
 * they now live in the "Why homeowners choose us" section where they get a sentence each instead of
 * four words. The hours are in the footer and in the LocalBusiness schema, which is where a
 * homeowner and Google respectively actually look for them. The service-area line is the whole point
 * of the Service Areas menu and the section on /service-areas.
 *
 * THE GOOGLE MARK IS THE ONE THING I CANNOT DRAW, and this is the third time it has come up, so:
 * `googleLogo` in content/badges.ts is a slot, and the moment a file sits at /public/logo/google.svg
 * and that constant points to it, the real four-colour G appears here at 30px with no other change.
 * It has to be the official file from Google's own asset pack - their review-display assets are
 * downloadable from the Google Business Profile - because a trademark gets used in its owner's
 * colours from its owner's pack or not at all. Not traced from memory, not screenshotted off
 * propertypest.com, not set in Archivo. Until the file lands, the band says the word Google in plain
 * type beside our own star row, which is honest and reads as deliberate rather than broken.
 *
 * CENTRED, because with one item on it a left-aligned row leaves two thirds of a full-width dark
 * band empty and the band reads as unfinished. Property Pest can left-align theirs because they have
 * three credentials holding the right-hand side down.
 */
export function ProofRail() {
  return (
    <section className="border-b border-on-dark/10 bg-primary">
      <div className="shell flex items-center justify-center py-6">
        <Link
          href={reviewProof.url}
          target="_blank"
          rel="noopener noreferrer"
          data-spot
          className="group flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {googleLogo && (
            <Image src={googleLogo} alt="Google" width={30} height={30} className="size-[1.875rem] shrink-0" />
          )}
          <span className="u font-display text-[1.75rem] font-bold leading-none text-on-dark">
            {reviewProof.average}
          </span>
          <span className="flex items-center gap-0.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-[1.15rem] text-accent" fill="currentColor">
                <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
              </svg>
            ))}
          </span>
          <span className="text-[0.95rem] text-on-dark-muted">
            Rated {reviewProof.average} across{" "}
            <span className="u font-semibold text-on-dark">{reviewProof.count}</span>
            {googleLogo ? "" : " Google"} reviews
            <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-0.5" aria-hidden>
              &rarr;
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
