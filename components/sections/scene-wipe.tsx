"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { SectionHead } from "@/components/ui/bits";
import { Elevation } from "./elevation";

/* THE SIGNATURE: The Dusk Line — now its own full-width section.
 *
 * One draggable amber line. Both halves are the SAME house from the SAME camera position on
 * the same evening, registered so the handle wipes one into the other — which is the whole
 * product argument in one gesture. It used to sit in the hero as a card, which put a widget
 * where the hero photograph belonged. If either photo is missing the handle wipes the two
 * drawn states instead.
 *
 * The left half is genuinely the everyday setting again. It briefly was not: the pair used
 * to be hero-warm-white.jpg against hero-game-day.jpg, and the first of those is a soft pink
 * rather than warm white, so this section was captioning the wrong colour of light as the
 * default. See the note on the hero pair in content/images.ts — the pool-deck shoot turned
 * out to be one property photographed in both states, which is what this device needed all
 * along. */

const warmSpecs = [
  ["Everyday scene", "Warm white, roofline and grounds"],
  ["Channel finish", "Matched to fascia"],
  ["Schedule", "Dusk to 11:00 pm"],
];
const sceneSpecs = [
  ["Saved scene", "One color, every run"],
  ["Zones on it", "House, pergola, walls and deck"],
  ["Switch time", "One tap, no ladder"],
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
    <section className="section bg-raise">
      <div className="shell">
        <SectionHead
          onDark
          eyebrow="One house, two taps"
          title="The same roofline, on a Tuesday and on a Saturday."
          lede="Drag the line. Both halves are the same Omaha property from the same camera position on the same evening — the everyday warm white on the left, a saved color scene on the right. Nothing was recolored and nothing was rewired between the two. That is the same channel on the same fascia, one tap apart, and it is the reason nobody in this house owns a ladder in January."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="flex items-center justify-between px-1 pb-3">
              <span className={`label transition-colors duration-[--dur-fast] ${mostlyScene ? "text-on-dark-muted" : "text-accent"}`}>
                Warm white
              </span>
              <span className="label text-on-dark-muted">Drag the line</span>
              <span className={`label transition-colors duration-[--dur-fast] ${mostlyScene ? "text-accent" : "text-on-dark-muted"}`}>
                One color
              </span>
            </div>

            {/* The aspect ratio lives on the TRACK and both photographs are absolutely
              * positioned inside it, so the two layers are the same box by construction.
              * They used to derive height from an in-flow child, which meant anything else
              * landing in flow changed one layer and not the other.
              *
              * The ring and the radius came off in the de-box pass. A crop is not a card:
              * `overflow-hidden` with nothing drawn around it is just the edge of a picture. */}
            <div
              ref={track}
              className={`relative overflow-hidden ${hasPair ? "aspect-video" : ""}`}
            >
              {hasPair && scene.src && warm.src ? (
                <>
                  {/* base layer: the color scene */}
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
                aria-label="Drag to switch the roofline between everyday warm white and a saved color scene"
                aria-valuemin={6}
                aria-valuemax={94}
                aria-valuenow={Math.round(pct)}
                aria-valuetext={mostlyScene ? "Mostly the saved color scene" : "Mostly everyday warm white"}
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

          {/* spec panel — swaps with the state, so the right side is full either way */}
          {/* No radius and no ring on this column any more. It was a rounded, outlined panel
            * floating beside the wipe, which is the same card tell the whole page just had
            * stripped out of it. The change of ground is the only separation it needs. */}
          <div className="flex flex-col bg-primary p-6 lg:p-7">
            <p className="label text-accent">
              {mostlyScene ? "Saved scene" : "Everyday setting"}
            </p>
            <h3 className="mt-3 text-xl text-on-dark">
              {mostlyScene ? "One color, the whole property" : "Warm white, every night"}
            </h3>
            <dl className="mt-6 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {(mostlyScene ? sceneSpecs : warmSpecs).map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-sm text-on-dark-muted">{k}</dt>
                  <dd className="u text-sm font-medium text-on-dark">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex-1 text-[0.95rem] text-on-dark-muted">
              {mostlyScene
                ? "Any two colors can be saved as their own scene and scheduled to a date range, so the house changes without anyone touching it."
                : "This is the setting most customers leave on year round. Color is the exception, not the point."}
            </p>
            <p className="label mt-6 border-t border-on-dark/10 pt-4 text-on-dark-muted">
              Photographed on a completed Omaha install
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
