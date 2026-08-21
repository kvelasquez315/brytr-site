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

export type Shot = { photo: string; caption: string };

/* The general pool. Ordered so that adjacent entries differ — a warm white next to a colour
 * scheme next to a detail — because `pick` takes a contiguous window and a run of five warm
 * white front elevations would look like a mistake. */
export const metroShots: Shot[] = [
];
