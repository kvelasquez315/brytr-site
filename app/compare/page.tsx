import type { Metadata } from "next";
import Link from "next/link";
import { compares } from "@/content/compares";
import { Shell } from "@/app/layout-shell";
import { Elevation } from "@/components/sections/elevation";
import { PageHero, PageCta, BandCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Best Permanent Lighting Brands Compared (2026)",
  description: "All 10 permanent outdoor lighting brands compared by an installer who carries two of them: Haven, Jellyfish, Gemstone, Trimlight, Oelo, Govee, Minleon, Ghouly and EverLights.",
  alternates: { canonical: "/compare" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }];

const matrix = [
  { spec: "Haven Evolution", a: "Haven Lighting", b: "Premium · dedicated white · 4 in. spacing · we install it" },
  { spec: "Jellyfish", a: "Jellyfish Lighting", b: "Value · mixed white · we install it as our Basic tier" },
  { spec: "Gemstone Lights", a: "Gemstone", b: "Mid to premium · good channel · we service it" },
  { spec: "Trimlight", a: "Trimlight (franchise)", b: "Mid to premium · experience varies by franchisee" },
  { spec: "Oelo", a: "Oelo", b: "Mid · distinctive channel · sold locally · we service it" },
  { spec: "EverLights", a: "EverLights", b: "Mature product · established category name" },
  { spec: "Minleon / Rainmin", a: "Minleon", b: "Installer channel · strong for animated holiday shows" },
  { spec: "Govee", a: "Govee", b: "DIY consumer kit · you are the installer" },
  { spec: "Ghouly", a: "OEM supply", b: "White-label manufacturer behind several brands" },
  { spec: "Brytr Signature / Basic", a: "Brytr Co", b: "Our two tiers, built on Haven and Jellyfish" },
];

const groups = [
  { h: "Brands we install", note: "Stocked, quoted and warranted by us.", items: ["Haven Evolution", "Haven Q Series", "Haven 9 Series", "Haven X Bistro", "Jellyfish"] },
  { h: "Brands we service but do not sell", note: "We will take over and repair these.", items: ["Gemstone Lights", "Trimlight", "Oelo", "EverLights", "Minleon / Rainmin"] },
  { h: "Not a professional install", note: "Fine for the right person, but it is a DIY kit.", items: ["Govee", "Unbranded OEM supply", "Adhesive-mount consumer strips"] },
];

export default function CompareHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={{
        "@context": "https://schema.org", "@type": "Article",
        headline: "The 10 permanent lighting brands, compared by an installer",
        author: { "@type": "Organization", name: "Brytr Co" },
      }} />

      <PageHero
        eyebrow="Honest comparison"
        h1="The 10 permanent lighting brands, compared by an installer."
        lede="We carry two of these, service five more, and would not put the rest on your house. Here is the whole market in one table, including where our own premium system loses."
        trail={trail}
        stats={[["10", "brands compared"], ["2", "we install"], ["5", "we service"]]}
        aside={
          <div className="rounded-lg bg-raise p-4 ring-1 ring-accent/15 shadow-[var(--shadow-dark)]">
            <div className="grid grid-cols-2 gap-2">
              {["#f5c518", "#d7262f", "#2f9e57", "#2f6fd0"].map((hex, i) => (
                <div key={hex} className="overflow-hidden rounded-md ring-1 ring-on-dark/10">
                  <Elevation night massing={(["gable","ranch","wing","gable"] as const)[i]} lit={{ hex, label: "scene" }} className="block w-full" />
                </div>
              ))}
            </div>
            <p className="u mt-3 px-1 text-2xs uppercase tracking-[0.14em] text-on-dark-muted">
              Every brand here does color. The difference is white quality, channel, app and who installs it.
            </p>
          </div>
        }
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="The matrix" title="Every brand on the Omaha market." lede="This is the page we wish existed when we started. No column is highlighted." />
          <div className="mt-10"><SpecTable onDark={false} caption="All 10 permanent lighting brands compared" rows={matrix} headA="Who makes it" headB="What you are getting" /></div>
        </div>
      </section>

      <section className="section bg-primary">
        <div className="shell">
          <SectionHead onDark eyebrow="Where we stand" title="What we sell, service, and stay away from." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {groups.map((g) => (
              <article key={g.h} className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <h3 className="text-xl text-on-dark">{g.h}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{g.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-full border border-on-dark/20 px-3 py-1.5 text-xs text-on-dark-muted">{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Head to head" title="Nine individual comparisons." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {compares.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <h2 className="font-display text-lg font-bold text-foreground">{c.a} vs {c.b}</h2>
                <p className="mt-2.5 flex-1 text-[0.95rem] text-muted-foreground">{c.verdict.split(". ")[0].replace(/\.+$/, "")}.</p>
                <p className="u mt-4 text-xs uppercase tracking-[0.14em] text-accent-ink">Read the comparison</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-raise">
        <div className="shell grid gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="Methodology" title="How we judged these." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-on-dark">
                We install two of these brands and repair five more, which means most of this comes from
                pulling failed sections off houses rather than from reading spec sheets.
              </p>
              <p className="text-on-dark-muted">
                Where we have no direct experience with a product we say so rather than guessing. Where our
                own premium system loses to a cheaper one, that is on the page.
              </p>
            </div>
          </div>
          <ul className="h-fit space-y-3 rounded-lg bg-primary p-7 ring-1 ring-on-dark/10">
            <Check onDark>White quality judged side by side at night, not from a datasheet</Check>
            <Check onDark>Channel judged in daylight from the curb, which is where it matters</Check>
            <Check onDark>App judged on whether a customer still uses it in year two</Check>
            <Check onDark>Failure modes taken from systems we have repaired</Check>
            <Check onDark>Price stated as a tier, because per-foot pricing varies by house</Check>
          </ul>
        </div>
      </section>

      <BandCta title="Want the version specific to your house?" body="We measure on site and tell you which of these we would actually put on it." />
      <PageCta />
    </Shell>
  );
}
