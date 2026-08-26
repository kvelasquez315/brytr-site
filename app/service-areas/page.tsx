import type { Metadata } from "next";
import Link from "next/link";
import { cities, metroCities, iowaCities } from "@/content/cities";
import { Shell } from "@/app/layout-shell";
import { ServiceLeaflet } from "@/components/sections/service-leaflet";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, localBusiness } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /service-areas — WAVE 5, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row counting the list underneath it, then
 * THREE consecutive sections of the identical city rack, an OpenStreetMap iframe (the same
 * grey-box embed the home page map replaced three iterations ago, with "centered" misspelt
 * in its title attribute), all eleven service rows again, and two closers.
 *
 * What it is now. The honest subject of this page is not a list of towns, it is a RADIUS —
 * and a radius is only meaningful if you say what changes as you go out. So the centerpiece
 * is the drive-time ladder: all eighteen towns in one table ordered by minutes from the
 * shop, with the band each one falls into and what that band actually promises. The place
 * where the promise changes is the interesting line on the page, and it is drawn.
 *
 * The Leaflet map moves into the hero, where it belongs on the one page whose subject is
 * geography, and comes off the iframe entirely.
 *
 * Archetype: map hero → the drive-time ladder → the three bands → why the radius stops.
 * Closer: the form.
 */

export const metadata: Metadata = {
  title: "Service Areas: The Omaha Metro and Council Bluffs",
  description:
    "Where Brytr installs permanent outdoor lighting: every town in the Omaha metro plus Council Bluffs, with the real drive to each from our shop.",
  alternates: { canonical: "/service-areas" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }];

/* THE LADDER. Sorted by real drive time, because the number is the argument. "In town" is
 * Omaha; everything else is minutes, and the two-hour entries are hours. */
const minutes = (drive: string) => {
  if (/in town/i.test(drive)) return 0;
  const h = /(\d+)\s*hr/.exec(drive);
  const m = /(\d+)\s*min/.exec(drive);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
};
const ladder = [...cities].sort((a, b) => minutes(a.drive) - minutes(b.drive));

/* TWO TIERS, NOT THREE. The outstate towns are gone from content/cities.ts - see the note on the
   City type there - so the "Scheduled route" band has nothing in it. The ternary keeps a fallback
   rather than assuming, because the tier union still allows "outstate" if a town comes back. */
const bandFor = (tier: string) =>
  tier === "metro" ? "Same week" : tier === "iowa" ? "Same week, over the river" : "Scheduled route";

const bandStyle: Record<string, string> = {
  "Same week": "border-accent/50 text-accent-ink",
  "Same week, over the river": "border-accent/50 text-accent-ink",
  "Scheduled route": "border-border text-muted-foreground",
};

/* THE THREE BANDS, and what each actually commits us to. */
const bands: { h: string; count: number; promise: string; p: string; href: string }[] = [
  {
    h: "The metro",
    count: metroCities.length,
    promise: "Service inside the week",
    p: "Everything within about thirty-five minutes of the shop on C Street. This is where most of what we have installed is, and it is why a dark run in December here is a visit rather than a project.",
    href: `/service-areas/${metroCities[0].slug}`,
  },
  {
    h: "Over the river",
    count: iowaCities.length,
    promise: "Same crews, same warranty",
    p: "Council Bluffs is twenty minutes from us, which is closer than half the Nebraska metro. Iowa-side installs get the same crews, the same materials and the same workmanship terms, and there is no border premium on the quote.",
    href: `/service-areas/${iowaCities[0].slug}`,
  },
];

/* THE OUTSTATE BAND IS GONE, AND IT WAS A BUILD FAILURE BEFORE IT WAS AN EDIT. It read
 * `outstateCities[0].slug`, and with the service area cut back to the metro and Council Bluffs
 * that array is empty - so the page threw "Cannot read properties of undefined (reading 'slug')"
 * at collect-page-data and took the whole build down. Worth noting because nothing about removing
 * six rows from a content file suggests it can break a route: the crash was two files away. */

export default function AreasHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness()} />

      <PageHero
        photo="/img/g-ranch-blue-white.jpg"
        photoAlt="A long Omaha ranch elevation lit blue and white with landscape uplighting"
        objectPosition="50% 45%"
        h1="Every town we drive to, and how long it takes."
        lede="A service area is only worth publishing if it says what it actually commits us to. Every town here is inside about thirty-five minutes of the shop, which is what lets a warranty call in February be the same week rather than a project."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/service-areas"]} ground="card" />


      {/* ── THE MAP ──
        * It was in the hero's right column, which is now the form on every page. Moving it into
        * the body cost nothing and bought two things: the map is no longer squeezed into 28rem
        * on the one page whose subject is geography, and the three drive-time bands now sit
        * beside it as a legend rather than two screens further down.
        *
        * The accessibility statement promises that the map is never the only route to this
        * information. It is not: the ladder below lists all eighteen towns as text. */}
      {/* bg-muted, not bg-background: the drive-time ladder directly below is on
        * bg-background, and two consecutive sections on the same ground read as one section
        * with a hundred pixels of nothing in the middle of it. */}
      <section className="section bg-muted">
        {/* THE LEGEND COLUMN IS GONE, AND IT WAS A REGRESSION OF MINE. The map sat at 58fr with a
          * 42fr column beside it holding a "How to read it" label, a paragraph, and the service
          * bands. That column was sized for three bands. Cutting the service area back to the metro
          * and Council Bluffs left two, so it finished 260px short of the map and the section read
          * as a map with a stunted card floating next to it.
          *
          * The paragraph went with it, and it should have gone earlier regardless: "pins are real
          * coordinates rather than a shaded blob" is the section explaining its own map, which is
          * exactly the self-describing subtext being cut everywhere else.
          *
          * The map is full width now and the two bands sit under it as a pair. Nothing is short,
          * nothing is explaining itself, and the map gets the width it always wanted. */}
        <div className="shell">
          <div className="overflow-hidden rounded-lg bg-card p-2 shadow-[var(--shadow-lg)] ring-1 ring-border">
            <ServiceLeaflet className="aspect-21/9 w-full" />
          </div>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {bands.map((b) => (
              <div key={b.h} className="rounded-lg bg-card px-6 py-5 shadow-[var(--shadow-lg)] ring-1 ring-border">
                <dt className="flex items-center gap-3 font-display text-[1.05rem] font-bold text-foreground">
                  <span className="run-node-inline is-sm" aria-hidden />
                  {b.h}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{b.promise}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── THE DRIVE-TIME LADDER ──
        * The centerpiece. Eighteen towns in one table, ordered by minutes,
        * with the band each falls into. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="How far, and what that changes."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[30fr_14fr_24fr_32fr] lg:gap-8">
              <p className="label text-on-dark-muted">Town</p>
              <p className="label text-on-dark-muted">Drive</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Service call
              </p>
              <p className="label text-on-dark-muted">Neighborhoods on its page</p>
            </div>
            <ul className="divide-y divide-border">
              {ladder.map((c) => {
                const band = bandFor(c.tier);
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/service-areas/${c.slug}`}
                      className="group grid gap-2 px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted lg:grid-cols-[30fr_14fr_24fr_32fr] lg:items-baseline lg:gap-8"
                    >
                      <span className="font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                        {c.name}
                        {c.state === "IA" ? ", Iowa" : ""}
                      </span>
                      <span className="u text-sm font-medium text-accent-ink">{c.drive}</span>
                      <span>
                        <span
                          className={`u inline-flex rounded-sm border px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] ${bandStyle[band]}`}
                        >
                          {band}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {c.neighborhoods.slice(0, 3).join(", ")}
                        {c.neighborhoods.length > 3 ? ` and ${c.neighborhoods.length - 3} more` : ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Drive times are from the shop at 13436 C St in normal traffic, not at rush hour and not with a
            trailer. Neighborhood lists are real subdivisions, and every one of those pages says to ring
            us anyway if yours is not on it.
          </p>
        </div>
      </section>

      {/* ── THE THREE BANDS ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="The promise is not the same everywhere."
            lede="The pricing does not change as you go out. What changes is how fast we can get back to you, and that is worth knowing before rather than after."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {bands.map((b) => (
              <article
                key={b.h}
                className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                  <p className="label flex items-center gap-3 text-foreground">
                    <span className="block h-4 w-1 bg-accent" aria-hidden />
                    {b.h}
                  </p>
                  <p className="u text-sm text-muted-foreground">
                    {b.count} {b.count === 1 ? "town" : "towns"}
                  </p>
                </div>
                <div className="flex-1 px-6 py-5">
                  <h3 className="font-display text-xl font-bold leading-snug text-foreground">
                    {b.promise}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">{b.p}</p>
                </div>
                <div className="border-t border-border px-6 py-4">
                  <TextLink href={b.href}>See a page in this band</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK FROM ACROSS THE AREA ──
        * A geography page is a map and two tables. These three are from around the metro and are
        * captioned as such — not one of them is captioned with a town, because we do not know
        * which town most of them are in and inventing one on a page about drive times would be
        * a strange place to start lying. */}
      <PhotoStrip
        title="The same crew, whichever line on the table you are on."
        lede="Drive time changes what we can promise about a warranty call. It does not change who turns up, what goes on the house, or what it costs."
        shots={pick("areas-index", 3)}
        cols={3}
        ground="raise"
      />

      {/* ── WHY IT STOPS WHERE IT STOPS ── */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[50fr_50fr] lg:gap-14">
          <div>
            <SectionHead onDark  title="Why the radius stops where it does." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg leading-relaxed text-on-dark">
                Permanent lighting is a fifteen year relationship with a building. So the honest limit on
                a service area is not how far a van will go for an install. It is how far it will go for
                a warranty call, in February, for one dark section.
              </p>
              <p className="text-base leading-relaxed text-on-dark-muted">
                That is why the area stops where it does. Everything we serve is inside about
                thirty-five minutes of the shop, Council Bluffs included, and a dark section on any of
                it is a visit rather than a route day. Further out we would be selling a system we
                could not service properly, so we do not, and if you ring from out there we will say
                so on the call rather than drive out and load the number.
              </p>
            </div>
            <div className="mt-8">
              <TextLink onDark href="/warranty">What is covered</TextLink>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Same everywhere
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "Per-foot pricing, with no travel charge added",
                  "The same crew in every town we serve",
                  "Both warranty layers, written on the quote",
                  "The covenant submission handled by us",
                  "The curb check and the scene walk at dusk",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
                Different as you go out
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "How fast a service call gets scheduled",
                  "Whether your install shares a day with a neighbor's",
                  "How long we will hold a route date before it moves",
                  "Whether we can drop by to look at something small",
                  "Outside the metro: we will turn the work down",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PageCta 
        /* The why-it-stops section above is bg-primary, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="muted"
      />
    </Shell>
  );
}
