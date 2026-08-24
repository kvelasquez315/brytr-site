import { services } from "./services";
import { systems } from "./systems";
import { compares } from "./compares";
import { metroCities, iowaCities, outstateCities } from "./cities";

/* THE HEADER MENU.
 *
 * REGROUPED. It read as six multi-word items in our own vocabulary: Lighting Systems,
 * Services, Compare, Service Areas, Gallery, About. Two of those were the same subject
 * ("Lighting Systems" and "Compare" are both about which hardware), and "Services" versus
 * "Lighting Systems" is a distinction only somebody who works here can make.
 *
 * trugreen.com labels its whole menu in five plain single words: Lawn, Pest, Residential,
 * Commercial, Careers. That is the standard to hold. So: Lighting, Systems, Gallery, Pricing,
 * Areas, About. Compare folded into Systems as a second column, and Pricing was promoted out
 * of the footer because it is the first thing a homeowner goes looking for.
 *
 * Derived from the same arrays the pages are generated from, so a slug can never drift
 * out of the menu — add a service to content/services.ts and it appears here on the next
 * build. Nothing is hand-listed.
 *
 * This module is imported by SERVER components only, and the finished tree (labels and
 * hrefs, nothing else) is handed to the header as a prop. Importing content/services.ts
 * into the client header instead would ship every word of body copy on all 77 pages into
 * the JavaScript bundle for the sake of eleven link labels.
 *
 * The index pages (/services, /service-areas, ...) stay: the top-level label links to
 * the index and the panel lists its children, which is what the client asked for — a
 * dropdown on anything with multiple pages — and the indexes are also real landing pages
 * in the SEO map.
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
    label: "Systems",
    href: "/lighting-systems",
    groups: [
      {
        heading: "What we install",
        links: systems.map((s) => ({ label: s.name, href: `/lighting-systems/${s.slug}` })),
      },
      {
        heading: "Against the other brands",
        links: compares.map((c) => ({ label: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` })),
      },
    ],
    feature: {
      label: "More than one brand, on purpose",
      body: "We install Haven and we install Jellyfish, which is why these comparisons can give the other side real reasons to win.",
      href: "/compare",
      cta: "Compare every brand",
    },
  },
  {
    label: "Lighting",
    href: "/services",
    groups: [
      {
        heading: "Permanent lighting",
        links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
      },
    ],
    feature: {
      label: "Not sure where to start",
      body: "Most homes begin with the roofline and add landscape later. We will lay out both on the walk-around.",
      href: "/free-design-consultation",
      cta: "Book a free consultation",
    },
  },
  {
    label: "Areas",
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
  { label: "Gallery", href: "/gallery" },
  /* Pricing was three clicks deep and it is the first thing a homeowner looks for. */
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];
