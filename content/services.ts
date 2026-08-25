import type { IconKey } from "./icon-map";

export type Service = {
  slug: string;
  name: string;
  short: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  icon: IconKey;
  photo?: string; // key into content/images.ts
  lede: string;
  includes: string[];
  system?: string; // matching /lighting-systems/<slug>
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "permanent-outdoor-lighting",
    name: "Permanent Outdoor Lighting",
    short: "Whole-home channel run, every use in one system.",
    title: "Permanent Outdoor Lighting Installation | Omaha",
    h1: "Permanent outdoor lighting, installed once.",
    keyword: "permanent outdoor lighting",
    volume: "900/mo",
    icon: "wholeHome",
    photo: "serviceWholeHome",
    featured: true,
    lede:
      "One aluminum channel routed into the eave, one run of addressable LEDs, one app. The flagship system; every other service here is a narrower cut of it.",
    includes: [
      "Channel color-matched to your fascia",
      "Addressable LEDs at 4 in. spacing",
      "App control with unlimited saved scenes",
      "Day and night verification before we leave",
    ],
    system: "haven-evolution",
  },
  {
    slug: "permanent-christmas-lights",
    name: "Permanent Christmas Lights",
    short: "Nobody on a ladder in December, ever again.",
    title: "Permanent Christmas Lights, Installed Once",
    h1: "Permanent Christmas lights for Omaha homes.",
    keyword: "permanent christmas lights",
    volume: "21,000/mo",
    icon: "christmas",
    photo: "serviceChristmas",
    featured: true,
    lede:
      "You hang them in November, you take them down in January, and somebody is on a ladder in ice both times. This is the version you install once.",
    includes: [
      "Warm white, color, or both in one run",
      "Scheduled on and off by sunset",
      "No storage, no tangles, no rental",
      "Works the other 335 days a year too",
    ],
    system: "haven-evolution",
  },
  {
    slug: "permanent-roofline-lighting",
    name: "Permanent Roofline Lighting",
    short: "How the channel actually attaches to your eave.",
    title: "Permanent Roofline Lighting for Omaha Homes",
    h1: "Permanent roofline lighting, clipped into the eave.",
    keyword: "permanent roofline lighting",
    volume: "400/mo",
    icon: "roofline",
    photo: "serviceRoofline",
    lede:
      "The installation-mechanics page. Where the track sits, how it fastens, what happens at a valley, and why it does not read from the street in daylight.",
    includes: [
      "Hidden fastening into fascia, not shingles",
      "Mitered corners at every roof transition",
      "Sealed end caps and terminations",
      "No visible wire runs",
    ],
    system: "haven-evolution",
  },
  {
    slug: "soffit-lighting",
    name: "Soffit Lighting",
    short: "Recessed and track options under the overhang.",
    title: "Soffit Lighting: Recessed and Track Options",
    h1: "Soffit lighting for Omaha homes.",
    keyword: "soffit lighting",
    volume: "5,000/mo",
    icon: "soffit",
    photo: "serviceSoffit",
    lede:
      "Light thrown down the face of the house from inside the overhang. A different fixture and a different look from roofline trim lighting.",
    includes: [
      "Recessed cans or continuous channel",
      "Beam angle chosen for your overhang depth",
      "Wall-wash or down-light aiming",
      "Zoned separately from the roofline",
    ],
    system: "haven-q-series",
  },
  {
    slug: "hardscape-lighting",
    name: "Hardscape Lighting",
    short: "Built into walls, steps and coping.",
    title: "Hardscape Lighting: Patios, Walls and Steps",
    h1: "Hardscape lighting built into the stone.",
    keyword: "hardscape lighting",
    volume: "600/mo",
    icon: "hardscape",
    photo: "serviceHardscape",
    lede:
      "Fixtures set under a wall cap, into a riser, or along coping so the light appears and the hardware does not. Best done during the masonry, still possible after.",
    includes: [
      "Under-cap wall washers",
      "Step and riser lights to code",
      "Column and pillar caps",
      "Retrofit into existing hardscape",
    ],
  },
  {
    slug: "landscape-lighting",
    name: "Landscape Lighting",
    short: "Path, uplighting, tree wash and beds.",
    title: "Landscape Lighting Design and Install, Omaha",
    h1: "Landscape lighting, designed at night.",
    keyword: "landscape lighting omaha",
    volume: "150/mo",
    icon: "pathLight",
    photo: "serviceLandscape",
    lede:
      "Ground-level work: path runs, uplighting on mature trees, bed washes and column lights. Designed on site after dark, because that is when you will see it.",
    includes: [
      "Brass and composite fixtures",
      "Buried low-voltage runs",
      "Tree uplighting with glare shields",
      "On the same app as the roofline",
    ],
    system: "haven-9-series-landscape-lights",
  },
  {
    slug: "patio-pergola-bistro-lighting",
    name: "Patio, Pergola and Bistro Lighting",
    short: "Overhead runs on structures, not trees.",
    title: "Patio, Pergola and Bistro Lighting",
    h1: "Bistro lighting that survives a Nebraska winter.",
    keyword: "pergola lighting",
    volume: "500/mo",
    icon: "pergola",
    photo: "servicePatio",
    featured: true,
    lede:
      "Permanent overhead runs on pergolas, patio covers and gazebos. Rated cable, real terminations, and no seasonal takedown.",
    includes: [
      "Pergola, patio cover, gazebo or custom span",
      "Dimmable warm white or full color",
      "Concealed cable in the beam",
      "Rated for wind and ice load",
    ],
    system: "haven-x-bistro-lights",
  },
  {
    slug: "holiday-seasonal-scenes",
    name: "Holiday and Seasonal Scenes",
    short: "The scene library, all 365 nights.",
    title: "Holiday and Seasonal Lighting Scenes",
    h1: "Every holiday, already programmed.",
    keyword: "holiday lighting omaha",
    volume: "50/mo",
    icon: "seasonal",
    photo: "serviceHoliday",
    lede:
      "Scene programming, not a seasonal service. Halloween, the Fourth, Valentine's, St Patrick's, a birthday. We build the library with you at handover.",
    includes: [
      "Pre-built scenes for every major holiday",
      "Custom scenes built on request",
      "Calendar scheduling a year out",
      "Adjustable brightness per scene",
    ],
  },
  {
    slug: "gameday-lighting",
    name: "Gameday Lighting",
    short: "Husker red on a Saturday, one tap.",
    title: "Gameday Lighting: Team Colors on Your Roof",
    h1: "Gameday lighting, saved as a scene.",
    keyword: "game day lighting",
    volume: "70/mo",
    icon: "gameday",
    photo: "serviceGameday",
    lede:
      "Husker scarlet, Creighton blue, or your high school's colors, saved as a scene and scheduled to kickoff. The single most-used scene our Omaha customers set up.",
    includes: [
      "Exact team color matching",
      "Scheduled to game time",
      "Chase and flash patterns",
      "Multiple teams saved at once",
    ],
  },
  {
    slug: "commercial-outdoor-lighting",
    name: "Commercial Outdoor Lighting",
    short: "Storefronts, parapets and multifamily.",
    title: "Commercial Permanent Lighting | Omaha",
    h1: "Commercial permanent lighting in Omaha.",
    keyword: "commercial outdoor lighting omaha",
    icon: "commercial",
    lede:
      "Parapet and storefront runs for restaurants, retail, offices and multifamily. Brand colors year round, holiday scenes without a seasonal contractor.",
    includes: [
      "Parapet, canopy and soffit runs",
      "Brand color matching",
      "Zoned control per elevation",
      "Scheduled with your hours",
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
