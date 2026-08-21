import type { Metadata } from "next";
import Image from "next/image";
import { Shell } from "@/app/layout-shell";
import Link from "next/link";
import { PageHero, PageCta, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /recent-projects — WAVE 6 of the page-by-page pass.
 *
 * The content here was already the strongest on the site: three real installs, photographed
 * by us on dated evenings, described by elevation and by what is lit, with no addresses and
 * no measurements we did not take. What the page around it was doing wrong:
 *   · no photograph in the hero
 *   · a stat row that counted the three sections underneath it
 *   · the same section archetype three times in a row — lead photo left, fact panel right,
 *     four thumbnails beneath — which is the anti-repetition rule broken inside one page
 *   · the eighteen-city rack, which ten other templates also carried
 *   · two closers
 *
 * The three case studies now alternate: the middle one leads with a full-bleed photograph
 * and puts its facts in a strip, so reading down the page is not reading the same layout
 * three times. And the page states its split with /gallery, which shows some of the same
 * photographs organised the other way round.
 */

export const metadata: Metadata = {
  title: "Recent Permanent Lighting Projects | Omaha",
  description:
    "Three Brytr permanent lighting installs in west Omaha, photographed on site: a brick two-story, a single-story ranch, and a pool house with a freestanding pergola.",
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
      "The shape we quote most often: a brick front, three gables at different heights, and an arched entry that wants its own treatment. The channel carries the eave line across all three gables without a visible break, and the gables are zoned separately from the eaves so they can hold a different color.",
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
      { src: "/img/hero-warm-white.jpg", label:"Everyday warm white", alt: "The same Omaha two-story on everyday warm white" },
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
      "A low ranch is the hardest elevation in this trade. There is no gable to carry the eye, so the run itself has to hold a straight line for its whole length or the whole thing looks crooked. This one adds bed washes and boulder uplights so the ground plane does some of the work.",
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
      "Everything at the back of the property on one system: the house roofline, a freestanding pergola, under-cap washers along the limestone retaining wall, and the pool deck. Each element is its own zone, which is what lets the house go scarlet while the seating area stays warm.",
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
];

export default function RecentProjects() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        photo="/img/patio-pergola.jpg"
        photoAlt="Lit pergola, pool deck and fire bowls at an Omaha home at dusk"
        objectPosition="50% 52%"
        eyebrow="Recent work"
        h1="Three finished systems, photographed on site."
        lede="Not renders and not stock houses. Three Brytr installs in west Omaha, shot after dark across a single October, described by elevation and by what is lit. Homeowner addresses stay private, so none of them are named."
        trail={trail}
        footnote={
          <>
            The third of the three: house roofline, a freestanding pergola, under-cap wall washers and
            the pool deck, each on its own zone.{" "}
            <Link href="/gallery" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              The same shots, organised by scene
            </Link>.
          </>
        }
      />

      {projects.map((p, i) => (
        <section key={p.slug} className={`section ${i % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="shell">
            <SectionHead eyebrow={`${p.where} · ${p.shot}`} title={p.title} lede={p.lede} />

            <div className={`mt-10 grid gap-5 ${i === 1 ? "" : "lg:grid-cols-[62fr_38fr]"}`}>
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

              {/* The middle project lays its facts across the full width under a
                * full-bleed lead shot, so the three case studies do not read as the
                * same layout three times. */}
              <div className={`flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] ${i === 1 ? "lg:p-7" : ""}`}>
                <dl className={i === 1 ? "grid gap-x-8 divide-border border-y border-border sm:grid-cols-4 sm:divide-x" : "divide-y divide-border border-y border-border"}>
                  {p.facts.map(([k, v]) => (
                    <div key={k} className={i === 1 ? "px-1 py-4 sm:px-5" : "flex items-baseline justify-between gap-4 py-3"}>
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className={i === 1 ? "u mt-1.5 text-[0.95rem] font-medium text-foreground" : "u text-right text-sm font-medium text-foreground"}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="label mt-6 text-accent-ink">What made this one work</p>
                <ul className={`mt-3 flex-1 space-y-2.5 ${i === 1 ? "lg:columns-2 lg:gap-10 lg:space-y-0" : ""}`}>
                  {p.includes.map((t) => (
                    <Check key={t}>{t}</Check>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-4">
                  <TextLink href="/free-design-consultation">Get a design like this one</TextLink>
                </div>
              </div>
            </div>

            <div className={`mt-5 grid gap-4 sm:grid-cols-2 ${i === 1 ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}>
              {p.shots.map((s) => (
                <figure key={s.src} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                  <div className="relative aspect-video">
                    <Image src={s.src} alt={s.alt} fill sizes={i === 1 ? "(min-width:1024px) 46vw, 100vw" : "(min-width:1024px) 23vw, 50vw"} className="object-cover" />
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
        * What we have NOT photographed. An archive of three installs from one
        * October is a real limit, and publishing the gaps is the only version of
        * this page that stays honest as it gets used. */}
      <section className="section bg-raise">
        <div className="shell grid items-start gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              eyebrow="What is missing"
              title="Three installs, one October, all after dark."
            />
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              That is the whole archive, and it is worth saying rather than implying otherwise by
              rotating the same photographs. Everything below is a shot we want and do not have, and
              until we have it these pages will not pretend.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/gallery">The scene library</TextLink>
              <TextLink onDark href="/free-design-consultation">See one in person instead</TextLink>
            </div>
          </div>

          <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
            {[
              ["A daylight shot from the curb", "The single most useful photograph in this trade and the one nobody publishes, ours included. Until it exists we will drive you to a finished install and let you look at the eave line at noon."],
              ["The crew, working", "Two people on a ladder with the sealant gun out. Every claim on this site about who is on your roof would be better as a photograph."],
              ["A commercial install", "We do storefronts, canopies and multifamily. There is no photograph of one on this site yet, so the commercial page borrows the closest real thing and says so."],
              ["A property out of the metro", "The whole archive is west Omaha. The Lincoln and Grand Island pages say so in their own footnotes."],
              ["The app, on a phone", "We describe the scene library on half a dozen pages without ever showing it."],
            ].map(([h, p2]) => (
              <li key={h} className="py-5">
                <h3 className="font-display text-[1.05rem] font-bold text-on-dark">{h}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{p2}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THE SPLIT WITH /gallery ── */}
      <section className="section bg-background">
        <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
            <p className="label flex items-center gap-3 text-accent-ink">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              You are on this one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Three installs, in full</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
              Organised by property: what the elevation is, what is lit, how it is zoned, and the one
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
              The same photographs organised by what the system is set to instead — the everyday warm
              white, the saved occasions, one colour across every zone, and the two-zone splits.
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
