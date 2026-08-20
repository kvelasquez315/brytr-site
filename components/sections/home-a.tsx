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
import { IcVerified, IcMeasured, IcSameDay, IcFinancing, IcLadder, IcYearlyCost, IcHardHat, IcTwoTiers, IcOtherBrand } from "@/components/icons";


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

/* 6 — SERVICES · bento grid, 11 cards + a 12th CTA cell · neutral */
export function ServicesBento() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="What we install"
          title="Every surface worth lighting on a property."
          lede="Every one of these runs on the same channel, the same controller and the same app. Add to it whenever you like."
        />
        <Spotlight />
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, si) => {
            const I = iconMap[s.icon];
            const withPhoto = photoExists(s.photo);
            /* Every card is the same shape now. The Christmas card used to span two
             * columns with its own layout, which is what made the grid read uneven —
             * one feature tile forces every neighbour to either stretch or fall short.
             * It keeps its "most requested" flag instead, which carries the emphasis
             * without breaking the rhythm. */
            return (
              <article
                key={s.slug}
                data-spot
                /* Two of the eleven have no photograph in the archive — commercial and
                 * repair, because every install we shot is residential. Rather than let
                 * them read as unfinished white cards next to nine photographed ones,
                 * they invert to the dark surface. The absence becomes the design. */
                className={`flex flex-col rounded-lg p-6 transition-transform duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5 ${
                  withPhoto
                    ? "bg-card shadow-[var(--shadow-lg)]"
                    : "bg-primary shadow-[var(--shadow-dark)] ring-1 ring-accent/15"
                }`}
              >
                {withPhoto ? (
                  <Photo slot={s.photo!} className="mb-5" sizes="(min-width:1024px) 30vw, 100vw" />
                ) : (
                  <span className="channel-tile mb-5" aria-hidden><I className="size-7" /></span>
                )}
                {s.slug === "permanent-christmas-lights" && (
                  <p className="label mb-2 text-accent-ink">Most requested</p>
                )}
                <h3 className={`text-xl ${withPhoto ? "text-foreground" : "text-on-dark"}`}>{s.name}</h3>
                <p className={`mt-2.5 text-[0.95rem] ${withPhoto ? "text-muted-foreground" : "text-on-dark-muted"}`}>
                  {s.short}
                </p>
                <ul className={`mt-4 flex-1 space-y-2 ${withPhoto ? "" : "on-dark-cell"}`}>
                  {s.includes.slice(0, 3).map((i) => <Check key={i} onDark={!withPhoto}>{i}</Check>)}
                </ul>
                <div className="mt-5 pt-1">
                  <TextLink href={`/services/${s.slug}`} onDark={!withPhoto}>See {s.name}</TextLink>
                </div>
              </article>
            );
          })}
          {/* the twelfth cell, so 11 services land on an even 4 x 3 grid */}
          <article data-spot className="flex flex-col rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] ring-1 ring-accent/20">
            <span className="channel-tile mb-5" aria-hidden>
              <IcMeasured className="size-7" />
            </span>
            <h3 className="text-xl text-on-dark">Not sure which one you need?</h3>
            <p className="mt-2.5 text-[0.95rem] text-on-dark-muted">
              We design it on site after dark, when you can actually see what we are proposing.
            </p>
            <ul className="mt-4 flex-1 space-y-2 on-dark-cell">
              <Check onDark>Staying five years or more? Start with the roofline.</Check>
              <Check onDark>Sit outside in summer? A pergola run earns more.</Check>
              <Check onDark>Front of the house the point? Uplight the trees.</Check>
            </ul>
            <div className="mt-5 pt-1">
              <Button asChild size="sm">
                <Link href="/free-design-consultation">Book a consultation</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* 7 — THE MATERIALS · asymmetric split, photo left · neutral-deep */
const tiers = [
  { name: "Brytr Signature", on: "Haven Evolution", note: "Dedicated warm white, 4 in. LED spacing, 25 year rating.", tier: "Premium", href: "/lighting-systems/brytr-signature" },
  { name: "Brytr Basic", on: "Jellyfish", note: "A real permanent system at a lower entry point.", tier: "Value", href: "/lighting-systems/brytr-basic" },
  { name: "Landscape and Bistro", on: "Haven 9 and X Series", note: "Path, uplight and pergola runs on the same app.", tier: "Add-on", href: "/lighting-systems/haven-9-series-landscape-lights" },
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

        {/* THREE PANELS, DARK ON CREAM.
          *
          * This section was a left column with a photo and a 2x2 of white cards beside a
          * right column with three more white cards — seven white boxes, and two columns
          * whose card counts did not line up, so nothing aligned with anything. Now it is
          * full-width rows, each internally even: three tier panels, then the photograph,
          * then four craft details across. Inverting the panels to the dark surface on a
          * cream section reads as premium and stops the page being a field of white
          * rectangles.
          *
          * The manufacturer name is body text inside a sentence, not a label sitting where
          * a logo should be. When the official Haven and Jellyfish files arrive they go in
          * the `logo` slot on each tier in content/systems.ts. */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              data-spot
              className="group flex flex-col rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
            >
              <span className="channel-edge mb-6 block w-14" aria-hidden />
              <p className="label text-accent">{t.tier}</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-on-dark group-hover:underline">
                {t.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">
                {t.note} Built on {t.on} hardware.
              </p>
              <span className="label mt-6 border-t border-on-dark/12 pt-4 text-on-dark">
                See the system
              </span>
            </Link>
          ))}
        </div>

        {/* the photograph, full width, with the craft details reading off it */}
        <figure className="mt-5 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
          <div className="relative aspect-21/9">
            <Image
              src="/img/channel-detail.jpg"
              alt="Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along the gable"
              fill
              sizes="100vw"
              className="object-cover object-[50%_38%]"
            />
          </div>
          <dl className="grid gap-x-8 gap-y-6 p-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-on-dark/12">
            {[
              ["Into fascia, never shingles", "Every penetration sealed as it is made, not bridged over afterwards."],
              ["Mitered at every transition", "Valleys, dormers and returns. This is where amateur runs show from the curb."],
              ["Concealed wire runs", "No visible drops down a downspout or across a soffit."],
              ["Capped terminations", "Sealed end caps, not tape. Water ingress is the most common real failure."],
            ].map(([h, p2]) => (
              <div key={h} className="lg:px-7 lg:first:pl-0 lg:last:pr-0">
                <dt className="font-display text-[0.95rem] font-bold text-on-dark">{h}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-on-dark-muted">{p2}</dd>
              </div>
            ))}
          </dl>
        </figure>

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
  { icon: IcOtherBrand, h: "We service what we did not sell", p: "Dead run, failed controller, installer stopped answering the phone. We take over other brands' systems including Jellyfish, Gemstone, Trimlight and Oelo.", l: ["Diagnostics on any brand", "Full run replacement when repair is not worth it"] },
  { icon: IcVerified, h: "Day and night verification", p: "We do not leave until you have seen it lit after dark and seen how it reads from the street in daylight. Both states, on the same visit, with you there.", l: ["Daylight sightline check from the curb", "Full scene walkthrough after dark"] },
  { icon: IcTwoTiers, h: "Two tiers, so we are not selling you one option", p: "We carry premium and value hardware. That is why our comparison pages give the cheaper system real reasons to win, which is not something a single-brand dealer can do.", l: ["Premium and value both stocked", "Honest recommendation, in writing"] },
];
export function WhyBrytr() {
  return (
    /* PHOTO-BACKED, not another dark panel.
     *
     * This was four grey cards and a stat bar on flat navy — the client's words were
     * "very dark, not designed, people are just gonna scroll right past this", and that
     * was fair. It is the most important argument on the page and it looked like a
     * footer. Now a real photograph sits behind it: a roofline running red and green,
     * which is the holiday register the rest of the page keeps promising. The scrim is
     * heavy enough to read against and light enough that you can tell it is a house.
     *
     * The claim itself is set at hero size, because it is the reason to choose Brytr and
     * it should stop a thumb. */
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
          That is the whole reason Zac and Sam started Brytr. Four things follow from it, and
          all four are things a single-brand dealer cannot offer you.
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-on-dark/15">
          {why.map((w) => (
            <article key={w.h} className="lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="channel-edge mb-5 block w-12" aria-hidden />
              <w.icon className="size-7 text-accent" />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-on-dark">{w.h}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{w.p}</p>
              <ul className="mt-4 space-y-2">{w.l.map((i) => <Check key={i} onDark>{i}</Check>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
