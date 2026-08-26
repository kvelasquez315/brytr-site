/* THE SIGNATURE DEVICE, IN THREE MORE FORMS.
 *
 * The eave cross-section in components/sections/channel-detail.tsx is the best-drawn thing on this
 * site and it appeared on exactly one section of one page type, while the twelve service-area pages
 * carried no graphic at all. A signature used once is not a signature.
 *
 * These are the same drawing language, not new ideas: the same measured linework, the same two
 * pencil weights from the --draw-* palette, the same channel body with a lit lens, labels set in
 * the drawing rather than beside it. Three subjects, each one a thing a homeowner actually asks
 * about:
 *
 *   pitch      a length of channel face-on with the diode spacing dimensioned. Answers "will I see
 *              dots or a line", which is the question the diffuser and the spacing decide together.
 *   spectrum   the same length, its diodes stepping through the six scene colours from globals.css,
 *              with warm white marked as where it sits most of the year.
 *   run        a gable seen straight on with the channel following the eave and both rakes, and the
 *              mitre called out at the peak. Answers "what does it do at the corners".
 *
 * WHY SVG AND NOT A PHOTOGRAPH. These are the parts a photograph cannot show: a dimension, a pitch,
 * a colour range, the geometry of a mitre. Where a photograph can show it, the site uses one.
 *
 * Every colour is a token. No hex, which scripts/hex-lock.mjs enforces.
 */
export function ChannelFigure({
  variant,
  className,
}: {
  variant: "pitch" | "spectrum" | "run";
  className?: string;
}) {
  const line = "var(--draw-line-night)";
  const faint = "var(--draw-faint-night)";
  const body = "var(--draw-run-night)";
  const lens = "var(--draw-runline-night)";
  const ink = "var(--on-dark)";
  const inkMuted = "var(--on-dark-muted)";
  const accent = "var(--brand-accent)";

  /* ---------------------------------------------------------------- pitch */
  if (variant === "pitch") {
    const x0 = 60;
    const x1 = 640;
    const n = 15;                         // diodes across the run
    const step = (x1 - x0) / (n - 1);
    const y = 150;
    return (
      <svg viewBox="0 0 700 300" className={className} role="img"
        aria-label="A length of Brytr channel seen face on, with the diodes spaced four inches apart and the spacing dimensioned.">
        {/* the channel body, face on */}
        <rect x={x0 - 26} y={y - 20} width={x1 - x0 + 52} height="40" rx="8" fill={body} stroke={line} strokeWidth="1.2" />
        {/* the lens line down its length */}
        <path d={`M${x0 - 18} ${y}H${x1 + 18}`} stroke={lens} strokeWidth="2" strokeLinecap="round" />
        {/* the diodes */}
        {Array.from({ length: n }, (_, i) => {
          const cx = x0 + i * step;
          return (
            <g key={i}>
              <circle cx={cx} cy={y} r="9" fill={accent} opacity="0.16" />
              <circle cx={cx} cy={y} r="4.2" fill={accent} />
            </g>
          );
        })}
        {/* the dimension, between the first two diodes */}
        <path d={`M${x0} ${y + 38}V${y + 58}M${x0 + step} ${y + 38}V${y + 58}`} stroke={faint} strokeWidth="1" />
        <path d={`M${x0} ${y + 50}H${x0 + step}`} stroke={line} strokeWidth="1" />
        <path d={`M${x0} ${y + 50}l7 -4v8zM${x0 + step} ${y + 50}l-7 -4v8z`} fill={line} />
        <text x={x0 + step / 2} y={y + 74} fill={ink} fontSize="17" fontWeight="700" textAnchor="middle" fontFamily="var(--font-display)">
          4 in.
        </text>
        <text x={x0 - 26} y={y - 40} fill={inkMuted} fontSize="15" fontFamily="var(--font-body)">
          Every four inches, the whole length of the run
        </text>
        <text x={x0 - 26} y={y + 108} fill={inkMuted} fontSize="15" fontFamily="var(--font-body)">
          Close enough that the diffuser reads it as a line rather than a row of points
        </text>
      </svg>
    );
  }

  /* ------------------------------------------------------------- spectrum */
  if (variant === "spectrum") {
    const scenes: [string, string][] = [
      ["--scene-warm", "Warm white"],
      ["--scene-amber", "Amber"],
      ["--scene-red", "Red"],
      ["--scene-green", "Green"],
      ["--scene-blue", "Blue"],
      ["--scene-violet", "Violet"],
    ];
    const x0 = 40;
    const w = 620 / scenes.length;
    const y = 120;
    return (
      <svg viewBox="0 0 700 300" className={className} role="img"
        aria-label="One length of Brytr channel drawn six times, each in a different saved scene colour, with warm white marked as the everyday setting.">
        <rect x={x0 - 14} y={y - 20} width="648" height="40" rx="8" fill={body} stroke={line} strokeWidth="1.2" />
        {scenes.map(([tok, label], s) => {
          const cx0 = x0 + s * w;
          return (
            <g key={tok}>
              {Array.from({ length: 5 }, (_, i) => {
                const cx = cx0 + 12 + i * ((w - 24) / 4);
                return (
                  <g key={i}>
                    <circle cx={cx} cy={y} r="9" fill={`var(${tok})`} opacity="0.2" />
                    <circle cx={cx} cy={y} r="4.2" fill={`var(${tok})`} />
                  </g>
                );
              })}
              {/* the tick and the name, under each run of five */}
              <path d={`M${cx0} ${y + 30}V${y + 42}`} stroke={faint} strokeWidth="1" />
              <text x={cx0 + w / 2} y={y + 62} fill={s === 0 ? ink : inkMuted} fontSize="14"
                fontWeight={s === 0 ? "700" : "400"} textAnchor="middle" fontFamily="var(--font-body)">
                {label}
              </text>
            </g>
          );
        })}
        <path d={`M${x0 + w} ${y + 30}V${y + 42}`} stroke={faint} strokeWidth="1" />
        <text x={x0 - 14} y={y - 42} fill={inkMuted} fontSize="15" fontFamily="var(--font-body)">
          One run, six saved scenes. Nothing is swapped to change it.
        </text>
        {/* anchored to the start, not centred: centred on the first run of five it overhung the
          * left edge of the viewBox and the W was cut off. */}
        <text x={x0 - 14} y={y + 96} fill={accent} fontSize="14" fontWeight="700" fontFamily="var(--font-body)">
          Warm white is where it sits most of the year
        </text>
      </svg>
    );
  }

  /* ------------------------------------------------------------------ run */
  const peak: [number, number] = [350, 70];
  const left: [number, number] = [90, 210];
  const right: [number, number] = [610, 210];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img"
      aria-label="A gable seen straight on with the Brytr channel following both rakes and the eave, and the mitred joint called out at the peak.">
      {/* the gable itself, construction weight */}
      <path d={`M${left[0]} ${left[1]}L${peak[0]} ${peak[1]}L${right[0]} ${right[1]}`} fill="none" stroke={faint} strokeWidth="1.4" />
      <path d={`M${left[0]} ${left[1]}H${right[0]}`} stroke={faint} strokeWidth="1.4" />
      <path d={`M${left[0]} ${left[1]}V265M${right[0]} ${right[1]}V265`} stroke={faint} strokeWidth="1.4" />

      {/* the channel, offset just inside the roof line, following both rakes and the eave */}
      <path
        d={`M${left[0] + 10} ${left[1] - 6}L${peak[0]} ${peak[1] + 16}L${right[0] - 10} ${right[1] - 6}`}
        fill="none" stroke={body} strokeWidth="11" strokeLinejoin="miter" strokeLinecap="butt"
      />
      <path
        d={`M${left[0] + 10} ${left[1] - 6}L${peak[0]} ${peak[1] + 16}L${right[0] - 10} ${right[1] - 6}`}
        fill="none" stroke={accent} strokeWidth="2.4" strokeLinejoin="miter" opacity="0.9"
      />
      <path d={`M${left[0] + 10} ${left[1] - 6}H${right[0] - 10}`} stroke={body} strokeWidth="11" />
      <path d={`M${left[0] + 10} ${left[1] - 6}H${right[0] - 10}`} stroke={accent} strokeWidth="2.4" opacity="0.9" />

      {/* the callout at the peak */}
      <circle cx={peak[0]} cy={peak[1] + 16} r="16" fill="none" stroke={line} strokeWidth="1" />
      <path d={`M${peak[0] + 16} ${peak[1] + 16}H${peak[0] + 74}`} stroke={line} strokeWidth="1" />
      <text x={peak[0] + 82} y={peak[1] + 12} fill={ink} fontSize="16" fontWeight="700" fontFamily="var(--font-display)">
        Mitred, not bent
      </text>
      <text x={peak[0] + 82} y={peak[1] + 33} fill={inkMuted} fontSize="14" fontFamily="var(--font-body)">
        {/* shortened: the longer sentence ran past x=700 and lost its last letter to the viewBox */}
        Cut on the angle, never bent
      </text>

      <text x={left[0] - 10} y="290" fill={inkMuted} fontSize="15" fontFamily="var(--font-body)">
        Both rakes and the eave on one continuous run
      </text>
    </svg>
  );
}
