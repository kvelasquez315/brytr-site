import type { Metadata } from "next";
import { services } from "@/content/services";
import { iconMap } from "@/content/icon-map";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, CityTiles, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Photo, photoExists } from "@/components/ui/photo";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Outdoor Lighting Company in Omaha, NE",
  description: "Eleven permanent outdoor lighting services for Omaha homes: roofline, Christmas, soffit, landscape, hardscape, pergola, gameday, commercial and repairs.",
  alternates: { canonical: "/services" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Services", href: "/services" }];

export default function ServicesHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="What we install"
        h1="Every surface worth lighting on an Omaha property."
        lede="Every one of these runs on the same channel, the same controller and the same app, so you can start with a roofline and add landscape or a pergola run later without replacing anything."
        trail={trail}
        stats={[["11", "services"], ["18", "cities served"], ["1.2M", "lights installed"]]}
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="The full list" title="Pick the one you came for." />
          <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const I = iconMap[s.icon];
              return (
                <article key={s.slug} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                  {photoExists(s.photo) ? (
                    <Photo slot={s.photo!} className="mb-5" sizes="(min-width:1024px) 30vw, 100vw" />
                  ) : (
                    <span className="channel-tile channel-tile--light mb-5" aria-hidden><I className="size-7" /></span>
                  )}
                  <h2 className="font-display text-xl font-bold text-foreground">{s.name}</h2>
                  <p className="mt-2.5 text-[0.95rem] text-muted-foreground">{s.short}</p>
                  <ul className="mt-4 space-y-2">{s.includes.slice(0, photoExists(s.photo) ? 3 : 4).map((i) => <Check key={i}>{i}</Check>)}</ul>
                  <div className="mt-5"><TextLink href={`/services/${s.slug}`}>See {s.name}</TextLink></div>
                </article>
              );
            })}

            {/* twelfth tile — completes the row rather than leaving a hole in it */}
            <article className="flex flex-col justify-between rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] ring-1 ring-accent/20">
              <div>
                <span className="channel-tile mb-5" aria-hidden />
                <h2 className="font-display text-xl font-bold text-on-dark">Not sure which one you need?</h2>
                <p className="mt-2.5 text-[0.95rem] text-on-dark-muted">
                  We design on site after dark, when you can actually see what we are proposing. Free,
                  and there is no obligation.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/free-design-consultation"
                  className="u inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground"
                >
                  Book a consultation
                </Link>
                <p className="label mt-4 text-on-dark-muted">
                  Or call <a href="tel:+14028103973" className="text-on-dark">402-810-3973</a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-primary">
        <div className="shell">
          <SectionHead onDark eyebrow="Not sure yet" title="The questions that usually settle it." />
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ["Is it mostly for the holidays?", "Then you want a roofline run. Everything else is an addition to it, and you can add later."],
              ["Do you sit outside in summer?", "Then a pergola or patio run earns its keep more than the roofline does."],
              ["Is the front of the house the point?", "Then landscape uplighting on mature trees does more per dollar than trim lighting."],
            ].map(([h, p], i) => (
              <li key={h} className="relative">
                <span className="u pointer-events-none absolute -top-3 left-0 text-[3.4rem] font-medium leading-none text-on-dark/30" aria-hidden>{i + 1}</span>
                <div className="relative pt-8">
                  <h3 className="text-lg text-on-dark">{h}</h3>
                  <p className="mt-2 text-[0.95rem] text-on-dark-muted">{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Available in" title="Every service, everywhere we drive." />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>

      <BandCta title="Not sure which one you need?" body="We design it on site after dark, when you can actually see what we are proposing." />
      <PageCta />
    </Shell>
  );
}
