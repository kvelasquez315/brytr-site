import { services } from "./services";
import { systems } from "./systems";
import { compares } from "./compares";
import { metroCities, iowaCities, outstateCities } from "./cities";

/* THE HEADER MENU. Five items: Services, Gallery, Pricing, Service Areas, About.
 *
 * WHY IT CHANGED AGAIN. It read Systems / Lighting / Areas / Gallery / Pricing / About, and the
 * client's verdict on the live site was that "the navigation of it is very weird". He is right, and
 * the reason is specific: SYSTEMS AND LIGHTING ARE THE SAME WORD TWICE to anybody who does not work
 * here. One meant the hardware brands, the other meant the jobs, and no homeowner can guess which
 * is which. Meanwhile the home page said "See all services" - a THIRD word for the same thing - so
 * the menu and the page did not even agree with each other.
 *
 * One word for the thing Brytr sells: Services. The hardware lines and the brand comparisons are
 * columns inside it, because that is what they are - detail about how a service gets done, not a
 * separate thing to buy. "Areas" spelled out as "Service Areas", because "Areas" on its own could
 * mean areas of the house.
 *
 * Derived from the same arrays the pages are generated from, so a slug can never drift out of the
 * menu - add a service to content/services.ts and it appears here on the next build. Nothing is
 * hand-listed.
 *
 * This module is imported by SERVER components only, and the finished tree (labels and hrefs,
 * nothing else) is handed to the header as a prop. Importing content/services.ts into the client
 * header instead would ship every word of body copy on all 77 pages into the JavaScript bundle for
 * the sake of a dozen link labels.
 *
 * The index pages (/services, /service-areas, ...) stay: the top-level label links to the index and
 * the panel lists its children, which is what the client asked for - a dropdown on anything with
 * multiple pages - and the indexes are also real landing pages in the SEO map.
 */

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { heading?: string; links: NavLink[]; span?: number };
export type NavFeature = { label: string; body: string; href: string; cta: string };
export type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
  feature?: NavFeature;
};

export const navTree: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    groups: [
      {
        heading: "What we light",
        span: 2,
        links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
      },
      {
        heading: "The hardware",
        links: systems.map((s) => ({ label: s.name, href: `/lighting-systems/${s.slug}` })),
      },
      {
        heading: "Against the other brands",
        links: compares.map((c) => ({ label: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` })),
      },
    ],
    feature: {
      label: "Not sure where to start",
      body: "Most homes begin with the roofline and add landscape later. We will lay out both on the walk-around.",
      href: "/free-design-consultation",
      cta: "Book a free consultation",
    },
  },
  { label: "Gallery", href: "/gallery" },
  /* Pricing was three clicks deep and it is the first thing a homeowner looks for. */
  { label: "Pricing", href: "/pricing" },
  {
    label: "Service Areas",
    href: "/service-areas",
    groups: [
      {
        /* eleven towns: two columns of its own, or the panel is 700px tall and the two
         * short groups beside it sit in a field of nothing. */
        heading: "Omaha metro",
        span: 2,
        links: metroCities.map((c) => ({ label: c.name, href: `/service-areas/${c.slug}`, note: c.drive })),
      },
      {
        heading: "Western Iowa",
        links: iowaCities.map((c) => ({ label: c.name, href: `/service-areas/${c.slug}`, note: c.drive })),
      },
      {
        heading: "Outstate Nebraska",
        links: outstateCities.map((c) => ({ label: c.name, href: `/service-areas/${c.slug}`, note: c.drive })),
      },
    ],
    feature: {
      label: "Your town is not listed",
      body: "Call and ask. If a crew can get there, we will say so on the phone rather than sell you a drive.",
      href: "/contact",
      cta: "Ask about your address",
    },
  },
  { label: "About", href: "/about" },
];
