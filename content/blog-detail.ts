/* PER-POST FURNITURE — a photograph and a set of related services per post.
 *
 * content/blog.ts holds the writing, and the writing is real: twelve pieces with their own
 * argument, their own lists and their own callouts. What the template was missing was
 * everything around it. The post page had no photograph at all (a flat color band for a
 * hero), and its "Related services" panel was `services.slice(0, 3)` — the same three rows
 * on all twelve posts, which is filler dressed as navigation.
 *
 * `photos` is keyed by slug so each post opens on a different install. `relatedByCategory`
 * is keyed by category, because the honest relationship is editorial: a post in "Install"
 * should point at the pages about installing, and one in "Local" at the two things Omaha
 * actually books.
 *
 * Alt text is copied from content/images.ts so a shot is described the same way everywhere
 * it appears on the site.
 */

export type PostPhoto = { photo: string; photoAlt: string; objectPosition?: string };

export const postPhotos: Record<string, PostPhoto> = {
  "are-permanent-christmas-lights-worth-it": {
    photo: "/img/christmas-wreaths-nets.jpg",
    photoAlt:
      "An Omaha two-storey in red and green with lit wreaths in the windows and net lights over the shrubs",
    objectPosition: "50% 50%",
  },
  "how-to-choose-a-permanent-lighting-installer": {
    photo: "/img/crew-roof-fascia.jpg",
    photoAlt:
      "A Brytr installer sitting on the shingles of an Omaha roof in daylight, working along the line where the fascia meets the wall",
    objectPosition: "50% 55%",
  },
  "permanent-lights-vs-hanging-christmas-lights": {
    photo: "/img/christmas-entry-shrubs.jpg",
    photoAlt:
      "A stucco Omaha entry in green and red with net-lit shrubs and snow on the beds",
    objectPosition: "50% 50%",
  },
  "diy-vs-professional-permanent-light-install": {
    photo: "/img/detail-gable-miter.jpg",
    photoAlt:
      "A lit warm white run following the rake of a gable and turning at the peak on an Omaha home",
    objectPosition: "50% 42%",
  },
  "do-permanent-lights-damage-soffit-or-fascia": {
    photo: "/img/day-brick-gable.jpg",
    photoAlt:
      "A brick gable and white fascia on an Omaha home in daylight, the channel running under the roof edge as a slim line the colour of the trim",
    objectPosition: "50% 52%",
  },
  /* "permanent-lighting-warranty-comparison" removed with the article itself. */
  "permanent-lights-on-stucco-brick-cedar": {
    photo: "/img/day-stone-gable.jpg",
    photoAlt:
      "A stone and brick gable on an Omaha home under overcast light, the channel following the roof edge above the entry",
    objectPosition: "50% 52%",
  },
  "omaha-hoa-rules-permanent-outdoor-lighting": {
    photo: "/img/home-porch-flag.jpg",
    photoAlt:
      "A grey Omaha two-storey at blue hour with warm downlights over the porch and a flag by the door",
    objectPosition: "50% 58%",
  },
  "husker-gameday-lighting-ideas": {
    photo: "/img/gameday-red-full.jpg",
    photoAlt:
      "An Omaha two-storey washed scarlet across the whole elevation under a moon",
    objectPosition: "50% 50%",
  },
  "how-long-do-permanent-led-lights-last": {
    photo: "/img/home-brick-gables-gold.jpg",
    photoAlt:
      "A brick Omaha home with several gables all lit warm, the entry glowing behind the glass",
    objectPosition: "50% 60%",
  },
  "installing-permanent-lights-in-nebraska-winter": {
    photo: "/img/winter-snow-dusk.jpg",
    photoAlt:
      "A modern Omaha home at dusk above a snow-covered driveway with a warm run along the roofline",
    objectPosition: "50% 46%",
  },
  "roofline-lighting-design-ideas": {
    photo: "/img/scene-warm-blue-band.jpg",
    photoAlt:
      "An Omaha home with the gables in warm white and the stone band below in blue",
    objectPosition: "50% 48%",
  },
};

/* Editorial, by category. Three service slugs each, chosen for what somebody reading that
 * category is actually trying to decide. */
export const relatedByCategory: Record<string, string[]> = {
  "Before you buy": [
    "permanent-outdoor-lighting",
    "permanent-christmas-lights",
    "permanent-roofline-lighting",
  ],
  Install: ["permanent-roofline-lighting", "soffit-lighting", "permanent-outdoor-lighting"],
  Product: ["permanent-outdoor-lighting", "permanent-roofline-lighting", "holiday-seasonal-scenes"],
  Local: ["permanent-christmas-lights", "gameday-lighting", "landscape-lighting"],
};

/* One line of framing per category, used as the group note on the hub. */
export const categoryNote: Record<string, string> = {
  "Before you buy": "The decisions that happen before anybody quotes anything.",
  Install: "What happens to the building, and what it does to your fascia.",
  Product: "Hardware and terms, including the ones that are hard to compare.",
  Local: "Things that are only true in Omaha, or only true in Nebraska.",
};

/* Why the featured post is the one to start with.
 *
 * The hub's hero panel used to print the featured post's own dek, which is the same sentence
 * printed again in that post's card a few hundred pixels below it — the same text twice on one
 * screen. This is editorial framing rather than a restatement, so the panel says something the
 * card does not. */
export const startHere: Record<string, string> = {
  "are-permanent-christmas-lights-worth-it":
    "Start here because it is the question underneath all the others, and because the answer is not always yes.",
};

export const photoForPost = (slug: string) => postPhotos[slug];
