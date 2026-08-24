import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { reviews, reviewProof } from "@/content/reviews";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/ui/bits";

/* ═══ THE SECOND DESIGN, AND WHY THERE IS ONE ═══════════════════════════════════════════
 *
 * The client's read of the first one: "very jumbled and weird", with trugreen.com as the
 * reference for how little a page like this actually needs. He was right, and the numbers
 * measured off the old home page say why better than an opinion does:
 *
 *     66 boxed containers          28 headings         172 amber elements
 *     12.3 viewports of scroll     17 photographs, only 3 of them full width
 *     187 pieces of 13-15px text   against 13 pieces of large text
 *
 * Nine different display sizes appeared on one page. Every section was a heading followed by
 * a grid of small bordered rectangles, and the photography — the only thing this business
 * really has to sell — was trapped inside those rectangles at postage-stamp size behind a
 * caption. Density was the stated goal and clutter was what arrived, because density was
 * being bought with more objects rather than with better ones.
 *
 * The rules this file follows, taken off Apple's design language and TruGreen's restraint:
 *
 *   ONE THING PER SECTION.  A headline, one line under it, one photograph, one action. If a
 *   section needs a second argument it is not a section, it is a page.
 *
 *   THE PHOTOGRAPH IS THE SECTION.  Full width, square corners, no caption box, no frame.
 *   Where a photograph exists it does the work the old card grids were doing.
 *
 *   THE GROUND CHANGE IS THE DIVIDER.  No rules, no borders between sections. Light, dark,
 *   light. Nothing is drawn to separate them.
 *
 *   NO EYEBROWS.  The old page had a small bold label above every heading, sixty-odd of them.
 *   They were the single biggest contributor to the mosaic. A headline can start on its own.
 *
 *   AMBER IS AN ACTION.  Not a bullet, not a rule, not a label colour. The button, the hero
 *   baseline and the spark in the logo. That is the whole budget.
 *
 *   ONE SHADOW, UNDER PHOTOGRAPHY ONLY.  Cards get no elevation because there are no cards.
 *
 * Everything cut from here still exists on its own page and is still reachable from the nav:
 * the craft detail on /lighting-systems, the crews argument on /about, the process on
 * /how-it-works, the towns and drive times on /service-areas, the questions on /faq, the
 * articles on /blog. Nothing was deleted; it stopped being said twice.
 */

/* ── 2 · WHAT WE INSTALL ───────────────────────────────────────────────────────────────
 *
 * Three services, and the photograph is the card. The old version of this was three equal
 * boxes each carrying a name, a paragraph and a three-item checklist with amber ticks: nine
 * lines of text and three small images. One lead tile at full width and two beneath it, so
 * the row is not three identical rectangles, which is the arrangement that reads as a
 * template no matter how it is styled.
 */
const LEAD = ["permanent-outdoor-lighting", "permanent-christmas-lights", "permanent-roofline-lighting"];

function PhotoTile({ slug, tall }: { slug: string; tall?: boolean }) {
  const svc = services.find((s) => s.slug === slug);
  const img = svc?.photo ? images[svc.photo] : undefined;
  if (!svc || !img?.src) return null;
  return (
    <Link href={`/services/${svc.slug}`} data-spot className="group block">
      <div className={`relative w-full overflow-hidden bg-primary ${tall ? "aspect-21/9" : "aspect-4/3"}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={tall ? "100vw" : "(min-width:768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[--dur-slow] ease-[--ease-out-expo] group-hover:scale-[1.02]"
        />
      </div>
      <h3 className="mt-6 display-section text-foreground">{svc.name}</h3>
      <p className="lead mt-3 text-muted-foreground">{svc.short}</p>
    </Link>
  );
}

export function Installs() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <h2 className="display-hero max-w-[22ch] text-foreground">
          Every surface worth lighting on a property.
        </h2>
        <p className="lead mt-6 text-muted-foreground">
          One channel, one controller, one app. Start with the roofline and add to it whenever you
          like.
        </p>

        <div className="mt-16">
          <PhotoTile slug={LEAD[0]} tall />
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
          <PhotoTile slug={LEAD[1]} />
          <PhotoTile slug={LEAD[2]} />
        </div>

        <div className="mt-16">
          <Button asChild size="lg"><Link href="/services">Everything we install</Link></Button>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · WHAT PEOPLE SAY ───────────────────────────────────────────────────────────────
 *
 * One review at display size, and two more underneath at reading size. The old section put
 * six of them in a card grid, which turns testimony into a wall to be skimmed. A quote set
 * large is read; a quote in a bordered box beside five others is counted.
 */
export function Proof() {
  const [lead, ...rest] = reviews;
  const others = rest.slice(0, 2);
  return (
    <section className="section bg-background">
      <div className="shell">
        <h2 className="display-hero max-w-[20ch] text-foreground">
          See what our clients have to say.
        </h2>

        <blockquote className="mt-16 max-w-[46rem]">
          <p className="text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.28] tracking-[-0.02em] text-foreground">
            &ldquo;{lead.text}&rdquo;
          </p>
          <footer className="mt-8 text-base text-muted-foreground">
            {lead.name}
            <span className="mx-2" aria-hidden>·</span>
            Google review
          </footer>
        </blockquote>

        <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-2 md:gap-16">
          {others.map((r) => (
            <blockquote key={r.name}>
              <p className="text-lg leading-relaxed text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
              <footer className="mt-5 text-sm text-muted-foreground">
                {r.name}
                <span className="mx-2" aria-hidden>·</span>
                Google review
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-16 text-base text-muted-foreground">
          <span className="u font-semibold text-foreground">{reviewProof.average}</span> from{" "}
          <span className="u">{reviewProof.count}</span> {reviewProof.platform} reviews.{" "}
          <Link href="/reviews" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
            Read all of them
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ── 6 · THE HARDWARE ──────────────────────────────────────────────────────────────────
 *
 * Four names and one line each, set as type rather than boxed. This was four dark panels
 * with amber bars down their left edge; the panels were doing nothing the words were not
 * already doing. The spec sheet and the craft detail live on the system pages, where each
 * value sits next to the product it describes.
 */
const HAVEN = [
  ["Haven Evolution", "The roofline channel and the diodes that sit in it.", "haven-evolution"],
  ["Haven Q Series", "Soffit and architectural fixtures, recessed or on track.", "haven-q-series"],
  ["Haven 9 Series", "Ground level: path, uplight and bed fixtures.", "haven-9-series-landscape-lights"],
  ["Haven X Bistro", "Overhead runs on a pergola, a patio or a structure.", "haven-x-bistro-lights"],
];

export function Hardware() {
  return (
    <section className="section bg-muted">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="display-section max-w-[18ch] text-foreground">
              We lead with Haven, and we install every line of it.
            </h2>
            <p className="lead mt-6 text-muted-foreground">
              One manufacturer for the roofline, the soffit, the ground and the overhead runs, so
              the whole property answers to the same app.
            </p>
            <div className="mt-10">
              <Button asChild size="lg"><Link href="/lighting-systems">See every system</Link></Button>
            </div>
          </div>

          <dl className="divide-y divide-border border-t border-border">
            {HAVEN.map(([name, what, slug]) => (
              <div key={slug} className="py-7">
                <dt>
                  <Link
                    href={`/lighting-systems/${slug}`}
                    data-spot
                    className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-[--dur-fast] hover:decoration-accent"
                  >
                    {name}
                  </Link>
                </dt>
                <dd className="mt-2 text-lg text-muted-foreground">{what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · THE CLOSER ───────────────────────────────────────────────────────────────────
 *
 * The form, the phone number, and nothing else. The old closer carried a four-item list, a
 * three-figure stat row and a phone band. A page that has already made its argument should
 * end by asking, not by arguing again.
 */
export function Closer() {
  return (
    <section className="section bg-background">
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-start lg:gap-24">
        <div>
          <h2 className="display-hero max-w-[16ch] text-foreground">
            See it on your house before you buy.
          </h2>
          <p className="lead mt-6 text-muted-foreground">
            We come out after dark, walk the property, and show you the design on your own
            elevation. No charge, and no obligation.
          </p>
          <p className="mt-10 text-base text-muted-foreground">
            Or call us directly
          </p>
          <a
            href={site.phoneHref}
            className="u mt-2 block font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold tracking-[-0.03em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px]"
          >
            {site.phone}
          </a>
        </div>
        <QuoteForm variant="compact" heading="Get a free design consultation" />
      </div>
    </section>
  );
}

/* ── 5 · THE WORK ──────────────────────────────────────────────────────────────────────
 *
 * Photographs of finished installs, on the dark ground, at a size where you can actually see
 * the run. The section that stood here was a four-tab switcher over a six-cell grid, every
 * cell carrying a small amber label and a caption, plus a specification panel with five more
 * amber micro-labels and a footer strip: about twenty pieces of small type wrapped around
 * six small pictures. It was the last piece of the old mosaic left on the page.
 *
 * The tabs and the per-house detail were worth building and they still exist, on
 * /recent-projects. What a home page owes this section is the evidence, full width, and a way
 * through to the rest.
 */
const WORK: [string, string][] = [
  ["homeBrickGablesGold", "wide"],
  ["seqRedGreen", "half"],
  ["poolPergolaDusk", "half"],
];

export function Work() {
  const shots = WORK.map(([k, w]) => [images[k], w] as const).filter(([i]) => i?.src);
  const wide = shots.find(([, w]) => w === "wide");
  const halves = shots.filter(([, w]) => w === "half");
  return (
    <section className="section bg-primary">
      <div className="shell">
        <h2 className="display-hero max-w-[20ch] text-on-dark">
          Houses lit by our lights around Omaha.
        </h2>
        <p className="lead mt-6 text-on-dark-muted">
          Photographed on the property at night with the system running, so what you are looking
          at is the output rather than a rendering of it.
        </p>

        {wide && (
          <div className="relative mt-16 aspect-21/9 w-full overflow-hidden">
            <Image src={wide[0].src as string} alt={wide[0].alt} fill sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {halves.map(([i]) => (
            <div key={i.src as string} className="relative aspect-4/3 w-full overflow-hidden">
              <Image src={i.src as string} alt={i.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
          <Button asChild size="lg"><Link href="/gallery">See the full gallery</Link></Button>
          <Link
            href="/recent-projects"
            className="text-lg font-semibold text-on-dark underline decoration-accent decoration-2 underline-offset-4"
          >
            Four installs, house by house
          </Link>
        </div>
      </div>
    </section>
  );
}
