import type { Metadata } from "next";
import { cities, metroCities, outstateCities, iowaCities } from "@/content/cities";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, CityTiles, ServiceRows, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, localBusiness } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Areas: Omaha Metro, Lincoln and Eastern Nebraska",
  description: "Brytr installs permanent outdoor lighting across 18 cities: the Omaha metro, Council Bluffs, Lincoln, Fremont, Ashland, Norfolk, Columbus and Grand Island.",
  alternates: { canonical: "/service-areas" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }];

const groups = [
  { h: "Omaha metro", list: metroCities, bg: "bg-background", note: "Core territory. Same-week service calls." },
  { h: "Lincoln and eastern Nebraska", list: outstateCities, bg: "bg-raise", dark: true, note: "Scheduled routes, no travel premium." },
  { h: "Western Iowa", list: iowaCities, bg: "bg-muted", note: "Same crews, same materials, same warranty." },
];

export default function AreasHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness()} />
      <PageHero
        eyebrow="Where we work"
        h1="Where Brytr installs."
        lede="Eighteen cities across the Omaha metro, western Iowa and eastern Nebraska. Every one has its own page with drive time, neighborhoods and local project detail."
        trail={trail}
        stats={[["18", "cities"], [`${metroCities.length}`, "in the metro"], ["1.2M", "lights installed"]]}
      />

      {groups.map((g) => (
        <section key={g.h} className={`section ${g.bg}`}>
          <div className="shell">
            <SectionHead onDark={g.dark} eyebrow={`${g.list.length} ${g.list.length === 1 ? "city" : "cities"}`} title={g.h} lede={g.note} />
            <div className="mt-9"><CityTiles onDark={g.dark} list={g.list} /></div>
          </div>
        </section>
      ))}

      <section className="section bg-primary">
        <div className="shell grid gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="How far we travel" title="Why the radius is what it is." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-on-dark">
                Permanent lighting is a fifteen year relationship, so the honest limit on our service area
                is how far we will drive for a warranty call in February.
              </p>
              <p className="text-on-dark-muted">
                Inside the metro that is a same-week visit. Out to Lincoln and eastern Nebraska we run
                scheduled routes, which is why the pricing is the same rather than carrying a travel
                premium. Past Grand Island we would be selling you a system we cannot service properly,
                so we do not.
              </p>
            </div>
            <div className="mt-7"><TextLink onDark href="/services/repairs-and-service">See repairs and system takeover</TextLink></div>
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-on-dark/12">
            <iframe
              title="Map of the Brytr Co service area centerd on Omaha, Nebraska"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-4/3 w-full border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-98.6%2C40.2%2C-95.2%2C42.2&layer=mapnik&marker=41.2565%2C-95.9345"
            />
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="In every city" title="All eleven services, everywhere we work." />
          <div className="mt-9"><ServiceRows /></div>
        </div>
      </section>

      <BandCta title="Not sure if you are in the radius?" body="Call and ask. If we cannot service it properly we will tell you rather than sell you." />
      <PageCta />
    </Shell>
  );
}
