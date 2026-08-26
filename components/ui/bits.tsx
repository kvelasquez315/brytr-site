import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHead({
  title, lede, onDark, className, align = "left", scale = "section",
}: {
  title: string; lede?: string; onDark?: boolean; className?: string;
  align?: "left" | "center";
  /* TWO HEADING SIZES, AND THE HOME PAGE IS WHY.
   *
   * Every section heading on the site was `display-hero` - clamp(2.15rem, 3.4vw, 3.375rem), which
   * tops out at 54px. So did the H1. On a page with twelve sections that produced thirteen headings
   * all at the same 54px, and a reader scrolling it has no way to tell the page's title from a
   * subhead two thousand pixels down. Everything shouting is the same as nothing shouting, and it
   * was a large part of what the client was reacting to.
   *
   *   "section"  34px, `display-section`. THE DEFAULT, and what an ordinary section heading is.
   *   "hero"     54px. Opt in, for the one section on a page allowed to be the loud moment.
   *
   * THE DEFAULT FLIPPED, AND THAT IS THE SINGLE BIGGEST TYPOGRAPHY CHANGE ON THE SITE. It was
   * "hero", scoped that way on purpose while only the home page was being rebuilt - twenty other
   * pages call this component and none of them were in that brief.
   *
   * They are now. Every one of those pages was carrying four to six section headings at exactly the
   * same 54px as its own H1, which is the failure the home page was rebuilt to fix: if everything
   * is the loudest thing on the page, a reader scrolling has no way to tell the page's title from a
   * subhead two thousand pixels down. Flipping the default fixes all twenty at once and leaves
   * `scale="hero"` available where a section has earned it.
   *
   * `PageHero` is untouched by this - it renders its own <h1> with its own clamp - so page titles
   * keep their size and only the sections under them come down. */
  scale?: "hero" | "section";
}) {
  /* EVERY SECTION ON THE SITE COMES THROUGH HERE, and that is the point.
   *
   * The client, scrolling the live home page: "the site itself is still very confusing... I'm not
   * sure what I'm looking at when I'm scrolling through. It needs to be like I know what I'm
   * looking at." He named freedomexteriorsusa.com, so I opened it, and the thing it does on every
   * single section is the same three-part header:
   *
   *   OUR SERVICES                 <- a small label in the accent colour, with a rule beside it
   *   ROOFING, SIDING, WINDOWS     <- a big headline that NAMES the section in plain words
   *   One trusted Georgia          <- exactly one line explaining what you are about to read
   *   contractor for the whole
   *   outside of your home.
   *
   * WHY OURS FAILED. The headlines were clever instead of plain. The colour-change section opened
   * "The same roofline, on a Tuesday and on a Saturday" with no label at all, so a homeowner
   * scrolling past had no idea they had arrived at the demo of the product's main feature. The
   * reviews section had no eyebrow. A reader could not name a single section from its heading.
   *
   * THE RULE IS NOW MECHANICAL: the eyebrow says what KIND of section this is, the title says what
   * it IS in words a homeowner would use, and the lede is one sentence.
   *
   * THE LEDE IS ALSO OPTIONAL, AND ON THE HOME PAGE IT IS MOSTLY OMITTED NOW. It was passed on all
   * thirteen sections, which is thirteen paragraphs of explanation stacked on top of thirteen
   * headings that already said the same thing in plainer words. A lede earns its place when the
   * section needs a sentence the heading cannot carry - the drag demo needs one, a grid of
   * photographs does not.
   *
   * RULE, UNCHANGED: body copy never sits beside a heading. Eyebrow, title, lede, stacked. A
   * two-column head reads as a magazine deck and breaks the page's vertical rhythm.
   * RULE, UNCHANGED: no numbers in a heading. Headings name the thing; they do not count the
   * items underneath them. */
  return (
    <div className={cn(align === "center" && "mx-auto max-w-[54rem] text-center", className)}>
      <h2
        className={cn(
          scale === "hero" ? "display-hero" : "display-section",
          onDark ? "text-on-dark" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 max-w-[62ch] text-lg",
            align === "center" && "mx-auto",
            onDark ? "text-on-dark-muted" : "text-muted-foreground"
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function Check({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <li className="flex gap-2.5">
      <svg viewBox="0 0 16 16" className={cn("mt-1 size-4 shrink-0", onDark ? "text-on-dark" : "text-foreground")} fill="none" aria-hidden>
        <path d="m2.5 8.4 3.2 3.2L13.5 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={cn("text-[0.95rem]", onDark ? "text-on-dark-muted" : "text-muted-foreground")}>{children}</span>
    </li>
  );
}

export function Cross({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-on-dark-muted" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="text-[0.95rem] text-on-dark-muted">{children}</span>
    </li>
  );
}

export function TextLink({ href, children, onDark }: { href: string; children: React.ReactNode; onDark?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "tap-44 inline-block font-semibold decoration-accent decoration-2 underline-offset-4 transition-all duration-[--dur-fast] hover:decoration-[3px]",
        onDark ? "text-on-dark underline" : "text-foreground underline"
      )}
    >
      {children}
    </Link>
  );
}

export function ChannelEdge({ className }: { className?: string }) {
  return <div className={cn("channel-edge", className)} aria-hidden />;
}

/* ---- the lead form -------------------------------------------------------
 *
 * Moved to components/ui/quote-form.tsx, which is a Client Component: it needs React useActionState
 * to turn a submission into a success panel instead of a page navigation. Putting "use client" at
 * the top of THIS file would have dragged SectionHead, Check, Cross, TextLink and ChannelEdge over
 * the boundary with it - five components that render on twenty pages and ship no JavaScript today.
 *
 * Re-exported from here so every existing import of QuoteForm from @/components/ui/bits keeps
 * working untouched. */
export { QuoteForm } from "@/components/ui/quote-form";
