/* Image manifest. Every photo slot on the site is declared here and nowhere else.
 *
 * To add a photo: drop the file in /public/img/ and set `src`. The component picks
 * it up on the next build. Until `src` is set, the component renders its no-photo
 * variant, which is a designed, dense state — never a grey placeholder box.
 *
 * Rules: real photography only. No stock, no AI. `alt` must name the city or the
 * service, because these double as SEO signals. Never name a customer's street —
 * these are private homes, so captions stop at the city.
 *
 * Provenance: everything here is developed from Brytr's own drone raws — three
 * completed installs in the Omaha metro, shot Oct 2 / Oct 14 / Oct 19 2025.
 * Exposure brackets were merged and graded; no color was invented or hue-shifted.
 */
export type Slot = {
  src: string | null;
  alt: string;
  subject: string;   // what to shoot, shown to the team in the drop list
  ratio: "16/9" | "4/3" | "21/9" | "4/5" | "1/1";
  priority?: boolean;
};

export const images: Record<string, Slot> = {
  /* the hero pair — the SAME house, the SAME frame, two saved scenes.
   * Registered to the pixel, so the drag handle wipes one into the other. */
  heroWarm: { src: "/img/hero-warm-white.jpg",
    alt: "An Omaha home with Brytr permanent lighting set to everyday warm white",
    subject: "Front elevation, warm white. Pairs with heroScene — same frame.", ratio: "16/9", priority: true },
  heroScene: { src: "/img/hero-game-day.jpg",
    alt: "The same Omaha home with its Brytr lighting switched to red and blue game day colors",
    subject: "Same frame as heroWarm, color scene on.", ratio: "16/9", priority: true },

  channelCloseUp: { src: "/img/channel-detail.jpg",
    alt: "Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave",
    subject: "Tight enough to see the individual LEDs and the channel in the fascia. Nobody in this trade shows the hardware.", ratio: "4/3" },
  crewWide: { src: null, alt: "The Brytr install crew working on an Omaha roofline",
    subject: "Crew on a job, shootable at 21/9 wide. NOT in the drone archive — needs a daytime shoot.", ratio: "21/9" },
  appScreen: { src: null, alt: "The Brytr lighting app showing saved scenes",
    subject: "Phone screenshot of the app scene list.", ratio: "4/5" },

  founderZac: { src: null, alt: "Zac Van Buren, co-founder of Brytr Co", subject: "Portrait, vertical 4/5.", ratio: "4/5" },
  founderSam: { src: null, alt: "Sam Greguska, co-founder of Brytr Co", subject: "Portrait, vertical 4/5.", ratio: "4/5" },

  serviceWholeHome: { src: "/img/whole-home.jpg",
    alt: "Whole-home permanent outdoor lighting on an Omaha house at night, roofline and landscape lit together",
    subject: "Two-story home, full roofline lit.", ratio: "16/9" },
  serviceChristmas: { src: "/img/christmas-detail.jpg",
    alt: "Permanent Christmas lights alternating red and green bulbs along every roofline of an Omaha home",
    subject: "Close enough to see the individual pixels alternating red and green.", ratio: "16/9" },
  servicePatio: { src: "/img/patio-pergola.jpg",
    alt: "Lit pergola, pool deck and fire bowls at an Omaha home at dusk",
    subject: "Pergola or patio cover with the channel run lit at dusk.", ratio: "16/9" },
  serviceRoofline: { src: "/img/roofline-detail.jpg",
    alt: "Brytr channel lighting following the gable and eave lines of an Omaha home",
    subject: "How the channel attaches and turns a corner.", ratio: "16/9" },
  serviceSoffit: { src: "/img/soffit-eaves.jpg",
    alt: "Soffit and eave lighting on an Omaha home, gables in color and eaves left white",
    subject: "Recessed or channel runs under the overhang.", ratio: "16/9" },
  serviceHardscape: { src: "/img/hardscape.jpg",
    alt: "Hardscape lighting washing a limestone retaining wall and pool deck at an Omaha home",
    subject: "Wall washers, step lights, column caps.", ratio: "16/9" },
  serviceGameday: { src: "/img/g-pool-red.jpg",
    alt: "An Omaha home, pergola and pool deck lit scarlet for a Nebraska game day",
    subject: "Team colors across every zone at once.", ratio: "16/9" },
  serviceHoliday: { src: "/img/g-ranch-blue.jpg",
    alt: "An Omaha ranch home set to a full blue seasonal scene, rock garden lit warm below",
    subject: "A saved scene that is not Christmas — one of the 365.", ratio: "16/9" },
  serviceLandscape: { src: "/img/landscape.jpg",
    alt: "Landscape lighting and tree uplighting at an Omaha home after dark",
    subject: "Path lights and a tree uplight after dark.", ratio: "16/9" },
};

/* scene rail — one real photograph per saved scene. Where a scene has no
 * photograph the rail lights the measured elevation instead, which is honest
 * about being a drawing. We never hue-rotate one photo to fake another color. */
export const sceneImages: Record<string, Slot> = {
  "Everyday Warm White": { src: "/img/scene-warm-white.jpg",
    alt: "An Omaha home and pergola on everyday warm white at dusk", subject: "Base night shot, warm white.", ratio: "16/9" },
  "Husker Red": { src: "/img/scene-husker-red.jpg",
    alt: "An Omaha ranch home with its roofline in scarlet for a Nebraska game day", subject: "Same house, scarlet.", ratio: "16/9" },
  "Halloween": { src: "/img/scene-halloween.jpg",
    alt: "An Omaha home washed violet for Halloween with pumpkins on the steps", subject: "Same house, October scene.", ratio: "16/9" },
  "Christmas": { src: "/img/scene-christmas.jpg",
    alt: "An Omaha roofline alternating red and green for Christmas", subject: "Same house, red/green.", ratio: "16/9" },
  "Fourth of July": { src: "/img/scene-fourth.jpg",
    alt: "An Omaha home in red, white and blue for the Fourth of July", subject: "Same house, RWB.", ratio: "16/9" },
  "Birthday": { src: "/img/scene-birthday.jpg",
    alt: "An Omaha roofline in pink and teal for a birthday", subject: "Same house, pink/multi.", ratio: "16/9" },
  "Game Day": { src: "/img/scene-game-day.jpg",
    alt: "An Omaha ranch home in red over white for game day", subject: "Same house, team colors.", ratio: "16/9" },
  "St. Patrick's Day": { src: "/img/scene-green.jpg",
    alt: "An Omaha ranch home with its roofline in green for St. Patrick's Day", subject: "Same house, green.", ratio: "16/9" },
};

/* /gallery — real installs only, captioned by scene and city, never by address. */
export type GalleryShot = {
  src: string;
  alt: string;
  caption: string;
  scene: string;
  ratio: "16/9" | "21/9" | "4/3";
  span?: boolean;   // full-width feature tile
};

export const galleryShots: GalleryShot[] = [
  { src: "/img/g-moonrise.jpg", span: true, ratio: "21/9", scene: "Blue and white",
    alt: "An Omaha home lit blue and white under a rising moon, with an uplit tree in the front yard",
    caption: "Roofline, gable accents and landscape uplights running as one system. Omaha, Nebraska." },
  { src: "/img/hero-warm-white.jpg", ratio: "16/9", scene: "Everyday warm white",
    alt: "An Omaha home on everyday warm white",
    caption: "The setting most customers leave on year round." },
  { src: "/img/hero-game-day.jpg", ratio: "16/9", scene: "Game day",
    alt: "The same Omaha home switched to red and blue",
    caption: "Same house, same fixture, one tap later." },
  { src: "/img/g-gable-detail.jpg", ratio: "16/9", scene: "Channel detail",
    alt: "Close view of the lit channel following two gable edges",
    caption: "The channel follows the gable line. By day it reads as trim." },
  { src: "/img/christmas-detail.jpg", ratio: "16/9", scene: "Christmas",
    alt: "Individual red and green LEDs alternating along the gables of an Omaha home",
    caption: "Close up, you can count the pixels. Alternating red and green, scheduled Thanksgiving to New Year." },
  { src: "/img/g-blue-elevation.jpg", ratio: "16/9", scene: "One color, every zone",
    alt: "An Omaha home with its whole front elevation in blue",
    caption: "Every zone set to one color, front elevation at full brightness." },
  { src: "/img/scene-birthday.jpg", ratio: "16/9", scene: "Birthday",
    alt: "An Omaha roofline in pink and teal",
    caption: "Set from the app the morning of. Back to warm white the next night." },
  { src: "/img/g-blue-white.jpg", ratio: "16/9", scene: "Two zones, two colors",
    alt: "An Omaha home in blue and white with landscape uplighting",
    caption: "Gables in color, eaves left white — the two-zone look most people land on." },
  { src: "/img/scene-husker-red.jpg", ratio: "16/9", scene: "Scarlet",
    alt: "An Omaha ranch home in scarlet",
    caption: "Scheduled to kickoff, then back to warm white on its own." },
  { src: "/img/scene-green.jpg", ratio: "16/9", scene: "Green",
    alt: "An Omaha ranch home with its roofline in green",
    caption: "One color across roofline and soffit, landscape lights left warm." },
  { src: "/img/g-ranch-blue.jpg", ratio: "16/9", scene: "Ranch elevation",
    alt: "An Omaha ranch home in blue with a lit rock garden",
    caption: "A long ranch elevation. Brightness dialed down so the color stays clean." },
  { src: "/img/scene-halloween.jpg", ratio: "16/9", scene: "Halloween",
    alt: "An Omaha home washed violet for Halloween",
    caption: "October scene, pumpkins included. Ran for the month, unattended." },
  { src: "/img/patio-pergola.jpg", ratio: "16/9", scene: "Pergola and pool deck",
    alt: "A lit pergola, pool deck and fire bowls at an Omaha home at dusk",
    caption: "The same channel run along a pergola fascia. Omaha, Nebraska." },
  { src: "/img/g-pool-red.jpg", ratio: "16/9", scene: "Full red",
    alt: "An Omaha home and pool deck lit red at dusk",
    caption: "House, pergola and pool deck on one scene, one schedule." },
  { src: "/img/g-pool-green.jpg", ratio: "16/9", scene: "Full green",
    alt: "An Omaha home and pool deck lit green at dusk",
    caption: "Same property, same evening, a different saved scene." },
  { src: "/img/g-pool-pink.jpg", ratio: "16/9", scene: "Pink",
    alt: "An Omaha home and pool deck lit pink at dusk",
    caption: "Color is per zone, so the house and the pergola can differ." },
  { src: "/img/scene-fourth.jpg", ratio: "16/9", scene: "Fourth of July",
    alt: "An Omaha home in red, white and blue for the Fourth of July",
    caption: "Red and blue on the gables, white left on the eaves." },
  { src: "/img/g-ranch-blue-white.jpg", ratio: "16/9", scene: "The long ranch line",
    alt: "A long Omaha ranch elevation lit blue and white with landscape uplighting",
    caption: "A low ranch roofline is the hardest to light well — the run has to hold a straight line for its whole length." },
  { src: "/img/g-pool-blue.jpg", ratio: "16/9", scene: "Whole property, one tap",
    alt: "An Omaha home, pergola and pool deck lit blue at dusk",
    caption: "House, pergola and hardscape all switched together." },
  { src: "/img/scene-game-day.jpg", ratio: "16/9", scene: "Team colors",
    alt: "An Omaha ranch home with its roofline in red over white for game day",
    caption: "Red over white. Any two colors can be saved as their own scene." },
  { src: "/img/scene-warm-white.jpg", ratio: "16/9", scene: "Warm white, whole property",
    alt: "An Omaha home, pergola and pool deck on warm white at dusk",
    caption: "House, pergola and hardscape on the everyday setting." },
  { src: "/img/g-twilight-yard.jpg", ratio: "16/9", scene: "Dusk, lights coming up",
    alt: "An Omaha home at twilight with its lighting just switched on",
    caption: "Dusk trigger. The system comes up on its own as the light drops." },
];

export const img = (key: string): Slot | undefined => images[key];
export const hasPhoto = (key?: string) => !!(key && images[key]?.src);

/* the drop list — what still has to be shot */
export const dropList = () =>
  [...Object.entries(images), ...Object.entries(sceneImages)]
    .filter(([, s]) => !s.src)
    .map(([k, s]) => ({ key: k, subject: s.subject, ratio: s.ratio }));
