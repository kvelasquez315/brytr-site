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
 * Every colour is a token, in globals.css. No hex here, which scripts/hex-lock.mjs enforces; the
 * only inline style is the output ramp, which is a number.
 */

const STAGES: { title: string; body: string }[] = [
  { title: "Measured on site, after dark", body: "Against your own materials, not a catalogue" },
  { title: "Into fascia, never shingles", body: "Every penetration sealed as it is made" },
  { title: "One app, every zone", body: "House, pergola, walls and beds, on saved scenes" },
  { title: "We hold the warranty", body: "No portal between you and the crew" },
  { title: "Checked twice before we leave", body: "Signed off lit after dark, then again in daylight" },
];

/* The output climbing down the run, so it reads as coming up rather than as five identical dots. */
const GLOW = [0.3, 0.45, 0.62, 0.8, 1];

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
