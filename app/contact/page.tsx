import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoSplit, PhotoStrip } from "@/components/sections/photo-parts";
import { QuoteForm } from "@/components/ui/bits";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, localBusiness } from "@/lib/schema";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /contact — WAVE 2, PAGE 5 of the page-by-page pass.
 *
 * What it was: 3.6 kB, a hero with no photograph, three unlabelled columns of contact
 * details, the eighteen-city rack that ten other templates also carried, and NO closer at
 * all — the only page on the site that just stopped. It also promised a "same day reply on
 * anything sent before 6pm", which is a specific operational commitment nobody at Brytr
 * has given us, so it is gone.
 *
 * What it is now. A contact page's real question is not "how do I reach you" — the number
 * is in the header of every page — it is "which of these should I use, and what happens
 * after". So the centerpiece is THE FOUR ROUTES IN, each with what it is best for, what it
 * is bad for, and who picks it up. Then what happens to a message after it is sent, because
 * the thing people are actually worried about is being entered into a sales sequence.
 *
 * REVISED 28 Aug 2026: the main form. The client asked for "a big main form on the contact page
 * after the hero with contact info next to it", which is the section directly below the hero now.
 * The four routes still earn their place - they answer "which of these should I use" - but they are
 * no longer the first thing on a page whose job is getting a form filled in.
 *
 * Archetype: home hero → main form with the details beside it → value band → four routes with a
 * recommendation on each → what-happens-next split. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  /* `absolute` bypasses the root layout's "%s | Brytr Co" template. Without it the brand
   * lands twice — "Contact Brytr Co | Omaha, NE | Brytr Co" — and this title is the client's
   * own SEO copy, so it keeps its exact wording rather than being reworded to fit.
   *
   * EXTENDED, NOT REWRITTEN. At "Contact Brytr Co | Omaha, NE" this was 28 characters, which is
   * under the 30 every audit tool treats as too short, and it is the ONLY indexable page on the
   * site with that problem - measured across all 68 routes. A 28-character title wastes about
   * half the width Google will actually render and says nothing about what the company does.
   *
   * The client's string is preserved character for character as the prefix, and the product is
   * appended as a third segment rather than woven into it. Three separators is one more than
   * ideal; changing copy the client wrote is worse. 57 characters, inside the 60 Google renders
   * before truncating. */
  title: { absolute: "Contact Brytr Co | Omaha, NE | Permanent Outdoor Lighting" },
  description:
    "Call Brytr Co on 402-810-3973, send a message, or book the on-site design. Permanent outdoor lighting across the Omaha metro and Council Bluffs.",
  alternates: { canonical: "/contact" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];

/* THE FOUR ROUTES. `bad` is the useful half — a contact page that says every channel is
 * perfect for everything is a contact page that has not thought about it. */
const routes: { label: string; h: string; href: string; external?: boolean; best: string; bad: string; who: string }[] = [
  {
    label: "Best for most people",
    h: site.phone,
    href: site.phoneHref,
    best: "A price question, a service call on a system that has gone dark, or anything where you want an answer in the next ten minutes rather than tomorrow.",
    bad: "Nothing, really. It is the fastest route in and it is answered by one of the two owners.",
    who: "Zac or Sam. If we are on a roof it goes to voicemail and we call back.",
  },
  {
    label: "Best if you want a quote",
    h: "The design consultation form",
    href: "/free-design-consultation",
    best: "Booking the on-site measure. Give us the town and roughly what you are lighting and we will come back with times, most of them evenings.",
    bad: "Anything urgent. A form is a queue, however short, and a dark run in December should be a phone call.",
    who: "Read by us, not by an agency or a lead service. It goes nowhere else.",
  },
  {
    label: "Best for a photograph",
    h: "Facebook or Instagram",
    href: site.social.instagram,
    external: true,
    best: "Sending us a picture of something: your own house, a house you drove past, a fault you can see from the ground. A photograph saves ten minutes of describing.",
    bad: "Anything you need on the record. Messages get missed on social far more often than the phone does.",
    who: "Also us, and slower than either of the two above.",
  },
  {
    label: "Best for the trade",
    h: "The shop, 13436 C St",
    href: "/about",
    best: "Builders, roofers, landscapers and property managers who want to talk about a portfolio of addresses or coordinating around other trades.",
    bad: "Homeowners hoping to look at product. It is a yard and a warehouse rather than a showroom. The useful visit is us coming to you with the samples.",
    who: "Ring first. There is often nobody there, because the work is at your house.",
  },
];

export default function Contact() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness()} />

      <PageHero
        /* NOT the ranch shot used on /about — that is the same house on the same evening,
         * decorations and all, and two adjacent pages opening on it reads as a stock
         * library of one. This is a back garden at twilight, which suits a page about
         * talking to a person better than a blue-lit facade does. */
        photo="/img/g-twilight-yard.jpg"
        photoAlt="An Omaha back garden at twilight: a hipped roofline picked out in pink, warm light in the windows, ferns and a big weeping evergreen in the foreground"
        objectPosition="34% 62%"
        h1="Talk to Zac or Sam."
        lede="Calls go to the two people who own the company, not to a call center and not to a lead service that resells your details. If we are on a roof, we ring you back."
        trail={trail}
      />

      {/* ── THE MAIN FORM, AND THE CONTACT DETAILS BESIDE IT ──────────────────────────────────
        * Added 28 Aug 2026 on the client's instruction: "there should be a big main form on the
        * contact page after the hero with contact info next to it."
        *
        * WHY THE HERO'S FORM WAS NOT ENOUGH, even though it is a real form. The hero card is the
        * `mini` variant - name, phone, address, note - sized to sit on a photograph without
        * covering it. It is the same card on all 78 pages, so on the one page whose entire job is
        * getting in touch it reads as site furniture rather than as the point of the page. This
        * section is the `full` variant: it adds the email and what-are-you-lighting, it is not
        * competing with a photograph for room, and it is the first thing below the fold.
        *
        * THE FORM IS ON THE LEFT. Reading order, not decoration: the left column is what a visitor
        * scans first, and on this page the form is the primary action. It also means the form does
        * not sit under the hero's own form card, which would have put two forms in one vertical
        * column with a band between them.
        *
        * THE DETAILS COLUMN IS THE OLD NAP BLOCK, MOVED. It used to sit six sections lower, which
        * meant the address and the phone number were below the four route cards, the privacy
        * section and a photograph - past the point most people leave. Moving it here is why that
        * block is gone rather than duplicated: saying the address twice on one page is how a
        * Google Business Profile match gets muddied.
        *
        * `bg-card` rather than muted: the hero above is `bg-primary` and the value band below now
        * takes muted, so this is the ground that alternates against both. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[56fr_44fr] lg:gap-14">
          {/* `bg-background` ON THE FORM, AND IT IS NOT A PREFERENCE. The section ground is
            * `bg-card`, which is #ffffff, and QuoteForm's light shell defaults to `bg-card` too - so
            * on the first build the form was a white card on a white section, held apart by nothing
            * but a hairline. That is the same defect that made the home page's figure cards vanish
            * two rounds ago, arriving from the other direction: there the SECTION moved onto the
            * card's ground, here the CARD landed on the section's.
            *
            * `bg-background` is the warm limestone neutral, so the form reads as an object sitting
            * on the page. Same override the home hero uses, for the same reason. tailwind-merge
            * means the class passed here beats the one in the component's base list rather than
            * fighting it. */}
          <QuoteForm
            variant="full"
            heading="Tell us about the house"
            submitLabel="Send this to Zac and Sam"
            className="bg-background"
          />

          <div className="flex flex-col gap-8">
            <div>
              <p className="label text-muted-foreground">By phone</p>
              <a
                href={site.phoneHref}
                className="u mt-3 block text-3xl font-medium text-foreground hover:text-accent-deep"
              >
                {site.phone}
              </a>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                Best for anything urgent, and for a service call on a system we installed. It
                reaches the people who put it up rather than a dispatcher.
              </p>
            </div>

            <div className="border-t border-border pt-7">
              <p className="label text-muted-foreground">Where we are</p>
              <address className="mt-3 not-italic">
                <p className="font-display text-xl font-bold text-foreground">{site.name}</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </p>
              </address>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                {site.region}. If you are outside that, we will tell you rather than drive out and
                load the quote.
              </p>
              <div className="mt-5">
                <TextLink href="/service-areas">Every town, with drive times</TextLink>
              </div>
            </div>

            <div className="border-t border-border pt-7">
              <p className="label text-muted-foreground">Elsewhere</p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {[
                  ["Instagram", site.social.instagram, "Finished installs, most weeks"],
                  ["Facebook", site.social.facebook, "The same work, and the reviews"],
                  [`${reviewProof.platform} profile`, reviewProof.url, `${reviewProof.average} from ${reviewProof.count} reviews`],
                ].map(([label, href, note]) => (
                  <li key={label} className="py-3.5">
                    <a
                      href={href}
                      className="font-display text-[0.95rem] font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
                    >
                      {label}
                    </a>
                    <p className="mt-0.5 text-sm text-muted-foreground">{note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE VALUE BAND. It states the offer once before this page gets specific about its own
        * subject. It moved BELOW the form rather than above it: on a contact page the form is the
        * subject, and a band restating the offer between the hero and the form would have pushed
        * the one thing this page is for further down the screen. Ground changed muted from card,
        * because this section now takes card. */}
      <ValueBand {...valueProps["/contact"]} ground="muted" />


      {/* ── THE FOUR ROUTES IN ──
        * The centerpiece. Every route says what it is bad for, which is the
        * half of a contact page that is normally missing. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Every way in, and none of them interchangeable."
          />

          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {routes.map((r) => (
              <li
                key={r.h}
                className="flex flex-col overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <div className="border-b border-border px-6 py-4">
                  <p className="label flex items-center gap-3 text-accent-ink">
                    <span className="block h-4 w-1 bg-accent" aria-hidden />
                    {r.label}
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.35rem] font-bold leading-tight text-foreground">
                    {r.external ? (
                      <a href={r.href} className="hover:text-accent-deep">{r.h}</a>
                    ) : r.href.startsWith("tel:") ? (
                      <a href={r.href} className="u hover:text-accent-deep">{r.h}</a>
                    ) : (
                      <Link href={r.href} className="hover:text-accent-deep">{r.h}</Link>
                    )}
                  </h3>
                </div>
                <dl className="flex-1 divide-y divide-border">
                  <div className="px-6 py-4">
                    <dt className="label text-muted-foreground">Good for</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-foreground">{r.best}</dd>
                  </div>
                  <div className="px-6 py-4">
                    <dt className="label text-muted-foreground">Bad for</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{r.bad}</dd>
                  </div>
                  <div className="px-6 py-4">
                    <dt className="label text-muted-foreground">Who picks it up</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{r.who}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHAT HAPPENS TO A MESSAGE ──
        * The actual anxiety. Nobody hesitates over a phone number; they
        * hesitate over what happens to their details afterwards. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[48fr_52fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              title="Where your details go, and where they do not."
            />
            <div className="prose-body mt-6 space-y-4">
            {/* ONE PARAGRAPH. rules.md bans a second body paragraph stacked under a heading, and the
              * measured count was twelve of these on one service page and fifteen on a city page.
              * Kept whichever of the two carried the claim rather than the run-up to it. */}
              <p className="text-base leading-relaxed text-on-dark-muted">
                So here is the whole of it. Your details reach two people, they are used to answer the
                thing you asked, and if you go quiet we go quiet. We do not buy leads and we do not sell
                yours.
              </p>
            </div>
            <div className="mt-8">
              <TextLink onDark href="/privacy-policy">The privacy policy, in full</TextLink>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                What happens
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "One of us reads it and replies",
                  "We ask for the town if you have not given it",
                  "We offer times that suit you",
                  "You get a written quote after the visit",
                  "The quote stays valid whether or not you reply",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
                What does not
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "No drip sequence and no newsletter",
                  "Your details are not sold or shared",
                  "No third-party lead broker involved",
                  "No follow-up if you stop replying",
                  "No price that expires to hurry you",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS IF YOU DO ──
        * A contact page is four routes in and then an address. Nothing on it shows what you get
        * at the end of the routes, which is the only reason to use one. */}
      <PhotoSplit
        photo="walkthroughDusk"
        tall
        side="left"
        ground="raise"
        title="An hour on your own lawn."
        link={{ href: "/free-design-consultation", label: "What the hour actually involves" }}
      >
        <p>
          Every one of the routes above ends in the same place: somebody standing on your property
          with a sample run, showing you what warm white does against your own fascia rather than
          against a photograph of somebody else&rsquo;s.
        </p>
        <p>
          It costs nothing, there is nothing to sign, and you keep the written quote either way.
        </p>
      </PhotoSplit>

      {/* THE NAP BLOCK USED TO BE HERE and its content is now in the form section near the top of
        * the page. It carried the phone number, the address and the social links in three columns,
        * six sections below the fold - after the four route cards, the privacy section and a
        * photograph. On a contact page that is the wrong end of the page for the address.
        *
        * Removed rather than duplicated. ONE canonical NAP block per page: that exact match with
        * the Google Business Profile is what ties the site to the local pack listing, and printing
        * the block twice on one page is how the match gets muddied. The street also appears as the
        * heading of the trade route card above ("The shop, 13436 C St") and in the footer, which is
        * unchanged and is a label rather than a second NAP block - measured at three occurrences of
        * the street on this page, exactly as before this change. */}

      {/* GROUND CHANGED raise -> muted, 28 Aug 2026, and it had to be. This used to sit under the
        * muted NAP block, so raise was the surface that alternated. The NAP block is gone and the
        * section above this is now the PhotoSplit, which is raise - two raise sections in a row
        * with a dead strip between them, which is exactly what scripts/section-rhythm.mjs exists
        * to catch. Muted alternates against raise above and against the card closer below. */}
      <PhotoStrip
        shots={pick("contact-strip", 3)}
        title="What we would be quoting."
        ground="muted"
      />

      <PageCta variant="phone" photos={valueProps["/contact"].photos} panelLink={{ href: "/free-design-consultation", label: "Book the on-site measure" }} 
        /* The NAP block above is bg-muted, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="card"
      />
    </Shell>
  );
}
