/* PER-SERVICE PAGE DETAIL.
 *
 * Why this file exists. One template generates eleven service pages, and before this it
 * gave all eleven the same body: the same six "Step 1…6" cards with identical copy, the
 * same "Quick facts" table (including "Roof types: shingle, metal, tile, flat" on the
 * landscape page, which has nothing to do with a roof), the same permanent-versus-hanging
 * comparison table (on the hardscape page, where nobody hangs anything seasonally), and
 * the same related-services grid. Eleven URLs, one page.
 *
 * So everything that should differ per service lives here, and the template reads it:
 *
 *   facts     — the quick-facts table, written for THIS service. Nothing generic, and
 *               nothing that is not true of it.
 *   included  — what is in the written quote for THIS service. No step numbers; the
 *               client's rule is no numbers used as descriptors.
 *   figure    — which centerpiece the page carries. One per service, and no two services
 *               share one. See components/sections/service-figures.tsx.
 *   compare   — whether the permanent-versus-hanging table belongs on the page at all. It
 *               is honest on the roofline and holiday pages and nonsense on the others.
 *   alsoSee   — chosen, in order, not `services.slice(0, 4)`.
 *   proofShot — the photograph that page closes on, so eleven pages do not all show the
 *               same house.
 *
 * Everything here is either a fact about the hardware we install or a judgement we are
 * making as the installer. No invented prices, warranties or timescales.
 */

export type FigureKey =
  | "zones" | "calendar" | "eave" | "beam" | "wall"
  | "fixtures" | "pergola" | "scenes" | "gameday" | "parapet" | "takeover";

export type ServiceDetail = {
  /** The second paragraph of "What X actually is."
   *
   *  This used to be one hardcoded sentence in the template, printed on all eleven pages:
   *  "It is installed once, by our own crew, and it stays on the building. Nothing goes up in
   *  November and nothing comes down in January." True of a new roofline install. Read by
   *  somebody on /services/repairs-and-service with a dead run on a system we did not sell,
   *  it is a non-answer — and it was the loudest reason that page and the permanent-outdoor-
   *  lighting page read as one document. */
  secondPara: string;
  facts: [string, string][];
  included: [string, string][];
  figure: FigureKey;
  compare: boolean;
  alsoSee: string[];
  proofShot?: string;      // path in /public/img
  proofCaption?: string;
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "permanent-outdoor-lighting": {
    secondPara:
      "It is installed once, by our own crew, and it stays on the building. Nothing goes up in November and nothing comes down in January.",
    figure: "zones",
    compare: true,
    facts: [
      ["Runs on", "One channel, one controller"],
      ["Zones", "Per elevation, unlimited"],
      ["Everyday setting", "Warm white, dimmable"],
      ["Install time", "One day, most homes"],
      ["Added to later", "Without replacing anything"],
    ],
    included: [
      ["The walk-around", "We design after dark, on your property, to what you actually want lit rather than to a package."],
      ["Channel and diffuser", "Extruded aluminum color matched to the fascia, frosted diffuser facing down."],
      ["Controller and app", "Sited, commissioned, and set up on your phone with your first scenes built while we are there."],
      ["Zoning", "Front, sides, back and landscape switched separately, so the back can stay dark."],
      ["Both states checked", "Daylight sightline from the curb, then every scene walked with you after dark."],
    ],
    alsoSee: ["permanent-roofline-lighting", "landscape-lighting", "patio-pergola-bistro-lighting", "holiday-seasonal-scenes"],
    /* Was hero-warm-white.jpg captioned "warm white, dimmed" — see the note on heroWarm in
     * content/images.ts. scene-warm-white.jpg is the one frame that actually shows it. */
    proofShot: "/img/scene-warm-white.jpg",
    proofCaption: "The everyday setting on a west Omaha install — house, pergola and hardscape all on it, scheduled to dusk.",
  },

  "permanent-christmas-lights": {
    secondPara:
      "The hardware that runs red and green in December is the same hardware that runs warm white in March. You are not buying a Christmas product; you are buying a roofline that can be set to Christmas from your phone and then set back.",
    figure: "calendar",
    compare: true,
    facts: [
      ["Hung each year", "Never again"],
      ["Christmas colors", "Red and green, alternating pixels"],
      ["Scheduling", "By date range, unattended"],
      ["January takedown", "Nothing to take down"],
      ["Rest of the year", "Warm white, or any scene"],
    ],
    included: [
      ["Alternating pixel scenes", "Every other diode red, the rest green — a pattern a strand of bulbs cannot do."],
      ["Date-range scheduling", "On at dusk from the day you choose, off on the day you choose, without you touching it."],
      ["Warm white underneath", "The same run is your everyday lighting for the other eleven months."],
      ["No storage", "No boxes, no clips, no ladder in December, no gutter damage in January."],
    ],
    alsoSee: ["holiday-seasonal-scenes", "permanent-roofline-lighting", "gameday-lighting", "permanent-outdoor-lighting"],
    proofShot: "/img/christmas-detail.jpg",
    proofCaption: "Close enough to count the pixels: every other diode red, the rest green.",
  },

  "permanent-roofline-lighting": {
    secondPara:
      "Everything that decides whether you still like it in year five happens in the eight inches between your shingles and your gutter. The channel goes into fascia, never through shingles, and the diffuser faces down so the curb sees light rather than diodes.",
    figure: "eave",
    compare: true,
    facts: [
      ["Fastened into", "Fascia, never shingles"],
      ["LED spacing", "4 in. on the Signature system"],
      ["Corners", "Mitered at every transition"],
      ["Terminations", "Sealed end caps, not tape"],
      ["By day", "Reads as trim"],
    ],
    included: [
      ["Channel into fascia", "Every penetration sealed as it is made. Nothing goes through a shingle."],
      ["Mitered transitions", "Valleys, dormers and returns cut and closed, so the line does not break at a corner."],
      ["Concealed conductor", "The wire runs inside the channel. Nothing drops down a downspout or crosses a soffit."],
      ["Color matched", "Channel finished to your fascia color, so the hardware disappears in daylight."],
    ],
    alsoSee: ["soffit-lighting", "permanent-outdoor-lighting", "permanent-christmas-lights", "repairs-and-service"],
    proofShot: "/img/roofline-detail.jpg",
    proofCaption: "The run following the gable and turning the corner without a break.",
  },

  "soffit-lighting": {
    secondPara:
      "Soffit is a different mounting problem from fascia: the fixture is looking down a wall instead of out from an edge, so spacing and beam angle change and so does what the light actually does to the brick. It runs on the same controller as the roofline.",
    figure: "beam",
    compare: false,
    facts: [
      ["Sits", "Inside the overhang"],
      ["Throws light", "Down the face of the house"],
      ["Fixture", "Recessed cans or continuous channel"],
      ["Beam angle", "Chosen for your overhang depth"],
      ["Zoned", "Separately from the roofline"],
    ],
    included: [
      ["Overhang measured", "Depth and height decide the beam angle. A 16 in. soffit and a 30 in. soffit are different fixtures."],
      ["Aiming", "Wall wash or straight down, set on site with you looking at it, not chosen off a spec sheet."],
      ["Separate zone", "Soffit and roofline switch independently, because they are rarely wanted at the same brightness."],
      ["Trim finished", "Cut lines closed and sealed, so the underside looks factory."],
    ],
    alsoSee: ["permanent-roofline-lighting", "permanent-outdoor-lighting", "hardscape-lighting", "landscape-lighting"],
    proofShot: "/img/soffit-eaves.jpg",
    proofCaption: "Soffit and eave runs on one Omaha elevation — gables in color, eaves left white.",
  },

  "hardscape-lighting": {
    secondPara:
      "Nothing about this involves the roof. Fixtures go into seat walls, step risers, pier caps and retaining courses, wired below grade, and they are aimed at the surface rather than at the sky so the wall reads as lit and the fixture does not.",
    figure: "wall",
    compare: false,
    facts: [
      ["Built into", "Walls, steps and coping"],
      ["Fixture", "Under-cap washers and step lights"],
      ["Aimed", "Down, away from seating"],
      ["Glare", "None at seated eye height"],
      ["Runs with", "The landscape transformer"],
    ],
    included: [
      ["Under-cap washers", "Tucked beneath the wall cap so you see the light on the stone and never the fixture."],
      ["Step and riser lights", "Placed where a foot lands, which is a safety decision before it is a design one."],
      ["Aimed away from seating", "Anything at seated eye height gets re-aimed on site, after dark, with somebody sitting in the chair."],
      ["Sealed in the stone", "Cable routed behind the course and sealed, so nothing is exposed to a mower or a shovel."],
    ],
    alsoSee: ["landscape-lighting", "patio-pergola-bistro-lighting", "permanent-outdoor-lighting", "soffit-lighting"],
    proofShot: "/img/hardscape.jpg",
    proofCaption: "Under-cap wash on limestone at an Omaha pool deck, with the fire bowl lit behind it.",
  },

  "landscape-lighting": {
    secondPara:
      "Beds, trees and paths need genuinely different fixtures from a roofline — in-ground uplights, path fixtures, and beam angles chosen per tree rather than a single spacing. They land in the same app as the house, on their own zone, so the yard can be on when the roofline is off.",
    figure: "fixtures",
    compare: false,
    facts: [
      ["Fixtures", "Uplights, path lights, wall wash"],
      ["Aimed at", "Trunks, canopies, beds and walks"],
      ["Cable", "Buried, low voltage"],
      ["Season", "Works in July as well as December"],
      ["Zoned", "Separately from the house"],
    ],
    included: [
      ["Trees uplit", "Two or three fixtures per mature tree, aimed up the trunk into the canopy, which is what changes an elevation."],
      ["Beds washed", "Low, wide fixtures behind planting rather than a row of lights pointed at the house."],
      ["Paths lit for feet", "Path lights spaced to light the walk, not to make a runway out of it."],
      ["Cable buried", "Low-voltage runs trenched and sleeved under anything that gets dug or mowed."],
    ],
    alsoSee: ["hardscape-lighting", "patio-pergola-bistro-lighting", "permanent-outdoor-lighting", "permanent-roofline-lighting"],
    proofShot: "/img/landscape.jpg",
    proofCaption: "Tree uplighting and bed wash on an Omaha property after dark.",
  },

  "patio-pergola-bistro-lighting": {
    secondPara:
      "A pergola is the one place on a property where the fixture is meant to be seen, so the run is set out to the structure's own bays rather than to a spacing table. It switches and dims with the rest of the property instead of from a plug by the back door.",
    figure: "pergola",
    compare: false,
    facts: [
      ["Runs on", "Beams, rafters and fascia"],
      ["Bistro option", "Catenary, on posts or cable"],
      ["Dimming", "Per zone, one to a hundred"],
      ["Used most", "May through October"],
      ["Ties into", "The house controller"],
    ],
    included: [
      ["Beam runs", "Channel along the beam face, so the light falls on the table rather than in your eyes."],
      ["Bistro spans", "Catenary wire tensioned properly, sagged evenly, terminated at a post rather than a gutter."],
      ["Dimmed for dinner", "Set with you at the table after dark. Dinner bright and Christmas bright are not the same setting."],
      ["One app", "The patio and the roofline answer to the same tap, so the whole property switches together."],
    ],
    alsoSee: ["hardscape-lighting", "landscape-lighting", "permanent-outdoor-lighting", "holiday-seasonal-scenes"],
    proofShot: "/img/patio-pergola.jpg",
    proofCaption: "A pergola fascia run over an Omaha pool deck at dusk.",
  },

  "holiday-seasonal-scenes": {
    secondPara:
      "There is no seasonal hardware and no seasonal visit. A scene is a saved state on a system that is already on the house, so the whole of what changes in October is which scene is scheduled.",
    figure: "scenes",
    compare: true,
    facts: [
      ["Saved scenes", "As many as you want"],
      ["Switching", "One tap, or by schedule"],
      ["Colors", "Per pixel, per zone"],
      ["Most-used scene", "Warm white"],
      ["Set up with you", "On install day"],
    ],
    included: [
      ["Scene library built with you", "We build the first eight or so while we are there, named the way you would say them out loud."],
      ["Scheduled by date", "Halloween on the first, Christmas on Thanksgiving, back to warm white in January, unattended."],
      ["Per-zone color", "The gables can run color while the eaves stay white, which is the look most people land on."],
      ["Brightness per scene", "Color reads cleaner dialled back, so each scene stores its own output level."],
    ],
    alsoSee: ["permanent-christmas-lights", "gameday-lighting", "permanent-outdoor-lighting", "patio-pergola-bistro-lighting"],
  },

  "gameday-lighting": {
    secondPara:
      "Scarlet on a Saturday is the same run of channel doing something different for an afternoon. It is worth saying plainly because the alternative being sold is a second set of lights for the two months a year anyone would notice.",
    figure: "gameday",
    compare: false,
    facts: [
      ["Set by", "One tap in the app"],
      ["Colors", "Any two, per zone"],
      ["Scarlet", "Saved as its own scene"],
      ["Back to normal", "Automatically, that night"],
      ["Neighbors", "Will ask"],
    ],
    included: [
      ["Team colors saved", "Scarlet and cream stored as a scene, at the output level that keeps the red clean."],
      ["Scheduled to kickoff", "Set it to come up before the game and drop back to warm white when it is over."],
      ["Per-zone split", "Color on the gables, white on the eaves, so the house reads as lit rather than washed."],
      ["No re-programming", "The scene stays saved. Next Saturday it is one tap again."],
    ],
    alsoSee: ["holiday-seasonal-scenes", "permanent-outdoor-lighting", "permanent-roofline-lighting", "permanent-christmas-lights"],
  },

  "commercial-outdoor-lighting": {
    secondPara:
      "A parapet, a storefront band and a wrapped elevation are a different survey from a house: the runs are longer, the fixings change with the substrate, and the work happens outside your trading hours. The controller and the app are the same ones we put on a residential job.",
    figure: "parapet",
    compare: false,
    facts: [
      ["Buildings", "Storefronts, canopies, multifamily"],
      ["Measured off", "Elevations, not guesswork"],
      ["Installed", "Outside trading hours where needed"],
      ["Contact", "One, for a portfolio"],
      ["Runs", "Longer, same hardware"],
    ],
    included: [
      ["Elevation take-off", "Runs measured from the building's own drawings, so the quote is a number rather than a range."],
      ["Scheduled around trading", "Night and early-morning installs where a storefront cannot lose a day."],
      ["Property manager workflow", "One point of contact, one invoice format, one schedule across several addresses."],
      ["Branded scenes", "Company colors saved as scenes, scheduled to seasons and event nights."],
    ],
    alsoSee: ["permanent-outdoor-lighting", "permanent-roofline-lighting", "repairs-and-service", "hardscape-lighting"],
  },

  "repairs-and-service": {
    secondPara:
      "Most of this is somebody else's system. We take over installs we did not sell, diagnose the run rather than replacing the whole elevation, and tell you when a system is worth keeping and when you are being asked to pay for a repair that will not hold.",
    figure: "takeover",
    compare: false,
    facts: [
      ["Brands serviced", "Any, including ones we do not sell"],
      ["Common causes", "Water, controllers, bad terminations"],
      ["Diagnostics", "On site, both states checked"],
      ["Outcome", "Repair, or replace the run"],
      ["Warranty after", "Ours on what we touch"],
    ],
    included: [
      ["Diagnosis before a quote", "We find out what actually failed. A dead section is usually a termination, not a strip."],
      ["Controller and supply", "Replaced with hardware we can get parts for, not whatever the last installer left."],
      ["Re-seating and re-sealing", "Channel refastened into fascia and closed properly where the original install was not."],
      ["Honest replacement call", "Where a repair will not hold, we say so and price the run instead of billing the attempt."],
    ],
    alsoSee: ["permanent-roofline-lighting", "permanent-outdoor-lighting", "commercial-outdoor-lighting", "soffit-lighting"],
  },
};

export const detailFor = (slug: string) => serviceDetail[slug];
