import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { pricingFaqs } from "@/content/faqs";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { PageHero, PageCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";

/* /pricing — WAVE 1, PAGE 2 of the page-by-page pass.
 *
 * What it was: the shared hero with a stat row that quoted "150 to 400 typical linear ft"
 * (a figure about Brytr's own jobs that nobody at Brytr has confirmed), a ghost-numeral
 * 1-2-3-4-5 row — the exact pattern the client called lazy on the home page — three
 * equally-weighted cards, and two closers stacked at the bottom.
 *
 * What it is now. The centerpiece is THE FIVE YEAR LEDGER: five years across, two ways of
 * getting lights on a house down the side, and what actually happens in each year in the
 * cells. It counts EVENTS, not dollars, because we have no permission to publish a price
 * and a made-up five-year cost would be worse than no table at all. One install in Year 1
 * with the channel lit above it; ten ladder trips on the other row, and nothing lit,
 * because the amber device is our product and it does not get lent to somebody else's
 * staple gun.
 *
 * The driver list is now the arithmetic instead of a countdown: linear feet × story rate
 * + corners + zones + tier = one number, drawn as an equation with the operators between
 * the terms. Same information, no numerals-as-decoration.
 *
 * Archetype: home hero → two-up argument → dark ledger → equation strip → spec table →
 * dark split → FAQ with an aside. Closer: one, the phone band, because the hero has the form.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Cost and Financing",
  description: "How permanent outdoor lighting is priced in Omaha: by linear foot of roofline plus complexity. Bid types, what drives the number, and financing.",
  alternates: { canonical: "/pricing" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }];

/* THE FIVE YEAR LEDGER. Events, not dollars. Every cell is something that either happens
 * or does not happen, which is a thing we can state without inventing a number. */
const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];

const bids = [
  { spec: "Roofline, single story", a: "By linear foot", b: "Simplest run. Fewest corners, best access." },
  { spec: "Roofline, two story", a: "By linear foot, higher rate", b: "Access and time drive the difference, not material." },
  { spec: "Pergola or patio cover", a: "By span", b: "Overhead run on an existing structure." },
  { spec: "Gazebo", a: "By span", b: "Curved or multi-facet spans take longer." },
  { spec: "Landscape", a: "Per fixture", b: "Path, uplight and bed wash fixtures plus buried runs." },
  { spec: "Hardscape", a: "Per linear foot of wall", b: "Under-cap and riser work, retrofit or during masonry." },
  { spec: "Custom", a: "By quote", b: "Turrets, bays and anything that needs a drawing first." },
];

/* THE ARITHMETIC. The order is the order of influence, and the operator in front of each
 * term is how it actually enters the number — feet times a rate, then additions. */
const terms: { op?: string; h: string; p: string }[] = [
  { h: "Linear feet", p: "Measured on site, elevation by elevation. The single biggest term, and the reason a firm number needs a visit." },
  { op: "×", h: "Story rate", p: "A two-story costs more per foot than a ranch. That is access and time on a ladder, not more material." },
  { op: "+", h: "Corners", p: "Every dormer, valley, turret and bay is another mitered transition, cut and sealed by hand." },
  { op: "+", h: "Zones", p: "How many elevations you want to control on their own — front only, front and sides, or the whole envelope." },
  { op: "+", h: "Tier", p: "Signature or Basic, plus any landscape, hardscape or bistro run added on the same visit." },
];

export default function Pricing() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(pricingFaqs)} />

      <PageHero
        photo="/img/g-blue-elevation.jpg"
        photoAlt="A brick two-story in Omaha with three gables and the whole front roofline lit, blue with the gables picked out in pink"
        objectPosition="50% 55%"
        eyebrow="Pricing"
        h1="What permanent lighting actually costs."
        lede="It is priced by linear foot of roofline plus complexity, which is why a real number needs somebody on a ladder with a wheel. We would rather publish how the pricing is built than make you call to find out."
        trail={trail}
        footnote={
          <>
            Three gables and two elevations lit on this one. The shape of a house is most of the
            difference between two quotes with the same footage on them.
          </>
        }
      />

      {/* ── THE HONEST NOTE ──
        * First thing after the hero, because "why isn't there a price on
        * this page" is the reason people leave it. */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            <p className="eyebrow">Straight answer</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              We are not publishing a headline price.
            </h2>
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                Any per-foot figure on a website is one of two things: the cheapest possible job on the
                simplest possible house, or a number that changes on install day. Neither one helps you
                decide anything.
              </p>
              <p className="text-base text-muted-foreground">
                What does help is knowing exactly how the number is built, what moves it, and roughly
                where a house your shape lands — and you can have all three on the phone, before anybody
                drives out. That is the trade this page is making.
              </p>
            </div>
            <div className="mt-7"><TextLink href="/free-design-consultation">Book the on-site measure</TextLink></div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-5">
            {[
              {
                h: "On the phone, before we come out",
                l: [
                  ["The per-foot basis", "For Signature and for Basic, both, so you can do your own arithmetic."],
                  ["A range for your roofline", "Pace the front and read us the number off your phone map."],
                  ["What each add-on costs", "Landscape per fixture, bistro per span, hardscape per foot."],
                  ["Whether your covenant is a problem", "We pull the rules, read them, and file the submission ourselves."],
                  ["When we could actually get there", "The real week, not “soon”."],
                ],
                foot: "That is one phone call, and it costs you nothing.",
              },
              {
                h: "Things we will not do",
                l: [
                  ["Quote firm without measuring", "A number given over the phone is a guess wearing a suit."],
                  ["Advertise a monthly payment", "Yours depends on your credit file, not on our headline."],
                  ["Hold a price hostage to today", "The number on your sheet is the number next month."],
                  ["Add a line on install day", "If it was not on the signed quote, it is not on the invoice."],
                  ["Sell you the tier you do not need", "Basic is a real answer and we will say so."],
                ],
                foot: "None of this is generosity. It is just how the quote is built.",
              },
            ].map((c) => (
              <div key={c.h} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  {c.h}
                </p>
                <ul className="mt-5 flex-1 divide-y divide-border border-t border-border">
                  {c.l.map(([h, p2]) => (
                    <li key={h} className="py-3.5">
                      <p className="font-display text-[0.95rem] font-bold leading-snug text-foreground">{h}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p2}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.foot}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FIVE YEAR LEDGER ──
        * The centerpiece. Counts events, states its assumptions, invents nothing. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="The real comparison"
            /* Was "Five years, side by side." The table below has five year rows, so the
              * heading was counting the list under it — the rule the client has corrected me on
              * more than once. The span is still stated in the lede and in the table caption,
              * where a number is information rather than a headline. */
            title="Year by year, side by side."
            lede="The question is almost never “what does this cost”. It is “what does this cost instead of what I am doing now”. So here are five years of both, counted in what actually happens."
          />

          <div className="mt-10 overflow-x-auto rounded-lg ring-1 ring-on-dark/12">
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <caption className="sr-only">
                Five years of a permanent install compared with hanging lights every season, counted in events
              </caption>
              <thead>
                <tr className="bg-raise">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">Which way</th>
                  {years.map((y) => (
                    <th key={y} scope="col" className="u px-5 py-4 text-sm font-semibold text-on-dark">{y}</th>
                  ))}
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">Over five years</th>
                </tr>
              </thead>
              <tbody>
                {/* OURS — the channel is lit in Year 1 and nowhere else, because that is
                  * the whole argument. Amber only where light comes out. */}
                <tr className="bg-on-dark/[0.03]">
                  <th scope="row" className="px-5 py-5 align-top">
                    <span className="block font-display text-[1.05rem] font-bold text-on-dark">Installed once</span>
                    <span className="mt-1 block text-xs text-on-dark-muted">Channel routed into the building</span>
                  </th>
                  <td className="px-5 py-5 align-top">
                    <div className="run-panel relative pt-4" data-lit="5">
                      <span className="run-seg" aria-hidden />
                      <span className="block font-display text-[0.95rem] font-bold text-on-dark">Install</span>
                      <span className="mt-1 block text-xs leading-relaxed text-on-dark-muted">
                        One day. Ladders up once, mitered, sealed, scenes saved with you.
                      </span>
                    </div>
                  </td>
                  {years.slice(1).map((y) => (
                    <td key={y} className="px-5 py-5 align-top">
                      <div className="border-t border-on-dark/12 pt-4">
                        <span className="u block text-lg font-medium text-on-dark/40" aria-hidden>—</span>
                        <span className="mt-1 block text-xs leading-relaxed text-on-dark-muted">
                          Nothing goes up. Nothing comes down.
                        </span>
                      </div>
                    </td>
                  ))}
                  <td className="px-5 py-5 align-top">
                    <div className="border-t border-accent pt-4">
                      <span className="u block text-sm font-medium text-on-dark">1 install</span>
                      <span className="mt-1 block text-xs leading-relaxed text-on-dark-muted">
                        Zero ladder trips after day one. Every night of the year available from the app.
                      </span>
                    </div>
                  </td>
                </tr>

                {/* THEIRS — deliberately unlit. The amber device is the product, and the
                  * product is not what is happening in this row. */}
                <tr className="bg-primary">
                  <th scope="row" className="px-5 py-5 align-top">
                    <span className="block font-display text-[1.05rem] font-bold text-on-dark">Hung every season</span>
                    <span className="mt-1 block text-xs text-on-dark-muted">Bought, rented or hired out</span>
                  </th>
                  {years.map((y) => (
                    <td key={y} className="px-5 py-5 align-top">
                      <div className="border-t border-on-dark/12 pt-4">
                        <span className="flex flex-wrap gap-1.5">
                          {["Up", "Down"].map((e) => (
                            <span
                              key={e}
                              className="u rounded-sm border border-on-dark/25 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-on-dark/75"
                            >
                              {e}
                            </span>
                          ))}
                        </span>
                        <span className="mt-2.5 block text-xs leading-relaxed text-on-dark-muted">
                          Up in November. Down in January, usually in ice.
                        </span>
                      </div>
                    </td>
                  ))}
                  <td className="px-5 py-5 align-top">
                    <div className="border-t border-on-dark/12 pt-4">
                      <span className="u block text-sm font-medium text-on-dark">10 ladder trips</span>
                      <span className="mt-1 block text-xs leading-relaxed text-on-dark-muted">
                        Five Decembers of it, plus somewhere to keep the boxes for the other eleven months.
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-on-dark-muted lg:hidden">
            Swipe the table sideways for the rest of the five years.
          </p>

          {/* the arithmetic that comes straight off the table, and nothing that does not */}
          {/* `ours` decides the colour. All three of these used to be amber, which put the
            * competitor's ladder count — the number this section is arguing AGAINST — in the
            * brand accent at 2rem. Amber is the colour of our own light; it does not get to
            * dress somebody else's row. */}
          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {([
              ["1", "install, in the first week you own it", true],
              ["10", "trips up a ladder on the other row — twice a year, five years", false],
              ["0", "Januaries spent taking anything down", true],
            ] as [string, string, boolean][]).map(([f, l, ours]) => (
              <div key={l} className="rounded-lg bg-raise px-5 py-5 ring-1 ring-on-dark/10">
                <dt className={`u text-[2rem] font-medium leading-none ${ours ? "text-accent" : "text-on-dark"}`}>{f}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
            This table counts events, not dollars, on purpose. Your install price depends on your own
            measure and what hanging costs depends on who you hire, so a five-year figure printed here
            would be a guess about both. Ask us at the consultation and we will put your two numbers
            beside each other on paper.{" "}
            <Link href="/compare" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              Compare the systems we are asked about
            </Link>.
          </p>
        </div>
      </section>

      {/* ── WHAT THE NUMBER BUYS ──
        * This page is a five-year ledger followed by arithmetic followed by a pricing table.
        * It is the most numerate page on the site and it had one photograph on it, at the top.
        * A reader deciding whether four figures is worth it should be able to see the thing
        * they would be buying somewhere in the middle of the argument, not only above it. */}
      <PhotoStrip
        eyebrow="What the number buys"
        title="The same figure, on three different houses."
        lede="Price follows roof geometry rather than square footage, which is why these three cost different amounts and why none of them can be quoted from a satellite photograph."
        shots={pick("pricing", 3)}
        cols={3}
        ground="background"
      />

      {/* ── THE ARITHMETIC ──
        * What used to be a ghost-numeral countdown. Now it is the actual
        * formula, with the operators showing how each term enters. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="How the number is built"
            title="Feet times a rate, then what the house adds."
            lede="In order of how much each one moves the total. Nothing else goes into it — there is no design fee, no travel charge inside the metro and no line for the consultation."
          />

          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {terms.map((t) => (
              <Fragment key={t.h}>
                {t.op && (
                  <div className="flex items-center justify-center lg:w-7">
                    <span className="u font-display text-2xl font-medium leading-none text-accent-ink" aria-hidden>
                      {t.op}
                    </span>
                  </div>
                )}
                <div className="flex-1 rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
                  <h3 className="font-display text-lg font-bold leading-tight text-foreground">{t.h}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.p}</p>
                </div>
              </Fragment>
            ))}
          </div>

          {/* the equals side, given the channel because this is the thing you are buying */}
          <div className="run-panel relative mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2 rounded-lg bg-primary px-6 pb-6 pt-7" data-lit="5">
            <span className="run-seg" aria-hidden />
            <p className="u font-display text-2xl font-medium leading-none text-accent" aria-hidden>=</p>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-bold text-on-dark">One number for the whole scope, in writing.</p>
              <p className="mt-1.5 text-sm text-on-dark-muted">
                Itemized by elevation, tier and zone, signed before we schedule, and unchanged on
                install day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW EACH KIND OF WORK IS PRICED ── */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="Bid types"
            title="Not everything is priced by the foot."
            lede="Roofline is. A pergola is priced by span, landscape by fixture, and a wall by the foot of cap it runs under — because that is how the work actually divides up."
          />
          <div className="mt-10">
            <SpecTable
              onDark={false}
              caption="How each bid type is priced"
              rows={bids}
              headA="Priced by"
              headB="Why"
              source="Every one of these appears as its own line on the quote, so a job with three of them reads as three lines rather than one lump."
            />
          </div>
        </div>
      </section>

      {/* ── FINANCING AND THE QUOTE ITSELF ── */}
      <section className="section bg-primary">
        <div className="shell grid gap-10 lg:grid-cols-[48fr_52fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="Financing" title="Spread it out, or pay it once." />
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              Financing is arranged through a third-party lender rather than by us, so the terms are
              theirs and the paperwork is theirs. What we can do is put the real numbers in front of
              you at the consultation instead of a headline rate you may not qualify for.
            </p>
            <ul className="mt-7 space-y-3">
              <Check onDark>Arranged through a lending partner, not by Brytr</Check>
              <Check onDark>The terms you actually qualify for, shown to you in writing</Check>
              <Check onDark>Paying in full is always an option, and always the cheaper one</Check>
              <Check onDark>No advertised monthly payment, because yours depends on your own file</Check>
            </ul>
            <p className="mt-7 max-w-[62ch] text-sm leading-relaxed text-on-dark-muted">
              We are not a lender and nothing here is a credit offer. Rates, terms and eligibility are
              set by the finance provider and depend on your circumstances.
            </p>
          </div>

          <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
            <h3 className="text-xl text-on-dark">What is on the written quote</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-on-dark-muted">
              One number for the whole scope, and these lines behind it, so you can see which part of
              the job you are paying for.
            </p>
            <dl className="mt-6 divide-y divide-on-dark/12 border-y border-on-dark/12">
              {[
                ["Linear feet measured", "Front, sides and any rear elevation, itemized separately"],
                ["System tier", "Signature or Basic, named on the quote rather than implied"],
                ["Zones", "How many independently controlled areas, and which elevations they cover"],
                ["Corners and transitions", "Counted, because miters are labor and labor is the number"],
                ["Add-ons", "Landscape, hardscape or bistro, each priced on its own line"],
                ["Warranty terms", "Manufacturer and workmanship, both stated in full"],
              ].map(([k, v]) => (
                <div key={k} className="py-3.5">
                  <dt className="text-sm font-semibold text-on-dark">{k}</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-on-dark-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6"><TextLink onDark href="/warranty">What the warranty covers</TextLink></div>
          </div>
        </div>
      </section>

      {/* ── QUESTIONS ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Pricing questions" title="The ones we get most." />
          <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-14">
            <Faq items={pricingFaqs} />
            <div className="space-y-5">
              <div className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
                <h3 className="text-lg text-on-dark">The shape of a quote</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">
                  An example, filled in so you can see which lines appear. The figures are
                  illustrative, not a price for your house.
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
                <p className="u mt-5 text-xs leading-relaxed text-on-dark-muted">
                  Your own measure decides your own number. This is the shape of a quote, not a price.
                </p>
              </div>
              <div className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <p className="label text-accent-ink">Also worth reading</p>
                <ul className="mt-4 space-y-3 border-t border-border pt-4">
                  {[["Compare the brands we are asked about", "/compare"], ["What the warranty covers", "/warranty"],
                    ["What install day looks like", "/how-it-works"], ["Are permanent lights worth it?", "/blog/are-permanent-christmas-lights-worth-it"]].map(([t, h]) => (
                    <li key={h}><Link href={h} className="text-sm font-semibold text-foreground hover:text-accent-deep">{t}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta variant="phone" omit={["/pricing"]} 
        /* The questions section above is bg-muted, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="background"
      />
    </Shell>
  );
}
