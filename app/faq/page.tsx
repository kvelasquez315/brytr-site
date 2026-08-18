import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles, ServiceRows, SpecTable } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { homeFaqs, pricingFaqs, serviceFaqsFor } from "@/content/faqs";
import { Faq } from "@/components/sections/faq";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Permanent Lighting FAQ",
  description: "Every question we get about permanent outdoor lighting in Omaha: cost, install, damage, HOA approval, warranty, winter installs and servicing other brands.",
  alternates: { canonical: "/faq" },
};
const trail = [{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }];

const groups = [
  { h: "Before you buy", items: homeFaqs.slice(0, 4), bg: "bg-background" },
  { h: "Product and specs", items: serviceFaqsFor("permanent lighting").slice(0, 4), bg: "bg-muted" },
  { h: "Install", items: homeFaqs.slice(4), bg: "bg-background" },
  { h: "Cost and financing", items: pricingFaqs, bg: "bg-muted" },
  { h: "Service and warranty", items: serviceFaqsFor("permanent lighting").slice(4), bg: "bg-background" },
];
const all = groups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(all)} />
      <PageHero
        eyebrow="Questions"
        h1="Everything people ask us."
        lede={`${all.length} questions in five groups, in the words customers actually use. If yours is not here, call and ask.`}
        trail={trail}
        stats={[[`${all.length}`, "questions"], ["5", "groups"], ["Same day", "reply to enquiries"]]}
      />

      <section className="bg-raise">
        <div className="shell py-10">
          <p className="u text-2xs uppercase tracking-[0.14em] text-accent">Jump to</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {groups.map((g) => (
              <li key={g.h}>
                <a href={`#${g.h.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="inline-block rounded-full border border-on-dark/22 px-4 py-2.5 text-sm text-on-dark-muted hover:border-accent hover:text-on-dark">
                  {g.h}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-on-dark-muted">This nav scrolls away with the page. Nothing on this site is pinned except the header.</p>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.h} id={g.h.toLowerCase().replace(/[^a-z]+/g, "-")} className={`section ${g.bg}`}>
          <div className="shell">
            <SectionHead eyebrow={`${g.items.length} questions`} title={g.h} />
            <div className="mt-8 max-w-[80ch]"><Faq items={g.items} /></div>
          </div>
        </section>
      ))}

      <BandCta title="Still have a question?" body="Call and ask. We would rather answer it now than have you find out later." />
      <PageCta />
    </Shell>
  );
}
