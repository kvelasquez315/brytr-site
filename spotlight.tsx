"use client";
import { useEffect } from "react";

/* Card spotlight.
 *
 * Desktop highlights on HOVER only (pure CSS, see globals.css). The scroll-past
 * highlight is for the phone, where there is no hover — done here rather than in CSS
 * because scroll-linked animation (`animation-timeline: view()`) is still Chromium-only.
 *
 * Gated on VIEWPORT WIDTH, not on `(hover: hover)`. The client's laptop has a
 * touchscreen, and Chrome on such a machine reports `hover: none` — so the media-query
 * version ran the scroll pass on a full desktop layout, lighting up whichever two or
 * four cards happened to cross the middle of the window while he scrolled. Width below
 * the site's `lg` breakpoint is the honest test for "this is the stacked layout", and it
 * is re-checked on resize.
 *
 * Mounted once per section. It observes every [data-spot] on the page, so cards stay
 * server-rendered — nothing here needs to own their markup.
 */
export function Spotlight() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const stacked = window.matchMedia("(max-width: 1023.98px)");
    let io: IntersectionObserver | null = null;

    const clear = () => {
      if (!io) return;
      io.disconnect();
      io = null;
      document
        .querySelectorAll<HTMLElement>('[data-spot][data-inview="true"]')
        .forEach((c) => { c.dataset.inview = "false"; });
    };

    const start = () => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-spot]"));
      if (!cards.length) return;
      /* A thin band across the middle of the screen — one row of cards at a time. */
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            (e.target as HTMLElement).dataset.inview = e.isIntersecting ? "true" : "false";
          }
        },
        { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
      );
      cards.forEach((c) => io!.observe(c));
    };

    const sync = () => { clear(); if (stacked.matches) start(); };
    sync();
    stacked.addEventListener("change", sync);
    return () => { stacked.removeEventListener("change", sync); clear(); };
  }, []);

  return null;
}
