import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityBySlug } from "@/content/cities";
import { services } from "@/content/services";
import { serviceFaqsFor } from "@/content/faqs";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { Elevation } from "@/components/sections/elevation";
import {
  PageHero, PageCta, BandCta, ServiceRows, CityTiles, SectionHead, Check, TextLink,
} from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, localBusiness, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cityBySlug(slug);
  if (!c) return {};
  return {
    /* Deliberately distinct from the homepage title so two pages never compete. */
    title: `Permanent Outdoor Lighting ${c.name} ${c.state} | Installed Once`,
    description: `Permanent outdoor lighting installed in ${c.name}, ${c.state}. Roofline, landscape, hardscape and bistro runs by our own crews. ${c.drive} from the shop. 5.0 from 177 reviews.`,
    alternates: { canonical: `/service-areas/${c.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cityBySlug(slug);
  if (!c) notFound();
  const faqs = serviceFaqsFor(`a permanent lighting install in ${c.name}`);
  const nearby = (c.nearby.map(cityBySlug).filter(Boolean) as typeof cities)
    .slice()
    .sort((a, b) => (parseInt(a.drive) || 0) - (parseInt(b.drive) || 0));
  const trail = [
    { name: "Home", href: "/" },
    { name: "Service areas", href: "/service-areas" },
    { name: c.name, href: `/service-areas/${c.slug}` },
  ];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness(c.name)} />
      <Jsonld data={faqSchema(faqs)} />

      <PageHero
        eyebrow={`${c.name}, ${c.state}`}
        h1={`Permanent outdoor lighting in ${c.name}.`}
        lede={`We install and service permanent exterior lighting throughout ${c.name}${
          c.tier === "metro" ? " and the rest of the Omaha metro" : c.tier === "iowa" ? " and western Iowa" : " and eastern Nebraska"
        }. ${c.drive} from our shop, so a service call is a drive rather than a project.`}
        trail={trail}
        footnote={
          <>
            {c.tier === "metro"
              ? `Core metro territory, so service calls here get scheduled the same week.`
              : c.tier === "iowa"
              ? `Iowa-side installs get the same crews, materials and warranty as anything in Nebraska.`
              : `We run scheduled routes out here rather than same-day calls, and the pricing is the same as the metro.`}{" "}
            <Link href="/how-it-works" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">See the five-step process</Link>.
          </>
        }
        stats={[["5.0", "from 177 reviews"], ["1.2M", "lights installed"], ["1 day", "typical install"]]}
      />

      {/* 2 — local proof strip · charcoal */}
      <section className="bg-raise">
        <div className="shell grid grid-cols-2 divide-x divide-on-dark/12 py-8 lg:grid-cols-4">
          {[
            ["Drive time from our shop", c.drive],
            ["Neighborhoods we work in", `${c.neighborhoods.length}`],
            ["Systems carried", "Premium and value"],
            ["Crews", "W2, never subcontracted"],
          ].map(([k, v]) => (
            <div key={k} className="px-5 py-3">
              <p className="u text-lg font-medium text-on-dark">{v}</p>
              <p className="mt-1 text-xs text-on-dark-muted">{k}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — neighborhoods · asymmetric split · bone */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            <SectionHead title={`Working across ${c.name}.`} />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                {c.tier === "metro"
                  ? `${c.name} is core territory for us. Most of our installs are within twenty minutes of here, which means when something needs a service call it gets one the same week rather than the next month.`
                  : c.tier === "iowa"
                  ? `We cross the river for ${c.name} regularly. Iowa-side installs get the same crews, the same materials and the same warranty as anything in Nebraska.`
                  : `${c.name} is a scheduled route for us rather than a same-day call. We batch installs out here, which keeps the pricing the same as the metro rather than adding a travel premium.`}
              </p>
              <p className="text-muted-foreground">
                Every install is designed on site after dark. On a first visit we walk the property with
                you, talk through what you actually want lit, measure the roofline, and leave you with a
                written quote. There is no charge and no obligation.
              </p>
            </div>
            <div className="mt-7"><TextLink href="/how-it-works">See how the process works</TextLink></div>
          </div>
          <div>
            <p className="label text-muted-foreground">Neighborhoods and subdivisions</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {c.neighborhoods.map((n) => (
                <li key={n} className="rounded-sm border border-accent-deep/40 bg-card px-4 py-2 text-sm font-medium text-foreground">{n}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Not listed? We still cover it. Call{" "}
              <a href="tel:+14028103973" className="u text-foreground underline decoration-accent decoration-2 underline-offset-4">402-810-3973</a>{" "}
              and ask.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-7">
              {[
                ["Typical roofline", "150 to 400 linear ft"],
                ["Typical zones", "2 to 5"],
                ["Install duration", "1 day, most homes"],
                ["Service response", c.tier === "metro" ? "Same week" : "Scheduled route"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted-foreground">{k}</dt>
                  <dd className="u mt-1 text-base font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 4 — drawn elevation band · primary */}
      <section className="bg-primary">
        <div className="shell grid items-center gap-8 py-12 lg:grid-cols-[1fr_22rem]">
          <div className="overflow-hidden rounded-lg ring-1 ring-on-dark/12">
            <Elevation night massing="ranch" lit={{ hex: "#f5c518", label:"warm white" }} className="block w-full" />
          </div>
          <div>
            <p className="eyebrow eyebrow--on-dark">A typical {c.name} install</p>
            <p className="mt-4 text-on-dark-muted">
              Roofline channel on the front and side elevations, two landscape uplights, one zone per
              elevation. This is the drawing that goes with the written quote, so you can see the run
              before anything is fastened to the house.
            </p>
            <div className="mt-6"><TextLink onDark href="/recent-projects">See recent projects</TextLink></div>
          </div>
        </div>
      </section>

      {/* 5 — services available here · bone-deep */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead title={`All eleven services, in ${c.name}.`} />
          <div className="mt-9"><ServiceRows /></div>
        </div>
      </section>

      {/* 6 — the local argument · primary */}
      <section className="section bg-primary">
        <div className="shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="Why local matters here" title="A permanent fixture needs a permanent installer." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-on-dark">
                The install is one day. The relationship is fifteen years.
              </p>
              <p className="text-on-dark-muted">
                Permanent lighting is a building material fastened to your fascia. When a section fails
                in year four, what matters is whether the company that installed it still exists, still
                works in {c.name}, and still stocks the part. That is the entire reason we run our own
                crews and stay inside one market.
              </p>
              <p className="text-on-dark-muted">
                It is also why we service systems we did not sell. If a previous installer has stopped
                answering the phone, we will take the system over.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
            <ul className="space-y-3">
              <Check onDark>{c.drive} from our shop</Check>
              <Check onDark>Same crews on every job in {c.name}</Check>
              <Check onDark>We handle HOA and covenant paperwork</Check>
              <Check onDark>We service other brands, including Jellyfish and Gemstone</Check>
              <Check onDark>Written warranty before you sign</Check>
            </ul>
            <div className="mt-7 border-t border-on-dark/12 pt-6">
              <p className="label text-accent">What a service call looks like</p>
              <ol className="mt-4 space-y-3">
                {[
                  ["You call the number on this page", "Not a portal, not a franchise dispatcher."],
                  ["We diagnose on site", "Controller, power supply, termination or LED. Usually inside a week."],
                  ["We fix it under whichever coverage applies", "Manufacturer or our own workmanship. You do not arbitrate that."],
                ].map(([h, p2], i) => (
                  <li key={h} className="flex gap-4">
                    <span className="u text-sm text-on-dark">{i + 1}</span>
                    <span>
                      <span className="block text-sm font-semibold text-on-dark">{h}</span>
                      <span className="mt-0.5 block text-sm text-on-dark-muted">{p2}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — city-specific note, numbered row · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow={c.note ? "HOA and covenants" : "Getting approved"}
            title="We handle the paperwork, not you."
            lede={
              c.tier === "metro"
                ? `Several ${c.name} developments have specific covenant language about permanent exterior lighting. We deal with it directly.`
                : `Most ${c.name} properties have no restriction at all, but where there is an association we handle the submission ourselves.`
            }
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-3 lg:gap-10">
            {[
              ["We pull your covenant", "Before we quote, we read the actual lighting clause rather than guessing at it.",
               "Newer developments often have language written before this product existed, which is usually good news."],
              ["We submit to your board", "Spec sheet and a rendering of your elevation, in the format the board wants.",
               "A daylight photo of a finished install wins more approvals than a night photo does."],
              ["We install once approved", "Usually inside two weeks. Nothing goes on the house before you have the approval.",
               "If the board says no, you owe us nothing and we have not touched the house."],
            ].map(([h, p2, note], i) => (
              <li key={h} className="relative">
                <span className="u pointer-events-none absolute -top-3 left-0 text-[3.4rem] font-medium leading-none text-foreground/25" aria-hidden>{i + 1}</span>
                <div className="relative pt-8">
                  <h3 className="text-lg text-foreground">{h}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{p2}</p>
                  <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">{note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — nearby cities · charcoal */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead onDark title={`Also working around ${c.name}.`} />
          <div className="mt-9"><CityTiles onDark list={nearby} /></div>
          <div className="mt-8"><TextLink onDark href="/service-areas">All 18 service areas</TextLink></div>
        </div>
      </section>

      {/* 9 — FAQ · bone. Two columns of substance so neither half is a void. */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="Questions" title={`Permanent lighting in ${c.name}.`} />
          <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-14">
            <Faq items={faqs} />
            <div className="space-y-5">
              <div className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
                <h3 className="text-lg text-on-dark">{c.name} at a glance</h3>
                <dl className="mt-4 divide-y divide-on-dark/12 border-y border-on-dark/12">
                  {[
                    ["Drive time", c.drive],
                    ["Neighborhoods", `${c.neighborhoods.length}`],
                    ["Services offered", "11"],
                    ["Systems carried", "2 tiers"],
                    ["Typical install", "1 day"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-on-dark-muted">{k}</dt>
                      <dd className="u text-sm font-medium text-on-dark">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href="tel:+14028103973" className="u mt-5 block text-2xl font-medium text-accent">402-810-3973</a>
                <p className="mt-1 text-xs text-on-dark-muted">Same-day reply, most days</p>
              </div>
              <div className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <p className="label text-accent-ink">Most asked for in {c.name}</p>
                <ul className="mt-4 space-y-3">
                  {["permanent-christmas-lights", "permanent-outdoor-lighting", "landscape-lighting", "repairs-and-service"].map((slug) => {
                    const sv = services.find((x) => x.slug === slug)!;
                    return (
                      <li key={slug}>
                        <Link href={`/services/${slug}`} className="text-sm font-semibold text-foreground hover:text-accent-deep">
                          {sv.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">{sv.short}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta city={c.name} />
    </Shell>
  );
}
