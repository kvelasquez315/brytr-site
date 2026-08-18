/* Confirmed facts only. Anything not verified from the client is absent by design.
 * Verified: 177 five-star Google reviews · 5.0 average · 1.2M lights installed locally
 * W2 crews (not subcontracted) · founders Zac Van Buren & Sam Greguska
 * Phone 402-810-3973 · Omaha, NE · carries both Haven Evolution and Jellyfish
 */
export const site = {
  name: "Brytr Co",
  legalName: "Brytr Co",
  tagline: "Disappears by day, wows by night.",
  phone: "402-810-3973",
  phoneHref: "tel:+14028103973",
  city: "Omaha",
  state: "NE",
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
    { figure: "5.0", label: "Average from 177 Google reviews", icon: "stars" },
    { figure: "W2", label: "Crews, never subcontracted", icon: "hardHat" },
    { figure: "25 yr", label: "LED rating on the Signature system", icon: "warranty" },
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
