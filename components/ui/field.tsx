import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "h-12 w-full rounded-md border border-input bg-card px-3.5 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-[--dur-fast] focus:border-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Label({ className, ...p }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-sm font-semibold text-foreground", className)} {...p} />;
}

export function Input({ className, ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...p} />;
}

/* `invalid:` is how a select gets a placeholder.
 *
 * A select has no placeholder attribute, so an <option value=""> renders in the same weight
 * and colour as a real answer. On the quote form that meant "Select your city" and "Roofline"
 * looked exactly like values somebody had already chosen — the two fields that need a decision
 * were the two that looked decided, so they got skipped. A required select whose value is ""
 * matches :invalid, which is the one hook available without client state. */
export function Select({ className, children, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(base, "appearance-none bg-[length:0] pr-9 invalid:text-muted-foreground/70", className)}
      {...p}
    >
      {children}
    </select>
  );
}

export function Textarea({ className, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  /* className was accepted and then dropped on the floor. */
  return <textarea className={cn(base, "h-auto py-3 leading-relaxed", className)} {...p} />;
}
