/* INSTALL DAY, IN FOUR STAGES — the centerpiece of /how-it-works, and nowhere else.
 *
 * The page used to be five numbered steps in giant ghost numerals, three of which were the
 * consultation described again (it has its own page now), each one illustrated with the
 * same drawn house. So the page was a process diagram of a process the reader had already
 * read, twice.
 *
 * What it is instead: the SAME eight inches of fascia board, four times, from bare timber
 * to lit. That is the only thing install day actually consists of, it is the join every
 * argument about permanent lighting comes down to, and it is a sequence no other page on
 * the site can use — /services/permanent-roofline-lighting has one frame of this join,
 * finished. This has the four states either side of it.
 *
 * Drawing language is the icon set's, same as service-figures.tsx: solid bodies at two ink
 * weights on currentColor, and AMBER ONLY WHERE LIGHT COMES OUT — which here means the
 * last frame and nothing before it. Three quarters of install day happens with the system
 * dark, and the drawing should say so.
 */

const INK = "currentColor";

/* Everything is drawn on the same 0-100 x 0-72 grid, so the fascia sits at exactly the
 * same height in all four frames and the eye can read across them. */
function Roof() {
  return (
    <>
      {/* shingles and decking, untouched in every frame */}
      <path d="M4 8h92l-7 9H11Z" fill={INK} opacity=".2" />
      <path d="M4 8h92l-2 3H6Z" fill={INK} opacity=".34" />
      <path d="M11 17h78v6H11z" fill={INK} opacity=".27" />
    </>
  );
}

function Fascia({ opacity = 0.5 }: { opacity?: number }) {
  return <rect x="11" y="23" width="78" height="15" rx="1" fill={INK} opacity={opacity} />;
}

type Stage = {
  when: string;
  h: string;
  p: string;
  alt: string;
  art: React.ReactNode;
};

const stages: Stage[] = [
  {
    when: "First hour",
    h: "Bare fascia, measured again.",
    p: "Measured again off the ladder before a single hole is drilled.",
    alt: "Cross-section of a roof edge: shingles, decking and a bare fascia board with a dimension line under it",
    art: (
      <>
        <Roof />
        <Fascia opacity={0.42} />
        {/* the dimension line — this frame is about the measure */}
        <g fill={INK} opacity=".62">
          <rect x="11" y="45" width="78" height="1.4" rx="0.7" />
          <rect x="11" y="42" width="1.4" height="7" rx="0.7" />
          <rect x="87.6" y="42" width="1.4" height="7" rx="0.7" />
        </g>
        <g fill={INK} opacity=".3">
          <circle cx="24" cy="30.5" r="1" />
          <circle cx="50" cy="30.5" r="1" />
          <circle cx="76" cy="30.5" r="1" />
        </g>
      </>
    ),
  },
  {
    when: "Through the morning",
    h: "Channel up, one elevation at a time.",
    p: "Extruded aluminum, color matched to your trim, on a fixed screw pitch. Nothing through a shingle.",
    alt: "The same roof edge with the aluminum channel fastened under the fascia board on two screws",
    art: (
      <>
        <Roof />
        <Fascia />
        {/* screws, driven */}
        <circle cx="26" cy="30.5" r="1.8" fill={INK} opacity=".78" />
        <circle cx="50" cy="30.5" r="1.8" fill={INK} opacity=".78" />
        <circle cx="74" cy="30.5" r="1.8" fill={INK} opacity=".78" />
        {/* the channel, open, nothing in it yet */}
        <path d="M13 39h74v8a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z" fill={INK} opacity=".6" />
        <path d="M16 41h68v6H16z" fill={INK} opacity=".14" />
      </>
    ),
  },
  {
    when: "As we go, not after",
    h: "Every penetration sealed at the moment it is made.",
    p: "Sealant on the screw as it is driven, while the hole is clean and the board is dry.",
    alt: "The same roof edge with sealant at each screw and the conductor run inside the channel",
    art: (
      <>
        <Roof />
        <Fascia />
        {/* sealed screws — the collar is the point of this frame */}
        {[26, 50, 74].map((x) => (
          <g key={x}>
            <circle cx={x} cy="30.5" r="3.4" fill={INK} opacity=".22" />
            <circle cx={x} cy="30.5" r="1.8" fill={INK} opacity=".78" />
          </g>
        ))}
        <path d="M13 39h74v8a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z" fill={INK} opacity=".6" />
        {/* the conductor, inside the channel and nowhere else */}
        <path
          d="M17 44c9 0 9 2.6 18 2.6s9-2.6 18-2.6 9 2.6 18 2.6"
          fill="none"
          stroke={INK}
          strokeWidth="1.3"
          opacity=".4"
        />
      </>
    ),
  },
  {
    when: "At dusk, with you",
    h: "Diffuser on, and every scene walked.",
    p: "Diffuser clipped in, then the curb check and every scene walked with you.",
    alt: "The finished roof edge with the diffuser fitted, the diodes lit and light falling away below",
    art: (
      <>
        <Roof />
        <Fascia />
        {[26, 50, 74].map((x) => (
          <g key={x}>
            <circle cx={x} cy="30.5" r="3.4" fill={INK} opacity=".22" />
            <circle cx={x} cy="30.5" r="1.8" fill={INK} opacity=".78" />
          </g>
        ))}
        <path d="M13 39h74v8a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z" fill={INK} opacity=".6" />
        {/* diffuser */}
        <path d="M15 47h70v3a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3Z" fill={INK} opacity=".3" />
        {/* THE ONLY AMBER IN THE SEQUENCE */}
        <g className="text-accent" fill={INK}>
          {[20, 30, 40, 50, 60, 70, 80].map((x) => (
            <circle key={x} cx={x} cy="44" r="1.4" />
          ))}
        </g>
        {/* the light falling away, as ONE wash rather than a cone per diode. Separate cones
          * read as a row of teeth, and the whole point of the diffuser in this frame is
          * that the output stops being a row of anything. */}
        <path className="text-accent" fill={INK} opacity=".1" d="M15 53h70l13 19H2Z" />
      </>
    ),
  },
];

export function InstallDaySequence() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stages.map((s) => (
        <li
          key={s.when}
          className="flex flex-col overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
        >
          <div className="flex items-baseline justify-between gap-3 border-b border-on-dark/12 px-5 py-3.5">
            <p className="label flex items-center gap-3 text-on-dark">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              {s.when}
            </p>
          </div>

          {/* text-on-dark, because the drawing is built on currentColor: without it the
            * inherited body color is near-black and the figure renders black-on-night. */}
          <div className="text-on-dark px-5 py-5">
            <svg viewBox="0 0 100 72" className="w-full" role="img" aria-label={s.alt}>
              {s.art}
            </svg>
          </div>

          <div className="flex-1 border-t border-on-dark/12 px-5 py-5">
            <h3 className="font-display text-[1.05rem] font-bold leading-snug text-on-dark">{s.h}</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{s.p}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
