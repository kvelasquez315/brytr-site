import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";

import { Jsonld, breadcrumb } from "@/lib/schema";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /about — WAVE 2, PAGE 2 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a drawn elevation standing in for a picture of
 * the company, "5.0 from 177 reviews" in the hero (the profile says 196, and the figure
 * was hardcoded in two places on this page alone), the same numbers printed twice — once
 * as hero stats and once as a band forty lines later — two portrait slots with no
 * portraits in them, a four-card grid of one-line commitments, the eighteen-city rack that
 * ten other templates also carried, and two closers stacked at the bottom.
 *
 * What it is now. An about page's only real job is to answer "why should this company get
 * my money rather than the other three quotes". Brytr's honest answer is structural: the
 * business is deliberately set up to make less money in four specific ways, and each one
 * is checkable. So the centerpiece is WHAT WE MAKE LESS MONEY ON — the decision, what it
 * costs us, and why it stands anyway. Nothing on it is a feeling.
 *
 * The founder cards are landscape monogram panels rather than empty 4/5 portrait boxes,
 * because an about page with two grey rectangles where the faces go is worse than an about
 * page with no faces. Portraits are on the shot list; when they land, these become photos
 * and the layout does not move.
 *
 * Archetype: home hero → thesis split with the Haven lineup → six-card cost ledger →
 * founder two-up → sourced numbers band. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  /* `absolute` bypasses the root layout's "%s | Brytr Co" template — see the note on
   * /contact. The brand is already in the title, so the template would repeat it. */
  title: { absolute: "About Brytr Co | Family Owned, Omaha" },
  description:
    "The whole Haven line rather than one piece of it, the same crew from the measure to the handover, and more than one brand on the truck. Omaha metro.",
  alternates: { canonical: "/about" },
};
const trail = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];

/* THE CENTERPIECE. Structural decisions, each one costing something specific. The
 * chip is the taxonomy — margin, time, or the sale itself — because "we put customers
 * first" is a sentence and "this one costs us the sale" is a fact you can check. */
const costs: { chip: string; h: string; p: string; cost: string }[] = [
  {
    chip: "Costs us margin",
    h: "More than one brand on the truck.",
    p: "Almost every permanent lighting company in this metro is a dealer for a single manufacturer, which is a normal way to run the business and means the recommendation is settled before anyone looks at your house. We lead with Haven, we install every line of it, and where a house does not call for it we say so and quote what it does.",
    cost: "Two sets of stock, two sets of training, two warranty processes to keep straight.",
  },
  {
    chip: "Costs us the sale",
    h: "We will tell you the cheaper one is right.",
    p: "A simple single-story roofline with two elevations and no color ambition does not need the most expensive hardware we carry, and we say so at the table rather than after you have signed. Sometimes that is a worse day for us and a better system for you.",
    cost: "The difference between the two quotes, on every house where the cheaper answer is the right one.",
  },
  {
    chip: "Costs us margin",
    h: "The same crew, measure to handover.",
    p: "Permanent lighting is fastened into your fascia board and sealed, and the failures in this trade are workmanship far more often than product. The people who measure your house are the people who fit it, and the people who come back to it, which is the only thing that makes any of the rest of this checkable.",
    cost: "Training and a slower schedule instead of whoever is free that week.",
  },
  {
    chip: "Costs us a day",
    h: "The last hour is unbilled.",
    p: "The daylight curb check and the scene walkthrough after dark are the two steps most installers skip, and they are the two that catch problems. They are also the reason a crew is on your property at dusk rather than on the next job.",
    cost: "Roughly an hour of a two-person crew, on every install, billed to nobody.",
  },
  {
    chip: "Costs us the sale",
    h: "No expiring price, no follow-up sequence.",
    p: "The number on your quote is the number next month. There is no signing bonus, no discount for deciding tonight, and if you go quiet after the visit, so do we. Every one of those is a tool that measurably increases close rate and every one of them is a tool we do not use.",
    cost: "Deals that would have closed under pressure, and do not.",
  },
];

export default function About() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-ranch-blue-white.jpg"
        photoAlt="A single-story Omaha home in October with the roofline, front beds, rock steps and walk all lit, the entry gable set to blue"
        objectPosition="50% 42%"
        h1="Built by the two people who show up on the roof."
        lede="Brytr exists because every permanent lighting quote in this metro came from somebody selling exactly one brand and calling it the only good option. We carry two and we run our own crews, from the measure to the handover."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/about"]} ground="muted" />


      {/* ── THE THESIS ──
        * The argument on the left, the thing it produces on the right. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
          <div>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              More than one brand, on purpose.
            </h2>
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                Zac and Sam had both been on the other side of this. A homeowner asks three companies
                for a quote, gets three quotes for three different single-brand systems, and has no way
                to tell whether the differences matter or whether they are just what each company
                happens to sell.
              </p>
              <p className="text-base text-muted-foreground">
                So Brytr was set up to carry more than one from the start. Haven Lighting is what we
                lead with and we install every line of it, from the roofline channel down to the bed
                fixtures. Where a simpler house does not call for it, we say so and quote what it does
                call for. The quote names the hardware, on the page, rather than leaving you to work
                out what you are buying.
              </p>
              <p className="text-base text-muted-foreground">
                That one decision is why the rest of the company looks the way it does. If your
                recommendation is not pre-decided, you have to be able to defend it, which means
                measuring properly, installing it yourself, and being reachable in year three.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink href="/lighting-systems">The systems we carry</TextLink>
              <TextLink href="/compare">How they compare</TextLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
              <p className="label flex items-center gap-3 text-foreground">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                The Haven lineup
              </p>
              <p className="text-xs text-muted-foreground">Named on the quote, not implied</p>
            </div>
            <ul className="divide-y divide-border">
              {[
                {
                  t: "Haven Evolution",
                  s: "Roofline",
                  when: "The channel routed into the eave. A dedicated warm white diode, so warm white is real rather than mixed.",
                },
                {
                  t: "Haven Q Series",
                  s: "Soffit",
                  when: "Fixtures inside the overhang, washing down the face of the house rather than along the roofline.",
                },
                {
                  t: "Haven 9 Series",
                  s: "Landscape",
                  when: "Path lights, uplights and bed washers, on the same controller as the roofline.",
                },
                {
                  t: "Haven X Bistro",
                  s: "Overhead",
                  when: "Permanent bistro runs for pergolas and patio covers. Rated cable, not a seasonal string.",
                },
              ].map((x) => (
                <li key={x.t} className="px-6 py-5">
                  <p className="label text-accent-ink">{x.s}</p>
                  <h3 className="mt-1.5 font-display text-[1.15rem] font-bold text-foreground">{x.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{x.when}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-border bg-muted px-6 py-5 text-sm leading-relaxed text-muted-foreground">
              All of it runs from the one controller and the one app, which is why most people add the
              second and the third thing a season later rather than buying everything at once.{" "}
              <Link href="/services" className="font-semibold text-foreground hover:text-accent-deep">
                Everything we install
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE MAKE LESS MONEY ON ──
        * The centerpiece. Every claim on an about page is worthless unless it
        * costs the company something, so each one here says what. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="Decisions that make us less money."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {costs.map((c) => (
              <article
                key={c.h}
                className="flex flex-col rounded-lg bg-raise p-6 ring-1 ring-on-dark/10"
              >
                <p className="u inline-flex w-fit rounded-sm border border-accent/45 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-accent">
                  {c.chip}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-on-dark">{c.h}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">{c.p}</p>
                <div className="mt-5 border-t border-on-dark/12 pt-4">
                  <p className="label text-on-dark-muted">What it costs</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-on-dark/80">{c.cost}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZAC AND SAM ──
        * Landscape monogram panels, not empty portrait slots. There is still no photograph of
        * either of them: the library has one frame of somebody in a Brytr shirt and we cannot
        * tell from the frame who it is, and captioning it with a founder's name because it is
        * on the about page would be inventing a fact. So the monograms stay, the slot stays
        * open on /recent-projects, and when portraits arrive they drop into this same box. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Zac and Sam."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {site.founders.map((f) => (
              <article
                key={f.name}
                className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <div className="grid grid-cols-[7.5rem_1fr] items-stretch">
                  {/* the monogram, on the channel tile's own treatment */}
                  <div className="relative flex items-end bg-primary p-5">
                    <span className="u block text-[2.6rem] font-medium leading-none text-accent" aria-hidden>
                      {f.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground">{f.name}</h3>
                    <p className="label mt-1 text-accent-ink">{f.role}</p>
                    <ul className="mt-4 divide-y divide-border border-t border-border">
                      {f.handles.map((h) => (
                        <li key={h} className="py-2.5 text-[0.95rem] text-muted-foreground">{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Both of them are named in the reviews rather than in a bio, which is the version worth
            reading.{" "}
            <Link href="/reviews" className="font-semibold text-foreground hover:text-accent-deep">
              What customers say about working with them
            </Link>.
          </p>
        </div>
      </section>

      {/* ── THE WORK ITSELF ──
        * An about page is a page of assertions about character. Three photographs of the work
        * do more for that than another paragraph would, and the middle one has a person in it,
        * which every one of the previous four sections was talking about in the abstract. */}
      <PhotoStrip
        title="What the two of us are actually selling."
        lede="Not a product line. A crew that turns up, a channel fixed into fascia rather than stapled to a shingle, and a run that still holds a straight line in year eight."
        shots={[
          { photo: "crewRoofFascia", caption: "On the roof. The same crew from the measure to the handover, and the same crew if anything ever needs looking at." },
          { photo: "installDayGarage", caption: "A working day, in daylight. The design happens after dark; the install happens when we can see the fixings." },
          { photo: "walkthroughDusk", caption: "The handover. We do not leave until you have stood on your own lawn and looked at it lit." },
        ]}
        cols={3}
        ground="background"
      />

      {/* ── THE NUMBERS, WITH THEIR SOURCES ──
        * Printed once on this page, not twice, and each one says where it came from. */}
      <section className="bg-raise">
        <div className="shell py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-14">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
              {[
                ["1.2M", "lights installed locally", "Brytr's own count"],
                [reviewProof.average, `from ${reviewProof.count} reviews`, `${reviewProof.platform}, ${reviewProof.checked}`],
                ["2", "brands stocked", "Haven and Jellyfish"],
                ["12", "towns we install in", "The Omaha metro and Council Bluffs"],
              ].map(([f, l, src]) => (
                <div key={l}>
                  <dt className="u text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-none text-on-dark">{f}</dt>
                  <dd className="mt-2.5 text-sm leading-snug text-on-dark-muted">{l}</dd>
                  <dd className="label mt-2 text-on-dark-muted/80">{src}</dd>
                </div>
              ))}
            </dl>

            <address className="rounded-lg bg-primary p-7 not-italic ring-1 ring-on-dark/10">
              <p className="label text-accent">The shop</p>
              <p className="mt-2.5 font-display text-xl font-bold text-on-dark">{site.name}</p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                A yard and a warehouse rather than a showroom. The useful visit is us coming to you.
                We drive the Omaha metro and Council Bluffs.
              </p>
              <div className="mt-5 border-t border-on-dark/12 pt-4">
                <TextLink onDark href="/service-areas">Every town we drive to</TextLink>
              </div>
            </address>
          </div>
        </div>
      </section>

      <PageCta variant="phone" omit={["/about"]} />
    </Shell>
  );
}
