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
 * WHAT IT IS. One drawing containing all five stages, in the same measured-linework language as
 * components/sections/channel-detail.tsx and components/sections/elevation.tsx - a length of Brytr
 * channel seen face-on, with a diode at each stage and the output RAMPING from the first to the
 * last. Reading it top to bottom is watching the run come up: barely on at the walk-around, full
 * bloom on the night it is handed over. The graphic is the process, not an illustration of it.
 *
 * THE LABELS ARE INSIDE THE SVG on purpose. They are part of the drawing - each one is annotating
 * its own node the way the callouts annotate the section detail - and keeping them out would mean
 * aligning HTML rows to SVG coordinates, which is exactly the kind of coupling that breaks the
 * first time a line of copy wraps differently.
 *
 * The viewBox is tall and narrow so that at a phone width the whole thing scales down as one
 * object and the type holds its size relative to the drawing rather than collapsing.
 *
 * Every colour is a token. No hex, which scripts/hex-lock.mjs enforces.
 */

const STAGES: { title: string; body: string }[] = [
  { title: "Measured on site, after dark", body: "Against your own materials, not a catalogue" },
  { title: "Into fascia, never shingles", body: "Every penetration sealed as it is made" },
  { title: "One app, every zone", body: "House, pergola, walls and beds, on saved scenes" },
  { title: "We hold the warranty", body: "No portal between you and the crew" },
  { title: "Checked twice before we leave", body: "Signed off lit after dark, then again in daylight" },
];

export function InstallRun({ className }: { className?: string }) {
  const line = "var(--draw-line-night)";
  const faint = "var(--draw-faint-night)";
  const run = "var(--draw-run-night)";
  const accent = "var(--brand-accent)";
  const onDark = "var(--on-dark)";
  const onDarkMuted = "var(--on-dark-muted)";

  /* Node spacing and the output ramp. Five stages, evenly pitched, opacity climbing so the run
   * reads as coming up rather than as five identical dots. */
  const top = 54;
  const pitch = 104;
  const y = (i: number) => top + i * pitch;
  const glow = [0.3, 0.45, 0.62, 0.8, 1];
  const railX = 26;

  return (
    <svg
      viewBox={`0 0 560 ${y(4) + 70}`}
      className={className}
      role="img"
      aria-label={
        "The five stages of a Brytr install, drawn on one length of channel: " +
        STAGES.map((s) => s.title.toLowerCase()).join("; ") + "."
      }
    >
      {/* ── the channel, face on, running the full height ── */}
      <rect x={railX - 7} y={y(0) - 30} width="14" height={y(4) - y(0) + 60} rx="7" fill={run} stroke={line} strokeWidth="1.2" />
      {/* the lens line down its centre */}
      <path d={`M${railX} ${y(0) - 22}V${y(4) + 22}`} stroke={faint} strokeWidth="2" strokeLinecap="round" />

      {/* the diodes between the stages, on the channel's own pitch, so the run is continuous
        * rather than five lamps on a stick */}
      {Array.from({ length: 26 }, (_, i) => {
        const cy = y(0) - 24 + i * ((y(4) - y(0) + 48) / 25);
        const t = i / 25;
        return <circle key={i} cx={railX} cy={cy} r="1.6" fill={accent} opacity={0.12 + t * 0.3} />;
      })}

      {STAGES.map((s, i) => (
        <g key={s.title}>
          {/* the stage node: a diode at full size, its output climbing down the run */}
          <circle cx={railX} cy={y(i)} r="15" fill={accent} opacity={glow[i] * 0.16} />
          <circle cx={railX} cy={y(i)} r="8" fill={accent} opacity={glow[i] * 0.34} />
          <circle cx={railX} cy={y(i)} r="4.5" fill={accent} opacity={glow[i]} />

          {/* the leader out to the label */}
          <path d={`M${railX + 20} ${y(i)}H70`} stroke={line} strokeWidth="1" />

          <text x="82" y={y(i) - 4} fill={onDark} fontSize="17" fontWeight="700" fontFamily="var(--font-display)">
            {s.title}
          </text>
          <text x="82" y={y(i) + 18} fill={onDarkMuted} fontSize="14" fontFamily="var(--font-body)">
            {s.body}
          </text>
        </g>
      ))}

      {/* The little arc that used to close the drawing has gone. It was meant to read as the
        * finished run throwing light and rendered as a stray squiggle under the rail - the kind of
        * mark that makes a drawing look unfinished rather than resolved. The ramp itself is the
        * ending: the last diode is the only one at full output. */}
    </svg>
  );
}
