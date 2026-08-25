"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { SectionHead } from "@/components/ui/bits";
import { Elevation } from "./elevation";

/* THE SIGNATURE: The Dusk Line.
 *
 * One draggable amber line. Both halves are the SAME house from the SAME camera position on the
 * same evening, registered so the handle wipes one into the other - which is the whole product
 * argument in one gesture. If either photo is missing the handle wipes the two drawn states instead.
 *
 * IT IS THE THIRD SECTION, AND IT WAS BRIEFLY THE SECOND. It started as the seventh - three
 * thousand pixels down, behind a rating band, a photo mosaic, a service grid, a four-row split and
 * a founders section - which is far too deep for the demo of the feature the product is bought for.
 * Promoting it to second overcorrected. The client: "I do like the interactive, but I don't think
 * it should be the first thing at all... what we do is the main thing. What do we do should be more
 * of what is right away instead of an interactive thing."
 *
 * That is the right read. An interactive control as the first thing after the hero asks a visitor
 * to play with something before anyone has told them what is being sold. Services answers "what do
 * you do" in five photographs and five words each; this then proves the part of that answer nobody
 * believes. Claim, then proof, in that order - just not five sections apart.
 *
 * THE LEDE IS GONE ENTIRELY. Four lines, then one, and now none. The client on the one that was
 * left: "I do not think that we need that text below the heading. It is just there for no reason."
 * Right, and the reason is structural rather than editorial - the three labels immediately beneath
 * it read "Warm white / Drag the line / One colour", so the sentence was captioning a control that
 * captions itself. The heading names the section, the labels say what to do, and the thing itself
 * is the argument.
 *
 * THE SPEC PANEL LOST ITS PARAGRAPH. Below the four spec rows there was a further sentence per
 * state ("Any two colours can be saved as their own scene and scheduled to a date range, so the
 * house changes without anyone touching it.") and then a caption. The four rows already say it in
 * the form a reader can scan, which is the point of a spec panel.
 *
 * The left half is genuinely the everyday setting. It briefly was not: the pair used to be
 * hero-warm-white.jpg against hero-game-day.jpg, and the first of those is a soft pink rather than
 * warm white, so this section was captioning the wrong colour of light as the default. See the note
 * on the hero pair in content/images.ts.
 */

const warmSpecs = [
  ["Everyday scene", "Warm white, roofline and grounds"],
  ["Channel finish", "Matched to fascia"],
  ["Schedule", "Dusk to 11:00 pm"],
  ["Runs from", "The app, or the wall switch"],
];
const sceneSpecs = [
  ["Saved scene", "One colour, every run"],
  ["Zones on it", "House, pergola, walls and deck"],
  ["Switch time", "One tap, no ladder"],
  ["Scheduled by", "Date range, set once"],
];

export function SceneWipe() {
  const [pct, setPct] = useState(46);
  const track = useRef<HTMLDivElement>(null);
  const warm = images.heroWarm;
  const scene = images.heroScene;
  const hasPair = !!warm.src && !!scene.src;

  const set = useCallback((clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-dusk]")) return;
      dragging = true;
    };
    const move = (e: PointerEvent) => { if (dragging) { e.preventDefault(); set(e.clientX); } };
    const up = () => { dragging = false; };
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [set]);

  const mostlyScene = pct < 50;

  return (
    /* THE GROUND WENT LIGHT, from bg-raise to bg-background.
     *
     * The client: "the site in general just looks dark, which is very weird for a lighting
     * company." He is right and this section was the biggest single cause of it - the hero is a
     * night photograph under a heavy scrim and this sat immediately below it on raise, so the
     * FIRST TWO SCREENS of the site were both dark and the impression was set before a reader had
     * scrolled past anything light.
     *
     * It is also the better ground for what is in it. The whole section is two night photographs
     * of a lit house; on warm limestone they are the dark element and the page around them is
     * bright, which is the right way round for a company whose product is light. On raise the
     * photographs and their surroundings were the same value and the demo had no frame.
     *
     * The spec panel stays dark. It is a card, not a section, and a dark card on a light ground
     * is how the rest of the page already handles a panel that needs to hold its own weight. */
    <section className="section bg-muted">
      <div className="shell">
        {/* The onward link sits on the RIGHT OF THE HEAD, the same as RecentWork, Reviews and the
          * FAQ. Left-aligned on its own it left roughly 600 x 150px of empty band beside the lede. */}
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            className="max-w-[46rem]"
            eyebrow="How the colour works"
            title="Warm white every night. Any colour when you want it."
          />
          <Link
            href="/gallery"
            className="tap-44 inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
          >
            See every scene
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_19rem]">
          <div>
            <div className="flex items-center justify-between px-1 pb-3">
              <span className={`label transition-colors duration-[--dur-fast] ${mostlyScene ? "text-muted-foreground" : "text-accent-ink"}`}>
                Warm white
              </span>
              <span className="label text-muted-foreground">Drag the line</span>
              <span className={`label transition-colors duration-[--dur-fast] ${mostlyScene ? "text-accent-ink" : "text-muted-foreground"}`}>
                One colour
              </span>
            </div>

            {/* The aspect ratio lives on the TRACK and both photographs are absolutely positioned
              * inside it, so the two layers are the same box by construction. They used to derive
              * height from an in-flow child, which meant anything else landing in flow changed one
              * layer and not the other. */}
            <div
              ref={track}
              className={`relative overflow-hidden rounded-lg ${hasPair ? "aspect-video" : ""}`}
            >
              {hasPair && scene.src && warm.src ? (
                <>
                  {/* base layer: the colour scene */}
                  <Image src={scene.src} alt={scene.alt} fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover" />

                  {/* warm-white layer, clipped left of the line */}
                  <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} aria-hidden>
                    <Image src={warm.src} alt="" fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover" />
                  </div>
                </>
              ) : (
                <>
                  <Elevation night massing="gable" lit={{ label: "warm white" }} className="block w-full" />
                  <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} aria-hidden>
                    <Elevation massing="gable" className="block w-full" />
                  </div>
                </>
              )}

              {/* the line + handle */}
              <div className="absolute inset-y-0 z-20 w-0.5 bg-accent" style={{ left: `${pct}%` }} aria-hidden />
              <button
                data-dusk
                role="slider"
                aria-label="Drag to switch the roofline between everyday warm white and a saved colour scene"
                aria-valuemin={6}
                aria-valuemax={94}
                aria-valuenow={Math.round(pct)}
                aria-valuetext={mostlyScene ? "Mostly the saved colour scene" : "Mostly everyday warm white"}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") { e.preventDefault(); setPct((v) => Math.max(6, v - 5)); }
                  if (e.key === "ArrowRight") { e.preventDefault(); setPct((v) => Math.min(94, v + 5)); }
                }}
                className="tap-44 absolute top-1/2 z-30 grid h-12 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-sm bg-accent shadow-[var(--shadow-lg)]"
                style={{ left: `${pct}%` }}
              >
                <svg viewBox="0 0 24 24" className="size-5 text-accent-foreground" fill="none" aria-hidden>
                  <path d="M10 8 6 12l4 4M14 8l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* The spec panel swaps with the state, so the right side is full either way. */}
          <div className="flex flex-col rounded-lg bg-primary p-6">
            <p className="label text-accent">
              {mostlyScene ? "Saved scene" : "Everyday setting"}
            </p>
            <h3 className="mt-3 text-xl text-on-dark">
              {mostlyScene ? "One colour, the whole property" : "Warm white, every night"}
            </h3>
            <dl className="mt-6 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {(mostlyScene ? sceneSpecs : warmSpecs).map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-sm text-on-dark-muted">{k}</dt>
                  <dd className="u text-right text-sm font-medium text-on-dark">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-auto pt-6 text-on-dark-muted">
              Photographed on a completed Omaha install
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
