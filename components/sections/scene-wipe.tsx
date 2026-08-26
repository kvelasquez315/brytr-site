"use client";
import Image from "next/image";
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
 * THE SPEC PANEL IS GONE ENTIRELY. It lost its trailing paragraph first, then the whole panel -
 * see the note at the demo itself. What is left in this section is a heading, a link, three labels
 * and the photograph, which is the shortest this argument has ever been made and the first version
 * where nothing beside the image is competing with it.
 *
 * The left half is genuinely the everyday setting. It briefly was not: the pair used to be
 * hero-warm-white.jpg against hero-game-day.jpg, and the first of those is a soft pink rather than
 * warm white, so this section was captioning the wrong colour of light as the default. See the note
 * on the hero pair in content/images.ts.
 */


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
     * There is no dark card in here any more - the spec panel that was the reason for that note
     * has been removed. */
    <section className="section bg-muted">
      <div className="shell">
        {/* A HEADING AND THE THING ITSELF, AND NOTHING ELSE.
          *
          * The "See every scene" pill that used to sit on the right of this head is gone on the
          * client's instruction, and the /gallery route it pointed at is still reached from the nav,
          * from Recent Work's own button and from the footer - so nothing became unreachable.
          *
          * It is also the fourth thing removed from this section in a row: four lines of lede, then
          * one, then the spec panel, then this. That is not indecision, it is the same judgement
          * applied repeatedly - every one of them was TEXT ABOUT a photograph that changes under
          * your hand, sitting next to the photograph that changes under your hand. */}
        <SectionHead
          className="max-w-[46rem]"
          title="Warm white every night. Any colour when you want it."
        />

        {/* THE DEMO RUNS FULL WIDTH NOW. The 19rem spec panel that used to sit beside it is gone —
          * the client sent a screenshot of it and said "remove", and the screenshot shows why: four
          * spec rows, then roughly two hundred pixels of nothing, then a caption pinned to the
          * bottom by `mt-auto`. Same defect as the buttons in Who We Are, from the same cause — a
          * column whose height came from the thing beside it rather than from its own content.
          *
          * It should not have been rescued by removing the `mt-auto` either. The panel was
          * captioning a control that captions itself: the three labels directly above the track
          * already read "Warm white / Drag the line / One colour", and the whole argument of this
          * section is the photograph changing under the reader's own hand. A table of four
          * specifications is the least persuasive thing that could sit next to that.
          *
          * The image gets the full shell width in exchange, which is the right trade for the one
          * interactive thing on the site. */}
        {/* THE THREE LABELS ARE GONE TOO - "Warm white / Drag the line / One colour" across the top
          * of the track. Removed on instruction, and the reasoning holds: they were captioning the
          * two halves of a photograph that already look like warm white and a colour, and
          * instructing a reader to drag a handle that has drag arrows drawn on it.
          *
          * THE AFFORDANCE DOES NOT DEPEND ON THEM. The handle is an amber block with a
          * left-right chevron pair in it, sitting on an amber line down the middle of the image,
          * and it carries `cursor-ew-resize`. What the labels were carrying that the visuals do not
          * is the SCREEN READER story, and that never lived in them anyway - it is on the slider's
          * aria-label and its aria-valuetext, both of which still describe which state you are
          * looking at as the handle moves. */}
        <div className="mt-10">
          <div>

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

        </div>
      </div>
    </section>
  );
}
