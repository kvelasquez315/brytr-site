"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionHead, TextLink } from "@/components/ui/bits";
import { IcRoofline, IcPathLight, IcPergola } from "@/components/icons";

/* 14 — RECENT PROJECTS · tabbed photo gallery · raise
 * Tabs use an underlined tab bar, NOT the rounded chips from the scene rail, so the
 * same device does not appear twice on one page.
 *
 * DENSITY: this was three photographs, the first one spanning two columns and two rows
 * at 16/10 — one enormous picture with two small ones stuck to its side. That is the
 * "make it bigger so it looks full" move with an image instead of type, and it reads as
 * lazy because it is. Every tile is the same size now and there are twice as many of
 * them: five photographs of the house plus a detail cell that tells you what you are
 * looking at. Six equal cells, two even rows.
 *
 * Every project here is one we photographed ourselves. Homes are described by
 * elevation and by what is lit — never by the customer's address, and never with a
 * measurement we did not take. Only the active tab's photos load. */

type Shot = { src: string; alt: string; label: string; note: string };
type Project = {
  key: string;
  icon: typeof IcRoofline;
  blurb: string;
  spec: string;
  facts: [string, string][];
  shots: Shot[];
};

const tabs: Project[] = [
  {
    key: "Two-story, west Omaha",
    icon: IcRoofline,
    spec: "Roofline · gables · landscape",
    blurb:
      "Three gables, a brick front and an arched entry. Roofline, gable accents and tree uplighting all run off the same controller, so a scene change reaches the whole property at once.",
    facts: [
      ["Elevation", "Two-story brick, three gables"],
      ["What is lit", "Eaves, gables, soffit, front trees"],
      ["Control", "One controller, every zone"],
      ["Photographed", "October 2025"],
    ],
    shots: [
      { src: "/img/g-moonrise.jpg", label: "Blue and white", note: "Gables in color, eaves left white, tree uplights holding warm.",
        alt: "A two-story Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard" },
      /* Labelled "white", not "warm white": in this frame the runs read as a clean
       * white with a faint pink cast, and captioning it 2700K would be describing a
       * setting the photograph does not show. */
      { src: "/img/hero-warm-white.jpg", label: "The everyday setting", note: "Every run on white, which is where this house sits most nights of the year.",
        alt: "The same two-story Omaha home with every roofline run set to white" },
      { src: "/img/g-gable-detail.jpg", label: "Gable line, up close", note: "The run follows the gable and turns the corner without a break.",
        alt: "Close view of the lit channel following two gable edges on an Omaha home" },
      { src: "/img/christmas-detail.jpg", label: "Red and green, alternating", note: "Every other pixel, scheduled to a date range and left alone.",
        alt: "Individual red and green LEDs alternating along the gables of an Omaha home at Christmas" },
      { src: "/img/g-blue-elevation.jpg", label: "One color, every zone", note: "The whole front elevation pushed to a single color.",
        alt: "An Omaha home with its whole front elevation lit blue" },
    ],
  },
  {
    key: "Single-story ranch, west Omaha",
    icon: IcPathLight,
    spec: "Roofline · soffit · beds and boulders",
    blurb:
      "A long low ranch is the hardest elevation to light well — there is no gable to carry the eye, so the line itself has to be perfect. This one adds bed washes and boulder uplights at ground level.",
    facts: [
      ["Elevation", "Single-story ranch, long run"],
      ["What is lit", "Roofline, soffit, beds and boulders"],
      ["Control", "One controller, every zone"],
      ["Photographed", "October 2025"],
    ],
    shots: [
      { src: "/img/g-ranch-blue-white.jpg", label: "Two zones, two colors", note: "Roofline in color, soffit left white, landscape warm underneath.",
        alt: "A long Omaha ranch elevation lit blue and white with landscape uplighting" },
      { src: "/img/g-ranch-blue.jpg", label: "Brightness dialed back", note: "Color reads cleaner at seven-tenths output than at full.",
        alt: "An Omaha ranch home lit blue with a lit rock garden in front" },
      { src: "/img/scene-husker-red.jpg", label: "Scarlet, front to back", note: "Saved to its own scene and scheduled to kickoff.",
        alt: "An Omaha ranch home with its roofline in scarlet for a Nebraska game day" },
      { src: "/img/scene-game-day.jpg", label: "Red over white", note: "Roofline and soffit split, so two colors read as one idea.",
        alt: "An Omaha ranch home with its roofline in red over white for game day" },
      { src: "/img/scene-green.jpg", label: "Green across the run", note: "One color the length of the house, landscape lights left warm.",
        alt: "An Omaha ranch home with its roofline in green, rock garden lit warm below" },
    ],
  },
  {
    key: "Pool house and pergola, west Omaha",
    icon: IcPergola,
    spec: "Roofline · pergola · hardscape",
    blurb:
      "The whole rear of the property on one system: house roofline, a freestanding pergola, under-cap washers along the limestone wall, and the pool deck. Every element is its own zone.",
    facts: [
      ["Elevation", "Rear elevation, pergola, pool deck"],
      ["What is lit", "Roofline, pergola fascia, wall caps"],
      ["Control", "One controller, every zone"],
      ["Photographed", "October 2025"],
    ],
    shots: [
      { src: "/img/g-pool-blue.jpg", label: "Whole property, one tap", note: "House, pergola and hardscape switching together.",
        alt: "An Omaha home, pergola and pool deck lit blue at dusk" },
      { src: "/img/scene-warm-white.jpg", label: "The everyday setting", note: "Warm white on every zone, which is where it lives year round.",
        alt: "An Omaha home, pergola and pool deck on warm white at dusk" },
      { src: "/img/g-pool-firebowl.jpg", label: "Under-cap wall wash", note: "Washers tucked under the wall cap, aimed down, no glare from the seating.",
        alt: "A lit limestone retaining wall and fire bowl at an Omaha pool deck" },
      { src: "/img/g-pool-pergola.jpg", label: "Pergola fascia run", note: "The same channel profile used on the house, run on the pergola.",
        alt: "A pergola lit green along its fascia beside an Omaha pool deck" },
      { src: "/img/g-pool-red.jpg", label: "Rear elevation in red", note: "Color on the house, hardscape left warm so the deck stays usable.",
        alt: "An Omaha home and pool deck lit red at dusk with fire bowls burning" },
    ],
  },
];

export function ProjectTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="section bg-raise">
      <div className="shell">
        <SectionHead onDark title="Installs we photographed ourselves." lede={tab.blurb} />

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-on-dark/12" role="tablist" aria-label="Project categories">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3.5 pt-1 text-[0.95rem] font-semibold transition-colors duration-[--dur-fast] ${
                i === active ? "border-accent text-on-dark" : "border-transparent text-on-dark-muted hover:text-on-dark"
              }`}
            >
              <t.icon className="size-5" />
              {t.key}
            </button>
          ))}
        </div>

        {/* Six equal cells: five photographs and the detail cell. No lead tile, no span. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tab.shots.map((s) => (
            <figure
              key={s.src}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-primary ring-1 ring-on-dark/10"
            >
              <div className="relative aspect-video">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5">
                <p className="label text-accent">{s.label}</p>
                <p className="mt-2 text-sm text-on-dark-muted">{s.note}</p>
              </figcaption>
              <div className="absolute inset-x-0 top-0 h-0.5 bg-accent/0 transition-colors duration-[--dur-base] group-hover:bg-accent" aria-hidden />
            </figure>
          ))}

          {/* the sixth cell — what the five photographs are of. Keeps the grid even and
            * puts the specifics somewhere other than a caption. */}
          <div className="flex flex-col rounded-lg bg-primary p-5 ring-1 ring-accent/25">
            <p className="label text-accent">This house</p>
            <dl className="mt-4 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {tab.facts.map(([k, v]) => (
                <div key={k} className="py-2.5">
                  <dt className="text-xs text-on-dark-muted">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-on-dark">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-on-dark-muted">
              We photograph our own work at night, on the property, with the system running.
              No street names, because these are private homes.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-primary px-5 py-4 ring-1 ring-on-dark/10">
          <p className="label text-on-dark-muted">
            {tab.key} · {tab.spec}
          </p>
          <TextLink onDark href="/gallery">
            See the full gallery
          </TextLink>
        </div>
      </div>
    </section>
  );
}
