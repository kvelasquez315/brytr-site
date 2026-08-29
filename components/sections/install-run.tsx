/* THE INSTALL, DRAWN AS ONE RUN. Five stages on a single length of channel.
 *
 * The client, on the five steps sitting as plain text rows: "for that list of words right there, we
 * should have some sort of designed graphic to go there for all of those different things that we
 * are talking about."
 *
 * WHAT THIS IS NOT. It is not the `.run-spine` that used to sit beside those rows - a 3px column of
 * amber dots, which he correctly read as a border that had failed to load. And it is not a glyph
 * per row, which is the other thing already tried and rejected: five stock icons beside five lines
 * is a list with decoration on it.
 *
 * WHAT IT IS. One drawing containing all five stages - a length of Brytr channel seen face-on, with
 * a diode at each stage and the output RAMPING from the first to the last. Reading it top to bottom
 * is watching the run come up: barely on at the walk-around, full bloom on the night it is handed
 * over. The graphic is the process, not an illustration of it.
 *
 * THE LABELS CAME BACK OUT OF THE SVG, AND THE OLD NOTE HERE WAS WRONG ABOUT WHY THEY WENT IN.
 *
 * It used to argue that keeping them inside meant "the type holds its size relative to the drawing
 * rather than collapsing". That is exactly backwards - holding its size RELATIVE to the drawing is
 * the failure, because the drawing scales with its column. One viewBox cannot serve a 656px desktop
 * column and a 343px phone at once: at 0.61 scale the 15-unit body text rendered at NINE PIXELS.
 * Measured, not guessed.
 *
 * So the stages are an ordered list of real HTML now, at real rem sizes that respond like every
 * other line of type on the site, and the channel is a CSS rail behind them. The old note also
 * feared "aligning HTML rows to SVG coordinates, which breaks the first time a line of copy wraps
 * differently" - that fear is answered by construction rather than by coordinates. The rail is a
 * background on the list, so it spans whatever height the rows come to, and each diode sits inside
 * its own row. Nothing measures anything.
 *
 * Every color is a token, in globals.css. No hex here, which scripts/hex-lock.mjs enforces; the
 * only inline style is the output ramp, which is a number.
 */

/* THREE POINTS, AND ALL FIVE OF THE OLD ONES ARE GONE. "None of those steps are right. We need to
 * come up with new ones" - then three, named: one app for the whole system, the best product made
 * and the only ones here who can fit it, and the walkthrough after the lights are up.
 *
 * The old set (measured after dark, into fascia never shingles, one app every zone, we hold the
 * warranty, checked twice before we leave) was a list of installation practices - things we do to
 * the house. These are three things the customer ends up holding.
 *
 * THE SECOND ONE WAS REPLACED, 29 Aug 2026. It read "The best product made, and only from us /
 * The highest quality permanent lighting available, and the only vendor here who can fit it", and
 * the client's punch list against it is "Not sure what this means." Two superlatives in one line,
 * neither of them checkable. What is in its place is the fact the rest of the site already carries
 * and can support: two systems on the truck, so the one that goes on a house is chosen for the
 * house. If the original meant something specific - a sole-installer arrangement with a
 * manufacturer, say - it can come back once we have it in writing. */
const STAGES: { title: string; body: string }[] = [
  { title: "One app runs the whole system",
    body: "Every zone on the house, the pergola, the walls and the beds, from one place" },
  { title: "Two systems, so you get the right one",
    body: "We fit Haven and Jellyfish, so what goes on the roof suits the building rather than being the only line we carry" },
  { title: "We walk you through it once it is lit",
    body: "Nobody is left holding an app they were never shown how to use" },
];

/* The output climbing down the list, so the marks read as a run coming up rather than as three
 * identical dots. Five values became three with the steps - leaving the old array would have run
 * 0.3 / 0.45 / 0.62 and stopped at two thirds brightness, so the last light never reached full. */
const GLOW = [0.42, 0.7, 1];

export function InstallRun({ className }: { className?: string }) {
  return (
    <ol className={`run ${className ?? ""}`}>
      {STAGES.map((s, i) => (
        <li key={s.title} className="run-stage">
          {/* the diode for this stage, its output set by where it falls in the run */}
          <span className="run-node" style={{ "--out": GLOW[i] } as React.CSSProperties} aria-hidden />
          <div className="run-copy">
            <h3 className="font-display text-[1.05rem] font-bold leading-snug text-on-dark sm:text-[1.15rem]">
              {s.title}
            </h3>
            <p className="mt-1 text-[0.9rem] leading-snug text-on-dark-muted sm:text-[0.98rem]">
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
