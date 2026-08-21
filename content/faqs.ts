export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "Can you actually see it during the day?",
    a: "Barely, and that is the whole point. The channel is extruded aluminum color matched to your fascia and it sits tucked into the eave line. From the street in daylight it reads as trim. Ask us to show you a daytime photo of a house we finished on your own block." },
  { q: "What does it cost?",
    a: "It is priced by linear foot of roofline plus complexity, so a single-story ranch and a two-story with dormers and a turret are very different numbers. We give you a written quote after an on-site measure, and we publish real ranges on our pricing page rather than making you call to find out." },
  { q: "Does it damage my soffit or fascia?",
    a: "It fastens into the fascia board, not through the shingles, and every penetration is sealed. Done correctly it is no more invasive than hanging a gutter. Done badly it is a leak, which is most of the reason we do not subcontract the install." },
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

export const pricingFaqs: Faq[] = [
  { q: "Why is it priced by linear foot?", a: "Because that is what drives material and labor. The channel, the LED run, and the time on the ladder all scale with how much roofline you are lighting. Complexity then adjusts it: stories, dormers, turrets, and how many separate elevations need their own zone." },
  { q: "What makes one quote higher than another on the same house?", a: "Story count, roof complexity, how many corners and transitions need mitering, whether you want landscape or bistro on the same visit, and which system you choose. Those five things explain almost every difference." },
  { q: "Is financing available?", a: "Yes. Terms come from our lending partner and we will show you the actual numbers at the consultation rather than advertising a payment that only applies to a perfect credit file." },
  { q: "Do you require a deposit?", a: "Yes, on scheduling. The balance is due at completion, after the day and night verification walk." },
  { q: "Is the quote good for how long?", a: "Ask us at the consultation. Material pricing in this category moves, and we would rather give you a real expiry than a number that quietly changes." },
  { q: "Is there a charge for the consultation?", a: "No. The on-site assessment, the design, and the written quote are free and there is no obligation." },
  { q: "Is the cheaper hardware a worse install?", a: "No. The crews, the fastening method, the sealing and the verification walk are identical whichever hardware is on the house. What differs is the hardware itself: LED spacing, whether the white is a dedicated channel or color-mixed, and the rated life. Cheaper hardware fastened properly outlasts better hardware fastened badly." },
  { q: "Does adding landscape or a pergola run on the same visit save money?", a: "Yes, meaningfully. Most of the cost of a second visit is the visit. If you think you will want landscape uplighting or a bistro run within a couple of years, price it now even if you install it later." },
  { q: "What happens to the price if my fascia needs repair?", a: "We flag it at the measure and quote the repair separately, or we tell you to get your own carpenter to do it first. We will not mount a permanent fixture to failing timber and quietly hope." },
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
    a: "The Omaha metro, Council Bluffs, Lincoln, and eastern Nebraska. Every city we serve is named on our service areas page." },
  { q: "Will it work with my existing smart home?",
    a: "The system runs on its own app and controller. Tell us what you are running and we will tell you honestly what does and does not integrate." },
  { q: "How do I get a number?",
    a: `Book a free design consultation. We measure on site, design it with you, and hand you a written quote with no obligation.` },
];
