"use client";
import * as Acc from "@radix-ui/react-accordion";
import type { Faq as FaqItem } from "@/content/faqs";

/* THE FAQ, in phoenixroofingandrepair.com's shape.
 *
 * WHAT THEIRS IS: a cream band, an icon and a two-line eyebrow "MOST FAQ'S", a headline over two
 * lines, then the questions as separate WHITE ROUNDED CARDS with a gap between them rather than one
 * hairline-ruled list. The open card carries an ACCENT BOTTOM BORDER and its chevron sits in a solid
 * accent CIRCLE; the closed cards show a plain grey chevron and no border.
 *
 * WHAT OURS WAS: a flat list with a hairline under each row and a bare chevron. Same information,
 * but on a page built out of cards it read as the one section nobody had designed.
 *
 * The bottom border is the one place on this site where a coloured strip on a card is right, and it
 * is worth saying why, because slopcheck bans exactly that pattern: a strip is wrong when it stands
 * in for structure that is not there. Here it is STATE - it marks which question is open, it appears
 * and disappears with the interaction, and the reference uses it for the same reason.
 */
export function Faq({ items, onDark }: { items: FaqItem[]; onDark?: boolean }) {
  return (
    <Acc.Root type="single" collapsible defaultValue="i0" className="w-full space-y-4">
      {items.map((f, i) => (
        <Acc.Item
          key={f.q}
          value={`i${i}`}
          className={`overflow-hidden rounded-lg shadow-[var(--shadow-lg)] data-[state=open]:border-b-2 data-[state=open]:border-accent ${
            onDark ? "bg-raise" : "bg-card"
          }`}
        >
          <Acc.Header>
            <Acc.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7">
              <span className={`font-display text-[1.05rem] font-bold leading-snug ${onDark ? "text-on-dark" : "text-foreground"}`}>
                {f.q}
              </span>
              {/* The chevron fills with the accent when the card is open, which is Phoenix's tell
                * for which one you are reading. */}
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-[--dur-fast] group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground ${
                  onDark ? "bg-on-dark/10 text-on-dark-muted" : "bg-muted text-muted-foreground"
                }`}
                aria-hidden
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-4 transition-transform duration-[--dur-base] ease-[--ease-out-expo] group-data-[state=open]:rotate-180"
                  fill="none"
                >
                  <path d="m4 7 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Acc.Trigger>
          </Acc.Header>
          <Acc.Content className="overflow-hidden data-[state=closed]:animate-none">
            <p className={`max-w-[86ch] px-6 pb-6 text-[0.98rem] leading-relaxed sm:px-7 ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
              {f.a}
            </p>
          </Acc.Content>
        </Acc.Item>
      ))}
    </Acc.Root>
  );
}
