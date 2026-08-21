import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";
import { homeFaqs, pricingFaqs, serviceFaqsFor } from "@/content/faqs";
import { Faq } from "@/components/sections/faq";
import { site } from "@/content/site";

/* /faq — WAVE 2, PAGE 6 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row that counted the page's own contents
 * ("34 questions · 5 groups" — the page reading itself out loud, which is the thing the
 * PageHero comment specifically warns against), then FIVE consecutive sections of the same
 * accordion, and two closers.
 *
 * What it is now. The problem with every FAQ page is that the answers are behind a click,
 * so somebody scanning for one fact has to open six accordions to find out we are not going
 * to give them a price. So the centerpiece is THE SHORT ANSWERS: the eight questions people
 * actually arrive with, answered in one line each, in the open, with a link down to the long
 * version. Then all of the groups in ONE section rather than five identical ones.
 *
 * The last section is the one an FAQ page normally pretends does not exist: the questions
 * that genuinely cannot be answered without standing at your house.
 *
 * Archetype: home hero → open short-answer rack → single grouped accordion column → the
 * questions we cannot answer here. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting FAQ",
  description:
    "Every question we get about permanent outdoor lighting in Omaha: cost, install day, damage to the fascia, HOA approval, warranty, winter installs and servicing other brands.",
  alternates: { canonical: "/faq" },
};
const trail = [{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

/* GROUPED BY QUESTION, NOT BY ARRAY INDEX.
 *
 * These used to be `.slice()` calls over the shared arrays, which put whatever happened to
 * sit at those indices under whatever heading came next. Two things went wrong. The service
 * array opens with `How long does ${name} take to install?`, so on this page the question
 * about install duration was filed under "Product and specs" — and homeFaqs carries "How long
 * does an install take?", so the same question appeared twice on one page under two different
 * headings. Grouping by the question itself means a heading is a claim about its contents
 * rather than an accident of ordering, and a duplicate is visible in this file. */
const service = serviceFaqsFor("permanent lighting");
const pick = (src: typeof homeFaqs, ...qs: string[]) =>
  qs.map((q) => src.find((f) => f.q === q)).filter((f): f is (typeof src)[number] => !!f);

/* `wide` spans the grid and splits its own items into two columns. Cost and financing is the
 * biggest group by some way — nine questions against three or four — so it earns the full width
 * and gives the layout a full last row instead of a lone card in a wide one. */
const groups: { h: string; note: string; items: typeof homeFaqs; wide?: boolean }[] = [
  {
    h: "Before you buy",
    note: "The ones that decide whether this is even the right product for the house.",
    items: pick(homeFaqs,
      "Can you actually see it during the day?",
      "What does it cost?",
      "Does it damage my soffit or fascia?",
      "Will my HOA allow it?"),
  },
  {
    h: "Product and specs",
    note: "What is actually screwed to the building, and what it does after that.",
    items: pick(service,
      "Is this permanent or seasonal?",
      "Can I add to it later?",
      "Will it work with my existing smart home?"),
  },
  {
    h: "Install",
    note: "One day on your property, and what it asks of you while it happens.",
    items: [
      ...pick(homeFaqs,
        "How long does an install take?",
        "Do I need to be home for the install?",
        "Can it be installed in winter?"),
    ],
  },
  {
    h: "Service and warranty",
    note: "The part that matters in year four, when nobody is selling you anything.",
    items: [
      ...pick(homeFaqs, "What happens when a section stops working?"),
      ...pick(service,
        "What warranty comes with it?",
        "Do you service other brands?",
        "What areas do you cover?",
        "How do I get a number?"),
    ],
  },
  {
    h: "Cost and financing",
    note: "Why the number is shaped the way it is, and what moves it.",
    items: pricingFaqs,
    wide: true,
  },
];
const all = groups.flatMap((g) => g.items);

/* THE SHORT ANSWERS. Each one is a compression of the full answer further down — never a
 * different claim, and never a claim the long version does not make. `to` points at the
 * group the long version lives in. */
const shortAnswers: { q: string; a: string; to: string }[] = [
  {
    q: "Can you see it in the daytime?",
    a: "Barely, and that is the point. Color-matched aluminum tucked into the eave line, which reads as trim from the street.",
    to: "Before you buy",
  },
  {
    q: "What does it cost?",
    a: "Priced by linear foot of roofline plus complexity. There is no headline price, but you can have the per-foot basis on the phone.",
    to: "Cost and financing",
  },
  {
    q: "Will it damage my fascia?",
    a: "It fastens into the fascia board, never through the shingles, and every penetration is sealed as it is made.",
    to: "Install",
  },
  {
    q: "Can it be installed in winter?",
    a: "Yes, all winter. Cold changes sealant cure times, so we change method rather than turn the work down.",
    to: "Install",
  },
  {
    q: "Will my HOA allow it?",
    a: "Most do. We pull your covenant, submit the spec sheet ourselves, and install once it is approved.",
    to: "Before you buy",
  },
  {
    q: "How long does it take?",
    a: "One day for most homes. Two if landscape or hardscape fixtures go on the same visit.",
    to: "Install",
  },
  {
    q: "What if a section goes dark?",
    a: "You call us and we come out. It is usually a driver or one bad connection rather than the whole run.",
    to: "Service and warranty",
  },
  {
    q: "Do you service other brands?",
    a: "Yes, including brands we would never have sold you, and systems whose installer has stopped answering.",
    to: "Service and warranty",
  },
];

/* THE HONEST LIMIT. The things no FAQ page can answer, and why. */
const cannot: { h: string; p: string }[] = [
  {
    h: "What your house costs",
    p: "Two houses with the same footage can be a long way apart on price, because the number is driven by story count, corners and how many zones you want. A figure typed here would be either the cheapest possible job or wrong.",
  },
  {
    h: "Whether your covenant allows it",
    p: "Several of the newer west Omaha developments have specific language about permanent exterior lighting and no two sets of rules read the same. We pull yours and read it rather than guessing from the neighborhood name.",
  },
  {
    h: "Whether your fascia is sound",
    p: "We will not mount a permanent fixture to failing timber and quietly hope. That is a judgement made off a ladder with a hand on the board, and it occasionally means telling you to get a carpenter first.",
  },
];

export default function FaqPage() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(all)} />

      <PageHero
        photo="/img/g-pool-firebowl.jpg"
        photoAlt="An Omaha back garden at night: a lit seat wall, a fire bowl on a pier, and the house roofline behind set to red"
        objectPosition="50% 38%"
        eyebrow="Questions"
        h1="Everything people ask us."
        lede="In the words customers actually use, grouped by where in the decision they come up. The ones we get most are answered in the open, in one line each, so you do not have to click anything to find out what we will and will not tell you."
        trail={trail}
        footnote={
          <>
            A back garden on a finished install: seat wall, fire bowl and roofline, all on the same
            controller. If your question is not here, ring and ask.
          </>
        }
      />

      {/* ── THE SHORT ANSWERS ──
        * The centerpiece. Answers in the open, because the whole failure of an
        * FAQ page is that the useful part is behind a click. */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="No clicking required"
            title="The ones we get most, answered here."
            lede="Each of these has a longer answer further down. These are the short versions, and they do not say anything the long versions contradict."
          />

          <dl className="mt-10 grid gap-x-10 gap-y-0 lg:grid-cols-2">
            {shortAnswers.map((s) => (
              <div key={s.q} className="border-t border-border py-5">
                <dt className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                  {s.q}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {s.a}{" "}
                  <a
                    href={`#${slug(s.to)}`}
                    className="whitespace-nowrap font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
                  >
                    The long answer
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── EVERY QUESTION, IN ONE SECTION ──
        * One section with five subheads, not five sections with one subhead each.
        * The rack scrolls away with the page; nothing on this site is pinned
        * except the header. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="All of them"
            title="Grouped by where in the decision it comes up."
            lede="Roughly the order people ask them in: what it is, what it is made of, what happens on the day, what it costs, and what happens after we leave."
          />

          <nav aria-label="Question groups" className="mt-9 rounded-lg bg-primary px-6 py-5 shadow-[var(--shadow-dark)]">
            <p className="label text-accent">Jump to</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {groups.map((g) => (
                <li key={g.h}>
                  <a
                    href={`#${slug(g.h)}`}
                    className="inline-flex items-baseline gap-2.5 rounded-sm border border-on-dark/22 px-4 py-2.5 text-sm text-on-dark-muted transition-colors duration-[--dur-fast] hover:border-accent hover:text-on-dark"
                  >
                    {g.h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* TWO COLUMNS, NOT ONE.
            * The accordion used to run down a single max-w-[82ch] column inside a 100rem
            * shell, which left roughly 540px of bare background beside it for the whole
            * height of the section — about 3,400px of nothing, the largest blank area on the
            * site, on its longest page. The questions are self-contained, so they simply go
            * two-up: same content, none invented, and the page is a third shorter. */}
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            {groups.map((g) => (
              <div key={g.h} id={slug(g.h)} className={`scroll-mt-28 ${g.wide ? "lg:col-span-2" : ""}`}>
                {/* The note stacks UNDER the rule rather than sitting to the right of the
                  * heading. Standing rule: body copy never sits beside a heading. It was
                  * right-aligned there because it replaced a "N questions" counter, and it
                  * inherited the counter's slot along with its position. */}
                <div className="border-b-2 border-accent pb-3">
                  <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold text-foreground">
                    {g.h}
                  </h3>
                </div>
                <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-foreground">{g.note}</p>
                {g.wide ? (
                  <div className="mt-5 grid gap-x-14 lg:grid-cols-2">
                    <Faq items={g.items.slice(0, Math.ceil(g.items.length / 2))} />
                    <Faq items={g.items.slice(Math.ceil(g.items.length / 2))} />
                  </div>
                ) : (
                  <div className="mt-5"><Faq items={g.items} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT THIS PAGE CANNOT ANSWER ── */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              eyebrow="The honest limit"
              title="Questions no FAQ page can answer."
            />
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              An FAQ page that answers everything is an FAQ page that has guessed at something.
              These need somebody standing at your house, and most of them need somebody up a
              ladder.
            </p>
            <a
              href={site.phoneHref}
              className="u mt-8 block text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-none text-on-dark hover:text-accent"
            >
              {site.phone}
            </a>
            <p className="mt-2.5 text-sm text-on-dark-muted">
              All of them get answered on one phone call and one visit.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/free-design-consultation">Book the visit</TextLink>
              <TextLink onDark href="/pricing">How the number is built</TextLink>
            </div>
          </div>

          <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
            {cannot.map((c) => (
              <li key={c.h} className="py-6">
                <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{c.h}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{c.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta
        variant="phone"
        title="Ask us the one that is not on this page."
        body="Most questions we have never been asked before turn out to be about somebody's specific roofline, which is a five minute phone call rather than a paragraph."
        panelLink={{ href: "/free-design-consultation", label: "Book the on-site measure" }}
      />
    </Shell>
  );
}
