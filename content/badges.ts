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
  detail: string;      // one line of substance, so the band is a band and not a chip row
  icon: IconKey;
  logo: string | null;
  /** manufacturer authorizations carry more weight than a general credential */
  authorization?: boolean;
};

/* Three, not seven. A brand we are highlighting has to appear as its own logo or not
 * at all — a manufacturer name set in our typeface reads as a placeholder, and
 * recoloring someone else's mark is usually a licence violation. So the Haven and
 * Jellyfish cells are OUT of the band until Zac sends the official asset packs; the
 * two systems are still covered in full on /lighting-systems and /compare.
 *
 * When the files arrive: drop them in /public/logo, add the cells back with `logo`
 * set, and the band renders the marks in their own colors. */
export const badges: Badge[] = [
  { name: "5.0", role: "177 Google reviews", detail: "Every one from an Omaha homeowner.", icon: "stars", logo: null },
  { name: "Licensed + insured", role: "Nebraska and Iowa", detail: "Certificate on request before we start.", icon: "warranty", logo: null },
  { name: "W2 crews", role: "Never subcontracted", detail: "Same crew from measure to handover.", icon: "hardHat", logo: null },
];
