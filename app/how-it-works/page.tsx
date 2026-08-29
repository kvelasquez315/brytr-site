import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { InstallDaySequence } from "@/components/sections/install-day";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { ChannelDetail } from "@/components/sections/channel-detail";

import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /how-it-works — WAVE 2, PAGE 1 of the page-by-page pass.
 *
 * What it was: five numbered steps in 3rem ghost numerals — the exact pattern the client
 * called lazy — of which the first three were the consultation described for a second
 * time, and /free-design-consultation is now a thousand words on that hour by itself. Each
 * step was illustrated with the same drawn house at a different massing, one quote panel
 * carried invented specifics ("244 ft", "11 corners mitered"), the hero had no photograph,
 * and the page closed on a six-card grid plus two stacked closers.
 *
 * So the scope changed rather than the layout. The consultation page owns the hour before
 * you buy. This page owns INSTALL DAY, and nothing else — which is what somebody reading
 * "how it works" after they have already had the quote actually wants.
 *
 * The centerpiece is the same eight inches of fascia board four times, bare to lit, with
 * amber in the last frame only, because three quarters of install day happens with the
 * system dark. Then the work that is not visible in that drawing, then where we differ
 * from the trade as a comparison rather than as six cards, then the two bookends.
 *
 * Archetype: home hero → four-frame technical sequence → invisible-work list → us-against-
 * the-trade comparison → bookend two-up. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: "How It Works: Install Day, Start to Finish",
  description:
    "What happens on a Brytr install day in Omaha: the fascia measured off the ladder, the channel screwed on and sealed as we go, then every scene walked with you before we leave.",
  alternates: { canonical: "/how-it-works" },
};
const trail = [{ name: "Home", href: "/" }, { name: "How it works", href: "/how-it-works" }];

/* THE WORK THAT IS NOT IN THE DRAWING. Everything above the fascia line is easy to
 * picture; this is the half of the day nobody thinks about until it goes wrong.
 *
 * TWO OF THESE CHANGED HANDS, 29 Aug 2026. "Where the driver lives... Picked with you" and
 * "Zones wired the way you asked" both described a decision as the customer's, and Brytr makes
 * both of them. And "Miters at every transition" is gone with the rest of the mitre claim. */
const invisible: [string, string][] = [
  [
    "Where the driver goes",
    "We site it somewhere serviceable and dry, and not the middle of your garage wall. You will know where it is before we leave.",
  ],
  [
    "How the wire gets there",
    "Inside the channel where it can be, then the shortest concealed route. Nothing crosses a soffit in the open.",
  ],
  [
    "How the run is zoned",
    "We work the zoning out at the measure and wire it on install day. Adding one afterwards is a wiring job, not an app setting.",
  ],
  [
    "The ladder, and your landscaping",
    "Standoffs and pads, beds walked around, gutters not leaned on.",
  ],
  [
    "The clean-up nobody credits",
    "Offcuts, screws, packaging and the aluminum filings from every cut, off site with us.",
  ],
];

/* WHERE WE DIFFER. Stated as a comparison, because "we care about quality" is what
 * everybody says and the only way to make it mean anything is to name the alternative.
 *
 * TWO ROWS DELETED 29 Aug 2026, and deleted rather than reworded for the same reason the
 * covenant row went: this component pairs a claim about us against a claim about the trade, and
 * a pair where our half is false is not repaired by softening theirs.
 *
 *   Corners are cut, not bent   "Mitered on the angle at every gable, dormer, bay and valley."
 *                               Brytr does not miter corners. The row was also attacking the
 *                               trade for doing the thing we do.
 *   The curb check in daylight  "We stand where your neighbors stand, at noon, and look at the
 *                               eave line. If you can pick the channel out, we have not
 *                               finished." Not true, and it was the strongest promise on the
 *                               page.
 *
 * One row was added to replace them, and it is the only differentiator on this page that
 * nothing else was claiming: one controller and one app across every fixture type. */
const differences: { h: string; us: string; trade: string }[] = [
  {
    /* WAS: "We come back in the evening, put a powered sample on your actual elevation, and change
       color on it while you watch." An after-dark return visit with a powered demo rig, which is a
       second appointment nobody at Brytr has committed to. Then "against your own fascia color"
       came out too, 29 Aug 2026, because it read as the colour-matching claim. */
    h: "The design happens on your property",
    us: "Measured and designed standing on your own driveway, against your own elevation and your own roof shape.",
    trade: "Quoted from the driveway at two in the afternoon, off a photograph and a rough count.",
  },
  {
    h: "Sealant goes on as the screw goes in",
    us: "Every penetration sealed at the moment it is made, rather than bridged over later.",
    trade: "A pass along the whole run at the end of the day, bridging holes that have already taken dust.",
  },
  {
    h: "One controller, one app",
    us: "Roofline, soffit, landscape and anything over the patio all answer to the same app, because they go in on the same system.",
    trade: "The roofline on one app and the landscape lighting on another, or on a plug by the back door.",
  },
  {
    h: "The scene library is built with you",
    us: "Your everyday setting chosen first, then the scenes you actually asked for, saved with you holding the phone.",
    trade: "Handed over with the factory presets and an app nobody opens twice.",
  },
  /* THE COVENANT ROW IS GONE, both halves of it, 27 Aug 2026.
   *
   * "We pull the rules for your neighborhood, read them, and file the submission ourselves" is an
   * HOA administration service nobody at Brytr has said they provide. Paired against it, "Discovered
   * after the board says no, with a deposit already paid" asserted both how competitors bill and
   * that they get it wrong.
   *
   * The row is removed rather than half-rewritten because this component pairs a claim about us
   * against a claim about the trade, and a pair where one side is invented is not repaired by
   * softening the other. The same HOA claim survives in content/faqs.ts and on the areas pages -
   * it is on the list, it is not pricing, and it is not fixed here.
   */
];

export default function HowItWorks() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-gable-detail.jpg"
        photoAlt="Close view of two Omaha gables with the channel following the rake line to the peak, one gable red and one blue"
        objectPosition="50% 30%"
        /* WAS "All of it happens to your fascia board.", with a lede about "the eight inches
          * between your shingles and your gutter". The client's punch list: "Not sure what this
          * means." A headline that has to be decoded is not a headline. */
        h1="What actually happens on install day."
        lede="Permanent lighting is a carpentry job with an electrical job inside it. Most of what decides whether you still like it in five years is settled at the roof edge, on the day the van turns up."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/how-it-works"]} ground="card" />


      {/* ── THE FASCIA, FOUR TIMES ──
        * The centerpiece. Same board, four states, amber in the last one only. */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead
            onDark
            title="The same eight inches of fascia, four times through the day."
          />
          <div className="mt-10"><InstallDaySequence /></div>
          <p className="mt-7 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
            Drawn to what we actually install: the channel into the fascia board, the conductor inside
            the channel, the diffuser facing down.{" "}
            <Link
              href="/services/permanent-roofline-lighting"
              className="text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              The same join, finished, in more detail
            </Link>.
          </p>
        </div>
      </section>

      {/* ── THE HALF OF THE DAY THAT IS NOT IN THE DRAWING ── */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[40fr_60fr] lg:gap-14">
          <div>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              What is not in the drawing.
            </h2>
            <div className="prose-body mt-6 space-y-4">
            {/* ONE PARAGRAPH. rules.md bans a second body paragraph stacked under a heading, and the
              * measured count was twelve of these on one service page and fifteen on a city page.
              * Kept whichever of the two carried the claim rather than the run-up to it. */}
              <p className="text-lg text-foreground">
                The channel is the easy part. Five other decisions get made on your property that day,
                and every one of them is a thing you would only notice if somebody got it wrong.
              </p>
            </div>
            <div className="mt-7"><TextLink href="/about">Who is actually on your roof</TextLink></div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {invisible.map(([h, p]) => (
              <li key={h} className="py-5">
                <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THE DAY, PHOTOGRAPHED ──
        * Everything above this on this page is a measured drawing. Drawings are the right tool
        * for explaining a fixing detail and the wrong one for answering "what will my Tuesday
        * be like" — so the drawings stay and these three sit under them. Nothing is staged: two
        * of them are mid-install and the third is the walkthrough at the end of it. */}
      <PhotoStrip
        title="Drawings explain the detail. This is the day."
        lede="One crew and a walkthrough of every scene before anybody leaves."
        shots={[
          { photo: "installDayGarage", caption: "Morning. Van open, roofline measured, nothing on the house yet." },
          { photo: "installDayPavilion", caption: "A run going on to a poolside pavilion. Anything with a structure to fasten to at both ends will take one." },
          { photo: "walkthroughDusk", caption: "On your lawn, with every scene switched through in front of you." },
        ]}
        cols={3}
        ground="raise"
      />

      {/* ── US AGAINST THE TRADE ──
        * Four claims, each with the alternative named. "We care about quality"
        * means nothing until you say what the other option looks like. The covenant row, the mitre
        * row and the curb-check row all came out - see the note on `differences`. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="What is not standard in this trade."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden border-b border-border bg-primary px-6 py-4 lg:grid lg:grid-cols-[30fr_35fr_35fr] lg:gap-8">
              <p className="label text-on-dark-muted">The step</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                How we do it
              </p>
              <p className="label text-on-dark-muted">The usual way</p>
            </div>
            <ul className="divide-y divide-border">
              {differences.map((d) => (
                <li key={d.h} className="grid gap-3 px-6 py-5 lg:grid-cols-[30fr_35fr_35fr] lg:gap-8">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{d.h}</h3>
                  <div>
                    <p className="label mb-1.5 text-accent-ink lg:hidden">How we do it</p>
                    <p className="text-[0.95rem] leading-relaxed text-foreground">{d.us}</p>
                  </div>
                  <div>
                    <p className="label mb-1.5 text-muted-foreground lg:hidden">The usual way</p>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{d.trade}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            The right-hand column describes practices that are common in this trade and that we have
            chosen not to use. It is not a claim about any particular company.
          </p>
        </div>
      </section>

      {/* ── THE TWO BOOKENDS ──
        * Everything before the van and everything after it, so the page stays
        * about install day without pretending the day is the whole relationship. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="What happens before the van, and after it."
          />

          {/* THE EAVE SECTION, moved here from the home page. It was in a tall column there and sat
            * letterboxed; this page is the one that exists to explain what it draws, and here it
            * gets the full shell width. Inside the existing section rather than as a new one, so
            * scripts/section-rhythm.mjs sees no new ground. */}
          <div className="mt-10 overflow-hidden rounded-lg ring-1 ring-on-dark/10">
            <ChannelDetail className="block w-full" />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">Before</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                One visit and one piece of paper. That is the whole of it.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["The consultation", "About an hour, and no charge for the visit. It has its own page because it is the part people ask about most."],
                  ["The written quote", "One number for the whole scope, itemized by elevation, hardware and zone, unchanged on install day."],
                  ["The covenant", "Worth reading the lighting clause before anything is ordered, if your neighborhood has one."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink onDark href="/free-design-consultation">What the hour looks like</TextLink>
              </div>
            </article>

            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">After</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                What happens after we leave, which is the part you will actually judge us on.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["A section goes dark", "Almost always a driver or one bad connection rather than the whole run. We come out and fix that section."],
                  ["You want another zone", "The back elevation, the pergola, the beds. It ties into the controller you already have."],
                  ["Something we installed fails", "You call the number on this site and one of the two owners answers it."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <PageCta variant="phone" photos={valueProps["/how-it-works"].photos} omit={["/how-it-works"]} />
    </Shell>
  );
}
