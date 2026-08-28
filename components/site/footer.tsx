import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/content/site";
import { ChannelEdge } from "@/components/ui/bits";
import { brandLogo } from "@/content/badges";
import { reviewProof } from "@/content/reviews";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { systems } from "@/content/systems";

const company = [
  /* "Pricing and financing" was here and is gone with the page, 27 Aug 2026. Both halves of that
   * label were a problem: the prices were invented and the finance partner was never named by
   * Brytr. /pricing redirects to the home page. */
  ["About", "/about"], ["How it works", "/how-it-works"],
  ["Warranty", "/warranty"], ["Reviews", "/reviews"], ["Gallery", "/gallery"],
  ["Recent projects", "/recent-projects"], ["FAQ", "/faq"], ["Compare brands", "/compare"],
];

export function Footer() {
  return (
    <footer className="bg-primary pb-24 lg:pb-0">
      {/* THE CHANNEL EDGE, and this is the first time it has ever rendered.
        *
        * `ChannelEdge` has been exported from components/ui/bits.tsx since the site was built and
        * was called by nothing - a 4px amber bar with a 1px navy line down its centre, which is a
        * length of Brytr's own channel seen end-on. It is the closest thing this brand has to a
        * signature, and it was dead code.
        *
        * Here it is the seam between the page and the footer: the run along the bottom edge of the
        * building, with the ground underneath. It is also the second and last use on any page -
        * the hero closes on the same device, and DESIGN.md caps it at two, which is what keeps it
        * reading as a signature rather than as a divider. */}
      <ChannelEdge />
      <div className="shell pt-16">
        {/* SIX COLUMN UNITS, NOT FIVE, and the service-area list takes two of them.
          *
          * The five columns held 3 blocks of copy, 11 links, 8 links, 19 links and 6 links plus a
          * contact block. On a single-column list that made "Service areas" nearly twice the height
          * of anything else, so every other column stopped well short of the divider — measured at
          * roughly 280 x 400px of empty under "Systems". Giving the nineteen towns two internal
          * columns brings that block to about ten rows, in line with the services column, and the
          * ragged bottoms collapse to a row or two rather than a block.
          *
          * The link lists also go two-up below lg. Stacked single-file they made a 2,500px ribbon
          * of forty-five identical links on a phone, which is a scroll tax and not a navigation. */}
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-1">
            {/* THE LIGHT LOCKUP, and the header now uses the dark one. That is a change from
              * "one source so the two cannot drift", which was right while both sat on navy: the
              * header went white, and a white wordmark on a white bar is nothing at all. Two
              * lockups of the same mark, each on the ground it was made for - see `brandLogo` and
              * `brandLogoDark` in content/badges.ts, which is still the single place either is
              * declared. */}
            {brandLogo ? (
              <Image
                src={brandLogo.src}
                alt={brandLogo.alt}
                width={brandLogo.width}
                height={brandLogo.height}
                className="h-9 w-auto"
              />
            ) : (
              <p className="font-display text-2xl font-black tracking-[-0.04em] text-on-dark">
                brytr<span className="ml-0.5 inline-block size-2 translate-y-[-0.35rem] rounded-full bg-accent" />
              </p>
            )}
            <p className="mt-4 text-sm text-on-dark-muted">
              Permanent outdoor lighting for Omaha homes. Installed once, controlled from your phone,
              and serviced by the people who put it up.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={site.social.facebook} aria-label="Brytr on Facebook" className="grid size-10 place-items-center rounded-md border border-on-dark/20 text-accent hover:border-accent">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1Z"/></svg>
              </a>
              <a href={site.social.instagram} aria-label="Brytr on Instagram" className="grid size-10 place-items-center rounded-md border border-on-dark/20 text-accent hover:border-accent">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>

          <nav aria-label="Services" className="lg:col-span-1">
            <h2 className="label text-accent">Services</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-on-dark-muted hover:text-accent">{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Lighting systems" className="lg:col-span-1">
            <h2 className="label text-accent">Systems</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {systems.map((s) => (
                <li key={s.slug}>
                  <Link href={`/lighting-systems/${s.slug}`} className="text-sm text-on-dark-muted hover:text-accent">{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* THE HEADING IS A LINK NOW, and it is not decoration.
            *
            * Recent Projects took Service Areas' place in the header menu, and that menu item was
            * the ONLY internal link to /service-areas anywhere on the site. The nineteen town
            * pages below were never affected - this list has always carried them - but the index
            * itself would have been left reachable from the sitemap and from nothing else, which
            * is how a real landing page quietly stops ranking.
            *
            * So the column heading points at it. One link, in the place a reader would expect the
            * heading of a list of towns to go, and the index is back in the internal link graph. */}
          <nav aria-label="Service areas" className="lg:col-span-2">
            <h2 className="label">
              <Link href="/service-areas" className="text-accent hover:text-on-dark">Service areas</Link>
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="text-sm text-on-dark-muted hover:text-accent">{c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-1">
            <h2 className="label text-accent">Company</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {company.map(([l, h]) => (
                <li key={h}><Link href={h} className="text-sm text-on-dark-muted hover:text-accent">{l}</Link></li>
              ))}
            </ul>
            <h2 className="label mt-8 text-accent">Contact</h2>
            {/* Real NAP, character for character as it appears on Brytr's Google Business
              * Profile — that exact match is what ties a site to its local pack listing.
              * The line that used to sit at the bottom of this block ("Mon to Sat · 8am to
              * 6pm") was never confirmed by the client, so it is gone until it is. */}
            <address className="mt-4 space-y-1.5 not-italic text-sm text-on-dark-muted">
              <p className="font-semibold text-on-dark">{site.name}</p>
              <p>{site.address.street}</p>
              <p>{site.address.city}, {site.address.state} {site.address.zip}</p>
              <p><a href={site.phoneHref} className="u text-on-dark hover:text-accent">{site.phone}</a></p>
              <p className="pt-2">
                <a href={reviewProof.url} target="_blank" rel="noopener noreferrer" className="text-on-dark hover:text-accent">
                  <span className="u">{reviewProof.average}</span> from <span className="u">{reviewProof.count}</span> Google reviews
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-on-dark/12 py-7 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Permanent outdoor lighting, {site.region}.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy-policy" className="hover:text-accent">Privacy policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-accent">Terms of service</Link></li>
            <li><Link href="/accessibility" className="hover:text-accent">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
