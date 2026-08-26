import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoSplit, PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, localBusiness } from "@/lib/schema";
import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";

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
 * Archetype: home hero → four routes with a recommendation on each → what-happens-next
 * split → the NAP block. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  /* `absolute` bypasses the root layout's "%s | Brytr Co" template. Without it the brand
   * lands twice — "Contact Brytr Co | Omaha, NE | Brytr Co" — and this title is the client's
   * own SEO copy, so it keeps its exact wording rather than being reworded to fit. */
  title: { absolute: "Contact Brytr Co | Omaha, NE" },
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

      {/* ── THE FOUR ROUTES IN ──
        * The centerpiece. Every route says what it is bad for, which is the
        * half of a contact page that is normally missing. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Every way in, and none of them interchangeable."
            lede="The number is in the header of every page, so the useful thing to publish is which route suits what you are actually asking, including what each one is bad at."
          />

          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {routes.map((r) => (
              <li
                key={r.h}
                className="flex flex-col overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)]"
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
              <p className="text-lg leading-relaxed text-on-dark">
                Nobody hesitates over a phone number. What people hesitate over is being entered into
                something: a sequence, a list, a CRM that emails them every Tuesday for a year.
              </p>
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
                  "We offer times, mostly evenings",
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
        title="An hour on your own lawn, after dark."
        link={{ href: "/free-design-consultation", label: "What the hour actually involves" }}
      >
        <p>
          Every one of the routes above ends in the same place: somebody standing on your property
          after dark with a sample run, showing you what warm white does against your fascia
          rather than against a photograph of somebody else&rsquo;s.
        </p>
        <p>
          It costs nothing, there is nothing to sign, and you keep the written quote either way.
        </p>
      </PhotoSplit>

      {/* ── THE NAP BLOCK ──
        * One canonical copy of name, address and phone, matching the Google
        * profile exactly, because that match is what ties the two together. */}
      <section className="section bg-muted">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:gap-12">
          <div>
            <p className="label text-muted-foreground">By phone</p>
            <a
              href={site.phoneHref}
              className="u mt-3 block text-3xl font-medium text-foreground hover:text-accent-deep"
            >
              {site.phone}
            </a>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              Best for anything urgent, and for a service call on a system we installed. It reaches the
              people who put it up rather than a dispatcher.
            </p>
            <div className="mt-5">
              <TextLink href="/warranty">What is covered</TextLink>
            </div>
          </div>

          <div>
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
              {site.region}. If you are outside that, we will tell you rather than drive out and load the
              quote.
            </p>
            <div className="mt-5">
              <TextLink href="/service-areas">Every town, with drive times</TextLink>
            </div>
          </div>

          <div>
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
      </section>

      {/* `raise` here rather than background: the section above is muted and the PageCta below
        * is background, so raise is the only surface that alternates against both. */}
      <PhotoStrip
        shots={pick("contact-strip", 3)}
        title="What we would be quoting."
        ground="raise"
      />

      <PageCta variant="phone" omit={["/pricing"]} panelLink={{ href: "/free-design-consultation", label: "Book the on-site measure" }} 
        /* The NAP block above is bg-muted, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="background"
      />
    </Shell>
  );
}
