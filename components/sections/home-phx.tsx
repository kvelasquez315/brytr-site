import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { homeFaqs } from "@/content/faqs";
import { iconMap, type IconKey } from "@/content/icon-map";
import { SectionHead, QuoteForm } from "@/components/ui/bits";
import { Faq } from "@/components/sections/faq";

/* THE HOME PAGE, laid out section for section like phoenixroofingandrepair.com.
 *
 * The client: "basically copy their exact layout of their website, just with our brand colors and
 * information and pictures. The layout should be exactly the same." So I opened it, screenshotted
 * every section, and read the tokens out of the live DOM rather than guessing:
 *
 *   palette   white #FFFFFF surfaces, near-black #1E1E1E for dark cards and buttons, cream
 *             #FFF6F0 for the alternating bands, orange #FD7206 for every accent, a very dark
 *             brown #1C0900 for the one promo card.
 *   radii     PILL on every button (38 of them), 12px on cards, 20px on the big blocks.
 *   shadow    rgba(115,44,0,0.09) 0 5px 10px - soft and warm-tinted, never a hard lift.
 *   type      H2 at 50px/800 in a condensed face, body at 18-20px. One heading breaks the rule:
 *             "What Our Clients Say" at 64px, which is the page's loudest moment.
 *
 * BRYTR'S PALETTE MAPS ONTO IT ONE FOR ONE: their orange is our amber, their near-black is our
 * navy, their cream is our warm neutral, their white is our card. So nothing here needed a new
 * colour - only the shapes changed.
 *
 * THE ORDER, THEIRS THEN OURS:
 *
 *   1  hero, badges + form card          ->  same
 *   2  certifications logo row           ->  the Google rating (see the note in proof-rail.tsx)
 *   3  who we are, mosaic + features     ->  same
 *   4  services, 5 cards + 1 promo card  ->  same
 *   5  contractor split + award card     ->  same, award card becomes a real figure
 *   6  two brothers                      ->  two founders. Brytr has exactly two.
 *   7  find the right service            ->  the colour demo, our signature, in that slot
 *   8  why homeowners trust us           ->  same
 *   9  what our clients say (64px)       ->  same
 *   10 recent work across the valley     ->  recent work around Omaha
 *   11 ready for a roof you can rely on  ->  the amber call to action
 *   12 FAQ accordion                     ->  same, 25 real questions already written
 *
 * WHERE I COULD NOT MATCH THEM, AND DID NOT PRETEND TO. Phoenix carries eight industry
 * certifications, an Inc. 5000 ranking, a Reader's Choice award and a customer video. Brytr has
 * none of those on file. Every slot that held one of them now holds a figure the client has
 * actually confirmed, or a real photograph, and the notes below say which is which. Inventing a
 * seal or an award is the one thing that would make this page worse than the one it replaces.
 */

/* ---------- shared parts ---------------------------------------------------- */

function Arrow() {
  return (
    <span className="ml-1.5 inline-block transition-transform duration-[--dur-fast] group-hover:translate-x-1" aria-hidden>
      &rarr;
    </span>
  );
}

/* Phoenix's bullet: a solid accent disc with a white tick in it, never a bare dash. */
function Ticks({ items, cols = 1, flush }: { items: string[]; cols?: 1 | 2; flush?: boolean }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${flush ? "" : "mt-5"} ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5">
          <span className="mt-0.5 grid size-[1.1rem] shrink-0 place-items-center rounded-full bg-accent" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-3 text-accent-foreground" fill="none">
              <path d="m3.2 8.4 3 3 6.6-6.8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[0.95rem] leading-snug text-muted-foreground">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function DarkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="tap-44 inline-flex h-12 items-center rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
    >
      {children}
    </Link>
  );
}

function Stars({ size = "1rem" }: { size?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="Five out of five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="text-accent" width={size} height={size} fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.3l-4.97 2.72 1.03-5.6L2 7.52l5.53-.72z" />
        </svg>
      ))}
    </span>
  );
}

/* ==========================================================================
 * 3 - WHO WE ARE. Phoenix: a four-photo mosaic with a cream award card set into the middle of it
 * on the left, and on the right an icon eyebrow, a headline, a paragraph, a 2x2 grid of icon
 * features divided by hairlines, a second paragraph ending in a bold sentence, and a dark pill.
 *
 * Their middle card is the Inc. 5000 ranking. Brytr has no ranking, so ours carries the one number
 * the client confirmed on camera: 1.2 million lights installed locally. Same slot, real figure.
 * ========================================================================= */
const ABOUT_FEATURES: { icon: IconKey; title: string; body: string }[] = [
  { icon: "wholeHome", title: "Whole property", body: "Roofline, soffit, beds, patio and hardscape on one channel and one app." },
  { icon: "hardHat", title: "Our own crews", body: "W2 employees on Brytr payroll, never subcontracted to anybody." },
  { icon: "seasonal", title: "Every night of the year", body: "Warm white as the default, saved color scenes for the dates you choose." },
  { icon: "dayNight", title: "Checked twice", body: "Signed off lit after dark, then again from the street in daylight." },
];

export function WhoWeAre() {
  const m = [images.installDayGarage, images.crewRoofFascia, images.walkthroughDusk, images.installDayPavilion];
  return (
    <section className="section bg-background">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        {/* THE MOSAIC, AND WHY IT IS A FLEX COLUMN RATHER THAN A GRID.
          *
          * It was `grid gap-4` with three fixed rows, so its height was whatever four 4:3 crops
          * and a card happened to add up to - 720px against a copy column of 925px. That left a
          * 290px hole in the bottom left of the page's third section, which is the site's worst
          * failure mode arriving by arithmetic rather than by layout: "Blank space / low density.
          * Deal-breaking."
          *
          * Now the two photo rows GROW. The section's height is set by the copy column, the rows
          * split whatever is left over after the figure card, and the crops go to `h-full` above
          * lg so they fill rather than letterbox. Both columns end on the same line at every
          * width, and if the copy ever gets longer the photographs get taller by themselves. */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
            {m.slice(0, 2).map((img, i) =>
              img?.src ? (
                <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary lg:aspect-auto lg:h-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
                </div>
              ) : null
            )}
          </div>

          {/* the figure card, set into the mosaic where Phoenix puts its Inc. 5000 seal */}
          <div className="flex items-center gap-6 rounded-lg bg-muted p-6">
            <p className="u shrink-0 font-display text-[2.75rem] font-bold leading-none text-accent-ink">1.2M</p>
            <div>
              <h3 className="font-display text-[1.15rem] font-bold leading-snug text-foreground">
                Lights installed around Omaha
              </h3>
              <p className="mt-1.5 text-[0.9rem] leading-snug text-muted-foreground">
                Every one of them on a house or a business inside our own service area, not a
                national franchise total.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
            {m.slice(2, 4).map((img, i) =>
              img?.src ? (
                <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary lg:aspect-auto lg:h-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* the copy column */}
        <div>
          <SectionHead
            icon="roofline"
            eyebrow="Who we are"
            title="Permanent lighting installers, based in Omaha"
            lede="Brytr Co was started by two people who still run the walk-arounds. We install permanent architectural lighting across the Omaha metro, Lincoln, western Iowa and eastern Nebraska - houses, and the odd storefront or clubhouse."
          />

          <dl className="mt-8 grid gap-x-10 gap-y-7 border-t border-border pt-7 sm:grid-cols-2">
            {ABOUT_FEATURES.map((f) => {
              const I = iconMap[f.icon];
              return (
                <div key={f.title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-muted text-accent-ink" aria-hidden>
                    <I className="size-7" />
                  </span>
                  <div>
                    <dt className="font-display text-[1.02rem] font-bold leading-snug text-foreground">{f.title}</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-snug text-muted-foreground">{f.body}</dd>
                  </div>
                </div>
              );
            })}
          </dl>

          <p className="mt-7 border-t border-border pt-7 text-[1rem] leading-relaxed text-muted-foreground">
            The people who quote your roof are the people who install it, and the same crew is there
            from the measure to the handover.{" "}
            <span className="font-semibold text-foreground">
              We do not leave until you have seen it lit, and we do not sell you a run you do not
              need.
            </span>
          </p>

          <div className="mt-8">
            <DarkPill href="/about">More about us</DarkPill>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 4 - SERVICES. Phoenix: cream band, a CENTRED icon eyebrow and headline, then a three-across grid
 * of white cards - photograph on top with a round white icon badge overlapping its corner, title,
 * paragraph, accent-tick list, and a full-width DARK pill at the foot. Five service cards and then
 * a sixth cell that is not a service at all: a dark promo card with a photograph in it and a white
 * pill, headed "Not Sure What Your Roof Needs?".
 *
 * Ours is the same grid with the five places Brytr lights, and the sixth cell is the free
 * consultation, which is our equivalent of their quiz.
 * ========================================================================= */
const SERVICE_CARDS: { slug: string; label: string; icon: IconKey; cta: string }[] = [
  { slug: "permanent-roofline-lighting", label: "Roofline and eaves", icon: "roofline", cta: "See roofline lighting" },
  { slug: "landscape-lighting", label: "Landscape and beds", icon: "pathLight", cta: "See landscape lighting" },
  { slug: "patio-pergola-bistro-lighting", label: "Patio and pergola", icon: "pergola", cta: "See patio lighting" },
  { slug: "hardscape-lighting", label: "Walls, steps and coping", icon: "hardscape", cta: "See hardscape lighting" },
  { slug: "soffit-lighting", label: "Soffit and architectural", icon: "soffit", cta: "See soffit lighting" },
];

export function Services() {
  const cards = SERVICE_CARDS.map((c) => {
    const s = services.find((x) => x.slug === c.slug);
    return s ? { ...c, svc: s, img: s.photo ? images[s.photo] : undefined } : null;
  }).filter(Boolean);

  return (
    <section className="section bg-muted">
      <div className="shell">
        <SectionHead
          align="center"
          icon="wholeHome"
          eyebrow="Services"
          title="What are you looking to light?"
          lede="One system covers the whole property. Pick the part you want first - the rest can be added to the same channel and the same app whenever you like."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const I = iconMap[c!.icon];
            return (
              <article
                key={c!.slug}
                className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  {c!.img?.src && (
                    <Image
                      src={c!.img.src}
                      alt={c!.img.alt}
                      fill
                      sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  {/* Phoenix's round icon badge, overlapping the top-left corner of the photo. */}
                  <span
                    className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-card text-accent-ink shadow-[var(--shadow-lg)]"
                    aria-hidden
                  >
                    <I className="size-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.35rem] font-bold leading-tight text-foreground">{c!.label}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{c!.svc.short}</p>
                  <Ticks items={c!.svc.includes.slice(0, 3)} />
                  <div className="mt-7 flex-1" />
                  <Link
                    href={`/services/${c!.slug}`}
                    className="tap-44 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
                  >
                    {c!.cta}
                  </Link>
                </div>
              </article>
            );
          })}

          {/* THE SIXTH CELL, Phoenix's promo card. Theirs is a quiz with a photograph of the owner;
            * ours is the free consultation, which is the same offer without the quiz we do not have.
            * A real install photograph rather than a portrait, because founderZac and founderSam are
            * still null in content/images.ts and a generated face is never going on this site. */}
          <article className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-lg bg-primary p-7 sm:p-8">
            {images.walkthroughDusk?.src && (
              <Image
                src={images.walkthroughDusk.src}
                alt={images.walkthroughDusk.alt}
                fill
                sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/45" aria-hidden />
            <div className="relative flex flex-1 flex-col">
              <p className="label text-accent">Free &middot; On site &middot; After dark</p>
              <h3 className="mt-3 font-display text-[1.6rem] font-bold leading-tight text-on-dark">
                Not sure what your house needs?
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-on-dark-muted">
                We come out after dark, walk the property with you and lay the design out on your own
                elevation. You get a written number and no obligation.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="/free-design-consultation"
                  className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-card px-6 py-4 font-semibold text-foreground"
                >
                  Book a free design
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 5 - THE CONTRACTOR SPLIT. Phoenix: left column is an icon eyebrow, a headline over three lines, a
 * paragraph, a vertical list of four icon items, and a dark pill. Right column is a tall photograph
 * with a cream award card overlapping its bottom edge.
 *
 * Their card is a Reader's Choice award. Brytr has none, so ours carries the review score, which is
 * the only award-shaped thing on file and is verifiable in one click.
 * ========================================================================= */
const HOW_ITEMS: { icon: IconKey; title: string; body: string }[] = [
  { icon: "measured", title: "Measured on site, after dark", body: "We walk the property with you and lay the run out against your own materials, not a catalog." },
  { icon: "weatherSealed", title: "Into fascia, never shingles", body: "Every penetration sealed as it is made, and mitered at every valley, dormer and return." },
  { icon: "zones", title: "One app, every zone", body: "House, pergola, walls and beds addressed separately or together, on saved scenes." },
  { icon: "warranty", title: "We hold the warranty", body: "We installed it, so when something needs looking at there is no portal between you and the crew." },
];

export function HowWeWork() {
  const shot = images.crewRoofFascia;
  return (
    <section className="section bg-background">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            icon="hardHat"
            eyebrow="Omaha lighting contractor"
            title="Installed once, and installed properly"
            lede="Permanent lighting is drilled into your fascia and left there. How it is fixed, sealed and mitered is the whole difference between a run that still looks right in five years and one that does not."
          />

          <ul className="mt-8 space-y-6">
            {HOW_ITEMS.map((h) => {
              const I = iconMap[h.icon];
              return (
                <li key={h.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-muted text-accent-ink" aria-hidden>
                    <I className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{h.title}</h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted-foreground">{h.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-9">
            <DarkPill href="/how-it-works">How an install runs</DarkPill>
          </div>
        </div>

        {/* the tall photograph with a card set over its bottom edge */}
        <div className="relative overflow-hidden rounded-lg bg-primary">
          {shot?.src && (
            <div className="relative aspect-3/4 w-full lg:aspect-[4/5]">
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-muted p-6 sm:inset-x-6 sm:bottom-6 sm:p-7">
            <div className="flex items-center gap-3">
              <Stars size="1.1rem" />
              <span className="u font-display text-[1.35rem] font-bold leading-none text-foreground">
                {reviewProof.average}
              </span>
            </div>
            <h3 className="mt-3 font-display text-[1.3rem] font-bold leading-tight text-foreground">
              {reviewProof.count} reviews, every one five stars
            </h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
              Read them on Google rather than taking our word for it. They are all from homeowners
              inside our own service area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 6 - THE TWO FOUNDERS. Phoenix's is "Two Brothers. Every Roof Done Right." with a card each.
 * Brytr has exactly two founders, so this section maps across without inventing anybody.
 *
 * NO PORTRAITS, and that is deliberate rather than an oversight: `founderZac` and `founderSam` in
 * content/images.ts are both still `src: null`, and a generated face standing in for a real named
 * person is not something this site will ever do. Each card carries an initial, the role, and what
 * that person actually handles - all of which is already in content/site.ts. Send two photographs
 * and they drop straight in.
 * ========================================================================= */
export function Founders() {
  const shot = images.walkthroughDusk;
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            icon="hardHat"
            eyebrow="Who runs it"
            title="Two founders. Every install done right."
            lede="Zac and Sam started Brytr because the part that goes wrong in this trade is the handoff between the person who sells the job and the crew who does it. There is no handoff here."
          />
          <DarkPill href="/about">More about us</DarkPill>
        </div>

        {/* THREE EQUAL CELLS: the photograph, then a card each.
          *
          * Two attempts failed before this one. Phoenix's centred head over two wide cards left an
          * 800px band with two 315px cards adrift in the middle of it. Moving the head into a left
          * column and stacking the cards on the right made it worse in the opposite direction -
          * the grid stretched both cards to the head column's height and each one ended with a
          * third of itself empty.
          *
          * Three columns solve both at once. The head is a full-width row with its onward pill on
          * the right, so nothing floats. Below it the photograph is a peer of the two cards rather
          * than a filler, all three cells are the same height by construction, and the ticks run
          * in one column so each card is filled by its own content. When the two portraits arrive
          * they go in the avatar circles and this layout does not move. */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shot?.src && (
            <div className="relative min-h-[20rem] overflow-hidden rounded-lg bg-primary md:col-span-2 lg:col-span-1">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width:1024px) 30vw, 100vw"
                className="object-cover"
              />
              <div className="hero-scrim absolute inset-0" aria-hidden />
              <p className="absolute inset-x-0 bottom-0 p-6 text-[0.95rem] font-semibold leading-snug text-on-dark">
                Both of them on a walk-around, which is where every job on this page started.
              </p>
            </div>
          )}

          {site.founders.map((f) => (
            <article key={f.name} className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-4">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-[1.45rem] font-bold text-accent"
                  aria-hidden
                >
                  {f.name.trim().charAt(0)}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-bold leading-tight text-foreground">{f.name}</h3>
                  <p className="label mt-1 text-accent-ink">{f.role}</p>
                </div>
              </div>
              <p className="mt-6 border-t border-border pt-6 text-[0.95rem] text-muted-foreground">
                On every job, {f.name.split(" ")[0]} handles:
              </p>
              <Ticks items={[...f.handles]} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 8 - WHY HOMEOWNERS TRUST US. Phoenix: left is an icon eyebrow, headline, paragraph and a
 * TWO-COLUMN accent-tick list of seven short credentials. Right is a cream card holding a customer
 * video with a play button, a project name and two lines about that job.
 *
 * Ours keeps the shape. The tick list is only things the client confirmed - no licence number and
 * no membership, because there are none on file. The right-hand card is a real install photograph
 * with a real project note instead of a video, because there is no customer video.
 * ========================================================================= */
const TRUST: string[] = [
  "Our own W2 crews, never subcontracted",
  "Free on-site design after dark",
  "Fixed into fascia, never through shingles",
  "Concealed wire runs, sealed end caps",
  "Signed off lit at night and in daylight",
  "Warranty held by us, not a call center",
  "Omaha metro, Lincoln and western Iowa",
];

export function WhyTrust() {
  const shot = images.aerialRedRoofline ?? images.seqRedGreen;
  return (
    <section className="section bg-background">
      {/* BOTH COLUMNS RUN TO THE SAME LINE. They did not: seven ticks in two columns finished
        * 160px above the section's foot and the photo card finished 100px above it, so the section
        * ended in two ragged holes. The left column now closes on the honesty note the section is
        * actually about plus the route to the terms, and the card's photograph grows into whatever
        * height is left rather than being pinned to a 4:3 crop. */}
      <div className="shell grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div className="flex flex-col">
          <SectionHead
            icon="verified"
            eyebrow="Why choose us"
            title="Why Omaha homeowners trust Brytr"
            lede="Every install is a hole in somebody's fascia and a wire run somebody has to live with. These are the things we hold ourselves to, and they are the reason the reviews read the way they do."
          />
          <Ticks items={TRUST} cols={2} />

          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-7">
            <DarkPill href="/warranty">What the warranty covers</DarkPill>
            <p className="max-w-[38ch] text-[0.92rem] leading-snug text-muted-foreground">
              Every claim on this page is one we will put in writing before you sign. There are no
              badges or seals on it, because we would rather show you the work than a graphic.
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-muted p-5">
          {shot?.src && (
            <div className="relative min-h-[15rem] w-full flex-1 overflow-hidden rounded-md bg-primary">
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1024px) 26rem, 100vw" className="object-cover" />
            </div>
          )}
          <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-snug text-foreground">
            The same house, one tap apart
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
            One channel on the fascia, photographed on the same evening from the same spot in warm
            white and in a saved color scene. Nothing was rewired between the two.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 9 - WHAT OUR CLIENTS SAY. Phoenix's loudest section: a dark warm gradient band, an icon eyebrow,
 * the page's biggest heading at 64px, an outlined white pill to Google on the right, and white
 * review cards STAGGERED - offset vertically so the row is not a flat line - each with an accent
 * star row, a big quote glyph in the corner, the review, then the NAME IN CAPS and a role under it.
 *
 * Every word in these cards is verbatim from Google. The dates only appear where Google gave one.
 * ========================================================================= */
export function Reviews() {
  const six = reviews.slice(0, 6);
  return (
    <section className="section bg-raise">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            onDark
            big
            icon="stars"
            eyebrow="Our reviews"
            title="What our clients say"
            lede={`Rated ${reviewProof.average} across ${reviewProof.count} ${reviewProof.platform} reviews, every one from a homeowner inside our service area.`}
          />
          <Link
            href={reviewProof.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-44 inline-flex h-12 shrink-0 items-center rounded-full border border-on-dark/35 px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-on-dark/10"
          >
            Review on Google
          </Link>
        </div>

        {/* Staggered: the middle column drops, which is what stops three cards reading as a bar. */}
        <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {six.map((r, i) => (
            <article
              key={r.name}
              className={`relative flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ${
                i % 3 === 1 ? "lg:mt-10" : i % 3 === 2 ? "lg:mt-5" : ""
              }`}
            >
              {/* the quote glyph Phoenix sets in the corner of every card */}
              <span className="pointer-events-none absolute right-6 top-5 font-display text-[3rem] leading-none text-accent/25" aria-hidden>
                &rdquo;
              </span>
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground">
                {r.text}
              </blockquote>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="label uppercase tracking-wide text-foreground">{r.name}</p>
                <p className="mt-0.5 text-[0.85rem] text-muted-foreground">
                  Homeowner{r.when ? ` · ${r.when}` : ""}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 10 - RECENT WORK. Phoenix: icon eyebrow "OUR PROJECTS", a headline, tabs (Commercial /
 * Residential) with an accent underline on the active one, then a photo grid.
 *
 * Ours drops the tabs, and that is a considered exception to copying the layout exactly: Phoenix's
 * two tabs split work that genuinely differs, while ours would split six photographs of houses into
 * two piles of three. A tab a homeowner has no reason to click is furniture. The grid and the
 * heading are theirs; the photographs are Brytr installs, all shot on the property at night.
 * ========================================================================= */
const WORK: { key: string; scene: string }[] = [
  { key: "homePrairieTwilight", scene: "Civil twilight, warm white" },
  { key: "seqRedGreen", scene: "The December scene" },
  { key: "poolPergolaDusk", scene: "Pergola run at dusk" },
  { key: "homeBrickGablesGold", scene: "Gables, warm white" },
  { key: "homeShakeBrick", scene: "Eave downlights" },
  { key: "gamedayRedFull", scene: "Game day, one tap" },
];

export function RecentWork() {
  const shots = WORK.map((w) => ({ ...w, img: images[w.key] })).filter((w) => w.img?.src);
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            icon="christmas"
            eyebrow="Our projects"
            title="Recent work around Omaha"
            lede="Photographed on the property at night with the system running. None of it is a rendering and none of it is stock."
          />
          <Link
            href="/gallery"
            className="tap-44 inline-flex h-12 shrink-0 items-center rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
          >
            See the full gallery
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((w) => (
            <Link
              key={w.key}
              href="/gallery"
              data-spot
              className="group relative block overflow-hidden rounded-lg bg-primary"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={w.img.src as string}
                  alt={w.img.alt}
                  fill
                  sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary to-transparent px-5 pb-4 pt-10">
                <p className="font-display text-[1rem] font-bold text-on-dark">
                  {w.scene}
                  <Arrow />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 11 - THE CALL TO ACTION. Phoenix: a warm gradient band, a headline on two lines, and two pills -
 * solid accent "Request A FREE Estimate ->" and white "Call Us". Amber is defensible as a full
 * surface on a lighting site because amber is what comes out of the channel.
 * ========================================================================= */
export function CallToAction() {
  return (
    <section className="bg-accent">
      <div className="shell flex flex-wrap items-center justify-between gap-x-12 gap-y-8 py-16">
        <div>
          <h2 className="display-section max-w-[24ch] text-accent-foreground">
            Ready for lighting you never have to hang again?
          </h2>
          <p className="mt-3 max-w-[54ch] text-lg text-accent-foreground/80">
            Book before November 15 to be lit for Christmas. One visit to design it, one day to
            install it, and nobody on a ladder in December.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/free-design-consultation"
            className="tap-44 inline-flex h-13 items-center gap-2.5 rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
          >
            Book a free design
            <span aria-hidden>&rarr;</span>
          </Link>
          <a
            href={site.phoneHref}
            className="tap-44 inline-flex h-13 items-center rounded-full bg-card px-7 font-semibold text-foreground transition-colors duration-[--dur-fast] hover:bg-muted"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 12 - THE QUESTIONS. Phoenix: cream band, icon eyebrow "MOST FAQ'S", a headline over two lines,
 * and the questions as separate white cards. Eight of ours, out of the twenty-five already written
 * in content/faqs.ts, with the rest on /faq.
 * ========================================================================= */
export function Faqs() {
  return (
    <section className="section bg-background">
      {/* THE LINK MOVED UP INTO THE HEAD ROW, which fixes two holes with one change: the head
        * was a left-aligned block with 600px of empty band beside it, and the section closed on a
        * lone text link with 110px of air under it. Reviews and RecentWork above already put their
        * onward link on the right of the head; this is the same rule applied consistently. */}
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            icon="verified"
            eyebrow="Most asked"
            title="Questions homeowners ask us first"
            lede="The eight that come up on nearly every walk-around. There are seventeen more on the FAQ page."
          />
          <DarkPill href="/faq">Read every question</DarkPill>
        </div>
        <div className="mt-10">
          <Faq items={homeFaqs.slice(0, 8)} />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 13 - THE CLOSER. Phoenix ends on a full form above the footer. Ours does the same.
 * ========================================================================= */
export function Closer() {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-20">
        <div className="flex flex-col">
          <SectionHead
            icon="measured"
            eyebrow="Free consultation"
            title="See it on your house before you buy"
            lede="We come out after dark, walk the property, and show you the design on your own elevation. No charge and no obligation."
          />
          <p className="mt-8 text-base text-muted-foreground">Or call us directly</p>
          <a
            href={site.phoneHref}
            className="u mt-1 block font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold tracking-[-0.03em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>
          <p className="mt-8 text-[0.95rem] text-muted-foreground">
            {site.hours.openLabel}. Installing across {site.region}.
          </p>

          {/* The rating repeated at the point of decision, which is the one place on the page a
            * reader is weighing whether to hand over a phone number. It closes the column onto the
            * form's baseline as well. */}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-7">
            <Stars size="1.05rem" />
            <p className="u font-display text-[1.3rem] font-bold leading-none text-foreground">
              {reviewProof.average}
            </p>
            <p className="text-[0.95rem] text-muted-foreground">
              across {reviewProof.count} Google reviews, every one from an Omaha homeowner
            </p>
          </div>
        </div>
        <QuoteForm variant="compact" heading="Get a free design consultation" />
      </div>
    </section>
  );
}
