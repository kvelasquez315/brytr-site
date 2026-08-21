import Link from "next/link";
import { cn } from "@/lib/utils";
import { iconMap, type IconKey } from "@/content/icon-map";
import { cities } from "@/content/cities";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";

export function SectionHead({
  eyebrow, title, lede, onDark, className, align = "left",
}: { eyebrow?: string; title: string; lede?: string; onDark?: boolean; className?: string; align?: "left" | "center" }) {
  /* RULE: body copy never sits beside a heading. Eyebrow, then title, then lede,
   * stacked. A two-column head reads as a magazine deck and breaks the vertical
   * rhythm of the page — and it was a lazy way to fill a wide container. Width gets
   * filled with content, not by moving the paragraph sideways.
   *
   * RULE: no numbers in a heading. Headings paint a picture; they do not count the
   * items underneath them. "Eleven ways to light a property" became "Every surface
   * worth lighting on a property". */
  return (
    <div className={cn(align === "center" && "mx-auto max-w-[52rem] text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", onDark && "eyebrow--on-dark", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn(eyebrow && "mt-4", "text-[clamp(1.85rem,3.4vw,2.9rem)]", onDark ? "text-on-dark" : "text-foreground")}>
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 max-w-[68ch] text-lg",
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

/* ---- the lead form. Three variants appear on the homepage by design ---- */
export function QuoteForm({
  variant = "full", city, heading, submitLabel = "Get my free design consultation",
}: { variant?: "compact" | "full" | "financing"; city?: string; heading?: string; submitLabel?: string }) {
  const onDark = variant === "financing";
  return (
    <form
      className={cn(
        "rounded-lg p-6 sm:p-7",
        onDark
          ? "form-on-dark bg-raise shadow-[var(--shadow-dark)] ring-1 ring-accent/15"
          : "bg-card shadow-[var(--shadow-lg)]"
      )}
      /* No backend wired yet — see README. Renders its own success and error states. */
      action="/free-design-consultation"
      method="get"
    >
      {heading && (
        <h3 className={cn("mb-5 text-xl", onDark ? "text-on-dark" : "text-foreground")}>{heading}</h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor={`${variant}-name`}>Full name</Label>
          <Input id={`${variant}-name`} name="name" required autoComplete="name" placeholder="Jordan Miller" />
        </div>
        <div>
          <Label htmlFor={`${variant}-phone`}>Phone</Label>
          <Input id={`${variant}-phone`} name="phone" type="tel" required autoComplete="tel" className="u" placeholder="402-555-0134" />
        </div>
        <div>
          <Label htmlFor={`${variant}-email`}>Email</Label>
          <Input id={`${variant}-email`} name="email" type="email" required autoComplete="email" placeholder="you@example.org" />
        </div>
        {variant === "full" && (
          <div className="sm:col-span-2">
            <Label htmlFor={`${variant}-street`}>Street address</Label>
            <Input id={`${variant}-street`} name="street" autoComplete="street-address" placeholder="1400 N 90th St" />
          </div>
        )}
        <div>
          <Label htmlFor={`${variant}-city`}>City</Label>
          <Select id={`${variant}-city`} name="city" defaultValue={city ?? ""} required>
            <option value="">Select your city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}{c.state === "IA" ? ", IA" : ""}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor={`${variant}-scope`}>
            {variant === "financing" ? "Estimated roofline" : "What are you lighting"}
          </Label>
          {/* This had no empty option, so "Roofline" was not a placeholder — it was the
            * default, and a form left alone submitted "Roofline" for somebody who came for
            * landscape. Both selects now start empty and ask. */}
          <Select id={`${variant}-scope`} name="scope" defaultValue="" required>
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
        {variant === "full" && (
          <div className="sm:col-span-2">
            <Label htmlFor={`${variant}-notes`}>Notes</Label>
            <Textarea id={`${variant}-notes`} name="notes" rows={3} placeholder="Two story, dormers on the front elevation." />
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
