import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { reviews, reviewProof } from "@/content/reviews";
import { googleLogo } from "@/content/badges";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /reviews — WAVE 2, PAGE 3 of the page-by-page pass.
 *
 * What it was, and this one was a real defect rather than a design one: the page hardcoded
 * "177" in five places — the <title>, the meta description, the hero stat row, a fact card,
 * and the AggregateRating JSON-LD. The Google Business Profile said 196 then and says 201 now,
 * which is the point: it only ever goes up. Publishing a
 * review count in structured data that does not match the profile is the kind of mismatch
 * that gets a rich result dropped, and it was wrong on the page a reader is most likely to
 * check. Every figure on this page now comes from content/reviews.ts, which records where
 * it was read and when.
 *
 * Design-wise it also carried the eighteen-city rack (ten templates had it), two stacked
 * closers, and a dead branch for the case where the reviews array is empty — which it is
 * not, because we have six verbatim reviews.
 *
 * What it is now. The organizing device is WHAT THE REVIEWS ACTUALLY MENTION, as a rack of
 * phrases with counts, and every quote below carries the tags it earned. The counts are of
 * the six quoted here and say so — counting themes across the whole profile would mean reading
 * the whole profile, and we have not, so the honest number is the one we can stand behind.
 *
 * RULE, unchanged: never write a testimonial. Every word inside quote marks on this page is
 * somebody else's.
 *
 * Archetype: home hero → tag rack with the rating at size → tagged quote wall → practice
 * cards. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: `Brytr Reviews: ${reviewProof.average} Across ${reviewProof.count} Google Reviews`,
  description: `Brytr Co holds a ${reviewProof.average} average across ${reviewProof.count} Google reviews for permanent outdoor lighting in the Omaha metro. Read what they mention, then read them on Google.`,
  alternates: { canonical: "/reviews" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }];

/* THE TAGS. Each one is keyed to a phrase that is actually in the review, quoted in the
 * comment beside it, so nothing here is an interpretation dressed as data. A review can
 * carry several. If a review is edited or removed from the profile, delete it from
 * content/reviews.ts and these fall away with it. */
const mentions: Record<string, string[]> = {
  Tim: ["Zac and Sam by name", "Kept informed", "Knew their stuff"],
  //     "Zac & Sam made this"    "great communication"  "Very knowledgeable and patient"
  Elizabeth: ["Zac and Sam by name", "Invisible by day"],
  //          "Zac and Sam with Brytr"  "can't see the lights ... in the daytime"
  Tricia: ["Neighbors asked who did it", "Would recommend"],
  //       "neighbors calling us to ask who did the work"  "is the company to call"
  "Meghan Gibbons": ["Start to finish", "Kept informed"],
  //                 "From the initial consultation to the final installation"  "seamless"
  Antonio: ["Kept informed", "Shown the app", "Would recommend"],
  //        "communicated with me every step"  "show me how to use the app"  "Definitely recommend"
  Brett: ["Start to finish", "Fast turnaround", "Would recommend"],
  //      "From start to finish"  "Super fast turnaround"  "I highly recommend"
};

/* Ordered by how often it comes up in the six, then alphabetically, so the rack is a
 * ranking rather than a list. */
const tagCounts = Object.values(mentions)
  .flat()
  .reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {});
const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

/* WHY THE NUMBER IS WHAT IT IS. Practice, not adjectives — every one of these is a thing
 * described elsewhere on the site with its own page. */
const practice: { h: string; p: string; href: string }[] = [
  {
    h: "The same crew, start to finish",
    p: "The person who quoted your house is on the ladder at it, and is the person who comes back if anything needs looking at.",
    href: "/about",
  },
  {
    /* WAS "Signed off twice, by you / Once from the curb, once walking every scene with you."
       There is no daylight curb sign-off - the client struck it off the punch list - so there
       is one sign-off on this site and it is the scene walk. */
    h: "Signed off with you standing there",
    p: "Every scene walked through with you before anybody leaves. A job is not finished until that has happened.",
    href: "/how-it-works",
  },
  {
    h: "One recommendation, not a default",
    p: "We install more than one brand and quote the one your roofline actually calls for, including when that is the cheaper one.",
    href: "/lighting-systems",
  },
  /* TWO CARDS SAID THE SAME THING. "One number to call / the people who fitted it are the people
     who answer the phone, and they are twenty minutes away" sat directly beside the card below it,
     which makes the same claim without the invented drive time. Two cards, one point, and five
     cards in a three-column row left the last row a third empty. Four now, and the row fills at
     every width. */
  {
    h: "One number, answered locally",
    p: "A service call goes to the people who installed it. Not a portal, not a franchise dispatcher, not a manufacturer's queue.",
    href: "/contact",
  },
];

export default function Reviews() {
  const featured = reviews.find((r) => r.feature) ?? reviews[0];
  const rest = reviews.filter((r) => r !== featured);

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Brytr Co",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewProof.average,
            reviewCount: String(reviewProof.count),
            bestRating: "5",
          },
        }}
      />

      <PageHero
        photo="/img/g-moonrise.jpg"
        photoAlt="An Omaha home under a full moon with its roofline and gables lit, blue with the gables in warm white"
        objectPosition="50% 48%"
        h1="What Omaha homeowners say after the crew leaves."
        lede="We would rather send you to the profile than retype our own reviews, so this page does both: the ones we quote in full, and what all of them keep coming back to."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/reviews"]} ground="muted" />


      {/* ── THE RATING, AND WHAT THE REVIEWS MENTION ──
        * The organizing device for the page. Counts are of the six quoted below
        * and say so on the label, because that is the number we have read. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[34fr_66fr] lg:gap-14">
          <div>
            <p className="u mt-4 text-[clamp(4rem,9vw,7rem)] font-medium leading-[0.85] text-foreground">
              {reviewProof.average}
            </p>
            <p className="u mt-4 text-lg text-muted-foreground">
              from {reviewProof.count} reviews
            </p>
            <p className="mt-5 max-w-[36ch] text-[0.95rem] leading-relaxed text-muted-foreground">
              Every one of them left by somebody in this metro, on a platform where we cannot edit,
              reorder or hide any of it.
            </p>
            <div className="mt-7">
              <TextLink href={reviewProof.url}>Read all {reviewProof.count} on Google</TextLink>
            </div>

            {/* why the quotes below are typed out rather than pulled in by a widget */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="label text-muted-foreground">Why there is no review widget</p>
              <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
                A carousel loaded in by script can be filtered, reordered and cached, and you have no way
                of telling which. Copying six of them by hand and naming the date we read the profile is
                slower, uglier and checkable.
              </p>
            </div>
          </div>

          <div>
            <SectionHead
              title="What do they actually talk about?"
            />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {tags.map(([t, n]) => (
                <li
                  key={t}
                  className="flex items-baseline justify-between gap-4 rounded-lg bg-background px-5 py-3.5 shadow-[var(--shadow-lg)] ring-1 ring-border"
                >
                  <span className="font-display text-[0.95rem] font-bold text-foreground">{t}</span>
                  <span className="u shrink-0 text-sm font-medium text-accent-ink">{n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Counts are of the six reviews quoted in full below, not of all {reviewProof.count}. Counting
              themes across the whole profile would mean reading the whole profile, and we have not.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE QUOTES ──
        * Verbatim, tagged with what each one earned. Nothing paraphrased,
        * nothing tidied, nothing lengthened. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="In full, and unedited."
          />

          <figure className="mt-10 rounded-lg bg-primary p-8 shadow-[var(--shadow-dark)] lg:p-10">
            <blockquote className="max-w-[58ch] font-display text-[clamp(1.25rem,2.2vw,1.7rem)] font-bold leading-[1.28] text-on-dark">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-t border-on-dark/12 pt-5">
              <p className="text-sm text-on-dark-muted">
                <span className="font-display font-bold text-on-dark">{featured.name}</span>
                {featured.when ? ` · ${featured.when}` : ""} · {reviewProof.platform}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {(mentions[featured.name] ?? []).map((t) => (
                  <li
                    key={t}
                    className="u text-[0.7rem] uppercase tracking-[0.08em] text-accent"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          {/* AN ODD COUNT IN A TWO-COLUMN GRID LEAVES A HOLE.
            * The array holds an odd number of verbatim reviews and one is pulled out above as the
            * feature, so an odd count lands here - the last row had one card and one empty cell,
            * roughly 680 x 340px of bare page. The answer is not to drop a real review to make the
            * arithmetic work: the last card spans both columns, which closes the row and reads as
            * a deliberate final quote rather than a remainder. */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {rest.map((r, i) => (
              <figure
                key={r.name}
                className={`flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ring-1 ring-border ${
 rest.length % 2 === 1 && i === rest.length - 1 ? "lg:col-span-2" : ""
                }`}
              >
                {googleLogo && (
                  <Image
                    src={googleLogo}
                    alt={`Reviewed on ${reviewProof.platform}`}
                    width={20}
                    height={20}
                    unoptimized
                    className="mb-5 size-5"
                  />
                )}
                <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-foreground">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    {/* NO NAME AND NO TAG CHIPS. rules.md D12 bans reviewer names in review cards,
                      * and D5 bans pills and badges anywhere: the little uppercase bordered words
                      * under each quote were badges. What is left is the thing that makes a review
                      * checkable, which is where the person is and roughly when they wrote it. */}
                    <span className="font-display font-bold text-foreground">Omaha homeowner</span>
                    {r.when ? ` · ${r.when}` : ""}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-6 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
            We do not write testimonials, edit them for length, or fix anybody&rsquo;s punctuation. If a
            reviewer changes or removes what they wrote, it comes off this page.{" "}
            <Link
              href={reviewProof.url}
              className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
            >
              The profile these came from
            </Link>.
          </p>
        </div>
      </section>

      {/* ── WHAT THEY ARE REVIEWING ──
        * A page of testimony with no photograph of the thing being testified about. Three
        * installs, so the quotes above have something to point at. */}
      <PhotoStrip
        title="The work behind the rating."
        lede="Every review on this page was written by somebody in this metro about a house in this metro. These are installs of the kind they are describing."
        shots={pick("reviews", 3)}
        cols={3}
        ground="raise"
      />

      {/* ── WHY THE NUMBER IS WHAT IT IS ──
        * Practice rather than adjectives, and every one links to the page that
        * has to back it up. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="Practices, not adjectives."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {practice.map((f) => (
              <article key={f.h} className="flex flex-col rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
                <h3 className="font-display text-lg font-bold leading-snug text-on-dark">{f.h}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">{f.p}</p>
                <div className="mt-5 border-t border-on-dark/12 pt-4">
                  <TextLink onDark href={f.href}>See how</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta variant="phone" photos={valueProps["/reviews"].photos} panelLink={{ href: reviewProof.url, label: `Read all ${reviewProof.count} reviews` }} />
    </Shell>
  );
}
