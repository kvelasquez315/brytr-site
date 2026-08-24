import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/ui/bits";

/* ═══ THE THIRD DESIGN, AND WHAT THE SECOND ONE GOT WRONG ═══════════════════════════════
 *
 * Round one was a mosaic: 66 boxed containers, 28 headings, 172 amber elements, 187 pieces of
 * 13-15px text against 13 large ones. The client called it jumbled and he was right.
 *
 * Round two was the overcorrection. I read Apple's design language and applied Apple's
 * DENSITY, which is one product per viewport with a two-thousand-dollar product render doing
 * the work. This is a lawn-and-lights service company. What arrived was an 80px headline
 * wrapping to three lines, a 21:9 photograph inset inside a 1,344px column, and one line of
 * copy per section. The client, exactly: "the font you're using is way too big", "we're not
 * filling up the site", "the site isn't designed at all, and there are just images being
 * thrown on here that are also way too big and not filling up the site". All true.
 *
 * So I went and read the actual reference instead of a brand I had decided was equivalent.
 * trugreen.com, section by section:
 *
 *     hero            background photo, EIGHT-WORD headline, subhead, one button
 *     comparison      THREE columns, three rows each, brief text, no photos
 *     call to action   one sentence, two buttons
 *     support         TWO columns, text with a FIVE-ITEM list, one photograph
 *     contact         THREE cards, one photograph
 *
 * TruGreen is not sparse. It is *ordered*. Every section is a two or three column
 * composition that fills its width, headlines are short enough to sit on one or two lines,
 * and there are bullet lists — which round two had stripped out as clutter. What makes it
 * feel calm is that each section has ONE structure, repeated cleanly, not that each section
 * is nearly empty.
 *
 * THE RULES, THIRD TIME:
 *
 *   COMPOSE IN COLUMNS.  Two or three, filling the width. A section that will not fill is a
 *   section that needs structure, not a narrower page.
 *
 *   HEADLINES SHORT ENOUGH TO SIT ON TWO LINES at the working size. If it wraps to three,
 *   the headline is too long or the type is too big. Usually both.
 *
 *   PHOTOGRAPHY IS SIZED BY THE GRID.  A picture either sits in a column with content beside
 *   it, or it runs genuinely edge to edge. Never huge and inset at the same time.
 *
 *   LISTS ARE ALLOWED.  Three or four items, plain, no amber ticks. They are how a service
 *   business says what is included without writing a paragraph.
 *
 *   ONE ACCENT, AND IT IS AN ACTION.  This part of round two was right and it stays.
 *
 *   THE GROUND CHANGE IS THE DIVIDER.  So is this.
 */

/* ── 2 · WHAT WE INSTALL ───────────────────────────────────────────────────────────────
 *
 * Three equal cards filling the row, the way TruGreen's contact section and comparison
 * section both do it. Round two made this one 21:9 tile the width of the column with two
 * beneath, which left an enormous picture and a lot of nothing. Each card: photograph at
 * 4:3, name, one line, three things it includes. That is enough to fill a third of 1,440px
 * without a single decorative element.
 */
const LEAD = ["permanent-outdoor-lighting", "permanent-christmas-lights", "permanent-roofline-lighting"];

function ServiceCard({ slug }: { slug: string }) {
  const svc = services.find((s) => s.slug === slug);
  const img = svc?.photo ? images[svc.photo] : undefined;
  if (!svc) return null;
  return (
    <article className="flex flex-col">
      {img?.src && (
        <Link href={`/services/${svc.slug}`} data-spot className="group block overflow-hidden">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-primary">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      )}
      <h3 className="mt-6 font-display text-[1.45rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
        <Link href={`/services/${svc.slug}`} className="hover:underline decoration-accent decoration-2 underline-offset-4">
          {svc.name}
        </Link>
      </h3>
      <p className="mt-2.5 text-[1.05rem] leading-relaxed text-muted-foreground">{svc.short}</p>
      <ul className="mt-5 flex-1 space-y-2 border-t border-border pt-5">
        {svc.includes.slice(0, 3).map((i) => (
          <li key={i} className="text-[0.98rem] leading-snug text-muted-foreground">{i}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href={`/services/${svc.slug}`}
          data-spot
          className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
        >
          {svc.name === "Permanent Christmas Lights" ? "See it at Christmas" : "See how it goes on"}
        </Link>
      </div>
    </article>
  );
}

export function Installs() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <h2 className="display-hero max-w-[24ch] text-foreground">
              Every surface worth lighting.
            </h2>
            <p className="lead mt-4 text-muted-foreground">
              One channel, one controller, one app. Start with the roofline and add to it whenever
              you like.
            </p>
          </div>
          <Button asChild size="md"><Link href="/services">Everything we install</Link></Button>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {LEAD.map((s) => <ServiceCard key={s} slug={s} />)}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · WHAT PEOPLE SAY ───────────────────────────────────────────────────────────────
 *
 * Three quotes across the row with the score beside the heading. Round two set one quote at
 * 34px across half the page and left the other half blank, which is a magazine pull-quote,
 * not proof. Three real reviews reading across is both calmer and fuller than six in boxes
 * or one in a void.
 */
export function Proof() {
  const three = reviews.slice(0, 3);
  return (
    <section className="section bg-background">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2 className="display-hero max-w-[22ch] text-foreground">
            See what our clients have to say.
          </h2>
          <p className="text-lg text-muted-foreground">
            <span className="u text-2xl font-bold text-foreground">{reviewProof.average}</span>
            {" "}from <span className="u">{reviewProof.count}</span> {reviewProof.platform} reviews.{" "}
            <Link href="/reviews" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              Read them
            </Link>
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
          {three.map((r) => (
            <blockquote key={r.name} className="flex flex-col">
              <p className="flex-1 text-[1.05rem] leading-relaxed text-muted-foreground">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-5 text-sm font-semibold text-foreground">
                {r.name}
                <span className="mx-2 font-normal text-muted-foreground" aria-hidden>·</span>
                <span className="font-normal text-muted-foreground">Google review</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5 · THE WORK ──────────────────────────────────────────────────────────────────────
 *
 * The one place a photograph genuinely runs the full width of the browser, and it earns it
 * because it is the product working. Underneath, a three-up row at 4:3 rather than two more
 * enormous tiles. Round two had a 21:9 and two 4:3 tiles all inset inside the shell, so the
 * pictures were both oversized and framed by empty margin.
 */
const WORK: [string, string][] = [
  ["seqRedGreen", "Red and green, alternating"],
  ["poolPergolaDusk", "Pool house and pergola"],
  ["homeShakeBrick", "Warm white, shake and brick"],
];

export function Work() {
  const wide = images.homeBrickGablesGold;
  const row = WORK.map(([k, cap]) => [images[k], cap] as const).filter(([i]) => i?.src);
  return (
    <section className="section bg-primary">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="display-hero max-w-[22ch] text-on-dark">
              Houses lit by our lights around Omaha.
            </h2>
            <p className="lead mt-4 text-on-dark-muted">
              Photographed on the property at night with the system running, so what you are
              looking at is the output rather than a rendering of it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Button asChild size="md"><Link href="/gallery">See the full gallery</Link></Button>
            <Link
              href="/recent-projects"
              className="font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              House by house
            </Link>
          </div>
        </div>
      </div>

      {wide?.src && (
        <div className="bleed relative mt-12 aspect-21/9 max-h-[34rem] w-screen overflow-hidden">
          <Image src={wide.src} alt={wide.alt} fill sizes="100vw" className="object-cover" priority={false} />
        </div>
      )}

      <div className="shell mt-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {row.map(([i, cap]) => (
            <figure key={i.src as string}>
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image src={i.src as string} alt={i.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-on-dark-muted">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6 · THE HARDWARE, AND WHY US ──────────────────────────────────────────────────────
 *
 * Two columns, filling the width: the Haven line-up on the left as a proper list, the two
 * things about the crew the client confirmed on camera on the right. This is TruGreen's
 * support section — text with a list on one side, substance on the other — and it is the
 * shape that fills 1,440px without a single decorative object.
 */
const HAVEN = [
  ["Haven Evolution", "The roofline channel and the diodes that sit in it.", "haven-evolution"],
  ["Haven Q Series", "Soffit and architectural fixtures, recessed or on track.", "haven-q-series"],
  ["Haven 9 Series", "Ground level: path, uplight and bed fixtures.", "haven-9-series-landscape-lights"],
  ["Haven X Bistro", "Overhead runs on a pergola, a patio or a structure.", "haven-x-bistro-lights"],
];

/* NO ICONS ON THIS LIST. The four glyphs that were here are drawn for a dark ground inside a
 * channel tile; at 28px on warm neutral they read as small dark smudges rather than as marks,
 * and they were decorating a list that already says what it means. TruGreen's equivalent
 * section is a plain list too. */
const CREW: [string, string][] = [
  ["Our own crews, never subcontracted", "The people on your roof are Brytr employees on Brytr payroll, and it is the same crew from the measure to the handover."],
  ["Day and night verification", "We do not leave until you have seen it lit after dark and seen how it reads from the street in daylight."],
  ["Into fascia, never shingles", "Every penetration sealed as it is made, mitred at every valley, dormer and return."],
  ["Concealed wire runs", "Nothing dropped down a downspout or run across a soffit, and a sealed cap closes the run."],
];

export function Hardware() {
  return (
    <section className="section bg-muted">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="display-section max-w-[20ch] text-foreground">
            We lead with Haven, and we install every line of it.
          </h2>
          <p className="lead mt-4 text-muted-foreground">
            One manufacturer for the roofline, the soffit, the ground and the overhead runs, so the
            whole property answers to the same app.
          </p>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {HAVEN.map(([name, what, slug]) => (
              <div key={slug} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                <dt className="w-[11rem] shrink-0">
                  <Link
                    href={`/lighting-systems/${slug}`}
                    data-spot
                    className="font-display text-[1.05rem] font-bold text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-[--dur-fast] hover:decoration-accent"
                  >
                    {name}
                  </Link>
                </dt>
                <dd className="min-w-0 flex-1 text-[0.98rem] text-muted-foreground">{what}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7">
            <Link href="/lighting-systems" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              See every system
            </Link>
          </div>
        </div>

        <div>
          <h2 className="display-section max-w-[20ch] text-foreground">
            The people who quote your roof install it.
          </h2>
          <p className="lead mt-4 text-muted-foreground">
            That is the reason Zac and Sam started Brytr, and it is still the part of this they
            will not hand to anybody else.
          </p>
          <ul className="mt-8 grid gap-7 sm:grid-cols-2">
            {CREW.map(([h, p]) => (
              <li key={h} className="border-t border-border pt-5">
                <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{h}</h3>
                <p className="mt-2 text-[0.95rem] leading-snug text-muted-foreground">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · THE CLOSER ───────────────────────────────────────────────────────────────────
 *
 * Text and the form, two columns, with the phone number as the fallback for anyone who would
 * rather talk. Short, because the page has already made its case.
 */
export function Closer() {
  return (
    <section className="section bg-background">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-start lg:gap-20">
        <div>
          <h2 className="display-hero max-w-[18ch] text-foreground">
            See it on your house before you buy.
          </h2>
          <p className="lead mt-4 text-muted-foreground">
            We come out after dark, walk the property, and show you the design on your own
            elevation. No charge, and no obligation.
          </p>
          <p className="mt-8 text-base text-muted-foreground">Or call us directly</p>
          <a
            href={site.phoneHref}
            className="u mt-1 block font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold tracking-[-0.03em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>
        </div>
        <QuoteForm variant="compact" heading="Get a free design consultation" />
      </div>
    </section>
  );
}
