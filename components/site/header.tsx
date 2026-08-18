"use client";
import Link from "next/link";
import { useState } from "react";
import { site, nav } from "@/content/site";
import { Button } from "@/components/ui/button";

function Wordmark({ className }: { className?: string }) {
  /* Set from the brand's display face until the client's logo file is dropped in
     /public/img/logo.svg. Not an invented mark — it is the name, set correctly. */
  return (
    <span className={className}>
      <span className="font-display text-2xl font-black tracking-[-0.04em] text-on-dark">brytr</span>
      <span className="ml-0.5 inline-block size-2 translate-y-[-0.35rem] rounded-full bg-accent" />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* urgency strip — Freedom slot 0 / Phoenix device */}
      <div className="bg-accent text-accent-foreground">
        <div className="shell flex min-h-10 items-center justify-center gap-2 py-2 text-center text-xs font-semibold sm:text-sm">
          <span>
            Holiday install slots for 2026 are filling.{" "}
            <Link href="/free-design-consultation" className="tap-44 underline decoration-2 underline-offset-2">
              Book your design consultation by November 15
            </Link>
            .
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-on-dark/10 bg-primary">
        <div className="shell flex h-19 items-center gap-6">
          <Link href="/" aria-label="Brytr Co home" className="tap-44 flex shrink-0 items-center py-2">
            <Wordmark />
          </Link>

          <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[0.95rem] font-medium text-on-dark/85 transition-colors duration-[--dur-fast] hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <a href={site.phoneHref} className="u text-[0.95rem] font-medium text-on-dark hover:text-accent">
              {site.phone}
            </a>
            <Button asChild size="sm">
              <Link href="/free-design-consultation">Free consultation</Link>
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a href={site.phoneHref} className="u px-2 py-3 text-sm font-medium text-on-dark">
              {site.phone}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
              className="grid size-11 place-items-center rounded-md border border-on-dark/25"
            >
              <span className="relative block h-3 w-5">
                <span className="absolute inset-x-0 top-0 h-0.5 bg-on-dark" />
                <span className="absolute inset-x-0 top-1.5 h-0.5 bg-on-dark" />
                <span className="absolute inset-x-0 top-3 h-0.5 bg-on-dark" />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-on-dark/10 bg-primary lg:hidden">
            <div className="shell flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-xl font-medium text-on-dark"
                >
                  {n.label}
                </Link>
              ))}
              <Button asChild size="block" className="mt-3">
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
