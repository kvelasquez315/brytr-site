import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-[background-color,color,border-color,transform] duration-[--dur-fast] ease-[--ease-out-expo] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        // the single bright accent — CTA only
        accent:
          "bg-accent text-accent-foreground hover:bg-accent-deep hover:-translate-y-px shadow-[var(--shadow-sm)]",
        solid:
          "bg-primary text-primary-foreground hover:bg-raise hover:-translate-y-px",
        outline:
          "border-[1.5px] border-primary/40 text-primary hover:border-accent-deep hover:text-accent-deep bg-transparent",
        "outline-dark":
          "border-[1.5px] border-on-dark/45 text-on-dark hover:border-accent hover:text-accent bg-transparent",
        ghost: "text-primary hover:bg-neutral-deep",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        block: "h-13 w-full px-6 text-base",
      },
    },
    defaultVariants: { variant: "accent", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(button({ variant, size }), className)} {...props} />;
}
