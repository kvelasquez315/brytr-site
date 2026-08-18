import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles, ServiceRows, SpecTable } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { site } from "@/content/site";
import { Photo, photoExists } from "@/components/ui/photo";
import { Elevation } from "@/components/sections/elevation";

export const metadata: Metadata = {
  title: "About Brytr Co | Family Owned, Omaha",
  description: "Brytr Co is Zac Van Buren and Sam Greguska, W2 crews and two lighting tiers, installing permanent outdoor lighting across the Omaha metro since founding.",
  alternates: { canonical: "/about" },
};
const trail = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];

export default function About() {
  const slots = ["founderZac", "founderSam"];
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="About Brytr"
        h1="Two guys, two tiers, one market."
        lede="Brytr exists because every permanent lighting quote in Omaha came from somebody selling exactly one brand and calling it the only good option. We stock two, run our own crews, and service work we did not sell."
        trail={trail}
        stats={[["1.2M", "lights installed"], ["5.0", "from 177 reviews"], ["18", "cities served"]]}
      />

      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
          <div>
            <SectionHead title="Why there are two tiers." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                Almost every permanent lighting company is a dealer for one manufacturer. That is a
                perfectly normal way to run the business, and it means the recommendation is decided before
                anyone looks at your house.
              </p>
              <p className="text-muted-foreground">
                Zac and Sam built Brytr the other way round. We carry a premium system on Haven Evolution
                and a value system on Jellyfish, and we quote whichever one your roofline actually calls
                for. Sometimes that is the cheaper one, which is a worse day for us.
              </p>
              <p className="text-muted-foreground">
                The second decision was to keep the crews in house. Permanent lighting is fastened into
                your fascia and sealed, and almost every failure we get called out to fix is workmanship
                rather than product. Subcontracting the install would make us more money and cost us the
                thing the whole company runs on.
              </p>
              <p className="text-muted-foreground">
                The third was to service other brands. If a previous installer has stopped answering the
                phone, we will take the system over. It is the least profitable thing we do and it is how
                a fair number of our customers first meet us.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-border">
            <Elevation night massing="wing" lit={{ hex: "#f5c518", label: "warm white" }} className="block w-full" />
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Who you will meet" title="Zac and Sam." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:w-2/3">
            {site.founders.map((f, i) => (
              <article key={f.name} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                {photoExists(slots[i]) ? (
                  <Photo slot={slots[i]} sizes="(min-width:1024px) 30vw, 50vw" />
                ) : (
                  <div className="aspect-4/5 bg-primary p-6">
                    <div className="flex h-full flex-col justify-end">
                      <span className="u text-[4rem] font-medium leading-none text-accent">
                        {f.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <p className="u mt-3 text-2xs uppercase tracking-[0.16em] text-on-dark-muted">{f.role}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground">{f.name}</h2>
                  <p className="u mt-1 text-xs uppercase tracking-[0.14em] text-accent-ink">{f.role}</p>
                  <ul className="mt-4 space-y-2">{f.handles.map((h) => <Check key={h}>{h}</Check>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-raise">
        <div className="shell py-14">
          <dl className="grid grid-cols-2 gap-6 divide-on-dark/12 lg:grid-cols-4 lg:divide-x">
            {[["1.2M", "lights installed locally"], ["177", "five-star Google reviews"], ["2", "tiers stocked"], ["18", "cities served"]].map(([f, l]) => (
              <div key={l} className="lg:px-6">
                <dt className="u text-3xl font-medium text-on-dark">{f}</dt>
                <dd className="mt-2 text-sm text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell">
          <SectionHead title="Four commitments we will put in writing." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["W2 crews only", "The people on your roof are our employees. Never a subcontractor network."],
              ["Two tiers, honest quote", "We will tell you when the cheaper system is the right answer for your house."],
              ["Day and night verification", "We do not close a job until you have signed off on both states of the system."],
              ["We service other brands", "Including systems we did not sell, and including brands we would not sell."],
            ].map(([h, p]) => (
              <article key={h} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <h3 className="text-lg text-foreground">{h}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead title="Eighteen cities." />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>

      <BandCta title="Meet us at your house." body="The consultation is free and the design happens on your property, after dark." />
      <PageCta />
    </Shell>
  );
}
