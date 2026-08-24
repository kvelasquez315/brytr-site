import { site } from "@/content/site";
import { reviewProof } from "@/content/reviews";
import { cities } from "@/content/cities";

export const localBusiness = (city?: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description:
    "Permanent outdoor lighting installation for homes in the Omaha metro, Lincoln and eastern Nebraska.",
  url: site.url,
  telephone: `+1${site.phone.replace(/-/g, "")}`,
  /* Street address, postal code and the profile link all come off Brytr's own Google
   * Business Profile. A LocalBusiness node without a street address is the single most
   * common reason a local pack listing and a site fail to associate. */
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: city ?? site.city,
    addressRegion: site.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name, addressRegion: c.state })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: reviewProof.average, reviewCount: String(reviewProof.count), bestRating: "5" },
  sameAs: [site.social.facebook, site.social.instagram, reviewProof.url],
  /* THE REAL WEEK, restored. This block was empty with a note to ask the client, because an
   * earlier version had guessed the hours and wrong hours in structured data is worse than
   * none: Google will show a homeowner a closed sign that is not true. He has now confirmed
   * nine to nine, Monday through Saturday, closed Sunday. Sunday is stated explicitly rather
   * than omitted, because an absent day reads as unknown rather than as closed. */
  openingHoursSpecification: [
    ...site.hours.week.map((w) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: w.days,
      opens: w.opens,
      closes: w.closes,
    })),
    ...site.hours.closed.map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [d],
      opens: "00:00",
      closes: "00:00",
    })),
  ],
});

export const breadcrumb = (trail: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${site.url}${t.href}`,
  })),
});

export const serviceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  description,
  provider: { "@type": "LocalBusiness", name: site.name, telephone: `+1${site.phone.replace(/-/g, "")}` },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const Jsonld = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
