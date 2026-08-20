import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles, ServiceRows, SpecTable } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { Elevation } from "@/components/sections/elevation";
import { iconMap } from "@/content/icon-map";

export const metadata: Metadata = {
  title: "How It Works: The Brytr Way",
  description: "The five-step Brytr permanent lighting process: free design consultation, see it on your house, on-site measure and written quote, install by our own crew, day and night verification.",
  alternates: { canonical: "/how-it-works" },
};
const trail = [{ name: "Home", href: "/" }, { name: "How it works", href: "/how-it-works" }];

const steps = [
  { h: "Free design consultation", p: "We come out, walk the property, and talk through what you actually want lit rather than reading you a package. Evenings are better, because the product is a night-time product and the design should happen when you can see it.", list: ["No charge and no obligation", "Bring your objections, they are useful", "Usually about an hour"] },
  { h: "See it on your own house", p: "We show you the app and the scene library, and we talk through what warm white looks like on your elevation versus what color looks like. This is the step that stops people buying something they will not use.", list: ["Real scenes, not renders", "Zoning decided with you", "Everyday setting chosen first"] },
  { h: "On-site measure and written quote", p: "Linear feet of roofline, story count, corner and transition count, zones, tier. You get one number in writing for the whole scope, with nothing added on install day.", list: ["Measured, not estimated", "Itemized by tier and zone", "Financing options shown with real terms"] },
  { h: "Install by our own crew", p: "One day for most homes. Channel fastened into fascia and sealed as we go, mitered at every corner, wire concealed, terminations capped. Never through the shingles.", list: ["W2 employees, trained in house", "Sealed at the time of fastening", "Site left clean"] },
  { h: "Day and night verification", p: "We check the sightline from the curb in daylight, then walk every scene with you after dark before we leave. This is the step most installers skip and it is the one that catches problems.", list: ["Daylight curb check with you", "Every scene walked after dark", "App set up on your phone before we go"] },
];

export default function HowItWorks() {
  const bgs = ["bg-background", "", "bg-muted", "bg-background", "bg-muted"];
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="The Brytr way"
        h1="From the first walk-around to the night it turns on."
        lede="Nothing here is unusual except the last step, which is the one that separates a system you enjoy from a system you argue about."
        trail={trail}
        footnote={
          <>
            The last step is the one most installers skip, and it is the one that catches problems.{" "}
            <Link href="/warranty" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">What the warranty covers</Link>.
          </>
        }
        stats={[["1 hr", "consultation"], ["1 day", "typical install"], ["2", "verification checks"]]}
      />

      {steps.map((s, i) => {
        // alternate archetype and background so five steps are not five identical splits
        if (i === 1) {
          return (
            <section key={s.h} className="bg-primary">
              <div className="shell py-14">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_24rem]">
                  <div className="overflow-hidden rounded-lg ring-1 ring-on-dark/12">
                    <Elevation night massing="wing" lit={{ hex: "#f5c518", label:"warm white" }} className="block w-full" />
                  </div>
                  <div>
                    <p className="u text-[3rem] font-medium leading-none text-on-dark">
                      <span className="sr-only">Step </span>{i + 1}
                    </p>
                    <h2 className="mt-3 text-2xl text-on-dark">{s.h}</h2>
                    <p className="mt-3 text-[0.95rem] text-on-dark-muted">{s.p}</p>
                    <ul className="mt-5 space-y-2.5">{s.list.map((l) => <Check key={l} onDark>{l}</Check>)}</ul>
                  </div>
                </div>
              </div>
            </section>
          );
        }
        if (i === 4) {
          return (
            <section key={s.h} className="section bg-muted">
              <div className="shell">
                <p className="u text-[3rem] font-medium leading-none text-foreground/70">
                  <span className="sr-only">Step </span>{i + 1}
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] text-foreground">{s.h}</h2>
                <p className="mt-4 max-w-[70ch] text-lg text-muted-foreground">{s.p}</p>
                <div className="mt-9 grid gap-5 sm:grid-cols-3">
                  {s.list.map((l, k) => (
                    <div key={l} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                      <p className="label text-accent-ink">On the day</p>
                      <p className="mt-2 font-display text-base font-bold text-foreground">{l}</p>
                      <p className="mt-2.5 text-sm text-muted-foreground">
                        {[
                          "We stand where your neighbors stand and look at the eave line in daylight. If you can pick out the channel, we are not done.",
                          "Warm white first, then every saved scene, then the schedule. You run the app yourself before we leave the driveway.",
                          "Nothing is signed off by us alone. Both checks are signed off by you, on the same visit.",
                        ][k]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }
        const flip = i === 2;
        return (
          <section key={s.h} className={`section ${bgs[i] || "bg-background"}`}>
            <div className={`shell grid gap-10 lg:grid-cols-2 lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <p className="u text-[3rem] font-medium leading-none text-foreground/70">
                  <span className="sr-only">Step </span>{i + 1}
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,2.8vw,2.2rem)] text-foreground">{s.h}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{s.p}</p>
                <ul className="mt-6 space-y-2.5">{s.list.map((l) => <Check key={l}>{l}</Check>)}</ul>
              </div>
              {i === 0 ? (
                <div className="overflow-hidden rounded-lg ring-1 ring-border">
                  <Elevation night massing="gable" lit={{ hex: "#f5c518", label:"warm white" }} className="block w-full" />
                </div>
              ) : i === 2 ? (
                /* step 3 is the quote, so show what a quote contains rather than a house */
                <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
                  <p className="label text-accent">On the written quote</p>
                  <dl className="mt-5 divide-y divide-on-dark/12 border-y border-on-dark/12">
                    {[["Linear feet", "244 ft, itemized by elevation"], ["Tier", "Signature or Basic, named"],
                      ["Zones", "3, one per elevation"], ["Corners mitered", "11"],
                      ["Add-ons", "Landscape, priced separately"], ["Warranty", "Manufacturer + workmanship"]].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-sm text-on-dark-muted">{k}</dt>
                        <dd className="u text-right text-sm font-medium text-on-dark">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="u mt-5 text-xs text-on-dark-muted">Nothing is added on install day.</p>
                </div>
              ) : (
                /* step 5 is verification, so show the two checks we actually run */
                <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
                  <p className="label text-accent">The two checks</p>
                  <div className="mt-5 space-y-5">
                    {[
                      ["Daylight, from the curb", "We stand where your neighbors stand and look at the eave line. If you can pick out the channel, we have not finished."],
                      ["After dark, every scene", "Warm white first, then each saved scene, then the schedule. You operate the app yourself before we leave the driveway."],
                    ].map(([h2, p2]) => (
                      <div key={h2}>
                        <p className="font-display text-base font-bold text-on-dark">{h2}</p>
                        <p className="mt-1.5 text-sm text-on-dark-muted">{p2}</p>
                      </div>
                    ))}
                  </div>
                  <p className="u mt-6 border-t border-on-dark/12 pt-4 text-xs text-on-dark-muted">
                    Both signed off by you, on the same visit.
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section className="section bg-raise">
        <div className="shell">
          <SectionHead onDark title="Things that are not standard in this trade." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Designing after dark", "A night-time product designed in daylight is guesswork.", "Most installers quote from the driveway at 2pm.", "verified"],
              ["Daylight curb check", "How it reads at noon is the actual craft.", "Anyone can make a roofline look good at night.", "measured"],
              ["Sealing as we fasten", "Not afterwards, when the sealant has to bridge a gap.", "Three of the four common failure modes are workmanship.", "weatherSealed"],
              ["Mitering every corner", "Where amateur runs always show.", "Bent channel at a valley is the tell from the curb.", "roofline"],
              ["Building the scene library with you", "So you actually use it in year two.", "A system nobody opens is a system nobody values.", "sceneStack"],
              ["Reading your covenant", "Before quoting, not after the board says no.", "We submit the spec sheet ourselves.", "hoaPaperwork"],
            ].map(([h, p, note, ic]) => {
              const I = iconMap[ic as keyof typeof iconMap];
              return (
                <article key={h} className="flex flex-col rounded-lg bg-primary p-6 ring-1 ring-on-dark/10">
                  <span className="channel-tile mb-5" aria-hidden><I className="size-7" /></span>
                  <h3 className="text-lg text-on-dark">{h}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-on-dark-muted">{p}</p>
                  <p className="label mt-4 border-t border-on-dark/12 pt-3 text-on-dark-muted">{note}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
