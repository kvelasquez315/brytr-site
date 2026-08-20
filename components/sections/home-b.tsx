import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { cities, metroCities, outstateCities, iowaCities } from "@/content/cities";
import { reviews, reviewProof } from "@/content/reviews";
import { homeFaqs } from "@/content/faqs";
import { compares } from "@/content/compares";
import { posts } from "@/content/blog";
import { Photo, photoExists } from "@/components/ui/photo";
import { Button } from "@/components/ui/button";
import { SectionHead, Check, TextLink, QuoteForm, ChannelEdge } from "@/components/ui/bits";
import { Faq } from "./faq";
import { ProjectTabs } from "./project-tabs";
import { IcSceneStack, IcSchedule, IcZones, IcDimmer, IcFinancing, IcSameDay, IcMeasured, IcHoaPaperwork, IcStars, IcVerified, IcHardHat, IcTwoTiers, IcWarranty } from "@/components/icons";

/* 10 — THE APP · asymmetric split reversed · neutral */
const appFeatures = [
  { icon: IcSceneStack, h: "Saved scenes", p: "Build a scene once, tap it forever. Most customers end up with eight to twelve." },
  { icon: IcSchedule, h: "Sunset scheduling", p: "On at dusk, off at 11, all year, without you touching it." },
  { icon: IcZones, h: "Zones per elevation", p: "Front on, back off. Roofline warm white while the pergola runs color." },
  { icon: IcDimmer, h: "Per-zone dimming", p: "One to a hundred percent. Dinner party bright is not Christmas bright." },
];
export function AppSplit() {
  const hasApp = photoExists("appScreen");
  return (
    <section className="section bg-background">
      <div className="shell grid items-center gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
        <div>
          <SectionHead
            
            title="Every light, every color, from the couch."
            lede="The hardware is what you buy. The app is what you actually use, most nights, for years."
          />
          <ul className="mt-8 space-y-5">
            {appFeatures.map((f) => (
              <li key={f.h} className="flex gap-4">
                <span className="channel-tile channel-tile--light" aria-hidden><f.icon className="size-7" /></span>
                <div>
                  <h3 className="text-lg text-foreground">{f.h}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted-foreground">{f.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8"><TextLink href="/lighting-systems/app-and-controls">See the app and controls</TextLink></div>
        </div>
        <div className="relative">
          {hasApp ? (
            <Photo slot="appScreen" className="mx-auto max-w-sm" sizes="(min-width:1024px) 30vw, 70vw" />
          ) : (
            /* no-photo: render the scene list as real UI rather than a phone mockup image */
            <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-primary p-4 shadow-[var(--shadow-dark)] ring-1 ring-accent/15">
              <div className="flex items-center justify-between px-2 pb-3 pt-1">
                <span className="label text-2xs uppercase tracking-[0.18em] text-on-dark-muted">Scenes</span>
                <span className="u text-2xs text-accent">Front elevation</span>
              </div>
              {[["Everyday warm white", "100%", true], ["Husker red", "80%", false], ["Halloween", "70%", false], ["Christmas", "90%", false], ["Fourth of July", "85%", false], ["Off at 11:00 pm", "Scheduled", false]].map(([n, v, on]) => (
                <div key={n as string} className={`mb-2 flex items-center justify-between rounded-md px-3 py-3.5 ${on ? "bg-accent/15 ring-1 ring-accent/40" : "bg-raise"}`}>
                  <span className="text-[0.95rem] text-on-dark">{n as string}</span>
                  <span className="u text-xs text-on-dark-muted">{v as string}</span>
                </div>
              ))}
            </div>
          )}
          {/* second element so the column is genuinely full */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
              <p className="label text-2xs uppercase tracking-[0.14em] text-muted-foreground">Zones on a typical home</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex justify-between"><span>Front elevation</span><span className="u text-muted-foreground">Warm white</span></li>
                <li className="flex justify-between"><span>Side elevations</span><span className="u text-muted-foreground">Off</span></li>
                <li className="flex justify-between"><span>Pergola</span><span className="u text-muted-foreground">Dimmed 40%</span></li>
                <li className="flex justify-between"><span>Landscape</span><span className="u text-muted-foreground">Warm white</span></li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-lg)]">
              <p className="label text-2xs uppercase tracking-[0.14em] text-muted-foreground">A week of scheduling</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex justify-between"><span>Mon to Thu</span><span className="u text-muted-foreground">Dusk to 10pm</span></li>
                <li className="flex justify-between"><span>Fri and Sat</span><span className="u text-muted-foreground">Dusk to 12am</span></li>
                <li className="flex justify-between"><span>Game days</span><span className="u text-muted-foreground">Team colors</span></li>
                <li className="flex justify-between"><span>Holidays</span><span className="u text-muted-foreground">By calendar</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 — FOUNDERS + STORY · two portrait cards + story column · neutral-deep */
export function Founders() {
  const slots = ["founderZac", "founderSam"];
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead title="Zac and Sam started Brytr in Omaha." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[62fr_38fr] lg:gap-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {site.founders.map((f, i) => (
              <article key={f.name} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]">
                {photoExists(slots[i]) ? (
                  <Photo slot={slots[i]} sizes="(min-width:1024px) 28vw, 50vw" />
                ) : (
                  <div className="aspect-4/5 bg-primary p-6">
                    <div className="flex h-full flex-col justify-end">
                      <span className="u text-[4rem] font-medium leading-none text-accent">
                        {f.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <p className="label mt-3 text-2xs uppercase tracking-[0.16em] text-on-dark-muted">{f.role}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl text-foreground">{f.name}</h3>
                  <p className="label mt-1 text-xs uppercase tracking-[0.14em] text-accent-ink">{f.role}</p>
                  <ul className="mt-4 space-y-2">{f.handles.map((h) => <Check key={h}>{h}</Check>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <div className="prose-body">
            <p className="text-lg text-foreground">
              Brytr is two people who got tired of watching Omaha homeowners get a single quote for a
              single brand and be told it was the only good option.
            </p>
            <p className="mt-4 text-muted-foreground">
              So they built the opposite. Brytr stocks a premium system and a value system, runs its own
              W2 crews rather than subcontracting the install, and services other companies&rsquo; work
              when those companies stop answering. It is a less profitable way to run a lighting company
              and a much better way to keep 177 five-star reviews.
            </p>
            <p className="mt-4 text-muted-foreground">
              Zac handles design and the drone work. Sam handles product, install standards and crew
              training. On most jobs you will meet both of them.
            </p>
            <div className="mt-6"><TextLink href="/about">More about Brytr</TextLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 12 — BRYTR VS THE TYPICAL INSTALLER · comparison table · primary */
const vsRows: [string, string, string][] = [
  ["Who does the install", "Our own W2 crew", "Subcontracted, often a different crew each week"],
  ["When something breaks", "We come out, we hold the warranty", "You chase the manufacturer"],
  ["Brands offered", "Premium and value, both stocked", "One brand, so one recommendation"],
  ["Day and night verification", "yes", "no"],
  ["Written warranty terms up front", "yes", "no"],
  ["Quote method", "On-site measure, written quote", "Phone estimate, revised on the day"],
  ["Financing", "yes", "no"],
  ["Services other brands", "yes", "no"],
];
function Yes() { return <span className="inline-flex items-center gap-2 text-on-dark"><svg viewBox="0 0 16 16" className="size-4 text-accent" fill="none" aria-hidden><path d="m2.5 8.4 3.2 3.2L13.5 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Yes</span>; }
function No() { return <span className="inline-flex items-center gap-2 text-on-dark-muted"><svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>No</span>; }
const cell = (v: string, muted?: boolean) =>
  v === "yes" ? <Yes /> : v === "no" ? <No /> : <span className={muted ? "on-dark-cell-muted" : "on-dark-cell"}>{v}</span>;

export function VersusTable() {
  return (
    <section className="section bg-primary">
      <div className="shell">
        <SectionHead onDark eyebrow="The difference" title="Brytr versus the typical installer." />
        <div className="mt-10 overflow-x-auto rounded-lg ring-1 ring-on-dark/12">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">How Brytr compares to a typical permanent lighting installer</caption>
            <thead>
              <tr className="bg-raise">
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">&nbsp;</th>
                <th scope="col" className="border-x-2 border-accent px-5 py-4 text-sm font-semibold text-on-dark">
                  <span className="label text-2xs uppercase tracking-[0.16em] text-accent">Brytr</span>
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-on-dark-muted">The typical installer</th>
              </tr>
            </thead>
            <tbody>
              {vsRows.map(([spec, a, b], i) => (
                <tr key={spec} className={i % 2 ? "bg-primary" : "bg-on-dark/[0.03]"}>
                  <th scope="row" className="px-5 py-4 text-[0.95rem] font-medium text-on-dark">{spec}</th>
                  <td className="border-x-2 border-accent px-5 py-4 text-[0.95rem]">{cell(a)}</td>
                  <td className="px-5 py-4 text-[0.95rem]">{cell(b, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* 13 — SERVICE AREA · split, real map left · neutral */
export function ServiceArea() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="Where we work"
          title="Omaha metro, Lincoln, western Iowa and eastern Nebraska."
          lede="Eighteen cities, each with its own page, real project photos and drive time. If your town is not on this list, call us and ask."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[44fr_56fr] lg:gap-12">
          {/* Was an OpenStreetMap iframe. It rendered as an empty grey box whenever the
            * embed was slow or blocked, which is a broken-looking void in the middle of
            * the page and a third-party dependency we do not control. A real photograph
            * of a finished install says "we work here" better than a generic basemap. */}
          <figure className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-lg)]">
            <div className="relative aspect-4/3">
              <Image
                src="/img/g-blue-white.jpg"
                alt="A finished Brytr install lit blue and white on an Omaha home at night"
                fill
                sizes="(min-width:1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-4 p-5">
              <span className="label text-2xs uppercase tracking-[0.16em] text-accent">West Omaha</span>
              <span className="text-[0.95rem] text-on-dark-muted">
                Same crews across all eighteen cities.
              </span>
            </figcaption>
          </figure>
          <div>
            <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${c.slug}`}
                    className="flex h-19 flex-col justify-center rounded-md border border-border bg-card px-4 transition-colors duration-[--dur-fast] hover:border-accent-deep"
                  >
                    <span className="font-semibold text-foreground">{c.name}{c.state === "IA" ? ", IA" : ""}</span>
                    <span className="u mt-0.5 text-xs text-muted-foreground">{c.drive}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              {metroCities.length} metro cities, {outstateCities.length} in Lincoln and eastern Nebraska,
              and {iowaCities.length} in western Iowa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 15 — SEASON CTA BAND · short band · primary */
export function CtaBand() {
  return (
    <section className="bg-primary">
      <div className="shell py-16 text-center">
        <h2 className="mx-auto max-w-[38ch] text-[clamp(1.7rem,3vw,2.4rem)] text-on-dark">
          Install season runs out before the holidays do.
        </h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-on-dark-muted">
          Design consultations booked before November 15 install in time for Christmas. After that we
          are into the new year.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/free-design-consultation">Get a free design consultation</Link></Button>
          <Button asChild size="lg" variant="outline-dark"><a href={site.phoneHref} className="u">{site.phone}</a></Button>
        </div>
      </div>
    </section>
  );
}

/* 16 — THE BRYTR WAY · numbered process row · neutral */
const steps = [
  ["Free design consultation", "We come out, walk the property, and talk through what you actually want lit. No charge and no obligation."],
  ["See it on your own house", "We show you the app and the scene library on a house like yours, so you are not buying from a brochure."],
  ["On-site measure and written quote", "Linear feet, elevations, zones, tier. You get a real number in writing, not a range on the phone."],
  ["Install by our own crew", "One day for most homes. Channel into fascia, sealed, mitered at every corner, wire concealed."],
  ["Day and night verification", "We check the sightline from the curb in daylight, then walk every scene with you after dark before we leave."],
];
export function ProcessRow() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead title="From the first walk-around to the night it turns on." />
        <ol className="mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map(([h, p], i) => (
            <li key={h} className="relative">
              <span className="u pointer-events-none absolute -top-3 left-0 text-[3.6rem] font-medium leading-none text-foreground/25" aria-hidden>
                {i + 1}
              </span>
              <div className="relative pt-8">
                <h3 className="text-lg text-foreground">{h}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 17 — REVIEWS · neutral-deep
 * Review TEXT is not seeded (see content/reviews.ts). Until real Google review text
 * is pasted in, this renders the confirmed-proof layout instead of fabricated
 * testimonials. It switches to review cards automatically once the array is filled. */
const proofFacts = [
  { icon: IcStars, h: "5.0 average, 177 reviews", p: "Every one of them on Google, where you can read them yourself rather than take our word for it." },
  { icon: IcHardHat, h: "W2 crews on every install", p: "Not a subcontractor network. The same people who quoted your job are the ones on the ladder." },
  { icon: IcVerified, h: "Verified in daylight and dark", p: "We do not close a job until you have signed off on both states of the system." },
  { icon: IcTwoTiers, h: "Two tiers, honestly compared", p: "We publish where our cheaper system beats our expensive one. Ask a single-brand dealer to do that." },
  { icon: IcWarranty, h: "Warranty in writing, up front", p: "Manufacturer coverage plus our workmanship coverage, both on paper before you sign." },
  { icon: IcMeasured, h: "1.2M lights installed locally", p: "All of it in and around Omaha. This is the only market we work in." },
];
export function Reviews() {
  if (reviews.length === 0) {
    return (
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="Omaha says"
            title="What Omaha homeowners say after the crew leaves."
            lede="We would rather show you the reviews on Google than retype them here. In the meantime, here is what those reviews consistently mention."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proofFacts.map((f) => (
              <article key={f.h} className="rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <span className="channel-tile channel-tile--light mb-5" aria-hidden><f.icon className="size-7" /></span>
                <h3 className="text-lg text-foreground">{f.h}</h3>
                <p className="mt-2 text-[0.95rem] text-muted-foreground">{f.p}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <p className="u text-sm text-muted-foreground">
              {reviewProof.average} average · {reviewProof.count} reviews · {reviewProof.platform}
            </p>
            <TextLink href="/reviews">Read the reviews</TextLink>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead eyebrow="Omaha says" title="Homeowners keep saying the same thing." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <blockquote key={i} className={i === 1 ? "rounded-lg bg-primary p-6" : "rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]"}>
              <IcStars className={i === 1 ? "size-5 text-accent" : "size-5 text-accent"} />
              <p className={`mt-4 ${i === 1 ? "font-display text-xl text-on-dark" : "text-[0.95rem] text-muted-foreground"}`}>{r.text}</p>
              <footer className={`mt-4 border-t pt-3 text-sm ${i === 1 ? "border-on-dark/15 text-on-dark-muted" : "border-border text-muted-foreground"}`}>
                {r.name} · {r.town}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 18 — FINANCING · benefit list + second form · primary · signature edge #2 */
const finBenefits = [
  { icon: IcFinancing, h: "No money down options", p: "Approved applicants can start with nothing up front." },
  { icon: IcSameDay, h: "Fast approval", p: "Usually while we are still at your kitchen table." },
  { icon: IcMeasured, h: "Free on-site assessment", p: "The measure, the design and the written quote cost nothing." },
  { icon: IcHoaPaperwork, h: "We handle the HOA paperwork", p: "We pull the covenant and submit to your board ourselves." },
];
export function Financing() {
  return (
    <section className="bg-primary">
      <ChannelEdge />
      <div className="shell grid items-start gap-10 py-20 lg:grid-cols-[44fr_56fr] lg:gap-14">
        <div>
          <SectionHead onDark eyebrow="Financing" title="Spread it out, or pay it once." />
          <ul className="mt-8 space-y-5">
            {finBenefits.map((b) => (
              <li key={b.h} className="flex gap-4">
                <span className="channel-tile" aria-hidden><b.icon className="size-7" /></span>
                <div>
                  <h3 className="text-lg text-on-dark">{b.h}</h3>
                  <p className="mt-1 text-[0.95rem] text-on-dark-muted">{b.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm text-on-dark-muted">
            Exact terms come from our lending partner and we will show you the real numbers at the
            consultation. We do not advertise a monthly payment that only applies to a perfect credit file.
          </p>
          <div className="mt-6"><TextLink onDark href="/pricing">See full pricing</TextLink></div>
        </div>
        <QuoteForm variant="financing" heading="Check your financing options" submitLabel="Check my financing options" />
      </div>
    </section>
  );
}

/* 19 — FAQ · accordion · neutral */
export function HomeFaq() {
  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead eyebrow="Before you buy" title="The questions we get every week." />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <Faq items={homeFaqs} />
          <aside className="rounded-lg bg-primary p-6 shadow-[var(--shadow-dark)] lg:sticky-0">
            <h3 className="text-xl text-on-dark">Still deciding?</h3>
            <p className="mt-2.5 text-[0.95rem] text-on-dark-muted">
              The consultation is free and we design it on your actual house. Most people decide during it.
            </p>
            <Button asChild size="block" className="mt-5"><Link href="/free-design-consultation">Book a consultation</Link></Button>
            <p className="mt-4 text-sm text-on-dark-muted">Or call <a href={site.phoneHref} className="u text-accent">{site.phone}</a></p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/faq">See all questions</TextLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* 20 — FINAL CTA · split, full form right · neutral-deep */
export function FinalCta() {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-start gap-10 lg:grid-cols-[52fr_48fr] lg:gap-14">
        <div>
          <SectionHead title="See it on your house before you buy." />
          <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
            We measure on site, design it with you after dark, and hand you a written quote. If you
            decide not to do it, you have lost an hour and gained a plan.
          </p>
          <ul className="mt-7 space-y-3">
            <Check>Free on-site assessment</Check>
            <Check>Written quote, no pressure</Check>
            <Check>Financing available</Check>
          </ul>
          <div className="mt-9 border-t border-border pt-7">
            <p className="u text-sm text-muted-foreground">Or call us directly</p>
            <a href={site.phoneHref} className="u mt-1 block text-3xl font-medium text-foreground hover:text-accent-deep">{site.phone}</a>
          </div>
        </div>
        <QuoteForm variant="full" />
      </div>
    </section>
  );
}

export { ProjectTabs };

/* 13b — BRAND COMPARISONS · 3 x 3 grid · neutral-deep
 *
 * Added because the homepage never surfaced these nine pages, and "is Jellyfish any
 * good?" is the highest-intent question a permanent-lighting shopper has. Brytr's
 * actual differentiator is that they stock two systems and will tell you which one is
 * right, so putting the comparisons on the homepage is the argument, not decoration.
 * The blurb is each page's own verdict, clamped — no new copy, nothing invented. */
export function CompareGrid() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          eyebrow="Shopping other brands"
          title="We sell both, so we can tell you which one loses."
          lede="Nine head-to-head comparisons, including the ones where the cheaper system is the honest answer. A single-brand dealer cannot write these pages."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Three, not nine. Nine was a second twelve-card grid on the same page; the
            * other six are one click away and all nine are indexed either way. */}
          {compares
            .filter((c) => ["haven-vs-jellyfish-lighting", "haven-vs-gemstone-lights", "haven-vs-trimlight"].includes(c.slug))
            .map((c) => (
            <article key={c.slug} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
              <p className="label text-2xs uppercase tracking-[0.14em] text-accent-ink">
                {c.labor ? "Professional vs DIY" : c.neutral ? "Neither is ours" : "We install both"}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
                {c.a} <span className="text-muted-foreground">vs</span> {c.b}
              </h3>
              <p className="mt-3 line-clamp-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {c.verdict}
              </p>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <TextLink href={`/compare/${c.slug}`}>Read the comparison</TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <TextLink href="/compare">Every brand we are asked about</TextLink>
        </div>
      </div>
    </section>
  );
}

/* 19b — WRITING · 3 posts · neutral
 *
 * The blog had twelve finished articles and not one internal link from the homepage,
 * which is a straight SEO defect as well as a wasted trust signal. Three posts, the
 * ones that answer pre-purchase questions. */
export function Writing() {
  const featured = [
    "are-permanent-christmas-lights-worth-it",
    "permanent-lights-vs-hanging-christmas-lights",
    "how-to-choose-a-permanent-lighting-installer",
  ]
    .map((sl) => posts.find((p) => p.slug === sl))
    .filter((p): p is (typeof posts)[number] => !!p);

  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHead
          eyebrow="From the blog"
          title="The questions people ask before they spend the money."
          lede="Written by the people who install it, including the parts that argue against buying. Twelve more on the blog."
        />
        {/* A list, not cards. The page already has a card grid for services and another
          * for comparisons; a third would be the same design a third time. */}
        <ul className="mt-9 divide-y divide-border border-y border-border">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
              >
                <span className="max-w-[52ch]">
                  <span className="block font-display text-lg font-bold leading-snug text-foreground group-hover:underline">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] text-muted-foreground">{p.dek}</span>
                </span>
                <span className="label shrink-0 text-2xs uppercase tracking-[0.14em] text-accent-ink">
                  {p.category} · {p.read}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <TextLink href="/blog">Everything we have written</TextLink>
        </div>
      </div>
    </section>
  );
}
