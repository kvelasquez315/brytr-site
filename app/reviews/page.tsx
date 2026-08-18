import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles, ServiceRows, SpecTable } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { reviews, reviewProof } from "@/content/reviews";
import { IcStars, IcHardHat, IcVerified, IcTwoTiers, IcWarranty, IcMeasured } from "@/components/icons";

export const metadata: Metadata = {
  title: "Brytr Reviews: 5.0 Across 177 Google Reviews",
  description: "Brytr Co holds a 5.0 average across 177 Google reviews for permanent outdoor lighting in the Omaha metro. Read them on Google.",
  alternates: { canonical: "/reviews" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }];

const facts = [
  { icon: IcStars, h: "5.0 average, 177 reviews", p: "All on Google, where you can read them yourself rather than take our word for it." },
  { icon: IcHardHat, h: "W2 crews on every install", p: "The people who quoted your job are the ones on the ladder." },
  { icon: IcVerified, h: "Verified in daylight and dark", p: "We do not close a job until you have signed off on both states." },
  { icon: IcTwoTiers, h: "Two tiers, honestly compared", p: "We publish where our cheaper system beats our expensive one." },
  { icon: IcWarranty, h: "Warranty in writing, up front", p: "Both layers of coverage on paper before you sign." },
  { icon: IcMeasured, h: "1.2M lights installed locally", p: "All of it in and around Omaha. One market, on purpose." },
];

export default function Reviews() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={{
        "@context": "https://schema.org", "@type": "LocalBusiness", name: "Brytr Co",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "177", bestRating: "5" },
      }} />
      <PageHero
        eyebrow="Reviews"
        h1="A 5.0 average across 177 Google reviews."
        lede="We would rather send you to Google than retype our own reviews here. What those reviews consistently mention is below."
        trail={trail}
        stats={[["5.0", "average rating"], ["177", "reviews"], ["Google", "verified platform"]]}
      />

      <section className="section bg-background">
        <div className="shell">
          {reviews.length === 0 ? (
            <>
              <SectionHead
                eyebrow="What they mention"
                title="The six themes that come up again and again."
                lede="Individual review text is not reproduced here. Writing plausible testimonials would be fabricating social proof, so this page shows the verified aggregate and the themes instead."
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {facts.map((f) => (
                  <article key={f.h} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                    <span className="channel-tile channel-tile--light mb-5" aria-hidden><f.icon className="size-7" /></span>
                    <h2 className="font-display text-lg font-bold text-foreground">{f.h}</h2>
                    <p className="mt-2 text-[0.95rem] text-muted-foreground">{f.p}</p>
                  </article>
                ))}
              </div>
              <div className="mt-10 grid gap-6 rounded-lg bg-primary p-7 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold text-on-dark">Read them on Google</h2>
                  <p className="mt-2.5 max-w-[62ch] text-[0.95rem] text-on-dark-muted">
                    We would rather point you at the source than retype our own reviews. Search
                    &ldquo;Brytr Co Omaha&rdquo; and read all 177 in whatever order Google gives you.
                  </p>
                </div>
                <dl className="flex gap-8">
                  <div><dt className="u text-3xl font-medium text-on-dark">5.0</dt><dd className="mt-1 text-xs text-on-dark-muted">average</dd></div>
                  <div><dt className="u text-3xl font-medium text-on-dark">177</dt><dd className="mt-1 text-xs text-on-dark-muted">reviews</dd></div>
                </dl>
              </div>
            </>
          ) : (
            <>
              <SectionHead eyebrow="What Omaha says" title="Real reviews, in full." />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r, i) => (
                  <blockquote key={i} className={i % 5 === 1 ? "rounded-lg bg-primary p-6" : "rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]"}>
                    <IcStars className="size-5 text-accent" />
                    <p className={`mt-4 ${i % 5 === 1 ? "font-display text-xl text-on-dark" : "text-[0.95rem] text-muted-foreground"}`}>{r.text}</p>
                    <footer className={`mt-4 border-t pt-3 text-sm ${i % 5 === 1 ? "border-on-dark/15 text-on-dark-muted" : "border-border text-muted-foreground"}`}>
                      {r.name} · {r.town}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Where we work" title="Reviews from across 18 cities." />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>

      <BandCta title="Join the 177." body="Free consultation, written quote, and a system you will still like in year five." />
      <PageCta />
    </Shell>
  );
}
