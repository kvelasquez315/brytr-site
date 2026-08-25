import Link from "next/link";
import { cn } from "@/lib/utils";
import { iconMap, type IconKey } from "@/content/icon-map";
import { cities } from "@/content/cities";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";

export function SectionHead({
  eyebrow, title, lede, onDark, className, align = "left", icon, scale = "hero",
}: {
  eyebrow?: string; title: string; lede?: string; onDark?: boolean; className?: string;
  align?: "left" | "center";
  /* phoenixroofingandrepair.com pairs a small accent GLYPH with every eyebrow rather than a rule -
   * a little house mark that repeats on every section and does more to tie the page together than
   * any of its type choices. Pass an icon and it replaces the channel-mark. */
  icon?: IconKey;
  /* TWO HEADING SIZES, AND THE HOME PAGE IS WHY.
   *
   * Every section heading on the site was `display-hero` - clamp(2.15rem, 3.4vw, 3.375rem), which
   * tops out at 54px. So did the H1. On a page with twelve sections that produced thirteen headings
   * all at the same 54px, and a reader scrolling it has no way to tell the page's title from a
   * subhead two thousand pixels down. Everything shouting is the same as nothing shouting, and it
   * was a large part of what the client was reacting to.
   *
   *   "hero"     54px. The page's H1, and the one section per page allowed to be the loud moment.
   *   "section"  34px, `display-section`, which already existed and was used on exactly two
   *              sections. It is now what an ordinary section heading looks like.
   *
   * The default stays "hero" deliberately: twenty other pages call this component and none of them
   * were part of this brief. The home page opts in to "section" and sets the hierarchy properly. */
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
      {eyebrow && (
        <p className={cn("eyebrow", onDark && "eyebrow--on-dark", align === "center" && "justify-center")}>
          {icon ? (
            <SectionMark icon={icon} />
          ) : (
            <span className="channel-mark" aria-hidden />
          )}
          {eyebrow}
          {align === "center" && !icon && <span className="channel-mark" aria-hidden />}
        </p>
      )}
      <h2
        className={cn(
          eyebrow && "mt-3",
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

/* The little accent glyph that sits beside every section eyebrow, Phoenix's device. */
export function SectionMark({ icon }: { icon: IconKey }) {
  const I = iconMap[icon];
  return (
    <span className="grid size-7 shrink-0 place-items-center text-accent" aria-hidden>
      <I className="size-6" />
    </span>
  );
}

export function Tile({ icon, onDark }: { icon: IconKey; onDark?: boolean }) {
  const I = iconMap[icon];
  return (
    <span className={cn("channel-tile", !onDark && "channel-tile--light")} aria-hidden>
      <I className="size-7" />
    </span>
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

/* ---- the lead form -------------------------------------------------------- */
export function QuoteForm({
  variant = "full", city, heading, submitLabel = "Get my free design consultation", dark, className,
}: {
  variant?: "mini" | "compact" | "full" | "financing";
  city?: string; heading?: string; submitLabel?: string; dark?: boolean;
  /* Passed through to the <form>, and it exists for one caller: the home hero, which sets
   * `bg-background` so the card lands on warm limestone rather than white. `cn` is tailwind-merge,
   * so a background passed here beats the one in the base list rather than fighting it. */
  className?: string;
}) {
  /* FOUR VARIANTS, AND `mini` IS THE NEW ONE.
   *
   * The home page carried two forms with ten fields between them, one of them sitting on top of the
   * hero photograph. A six-field form is the densest object it is possible to put in a hero: six
   * labels, six inputs, two of them selects, a submit button and a note, all competing with the
   * headline for the same attention.
   *
   * `mini` is name, phone, city. Three fields, and deliberately no email - this is a trade that
   * calls people back, and the next question ("what are you lighting?") is better asked by a person
   * on the phone than by a select element sitting on a photograph. The full conversation still
   * happens: the closing form at the foot of the page is `compact`, and the dedicated
   * /free-design-consultation page is `full`.
   *
   * `dark` is separate from `variant` on purpose. The dark treatment used to be welded to the
   * financing variant, which also swaps every label and option to linear-foot language. The hero
   * needs the dark card with the ordinary questions on it. */
  const onDark = variant === "financing" || !!dark;
  const mini = variant === "mini";
  return (
    <form
      className={cn(
        "rounded-lg p-6 sm:p-7",
        onDark
          ? "form-on-dark bg-raise shadow-[var(--shadow-dark)] ring-1 ring-accent/15"
          : "bg-card shadow-[var(--shadow-lg)]",
        className
      )}
      /* No backend wired yet - see README. Renders its own success and error states. */
      action="/free-design-consultation"
      method="get"
    >
      {heading && (
        <h3 className={cn("mb-5 text-xl", onDark ? "text-on-dark" : "text-foreground")}>{heading}</h3>
      )}
      {/* MINI PUTS NAME AND PHONE ON ONE ROW AND THE CITY UNDER THEM, which is the reference
        * form's shape (edentreepros.com: name + phone paired, then a full-width field, then the
        * select). Three fields in an L rather than three stacked full-width rows takes about 90px
        * off the card's height, and on a hero card height is the whole argument. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={mini ? "" : "sm:col-span-2"}>
          <Label htmlFor={variant + "-name"}>Full name</Label>
          <Input id={variant + "-name"} name="name" required autoComplete="name" placeholder="Jordan Miller" />
        </div>
        <div>
          <Label htmlFor={variant + "-phone"}>Phone</Label>
          <Input id={variant + "-phone"} name="phone" type="tel" required autoComplete="tel" className="u" placeholder="402-555-0134" />
        </div>
        {!mini && (
          <div>
            <Label htmlFor={variant + "-email"}>Email</Label>
            <Input id={variant + "-email"} name="email" type="email" required autoComplete="email" placeholder="you@example.org" />
          </div>
        )}
        {variant === "full" && (
          <div className="sm:col-span-2">
            <Label htmlFor={variant + "-street"}>Street address</Label>
            <Input id={variant + "-street"} name="street" autoComplete="street-address" placeholder="1400 N 90th St" />
          </div>
        )}
        <div className={mini ? "sm:col-span-2" : ""}>
          <Label htmlFor={variant + "-city"}>City</Label>
          <Select id={variant + "-city"} name="city" defaultValue={city ?? ""} required>
            <option value="">Select your city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}{c.state === "IA" ? ", IA" : ""}</option>
            ))}
          </Select>
        </div>
        {!mini && (
          <div>
            <Label htmlFor={variant + "-scope"}>
              {variant === "financing" ? "Estimated roofline" : "What are you lighting"}
            </Label>
            {/* This had no empty option, so "Roofline" was not a placeholder - it was the
              * default, and a form left alone submitted "Roofline" for somebody who came for
              * landscape. Both selects now start empty and ask. */}
            <Select id={variant + "-scope"} name="scope" defaultValue="" required>
              <option value="">
                {variant === "financing" ? "Roughly how much" : "Choose one"}
              </option>
              {variant === "financing" ? (
                <>
                  <option>Under 150 linear ft</option>
                  <option>150 to 250 linear ft</option>
                  <option>250 to 400 linear ft</option>
                  <option>Over 400 linear ft</option>
                  <option>Not sure yet</option>
                </>
              ) : (
                <>
                  <option>Roofline</option>
                  <option>Landscape</option>
                  <option>Patio or pergola</option>
                  <option>Hardscape</option>
                  <option>Not sure yet</option>
                </>
              )}
            </Select>
          </div>
        )}
        {variant === "full" && (
          <div className="sm:col-span-2">
            <Label htmlFor={variant + "-notes"}>Notes</Label>
            <Textarea id={variant + "-notes"} name="notes" rows={3} placeholder="Two story, dormers on the front elevation." />
          </div>
        )}
      </div>
      <Button size="block" className="mt-5" type="submit">{submitLabel}</Button>
      <p className={cn("form-note mt-3 text-xs", onDark ? "text-on-dark-muted" : "text-muted-foreground")}>
        We reply the same day. No obligation.
      </p>
    </form>
  );
}
