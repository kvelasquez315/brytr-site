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
export function Faq({
  items, onDark, ground = "card",
}: {
  items: FaqItem[];
  onDark?: boolean;
  /* WHICH LIGHT GROUND THE CARDS SIT ON.
   *
   * They were always `bg-card` - white - which was right while every section under them was
   * limestone. The home page's FAQ section is white now, and a white card on a white section is
   * not a card. Measured: white against `background` is dE 7.8, which with the shadow is a
   * visible edge; white against white is nothing at all. */
  ground?: "card" | "background";
}) {
  const cardBg = ground === "background" ? "bg-background" : "bg-card";
  return (
    <Acc.Root type="single" collapsible defaultValue="i0" className="w-full space-y-4">
      {items.map((f, i) => (
        <Acc.Item
          key={f.q}
          value={`i${i}`}
          className={`overflow-hidden rounded-lg shadow-[var(--shadow-lg)] data-[state=open]:border-b-2 data-[state=open]:border-accent ${
            onDark ? "bg-raise" : cardBg
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
                /* The CLOSED chevron carries a soft amber wash rather than grey. On a page of six
                  * white cards the grey circles were the only mark on any of them, and six grey
                  * dots is what "needs more colour" was pointing at. This stays inside the rule
                  * that amber is CTA-and-active-state only: a chevron is the control, and the wash
                  * is what tells you the row is one you can open. Full amber is still reserved for
                  * the row that IS open. */
                className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-[--dur-fast] group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground ${
                  onDark ? "bg-on-dark/10 text-on-dark-muted" : "bg-accent/15 text-accent-ink"
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
          {/* `forceMount` KEEPS EVERY ANSWER IN THE HTML, and that is the point.
            *
            * Radix unmounts closed accordion content. Grepping the page for a closed answer finds
            * it anyway, which makes it look like the content is server-rendered - but what the
            * grep hits is Next's RSC flight payload (`self.__next_f.push`), which is transport,
            * not page content. Verified both ways: inside <main>, only the open item's answer
            * existed. So the eleven answers were roughly 640 words that a reader could reach in
            * one click and a crawler could not reach at all.
            *
            * That mattered because this page has an 800-word floor on it for SEO and had been cut
            * to 811. The choice was padding prose back onto a page whose whole brief was "way too
            * much text", or putting content that is already written, already true and already one
            * click away into the document where it counts. `forceMount` plus hiding on
            * `data-state=closed` does the second. Nothing changes visually: eleven collapsed rows,
            * one open.
            *
            * `hidden` is the right way to hide it rather than height-0-overflow-hidden, because
            * display:none also takes the text out of the accessibility tree, which is what a
            * collapsed panel should do. There is no open/close animation to break here. */}
          <Acc.Content forceMount className="overflow-hidden data-[state=closed]:hidden">
            <p className={`max-w-[86ch] px-6 pb-6 text-[0.98rem] leading-relaxed sm:px-7 ${onDark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
              {f.a}
            </p>
          </Acc.Content>
        </Acc.Item>
      ))}
    </Acc.Root>
  );
}
