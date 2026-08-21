/* PER-CITY PHOTOGRAPHS — eighteen pages, eighteen different shots.
 *
 * The city template is the biggest sameness risk on the site: one file generates eighteen
 * URLs, and before this pass all eighteen opened with no photograph at all and closed on the
 * same drawn ranch elevation.
 *
 * Everything else on a city page comes from real per-city data in content/cities.ts — drive
 * time, tier, actual subdivision names, actual neighboring towns. The one thing that file
 * cannot hold is a picture, so it lives here, one per slug, no shot used twice.
 *
 * THE HONEST PART. Every photograph in the archive was taken on an install in the Omaha
 * metro. We have not photographed a job in Norfolk or Grand Island, so those pages say so
 * in the footnote rather than letting a west-Omaha two-story stand in for a house two hours
 * away. Captioning a metro install as a local one would be the same lie as using stock.
 *
 * Alt text is copied from content/images.ts and content/images.ts's galleryShots, so the
 * description of a shot is the same wherever it appears.
 */

export type CityPhoto = { photo: string; photoAlt: string; objectPosition?: string };

export const cityPhotos: Record<string, CityPhoto> = {
  /* metro */
  omaha: {
    photo: "/img/whole-home.jpg",
    photoAlt:
      "Whole-home permanent outdoor lighting on an Omaha house at night, roofline and landscape lit together",
    objectPosition: "50% 58%",
  },
  elkhorn: {
    photo: "/img/g-blue-elevation.jpg",
    photoAlt: "An Omaha home with its whole front elevation in blue",
    objectPosition: "50% 52%",
  },
  millard: {
    photo: "/img/g-ranch-blue.jpg",
    photoAlt: "An Omaha ranch home in blue with a lit rock garden",
    objectPosition: "50% 48%",
  },
  papillion: {
    photo: "/img/scene-christmas.jpg",
    photoAlt: "An Omaha roofline alternating red and green for Christmas",
    objectPosition: "50% 50%",
  },
  "la-vista": {
    photo: "/img/scene-birthday.jpg",
    photoAlt: "An Omaha roofline in pink and teal for a birthday",
    objectPosition: "50% 50%",
  },
  bellevue: {
    photo: "/img/g-blue-white.jpg",
    photoAlt: "An Omaha home in blue and white with landscape uplighting",
    objectPosition: "50% 50%",
  },
  gretna: {
    photo: "/img/scene-green.jpg",
    photoAlt: "An Omaha ranch home with its roofline in green",
    objectPosition: "50% 50%",
  },
  bennington: {
    photo: "/img/g-moonrise.jpg",
    photoAlt:
      "An Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard",
    objectPosition: "50% 48%",
  },
  waterloo: {
    photo: "/img/g-twilight-yard.jpg",
    photoAlt: "An Omaha home at twilight with its lighting just switched on",
    objectPosition: "40% 60%",
  },
  springfield: {
    photo: "/img/scene-warm-white.jpg",
    photoAlt: "An Omaha home, pergola and pool deck on warm white at dusk",
    objectPosition: "50% 55%",
  },
  blair: {
    photo: "/img/hardscape.jpg",
    photoAlt:
      "Hardscape lighting washing a limestone retaining wall and pool deck at an Omaha home",
    objectPosition: "50% 50%",
  },

  /* over the river */
  "council-bluffs": {
    photo: "/img/g-pool-blue.jpg",
    photoAlt: "An Omaha home, pergola and pool deck lit blue at dusk",
    objectPosition: "50% 48%",
  },

  /* outstate */
  lincoln: {
    photo: "/img/hero-warm-white.jpg",
    photoAlt: "An Omaha home with every Brytr roofline run set to the same soft pink",
    objectPosition: "50% 60%",
  },
  fremont: {
    photo: "/img/scene-husker-red.jpg",
    photoAlt: "An Omaha ranch home with its roofline lit scarlet for a Nebraska game day",
    objectPosition: "50% 50%",
  },
  ashland: {
    photo: "/img/g-pool-pergola.jpg",
    photoAlt:
      "A lit pergola over a pool patio at an Omaha home, the roofline and pergola fascia set to green",
    objectPosition: "50% 45%",
  },
  norfolk: {
    photo: "/img/scene-fourth.jpg",
    photoAlt: "An Omaha home in red, white and blue for the Fourth of July",
    objectPosition: "50% 50%",
  },
  columbus: {
    photo: "/img/g-pool-green.jpg",
    photoAlt: "An Omaha home and pool deck lit green at dusk",
    objectPosition: "50% 45%",
  },
  "grand-island": {
    photo: "/img/g-pool-red.jpg",
    photoAlt: "An Omaha home and pool deck lit red at dusk",
    objectPosition: "50% 45%",
  },
};

export const photoForCity = (slug: string) => cityPhotos[slug];
