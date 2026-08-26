import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip, PhotoPair } from "@/components/sections/photo-parts";
import { sequence } from "@/content/photo-sets";
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
 * The split, per the page ledger: THIS page is the SCENE LIBRARY, organized by what the
 * system is set to. /recent-projects is the same installs told as case studies. Each
 * page now says which it is and links to the other.
 *
 * The grouping is the centerpiece and it is the argument: almost everybody arrives thinking
 * this product is Christmas lights, and the honest counter is that the biggest group on the
 * page is "one color, every zone" and the first group is the setting the system sits on for
 * most of the year.
 *
 * Archetype: home hero → five grouped sets with a lead shot each → what to look for → the
 * split with /recent-projects. Closer: the phone band.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Gallery | Real Omaha Installs",
  description:
    "Brytr permanent lighting on finished Omaha homes, grouped by what the system is set to: everyday warm white, saved scenes, and two-zone splits.",
  alternates: { canonical: "/gallery" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }];

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-21/9",
  "4/3": "aspect-4/3",
  "3/4": "aspect-3/4",
};

/* THE GRID CARDS ALL USE ONE ASPECT, whatever the file's own is.
 *
 * The lead shot of each group is full width and gets its true aspect from ratioClass. The cards
 * in the three-across grid below it do not: the second archive is largely phone photographs, so a
 * row can contain a 4/3 frame beside a 3/4 one, and CSS grid stretches every card to the tallest.
 * The taller image sets the row height, the shorter images stay their own height, and each short
 * card ends up with its caption floating over a hundred pixels of nothing. A critic measured it at
 * 150px against 115px on one row of this page before this was fixed.
 *
 * So cards crop to 4/3 and the row is always level. A portrait frame that deserves its full
 * height belongs as a group's lead shot, where it gets one. */
const CARD_RATIO = "aspect-4/3";

/* THE LIBRARY, BY WHAT THE SYSTEM IS SET TO. Grouped by src so the grouping is checkable
 * against content/images.ts rather than being a caption exercise. Every shot in the archive
 * appears in exactly one group.
 *
 * GROUP SIZES ARE MULTIPLES OF THREE, and that is a hard constraint rather than tidiness. The
 * grid is three across. A group of one left two empty cells beside it, a group of seven left two
 * empty cells in its last row, and a group of two left one — three separate instances of a
 * captioned card floating in a card-sized hole, on the most photograph-heavy page on the site.
 * Blank space is the failure this client cares about most and I generated it structurally.
 *
 * So: add photographs or move them, never ship a remainder. If a group cannot reach the next
 * multiple of three honestly, it should be merged into a neighbour instead. */
const groups: { h: string; note: string; lede: string; srcs: string[] }[] = [
  {
    h: "The everyday setting",
    note: "Where the system sits most nights",
    /* This group used to hold three shots, two of which were pink rather than warm white, so
     * the group arguing "this is the setting you are actually buying" made that argument with
     * photographs of something else. They moved to the single-colour group and this one was
     * left holding a single frame, with a lede that admitted it.
     *
     * That admission is now obsolete and so is the shortage: the second archive brought nineteen
     * warm white front elevations. This is the most important group on the page and it is now the
     * second largest, which is the shape the argument always wanted. */
    lede:
      "This is the one that sells it, and it is the one nobody pictures before the consultation: on a schedule, from dusk until you go to bed, most nights of the year. Everybody asks us to photograph the colors, so most of what gets taken is colour — these are the frames of the setting you would actually live with. The daylight question, whether you can see the hardware at noon, is answered further down this page in photographs rather than in a promise.",
    srcs: [
      "/img/seq-everyday.jpg",
      "/img/scene-warm-white.jpg",
      "/img/home-prairie-twilight.jpg",
      "/img/home-shake-brick.jpg",
      "/img/home-craftsman-porch.jpg",
      "/img/home-porch-flag.jpg",
      "/img/home-wide-ranch.jpg",
      "/img/home-farmhouse-dark.jpg",
      "/img/home-brick-gables-gold.jpg",
    ],
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
      "/img/christmas-brick-two-storey.jpg",
      "/img/halloween-orange-purple.jpg",
    ],
  },
  {
    h: "One color, every zone",
    note: "The whole property, one tap",
    lede:
      "The largest group on the page, which is the honest answer to anybody who thinks this is a Christmas product. House, pergola, walls and deck all pushed to the same color, at whatever brightness keeps the color clean.",
    srcs: [
      "/img/g-blue-elevation.jpg",
      "/img/g-pool-red.jpg",
      "/img/g-pool-green.jpg",
      "/img/g-pool-pink.jpg",
      "/img/g-pool-blue.jpg",
      "/img/scene-green.jpg",
      "/img/g-ranch-blue.jpg",
      "/img/hero-warm-white.jpg",
      "/img/g-twilight-yard.jpg",
    ],
  },
  {
    h: "Two zones, two colors",
    note: "The look most people land on",
    lede:
      "Gables in color, eaves left white, landscape left warm. It is the setting customers arrive at after a month of playing with the app, and it is the reason zoning gets settled before install day rather than after.",
    srcs: ["/img/g-blue-white.jpg", "/img/g-ranch-blue-white.jpg", "/img/g-moonrise.jpg"],
  },
  {
    h: "Close up, and off the house",
    note: "The channel, and the structures",
    lede:
      "Nobody in this trade photographs the hardware, which is exactly why it is worth photographing. The same channel profile runs along a pergola fascia as along an eave.",
    srcs: ["/img/g-gable-detail.jpg", "/img/patio-pergola.jpg", "/img/detail-gable-miter.jpg"],
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
        h1="The same fixture, every way we have shot it."
        lede="Every photograph on this page is a Brytr system on a real Omaha home — no renders, no stock houses, no borrowed shots. Grouped by what the system is set to rather than by house, because the point is that none of these needed different hardware."
        trail={trail}
      />

      {/* ── THE NINETY-SECOND SEQUENCE ──
        * The strongest set in Brytr's library and it was sitting unused in a shared Drive
        * folder. One property, one drone that never left its hover point, five lighting states
        * captured between 20:40:29 and 20:41:59 on a September evening — the logged position
        * moves under two feet across all five frames.
        *
        * That is why this is a filmstrip and not a grid. A gallery full of different houses in
        * different colours proves we can light houses. Five frames of ONE house proves the thing
        * a gallery normally cannot: that the house in the warm white photograph and the house in
        * the scarlet photograph are the same house, on the same night, and that nothing was
        * swapped out to get from one to the other. Every competitor's gallery is open to the
        * suspicion that the colour shots are a different install. This set closes it. */}
      <PhotoStrip
        eyebrow="One house, one evening"
        title="The same roofline, photographed as the settings changed."
        lede="A drone held its position over one property west of Omaha for a minute and a half while the scenes were switched through from a phone. Same roof, same sky, same camera — read them left to right."
        shots={sequence}
        cols={5}
        frame="16/9"
        ground="raise"
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
              {/* Note under the rule, not beside the heading. */}
              <div className="border-b-2 border-accent pb-3">
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold text-foreground">
                  {g.h}
                </h2>
              </div>
              <p className="u mt-3 text-sm text-muted-foreground">{g.note}</p>
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
                      <div className={`relative ${CARD_RATIO}`}>
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

      {/* ── BY DAY ──
        * The gallery told readers, in as many words, that no photograph on it could answer the
        * daylight question and that they would have to take our word for it and come out to a
        * finished install. That was the honest thing to write with the archive we had. It was
        * also wrong: the daylight frames existed in Brytr's own shared library, and finding them
        * turns the single biggest unsupported claim on the site into something checkable.
        *
        * This is the most valuable section on the page for exactly that reason. Every competitor
        * gallery in this trade is a hundred night shots — because night shots are easy and
        * flattering, and because a badly detailed channel is invisible at night and obvious at
        * noon. Publishing the noon photograph is the argument. */}
      <PhotoPair
        eyebrow="The other half"
        title="The same hardware at noon, which is the photograph nobody in this trade publishes."
        lede="A night shot flatters any install. Daylight does not: at noon a badly fixed channel has nowhere to hide. Two houses, uncropped and ungraded."
        a="dayBrickGable"
        b="dayShakeGable"
        aLabel="Brick and white fascia. The channel runs under the roof edge, colour matched to the trim — you have to know it is there to find it."
        bLabel="A shake gable on a second house, so this is not one lucky angle. The run reads as a narrow strip below the gutter line."
        ground="muted"
      />

      <PhotoPair
        eyebrow="One entry, twice"
        title="And the same arch, before dark and after."
        lede="A straight rake is easy. This octagonal turret is about as awkward as a front elevation gets, and the run keeps going through it."
        a="archByDay"
        b="archAtNight"
        aLabel="Daylight. Nothing visible under the roof edge, on a curve where nothing can be hidden behind a fascia board."
        bLabel="After dark: one continuous run following every facet of the octagon, with no break at the corners."
        ground="background"
      />

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="How to read any of these"
            /* Was "A gallery can only settle half of it", with a lede saying no photograph here
              * answered the daylight question. That was true when it was written and it is not
              * true now: the daylight frames were in Brytr's own library the whole time and are
              * directly above this section. Leaving the old sentence in place would have been the
              * site telling a reader to disbelieve a photograph it had just shown them. */
            title="How to judge any of these, including ours."
            lede="Permanent lighting is judged twice: how it looks after dark, and whether you can see the hardware at noon. Both are answered on this page."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              [
                "The line, not the dots",
                "Look at any roofline above: it reads as one continuous line rather than a string of bulbs. That is the diffuser doing its job, and it is the difference between a light fixture and a decoration.",
                "Zoom in on any gable.",
              ],
              [
                "Where the color stops",
                "Color lands on the elevation the homeowner chose and stops there — gables scarlet, eaves left white, landscape left warm. Every run is a zone that can be set on its own.",
                "The everyday setting is white, not color.",
              ],
              [
                "What nobody photographs",
                "Mitered corners, sealed terminations, capped ends, and channel color matched to the fascia so it disappears at noon. Ask any installer for a daylight photo from the curb before you sign — and if they cannot produce one, that is the answer.",
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
              Organized by what the system is set to. Use it to work out what you would actually run,
              and to see that the everyday setting is a bigger part of owning this than December is.
            </p>
          </div>

          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label flex items-center gap-3 text-on-dark-muted">
              <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
              The other one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-on-dark">The installs, in full</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark-muted">
              The same photographs organized by property instead: finished systems in the metro,
              each with what is lit, how it is zoned, and the decision that made it work.
            </p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/recent-projects">See the installs, by property</TextLink>
            </div>
          </div>
        </div>
      </section>

      <PageCta variant="phone" panelLink={{ href: "/recent-projects", label: "The installs, told as case studies" }} />
    </Shell>
  );
}
