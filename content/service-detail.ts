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

import type { Shot } from "@/content/photo-sets";

export type FigureKey =
  | "zones" | "calendar" | "eave" | "beam" | "wall"
  | "fixtures" | "pergola" | "scenes" | "gameday" | "parapet";

export type ServiceDetail = {
  /** The second paragraph of "What X actually is."
   *
   *  This used to be one hardcoded sentence in the template, printed on every service page:
   *  "It is installed once, by our own crew, and it stays on the building. Nothing goes up in
   *  November and nothing comes down in January." True of a new roofline install, and a
   *  non-answer on the landscape and hardscape pages, which is the loudest reason several of
   *  these pages used to read as one document. */
  secondPara: string;
  facts: [string, string][];
  included: [string, string][];
  figure: FigureKey;
  compare: boolean;
  alsoSee: string[];
  proofShot?: string;      // path in /public/img
  proofCaption?: string;

  /* PHOTOGRAPHS IN THE BODY, CHOSEN PER SERVICE.
   *
   * The city pages rotate a shared pool, because a photograph of a lit roofline is equally
   * true in Elkhorn and in Gretna. That trick is wrong here: on a service page the photograph
   * has to be OF the service. A Christmas frame on the hardscape page would be worse than no
   * photograph at all, so these are assigned by hand, per slug, with the caption written
   * against the specific thing in the specific frame.
   *
   * `shots`  three or four for a strip.
   * `pair`   two frames of the SAME subject that mean something only together — the arch by
   *          day and lit, the one house on warm white and on a colour scene. Only set this
   *          where the two frames are genuinely registered against each other; a pair of two
   *          different houses is a strip with a misleading label on it. */
  shots?: Shot[];
  pair?: { a: string; b: string; aLabel: string; bLabel: string; title: string; lede: string };
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "permanent-outdoor-lighting": {
    pair: {
      a: "seqEveryday", b: "seqGameday",
      aLabel: "The everyday setting: warm white, roofline, eaves and the band over the garage.",
      bLabel: "Ninety seconds later. Same fixtures, same evening, one saved scene switched on.",
      title: "One house, one evening, two settings.",
      lede: "Ninety seconds apart, from a drone that never moved. Same roof, same sky; the only thing that changed is what the controller was told to do.",
    },
    shots: [
      { photo: "seqSecurity", caption: "The same run dimmed to a low warm white. Most people leave it here on a Tuesday." },
      { photo: "seqWarmChristmas", caption: "The same warm white at full output, and for a lot of houses this is the entire Christmas scene." },
      { photo: "seqRedGreen", caption: "And red and green, from the same five frames, on the same night." },
    ],
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
    proofCaption: "The everyday setting on a west Omaha install: house, pergola and hardscape all on it, scheduled to dusk.",
  },

  "permanent-christmas-lights": {
    shots: [
      { photo: "christmasRedGreenGables", caption: "Red and green alternating along every gable and eave. Nothing was hung to make this." },
      { photo: "christmasWreathsNets", caption: "The permanent run alongside the wreaths and nets people still want out. It is not either-or." },
      { photo: "christmasEntryShrubs", caption: "Snow on the beds, and no ladder went up in December to get here." },
      { photo: "christmasBrickGable", caption: "Close on a brick gable, close enough to count the points and the gaps between them." },
    ],
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
      ["Alternating pixel scenes", "Every other diode red, the rest green: a pattern a strand of bulbs cannot do."],
      ["Date-range scheduling", "On at dusk from the day you choose, off on the day you choose, without you touching it."],
      ["Warm white underneath", "The same run is your everyday lighting for the other eleven months."],
      ["No storage", "No boxes, no clips, no ladder in December, no gutter damage in January."],
    ],
    alsoSee: ["holiday-seasonal-scenes", "permanent-roofline-lighting", "gameday-lighting", "permanent-outdoor-lighting"],
    proofShot: "/img/christmas-detail.jpg",
    proofCaption: "Close enough to count the pixels: every other diode red, the rest green.",
  },

  "permanent-roofline-lighting": {
    pair: {
      a: "archByDay", b: "archAtNight",
      aLabel: "The same arched entry in daylight. Nothing to see under the roof edge.",
      bLabel: "After dark, one continuous run following every facet of the octagon.",
      title: "The run follows the roof, including where the roof stops being straight.",
      lede: "Any installer can light a gable. What separates a good roofline job from a cheap one is whether the line keeps going through the awkward part.",
    },
    shots: [
      { photo: "detailGableMiter", caption: "The turn at a peak. One continuous line, mitered, with no gap and no doubled-up section." },
      { photo: "homeWideRanch", caption: "A long low ranch, which is the hardest elevation there is, because nothing breaks the run, so every sag shows." },
      { photo: "homeBrickGablesGold", caption: "A complicated roof. More gables means more corners, and corners are where installs fail." },
    ],
    secondPara:
      "Everything that decides whether you still like it in year five happens in the eight inches between your shingles and your gutter. The channel goes into fascia, never through shingles, and the diffuser faces down so the curb sees light rather than diodes.",
    figure: "eave",
    compare: true,
    facts: [
      ["Fastened into", "Fascia, never shingles"],
      ["LED spacing", "4 in. on Haven Evolution"],
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
    alsoSee: ["soffit-lighting", "permanent-outdoor-lighting", "permanent-christmas-lights", "landscape-lighting"],
    proofShot: "/img/roofline-detail.jpg",
    proofCaption: "The run following the gable and turning the corner without a break.",
  },

  "soffit-lighting": {
    shots: [
      { photo: "homeEaveDownlights", caption: "Downlights under the eave, spaced at the measure rather than guessed on the day." },
      { photo: "homeStoneSiding", caption: "Even spacing carried across a broken roofline, which is harder than it looks from the street." },
      { photo: "patioCovered", caption: "The same detail on a patio cover, seen from underneath where you actually sit." },
    ],
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
    proofCaption: "Soffit and eave runs on one Omaha elevation: gables in color, eaves left white.",
  },

  "hardscape-lighting": {
    shots: [
      { photo: "hardscapeSeatwall", caption: "Lit caps along a stone seat wall, with the porch behind it on the same scene." },
      { photo: "patioTimberStone", caption: "Step lights down the stairs and a run along the beam: one system, two jobs." },
      { photo: "poolRearWarm", caption: "The back of a house at dusk, the points repeated in the water." },
    ],
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
    shots: [
      { photo: "landscapeTreeBeds", caption: "Roofline and landscape on one controller, so the beds come up with the house." },
      { photo: "landscapeTreeTeal", caption: "One uplight through a mature tree, doing more for the property than a whole roofline would." },
      { photo: "landscapeBrickUplight", caption: "Roofline, gable accent and uplight, each addressed separately and each doing a different job." },
    ],
    secondPara:
      "Beds, trees and paths need genuinely different fixtures from a roofline: in-ground uplights, path fixtures, and beam angles chosen per tree rather than a single spacing. They land in the same app as the house, on their own zone, so the yard can be on when the roofline is off.",
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
    shots: [
      { photo: "patioTimberStone", caption: "A timber and stone cover: the run along the beam is the same channel as the roofline." },
      { photo: "patioCovered", caption: "From underneath, with the furniture in it, which is the only angle that answers the real question." },
      { photo: "poolPergolaDusk", caption: "Pool and pergola at sunset. This is the reason people add the overhead run." },
      { photo: "installDayPavilion", caption: "Mid-install on a poolside pavilion. Anything with a structure to fasten to at both ends will take a run." },
    ],
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
    shots: [
      { photo: "halloweenOrangePurple", caption: "October: orange and violet, scheduled for the month and switching itself back." },
      { photo: "fourthBrickRanch", caption: "July: red, white and blue: the one scene nobody hangs bulbs for, because nobody wants to." },
      { photo: "christmasGreenRed", caption: "December, and green as the field colour rather than the usual alternation." },
      { photo: "winterGradientSnow", caption: "February, in snow, running a gradient across a single roofline." },
    ],
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
    pair: {
      a: "seqEveryday", b: "seqGameday",
      aLabel: "Friday. Warm white, and nobody would guess the house does anything else.",
      bLabel: "Saturday. Scarlet across the elevation with white held at the peaks.",
      title: "Saturday, and then Sunday again.",
      lede: "The same house, the same evening, ninety seconds apart. Not a house that is red, but a house that is warm white and can be red for four hours.",
    },
    shots: [
      { photo: "gamedayRedBlueGables", caption: "Two team colours held apart by zone: one gable red, the next blue, eaves left white." },
      { photo: "gamedayRedGable", caption: "How far a saturated colour spills onto a driveway. Shown rather than described." },
      { photo: "gamedayRanchWide", caption: "Colour across a long low roofline and a curved drive." },
    ],
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
    /* HONEST ABOUT THE LIBRARY. Nearly every photograph Brytr has is residential, and the one
     * frame with a commercial elevation in it has a member of the crew in the foreground. So
     * this page gets that frame and says what it is, rather than putting three houses under a
     * commercial heading and hoping nobody notices the difference. */
    shots: [
      { photo: "crewPortrait", caption: "A storefront band set to red behind one of our own crew. Commercial work is the same channel and the same controller as a house. The difference is the fixing detail and the hours we can be on site." },
      { photo: "sceneWhiteRedEntry", caption: "Cool white across a long elevation with one zone changed, which is how most branding scenes are actually built." },
      { photo: "homeModernStone", caption: "A flat roof edge with no gable to hang a line on, which is the detailing problem most commercial buildings present." },
    ],
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
    alsoSee: ["permanent-outdoor-lighting", "permanent-roofline-lighting", "holiday-seasonal-scenes", "hardscape-lighting"],
  },

};

export const detailFor = (slug: string) => serviceDetail[slug];
