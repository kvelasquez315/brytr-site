import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles, ServiceRows, SpecTable } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Warranty and 365 Day Service Promise",
  description: "What Brytr's permanent lighting warranty covers: manufacturer coverage on hardware plus our own workmanship coverage on the install, in writing before you sign.",
  alternates: { canonical: "/warranty" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Warranty", href: "/warranty" }];

const rows = [
  { spec: "LED diodes", a: "Manufacturer", b: "Longest term in the system" },
  { spec: "Controller", a: "Manufacturer", b: "Shorter than the LED term" },
  { spec: "Power supply", a: "Manufacturer", b: "Shortest-lived component in any system" },
  { spec: "Channel and extrusion", a: "Manufacturer", b: "Finish and corrosion" },
  { spec: "Fastening and sealing", a: "Brytr workmanship", b: "Our work, our problem" },
  { spec: "Water ingress at terminations", a: "Brytr workmanship", b: "The most common real-world failure" },
  { spec: "Diagnosis and call-out", a: "Brytr", b: "We come out. One number to call." },
  { spec: "Damage from roof work by others", a: "Not covered", b: "Tell your roofer we exist before they start" },
];

export default function Warranty() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="Warranty"
        h1="What is covered, and who comes out."
        lede="A warranty is only worth the person administering it. Manufacturer coverage on the hardware, our own workmanship coverage on the install, and we are the ones who show up."
        trail={trail}
        stats={[["2", "layers of coverage"], ["1", "number to call"], ["365", "days a year"]]}
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="Coverage" title="Split by who is responsible." lede="Most warranty disputes in this trade are really arguments about whether a failure was product or workmanship. Splitting it up front removes the argument." />
          <div className="mt-10"><SpecTable onDark={false} caption="Warranty coverage by component" rows={rows} headA="Covered by" headB="Notes" /></div>
        </div>
      </section>

      <section className="section bg-primary">
        <div className="shell grid gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="The promise" title="We come out." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-on-dark">
                The single most useful thing about a locally owned installer is that a warranty claim is a
                phone call rather than a process.
              </p>
              <p className="text-on-dark-muted">
                We hold the workmanship coverage ourselves and we administer the manufacturer claim on your
                behalf. You do not deal with the manufacturer, fill in a portal, or find out that the
                franchisee who installed it has closed.
              </p>
            </div>
          </div>
          <ul className="h-fit space-y-3 rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
            <Check onDark>One number to call, for either kind of failure</Check>
            <Check onDark>We handle the manufacturer claim for you</Check>
            <Check onDark>Service available year round, including winter</Check>
            <Check onDark>Coverage transfers if you sell the house</Check>
            <Check onDark>We also service systems we did not install</Check>
          </ul>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Making a claim"
            title="What actually happens when something fails."
            lede="Three steps, one phone number, and no arbitration between us and a manufacturer while you wait."
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ["You call us", "The same number that is on this page and on your quote. Not a portal and not a franchise dispatcher."],
              ["We diagnose on site", "Controller, power supply, termination or LED. We can tell which because we installed it."],
              ["We fix it under whichever coverage applies", "Manufacturer or our own workmanship. Deciding which one is our job, not yours."],
            ].map(([h, p2], i) => (
              <li key={h} className="relative">
                <span className="u pointer-events-none absolute -top-3 left-0 text-[3.4rem] font-medium leading-none text-foreground/25" aria-hidden>{i + 1}</span>
                <div className="relative pt-8">
                  <h3 className="text-lg text-foreground">{h}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{p2}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
            <h3 className="text-xl text-foreground">Coverage transfers with the house</h3>
            <p className="mt-2.5 max-w-[74ch] text-[0.95rem] text-muted-foreground">
              If you sell, the system stays and so does the coverage. Tell us and we will move the record
              to the new owner. It is a small thing that matters at closing, and it is one of the reasons
              a permanent system reads as a building feature rather than as a gadget.
            </p>
          </div>
        </div>
      </section>

      <BandCta title="Read the warranty before you sign." body="We will put the whole thing in writing at the consultation, not after." />
      <PageCta />
    </Shell>
  );
}
