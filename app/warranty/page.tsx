import type { Metadata } from "next";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoSplit, PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";

import { Jsonld, breadcrumb } from "@/lib/schema";
import { site } from "@/content/site";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /warranty — WAVE 2, PAGE 4 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a "365 days a year" stat that means nothing, a
 * ghost-numeral 1-2-3 claim row at 3.4rem — the pattern the client called lazy — one
 * coverage table, and two closers stacked at the bottom. It also asserted two terms nobody
 * at Brytr has confirmed to us: that coverage transfers with the house, and that service
 * runs year round including winter. Both are plausible and both are exactly the kind of
 * thing a customer would later hold the company to, so they are gone until the client
 * confirms them.
 *
 * What it is now. The page's job is to answer two questions — what is covered, and who
 * turns up — so it answers them in that order and refuses to pad. The centerpiece is
 * COVERED FACING NOT COVERED, in plain language, because every warranty page in this trade
 * publishes only the left column and that is why nobody believes any of them.
 *
 * The honest gap is stated rather than filled: we do not publish component TERMS, because
 * the durations belong to the manufacturers and Brytr has not cleared a set of numbers for
 * publication. Printing plausible ones would be the single worst thing this site could do.
 * Instead the last section is the questions worth asking any installer, ours included.
 *
 * Archetype: home hero → covered/not-covered facing lists → who-turns-up split → the
 * questions. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: "Warranty: What Is Covered and Who Comes Out",
  description:
    "What the Brytr permanent lighting warranty covers, what it does not, and who administers the claim. All of it printed on your quote before you sign.",
  alternates: { canonical: "/warranty" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Warranty", href: "/warranty" }];

/* COVERED. `by` is the party who pays, which is the split that removes the argument. */
const covered: { h: string; by: "Manufacturer" | "Brytr"; p: string }[] = [
  {
    h: "The diodes themselves",
    by: "Manufacturer",
    p: "The longest term in the system, and the component least likely to be what has gone wrong.",
  },
  {
    h: "Controller and power supply",
    by: "Manufacturer",
    p: "Shorter terms than the diodes. The power supply is the shortest-lived part of any permanent lighting system, ours included, and a dark run is usually this rather than the LEDs.",
  },
  {
    h: "Channel finish and corrosion",
    by: "Manufacturer",
    p: "The extrusion and its coating. Color fade and corrosion on the aluminum itself sit with whoever extruded it.",
  },
  {
    h: "Fastening and sealing",
    by: "Brytr",
    p: "Every screw we drove and every bead we ran. If a fixing works loose or a penetration weeps, that is our workmanship and our cost, with no manufacturer in the conversation.",
  },
  {
    h: "Water at terminations and joints",
    by: "Brytr",
    p: "The most common real-world failure in this trade and almost always an install fault rather than a product fault. It is the reason we seal at the moment the screw goes in.",
  },
  {
    h: "Miters, transitions and end caps",
    by: "Brytr",
    p: "Anywhere we cut the channel. A joint that opens up at a valley is a joint we cut.",
  },
  {
    h: "Diagnosis and the call-out",
    by: "Brytr",
    p: "Working out which of the two columns above a fault belongs to is our job, not yours. You get one number either way.",
  },
  {
    h: "Filing the manufacturer claim",
    by: "Brytr",
    p: "We raise it, evidence it and chase it. You do not deal with a portal, a distributor or a warranty department.",
  },
];

/* NOT COVERED. Publishing this column is the whole point of the page. */
const notCovered: { h: string; p: string }[] = [
  {
    h: "Roof, gutter or solar work by somebody else",
    p: "Not a warranty claim. Tell whoever is quoting the work that the lighting is there and we will talk to them first.",
  },
  {
    h: "Storm, hail and impact damage",
    p: "An insurance question, not a warranty one. We quote the repair and write what your adjuster needs.",
  },
  {
    h: "Anything another installer has modified",
    p: "Cut into, extended or re-terminated by somebody else. We cannot stand behind what we did not fit.",
  },
  {
    h: "A new elevation or an extension",
    p: "New work, priced as new work. It joins the same controller.",
  },
  {
    h: "Changing your mind about the design",
    p: "A settings conversation, and usually a free one. Rewiring a zone is not.",
  },
  {
    h: "Cosmetic marks from something hitting it",
    p: "A ladder, a branch or a stray ball. We replace the section; it is not a defect.",
  },
];

/* THE FIVE QUESTIONS. Written to be asked of everybody quoting the job, including us. */
const questions: { q: string; a: string }[] = [
  {
    q: "Who holds the workmanship coverage: you, or the manufacturer?",
    a: "We do, and it is separate from the hardware terms. A single blanket warranty that does not distinguish the two is a warranty that gets argued about, because product failures and install failures are settled by different parties.",
  },
  {
    q: "Who physically turns up when something goes dark?",
    a: "The crew who fitted it. Not a franchise dispatcher and not the manufacturer, who has no way of getting to your fascia board.",
  },
  {
    q: "Is the workmanship coverage in the paperwork I sign, or in a brochure?",
    a: "On the quote itself, with the manufacturer terms for the hardware you chose printed beside it. If either only exists on a website, it is marketing rather than a term.",
  },
  {
    q: "What happens if you go out of business?",
    a: "The manufacturer terms survive us; the workmanship terms do not, and no installer in this trade can honestly tell you otherwise. That is the argument for asking how long a company has been at one address and who answers its phone.",
  },
];

export default function Warranty() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-blue-white.jpg"
        photoAlt="An Omaha brick two-story with three gables, the walk and beds all lit, blue on the walls with the gables in warm white"
        objectPosition="50% 50%"
        h1="What is covered, and who comes out."
        lede="A warranty is worth exactly as much as the person administering it. There are two layers on every Brytr install: the manufacturer's on the hardware and ours on the work, and we are the ones who show up for either."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/warranty"]} ground="muted" />


      {/* ── COVERED, FACING NOT COVERED ──
        * The centerpiece. Everybody in this trade publishes the left column.
        * The right column is the one that tells you whether to trust the left. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What is covered, and what is not."
          />

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
            {/* COVERED */}
            <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border bg-primary px-6 py-4">
                <p className="label flex items-center gap-3 text-on-dark">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Covered
                </p>
                <p className="text-xs text-on-dark-muted">Who pays is named on each line</p>
              </div>
              <ul className="divide-y divide-border">
                {covered.map((c) => (
                  <li key={c.h} className="px-6 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-[1rem] font-bold text-foreground">{c.h}</h3>
                      <span
                        className={`u text-[0.7rem] uppercase tracking-[0.08em] ${
                          c.by === "Brytr"
                            ? "border-accent-ink/40 text-accent-ink"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {c.by}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.p}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOT COVERED */}
            <div className="overflow-hidden rounded-lg bg-muted ring-1 ring-border">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                {/* This used to be the same standing bar as "Covered" in grey. Two columns
                  * badged identically and told apart by colour alone is a colour-deficiency
                  * failure, and it also spends the section marker on the negative column. An
                  * open box against a filled bar reads without colour at all. */}
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block size-3 border-2 border-foreground/35" aria-hidden />
                  Not covered
                </p>
                <p className="text-xs text-muted-foreground">We will still quote the fix</p>
              </div>
              <ul className="divide-y divide-border">
                {notCovered.map((c) => (
                  <li key={c.h} className="px-6 py-4">
                    <h3 className="font-display text-[1rem] font-bold text-foreground">{c.h}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.p}</p>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border bg-background px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                None of these mean we will not help. They mean the work is quoted rather than free, and
                you will be told which it is before anybody starts.
              </p>
            </div>
          </div>

          {/* THE HONEST GAP. Do not fill this in with invented numbers. */}
          <div className="mt-8 rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            {/* NO EYEBROW. The small amber label that sat here was the device the client had
              * removed from every section on the home page: "remove all of these little headings
              * before sections." These three survived because they are inside dark panels rather
              * than above section heads, which is a distinction the reader does not make. */}
            <h3 className="font-display text-xl font-bold text-on-dark">
              We do not publish the year counts on this page.
            </h3>
            <p className="mt-3 max-w-[80ch] text-[0.95rem] leading-relaxed text-on-dark-muted">
              The hardware terms belong to the manufacturers and differ by manufacturer, by component and by
              production year. A number typed onto a marketing page is the number somebody quotes back at
              you in year six, so the durations live on your quote instead, printed for the exact system
              you are buying and dated. Ask for them on the phone and you will have them before anybody
              visits.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/lighting-systems">What we install</TextLink>
              <TextLink onDark href="/pricing">What else is on the quote</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PEOPLE THE WARRANTY IS A PROMISE FROM ──
        * A warranty page is a wall of terms, and terms are worth exactly as much as the outfit
        * behind them. The section below this is titled "who turns up"; this is what that looks
        * like. It is also the only photograph on the site with a person on a roof in it, which
        * is the single most relevant image a warranty page could carry. */}
      <PhotoSplit
        photo="crewRoofFascia"
        tall
        side="right"
        ground="raise"
        title="A warranty is only worth the crew standing behind it."
        link={{ href: "/about", label: "Who Brytr actually is" }}
      >
        <p>
          Every term on this page is underwritten by the people who did the work. That is not a
          slogan. It is the mechanism. A crew who will never see your house again has no reason to
          care whether a fixing holds for eight years.
        </p>
        <p>
          Almost every failure we are called out to repair on someone else&rsquo;s system is a
          fixing or a sealing failure rather than a component failure. Which is to say: it is a
          labour problem, and labour is the part a hardware warranty never covers.
        </p>
      </PhotoSplit>

      {/* ── WHO TURNS UP ── */}
      <section className="section bg-muted">
        <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              A claim should be a phone call.
            </h2>
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                The single most useful thing about a locally owned installer is that something going
                wrong is a conversation rather than a process. You ring the number on your quote and one
                of the two people who own the company picks it up.
              </p>
              <p className="text-base text-muted-foreground">
                We hold the workmanship coverage ourselves and we administer the manufacturer side on
                your behalf. You never file anything, never chase a distributor, and never find out that
                the people who fitted it have no ongoing obligation to it.
              </p>
            </div>
            <a
              href={site.phoneHref}
              className="u mt-8 block text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-none text-foreground hover:text-accent-deep"
            >
              {site.phone}
            </a>
            <p className="mt-2.5 text-sm text-muted-foreground">
              The same number that is on your quote, on this page and on the van.
            </p>
          </div>

          <ol className="divide-y divide-border border-y border-border">
            {[
              ["You call", "Which elevation, and whether it is the whole run or a section. That usually names the fault."],
              ["We diagnose on site", "Controller, power supply, termination or diodes. Quick, because we know how it is wired."],
              ["We fix it under whichever layer applies", "Manufacturer or workmanship. That is settled between us and them, not by you."],
              ["You get told what it was", "In plain language, including when the answer is that it was our fault."],
            ].map(([h, p], i) => (
              <li key={h} className="py-5">
                <p className="label text-accent-ink">{["First", "Then", "Then", "Afterwards"][i]}</p>
                <h3 className="mt-1.5 font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── THE FIVE QUESTIONS ──
        * Written to be asked of every quote on the reader's kitchen table,
        * which is the only version of this section worth publishing. */}
      {/* Two photographs on a two-thousand-word warranty page was the thinnest set on the site
        * after the blog template. `background` sits between the muted section above and the
        * primary one below. */}
      <PhotoStrip
        shots={pick("warranty-strip", 3)}
        title="Installs we still service."
        ground="card"
      />

      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="Questions worth asking any installer."
          />

          <ol className="mt-10 divide-y divide-on-dark/12 border-y border-on-dark/12">
            {questions.map((x) => (
              <li key={x.q} className="grid gap-3 py-6 lg:grid-cols-[44fr_56fr] lg:gap-12">
                <h3 className="font-display text-[1.15rem] font-bold leading-snug text-on-dark">
                  &ldquo;{x.q}&rdquo;
                </h3>
                <div>
                  <p className="label text-accent">Our answer</p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{x.a}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-7 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
            The fourth one is the uncomfortable one and we have answered it straight, because an
            installer who claims their own workmanship coverage outlives their own company is telling you
            something about how the rest of their answers work.
          </p>
        </div>
      </section>

      <PageCta variant="phone" photos={valueProps["/warranty"].photos} omit={["/warranty"]} />
    </Shell>
  );
}
