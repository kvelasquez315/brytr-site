import Link from "next/link";
import Image from "next/image";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";

/* THE BAND UNDER THE HERO. Phoenix's slot, filled with the one credential Brytr actually has.
 *
 * WHAT PHOENIX PUTS HERE: a pale cream band, a centred orange eyebrow "CERTIFICATIONS &
 * MEMBERSHIPS", a centred headline "Certified & Backed by Roofing Industry Experts", then a row of
 * EIGHT real industry marks - GAF Master Elite, two HAAG certifications, TRI, BBB Accredited A+,
 * NARPM, AACM, Inc. 5000 - and a centred orange link to the full list.
 *
 * WHY OURS CANNOT BE THAT, and this is the one place the copy-it-exactly brief runs into a wall:
 * Brytr holds none of those. No BBB accreditation, no trade membership, no manufacturer tier, no
 * Inc. 5000 ranking. A row of invented seals is the single worst thing a page like this can carry -
 * it is the difference between a site that reads as trustworthy and one that is lying - so the slot
 * keeps Phoenix's SHAPE (cream band, centred eyebrow, centred headline, the mark, a centred link)
 * and fills it with the credential that is real and verifiable: the Google rating.
 *
 * This is also exactly what the client asked for two rounds ago: "The trust banner has way too much
 * in it. It should just have reviews and then the Google logo." One thing on it, in Phoenix's frame.
 *
 * THE GOOGLE MARK REMAINS THE MISSING FILE. `googleLogo` in content/badges.ts is the slot; drop the
 * official review-display asset from the Google Business Profile at /public/logo/google.svg and the
 * real four-colour G appears here and in the hero badge row with no other change. A trademark gets
 * used from its owner's own pack or not at all.
 *
 * IF THE CREDENTIALS ARRIVE, THIS BECOMES PHOENIX'S ROW EXACTLY: licence number, insurance
 * certificate, Haven dealer tier, any association. Send the files and the marks go in.
 */
export function ProofRail() {
  return (
    <section className="border-y border-border bg-muted py-12">
      <div className="shell text-center">
        <p className="eyebrow justify-center">
          <span className="channel-mark" aria-hidden />
          Reviews and rating
          <span className="channel-mark" aria-hidden />
        </p>
        <h2 className="display-section mx-auto mt-4 max-w-[30ch] text-foreground">
          Rated {reviewProof.average} by {reviewProof.count} Omaha homeowners
        </h2>

        <Link
          href={reviewProof.url}
          target="_blank"
          rel="noopener noreferrer"
          data-spot
          className="group mt-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-full bg-card px-8 py-4 shadow-[var(--shadow-lg)]"
        >
          {googleLogo && (
            <Image src={googleLogo} alt="Google" width={30} height={30} className="size-[1.875rem] shrink-0" />
          )}
          <span className="u font-display text-[1.75rem] font-bold leading-none text-foreground">
            {reviewProof.average}
          </span>
          <span className="flex items-center gap-0.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-[1.15rem] text-accent" fill="currentColor">
                <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
              </svg>
            ))}
          </span>
          <span className="text-[0.95rem] text-muted-foreground">
            Every one from an Omaha homeowner
          </span>
        </Link>

        <p className="mt-6">
          <Link
            href="/reviews"
            className="group font-semibold text-accent-ink underline decoration-accent decoration-2 underline-offset-4"
          >
            Read all {reviewProof.count} reviews
            <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
              &rarr;
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
