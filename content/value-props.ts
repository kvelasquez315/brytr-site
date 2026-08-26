import { pick } from "./photo-sets";
import type { Service } from "./services";
import type { City } from "./cities";

/* WHAT EVERY PAGE SAYS BEFORE IT GETS SPECIFIC.
 *
 * One value band sits under the hero on every content page, same shape, different content. The
 * shape lives in components/sections/value-band.tsx; this file is what each page puts in it.
 *
 * WHY IT IS A FILE AND NOT A CONSTANT. The standing instruction is that every page should look
 * different while sharing the design and the flow. A single hard-coded band on twenty templates
 * would be the opposite: the same three sentences twenty times, which is the "string-for-string
 * identical line in a template" problem this codebase has already had to unpick twice. So every
 * page writes its own three points against its own subject, and the five dynamic templates derive
 * theirs from the entity they are rendering, which makes roughly fifty pages that are individually
 * true rather than fifty copies.
 *
 * RULES THE ENTRIES FOLLOW, all of them house rules from earlier reviews:
 *   three points, no more, and each one a claim rather than a feature name
 *   a lede under 34 words, which scripts/typography.mjs enforces
 *   no em dashes, which scripts/em-dash.mjs enforces
 *   no founders, no W-2s, no subcontracting
 *   the photographs are chosen against the page, and the lead one wants a wide frame
 */
export type ValueProp = {
  title: string;
  lede: string;
  points: { h: string; p: string }[];
  photos: string[];
  cta: { href: string; label: string };
  alt?: { href: string; label: string };
};

const BOOK = { href: "/free-design-consultation", label: "Book a free design" };

/* The three claims the whole business rests on, used where a page has no more specific angle.
 * Kept as a named constant so the wording cannot drift between the pages that share it. */
const CORE = [
  { h: "Installed once, and left there",
    p: "Routed into your fascia and sealed. No ladder in November, nothing to take down in January." },
  { h: "Any colour, any night, one app",
    p: "Warm white most of the year, red and green in December, team colours on a Saturday. Same run." },
  { h: "The crew that fits it is local",
    p: "The shop is in west Omaha, and the people who measure your roofline are the people who come back to it." },
];

export const valueProps: Record<string, ValueProp> = {
  "/about": {
    title: "A local crew and one system.",
    lede: "We install permanent outdoor lighting in the Omaha metro and nothing else, which is why the warranty call gets answered by the people who did the work.",
    points: [
      { h: "It is the only thing we do", p: "Not a roofing company with a lighting arm, and not a seasonal side line." },
      { h: "The same faces, start to finish", p: "The crew that measures your house is the crew that fits it and comes back to it." },
      { h: "We hold the workmanship terms", p: "No franchise dispatcher between you and a fixing that needs looking at." },
    ],
    photos: ["homeWideRanch", "crewPortrait", "installDayGarage"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/blog": {
    title: "Written from doing the work.",
    lede: "Everything here comes out of installs in the Omaha metro, so it answers what homeowners actually ask rather than what ranks.",
    points: [
      { h: "No ladder, ever again", p: "The run is fixed into the fascia once and stays there through every season." },
      { h: "Warm white is the everyday setting", p: "Colour is there when you want it. Most nights of the year this looks like good trim lighting." },
      { h: "It disappears in daylight", p: "Channel colour matched to your fascia, so from the curb at noon it reads as part of the house." },
    ],
    photos: ["seqEveryday", "dayShakeGable", "winterSnowDusk"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },

  "/compare": {
    title: "The same crew, whichever brand.",
    lede: "We fit more than one system, so the recommendation is not pre-decided. These pages set them against each other on the things that change on a house.",
    points: [
      { h: "Hardware is half the decision", p: "The other half is who fastens it to your building and who answers when a section goes dark." },
      { h: "Specs that change something", p: "Diode spacing, diffuser, channel finish. The ones you can see from the curb, not the ones on a datasheet." },
      { h: "Told before you sign", p: "Where a system is genuinely weaker we say so on the page and again at the quote." },
    ],
    photos: ["archByDay", "homeModernStone", "detailGableMiter"],
    cta: BOOK,
    alt: { href: "/lighting-systems", label: "The systems we fit" },
  },

  "/contact": {
    title: "One call, then a date after dark.",
    lede: "The useful next step is somebody standing on your driveway at dusk with a tape measure, not another brochure.",
    points: [
      { h: "Same-day reply, most days", p: "A person from the shop, not a call centre taking a message for somebody else." },
      { h: "The design happens on site", p: "On your elevation, against your own fascia colour, with the scenes built while we are there." },
      { h: "You keep the quote either way", p: "Written, itemised, and yours whether you book the work or not." },
    ],
    photos: ["homePrairieTwilight", "walkthroughDusk", "crewPortrait"],
    cta: BOOK,
    alt: { href: "/pricing", label: "How pricing works" },
  },

  "/faq": {
    title: "The short answer, first.",
    lede: "Permanent lighting is one aluminium channel routed into your eave, one run of addressable LEDs and one app, fitted once and left on the building.",
    points: CORE,
    photos: ["seqSecurity", "dayBrickGable", "homeEaveDownlights"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },

  "/free-design-consultation": {
    title: "See it on your own house first.",
    lede: "We come out, measure the roofline, and design it with you on your own elevation. You end up holding a written number either way.",
    points: [
      { h: "Free, and genuinely no obligation", p: "No design fee, no deposit to get a drawing, and nobody follows up for a year." },
      { h: "Your materials, not a catalogue", p: "Channel colour held against your actual fascia, because that is what decides how it looks at noon." },
      { h: "Scenes built while we are there", p: "You leave the appointment knowing what the app does, not reading about it later." },
    ],
    photos: ["sceneWarmBlueBand", "walkthroughDusk", "homeStuccoStone"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/gallery": {
    title: "Every frame is a Brytr install.",
    lede: "No renders, no stock houses and no borrowed shots. These are real Omaha properties photographed on nights the systems were already running.",
    points: [
      { h: "One system, every scene here", p: "Nothing on this page needed different hardware. It is the same run set to different things." },
      { h: "Daylight frames included", p: "The photograph nobody publishes is the one from the curb at noon. There are several here." },
      { h: "Zoned, so colour lands where you chose", p: "Gables scarlet with the eaves left white is two zones, not a compromise." },
    ],
    photos: ["aerialRedRoofline", "sceneAmberCyan", "gamedayRedBlueGables"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/how-it-works": {
    title: "One day, and it is on the building.",
    lede: "Measured after dark, routed into the fascia, sealed as it goes, commissioned on your phone and signed off lit and in daylight.",
    points: [
      { h: "Into fascia, never through shingles", p: "Every penetration sealed at the moment it is made, which is where installs fail at year five." },
      { h: "Most homes are a single day", p: "One crew, one visit, and the drive cleared before we leave." },
      { h: "Checked twice before we go", p: "The daylight sightline from the curb, then every scene walked with you after dark." },
    ],
    photos: ["installDayPavilion", "detailGableMiter", "crewRoofFascia"],
    cta: BOOK,
    alt: { href: "/pricing", label: "How pricing works" },
  },

  "/lighting-systems": {
    title: "The hardware, and who fits it.",
    lede: "We fit more than one manufacturer, so what goes on your house is the system that suits it rather than the only one we sell.",
    points: [
      { h: "Named on the quote", p: "Manufacturer, series and channel finish in writing, so you know exactly what is being fastened to your building." },
      { h: "Two warranty layers", p: "The manufacturer covers the hardware. We cover the work, and we are the ones who turn up." },
      { h: "Add to it later", p: "Landscape, patio and hardscape join the same controller without replacing what is already up." },
    ],
    photos: ["archAtNight", "serviceRoofline", "serviceSoffit"],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  },

  "/pricing": {
    title: "Priced by the foot, in writing.",
    lede: "The number depends on your roofline, how many zones you want and what else you light. All three are settled on site before anybody signs.",
    points: [
      { h: "No design fee, no travel charge", p: "Inside the metro the consultation and the drawing cost nothing, and neither appears on the quote." },
      { h: "Every element its own line", p: "Roofline, landscape and patio priced separately, so you can see what each one is doing to the total." },
      { h: "One cost, not ten", p: "The ten year version of hanging lights is ten rentals or ten purchases, and nobody prices it that way at the door." },
    ],
    photos: ["homeRanchBluehour", "patioCovered", "landscapeTreeBeds"],
    cta: BOOK,
    alt: { href: "/financing", label: "Financing options" },
  },

  "/recent-projects": {
    title: "Finished work, photographed as it was.",
    lede: "Real Omaha properties, shot on nights the systems were already running rather than staged for a camera.",
    points: [
      { h: "Whole properties, not just rooflines", p: "House, pergola, beds and hardscape on one controller, each on its own zone." },
      { h: "Every roof shape is here", p: "Low ranch, complicated gables, flat modern edges. The hard ones are the ones worth looking at." },
      { h: "Still on the buildings", p: "These are installs we continue to service, not a portfolio from a company that has moved on." },
    ],
    photos: ["homeBrickGablesGold", "poolPergolaDusk", "hardscapeSeatwall"],
    cta: BOOK,
    alt: { href: "/gallery", label: "The scene library" },
  },

  "/reviews": {
    title: "Rated five stars by neighbours.",
    lede: "Every review here is verbatim from Google, from homeowners in the Omaha metro who have had a system on the building through a full year.",
    points: [
      { h: "They write about the same things", p: "Communication, the crew, and how it looked the first night. That is more useful than an average." },
      { h: "The work is still ours to fix", p: "A five star install stops meaning much if nobody answers in February. We answer." },
      { h: "Neighbours notice", p: "The most common line in these reviews is somebody being asked who did it." },
    ],
    photos: ["seqWarmChristmas", "homeWhiteTwoStorey", "christmasEntryShrubs"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/service-areas": {
    title: "The metro, and Council Bluffs.",
    lede: "Every town we serve is inside about thirty-five minutes of the shop, which is what lets a warranty call in February be the same week.",
    points: [
      { h: "A service call is a visit", p: "Not a route day booked for next month. That is the whole reason the area stops where it does." },
      { h: "Same price in every town", p: "No travel charge inside the metro, and no border premium on the Iowa side." },
      { h: "Your own crew, not a franchise", p: "The same people in Elkhorn, Bellevue and Council Bluffs, out of one shop in west Omaha." },
    ],
    photos: ["winterGradientSnow", "homeShakeBrick", "deckRanchWarm"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/services": {
    title: "One channel, every surface.",
    lede: "Roofline, soffit, beds, trees, walls and pergolas all run on the same channel and the same controller, so what you fit first does not limit what you add.",
    points: CORE,
    photos: ["serviceWholeHome", "servicePatio", "serviceLandscape"],
    cta: BOOK,
    alt: { href: "/pricing", label: "How pricing works" },
  },

  "/warranty": {
    title: "Two layers, and we answer both.",
    lede: "The manufacturer covers the hardware and we cover the work. Whichever one a fault falls under, the call comes to us and we come out.",
    points: [
      { h: "Workmanship is ours", p: "The crew who fastened it holds the terms. Not a dispatcher, and not somebody who has never seen your fascia." },
      { h: "Sealed as it is fitted", p: "Every penetration closed at the moment it is made, which is what most warranty claims in this trade are actually about." },
      { h: "Still servicing our first installs", p: "A warranty is worth what the company administering it is still around to honour." },
    ],
    photos: ["dayShakeGable", "homeEaveDownlights", "dayStoneGable"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },
};

/* ── THE DYNAMIC TEMPLATES ──
 * Five templates render roughly fifty pages between them. Each derives its band from the thing it
 * is rendering, so a reader on two service pages gets two different bands rather than the same one
 * with a different heading. `pick` is seeded on the slug, so the photographs are stable per page
 * and different between pages. */

const shots = (seed: string, n: number) => pick(seed, n).map((s) => s.photo);

export function serviceValueProp(s: Service): ValueProp {
  return {
    title: "One system, and this is part of it.",
    lede: `${s.name} runs on the same channel and the same controller as everything else we fit, so adding to it later is a wiring afternoon rather than a second system.`,
    points: [
      { h: "Fitted once, then left alone", p: "Routed in and sealed on install day. Nothing to put up in November and nothing to take down." },
      { h: "Its own zone in the app", p: "It comes on and goes off independently, so the back of the property can stay dark while the front is lit." },
      { h: "Ours to service", p: "The crew that fitted it holds the workmanship terms and is twenty minutes away." },
    ],
    photos: [s.photo ?? "homeWideRanch", ...shots(`vb-${s.slug}`, 2)],
    cta: BOOK,
    alt: { href: "/pricing", label: "How pricing works" },
  };
}

export function cityValueProp(c: City): ValueProp {
  return {
    title: `${c.name} is a drive, not a route day.`,
    /* Omaha's own drive time is the string "In town", which read as "In town from the shop in
     * west Omaha" on the one city page most people land on. Every other town is a duration and
     * reads correctly, so the exception is handled rather than the sentence rewritten for all. */
    lede:
      c.drive === "In town"
        ? "The shop is in west Omaha, so an install here is booked inside the week and a warranty call is a visit rather than a route day."
        : `${c.drive} from the shop in west Omaha, which is what lets an install here be booked inside the week and a warranty call be a visit.`,
    points: [
      { h: "The same crew as every town", p: "One shop, one set of people, and no local franchise holding the terms." },
      { h: "No travel charge", p: "Priced by the foot exactly as it is in Omaha, with nothing added for the drive." },
      { h: "Designed on your own elevation", p: "After dark, against your fascia colour, before anything is ordered." },
    ],
    photos: shots(`vb-city-${c.slug}`, 3),
    cta: BOOK,
    alt: { href: "/service-areas", label: "Every town we serve" },
  };
}

export function systemValueProp(name: string, slug: string): ValueProp {
  return {
    title: "The hardware is half of it.",
    lede: `${name} is what gets fastened to the building. Who fastens it, and who answers when a section goes dark, is the other half of what you are buying.`,
    points: [
      { h: "Named on your quote", p: "Series, channel finish and diode spacing in writing before anybody drills." },
      { h: "Two warranty layers", p: "The manufacturer covers the hardware. We cover the work, and the call comes to us either way." },
      { h: "Not the only one we fit", p: "If another system suits your building better we will say so, because we install both." },
    ],
    photos: shots(`vb-sys-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  };
}

export function compareValueProp(a: string, b: string, slug: string): ValueProp {
  return {
    title: "We fit both, so this is not a pitch.",
    lede: `${a} and ${b} both go on houses in this metro every season. The useful question is which one suits your building, and who is fastening it.`,
    points: [
      { h: "Compared on what shows", p: "Diode spacing, diffuser and channel finish. The things you can see from the curb." },
      { h: "The install is the variable", p: "The same hardware fitted badly fails long before the cheaper one fitted properly." },
      { h: "Weaknesses named", p: "Where one is genuinely worse we write it down here and say it again at the quote." },
    ],
    photos: shots(`vb-cmp-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/lighting-systems", label: "The systems we fit" },
  };
}

export function postValueProp(slug: string): ValueProp {
  return {
    title: "What this is, in one line.",
    lede: "Permanent outdoor lighting is one aluminium channel routed into your eave, one run of addressable LEDs and one app, fitted once and left on the building.",
    points: CORE,
    photos: shots(`vb-post-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  };
}
