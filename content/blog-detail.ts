/* PER-POST FURNITURE — a photograph and a set of related services per post.
 *
 * content/blog.ts holds the writing, and the writing is real: twelve pieces with their own
 * argument, their own lists and their own callouts. What the template was missing was
 * everything around it. The post page had no photograph at all (a flat colour band for a
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
    photo: "/img/christmas-detail.jpg",
    photoAlt:
      "Permanent Christmas lights alternating red and green bulbs along every roofline of an Omaha home",
    objectPosition: "50% 50%",
  },
  "how-to-choose-a-permanent-lighting-installer": {
    photo: "/img/channel-detail.jpg",
    photoAlt:
      "Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave",
    objectPosition: "50% 55%",
  },
  "permanent-lights-vs-hanging-christmas-lights": {
    photo: "/img/scene-christmas.jpg",
    photoAlt: "An Omaha roofline alternating red and green for Christmas",
    objectPosition: "50% 50%",
  },
  "diy-vs-professional-permanent-light-install": {
    photo: "/img/g-gable-detail.jpg",
    photoAlt: "Close view of the lit channel following two gable edges on an Omaha home",
    objectPosition: "50% 42%",
  },
  "do-permanent-lights-damage-soffit-or-fascia": {
    photo: "/img/roofline-detail.jpg",
    photoAlt: "Brytr channel lighting following the gable and eave lines of an Omaha home",
    objectPosition: "50% 52%",
  },
  "permanent-lighting-warranty-comparison": {
    photo: "/img/g-blue-white.jpg",
    photoAlt: "An Omaha home in blue and white with landscape uplighting",
    objectPosition: "50% 50%",
  },
  "permanent-lights-on-stucco-brick-cedar": {
    photo: "/img/g-blue-elevation.jpg",
    photoAlt: "An Omaha home with its whole front elevation in blue",
    objectPosition: "50% 52%",
  },
  "omaha-hoa-rules-permanent-outdoor-lighting": {
    photo: "/img/whole-home.jpg",
    photoAlt:
      "Whole-home permanent outdoor lighting on an Omaha house at night, roofline and landscape lit together",
    objectPosition: "50% 58%",
  },
  "husker-gameday-lighting-ideas": {
    photo: "/img/scene-husker-red.jpg",
    photoAlt: "An Omaha ranch home with its roofline lit scarlet for a Nebraska game day",
    objectPosition: "50% 50%",
  },
  "how-long-do-permanent-led-lights-last": {
    photo: "/img/hero-warm-white.jpg",
    photoAlt: "An Omaha home with Brytr permanent lighting set to everyday warm white",
    objectPosition: "50% 60%",
  },
  "installing-permanent-lights-in-nebraska-winter": {
    photo: "/img/g-moonrise.jpg",
    photoAlt:
      "An Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard",
    objectPosition: "50% 46%",
  },
  "roofline-lighting-design-ideas": {
    photo: "/img/g-ranch-blue.jpg",
    photoAlt: "An Omaha ranch home in blue with a lit rock garden",
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
  Install: ["permanent-roofline-lighting", "soffit-lighting", "repairs-and-service"],
  Product: ["permanent-outdoor-lighting", "repairs-and-service", "holiday-seasonal-scenes"],
  Local: ["permanent-christmas-lights", "gameday-lighting", "landscape-lighting"],
};

/* One line of framing per category, used as the group note on the hub. */
export const categoryNote: Record<string, string> = {
  "Before you buy": "The five decisions that happen before anybody quotes anything.",
  Install: "What happens to the building, and what it does to your fascia.",
  Product: "Hardware and terms, including the ones that are hard to compare.",
  Local: "Things that are only true in Omaha, or only true in Nebraska.",
};

export const photoForPost = (slug: string) => postPhotos[slug];
