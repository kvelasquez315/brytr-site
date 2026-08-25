/* REAL REVIEWS. Nothing here is written by us.
 *
 * Source of the rating and the count: Brytr's own Google Business Profile. Read 20 Aug 2026
 * as 196; the client corrected it to 201 on 25 Aug 2026 — "Brytr - Permanent Roofline &
 * Smart Landscape Lighting", 13436 C St, Omaha NE 68144. (Their own site still says "135+"
 * and their Instagram "170+"; the profile is the live number, so it is the one we publish.
 * It only ever goes up — check the profile before quoting it in an ad.)
 *
 * THE COUNT NOW LIVES HERE AND NOWHERE ELSE, and that is the point of this revision. When the
 * client flagged 196 as stale it was hardcoded in five more places: content/site.ts twice,
 * content/badges.ts, app/layout.tsx's meta description, and app/about/page.tsx — where it had
 * already drifted to a completely different number, 177. Six copies of one fact is six chances
 * to be wrong, and it was wrong in two of them before anybody looked. Every one of those now
 * reads `reviewProof.count`.
 *
 * Source of the quoted text: most of these are the testimonials Brytr already publishes on
 * brytrco.com, verbatim. The rest are from the Google profile itself, quoted verbatim from
 * the start of the review, with the reviewer's name as Google shows it and the age Google
 * shows. Nothing is paraphrased, tidied, or lengthened. If a review is edited or removed by
 * its author, delete it from this file.
 *
 * TO CONFIRM WITH BRYTR: this note used to say "five" published and "two" from the profile,
 * which is seven, and there are six reviews here. Whoever assembled the array knows which is
 * which; nobody reading the file afterwards does. Only Meghan Gibbons carries a Google age,
 * so she is certainly one of the profile ones. Rather than guess the split, the page no longer
 * states it. Get the per-review provenance from Brytr and record it here as a field.
 *
 * RULE, unchanged: never write a testimonial. An invented review is a trust problem and
 * an FTC problem, and this section renders a designed proof layout when the array is
 * empty, so there is never a reason to reach for one.
 */
export type Review = {
  text: string;
  name: string;
  when?: string;   // as Google shows it, not a date we computed
  feature?: boolean;
};

export const reviews: Review[] = [
  {
    text:
      "Zac & Sam made this experience the best for us. Very knowledgeable and patient with our questions. Our install went great with great communication on time to start and finish. I just wish I could give more than five stars to Brytr. Thank you!",
    name: "Tim",
    feature: true,
  },
  {
    text:
      "I am so grateful to Zac and Sam with Brytr! Loving the aesthetic, safety, and fun it provides! In the words of our toddler, “Woooooooah!!!! That’s so cool!!!” Truly we can’t see the lights unless we’re looking for them in the daytime.",
    name: "Elizabeth",
  },
  {
    text:
      "We are so happy with our new permanent exterior lighting from Brytr! The finished product is amazing, our house looks incredible, and we’ve already had neighbors calling us to ask who did the work. Brytr is the company to call.",
    name: "Tricia",
  },
  {
    text:
      "We couldn’t be happier with the outdoor lighting Brytr installed for our home! From the initial consultation to the final installation, the entire process was professional, seamless, and exceeded our expectations.",
    name: "Meghan Gibbons",
    when: "2 months ago",
  },
  {
    text:
      "Great company, love my lights! A lot of lighting options. They communicated with me every step of the way, from time they would be out to install to when they would be out and show me how to use the app. Definitely recommend.",
    name: "Antonio",
  },
  {
    text:
      "I had an awesome experience with Brytr in Omaha for my outdoor lighting project. From start to finish, they made the process incredibly easy. Super fast turnaround! I highly recommend Brytr to anyone considering outdoor lighting!",
    name: "Brett",
  },
];

export const reviewProof = {
  average: "5.0",
  count: 201,
  platform: "Google",
  /* the profile itself, so "read them yourself" is a real link */
  url: "https://www.google.com/maps/place/Brytr+-+Permanent+Roofline+%26+Smart+Landscape+Lighting/@41.2226632,-96.1244091,17z",
  checked: "25 Aug 2026",
} as const;
