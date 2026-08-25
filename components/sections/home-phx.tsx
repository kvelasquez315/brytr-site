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
 * THE ORDER WAS THIRTEEN SECTIONS TO MATCH THEIRS. IT IS EIGHT NOW, and the audit pass is why:
 * the page ran 12,431px and six of its thirteen grounds were one of two indistinguishable
 * beiges, so copying their COUNT had produced length rather than density. What survives is
 * their vocabulary and their sequence, not their section total.
 *
 *   1  hero, badges + form card          ->  same, plus the rating line absorbed from slot 2
 *   2  certifications logo row           ->  gone from this page. proof-rail.tsx still exists
 *                                            and page-parts.tsx still renders it on two
 *                                            interior templates, so it is not dead code.
 *   3  who we are, mosaic + features     ->  same, and it absorbed their slot 6
 *   4  services, 5 cards + 1 promo card  ->  same, on navy, one line per card
 *   5  contractor split + award card     ->  same, award card is the review score, and it
 *                                            absorbed their slot 8
 *   6  two brothers                      ->  merged into 3
 *   7  find the right service            ->  the colour wipe, our signature, in that slot
 *   8  why homeowners trust us           ->  merged into 5
 *   9  what our clients say (64px)       ->  same
 *   10 recent work across the valley     ->  recent work around Omaha
 *   11 ready for a roof you can rely on  ->  deleted, see the note further down
 *   12 FAQ accordion                     ->  four questions, beside the closing form
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

/* THE TICK LOST ITS YELLOW DISC.
 *
 * It was a solid #f5c518 circle, and there were eighteen of them in the service section alone
 * plus seven more further down. Twenty-five filled accent discs is not an accent, it is a
 * texture, and it was a big part of why the page read as one colour. The mark is now drawn in
 * the body colour at the weight of the text beside it, which is what a checklist looks like
 * when nobody is trying to decorate it. */
function Ticks({ items, cols = 1, flush, onDark }: { items: string[]; cols?: 1 | 2; flush?: boolean; onDark?: boolean }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${flush ? "" : "mt-5"} ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5">
          <svg
            viewBox="0 0 16 16"
            className={`mt-1 size-4 shrink-0 ${onDark ? "text-on-dark" : "text-foreground"}`}
            fill="none"
            aria-hidden
          >
            <path d="m2.5 8.4 3.2 3.2L13.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[0.95rem] leading-snug ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{t}</span>
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
  /* THE COLLAGE WAS SELLING ROOFING.
   *
   * It was installDayGarage (a driveway at dusk), crewRoofFascia (an installer on a roof in
   * full sun), walkthroughDusk and installDayPavilion. All real photographs, which is right,
   * and two of them daylight, which is the problem: nothing in either frame says lighting.
   * A roofer, a sider or a gutter company could have used both without changing a pixel. On
   * the one section of the page whose job is "here is who we are and what we do", that is a
   * wasted argument.
   *
   * Three night frames now, and each one is doing a specific job:
   *   channelCloseUp   the hardware in the fascia with the individual LEDs visible. Nobody
   *                    else in this trade shows the channel, and it is the answer to the
   *                    question every homeowner asks first.
   *   poolRearWarm     a rear elevation, which almost nothing else on this site is.
   *   homePrairieEntry roofline plus one uplight on the door - the everyday setting.
   * crewRoofFascia is not deleted, it is the tall photograph in section 4 where "our own
   * crews, in daylight, on your fascia" is the actual claim being made. */
  const m = [images.channelCloseUp, images.poolRearWarm, images.homePrairieEntry];
  return (
    <section className="section bg-muted">
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
          <div className="relative min-h-[15rem] overflow-hidden rounded-lg bg-primary lg:min-h-0 lg:flex-[1.4]">
            {m[0]?.src && (
              <Image src={m[0].src} alt={m[0].alt} fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
            )}
          </div>

          {/* The figure card, where Phoenix puts its Inc. 5000 seal. WHITE, not bone: it used
            * to be bg-muted on a bg-background section, which worked only because those two
            * were different colours. They are the same colour now, so this card had no edge at
            * all - it read as loose text floating in the mosaic. Cards are white on this site,
            * sections are bone, and that is the whole rule. */}
          <div className="flex items-center gap-6 rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
            <p className="u shrink-0 font-display text-[2.75rem] font-bold leading-none text-foreground">1.2M</p>
            <div>
              <h3 className="display-card text-foreground">Lights installed around Omaha</h3>
              <p className="mt-1.5 text-[0.9rem] leading-snug text-muted-foreground">
                Every one of them on a house or a business inside our own service area, not a
                national franchise total.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
            {m.slice(1, 3).map((img, i) =>
              img?.src ? (
                <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary lg:aspect-auto lg:h-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 23vw, 45vw" className="object-cover" />
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
                  <span className="grid size-8 shrink-0 place-items-center text-foreground" aria-hidden>
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

          {/* THE FOUNDERS MOVED IN HERE, and the section they used to have is gone.
            * "Who we are" and "who runs it" are one argument, and running them as two
            * sections 800px apart made the reader read the same claim twice. Two compact
            * rows rather than two cards - the mosaic beside them is already carrying the
            * images, so these do not need to be boxes as well. */}
          <div className="mt-8 space-y-5 border-t border-border pt-7">
            {site.founders.map((f) => (
              <div key={f.name} className="flex gap-4">
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-display text-[1.15rem] font-semibold text-on-dark"
                  aria-hidden
                >
                  {f.name.trim().charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="display-card text-foreground">
                    {f.name}
                    <span className="ml-2.5 align-middle text-[0.82rem] font-semibold text-muted-foreground">
                      {f.role}
                    </span>
                  </p>
                  <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
                    {[...f.handles].join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
 *
 * ---- REVISION: THE CARDS WERE CARRYING FIVE THINGS EACH ------------------------------------
 *
 * Photo, title, a line, THREE accent-tick bullets and a dark pill button, times six cards.
 * That is eighteen bullets and six buttons stacked in one section, and it read as a wall
 * rather than a set of choices - the reader has to process thirty separate pieces of text to
 * find out that we light five parts of a house.
 *
 * Each card is now a photograph, a name and one line, and the WHOLE CARD is the link, which
 * is what a reader tries to click anyway. One text link at the section head covers the case
 * where somebody wants the full list.
 *
 * The three bullets per card are NOT deleted - they are still in content/services.ts under
 * `includes`, and /services/[slug] renders them. They belong on the page somebody lands on
 * after deciding they care about roofline specifically, not on the page where they are still
 * deciding whether to care at all.
 * ========================================================================= */
const SERVICE_CARDS: { slug: string; label: string; icon: IconKey }[] = [
  { slug: "permanent-roofline-lighting", label: "Roofline and eaves", icon: "roofline" },
  { slug: "landscape-lighting", label: "Landscape and beds", icon: "pathLight" },
  { slug: "patio-pergola-bistro-lighting", label: "Patio and pergola", icon: "pergola" },
  { slug: "hardscape-lighting", label: "Walls, steps and coping", icon: "hardscape" },
  { slug: "soffit-lighting", label: "Soffit and architectural", icon: "soffit" },
];

export function Services() {
  const cards = SERVICE_CARDS.map((c) => {
    const s = services.find((x) => x.slug === c.slug);
    return s ? { ...c, svc: s, img: s.photo ? images[s.photo] : undefined } : null;
  }).filter(Boolean);

  return (
    /* ON NAVY, not bone. Six white cards on a warm neutral is a low-contrast arrangement -
     * the cards and the ground were within a few steps of each other and the grid read as
     * one pale block. On #202b38 each card is a distinct object, and it is what makes the
     * light/dark alternation down the page possible at all. */
    <section className="section bg-raise">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionHead
            onDark
            icon="wholeHome"
            eyebrow="Services"
            title="What are you looking to light?"
            lede="One system covers the whole property. Pick the part you want first - the rest can be added to the same channel and the same app whenever you like."
          />
          <Link
            href="/services"
            className="tap-44 group shrink-0 font-semibold text-on-dark underline decoration-on-dark/40 decoration-2 underline-offset-4"
          >
            See all lighting services
            <Arrow />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const I = iconMap[c!.icon];
            return (
              <Link
                key={c!.slug}
                href={`/services/${c!.slug}`}
                data-spot
                className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] transition-transform duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  {c!.img?.src && (
                    <Image
                      src={c!.img.src}
                      alt={c!.img.alt}
                      fill
                      sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
                    />
                  )}
                  {/* Phoenix's round icon badge, overlapping the top-left corner of the photo. */}
                  <span
                    className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-card text-foreground shadow-[var(--shadow-lg)]"
                    aria-hidden
                  >
                    <I className="size-6" />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="display-card text-foreground">{c!.label}</h3>
                    <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{c!.svc.short}</p>
                  </div>
                  <span
                    className="mt-1 shrink-0 text-foreground transition-transform duration-[--dur-fast] group-hover:translate-x-1"
                    aria-hidden
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}

          {/* THE SIXTH CELL, Phoenix's promo card. Theirs is a quiz with a photograph of the owner;
            * ours is the free consultation, which is the same offer without the quiz we do not have.
            * A real install photograph rather than a portrait, because founderZac and founderSam are
            * still null in content/images.ts and a generated face is never going on this site. */}
          {/* ONE IMAGE IS USED ONCE. This card was on walkthroughDusk, which is also the
            * founders photograph in section 2 - the same frame twice on one page. It is on
            * homePorchFlag now, which appears nowhere else. */}
          <article className="relative flex min-h-[24rem] flex-col overflow-hidden rounded-lg bg-primary p-7 sm:p-8">
            {images.homePorchFlag?.src && (
              <Image
                src={images.homePorchFlag.src}
                alt={images.homePorchFlag.alt}
                fill
                sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/45" aria-hidden />
            <div className="relative flex flex-1 flex-col">
              <p className="label text-on-dark-muted">Free &middot; On site &middot; After dark</p>
              <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight text-on-dark">
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
/* What is left of the old TRUST list. Three of the original seven - measured on site after
 * dark, fixed into fascia rather than shingles, signed off lit and again in daylight - are
 * already the icon rows below, word for word. These four are not, so they carry over. */
const TRUST: string[] = [
  "Our own W2 crews, never subcontracted",
  "Concealed wire runs, sealed end caps",
  "Warranty held by us, not a call center",
  "Omaha metro, Lincoln and western Iowa",
];

const HOW_ITEMS: { icon: IconKey; title: string; body: string }[] = [
  { icon: "measured", title: "Measured on site, after dark", body: "We walk the property with you and lay the run out against your own materials, not a catalog." },
  { icon: "weatherSealed", title: "Into fascia, never shingles", body: "Every penetration sealed as it is made, and mitered at every valley, dormer and return." },
  { icon: "zones", title: "One app, every zone", body: "House, pergola, walls and beds addressed separately or together, on saved scenes." },
  { icon: "warranty", title: "We hold the warranty", body: "We installed it, so when something needs looking at there is no portal between you and the crew." },
];

export function HowWeWork() {
  const shot = images.crewRoofFascia;
  return (
    <section className="section bg-muted">
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
                  <span className="grid size-7 shrink-0 place-items-center text-foreground" aria-hidden>
                    <I className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-foreground">{h.title}</h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted-foreground">{h.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* THE FOUR TICKS THAT SURVIVED "WHY HOMEOWNERS TRUST US". Its other three -
            * measured after dark, into fascia not shingles, signed off night and day - were
            * already the icon rows directly above, which is precisely why that section had
            * to go rather than sit 800px further down repeating them. */}
          <Ticks items={TRUST} cols={2} />

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <DarkPill href="/how-it-works">How an install runs</DarkPill>
            <Link
              href="/warranty"
              className="tap-44 group font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-4"
            >
              What the warranty covers
              <Arrow />
            </Link>
          </div>
        </div>

        {/* the tall photograph with a card set over its bottom edge */}
        <div className="relative overflow-hidden rounded-lg bg-primary">
          {shot?.src && (
            <div className="relative aspect-3/4 w-full lg:aspect-[4/5]">
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] sm:inset-x-6 sm:bottom-6 sm:p-7">
            <div className="flex items-center gap-3">
              <Stars size="1.1rem" />
              <span className="u font-display text-[1.35rem] font-bold leading-none text-foreground">
                {reviewProof.average}
              </span>
            </div>
            <h3 className="mt-3 display-card text-foreground">
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
 * SECTIONS 6 AND 8 ARE GONE, and this note is the record of why.
 *
 * 6 - THE TWO FOUNDERS is now the bottom of WhoWeAre above. "Who we are" and "who runs it"
 * are one argument, and splitting it across two sections 800px apart made a reader take the
 * same claim twice. The names, roles and what each of them handles all survive; they are two
 * compact rows under the feature grid instead of two cards in a band of their own.
 *
 * 8 - WHY HOMEOWNERS TRUST US was the same content as HowWeWork said twice. Both sections
 * argued "this is installed properly and we stand behind it" - one through four icon rows,
 * one through seven ticks. HowWeWork is the stronger of the two because it is specific about
 * method rather than about virtue, so it kept the slot and absorbed the four ticks from TRUST
 * that were not already covered by its icon rows. The photo card that used to sit beside the
 * ticks is gone; aerialRedRoofline is not used on the home page any more.
 * ========================================================================= */

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
              <span className="pointer-events-none absolute right-6 top-5 font-display text-[3rem] leading-none text-foreground/15" aria-hidden>
                &rdquo;
              </span>
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground">
                {r.text}
              </blockquote>
              <footer className="mt-6 border-t border-border pt-4">
                {/* NOT uppercase, and not tracked out. Phoenix sets its reviewer names in caps
                  * and I copied that, which quietly reintroduced the exact pattern the client
                  * flagged three times as "the robotic font". It is a person's name; it gets
                  * sentence case like every other label on this site. */}
                <p className="label text-foreground">{r.name}</p>
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
            className="tap-44 inline-flex h-12 shrink-0 items-center rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
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
 * THE AMBER CALL-TO-ACTION BAND IS DELETED, not converted, and the arithmetic is why.
 *
 * The brief was to replace 275px of full-bleed #f5c518 with a night photograph, a scrim and
 * the same yellow button. I built that, then counted the page: nine sections, four of them
 * dark (hero, the wipe, the reviews, this band) and five light. The rule alongside it was
 * that two lights must never touch and two darks must never touch - and with a DARK hero
 * first, nine slots can only alternate if five of them are dark. Four darks and five lights
 * starting dark always strands two lights against each other somewhere. There is no
 * arrangement that satisfies both, and the closer has to be last because it holds the form.
 *
 * Deleting it resolves the arithmetic AND removes a duplicate: it was a booking CTA sitting
 * two screens above a booking form. Its deadline line - book by November 15 to be lit for
 * Christmas - moved into the closer's lede, where it is next to the field you type into.
 *
 * Eight sections now, perfectly alternating, and the page still has five routes to a
 * conversion: the hero form, the consultation card in the services grid, the closing form,
 * the header button and the sticky mobile call bar.
 * ========================================================================= */

/* ==========================================================================
 * THE LAST SECTION: the four questions that block a sale, and the form, on one row.
 *
 * These were two sections. The FAQ ran 1,230px on its own - eight cards in a single column
 * 1,375px wide, so every row was a question at the far left, a chevron at the far right and a
 * kilometre of nothing between them - and then the form followed it in a third of the height.
 *
 * FOUR QUESTIONS, NOT EIGHT. content/faqs.ts has twenty-five written and /faq renders all of
 * them. The homepage keeps the four that actually stop somebody booking: what it costs,
 * whether it wrecks the fascia, what happens when it breaks, and whether you can do it in a
 * Nebraska winter. Day visibility, HOAs, install length and whether you need to be home are
 * real questions, but nobody declines a free consultation over them.
 *
 * Putting them beside the form is what fixes the width problem as well: the accordion is now
 * a sensible measure instead of a set of very wide, very empty bars.
 * ========================================================================= */
export function Closer() {
  return (
    <section className="section bg-muted">
      <div className="shell grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16">
        <div>
          <SectionHead
            icon="verified"
            eyebrow="Before you book"
            title="The four questions we get asked first"
            lede="The ones that decide it. There are twenty-one more on the FAQ page, and none of them are surprises. Book by November 15 to be lit for Christmas."
          />
          <div className="mt-9">
            <Faq items={[homeFaqs[1], homeFaqs[2], homeFaqs[3], homeFaqs[4]]} />
          </div>
          <p className="mt-7">
            <Link
              href="/faq"
              className="tap-44 group font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-4"
            >
              Read every question
              <Arrow />
            </Link>
          </p>
        </div>

        <div>
          <QuoteForm variant="compact" heading="Get a free design consultation" />
          <p className="mt-6 text-[0.95rem] text-muted-foreground">Or call us directly</p>
          <a
            href={site.phoneHref}
            className="tap-44 u mt-1 block font-display text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-[-0.02em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>
          <p className="mt-4 text-[0.9rem] leading-snug text-muted-foreground">
            {site.hours.openLabel}. Installing across {site.region}.
          </p>
        </div>
      </div>
    </section>
  );
}
