import { site } from "@/content/site";
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
  address: { "@type": "PostalAddress", addressLocality: city ?? site.city, addressRegion: site.state, addressCountry: "US" },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name, addressRegion: c.state })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "177", bestRating: "5" },
  sameAs: [site.social.facebook, site.social.instagram],
  openingHours: "Mo-Sa 08:00-18:00",
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
