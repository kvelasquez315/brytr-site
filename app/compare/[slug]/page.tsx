import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compares, compareBySlug } from "@/content/compares";
import { detailForCompare } from "@/content/compare-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb } from "@/lib/schema";

/* ONE TEMPLATE, NINE COMPARISON PAGES — WAVE 4 of the page-by-page pass.
 *
 * What all nine used to carry:
 *   · no photograph in the hero, and two drawn elevations in the body taking a literal hex
 *     value as a prop — the brand lock forbids hex outside globals.css and sections.css
 *   · a section headed "Equal billing, on purpose" whose body copy was about its own
 *     styling: "same card, same divider, same type color". A page explaining its own CSS to
 *     the reader is a page with nothing to say in that slot.
 *   · the first five spec rows as two cards, then all fourteen rows again as a table
 *   · "150 to 400 typical linear feet" — a figure about Brytr's own jobs nobody confirmed
 *   · a "we carry more than one of these" section identical on all nine
 *   · the other eight comparisons as eight identical cards, on all nine pages
 *   · two closers
 *
 * What differs now. content/compares.ts already held the per-page argument: the verdict,
 * where each side wins, the cost tiers. content/compare-detail.ts adds the photograph, two
 * chosen next comparisons, and the field that matters most on a page like this — WHAT WE
 * HAVE NOT VERIFIED about the right-hand column, named per competitor.
 *
 * And the page has THREE FRAMES, because a page where we are competing and a page where we
 * are refereeing should not read the same:
 *   compete  — our system in the left column. Seven pages.
 *   referee  — `neutral`: neither product is ours. No stance panel, no tier cards, and the
 *              closer is the phone rather than the form, because we are not selling here.
 *   labor   — `labor`: a company against a Saturday. The comparison is the work.
 */

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

export function generateStaticParams() {
  return compares.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = compareBySlug(slug);
  if (!c) return {};
  return { title: c.title, description: c.verdict.slice(0, 155), alternates: { canonical: `/compare/${c.slug}` } };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = compareBySlug(slug);
  if (!c) notFound();
  const d = detailForCompare(c.slug);
  const frame: "compete" | "referee" | "labor" = c.neutral ? "referee" : c.labor ? "labor" : "compete";
  const alsoSee = (d?.alsoSee ?? [])
    .map((sl) => compares.find((o) => o.slug === sl))
    .filter((o): o is (typeof compares)[number] => !!o && o.slug !== c.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` },
  ];

  const frameLabel =
    frame === "referee"
      ? "We are refereeing this one"
      : frame === "labor"
      ? "Labor, not brand"
      : "We sell one of these two";

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.h1,
          description: c.verdict,
          author: { "@type": "Organization", name: "Brytr Co" },
        }}
      />

      <PageHero
        /* spec variant: the verdict goes in the right column, at size, because the verdict
         * IS the answer to the H1 and burying it under a table is the standard mistake on
         * pages like this. */
        photo={d?.photo ?? "/img/channel-detail.jpg"}
        photoAlt={d?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition={d?.objectPosition ?? "50% 50%"}
        h1={c.h1}
        lede={
          frame === "referee"
            ? "Neither of these is our premium system, so there is no version of this page that helps us. It exists because people ask, and because an answer from somebody with nothing to gain is worth more than an answer from either manufacturer."
            : frame === "labor"
            ? "One of these is a company and the other is a Saturday. Comparing them on spec misses the point entirely, so this page compares the work: who does it, how long it takes, and who you ring when a section dies."
            : "We install two of the brands on this market, which is more than the company quoting against us, and it is the reason the other column here is allowed to win. Where we have not verified something, the page says which thing."
        }
        trail={trail}
      />

      {/* ── THE VERDICT ──
        * It was a card in the hero's right column. A verdict is the single thing a reader came
        * to this page for, so it now gets the full width and sits on the dark ground where
        * nothing competes with it. The two figures underneath are the whole reason the verdict
        * lands: an opinion with two numbers under it is an argument. */}
      <section className="bg-primary">
        <div className="shell grid items-center gap-9 py-12 lg:grid-cols-[1fr_24rem] lg:gap-14 lg:py-16">
          <div>
            <p className="label flex items-center gap-3 text-accent">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              The verdict
            </p>
            <p className="mt-5 max-w-[54ch] font-display text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-snug text-on-dark">
              {c.verdict}
            </p>
          </div>
          {/* THREE ROWS, NOT TWO, and frameLabel now lives in here.
            *
            * The two cost cells were a 384 x 88px object in a 384 x 350px column — one small thing
            * in a wide field, which is the void this site is least allowed to have. And frameLabel
            * used to sit as a grey line under the verdict, where it read as an orphan caption
            * attached to nothing AND repeated the hero's eyebrow word for word a screen above.
            *
            * As a labelled row it does the job it was written for — telling the reader what kind of
            * comparison this is and where we stand in it — and it closes the column. */}
          <dl className="overflow-hidden rounded-lg bg-raise ring-1 ring-on-dark/12">
            <div className="grid grid-cols-2 gap-px bg-on-dark/12">
              {[
                [c.a, c.costA],
                [c.b, c.costB],
              ].map(([k, v]) => (
                <div key={k} className="bg-raise px-5 py-5">
                  <dt className="label text-on-dark-muted">{k}</dt>
                  <dd className="u mt-2 text-[1rem] font-semibold leading-snug text-on-dark">{v}</dd>
                </div>
              ))}
            </div>
            <div className="border-t border-on-dark/12 px-5 py-4">
              <dt className="label text-on-dark-muted">Where we stand</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-on-dark">{frameLabel}</dd>
            </div>
            <div className="border-t border-on-dark/12 bg-primary px-5 py-4">
              <dt className="label text-on-dark-muted">What settles it</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">
                Your roofline, measured on site. Every row below is true in general and none of
                them is true of every house.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── THE SPECS ──
        * One table, once. The old page printed the first five rows as two cards
        * and then all fourteen again underneath. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title={frame === "labor" ? "The job, not the datasheet." : `${c.a} against ${c.b}, spec by spec.`}
            lede={
              frame === "labor"
                ? "Every row here is something that happens or does not happen on your property. None of it is about which diode is brighter."
                : "Neither column is highlighted and neither gets a badge. Read it and decide."
            }
          />
          <div className="mt-10">
            <SpecTable
              onDark={false}
              caption={`${c.a} compared with ${c.b}`}
              rows={c.rows}
              headA={c.a}
              headB={c.b}
              source={
                frame === "labor"
                  ? "Everything in the left column is what our own crews do. The right column is what a competent DIY install involves, not a worst case."
                  : frame === "referee"
                  ? "Both columns are our own read as installers in this market. Neither manufacturer has given us a datasheet, and we have not asked either of them to review this page."
                  : `The ${c.a} column is the manufacturer's published spec. The ${c.b} column is our own read as installers in this market, which is worth something and is not the same as a datasheet.`
              }
            />
          </div>
        </div>
      </section>

      {/* ── WHAT WE HAVE NOT VERIFIED ──
        * The section that makes the table above trustworthy, and the one no
        * comparison page in this category publishes. */}
      {d?.unknowns?.length ? (
        <section className="section bg-primary">
          <div className="shell grid items-start gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
            <div>
              <SectionHead
                onDark
                title="What we do not know about this one."
              />
              <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
                Every comparison page you will read on this subject is written with gaps in it. Ours has
                them listed, because a page that appears to know everything about a competitor is a page
                that has filled the gaps with plausible sentences.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink onDark href="/compare">How all of these were judged</TextLink>
                <TextLink onDark href="/contact">Tell us we have one wrong</TextLink>
              </div>
            </div>

            <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
              {d.unknowns.map((u) => (
                <li key={u} className="py-5 text-[1.05rem] leading-relaxed text-on-dark-muted">{u}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── OUR OWN WORK, ON A PAGE ABOUT SOMEBODY ELSE'S ──
        * A comparison page is the one place on this site where most of the nouns belong to
        * other companies. Two photographs of installs we actually did is the only first-hand
        * evidence on the page, and it sits before the "where each wins" section deliberately:
        * a reader should know what we can do before they read us being fair about a rival. */}
      <PhotoPair
        title="What we hand over, on two houses."
        lede="Neither of these is a comparison. Everything else here is a claim about hardware, and a claim is worth less than a finished roofline."
        a={pick(`${c.slug}-a`, 1)[0]?.photo ?? "homeShakeBrick"}
        b={pick(`${c.slug}-b`, 1)[0]?.photo ?? "homeWideRanch"}
        aLabel={pick(`${c.slug}-a`, 1)[0]?.caption ?? ""}
        bLabel={pick(`${c.slug}-b`, 1)[0]?.caption ?? ""}
        ground="background"
      />

      {/* ── WHERE EACH ACTUALLY WINS ──
        * Equal cards. No commentary about the cards. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Where each of these actually wins."
            lede={
              frame === "compete"
                ? "The right-hand column is real. We install more than one of these, which is what lets us give the other option honest reasons rather than token ones."
                : frame === "labor"
                ? "There are people who should absolutely do this themselves, and the right-hand column is written for them rather than at them."
                : "Two products, no stake, and the deciding factor at the bottom is not either datasheet."
            }
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { h: c.aWinsHead, list: c.aWins, cost: c.costA, name: c.a },
              { h: c.bWinsHead, list: c.bWins, cost: c.costB, name: c.b },
            ].map((col) => (
              <article key={col.h} className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
                <h3 className="font-display text-2xl font-bold leading-snug text-foreground">{col.h}</h3>
                <p className="u mt-2 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {col.name} · {col.cost}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {col.list.map((w) => <Check key={w}>{w}</Check>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FRAME-SPECIFIC SECTION ──
        * compete → we install more than one of these, so we can lose honestly.
        * referee → the deciding factor is the installer, and here is how to judge one.
        * labor  → what a DIY install actually costs you that is not money. */}
      {frame === "compete" && (
        <section className="section bg-card">
          <div className="shell grid items-start gap-10 lg:grid-cols-[48fr_52fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
                We install a cheaper one too.
              </h2>
              <div className="prose-body mt-6 space-y-4">
                <p className="text-lg text-foreground">
                  A dealer with one brand has exactly one recommendation available to them, and you can
                  predict it before they park.
                </p>
                <p className="text-base text-muted-foreground">
                  Brytr installs Haven and we install Jellyfish. That is the only reason this page can
                  give the other option real reasons to win, and it is why we will occasionally talk you
                  into the cheaper hardware: a worse day for us and a better system for you.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink href="/lighting-systems">Everything we install</TextLink>
                <TextLink href="/warranty">What our own terms cover</TextLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)]">
              <div className="border-b border-border bg-primary px-6 py-4">
                <p className="label flex items-center gap-3 text-on-dark">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  What we would actually quote you
                </p>
              </div>
              <ul className="divide-y divide-border">
                {[
                  ["A complex or two-story roofline", "Haven Evolution, on the roofline.", "/lighting-systems/haven-evolution"],
                  ["A simple single-story run", "Jellyfish, and we will say so.", "/lighting-systems/jellyfish-lighting"],
                  ["Landscape or a pergola on the same visit", "Priced with the roofline, on the same controller.", "/services/landscape-lighting"],
                ].map(([h, p, href]) => (
                  <li key={h}>
                    <Link
                      href={href}
                      className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                    >
                      <span className="block font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                        {h}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{p}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {frame === "referee" && (
        <section className="section bg-card">
          <div className="shell">
            <SectionHead
              title="On this comparison, the installer matters more than the box."
              lede="Both are competent products in the same part of the market. Which is better on your house is decided by whoever fastens it there."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Ask for a daylight photo from the curb", "Anybody can make a roofline look good at night. The test is whether you can pick the channel out at noon on a house they finished last year."],
                ["Ask who is on the ladder", "Whether the people who quote it are the people who fit it. Almost every failure in this trade is workmanship, so this question is the one that predicts year four."],
                ["Ask when the sealant goes on", "At the moment the screw is driven, or in one pass at the end of the day. Only one of those keeps water out of a fascia board."],
                ["Ask how corners are handled", "Cut and mitered, or flexed around. A kink at a valley is visible from the street and cracks first in February."],
                ["Ask who administers the warranty", "The installer, the manufacturer, or a franchise head office. All three are answers; not knowing is not."],
                ["Ask what happens at handover", "Whether somebody walks the scenes with you, or hands you an app and drives off."],
              ].map(([h, p]) => (
                <li key={h} className="rounded-lg bg-background p-6 shadow-[var(--shadow-lg)]">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{h}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
              Ask us the same six. We would rather be judged on them than on which brand is in our van.
            </p>
          </div>
        </section>
      )}

      {frame === "labor" && (
        <section className="section bg-card">
          <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
                What a DIY install actually costs.
              </h2>
              <div className="prose-body mt-6 space-y-4">
                <p className="text-lg text-foreground">
                  We are not going to pretend a consumer kit is worthless. It is a fraction of the price
                  and there are people who will fit one well and be pleased with it for years.
                </p>
                <p className="text-base text-muted-foreground">
                  What the price does not include is the list on the right. Every item on it is a cost
                  that does not appear on the box, which makes it an honest list and a biased one at the
                  same time.
                </p>
              </div>
              <div className="mt-7">
                <TextLink href="/how-it-works">What a professional install day involves</TextLink>
              </div>
            </div>

            <ul className="divide-y divide-border border-y border-border">
              {[
                ["A weekend at roof height", "Two days on a ladder for most homes, and the second day is the one where people get careless."],
                ["Holes you drilled yourself", "Every fixing is a penetration in your own fascia. Sealing them properly is the difference between a project and a leak."],
                ["It shows in daylight", "Consumer channel is not color matched to your trim, and adhesive mounts sit proud of the board. This is the part people regret."],
                ["Corners", "There is no miter saw in the box. Every gable and valley is a bend, and bends are where a run cracks."],
                ["No number to ring", "A dead section in December is your problem, in the dark, on a ladder, at height, in ice."],
                ["It reads as a gadget", "At resale, a permanent lighting system reads as a building feature. A strip on adhesive mounts does not."],
              ].map(([h, p]) => (
                <li key={h} className="py-5">
                  <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── TWO MORE, CHOSEN ── */}
      <section className="section bg-raise">
        <div className="shell grid items-start gap-10 lg:grid-cols-[38fr_62fr] lg:gap-14">
          <div>
            <SectionHead onDark  title="What most people read after this one." />
            <p className="mt-5 text-[1.05rem] leading-relaxed text-on-dark-muted">
              Chosen, in order, rather than the other eight comparisons printed at the bottom of all nine
              pages.
            </p>
            <div className="mt-7">
              <TextLink onDark href="/compare">The whole market in one table</TextLink>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {alsoSee.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${o.slug}`}
                  className="flex h-full flex-col rounded-lg bg-primary p-6 ring-1 ring-on-dark/10 transition-all duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:ring-accent/40"
                >
                  <span className="font-display text-[1.05rem] font-bold leading-snug text-on-dark">
                    {o.a} against {o.b}
                  </span>
                  <span className="mt-2.5 flex-1 text-sm leading-relaxed text-on-dark-muted">
                    {gist(o.verdict)}
                  </span>
                  {/* Neutral pages get a neutral label. Putting our accent on a card about two
                    * rivals is the brand colour taking a side on the one page that says it has
                    * not got one. */}
                  <span
                    className={`label mt-4 border-t border-on-dark/12 pt-3 ${
                      o.neutral ? "text-on-dark-muted" : "text-accent"
                    }`}
                  >
                    {o.neutral ? "We have no stake in this one" : o.labor ? "Labor, not brand" : "Read it"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* On the refereeing page we are not selling, so the closer does not carry a form. */}
      {frame === "referee" ? (
        <PageCta
          variant="phone"
          title="We will tell you which of the two to buy."
          body="Free, on the phone, with no version of the answer that benefits us. We do not lead with either of these, so there is no version of this answer that puts money in our pocket."
          omit={["/compare"]}
          panelLink={{ href: "/lighting-systems", label: "The systems we do install" }}
        />
      ) : (
        /* The two branches are a ternary, not two closers — a neutral comparison closes on the
          * phone variant, one we sell into closes on the form. Both take the default muted ground,
          * which alternates against the bg-raise section above. */
        <PageCta omit={["/compare"]} />
      )}
    </Shell>
  );
}
