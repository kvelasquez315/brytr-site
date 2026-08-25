import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { InstallDaySequence } from "@/components/sections/install-day";
import { PhotoStrip } from "@/components/sections/photo-parts";

import { Jsonld, breadcrumb } from "@/lib/schema";

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
    "What actually happens on a Brytr install day in Omaha: the fascia measured off the ladder, channel fastened and sealed as we go, mitered corners, then the daylight curb check and every scene walked with you after dark.",
  alternates: { canonical: "/how-it-works" },
};
const trail = [{ name: "Home", href: "/" }, { name: "How it works", href: "/how-it-works" }];

/* THE WORK THAT IS NOT IN THE DRAWING. Everything above the fascia line is easy to
 * picture; this is the half of the day nobody thinks about until it goes wrong. */
const invisible: [string, string][] = [
  [
    "Where the driver lives",
    "Every run needs a power supply, and it has to be somewhere serviceable, dry and not in the middle of your garage wall. We pick that with you rather than putting it wherever the wire happens to end.",
  ],
  [
    "How the wire gets there",
    "Inside the channel wherever it can be, then the shortest concealed route to the driver. Nothing crosses a soffit face and nothing is stapled down a downspout.",
  ],
  [
    "Miters at every transition",
    "A gable, a dormer, a bay and a valley are all corners, and each one is cut on the angle rather than bent. Bent channel at a valley is the single loudest tell from the street.",
  ],
  [
    "Zones wired the way you asked",
    "The zoning agreed at the consultation gets wired on install day. Adding a zone afterwards is a wiring job, not a setting, which is why we settle it before anybody drills.",
  ],
  [
    "The ladder, and your landscaping",
    "Standoffs and pads, beds walked around rather than through, and gutters not leaned on. This is the part of the day your plants notice.",
  ],
  [
    "The clean-up nobody credits",
    "Offcuts, screws, packaging, sealant tubes and the aluminum filings from every cut, off site with us. Metal shavings left on a driveway end up in somebody's tire.",
  ],
];

/* WHERE WE DIFFER. Stated as a comparison, because "we care about quality" is what
 * everybody says and the only way to make it mean anything is to name the alternative. */
const differences: { h: string; us: string; trade: string }[] = [
  {
    h: "The design happens after dark",
    us: "We come back in the evening, put a powered sample on your actual elevation, and change color on it while you watch.",
    trade: "Quoted from the driveway at two in the afternoon, off a photograph and a rough count.",
  },
  {
    h: "The curb check happens in daylight",
    us: "We stand where your neighbors stand, at noon, and look at the eave line. If you can pick the channel out, we have not finished.",
    trade: "Signed off at night, when anything looks good and nothing shows.",
  },
  {
    h: "Sealant goes on as the screw goes in",
    us: "Every penetration sealed at the moment it is made, while the hole is clean and the board is dry.",
    trade: "A pass along the whole run at the end of the day, bridging holes that have already taken dust.",
  },
  {
    h: "Corners are cut, not bent",
    us: "Mitered on the angle at every gable, dormer, bay and valley, then sealed at the joint.",
    trade: "Flexed around the corner, which reads as a kink from the street and cracks first in February.",
  },
  {
    h: "The scene library is built with you",
    us: "Your everyday setting chosen first, then the scenes you actually asked for, saved with you holding the phone.",
    trade: "Handed over with the factory presets and an app nobody opens twice.",
  },
  {
    h: "Your covenant is read before the quote",
    us: "We pull the rules for your neighborhood, read them, and file the submission ourselves.",
    trade: "Discovered after the board says no, with a deposit already paid.",
  },
];

export default function HowItWorks() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-gable-detail.jpg"
        photoAlt="Close view of two Omaha gables with the channel following the rake line and mitered at the peak, one gable red and one blue"
        objectPosition="50% 30%"
        eyebrow="Install day"
        h1="One day, and all of it happens to one board."
        lede="Permanent lighting is a carpentry job with an electrical job inside it. Everything that decides whether you like it in five years happens in the eight inches between your shingles and your gutter, on the day the van turns up."
        trail={trail}
        footnote={
          <>
            Photographed on a finished Brytr install. The miter at the peak of each gable is cut on the
            angle, not bent around it.{" "}
            <Link href="/warranty" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
              What the warranty covers
            </Link>.
          </>
        }
      />

      {/* ── THE FASCIA, FOUR TIMES ──
        * The centerpiece. Same board, four states, amber in the last one only. */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="The whole job, in section"
            title="The same board, through the day."
            lede="This is your fascia from the first hour to the last. Nothing in the first three frames is lit, because three quarters of install day happens with the system dark — which is exactly why the parts nobody photographs are the parts worth asking about."
          />
          <div className="mt-10"><InstallDaySequence /></div>
          <p className="mt-7 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
            Drawn to what we actually install: shingles untouched, channel into the fascia board,
            conductor inside the channel, diffuser facing down.{" "}
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
      <section className="section bg-background">
        <div className="shell grid items-start gap-10 lg:grid-cols-[40fr_60fr] lg:gap-14">
          <div>
            <p className="eyebrow">The other half</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              What is not in the drawing.
            </h2>
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                The channel is the easy part. Six other decisions get made on your property that day,
                and every one of them is a thing you would only notice if somebody got it wrong.
              </p>
              <p className="text-base text-muted-foreground">
                They are also the six that separate a crew who does this every week from a crew who
                took the job because it was quiet. All six get made on your property, on the day, by
                the people who measured it.
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
        eyebrow="The day itself"
        title="Drawings explain the detail. This is the day."
        lede="One crew, one day on most houses, and a walkthrough after dark before anybody leaves."
        shots={[
          { photo: "installDayGarage", caption: "Morning. Van open, roofline measured, nothing on the house yet." },
          { photo: "installDayPavilion", caption: "A run going on to a poolside pavilion. Anything with a structure to fasten to at both ends will take one." },
          { photo: "walkthroughDusk", caption: "After dark, on your lawn, with every scene switched through in front of you." },
        ]}
        cols={3}
        ground="raise"
      />

      {/* ── US AGAINST THE TRADE ──
        * Six claims, each with the alternative named. "We care about quality"
        * means nothing until you say what the other option looks like. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Where we differ"
            title="What is not standard in this trade."
            lede="Every installer says they do good work, which is why the claim is worthless on its own. So here is each one with the alternative written next to it — including the ones that cost us time we do not bill for."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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
            eyebrow="Either side of the day"
            title="What happens before the van, and after it."
            lede="Install day is one day. The two things on either side of it are where most of the reassurance actually lives."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">Before</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                One evening visit and one piece of paper. That is the whole of it.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["The consultation", "About an hour, after dark, no charge and nothing to sign. It has its own page because it is the part people ask about most."],
                  ["The written quote", "One number for the whole scope, itemized by elevation, hardware and zone, unchanged on install day."],
                  ["The covenant submission", "Pulled, read and filed by us, before we schedule anything, if your neighborhood needs it."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink onDark href="/free-design-consultation">What the hour looks like</TextLink>
                <TextLink onDark href="/pricing">How the number is built</TextLink>
              </div>
            </article>

            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">After</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                The part that decides whether you recommend us, and it starts the following winter.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["A section goes dark", "Almost always a driver or one bad connection rather than the whole run. We come out and fix that section."],
                  ["You want another zone", "The back elevation, the pergola, the beds. It ties into the controller you already have."],
                  ["Something we installed fails", "Manufacturer terms on the hardware, ours on the workmanship, both written on your quote."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TextLink onDark href="/warranty">The warranty terms</TextLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <PageCta variant="phone" omit={["/how-it-works"]} />
    </Shell>
  );
}
