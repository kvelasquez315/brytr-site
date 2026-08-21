/* PER-SYSTEM DETAIL — the fields that stop eight hardware pages being one hardware page.
 *
 * content/systems.ts already holds what each system IS: specs, wins, limits. All of that is
 * real and all of it differs. What the template was missing was everything ABOUT the
 * system: which photograph belongs to it, where it sits relative to the other seven, and —
 * the one a single-brand dealer cannot publish — where we would NOT quote it.
 *
 * That last field is the point of the whole file. Brytr carries a premium tier and a value
 * tier, so for any given house one of them is wrong, and saying which is the only way the
 * two-tier claim means anything.
 *
 * PHOTOGRAPHS. Some are shared with a service page on purpose: the Q Series page and the
 * soffit service page are looking at the same hardware on the same overhang, and inventing
 * a second photograph of it would mean not having one. Where a shot is shared it is because
 * it is literally the subject, never to fill a slot.
 */

export type SystemDetail = {
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  /** one line on where this sits relative to the rest of the lineup */
  position: string;
  /** the honest exclusion. Every entry names a real house we would steer away from it. */
  notFor: { h: string; p: string };
  /** chosen, in order — not the other seven sliced off the array */
  alsoSee: string[];
};

export const systemDetail: Record<string, SystemDetail> = {
  "brytr-signature": {
    photo: "/img/scene-warm-white.jpg",
    photoAlt: "An Omaha home, pergola and pool deck on warm white at dusk",
    objectPosition: "50% 55%",
    position:
      "Our premium tier, built on Haven Evolution hardware. Roughly two thirds of what we install.",
    notFor: {
      h: "Where we would not quote Signature",
      p: "A single-story ranch with one elevation lit, on warm white all year, where nobody in the house is going to open the app twice. The dedicated white channel and the tight LED pitch are the two things you are paying the premium for, and on a short simple run in one colour you will struggle to see either from the street. On that house we quote Basic and say why.",
    },
    alsoSee: ["brytr-basic", "haven-evolution", "app-and-controls"],
  },

  "brytr-basic": {
    photo: "/img/g-ranch-blue.jpg",
    photoAlt: "An Omaha ranch home in blue with a lit rock garden",
    objectPosition: "50% 48%",
    position:
      "Our value tier, built on Jellyfish hardware. A real system rather than a stripped one.",
    notFor: {
      h: "Where we would not quote Basic",
      p: "A long straight two-story eave line, or a household that genuinely intends to run colour most nights. Wider LED spacing shows on a long unbroken run in a way it never does across a broken-up roofline, and mixed white reads a shade cooler and slightly less even than a dedicated white channel. If either of those is your house, paying twice to fix it later is the expensive route.",
    },
    alsoSee: ["brytr-signature", "jellyfish-lighting", "haven-evolution"],
  },

  "haven-evolution": {
    photo: "/img/hero-game-day.jpg",
    photoAlt: "An Omaha home with its Brytr lighting switched to red and blue game day colors",
    objectPosition: "50% 52%",
    position:
      "The hardware underneath our Signature tier. This page is the manufacturer's product; the tier is what we build with it.",
    notFor: {
      h: "Where it is the wrong hardware",
      p: "Short simple rooflines, and any budget where the difference between the two tiers decides whether the job happens at all. It is the most expensive thing we carry and it is genuinely overkill on a small ranch.",
    },
    alsoSee: ["brytr-signature", "jellyfish-lighting", "haven-q-series"],
  },

  "haven-q-series": {
    /* Shared with /services/soffit-lighting on purpose: it is the same fixture under the
     * same overhang, and there is one photograph of it. */
    photo: "/img/soffit-eaves.jpg",
    photoAlt: "Soffit and eave lighting on an Omaha home, gables in color and eaves left white",
    objectPosition: "50% 55%",
    position: "An add-on rather than an alternative. It bolts on to either tier and shares the app.",
    notFor: {
      h: "Where it will not work",
      p: "A shallow overhang. The fixture needs enough soffit depth to sit back far enough that you see the wash rather than the source, and we measure the overhang before quoting it. It is also not a substitute for roofline trim lighting — it does a different job on a different plane.",
    },
    alsoSee: ["haven-evolution", "haven-x-bistro-lights", "brytr-signature"],
  },

  "haven-9-series-landscape-lights": {
    /* Shared with /services/landscape-lighting: same fixtures, same night. */
    photo: "/img/landscape.jpg",
    photoAlt: "Landscape lighting and tree uplighting at an Omaha home after dark",
    objectPosition: "50% 50%",
    position: "The ground-level add-on. Same controller and same app as the roofline above it.",
    notFor: {
      h: "Where it gets expensive",
      p: "Established beds and mature planting, where the cable route means trenching around root systems rather than through open ground. It is still worth doing; it is just a bigger job than the fixture count suggests, and a larger run needs its own transformer.",
    },
    alsoSee: ["haven-x-bistro-lights", "haven-q-series", "app-and-controls"],
  },

  "haven-x-bistro-lights": {
    photo: "/img/g-pool-pergola.jpg",
    photoAlt:
      "A lit pergola over a pool patio at an Omaha home, the roofline and pergola fascia set to green, with a fire bowl on a seat wall",
    objectPosition: "50% 45%",
    position: "The overhead add-on. Permanent bistro runs for pergolas, patio covers and gazebos.",
    notFor: {
      h: "Where there is nothing to span",
      p: "An open patio with no structure over it. Bistro runs need something to fasten to at both ends and something rated to take the tension — posts, a pergola beam, a patio cover fascia. Stringing between a house and a tree is what people do themselves, and it is not what we install.",
    },
    alsoSee: ["haven-9-series-landscape-lights", "haven-q-series", "brytr-signature"],
  },

  "jellyfish-lighting": {
    photo: "/img/g-pool-pink.jpg",
    photoAlt: "An Omaha home and pool deck lit pink at dusk",
    objectPosition: "50% 45%",
    position:
      "The hardware underneath our Basic tier. We install it, so we have no reason to oversell it and none to trash it.",
    notFor: {
      h: "Where we would steer you off it",
      p: "Long unbroken runs, and anyone who wants warm white to be the everyday setting on a house where they will notice the difference. Mixed white is the compromise that pays for the price gap, and it is a real compromise rather than a marketing one.",
    },
    alsoSee: ["brytr-basic", "haven-evolution", "brytr-signature"],
  },

  "app-and-controls": {
    photo: "/img/scene-fourth.jpg",
    photoAlt: "An Omaha home in red, white and blue for the Fourth of July",
    objectPosition: "50% 50%",
    position:
      "The layer customers actually touch. Not a system you buy separately — it is how every system above is operated.",
    notFor: {
      h: "What it needs from you",
      p: "Wi-fi that reaches the controller, and twenty minutes at handover. A system nobody set up properly is a system that stays on whatever the crew left it on, which is the quiet way an expensive install turns into a porch light.",
    },
    alsoSee: ["brytr-signature", "haven-evolution", "brytr-basic"],
  },
};

export const detailForSystem = (slug: string) => systemDetail[slug];
