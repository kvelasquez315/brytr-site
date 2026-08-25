import { images } from "@/content/images";
import { SiteHero } from "@/components/sections/site-hero";

/* THE HOME PAGE HERO, which is now the same component every other page uses.
 *
 * This file used to BE the hero - photograph, scrim, headline, tagline, phone pill, form card,
 * channel edge and review plinth, about 150 lines of it. All of that moved to
 * components/sections/site-hero.tsx unchanged, because the client asked for every hero on the site
 * to be this one and there is no way to hold two implementations of one design in sync by hand.
 * PageHero was a copy of an earlier version of this file and had drifted on eight points.
 *
 * What is left here is the home page's WORDING and its photograph, which is the only thing the
 * client said should differ between pages.
 *
 * THE PHOTOGRAPH WAS PICKED BY MEASUREMENT, not by caption - see the note on `heroBg` in
 * content/images.ts. Every candidate in that file is described as "at dusk" or "at blue hour",
 * which ranks them not at all; scripts/hero-pick.mjs decodes them and sorts by measured luminance.
 * The frame this slot used to hold came twelfth of twelve.
 */
export function Hero() {
  const bg = images.heroBg;

  return (
    <SiteHero
      h1="Permanent outdoor lighting in Omaha"
      lede="Warm white every night, any colour when you want it, and nobody on a ladder in December."
      photo={bg.src as string}
      photoAlt={bg.alt}
      objectPosition="50% 50%"
    />
  );
}
