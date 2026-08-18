import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compares, compareBySlug } from "@/content/compares";
import { Shell } from "@/app/layout-shell";
import { Elevation } from "@/components/sections/elevation";
import {
  PageHero, PageCta, BandCta, SpecTable, SectionHead, Check, TextLink,
} from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

const shortVerdict = (v: string) => {
  /* first whole sentence, never a mid-word cut */
  const first = v.split(". ")[0].replace(/\.+$/, "");
  if (first.length <= 150) return first + ".";
  const cut = first.slice(0, 150);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
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
  const others = compares.filter((o) => o.slug !== c.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` },
  ];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={{
        "@context": "https://schema.org", "@type": "Article", headline: c.h1,
        description: c.verdict, author: { "@type": "Organization", name: "Brytr Co" },
      }} />

      <PageHero
        eyebrow="Honest comparison"
        h1={c.h1}
        lede={`We install two of the ten brands on this market and service five more, so this page is written from pulling failed sections off houses rather than from reading spec sheets. Both columns below get identical treatment.`}
        trail={trail}
        footnote={
          <>
            We carry two of the ten brands on this market and repair five more.{" "}
            <Link href="/compare" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">See all ten compared</Link>.
          </>
        }
        aside={
          <div className="rounded-lg bg-raise p-6 ring-1 ring-accent/15 shadow-[var(--shadow-dark)]">
            <p className="eyebrow eyebrow--on-dark">The verdict</p>
            <p className="mt-4 text-lg text-on-dark">{c.verdict}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-primary p-4">
                <p className="u text-2xs uppercase tracking-[0.12em] text-on-dark-muted">{c.a}</p>
                <p className="u mt-1.5 text-sm font-medium text-on-dark">{c.costA}</p>
              </div>
              <div className="rounded-md bg-primary p-4">
                <p className="u text-2xs uppercase tracking-[0.12em] text-on-dark-muted">{c.b}</p>
                <p className="u mt-1.5 text-sm font-medium text-on-dark">{c.costB}</p>
              </div>
            </div>
            <p className="mt-5 text-xs text-on-dark-muted">
              {c.neutral
                ? "Neither of these is our premium system, so we have no stake in the answer."
                : c.labor
                ? "This is a labor comparison, not a brand comparison."
                : "We install both tiers, which is why the cheaper option gets real reasons to win below."}
            </p>
          </div>
        }
      />

      {/* 2 — the two products, equal weight · bone */}
      <section className="section bg-background">
        <div className="shell">
          <SectionHead title="Equal billing, on purpose." lede="Same card, same divider, same type color, same five specs. Neither column gets a badge, a highlight or a border the other does not." />
          <div className="mt-10 grid gap-0 divide-y divide-border overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {[[c.a, c.costA, c.rows.slice(0, 5).map((r) => ({ spec: r.spec, v: r.a }))],
              [c.b, c.costB, c.rows.slice(0, 5).map((r) => ({ spec: r.spec, v: r.b ?? "" }))]].map(([name, cost, specs], i) => (
              <div key={name as string} className="p-7">
                <div className="overflow-hidden rounded-md ring-1 ring-border">
                  <Elevation night massing={i === 0 ? "gable" : "ranch"} lit={{ hex: "#f5c518", label: name as string }} className="block w-full" />
                </div>
                <h3 className="mt-6 text-2xl text-foreground">{name as string}</h3>
                <p className="u mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{cost as string}</p>
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {(specs as { spec: string; v: string }[]).map((x) => (
                    <div key={x.spec} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">{x.spec}</dt>
                      <dd className="u text-right text-sm font-medium text-foreground">{x.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — full spec table · bone-deep */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="The specs" title="Line by line." lede="No column is highlighted here. Read it and decide." />
          <div className="mt-10">
            <SpecTable onDark={false} caption={`${c.a} compared with ${c.b}`} rows={c.rows} headA={c.a} headB={c.b} />
          </div>
        </div>
      </section>

      {/* 4 — where each wins · two equal cards · primary */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead onDark title="Where each of these actually wins." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[[c.aWinsHead, c.aWins], [c.bWinsHead, c.bWins]].map(([h, list]) => (
              <article key={h as string} className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <h3 className="text-xl text-on-dark">{h as string}</h3>
                <ul className="mt-5 space-y-3">
                  {(list as string[]).map((w) => <Check key={w} onDark>{w}</Check>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — cost, full-width stat strip · charcoal */}
      <section className="bg-raise">
        <div className="shell py-14">
          <SectionHead onDark eyebrow="What people actually pay" title="Ranges, not fake precision." />
          <dl className="mt-8 grid grid-cols-2 gap-6 divide-on-dark/12 lg:grid-cols-4 lg:divide-x">
            {[[c.costA, c.a], [c.costB, c.b], ["150 to 400", "typical linear feet, Omaha home"], ["Financing", "available on approved credit"]].map(([f, l], i) => (
              <div key={l as string} className="lg:px-6">
                <dt className={`u text-2xl font-medium leading-tight ${i < 2 ? "text-on-dark" : "text-accent"}`}>{f as string}</dt>
                <dd className="mt-2 text-sm text-on-dark-muted">{l as string}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[80ch] text-sm text-on-dark-muted">
            Pricing on both systems is driven by linear feet of roofline, story count, roof complexity and
            how many zones you want. That is why we measure on site instead of quoting over the phone. See{" "}
            <Link href="/pricing" className="u text-accent underline decoration-2 underline-offset-4">full pricing</Link>.
          </p>
        </div>
      </section>

      {/* 6 — Brytr installs both · split · bone */}
      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
          <div>
            <SectionHead eyebrow="Why we can say this" title="We carry both tiers." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-lg text-foreground">
                A dealer who sells one brand has exactly one recommendation available to them, and you can
                predict it before they arrive.
              </p>
              <p className="text-muted-foreground">
                Brytr stocks a premium system and a value system. That is the only reason this page can
                give the cheaper option real reasons to win. It is also why we will occasionally talk you
                down a tier, which is a worse day for us and a better outcome for you.
              </p>
            </div>
            <div className="mt-7"><TextLink href="/lighting-systems/haven-evolution">Read the Haven Evolution review</TextLink></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Brytr Signature", "Our premium tier, on Haven Evolution.", "/lighting-systems/brytr-signature",
               [["LED spacing", "4 in."], ["White", "Dedicated channel"], ["Rated life", "25 years"], ["Zones", "Unlimited"]]],
              ["Brytr Basic", "Our value tier, on Jellyfish.", "/lighting-systems/brytr-basic",
               [["LED spacing", "Wider"], ["White", "Color mixed"], ["Rated life", "Shorter"], ["Zones", "Supported"]]],
            ].map(([h, p2, href, specs]) => (
              <Link key={h as string} href={href as string} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <h3 className="text-lg text-foreground">{h as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p2 as string}</p>
                <dl className="mt-4 flex-1 divide-y divide-border border-y border-border">
                  {(specs as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="u text-xs font-medium text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="u mt-4 text-xs uppercase tracking-[0.14em] text-accent-ink">See the system</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — other comparisons · charcoal */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead onDark title="The other eight head to heads." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="rounded-lg bg-primary p-5 ring-1 ring-on-dark/10 transition-all duration-[--dur-base] hover:-translate-y-0.5 hover:ring-accent/40">
                <h3 className="text-base text-on-dark">{o.a} vs {o.b}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{shortVerdict(o.verdict)}</p>
              </Link>
            ))}
            <Link href="/compare" className="flex flex-col justify-center rounded-lg bg-raise p-5 ring-1 ring-accent/25 transition-all duration-[--dur-base] hover:-translate-y-0.5 hover:ring-accent/60">
              <h3 className="text-base text-on-dark">All 10 brands, one table</h3>
              <p className="mt-2 text-sm text-on-dark-muted">
                The whole Omaha market side by side, including where our premium system loses.
              </p>
              <p className="u mt-4 text-xs uppercase tracking-[0.14em] text-accent">Open the matrix</p>
            </Link>
          </div>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
