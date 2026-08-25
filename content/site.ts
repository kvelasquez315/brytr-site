/* Confirmed facts only. Anything not verified from the client is absent by design.
 *
 * Verified: 5.0 average from 201 Google reviews (profile, corrected by the client 25 Aug 2026;
 * the live number lives in content/reviews.ts and nowhere else) · 1.2M lights installed locally
 * · founders Zac Van Buren & Sam Greguska · phone 402-810-3973 · Omaha, NE · carries both Haven
 * Evolution and Jellyfish.
 *
 * REMOVED 25 Aug 2026, because it was never true: "W2 crews (not subcontracted)". The client's
 * crews ARE subcontractors. That claim was mine, it went out across sixteen files, and it was
 * the kind of thing a competitor could have used. The site now says NOTHING about who holds the
 * ladder — at the client's instruction, and it is the right call: a claim that does not exist
 * cannot be wrong. Do not reintroduce a staffing claim of any kind without it in writing.
 *
 * ALSO REMOVED: the whole `stats` array. It was unused by any component, and three of its four
 * entries were false or unverifiable — the W2 line, a hardcoded review count that had already
 * drifted, and "Verified lit after dark and in daylight", which describes something Brytr does
 * not do. Dead code that lies is worse than dead code.
 */
export const site = {
  name: "Brytr Co",
  legalName: "Brytr Co",
  tagline: "Disappears by day, wows by night.",
  phone: "402-810-3973",
  phoneHref: "tel:+14028103973",
  city: "Omaha",
  /* From Brytr's Google Business Profile. A real street address on the site, matching the
   * profile exactly, is what ties the two together for the local pack. */
  address: { street: "13436 C St", city: "Omaha", state: "NE", zip: "68144" },
  state: "NE",
  /* HOURS, CONFIRMED BY THE CLIENT. Nine to nine, six days, closed Sunday. These were absent
   * from the site and from the LocalBusiness schema on purpose: a previous version guessed them,
   * and wrong hours in structured data is worse than none, because Google will show a homeowner
   * a closed sign that is not true. Asked, answered, so they are real now. `openLabel` is the
   * one-line form for the trust bar; `week` is the machine form the schema needs. */
  hours: {
    openLabel: "Open Mon to Sat, 9am to 9pm",
    week: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
    ],
    closed: ["Sunday"],
  },
  region: "Omaha metro, Lincoln, western Iowa and eastern Nebraska",
  url: "https://brytrco.com",
  founders: [
    {
      name: "Zac Van Buren",
      role: "Co-founder",
      handles: ["Design consultations", "Photography and drone work", "Customer walkthroughs"],
    },
    {
      name: "Sam Greguska",
      role: "Co-founder",
      handles: ["Product and manufacturer relationships", "Install standards", "Crew training"],
    },
  ],
  social: {
    facebook: "https://www.facebook.com/BrytrlightingNE",
    instagram: "https://www.instagram.com/brytrco",
  },
} as const;

export const nav = [
  { label: "Lighting Systems", href: "/lighting-systems" },
  { label: "Services", href: "/services" },
  { label: "Compare", href: "/compare" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
] as const;

export const scenes = [
  { name: "Everyday Warm White", dot: "warm" },
  { name: "Husker Red", dot: "red" },
  { name: "Halloween", dot: "orange" },
  { name: "Christmas", dot: "green" },
  { name: "Fourth of July", dot: "blue" },
  { name: "Birthday", dot: "pink" },
  { name: "Game Day", dot: "cool" },
] as const;
