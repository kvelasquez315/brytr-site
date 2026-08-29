import type { Metadata } from "next";
import { site } from "@/content/site";
import { reviews, reviewProof } from "@/content/reviews";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /free-design-consultation — REWRITTEN 29 Aug 2026 against the client's punch list, and this is
 * the page that had drifted furthest from the truth on the whole site.
 *
 * WHAT CAME OUT, and why. Every one of these was written to sound like a company that does not
 * sell you anything, and Brytr never asked for that page:
 *
 *   THE HOUR, beat by beat        Five timed steps from 0:00 to 0:55. "No folder, no tablet
 *                                 presentation" - there is a folder and there is a presentation.
 *                                 "You, us, and a flashlight" - no. "This is why evenings are
 *                                 better" - appointments are daytime. "Quiet. Bring a drink" -
 *                                 the client's reaction to that one was "what??", which is fair.
 *                                 "Nothing to sign that evening" - there is something to sign.
 *   THE DESIGN SUMMARY SHEET      A facsimile of a one-page leave-behind with ruled blanks for
 *                                 linear feet, mitered corners and zones. No such sheet exists.
 *                                 It was the centerpiece of the page and it was a prop.
 *   "you keep the drawing"        In the H1 and the lede. There is no drawing.
 *   WHAT WILL NOT HAPPEN          Three promises, all false: no price that expires tonight (there
 *                                 are same-day savings), no manager on the phone, no follow-up
 *                                 sequence (there is one).
 *   THE COVENANT BULLETS          HOA has never been a problem and the client does not want it
 *                                 raised on site, so the whole HOA thread comes off this page.
 *   "An evening slot"             No evening visits.
 *   "A sample run, powered"       A demo rig nobody has confirmed.
 *
 * WHAT THE PAGE IS NOW: the four things that genuinely happen - we walk it, we measure it, we
 * show you the scenes on the app, you get a written quote - and nothing around them. It is a
 * shorter page than it was and that is the correct outcome; the previous length was invention.
 *
 * The one thing this page must not do again is describe the appointment as softer than it is.
 * It is a sales visit. What is defensible is that the number is measured rather than guessed.
 */

export const metadata: Metadata = {
  title: "Free Lighting Design Consultation | Omaha",
  description: "Book a free on-site permanent lighting design consultation in the Omaha metro. We walk the property, measure the roofline, and hand you a written quote.",
  alternates: { canonical: "/free-design-consultation" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Free design consultation", href: "/free-design-consultation" }];

/* WHAT ACTUALLY HAPPENS. Four things, no clock against them, and every one is something the
 * client has confirmed. If a step cannot be stated without a qualifier it does not belong here. */
const steps: { h: string; p: string }[] = [
  {
    h: "We walk the whole property",
    p: "Front, both sides, the back, the beds, the walk, the patio. We are looking for what the light can do that you have not pictured yet, and for the elevations you have never once thought about.",
  },
  {
    h: "We measure the roofline",
    p: "A wheel along every elevation, corners counted, zones agreed, hardware chosen. This is the part that makes the number real instead of a range.",
  },
  {
    h: "We show you the scenes",
    p: "The app, on a phone, with the scenes switched through in front of you. You have used it before you have bought it, which is the step most installers leave until handover.",
  },
  {
    h: "You get a written quote",
    p: "One number for the whole scope, itemized. It is based on the measure rather than on a satellite photograph, and it is yours to keep.",
  },
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
        /* WAS "An hour on your property, and you keep the drawing." There is no drawing. What you
          * actually leave with is a written number, so that is what the headline says. */
        h1="An hour on your property, and a written quote."
        lede="We come out, walk the property with you, measure the roofline and put a written number in your hand. It is measured off your own elevation rather than off a satellite photograph, and it is yours to keep."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/free-design-consultation"]} ground="muted" />


      {/* ── WHAT THE VISIT INVOLVES ──
        * Was a five-beat clock down the left with a facsimile leave-behind sheet beside it. Both
        * are gone; the sheet does not exist and the clock was written rather than observed. Four
        * cards across, so the section fills without a column of invented detail holding it up. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What the visit involves."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.h}
                className="flex flex-col rounded-lg bg-background p-7 shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <h3 className="font-display text-[1.15rem] font-bold leading-snug text-foreground">{s.h}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.p}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
            A larger property, or a yard you want walked twice, adds to it. None of that changes what
            the visit costs.
          </p>
        </div>
      </section>

      {/* ── WHAT WE BRING, AND WHAT HELPS ──
        * The kit list is three items now rather than four: "A sample run, powered" described a
        * demo rig nobody has confirmed we carry. The right-hand list lost the covenant bullets and
        * the evening slot - see the note at the top of this file. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="What we bring, and what helps if you have it."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ring-1 ring-border">
              <h3 className="font-display text-2xl font-bold text-foreground">In the van</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
                Enough to make the number real before we drive away.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-border border-y border-border">
                {[
                  ["A measuring wheel", "Every elevation walked and written down, not paced out."],
                  ["The app, on a phone", "We switch the scenes in front of you, so they are a thing you have used before you buy them."],
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
                <Check onDark>Whoever else gets a say, in the driveway rather than on speakerphone</Check>
                <Check onDark>A rough idea of which elevations matter to you and which do not</Check>
                <Check onDark>Any photograph of a house you liked, even a screenshot</Check>
                <Check onDark>Whether there is a rear elevation you actually use in the evening</Check>
                <Check onDark>Any window you would rather we did not throw light into</Check>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE HOUR, PHOTOGRAPHED ──
        * The lede here used to be "Warm white on red brick is a different colour from warm white on
        * white siding", which the client read and wrote "What??" beside. It was also the colour-
        * matching argument in disguise. What these two frames actually show is the measure and the
        * handover, so that is what the copy says now. */}
      <PhotoPair
        title="What we are doing while we are standing in your garden."
        lede="The first is the measure, on the property, against the actual structure. The second is the end of it, looking at the result from where you would normally stand."
        a="installDayPavilion"
        b="walkthroughDusk"
        aLabel="Measuring against the actual structure, not off a satellite photograph."
        bLabel="And at the end of it, looking at the result from where you would normally stand."
        ground="card"
      />

      {/* ── WHY PEOPLE BOOK IT ──
        * WAS "What will not happen in your driveway": three promises, none of them true. It is
        * deleted rather than softened, because the honest version of that section is short enough
        * to be one paragraph, and because a page that oversells how gentle the appointment is has
        * the same problem as a page that oversells the product. The review and the phone panel are
        * kept - they were the only load-bearing things in that section. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="What you get out of an hour."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[56fr_44fr] lg:gap-14">
            <div>
              <p className="text-lg leading-relaxed text-on-dark/85">
                It is a sales appointment and we are not going to pretend otherwise. What we will say
                is that the number at the end of it is measured rather than guessed, that it covers
                the whole scope rather than a starting point, and that it is written down before
                anybody leaves your driveway.
              </p>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-on-dark-muted">
                If you decide against it, you have spent an hour and you know what your house would
                cost. That is a better position than the one most people are in after a phone call.
              </p>
              <div className="mt-7">
                <TextLink onDark href="/gallery">See finished installs first</TextLink>
              </div>
            </div>

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
                {/* WAS: "Same-day reply most days. We can give you the per-foot basis and a
                  * range over the phone before anybody schedules anything." Two unsourced claims
                  * in one sentence - a reply-time promise and a pricing basis we would quote over
                  * the phone. Both removed 27 Aug 2026. What is left is what a phone number is
                  * actually for. */}
                <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                  It reaches one of the two owners rather than a dispatcher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The closer cannot repeat this page's own H1 back at somebody who has just read
        * the page, and it cannot offer to book the thing they are already on the page for.
        * So it makes the other argument: pick up the phone instead. */}
      <PageCta
        variant="phone"
        photos={valueProps["/free-design-consultation"].photos}
        title="Or skip the form and just call."
        body="Tell us the cross streets and roughly how much roofline you are looking at, and we will tell you what the visit involves before anybody schedules anything."
        panelLink={{ href: "/gallery", label: "See finished installs first" }}
      />
    </Shell>
  );
}
