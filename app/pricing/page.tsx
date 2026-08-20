import type { Metadata } from "next";
import Link from "next/link";
import { pricingFaqs } from "@/content/faqs";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { PageHero, PageCta, BandCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Permanent Lighting Cost and Financing",
  description: "How permanent outdoor lighting is priced in Omaha: by linear foot of roofline plus complexity. Bid types, what drives the number, and financing.",
  alternates: { canonical: "/pricing" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }];

const bids = [
  { spec: "Roofline, single story", a: "By linear foot", b: "Simplest run. Fewest corners, best access." },
  { spec: "Roofline, two story", a: "By linear foot, higher rate", b: "Access and time drive the difference, not material." },
  { spec: "Pergola or patio cover", a: "By span", b: "Overhead run on an existing structure." },
  { spec: "Gazebo", a: "By span", b: "Curved or multi-facet spans take longer." },
  { spec: "Landscape", a: "Per fixture", b: "Path, uplight and bed wash fixtures plus buried runs." },
  { spec: "Hardscape", a: "Per linear foot of wall", b: "Under-cap and riser work, retrofit or during masonry." },
  { spec: "Custom", a: "By quote", b: "Turrets, bays and anything that needs a drawing first." },
];

export default function Pricing() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(pricingFaqs)} />
      <PageHero
        eyebrow="Pricing"
        h1="What permanent lighting actually costs."
        lede="It is priced by linear foot of roofline plus complexity, which is why a written number needs an on-site measure. We would rather publish how the pricing works than make you call to find out."
        trail={trail}
        stats={[["150 to 400", "typical linear ft"], ["1 day", "typical install"], ["Financing", "on approved credit"]]}
      />

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Honest note"
            title="We are not publishing a headline price."
            lede="Any per-foot figure on a website is either the cheapest possible job or a number that changes on install day. Neither helps you."
          />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {[
              ["What we will tell you", "Exactly how the pricing is built, what moves it, and what the real range is for a house like yours. On the phone, before we come out.",
               ["The per-foot basis for both tiers", "The range for your roughly measured roofline", "What each add-on costs"]],
              ["What we will not do", "Quote a firm number without measuring, or advertise a monthly payment that only applies to a perfect credit file.",
               ["No firm price without a site measure", "No teaser financing rate", "No pressure to decide on the visit"]],
              ["What you get in writing", "A single number for the whole scope, itemized by tier and zone, with nothing added on install day.",
               ["Linear feet by elevation", "Tier, zones and corner count", "Both warranty terms stated"]],
            ].map(([h, p2, list]) => (
              <article key={h as string} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <h3 className="text-lg text-foreground">{h as string}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{p2 as string}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {(list as string[]).map((x) => <Check key={x}>{x}</Check>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell">
          <SectionHead title="What actually moves the number, in order." />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Linear feet", "How much roofline you are lighting. The single biggest factor."],
              ["Story count", "A two story costs more per foot than a ranch. Access, not material."],
              ["Roof complexity", "Dormers, valleys, turrets and bays each add mitered corners."],
              ["Zones", "How many elevations need independent control."],
              ["Tier", "Signature or Basic, plus any landscape or bistro added on the same visit."],
            ].map(([h, p], i) => (
              <li key={h} className="relative">
                <span className="u pointer-events-none absolute -top-2 left-0 text-[3rem] font-medium leading-none text-foreground/25" aria-hidden>{i + 1}</span>
                <div className="relative pt-7">
                  <h3 className="text-base text-foreground">{h}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead title="How each kind of work is priced." />
          <div className="mt-10"><SpecTable onDark={false} caption="How each bid type is priced" rows={bids} headA="Priced by" headB="Notes" /></div>
        </div>
      </section>

      <section className="section bg-primary">
        <div className="shell grid gap-10 lg:grid-cols-[48fr_52fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="Financing" title="Spread it out, or pay it once." />
            <p className="mt-5 text-lg text-on-dark/85">
              Financing is available through our lending partner on approved credit. Terms come from them,
              not from us, and we will show you the actual numbers at the consultation.
            </p>
            <ul className="mt-7 space-y-3">
              <Check onDark>No money down options for approved applicants</Check>
              <Check onDark>Approval usually while we are still at the table</Check>
              <Check onDark>Pay in full is always an option and is always cheaper</Check>
              <Check onDark>Deposit on scheduling, balance at completion</Check>
            </ul>
            <p className="mt-7 text-sm text-on-dark-muted">
              We are not a lender and this is not a credit offer. Rates, terms and eligibility are set by
              the finance provider and depend on your circumstances.
            </p>
          </div>
          <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
            <h3 className="text-xl text-on-dark">What is in the written quote</h3>
            <p className="mt-3 text-[0.95rem] text-on-dark-muted">
              One number for the whole scope, and these lines behind it so you can see what you are
              paying for.
            </p>
            <dl className="mt-6 divide-y divide-on-dark/12 border-y border-on-dark/12">
              {[
                ["Linear feet measured", "Front, sides and any rear elevation, itemized"],
                ["System tier", "Signature or Basic, named on the quote"],
                ["Zones", "How many independently controlled areas"],
                ["Corners and transitions", "Counted, because they drive labor"],
                ["Add-ons", "Landscape, hardscape or bistro, priced separately"],
                ["Warranty terms", "Manufacturer and workmanship, both stated"],
              ].map(([k, v]) => (
                <div key={k} className="py-3.5">
                  <dt className="text-sm font-semibold text-on-dark">{k}</dt>
                  <dd className="mt-0.5 text-sm text-on-dark-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-on-dark-muted">
              Nothing is added on install day that was not on the quote you signed.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="Pricing questions" title="The ones we get most." />
          <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-14">
            <Faq items={pricingFaqs} />
            <div className="space-y-5">
              <div className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
                <h3 className="text-lg text-on-dark">A worked example</h3>
                <p className="mt-2.5 text-sm text-on-dark-muted">
                  Two-story with a front gable, the shape we quote most often.
                </p>
                <dl className="mt-5 divide-y divide-on-dark/12 border-y border-on-dark/12">
                  {[["Roofline measured", "244 linear ft"], ["Elevations lit", "Front and both sides"],
                    ["Zones", "3"], ["Tier", "Signature"], ["Install", "1 day"], ["Landscape added", "4 uplights"]].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-on-dark-muted">{k}</dt>
                      <dd className="u text-sm font-medium text-on-dark">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="u mt-5 text-xs text-on-dark-muted">
                  Your number depends on your own measure. This is the shape of a quote, not a price.
                </p>
              </div>
              <div className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <p className="label text-2xs uppercase tracking-[0.14em] text-accent-ink">Also worth reading</p>
                <ul className="mt-4 space-y-3">
                  {[["Compare all 10 brands", "/compare"], ["What the warranty covers", "/warranty"],
                    ["The five-step process", "/how-it-works"], ["Are permanent lights worth it?", "/blog/are-permanent-christmas-lights-worth-it"]].map(([t, h]) => (
                    <li key={h}><Link href={h} className="text-sm font-semibold text-foreground hover:text-accent-deep">{t}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BandCta title="Get a real number for your house." body="On-site measure, written quote, no obligation." />
      <PageCta />
    </Shell>
  );
}
