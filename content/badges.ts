import type { IconKey } from "./icon-map";

/* THE BAND under the hero. Reviews on the left, what we install on the right, one row.
 *
 * The Google mark: drop the official file at /public/logo/google.svg and set
 * `googleLogo` below. Until it exists the band draws its own five-star row, which is
 * not a trademark, and sets the word Google in our display face. Third-party marks are
 * used in their own colors or not at all — never recolored to Brytr amber, and never
 * pulled off a web page. Google publishes an official asset pack for review displays;
 * ask Zac to grab it, or request it through the Google Business Profile.
 */
export const googleLogo: string | null = null;

export const reviewProofBadge = {
  score: "5.0",
  count: "196",
  source: "Google reviews",
  note: "Every one from an Omaha homeowner",
};

/* The three things we install, as a row of our own icons. Not a credential list — the
 * client asked for reviews only on the trust side, so licensed/insured and W2 crews
 * moved into the body of the page where they can be argued rather than asserted. */
export type Offering = { name: string; note: string; icon: IconKey; href: string };

export const offerings: Offering[] = [
  { name: "Roofline", note: "Eaves, gables and soffit", icon: "roofline", href: "/services/permanent-roofline-lighting" },
  { name: "Landscape", note: "Beds, trees and paths", icon: "pathLight", href: "/services/landscape-lighting" },
  { name: "Patio and pergola", note: "Overhead and hardscape", icon: "pergola", href: "/services/patio-pergola-bistro-lighting" },
];
