import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { iconMap } from "@/content/icon-map";
import { badges } from "@/content/badges";
import { Photo, photoExists } from "@/components/ui/photo";
import { Button } from "@/components/ui/button";
import { SectionHead, Tile, Check, TextLink, QuoteForm, ChannelEdge } from "@/components/ui/bits";
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

/* 5 — CREDENTIAL BAND · under the hero · primary · carries signature edge #1
 *
 * Went from seven text pills to five cells to three. Three is the right number: a
 * credential band should carry the things a homeowner actually checks — the review
 * score, the insurance, and who is physically on the roof. Manufacturer names are out
 * until the official logo files exist, because a brand set in our own typeface reads
 * as a missing image. Each cell carries a line of substance so this is a band with
 * weight, not a chip row. */
export function ProofRail() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      <div className="shell py-12 lg:py-14">
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-3 lg:gap-x-0 lg:divide-x lg:divide-on-dark/12">
          {badges.map((b) => {
            const I = iconMap[b.icon];
            return (
              <li key={b.name} className="lg:px-10 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-start gap-4">
                  {b.logo ? (
                    /* the mark in its own colors, never recolored */
                    <div className="relative h-10 w-32 shrink-0">
                      <Image src={b.logo} alt={`${b.name} — ${b.role}`} fill sizes="128px" className="object-contain object-left" />
                    </div>
                  ) : (
                    <span className="channel-tile shrink-0" aria-hidden><I className="size-6" /></span>
                  )}
                  <div>
                    <p className="font-display text-2xl font-bold leading-none text-on-dark">{b.name}</p>
                    <p className="label mt-2 text-2xs uppercase tracking-[0.14em] text-accent">{b.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-on-dark-muted">{b.detail}</p>
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
          title="Eleven ways to light an Omaha property."
          lede="Every one of these runs on the same channel, the same controller and the same app. Add to it whenever you like."
        />
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
                  <p className="label mb-2 text-2xs uppercase tracking-[0.14em] text-accent-ink">Most requested</p>
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
          <article className="flex flex-col rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] ring-1 ring-accent/20">
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
  const hasHardware = photoExists("channelCloseUp");
  return (
    <section className="section bg-muted">
      <div className="shell grid items-start gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
        <div>
          {hasHardware ? (
            <Photo slot="channelCloseUp" sizes="(min-width:1024px) 52vw, 100vw" />
          ) : (
            /* no-photo: a labelled diagram of the channel assembly. Nobody in this trade does this. */
            <figure className="overflow-hidden rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] sm:p-7">
              <svg viewBox="0 0 520 250" className="w-full" role="img" aria-label="Cross-section of the Brytr channel clipped into a fascia board">
                <rect x="0" y="0" width="400" height="260" fill="none" />
                {/* fascia */}
                <rect x="60" y="40" width="34" height="180" rx="2" className="fill-on-dark/12" />
                <text x="40" y="34" textAnchor="middle" className="fill-on-dark-muted" fontSize="11" fontFamily="var(--font-utility)">FASCIA</text>
                {/* soffit */}
                <rect x="94" y="196" width="150" height="24" rx="2" className="fill-on-dark/10" />
                <text x="196" y="238" textAnchor="middle" className="fill-on-dark-muted" fontSize="11" fontFamily="var(--font-utility)">SOFFIT</text>
                {/* channel body */}
                <path d="M96 92h74v54H96z" className="fill-secondary/60" />
                <path d="M96 92h74v8H96z" className="fill-secondary" />
                <text x="256" y="98" className="fill-on-dark" fontSize="12" fontFamily="var(--font-utility)">EXTRUDED CHANNEL</text>
                {/* leds */}
                <g className="fill-accent">
                  <circle cx="112" cy="120" r="5" /><circle cx="133" cy="120" r="5" /><circle cx="154" cy="120" r="5" />
                </g>
                <text x="256" y="126" className="fill-accent" fontSize="12" fontFamily="var(--font-utility)">ADDRESSABLE LED · 4 IN.</text>
                {/* diffuser */}
                <rect x="96" y="140" width="74" height="10" rx="3" className="fill-on-dark/70" />
                <text x="256" y="152" className="fill-on-dark" fontSize="12" fontFamily="var(--font-utility)">FROSTED DIFFUSER</text>
                {/* light throw */}
                <path d="M104 152 74 232h118l-30-80z" className="fill-accent/12" />
                <text x="256" y="182" className="fill-on-dark-muted" fontSize="12" fontFamily="var(--font-utility)">IP66 SEALED</text>
                <line x1="182" y1="94" x2="248" y2="94" className="stroke-on-dark/35" strokeWidth="1" />
                <line x1="182" y1="122" x2="248" y2="122" className="stroke-accent/50" strokeWidth="1" />
                <line x1="182" y1="148" x2="248" y2="148" className="stroke-on-dark/35" strokeWidth="1" />
              </svg>
              <figcaption className="label mt-4 text-2xs uppercase tracking-[0.16em] text-on-dark-muted">
                The assembly, in section. Fastened into fascia, never through shingles.
              </figcaption>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-on-dark/12 pt-6">
                {[
                  ["Channel", "Extruded aluminum"],
                  ["Diffuser", "Frosted polycarbonate"],
                  ["LED spacing", "4 in., addressable"],
                  ["Rating", "IP66 sealed"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label text-2xs uppercase tracking-[0.12em] text-on-dark-muted">{k}</dt>
                    <dd className="u mt-1 text-sm font-medium text-on-dark">{v}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          )}
          {/* fills the left column to match the right, with the argument the drawing implies */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Into fascia, never shingles", "Every penetration sealed as it is made, not bridged over afterwards."],
              ["Mitered at every transition", "Valleys, dormers and returns. This is where amateur runs show from the curb."],
              ["Concealed wire runs", "No visible drops down a downspout or across a soffit."],
              ["Capped terminations", "Sealed end caps, not tape. Water ingress is the most common real failure."],
            ].map(([h, p2]) => (
              <div key={h} className="rounded-md bg-card p-5 shadow-[var(--shadow-sm)]">
                <p className="font-display text-sm font-bold text-foreground">{h}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{p2}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHead
            
            title="We install the good stuff, and we will tell you which is which."
            lede="Most installers carry one brand and therefore have one recommendation. We carry a premium tier and a value tier, which means we have no reason to talk you into either."
          />
          <div className="mt-8 space-y-3">
            {tiers.map((t) => (
              <Link key={t.name} href={t.href} className="block rounded-md border border-border bg-card p-5 transition-colors duration-[--dur-fast] hover:border-accent-deep">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg text-foreground">{t.name}</h3>
                  <span className="label text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.tier}</span>
                </div>
                <p className="label mt-1 text-xs uppercase tracking-[0.1em] text-accent-ink">on {t.on}</p>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{t.note}</p>
              </Link>
            ))}
          </div>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {["25 year LED rating", "IP66 weather sealed", "App controlled"].map((b) => (
              <li key={b} className="rounded-sm border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground">{b}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button asChild><Link href="/compare">Compare all 10 brands</Link></Button>
            <TextLink href="/lighting-systems">See every system</TextLink>
          </div>
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
  const hasCrew = photoExists("crewWide");
  return (
    <section className="section bg-primary pb-0">
      <div className="shell">
        <SectionHead onDark eyebrow="Why Brytr" title="Four things most installers will not do." />
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <article key={w.h} className="rounded-lg bg-raise p-6 shadow-[var(--shadow-dark)] ring-1 ring-accent/12">
              <span className="channel-tile mb-5" aria-hidden><w.icon className="size-7" /></span>
              <h3 className="text-lg text-on-dark">{w.h}</h3>
              <p className="mt-2.5 text-[0.95rem] text-on-dark-muted">{w.p}</p>
              <ul className="mt-4 space-y-2">{w.l.map((i) => <Check key={i} onDark>{i}</Check>)}</ul>
            </article>
          ))}
        </div>
      </div>
      {/* bridge: the crew band straddles into the next section */}
      <div className="relative mt-14">
        <div className="shell">
          {hasCrew ? (
            <Photo slot="crewWide" sizes="100vw" />
          ) : (
            <div className="rounded-lg bg-raise px-7 py-9 ring-1 ring-accent/12 sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow eyebrow--on-dark">Founded in Omaha</p>
                  <p className="mt-4 max-w-[52ch] font-display text-2xl font-bold leading-tight text-on-dark">
                    Zac and Sam started Brytr because every quote in this market came from somebody selling exactly one brand.
                  </p>
                </div>
                <dl className="grid grid-cols-3 gap-6 lg:gap-9">
                  {[["1.2M", "Lights installed"], ["177", "Five-star reviews"], ["2", "Tiers carried"]].map(([f, l]) => (
                    <div key={l}>
                      <dt className="u text-3xl font-medium text-on-dark">{f}</dt>
                      <dd className="mt-1 text-xs text-on-dark-muted">{l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
        <div className="h-14 bg-primary" />
      </div>
    </section>
  );
}


