import Link from "next/link";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";

/* THE TRUST BAR.
 *
 * The client's read of the last one: it looked like shit, and it did. Two problems, and only
 * one of them was styling.
 *
 * THE CONTENT WAS HALF WRONG. It carried the Google score and then three service tiles —
 * Roofline, Landscape, Patio and pergola — with small icons. Those are not trust signals, they
 * are navigation, and they were a menu of the section immediately below them. So the strip was
 * doing two unrelated jobs in one row, which is why no amount of styling was going to save it.
 *
 * THE MODEL IS propertypest.com, which the client named. Its bar is four real credentials in a
 * row: the 5.0 across 230+ Google reviews with the stars, licensed and insured, the association
 * memberships, and the opening hours. Every item is something a homeowner weighs before calling.
 *
 * WHAT WE CAN HONESTLY PUT UP IS THE GOOGLE PART AND THE HOURS. Brytr has no license number,
 * insurance certificate or trade membership on file here, and inventing a badge is the one thing
 * a trust bar must never do — a fabricated credential is worse than a thin bar. Asked; the client
 * said replicate the Google part and no badges on the right. The hours he did give: nine to nine,
 * six days, closed Sunday. They are real, so they are here and in the LocalBusiness schema.
 *
 * AND IT IS NOT A SOLID BAND ANY MORE. It used to be a separate navy strip bolted under the
 * hero, which is what made it read as a component rather than as part of the page. It now floats
 * over the bottom of the hero photograph on a translucent ground, so the photograph runs behind
 * it. `overlay={false}` is the fallback for the three legal pages, whose hero is type on a flat
 * ground with no photograph to sit on.
 */
export function ProofRail({ overlay = true }: { overlay?: boolean }) {
  const body = (
    <div className="shell flex flex-wrap items-center gap-x-10 gap-y-4 py-4">
      <Link
        href={reviewProof.url}
        target="_blank"
        rel="noopener noreferrer"
        data-spot
        className="group flex items-center gap-3"
      >
        <span className="flex items-center gap-0.5" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 20 20" className="size-[1.05rem] text-accent" fill="currentColor">
              <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
            </svg>
          ))}
        </span>
        <span className="text-[0.95rem] text-on-dark">
          {/* Until the official Google mark is on disk this is a sentence, not a lockup with a
            * hole in it. See the note on `googleLogo` in content/badges.ts. */}
          Rated <span className="u font-bold">{reviewProof.average}</span> across{" "}
          <span className="u font-bold">{reviewProof.count}</span>
          {googleLogo ? "" : " Google"} reviews
          <span className="ml-1.5 inline-block text-on-dark-muted transition-transform duration-[--dur-fast] group-hover:translate-x-0.5" aria-hidden>
            &rarr;
          </span>
        </span>
      </Link>

      <span className="hidden h-4 w-px bg-on-dark/25 sm:block" aria-hidden />

      <p className="text-[0.95rem] text-on-dark-muted">{site.hours.openLabel}</p>

      <span className="hidden h-4 w-px bg-on-dark/25 sm:block" aria-hidden />

      <p className="text-[0.95rem] text-on-dark-muted">
        {site.city} metro, Lincoln and western Iowa
      </p>
    </div>
  );

  /* A SCRIM, NOT FROSTED GLASS. The first version used backdrop-blur and slopcheck failed it as
   * glassmorphism, which is on the banned list for good reason. The client asked for translucent,
   * not frosted, and those are different things: a scrim is a density of the brand's own dark over
   * a photograph, the same device the hero type already sits on. Blur is the SaaS tell.
   * Translucency is just a surface.
   *
   * (The comment above this originally sat directly after `return (`, where a JSX comment parses
   * as an object literal and the build dies. Third time this session. It goes above the return.) */
  if (overlay) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-on-dark/15 bg-primary/78">
        {body}
      </div>
    );
  }
  return <section className="border-t border-on-dark/15 bg-primary">{body}</section>;
}
