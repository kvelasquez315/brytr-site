/* REVIEW TEXT IS NOT SEEDED ON PURPOSE.
 *
 * Confirmed and safe to display: 177 five-star Google reviews, 5.0 average.
 * NOT confirmed: any individual review's wording, reviewer name, or town.
 *
 * Writing plausible testimonials would be fabricating social proof, which is both
 * a trust problem and an FTC problem. So this array ships empty and the Reviews
 * section renders the confirmed-proof layout instead. Paste real Google review
 * text in here and the section switches to review cards automatically.
 */
export type Review = { text: string; name: string; town: string; stars: 5 | 4 | 3 | 2 | 1 };

export const reviews: Review[] = [];

export const reviewProof = {
  average: "5.0",
  count: 177,
  platform: "Google",
} as const;
