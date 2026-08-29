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
  { h: "Any color, any night, one app",
    p: "Warm white most of the year, red and green in December, team colors on a Saturday. Same run." },
  { h: "The crew that fits it is local",
    p: "The shop is in west Omaha, and the people who measure your roofline are the people who come back to it." },
];

export const valueProps: Record<string, ValueProp> = {
  "/about": {
    title: "A local crew, and the system they fit.",
    lede: "We install permanent outdoor lighting in the Omaha metro and nothing else, which is why the phone gets answered by the people who did the work.",
    points: [
      { h: "It is the only thing we do", p: "Not a roofing company with a lighting arm, and not a seasonal side line." },
      { h: "The same faces, start to finish", p: "The crew that measures your house is the crew that fits it and comes back to it." },
      { h: "No dispatcher in the middle", p: "The people who fitted it are the people you reach when something needs looking at." },
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
      { h: "Warm white is the everyday setting", p: "Color is there when you want it. Most nights of the year this looks like good trim lighting." },
      { h: "It disappears in daylight", p: "Channel color matched to your fascia, so from the curb at noon it reads as part of the house." },
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
    title: "A call, then a date on your own lawn.",
    lede: "The useful next step is somebody standing on your driveway at dusk with a tape measure, not another brochure.",
    points: [
      { h: "Same-day reply, most days", p: "A person from the shop, not a call center taking a message for somebody else." },
      { h: "The design happens on site", p: "On your elevation, against your own fascia color, with the scenes built while we are there." },
      { h: "You keep the quote either way", p: "Written, itemised, and yours whether you book the work or not." },
    ],
    photos: ["homePrairieTwilight", "walkthroughDusk", "crewPortrait"],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  },

  "/faq": {
    title: "The short answer, first.",
    lede: "Permanent lighting is one aluminum channel routed into your eave, one run of addressable LEDs and one app, fitted once and left on the building.",
    points: CORE,
    photos: ["seqSecurity", "dayBrickGable", "homeEaveDownlights"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },

  "/free-design-consultation": {
    title: "See it on your own house first.",
    lede: "We come out, measure the roofline, and design it with you on your own elevation. You end up holding a written number either way.",
    points: [
      /* WAS: "No design fee, no deposit to get a drawing, and nobody follows up for a year."
       * Three claims, and the deposit and design-fee halves are pricing terms nobody at Brytr
       * gave us. The visit being free is the offer Brytr leads with everywhere, so that part
       * stays and the invented terms around it do not. */
      { h: "Free, and genuinely no obligation", p: "The visit, the design and the written quote cost nothing, and nobody follows up for a year." },
      { h: "Your materials, not a catalog", p: "Channel color held against your actual fascia, because that is what decides how it looks at noon." },
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
      { h: "Zoned, so color lands where you chose", p: "Gables scarlet with the eaves left white is two zones, not a compromise." },
    ],
    photos: ["aerialRedRoofline", "sceneAmberCyan", "gamedayRedBlueGables"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/how-it-works": {
    /* WAS: "Installed in a day, and left on the building." The duration survived here in the
     * TITLE after the same claim was taken out of the points below it, three lines further down,
     * in the same commit. A heading is the one line on a band a reader cannot miss. */
    title: "Fitted into the fascia, and left on the building.",
    lede: "Measured on site, routed into the fascia, sealed as it goes, commissioned on your phone and signed off with you.",
    points: [
      { h: "Into fascia, never through shingles", p: "Every penetration sealed at the moment it is made, which is where installs fail at year five." },
      /* WAS: "Most homes are a single day / One crew, one visit, and the drive cleared before we
       * leave." The duration claim is out on the client's instruction. What is left is the part
       * that was never in doubt and is the actual reassurance: the site gets cleared. */
      { h: "The drive is cleared before we leave", p: "One visit, and nothing left on your property when it is done." },
      { h: "Checked twice before we go", p: "The sightline from the curb, then every scene walked through with you." },
    ],
    photos: ["installDayPavilion", "detailGableMiter", "crewRoofFascia"],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  },

  "/lighting-systems": {
    title: "The hardware, and who fits it.",
    lede: "We fit more than one manufacturer, so what goes on your house is the system that suits it rather than the only one we sell.",
    points: [
      { h: "Named on the quote", p: "Manufacturer, series and channel finish in writing, so you know exactly what is being fastened to your building." },
      { h: "One number to call", p: "The people who fitted it are the people who turn up." },
      { h: "Add to it later", p: "Landscape, patio and hardscape join the same controller without replacing what is already up." },
    ],
    photos: ["archAtNight", "serviceRoofline", "serviceSoffit"],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  },

  /* THE "/pricing" BAND IS GONE with the page it belonged to. It carried three claims and all
   * three were unsourced: "No design fee, no travel charge", the per-element pricing breakdown,
   * and a "Financing options" link to /financing - a route that never existed, so that button was
   * a live 404 on the client's domain. */
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
    title: "What the neighbors said about the work.",
    lede: "Every review here is verbatim from Google, from homeowners in the Omaha metro who have had a system on the building through a full year.",
    points: [
      { h: "They write about the same things", p: "Communication, the crew, and how it looked the first night. That is more useful than an average." },
      { h: "The work is still ours to fix", p: "A five star install stops meaning much if nobody answers in February. We answer." },
      { h: "Neighbors notice", p: "The most common line in these reviews is somebody being asked who did it." },
    ],
    photos: ["seqWarmChristmas", "homeWhiteTwoStorey", "christmasEntryShrubs"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/service-areas": {
    title: "The metro, and Council Bluffs.",
    lede: "Every town we serve is inside about thirty-five minutes of the shop, which is what lets a call in February be answered the same week.",
    points: [
      { h: "A service call is a visit", p: "Not a route day booked for next month. That is the whole reason the area stops where it does." },
      /* WAS: "Same price in every town / No travel charge inside the metro, and no border premium
       * on the Iowa side." A uniform-pricing guarantee across nineteen towns and two states.
       * Nobody at Brytr has told us how travel is or is not priced. Replaced with the thing this
       * band was really for, which is why the service area stops where it does - and that is a
       * drive time, not a price. */
      { h: "One shop, one set of people", p: "Every town is served out of west Omaha rather than by a local franchise." },
      /* WAS: "Your own crew, not a franchise". The client's correction in August was that the
       * crews are subcontractors, not employees, so "your own crew" is false. What is true and is
       * the actual point of this band is that everything is dispatched from one shop rather than
       * from a franchise head office. */
      { h: "One shop, not a franchise", p: "Elkhorn, Bellevue and Council Bluffs are all served out of west Omaha." },
    ],
    photos: ["winterGradientSnow", "homeShakeBrick", "deckRanchWarm"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/services": {
    title: "Every surface runs on the same channel.",
    lede: "Roofline, soffit, beds, trees, walls and pergolas all run on the same channel and the same controller, so what you fit first does not limit what you add.",
    points: CORE,
    photos: ["serviceWholeHome", "servicePatio", "serviceLandscape"],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
  },

  /* THE "/warranty" ENTRY IS GONE, 28 Aug 2026, with the page. Deleting the route and leaving its
   * copy in this map would have shipped three paragraphs of warranty terms in the bundle for a URL
   * that now 308s to the home page - which is the same mistake as the dead pricing-FAQ array that
   * nearly went out on 27 Aug: unrendered is not the same as removed, and a claim in a shipped
   * chunk is a claim. Nothing in this file should describe coverage until Brytr gives us terms. */
};

/* ── THE DYNAMIC TEMPLATES ──
 * Five templates render roughly fifty pages between them. Each derives its band from the thing it
 * is rendering, so a reader on two service pages gets two different bands rather than the same one
 * with a different heading. `pick` is seeded on the slug, so the photographs are stable per page
 * and different between pages. */

const shots = (seed: string, n: number) => pick(seed, n).map((s) => s.photo);

export function serviceValueProp(s: Service): ValueProp {
  return {
    title: "Part of the same system.",
    lede: `${s.name} runs on the same channel and the same controller as everything else we fit, so adding to it later is a wiring afternoon rather than a second system.`,
    points: [
      { h: "Fitted once, then left alone", p: "Routed in and sealed on install day. Nothing to put up in November and nothing to take down." },
      { h: "Its own zone in the app", p: "It comes on and goes off independently, so the back of the property can stay dark while the front is lit." },
      { h: "Ours to service", p: "The crew that fitted it is twenty minutes away." },
    ],
    photos: [s.photo ?? "homeWideRanch", ...shots(`vb-${s.slug}`, 2)],
    cta: BOOK,
    alt: { href: "/compare", label: "Compare the brands" },
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
        ? "The shop is in west Omaha, so an install here is booked inside the week and a service call is a visit rather than a route day."
        : `${c.drive} from the shop in west Omaha, which is what lets an install here be booked inside the week and a service call be a visit.`,
    points: [
      { h: "The same crew as every town", p: "One shop, one set of people, and no local franchise holding the terms." },
      /* WAS: "No travel charge / Priced by the foot exactly as it is in Omaha, with nothing added
       * for the drive." This rendered on all twelve city pages: a pricing basis plus a
       * no-surcharge guarantee, neither of them from Brytr. */
      { h: "Booked out of west Omaha", p: "The same people who measure the house are the ones the shop sends back to it." },
      { h: "Designed on your own elevation", p: "Against your own fascia color, before anything is ordered." },
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
      { h: "One number to call", p: "The call comes to the people who fitted it, either way." },
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
    title: "What this is, briefly.",
    lede: "Permanent outdoor lighting is one aluminum channel routed into your eave, one run of addressable LEDs and one app, fitted once and left on the building.",
    points: CORE,
    photos: shots(`vb-post-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  };
}
