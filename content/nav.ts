import { services } from "./services";
import { systems } from "./systems";
import { compares } from "./compares";
/* content/cities.ts is no longer imported here. It fed the Service Areas panel, which this menu
 * no longer carries. The towns are listed in the footer, which imports cities.ts itself. */

/* THE HEADER MENU. Five items: Services, Gallery, Pricing, Recent Projects, About.
 *
 * RECENT PROJECTS TOOK SERVICE AREAS' SLOT, on instruction, when the Real Work Labs widget went
 * in. It is a swap rather than an addition for a reason worth keeping: the client's verdict on the
 * live nav was that it was "very weird", and six centered items is the shape that made it weird.
 * Five stays five.
 *
 * WHAT THE SWAP COST, AND WHAT WAS DONE ABOUT IT. Service Areas was the only header link to
 * /service-areas, and its panel was the only header route to the nineteen town pages. The towns
 * were never at risk - the footer lists all nineteen and always has - but the INDEX had no other
 * internal link anywhere on the site, which would have left a real landing page reachable only
 * from the sitemap. So the footer's "Service areas" heading is a link to it now. Check that before
 * removing anything else from this menu: a page with no internal links is a page Google stops
 * believing in, and the sitemap alone is not a substitute.
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
 * The index pages stay: a top-level label links to its index and the panel lists its children,
 * which is what the client asked for - a dropdown on anything with multiple pages - and the
 * indexes are also real landing pages in the SEO map. Services is the only item with a panel now.
 * /service-areas is still such an index; it is just reached from the footer instead.
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
  /* WHERE SERVICE AREAS USED TO BE. Its panel carried the nineteen towns in three groups with a
   * "your town is not listed" feature card, and it is in git if it is ever wanted back:
   * `git show b6e9ce2:content/nav.ts`. The towns are still linked from the footer, and the index
   * is linked from the footer heading. */
  { label: "Recent Projects", href: "/recent-projects" },
  { label: "About", href: "/about" },
];
