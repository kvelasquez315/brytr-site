"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { cities } from "@/content/cities";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { submitLead, type LeadState } from "@/app/actions/lead";

/* THE LEAD FORM. Four variants, one component, and every form on the site is one of them.
 *
 * IT LIVES IN ITS OWN FILE NOW because it is a Client Component and bits.tsx is not. Putting
 * "use client" at the top of bits.tsx would have dragged SectionHead, Check, Cross, TextLink and
 * ChannelEdge across the boundary with it - five components that render on twenty pages and have no
 * reason to ship JavaScript. bits.tsx re-exports this one so no caller had to change.
 *
 * IT IS A CLIENT COMPONENT for exactly one reason: `useActionState`, which is what turns a form
 * post into a success panel or an error message instead of a page navigation. The action itself
 * still runs on the server - see app/actions/lead.ts.
 *
 * WHAT IT REPLACED: `action="/free-design-consultation" method="get"`. Every form on this site
 * navigated to a page and put the homeowner's phone number in the URL bar. HANDOFF.md has carried
 * "Forms are not wired" as an open item since the site was built.
 *
 * THE VARIANTS:
 *   mini       name, phone, city. The home hero. No email - this is a trade that calls people back,
 *              and the rest of the conversation is better had by a person than by a select element
 *              sitting on a photograph.
 *   compact    adds email and what-are-you-lighting. The closing section, and page CTAs.
 *   full       adds street address and notes. /free-design-consultation.
 *   financing  compact, on a dark ground, with linear-foot language on the scope select.
 */
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
  const [state, formAction, pending] = useActionState<LeadState, FormData>(submitLead, null);
  const pathname = usePathname();

  const onDark = variant === "financing" || !!dark;
  const mini = variant === "mini";

  const shell = cn(
    "rounded-lg p-6 sm:p-7",
    onDark
      ? "form-on-dark bg-raise shadow-[var(--shadow-dark)] ring-1 ring-accent/15"
      /* The hairline matches the four light card types on the home page - see the note above
         Services in components/sections/home.tsx. A white form card on warm limestone was
         separated by a soft shadow alone, which reads as blur rather than as an object. */
      : "bg-card shadow-[var(--shadow-lg)] ring-1 ring-border",
    className
  );

  /* SUCCESS REPLACES THE FORM RATHER THAN SITTING ABOVE IT. A confirmation message with the fields
   * still underneath reads as though it might not have worked, and invites a second submission. */
  if (state?.ok) {
    return (
      <div className={shell}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-4 text-accent-foreground" fill="none">
              <path d="m3.2 8.4 3 3 6.6-6.8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3 className={cn("text-xl", onDark ? "text-on-dark" : "text-foreground")}>
              Request received
            </h3>
            <p className={cn("mt-2 text-[0.95rem] leading-relaxed", onDark ? "text-on-dark-muted" : "text-muted-foreground")}>
              {state.message}
            </p>
            <a
              href={site.phoneHref}
              className={cn(
                "u mt-4 inline-block font-display font-bold underline decoration-accent decoration-2 underline-offset-4",
                onDark ? "text-on-dark" : "text-foreground"
              )}
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className={shell}>
      {heading && (
        <h3 className={cn("mb-5 text-xl", onDark ? "text-on-dark" : "text-foreground")}>{heading}</h3>
      )}

      {/* Context for whoever picks the lead up in the CRM: which page it came from and which form. */}
      <input type="hidden" name="page" value={pathname} />
      <input type="hidden" name="form" value={variant} />

      {/* The honeypot. Not `display:none` - some bots skip hidden fields and some screen readers
        * announce them - so it is pulled off-screen, taken out of the tab order, and labelled as
        * not-for-you for anything that does read it. See app/actions/lead.ts. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={variant + "-company"}>Company (leave this empty)</label>
        <input id={variant + "-company"} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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

      <Button size="block" className="mt-5" type="submit" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </Button>

      {/* aria-live so the failure is announced rather than only drawn. */}
      {state && !state.ok && (
        <p role="alert" aria-live="polite" className="mt-3 text-sm font-semibold text-destructive">
          {state.message}
        </p>
      )}

    </form>
  );
}
