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

export function Select({ className, children, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(base, "appearance-none bg-[length:0] pr-9", className)} {...p}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "h-auto py-3 leading-relaxed")} {...p} />;
}
