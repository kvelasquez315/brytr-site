import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { cities, metroCities } from "@/content/cities";
import { services } from "@/content/services";
import { reviewProof } from "@/content/reviews";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm, Tile } from "@/components/ui/bits";
import { iconMap } from "@/content/icon-map";

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
 *  photo  — the default. Full-bleed install photograph + scrim + form. Every page.
 *  spec   — same photograph treatment, but a spec table replaces the form, for hardware
 *           and comparison pages where a form in the hero is premature and the
 *           specification IS the argument.
 *  map    — same treatment with the Leaflet map in the right column. Service areas only.
 *  type   — no photograph, no form: legal and policy pages. They should look plain,
 *           because plain is honest for what they are.
 *
 * `photo` is required for the first three. There is a fallback, but a page that ships on
 * the fallback is a page nobody chose a photograph for — the whole point is that the shot
 * is about that page's subject.
 */
type HeroVariant = "photo" | "spec" | "map" | "type" | "quote";
const FALLBACK_HERO = "/img/hero-bg.jpg";

export function PageHero({
  eyebrow, h1, lede, trail, aside, stats, footnote,
  variant = "photo",
  photo,
  photoAlt = "",
  objectPosition = "50% 50%",
}: {
  eyebrow: string; h1: string; lede: string;
  trail: { name: string; href: string }[];
  aside?: React.ReactNode;
  /* Figures that stand on their own. NOT a count of whatever list follows the hero —
     "11 services" above eleven service cards is the page counting itself out loud. */
  stats?: [string, string][];
  footnote?: React.ReactNode;
  variant?: HeroVariant;
  photo?: string;
  photoAlt?: string;
  objectPosition?: string;
}) {
  const Type = (
    <>
      <Breadcrumb trail={trail} />
      <p className="eyebrow eyebrow--on-dark">{eyebrow}</p>
      <h1 className="mt-4 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02] text-on-dark">
        {h1}
      </h1>
      <p className="mt-5 max-w-[62ch] text-lg text-on-dark/85">{lede}</p>
      {variant !== "type" && (
        /* One button, and it is the phone number — the form is in the hero, so a second
         * "get a consultation" button would be competing with itself. Same call the home
         * page makes. */
        <div className="mt-8">
          <Button asChild size="lg"><a href={site.phoneHref} className="u">{site.phone}</a></Button>
        </div>
      )}
      {stats && (
        <dl className="mt-9 grid max-w-[34rem] grid-cols-3 divide-x divide-on-dark/12 rounded-lg bg-raise ring-1 ring-on-dark/10">
          {stats.map(([f, l]) => (
            <div key={l} className="px-4 py-5">
              <dt className="u text-xl font-medium leading-none text-on-dark">{f}</dt>
              <dd className="mt-2 text-xs leading-snug text-on-dark-muted">{l}</dd>
            </div>
          ))}
        </dl>
      )}
      {footnote && <div className="mt-6 max-w-[54ch] text-sm text-on-dark-muted">{footnote}</div>}
    </>
  );

  /* type-only: one column, generous measure, nothing else in the room.
   *
   * `max-w-[70rem]` here was wrong and visible. `.shell` caps at --container (100rem), so at
   * 1440 the shell's own left edge is the 2rem gutter — x=32. Capping this hero at 70rem
   * centred it instead, putting the H1 at x=192 while the body section below it stayed at 32.
   * Every legal page therefore stepped 160px to the left the moment you scrolled past the
   * hero. The measure belongs on the text, not on the container, so the whole document keeps
   * one left edge — and 76ch matches the body copy on the legal pages exactly. */
  if (variant === "type") {
    return (
      <section className="bg-primary">
        <div className="shell py-14 lg:py-20">
          <div className="max-w-[76ch]">{Type}</div>
        </div>
      </section>
    );
  }

  /* Everything else gets the home page's hero: the photograph carries the section, the
   * type sits on the scrim, and the right column is the form unless the page has a better
   * use for it (a spec table, the map). */
  const asideNode =
    aside ?? <QuoteForm variant="compact" heading="Get a free design consultation" />;

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src={photo ?? FALLBACK_HERO}
        alt={photoAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div
        className={`shell relative grid items-center gap-10 py-14 lg:gap-14 lg:py-20 ${
          variant === "spec" ? "lg:grid-cols-[46fr_54fr]" : "lg:grid-cols-[1fr_28rem]"
        }`}
      >
        <div className="max-w-[46rem]">{Type}</div>
        <div className={variant === "spec" ? "" : "lg:w-[28rem] lg:justify-self-end"}>{asideNode}</div>
      </div>

      {/* the one amber line, same as home */}
      <div className="hero-baseline absolute inset-x-0 bottom-0 h-0.5" aria-hidden />
    </section>
  );
}

/** A dense spec table. Used on system, compare and service pages.
 *  `source` prints where the numbers came from, which is the difference between a spec
 *  table and a marketing table. */
export function SpecTable({
  rows, headA, headB, highlightA, onDark = true, caption, source,
}: {
  rows: { spec: string; a: string; b?: string }[];
  headA: string; headB?: string; highlightA?: boolean; onDark?: boolean; caption: string;
  source?: string;
}) {
  const hi = highlightA ? "border-x-2 border-accent" : "";
  /* A two-column sheet (Spec / Value) fits a 390px phone at this type size, so it gets no
   * min-width and never scrolls sideways. A three-column sheet is two brands compared, which
   * genuinely needs the width, so that one keeps the 40rem floor and scrolls inside its own box.
   *
   * `min-w-0` is load-bearing, not tidying. This table sits inside a grid item on the system,
   * compare and service pages, and a grid item defaults to `min-width: auto` — meaning it
   * refuses to shrink below its content's min-content width. The 40rem table therefore pushed
   * its own grid column to 640px and took the whole document with it: every system page was
   * 656px wide inside a 390px viewport, so the entire page scrolled sideways rather than the
   * table. `overflow-x-auto` cannot contain anything until the box is allowed to be narrower
   * than what is inside it. */
  const floor = headB ? "min-w-[40rem]" : "";

  /* AND A THREE-COLUMN SHEET RESTACKS ON A PHONE RATHER THAN SCROLLING.
   *
   * Containing the overflow was not the same as fixing it. At 390px the head-to-head table
   * showed the Spec column, the left brand clipped mid-word ("Dedicated warm whit"), and the
   * right brand — half of the comparison — entirely off-screen with no scrollbar, no fade and
   * no hint that it existed. Then a footnote underneath explained a column the reader never
   * saw. A comparison that hides one of the two things being compared is not a comparison.
   *
   * So below `sm` the same rows render as blocks: the spec, then both brands labelled and
   * stacked. Nothing scrolls sideways and both columns are always present. Only one of the two
   * markups is ever displayed, so only one is ever in the accessibility tree. */
  const stack = headB ? (
    <dl className={`grid gap-px overflow-hidden rounded-lg ring-1 sm:hidden ${onDark ? "bg-on-dark/12 ring-on-dark/12" : "bg-border ring-border"}`}>
      {rows.map((r) => (
        <div key={r.spec} className={onDark ? "bg-primary px-5 py-4" : "bg-card px-5 py-4"}>
          <dt className={`text-sm font-semibold ${onDark ? "text-on-dark" : "text-foreground"}`}>{r.spec}</dt>
          <dd className="mt-2.5 grid gap-2">
            <div>
              <p className={`label ${highlightA ? "text-accent" : onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{headA}</p>
              <p className={`mt-0.5 text-[0.95rem] leading-relaxed ${onDark ? "on-dark-cell" : "text-foreground"}`}>{r.a}</p>
            </div>
            <div className={`border-t pt-2 ${onDark ? "border-on-dark/10" : "border-border"}`}>
              <p className={`label ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{headB}</p>
              <p className={`mt-0.5 text-[0.95rem] leading-relaxed ${
                onDark ? (highlightA ? "on-dark-cell-muted" : "on-dark-cell") : (highlightA ? "text-muted-foreground" : "text-foreground")
              }`}>{r.b}</p>
            </div>
          </dd>
        </div>
      ))}
    </dl>
  ) : null;

  return (
    <div className="min-w-0">
      {stack}
      <div className={`min-w-0 overflow-x-auto rounded-lg ring-1 ${headB ? "hidden sm:block" : ""} ${onDark ? "ring-on-dark/12" : "ring-border"}`}>
        <table className={`w-full ${floor} border-collapse text-left`}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className={onDark ? "bg-raise" : "bg-primary"}>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">Spec</th>
              <th scope="col" className={`px-5 py-4 text-sm font-semibold text-on-dark ${hi}`}>{headA}</th>
              {headB && (
                <th scope="col" className={`px-5 py-4 text-sm font-semibold ${highlightA ? "text-on-dark-muted" : "text-on-dark"}`}>{headB}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.spec} className={onDark ? (i % 2 ? "bg-primary" : "bg-on-dark/[0.03]") : (i % 2 ? "bg-card" : "bg-muted")}>
                <th scope="row" className={`px-5 py-4 text-[0.95rem] font-medium ${onDark ? "on-dark-cell" : "text-foreground"}`}>{r.spec}</th>
                <td className={`px-5 py-4 text-[0.95rem] ${onDark ? "on-dark-cell" : "text-foreground"} ${hi}`}>{r.a}</td>
                {headB && (
                  <td className={`px-5 py-4 text-[0.95rem] ${
                    onDark ? (highlightA ? "on-dark-cell-muted" : "on-dark-cell") : (highlightA ? "text-muted-foreground" : "text-foreground")
                  }`}>{r.b}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && (
        <p className={`mt-3 text-xs ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{source}</p>
      )}
    </div>
  );
}

/** Service link rows. `only` narrows the list to what the page is actually about — the
 *  same eleven rows on ten different pages is filler dressed as navigation. */
export function ServiceRows({
  onDark, only, columns = 3,
}: { onDark?: boolean; only?: string[]; columns?: 2 | 3 }) {
  const list = only ? services.filter((s) => only.includes(s.slug)) : services;
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${columns === 3 ? "xl:grid-cols-3" : ""}`}>
      {list.map((s) => {
        const I = iconMap[s.icon];
        return (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className={`flex h-full items-start gap-4 rounded-lg p-4 transition-all duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5 ${
                onDark ? "bg-raise ring-1 ring-on-dark/10 hover:ring-accent/40" : "bg-card shadow-[var(--shadow-lg)]"
              }`}
            >
              <span className={onDark ? "channel-tile" : "channel-tile channel-tile--light"} aria-hidden><I className="size-7" /></span>
              <span className="min-w-0">
                <span className={`block font-display text-base font-bold ${onDark ? "text-on-dark" : "text-foreground"}`}>{s.name}</span>
                <span className={`mt-1 block text-sm ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{s.short}</span>
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
export function PageCta({
  city, variant = "form", stats = true, title, body, omit = [], panelLink,
}: {
  city?: string;
  variant?: "form" | "phone";
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
        eyebrow="Next step"
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
    ["W2", "our own crews"],
    ["2 tiers", "premium and value"],
  ];

  if (variant === "phone") {
    /* Two columns, so the page does not end on an empty half. The number gets the dark
     * panel because it is the one thing on this band we want somebody to act on. */
    return (
      <section className="section bg-muted">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div>
            {head}
            <div className="mt-9 border-t border-border pt-7">{readNext}</div>
          </div>
          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label text-accent">Call the shop</p>
            <a
              href={site.phoneHref}
              className="u mt-2.5 block text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-none text-on-dark hover:text-accent"
            >
              {site.phone}
            </a>
            <p className="mt-3 text-sm text-on-dark-muted">Same-day reply, most days.</p>
            {stats && (
              <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-on-dark/12 pt-6">
                {statList.map(([f, l]) => (
                  <div key={l}>
                    <dt className="u text-lg font-medium leading-none text-on-dark">{f}</dt>
                    <dd className="mt-1.5 text-xs leading-snug text-on-dark-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href={panelLink?.href ?? "/free-design-consultation"}>
                {panelLink?.label ?? "Book the on-site measure"}
              </TextLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-muted">
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

export { SectionHead, Check, TextLink, QuoteForm, Tile, metroCities };
