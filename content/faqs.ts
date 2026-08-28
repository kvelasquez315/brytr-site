export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "Can you actually see it during the day?",
    a: "Barely, and that is the whole point. The channel is extruded aluminum color matched to your fascia and it sits tucked into the eave line. From the street in daylight it reads as trim. Ask us to show you a daytime photo of a house we finished on your own block." },
  /* "What does it cost?" WAS HERE and is gone. It stated a pricing model - by linear foot plus
   * complexity - and then pointed at /pricing to "publish real ranges", which was a page of
   * invented figures. Removed 27 Aug 2026 with the page. When Brytr gives us a real basis this
   * question is the single most valuable one on the site and should come back first. Until then
   * the honest answer is a phone call, which is what /contact is for. */
  { q: "Does it damage my soffit or fascia?",
    a: "It fastens into the fascia board, not through the shingles, and every penetration is sealed. Done correctly it is no more invasive than hanging a gutter. Done badly it is a leak, so every penetration on your house is sealed as it is made and checked before we leave." },
  { q: "What happens when a section stops working?",
    a: "You call us and we come out. We are the ones who installed it and we hold the warranty alongside the manufacturer, so there is no portal and no dispatcher between you and the crew." },
  { q: "Can it be installed in winter?",
    a: "Yes, and we do it all winter in Nebraska. Extreme cold affects adhesive and sealant cure times, so we adjust method rather than turning the work down. If conditions genuinely will not allow a good install that day, we reschedule rather than push through." },
  { q: "Do I need to be home for the install?",
    a: "Not for the whole day, but we do want you there at the end. Handover includes walking the app with you and verifying the run in daylight and again after dark, which is the step most installers skip." },
  { q: "Will my HOA allow it?",
    a: "Most do, and several of the newer west Omaha developments have specific language about permanent exterior lighting. We pull your covenant, submit the spec sheet and a rendering to your board, and install once it is approved. We handle that paperwork rather than handing it to you." },
  { q: "How long does an install take?",
    a: "Most homes are one day. Larger properties, or a job that includes landscape and hardscape fixtures on the same visit, run two. We give you the actual number in the written quote, not a range." },
];

/* THE PRICING FAQ SET IS GONE. Nine questions, and every one of them answered with a specific
 * nobody at Brytr supplied: a deposit policy, a lending partner, quote validity, what a second
 * visit saves, how fascia repair is charged. They read as authoritative because they were written
 * as answers rather than as guesses, which is exactly what made them dangerous on a live site.
 *
 * ONE OF THE NINE SURVIVES, moved into homeFaqs above: "Is there a charge for the consultation?"
 * The answer is no, and that is the offer Brytr has led with everywhere, on the old site included.
 * It is also the one answer that cannot hurt a homeowner if we have it wrong.
 *
 * The rest are in git: `git show c53361a:content/faqs.ts`. Do not restore any of them without
 * figures from Brytr in writing. */
export const pricingFaqs: Faq[] = [
  { q: "Is there a charge for the consultation?", a: "No. The on-site assessment, the design, and the written quote are free and there is no obligation." },
];

export const serviceFaqsFor = (name: string): Faq[] => [
  { q: `How long does ${name} take to install?`,
    a: "Most residential jobs are a single day. We confirm the exact number in your written quote after the on-site measure." },
  { q: "Is this permanent or seasonal?",
    a: "Permanent. The channel and the LEDs stay on the house year round and there is nothing to take down in January." },
  { q: "What warranty comes with it?",
    a: "Manufacturer coverage on the hardware plus our own workmanship coverage on the install. We will put the exact terms in writing before you sign." },
  { q: "Can I add to it later?",
    a: "Yes. Landscape fixtures, bistro runs on a pergola, and additional elevations can all be added to an existing controller and appear in the same app." },
  { q: "What areas do you cover?",
    a: "The Omaha metro and Council Bluffs. Every city we serve is named on our service areas page." },
  { q: "Will it work with my existing smart home?",
    a: "The system runs on its own app and controller. Tell us what you are running and we will tell you honestly what does and does not integrate." },
  { q: "How do I get a number?",
    a: `Book a free design consultation. We measure on site, design it with you, and hand you a written quote with no obligation.` },
];
