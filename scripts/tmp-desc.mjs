/* Bring every meta description into 110-165 characters, and fix the city title collision.
 * Delete after running. */
import { readFileSync, writeFileSync } from "node:fs";

const bad = [];
const patch = (file, subs) => {
  let s = readFileSync(file, "utf8");
  for (const [a, b] of subs) {
    if (!s.includes(a)) { bad.push(`${file} :: ${a.slice(0, 62)}`); continue; }
    s = s.split(a).join(b);
  }
  writeFileSync(file, s);
};

/* ── THE TITLE COLLISION ──
 * `Permanent Outdoor Lighting in ${c.name}, ${c.state}` made /service-areas/omaha render exactly
 * the home page's title. Those two pages were then competing for the same query with the same
 * string, and Google picks one and drops the other. City-first also reads better as a local
 * result, and it keeps Council Bluffs - the longest name - at 56 characters. */
patch("app/service-areas/[slug]/page.tsx", [
  ["title: `Permanent Outdoor Lighting in ${c.name}, ${c.state}`,",
   "title: `${c.name} ${c.state} Permanent Lighting Installer`,"],
  /* and the four outstate descriptions that run over */
  ["description: `Permanent outdoor lighting installed in ${c.name}, ${c.state}. Roofline, landscape, hardscape and bistro runs by our own crews. ${c.drive} from the shop. ${reviewProof.average} from ${reviewProof.count} reviews.`,",
   "description: `Permanent outdoor lighting installed in ${c.name}, ${c.state}. Roofline, landscape, hardscape and bistro runs. ${c.drive} from our shop.`,"],
]);

patch("app/services/page.tsx", [
  ["Permanent outdoor lighting services for Omaha homes: roofline, Christmas, soffit, landscape, hardscape, pergola, gameday, commercial and repairs. One channel, one app.",
   "Permanent outdoor lighting for Omaha homes: roofline, Christmas, soffit, landscape, hardscape, pergola and gameday. One channel, one app, installed once."],
]);
patch("app/lighting-systems/page.tsx", [
  ["The permanent lighting we install in Omaha: Haven Evolution on the roofline, the Q Series soffit fixtures, the 9 Series landscape line, the X Bistro overhead runs, and the app that operates all of it.",
   "The permanent lighting we install in Omaha: Haven Evolution on the roofline, Q Series soffit, 9 Series landscape, X Bistro overhead, and the app behind it."],
]);
patch("app/compare/page.tsx", [
  ["The permanent outdoor lighting brands on the Omaha market, compared by an installer who carries two of them and will say which of the rest he would not fit: Haven, Jellyfish, Gemstone, Trimlight, Oelo, EverLights, Minleon, Govee and the OEM supply behind several of them.",
   "The permanent outdoor lighting brands on the Omaha market, compared by an installer who carries two of them: Haven, Jellyfish, Gemstone, Trimlight and more."],
]);
patch("app/service-areas/page.tsx", [
  ["Where Brytr installs permanent outdoor lighting: the Omaha metro, Council Bluffs, Lincoln, Fremont, Ashland, Norfolk, Columbus and Grand Island — with the real drive time from our shop and what each one means for a service call.",
   "Where Brytr installs permanent outdoor lighting: the Omaha metro, Council Bluffs, Lincoln, Norfolk, Columbus and Grand Island, with the real drive to each."],
]);
patch("app/about/page.tsx", [
  ["Brytr Co is Zac Van Buren and Sam Greguska: the whole Haven line rather than one piece of it, the same crew from the measure to the handover, and more than one brand on the truck. Permanent outdoor lighting across the Omaha metro.",
   "The whole Haven line rather than one piece of it, the same crew from the measure to the handover, and more than one brand on the truck. Omaha metro."],
]);
patch("app/how-it-works/page.tsx", [
  ["What actually happens on a Brytr install day in Omaha: the fascia measured off the ladder, channel fastened and sealed as we go, mitered corners, then the daylight curb check and every scene walked with you after dark.",
   "What happens on a Brytr install day in Omaha: fascia measured off the ladder, channel sealed as we go, mitered corners, then the curb check after dark."],
]);
patch("app/warranty/page.tsx", [
  ["What Brytr's permanent lighting warranty covers, what it does not, and who administers the claim: manufacturer coverage on the hardware, Brytr's own coverage on the install, both printed on the quote before you sign.",
   "What the Brytr permanent lighting warranty covers, what it does not, and who administers the claim. All of it printed on your quote before you sign."],
]);
patch("app/gallery/page.tsx", [
  ["Brytr permanent lighting on finished Omaha homes, grouped by what the system is set to: the everyday warm white, saved occasion scenes, one color across every zone, and two-zone splits.",
   "Brytr permanent lighting on finished Omaha homes, grouped by what the system is set to: everyday warm white, saved scenes, and two-zone splits."],
]);
patch("app/recent-projects/page.tsx", [
  /* also fixes "and and" */
  ["Brytr permanent lighting installs in the Omaha metro, photographed on site: a brick two-story, a single-story ranch, a pool house with a freestanding pergola, and and a ranch photographed through every scene from one drone position.",
   "Brytr permanent lighting installs in the Omaha metro, photographed on site: a brick two-story, a single-story ranch, and a pool house with a pergola."],
]);
patch("app/contact/page.tsx", [
  ["Call Brytr Co on 402-810-3973, send a message, or book the on-site design. Permanent outdoor lighting across the Omaha metro, Lincoln, eastern Nebraska and western Iowa.",
   "Call Brytr Co on 402-810-3973, send a message, or book the on-site design. Permanent outdoor lighting across the Omaha metro, Lincoln and western Iowa."],
]);
patch("content/services.ts", [
  ["One aluminum channel routed into the eave, one run of addressable LEDs, one app. It is the flagship system and every other service on this list is a narrower cut of it.",
   "One aluminum channel routed into the eave, one run of addressable LEDs, one app. The flagship system; every other service here is a narrower cut of it."],
]);

/* ── the four that are too SHORT ──
 * Under about 110 characters Google pads the snippet out with whatever text it finds on the page,
 * which means the description stops being the thing you wrote. */
patch("content/blog.ts", [
  ["One is a fixture. The other is a chore with a recurring invoice. Here is the comparison laid out properly.",
   "One is a fixture. The other is a chore with a recurring invoice. The real cost, the real labour and the real difference over ten years, laid out properly."],
]);
patch("app/privacy-policy/page.tsx", [
  ["How Brytr Co collects, uses and stores the information you send through this site.",
   "How Brytr Co collects, uses and stores the information you send through this site, who it is shared with, how long it is kept, and how to ask us to delete it."],
]);
patch("app/terms-of-service/page.tsx", [
  ["The terms that apply to using the Brytr Co website and to requesting a quote.",
   "The terms that apply to using the Brytr Co website and to requesting a quote or a design consultation, including what a published price does and does not commit us to."],
]);
patch("app/accessibility/page.tsx", [
  ["How the Brytr Co website is built for accessibility, and how to tell us about a barrier.",
   "How the Brytr Co website is built for accessibility: the standard we hold it to, what we test, the parts we know are imperfect, and how to tell us about a barrier."],
]);

if (bad.length) { console.error("MISSING:\n" + bad.join("\n")); process.exit(1); }
console.log("descriptions and city titles fixed");
