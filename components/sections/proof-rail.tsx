import Link from "next/link";
import Image from "next/image";
import { iconMap } from "@/content/icon-map";
import { googleLogo, reviewProofBadge, offerings } from "@/content/badges";
import { ChannelEdge } from "@/components/ui/bits";

/* THE TRUST BAND — the strip directly under the hero.
 *
 * It lived inside home-a.tsx and only ever rendered on the home page. The client's rule is
 * that every hero on the site is the home page's hero, and this band is part of that hero:
 * the review score, the rating, and what we install, on the amber channel edge, immediately
 * under the photograph. PageHero renders it now, so all eighty-one pages get it without any
 * page opting in.
 *
 * Extracted rather than copied. Two versions of a trust band drifting apart is how a site
 * ends up quoting two different review counts. */
export function ProofRail() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      <div className="shell flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-6">
        {/* reviews */}
        <div className="flex items-center gap-4">
          {googleLogo ? (
            <div className="relative h-7 w-20 shrink-0">
              <Image src={googleLogo} alt="Google" fill sizes="80px" className="object-contain object-left" />
            </div>
          ) : null}
          <span className="flex items-center gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-4 text-accent" fill="currentColor">
                <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
              </svg>
            ))}
          </span>
          {/* Until the official Google mark is on disk this reads as a sentence, not as a
            * lockup with a missing image in it. Setting the word "Google" in our own
            * display face was the exact thing I told the client not to do with Haven and
            * Jellyfish — a brand name in someone else's typeface looks like a broken img. */}
          <p className="text-sm text-on-dark">
            <span className="u font-semibold">{reviewProofBadge.score}</span>{" "}
            <span className="text-on-dark-muted">
              from <span className="u">{reviewProofBadge.count}</span>{" "}
              {googleLogo ? "reviews" : "reviews on Google"} · {reviewProofBadge.note}
            </span>
          </p>
        </div>

        {/* what we install */}
        <ul className="flex flex-wrap items-center gap-x-9 gap-y-4">
          {offerings.map((o) => {
            const I = iconMap[o.icon];
            return (
              <li key={o.name}>
                <Link href={o.href} className="group flex items-center gap-3.5">
                  {/* in the tile, not floating: a 24px icon on its own reads as a stock
                    * glyph no matter how it was drawn */}
                  <span className="channel-tile !size-10 shrink-0" aria-hidden><I className="size-6" /></span>
                  <span>
                    <span className="block font-display text-[0.95rem] font-bold leading-none text-on-dark group-hover:underline">
                      {o.name}
                    </span>
                    <span className="mt-1 block text-xs text-on-dark-muted">{o.note}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
