import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/content/systems";
import { systemDetail } from "@/content/system-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /lighting-systems — WAVE 3, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row that counted the eight cards below it,
 * eight cards each illustrated with the SAME drawn elevation at three rotating massings —
 * and that drawing took a hex value as a prop from a component file, which is the one thing
 * the brand lock forbids. Then two spec tables in a row, a stats band repeating two figures
 * the hero had already printed, a third spec table, and two closers.
 *
 * THEN IT WAS A PACKAGE PAGE, WHICH WAS WORSE. The rebuild was organised around a choice
 * between two named tiers, a premium one and a value one, with a nine-row table comparing
 * them and three house profiles recommending one or the other. None of it was real: the
 * company does not sell packages, the tier names were mine, and the rows carried figures
 * nobody had given me. The client, plainly, on camera: they do not have packages, talk
 * about the light they actually install, which is Haven.
 *
 * So the page is the Haven lineup now. The roofline run is the system; the soffit,
 * landscape and overhead lines are additions to it; the app operates all of it. Every value
 * in the sheet below is a spec that already sits in content/systems.ts against the product
 * it describes, and the rated-life row is gone because that figure was invented.
 *
 * Archetype: spec hero (photograph + no form) → the roofline and the app → the sheet with
 * a consequence column → the lineup by role → three property shapes. Closer: the form,
 * because the hero has not carried one.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Systems We Install",
  description:
    "The permanent lighting we install in Omaha: Haven Evolution on the roofline, Q Series soffit, 9 Series landscape, X Bistro overhead, and the app behind it.",
  alternates: { canonical: "/lighting-systems" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Lighting systems", href: "/lighting-systems" }];

/* THE ROOFLINE SHEET. Third column is the whole point: a spec with no consequence attached
 * is a number, and a number does not help anybody decide anything. Every value in the
 * middle column is a Haven figure already carried on the product's own page. */
const sheet: { spec: string; value: string; why: string }[] = [
  {
    spec: "White light",
    value: "Dedicated warm white channel",
    why: "The single biggest visible difference in this category. A color-mixed white reads a shade cooler and slightly less even, and warm white is the setting most houses sit on all year.",
  },
  {
    spec: "LED spacing",
    value: "4 in.",
    why: "Closer spacing reads as a continuous line rather than a string of points. On a broken-up roofline you will not notice; on a long straight two-story eave you will.",
  },
  {
    spec: "Diffuser",
    value: "Frosted polycarbonate",
    why: "What you look at from the street is the diffuser, not the diode. It is the part that decides whether the run is a line of light or a row of bright dots.",
  },
  {
    spec: "Channel finish",
    value: "Color matched to your fascia",
    why: "This is the daylight test. A matched extrusion reads as trim from the curb; a stock white channel on a bronze fascia does not.",
  },
  {
    spec: "Zones",
    value: "Per elevation and per fixture type",
    why: "Zones are what let the back of the house stay dark while the front is lit. They are wired on install day, so this is decided before anybody drills.",
  },
  {
    spec: "Dimming",
    value: "1 to 100 percent",
    why: "Dimming is how a color stays clean rather than turning to glare. It matters most on a low ranch elevation close to the street.",
  },
  {
    spec: "Weather rating",
    value: "IP66",
    why: "It survives a Nebraska winter. It does not survive a bad install, which is why the fastening and the sealing get the attention on this site.",
  },
  {
    spec: "App",
    value: "Haven, iOS and Android",
    why: "Scenes, sunset scheduling, zoning and dimming, on the same app whether the light is on the roofline, in the beds or over the patio.",
  },
];

/* WHAT THE SHEET DOES NOT COVER. Printing this is what keeps the sheet above from reading
 * as a hardware brochure: none of it is on a datasheet and all of it decides whether the
 * run is still right in year three. */
const identical: string[] = [
  "The same crew on every job, measure to handover",
  "The same fastening method into the fascia board, never through a shingle",
  "Every penetration sealed at the moment it is made",
  "Mitered corners at every gable, dormer, bay and valley",
  "The daylight curb check and the after-dark scene walk, both signed off by you",
  "The same fastening and sealing method, whichever hardware is on the house",
];

/* THE TWO THINGS EVERY JOB HAS. The roofline run, and the layer that operates it. */
const core: { slug: string; role: string }[] = [
  { slug: "haven-evolution", role: "The roofline" },
  { slug: "app-and-controls", role: "The controls" },
];

/* THE LINEUP BY ROLE. Seven pages, four roles, and the roles are the thing nobody
 * explains, which is why people arrive thinking they have seven choices to make. */
const roles: { heading: string; note: string; slugs: string[] }[] = [
  {
    heading: "Where the run itself goes",
    note: "The roofline, on every job",
    slugs: ["haven-evolution"],
  },
  {
    heading: "What goes on with it",
    note: "Additions, not alternatives",
    slugs: ["haven-q-series", "haven-9-series-landscape-lights", "haven-x-bistro-lights"],
  },
  {
    heading: "How all of it is operated",
    note: "The layer you actually touch",
    slugs: ["app-and-controls"],
  },
  {
    heading: "The other system we install",
    note: "Reviewed by the people who fit it",
    slugs: ["jellyfish-lighting"],
  },
];

/* THREE PROPERTIES. The recommendation logic, published, because the shape of the building
 * decides what goes on it and almost nobody in this trade writes that down. */
const houses: { h: string; profile: string[]; verdict: string; slug: string }[] = [
  {
    h: "A single-story ranch, front elevation only",
    profile: [
      "One elevation lit, warm white most of the year",
      "Roofline broken up by a gable or two",
      "Nobody in the house is going to open the app weekly",
    ],
    verdict:
      "The roofline run and nothing else, and we will say so at the table. On a run this length in one color, the money is better spent getting the line straight and the corners mitered than on anything added to it.",
    slug: "haven-evolution",
  },
  {
    h: "A two-story with dormers and a long eave line",
    profile: [
      "Front and both sides, three or more zones",
      "Long unbroken runs where spacing shows",
      "Color on gamedays and holidays, white the rest of the year",
    ],
    verdict:
      "The roofline run, plus soffit fixtures wherever the overhang is deep enough to take them. This is the house where the spacing and the matched channel are visible from the curb, and where the wash off the soffit does something the trim line cannot.",
    slug: "haven-q-series",
  },
  {
    h: "A property rather than a house",
    profile: [
      "Roofline, plus beds, walls, a pergola or a pool deck",
      "One app expected to run all of it",
      "Scenes that span the house and the yard together",
    ],
    verdict:
      "The roofline run plus the ground-level and overhead lines on the same visit. The saving on doing the beds and the pergola while the crew is already on site is most of the cost of a second visit.",
    slug: "haven-9-series-landscape-lights",
  },
];

const bySlug = (slug: string) => systems.find((s) => s.slug === slug)!;

export default function SystemsHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/channel-detail.jpg"
        photoAlt="Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave"
        objectPosition="50% 55%"
        h1="The lines we install, and what each is for."
        lede="Haven Lighting makes the roofline channel, the soffit and architectural fixtures, the ground-level lights and the overhead bistro runs. We install all of it, which is why everything on a property answers to one app instead of three."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/lighting-systems"]} ground="card" />


      {/* ── THE ROOFLINE, AND THE LAYER THAT RUNS IT ──
        * This slot used to hold two invented tiers side by side, as though the page were
        * asking you to pick one. Nobody picks. Every job is the roofline run plus the app,
        * so those are the two panels. */}
      {/* bg-muted: the sheet immediately below is on bg-background, and this section landed
        * on the same ground when I moved it out of the hero. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            /* Not "the two things": the panels are directly underneath and counting them in
              * the heading is the habit I keep having to be told about. */
            title="The roofline run, and the app that operates it."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {core.map((c) => {
              const sy = bySlug(c.slug);
              const d = systemDetail[c.slug];
              return (
                <article key={c.slug} className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                    <p className="label flex items-center gap-3 text-foreground">
                      <span className="block h-4 w-1 bg-accent" aria-hidden />
                      {c.role}
                    </p>
                    <p className="text-xs text-muted-foreground">{sy.maker}</p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-display text-[1.3rem] font-bold leading-snug text-foreground">
                      <Link href={`/lighting-systems/${c.slug}`} className="hover:text-accent-deep">{sy.name}</Link>
                    </h3>
                    <p className="mt-3 text-[1.02rem] leading-relaxed text-muted-foreground">
                      {d?.position ?? sy.short}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border ring-1 ring-border">
                      {sy.specs.slice(0, 4).map((sp) => (
                        <div key={sp.label} className="bg-card px-4 py-3.5">
                          <dt className="label text-muted-foreground">{sp.label}</dt>
                          <dd className="mt-1.5 text-[0.9rem] font-semibold leading-snug text-foreground">{sp.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto border-t border-border pt-5">
                      <TextLink href={`/lighting-systems/${c.slug}`}>The full sheet for {sy.name}</TextLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE SHEET ──
        * The roofline hardware, with a consequence written against every row. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Every row, and what it actually does to the house."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[22fr_26fr_52fr] lg:gap-8">
              <p className="label text-on-dark-muted">Spec</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Haven Evolution
              </p>
              <p className="label text-on-dark-muted">Why it matters</p>
            </div>
            <ul className="divide-y divide-border">
              {sheet.map((r) => (
                <li key={r.spec} className="grid gap-3 px-6 py-5 lg:grid-cols-[22fr_26fr_52fr] lg:gap-8">
                  <p className="font-display text-[0.95rem] font-bold text-foreground">{r.spec}</p>
                  {/* the value column is marked by a SURFACE shift and the amber tick in the
                    * header, not by a colored strip down the side of the cell. slopcheck flags
                    * the strip, and it is right to: a colored left border on a block is as
                    * reliable a tell as an em-dash in a sentence. */}
                  <div className="rounded-sm bg-muted px-4 py-3 lg:-my-1">
                    <p className="label mb-1 text-accent-ink lg:hidden">Haven Evolution</p>
                    <p className="text-[0.95rem] font-medium text-foreground">{r.value}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* what the sheet cannot tell you. The rows above are only honest with this
            * under them. */}
          <div className="mt-8 rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            {/* NO EYEBROW. The small amber label that sat here was the device the client had
              * removed from every section on the home page: "remove all of these little headings
              * before sections." These three survived because they are inside dark panels rather
              * than above section heads, which is a distinction the reader does not make. */}
            <h3 className="max-w-[46ch] font-display text-xl font-bold text-on-dark">
              The hardware is the half of this you can shop, and none of it is on a datasheet.
            </h3>
            <ul className="mt-6 grid gap-x-10 gap-y-0 lg:grid-cols-2">
              {identical.map((x) => (
                <li
                  key={x}
                  className="border-t border-on-dark/12 py-3 text-[0.95rem] leading-relaxed text-on-dark-muted"
                >
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
              Good hardware fastened badly fails before cheap hardware fastened properly does, and
              the failures in this category are workmanship far more often than product. That is why
              the crew who measures your house is the crew who fits it and signs it off.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THE SPEC ROWS TURN INTO ──
        * Twenty thousand characters of hardware argument on this page and, until now, not one
        * photograph below the hero. Every row in the sheet above is a claim about what a part
        * does to a building, and a spec table cannot settle any of them.
        *
        * The pair is chosen deliberately: the daylight frame answers the row about colour
        * matching, and the close frame answers the row about LED spacing. Those are the two
        * specifications on this page a homeowner can actually verify with their own eyes, so
        * those are the two that get photographs. */}
      <PhotoPair
        title="The specifications you can check yourself."
        lede="Most of the sheet above has to be taken on trust. These two do not: whether the channel disappears by day, and how far apart the points sit."
        a="dayBrickGable"
        b="homeEaveDownlights"
        aLabel="Colour matched to the fascia. This is the row about finish, photographed at noon rather than asserted."
        bLabel="And the spacing row: individual points under the eave, set at the measure rather than judged on the day."
        ground="raise"
      />

      {/* ── THE LINEUP, BY ROLE ──
        * Seven pages, four roles. People arrive thinking they have seven
        * choices; they have a roofline run, plus some additions. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Most of these are additions, not alternatives."
          />

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
            {roles.map((g) => (
              <div key={g.heading} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                  <p className="label flex items-center gap-3 text-foreground">
                    <span className="block h-4 w-1 bg-accent" aria-hidden />
                    {g.heading}
                  </p>
                  <p className="text-sm text-muted-foreground">{g.note}</p>
                </div>
                <ul className="divide-y divide-border">
                  {g.slugs.map((sl) => {
                    const s = bySlug(sl);
                    const d = systemDetail[sl];
                    return (
                      <li key={sl}>
                        <Link
                          href={`/lighting-systems/${sl}`}
                          className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                        >
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                              {s.name}
                            </span>
                            <span className="u shrink-0 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                              {s.maker}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                            {d?.position ?? s.short}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PROPERTIES ──
        * The recommendation logic, published. What goes on a house is decided
        * by the shape of the house, and one of these three is us saying buy less. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="What we would quote you, by the shape of the property."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {houses.map((x) => {
              const s = bySlug(x.slug);
              return (
                <article
                  key={x.h}
                  className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10"
                >
                  <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{x.h}</h3>
                  <ul className="mt-5 divide-y divide-on-dark/10 border-y border-on-dark/10">
                    {x.profile.map((p) => (
                      <li key={p} className="py-2.5 text-sm leading-relaxed text-on-dark-muted">{p}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex-1">
                    <p className="label text-accent">Where it starts</p>
                    <p className="mt-1.5 font-display text-lg font-bold text-on-dark">{s.name}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">{x.verdict}</p>
                  </div>
                  <div className="mt-6 border-t border-on-dark/12 pt-4">
                    <TextLink onDark href={`/lighting-systems/${x.slug}`}>The spec sheet</TextLink>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-7 max-w-[80ch] text-sm leading-relaxed text-on-dark-muted">
            None of this is a substitute for a measure. It is the reasoning we would use, published so
            you can check whether the person in your driveway is using it.{" "}
            <Link
              href="/compare"
              className="text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              How these compare with the brands we do not carry
            </Link>.
          </p>
        </div>
      </section>

      <PageCta omit={["/compare"]}
        /* The what-we-would-quote section above is bg-primary, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="muted"
      />
    </Shell>
  );
}
