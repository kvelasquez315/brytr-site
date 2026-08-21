import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityBySlug, metroCities } from "@/content/cities";
import { photoForCity } from "@/content/city-detail";
import { serviceFaqsFor } from "@/content/faqs";
import { reviewProof } from "@/content/reviews";
import { Shell } from "@/app/layout-shell";
import { Faq } from "@/components/sections/faq";
import { PageHero, PageCta, ServiceRows, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip, PhotoSplit } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, localBusiness, faqSchema } from "@/lib/schema";

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
    title: `Permanent Outdoor Lighting ${c.name} ${c.state} | Installed Once`,
    description: `Permanent outdoor lighting installed in ${c.name}, ${c.state}. Roofline, landscape, hardscape and bistro runs by our own crews. ${c.drive} from the shop. ${reviewProof.average} from ${reviewProof.count} reviews.`,
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

/* Four services per band rather than all eleven on all eighteen pages. Chosen for what the
 * band actually asks for: the metro is roofline-and-whole-home country, over the river the
 * hardscape and takeover work comes up more, and on a route day the repairs fill the gaps
 * between installs. */
const servicesFor = (tier: string) =>
  tier === "metro"
    ? ["permanent-outdoor-lighting", "permanent-roofline-lighting", "permanent-christmas-lights", "landscape-lighting"]
    : tier === "iowa"
    ? ["permanent-roofline-lighting", "permanent-christmas-lights", "hardscape-lighting", "repairs-and-service"]
    : ["permanent-outdoor-lighting", "permanent-christmas-lights", "landscape-lighting", "repairs-and-service"];

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cityBySlug(slug);
  if (!c) notFound();
  const pic = photoForCity(c.slug);
  const faqs = serviceFaqsFor(`a permanent lighting install in ${c.name}`);
  const nearby = (c.nearby.map(cityBySlug).filter(Boolean) as typeof cities)
    .slice()
    .sort((a, b) => minutes(a.drive) - minutes(b.drive));
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
        eyebrow={`${c.name}, ${c.state} · ${bandLabel}`}
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
          * ruled-off block and says the word out loud. A surface shift rather than a coloured
          * left strip, which slopcheck rejects on principle and is right to. */
        footnote={
          c.tier === "outstate" ? (
            <span className="block max-w-[62ch] rounded-sm bg-on-dark/[0.07] px-4 py-3">
              <span className="label block text-on-dark">Worth saying about this photograph</span>
              <span className="mt-1.5 block">
                It is a Brytr install in the Omaha metro, not in {c.name}. We have not
                photographed a job out here yet, and we are not going to caption a metro house
                as a local one.{" "}
                <Link href="/recent-projects" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
                  The rest of what we do not have
                </Link>.
              </span>
            </span>
          ) : (
            <>
              {c.tier === "metro"
                ? "Photographed on a Brytr install in the metro. Core territory, so a service call here gets scheduled the same week."
                : "Photographed on a Brytr install on the Nebraska side. Iowa work gets the same crews, materials and warranty, with no border premium on the quote."}{" "}
              <Link href="/how-it-works" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
                What install day looks like
              </Link>.
            </>
          )
        }
      />

      {/* ── THE BAND STRIP ──
        * Four facts, three of which are this city's own. */}
      <section className="bg-raise">
        <div className="shell grid grid-cols-2 divide-x divide-on-dark/12 py-8 lg:grid-cols-4">
          {[
            ["Drive from the shop", c.drive],
            ["Subdivisions listed here", `${c.neighborhoods.length}`],
            ["Service call", c.tier === "outstate" ? "Scheduled route" : "Same week"],
            ["Travel charge", "None, at any distance"],
          ].map(([k, v]) => (
            <div key={k} className="px-5 py-3">
              <p className="u text-lg font-medium text-on-dark">{v}</p>
              <p className="mt-1 text-xs text-on-dark-muted">{k}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE LEAD, ONE PER BAND ── */}

      {c.tier === "metro" && (
        <section className="section bg-background">
          <div className="shell grid items-start gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
            <div>
              <p className="eyebrow">Working across {c.name}</p>
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
                  Every install is designed on site after dark. We walk the property with you, talk
                  through what you actually want lit, measure the roofline, and leave you holding a
                  written quote. No charge and nothing to sign.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink href="/free-design-consultation">Book the on-site measure</TextLink>
                <TextLink href="/pricing">How the number is built</TextLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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
                Not listed? We still cover it — this is a list of where we have worked, not a boundary.
                Ring and ask.
              </p>
            </div>
          </div>
        </section>
      )}

      {c.tier === "iowa" && (
        <section className="section bg-background">
          <div className="shell">
            <SectionHead
              eyebrow="The river is not a service boundary"
              title={`${c.name} is ${c.drive} from our shop.`}
              lede="Which is closer than most of the Nebraska metro. The bridge adds nothing to a drive time and nothing to a quote, and the arithmetic below is the whole argument."
            />

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
              <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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
                  Omaha — we are pointing out that it is closer than half of the metro.
                </p>
              </div>

              <div>
                <ul className="divide-y divide-border border-y border-border">
                  {[
                    ["The same crews", "Not a partner and not a subcontractor on the Iowa side. The people who installed in Dundee last week are the people who install in Manawa this week."],
                    ["The same materials", "Both tiers, both channel finishes, the same controllers. Nothing is substituted because of a state line."],
                    ["The same warranty", "Manufacturer terms on the hardware and ours on the workmanship, written on the quote exactly as they are in Nebraska."],
                    ["No border premium", "Per-foot pricing, and the bridge is not a line item. Anybody quoting a river surcharge is quoting you for their own inconvenience."],
                    ["The covenant paperwork", "Iowa associations word things differently from west Omaha ones. We pull yours and read it either way."],
                  ].map(([h, p]) => (
                    <li key={h} className="py-5">
                      <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                  <TextLink href="/free-design-consultation">Book the on-site measure</TextLink>
                  <TextLink href="/warranty">The warranty terms</TextLink>
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
        <section className="section bg-background">
          <div className="shell">
            <SectionHead
              eyebrow={`${c.drive} each way`}
              title={`${c.name} is a route day, and that is why the price is the same.`}
              lede="We do not drive two hours for one house. We batch installs out here into route days, which is the only way the per-foot number can match the metro instead of carrying a travel charge — and it is worth understanding before you book, because it changes the scheduling rather than the work."
            />

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
              <ul className="divide-y divide-border border-y border-border">
                {[
                  ["What a route day is", `A crew leaves the shop early, works ${c.name} and the towns around it for the day, and comes back. Two or three properties, sometimes four on smaller runs.`],
                  ["What it means for your date", "We hold a window rather than a day until there is enough work out here to fill it, then it firms up and we ring you. That wait is the honest cost of not being charged for the drive."],
                  ["What it does not change", "The crew, the method, the sealing, the mitered corners, the curb check and the scene walk at dusk. Identical to a metro job, because it is the same two people."],
                  ["What it means for a service call", "Scheduled onto the next route rather than same-week. If something is genuinely urgent we will tell you honestly whether that is days or a fortnight."],
                  ["Why we still do it", `There is nobody out here carrying two tiers, so the alternative for a ${c.name} homeowner is one brand and one price. That is worth a drive.`],
                ].map(([h, p]) => (
                  <li key={h} className="py-5">
                    <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-5">
                <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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
            eyebrow="Most asked for here"
            title={`What ${c.name} books.`}
            /* One sentence on eighteen pages. The three bands genuinely do book different
              * work — the metro adds landscape and hardscape on the same visit, the Iowa side
              * skews to roofline first, and out here it is whole-property in one trip because
              * a second trip is a route day — so each band says its own thing. */
            lede={
              c.tier === "metro"
                ? "Everything we offer is available at this address, and in the metro it is normal for two or three of these to go on the same visit — the crew is already there and the controller is already being commissioned."
                : c.tier === "iowa"
                ? "Everything we offer is available at this address. Over the river it starts with the roofline more often than it does in the metro, and the landscape and patio work tends to get added a season later once people have lived with it."
                : "Everything we offer is available at this address, and out here people tend to do all of it at once rather than in stages — a second visit is a route day, so it is worth scoping the whole property while the crew is on it."
            }
          />
          <div className="mt-9"><ServiceRows only={servicesFor(c.tier)} columns={2} /></div>
          <div className="mt-8"><TextLink href="/services">Everything we offer, grouped by what it attaches to</TextLink></div>
        </div>
      </section>

      {/* ── PHOTOGRAPHS, THREE PER CITY, NEVER THE SAME THREE ──
        * This template makes eighteen pages and every one of them carried a single photograph:
        * the hero. Past the fold each city page became four thousand words of drive times and
        * covenant procedure. The client, on a page in exactly this state: "this here is not how
        * pages should be with no images and just a bunch of text."
        *
        * `pick` is seeded on the slug, so Elkhorn and Gretna get different photographs and keep
        * getting the same ones on every build. What it does NOT do is claim a location: these
        * are metro installs and we do not know which town most of them are in, so the captions
        * describe the light and the page's own copy carries the city. Captioning a photograph
        * "Gretna" because it is on the Gretna page would be the easiest lie on this site to
        * tell and the easiest one to catch. */}
      <PhotoStrip
        eyebrow="Finished work"
        title="What the system looks like once the crew has gone."
        lede="Installs from around the metro rather than staged shots — photographed as they were, on properties that were already finished."
        shots={pick(c.slug, 3)}
        cols={3}
        ground="raise"
      />

      {/* ── COVENANTS ──
        * Three genuinely different situations, so three different paragraphs. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              eyebrow={c.note ? "HOA and covenants" : "Getting approved"}
              title="We handle the paperwork, not you."
            />
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              {c.tier === "metro"
                ? `Several ${c.name} developments have specific covenant language about permanent exterior lighting, and a fair amount of it was written before this product existed. We pull yours, read the actual clause, and file the submission ourselves.`
                : c.tier === "iowa"
                ? `Iowa associations word this differently from the west Omaha ones, and there are fewer of them. Where ${c.name} has one, we pull the rules and submit to the board before we schedule anything.`
                : `Most ${c.name} properties have no restriction at all. Where there is an association we handle the submission, and out here it is more often a city permit question than a covenant one.`}
            </p>
            {/* These four used to print on all eighteen pages under whichever intro the tier
              * generated. On Norfolk that meant a paragraph saying "most properties have no
              * restriction at all" followed by four bullets promising to pull your covenant
              * and eat the cost if the board refuses — the page arguing with itself. */}
            <ul className="mt-7 space-y-3">
              {c.tier === "outstate" ? (
                <>
                  <Check onDark>We find out whether there is an association at all before quoting</Check>
                  <Check onDark>Where there is one, the spec sheet and elevation go in its own format</Check>
                  <Check onDark>City permit questions we handle the same way, and usually the same week</Check>
                  <Check onDark>If an approval does not land, you owe us nothing</Check>
                </>
              ) : (
                <>
                  <Check onDark>We pull the covenant before quoting, not after</Check>
                  <Check onDark>Spec sheet and elevation submitted in the board&rsquo;s own format</Check>
                  <Check onDark>Nothing goes on the house before approval lands</Check>
                  <Check onDark>If the board says no, you owe us nothing</Check>
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
        eyebrow="After dark, on site"
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
            ? `${c.drive} from the shop, over the river — which in practice is closer than half the Nebraska metro. Same crews, same materials, same workmanship terms, and no border premium on the quote.`
            : `${c.drive} from the shop, so ${c.name} runs as a route day rather than a single call. That is worth knowing before the measure: it is the reason we will want to walk the whole property while we are on it rather than quote the roofline and come back in a season.`}
        </p>
        <p>
          Nothing is quoted off a satellite photograph. We come out after dark, walk the property with
          you and switch a sample run on against your own fascia, because warm white against red brick
          is a different colour from warm white against white siding and no catalogue will tell you
          that. You keep the written quote either way.
        </p>
      </PhotoSplit>

      {/* ── NEXT DOOR ──
        * This city's own neighbors, ordered by drive, not the eighteen-box rack. */}
      <section className="section bg-background">
        <div className="shell grid items-start gap-10 lg:grid-cols-[38fr_62fr] lg:gap-14">
          <div>
            <p className="eyebrow">Next door</p>
            <h2 className="mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.08] text-foreground">
              Where else we are, near {c.name}.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted-foreground">
              Ordered by the drive from our shop rather than alphabetically, because that is the number
              that decides how quickly anybody gets back to you.
            </p>
            <div className="mt-7">
              <TextLink href="/service-areas">Every town we drive to, with drive times</TextLink>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/service-areas/${n.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-lg bg-card px-5 py-4 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5"
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
          <SectionHead eyebrow="Questions" title={`Permanent lighting in ${c.name}.`} />
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
                  ["The measure", "Free, on site, after dark"],
                  ["Written quote", "Yours to keep"],
                  ["Systems carried", "Signature and Basic"],
                  ["Travel charge", "None"],
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
              <div className="mt-auto border-t border-on-dark/12 pt-4">
                <TextLink onDark href="/services/repairs-and-service">Service and takeovers</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        city={c.name}
        omit={["/how-it-works"]}
        /* The questions section above is bg-muted and so is the closer's default, so the two ran
          * together at the foot of all eighteen city pages. */
        ground="background"
      />
    </Shell>
  );
}
