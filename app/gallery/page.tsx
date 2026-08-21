import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { galleryShots } from "@/content/images";

/* /gallery — WAVE 6 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row repeating three figures that appear on
 * a dozen other pages, one feature tile and then twenty-one shots in an undifferentiated
 * three-column grid, and two closers. It also overlapped badly with /recent-projects, which
 * shows some of the same photographs — so a reader who saw both could not tell what either
 * page was for.
 *
 * The split, per the page ledger: THIS page is the SCENE LIBRARY, organised by what the
 * system is set to. /recent-projects is three finished installs told as case studies. Each
 * page now says which it is and links to the other.
 *
 * The grouping is the centrepiece and it is the argument: almost everybody arrives thinking
 * this product is Christmas lights, and the honest counter is that the biggest group on the
 * page is "one colour, every zone" and the first group is the setting the system sits on for
 * most of the year.
 *
 * Archetype: home hero → five grouped sets with a lead shot each → what to look for → the
 * split with /recent-projects. Closer: the phone band.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Gallery | Real Omaha Installs",
  description:
    "Brytr permanent lighting on finished Omaha homes, grouped by what the system is set to: the everyday warm white, saved occasion scenes, one colour across every zone, and two-zone splits.",
  alternates: { canonical: "/gallery" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }];

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-21/9",
  "4/3": "aspect-4/3",
};

/* THE LIBRARY, BY WHAT THE SYSTEM IS SET TO. Grouped by src so the grouping is checkable
 * against content/images.ts rather than being a caption exercise. Every one of the
 * twenty-two shots in the archive appears in exactly one group. */
const groups: { h: string; note: string; lede: string; srcs: string[] }[] = [
  {
    h: "The everyday setting",
    note: "Where the system sits most nights",
    lede:
      "This is the one that sells it, and it is the one nobody pictures before the consultation. Warm white, on a schedule, from dusk until you go to bed — roughly three hundred nights a year of the twelve months you are paying for.",
    srcs: ["/img/hero-warm-white.jpg", "/img/scene-warm-white.jpg", "/img/g-twilight-yard.jpg"],
  },
  {
    h: "Occasions, saved as scenes",
    note: "Set once, scheduled, forgotten",
    lede:
      "Each of these is a saved scene rather than a change of hardware. They run on a date range and put themselves back to warm white afterwards, which is why nobody in these houses owns a ladder in January.",
    srcs: [
      "/img/christmas-detail.jpg",
      "/img/scene-halloween.jpg",
      "/img/scene-fourth.jpg",
      "/img/scene-birthday.jpg",
      "/img/scene-husker-red.jpg",
      "/img/scene-game-day.jpg",
      "/img/hero-game-day.jpg",
    ],
  },
  {
    h: "One colour, every zone",
    note: "The whole property, one tap",
    lede:
      "The largest group on the page, which is the honest answer to anybody who thinks this is a Christmas product. House, pergola, walls and deck all pushed to the same colour, at whatever brightness keeps the colour clean.",
    srcs: [
      "/img/g-blue-elevation.jpg",
      "/img/g-pool-red.jpg",
      "/img/g-pool-green.jpg",
      "/img/g-pool-pink.jpg",
      "/img/g-pool-blue.jpg",
      "/img/scene-green.jpg",
      "/img/g-ranch-blue.jpg",
    ],
  },
  {
    h: "Two zones, two colours",
    note: "The look most people land on",
    lede:
      "Gables in colour, eaves left white, landscape left warm. It is the setting customers arrive at after a month of playing with the app, and it is the reason zoning gets settled before install day rather than after.",
    srcs: ["/img/g-blue-white.jpg", "/img/g-ranch-blue-white.jpg", "/img/g-moonrise.jpg"],
  },
  {
    h: "Close up, and off the house",
    note: "The channel, and the structures",
    lede:
      "Nobody in this trade photographs the hardware, which is exactly why it is worth photographing. The same channel profile runs along a pergola fascia as along an eave.",
    srcs: ["/img/g-gable-detail.jpg", "/img/patio-pergola.jpg"],
  },
];

const shotFor = (src: string) => galleryShots.find((s) => s.src === src);

export default function Gallery() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/scene-game-day.jpg"
        photoAlt="An Omaha ranch home with its roofline in red over white for game day"
        objectPosition="50% 48%"
        eyebrow="Gallery"
        h1="The same fixture, twenty-two ways."
        lede="Every photograph on this page is a Brytr system on a real Omaha home — no renders, no stock houses, no borrowed shots. Grouped by what the system is set to rather than by house, because the point is that none of these needed different hardware."
        trail={trail}
        footnote={
          <>
            Homeowner addresses stay private, so each shot is captioned by scene rather than by street.{" "}
            <Link
              href="/recent-projects"
              className="text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              Three of these installs, told properly
            </Link>.
          </>
        }
      />

      {/* ── THE LIBRARY ──
        * Five groups, each led by one large shot. The group order is the
        * argument: the everyday setting first, occasions second. */}
      {groups.map((g, gi) => {
        const [leadSrc, ...restSrcs] = g.srcs;
        const lead = shotFor(leadSrc);
        return (
          <section key={g.h} className={`section ${gi % 2 === 0 ? "bg-background" : "bg-muted"}`}>
            <div className="shell">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-accent pb-3">
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold text-foreground">
                  {g.h}
                </h2>
                <p className="u text-sm text-muted-foreground">
                  {g.note} · {g.srcs.length} shots
                </p>
              </div>
              <p className="mt-5 max-w-[80ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                {g.lede}
              </p>

              {lead && (
                <figure className="mt-8 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-lg)]">
                  <div className={`relative ${ratioClass[lead.ratio]}`}>
                    <Image
                      src={lead.src}
                      alt={lead.alt}
                      fill
                      priority={gi === 0}
                      sizes="(min-width:1280px) 1240px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="label text-accent">{lead.scene}</span>
                    <span className="max-w-[70ch] text-[0.95rem] leading-relaxed text-on-dark-muted">
                      {lead.caption}
                    </span>
                  </figcaption>
                </figure>
              )}

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {restSrcs.map((src) => {
                  const s = shotFor(src);
                  if (!s) return null;
                  return (
                    <figure
                      key={src}
                      className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
                    >
                      <div className={`relative ${ratioClass[s.ratio]}`}>
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="flex flex-1 flex-col px-5 py-4">
                        <span className="label text-accent-ink">{s.scene}</span>
                        <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {s.caption}
                        </p>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="How to read any of these"
            title="A gallery can only settle half of it."
            lede="Permanent lighting is judged twice: how it performs after dark, and whether you can see the hardware at noon. Every photograph on this page answers the first question. None of them answer the second, which is why we will walk you to a finished install in daylight instead."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              [
                "The line, not the dots",
                "Look at any roofline above: it reads as one continuous line rather than a string of bulbs. That is the diffuser doing its job, and it is the difference between a light fixture and a decoration.",
                "Zoom in on any gable.",
              ],
              [
                "Where the colour stops",
                "Colour lands on the elevation the homeowner chose and stops there — gables scarlet, eaves left white, landscape left warm. Every run is a zone that can be set on its own.",
                "The everyday setting is white, not colour.",
              ],
              [
                "What nobody photographs",
                "Mitred corners, sealed terminations, capped ends, and channel colour matched to the fascia so it disappears at noon. Ask any installer for a daylight photo from the curb before you sign.",
                "We will show you ours in person.",
              ],
            ].map(([h, p, note]) => (
              <article key={h} className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{h}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">{p}</p>
                <p className="label mt-5 border-t border-on-dark/12 pt-4 text-accent">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SPLIT WITH /recent-projects ──
        * These two pages used to show some of the same photographs with no
        * stated difference between them. */}
      <section className="section bg-background">
        <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
            <p className="label flex items-center gap-3 text-accent-ink">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              You are on this one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">The scene library</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
              Organised by what the system is set to. Use it to work out what you would actually run,
              and to see that the everyday setting is a bigger part of owning this than December is.
            </p>
          </div>

          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label flex items-center gap-3 text-on-dark-muted">
              <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
              The other one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-on-dark">Three installs, in full</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark-muted">
              The same photographs organised by property instead: three finished systems in west Omaha,
              each with what is lit, how it is zoned, and the decision that made it work.
            </p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/recent-projects">See the three installs</TextLink>
            </div>
          </div>
        </div>
      </section>

      <PageCta variant="phone" panelLink={{ href: "/recent-projects", label: "Three installs, in full" }} />
    </Shell>
  );
}
