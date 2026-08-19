import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/content/systems";
import { Shell } from "@/app/layout-shell";
import { Elevation } from "@/components/sections/elevation";
import { PageHero, PageCta, BandCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Permanent Lighting Systems We Install",
  description: "Every permanent lighting system Brytr installs, compared: Brytr Signature on Haven Evolution, Brytr Basic on Jellyfish, plus the Haven Q, 9 and X Series.",
  alternates: { canonical: "/lighting-systems" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Lighting systems", href: "/lighting-systems" }];

const master = [
  { spec: "Brytr Signature", a: "Premium · Haven Evolution", b: "RGB + dedicated white · 25 yr · best app" },
  { spec: "Brytr Basic", a: "Value · Jellyfish", b: "RGB, mixed white · shorter rating" },
  { spec: "Haven Evolution", a: "Component · premium", b: "4 in. spacing · IP66 · dedicated white" },
  { spec: "Haven Q Series", a: "Add-on · soffit", b: "Recessed and architectural fixtures" },
  { spec: "Haven 9 Series", a: "Add-on · landscape", b: "Path, uplight and bed fixtures" },
  { spec: "Haven X Bistro", a: "Add-on · overhead", b: "Pergola and patio cover runs" },
  { spec: "Jellyfish", a: "Component · value", b: "Wider spacing · mixed white" },
  { spec: "App and controls", a: "Control layer", b: "Scenes, scheduling, zoning, dimming" },
];
const tiers = [
  { spec: "LED spacing", a: "4 in.", b: "Wider" },
  { spec: "White channel", a: "Dedicated warm white", b: "Color mixed" },
  { spec: "Color range", a: "RGB + white", b: "RGB" },
  { spec: "Zones", a: "Unlimited", b: "Fewer" },
  { spec: "Dimming", a: "1 to 100% per zone", b: "Supported" },
  { spec: "Channel finish", a: "Color matched", b: "Stock finishes" },
  { spec: "Weather rating", a: "IP66", b: "Sealed channel" },
  { spec: "Rated life", a: "25 years", b: "Shorter" },
  { spec: "Price tier", a: "Premium", b: "Value" },
];

export default function SystemsHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="The materials"
        h1="Every system we install, compared."
        lede="Most installers carry one brand and therefore have one recommendation. We stock a premium tier and a value tier, which is why we can tell you which one your house actually needs."
        trail={trail}
        stats={[["8", "systems carried"], ["2", "tiers stocked"], ["25 yr", "top LED rating"]]}
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="The lineup" title="Eight systems, two tiers." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((s, i) => (
              <Link key={s.slug} href={`/lighting-systems/${s.slug}`} className="flex flex-col rounded-lg bg-card p-5 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <div className="mb-4 overflow-hidden rounded-md ring-1 ring-border">
                  <Elevation night massing={(["gable","ranch","wing"] as const)[i % 3]} lit={{ hex: "#f5c518", label: s.name }} className="block w-full" />
                </div>
                <p className="label text-2xs uppercase tracking-[0.14em] text-accent-ink">{s.tier}</p>
                <h2 className="mt-1.5 font-display text-base font-bold text-foreground">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <dl className="mt-4 space-y-1.5 border-t border-border pt-3">
                  {s.specs.slice(0, 3).map((sp) => (
                    <div key={sp.label} className="flex justify-between gap-3 text-xs">
                      <dt className="text-muted-foreground">{sp.label}</dt>
                      <dd className="u text-right font-medium text-foreground">{sp.value}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="At a glance" title="All eight, one table." />
          <div className="mt-10"><SpecTable onDark={false} caption="Every system Brytr installs" rows={master} headA="Tier" headB="Notable" /></div>
        </div>
      </section>

      <section className="bg-raise">
        <div className="shell py-14">
          <dl className="grid grid-cols-2 gap-6 divide-on-dark/12 lg:grid-cols-4 lg:divide-x">
            {[["8", "systems carried"], ["RGB + W", "top color range"], ["25 yr", "longest LED rating"], ["1.2M", "lights installed"]].map(([f, l]) => (
              <div key={l} className="lg:px-6">
                <dt className="u text-2xl font-medium text-on-dark">{f}</dt>
                <dd className="mt-2 text-sm text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="Signature versus Basic" title="Our two tiers, side by side." lede="This table lives here rather than on the homepage because it is the decision, not the pitch." />
          <div className="mt-10"><SpecTable onDark={false} caption="Brytr Signature compared with Brytr Basic" rows={tiers} headA="Brytr Signature" headB="Brytr Basic" highlightA /></div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <TextLink href="/compare">Compare all 10 brands on the market</TextLink>
            <TextLink href="/pricing">See pricing</TextLink>
          </div>
        </div>
      </section>

      <BandCta title="Which tier is right for your house?" body="We measure on site and tell you honestly. Sometimes the answer is the cheaper one." />
      <PageCta />
    </Shell>
  );
}
