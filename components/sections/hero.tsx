import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/ui/bits";

/* 3 — HERO · full-bleed photograph, form in the hero.
 *
 * Layout follows the reference (freedomexteriorsusa.com): one photograph filling the
 * whole section, short keyword-forward type on the left over a scrim, the quote form
 * as a solid card on the right. The photo is the hero, not a widget inside it.
 *
 * The signature device — the amber channel line — appears once, as the base edge of
 * the section. The draggable warm-white/game-day wipe now lives in its own section
 * further down the page (components/sections/scene-wipe.tsx) where it can be full
 * width and does not compete with the hero photograph. */

export function Hero() {
  const bg = images.heroScene;

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      {/* the photograph */}
      <Image
        src="/img/hero-bg.jpg"
        alt={bg.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_42%]"
      />
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-[1fr_28rem] lg:gap-16 lg:py-24 xl:gap-24">
        {/* ── left: short, keyword-forward ─────────────────────────── */}
        <div className="max-w-[46rem]">
          <p className="label text-2xs uppercase tracking-[0.2em] text-accent">
            Omaha, Nebraska · Installed year round
          </p>

          <h1 className="mt-4 text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.98] text-on-dark">
            Permanent Outdoor Lighting in Omaha, NE
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-on-dark/90">
            Roofline, landscape and pergola lighting installed once — then every color and
            every holiday for the life of your home.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/free-design-consultation">Get a free design consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href={site.phoneHref} className="u">{site.phone}</a>
            </Button>
          </div>

          {/* proof, inline — not a boxed card */}
          <dl className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-3">
            {[
              ["5.0", "from 177 Google reviews"],
              ["1.2M", "lights installed in Omaha"],
            ].map(([f, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <dt className="u text-xl font-medium leading-none text-accent">{f}</dt>
                <dd className="text-sm text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-on-dark-muted">
            Serving{" "}
            <Link href="/service-areas" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              18 cities
            </Link>{" "}
            from Omaha to Lincoln, with both a{" "}
            <Link href="/lighting-systems/brytr-signature" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              premium
            </Link>{" "}
            and a{" "}
            <Link href="/lighting-systems/brytr-basic" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              value
            </Link>{" "}
            system in stock.
          </p>
        </div>

        {/* ── right: the form, in the hero ─────────────────────────── */}
        <div className="lg:justify-self-end lg:w-[28rem]">
          <QuoteForm variant="compact" heading="Get a free design consultation" />
        </div>
      </div>

      {/* the one amber line */}
      <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </section>
  );
}
