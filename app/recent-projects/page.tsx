import type { Metadata } from "next";
import Image from "next/image";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

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
        eyebrow="Recent work"
        h1="Finished work, photographed on site."
        lede="Not renders and not stock houses — three finished Brytr systems in west Omaha, shot after dark across a single October. Homeowner addresses stay private, so each is described by elevation and by what is lit."
        trail={trail}
        stats={[["3", "installs photographed"], ["19", "scenes shown"], ["18", "cities served"]]}
      />

      {projects.map((p, i) => (
        <section key={p.slug} className={`section ${i % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="shell">
            <SectionHead eyebrow={`${p.where} · ${p.shot}`} title={p.title} lede={p.lede} />

            <div className="mt-10 grid gap-5 lg:grid-cols-[62fr_38fr]">
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

              <div className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <dl className="divide-y divide-border border-y border-border">
                  {p.facts.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="u text-right text-sm font-medium text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="label mt-6 text-accent-ink">What made this one work</p>
                <ul className="mt-3 flex-1 space-y-2.5">
                  {p.includes.map((t) => (
                    <Check key={t}>{t}</Check>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-4">
                  <TextLink href="/free-design-consultation">Get a design like this one</TextLink>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.shots.map((s) => (
                <figure key={s.src} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                  <div className="relative aspect-video">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 23vw, 50vw" className="object-cover" />
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

      <section className="section bg-raise">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="By city"
            title="Where we install."
            lede="These three are west Omaha. The same crews cover the rest of the metro, Lincoln and the Iowa side."
          />
          <div className="mt-9">
            <CityTiles onDark />
          </div>
        </div>
      </section>

      <BandCta title="Get numbers for your own house." body="On-site measure after dark, written quote, no obligation." />
      <PageCta />
    </Shell>
  );
}
