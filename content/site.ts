/* Confirmed facts only. Anything not verified from the client is absent by design.
 * Verified: 196 five-star Google reviews · 5.0 average (Google Business Profile, 20 Aug 2026) · 1.2M lights installed locally
 * One crew from measure to handover · founders Zac Van Buren & Sam Greguska
 * Phone 402-810-3973 · Omaha, NE · carries both Haven Evolution and Jellyfish
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
  /* Every figure here is confirmed. Do not add one that is not. */
  stats: [
    { figure: "1.2M", label: "Lights installed in Omaha", icon: "installCount" },
    { figure: "5.0", label: "Average from 196 Google reviews", icon: "stars" },
    { figure: "1 crew", label: "From the measure to the handover", icon: "hardHat" },
    /* This slot held "25 yr — LED rating on the Signature system", which was an invented number
     * on an invented tier. It was swapped for IP66, but that rating came out of the same batch
     * of specs I wrote without a source, so it is not safe either. Replaced with the one thing
     * in this row the client confirmed on camera: we do not leave until the customer has seen it
     * both ways. If Haven publishes an ingress rating, put it back with the datasheet to hand. */
    { figure: "2 states", label: "Verified lit after dark and in daylight", icon: "dayNight" },
  ],
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
