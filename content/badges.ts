import type { IconKey } from "./icon-map";

/* Credential band, rendered under the hero.
 *
 * Each entry can carry a real logo file. When `logo` is set the band renders the
 * image; until then it renders a typographic lockup — the mark's name in the display
 * face over its role in the utility face. That is a deliberate design, not a
 * placeholder, which is why nothing on the page mentions missing files.
 *
 * To add a logo: drop the file in /public/logo/ and set `logo`. Use the mark holder's
 * OWN colors — third-party marks must never be recolored to Brytr amber, and several
 * brand guidelines forbid it outright. Ask Zac for the official asset packs rather
 * than pulling images off a website.
 */
export type Badge = {
  name: string;        // the mark, or the figure
  role: string;        // what it certifies
  icon: IconKey;
  logo: string | null;
  /** manufacturer authorizations carry more weight than a general credential */
  authorization?: boolean;
};

export const badges: Badge[] = [
  { name: "Haven Evolution", role: "Preferred Installer", icon: "twoTiers", logo: null, authorization: true },
  { name: "Jellyfish", role: "Authorized Dealer", icon: "otherBrand", logo: null, authorization: true },
  { name: "5.0 · 177 reviews", role: "Google, Omaha", icon: "stars", logo: null },
  { name: "Licensed + insured", role: "Nebraska and Iowa", icon: "warranty", logo: null },
  { name: "W2 crews", role: "Never subcontracted", icon: "hardHat", logo: null },
];
