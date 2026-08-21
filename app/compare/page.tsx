import type { Metadata } from "next";
import Link from "next/link";
import { compares } from "@/content/compares";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* /compare — WAVE 4, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row counting the list underneath it, and a
 * hero aside that rendered FOUR drawn elevations from an array of four literal hex values
 * sitting in the page file — the single clearest brand-lock violation on the site. Then a
 * flat matrix with no stance in it, three tag-cloud cards, nine identical link cards, and
 * two closers.
 *
 * What it is now. A comparison hub written by somebody who sells two of the brands has
 * exactly one thing nobody else on this market can publish: WHERE WE STAND ON EACH ONE.
 * So the matrix has a fourth column — install it, service it, or would not put it on your
 * house — and the "would not" rows are what make the rest of the table worth reading.
 *
 * Then the nine head-to-heads, grouped by what kind of argument each one is: ours against a
 * brand you are probably also being quoted, us refereeing two we have no stake in, and
 * professional work against a DIY kit. The middle group gets a different frame on purpose,
 * because on that page we are not competing.
 *
 * Archetype: spec hero (photograph + our stance as a panel) → the market with a stance
 * column → the nine grouped by argument type → methodology. Closer: the form.
 */

export const metadata: Metadata = {
  title: "Every Permanent Lighting Brand Compared (2026)",
  description:
    "The permanent outdoor lighting brands on the Omaha market, compared by an installer who carries two of them and services five more: Haven, Jellyfish, Gemstone, Trimlight, Oelo, EverLights, Minleon, Govee and the OEM supply behind several of them.",
  alternates: { canonical: "/compare" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }];

/* THE MARKET, WITH OUR STANCE. The fourth column is the only thing on this page a
 * single-brand dealer cannot write, and the "Would not" rows are what make the other two
 * columns believable. */
type Stance = "Install" | "Service" | "Would not";
const market: { brand: string; maker: string; what: string; stance: Stance; note: string }[] = [
  {
    brand: "Haven Evolution",
    maker: "Haven Lighting",
    what: "Dedicated warm white channel, 4 in. LED pitch, the best app of anything we install.",
    stance: "Install",
    note: "Our Signature tier is built on it.",
  },
  {
    brand: "Jellyfish Lighting",
    maker: "Jellyfish Lighting",
    what: "Colour-mixed white, wider pitch, meaningfully cheaper on the same roofline.",
    stance: "Install",
    note: "Our Basic tier is built on it.",
  },
  {
    brand: "Gemstone Lights",
    maker: "Gemstone",
    what: "A good channel profile and a better white than most of the value tier. A real competitor.",
    stance: "Service",
    note: "We will take one over and repair it.",
  },
  {
    brand: "Trimlight",
    maker: "Trimlight, as a franchise",
    what: "Consistent product nationally. The install is whoever holds your territory.",
    stance: "Service",
    note: "We repair them. We are not one.",
  },
  {
    brand: "Oelo",
    maker: "Oelo",
    what: "Sold locally, distinctive channel, solid build. Worth looking at if you have seen one.",
    stance: "Service",
    note: "We will service it.",
  },
  {
    brand: "EverLights",
    maker: "EverLights",
    what: "One of the first names in the category, and still how a lot of people search for it.",
    stance: "Service",
    note: "Mature product, we will service it.",
  },
  {
    brand: "Minleon / Rainmin",
    maker: "Minleon",
    what: "Installer-channel product built for animated shows rather than for everyday warm white.",
    stance: "Service",
    note: "Different job, honestly done.",
  },
  {
    brand: "Govee and consumer kits",
    maker: "Govee and others",
    what: "A fraction of the cost, and you are the one on the ladder drilling your own fascia.",
    stance: "Would not",
    note: "Not a professional install. Fine for the right person.",
  },
  {
    brand: "Unbranded OEM supply",
    maker: "Ghouly and similar",
    what: "The same overseas production lines behind several retail brands, sold direct.",
    stance: "Would not",
    note: "No warranty administrator worth the name.",
  },
  {
    brand: "Adhesive-mount strip",
    maker: "Various",
    what: "Tape-mounted LED strip sold as permanent lighting. It is neither permanent nor a fixture.",
    stance: "Would not",
    note: "We have removed more of this than we would like.",
  },
];

const stanceStyle: Record<Stance, string> = {
  Install: "border-accent/50 text-accent-ink",
  Service: "border-border text-foreground",
  "Would not": "border-border text-muted-foreground",
};

/* THE NINE, BY WHAT KIND OF ARGUMENT THEY ARE. Three frames, because a page where we are
 * competing and a page where we are refereeing should not look the same. */
const argumentGroups: { heading: string; note: string; frame: string; slugs: string[] }[] = [
  {
    heading: "Ours against the one you are also being quoted",
    note: "Seven pages where we have a stake, and say so",
    frame:
      "On these, our premium system is in the left column. Each page gives the other side real reasons to win, because we sell a value tier too and can afford to.",
    slugs: [
      "haven-vs-jellyfish-lighting",
      "haven-vs-gemstone-lights",
      "haven-vs-trimlight",
      "haven-vs-oelo",
      "haven-vs-everlights",
      "haven-vs-minleon-rainmin",
    ],
  },
  {
    heading: "Two we have no stake in",
    note: "We are refereeing, not competing",
    frame:
      "Neither of these is our premium system, so this page is written without a horse in the race and looks different for it.",
    slugs: ["jellyfish-vs-gemstone-lights"],
  },
  {
    heading: "Not a brand argument at all",
    note: "Labour, and who does it",
    frame:
      "One of these is a company and the other is a Saturday. Comparing them on spec misses the entire point, so these two pages compare the work instead.",
    slugs: ["haven-vs-govee", "haven-vs-ghouly"],
  },
];

const bySlug = (slug: string) => compares.find((c) => c.slug === slug)!;

/* The verdict's opening sentence, except where that sentence is three words long. "We
 * install both." is true and useless as a card summary, so keep taking sentences until
 * there is something to read. */
const gist = (v: string) => {
  const parts = v.split(/(?<=\.)\s+/);
  let out = "";
  for (const p of parts) {
    out = out ? `${out} ${p}` : p;
    if (out.length >= 70) break;
  }
  return out;
};

export default function CompareHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The permanent lighting brands on the Omaha market, compared by an installer",
          author: { "@type": "Organization", name: "Brytr Co" },
        }}
      />

      <PageHero
        variant="spec"
        photo="/img/g-pool-blue.jpg"
        photoAlt="An Omaha home, pergola and pool deck lit blue at dusk"
        objectPosition="50% 48%"
        eyebrow="Honest comparison"
        h1="We install two of these and would not put three of them on your house."
        lede="Every comparison page in this category is written by somebody who sells exactly one of the products on it. We sell two, service five, and have taken three off houses — which is the only reason this page can tell you where our own premium system loses."
        trail={trail}
        footnote={
          <>
            Photographed on a Brytr install. None of the other systems on this page are pictured anywhere
            on this site, because passing our work off as theirs, or theirs as ours, is the one thing a
            comparison page must not do.
          </>
        }
        aside={
          <div className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
              <p className="label flex items-center gap-3 text-foreground">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Where we stand
              </p>
              <p className="text-xs text-muted-foreground">On every brand below</p>
            </div>
            <dl className="divide-y divide-border">
              {[
                ["We install it", "Stocked, quoted, installed by our own crews and covered by our own workmanship terms."],
                ["We service it", "Not ours to sell. We will still take one over, diagnose it and repair it."],
                ["We would not", "We have removed these rather than installed them, and we will say why."],
              ].map(([k, v]) => (
                <div key={k} className="px-6 py-4">
                  <dt className="font-display text-[1rem] font-bold text-foreground">{k}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* ── THE MARKET, WITH A STANCE COLUMN ──
        * The centrepiece. The fourth column is the page. */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="The whole market"
            title="Ten things sold as permanent lighting in this metro."
            lede="What each one is, and what we do about it. This is the page we wanted to find when we started, and the last column is the part nobody else can print."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[22fr_38fr_24fr] lg:gap-8">
              <p className="label text-on-dark-muted">Brand</p>
              <p className="label text-on-dark-muted">What you are getting</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Where we stand
              </p>
            </div>
            <ul className="divide-y divide-border">
              {market.map((m) => (
                <li key={m.brand} className="grid gap-3 px-6 py-5 lg:grid-cols-[22fr_38fr_24fr] lg:gap-8">
                  <div>
                    <p className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                      {m.brand}
                    </p>
                    <p className="u mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      {m.maker}
                    </p>
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{m.what}</p>
                  <div>
                    <span
                      className={`u inline-flex rounded-sm border px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] ${stanceStyle[m.stance]}`}
                    >
                      {m.stance}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            No column here is highlighted and no brand is scored out of ten. Everything in the middle
            column about a product we do not sell is our own read from servicing it, not the
            manufacturer&rsquo;s datasheet, and each comparison page says what we have not verified.
          </p>
        </div>
      </section>

      {/* ── THE NINE, BY ARGUMENT TYPE ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Head to head"
            title="Nine pages, three different kinds of argument."
            lede="A page where we are competing and a page where we are refereeing should not read the same way, so they do not. Which kind each one is, is written on it."
          />

          <div className="mt-10 space-y-10">
            {argumentGroups.map((g) => (
              <div key={g.heading}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-accent pb-3">
                  <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold text-foreground">
                    {g.heading}
                  </h3>
                  <p className="u text-sm text-muted-foreground">{g.note}</p>
                </div>
                <p className="mt-4 max-w-[80ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                  {g.frame}
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {g.slugs.map((sl) => {
                    const c = bySlug(sl);
                    return (
                      <li key={sl}>
                        <Link
                          href={`/compare/${sl}`}
                          className="flex h-full flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5"
                        >
                          <span className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                            {c.a} against {c.b}
                          </span>
                          <span className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                            {gist(c.verdict)}
                          </span>
                          <span className="label mt-4 border-t border-border pt-3 text-accent-ink">
                            Read the comparison
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

      {/* ── METHODOLOGY ──
        * How the judgements were reached, and what would change one. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div>
            <SectionHead onDark eyebrow="Methodology" title="How these were judged." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg leading-relaxed text-on-dark">
                Most of what is on these pages comes from pulling failed sections off houses rather
                than from reading spec sheets. That is a real qualification and it is also a biased
                sample: we mostly meet the installs that went wrong.
              </p>
              <p className="text-base leading-relaxed text-on-dark-muted">
                So where we have no direct experience, the page says so by name rather than filling the
                gap with a plausible sentence. And where our own premium system loses to something
                cheaper, that is on the page too, because a comparison in which the author never loses
                is an advertisement.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/lighting-systems">The two we actually sell</TextLink>
              <TextLink onDark href="/services/repairs-and-service">Takeovers and repairs</TextLink>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                How each thing was judged
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "White quality: side by side after dark, never off a datasheet",
                  "Channel: from the curb at noon, which is where it matters",
                  "App: on whether a customer still opens it in year two",
                  "Failure modes: from systems we have actually repaired",
                  "Price: as a tier, because per-foot varies house to house",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-raise p-6 ring-1 ring-on-dark/10">
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
                What would change a verdict
              </p>
              <ul className="mt-5 divide-y divide-on-dark/10 border-t border-on-dark/10">
                {[
                  "A manufacturer sending us their current datasheet",
                  "A generation change in the hardware, which happens often",
                  "Enough service calls on one brand to see a pattern",
                  "A local dealer changing hands, on the franchise comparisons",
                  "Anybody showing us we have a fact wrong — tell us and we will fix it",
                ].map((x) => (
                  <li key={x} className="py-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PageCta omit={["/compare"]} />
    </Shell>
  );
}
