import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/content/systems";
import { systemDetail } from "@/content/system-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /lighting-systems — WAVE 3, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row that counted the eight cards below it,
 * eight cards each illustrated with the SAME drawn elevation at three rotating massings —
 * and that drawing took a hex value as a prop from a component file, which is the one thing
 * the brand lock forbids. Then two spec tables in a row, a stats band repeating two figures
 * the hero had already printed, a third spec table, and two closers.
 *
 * What it is now. The hub's job is the DECISION, and there is only one: premium or value.
 * So the centerpiece is that decision as a single table with a third column saying why each
 * row matters, and the tier we recommend most lit down its edge — plus, underneath it, the
 * list of everything that is identical between the two, which is the part that stops the
 * table reading as an upsell.
 *
 * Then the six things that are not alternatives at all: the hardware under each tier, the
 * three add-ons, and the control layer. Nobody explains that relationship anywhere in this
 * trade, and it is the reason people think they are choosing between eight products.
 *
 * Archetype: spec hero (photograph + the choice as a panel, no form) → the one table →
 * the lineup by role → three house profiles. Closer: the form, because the hero has not
 * carried one.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Systems We Install",
  description:
    "Every permanent lighting system Brytr installs: the Signature tier on Haven Evolution, the Basic tier on Jellyfish, and the soffit, landscape, bistro and control add-ons that bolt on to either.",
  alternates: { canonical: "/lighting-systems" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Lighting systems", href: "/lighting-systems" }];

/* THE ONE TABLE. Third column is the whole point — a spec with no consequence attached is
 * a number, and a number does not help anybody choose. */
const decision: { spec: string; sig: string; basic: string; why: string }[] = [
  {
    spec: "White light",
    sig: "Dedicated warm white channel",
    basic: "Color-mixed white",
    why: "The single biggest visible difference in this category. Mixed white reads a shade cooler and slightly less even, and warm white is the setting most houses sit on all year.",
  },
  {
    spec: "LED spacing",
    sig: "4 in.",
    basic: "Wider",
    why: "Closer spacing reads as a continuous line. On a broken-up roofline you will not notice; on a long straight two-story eave you will.",
  },
  {
    spec: "Color range",
    sig: "RGB plus white",
    basic: "RGB",
    why: "Both do color. Only the Signature tier does color and true white from separate emitters.",
  },
  {
    spec: "Zones",
    sig: "Unlimited, per elevation",
    basic: "Fewer",
    why: "Zones are what let the back of the house stay dark while the front is lit. They are wired on install day, so this is decided before anybody drills.",
  },
  {
    spec: "Dimming",
    sig: "1 to 100 percent, per zone",
    basic: "Supported",
    why: "Per-zone dimming is how a color stays clean rather than turning to a glare. It matters most on a low ranch elevation close to the street.",
  },
  {
    spec: "Channel finish",
    sig: "Color matched to your trim",
    basic: "Stock finishes",
    why: "This is the daylight test. A matched extrusion reads as trim from the curb; a stock white channel on a bronze fascia does not.",
  },
  {
    spec: "Weather rating",
    sig: "IP66",
    basic: "Sealed channel",
    why: "Both survive a Nebraska winter. Neither survives a bad install, which is why the fastening and sealing sit under our own warranty rather than the manufacturer's.",
  },
  {
    spec: "Rated life",
    sig: "25 years",
    basic: "Shorter",
    why: "Manufacturer ratings on the diodes, not a promise from us. The exact terms for the system you choose are printed on your quote.",
  },
  {
    spec: "App",
    sig: "Haven",
    basic: "Jellyfish",
    why: "Both do scenes, schedules and zones. The Haven app is the better one to live with, and that is a real part of the price gap.",
  },
];

/* WHAT IS THE SAME. Printing this is what keeps the table above from reading as a
 * pressure device. */
const identical: string[] = [
  "The same crews, on our own payroll, on both tiers",
  "The same fastening method into the fascia board, never through a shingle",
  "Every penetration sealed at the moment it is made",
  "Mitered corners at every gable, dormer, bay and valley",
  "The daylight curb check and the after-dark scene walk, both signed off by you",
  "The same workmanship coverage from us, whichever hardware is on the house",
];

/* THE LINEUP BY ROLE. Eight products, four roles — and the roles are the thing nobody
 * explains, which is why people arrive thinking they have eight choices to make. */
const roles: { heading: string; note: string; slugs: string[] }[] = [
  {
    heading: "What you choose between",
    note: "One of these two goes on your house",
    slugs: ["brytr-signature", "brytr-basic"],
  },
  {
    heading: "The hardware underneath",
    note: "The manufacturer product each tier is built on",
    slugs: ["haven-evolution", "jellyfish-lighting"],
  },
  {
    heading: "What bolts on to either tier",
    note: "Additions, not alternatives",
    slugs: ["haven-q-series", "haven-9-series-landscape-lights", "haven-x-bistro-lights"],
  },
  {
    heading: "How all of it is operated",
    note: "The layer you actually touch",
    slugs: ["app-and-controls"],
  },
];

/* THREE HOUSES. The recommendation logic, published, because a company with one brand
 * cannot write this section and a company with two has no excuse not to. */
const houses: { h: string; profile: string[]; verdict: string; slug: string }[] = [
  {
    h: "A single-story ranch, front elevation only",
    profile: [
      "One elevation lit, warm white most of the year",
      "Roofline broken up by a gable or two",
      "Nobody in the house is going to open the app weekly",
    ],
    verdict:
      "Basic, and we will say so at the table. You would be paying the premium for a dedicated white channel and a tighter pitch you will not be able to pick out from the street on a run this length.",
    slug: "brytr-basic",
  },
  {
    h: "A two-story with dormers and a long eave line",
    profile: [
      "Front and both sides, three or more zones",
      "Long unbroken runs where spacing shows",
      "Color on gamedays and holidays, white the rest of the year",
    ],
    verdict:
      "Signature. This is the house where both of the things you are paying for are visible from the curb, and where mixed white next to a dedicated channel is a difference you would notice every night.",
    slug: "brytr-signature",
  },
  {
    h: "A property rather than a house",
    profile: [
      "Roofline, plus beds, walls, a pergola or a pool deck",
      "One app expected to run all of it",
      "Scenes that span the house and the yard together",
    ],
    verdict:
      "Signature, plus the add-ons on the same visit. The saving on doing the landscape and the overhead run while the crew is already on site is most of the cost of a second visit.",
    slug: "brytr-signature",
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
        eyebrow="The materials"
        h1="Two systems on the shelf, and one of them is wrong for your house."
        lede="Most installers carry one brand and therefore arrive with the recommendation already made. We stock a premium tier and a value tier, which is the only reason we can tell you which one you actually need — including when it is the cheaper one."
        trail={trail}
      />

      {/* ── THE TWO SYSTEMS, SIDE BY SIDE ──
        * This was a stack of two cards in a 28rem hero column. Side by side at full width is
        * what the page is actually about: two things, and you pick one. A column that narrow
        * forced them into a vertical list, which reads as first and second rather than as a
        * choice — and the whole argument of this page is that the cheaper one is sometimes the
        * right answer. */}
      {/* bg-muted: the comparison table immediately below is on bg-background, and this
        * section landed on the same ground when I moved it out of the hero. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="The whole decision"
            /* Not "Two systems" — the two cards are directly underneath and counting them in
              * the heading is the habit I keep having to be told about. */
            title="One of these is named on your quote."
            lede="Everything else on this page bolts on to whichever of these you pick, so this is the only choice that changes the shape of the job."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {["brytr-signature", "brytr-basic"].map((sl) => {
              const sy = bySlug(sl);
              const d = systemDetail[sl];
              return (
                <article key={sl} className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                    <p className="label flex items-center gap-3 text-foreground">
                      <span className="block h-4 w-1 bg-accent" aria-hidden />
                      {sy.tier}
                    </p>
                    <p className="text-xs text-muted-foreground">{sy.maker}</p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-display text-[1.3rem] font-bold leading-snug text-foreground">
                      <Link href={`/lighting-systems/${sl}`} className="hover:text-accent-deep">{sy.name}</Link>
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
                      <TextLink href={`/lighting-systems/${sl}`}>The full sheet for {sy.name}</TextLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE ONE TABLE ──
        * The decision, with a consequence written against every row. */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="Premium against value"
            title="Every row, and what it actually costs you."
            lede="Every permanent lighting company publishes a spec table. Almost none of them say what a spec does to the house, which is the only part that helps you choose. The third column is that."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[20fr_23fr_20fr_37fr] lg:gap-8">
              <p className="label text-on-dark-muted">Spec</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Signature
              </p>
              <p className="label text-on-dark-muted">Basic</p>
              <p className="label text-on-dark-muted">Why it matters</p>
            </div>
            <ul className="divide-y divide-border">
              {decision.map((r) => (
                <li key={r.spec} className="grid gap-3 px-6 py-5 lg:grid-cols-[20fr_23fr_20fr_37fr] lg:gap-8">
                  <p className="font-display text-[0.95rem] font-bold text-foreground">{r.spec}</p>
                  {/* the recommended column is marked by a SURFACE shift and the amber
                    * tick in the header, not by a colored strip down the side of the cell.
                    * slopcheck flags the strip, and it is right to: a colored left border
                    * on a block is as reliable a tell as an em-dash in a sentence. */}
                  <div className="rounded-sm bg-muted px-4 py-3 lg:-my-1">
                    <p className="label mb-1 text-accent-ink lg:hidden">Signature</p>
                    <p className="text-[0.95rem] font-medium text-foreground">{r.sig}</p>
                  </div>
                  <div>
                    <p className="label mb-1 text-muted-foreground lg:hidden">Basic</p>
                    <p className="text-[0.95rem] text-muted-foreground">{r.basic}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* what does NOT differ. The table above is only honest with this under it. */}
          <div className="mt-8 rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label text-accent">And this is the same on both</p>
            <h3 className="mt-3 max-w-[46ch] font-display text-xl font-bold text-on-dark">
              The cheaper tier is not a cheaper install.
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
              What differs is the hardware. A Basic install done properly outlasts a Signature install
              done badly, which is the whole reason we do not subcontract either of them.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THE SPEC ROWS TURN INTO ──
        * Twenty thousand characters of hardware argument on this page and, until now, not one
        * photograph below the hero. Every row in the table above is a claim about what a part
        * does to a building, and a spec table cannot settle any of them.
        *
        * The pair is chosen deliberately: the daylight frame answers the row about colour
        * matching, and the close frame answers the row about LED spacing. Those are the two
        * specifications on this page a homeowner can actually verify with their own eyes, so
        * those are the two that get photographs. */}
      <PhotoPair
        eyebrow="The rows, on a building"
        title="Two specifications you can check yourself."
        lede="Most of the table above has to be taken on trust. These two do not: whether the channel disappears in daylight, and how far apart the points sit. Both are visible from your own driveway on any install in this metro."
        a="dayBrickGable"
        b="homeEaveDownlights"
        aLabel="Colour matched to the fascia. This is the row about finish, photographed at noon rather than asserted."
        bLabel="And the spacing row: individual points under the eave, set at the measure rather than judged on the day."
        ground="raise"
      />

      {/* ── THE LINEUP, BY ROLE ──
        * Eight products, four roles. People arrive thinking they have eight
        * choices; they have one, plus some additions. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="The full lineup"
            title="Only one of these is actually a choice."
            lede="Two tiers, the two manufacturer products they are built on, three add-ons that go on either, and the app. Grouped by what each one is for, because that relationship is what nobody in this trade explains."
          />

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
            {roles.map((g) => (
              <div key={g.heading} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
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

      {/* ── THREE HOUSES ──
        * The recommendation logic, published. A single-brand dealer cannot
        * write this section; a two-brand one has no excuse not to. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            eyebrow="Which one we would quote you"
            title="What we would put on your house, by the shape of it."
            lede="These are the three shapes almost every enquiry falls into. The verdicts are ours, they are what we would say standing in your driveway, and one of the three is us talking ourselves down a tier."
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
                    <p className="label text-accent">What we would quote</p>
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
        /* The which-one-we-would-quote section above is bg-primary, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="muted"
      />
    </Shell>
  );
}
