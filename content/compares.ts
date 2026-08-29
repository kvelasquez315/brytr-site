export type Row = { spec: string; a: string; b: string };
export type Compare = {
  slug: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  a: string;            // left product
  b: string;            // right product
  verdict: string;      // the answer, above the fold
  aWins: string[];
  bWins: string[];
  aWinsHead: string;
  bWinsHead: string;
  rows: Row[];
  costA: string;
  costB: string;
  neutral?: boolean;    // Brytr in neither corner
  labor?: boolean;     // DIY vs pro framing
};

const havenRows = (bName: string, b: Partial<Record<string, string>>): Row[] => [
  { spec: "Manufacturer", a: "Haven Lighting", b: b.maker ?? bName },
  { spec: "LED spacing", a: "4 in.", b: b.spacing ?? "Wider" },
  { spec: "White channel", a: "Dedicated warm white", b: b.white ?? "Color-mixed" },
  { spec: "Color range", a: "RGB + dedicated white", b: b.color ?? "RGB" },
  /* WAS a: "Extruded aluminum, color matched". Brytr does not colour match the channel, and this
     row was setting that against "Aluminum, stock finishes" on the competitor - so it claimed a
     difference that does not exist. The real difference on our side is that it is a rigid
     extrusion that gets screwed on. 29 Aug 2026. */
  { spec: "Channel profile", a: "Extruded aluminum, screw-fixed", b: b.channel ?? "Aluminum, stock finishes" },
  { spec: "App quality", a: "Best of the systems we install", b: b.app ?? "Workable" },
  { spec: "Scene programming", a: "Unlimited saved scenes", b: b.scenes ?? "Supported" },
  { spec: "Zoning", a: "Unlimited, per elevation", b: b.zones ?? "Supported, fewer" },
  { spec: "Dimming", a: "1 to 100 percent per zone", b: b.dim ?? "Supported" },
  { spec: "Weather rating", a: "IP66", b: b.ip ?? "Sealed channel" },
  /* THE "Rated LED life | 25 years | Shorter" ROW IS GONE, 28 Aug 2026. The 25-year figure was
     invented - see the note on `stats` in content/site.ts, where the same number was removed for
     the same reason - and once our own column is a guess, the row cannot be repaired by softening
     the competitor's. If Haven publishes a rated life, it goes back with the datasheet to hand. */
  { spec: "Professionally installed", a: "Yes, by us", b: b.install ?? "Varies by dealer" },
  { spec: "Price tier", a: "Premium", b: b.price ?? "Lower" },
];

export const compares: Compare[] = [
  {
    slug: "haven-vs-jellyfish-lighting",
    title: "Haven Evolution vs Jellyfish Lighting",
    h1: "Haven Evolution versus Jellyfish, compared by an installer who sells both.",
    keyword: "haven lighting vs jellyfish",
    a: "Haven Evolution", b: "Jellyfish Lighting",
    verdict:
      "We install both. On a large or complex roofline, Haven Evolution is worth the difference. On a simple one-story or a tighter budget, Jellyfish is the honest answer.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose Jellyfish if",
    aWins: [
      "You will use warm white as your everyday setting",
      "You have long straight runs where LED spacing shows",
      "You want the deepest zoning and scheduling",
      "You are staying in the house a long time",
    ],
    bWins: [
      "Budget is the deciding constraint and you still want permanent",
      "Your roofline is simple and single-story",
      "You mostly want color scenes, not perfect white",
      "You would rather spend the difference on landscape lighting",
    ],
    rows: havenRows("Jellyfish Lighting", {}),
    costA: "Premium tier", costB: "Value tier",
  },
  {
    slug: "haven-vs-gemstone-lights",
    title: "Haven Evolution vs Gemstone Lights",
    h1: "Haven Evolution versus Gemstone Lights.",
    keyword: "gemstone lights",
    volume: "1,900/mo",
    a: "Haven Evolution", b: "Gemstone Lights",
    verdict:
      "Gemstone is a real competitor with a well-known name and a good track record. The decision usually comes down to white quality and who is on the ladder, not the brand on the box.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose Gemstone if",
    aWins: ["Dedicated white channel matters to you", "You want a local company accountable for the install and the service", "You want the deeper app"],
    bWins: ["You already have a Gemstone dealer you trust", "Their channel profile suits your fascia better", "Their pricing lands better for your run length"],
    rows: havenRows("Gemstone Lights", { maker: "Gemstone Lights", app: "Good", price: "Comparable" }),
    costA: "Premium tier", costB: "Comparable",
  },
  {
    slug: "haven-vs-trimlight",
    title: "Haven Evolution vs Trimlight",
    h1: "Haven Evolution versus Trimlight.",
    keyword: "trimlight",
    volume: "1,700/mo",
    a: "Haven Evolution", b: "Trimlight",
    verdict:
      "Trimlight is a large national franchise, which cuts both ways: consistent product, but your experience depends entirely on which franchisee shows up. We are one crew, in one market, and you can ask your neighbor about us.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose Trimlight if",
    aWins: ["You want a local owner accountable for the install", "Dedicated white channel", "One app across roofline and landscape"],
    bWins: ["Your local franchisee has strong reviews", "You are moving and want a brand that exists elsewhere"],
    rows: havenRows("Trimlight", { maker: "Trimlight", app: "Good", install: "Franchise dependent", price: "Comparable" }),
    costA: "Premium tier", costB: "Comparable",
  },
  {
    slug: "haven-vs-oelo",
    title: "Haven Evolution vs Oelo Lighting",
    h1: "Haven Evolution versus Oelo.",
    keyword: "oelo lighting",
    a: "Haven Evolution", b: "Oelo",
    verdict:
      "Oelo sells locally and makes a solid product with a distinctive channel. If you have seen an Oelo install you liked, the honest comparison is white quality and app depth.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose Oelo if",
    aWins: ["Dedicated white channel", "Deeper app and zoning", "We install it and we service it"],
    bWins: ["You prefer their channel profile", "You want a specific Oelo color option", "Their local pricing works better for you"],
    rows: havenRows("Oelo", { maker: "Oelo", price: "Comparable" }),
    costA: "Premium tier", costB: "Comparable",
  },
  {
    slug: "haven-vs-govee",
    title: "Haven vs Govee: DIY Kit or Pro Install?",
    h1: "Haven versus Govee: a professional install or a DIY kit.",
    keyword: "govee permanent outdoor lights",
    volume: "36,000/mo",
    labor: true,
    a: "Brytr professional install", b: "Govee DIY kit",
    verdict:
      "This is not really a brand comparison, it is a labor comparison. A Govee kit costs a fraction of a professional install and you will be on a ladder at the roofline drilling into your own fascia. Some people should absolutely do that. Most should not.",
    aWinsHead: "Choose a professional install if",
    bWinsHead: "Choose a DIY kit if",
    aWins: [
      "You are not comfortable at roof height",
      "You want the channel screwed into the fascia rather than stuck to it",
      "You want one number to call when a section dies",
      "You care what it looks like in daylight",
    ],
    bWins: [
      "You genuinely enjoy this kind of project",
      "You have a single-story ranch with easy access",
      "You are testing the idea before committing",
      "Budget is the only consideration",
    ],
    rows: [
      { spec: "Who installs it", a: "Brytr", b: "You" },
      { spec: "Ladder time", a: "None for you", b: "A full weekend, at height" },
      { spec: "Channel", a: "Extruded aluminum, screw-fixed", b: "Adhesive or clip mount" },
      { spec: "Daylight appearance", a: "Hidden in the eave", b: "Usually visible" },
      { spec: "Wire management", a: "Concealed", b: "Your problem" },
      /* WAS "Corners and transitions | Cut and sealed on site | Bend and hope". Our half implied a
         mitre and their half mocked bending the channel around a corner, which is what we do. Both
         sides of a comparison row have to be true. 29 Aug 2026. */
      { spec: "Terminations", a: "Capped and sealed on site", b: "Whatever is in the box" },
          { spec: "If a section fails", a: "We come out", b: "Back on the ladder" },
      { spec: "Weather rating", a: "IP66 channel system", b: "Varies by kit" },
      { spec: "App", a: "Haven, purpose built", b: "Govee, general purpose" },
      { spec: "Resale appeal", a: "Reads as a building feature", b: "Reads as a gadget" },
      { spec: "Cost", a: "Premium tier", b: "A fraction of it" },
    ],
    costA: "Premium tier", costB: "Consumer kit pricing",
  },
  {
    slug: "haven-vs-minleon-rainmin",
    title: "Haven Evolution vs Minleon and Rainmin",
    h1: "Haven Evolution versus Minleon and Rainmin.",
    keyword: "minleon",
    volume: "350/mo",
    a: "Haven Evolution", b: "Minleon / Rainmin",
    verdict:
      "Minleon and Rainmin are installer-channel products, common on professionally installed holiday displays. Strong for animated color work, less aimed at the everyday warm-white use case that most homeowners actually live in.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose Minleon or Rainmin if",
    aWins: ["Everyday warm white is the point", "You want the architectural look in daylight", "You want one app for everything"],
    bWins: ["You want elaborate animated holiday shows", "You already run a display and want to extend it", "Your installer specializes in that ecosystem"],
    rows: havenRows("Minleon / Rainmin", { maker: "Minleon / Rainmin", white: "Color-mixed", app: "Show-oriented", price: "Varies" }),
    costA: "Premium tier", costB: "Varies by installer",
  },
  {
    slug: "haven-vs-ghouly",
    title: "Haven vs Ghouly: Who Makes the Lights?",
    h1: "Who actually manufactures your permanent lights?",
    keyword: "who makes permanent lights",
    a: "Haven Evolution", b: "Ghouly and other OEM supply",
    verdict:
      "Most permanent lighting sold in the US comes off the same handful of overseas production lines, Ghouly among them. What you are actually buying is the channel, the controller, the app and the crew. Not the LED.",
    aWinsHead: "What a branded system buys you",
    bWinsHead: "What white-label supply buys you",
    aWins: [
      "Somebody local to call when it needs looking at",
      "A controller and app under active development",
      "Consistent channel extrusion and finishes",
      "An installer network with training standards",
    ],
    bWins: [
      "A lower material cost, sometimes much lower",
      "The same LED chips as branded product in some cases",
      "Freedom for an installer to price aggressively",
      "Fine if your installer is genuinely good and sticks around",
    ],
    rows: [
      { spec: "Who makes the LED", a: "Contract manufactured to Haven spec", b: "Often the same lines" },
          { spec: "Controller", a: "Haven, actively developed", b: "Generic, varies" },
      { spec: "App", a: "Purpose built, updated", b: "Whatever ships with the controller" },
      { spec: "Channel extrusion", a: "Consistent profile and finishes", b: "Varies batch to batch" },
      { spec: "Color consistency across runs", a: "Binned and matched", b: "Not guaranteed" },
      { spec: "Replacement parts in 5 years", a: "Supported line", b: "Uncertain" },
      { spec: "Install standards", a: "Trained network", b: "Installer dependent" },
      { spec: "Price", a: "Premium", b: "Lowest" },
    ],
    costA: "Premium tier", costB: "Lowest material cost",
  },
  {
    slug: "haven-vs-everlights",
    title: "Haven Evolution vs EverLights",
    h1: "Haven Evolution versus EverLights.",
    keyword: "everlights permanent lighting",
    a: "Haven Evolution", b: "EverLights",
    verdict:
      "EverLights was one of the first names in permanent lighting and still shapes how people search for the category. The comparison is mature product versus current hardware.",
    aWinsHead: "Choose Haven Evolution if",
    bWinsHead: "Choose EverLights if",
    aWins: ["Current generation LED density and white quality", "Deeper app", "Local crew accountable for the work"],
    bWins: ["You want the established category name", "You have seen an install you liked", "Their dealer coverage suits you"],
    rows: havenRows("EverLights", { maker: "EverLights", app: "Mature", price: "Comparable" }),
    costA: "Premium tier", costB: "Comparable",
  },
  {
    slug: "jellyfish-vs-gemstone-lights",
    title: "Jellyfish vs Gemstone: Honest Comparison",
    h1: "Jellyfish versus Gemstone Lights.",
    keyword: "gemstone vs jellyfish lighting",
    volume: "150/mo",
    neutral: true,
    a: "Jellyfish Lighting", b: "Gemstone Lights",
    verdict:
      "Neither of these is our premium system, so we have no dog in this fight. Jellyfish is usually the cheaper install and easier to find a dealer for. Gemstone usually has the better channel and the better white. If you are choosing between just these two, the deciding factor is which local installer you trust.",
    aWinsHead: "Jellyfish tends to win on",
    bWinsHead: "Gemstone tends to win on",
    aWins: ["Install cost", "Dealer availability", "Parts and service access", "Simple rooflines"],
    bWins: ["Channel profile and finish", "White quality", "Perceived build quality", "Long straight runs"],
    rows: [
      { spec: "Manufacturer", a: "Jellyfish Lighting", b: "Gemstone Lights" },
      { spec: "LED spacing", a: "Wider", b: "Tighter" },
      { spec: "White", a: "Color-mixed", b: "Better than Jellyfish" },
      { spec: "Channel profile", a: "Standard", b: "Slimmer, better finished" },
      { spec: "App", a: "Workable", b: "Good" },
      { spec: "Dealer network", a: "Broad", b: "Narrower" },
      { spec: "Typical install cost", a: "Lower", b: "Higher" },
      { spec: "Brytr carries it", a: "Yes, we install it", b: "No" },
    ],
    costA: "Value tier", costB: "Mid tier",
  },
];

export const compareBySlug = (slug: string) => compares.find((c) => c.slug === slug);
