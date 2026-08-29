/* Image manifest. Every photo slot on the site is declared here and nowhere else.
 *
 * To add a photo: drop the file in /public/img/ and set `src`. The component picks
 * it up on the next build. Until `src` is set, the component renders its no-photo
 * variant, which is a designed, dense state — never a gray placeholder box.
 *
 * Rules: real photography only. No stock, no AI. `alt` must name the city or the
 * service, because these double as SEO signals. Never name a customer's street —
 * these are private homes, so captions stop at the city.
 *
 * Provenance, and there are now two sources.
 *
 * The g-* and scene-* files are developed from Brytr's own drone raws — three completed
 * installs in the Omaha metro, shot Oct 2 / Oct 14 / Oct 19 2025. Exposure brackets were
 * merged and graded; no color was invented or hue-shifted.
 *
 * Everything added since comes out of Brytr's own shared library and divides in two:
 *
 *   seq-*  One property west of Omaha, one drone, one hover point. The five frames were
 *          captured between 20:40:29 and 20:41:59 on 30 Sep 2025 — ninety seconds — and the
 *          logged position moves less than two feet across all five. So the elevation, the
 *          sky and the camera are the same in every frame and only the lighting changes.
 *          That is not a montage of five houses, and the site is allowed to say so.
 *
 *   the rest  The crew's own phone photographs, across many finished installs. Handheld,
 *          uneven, sometimes portrait — and worth more than a clean stock frame, because a
 *          homeowner recognizes the houses. Kept at the orientation they were shot at
 *          rather than cropped to a uniform 16/9, which is why `ratio` now admits 3/4.
 *
 * Every file was stripped of metadata on the way in. The drone frames carried GPS to the
 * hundredth of an arcsecond, which is a customer's front door, and that does not ship.
 */
export type Slot = {
  src: string | null;
  alt: string;
  subject: string;   // what to shoot, shown to the team in the drop list
  ratio: "16/9" | "4/3" | "21/9" | "3/4" | "4/5" | "1/1";
  priority?: boolean;
};

export const images: Record<string, Slot> = {
  /* THE HERO PAIR — the same house, the same frame, two saved scenes, registered so the
   * drag handle wipes one into the other.
   *
   * These used to be hero-warm-white.jpg and hero-game-day.jpg, and the first of those is
   * NOT warm white. Its runs read as a soft pink across the whole elevation — the brick goes
   * rose and the white siding goes pink — and it was captioned "everyday warm white" in eight
   * places, which put the site's single most important product claim (that warm white is
   * where the system sits all year, and color is the occasional scene) underneath a
   * photograph of the wrong color of light.
   *
   * The fix was available in the archive and nobody had noticed: the pool-deck shoot is one
   * property photographed on one evening in both states. hero-bg.jpg and scene-warm-white.jpg
   * are genuinely warm white; g-pool-red / -blue / -green / -pink are the same camera
   * position in color, at the same 16:9. Measured mean luma difference between
   * scene-warm-white and g-pool-red across a 400px reduction is 12.8, which is color, not
   * movement — so the registration the wipe depends on survives the swap.
   *
   * So the drag line now genuinely shows the everyday setting against an occasion scene, on
   * one house, which is the argument it always claimed to be making.
   *
   * hero-warm-white.jpg is still in the archive and still used elsewhere. Every caption on it
   * now describes what is in the frame: a soft pink, not warm white. */
  heroWarm: { src: "/img/scene-warm-white.jpg",
    alt: "An Omaha home, pergola and pool deck on everyday warm white at dusk",
    subject: "The everyday setting. Pairs with heroScene, same house and same frame.", ratio: "16/9", priority: true },
  heroScene: { src: "/img/g-pool-red.jpg",
    alt: "The same Omaha home, pergola and pool deck with every run switched to red",
    subject: "Same frame as heroWarm, one color scene on.", ratio: "16/9", priority: true },

  /* THE HOME HERO IS NOT THE SAME HOUSE AS THE DRAG DEVICE ANY MORE.
   *
   * This used to be hero-bg.jpg, a wide crop of the pool-deck evening — which is the same
   * property, the same angle and the same fire bowl as heroWarm and heroScene, the pair the
   * signature drag module three thousand pixels below is built from. So the two most prominent
   * image slots on the site showed one house, and a page whose job is to establish range opened
   * by showing none.
   *
   * hero-front.jpg is a 21/9 crop of a different install: a long brick ranch at blue hour with
   * the whole roofline picked out. Two reasons it is the better hero. It is a FRONT elevation,
   * which is what somebody shopping for this is picturing, where the pool shot is a back garden.
   * And the run is legible through the scrim — checked against the actual gradient stops before
   * the swap, because the scrim got considerably heavier when the hero contrast failure was fixed
   * and a photograph that reads at full brightness can vanish under it.
   *
   * The crop carries a 1.18 gamma lift, which is the one bit of processing on it. The frame was
   * shot into a bright blue-hour sky so the brick sits several stops under; opened up, the run
   * reads as a line of individual warm points along the whole roofline instead of a smudge. That
   * is exposure, not invention — no light was added, nothing was hue-shifted, and the source file
   * is in the archive as home-ranch-bluehour.jpg for anyone who wants to check. */
  /* THE HOME HERO IS seq-everyday.jpg NOW, AND IT WAS PICKED BY MEASUREMENT.
   *
   * The client: "can we pick a different image for the hero that makes it look a bit lighter?
   * Right now this just looks so dark. The site in general just looks dark, which is very weird
   * for a lighting company." He is right, and no caption in this file could have settled which
   * frame is lighter — every candidate here is described as "at dusk" or "at blue hour", and blue
   * hour on a clear evening and blue hour into overcast are three stops apart under the same word.
   *
   * So scripts/hero-pick.mjs decodes every wide file and ranks them by measured relative
   * luminance. hero-front.jpg, the frame this slot used to hold, came TWELFTH of twelve — the
   * darkest of every wide photograph in the library, at 0.184. seq-everyday.jpg is 0.271, which is
   * 47% brighter, and it clears the contrast bar under the type at 7.7:1.
   *
   * Everything above it in that ranking was disqualified on content rather than on brightness:
   * seq-red-green is the December scene, seq-gameday is a red wash, seq-security is the run
   * deliberately dimmed, seq-warm-christmas is captioned as Christmas, detail-arch-day is a turret
   * detail rather than an elevation. A hero has to show the everyday setting on a front elevation,
   * and this is the brightest frame in the library that does.
   *
   * IT IS 16/9 AND THAT IS AN IMPROVEMENT, not a compromise. The hero now fills the viewport, so
   * its box runs about 2.0:1 on a 1440x900 screen. A 21/9 source cropped into that loses nothing
   * horizontally and 16/9 loses about 100px vertically, which is far gentler than the reverse.
   *
   * THE ONE RULE THIS SLOT HAS is that the hero must not be a property used elsewhere on the same
   * page. seq-everyday is the ninety-second sequence house, and seq-red-green — the SAME house
   * from the SAME hover point — was the second tile in RecentWork. That tile is now
   * christmasRedGreenGables, a different house on the same scene. */
  heroBg: { src: "/img/seq-everyday.jpg",
    alt: "A brick and cedar ranch west of Omaha at dusk, its roofline, eaves and garage band picked out in everyday warm white",
    subject: "Wide front elevation, dusk, everyday warm white. Home hero only, and must not be a property used elsewhere on that page.", ratio: "16/9", priority: true },

  channelCloseUp: { src: "/img/channel-detail.jpg",
    alt: "Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave",
    subject: "Tight enough to see the individual LEDs and the channel in the fascia. Nobody in this trade shows the hardware.", ratio: "4/3" },
  /* This slot was null and flagged "needs a daytime shoot" — the shoot existed, in the crew's
   * own camera roll. It is a portrait frame, so the slot is a portrait now.
   *
   * Renamed from `crewWide`, which was a lie twice over: the frame is not wide, it is 3/4, and
   * the old name described the 21/9 crop the empty slot had been reserved for. Three pages had
   * already been written against `crewRoofFascia` — the name the file actually suggests — and
   * every one of them silently rendered nothing, because a missing key is indistinguishable
   * from an unfilled slot. See scripts/photo-keys.mjs, which now fails the build on that. */
  crewRoofFascia: { src: "/img/crew-roof-fascia.jpg",
    alt: "A Brytr installer sitting on the shingles of an Omaha roof in daylight, working along the line where the fascia meets the wall",
    subject: "The install itself, in daylight, with a person in it.", ratio: "3/4" },
  crewPortrait: { src: "/img/crew-portrait.jpg",
    alt: "A Brytr installer in a Brytr shirt and cap outside a lit commercial building, its roofline run set to red",
    subject: "One of the crew, named nowhere, because we do not know from the frame who this is.", ratio: "3/4" },
  appScreen: { src: null, alt: "The Brytr lighting app showing saved scenes",
    subject: "Phone screenshot of the app scene list.", ratio: "4/5" },

  founderZac: { src: null, alt: "Zac Van Buren, co-founder of Brytr Co", subject: "Portrait, vertical 4/5.", ratio: "4/5" },
  founderSam: { src: null, alt: "Sam Greguska, co-founder of Brytr Co", subject: "Portrait, vertical 4/5.", ratio: "4/5" },

  serviceWholeHome: { src: "/img/landscape-tree-beds.jpg",
    alt: "A wide Omaha ranch at blue hour, warm white along the roofline and uplights through a bare tree and the planting beds",
    subject: "Roofline and landscape in one frame: the whole-property argument, photographed.", ratio: "4/3" },
  serviceChristmas: { src: "/img/christmas-brick-two-storey.jpg",
    alt: "A large brick Omaha two-story in alternating red and green with uplights on the planting beds",
    subject: "December on a big brick elevation, with the landscape lighting joining in.", ratio: "4/3" },
  servicePatio: { src: "/img/patio-timber-stone.jpg",
    alt: "A timber and stone covered patio at an Omaha home after dark, warm light along the beam and step lights down the stairs",
    subject: "A patio cover from underneath: beam run plus step lights, one system.", ratio: "3/4" },
  serviceRoofline: { src: "/img/home-wide-ranch.jpg",
    alt: "A wide low Omaha ranch at night with warm white holding a straight line the full length of the roof",
    subject: "A long low ranch. The hardest run to hold straight, so the best roofline proof.", ratio: "4/3" },
  serviceSoffit: { src: "/img/home-eave-downlights.jpg",
    alt: "Warm white downlights spaced evenly under the eaves and gable peaks of a modern Omaha farmhouse",
    subject: "Close enough to read the spacing between the downlights under the eave.", ratio: "3/4" },
  serviceHardscape: { src: "/img/hardscape-seatwall.jpg",
    alt: "A stone seat wall with lit caps in the foreground and a covered porch behind it washed red at an Omaha home",
    subject: "Lit wall caps in front, a washed porch behind, one scene across both.", ratio: "3/4" },
  /* was g-pool-red.jpg — a pool deck with red umbrellas, which is not what a homeowner
   * pictures when they read "game day". The ranch roofline in scarlet is. */
  serviceGameday: { src: "/img/gameday-red-blue-gables.jpg",
    alt: "A brick Omaha two-story with one gable in red, another in blue and white along the eaves",
    subject: "Two team colors held apart by zone rather than washed over the whole house.", ratio: "4/3" },
  /* was g-ranch-blue.jpg — blue reads as nothing in particular next to the word
   * "seasonal". Halloween violet reads as a season immediately. */
  serviceHoliday: { src: "/img/halloween-orange-purple.jpg",
    alt: "An Omaha two-story in orange and violet with a stone column washed amber for Halloween",
    subject: "October rather than December: a saved scene that is not Christmas.", ratio: "3/4" },
  serviceLandscape: { src: "/img/landscape-brick-uplight.jpg",
    alt: "A tall brick Omaha home with white roofline runs, magenta accents on the gables and uplights washing the brick and shrubs",
    subject: "Roofline, gable accent and uplight, each separately addressed.", ratio: "4/3" },

  /* ── THE NINETY-SECOND SEQUENCE ──
   * One house, one hover point, five lighting states. See the provenance note at the top of
   * this file for why these five can be presented as one property rather than five. This is
   * the strongest thing in the library and it goes where the argument needs proving, not
   * wherever a photograph would look nice. */
  seqEveryday: { src: "/img/seq-everyday.jpg",
    alt: "A brick and cedar ranch west of Omaha at dusk, its roofline, eaves and garage band on everyday warm white",
    subject: "Frame one of the sequence. The setting the system sits at all year.", ratio: "16/9" },
  seqSecurity: { src: "/img/seq-security.jpg",
    alt: "The same house minutes later with the run dimmed to a low warm white, enough to read the driveway by",
    subject: "Same frame, dimmed. Warm white doing a different job.", ratio: "16/9" },
  seqWarmChristmas: { src: "/img/seq-warm-christmas.jpg",
    alt: "The same house with every point along the roofline and eaves at full warm white",
    subject: "Same frame, warm white at full. Christmas without color.", ratio: "16/9" },
  seqRedGreen: { src: "/img/seq-red-green.jpg",
    alt: "The same house with the roofline alternating red and green",
    subject: "Same frame, the December scene.", ratio: "16/9" },
  seqGameday: { src: "/img/seq-gameday.jpg",
    alt: "The same house washed red across the whole elevation with white left at the roof peaks",
    subject: "Same frame, a color scene. Note the white peaks: two zones, not one.", ratio: "16/9" },

  /* ── BY DAY ──
   * The site claims the hardware disappears in daylight. These are the only images on the
   * site that let a reader check that claim, so they are worth more than any night shot. */
  dayBrickGable: { src: "/img/day-brick-gable.jpg",
    /* The alt read "a slim line the color of the trim" and the subject called it a
       trim-colored channel. Brytr does not color match, so a screen reader was being told
       something the sales copy has just stopped saying. What the frame shows is a slim line
       tucked under the roof edge, which is the checkable claim and the one we make. */
    alt: "A brick gable and white fascia on an Omaha home in daylight, the channel tucked under the roof edge as a slim line below the gutter",
    subject: "Daylight, close, the channel in the eave line. The claim, checkable.", ratio: "3/4" },
  dayShakeGable: { src: "/img/day-shake-gable.jpg",
    alt: "A shake gable meeting a shingled roof on an Omaha home in daylight, the run visible only as a narrow strip below the gutter line",
    subject: "Daylight on a second house, so it is not one lucky angle.", ratio: "4/3" },
  dayStoneGable: { src: "/img/day-stone-gable.jpg",
    alt: "A stone and brick gable on an Omaha home under overcast light, the channel following the roof edge above the entry",
    subject: "Daylight, overcast, stone. The hardest surface to hide against.", ratio: "3/4" },
  archByDay: { src: "/img/detail-arch-day.jpg",
    alt: "The stucco arched entry turret of an Omaha home in daylight, nothing visible under the roof edge",
    subject: "Before half of the arch pair. Same turret as archAtNight.", ratio: "16/9" },
  archAtNight: { src: "/img/detail-arch-night.jpg",
    alt: "The same stucco turret after dark, one continuous warm run following every facet of the octagon",
    subject: "After half. Proves the run turns to follow geometry rather than stopping at it.", ratio: "21/9" },

  /* ── CRAFT ──
   * Where the run meets a corner is where a bad install shows. */
  detailGableMiter: { src: "/img/detail-gable-miter.jpg",
    alt: "A lit warm white run following the rake of a gable and turning at the peak on an Omaha home",
    subject: "The turn at the peak, close. One continuous line, no gap.", ratio: "3/4" },

  /* ── UNDER A ROOF YOU CAN SIT UNDER ── */
  patioCovered: { src: "/img/patio-covered-warm.jpg",
    alt: "A covered patio at an Omaha home at night, a warm white run along the underside of the beam over a dining table and seating",
    subject: "The channel on a patio cover, from underneath, with furniture in it.", ratio: "4/3" },
  patioTimberStone: { src: "/img/patio-timber-stone.jpg",
    alt: "A timber and stone covered patio at an Omaha home after dark, warm light along the beam and step lights down the stairs",
    subject: "Best patio frame in the library. Beam run and step lights on one system.", ratio: "3/4" },
  poolPergolaDusk: { src: "/img/pool-pergola-dusk.jpg",
    alt: "A pool and covered pergola at an Omaha home at sunset, the pergola beam and the far roofline both lit warm",
    subject: "Pool at dusk. The reason people buy the pergola run.", ratio: "3/4" },
  poolRearWarm: { src: "/img/pool-rear-warm.jpg",
    alt: "The back of an Omaha home at dusk with warm soffit downlights above a pool, the points repeated in the water",
    subject: "Rear elevation. Almost every photograph on this site is a front.", ratio: "3/4" },
  hardscapeSeatwall: { src: "/img/hardscape-seatwall.jpg",
    alt: "A stone seat wall with lit caps in the foreground and a covered porch behind it washed red at an Omaha home",
    subject: "Hardscape in front, roofline behind, one scene across both.", ratio: "3/4" },
  deckRanchWarm: { src: "/img/deck-ranch-warm.jpg",
    alt: "A long Omaha ranch at night with warm white along the roofline and a lit deck and pergola at one end",
    subject: "House and deck reading as one property rather than two jobs.", ratio: "4/3" },
  /* KEY RENAMED patioRearColour -> patioRearColor with the rest of the spelling pass. The FILE
     on disk keeps its own name: a filename is not user-visible and renaming it would break the
     path for no reader benefit. scripts/photo-keys.mjs fails the build on any page still
     referencing the old key, which is how this rename was checked rather than assumed. */
  patioRearColor: { src: "/img/patio-rear-colour.jpg",
    alt: "The back of an Omaha home at dusk with the roofline in teal and the patio furniture below washed violet",
    subject: "Color in the back garden, where it is actually used.", ratio: "4/3" },

  /* ── LANDSCAPE ── */
  landscapeTreeBeds: { src: "/img/landscape-tree-beds.jpg",
    alt: "A wide Omaha ranch at blue hour, warm white along the roofline and uplights through a bare tree and the planting beds",
    subject: "Roofline and landscape on one controller. The whole-property argument.", ratio: "4/3" },
  landscapeTreeTeal: { src: "/img/landscape-tree-teal.jpg",
    alt: "A large tree uplit in teal beside an Omaha home with a warm lit porch behind it",
    subject: "One uplight doing more work than a whole roofline.", ratio: "3/4" },
  landscapeBrickUplight: { src: "/img/landscape-brick-uplight.jpg",
    alt: "A tall brick Omaha home with white roofline runs, magenta accents on the gables and uplights washing the brick and shrubs",
    subject: "Layers: roofline, accent, uplight, all separately addressed.", ratio: "4/3" },

  /* ── THE EVERYDAY SETTING, ON HOUSES THAT ARE NOT THE ONE IN THE HERO ──
   * The single most common objection to this product is that it looks like Christmas lights
   * in July. The only answer is volume: many houses, many nights, warm white every time. */
  homeShakeBrick: { src: "/img/home-shake-brick.jpg",
    alt: "An Omaha home in shake and brick with a wood garage door, warm white downlights along every eave and gable",
    subject: "Warm white on a traditional elevation.", ratio: "3/4" },
  homeShakeBrickDusk: { src: "/img/home-shake-brick-dusk.jpg",
    alt: "The same shake and brick Omaha home at blue hour with the downlights just come up",
    subject: "Pairs with homeShakeBrick, same house, earlier in the evening.", ratio: "3/4" },
  homeCraftsmanPorch: { src: "/img/home-craftsman-porch.jpg",
    alt: "A craftsman Omaha home at blue hour, warm white along the porch roof and the upper gables",
    subject: "Porch and gable on one run.", ratio: "3/4" },
  homeFarmhouseDark: { src: "/img/home-farmhouse-dark.jpg",
    alt: "A dark-clad modern farmhouse in Omaha with a restrained warm white line along the roof edges",
    subject: "Dark siding. Warm white reads as architecture, not decoration.", ratio: "3/4" },
  homePorchFlag: { src: "/img/home-porch-flag.jpg",
    alt: "A gray Omaha two-story at blue hour with warm downlights over the porch and a flag by the door",
    subject: "The everyday setting on an ordinary street.", ratio: "4/3" },
  homePrairieTwilight: { src: "/img/home-prairie-twilight.jpg",
    alt: "A stucco and stone prairie-style Omaha home at twilight with warm white under the eaves",
    subject: "Civil twilight. The window when this product looks best.", ratio: "4/3" },
  homePrairieEntry: { src: "/img/home-prairie-entry.jpg",
    alt: "The entry of a prairie-style Omaha home at blue hour, warm downlights above and an uplight on the door surround",
    subject: "Roofline plus one uplight on the thing you walk to.", ratio: "3/4" },
  homeFarmhouseMoon: { src: "/img/home-farmhouse-moon.jpg",
    alt: "A white modern farmhouse in Omaha at night under a moon, its rooflines picked out in cool white",
    subject: "Cool white rather than warm, for readers who ask about color temperature.", ratio: "3/4" },
  homeTanSunset: { src: "/img/home-tan-sunset.jpg",
    alt: "A tan Omaha two-story against a sunset with warm white along the gable and eave lines",
    subject: "Sunset, not dark. Shows the run against a bright sky.", ratio: "3/4" },
  homeWhiteTwoStorey: { src: "/img/home-white-two-storey.jpg",
    alt: "A white and gray Omaha two-story lit bright warm white along every roofline",
    subject: "Full brightness on light siding.", ratio: "3/4" },
  homeBrickGablesGold: { src: "/img/home-brick-gables-gold.jpg",
    alt: "A brick Omaha home with several gables all lit warm, the entry glowing behind the glass",
    subject: "A complicated roof. More gables means more corners to get right.", ratio: "4/3" },
  homeEaveDownlights: { src: "/img/home-eave-downlights.jpg",
    alt: "Warm white downlights spaced evenly under the eaves and gable peaks of a modern Omaha farmhouse",
    subject: "Close enough to read the spacing between points.", ratio: "3/4" },
  homeModernStone: { src: "/img/home-modern-stone.jpg",
    alt: "A modern stone and stucco Omaha two-story with warm downlights along the flat roof edges",
    subject: "Flat roof. No gable to hang a line on.", ratio: "4/3" },
  homeWideRanch: { src: "/img/home-wide-ranch.jpg",
    alt: "A wide low Omaha ranch at night with warm white holding a straight line the full length of the roof",
    subject: "The hardest elevation to light. A long straight run shows every sag.", ratio: "4/3" },
  homeRanchBluehour: { src: "/img/home-ranch-bluehour.jpg",
    alt: "A long Omaha ranch at blue hour behind a bare tree, warm white along the whole roofline",
    subject: "Winter blue hour, bare branches, warm run.", ratio: "4/3" },
  homeGreyMoon: { src: "/img/home-grey-moon.jpg",
    alt: "A gray Omaha two-story under a moon with cool white along the rooflines and a truck in the drive",
    subject: "Ordinary evening, ordinary house, lights on.", ratio: "3/4" },
  homeStoneSiding: { src: "/img/home-stone-siding.jpg",
    alt: "A stone and siding Omaha two-story with evenly spaced warm downlights under the eaves",
    subject: "Even spacing across a broken roofline.", ratio: "3/4" },
  homeStuccoStone: { src: "/img/home-stucco-stone.jpg",
    alt: "A stucco and stone Omaha two-story lit warm along the rooflines with a green uplight in the bed below",
    subject: "Warm roofline, one colored uplight. Restraint.", ratio: "4/3" },

  /* ── SCENES, AND WHAT MAKES A GOOD ONE ──
   * Two zones beats one color every time, and these are here to show that rather than say it. */
  sceneWarmBlueBand: { src: "/img/scene-warm-blue-band.jpg",
    alt: "An Omaha home with the gables in warm white and the stone band below in blue",
    subject: "Two zones, two colors. The look most people land on.", ratio: "4/3" },
  sceneAmberCyan: { src: "/img/scene-amber-cyan.jpg",
    alt: "A brick Omaha home with the gable run in amber and the lower run in cyan",
    subject: "Two colors that should clash and do not, because they are on separate zones.", ratio: "4/3" },
  sceneWhiteRedEntry: { src: "/img/scene-white-red-entry.jpg",
    alt: "A wide Omaha ranch in cool white with only the entry alcove washed red",
    subject: "One zone changed and the rest left alone.", ratio: "4/3" },
  sceneRedBlueHalves: { src: "/img/scene-red-blue-halves.jpg",
    alt: "An Omaha two-story with the left half of the elevation in red and the right half in blue",
    subject: "Zones are geographic, not just color-wide.", ratio: "4/3" },
  sceneEaveDownlightsPink: { src: "/img/scene-eave-downlights-pink.jpg",
    alt: "Downlights under the eave of an Omaha home set to a soft pink, each point visible along the run",
    subject: "A single color at low brightness. Close enough to count the points.", ratio: "3/4" },

  /* ── GAME DAY ── */
  gamedayRedFull: { src: "/img/gameday-red-full.jpg",
    alt: "An Omaha two-story washed scarlet across the whole elevation under a moon",
    subject: "Everything red. What people actually ask for on a Saturday.", ratio: "3/4" },
  gamedayRedBlueGables: { src: "/img/gameday-red-blue-gables.jpg",
    alt: "A brick Omaha two-story with one gable in red, another in blue and white along the eaves",
    subject: "Two team colors held apart by zone.", ratio: "4/3" },
  gamedayRedWhiteSplit: { src: "/img/gameday-red-white-split.jpg",
    alt: "An Omaha home with the garage gable in red and the second gable in blue and white, a pickup in the drive",
    subject: "Split colors on one elevation.", ratio: "3/4" },
  gamedayRedGable: { src: "/img/gameday-red-gable.jpg",
    alt: "A deep red wash across the gable and eaves of an Omaha home with a car in the driveway lit red",
    subject: "How far the color spills onto the drive. Honest about brightness.", ratio: "3/4" },
  gamedayRanchWide: { src: "/img/gameday-ranch-wide.jpg",
    alt: "A long Omaha ranch at dusk in red, white and blue along a curved drive",
    subject: "Color across a long low roofline.", ratio: "4/3" },

  /* ── THE FOURTH ── */
  fourthBrickRanch: { src: "/img/fourth-brick-ranch.jpg",
    alt: "A brick Omaha ranch in red, white and blue among trees for the Fourth of July",
    subject: "The one scene nobody hangs bulbs for, because nobody wants to.", ratio: "4/3" },
  fourthRakeLines: { src: "/img/fourth-rake-lines.jpg",
    alt: "Red, white and blue running along the rake and gable lines of an Omaha home against a dusk sky",
    subject: "Shows the line-work itself against sky rather than the house.", ratio: "3/4" },

  /* ── DECEMBER ── */
  christmasBrickTwoStorey: { src: "/img/christmas-brick-two-storey.jpg",
    alt: "A large brick Omaha two-story in alternating red and green with uplights on the planting beds",
    subject: "Christmas with the landscape lighting joining in.", ratio: "4/3" },
  christmasRedGreenGables: { src: "/img/christmas-red-green-gables.jpg",
    alt: "Alternating red and green along every gable and eave of a brick Omaha home",
    subject: "Alternating rather than a single color. Two greens between every red.", ratio: "4/3" },
  christmasWreathsNets: { src: "/img/christmas-wreaths-nets.jpg",
    alt: "An Omaha two-story in red and green with lit wreaths in the windows and net lights over the shrubs",
    subject: "The permanent run alongside the decorations people still put out.", ratio: "3/4" },
  christmasEntryShrubs: { src: "/img/christmas-entry-shrubs.jpg",
    alt: "A stucco Omaha entry in green and red with three round shrubs under net lights and snow on the beds",
    subject: "Snow. This is the month the product earns its keep.", ratio: "3/4" },
  christmasGreenRed: { src: "/img/christmas-green-red.jpg",
    alt: "An Omaha two-story with the main elevation in green and the upper gable in red",
    subject: "Green as the field color rather than an accent.", ratio: "3/4" },
  christmasBoardBatten: { src: "/img/christmas-board-batten.jpg",
    alt: "Red and green points along the gables and porch of a dark board-and-batten Omaha home",
    subject: "Restrained Christmas on modern siding.", ratio: "4/3" },
  christmasBrickGable: { src: "/img/christmas-brick-gable.jpg",
    alt: "Red and green alternating along the gable and eave of a brick Omaha home, close enough to see each point",
    subject: "Close. You can count the bulbs and the gaps.", ratio: "3/4" },

  /* ── OCTOBER ── */
  halloweenOrangePurple: { src: "/img/halloween-orange-purple.jpg",
    alt: "An Omaha two-story in orange and violet with a stone column washed amber for Halloween",
    subject: "October. Orange and violet, no bulbs changed.", ratio: "3/4" },
  halloweenBlueOrange: { src: "/img/halloween-blue-orange.jpg",
    alt: "An Omaha two-story with the lower elevation in violet and the upper gable in orange, a truck in the drive",
    subject: "Second October frame, different house.", ratio: "3/4" },

  /* ── WINTER, WHICH IS THE POINT ──
   * Nobody climbs a ladder in January. These exist so the year-round claim has photographs
   * under it rather than an assertion. */
  winterSnowDusk: { src: "/img/winter-snow-dusk.jpg",
    alt: "A modern Omaha home at dusk above a snow-covered driveway with a warm run along the roofline",
    subject: "Snow on the ground, lights on, nobody on a ladder.", ratio: "4/3" },
  winterGradientSnow: { src: "/img/winter-gradient-snow.jpg",
    alt: "An Omaha ranch in snow with the roofline running through a gradient of colors under a moon",
    subject: "A gradient across one run, in February.", ratio: "4/3" },
  winterRedBlueSnow: { src: "/img/winter-red-blue-snow.jpg",
    alt: "An Omaha home with red and blue gables and the snow in front of it lit blue",
    subject: "Color bouncing off snow, which doubles the effect.", ratio: "3/4" },

  /* ── FROM ABOVE ── */
  aerialRedRoofline: { src: "/img/aerial-red-roofline.jpg",
    alt: "An Omaha home photographed from above at night, the red runs tracing every ridge and valley of the roof",
    subject: "Overhead. The only view that shows the run as a plan drawing.", ratio: "16/9" },

  /* ── THE DAY IT GETS INSTALLED ── */
  installDayGarage: { src: "/img/install-day-garage.jpg",
    alt: "A daytime install at an Omaha home, the garage open and two people working at the front of the house",
    subject: "Daylight, van open, work happening. No hard hats, no staging.", ratio: "3/4" },
  installDayPavilion: { src: "/img/install-day-pavilion.jpg",
    alt: "A ladder against a poolside pavilion at an Omaha home at dusk, the run being fixed along the beam",
    subject: "Mid-install on a structure that is not a house.", ratio: "4/3" },
  walkthroughDusk: { src: "/img/walkthrough-dusk.jpg",
    alt: "Two people standing on a lawn at dusk looking up at an Omaha home lit in blue and red",
    subject: "The handover. Somebody looking at the thing they bought.", ratio: "3/4" },
};

/* scene rail — one real photograph per saved scene. Where a scene has no
 * photograph the rail lights the measured elevation instead, which is honest
 * about being a drawing. We never hue-rotate one photo to fake another color. */
export const sceneImages: Record<string, Slot> = {
  "Everyday Warm White": { src: "/img/scene-warm-white.jpg",
    alt: "An Omaha home and pergola on everyday warm white at dusk", subject: "Base night shot, warm white.", ratio: "16/9" },
  "Husker Red": { src: "/img/scene-husker-red.jpg",
    alt: "An Omaha ranch home with its roofline in scarlet for a Nebraska game day", subject: "Same house, scarlet.", ratio: "16/9" },
  "Halloween": { src: "/img/scene-halloween.jpg",
    alt: "An Omaha home washed violet for Halloween with pumpkins on the steps", subject: "Same house, October scene.", ratio: "16/9" },
  "Christmas": { src: "/img/scene-christmas.jpg",
    alt: "An Omaha roofline alternating red and green for Christmas", subject: "Same house, red/green.", ratio: "16/9" },
  "Fourth of July": { src: "/img/scene-fourth.jpg",
    alt: "An Omaha home in red, white and blue for the Fourth of July", subject: "Same house, RWB.", ratio: "16/9" },
  "Birthday": { src: "/img/scene-birthday.jpg",
    alt: "An Omaha roofline in pink and teal for a birthday", subject: "Same house, pink/multi.", ratio: "16/9" },
  "Game Day": { src: "/img/scene-game-day.jpg",
    alt: "An Omaha ranch home in red over white for game day", subject: "Same house, team colors.", ratio: "16/9" },
  "St. Patrick's Day": { src: "/img/scene-green.jpg",
    alt: "An Omaha ranch home with its roofline in green for St. Patrick's Day", subject: "Same house, green.", ratio: "16/9" },
};

/* /gallery — real installs only, captioned by scene and city, never by address. */
export type GalleryShot = {
  src: string;
  alt: string;
  caption: string;
  scene: string;
  /* `ratio` describes the FILE, not the slot. /gallery renders every card in a grid row at one
   * fixed aspect regardless — see the note on ratioClass there — because a row of mixed
   * orientations stretches to the tallest and leaves the shorter cards holding empty space. This
   * field is here so a lead shot can be given its true aspect and so the manifest stays honest
   * about what each file is. */
  ratio: "16/9" | "21/9" | "4/3" | "3/4";
  span?: boolean;   // full-width feature tile
};

export const galleryShots: GalleryShot[] = [
  { src: "/img/g-moonrise.jpg", span: true, ratio: "21/9", scene: "Blue and white",
    alt: "An Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard",
    caption: "Roofline, gable accents and landscape uplights running as one system. Omaha, Nebraska." },
  { src: "/img/hero-warm-white.jpg", ratio: "16/9", scene: "One soft pink, every run",
    alt: "An Omaha home with every roofline run set to the same soft pink",
    caption: "One saved scene pushed to the whole elevation, gables and eaves together." },
  { src: "/img/hero-game-day.jpg", ratio: "16/9", scene: "Game day",
    alt: "The same Omaha home switched to red and blue",
    caption: "Same house, same fixture, one tap later." },
  { src: "/img/g-gable-detail.jpg", ratio: "16/9", scene: "Channel detail",
    alt: "Close view of the lit channel following two gable edges",
    caption: "The channel follows the gable line. By day it reads as trim." },
  { src: "/img/christmas-detail.jpg", ratio: "16/9", scene: "Christmas",
    alt: "Individual red and green LEDs alternating along the gables of an Omaha home",
    caption: "Close up, you can count the pixels. Alternating red and green, scheduled Thanksgiving to New Year." },
  { src: "/img/g-blue-elevation.jpg", ratio: "16/9", scene: "The whole elevation in the same color",
    alt: "An Omaha home with its whole front elevation in blue",
    caption: "Every zone set to one color, front elevation at full brightness." },
  { src: "/img/scene-birthday.jpg", ratio: "16/9", scene: "Birthday",
    alt: "An Omaha roofline in pink and teal",
    caption: "Set from the app the morning of. Back to warm white the next night." },
  { src: "/img/g-blue-white.jpg", ratio: "16/9", scene: "Color held apart by zone",
    alt: "An Omaha home in blue and white with landscape uplighting",
    caption: "Gables in color, eaves left white: the two-zone look most people land on." },
  { src: "/img/scene-husker-red.jpg", ratio: "16/9", scene: "Scarlet",
    alt: "An Omaha ranch home in scarlet",
    caption: "Scheduled to kickoff, then back to warm white on its own." },
  { src: "/img/scene-green.jpg", ratio: "16/9", scene: "Green",
    alt: "An Omaha ranch home with its roofline in green",
    caption: "One color across roofline and soffit, landscape lights left warm." },
  { src: "/img/g-ranch-blue.jpg", ratio: "16/9", scene: "Ranch elevation",
    alt: "An Omaha ranch home in blue with a lit rock garden",
    caption: "A long ranch elevation. Brightness dialed down so the color stays clean." },
  { src: "/img/scene-halloween.jpg", ratio: "16/9", scene: "Halloween",
    alt: "An Omaha home washed violet for Halloween",
    caption: "October scene, pumpkins included. Ran for the month, unattended." },
  { src: "/img/patio-pergola.jpg", ratio: "16/9", scene: "Pergola and pool deck",
    alt: "A lit pergola, pool deck and fire bowls at an Omaha home at dusk",
    caption: "The same channel run along a pergola fascia. Omaha, Nebraska." },
  { src: "/img/g-pool-red.jpg", ratio: "16/9", scene: "Full red",
    alt: "An Omaha home and pool deck lit red at dusk",
    caption: "House, pergola and pool deck on one scene, one schedule." },
  { src: "/img/g-pool-green.jpg", ratio: "16/9", scene: "Full green",
    alt: "An Omaha home and pool deck lit green at dusk",
    caption: "Same property, same evening, a different saved scene." },
  { src: "/img/g-pool-pink.jpg", ratio: "16/9", scene: "Pink",
    alt: "An Omaha home and pool deck lit pink at dusk",
    caption: "Color is per zone, so the house and the pergola can differ." },
  { src: "/img/scene-fourth.jpg", ratio: "16/9", scene: "Fourth of July",
    alt: "An Omaha home in red, white and blue for the Fourth of July",
    caption: "Red and blue on the gables, white left on the eaves." },
  { src: "/img/g-ranch-blue-white.jpg", ratio: "16/9", scene: "The long ranch line",
    alt: "A long Omaha ranch elevation lit blue and white with landscape uplighting",
    caption: "A low ranch roofline is the hardest to light well, because the run has to hold a straight line for its whole length." },
  { src: "/img/g-pool-blue.jpg", ratio: "16/9", scene: "Whole property, one tap",
    alt: "An Omaha home, pergola and pool deck lit blue at dusk",
    caption: "House, pergola and hardscape all switched together." },
  { src: "/img/scene-game-day.jpg", ratio: "16/9", scene: "Team colors",
    alt: "An Omaha ranch home with its roofline in red over white for game day",
    caption: "Red over white. Any two colors can be saved as their own scene." },
  { src: "/img/scene-warm-white.jpg", ratio: "16/9", scene: "Warm white, whole property",
    alt: "An Omaha home, pergola and pool deck on warm white at dusk",
    caption: "House, pergola and hardscape on the everyday setting." },
  { src: "/img/g-twilight-yard.jpg", ratio: "16/9", scene: "Dusk, lights coming up",
    alt: "An Omaha home at twilight with its lighting just switched on",
    caption: "Dusk trigger. The system comes up on its own as the light drops." },

  /* ── ADDED WITH THE SECOND ARCHIVE ──
   * The everyday-warm-white group on /gallery held exactly one photograph, and the group's own
   * lede said so and argued that admitting it beat padding the group back to three. That was the
   * right call with the archive we had. It is the wrong call now: there are nineteen warm white
   * front elevations in the library, and the group whose argument is "this is the setting you are
   * actually buying" is the one that most needs the volume. Nine of these are warm white. */
  { src: "/img/seq-everyday.jpg", ratio: "16/9", scene: "Warm white, front elevation",
    alt: "A brick and cedar ranch west of Omaha at dusk, its roofline, eaves and garage band on everyday warm white",
    caption: "The everyday setting on a front elevation rather than a back garden. This is what the street sees." },
  { src: "/img/home-shake-brick.jpg", ratio: "3/4", scene: "Warm white, shake and brick",
    alt: "An Omaha home in shake and brick with a wood garage door, warm white downlights along every eave and gable",
    caption: "Downlights under every eave and gable, tucked up out of the sightline." },
  { src: "/img/home-craftsman-porch.jpg", ratio: "3/4", scene: "Warm white, porch and gables",
    alt: "A craftsman Omaha home at blue hour, warm white along the porch roof and the upper gables",
    caption: "Porch roof and upper gables carried on one run, at blue hour." },
  { src: "/img/home-prairie-twilight.jpg", ratio: "4/3", scene: "Warm white, civil twilight",
    alt: "A stucco and stone prairie-style Omaha home at twilight with warm white under the eaves",
    caption: "The twenty minutes after sunset when this product looks best, which is also when we design it." },
  { src: "/img/home-porch-flag.jpg", ratio: "4/3", scene: "Warm white, an ordinary evening",
    alt: "A gray Omaha two-story at blue hour with warm downlights over the porch and a flag by the door",
    caption: "No occasion, no scene, nobody at home looking at it. Most of what this system does." },
  { src: "/img/home-farmhouse-dark.jpg", ratio: "3/4", scene: "Warm white, dark siding",
    alt: "A dark-clad modern farmhouse in Omaha with a restrained warm white line along the roof edges",
    caption: "On dark siding warm white reads as architecture rather than as decoration." },
  { src: "/img/home-brick-gables-gold.jpg", ratio: "4/3", scene: "Warm white, a complicated roof",
    alt: "A brick Omaha home with several gables all lit warm, the entry glowing behind the glass",
    caption: "More gables means more corners, and corners are where an install shows its quality." },
  { src: "/img/home-wide-ranch.jpg", ratio: "4/3", scene: "Warm white, the long line",
    alt: "A wide low Omaha ranch at night with warm white holding a straight line the full length of the roof",
    caption: "A low ranch has nothing to break the run, so the line has to hold for its whole length." },

  { src: "/img/christmas-brick-two-storey.jpg", ratio: "4/3", scene: "December",
    alt: "A large brick Omaha two-story in alternating red and green with uplights on the planting beds",
    caption: "Red and green on the roofline with the landscape lighting joining in on the same scene." },
  { src: "/img/halloween-orange-purple.jpg", ratio: "3/4", scene: "October",
    alt: "An Omaha two-story in orange and violet with a stone column washed amber for Halloween",
    caption: "Orange and violet for the month, scheduled, and switching itself back." },

  { src: "/img/detail-gable-miter.jpg", ratio: "3/4", scene: "The turn at a peak",
    alt: "A lit warm white run following the rake of a gable and turning at the peak on an Omaha home",
    caption: "One continuous line through the turn, with no gap and no doubled-up section. This is the part that fails on a cheap install." },
];

export const img = (key: string): Slot | undefined => images[key];
export const hasPhoto = (key?: string) => !!(key && images[key]?.src);

/* the drop list — what still has to be shot */
export const dropList = () =>
  [...Object.entries(images), ...Object.entries(sceneImages)]
    .filter(([, s]) => !s.src)
    .map(([k, s]) => ({ key: k, subject: s.subject, ratio: s.ratio }));
