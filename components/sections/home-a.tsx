import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { iconMap } from "@/content/icon-map";
import { googleLogo, reviewProofBadge, offerings } from "@/content/badges";
import { Photo, photoExists } from "@/components/ui/photo";
import { Button } from "@/components/ui/button";
import { SectionHead, Tile, Check, TextLink, QuoteForm, ChannelEdge } from "@/components/ui/bits";
import { Spotlight } from "@/components/ui/spotlight";
import { IcVerified, IcMeasured, IcSameDay, IcFinancing, IcLadder, IcYearlyCost, IcHardHat, IcTwoTiers, IcOtherBrand, IcFasciaMount, IcMiter, IcConcealedWire, IcEndCap } from "@/components/icons";


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
export function ProofRail() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      <div className="shell flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-6">
        {/* reviews */}
        <div className="flex items-center gap-4">
          {googleLogo ? (
            <div className="relative h-7 w-20 shrink-0">
              <Image src={googleLogo} alt="Google" fill sizes="80px" className="object-contain object-left" />
            </div>
          ) : null}
          <span className="flex items-center gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-4 text-accent" fill="currentColor">
                <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
              </svg>
            ))}
          </span>
          {/* Until the official Google mark is on disk this reads as a sentence, not as a
            * lockup with a missing image in it. Setting the word "Google" in our own
            * display face was the exact thing I told the client not to do with Haven and
            * Jellyfish — a brand name in someone else's typeface looks like a broken img. */}
          <p className="text-sm text-on-dark">
            <span className="u font-semibold">{reviewProofBadge.score}</span>{" "}
            <span className="text-on-dark-muted">
              from <span className="u">{reviewProofBadge.count}</span>{" "}
              {googleLogo ? "reviews" : "reviews on Google"} · {reviewProofBadge.note}
            </span>
          </p>
        </div>

        {/* what we install */}
        <ul className="flex flex-wrap items-center gap-x-9 gap-y-4">
          {offerings.map((o) => {
            const I = iconMap[o.icon];
            return (
              <li key={o.name}>
                <Link href={o.href} className="group flex items-center gap-3">
                  <I className="size-6 shrink-0 text-accent" />
                  <span>
                    <span className="block font-display text-[0.95rem] font-bold leading-none text-on-dark group-hover:underline">
                      {o.name}
                    </span>
                    <span className="mt-1 block text-xs text-on-dark-muted">{o.note}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

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
const LEAD_SERVICES = [
  "permanent-outdoor-lighting",
  "permanent-christmas-lights",
  "permanent-roofline-lighting",
];

export function ServicesBento() {
  const leads = LEAD_SERVICES.map((sl) => services.find((s) => s.slug === sl)!).filter(Boolean);
  const rest = services.filter((s) => !LEAD_SERVICES.includes(s.slug));

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

        {/* THE RACK — the other eight, as one object rather than eight more cards */}
        <div className="mt-5 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
            <p className="label flex items-center gap-3 text-on-dark">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              Also on the same system
            </p>
            <p className="text-sm text-on-dark-muted">Added at install, or any year after</p>
          </div>
          <ul className="grid divide-on-dark/10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {rest.map((s) => {
              const I = iconMap[s.icon];
              return (
                <li key={s.slug} className="border-b border-on-dark/10 last:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0">
                  <Link
                    href={`/services/${s.slug}`}
                    data-spot
                    className="flex h-full gap-3.5 p-5 transition-colors duration-[--dur-fast] hover:bg-raise"
                  >
                    <I className="mt-0.5 size-6 shrink-0 text-accent" />
                    <span className="block">
                      <span className="block font-display text-[0.95rem] font-bold text-on-dark">{s.name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-on-dark-muted">{s.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* the qualifying questions, as a wide band — a third shape, not a fourth card */}
        <div className="mt-5 grid gap-6 rounded-lg bg-raise p-6 ring-1 ring-accent/25 lg:grid-cols-[22rem_1fr] lg:items-center lg:gap-10 lg:p-8">
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

/* 7 — THE HARDWARE · one recommended tier, then the craft that is common to both
 *
 * Round three. Round one was seven white cards in two columns whose counts did not line
 * up. Round two was even rows, which fixed the alignment but, in the client's words,
 * still read as "just a lot of text, and a bit disorganized" — and, fairly, "I don't see
 * how it's highlighting anything": three identically-ringed panels highlight nothing.
 *
 * Two changes. HIERARCHY: the Signature tier is the recommendation, so it is the only lit
 * panel — brighter surface, full amber edge, a tag, and the only filled button. The other
 * two are quiet by design. COMPARABILITY: the prose blurb per tier is gone, replaced by
 * the same four spec rows in the same order on all three, so the eye reads across instead
 * of down through paragraphs. Every value here already appears on the system pages and in
 * content/compares.ts — nothing was written to fill a row.
 *
 * The manufacturer name is a value in a spec row, not a label sitting where a logo should
 * be. When the official Haven and Jellyfish files arrive they go in the `logo` slot on
 * each tier in content/systems.ts.
 */
type Tier = {
  name: string; tier: string; lead?: boolean; tag?: string;
  rows: [string, string][]; who: string; href: string;
};
const tiers: Tier[] = [
  {
    name: "Brytr Signature", tier: "Premium", lead: true, tag: "What we recommend",
    rows: [
      ["Hardware", "Haven Evolution"],
      ["White light", "Dedicated channel"],
      ["LED spacing", "4 in., addressable"],
      ["Rated life", "25 years"],
    ],
    who: "Long or complex rooflines, and anyone who leaves warm white on every night.",
    href: "/lighting-systems/brytr-signature",
  },
  {
    name: "Brytr Basic", tier: "Value",
    rows: [
      ["Hardware", "Jellyfish"],
      ["White light", "Color mixed"],
      ["LED spacing", "Wider"],
      ["Rated life", "Shorter"],
    ],
    who: "A simple single-story roofline, or a budget you'd rather split with landscape.",
    href: "/lighting-systems/brytr-basic",
  },
  {
    name: "Landscape and bistro", tier: "Add-on",
    rows: [
      ["Hardware", "Haven 9 and X Series"],
      ["Runs", "Path, uplight, pergola"],
      ["Control", "The same app"],
      ["Pairs with", "Either tier"],
    ],
    who: "Beds, trees, patios and pergolas, added to either tier or installed on their own.",
    href: "/lighting-systems/haven-9-series-landscape-lights",
  },
];

/* Four icons drawn for these four rows (see components/icons). They used to borrow the
 * service-grid glyphs, which meant the gable mark stood for "Roofline", "into fascia" and
 * a gallery tab on the same page. One glyph, one meaning. */
const craft: [string, string, typeof IcFasciaMount][] = [
  ["Into fascia, never shingles", "Every penetration sealed as it is made.", IcFasciaMount],
  ["Mitered at every transition", "Valleys, dormers and returns.", IcMiter],
  ["Concealed wire runs", "Nothing dropped down a downspout or run across a soffit.", IcConcealedWire],
  ["Capped terminations", "A sealed end cap closes the run.", IcEndCap],
];

const specSheet: [string, string][] = [
  ["Channel", "Extruded aluminum"],
  ["Diffuser", "Frosted polycarbonate"],
  ["LED spacing", "4 in., addressable"],
  ["Weather rating", "IP66 sealed"],
  ["White channel", "Dedicated, not color mixed"],
];

export function MaterialsSplit() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="The hardware"
          title="We install the good stuff, and we will tell you which is which."
          lede="Most installers carry one brand and therefore have one recommendation. We carry a premium tier and a value tier, which means we have no reason to talk you into either."
        />

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              data-spot
              className={`relative flex flex-col overflow-hidden rounded-lg p-7 pt-8 ${
                t.lead
                  ? "bg-raise shadow-[var(--shadow-dark)] ring-2 ring-accent"
                  : "bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
              }`}
            >
              {/* the lit edge: full output on the tier we recommend, banked on the others */}
              <span
                className={`absolute inset-x-0 top-0 h-1 ${t.lead ? "bg-accent" : "bg-accent/25"}`}
                aria-hidden
              />

              {/* min-height reserves the tag row on every card, so the spec rows below
                * start on the same baseline across all three and the eye can read across. */}
              <div className="flex min-h-7 items-start justify-between gap-3">
                <p className="label text-accent">{t.tier}</p>
                {t.tag && (
                  <p className="label rounded-sm bg-accent px-2 py-1 text-accent-foreground">{t.tag}</p>
                )}
              </div>

              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-on-dark">
                <Link href={t.href} className="hover:text-accent">{t.name}</Link>
              </h3>

              <dl className="mt-5 divide-y divide-on-dark/12 border-y border-on-dark/12">
                {t.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-sm text-on-dark-muted">{k}</dt>
                    <dd className="u text-right text-sm font-medium text-on-dark">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">
                <span className="label block text-on-dark">Best for</span>
                {t.who}
              </p>

              <div className="mt-6">
                {t.lead ? (
                  <Button asChild size="sm"><Link href={t.href}>See the Signature system</Link></Button>
                ) : (
                  <TextLink onDark href={t.href}>See the system</TextLink>
                )}
              </div>
            </article>
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
          * which is how a section stays varied without introducing a new colour. */}
        <div className="mt-12 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
            <p className="label flex items-center gap-3 text-on-dark">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              Same craft on either tier
            </p>
            <p className="text-sm text-on-dark-muted">
              Photographed on a finished Omaha install
            </p>
          </div>

          <div className="grid divide-on-dark/12 lg:grid-cols-[36fr_32fr_32fr] lg:divide-x">
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
                    <I className="mt-0.5 size-6 shrink-0 text-accent" />
                    <div>
                      <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                      <p className="mt-0.5 text-sm text-on-dark-muted">{p2}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col p-6">
              <p className="label text-on-dark-muted">On the spec sheet</p>
              <dl className="mt-4 divide-y divide-on-dark/10">
                {specSheet.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0">
                    <dt className="text-sm text-on-dark-muted">{k}</dt>
                    <dd className="u text-right text-sm font-medium text-on-dark">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto pt-5">
                <TextLink onDark href="/lighting-systems/brytr-basic">See the Basic tier&rsquo;s numbers</TextLink>
              </div>
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

/* 8 — WHY BRYTR · 4-up feature grid + overlapping bridge card · primary */
const why = [
  { icon: IcHardHat, h: "Our own crews, never subcontracted", p: "The people on your roof are Brytr employees on Brytr payroll. Subcontracted installs are the single biggest cause of the leaks and the dead sections we get called out to fix.", l: ["W2 employees, trained in house", "Same crew from measure to handover"] },
  { icon: IcOtherBrand, h: "We service what we didn't sell", p: "Dead run, failed controller, installer stopped answering the phone. We take over other brands' systems including Jellyfish, Gemstone, Trimlight and Oelo.", l: ["Diagnostics on any brand", "Full run replacement when a repair won't hold"] },
  { icon: IcVerified, h: "Day and night verification", p: "We don't leave until you've seen it lit after dark and seen how it reads from the street in daylight. Both states, on the same visit, with you there.", l: ["Daylight sightline check from the curb", "Full scene walkthrough after dark"] },
  { icon: IcTwoTiers, h: "Two tiers, so we're never selling you the only option", p: "We carry premium and value hardware, which is why our comparison pages give the cheaper system real reasons to win. A single-brand dealer has no way to write those pages.", l: ["Premium and value both stocked", "Honest recommendation, in writing"] },
];
export function WhyBrytr() {
  const [lead, ...others] = why;
  return (
    /* PHOTO-BACKED, and now with a point of focus.
     *
     * Two passes ago this was four grey cards on flat navy — "very dark, not designed,
     * people are just gonna scroll right past this." The photograph fixed the flatness.
     * The audit caught what it did not fix: four equal columns of small muted body copy
     * with 16px icons lost on a dark photo, ragged bottoms, and a lede that announced
     * how many points were coming. This is the most important argument on the page.
     *
     * So one claim leads at size — the crews, because subcontracting is the actual cause
     * of the failures we get called out to fix — and the other three sit beside it as
     * rows with icons in the channel container, big enough to read. */
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
          Every quote in this market comes from somebody selling exactly one brand.
        </h2>
        <p className="mt-5 max-w-[62ch] text-lg text-on-dark/90">
          That&rsquo;s the reason Zac and Sam started Brytr. It&rsquo;s also why we carry two
          systems instead of one, and why we&rsquo;ll tell you which of them your house needs.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[44fr_56fr] lg:gap-14">
          {/* the claim that matters most, at size */}
          <article className="flex flex-col rounded-lg bg-primary/72 p-7 ring-1 ring-accent/30">
            <span className="channel-tile mb-6" aria-hidden><lead.icon className="size-7" /></span>
            <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-tight text-on-dark">
              {lead.h}
            </h3>
            <p className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-on-dark/90">{lead.p}</p>
            <ul className="mt-6 space-y-2 border-t border-on-dark/15 pt-5">
              {lead.l.map((i) => <Check key={i} onDark>{i}</Check>)}
            </ul>
          </article>

          <ul className="divide-y divide-on-dark/15">
            {others.map((w) => (
              <li key={w.h} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <span className="channel-tile" aria-hidden><w.icon className="size-7" /></span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-on-dark">{w.h}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark/85">{w.p}</p>
                  <ul className="mt-3 space-y-2">{w.l.map((i) => <Check key={i} onDark>{i}</Check>)}</ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
