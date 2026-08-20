"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionHead, TextLink } from "@/components/ui/bits";
import { IcRoofline, IcPathLight, IcPergola } from "@/components/icons";

/* 14 — RECENT PROJECTS · tabbed photo gallery · raise
 * Tabs use an underlined tab bar, NOT the rounded chips from the scene rail, so the
 * same device does not appear twice on one page.
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
  shots: Shot[];
};

const tabs: Project[] = [
  {
    key: "Two-story, west Omaha",
    icon: IcRoofline,
    spec: "Roofline · gables · landscape",
    blurb:
      "Three gables, a brick front and an arched entry. Roofline, gable accents and tree uplighting all run off the same controller, so a scene change reaches the whole property at once.",
    shots: [
      { src: "/img/g-moonrise.jpg", label: "Blue and white", note: "Gables in color, eaves left white, tree uplights holding warm.",
        alt: "A two-story Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard" },
      { src: "/img/g-gable-detail.jpg", label: "Channel detail", note: "The run follows the gable line and turns the corner without a break.",
        alt: "Close view of the lit channel following two gable edges on an Omaha home" },
      { src: "/img/g-blue-elevation.jpg", label: "One color, every zone", note: "Same house with every zone pushed to a single color.",
        alt: "An Omaha home with its whole front elevation lit blue" },
    ],
  },
  {
    key: "Single-story ranch, west Omaha",
    icon: IcPathLight,
    spec: "Roofline · soffit · beds and boulders",
    blurb:
      "A long low ranch is the hardest elevation to light well — there is no gable to carry the eye, so the line itself has to be perfect. This one adds bed washes and boulder uplights at ground level.",
    shots: [
      { src: "/img/g-ranch-blue-white.jpg", label: "Two zones, two colors", note: "Roofline in color, soffit left white, landscape warm underneath.",
        alt: "A long Omaha ranch elevation lit blue and white with landscape uplighting" },
      { src: "/img/g-ranch-blue.jpg", label: "Brightness dialed back", note: "Color reads cleaner at 70% than it does at full output.",
        alt: "An Omaha ranch home lit blue with a lit rock garden in front" },
      { src: "/img/g-twilight-yard.jpg", label: "Dusk trigger", note: "The system came up on its own as the light dropped.",
        alt: "An Omaha home at twilight with its lighting just switched on" },
    ],
  },
  {
    key: "Pool house and pergola, west Omaha",
    icon: IcPergola,
    spec: "Roofline · pergola · hardscape",
    blurb:
      "The whole rear of the property on one system: house roofline, a freestanding pergola, under-cap washers along the limestone wall, and the pool deck. Every element is its own zone.",
    shots: [
      { src: "/img/g-pool-blue.jpg", label: "Whole property, one tap", note: "House, pergola and hardscape switching together.",
        alt: "An Omaha home, pergola and pool deck lit blue at dusk" },
      { src: "/img/g-pool-firebowl.jpg", label: "Under-cap wall wash", note: "Washers tucked under the wall cap, aimed down, no glare from the seating.",
        alt: "A lit limestone retaining wall and fire bowl at an Omaha pool deck" },
      { src: "/img/g-pool-pergola.jpg", label: "Pergola fascia run", note: "The same channel profile used on the house, run on the pergola.",
        alt: "A pergola lit green along its fascia beside an Omaha pool deck" },
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

        {/* uneven grid: the lead photograph spans 2 x 2 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tab.shots.map((s, i) => (
            <figure
              key={s.src}
              className={`group relative overflow-hidden rounded-lg bg-primary ring-1 ring-on-dark/10 ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-16/10" : "aspect-video"}`}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes={i === 0 ? "(min-width:1024px) 62vw, 100vw" : "(min-width:1024px) 30vw, 100vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5">
                <p className="label text-2xs uppercase tracking-[0.16em] text-accent">{s.label}</p>
                <p className={`mt-2 text-on-dark-muted ${i === 0 ? "text-[0.95rem]" : "text-sm"}`}>{s.note}</p>
              </figcaption>
              <div className="absolute inset-x-0 top-0 h-0.5 bg-accent/0 transition-colors duration-[--dur-base] group-hover:bg-accent" aria-hidden />
            </figure>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-primary px-5 py-4 ring-1 ring-on-dark/10">
          <p className="label text-2xs uppercase tracking-[0.16em] text-on-dark-muted">
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
