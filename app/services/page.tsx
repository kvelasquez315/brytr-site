import type { Metadata } from "next";
import { services } from "@/content/services";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, CityTiles, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /services — WAVE 1, PAGE 1 of the page-by-page pass.
 *
 * What this page was: the old home page. Eleven identical cards plus a twelfth CTA tile,
 * a numbered 1-2-3 list with big ghost numerals (the pattern the client called lazy), a
 * hero stats row that counted the eleven cards below it ("11 services"), and "Not sure
 * which one you need?" printed twice — once as a card, once as a closing band.
 *
 * What it is now. A hub's job is not to show every child; it is to get somebody to the
 * right child. So the centerpiece is a DECISION TREE keyed to what a homeowner actually
 * says out loud — outline the house / give the yard depth / we live out back — with what
 * to start with and what people add afterwards, drawn as three lengths of channel. Then
 * every service as a grouped rack (a list, not one more card each), then the one thing
 * only this page has to settle: homes versus businesses.
 *
 * Archetype: the home page's hero, then decision tree, then grouped rack. Every page on
 * this site opens the way the home page does — same photograph treatment, same consultation
 * form in the right column — and what differs is the section that comes after it. Closer:
 * one, the form.
 */

export const metadata: Metadata = {
  title: "Outdoor Lighting Company in Omaha, NE",
  description:
    "Permanent outdoor lighting for Omaha homes: roofline, Christmas, soffit, landscape, hardscape, pergola and gameday. One channel, one app, installed once.",
  alternates: { canonical: "/services" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Services", href: "/services" }];

/* THE DECISION TREE. Each branch starts with what somebody says when we walk up the
 * driveway, not with a product name. `start` is what we would install first and why;
 * `then` is what the same customers add later, in the order they usually add it. The
 * pairing order is our recommendation, which is a judgement we are allowed to make — it
 * is labelled as ours rather than dressed up as data. */
const branches: {
  said: string;
  start: string;          // slug
  why: string;
  then: string[];         // slugs, in the order people add them
  wiring: string;         // how the NEXT run ties in — different on every branch, because
                          // it is a different wiring job on every branch
}[] = [
  {
    said: "“I want the house outlined.”",
    start: "permanent-roofline-lighting",
    why: "The eave line is the run you will use every night of the year, and it is the one that reads from the street.",
    then: ["soffit-lighting", "holiday-seasonal-scenes", "gameday-lighting"],
    wiring: "Soffit runs and saved scenes hang off the roofline controller, so the second run is a wiring afternoon rather than a second system.",
  },
  {
    said: "“The yard looks flat after dark.”",
    start: "landscape-lighting",
    why: "Uplighting mature trees changes the elevation more than trim lighting does, and it works in July as well as December.",
    then: ["hardscape-lighting", "permanent-outdoor-lighting"],
    wiring: "Bed, tree and wall fixtures land on one transformer, so the yard can grow a zone at a time without trenching twice.",
  },
  {
    said: "“We live out back in the summer.”",
    start: "patio-pergola-bistro-lighting",
    why: "An overhead run on a pergola or patio cover earns its money more months of the year than a roofline does.",
    then: ["hardscape-lighting", "landscape-lighting"],
    wiring: "A pergola run ties back to the house controller, so the patio and the roofline answer to the same tap in the app.",
  },
];

/* Every service, grouped by the surface it attaches to. A hub reads better as a list of
 * places on a property than as a grid of equally-weighted tiles. */
const groups: { heading: string; note: string; slugs: string[] }[] = [
  {
    heading: "On the house",
    note: "Channel routed into the building itself",
    slugs: ["permanent-outdoor-lighting", "permanent-roofline-lighting", "soffit-lighting"],
  },
  {
    heading: "On the ground",
    note: "Beds, trees, walls and walks",
    slugs: ["landscape-lighting", "hardscape-lighting"],
  },
  {
    heading: "On structures",
    note: "Anything that is not the house or the ground",
    slugs: ["patio-pergola-bistro-lighting", "commercial-outdoor-lighting"],
  },
  {
    heading: "What you do with it after",
    note: "Same hardware, different night",
    slugs: ["permanent-christmas-lights", "holiday-seasonal-scenes", "gameday-lighting"],
  },
];

const bySlug = (slug: string) => services.find((s) => s.slug === slug)!;

export default function ServicesHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/whole-home.jpg"
        photoAlt="A two-story Omaha home with its roofline, gables and front trees lit at night"
        objectPosition="50% 62%"
        h1="Everything worth lighting on an Omaha property."
        lede="Roofline, soffit, beds, trees, walls, pergolas and storefronts: all of it on one channel, one controller and one app, so what you install first does not limit what you add later."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/services"]} ground="muted" />


      {/* ── THE DECISION TREE ──
        * The centerpiece, and the thing this page has that no other page does. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What people say first, and what it changes."
          />

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {branches.map((b) => {
              const first = bySlug(b.start);
              return (
                <li
                  key={b.start}
                  className="flex flex-col rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
                >
                  <p className="font-display text-lg font-bold leading-snug text-on-dark">{b.said}</p>

                  {/* THE 3PX SPINE IS GONE, AND IT IS THE SAME REJECTION AS THE HOME PAGE.
                    *
                    * `.run-spine` was a vertical length of channel beside this branch: 3px wide,
                    * running the full height of the card, with a diode pitch painted on it as a
                    * repeating radial gradient. The identical device sat beside the five install
                    * steps on the home page and the client read it as a border that had failed to
                    * load. He was right there and he is right here, and the second instance is
                    * worse, because at 3px inside a dark card the dots do not resolve at all.
                    *
                    * So this uses what replaced it: `.run`, the lights with no track. Two marks
                    * here rather than five, at two outputs, which does the job the spine was
                    * described as doing in the comment it carried - full output on what we would
                    * install first, banked on what gets added later.
                    *
                    * `<ol>` because the whole point of this card is that one of these comes
                    * before the other. */}
                  <ol className="run mt-7">
                    <li className="run-stage">
                      <span className="run-node" style={{ "--out": 1 } as React.CSSProperties} aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="label text-accent">Start with</p>
                        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-on-dark">
                          <Link href={`/services/${first.slug}`} className="hover:text-accent">{first.name}</Link>
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">{b.why}</p>
                      </div>
                    </li>

                    <li className="run-stage">
                      <span className="run-node" style={{ "--out": 0.42 } as React.CSSProperties} aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="label text-on-dark-muted">What people add next</p>
                        <ul className="mt-3 space-y-2.5">
                          {b.then.map((sl) => {
                            const s = bySlug(sl);
                            return (
                              <li key={sl}>
                                {/* name over note, not name beside note: "Soffit Lighting" wrapped
                                  * to two lines next to its own caption and the baselines fought */}
                                <Link
                                  href={`/services/${sl}`}
                                  className="group block border-b border-on-dark/10 pb-2.5 hover:text-accent"
                                >
                                  <span className="block font-display text-[0.95rem] font-bold text-on-dark/90 group-hover:text-accent">
                                    {s.name}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-on-dark-muted">{s.short}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  </ol>

                  <p className="mt-auto pt-7">
                    <span className="block text-sm leading-relaxed text-on-dark-muted">{b.wiring}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── EVERY SERVICE, AS A RACK ──
        * Grouped by the surface it attaches to. Not a card each. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Grouped by what it attaches to."
          />

          {/* MULTI-COLUMN, NOT A GRID, and the reason is the group sizes.
            *
            * The four groups hold three, two, two and four rows. In a two-column grid with
            * `items-start` that pairs 3 against 2 and 2 against 4, so the shorter card in each row
            * stopped 88px and 176px short of its neighbour — the second one leaving a 675 x 176px
            * hole under a card. Switching to `items-stretch` does not fix it, it just moves the
            * void inside the short card instead of beside it.
            *
            * CSS columns have no concept of a row, so cards pack against each other and a size
            * difference costs nothing. `break-inside-avoid` keeps a card whole. */}
          <div className="mt-10 gap-5 lg:columns-2 lg:gap-5 [&>*]:mb-5 lg:[&>*]:break-inside-avoid">
            {groups.map((g) => (
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
                    return (
                      <li key={sl}>
                        <Link
                          href={`/services/${sl}`}
                          className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                              {s.name}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{s.short}</span>
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

      {/* ── THE RANGE, IN PHOTOGRAPHS ──
        * This page is a decision tree followed by a rack of rows: it is navigation, and
        * navigation with no pictures is a sitemap. Four frames spanning roofline, landscape,
        * overhead and a colour scene, so a reader can see the categories rather than read them. */}
      <PhotoStrip
        /* Not "Four of the ten" — that counted the rack above AND the row below, in one
          * line. The reader can see how many pictures there are. */
        title="Different houses, different jobs, one controller."
        lede="Everything above attaches to the same channel and the same app, which is why most people end up adding a second and a third thing a season later rather than buying it all at once."
        shots={[
          { photo: "homeBrickGablesGold", caption: "Roofline. The gables, the eaves and the soffit, on the everyday warm white." },
          { photo: "landscapeTreeBeds", caption: "Landscape. Beds, trunks and paths, coming up with the house rather than on their own timer." },
          { photo: "patioTimberStone", caption: "Overhead and hardscape. A run along a beam and step lights on the stairs." },
          { photo: "gamedayRedBlueGables", caption: "And the part you actually touch: a saved scene, on for four hours, off by itself." },
        ]}
        cols={4}
        ground="raise"
      />

      {/* ── HOMES AND BUSINESSES ──
        * The one question only the hub has to settle, and the only place the
        * commercial service gets its own argument. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="The same channel goes on a storefront. The job around it is different."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              {
                h: "On a house",
                p: "One day for most homes. We work off ladders, miter at every transition, and walk every scene with you after dark before we leave.",
                l: ["Covenant paperwork pulled and submitted", "Zoned per elevation so the back can stay off", "Scenes saved with you standing there"],
                href: "/services/permanent-outdoor-lighting",
                cta: "See a whole-home install",
              },
              {
                h: "On a building",
                p: "Parapets, canopies and multifamily. Longer runs, scheduled around trading hours, and usually a property manager rather than an owner in the conversation.",
                l: ["Runs measured off elevations, not guesswork", "Installed outside business hours where needed", "One contact for a portfolio of addresses"],
                href: "/services/commercial-outdoor-lighting",
                cta: "See commercial work",
              },
            ].map((c) => (
              <article key={c.h} className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <h3 className="font-display text-2xl font-bold text-on-dark">{c.h}</h3>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">{c.p}</p>
                <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                  {c.l.map((i) => (
                    <li key={i} className="py-3 text-[0.95rem] text-on-dark-muted">{i}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <TextLink onDark href={c.href}>{c.cta}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE ── */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Every one of these, everywhere we drive."
          />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
