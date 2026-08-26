import type { Metadata } from "next";
import Image from "next/image";
import { Shell } from "@/app/layout-shell";
import Link from "next/link";
import { PageHero, PageCta, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /recent-projects — WAVE 6 of the page-by-page pass.
 *
 * The content here was already the strongest on the site: real installs, photographed
 * by us on dated evenings, described by elevation and by what is lit, with no addresses and
 * no measurements we did not take. What the page around it was doing wrong:
 *   · no photograph in the hero
 *   · a stat row that counted the three sections underneath it
 *   · the same section archetype three times in a row — lead photo left, fact panel right,
 *     four thumbnails beneath — which is the anti-repetition rule broken inside one page
 *   · the eighteen-city rack, which ten other templates also carried
 *   · two closers
 *
 * The case studies alternate: every other one leads with a full-bleed photograph
 * and puts its facts in a strip, so reading down the page is not reading the same layout
 * three times. And the page states its split with /gallery, which shows some of the same
 * photographs organized the other way round.
 */

export const metadata: Metadata = {
  title: "Recent Permanent Lighting Projects | Omaha",
  description:
    "Brytr permanent lighting installs in the Omaha metro, photographed on site: a brick two-story, a single-story ranch, and a pool house with a pergola.",
  alternates: { canonical: "/recent-projects" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Recent projects", href: "/recent-projects" }];

/* Real installs, photographed by us. Described by elevation and by what is lit.
 * No addresses — these are private homes. No measurements we did not take. */
const projects = [
  {
    slug: "two-story-brick",
    title: "Brick two-story, three gables",
    where: "West Omaha",
    shot: "Photographed October 2, 2025",
    lede:
      "The shape we quote most often: a brick front, three gables at different heights, and an arched entry. The gables are zoned separately from the eaves.",
    lead: {
      src: "/img/whole-home.jpg",
      alt: "A brick two-story Omaha home with roofline, gable and landscape lighting on at night",
    },
    facts: [
      ["Elevation", "Two-story, three gables"],
      ["Lit", "Roofline, gables, soffit, landscape"],
      ["Zones visible", "Gables, eaves, landscape"],
      ["Scenes photographed", "Seven"],
    ],
    includes: [
      "Gables zoned apart from the eaves, so color can stop where you want it to",
      "Uplights on the front trees left warm while the roofline changes color",
      "Entry left on its own warm circuit, unaffected by scene changes",
    ],
    shots: [
      { src: "/img/hero-warm-white.jpg", label:"One soft pink, every run", alt: "The same Omaha two-story with every roofline run set to the same soft pink" },
      { src: "/img/hero-game-day.jpg", label:"Game day", alt: "The same Omaha two-story lit red and blue for game day" },
      { src: "/img/christmas-detail.jpg", label:"Christmas", alt: "Individual red and green LEDs alternating along the gables of the same Omaha home" },
      { src: "/img/g-blue-white.jpg", label:"Two zones, two colors", alt: "The same Omaha home with gables in blue and eaves left white" },
    ],
  },
  {
    slug: "single-story-ranch",
    title: "Single-story ranch, long elevation",
    where: "West Omaha",
    shot: "Photographed October 14, 2025",
    lede:
      "A low ranch is the hardest elevation in this trade: no gable to carry the eye, so the run has to hold its own line for its whole length.",
    lead: {
      src: "/img/g-ranch-blue-white.jpg",
      alt: "A long single-story Omaha ranch elevation lit blue and white with landscape uplighting",
    },
    facts: [
      ["Elevation", "Single-story ranch"],
      ["Lit", "Roofline, soffit, beds, boulders"],
      ["Zones visible", "Roofline, soffit, landscape"],
      ["Scenes photographed", "Six"],
    ],
    includes: [
      "Run held to one line across the full elevation, including over the garage",
      "Soffit left white while the roofline takes the color",
      "Landscape kept warm so the color has something to sit against",
    ],
    shots: [
      { src: "/img/scene-husker-red.jpg", label:"Scarlet", alt: "The same Omaha ranch home lit scarlet" },
      { src: "/img/scene-green.jpg", label:"Green", alt: "The same Omaha ranch home lit green" },
      { src: "/img/scene-halloween.jpg", label:"October", alt: "The same Omaha ranch home washed violet with pumpkins on the steps" },
      { src: "/img/g-twilight-yard.jpg", label:"Dusk trigger", alt: "The same Omaha home at twilight as the lighting switches on" },
    ],
  },
  {
    slug: "pool-house-pergola",
    title: "Pool house, pergola and hardscape",
    where: "West Omaha",
    shot: "Photographed October 19, 2025",
    lede:
      "The whole back of the property on one system, and each element is its own zone — so the house can go scarlet while the seating area stays warm.",
    lead: {
      src: "/img/scene-warm-white.jpg",
      alt: "An Omaha home, pergola and pool deck on warm white at dusk",
    },
    facts: [
      ["Elevation", "Rear, plus a freestanding structure"],
      ["Lit", "Roofline, pergola, wall, deck"],
      ["Zones visible", "House, pergola, hardscape"],
      ["Scenes photographed", "Six"],
    ],
    includes: [
      "The same channel profile on the house and on the pergola fascia",
      "Under-cap wall washers aimed down, so there is no glare from the seating",
      "Deck and step lighting on its own circuit, left warm through every scene",
    ],
    shots: [
      { src: "/img/g-pool-red.jpg", label:"Full red", alt: "The same Omaha property lit red across house, pergola and deck" },
      { src: "/img/g-pool-blue.jpg", label:"Whole property, one tap", alt: "The same Omaha property lit blue across house, pergola and deck" },
      { src: "/img/g-pool-firebowl.jpg", label:"Under-cap wall wash", alt: "A lit limestone retaining wall and fire bowl at the pool deck" },
      { src: "/img/g-pool-pergola.jpg", label:"Pergola fascia run", alt: "A pergola lit along its fascia beside the pool deck" },
    ],
  },
  /* THE FOURTH, AND THE ONLY ONE WITH ITS OWN CLOCK.
   *
   * The three above were shot over separate evenings and the frames within each are minutes
   * apart. This one is different in a way that is worth a case study of its own: a drone held
   * one hover point and the scenes were switched from a phone underneath it, so the five frames
   * were captured between 20:40:29 and 20:41:59 — a minute and a half — and the logged position
   * moves less than two feet from the first to the last.
   *
   * That matters because the standing suspicion about every permanent lighting gallery in this
   * trade, ours included, is that the warm white photograph and the scarlet photograph are two
   * different houses. On this install that is checkable and false. It is the only set on the
   * site that can carry the claim, which is why it is here and why the numbers are stated. */
  {
    slug: "ranch-five-scenes",
    title: "Brick and cedar ranch, one hover point",
    where: "West of Omaha",
    shot: "Photographed September 30, 2025",
    lede:
      "One roof, one hover point, ninety seconds. Every frame below is the same sky and the same camera, with only the scene changing.",
    lead: {
      src: "/img/seq-everyday.jpg",
      alt: "A brick and cedar ranch west of Omaha at dusk, its roofline, eaves and garage band on everyday warm white",
    },
    facts: [
      ["Elevation", "Single-story, hip roof"],
      ["Lit", "Roofline, eaves, garage band"],
      ["Zones visible", "Roofline, peaks"],
      ["Whole set spans", "1 min 30 sec"],
    ],
    includes: [
      "The same run doing security lighting, everyday warm white and full warm white, at three brightnesses",
      "White held at the roof peaks during the colour scene, so the roof still reads as a roof",
      "Camera position logged to within two feet across every frame, so the set is a sequence rather than a selection",
    ],
    shots: [
      { src: "/img/seq-security.jpg", label:"Dimmed warm white", alt: "The same house minutes later with the run dimmed to a low warm white, enough to read the driveway by" },
      { src: "/img/seq-warm-christmas.jpg", label:"Warm white, full", alt: "The same house with every point along the roofline and eaves at full warm white" },
      { src: "/img/seq-red-green.jpg", label:"December", alt: "The same house with the roofline alternating red and green" },
      { src: "/img/seq-gameday.jpg", label:"Scarlet, white peaks", alt: "The same house washed red across the whole elevation with white left at the roof peaks" },
    ],
  },
];

export default function RecentProjects() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        photo="/img/patio-pergola.jpg"
        photoAlt="Lit pergola, pool deck and fire bowls at an Omaha home at dusk"
        objectPosition="50% 52%"
        h1="Finished installs, photographed on site after dark."
        /* Was "Three Brytr installs in west Omaha, shot after dark across a single October".
          * A fourth arrived, photographed in September, west OF Omaha, and in daylight-into-dusk
          * rather than after dark — so the opening sentence was wrong on the count, the month,
          * the place and the light, in one line. Counting things in a lede is how that happens:
          * the sentence has to be rewritten every time the archive changes, and it never is. */
        lede="Not renders and not stock houses. Brytr installs around the Omaha metro, photographed on the properties with the systems running, and described by elevation and by what is lit. Homeowner addresses stay private, so none of them are named."
        trail={trail}
      />

      {projects.map((p, i) => (
        <section key={p.slug} className={`section ${i % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="shell">
            <SectionHead eyebrow={`${p.where} · ${p.shot}`} title={p.title} lede={p.lede} />

            <div className={`mt-10 grid gap-5 ${i % 2 === 1 ? "" : "lg:grid-cols-[62fr_38fr]"}`}>
              <figure className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-lg)]">
                <div className="relative aspect-16/10">
                  <Image
                    src={p.lead.src}
                    alt={p.lead.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width:1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>

              {/* ALTERNATING, not "the middle one".
                * This was hardcoded to i % 2 === 1 when there were three case studies. A fourth
                * arrived and the condition silently stopped alternating: 0 split, 1 full-bleed,
                * 2 split, 3 split — two identical layouts back to back, which is the exact rule
                * this treatment exists to satisfy. `i % 2` alternates for any number of them. */}
              <div className={`flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] ${i % 2 === 1 ? "lg:p-7" : ""}`}>
                <dl className={i % 2 === 1 ? "grid gap-x-8 divide-border border-y border-border sm:grid-cols-4 sm:divide-x" : "divide-y divide-border border-y border-border"}>
                  {p.facts.map(([k, v]) => (
                    <div key={k} className={i % 2 === 1 ? "px-1 py-4 sm:px-5" : "flex items-baseline justify-between gap-4 py-3"}>
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className={i % 2 === 1 ? "u mt-1.5 text-[0.95rem] font-medium text-foreground" : "u text-right text-sm font-medium text-foreground"}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="label mt-6 text-accent-ink">What made this one work</p>
                <ul className={`mt-3 flex-1 space-y-2.5 ${i % 2 === 1 ? "lg:columns-2 lg:gap-10 lg:space-y-0" : ""}`}>
                  {p.includes.map((t) => (
                    <Check key={t}>{t}</Check>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-4">
                  <TextLink href="/free-design-consultation">Get a design like this one</TextLink>
                </div>
              </div>
            </div>

            <div className={`mt-5 grid gap-4 sm:grid-cols-2 ${i % 2 === 1 ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}>
              {p.shots.map((s) => (
                <figure key={s.src} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                  <div className="relative aspect-video">
                    <Image src={s.src} alt={s.alt} fill sizes={i % 2 === 1 ? "(min-width:1024px) 46vw, 100vw" : "(min-width:1024px) 23vw, 50vw"} className="object-cover" />
                  </div>
                  <figcaption className="label px-4 py-3 text-muted-foreground">
                    {s.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── THE SHOT LIST ──
        * What we have NOT photographed — and, since the library grew, what we since have.
        * Publishing the gaps is the only version of this page that stays honest as it gets
        * used, and that obligation runs both ways: a gap that closes has to be marked. */}
      <section className="section bg-raise">
        {/* `items-start` left a 380 x 255px hole under the left column, because the right-hand
          * list grew by one item and the left column is a fixed amount of prose. A left column
          * that stops a quarter of a section short of its neighbour is the blank-space failure,
          * and the honest fix is not to pad the prose: the left column now carries the count of
          * what is open as a small ledger at its foot, which is information a reader of this
          * particular section wants and which happens to be the right height. */}
        <div className="shell grid items-stretch gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div className="flex flex-col">
            <SectionHead
              onDark
              eyebrow="What arrived, and what is still missing"
              title="The gaps this page used to list, and the ones it still does."
            />
            {/* THE POINT OF PUBLISHING GAPS IS THAT YOU HAVE TO GO BACK AND CLOSE THEM.
              *
              * This list was six shots the site wanted and did not have, and it was the most
              * honest thing on the site. Four of the six have since turned up in Brytr's own
              * library — the daylight frame, warm white on a front elevation, the crew working,
              * and a set of one property in several states — which means the old list had become
              * the site telling a reader to disbelieve photographs that were now three sections
              * further up the same page.
              *
              * A page that lists its gaps and then does not update the list is worse than a page
              * that never listed them, because the second is merely thin and the first is wrong.
              * So the closed ones are marked closed with a link to where they landed, and the
              * two that are still open are still open. */}
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              This page has always listed the photographs it wanted and did not have. Most of that
              list has since been closed out of Brytr&rsquo;s own archive rather than by a new
              shoot, which is its own small lesson about what is sitting in a shared folder. What
              is marked open below is genuinely open, and these pages will keep saying so.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/gallery">The scene library</TextLink>
              <TextLink onDark href="/free-design-consultation">See one in person instead</TextLink>
            </div>
            <dl className="mt-auto divide-y divide-on-dark/12 border-t border-on-dark/12 pt-6">
              {[
                ["Closed since this list was written", "The daylight frame, warm white on a front elevation, and the crew working"],
                ["Closed by finding rather than shooting", "All three were already in the company archive"],
                ["Still open", "A commercial install, a property outside the metro, the app, and the two of them"],
              ].map(([k, v]) => (
                <div key={k} className="py-3.5">
                  <dt className="label text-on-dark">{k}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-on-dark-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
            {[
              ["A daylight shot from the curb", "closed", "The most useful photograph in this trade and the one nobody publishes. There are now three of them, on three different houses, in the gallery — brick, shake and stone, so it is not one flattering angle."],
              ["Warm white, on the front of a house", "closed", "Every warm-white frame used to be one back garden on one evening. The ranch above is a front elevation on plain warm white, at three brightnesses, and there are a dozen more fronts through the service pages."],
              ["The crew, working", "closed", "Somebody sitting on the shingles fixing a run to the fascia, in daylight. It is on the warranty page, where every claim about who is on your roof is made."],
              ["A commercial install", "open", "We do storefronts, canopies and multifamily. The closest real frame is a lit storefront band behind one of our own crew, and the commercial page uses it and says exactly that."],
              ["A property out of the metro", "open", "The archive is still all Omaha metro. The Lincoln and Grand Island pages say so in their own footnotes, and the photographs on every city page are captioned by what is in the frame rather than by a town."],
              ["The app, on a phone", "open", "We describe the scene library on half a dozen pages without ever showing it."],
              ["Zac and Sam", "open", "The about page names the two of them in every other sentence and has no photograph of either. There is one frame of somebody in a Brytr shirt in the archive and we cannot tell from it which of them it is, so it is captioned as a member of the crew rather than given a name it might not have."],
            ].map(([h, state, p2]) => (
              <li key={h} className="py-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[1.05rem] font-bold text-on-dark">{h}</h3>
                  <span
                    className={`u shrink-0 rounded-sm border px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] ${
                      state === "closed"
                        ? "border-on-dark/30 text-on-dark-muted"
                        : "border-accent/50 text-accent"
                    }`}
                  >
                    {state === "closed" ? "Since photographed" : "Still open"}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{p2}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THE SPLIT WITH /gallery ── */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-lg bg-background p-7 shadow-[var(--shadow-lg)]">
            <p className="label flex items-center gap-3 text-accent-ink">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              You are on this one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">The installs, in full</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
              Organized by property: what the elevation is, what is lit, how it is zoned, and the one
              decision on each that made it work. Use it to find the house closest to yours.
            </p>
          </div>

          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label flex items-center gap-3 text-on-dark-muted">
              <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
              The other one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-on-dark">The scene library</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark-muted">
              The same photographs organized by what the system is set to instead — the everyday warm
              white, the saved occasions, one color across every zone, and the two-zone splits.
            </p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/gallery">Open the scene library</TextLink>
            </div>
          </div>
        </div>
      </section>

      <PageCta variant="phone" panelLink={{ href: "/gallery", label: "The scene library" }} />
    </Shell>
  );
}
