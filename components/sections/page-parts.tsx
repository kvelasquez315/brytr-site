import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { cities, metroCities } from "@/content/cities";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviewProof } from "@/content/reviews";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm } from "@/components/ui/bits";
import { SiteHero, TrustPlinth } from "@/components/sections/site-hero";

/* SHARED PAGE FURNITURE — and the reason the interior pages looked alike.
 *
 * WAVE 0 of the page-by-page pass. Before this, of 23 page templates: sixteen opened with
 * one PageHero, sixteen closed with the same BandCta *and* PageCta (two closers stacked),
 * and ten carried the same eighteen-box CityTiles. Four of those templates generate fifty
 * of the site's eighty-one pages, so whatever they did, fifty pages did.
 *
 * That is not a per-page problem and cannot be fixed page by page. So the shared parts now
 * have VARIANTS, and each page type is assigned one — the assignment lives in the page
 * ledger, and the rule is that no two page types in a wave open or close the same way.
 *
 * Defaults are unchanged, so nothing breaks: a page that passes no variant renders exactly
 * what it rendered before, and gets converted deliberately when its turn comes.
 */

export function Breadcrumb({ trail, onDark = true }: { trail: { name: string; href: string }[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
        {trail.map((t, i) => (
          <li key={t.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className={onDark ? "text-on-dark" : "text-foreground"}>{t.name}</span>
            ) : (
              <Link href={t.href} className="hover:text-accent">{t.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** SUBPAGE HERO — the home page's hero, on every page.
 *
 * The client's instruction, and it is the right one: the home page hero is the design, so
 * every page opens the same way — a real photograph filling the section, a raking scrim,
 * short keyword-forward type on the left, the quote form as a solid card on the right, and
 * the amber channel line as the base edge. What changes page to page is the PHOTOGRAPH and
 * the type, not the layout. That is how a site reads as one site.
 *
 *  photo  — every page. Full-bleed install photograph, scrim, type left, form right, the
 *           amber line, the trust band under it. No arguments.
 *  type   — no photograph and no form: the three legal pages. They still get the trust band.
 *
 * WHAT WAS HERE BEFORE, AND WHY IT IS GONE.
 *
 * There used to be a `spec` variant that put a specification table in the right column and a
 * `map` variant that put the Leaflet map there. I argued at the time that a form in the hero
 * of a hardware page was premature and the spec sheet was the real argument. The client looked
 * at a system page and said: all heroes have the same layout as the home page, with the trust
 * banner at the bottom and the form on the right, and this is how NOT to do it.
 *
 * He is right and my reasoning was wrong in a specific way. The variants were solving a
 * problem the hero does not have. A hero's job is identical on all eighty-one pages — say
 * where you are and let the reader act — and the thing that should differ page to page is
 * the PHOTOGRAPH and the words, which is exactly what the doc comment above already said.
 * I had written the correct principle and then added three exceptions to it.
 *
 * The spec tables and the map were not deleted. They moved into the page bodies, where a
 * reader who wants a specification can find it after being told what page they are on, and
 * where they get the full width instead of a 28rem column. Six pages changed; the aside prop
 * is gone, so the type system now makes the old mistake unavailable rather than discouraged.
 *
 * `photo` is required. There is a fallback, but a page that ships on the fallback is a page
 * nobody chose a photograph for — the whole point is that the shot is about that page's subject.
 */
type HeroVariant = "photo" | "type";
const FALLBACK_HERO = "/img/hero-bg.jpg";

export function PageHero({
  h1, lede, trail, variant = "photo", photo, photoAlt = "", objectPosition = "50% 50%",
}: {
  h1: string; lede: string;
  trail: { name: string; href: string }[];
  variant?: HeroVariant;
  photo?: string;
  photoAlt?: string;
  objectPosition?: string;
}) {
  /* PageHero IS SiteHero NOW, plus a breadcrumb.
   *
   * It used to be a hand-copy of the home page hero - its own comment said "the home page's hero,
   * unconditionally" - and then the home hero was rebuilt five times and this was not. By the time
   * the client asked for them to match, they had drifted on eight points: h1 size, the tagline, the
   * lede measure, the button, the form variant, the trust band, the column width and the height.
   *
   * Closing those eight by hand would have left the mechanism that opened them. One component now
   * renders every hero on the site, so "the only thing different is the wording" holds because
   * there is nothing else left to differ.
   *
   * THREE PROPS WENT. `eyebrow` - the home hero has nothing above its h1 on purpose, and the
   * breadcrumb directly above already names the section. `footnote` - an extra paragraph under
   * the button on eighteen pages, one of which restated the rating directly above a plinth that
   * states the rating. `stats` - a three-figure row that zero pages passed.
   */
  if (variant === "type") {
    /* THE ONE EXCEPTION, AND IT IS DELIBERATE: /privacy-policy, /terms-of-service and
     * /accessibility get the type-only hero with no lead form on it. A quote form on the page
     * explaining what we do with your phone number is the single place the client's own rule works
     * against him. The trust plinth still runs underneath, so the three of them still open like the
     * rest of the site. Flagged to him rather than decided quietly. */
    return (
      <section className="bg-primary">
        <div className="shell py-14 lg:py-20">
          <div className="max-w-[76ch]">
            <Breadcrumb trail={trail} />
            <h1 className="display-hero-lg text-on-dark">{h1}</h1>
            <p className="mt-6 max-w-[62ch] text-[1.15rem] leading-relaxed text-on-dark/90">{lede}</p>
          </div>
        </div>
        <TrustPlinth />
      </section>
    );
  }

  return (
    <SiteHero
      h1={h1}
      lede={lede}
      photo={photo}
      photoAlt={photoAlt}
      objectPosition={objectPosition}
      breadcrumb={<Breadcrumb trail={trail} />}
    />
  );
}

/* THE SPEC SHEET. It was a table and it is not one any more.
 *
 * "We should never ever have sections designed like this looking like an excel sheet."
 *
 * He is right, and it is worth naming exactly which parts were doing that, because the content is
 * genuinely tabular and the answer is not to hide the information:
 *
 *   ZEBRA STRIPING     alternating row tints. The single biggest tell. It exists in spreadsheets
 *                      to help an eye track across forty columns; here there are three, and the
 *                      stripes were the loudest thing in the section.
 *   A DARK HEADER BAR  a filled navy strip with column names in it. That is a spreadsheet header
 *                      row, and it framed everything under it as data rather than as an argument.
 *   THE RULED BOX      a ring around the whole thing with cells butted against each other, so the
 *                      grid lines carried the structure instead of the type doing it.
 *   FLAT WEIGHT        every cell at the same size and colour, so nothing led.
 *
 * What replaces them is hierarchy: the spec name small and quiet, the value in the display face,
 * the reason as body copy at a readable measure, and a lot more air per row. Hairlines separate
 * rows and nothing else is drawn.
 *
 * TWO MODES, because the five call sites are two different things and the old component treated
 * them identically:
 *   spec     a sheet. Spec, value, and optionally why it matters. Reads as a definition list.
 *   versus   two things compared. Both columns get equal weight unless `highlightA`, which is set
 *            only where one side is ours - and where it is set, the emphasis is a continuous
 *            amber edge and a soft wash down that whole column, which reads as a lit channel
 *            rather than as a highlighted range of cells.
 *
 * THE TABLE ELEMENT IS GONE, and that removed a problem rather than creating one. The old build
 * carried two complete markups: a 40rem-min table that scrolled inside its own box, and a
 * stacked <dl> for phones, because at 390px the table clipped one brand mid-word and pushed the
 * other off-screen entirely. One responsive grid does both, so there is one markup, one
 * accessibility tree, and nothing scrolls sideways.
 *
 * `min-w-0` stays and is still load-bearing: this sits inside a grid item, grid items default to
 * min-width auto, and without it the content sets the column width and takes the document with it.
 */
export function SpecTable({
  rows, headA, headB, highlightA, onDark = true, caption, source, mode,
}: {
  rows: { spec: string; a: string; b?: string }[];
  headA: string; headB?: string; highlightA?: boolean; onDark?: boolean; caption: string;
  source?: string;
  /** Defaults to a comparison when there are two columns. Pass "spec" where the second column
   *  is a reason rather than a rival, or it gets read as one. */
  mode?: "spec" | "versus";
}) {
  const kind = mode ?? (headB ? "versus" : "spec");
  const two = !!headB;

  const rule = onDark ? "border-on-dark/12" : "border-border";
  const specTone = onDark ? "text-on-dark-muted" : "text-muted-foreground";
  const valueTone = onDark ? "text-on-dark" : "text-foreground";
  const bodyTone = onDark ? "text-on-dark-muted" : "text-muted-foreground";

  /* The emphasis on our own column: a 2px amber edge and a wash, applied per row. The rows are
   * contiguous, so both read as one continuous band down the column rather than as cell fills. */
  /* HOW OUR COLUMN IS MARKED, AFTER TWO WRONG ANSWERS.
   *
   * A pale amber wash behind every cell read as highlighter pen dragged across the text, which is
   * a spreadsheet gesture wearing brand colours. A 2px amber rule down the column read better and
   * was caught by scripts/slopcheck.sh, which bans coloured left and top border strips on cards
   * outright: "as reliable a tell as em-dashes in text." The gate is right and it is this
   * project's own rule, so it stands.
   *
   * What is left is the device the rest of the site already uses. A small light against each of
   * our values, matching the larger one on the column head, so the column is marked by the same
   * mark as everything else rather than by a piece of chrome invented for this table. */
  const lit = "";

  const cols = two
    ? "md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,1fr)]"
    : "md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]";

  /* In spec mode the second column is an explanation, so it gets body treatment and the value
   * leads. In versus mode both are values and they are set the same, minus the emphasis. */
  const aClass =
    kind === "versus"
      ? `font-display text-[1.1rem] font-bold leading-snug ${valueTone}`
      : `font-display text-[1.05rem] font-bold leading-snug ${valueTone}`;
  const bClass =
    kind === "versus"
      ? `text-[1.02rem] leading-snug ${highlightA ? bodyTone : valueTone}`
      : `text-[0.95rem] leading-relaxed ${bodyTone}`;

  return (
    <div className="min-w-0">
      <p className="sr-only">{caption}</p>

      {/* THE COLUMN HEADS ARE TYPE, NOT A FILLED BAR. Only from md, because below that each row
        * carries its own inline labels and a heading row would be pointing at nothing. */}
      {/* THE HEADS CARRY REAL WEIGHT NOW. They were 11px labels, the same size as the spec names
        * under them, so the section opened on four identical grey words and nothing announced what
        * was being compared with what. At display size they are the argument, and the amber light
        * on ours is the same mark the process lists use. */}
      <div className={`hidden items-end pb-4 md:grid ${cols} gap-x-8 border-b ${rule}`}>
        <span className={`label ${specTone}`}>Spec</span>
        <span className="flex items-center gap-2.5">
          {highlightA && <span className="run-node-inline" aria-hidden />}
          <span className={`font-display text-lg font-bold leading-none ${valueTone}`}>{headA}</span>
        </span>
        {two && (
          <span className={`font-display text-lg font-bold leading-none ${specTone}`}>{headB}</span>
        )}
      </div>

      <dl className={`border-t ${rule} md:border-t-0`}>
        {rows.map((r) => (
          /* THE PADDING IS ON THE CELLS, NOT THE ROW, and that is the difference between a
            * continuous rule and a row of ticks. With `py-6` on the row, the amber border on our
            * column only spanned the height of its own text, so eight rows produced eight short
            * dashes floating in the gutter. Moving the padding into the cells makes each cell the
            * full height of its row, so the border runs the length of the column unbroken. */
          <div key={r.spec} className={`grid gap-x-8 gap-y-2 border-b ${rule} py-5 md:py-0 ${cols}`}>
            <dt className={`label md:py-6 ${specTone}`}>{r.spec}</dt>

            <dd className={`min-w-0 md:py-6 ${lit}`}>
              {/* The inline column label below md, where the heading row is not shown. */}
              {two && (
                <span className={`label mb-1 block md:hidden ${highlightA ? "text-accent" : specTone}`}>
                  {headA}
                </span>
              )}
              {highlightA ? (
                <span className="flex items-baseline gap-2.5">
                  <span className="run-node-inline is-sm translate-y-[-1px]" aria-hidden />
                  <span className={`block ${aClass}`}>{r.a}</span>
                </span>
              ) : (
                <span className={`block ${aClass}`}>{r.a}</span>
              )}
            </dd>

            {two && (
              <dd className="min-w-0 md:py-6">
                <span className={`label mb-1 block md:hidden ${specTone}`}>{headB}</span>
                <span className={`block ${bClass}`}>{r.b}</span>
              </dd>
            )}
          </div>
        ))}
      </dl>

      {/* A MEASURE ON THE FOOTNOTE. It sat at the full shell width, which at 1536 is a 221-character
        line. Anything over about 95 characters loses the reader between the end of one line and
        the start of the next, and a footnote is the last place to spend that. */}
      {source && <p className={`mt-4 max-w-[84ch] text-xs leading-relaxed ${bodyTone}`}>{source}</p>}
    </div>
  );
}

/** Service link rows. `only` narrows the list to what the page is actually about — the
 *  same eleven rows on ten different pages is filler dressed as navigation. */
export function ServiceRows({
  onDark, only, columns = 3,
}: { onDark?: boolean; only?: string[]; columns?: 2 | 3 }) {
  /* EACH ROW IS A CARD WITH THE PHOTOGRAPH OF THAT SERVICE. "These service links should be cards
   * side by side with images of that other service."
   *
   * They were full-width text rows stacked in a framed rack: a bold name, a grey line under it,
   * a hairline, repeat. Four of them read as a table of contents, which is a poor way to sell the
   * next thing somebody might buy, and it was the only link block on the site with nothing to
   * look at. Every service carries a `photo` key into content/images.ts already.
   *
   * A service with no photograph still renders, without the media block, rather than showing a
   * grey placeholder. There is one, and it is better for it to be a text card in the row than for
   * the row to have a hole in it. */
  const list = only ? services.filter((s) => only.includes(s.slug)) : services;
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${columns === 3 ? "xl:grid-cols-3" : ""}`}>
      {list.map((s) => {
        const shot = s.photo ? images[s.photo] : undefined;
        return (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className={`group flex h-full flex-col overflow-hidden rounded-lg transition-all duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5 ${
                onDark
                  ? "bg-raise ring-1 ring-on-dark/10 hover:ring-accent/40"
                  : "bg-card shadow-[var(--shadow-lg)] ring-1 ring-border"
              }`}
            >
              {shot?.src && (
                <span className="relative block aspect-16/9 overflow-hidden bg-primary">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    /* 22vw assumed the three-across layout. ServiceRows also renders two across,
                      * where the slot is 678px at 1440 and 22vw asked for 316. */
                    sizes={`(min-width: 1280px) ${columns === 3 ? 24 : 47}vw, (min-width: 640px) 46vw, 100vw`}
                    className="object-cover transition-transform duration-[--dur-base] ease-[--ease-out-expo] group-hover:scale-[1.03]"
                  />
                </span>
              )}
              <span className="flex min-w-0 flex-1 flex-col p-5">
                <span className={`block font-display text-[1.05rem] font-bold leading-snug ${onDark ? "text-on-dark group-hover:text-accent" : "text-foreground group-hover:text-accent-ink"}`}>
                  {s.name}
                </span>
                <span className={`mt-1.5 block text-sm leading-relaxed ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
                  {s.short}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The towns, as ONE framed rack rather than eighteen boxes — matching the home page.
 *  Eighteen bordered tiles was two and a half phone screens of 60px cards, and it is a
 *  list of place names. */
export function CityTiles({
  exclude, list, onDark = false, columns = 3,
}: { exclude?: string; list?: typeof cities; onDark?: boolean; columns?: 2 | 3 }) {
  const items = (list ?? cities).filter((c) => c.slug !== exclude);
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  const edge = onDark ? "border-on-dark/10" : "border-border";
  return (
    <div className={`overflow-hidden rounded-lg ring-1 ${onDark ? "bg-primary ring-on-dark/12" : "bg-card ring-border"}`}>
      <ul className={`grid ${cols} ${onDark ? "divide-on-dark/10" : "divide-border"} sm:divide-x`}>
        {items.map((c) => (
          <li key={c.slug} className={`border-b ${edge} last:border-b-0`}>
            <Link
              href={`/service-areas/${c.slug}`}
              className={`flex items-baseline justify-between gap-4 px-4 py-3 transition-colors duration-[--dur-fast] ${
                onDark ? "hover:bg-raise" : "hover:bg-muted"
              }`}
            >
              <span className={`font-display text-[0.95rem] font-bold ${onDark ? "text-on-dark" : "text-foreground"}`}>
                {c.name}{c.state === "IA" ? ", IA" : ""}
              </span>
              <span className={`u shrink-0 text-xs ${onDark ? "text-accent" : "text-accent-ink"}`}>{c.drive}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** THE CLOSER, two ways — and the rule is ONE per page.
 *
 *  form  — the full form beside the argument. For pages where the next step is a quote.
 *  phone — no form: the number at size in its own dark panel, plus where to read next.
 *          For pages that already carry a form in the hero, which since the hero rewrite
 *          is every page except the legal ones.
 *
 *  Sixteen templates used to render this AND the band below it, which is two closers and
 *  two forms on one page.
 *
 *  Two things this used to get wrong. The phone variant was ONE column in a narrow shell,
 *  so the page ended on a half-empty row — the blank-space problem, at the bottom of every
 *  page that used it. And the "not ready for a visit" line always printed the same three
 *  links, so /pricing closed by offering to explain how the pricing works and
 *  /free-design-consultation closed by repeating its own H1 word for word. `omit` drops
 *  the self-link; `title`/`body` let a page that already made this exact argument up top
 *  make a different one down here. */
/* A LOOKUP, NOT AN INTERPOLATION. `bg-${ground}` compiles and then silently renders with no
 * background at all: Tailwind scans source text for class names, so a class assembled at runtime
 * is never generated. Every ground the closer can take has to appear here as a literal. */
const CTA_GROUND: Record<"muted" | "card" | "primary" | "raise", string> = {
  muted: "bg-muted",
  /* `card` replaced `background` here. Limestone is within dE 6.3 of both white and the deep
     neutral, so as a section ground it can never legally touch either one. See the note in
     scripts/section-rhythm.mjs. */
  card: "bg-card",
  primary: "bg-primary",
  raise: "bg-raise",
};

export function PageCta({
  city, variant = "form", stats = true, title, body, omit = [], panelLink, ground, photos,
}: {
  /** Candidate keys into content/images.ts for the closer photograph. Passed per template, so
   *  two pages do not end on the same picture. The first frame that is not a 3/4 portrait wins:
   *  this slot is 16/9, and cropping a portrait into it throws away most of the picture. */
  photos?: string[];
  city?: string;
  variant?: "form" | "phone";
  /* THE CLOSER HAS TO ALTERNATE WITH WHATEVER IS ABOVE IT, and it could not.
   *
   * The phone variant was hard-coded to bg-muted and the form variant to bg-primary, so on seven
   * pages the closer landed on the same ground as the section immediately before it and the two
   * read as one section with a dead strip through the middle — measured at 1440 x 199px on the
   * article template, which is twelve pages on its own.
   *
   * The ground is a decision about the page, not about the component, so the page makes it. The
   * defaults are the old behaviour, so nothing changes unless a caller says so. */
  ground?: "muted" | "card" | "primary" | "raise";
  stats?: boolean;
  title?: string;
  body?: string;
  /** hrefs to drop from the read-next line — pass the page's own path */
  omit?: string[];
  /** the link at the foot of the phone panel. Override it on the consultation page,
   *  which would otherwise close by linking to itself. */
  panelLink?: { href: string; label: string };
}) {
  const nextLinks = [
    { href: "/pricing", label: "how the pricing works" },
    { href: "/compare", label: "compare the brands we are asked about" },
    { href: "/warranty", label: "what the warranty covers" },
    { href: "/how-it-works", label: "what install day looks like" },
  ]
    .filter((l) => !omit.includes(l.href))
    .slice(0, 3);

  const head = (
    <>
      <SectionHead
        title={title ?? "See it on your house before you buy."}
      />
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        {body ??
          "We measure on site, design it with you after dark, and hand you a written quote. If you decide against it, you’ve lost an hour and gained a plan."}
      </p>
      <ul className="mt-7 space-y-3">
        <Check>Free on-site assessment</Check>
        <Check>Written quote, no pressure</Check>
        <Check>Financing available</Check>
      </ul>
    </>
  );

  const readNext = (
    <p className="text-sm leading-relaxed text-muted-foreground">
      Not ready for a visit? Read{" "}
      {nextLinks.map((l, i) => (
        <Fragment key={l.href}>
          {i > 0 && (i === nextLinks.length - 1 ? ", or " : ", ")}
          <Link
            href={l.href}
            className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
          >
            {l.label}
          </Link>
        </Fragment>
      ))}
      .
    </p>
  );

  const statList: [string, string][] = [
    ["1 day", "typical install"],
    [reviewProof.average, `from ${reviewProof.count} reviews`],
    ["Ours", "the crew on your roof"],
    ["Free", "design consultation"],
  ];

  const closerPool = (photos ?? []).map((k) => images[k]).filter((x) => x?.src);
  const closer = closerPool.find((x) => x!.ratio !== "3/4") ?? closerPool[0];

  if (variant === "phone") {
    /* Two columns, so the page does not end on an empty half. The number gets the dark
     * panel because it is the one thing on this band we want somebody to act on. */
    return (
      <section className={`section ${CTA_GROUND[ground ?? "muted"]}`}>
        {/* items-CENTER, and the column is wider. The copy in this closer is a heading, a short
          * lede and three ticks, and the form beside it will always be taller. With items-start
          * the difference all collected at the bottom left as one hole; centred, the copy sits
          * against the middle of the form and the leftover splits evenly above and below. */}
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          <div>
            {head}
            <div className="mt-9 border-t border-border pt-7">{readNext}</div>

            {/* A PHOTOGRAPH, FOR THE SAME REASON THE HOME CLOSER HAS ONE.
              *
              * This column is a heading, a short lede, three ticks and a line of links. The form
              * beside it is six fields. Centring the two stopped the gap collecting at the bottom
              * left, but left roughly 190px of empty limestone above and below instead, and the
              * fix for empty space on this site has never been more words.
              *
              * Hidden below lg, where the two columns stack and there is no space to fill. */}
            {closer?.src && (
              <div className="relative mt-9 hidden aspect-16/9 overflow-hidden rounded-lg bg-primary ring-1 ring-border lg:block">
                {/* 63vw, not 46. The copy column is 1fr of [1fr_26rem] in a 1376 shell, which is a 904px
                  * slot at 1440, and 46vw was asking Next for 662. */}
                <Image src={closer.src} alt={closer.alt} fill sizes="(min-width: 1024px) 63vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>

          {/* A FORM, NOT A PANEL OF FACTS. "Instead of all this random text this should be a form."
            *
            * It was a phone number, a same-day-reply line, four stat pairs (1 day, 5.0, Ours,
            * Free) and a text link. Every one of those appears somewhere else on the page it sits
            * at the bottom of, and none of them is an action: the panel closed twelve templates by
            * restating the page and then asking the reader to go and find something to click.
            *
            * The compact variant is name, phone, email, city and what they are lighting, which is
            * everything the crew needs to call back. The number stays underneath as the
            * alternative, because a closer that removes the phone from a trade site is worse than
            * one made of facts. */}
          <div>
            <QuoteForm variant="compact" dark heading="Book the on-site design" submitLabel="Book my free design" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Or call{" "}
              <a href={site.phoneHref} className="u font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
                {site.phone}
              </a>
              . Same-day reply, most days.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${CTA_GROUND[ground ?? "muted"]}`}>
      <div className="shell grid items-start gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
        <div>
          {head}
          <div className="mt-9 grid gap-5 border-t border-border pt-7 sm:grid-cols-2">
            <div>
              <p className="label text-muted-foreground">Or call us directly</p>
              <a href={site.phoneHref} className="u mt-1.5 block text-3xl font-medium text-foreground hover:text-accent-deep">{site.phone}</a>
              <p className="mt-2 text-xs text-muted-foreground">Same-day reply, most days</p>
            </div>
            {stats && (
              <dl className="grid grid-cols-2 gap-4">
                {statList.map(([f, l]) => (
                  <div key={l}>
                    <dt className="u text-lg font-medium leading-none text-foreground">{f}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="mt-7">{readNext}</div>
        </div>
        <QuoteForm variant="full" city={city} />
      </div>
    </section>
  );
}

/** The short band. Use it INSTEAD of PageCta, not before it. */
export function BandCta({ title, body, note }: { title: string; body: string; note?: string }) {
  return (
    <section className="bg-primary">
      <div className="shell py-14 text-center">
        <h2 className="mx-auto max-w-[40ch] text-[clamp(1.6rem,2.8vw,2.2rem)] text-on-dark">{title}</h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-on-dark-muted">{body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/free-design-consultation">Free design consultation</Link></Button>
          <Button asChild size="lg" variant="outline-dark"><a href={site.phoneHref} className="u">{site.phone}</a></Button>
        </div>
        {note && <p className="mx-auto mt-5 max-w-[54ch] text-sm text-on-dark-muted">{note}</p>}
      </div>
    </section>
  );
}

export { SectionHead, Check, TextLink, QuoteForm, metroCities };
