"use client";
import { useEffect } from "react";

/* Card spotlight.
 *
 * On a pointer device the amber highlight is pure CSS `:hover` — see globals.css.
 * On a touch device there is no hover, so the card nearest the middle of the viewport
 * highlights itself as you scroll past. That is done here rather than in CSS because
 * scroll-linked animation (`animation-timeline: view()`) is still Chromium-only, and a
 * highlight that silently does nothing on an iPhone is worse than no highlight.
 *
 * Mounted once per section. It observes every [data-spot] on the page, so cards stay
 * server-rendered — nothing here needs to own their markup.
 */
export function Spotlight() {
  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hoverCapable || reduced) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-spot]"));
    if (!cards.length) return;

    /* A narrow band across the middle of the screen: a card lights up as it crosses the
     * centre and drops again on the way out, so only one or two are ever lit. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).dataset.inview = e.isIntersecting ? "true" : "false";
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return null;
}
