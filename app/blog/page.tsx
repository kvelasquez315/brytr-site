import type { Metadata } from "next";
import Link from "next/link";
import { posts, categories } from "@/content/blog";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Permanent Lighting Resources",
  description: "Twelve honest guides to permanent outdoor lighting: cost, warranties, HOA approval, DIY versus professional install, and what actually fails.",
  alternates: { canonical: "/blog" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Resources", href: "/blog" }];

export default function BlogHub() {
  const [feat, ...rest] = posts;
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="Resources"
        h1="Answers before you buy."
        lede="Twelve guides written from installing and repairing this product rather than from a manufacturer's brochure. Including the parts that do not flatter us."
        trail={trail}
        stats={[["12", "guides"], ["0", "sponsored posts"], ["5.0", "from 177 reviews"]]}
        aside={
          <Link href={`/blog/${feat.slug}`} className="block rounded-lg bg-raise p-7 ring-1 ring-accent/15 shadow-[var(--shadow-dark)]">
            <p className="u text-2xs uppercase tracking-[0.14em] text-accent">Start here · {feat.category}</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-on-dark">{feat.title}</h2>
            <p className="mt-3 text-[0.95rem] text-on-dark-muted">{feat.dek}</p>
            <p className="u mt-5 text-xs text-on-dark-muted">{feat.read} read</p>
          </Link>
        }
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead eyebrow="All guides" title="Twelve, by category." />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {["All", ...categories].map((c, i) => (
              <li key={c} className={`rounded-full px-4 py-2.5 text-sm font-medium ${i === 0 ? "bg-accent text-accent-foreground" : "border border-border bg-card text-foreground"}`}>{c}</li>
            ))}
          </ul>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] hover:-translate-y-0.5">
                <p className="u text-2xs uppercase tracking-[0.14em] text-accent-ink">{p.category}</p>
                <h2 className="mt-2 font-display text-lg font-bold text-foreground">{p.title}</h2>
                <p className="mt-2.5 flex-1 text-[0.95rem] text-muted-foreground">{p.dek}</p>
                <p className="u mt-4 text-xs text-muted-foreground">{p.read} read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </Shell>
  );
}
