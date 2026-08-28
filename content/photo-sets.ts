/* PHOTOGRAPH SETS.
 *
 * Two problems solved in one file.
 *
 * ONE. Almost every page carried a single photograph — the hero — and then several thousand
 * words. The client's note was blunt and correct: pages should not be a picture followed by a
 * wall of text. So most templates now place two or three photographs in the body.
 *
 * TWO. One template generates eighteen city pages, another eleven service pages, another nine
 * system pages. If every one of those pulls the same photograph, the fix makes the sameness
 * problem worse rather than better — eighteen pages that are now identical AND illustrated.
 * So the sets below are pools, and `pick` walks a different window of the pool for every slug.
 *
 * THE CAPTION RULE, which is the whole reason this is a hand-written file and not a loop.
 *
 * These are real installs in the Omaha metro out of Brytr's own library, and for almost none
 * of them do we know which town. That matters: a photograph placed on the Lincoln page must
 * not be captioned as being in Lincoln, and a photograph on the Council Bluffs page must not
 * imply Council Bluffs. So every caption here describes WHAT IS IN THE FRAME and nothing about
 * where it is. The page's own copy carries the city; the photograph carries the light. Where a
 * caption does name a place, it is because the file's own provenance says so.
 *
 * Alt text is not here. It lives once, in content/images.ts, against the file — so a picture
 * cannot end up described as a different picture no matter which page it lands on.
 */

export type Shot = {
  photo: string;
  caption: string;
  /* NAMES THE ONE VARIABLE, and only where a set is genuinely one frame at several settings.
     Its presence is what turns a PhotoStrip into a numbered sequence, so leaving it off is the
     right default: on a set of different houses, numbering invents an order that is not there.
     See the note above the render in components/sections/photo-parts.tsx. */
  scene?: string;
};

/* The general pool. Ordered so that adjacent entries differ — a warm white next to a colour
 * scene next to a detail — because `pick` takes a contiguous window and a run of five warm
 * white front elevations would look like a mistake. */
export const metroShots: Shot[] = [
  { photo: "homeShakeBrick", caption: "Warm white under every eave and gable on a shake-and-brick front. This is the setting the system sits at for most of the year." },
  { photo: "gamedayRedBlueGables", caption: "One gable red, the next blue, eaves left white. Two team colours held apart because they are on separate zones." },
  { photo: "detailGableMiter", caption: "The turn at a gable peak, close. One continuous line with no gap and no overlap is the whole difference between a good install and a cheap one." },
  { photo: "homeWideRanch", caption: "A low ranch is the hardest elevation to light: the run has nothing to break it up, so every sag shows for the full length." },
  { photo: "christmasRedGreenGables", caption: "Red and green alternating along every gable. Nothing was hung for this and nothing comes down in January." },
  { photo: "poolPergolaDusk", caption: "A pool and pergola at sunset, the beam run and the roofline behind it on the same schedule." },
  { photo: "homeFarmhouseDark", caption: "Dark siding, restrained output. Warm white on a modern elevation reads as architecture rather than decoration." },
  { photo: "dayBrickGable", caption: "The same hardware in daylight. Colour matched to the fascia, diffuser facing down, and you have to know it is there to find it." },
  { photo: "landscapeTreeBeds", caption: "Roofline and landscape on one controller, so the beds and the tree come up with the house rather than on their own timer." },
  { photo: "halloweenOrangePurple", caption: "Orange and violet through October, set from the app and scheduled to switch itself back." },
  { photo: "homePrairieTwilight", caption: "Civil twilight, which is the twenty minutes this product looks best." },
  { photo: "patioTimberStone", caption: "A timber and stone patio cover: the run along the beam and the step lights on the stairs are the same system as the roofline." },
  { photo: "winterSnowDusk", caption: "February, snow on the drive, lights on. Nobody went up a ladder to make this happen." },
  { photo: "homeCraftsmanPorch", caption: "Porch roof and upper gables carried on one run at blue hour." },
  { photo: "gamedayRedFull", caption: "Every zone pushed to scarlet. Back to warm white on its own after the game." },
  { photo: "homeEaveDownlights", caption: "Close enough to read the spacing. Even gaps across a broken roofline are set at the measure, not guessed on the day." },
  { photo: "fourthBrickRanch", caption: "Red, white and blue in July: the one scene nobody hangs bulbs for, because nobody wants to." },
  { photo: "homeModernStone", caption: "A flat roof edge with no gable to hang a line on, which is a detailing problem rather than a lighting one." },
  { photo: "christmasWreathsNets", caption: "The permanent run alongside the decorations people still want out. It is not either-or." },
  { photo: "homeRanchBluehour", caption: "A long ranch at blue hour behind a bare tree, warm white holding the whole roofline." },
  { photo: "sceneWarmBlueBand", caption: "Gables warm, the stone band below in blue. Two zones beats one colour on almost every house." },
  { photo: "poolRearWarm", caption: "The back of a house, which is where most of the evening actually happens and where almost nobody photographs." },
  { photo: "dayShakeGable", caption: "Daylight on a second house, so the disappearing act is not one lucky angle." },
  { photo: "homeStoneSiding", caption: "Warm downlights spaced evenly under the eaves of a stone-and-siding front." },
  { photo: "landscapeTreeTeal", caption: "One uplight through a mature tree doing more for a property than a whole roofline would." },
  { photo: "winterGradientSnow", caption: "A gradient run across a single roofline in snow. Every point is addressed separately, so the run can fade rather than step." },
  { photo: "homeBrickGablesGold", caption: "A complicated roof: more gables means more corners, and corners are where installs fail." },
  { photo: "sceneAmberCyan", caption: "Amber over cyan. Two colours that should clash and do not, because neither is on the other's zone." },
  { photo: "homeTanSunset", caption: "Shot against a bright sky rather than a black one, which is the honest test of how much output a run has." },
  { photo: "christmasEntryShrubs", caption: "Green and red at an entry with snow on the beds. December is the month the product earns its keep." },
  { photo: "homeGreyMoon", caption: "An ordinary evening on an ordinary street, which is most of what this system does." },
  { photo: "hardscapeSeatwall", caption: "Lit wall caps in front, a washed porch behind, one scene across both." },
  { photo: "homeFarmhouseMoon", caption: "Cool white rather than warm, for anyone who asks whether the whites are adjustable. They are." },
  { photo: "sceneRedBlueHalves", caption: "Left half red, right half blue. Zones are geographic as well as chromatic." },
  { photo: "deckRanchWarm", caption: "House and deck reading as one property rather than as two jobs done by two trades." },
  { photo: "halloweenBlueOrange", caption: "A second October scene on a different house: violet low, orange on the gable." },
  { photo: "homeStuccoStone", caption: "Warm along the rooflines with a single coloured uplight in the bed. Restraint is a design decision." },
  { photo: "christmasGreenRed", caption: "Green as the field colour with red on the upper gable, rather than the usual alternation." },
  { photo: "homeWhiteTwoStorey", caption: "Full output on light siding, where there is nowhere for a badly aimed diffuser to hide." },
  { photo: "fourthRakeLines", caption: "The line-work itself against a dusk sky. This is what you are actually buying." },
  { photo: "gamedayRanchWide", caption: "Colour across a long low roofline and a curved drive." },
  { photo: "dayStoneGable", caption: "Overcast daylight against stone, which is the hardest surface for a channel to disappear against." },
  { photo: "christmasBoardBatten", caption: "Restrained red and green on modern board-and-batten." },
  { photo: "sceneWhiteRedEntry", caption: "Cool white everywhere and only the entry alcove changed. One zone at a time is a real option." },
  { photo: "patioRearColour", caption: "Colour in the back garden, on the roofline and the furniture below it." },
  { photo: "winterRedBlueSnow", caption: "Colour bouncing off snow, which roughly doubles what you see from the street." },
  { photo: "landscapeBrickUplight", caption: "Roofline, gable accent and uplight, each addressed separately and each doing a different job." },
  { photo: "gamedayRedGable", caption: "How far a saturated colour spills onto a driveway, shown rather than described." },
  { photo: "christmasBrickGable", caption: "Close on a brick gable in December. You can count the points and the gaps between them." },
  { photo: "gamedayRedWhiteSplit", caption: "Split colours across one elevation with the eaves left white to hold the shape of the roof." },
];

/* Windows of the pool, offset by a stable seed so no two slugs open with the same photograph.
 *
 * The seed is a string hash rather than an array index on purpose: adding a city or a service
 * to the middle of a list must not reshuffle every other page's photographs, because the whole
 * point of this is that a returning reader sees the same page they saw last time. */
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003;
  return h;
};

export function pick(seed: string, n: number, pool: Shot[] = metroShots): Shot[] {
  if (pool.length === 0) return [];
  const start = hash(seed) % pool.length;
  /* Stride of 7 rather than 1. A contiguous window would hand one page five warm white front
   * elevations in a row purely because they sit together in the pool; a stride that is coprime
   * with nothing in particular walks across the pool's own alternation instead. */
  const out: Shot[] = [];
  const seen = new Set<number>();
  for (let k = 0; out.length < n && k < pool.length * 2; k++) {
    const i = (start + k * 7) % pool.length;
    if (seen.has(i)) continue;
    seen.add(i);
    out.push(pool[i]);
  }
  return out;
}

/* ── THE NINETY-SECOND SEQUENCE ──
 * One house, one hover point, five states, ninety seconds. This is the only set on the site
 * where the frames are registered against each other, so it is the only set that can be shown
 * as a sequence and described as one. See the provenance note in content/images.ts. */
export const sequence: Shot[] = [
  { photo: "seqSecurity", caption: "Dimmed warm white. Enough to find the door and read the driveway by, which is what most people leave it on." },
  { photo: "seqEveryday", caption: "The everyday setting. Roofline, eaves and the band over the garage, warm and not bright." },
  { photo: "seqWarmChristmas", caption: "The same warm white at full output. For a lot of houses this is the whole Christmas scene." },
  { photo: "seqRedGreen", caption: "Red and green alternating along the roofline. Same fixtures, same evening, one setting changed." },
  { photo: "seqGameday", caption: "Scarlet across the elevation with white held at the peaks, so the roof still reads as a roof." },
];
