import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, postBySlug } from "@/content/blog";
import { services } from "@/content/services";
import { Shell } from "@/app/layout-shell";
import { QuoteForm, SectionHead, TextLink, Breadcrumb } from "@/components/sections/page-parts";
import { PageCta } from "@/components/sections/page-parts";
import { iconMap } from "@/content/icon-map";
import { Jsonld, breadcrumb } from "@/lib/schema";

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return { title: p.title, description: p.dek.slice(0, 155), alternates: { canonical: `/blog/${p.slug}` } };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const next = posts.filter((o) => o.slug !== p.slug).slice(0, 3);
  const rel = services.slice(0, 3);
  const trail = [{ name: "Home", href: "/" }, { name: "Resources", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }];
  const toc = p.body.filter((b) => b.h).map((b) => b.h!) as string[];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={{
        "@context": "https://schema.org", "@type": "Article", headline: p.h1, description: p.dek,
        author: { "@type": "Organization", name: "Brytr Co" },
        publisher: { "@type": "Organization", name: "Brytr Co" },
      }} />

      <section className="bg-primary">
        <div className="shell py-12 lg:py-16">
          <Breadcrumb trail={trail} />
          <p className="eyebrow eyebrow--on-dark">{p.category}</p>
          <h1 className="mt-4 max-w-[46ch] text-[clamp(2rem,4vw,3.1rem)] text-on-dark">{p.h1}</h1>
          <p className="mt-5 max-w-[68ch] text-lg text-on-dark/85">{p.dek}</p>
          <p className="u mt-7 text-xs uppercase tracking-[0.14em] text-on-dark-muted">
            Brytr Co · {p.read} read
          </p>
        </div>
      </section>

      <div className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)_19rem] lg:gap-12">
          {/* TOC — scrolls away normally, not sticky */}
          <nav aria-label="On this page" className="h-fit">
            <p className="u text-2xs uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
            <ul className="mt-4 space-y-2.5 border-l border-border pl-4">
              {toc.map((h) => (
                <li key={h}><span className="text-sm text-muted-foreground">{h}</span></li>
              ))}
            </ul>
          </nav>

          <article className="max-w-[68ch]">
            <p className="text-lg text-foreground">
              {p.body[0]?.p}{" "}
              <Link href={p.links.href} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
                {p.links.label}
              </Link>.
            </p>
            {p.body.slice(1).map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="mt-9 text-[1.6rem] text-foreground">{b.h}</h2>}
                {b.p && <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">{b.p}</p>}
                {b.list && (
                  <ul className="mt-4 space-y-2.5">
                    {b.list.map((li) => (
                      <li key={li} className="flex gap-3">
                        <svg viewBox="0 0 16 16" className="mt-1.5 size-3.5 shrink-0 text-accent" fill="none" aria-hidden><rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" /></svg>
                        <span className="text-[1.05rem] leading-relaxed text-muted-foreground">{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {b.callout && (
                  <aside className="mt-7 rounded-md bg-muted p-6">
                    <p className="font-display text-lg font-bold leading-snug text-foreground">{b.callout}</p>
                  </aside>
                )}
              </div>
            ))}
            <div className="mt-10 border-t border-border pt-7">
              <TextLink href={p.links.href}>{p.links.label}</TextLink>
            </div>
          </article>

          <aside className="space-y-6">
            <QuoteForm variant="compact" heading="Get a written quote" />
            <div className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
              <p className="u text-2xs uppercase tracking-[0.14em] text-muted-foreground">Related services</p>
              <ul className="mt-4 space-y-3">
                {rel.map((s) => {
                  const I = iconMap[s.icon];
                  return (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-accent-deep">
                        <span className="channel-tile channel-tile--light !size-10" aria-hidden><I className="size-5" /></span>
                        {s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Read next" title="More before you buy." />
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {next.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <p className="u text-2xs uppercase tracking-[0.14em] text-accent-ink">{o.category}</p>
                <h3 className="mt-2 text-lg text-foreground">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.dek.split(".")[0]}.</p>
                <p className="u mt-4 text-xs text-muted-foreground">{o.read} read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
