export type City = {
  slug: string;
  name: string;
  state: "NE" | "IA";
  tier: "metro" | "outstate" | "iowa";
  drive: string;            // drive time from the Brytr shop
  /* Real coordinates, so the service-area map is plotted rather than eyeballed. Simple
   * equirectangular projection — relative positions are correct, which is the only claim
   * the drawing makes. It is a service-area diagram, not a survey. */
  lat: number;
  lon: number;
  neighborhoods: string[];  // real subdivisions / districts
  nearby: string[];         // slugs
  note?: string;            // city-specific content slot
};

export const cities: City[] = [
  { slug: "omaha", name: "Omaha", state: "NE", tier: "metro", drive: "In town", lat: 41.257, lon: -95.938,
    neighborhoods: ["Dundee", "Aksarben", "Benson", "Regency", "Field Club", "Bemis Park", "Country Club", "Morton Meadows", "Rockbrook", "Keystone"],
    nearby: ["elkhorn", "millard", "papillion", "la-vista", "bellevue", "bennington"],
    note: "West Omaha covenants" },
  { slug: "elkhorn", name: "Elkhorn", state: "NE", tier: "metro", drive: "15 min", lat: 41.288, lon: -96.236,
    neighborhoods: ["Elkhorn South", "Skyline Ranches", "Pacific Springs", "The Hamptons", "Indian Creek", "Anchor Pointe"],
    nearby: ["omaha", "millard", "bennington", "gretna", "waterloo", "papillion"] },
  { slug: "millard", name: "Millard", state: "NE", tier: "metro", drive: "18 min", lat: 41.205, lon: -96.131,
    neighborhoods: ["Applewood", "Millard Highlands", "Trendwood", "Cimarron Woods", "Deer Creek"],
    nearby: ["omaha", "elkhorn", "la-vista", "papillion", "gretna", "bellevue"] },
  { slug: "papillion", name: "Papillion", state: "NE", tier: "metro", drive: "20 min", lat: 41.154, lon: -96.043,
    neighborhoods: ["Shadow Lake", "Settlers Creek", "Walnut Creek", "Eagle Ridge", "Tara Heights"],
    nearby: ["la-vista", "bellevue", "omaha", "millard", "gretna", "springfield"] },
  { slug: "la-vista", name: "La Vista", state: "NE", tier: "metro", drive: "20 min", lat: 41.183, lon: -96.031,
    neighborhoods: ["Central Park", "Southport", "Brentwood", "Thompson Creek"],
    nearby: ["papillion", "bellevue", "omaha", "millard", "gretna", "springfield"] },
  { slug: "bellevue", name: "Bellevue", state: "NE", tier: "metro", drive: "25 min", lat: 41.137, lon: -95.911,
    neighborhoods: ["Olde Towne", "Twin Creek", "Fontenelle Hills", "Cedar Creek", "Willow Wood"],
    nearby: ["papillion", "la-vista", "omaha", "springfield", "millard", "council-bluffs"] },
  { slug: "gretna", name: "Gretna", state: "NE", tier: "metro", drive: "25 min", lat: 41.14, lon: -96.24,
    neighborhoods: ["Remington Ridge", "Prairie Queen", "Thousand Oaks", "Fountain Springs"],
    nearby: ["elkhorn", "millard", "springfield", "papillion", "la-vista", "omaha"] },
  { slug: "bennington", name: "Bennington", state: "NE", tier: "metro", drive: "22 min", lat: 41.364, lon: -96.157,
    neighborhoods: ["Newport Landing", "Bennington Lake", "Hawthorne", "Dominion"],
    nearby: ["elkhorn", "omaha", "waterloo", "blair", "millard", "fremont"] },
  { slug: "waterloo", name: "Waterloo", state: "NE", tier: "metro", drive: "25 min", lat: 41.272, lon: -96.281,
    neighborhoods: ["Ridgeview", "Riverbend", "Woodcliff"],
    nearby: ["elkhorn", "bennington", "gretna", "fremont", "omaha", "ashland"] },
  { slug: "springfield", name: "Springfield", state: "NE", tier: "metro", drive: "30 min", lat: 41.08, lon: -96.135,
    neighborhoods: ["Platteview", "Cedar Ridge", "Beaver Lake"],
    nearby: ["gretna", "papillion", "bellevue", "la-vista", "ashland", "omaha"] },
  { slug: "blair", name: "Blair", state: "NE", tier: "metro", drive: "35 min", lat: 41.544, lon: -96.125,
    neighborhoods: ["Deerfield", "Riverview", "Hillcrest"],
    nearby: ["bennington", "omaha", "fremont", "elkhorn", "waterloo", "columbus"] },
  { slug: "council-bluffs", name: "Council Bluffs", state: "IA", tier: "iowa", drive: "20 min", lat: 41.262, lon: -95.861,
    neighborhoods: ["Manawa", "Bloomer", "Twin City", "Harvest Hills"],
    nearby: ["omaha", "bellevue", "la-vista", "papillion", "millard", "elkhorn"] },
  { slug: "lincoln", name: "Lincoln", state: "NE", tier: "outstate", drive: "55 min", lat: 40.813, lon: -96.702,
    neighborhoods: ["Country Club", "Piedmont", "Near South", "Firethorn", "Wilderness Hills", "Highlands"],
    nearby: ["ashland", "omaha", "springfield", "gretna", "waterloo", "columbus"] },
  { slug: "fremont", name: "Fremont", state: "NE", tier: "outstate", drive: "45 min", lat: 41.433, lon: -96.498,
    neighborhoods: ["Ridge Estates", "Somers Point", "Christensen Field"],
    nearby: ["waterloo", "bennington", "blair", "elkhorn", "columbus", "omaha"] },
  { slug: "ashland", name: "Ashland", state: "NE", tier: "outstate", drive: "35 min", lat: 41.039, lon: -96.369,
    neighborhoods: ["Iron Horse", "Country View", "Silver Ridge"],
    nearby: ["lincoln", "springfield", "gretna", "waterloo", "omaha", "la-vista"] },
  { slug: "norfolk", name: "Norfolk", state: "NE", tier: "outstate", drive: "1 hr 50 min", lat: 42.029, lon: -97.417,
    neighborhoods: ["Country Club", "Ta-Ha-Zouka", "Westview"],
    nearby: ["columbus", "fremont", "blair", "grand-island", "omaha", "lincoln"] },
  { slug: "columbus", name: "Columbus", state: "NE", tier: "outstate", drive: "1 hr 30 min", lat: 41.43, lon: -97.367,
    neighborhoods: ["Lost Creek", "Quail Run", "Northgate"],
    nearby: ["norfolk", "fremont", "grand-island", "lincoln", "blair", "omaha"] },
  { slug: "grand-island", name: "Grand Island", state: "NE", tier: "outstate", drive: "2 hr 15 min", lat: 40.925, lon: -98.342,
    neighborhoods: ["Indianhead", "Stolley Park", "Sunset"],
    nearby: ["columbus", "norfolk", "lincoln", "fremont", "omaha", "ashland"] },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const metroCities = cities.filter((c) => c.tier === "metro");
export const outstateCities = cities.filter((c) => c.tier === "outstate");
export const iowaCities = cities.filter((c) => c.tier === "iowa");
