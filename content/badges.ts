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

/* BRYTR'S OWN MARK.
 *
 * Two files, both from the artwork the client sent: `brytr-logo.png` is his master, the black
 * wordmark with the amber spark, and `brytr-logo-light.png` is the same lockup for a dark
 * ground. Only the light one is wired here, because the header and the footer are the only two
 * places a logo appears on this site and both sit on `--brand-primary`. On that navy the black
 * master is very nearly invisible. The master is kept for print and for any light surface later.
 *
 * THE LIGHT VERSION IS DERIVED, NOT REDRAWN, and that distinction is why it is allowed at all.
 * The file he sent is a two-colour composite over transparency: black (0,0,0) and amber
 * (255,186,66), with every antialiased edge carried in the alpha channel. Because black is the
 * zero vector every pixel is exactly `f * amber`, and `f` is recoverable from the red channel
 * alone. Recomposing at the same `f` against white instead of black turns the wordmark white,
 * leaves the spark on its exact original amber, and lands every edge pixel on the correct
 * intermediate, so nothing fringes. Verified after the fact: 96.5% pure white, 3.5% amber at
 * (255,186,66), no third colour anywhere. Brytr publishes this lockup themselves as
 * BRYTR-LOGO-WHITE-Y.png, so this is the same mark and not an invention.
 *
 * `width`/`height` are the file's real pixels. next/image needs the intrinsic ratio, and the one
 * place a wrong ratio shows is the one place the mark is most visible. Rendered
 * height-constrained with `w-auto`, so a different lockup drops in without being letterboxed.
 *
 * NOTE ON THE AMBER. The spark is #FFBA42. The site's `--brand-accent` is #F5C518 and its
 * comment claims to be "logo yellow", which it never was: it was picked before anyone had seen
 * the logo. See the note in app/globals.css.
 */
export const brandLogo: { src: string; width: number; height: number; alt: string } | null = {
  src: "/img/brytr-logo-light.png",
  width: 2048,
  height: 906,
  alt: "Brytr Co",
};

/* MANUFACTURER MARKS. Haven and Jellyfish are somebody else's trademarks, and the rule is the
 * same one that governs the Google mark above: used in their own colours from their own asset
 * pack, or not used. Not traced from memory, not lifted off a dealer page, not set in Archivo.
 *
 * Keyed by the slug in content/systems.ts, so `systemLogo["haven-evolution"]` is the Haven mark.
 * The hardware rows on the home page and the system pages render one the moment a file is here.
 * Haven's dealer kit has the artwork; their rep can send it. Until then those rows carry a real
 * photograph of what the line actually does, which is more use to a homeowner than a wordmark.
 */
export const systemLogo: Record<string, string | null> = {};

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
