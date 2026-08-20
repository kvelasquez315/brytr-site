import Link from "next/link";
import { site } from "@/content/site";
import { cities, metroCities } from "@/content/cities";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm, Tile } from "@/components/ui/bits";
import { iconMap } from "@/content/icon-map";

/* Shared page furniture. Every interior page is assembled from these, so a fix
 * here fixes all 76 of them at once. */

export function Breadcrumb({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-on-dark-muted">
        {trail.map((t, i) => (
          <li key={t.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-on-dark-muted">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-on-dark">{t.name}</span>
            ) : (
              <Link href={t.href} className="hover:text-accent">{t.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Subpage hero. Dense on both sides: type + proof left, quote card right. */
export function PageHero({
  eyebrow, h1, lede, trail, aside, stats, footnote,
}: {
  eyebrow: string; h1: string; lede: string;
  trail: { name: string; href: string }[];
  aside?: React.ReactNode;
  stats?: [string, string][];
  footnote?: React.ReactNode;
}) {
  return (
    <section className="bg-primary">
      <div className="shell grid items-start gap-10 py-12 lg:grid-cols-[54fr_46fr] lg:gap-14 lg:py-16">
        <div>
          <Breadcrumb trail={trail} />
          <p className="eyebrow eyebrow--on-dark">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.1rem,4.2vw,3.3rem)] text-on-dark">{h1}</h1>
          <p className="mt-5 max-w-[62ch] text-lg text-on-dark/85">{lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/free-design-consultation">Get a free design consultation</Link></Button>
            <Button asChild size="lg" variant="outline-dark"><a href={site.phoneHref} className="u">{site.phone}</a></Button>
          </div>
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
        </div>
        <div>{aside ?? <QuoteForm variant="financing" heading="Get a written quote" />}</div>
      </div>
    </section>
  );
}

/** A dense spec table. Used on system, compare and service pages. */
export function SpecTable({
  rows, headA, headB, highlightA, onDark = true, caption,
}: {
  rows: { spec: string; a: string; b?: string }[];
  headA: string; headB?: string; highlightA?: boolean; onDark?: boolean; caption: string;
}) {
  const hi = highlightA ? "border-x-2 border-accent" : "";
  return (
    <div className={`overflow-x-auto rounded-lg ring-1 ${onDark ? "ring-on-dark/12" : "ring-border"}`}>
      <table className="w-full min-w-[40rem] border-collapse text-left">
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
  );
}

/** All 11 services as icon link rows. Appears on city pages and hubs. */
export function ServiceRows({ onDark }: { onDark?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((s) => {
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

/** City tiles. Appears on service pages, hubs and city pages. */
export function CityTiles({ exclude, list, onDark }: { exclude?: string; list?: typeof cities; onDark?: boolean }) {
  const items = (list ?? cities).filter((c) => c.slug !== exclude);
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/service-areas/${c.slug}`}
            className={`flex h-19 flex-col justify-center rounded-md px-4 transition-colors duration-[--dur-fast] ${
              onDark ? "bg-raise ring-1 ring-on-dark/10 hover:ring-accent/50" : "border border-border bg-card hover:border-accent-deep"
            }`}
          >
            <span className={`font-semibold ${onDark ? "text-on-dark" : "text-foreground"}`}>{c.name}</span>
            <span className={`u mt-0.5 text-xs ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{c.drive}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The closing CTA. Same on every page. */
export function PageCta({ city }: { city?: string }) {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-start gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
        <div>
          <SectionHead eyebrow="Next step" title="See it on your house before you buy." />
          <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
            We measure on site, design it with you after dark, and hand you a written quote. If you
            decide not to do it, you have lost an hour and gained a plan.
          </p>
          <ul className="mt-7 space-y-3">
            <Check>Free on-site assessment</Check>
            <Check>Written quote, no pressure</Check>
            <Check>Financing available</Check>
          </ul>
          <div className="mt-9 grid gap-5 border-t border-border pt-7 sm:grid-cols-2">
            <div>
              <p className="label text-muted-foreground">Or call us directly</p>
              <a href={site.phoneHref} className="u mt-1.5 block text-3xl font-medium text-foreground hover:text-accent-deep">{site.phone}</a>
              <p className="u mt-2 text-xs text-muted-foreground">Mon to Sat · 8am to 6pm</p>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {[["1 day", "typical install"], ["5.0", "from 177 reviews"], ["2 tiers", "premium and value"], ["18", "cities served"]].map(([f, l]) => (
                <div key={l}>
                  <dt className="u text-lg font-medium leading-none text-foreground">{f}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-7 text-sm text-muted-foreground">
            Not ready for a visit? Read{" "}
            <Link href="/pricing" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">how the pricing works</Link>,{" "}
            <Link href="/compare" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">compare all 10 brands</Link>, or see{" "}
            <Link href="/warranty" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">what the warranty covers</Link>.
          </p>
        </div>
        <QuoteForm variant="full" city={city} />
      </div>
    </section>
  );
}

export function BandCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-primary">
      <div className="shell py-14 text-center">
        <h2 className="mx-auto max-w-[40ch] text-[clamp(1.6rem,2.8vw,2.2rem)] text-on-dark">{title}</h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-on-dark-muted">{body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/free-design-consultation">Free design consultation</Link></Button>
          <Button asChild size="lg" variant="outline-dark"><a href={site.phoneHref} className="u">{site.phone}</a></Button>
        </div>
      </div>
    </section>
  );
}

export { SectionHead, Check, TextLink, QuoteForm, Tile, metroCities };
