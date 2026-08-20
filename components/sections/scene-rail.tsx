"use client";
import { useState } from "react";
import Image from "next/image";
import { sceneImages } from "@/content/images";
import { SectionHead } from "@/components/ui/bits";
import { Elevation } from "./elevation";

/* 9 — THE SCENE RAIL · media frame + chip rail + spec panel · raise
 * Selecting a scene lights the elevation in that scene's real color and swaps the
 * spec panel. We never hue-rotate a warm-white photograph to fake a color the
 * company never installed — if a real photo exists for the scene we use it, and if
 * not we light the drawing, which is honest about being a drawing. */

type Scene = {
  name: string; hex: string; dot: string;
  brightness: string; schedule: string; zones: string; use: string;
};

const scenes: Scene[] = [
  { name: "Everyday Warm White", hex: "#f5c518", dot: "#f5c518", brightness: "100%", schedule: "Dusk to 11:00 pm", zones: "All", use: "The setting most customers leave on year round" },
  { name: "Husker Red", hex: "#d7262f", dot: "#d7262f", brightness: "80%", schedule: "Game day only", zones: "Front elevation", use: "Scarlet across the whole front, scheduled to kickoff on Saturdays" },
  { name: "Halloween", hex: "#7b46c9", dot: "#7b46c9", brightness: "70%", schedule: "Oct 1 to Nov 1", zones: "Front + landscape", use: "A violet wash held for the month, no ladder in October" },
  { name: "Christmas", hex: "#2f9e57", dot: "#2f9e57", brightness: "90%", schedule: "Nov 25 to Jan 2", zones: "All", use: "Alternating red and green, or steady warm white" },
  { name: "Fourth of July", hex: "#2f6fd0", dot: "#2f6fd0", brightness: "85%", schedule: "Jul 1 to Jul 6", zones: "All", use: "Red and blue on the gables, white left on the eaves" },
  { name: "Birthday", hex: "#d94f9a", dot: "#d94f9a", brightness: "75%", schedule: "One night", zones: "Front elevation", use: "Set from the app the morning of, back to warm white the next night" },
  { name: "Game Day", hex: "#9fb6c9", dot: "#9fb6c9", brightness: "80%", schedule: "By calendar", zones: "Front elevation", use: "Any team colors, saved as separate scenes" },
  { name: "St. Patrick's Day", hex: "#2fa15a", dot: "#2fa15a", brightness: "80%", schedule: "Mar 15 to Mar 18", zones: "Roofline + soffit", use: "One color across the roofline, landscape lights left warm" },
];

export function SceneRail() {
  const [i, setI] = useState(0);
  const s = scenes[i];
  const photo = sceneImages[s.name];

  return (
    <section className="section bg-raise">
      <div className="shell">
        <SectionHead
          onDark
          
          title="The same roofline, every night of the year."
          lede="You are not buying Christmas lights. You are buying a light fixture that happens to do Christmas, plus everyday warm white, plus a scarlet Saturday."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[62fr_38fr]">
          {/* the lit elevation */}
          <div className="overflow-hidden rounded-lg bg-primary ring-1 ring-on-dark/12">
            {photo?.src ? (
              <div className="relative aspect-video">
                <Image key={s.name} src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <Elevation night massing="wing"lit={{ hex: s.hex, label: s.name }} className="block w-full" />
            )}
          </div>

          {/* the spec panel — keeps the right side full */}
          <div className="flex flex-col rounded-lg bg-primary p-6 ring-1 ring-on-dark/12">
            <div className="flex items-center gap-3">
              <span className="size-4 rounded-sm" style={{ background: s.dot }} aria-hidden />
              <h3 className="text-xl text-on-dark">{s.name}</h3>
            </div>
            <p className="mt-3 text-[0.95rem] text-on-dark-muted">{s.use}</p>
            <dl className="mt-6 space-y-0 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {[["Brightness", s.brightness], ["Schedule", s.schedule], ["Zones", s.zones]].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-sm text-on-dark-muted">{k}</dt>
                  <dd className="u text-sm font-medium text-on-dark">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex-1">
              <p className="label text-accent">How it is built</p>
              <ol className="mt-3 space-y-2.5">
                {[
                  "Pick the color in the app, or start from a preset",
                  "Set brightness per zone, front louder than the sides",
                  "Schedule it to a date range or to sunset",
                  "Save it. It is one tap from then on.",
                ].map((t, k) => (
                  <li key={t} className="flex gap-3">
                    <span className="u text-xs text-accent">{k + 1}</span>
                    <span className="text-sm text-on-dark-muted">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="label mt-6 border-t border-on-dark/10 pt-4 text-on-dark-muted">
              {photo?.src ? "Photographed on a completed install" : "Measured elevation, lit to the selected scene"}
            </p>
          </div>
        </div>

        {/* chip rail */}
        <div className="mt-5 flex flex-wrap gap-2.5" role="tablist"aria-label="Lighting scenes">
          {scenes.map((sc, idx) => {
            const on = idx === i;
            return (
              <button
                key={sc.name}
                role="tab"
                aria-selected={on}
                onClick={() => setI(idx)}
                className={`flex h-11 items-center gap-2.5 rounded-sm px-4 text-sm font-medium transition-colors duration-[--dur-fast] ${
                  on ? "bg-accent text-accent-foreground" : "border border-on-dark/22 text-on-dark-muted hover:border-accent/50 hover:text-on-dark"
                }`}
              >
                <span className="size-3.5 rounded-sm ring-1 ring-black/20" style={{ background: sc.dot }} aria-hidden />
                {sc.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
