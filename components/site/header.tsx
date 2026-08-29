"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { brandLogoDark } from "@/content/badges";
import type { NavItem } from "@/content/nav";
import { Button } from "@/components/ui/button";

/* HEADER — centered nav with dropdown panels.
 *
 * The nav is centered in the HEADER, not in the space left over beside the wordmark:
 * the bar is a three-column grid with equal 1fr rails either side of the nav, so the
 * links sit on the page's center line no matter how wide the wordmark or the phone
 * number gets. `mx-auto` inside a flex row would only center the nav in the remainder,
 * which is what makes most sites look almost-but-not-quite centered.
 *
 * Anything with more than one page under it gets a panel: lighting systems, services,
 * comparisons, service areas. The panels are full-bleed rather than anchored to their
 * trigger, because a nineteen-city menu anchored under the last nav item would run off
 * the right edge of the screen. Every list is generated from content/*.ts (see
 * content/nav.ts) so it cannot drift from the pages that actually exist.
 *
 * Open on hover AND on focus, close on leaving the header, on Escape, and on navigation.
 * The trigger stays a real link — the top-level index pages exist and are worth visiting
 * — so a keyboard user tabs to it, gets the panel, and can tab straight into it. */

function Wordmark({ className }: { className?: string }) {
  /* The real mark when the file exists, the name set in the brand's display face until it
   * does — see the note on `brandLogo` in content/badges.ts. The fallback is not an invented
   * mark: it is the word, set correctly, with the amber dot the rest of the site already uses.
   *
   * Height-constrained with width:auto rather than sized to a box, so a lockup of any
   * proportion drops in without being letterboxed or stretched. `priority` because this is
   * above the fold on all eighty-one pages. */
  if (brandLogoDark) {
    return (
      <span className={className}>
 <Image
          src={brandLogoDark.src}
          alt={brandLogoDark.alt}
          width={brandLogoDark.width}
          height={brandLogoDark.height}
          priority
          /* Was h-8 / lg:h-9. The bar is h-19 (76px), so 48px of mark still leaves 14px of air above
              * and below it - the logo is the only thing in the left rail and was sitting small in it. */
            className="h-10 w-auto lg:h-12"
        />
      </span>
    );
  }
  return (
    <span className={className}>
 <span className="font-display text-2xl font-black tracking-[-0.04em] text-foreground">brytr</span>
      <span className="ml-0.5 inline-block size-2 translate-y-[-0.35rem] rounded-full bg-accent" />
    </span>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

export function Header({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);           // mobile sheet
  const [menu, setMenu] = useState<string | null>(null); // desktop panel
  const [sub, setSub] = useState<string | null>(null);   // mobile accordion
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(null); setOpen(false); }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* A short delay on close, so crossing the 1px gap between a trigger and its panel
   * does not snap the panel shut mid-reach. */
  const hold = (key: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (key === null) closeTimer.current = setTimeout(() => setMenu(null), 120);
    else setMenu(key);
  };

  const active = nav.find((n) => n.label === menu && n.groups);
  /* one group = a flat list flowed across three columns; several groups = a column each,
   * except the metro list which is wide enough to want two of its own. */
  const single = active?.groups!.length === 1;

  return (
    <>
      {/* urgency strip — Freedom slot 0 / Phoenix device */}
      {/* THE UTILITY STRIP WENT DARK AND THE HEADER WENT WHITE.
        *
        * Both sites the client named as references do this exact thing: edentreepros.com opens on a
        * dark green strip over a white bar, and freedomexteriorsusa.com is white-headed too. Brytr
        * had the arrangement inverted - a full-width AMBER strip over a navy bar - which puts the
        * loudest color on the site in the first 40 pixels of all 74 pages, above a dark bar, above
        * a dark photograph. Three heavy bands before any content.
        *
        * Amber is the CTA color on this site. Spending it on a permanent strip is spending it on
        * something nobody is being asked to click, and it is most of why the top of the page read
        * as a local-business template rather than a company site. It survives here as the link. */}
      <div className="bg-primary text-on-dark-muted">
        <div className="shell flex min-h-10 items-center justify-center gap-2 py-2 text-center text-xs sm:text-sm">
          {/* WAS: "2026 holiday slots are filling. Book by November 15."
            *
            * Removed 28 Aug 2026. Two invented facts in eleven words, on every page of the site:
            * that slots are filling, and that there is a 15 November cut-off. Nobody at Brytr told
            * us either. A manufactured deadline is the single most corrosive thing that was on this
            * site, because it is designed to make somebody act faster than they otherwise would.
            *
            * The strip stays, carrying the offer that is real - the consultation is free - because
            * the bar has a job: it is the one place above the fold that is not navigation. If Brytr
            * gives us a genuine seasonal cut-off, it goes here, with the date they give us.
            *
            * "no obligation" CAME OFF THE END OF IT, 29 Aug 2026. The client's punch list says the
            * page bullet "Free, and genuinely no obligation" is not true, and that there are both
            * same-day savings and a follow-up sequence. Whatever else is true, this bar ran that
            * phrase on all 74 pages, so it is the first place it should stop. */}
          <span>
            Free on-site design consultation.{" "}
            <Link href="/free-design-consultation" className="tap-44 font-semibold text-accent underline decoration-2 underline-offset-2">
              Book a visit
            </Link>
            .
          </span>
        </div>
      </div>

      <header
        className="sticky top-0 z-50 border-b border-border bg-card"
        onMouseLeave={() => hold(null)}
      >
        <div className="shell flex h-19 items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="Brytr Co home" className="tap-44 flex shrink-0 items-center py-2 lg:justify-self-start">
            <Wordmark />
          </Link>

          {/* ── centered nav ── */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Main">
            {nav.map((n) => (
              <div key={n.href} className="relative">
                <Link
                  href={n.href}
                  aria-haspopup={n.groups ? true : undefined}
                  onMouseEnter={() => hold(n.groups ? n.label : null)}
                  onFocus={() => hold(n.groups ? n.label : null)}
                  onClick={() => setMenu(null)}
                  className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.95rem] font-medium transition-colors duration-[--dur-fast] ${
 menu === n.label ? "text-accent-ink" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                  {n.groups && (
                    <Chevron
                      className={`size-3 transition-transform duration-[--dur-fast] ${menu === n.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
                {/* the open item keeps a lit channel under it */}
                {menu === n.label && n.groups && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" aria-hidden />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex lg:justify-self-end">
            <a href={site.phoneHref} className="u text-[0.95rem] font-medium text-foreground hover:text-accent-ink">
              {site.phone}
            </a>
            <Button asChild size="sm">
              <Link href="/free-design-consultation">Free consultation</Link>
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a href={site.phoneHref} className="u px-2 py-3 text-sm font-medium text-foreground">
              {site.phone}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
              className="grid size-11 place-items-center rounded-md border border-input"
            >
              <span className="relative block h-3 w-5">
                <span className="absolute inset-x-0 top-0 h-0.5 bg-foreground" />
                <span className="absolute inset-x-0 top-1.5 h-0.5 bg-foreground" />
                <span className="absolute inset-x-0 top-3 h-0.5 bg-foreground" />
              </span>
            </button>
          </div>
        </div>

        {/* ── desktop panel ── */}
        {active && (
          <div
            className="absolute inset-x-0 top-full hidden border-b border-t border-border bg-card shadow-[var(--shadow-md)] lg:block"
            onMouseEnter={() => hold(active.label)}
          >
            <div className="shell grid gap-x-10 gap-y-8 py-9 lg:grid-cols-[1fr_18rem] lg:gap-x-14">
              <div
                className={`grid gap-x-10 ${single ? "gap-y-1" : "gap-y-7"}`}
                style={{ gridTemplateColumns: `repeat(${single ? 3 : 4}, minmax(0,1fr))` }}
              >
                {active.groups!.map((g) => (
                  <div
                    key={g.heading ?? "g"}
                    className={single ? "contents" : ""}
                    style={!single && g.span ? { gridColumn: `span ${g.span}` } : undefined}
                  >
                    {!single && g.heading && <p className="label mb-3 text-accent-ink">{g.heading}</p>}
                    <ul className={single ? "contents" : g.span ? "columns-2 gap-x-10" : ""}>
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setMenu(null)}
                            className="flex items-baseline justify-between gap-3 rounded-sm px-2.5 py-2 text-[0.95rem] text-muted-foreground transition-colors duration-[--dur-fast] hover:bg-muted hover:text-foreground"
                          >
                            <span>{l.label}</span>
                            {l.note && <span className="u shrink-0 text-xs text-muted-foreground">{l.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {active.feature && (
                <div className="flex flex-col rounded-md bg-primary p-6">
                  <p className="label text-accent">{active.feature.label}</p>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">
                    {active.feature.body}
                  </p>
                  <Link
                    href={active.feature.href}
                    onClick={() => setMenu(null)}
                    className="mt-5 font-display text-[0.95rem] font-bold text-on-dark underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                  >
                    {active.feature.cta}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── mobile sheet, with the same children as accordions ── */}
        {open && (
          <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-border bg-card lg:hidden">
            <div className="shell flex flex-col py-4">
              {nav.map((n) => (
                <div key={n.href} className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-3.5 text-lg font-medium text-foreground"
                    >
                      {n.label}
                    </Link>
                    {n.groups && (
                      <button
                        onClick={() => setSub((v) => (v === n.label ? null : n.label))}
                        aria-expanded={sub === n.label}
                        aria-label={`${n.label} pages`}
                        className="grid size-11 place-items-center text-muted-foreground"
                      >
                        <Chevron className={`size-4 ${sub === n.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {n.groups && sub === n.label && (
                    <div className="pb-3">
                      {n.groups.map((g) => (
                        <div key={g.heading ?? "g"} className="mb-2">
                          {g.heading && <p className="label px-1 pb-1 pt-2 text-accent-ink">{g.heading}</p>}
                          <ul>
                            {g.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => { setOpen(false); setSub(null); }}
                                  className="flex items-baseline justify-between gap-3 py-2.5 pl-1 pr-2 text-[0.95rem] text-muted-foreground"
                                >
                                  <span>{l.label}</span>
                                  {l.note && <span className="u text-xs text-muted-foreground">{l.note}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button asChild size="block" className="mt-4">
                <Link href="/free-design-consultation">Free design consultation</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-on-dark/15 bg-primary lg:hidden">
      <a href={site.phoneHref} className="u grid min-h-16 place-items-center text-base font-medium text-on-dark">
        Call now
      </a>
      <Link
        href="/free-design-consultation"
        className="grid min-h-16 place-items-center bg-accent text-base font-semibold text-accent-foreground"
      >
        Free quote
      </Link>
    </div>
  );
}
