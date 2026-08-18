"use client";
import * as Acc from "@radix-ui/react-accordion";
import type { Faq as FaqItem } from "@/content/faqs";

export function Faq({ items, onDark }: { items: FaqItem[]; onDark?: boolean }) {
  return (
    <Acc.Root type="single" collapsible defaultValue="i0" className="w-full">
      {items.map((f, i) => (
        <Acc.Item
          key={f.q}
          value={`i${i}`}
          className={`border-b ${onDark ? "border-on-dark/12" : "border-border"}`}
        >
          <Acc.Header>
            <Acc.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left">
              <span className={`font-display text-lg font-bold ${onDark ? "text-on-dark" : "text-foreground"}`}>{f.q}</span>
              <svg
                viewBox="0 0 20 20"
                className="mt-1 size-5 shrink-0 text-accent transition-transform duration-[--dur-base] ease-[--ease-out-expo] group-data-[state=open]:rotate-180"
                fill="none"
                aria-hidden
              >
                <path d="m4 7 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Acc.Trigger>
          </Acc.Header>
          <Acc.Content className="overflow-hidden data-[state=closed]:animate-none">
            <p className={`max-w-[76ch] pb-6 pr-10 ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>{f.a}</p>
          </Acc.Content>
        </Acc.Item>
      ))}
    </Acc.Root>
  );
}

