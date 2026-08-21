/* PER-COMPARISON DETAIL — the fields that keep nine comparison pages from being one table
 * with the name swapped.
 *
 * content/compares.ts already holds what differs by argument: the verdict, where each side
 * wins, the cost tiers, and the neutral / labor flags. What it does not hold is the thing
 * an honest comparison page most needs, which is WHAT WE DO NOT KNOW.
 *
 * Six of the nine comparisons build their spec table from one shared row set with the
 * competitor's name and a handful of overrides dropped in. The Haven column of that table is
 * the manufacturer's published spec. The other column is our own read as installers working
 * in this market, which is worth something, and is not the same thing as a datasheet.
 * `unknowns` says so per competitor, out loud, on the page.
 *
 * PHOTOGRAPHS. Every shot on these pages is a Brytr install, and the footnote on every one
 * of them says that the other system is not pictured. Photographing our own work and
 * captioning it as the competitor's, or theirs as ours, is the one thing a comparison page
 * must not do — so it does not happen, and the absence is stated rather than papered over.
 * Some of these shots also appear on a service or systems page; the alternative was no
 * photograph at all, which is worse.
 */

export type CompareDetail = {
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  /** what we have not verified about the right-hand column, named */
  unknowns: string[];
  /** two chosen next comparisons, not the other eight */
  alsoSee: string[];
};

export const compareDetail: Record<string, CompareDetail> = {
  "haven-vs-jellyfish-lighting": {
    photo: "/img/roofline-detail.jpg",
    photoAlt: "Brytr channel lighting following the gable and eave lines of an Omaha home",
    objectPosition: "50% 52%",
    unknowns: [
      "Nothing much. This is the one comparison on the site where both columns are systems we buy, install and warranty ourselves.",
      "Exact LED pitch on the current Jellyfish generation — we quote it as “wider” rather than a figure, because the figure has changed between production runs.",
    ],
    alsoSee: ["haven-vs-gemstone-lights", "jellyfish-vs-gemstone-lights"],
  },

  "haven-vs-gemstone-lights": {
    photo: "/img/g-gable-detail.jpg",
    photoAlt: "Close view of the lit channel following two gable edges on an Omaha home",
    objectPosition: "50% 45%",
    unknowns: [
      "Gemstone's current published LED pitch and rated life. We have never been given their datasheet and we are not going to guess at it.",
      "How their warranty administration actually performs, because every claim on a Gemstone system goes to the dealer who fitted it.",
      "Their pricing. Dealer pricing in this market is not published by anybody, ours included.",
    ],
    alsoSee: ["jellyfish-vs-gemstone-lights", "haven-vs-trimlight"],
  },

  "haven-vs-trimlight": {
    photo: "/img/christmas-detail.jpg",
    photoAlt:
      "Permanent Christmas lights alternating red and green bulbs along every roofline of an Omaha home",
    objectPosition: "50% 50%",
    unknowns: [
      "Which franchisee covers your address, and what their install standard is. That is the whole variable on this comparison and it is not one we can answer for you.",
      "Trimlight's current hardware spec. The product is consistent nationally; the datasheet is not something we hold.",
    ],
    alsoSee: ["haven-vs-gemstone-lights", "haven-vs-everlights"],
  },

  "haven-vs-oelo": {
    photo: "/img/channel-detail.jpg",
    photoAlt:
      "Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave",
    objectPosition: "50% 55%",
    unknowns: [
      "Oelo's rated life and weather rating figures.",
      "How their channel behaves on an aluminum fascia over five winters. We have not fitted one, so anything we said about it would be a guess.",
    ],
    alsoSee: ["haven-vs-gemstone-lights", "haven-vs-minleon-rainmin"],
  },

  "haven-vs-govee": {
    photo: "/img/g-pool-red.jpg",
    photoAlt: "An Omaha home and pool deck lit red at dusk",
    objectPosition: "50% 45%",
    unknowns: [
      "Which Govee kit you would buy. The range is wide, it changes constantly, and the weather rating on the cheapest kits is not the same as on the dearest.",
      "How long a well-installed DIY kit lasts on a Nebraska fascia. We do not fit them, which makes us the wrong people to ask.",
    ],
    alsoSee: ["haven-vs-jellyfish-lighting", "haven-vs-ghouly"],
  },

  "haven-vs-minleon-rainmin": {
    photo: "/img/scene-game-day.jpg",
    photoAlt: "An Omaha ranch home with its roofline in red over white for game day",
    objectPosition: "50% 48%",
    unknowns: [
      "How their current controllers compare on everyday use, as opposed to on an animated show. We have not lived with one for a year.",
      "Pricing, which on installer-channel product depends almost entirely on the installer.",
    ],
    alsoSee: ["haven-vs-ghouly", "haven-vs-oelo"],
  },

  "haven-vs-ghouly": {
    photo: "/img/g-pool-green.jpg",
    photoAlt: "An Omaha home and pool deck lit green at dusk",
    objectPosition: "50% 45%",
    unknowns: [
      "Which factory made any particular batch. That is the honest center of this page: nobody selling permanent lighting in this country, us included, can tell you with certainty which line their diodes came off.",
      "Whether a given white-label controller is still supported in five years. Nobody can answer that either, which is most of the argument.",
    ],
    alsoSee: ["haven-vs-jellyfish-lighting", "haven-vs-govee"],
  },

  "haven-vs-everlights": {
    photo: "/img/scene-green.jpg",
    photoAlt: "An Omaha ranch home with its roofline in green for St. Patrick's Day",
    objectPosition: "50% 50%",
    unknowns: [
      "EverLights' current generation spec. The name is older than most of this category and the product has moved on more than once.",
      "Their dealer coverage in this metro, which changes and is worth a phone call rather than a paragraph.",
    ],
    alsoSee: ["haven-vs-trimlight", "haven-vs-gemstone-lights"],
  },

  "jellyfish-vs-gemstone-lights": {
    photo: "/img/g-ranch-blue-white.jpg",
    photoAlt:
      "A long Omaha ranch elevation lit blue and white with landscape uplighting",
    objectPosition: "50% 45%",
    unknowns: [
      "Gemstone's datasheet, same as on their own comparison page.",
      "Which of the two your local installer actually does well, which on this particular comparison matters more than either datasheet would.",
    ],
    alsoSee: ["haven-vs-jellyfish-lighting", "haven-vs-gemstone-lights"],
  },
};

export const detailForCompare = (slug: string) => compareDetail[slug];
