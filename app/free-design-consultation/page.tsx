import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { reviews, reviewProof } from "@/content/reviews";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /free-design-consultation — WAVE 1, PAGE 3 of the page-by-page pass.
 *
 * What it was: a flat color band for a hero (no photograph at all), the form beside a
 * numbered 1-2-3-4 list in amber squares, four checkmarks, a phone panel, and a drawn
 * ranch elevation dropped in at the bottom with nothing to do with the page. Four
 * kilobytes. It was the thinnest page on the site and it is the page the whole site is
 * trying to get people to.
 *
 * What it is now. The hero is the home page's, on the front-elevation shot — because the
 * everyday setting is what somebody is actually buying, and the walk lit in that frame is
 * the argument. The centerpiece is THE HOUR: five beats with the clock running down the
 * left, and beside it a facsimile of the sheet you are handed at the end of it. The blanks
 * on that sheet are left blank on purpose. They are your numbers, off your house, and
 * filling them in here with plausible-looking figures would be the exact thing this site
 * has refused to do everywhere else.
 *
 * Then the two things nobody asks but everybody wonders: what we turn up with, and what
 * will NOT happen while we are standing in your driveway.
 *
 * Archetype: home hero → clock + document facsimile → two-up kit list → dark objection
 * strip with a real review. Closer: one, the phone band, because the hero has the form.
 */

export const metadata: Metadata = {
  title: "Free Lighting Design Consultation | Omaha",
  description: "Book a free on-site permanent lighting design consultation in the Omaha metro. We measure, design after dark, and hand you a written quote. No obligation.",
  alternates: { canonical: "/free-design-consultation" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Free design consultation", href: "/free-design-consultation" }];

/* THE HOUR. Elapsed time down the left, because "about an hour" is the objection and the
 * only way to answer it is to show where the hour goes. Typical, not a schedule. */
const beats: { at: string; h: string; p: string; who: string }[] = [
  {
    at: "0:00",
    h: "We park and you point.",
    p: "No folder, no tablet presentation. You tell us which elevations you look at and which ones you have never once thought about.",
    who: "Two minutes of talking, standing in the driveway",
  },
  {
    at: "0:05",
    h: "We walk the whole property.",
    p: "Front, both sides, the back, the beds, the walk, the patio. We are looking for what the light can do that you have not pictured yet — a wall in section, a tree worth uplighting, a soffit deep enough to hide the channel completely.",
    who: "You, us, and a flashlight",
  },
  {
    at: "0:20",
    h: "We design it after dark.",
    p: "This is why evenings are better. We put real output on the house from a sample run, change the color on a phone, and you say yes or no to each thing while you are looking at it rather than at a render.",
    who: "The part people say they did not expect",
  },
  {
    at: "0:40",
    h: "We measure.",
    p: "A wheel along every elevation, corners counted, zones agreed, hardware chosen. This is the part that makes the number real instead of a range.",
    who: "Quiet. Bring a drink",
  },
  {
    at: "0:55",
    h: "You are holding the quote.",
    p: "One number for the whole scope, itemized, with both warranty terms on it. You keep it whether or not you ever call us again.",
    who: "Nothing to sign that evening",
  },
];

/* THE LEAVE-BEHIND. The lines are the real lines. The values are blank because they are
 * measured off your house, and inventing a set of plausible ones is precisely the trick
 * this site does not do. */
const sheet: { k: string; v?: string; blank?: string }[] = [
  { k: "Property", blank: "town and elevation names" },
  { k: "Front elevation", blank: "linear ft" },
  { k: "Side elevations", blank: "linear ft each" },
  { k: "Rear elevation", blank: "linear ft, or none" },
  { k: "Mitered corners", blank: "count" },
  { k: "Zones", blank: "count" },
  { k: "Hardware", v: "The line and the manufacturer, named not implied" },
  { k: "Add-ons", blank: "landscape, hardscape, bistro" },
  { k: "Total, for the whole scope", blank: "one number" },
  { k: "Warranty", v: "Manufacturer and workmanship, both stated" },
];

export default function Consult() {
  const quote = reviews.find((r) => r.name === "Meghan Gibbons") ?? reviews[0];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/hero-warm-white.jpg"
        photoAlt="An Omaha two-story with every roofline run on the same soft pink, and the front walk and beds lit as well as the roofline"
        objectPosition="22% 62%"
        /* "See it on your house before you buy." is the closer on eleven pages. It cannot
          * also be this page's proposition — a headline that ends every other page reads as
          * furniture by the time you get here, and it left this page with no line of its own.
          * The hour, and what you keep at the end of it, is what this page is actually about. */
        h1="One hour after dark, and you keep the drawing."
        lede="We come out, walk the property after dark, design it with you, measure the roofline, and leave you holding a written quote. If you decide against it you have lost an hour and gained a plan — the drawing and the number are yours either way."
        trail={trail}
      />

      {/* ── THE HOUR ──
        * The centerpiece: the clock down the left, the deliverable on the right. */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="What you are agreeing to"
            title="Roughly an hour, and this is where it goes."
            lede="The objection is never the price, because there is not one. It is the hour. So here is the hour, minute by minute, and the thing you are holding at the end of it."
          />

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
            <ol>
              {beats.map((b) => (
                <li key={b.at} className="grid grid-cols-[4.5rem_1fr] gap-x-5 border-t border-border py-6 first:border-t-0 first:pt-0">
                  <p className="u pt-0.5 text-lg font-medium leading-none text-accent-ink">{b.at}</p>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-tight text-foreground">{b.h}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{b.p}</p>
                    <p className="label mt-3 text-muted-foreground">{b.who}</p>
                  </div>
                </li>
              ))}
              <li className="border-t border-border pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Times are typical rather than a schedule. A larger property, a covenant to read or a
                  yard you want walked twice all add to it, and none of that changes what it costs.
                </p>
              </li>
            </ol>

            {/* THE SHEET — a facsimile of the leave-behind, blanks and all */}
            <figure className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Design summary
                </p>
                <p className="text-xs text-muted-foreground">One page. You keep it.</p>
              </div>

              <dl className="px-6">
                {sheet.map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between gap-5 border-b border-border py-3.5 last:border-0">
                    <dt className="text-sm text-muted-foreground">{r.k}</dt>
                    <dd className="min-w-0 text-right">
                      {r.v ? (
                        <span className="text-sm font-medium text-foreground">{r.v}</span>
                      ) : (
                        <span className="inline-flex flex-col items-end">
                          <span
                            className="block w-[6.5rem] border-b border-dashed border-muted-foreground/50 pb-1"
                            aria-hidden
                          />
                          <span className="u mt-1 block text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
                            {r.blank}
                          </span>
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <figcaption className="border-t border-border bg-muted px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                The blanks are blank because they are your numbers, taken off your house with a wheel.
                We fill them in with you standing there, and the sheet is yours whether or not you book
                anything.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── WHAT TURNS UP, AND WHAT HELPS ──
        * Two lists, because both questions get asked on the phone and neither
        * one is answered anywhere on the site. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Before we get there"
            title="What we bring, and what helps if you have it."
            lede="You do not have to prepare anything, and nothing on this list stops the visit happening. All of it makes the hour shorter and the quote tighter."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
              <h3 className="font-display text-2xl font-bold text-foreground">In the van</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
                Enough to show you the real thing rather than a photograph of it.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-border border-y border-border">
                {[
                  ["A sample run, powered", "The actual channel and diodes, lit, so you can see the beam and the gap between fixtures up close."],
                  ["A measuring wheel", "Every elevation walked and written down, not paced out."],
                  ["The app, on a phone", "We change the color on the sample while you watch, so scenes are a thing you have used before you buy them."],
                  ["The quote, before we leave", "Written on the property and handed to you, so you are holding a number rather than waiting on an email."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-foreground">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">Handy, not required</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                Answer what you know and shrug at the rest. Every one of these is something we would
                otherwise work out on the walk.
              </p>
              <ul className="mt-6 flex-1 space-y-3.5">
                <Check onDark>An evening slot, so the design happens with the light actually on</Check>
                <Check onDark>Whoever else gets a say, in the driveway rather than on speakerphone</Check>
                <Check onDark>Your covenant or HOA rules, if your neighborhood has them</Check>
                <Check onDark>A rough idea of which elevations matter to you and which do not</Check>
                <Check onDark>Any photograph of a house you liked, even a screenshot</Check>
                <Check onDark>Whether there is a rear elevation you actually use after dark</Check>
                <Check onDark>Any window you would rather we did not throw light into</Check>
              </ul>
              <p className="mt-7 border-t border-on-dark/12 pt-5 text-sm leading-relaxed text-on-dark-muted">
                If your neighborhood needs a submission, we pull the paperwork and file it. That is our
                job, not yours.{" "}
                <Link href="/faq" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
                  More on covenants
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE HOUR, PHOTOGRAPHED ──
        * This page describes an appointment. Two photographs of one actually happening are
        * worth more than the third paragraph explaining it. */}
      <PhotoPair
        eyebrow="The hour itself"
        title="What we are doing while we are standing in your garden."
        lede="The design is made on the property, after dark, against your own materials — because warm white on red brick is a different colour from warm white on white siding and no catalogue will tell you that."
        a="installDayPavilion"
        b="walkthroughDusk"
        aLabel="Measuring and running a sample against the actual structure, not off a satellite photograph."
        bLabel="And at the end of it, looking at the result from where you would normally stand."
        ground="background"
      />

      {/* ── WHAT WILL NOT HAPPEN ──
        * The objection nobody says out loud. One real review carrying it. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="The part you are actually worried about"
            title="What will not happen in your driveway."
            lede="Home improvement has earned the suspicion. So it is worth being specific about what we do not do, rather than promising to be nice."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[56fr_44fr] lg:gap-14">
            <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
              {[
                ["No price that expires tonight.", "The number on your sheet is the number next month. There is no signing bonus and no discount for deciding before we drive away, because a price that moves was never a price."],
                ["No manager on the phone.", "Nobody is calling anybody to “see what I can do for you”. The person who measured your house is the person who quoted it."],
                ["No follow-up sequence.", "One reply to your form, one visit, and then it is your move. If you go quiet, we go quiet."],
              ].map(([h, p]) => (
                <li key={h} className="py-6">
                  <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{h}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{p}</p>
                </li>
              ))}
            </ul>

            <div className="space-y-5">
              <figure className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <p className="u text-sm font-medium text-accent">
                  {reviewProof.average} on {reviewProof.platform}
                  <span className="text-on-dark-muted"> · {reviewProof.count} reviews</span>
                </p>
                <blockquote className="mt-4 text-[1.15rem] leading-relaxed text-on-dark">
                  “{quote.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-on-dark/12 pt-4 text-sm text-on-dark-muted">
                  {quote.name}
                  {quote.when ? ` · ${quote.when}` : ""} · Google
                </figcaption>
                <div className="mt-5">
                  <TextLink onDark href="/reviews">Read the rest</TextLink>
                </div>
              </figure>

              <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <p className="label text-accent">Rather just talk</p>
                <a href={site.phoneHref} className="u mt-2.5 block text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-none text-on-dark hover:text-accent">
                  {site.phone}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                  Same-day reply most days. We can give you the per-foot basis and a range over the
                  phone before anybody schedules anything.
                </p>
                <div className="mt-5 border-t border-on-dark/12 pt-4">
                  <TextLink onDark href="/pricing">How the pricing is built</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The closer cannot repeat this page's own H1 back at somebody who has just read
        * 1,200 words under it, and it cannot offer to book the thing they are already on
        * the page for. So it makes the other argument: pick up the phone instead. */}
      <PageCta
        variant="phone"
        title="Or skip the form and just call."
        body="Tell us the cross streets and roughly how much roofline you are looking at, and we will give you the per-foot basis and a range before anybody schedules anything."
        omit={["/pricing"]}
        panelLink={{ href: "/gallery", label: "See finished installs first" }}
      />
    </Shell>
  );
}
