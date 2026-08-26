import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";

/* THE VALUE BAND. The first thing under the hero on every page, and the same shape everywhere.
 *
 * "I think before this we need to have more of a value prop, but using images in everything.
 * Maybe a section right before this that shows images, value, and is a clean, beautiful design
 * section with a call to action. Need to make sure we have one of those types of sections on all
 * pages right after the trust banner."
 *
 * WHAT IT FIXES. Every interior template went hero, then straight into its own argument: a spec
 * sheet, a price ladder, a FAQ. A reader who landed on /warranty from a search got a warranty page
 * and was never told what the product is or why anyone buys it. The hero states the page; this
 * states the offer, once, before the page gets specific.
 *
 * IT IS NOT THREE CARDS. The site already leans on three-up grids and slopcheck warns about it,
 * so this is deliberately asymmetric: a copy column carrying the argument and the call to action,
 * against a photo mosaic of one wide frame over two squarer ones. Same shape on every page, and
 * the shape is the point: a reader moving from /pricing to /warranty should recognise the band
 * and know it is the same offer restated, not a new pitch.
 *
 * THE CONTENT IS ALWAYS DIFFERENT. Three points and three photographs per page, written and
 * chosen against that page, in content/value-props.ts. Same design, same flow, different content,
 * which is the standing instruction for the whole site.
 *
 * THE GROUND IS PASSED IN, not chosen here, because the band has to differ from whatever section
 * follows it and that varies by template. scripts/section-rhythm.mjs enforces it.
 */
export type ValuePoint = { h: string; p: string };

export function ValueBand({
  title, points, photos, cta, alt, ground = "muted",
}: {
  title: string;
  /** Three. Fewer reads as a stub, more turns the band into the page. */
  points: ValuePoint[];
  /** Three keys into content/images.ts: one wide, then two. A missing key renders nothing at all
   *  rather than a grey box, same rule as every other photograph on the site. */
  photos: string[];
  cta: { href: string; label: string };
  alt?: { href: string; label: string };
  ground?: "muted" | "card";
}) {
  const bg = { muted: "bg-muted", card: "bg-card" }[ground];
  const live = photos.map((k) => images[k]).filter((s) => s?.src);
  const [lead, ...rest] = live;

  return (
    <section className={`section ${bg}`}>
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
        <div>
          {/* NO LEDE. rules.md D3 bans sub-heading and sub-body text under a section heading
            * outright: the heading goes straight into content. The three points below already carry
            * the argument, and the lede was a fourth statement of it. */}
          <h2 className="display-section max-w-[20ch] text-foreground">{title}</h2>

          {/* The house lights, on the light variant. Every point is at full output: these are a
            * set of reasons, not a sequence, and a ramp across them would tell the reader to look
            * for an order that is not there. */}
          <ul className="run on-light mt-8">
            {points.map((p) => (
              <li key={p.h} className="run-stage">
                <span className="run-node" style={{ "--out": 1 } as React.CSSProperties} aria-hidden />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{p.h}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p.p}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={cta.href}
              className="tap-44 inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-colors duration-[--dur-fast] hover:bg-accent-deep"
            >
              {cta.label}
              <span className="inline-block" aria-hidden>&rarr;</span>
            </Link>
            {alt && (
              <Link
                href={alt.href}
                className="tap-44 inline-flex h-12 items-center rounded-full bg-primary px-7 font-semibold text-on-dark transition-colors duration-[--dur-fast] hover:bg-raise"
              >
                {alt.label}
              </Link>
            )}
          </div>
        </div>

        {/* ONE WIDE FRAME OVER TWO. The mosaic is what stops this being a text block with a picture
          * beside it: three photographs at two different sizes read as a composition, and the wide
          * one carries the whole property while the two under it carry detail. */}
        {lead?.src && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-16/9 overflow-hidden rounded-lg bg-primary ring-1 ring-border">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
            {rest.slice(0, 2).map((s) => (
              <div key={s.src} className="relative aspect-4/3 overflow-hidden rounded-lg bg-primary ring-1 ring-border">
                <Image
                  src={s.src!}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
