import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { iconMap, type IconKey } from "@/content/icon-map";

import { Photo, photoExists } from "@/components/ui/photo";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm } from "@/components/ui/bits";
import { Spotlight } from "@/components/ui/spotlight";
import { IcVerified, IcHardHat, IcSceneStack, IcFasciaMount, IcMiter, IcConcealedWire, IcEndCap } from "@/components/icons";
import { cn } from "@/lib/utils";


/* 4 — QUICK QUOTE + STATS · asymmetric split · neutral */
export function QuickQuote() {
  return (
    <section className="section bg-background">
      <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
        <div>
          <QuoteForm variant="compact" heading="Get a free design consultation" />
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Free on-site assessment", "measured"],
              ["Written quote, no pressure", "verified"],
              ["Financing available", "financing"],
              ["We handle HOA paperwork", "hoaPaperwork"],
            ].map(([t, k]) => {
              const I = iconMap[k as keyof typeof iconMap];
              return (
                <li key={t} className="flex items-center gap-3 rounded-md bg-card px-4 py-3.5 shadow-[var(--shadow-sm)]">
                  <span className="channel-tile channel-tile--light !size-9" aria-hidden><I className="size-5" /></span>
                  <span className="text-sm font-medium text-foreground">{t}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <SectionHead
            
            title="A permanent building material, not a seasonal decoration."
            lede="Brytr routes an aluminum channel into your eave, loads it with addressable LEDs behind a diffuser, and hands you an app. It disappears in daylight and it does whatever you want after dark."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {site.stats.map((s) => {
              const I = iconMap[s.icon as keyof typeof iconMap];
              return (
                <div key={s.label} className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
                  <span className="channel-tile channel-tile--light mb-4" aria-hidden><I className="size-7" /></span>
                  <p className="u text-4xl font-medium leading-none text-foreground">{s.figure}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5 — THE BAND · one compact row · primary · carries signature edge #1
 *
 * Third pass. Seven pills, then five cells, then three, now this: the review score on
 * the left and the three things we install on the right, in a single row about a third
 * the height it started at. Licensed/insured and W2 crews came out because the client
 * wants the trust side to be reviews only — both claims are made properly further down
 * the page, where there is room to back them up instead of asserting them in a chip. */
export { ProofRail } from "./proof-rail";

/* 6 — SERVICES · three lead cards, then a compact rack · neutral
 *
 * AUDIT FIX. This was eleven identical cards plus a twelfth CTA cell: 2,440px of one
 * archetype, every card carrying exactly three bullets and a "See <exact card title>"
 * link. Twelve equal-weight boxes highlight nothing, and on a phone it was seven
 * consecutive screens of the same card — the single biggest reason the page read long.
 *
 * Now it is a real bento. Three lead services get photographed cards, because those are
 * what people actually search for and they carry the section. The other eight sit in a
 * compact rack — icon, name, one line — which is a different object, not a smaller
 * version of the same one. Nothing was cut: all eleven services are still linked, and
 * every one still has its own page. Bullet counts run two to four so the cards stop
 * looking stamped out. */
/* WHERE IT GOES, TOP DOWN.
 *
 * Grouped by the physical place on the property, because that is the only thing about them a
 * homeowner on the home page needs: the same controller reaches all of it. Ordered the way it
 * sits on a house — under the eave, then overhead, then at grade — rather than in whatever
 * order the service pages happen to have been written in.
 *
 * NO BLURB PER PLACE. Each one used to carry a line of its own — "Beds, trunks, seat walls and
 * step risers" — sitting beside "Path, uplighting, tree wash and beds" and "Built into walls,
 * steps and coping". The place line was a summary of the two services next to it, which is how
 * a row ends up looking full while saying one thing twice. The place is the label; the services
 * carry the detail they already have.
 *
 * TWO THINGS ARE DELIBERATELY NOT IN HERE, and both used to be rendered as if they were places.
 * The app is not a place: it is the one thing every run above has in common, so putting it in
 * the fourth row of a four-row table of locations put it on the same footing as a flower bed.
 * And repairs are not on our system at all — that is work on somebody else's, often a brand we
 * would never have sold. Each gets its own shape below. */
const places: { where: string; icon: IconKey; slugs: string[] }[] = [
  { where: "On the house", icon: "soffit", slugs: ["soffit-lighting", "commercial-outdoor-lighting"] },
  { where: "Overhead", icon: "pergola", slugs: ["patio-pergola-bistro-lighting"] },
  { where: "At ground level", icon: "pathLight", slugs: ["landscape-lighting", "hardscape-lighting"] },
];

/* The control layer. Not a place — the reason the places are worth grouping at all. */
const control = {
  what: "The part you actually touch, saved and scheduled — the one thing every run above has in common.",
  slugs: ["holiday-seasonal-scenes", "gameday-lighting"],
};

/* A SERVICE, AS A TARGET.
 *
 * All eight of these were rendered as underlined words inside a sentence — "Beds, trunks, seat
 * walls and step risers — Landscape Lighting and Hardscape Lighting." That is the lowest
 * affordance available for the only things in the block anybody would want to click, and it
 * made five rows identical apart from the nouns.
 *
 * The first pass made them chips: better targets, but a chip is one word wide, so right-aligning
 * two of them in a 1,392px row just moved the empty space from the middle to the middle. They
 * carry each service's own `short` line now — "Recessed and track options under the overhang",
 * "Husker red on a Saturday, one tap" — which is copy that already existed, is specific, and
 * fills the row with a reason to click rather than with air. `basis` keeps a card at a readable
 * width instead of stretching one lone card across the whole row. */
function ServiceCard({ slug }: { slug: string }) {
  const svc = services.find((x) => x.slug === slug);
  if (!svc) return null;
  return (
    <Link
      href={`/services/${slug}`}
      data-spot
      className={cn(
        "group block flex-1 basis-[19.5rem] rounded-md bg-on-dark/8 px-4 py-3.5 ring-1 ring-on-dark/15",
        "transition-colors duration-[--dur-fast] hover:bg-on-dark/14 hover:ring-accent/60"
      )}
    >
      <span className="block font-display text-[0.95rem] font-bold leading-tight text-on-dark decoration-accent decoration-2 underline-offset-4 group-hover:underline">
        {svc.name}
      </span>
      <span className="mt-1.5 block text-[0.85rem] leading-snug text-on-dark-muted">{svc.short}</span>
    </Link>
  );
}

const LEAD_SERVICES = [
  "permanent-outdoor-lighting",
  "permanent-christmas-lights",
  "permanent-roofline-lighting",
];

export function ServicesBento() {
  const leads = LEAD_SERVICES.map((sl) => services.find((s) => s.slug === sl)!).filter(Boolean);

  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="What we install"
          title="Every surface worth lighting on a property."
          lede="It all runs on one channel, one controller and one app, so you can start with the roofline and add to it whenever you like."
        />
        <Spotlight />

        {/* the three people ask for by name */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {leads.map((s, si) => {
            const withPhoto = photoExists(s.photo);
            const I = iconMap[s.icon];
            return (
              <article
                key={s.slug}
                data-spot
                className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                {withPhoto ? (
                  <Photo slot={s.photo!} sizes="(min-width:1024px) 32vw, 100vw" />
                ) : (
                  <div className="grid aspect-16/9 place-items-center bg-primary">
                    <span className="channel-tile" aria-hidden><I className="size-7" /></span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {s.slug === "permanent-christmas-lights" && (
                    <p className="label mb-2 text-accent-ink">Most requested</p>
                  )}
                  <h3 className="text-xl text-foreground">{s.name}</h3>
                  <p className="mt-2.5 text-[0.95rem] text-muted-foreground">{s.short}</p>
                  {/* three, or four where the service earns it — the old grid gave every one
                    * of eleven cards exactly three, which is a tell on its own */}
                  <ul className="mt-4 flex-1 space-y-2">
                    {s.includes.slice(0, si === 2 ? 4 : 3).map((i) => <Check key={i}>{i}</Check>)}
                  </ul>
                  <div className="mt-5">
                    <TextLink href={`/services/${s.slug}`}>
                      {si === 0 ? "See a whole-home install" : si === 1 ? "See it at Christmas" : "See a roofline run"}
                    </TextLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* WHAT THE SECTION LEDE ACTUALLY PROMISED.
          *
          * This was eight equal cells — icon, name, one line — under the heading "Also on the
          * same system". Eight names is not an argument, and the lede above it had already made
          * the only point the block existed to support ("one channel, one controller and one
          * app, so you can add to it whenever you like"). So the cells restated a claim instead
          * of evidencing it, which is why it read as furniture next to the three cards above.
          *
          * Grouping it by place fixed the argument and left the DESIGN wrong: five rows of a
          * 13rem label beside a single sentence, identical apart from the nouns, the width
          * filled by pushing prose sideways rather than by content. Two shapes now, because
          * there are two kinds of thing here and they were drawn the same: the places on the
          * property, and the app that reaches all of them. */}
        <div className="mt-5 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
            <p className="label flex items-center gap-3 text-on-dark">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              One controller, the whole property
            </p>
            <p className="text-sm text-on-dark-muted">Added at install, or any year after</p>
          </div>

          {/* THE PLACES. Row height varies with how many services actually land there, so the
            * rhythm comes from the content instead of from a fixed rail. */}
          <ul className="divide-y divide-on-dark/10">
            {places.map((g) => {
              const I = iconMap[g.icon];
              return (
                <li
                  key={g.where}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 px-6 py-5 md:grid-cols-[auto_11rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-4"
                >
                  <span className="channel-tile !size-11" aria-hidden><I className="size-6" /></span>
                  <p className="font-display text-[1.05rem] font-bold leading-tight text-on-dark">{g.where}</p>
                  {/* col-span-2 below md so the tile and the place name share one line on a
                    * phone instead of eating two — three rows of that is 90px of nothing. */}
                  <div className="col-span-2 flex flex-wrap gap-3 md:col-span-1">
                    {g.slugs.map((sl) => <ServiceCard key={sl} slug={sl} />)}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* THE CONTROL LAYER, on its own ground. It is what the three rows above have in
            * common, so it sits under all of them rather than beside them as a fourth. Same
            * three-column spine as the rows, so it reads as the sum of them and not as a
            * separate widget that happened to land here. */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-t border-on-dark/10 bg-raise px-6 py-6 md:grid-cols-[auto_11rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-4">
            <span className="channel-tile !size-11" aria-hidden><IcSceneStack className="size-6" /></span>
            <div>
              <p className="label text-accent">What you set it to</p>
              <p className="mt-1.5 font-display text-[1.05rem] font-bold leading-tight text-on-dark">
                Every run above
              </p>
            </div>
            <div className="col-span-2 flex flex-wrap items-center gap-3 md:col-span-1">
              {control.slugs.map((sl) => <ServiceCard key={sl} slug={sl} />)}
              <p className="basis-[19.5rem] text-[0.85rem] leading-snug text-on-dark-muted">
                {control.what}
              </p>
            </div>
          </div>

        </div>

        {/* the qualifying questions, as a wide band, not a third card.
          *
          * On bg-primary rather than bg-raise: the panel above closes on a bg-raise strip, and the
          * light band that used to sit between the two is gone with the takeover claim, so bg-raise
          * here would put the same ground either side of a 20px gap. */}
        <div className="mt-5 grid gap-6 rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] ring-1 ring-accent/25 lg:grid-cols-[22rem_1fr] lg:items-center lg:gap-10 lg:p-8">
          <div>
            <p className="label text-accent">Not sure where to start</p>
            <h3 className="mt-2 text-xl text-on-dark">We design it on site, after dark.</h3>
            <p className="mt-2 text-[0.95rem] text-on-dark-muted">
              You&rsquo;ll see what we&rsquo;re proposing on your own house before you decide anything.
            </p>
            <div className="mt-5">
              <Button asChild size="sm"><Link href="/free-design-consultation">Book a consultation</Link></Button>
            </div>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {[
              ["Staying five years or more", "Start with the roofline. It's the run you'll use every night."],
              ["You sit outside in summer", "A pergola or patio run earns its money more months of the year."],
              ["The front of the house matters", "Uplight the trees. It changes the elevation more than the eave does."],
            ].map(([h, p2]) => (
              <li key={h}>
                <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p2}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 7 — THE HARDWARE · one manufacturer, and the craft that is the same on every run
 *
 * THE PLANS ARE GONE, AND THIS TIME PROPERLY. Two rounds of this section were spent
 * rearranging a fabrication instead of deleting it. Round one was seven white cards. Round
 * two was three panels, one badged "what we recommend", which the client rejected with "i
 * dont like this plans section since its not a real thing". Round three was two tiers side
 * by side, each carrying the case against itself — better designed, still fiction. Named
 * tiers called "Brytr Signature" and "Brytr Basic" do not exist, and the spec rows under
 * them ("Rated life: 25 years", "LED spacing: 4 in., addressable") were numbers no one had
 * given me. The client, plainly, on the third pass: they do not have packages, it is not
 * true, talk about the main type of light they actually install, which is Haven.
 *
 * So the section is about Haven now. Every name below is a real Haven product line with a
 * real page behind it, and there is not a single number in it, because a number on a home
 * page has to come from somewhere. The craft band underneath survives untouched: fascia
 * mount, mitred corners, concealed wire and end caps are things we do, photographed on a
 * finished install, and they were never the problem.
 */
const havenLines: { name: string; what: string; slug: string }[] = [
  {
    name: "Haven Evolution",
    what: "The roofline channel and the diodes that sit in it.",
    slug: "haven-evolution",
  },
  {
    name: "Haven Q Series",
    what: "Soffit and architectural fixtures, recessed or on track.",
    slug: "haven-q-series",
  },
  {
    name: "Haven 9 Series",
    what: "Ground level: path, uplight and bed fixtures.",
    slug: "haven-9-series-landscape-lights",
  },
  {
    name: "Haven X Bistro",
    what: "Overhead runs on a pergola, a patio or a structure.",
    slug: "haven-x-bistro-lights",
  },
];

const craft: [string, string, typeof IcFasciaMount][] = [
  ["Into fascia, never shingles", "Every penetration sealed as it is made.", IcFasciaMount],
  ["Mitered at every transition", "Valleys, dormers and returns.", IcMiter],
  ["Concealed wire runs", "Nothing dropped down a downspout or run across a soffit.", IcConcealedWire],
  ["Capped terminations", "A sealed end cap closes the run.", IcEndCap],
];

/* THE SPEC SHEET IS GONE. It was five rows of component specification on a home page, and
 * one of them — "LED spacing: 4 in., addressable" — was the same invented number that was
 * under the tier cards. The client, twice in one video: this looks like a dashboard, and we
 * should not have specs like that on the home page. Component detail lives on the system
 * pages, where each value sits next to the product it describes. */

export function MaterialsSplit() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="The hardware"
          title="We lead with Haven, and we install every line of it."
          lede="Haven Lighting makes the roofline channel, the soffit and architectural fixtures, the ground-level lights and the overhead bistro runs. We install all of it, which is why everything on the property answers to the same app instead of to three different ones. Jellyfish is the other system we put up, and the comparison pages are where that argument belongs."
        />

        {/* Four names, one line each, no specification rows. The client on the version that
          * stood here: it looks like being in a dashboard. A home page introduces the
          * hardware; the system pages are where a number belongs, next to its source. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {havenLines.map((h) => (
            <Link
              key={h.slug}
              href={`/lighting-systems/${h.slug}`}
              data-spot
              className="group flex items-start gap-4 rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10 transition-colors duration-[--dur-fast] hover:ring-accent/50"
            >
              <span className="mt-1 block h-9 w-1 shrink-0 bg-accent" aria-hidden />
              <span>
                <span className="block font-display text-xl font-bold leading-tight text-on-dark decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {h.name}
                </span>
                <span className="mt-2 block text-[0.95rem] leading-snug text-on-dark-muted">{h.what}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* ONE BAND, NOT THREE MORE CARDS.
          *
          * This was three dark panels in a row, which is the same object as the three tier
          * panels above it — the client's read was that the section below was "a copy" of
          * the one above, and it was. Same silhouette, same surface, same rhythm, stacked.
          *
          * So this is a different device: a single wide strip with its own header rail and
          * internal hairline divisions instead of three floating cards. The photograph
          * bleeds to the strip's edges rather than sitting in a frame with a caption box
          * under it, and the amber line runs down the LEFT edge rather than across the top,
          * so nothing about it echoes the tier panels. Same palette, different form —
          * which is how a section stays varied without introducing a new color. */}
        <div className="mt-12 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
            <p className="label flex items-center gap-3 text-on-dark">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              Same craft on every run
            </p>
            <p className="text-sm text-on-dark-muted">
              Photographed on a finished Omaha install
            </p>
          </div>

          <div className="grid divide-on-dark/12 lg:grid-cols-[46fr_54fr] lg:divide-x">
            {/* the photograph bleeds — no frame, no caption card */}
            <figure className="relative min-h-64 border-b border-on-dark/12 lg:border-b-0">
              <Image
                src="/img/channel-detail.jpg"
                alt="Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along the gable"
                fill
                sizes="(min-width:1024px) 34vw, 100vw"
                className="object-cover"
              />
              {/* the lit house behind it is bright pink-white here, so the caption needs a real
                * scrim, not a hint of one */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary via-primary/92 to-transparent px-6 pb-5 pt-20">
                <p className="label text-accent">The channel, close up</p>
                <p className="mt-1 text-sm text-on-dark">
                  Color matched to the fascia, diffuser facing down. At noon it reads as trim.
                </p>
              </figcaption>
            </figure>

            <div className="border-b border-on-dark/12 p-6 lg:border-b-0">
              <p className="label text-on-dark-muted">How it goes on</p>
              <ul className="mt-4 space-y-4">
                {craft.map(([h, p2, I]) => (
                  <li key={h} className="flex gap-3.5">
                    <I className="mt-0.5 size-7 shrink-0 text-accent" />
                    <div>
                      <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                      <p className="mt-0.5 text-sm text-on-dark-muted">{p2}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button asChild><Link href="/compare">Compare every brand</Link></Button>
          <TextLink href="/lighting-systems">See every system</TextLink>
        </div>
      </div>
    </section>
  );
}

/* 8 — WHY BRYTR · two claims, equal weight · primary
 *
 * Each of these four used to end in a two-item ticked list. The client: "with these i dont
 * like the check marks. it needs to be simpler." He is right, and the lists were worse than
 * clutter — every one of the eight items restated the sentence directly above it, so the
 * section made each argument twice and looked like a spec sheet doing it. A claim followed by
 * a tick that agrees with the claim is not evidence.
 *
 * The three things in those lists that were NOT already in the prose — the same crew from
 * measure to handover, replacing a whole run when a repair will not hold, and putting the
 * recommendation in writing — are now clauses in the paragraphs, where they read as part of
 * an argument instead of a checkbox. Nothing was lost and eight rows of furniture went. */
/* THE TIER CLAIM IS OUT, AND SO IS THE TAKEOVER CLAIM. "Two tiers, so we're never selling
 * you the only option" was the load-bearing sentence under a pair of tiers that do not
 * exist, so it went with them. "We service what we didn't sell" went the same way: the
 * client confirmed on camera that Brytr does not take over or repair other brands' systems,
 * so the claim, its service page and the band on the section above are all gone.
 *
 * A claim on a home page is a promise made before anybody has spoken to us. Two we can keep
 * beats four where two are furniture, so both of these are drawn at the same weight rather
 * than one leading and the rest sitting beside it as rows. */
const why = [
  {
    icon: IcHardHat,
    h: "Our own crews, never subcontracted",
    p: "The people on your roof are Brytr employees on Brytr payroll, and it is the same crew from the measure to the handover. Subcontracting the install is the single biggest cause of the leaks and the dead sections in this trade, which is the whole reason we do not do it.",
    href: "/about",
    cta: "Who is actually on the roof",
  },
  {
    icon: IcVerified,
    h: "Day and night verification",
    p: "We don't leave until you've seen it lit after dark and seen how it reads from the street in daylight. Both states, on the same visit, with you there.",
    href: "/how-it-works",
    cta: "What the last hour looks like",
  },
];
export function WhyBrytr() {
  return (
    /* PHOTO-BACKED, and now with a point of focus.
     *
     * Two passes ago this was four grey cards on flat navy — "very dark, not designed,
     * people are just gonna scroll right past this." The photograph fixed the flatness.
     * The audit caught what it did not fix: four equal columns of small muted body copy
     * with 16px icons lost on a dark photo, ragged bottoms, and a lede that announced
     * how many points were coming. This is the most important argument on the page.
     *
     * So both claims are drawn at the same size, in the same container, with the icons in
     * the channel tile big enough to read. Two panels beat a lead panel and a lone row. */
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src="/img/scene-christmas.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />
      <div className="why-scrim absolute inset-0" aria-hidden />

      <div className="shell relative py-20 lg:py-28">
        <p className="label text-accent">Why Brytr</p>
        <h2 className="mt-4 max-w-[34ch] text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.02] text-on-dark">
          The people who quote your roof should be the people who install it.
        </h2>
        {/* The headline here used to be "Every quote in this market comes from somebody selling
          * exactly one brand", and the paragraph under it finished the thought with "that is why
          * we carry two systems instead of one". Both halves rested on the tier fiction, so both
          * went. What is left is the thing the client stood behind on camera: the crew. */}
        <p className="mt-5 max-w-[62ch] text-lg text-on-dark/90">
          That&rsquo;s the reason Zac and Sam started Brytr, and it is still the part of this they
          will not hand to anybody else.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {why.map((w) => (
            <article key={w.h} className="flex flex-col rounded-lg bg-primary/72 p-7 ring-1 ring-accent/30">
              <span className="channel-tile mb-6" aria-hidden><w.icon className="size-7" /></span>
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-tight text-on-dark">
                {w.h}
              </h3>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-on-dark/90">{w.p}</p>
              <div className="mt-auto border-t border-on-dark/15 pt-6">
                <TextLink onDark href={w.href}>{w.cta}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
