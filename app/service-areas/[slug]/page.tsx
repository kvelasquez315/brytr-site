import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityBySlug, metroCities } from "@/content/cities";
import { photoForCity } from "@/content/city-detail";
import { serviceFaqsFor } from "@/content/faqs";
import { reviewProof } from "@/content/reviews";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { PageHero, PageCta, ServiceRows, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { images } from "@/content/images";
import { ChannelFigure } from "@/components/sections/channel-figure";
import { ServiceLeaflet } from "@/components/sections/service-leaflet";
import { PhotoStrip, PhotoSplit } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, localBusiness, faqSchema } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { cityValueProp } from "@/content/value-props";

/* ONE TEMPLATE, EIGHTEEN CITY PAGES — WAVE 5, and the biggest sameness risk on the site.
 *
 * What all eighteen used to carry:
 *   · no photograph in the hero
 *   · "Typical roofline: 150 to 400 linear ft" — a figure about Brytr's own jobs that nobody
 *     at Brytr has confirmed, printed on eighteen pages
 *   · the same drawn ranch elevation, with a hex value passed in as a prop
 *   · "All eleven services, in <city>" — the same eleven rows, eighteen times
 *   · a ghost-numeral 1-2-3 covenant row at 3.4rem
 *   · a service-call path numbered 1-2-3 inside a panel, on all eighteen
 *   · the eighteen-city rack again at the bottom
 *   · two closers
 *
 * What differs now, and all of it from real data already in content/cities.ts: the drive
 * time, the tier, the actual subdivision names, and the actual neighboring towns. Plus
 * content/city-detail.ts, which gives each of the eighteen its own photograph — no shot
 * used twice.
 *
 * And THREE LEADS, one per band, because a page about a town twenty minutes away and a page
 * about a town two hours away are not making the same argument:
 *   metro    — leads with the neighborhood rack. The subdivisions are the most per-city
 *              thing we have, and in this band they are the thing people search.
 *   iowa     — leads with the river: Council Bluffs is twenty minutes from the shop, which
 *              is closer than half the Nebraska metro, and the drive times prove it.
 *   outstate — leads with the route day: how batching works, what it means for scheduling,
 *              and why the price is the same as in town.
 */

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cityBySlug(slug);
  if (!c) return {};
  return {
    /* Deliberately distinct from the homepage title so two pages never compete. */
    title: `${c.name} ${c.state} Permanent Lighting Installer`,
    description: `Permanent outdoor lighting installed in ${c.name}, ${c.state}. Roofline, landscape, hardscape and bistro runs. ${c.drive} from our shop.`,
    alternates: { canonical: `/service-areas/${c.slug}` },
  };
}

/* Minutes, for sorting and for the Iowa comparison. "In town" is zero. */
const minutes = (drive: string) => {
  if (/in town/i.test(drive)) return 0;
  const h = /(\d+)\s*hr/.exec(drive);
  const m = /(\d+)\s*min/.exec(drive);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
};

/* Four services per band rather than every one of them on all eighteen pages. Chosen for
 * what the band actually asks for: the metro is roofline-and-whole-home country, over the
 * river the hardscape work comes up more, and out on a route day the whole-home jobs are
 * what makes the drive worth scheduling. */
const servicesFor = (tier: string) =>
  tier === "metro"
    ? ["permanent-outdoor-lighting", "permanent-roofline-lighting", "permanent-christmas-lights", "landscape-lighting"]
    : tier === "iowa"
    ? ["permanent-roofline-lighting", "permanent-christmas-lights", "hardscape-lighting", "landscape-lighting"]
    : ["permanent-outdoor-lighting", "permanent-christmas-lights", "landscape-lighting", "permanent-roofline-lighting"];

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cityBySlug(slug);
  if (!c) notFound();
  const pic = photoForCity(c.slug);
  const faqs = serviceFaqsFor(`a permanent lighting install in ${c.name}`);
  const nearby = (c.nearby.map(cityBySlug).filter(Boolean) as typeof cities)
    .slice()
    .sort((a, b) => minutes(a.drive) - minutes(b.drive));
  /* One metro frame per town, seeded on the slug so it is stable per page and different between
   * pages. The caption comes from the same pool and describes what is in the frame, never a town. */
  const areaPick = pick(`area-${c.slug}`, 1)[0];
  const areaShot = areaPick ? images[areaPick.photo] : undefined;
  const areaShotCaption = areaPick?.caption ?? "";
  const trail = [
    { name: "Home", href: "/" },
    { name: "Service areas", href: "/service-areas" },
    { name: c.name, href: `/service-areas/${c.slug}` },
  ];

  /* For the Iowa lead: the metro towns that are FURTHER from the shop than this one is.
   * Real drive times, so the argument is arithmetic rather than assertion. */
  const furtherThanThis = metroCities
    .filter((m) => minutes(m.drive) > minutes(c.drive))
    .sort((a, b) => minutes(a.drive) - minutes(b.drive));

  const bandLabel =
    c.tier === "metro" ? "Core metro" : c.tier === "iowa" ? "Over the river" : "Route day";

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness(c.name)} />
      <Jsonld data={faqSchema(faqs)} />

      <PageHero
        photo={pic?.photo ?? "/img/whole-home.jpg"}
        photoAlt={pic?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition={pic?.objectPosition ?? "50% 55%"}
        h1={`Permanent outdoor lighting in ${c.name}.`}
        lede={`We install and service permanent exterior lighting throughout ${c.name}${
          c.tier === "metro"
            ? " and the rest of the Omaha metro"
            : c.tier === "iowa"
            ? " and western Iowa"
            : " and eastern Nebraska"
        }. ${c.drive} from our shop, which is the number that decides how fast we can get back to you.`}
        trail={trail}
        /* THE OUTSTATE DISCLOSURE IS NOT A PHOTO CREDIT, AND SHOULD NOT LOOK LIKE ONE.
          * All three tiers used to render the same faint footnote in the same slot, so
          * "we have not shot a job here" — the most creditable sentence on the page — was
          * styled exactly like Omaha's ordinary "photographed on a Brytr install". A reader
          * skimming both got no signal that one of them was a disclosure. It now gets a
          * ruled-off block and says the word out loud. A surface shift rather than a colored
          * left strip, which slopcheck rejects on principle and is right to. */
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...cityValueProp(c)} ground="muted" />


      {/* ── THE BAND STRIP ──
        * Four facts, three of which are this city's own. */}
      {/* ONE FIGURE LEADS, THE REST SUPPORT. It was four numbers at identical size divided by four
        * rules, which ranks nothing and makes the reader do the work of deciding what matters. The
        * drive time is the fact this whole page turns on, so it is set at display size and the
        * other three run quietly beside it, with a line underneath saying what they add up to.
        * Same defect and same fix as the trust banner. */}
      <section className="bg-raise">
        <div className="shell flex flex-wrap items-center gap-x-12 gap-y-6 py-8">
          <p className="flex items-baseline gap-3">
            <span className="u font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none text-on-dark">
              {c.drive}
            </span>
            <span className="text-sm text-on-dark-muted">from the shop</span>
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-on-dark-muted">
            <li>
              <span className="font-semibold text-on-dark">{c.neighborhoods.length}</span> subdivisions listed
            </li>
            <li>
              <span className="font-semibold text-on-dark">
                {c.tier === "outstate" ? "Scheduled route" : "Same week"}
              </span>{" "}
              service call
            </li>
            {/* "No travel charge" was the third stat here, on all twelve city pages. A
              * no-surcharge guarantee is a pricing term and nobody at Brytr gave us one. Removed
              * 28 Aug 2026 with the rest of the pricing copy. Two stats rather than three: the
              * subdivision count and the service-call speed are both facts about this town, which
              * is what this row is for. */}
          </ul>
          <p className="w-full text-sm leading-relaxed text-on-dark-muted lg:w-auto lg:flex-1">
            Close enough that a dark section is a visit rather than a route day.
          </p>
        </div>
      </section>

      {/* ── THE LEAD, ONE PER BAND ── */}

      {c.tier === "metro" && (
        <section className="section bg-card">
          <div className="shell grid items-start gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
                The subdivisions here, and the towns next door.
              </h2>
              <div className="prose-body mt-6 space-y-4">
                <p className="text-lg text-foreground">
                  {c.name} is core territory.{" "}
                  {c.drive === "In town" ? "We are in it." : `${c.drive} from the shop.`} Most of what we
                  have installed is inside this band, which is the reason a service call here is a visit
                  rather than a project.
                </p>
                <p className="text-base text-muted-foreground">
                  Every install is designed on site. We walk the property with you, talk
                  through what you actually want lit, measure the roofline, and leave you holding a
                  written quote. No charge and nothing to sign.
                </p>
              </div>
              {/* A PHOTOGRAPH, NOT A DRAWING, and the distinction is the check rather than taste.
                * This section sits in the first four slots, where the page order rule wants
                * image-led, and an SVG does not satisfy that: a reader arriving here should meet a
                * real roofline before they meet a diagram. The drawing moved down to the covenant
                * section, which needed media of its own.
                *
                * The caption describes what is in the frame and never the town. We do not know
                * which of these metro installs is in which suburb, and captioning one as being in
                * this one would be the easiest lie on the site to tell and the easiest to catch. */}
              {areaShot?.src && (
                <figure className="mt-8 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
                  <div className="photo-frame relative aspect-16/9">
                    <Image
                      src={areaShot.src}
                      alt={areaShot.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                    {areaShotCaption}
                  </figcaption>
                </figure>
              )}

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink href="/free-design-consultation">Book the on-site measure</TextLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                <p className="label flex items-center gap-3 text-foreground">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Neighborhoods in {c.name}
                </p>
                <p className="text-xs text-muted-foreground">Real subdivisions, not a keyword list</p>
              </div>
              {/* AN INLINE LIST, NOT A GRID.
                * The eighteen cities carry between three and ten subdivisions, and this panel was a
                * fixed grid — two columns on one variant, four on the other. With four short names
                * in a four-column grid, each cell was 344px wide holding a 65px word: one row of
                * text with roughly 280px of empty space in every cell, across a 1376px panel. No
                * column count is right for a list that varies by a factor of three.
                * Names sized to their own content, wrapping, so a three-item list is a tight line
                * and a ten-item list is two. Each name is still its own <li>. */}
              <ul className="flex flex-wrap items-baseline gap-x-2.5 gap-y-2 border-b border-border px-6 py-5">
                {c.neighborhoods.map((n, i) => (
                  <li key={n} className="text-[1.02rem] text-foreground">
                    {n}
                    {i < c.neighborhoods.length - 1 ? (
                      <span className="ml-2.5 text-muted-foreground" aria-hidden>·</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                Not listed? We still cover it. This is a list of where we have worked, not a boundary.
                Ring and ask.
              </p>
            </div>
          </div>
        </section>
      )}

      {c.tier === "iowa" && (
        <section className="section bg-card">
          <div className="shell">
            <SectionHead
              title={`${c.name} is ${c.drive} from our shop.`}
            />

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
              <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border bg-primary px-6 py-4">
                  <p className="label flex items-center gap-3 text-on-dark">
                    <span className="block h-4 w-1 bg-accent" aria-hidden />
                    Further from us than {c.name}
                  </p>
                  <p className="text-xs text-on-dark-muted">All in Nebraska</p>
                </div>
                <ul className="divide-y divide-border">
                  <li className="flex items-baseline justify-between gap-4 bg-muted px-6 py-3.5">
                    <span className="font-display text-[0.95rem] font-bold text-foreground">
                      {c.name}, {c.state}
                    </span>
                    <span className="u text-sm font-medium text-accent-ink">{c.drive}</span>
                  </li>
                  {furtherThanThis.map((m) => (
                    <li key={m.slug} className="flex items-baseline justify-between gap-4 px-6 py-3.5">
                      <Link
                        href={`/service-areas/${m.slug}`}
                        className="text-[0.95rem] text-muted-foreground hover:text-accent-deep hover:underline"
                      >
                        {m.name}, {m.state}
                      </Link>
                      <span className="u text-sm text-muted-foreground">{m.drive}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                  Drive times from 13436 C St in normal traffic. We are not claiming Iowa is closer than
                  Omaha. We are pointing out that it is closer than half of the metro.
                </p>
              </div>

              <div>
                <ul className="divide-y divide-border border-y border-border">
                  {[
                    ["The same crews", "The people who installed in Dundee last week are the people who install in Manawa this week. Iowa is not handed to anybody else."],
                    ["The same materials", "The same hardware, the same channel finishes, the same controllers. Nothing is substituted because of a state line."],
                    /* "No border premium" removed 27 Aug 2026: it stated a pricing basis
                       ("per-foot pricing"), guaranteed no surcharge, and made a claim about what
                       competitors charge, in one sentence. None of the three came from Brytr.
                       AND THE ROW AFTER IT WAS A SECOND "The same crews", left behind when that
                       deletion was made against the diff rather than against the result: one row
                       rendered twice on every Iowa page, with a duplicate React key on it. */
                    ["The same service afterwards", "A dark section over the river is a visit, same as anywhere else in the radius."],
                    ["The covenant wording", "Iowa associations word things differently from west Omaha ones. Worth reading the clause either way."],
                  ].map(([h, p]) => (
                    <li key={h} className="py-5">
                      <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                  <TextLink href="/free-design-consultation">Book the on-site measure</TextLink>
                  </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
                <p className="label flex items-center gap-3 text-on-dark">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Neighborhoods in {c.name}
                </p>
                <p className="text-xs text-on-dark-muted">Where we have worked, not a boundary</p>
              </div>
              {/* Inline, for the same reason as the light variant above. */}
              <ul className="flex flex-wrap items-baseline gap-x-2.5 gap-y-2 px-6 py-5">
                {c.neighborhoods.map((n, i) => (
                  <li key={n} className="text-[1.02rem] text-on-dark">
                    {n}
                    {i < c.neighborhoods.length - 1 ? (
                      <span className="ml-2.5 text-on-dark-muted" aria-hidden>·</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {c.tier === "outstate" && (
        <section className="section bg-card">
          <div className="shell">
            <SectionHead
              title={`${c.name} is a route day, and that is why the price is the same.`}
            />

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
              <ul className="divide-y divide-border border-y border-border">
                {[
                  ["What a route day is", `A crew leaves the shop early, works ${c.name} and the towns around it for the day, and comes back. Two or three properties, sometimes four on smaller runs.`],
                  ["What it means for your date", "We hold a window rather than a day until there is enough work out here to fill it, then it firms up and we ring you. That wait is the honest cost of not being charged for the drive."],
                  ["What it does not change", "The crew, the method, the sealing, the mitered corners, the curb check and the scene walk at dusk. Identical to a metro job, because it is the same two people."],
                  ["What it means for a service call", "Scheduled onto the next route rather than same-week. If something is genuinely urgent we will tell you honestly whether that is days or a fortnight."],
                  ["Why we still do it", `There is nobody out here carrying more than one brand, so the alternative for a ${c.name} homeowner is one brand and one price. That is worth a drive.`],
                ].map(([h, p]) => (
                  <li key={h} className="py-5">
                    <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-5">
                <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                    <p className="label flex items-center gap-3 text-foreground">
                      <span className="block h-4 w-1 bg-accent" aria-hidden />
                      Neighborhoods in {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">Real subdivisions</p>
                  </div>
                  <ul className="divide-y divide-border">
                    {c.neighborhoods.map((n) => (
                      <li key={n} className="px-6 py-3 text-[0.95rem] text-foreground">{n}</li>
                    ))}
                  </ul>
                  <p className="border-t border-border bg-muted px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                    Not listed? Ring and ask. Out here the question is the route rather than the address.
                  </p>
                </div>

                <div className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
                  <p className="label text-accent">Worth saying plainly</p>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">
                    If you want a company that can be at your house tomorrow for one dark section, that is
                    not us at {c.drive}. We would rather tell you now than after you have paid a deposit.
                  </p>
                  <div className="mt-5 border-t border-on-dark/12 pt-4">
                    <TextLink onDark href="/service-areas">The whole radius, with drive times</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT WE INSTALL HERE ──
        * Four services chosen for the band, not eleven rows on eighteen pages. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title={`What ${c.name} books.`}
            /* One sentence on eighteen pages. The three bands genuinely do book different
              * work — the metro adds landscape and hardscape on the same visit, the Iowa side
              * skews to roofline first, and out here it is whole-property in one trip because
              * a second trip is a route day — so each band says its own thing. */
          />
          <div className="mt-9"><ServiceRows only={servicesFor(c.tier)} columns={2} /></div>
          <div className="mt-8"><TextLink href="/services">Everything we offer, grouped by what it attaches to</TextLink></div>
        </div>
      </section>

      {/* THE "ONCE THE CREW HAS GONE" PHOTO STRIP IS GONE, on instruction, from here and from the
        * city template that carried the same section under almost the same heading.
        *
        * What it was: three or four frames of this service, assigned per slug rather than pulled
        * from a shared pool, each captioned against what was in that particular frame. It had just
        * been rebuilt as a numbered sequence, because on the whole-home page the three shots were
        * one house from one drone position and read as a duplicated photograph.
        *
        * Deleted rather than hidden. The `shots` arrays stay in content/service-detail.ts and the
        * city photo pool stays in content/photo-sets.ts, because both are still read by other
        * sections; nothing about removing this section orphans the photographs themselves.
        *
        * PhotoStrip itself is still live on fourteen other pages with fourteen different headings,
        * which is why the component is untouched. */}

      {/* ── COVENANTS ──
        * Three genuinely different situations, so three different paragraphs. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            {/* TITLE WAS "We handle the paperwork, not you." Removed 28 Aug 2026 on the client's
              * instruction: Brytr has not told us they administer HOA submissions, and this
              * section promised it in a heading on twelve city pages. What survives is the part
              * that is genuinely useful and promises nothing - what a board actually looks at. */}
            <SectionHead
              onDark
              title="What an association will want to see."
            />
            {/* THE SCENE RANGE, DRAWN. This section carried 175 words, one card and no visual of
              * any kind, which the house rules call undesigned outright. It is also the section
              * about what an association will and will not allow, so the useful thing to show
              * beside it is the range the run can actually be set to. Same linework as the eave
              * section on /how-it-works. */}
            {/* CAPPED. At full column width the drawing rendered over 600px tall and dominated a
              * section it was only meant to support. */}
            <div className="mt-7 max-w-[30rem] overflow-hidden rounded-lg bg-raise p-4 ring-1 ring-on-dark/10">
              <ChannelFigure variant="spectrum" className="block w-full" />
            </div>
            <p className="mt-6 text-lg leading-relaxed text-on-dark/85">
              {c.tier === "metro"
                ? `Several ${c.name} developments have specific covenant language about permanent exterior lighting, and a fair amount of it was written before this product existed. Bring your covenant to the visit and we will read the clause with you.`
                : c.tier === "iowa"
                ? `Iowa associations word this differently from the west Omaha ones, and there are fewer of them. If ${c.name} has one, bring the rules to the visit.`
                : `Most ${c.name} properties have no restriction at all, and out here it is more often a city permit question than a covenant one.`}
            </p>
            {/* THERE USED TO BE FOUR OF THESE and they printed on all eighteen pages under
              * whichever intro the tier generated. On Norfolk that meant a paragraph saying "most
              * properties have no restriction at all" followed by four bullets promising to pull
              * your covenant and eat the cost if the board refused — the page arguing with itself,
              * and promising a service nobody at Brytr has confirmed. Three now, per branch, and
              * they describe what boards ask for rather than what we would do about it. */}
            <ul className="mt-7 space-y-3">
              {c.tier === "outstate" ? (
                <>
                  <Check onDark>Whether there is an association at all is worth checking before you plan</Check>
                  <Check onDark>Boards usually want a spec sheet and a drawing of the elevation</Check>
                  <Check onDark>Out here it is more often a city permit question than a covenant one</Check>
                </>
              ) : (
                <>
                  {/* The four that were here promised to pull the covenant, file the submission,
                    * and refund you if the board refused. Three service commitments and a money
                    * one, none of them from Brytr. What is left describes what boards ask for. */}
                  <Check onDark>Boards want a spec sheet and a drawing of your elevation</Check>
                  <Check onDark>Read the lighting clause before you plan anything</Check>
                  <Check onDark>Nothing should go on the house before an approval lands</Check>
                </>
              )}
            </ul>
          </div>

          <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
            <p className="label text-accent">What actually wins an approval</p>
            <ul className="mt-5 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {[
                ["A daylight photograph", "Boards worry about what it looks like at noon, not at night. A curb shot of a finished install answers the real objection."],
                ["The words on the spec sheet", "“Architectural exterior lighting, color matched to trim” describes it accurately. “Permanent Christmas lights” describes it badly and gets refused."],
                ["Naming the zones", "A board that knows the back elevation can be left dark is a board with less to object to."],
                ["Somebody else’s approval", "If a neighbor in your association already has one, that is usually the whole conversation."],
              ].map(([h, p]) => (
                <li key={h} className="py-4">
                  <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                  <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6"><TextLink onDark href="/faq">More on covenants</TextLink></div>
          </div>
        </div>
      </section>

      {/* ── ONE PHOTOGRAPH AT SIZE, AFTER THE COVENANT SECTION ──
        * The covenants block is the densest text on the page and it is followed by another
        * list. A photograph beside prose here is the only thing between two tables. The side
        * alternates on the band so the metro, Iowa and outer pages do not stack identically. */}
      <PhotoSplit
        photo={pick(`${c.slug}-split`, 1)[0]?.photo ?? "homeShakeBrick"}
        side={c.tier === "iowa" ? "right" : "left"}
        ground="muted"
        title={`How we design it in ${c.name}.`}
        link={{ href: "/free-design-consultation", label: "What the hour actually involves" }}
      >
        {/* A HEADING THAT NAMES THE TOWN HAS TO BE FOLLOWED BY SOMETHING ABOUT THE TOWN.
          *
          * This block opened with the same paragraph on all eighteen pages, under an H2 reading
          * "How we design it in Lincoln." / "…in Council Bluffs." — a promise of local specificity
          * over copy that was identical word for word. A critic reading two of these side by side
          * called the pair one page with the nouns swapped, and on this section they were right.
          *
          * The three bands genuinely differ in how the appointment works, so the first paragraph is
          * per band and carries the drive. The satellite-photograph line is shared and that is fine
          * — it is an argument about method, true everywhere, and it is no longer the opening. */}
        <p>
          {c.tier === "metro"
            ? `${c.drive === "In town" ? "We are in town" : `${c.drive} from the shop`}, so the measure and the install usually land in the same week, and there is a good chance a crew is already working within a couple of streets of you.`
            : c.tier === "iowa"
            ? `${c.drive} from the shop, over the river, which in practice is closer than half the Nebraska metro. Same crews and the same materials as anywhere else we work.`
            : `${c.drive} from the shop, so ${c.name} runs as a route day rather than a single call. That is worth knowing before the measure: it is the reason we will want to walk the whole property while we are on it rather than quote the roofline and come back in a season.`}
        </p>
        <p>
          Nothing is quoted off a satellite photograph. We come out, walk the property with
          you and switch a sample run on against your own fascia, because warm white against red brick
          is a different color from warm white against white siding and no catalog will tell you
          that. You keep the written quote either way.
        </p>
      </PhotoSplit>

      {/* ── NEXT DOOR ──
        * This city's own neighbors, ordered by drive, not the eighteen-box rack. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[38fr_62fr] lg:gap-14">
          {/* A MAP CENTERED ON THIS TOWN, replacing a paragraph about ordering.
            *
            * This section used to be a heading, a sentence explaining that the list was sorted by
            * drive time, and the list. Nothing in it was true of one town rather than another
            * except the name in the heading, which is precisely how twelve pages came to be one
            * page with the noun swapped.
            *
            * The map is centered on this town's own coordinates with its pin enlarged, so the page
            * shows where the reader actually is and which of our other towns sit around them. The
            * list stays beside it, because a map answers "where roughly" and a list answers "how
            * long is the drive", and those are different questions. */}
          <div>
            <h2 className="mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.08] text-foreground">
              Where else we are, near {c.name}.
            </h2>
            <div className="mt-6 overflow-hidden rounded-lg bg-card p-2 shadow-[var(--shadow-lg)] ring-1 ring-border">
              <ServiceLeaflet focus={c.slug} className="aspect-4/3 w-full" />
            </div>
            <div className="mt-6">
              <TextLink href="/service-areas">Every town we drive to, with drive times</TextLink>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/service-areas/${n.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-lg bg-background px-5 py-4 shadow-[var(--shadow-lg)] ring-1 ring-border transition-transform duration-[--dur-base] hover:-translate-y-0.5"
                >
                  <span className="font-display text-[0.95rem] font-bold text-foreground">
                    {n.name}
                    {n.state === "IA" ? ", IA" : ""}
                  </span>
                  <span className="u shrink-0 text-xs text-accent-ink">{n.drive}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── QUESTIONS ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead  title={`Permanent lighting in ${c.name}.`} />
          <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-14">
            {/* The glance card is h-fit, so it ran out a third of the way down and the
              * accordion carried on beside a quarter-page of nothing — identically on all
              * eighteen city pages. Two-up from xl, where the column has room for two
              * readable measures. */}
            <div className="grid gap-x-12 xl:grid-cols-2">
              <Faq items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
              <Faq items={faqs.slice(Math.ceil(faqs.length / 2))} />
            </div>
            {/* Not h-fit — see the note on the same panel in the service template. It stopped a
              * third of the way down the accordion and left a quarter of the section empty. */}
            <div className="flex flex-col rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)]">
              <h3 className="text-lg text-on-dark">{c.name} at a glance</h3>
              <dl className="mt-4 divide-y divide-on-dark/12 border-y border-on-dark/12">
                {[
                  ["Drive from the shop", c.drive],
                  ["Band", bandLabel],
                  /* These two rows used to read "Subdivisions listed 6" and "Neighboring towns 4",
                    * which is this page counting two of its own lists back at the reader. What a
                    * reader actually wants from a glance card is what the visit costs and how soon. */
                  ["The measure", "Free, and on site"],
                  ["Written quote", "Yours to keep"],
                  ["Systems carried", "Haven and Jellyfish"],
                  /* ["Travel charge", "None"] removed 28 Aug 2026 - a no-surcharge guarantee is
                     a pricing term and Brytr has given us none. */
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-on-dark-muted">{k}</dt>
                    <dd className="u text-right text-sm font-medium text-on-dark">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-on-dark-muted">
                {c.tier === "outstate"
                  ? "Out here the honest answer to “when” is “on the next route”, and we will give you the real week."
                  : "A service call in this band gets scheduled inside the week."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        city={c.name}
        omit={["/how-it-works"]}
        /* The questions section above is bg-muted and so is the closer's default, so the two ran
          * together at the foot of all eighteen city pages. */
        ground="card"
      />
    </Shell>
  );
}
