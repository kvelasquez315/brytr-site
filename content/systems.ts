import type { IconKey } from "./icon-map";

export type Spec = { label: string; value: string };
export type System = {
  slug: string;
  name: string;
  maker: string;
  tier: "Component" | "Control";
  short: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  icon: IconKey;
  lede: string;
  specs: Spec[];
  wins: string[];
  limits?: string[];
};

export const systems: System[] = [
  {
    slug: "haven-evolution",
    name: "Haven Lighting Evolution",
    maker: "Haven Lighting",
    tier: "Component",
    short: "The roofline channel and the diodes that sit in it.",
    title: "Haven Evolution: Review and Omaha Install",
    h1: "Haven Lighting Evolution, reviewed by an installer.",
    keyword: "haven lighting",
    volume: "800/mo",
    icon: "wholeHome",
    lede:
      "The manufacturer page. What the hardware actually is, how it is built, and what it is like to live with after two winters in Nebraska.",
    specs: [
      { label: "Manufacturer", value: "Haven Lighting" },
      { label: "LED spacing", value: "4 in." },
      { label: "White channel", value: "Dedicated, not mixed" },
      { label: "Diffuser", value: "Frosted polycarbonate" },
      { label: "App", value: "Haven, iOS and Android" },
      { label: "Weather rating", value: "IP66" },
        ],
    wins: [
      "A dedicated white channel is the single biggest quality difference in this category",
      "Tight LED spacing reads as a line of light, not a string of dots",
      "App is the best of the systems we install",
    ],
    limits: [
      "Highest price of the systems we carry",
      "Overkill on a small single-story roofline",
    ],
  },
  {
    slug: "haven-q-series",
    name: "Haven Q Series",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Soffit and architectural fixtures.",
    title: "Haven Q Series Permanent Lighting",
    h1: "Haven Q Series.",
    keyword: "haven q series",
    icon: "soffit",
    lede: "The soffit and architectural fixture line. Used where the light needs to come from inside the overhang rather than along the trim.",
    specs: [
      { label: "Application", value: "Soffit, recessed, architectural" },
      { label: "Beam options", value: "Multiple angles" },
      { label: "Color range", value: "RGB + warm white" },
      { label: "Control", value: "Same app as Evolution" },
      { label: "Weather rating", value: "Exterior rated" },
    ],
    wins: ["Wall-wash effect a trim light cannot produce", "Shares the app and scenes with the roofline"],
    limits: ["Requires suitable overhang depth", "Not a substitute for roofline trim lighting"],
  },
  {
    slug: "haven-9-series-landscape-lights",
    name: "Haven 9 Series Landscape Lights",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Ground-level path, uplight and bed fixtures.",
    title: "Haven 9 Series Landscape Lighting",
    h1: "Haven 9 Series landscape lighting.",
    keyword: "haven 9 series landscape lights",
    icon: "pathLight",
    lede: "The landscape line. Path lights, uplights and bed washers that run on the same controller and the same app as the roofline.",
    specs: [
      { label: "Application", value: "Path, uplight, bed wash" },
      { label: "Body", value: "Exterior rated housing" },
      { label: "Color range", value: "RGB + warm white" },
      { label: "Control", value: "Same app as the roofline" },
      { label: "Install", value: "Buried low-voltage runs" },
    ],
    wins: ["One app for the whole property", "Scenes span roofline and landscape together"],
    limits: ["Trenching required on established beds", "Separate transformer on larger runs"],
  },
  {
    slug: "haven-x-bistro-lights",
    name: "Haven X Bistro Lights",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Overhead bistro runs for structures.",
    title: "Haven X Bistro Lights | Patio and Pergola | Brytr",
    h1: "Haven X bistro lights.",
    keyword: "haven x bistro lights",
    icon: "pergola",
    lede: "Permanent bistro runs for pergolas, patio covers and gazebos. Rated cable and real terminations, not a seasonal string.",
    specs: [
      { label: "Application", value: "Pergola, patio cover, gazebo" },
      { label: "Bulb", value: "Shatter-resistant LED" },
      { label: "Color range", value: "RGB + warm white" },
      { label: "Control", value: "Same app, own zone" },
      { label: "Cable", value: "Exterior rated, concealed" },
    ],
    wins: ["Stays up through winter", "Dims with the rest of the property"],
    limits: ["Needs a real structure to span", "Not a roofline substitute"],
  },
  {
    slug: "jellyfish-lighting",
    name: "Jellyfish Lighting",
    maker: "Jellyfish Lighting",
    tier: "Component",
    short: "The other permanent system we install.",
    title: "Jellyfish Lighting: Cost, Specs and Honest Review",
    h1: "Jellyfish Lighting: cost, specs, and an honest installer review.",
    keyword: "jellyfish lighting",
    volume: "15,000/mo",
    icon: "twoTiers",
    lede:
      "We install Jellyfish too, which means we have no reason to oversell it and no reason to trash it. Here is what it costs, what it does well, and where it falls short of Haven.",
    specs: [
      { label: "Manufacturer", value: "Jellyfish Lighting" },
      { label: "LED spacing", value: "Wider than Haven Evolution" },
      { label: "White", value: "Color-mixed rather than dedicated" },
      { label: "Diffuser", value: "Channel mounted" },
      { label: "App", value: "Jellyfish app" },
      { label: "Zones", value: "Supported" },
        ],
    wins: [
      "Meaningfully cheaper than Haven Evolution on the same roofline",
      "A genuinely permanent install, not a seasonal product",
      "Widely available, so parts and service are easy",
      "On a simple roofline the difference is hard to see from the street",
    ],
    limits: [
      "Mixed white reads cooler and slightly uneven next to a dedicated white channel",
      "Wider LED spacing is visible on long straight runs",
      "App is workable rather than good",
      "Shorter rated life than Haven Evolution",
    ],
  },
  {
    slug: "app-and-controls",
    name: "App and Controls",
    maker: "Haven",
    tier: "Control",
    short: "Scenes, schedules, zones and dimming.",
    title: "The App: Every Light From Your Phone",
    h1: "Every light, every color, from the couch.",
    keyword: "permanent lighting app",
    icon: "dimmer",
    lede:
      "The part customers actually use every day. Four things matter: saved scenes, sunset scheduling, zoning by elevation, and per-zone dimming.",
    specs: [
      { label: "Platforms", value: "iOS and Android" },
      { label: "Scenes", value: "Unlimited saved" },
      { label: "Scheduling", value: "Sunset relative or fixed" },
      { label: "Zones", value: "Per elevation and per fixture type" },
      { label: "Dimming", value: "1 to 100 percent" },
      { label: "Sharing", value: "Multiple household users" },
    ],
    wins: ["Set it once at handover and never open it again if you like", "Or repaint the house every night"],
    limits: ["Needs home wi-fi at the controller", "One-time setup with our crew is worth doing properly"],
  },
];

export const systemBySlug = (slug: string) => systems.find((s) => s.slug === slug);
