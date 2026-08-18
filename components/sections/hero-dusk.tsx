"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/button";
import { Elevation } from "./elevation";

/* THE SIGNATURE: The Dusk Line.
 * One draggable amber line inside the card. Left of it the roofline is on everyday
 * warm white; right of it the same roofline is on a saved color scene. Both halves
 * are the SAME photograph of the SAME house, two minutes apart, registered to the
 * pixel — which is the whole product argument in one gesture. If either photo is
 * missing the handle falls back to wiping the two drawn states. */

const warmSpecs = [
  ["Everyday scene", "Warm white, 100%"],
  ["Channel finish", "Matched to fascia"],
  ["Schedule", "Dusk to 11:00 pm"],
];
const sceneSpecs = [
  ["Saved scene", "Red and blue, 80%"],
  ["LED spacing", "4 in., addressable"],
  ["Switch time", "One tap, no ladder"],
];

export function HeroDusk() {
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
    <section className="relative overflow-hidden bg-primary">
      <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[52fr_48fr] lg:gap-14 lg:py-20">
        {/* ── left: type + proof ─────────────────────────────── */}
        <div>
          <p className="eyebrow eyebrow--on-dark">
            Omaha, Nebraska
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,5.2vw,4rem)] text-on-dark">
            Permanent outdoor lighting for Omaha homes.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-on-dark/85">
            Smart exterior lighting that disappears by day and wows by night. One install, then every
            color and every holiday for the life of your home.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/free-design-consultation">Get a free design consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href={site.phoneHref} className="u">{site.phone}</a>
            </Button>
          </div>

          {/* proof rail — real figures, utility face, no tiny glyphs */}
          <dl className="mt-10 grid max-w-[34rem] grid-cols-3 divide-x divide-on-dark/12 rounded-lg bg-raise ring-1 ring-on-dark/10">
            {[["5.0", "from 177 Google reviews"], ["1.2M", "lights installed in Omaha"], ["W2", "crews, never subcontracted"]].map(([f, l]) => (
              <div key={l} className="px-4 py-5">
                <dt className="u text-2xl font-medium leading-none text-on-dark">{f}</dt>
                <dd className="mt-2 text-xs leading-snug text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-on-dark-muted">
            Installing across{" "}
            <Link href="/service-areas" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              18 cities
            </Link>{" "}
            from Omaha to Lincoln. Both a{" "}
            <Link href="/lighting-systems/brytr-signature" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              premium
            </Link>{" "}
            and a{" "}
            <Link href="/lighting-systems/brytr-basic" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              value
            </Link>{" "}
            system in stock, so the recommendation is honest.
          </p>
        </div>

        {/* ── right: the elevation card, where the Dusk Line lives ── */}
        <div className="rounded-xl bg-raise p-3 shadow-[var(--shadow-dark)] ring-1 ring-accent/15 sm:p-4">
          <div className="flex items-center justify-between px-1 pb-3">
            <span className={`u text-2xs uppercase tracking-[0.18em] transition-colors duration-[--dur-fast] ${mostlyScene ? "text-on-dark-muted" : "text-accent"}`}>
              Warm white
            </span>
            <span className="u text-2xs uppercase tracking-[0.16em] text-on-dark-muted">Drag the line</span>
            <span className={`u text-2xs uppercase tracking-[0.18em] transition-colors duration-[--dur-fast] ${mostlyScene ? "text-accent" : "text-on-dark-muted"}`}>
              Game day
            </span>
          </div>

          <div ref={track} className="relative overflow-hidden rounded-lg">
            {/* base layer: the color scene */}
            <div className="relative">
              {hasPair && scene.src ? (
                <div className="relative aspect-video">
                  <Image src={scene.src} alt={scene.alt} fill priority sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
                </div>
              ) : (
                <Elevation night massing="gable" lit={{ hex: "#f5c518", label: "warm white" }} className="block w-full" />
              )}
            </div>

            {/* warm-white layer, clipped left of the line */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
              aria-hidden
            >
              {hasPair && warm.src ? (
                <div className="relative size-full">
                  <Image src={warm.src} alt="" fill priority sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
                </div>
              ) : (
                <Elevation massing="gable" className="block w-full" />
              )}
            </div>

            {/* the line + handle */}
            <div className="absolute inset-y-0 z-20 w-px bg-accent" style={{ left: `${pct}%` }} aria-hidden />
            <button
              data-dusk
              role="slider"
              aria-label="Drag to switch the roofline between warm white and a game day scene"
              aria-valuemin={6}
              aria-valuemax={94}
              aria-valuenow={Math.round(pct)}
              aria-valuetext={mostlyScene ? "Mostly game day" : "Mostly warm white"}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") { e.preventDefault(); setPct((v) => Math.max(6, v - 5)); }
                if (e.key === "ArrowRight") { e.preventDefault(); setPct((v) => Math.min(94, v + 5)); }
              }}
              className="absolute top-1/2 z-30 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-full bg-accent shadow-[var(--shadow-lg)]"
              style={{ left: `${pct}%` }}
            >
              <svg viewBox="0 0 24 24" className="size-5 text-accent-foreground" fill="none" aria-hidden>
                <path d="M10 8 6 12l4 4M14 8l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* spec footer — swaps with the state, so the card is dense either way */}
          <dl className="mt-3 grid grid-cols-3 gap-2 px-1">
            {(mostlyScene ? sceneSpecs : warmSpecs).map(([k, v]) => (
              <div key={k} className="rounded-md bg-primary px-3 py-3">
                <dt className="u text-2xs uppercase tracking-[0.12em] text-on-dark-muted">{k}</dt>
                <dd className="mt-1 text-[0.8rem] font-semibold leading-snug text-on-dark">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex items-center gap-2 px-1 pb-1">
            <span className="grid size-4 place-items-center rounded-full bg-accent" aria-hidden>
              <svg viewBox="0 0 12 12" className="size-2.5 text-accent-foreground" fill="none"><path d="m2 6.2 2.4 2.4L10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="text-xs text-on-dark-muted">
              {hasPair
                ? "Photographed on a completed Omaha install · one house, two saved scenes"
                : "Haven Preferred Installer · measured elevation, drag to see both states"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
