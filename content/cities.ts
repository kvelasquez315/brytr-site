export type City = {
  slug: string;
  name: string;
  state: "NE" | "IA";
  tier: "metro" | "outstate" | "iowa";
  drive: string;            // drive time from the Brytr shop
  neighborhoods: string[];  // real subdivisions / districts
  nearby: string[];         // slugs
  note?: string;            // city-specific content slot
};

export const cities: City[] = [
  { slug: "omaha", name: "Omaha", state: "NE", tier: "metro", drive: "In town",
    neighborhoods: ["Dundee", "Aksarben", "Benson", "Regency", "Field Club", "Bemis Park", "Country Club", "Morton Meadows", "Rockbrook", "Keystone"],
    nearby: ["elkhorn", "millard", "papillion", "la-vista", "bellevue", "bennington"],
    note: "West Omaha covenants" },
  { slug: "elkhorn", name: "Elkhorn", state: "NE", tier: "metro", drive: "15 min",
    neighborhoods: ["Elkhorn South", "Skyline Ranches", "Pacific Springs", "The Hamptons", "Indian Creek", "Anchor Pointe"],
    nearby: ["omaha", "millard", "bennington", "gretna", "waterloo", "papillion"] },
  { slug: "millard", name: "Millard", state: "NE", tier: "metro", drive: "18 min",
    neighborhoods: ["Applewood", "Millard Highlands", "Trendwood", "Cimarron Woods", "Deer Creek"],
    nearby: ["omaha", "elkhorn", "la-vista", "papillion", "gretna", "bellevue"] },
  { slug: "papillion", name: "Papillion", state: "NE", tier: "metro", drive: "20 min",
    neighborhoods: ["Shadow Lake", "Settlers Creek", "Walnut Creek", "Eagle Ridge", "Tara Heights"],
    nearby: ["la-vista", "bellevue", "omaha", "millard", "gretna", "springfield"] },
  { slug: "la-vista", name: "La Vista", state: "NE", tier: "metro", drive: "20 min",
    neighborhoods: ["Central Park", "Southport", "Brentwood", "Thompson Creek"],
    nearby: ["papillion", "bellevue", "omaha", "millard", "gretna", "springfield"] },
  { slug: "bellevue", name: "Bellevue", state: "NE", tier: "metro", drive: "25 min",
    neighborhoods: ["Olde Towne", "Twin Creek", "Fontenelle Hills", "Cedar Creek", "Willow Wood"],
    nearby: ["papillion", "la-vista", "omaha", "springfield", "millard", "council-bluffs"] },
  { slug: "gretna", name: "Gretna", state: "NE", tier: "metro", drive: "25 min",
    neighborhoods: ["Remington Ridge", "Prairie Queen", "Thousand Oaks", "Fountain Springs"],
    nearby: ["elkhorn", "millard", "springfield", "papillion", "la-vista", "omaha"] },
  { slug: "bennington", name: "Bennington", state: "NE", tier: "metro", drive: "22 min",
    neighborhoods: ["Newport Landing", "Bennington Lake", "Hawthorne", "Dominion"],
    nearby: ["elkhorn", "omaha", "waterloo", "blair", "millard", "fremont"] },
  { slug: "waterloo", name: "Waterloo", state: "NE", tier: "metro", drive: "25 min",
    neighborhoods: ["Ridgeview", "Riverbend", "Woodcliff"],
    nearby: ["elkhorn", "bennington", "gretna", "fremont", "omaha", "ashland"] },
  { slug: "springfield", name: "Springfield", state: "NE", tier: "metro", drive: "30 min",
    neighborhoods: ["Platteview", "Cedar Ridge", "Beaver Lake"],
    nearby: ["gretna", "papillion", "bellevue", "la-vista", "ashland", "omaha"] },
  { slug: "blair", name: "Blair", state: "NE", tier: "metro", drive: "35 min",
    neighborhoods: ["Deerfield", "Riverview", "Hillcrest"],
    nearby: ["bennington", "omaha", "fremont", "elkhorn", "waterloo", "columbus"] },
  { slug: "council-bluffs", name: "Council Bluffs", state: "IA", tier: "iowa", drive: "20 min",
    neighborhoods: ["Manawa", "Bloomer", "Twin City", "Harvest Hills"],
    nearby: ["omaha", "bellevue", "la-vista", "papillion", "millard", "elkhorn"] },
  { slug: "lincoln", name: "Lincoln", state: "NE", tier: "outstate", drive: "55 min",
    neighborhoods: ["Country Club", "Piedmont", "Near South", "Firethorn", "Wilderness Hills", "Highlands"],
    nearby: ["ashland", "omaha", "springfield", "gretna", "waterloo", "columbus"] },
  { slug: "fremont", name: "Fremont", state: "NE", tier: "outstate", drive: "45 min",
    neighborhoods: ["Ridge Estates", "Somers Point", "Christensen Field"],
    nearby: ["waterloo", "bennington", "blair", "elkhorn", "columbus", "omaha"] },
  { slug: "ashland", name: "Ashland", state: "NE", tier: "outstate", drive: "35 min",
    neighborhoods: ["Iron Horse", "Country View", "Silver Ridge"],
    nearby: ["lincoln", "springfield", "gretna", "waterloo", "omaha", "la-vista"] },
  { slug: "norfolk", name: "Norfolk", state: "NE", tier: "outstate", drive: "1 hr 50 min",
    neighborhoods: ["Country Club", "Ta-Ha-Zouka", "Westview"],
    nearby: ["columbus", "fremont", "blair", "grand-island", "omaha", "lincoln"] },
  { slug: "columbus", name: "Columbus", state: "NE", tier: "outstate", drive: "1 hr 30 min",
    neighborhoods: ["Lost Creek", "Quail Run", "Northgate"],
    nearby: ["norfolk", "fremont", "grand-island", "lincoln", "blair", "omaha"] },
  { slug: "grand-island", name: "Grand Island", state: "NE", tier: "outstate", drive: "2 hr 15 min",
    neighborhoods: ["Indianhead", "Stolley Park", "Sunset"],
    nearby: ["columbus", "norfolk", "lincoln", "fremont", "omaha", "ashland"] },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const metroCities = cities.filter((c) => c.tier === "metro");
export const outstateCities = cities.filter((c) => c.tier === "outstate");
export const iowaCities = cities.filter((c) => c.tier === "iowa");
