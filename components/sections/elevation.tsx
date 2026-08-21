/* A measured elevation of a Brytr install, shared by the hero, scene rail and inner pages.
 *
 * Drawn as a measured elevation — thin linework, siding courses, mullions, a dimension
 * line in linear feet, mono callouts — rather than as a filled illustration. It cannot be
 * mistaken for a bad render, and a labelled drawing of the actual assembly reads as
 * expertise. Real photography replaces it per slot via content/images.ts.
 *
 * THREE MASSINGS. The same house appearing on every page is what turns a defensible
 * drawing into filler, so each caller picks a variant: a two-story with a front gable,
 * a single-story ranch, and a two-story with a garage wing. Linear feet changes with it.
 */

/* `hex` is optional so a caller that just wants the default lit state does not have to
 * restate the hex, which is the only way an inline colour was reaching a component from
 * outside globals.css / sections.css. The fallback below is the single source of it. */
export type Lit = { hex?: string; label: string };
export type Massing = "gable" | "ranch" | "wing";

type Geo = {
  roof: string;          // main eave channel run
  second?: string;       // secondary run (gable or wing)
  body: string;          // main mass
  gable?: string;
  gableRoof?: string;
  windows: [number, number][];
  door: [number, number];
  chimney?: [number, number];
  feet: string;
  eaveY: number;
};

const GEO: Record<Massing, Geo> = {
  gable: {
    roof: "M56 150 320 44l264 106",
    second: "M218 228 320 170l104 58",
    body: "M74 150h492v212H74z",
    gable: "M236 226h168v136H236z",
    gableRoof: "M218 228 320 170l104 58",
    windows: [[112, 196], [160, 196], [468, 196], [516, 196], [112, 276], [160, 276], [468, 276], [516, 276]],
    door: [298, 298],
    chimney: [462, 86],
    feet: "244 LIN FT",
    eaveY: 150,
  },
  ranch: {
    roof: "M44 214 320 128l276 86",
    body: "M66 214h508v148H66z",
    windows: [[104, 250], [152, 250], [232, 250], [408, 250], [456, 250], [504, 250]],
    door: [300, 268],
    chimney: [140, 158],
    feet: "168 LIN FT",
    eaveY: 214,
  },
  wing: {
    roof: "M52 138 288 52l224 86",
    second: "M330 246 452 200l152 46",
    body: "M70 138h420v224H70z",
    gable: "M356 244h232v118H356z",
    gableRoof: "M330 246 452 200l152 46",
    windows: [[102, 184], [150, 184], [408, 186], [102, 268], [150, 268], [244, 184], [244, 268]],
    door: [290, 292],
    chimney: [196, 78],
    feet: "310 LIN FT",
    eaveY: 138,
  },
};

export function Elevation({
  lit,
  night,
  massing = "gable",
  className,
}: {
  lit?: Lit;
  night?: boolean;
  massing?: Massing;
  className?: string;
}) {
  const glow = lit?.hex ?? "#f5c518";
  const g = GEO[massing];
  const line = night ? "#4c5866" : "#8d8574";
  const faint = night ? "#2a3542" : "#c9c1b0";
  const paper = night ? "#101823" : "#efeae0";
  const mass = night ? "#18212c" : "#e4ded0";
  const ink = night ? "#a9b4c0" : "#5f5949";
  const runs = [g.roof, g.second].filter(Boolean) as string[];
  const uid = `${massing}-${glow.slice(1)}`;

  return (
    <svg viewBox="0 0 640 400" className={className} role="img"
      aria-label={night
        ? `Measured elevation of a home with the roofline channel lit in ${lit?.label ?? "warm white"}`
        : "Measured elevation of a home in daylight, showing the lighting channel reading as trim"}>
      <rect width="640" height="400" fill={paper} />

      {night && (
        <>
          <defs>
            <linearGradient id={`w-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={glow} stopOpacity="0.26" />
              <stop offset="0.75" stopColor={glow} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={g.body} fill={`url(#w-${uid})`} />
        </>
      )}

      {/* grade line */}
      <line x1="20" y1="362" x2="620" y2="362" stroke={line} strokeWidth="1.5" />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={22 + i * 20} y1="362" x2={14 + i * 20} y2="372" stroke={faint} strokeWidth="1" />
      ))}

      {/* main mass + siding courses */}
      <path d={g.body} fill={mass} stroke={line} strokeWidth="1.5" />
      {Array.from({ length: 11 }, (_, i) => {
        const y = g.eaveY + 18 + i * 16;
        return y < 358 ? <line key={i} x1="76" y1={y} x2="564" y2={y} stroke={faint} strokeWidth="0.75" /> : null;
      })}

      {/* roof plane + fascia band */}
      <path d={g.roof} fill="none" stroke={line} strokeWidth="1.5" />
      <path d={`M${g.roof.slice(1).split(" ")[0]} ${g.eaveY}`} fill="none" stroke={line} strokeWidth="0" />

      {/* front gable or garage wing */}
      {g.gable && (
        <>
          <path d={g.gable} fill={night ? "#1d2836" : "#e9e3d6"} stroke={line} strokeWidth="1.5" />
          {g.gableRoof && <path d={g.gableRoof} fill="none" stroke={line} strokeWidth="1.5" />}
        </>
      )}

      {/* windows with mullions. Interior light is a warm pane, never a cone thrown
          outward — a window does not read as a spotlight in elevation. */}
      {g.windows.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="32" height="46" fill={night ? "#f0d59a" : "#aeb7c0"} opacity={night ? 0.5 : 0.42} />
          <rect x={x} y={y} width="32" height="46" fill="none" stroke={line} strokeWidth="1.25" />
          <line x1={x + 16} y1={y} x2={x + 16} y2={y + 46} stroke={line} strokeWidth="0.75" />
          <line x1={x} y1={y + 23} x2={x + 32} y2={y + 23} stroke={line} strokeWidth="0.75" />
        </g>
      ))}
      <rect x={g.door[0]} y={g.door[1]} width="44" height={362 - g.door[1]} fill={night ? "#243040" : "#cfc7b5"} stroke={line} strokeWidth="1.25" />
      <rect x={g.door[0] + 8} y={g.door[1] + 10} width="28" height="22" fill={night ? "#f0d59a" : "#aeb7c0"} opacity={night ? 0.45 : 0.35} stroke={line} strokeWidth="0.75" />

      {g.chimney && (
        <>
          <rect x={g.chimney[0]} y={g.chimney[1]} width="34" height="46" fill={night ? "#1a222d" : "#ddd6c6"} stroke={line} strokeWidth="1.25" />
          <rect x={g.chimney[0] - 4} y={g.chimney[1] - 6} width="42" height="8" fill={night ? "#232d3a" : "#cec6b4"} stroke={line} strokeWidth="1" />
        </>
      )}

      {/* ── THE CHANNEL ──
          A continuous line of light, not a row of dots. Dots read as a string of
          Christmas bulbs, which is the exact thing this product is not. */}
      {runs.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={night ? "#3b4653" : "#9c9483"} strokeWidth="6" strokeLinecap="round" />
          <path d={d} fill="none" stroke={night ? "#4d596a" : "#b3ab99"} strokeWidth="1" strokeLinecap="round" />
          {night && (
            <>
              <path d={d} fill="none" stroke={glow} strokeWidth="12" strokeLinecap="round" opacity="0.15" />
              <path d={d} fill="none" stroke={glow} strokeWidth="3.2" strokeLinecap="round" opacity="0.95" />
            </>
          )}
        </g>
      ))}

      {/* landscape uplights: wash up the wall, which is how an uplight actually reads */}
      {[110, 540].map((x) => (
        <g key={x}>
          <line x1={x} y1="362" x2={x} y2="352" stroke={line} strokeWidth="2" />
          {night && <path d={`M${x - 4} 352 ${x - 26} ${g.eaveY + 40} h60 z`} fill={glow} opacity="0.1" />}
        </g>
      ))}

      {/* dimension line, clear of the hatching, label in a knocked-out gap */}
      <g>
        <line x1="56" y1="392" x2="584" y2="392" stroke={ink} strokeWidth="1" />
        <line x1="56" y1="386" x2="56" y2="398" stroke={ink} strokeWidth="1" />
        <line x1="584" y1="386" x2="584" y2="398" stroke={ink} strokeWidth="1" />
        <rect x="266" y="382" width="108" height="20" fill={paper} />
        <text x="320" y="397" textAnchor="middle" fill={ink} fontSize="12.5" fontFamily="var(--font-utility)" letterSpacing="0.06em">
          {g.feet}
        </text>
      </g>

      {/* state callout. Leader stops short of the text, and the text sits in a
          knocked-out plate so no linework strikes through it. */}
      <g>
        <circle cx={night ? 470 : 178} cy={g.eaveY - 24} r="3" fill={night ? glow : ink} />
        <line
          x1={night ? 470 : 178} y1={g.eaveY - 24}
          x2={night ? 512 : 140} y2={g.eaveY - 52}
          stroke={night ? glow : ink} strokeWidth="1" opacity="0.75"
        />
        <rect x={night ? 500 : 26} y={g.eaveY - 82} width="118" height="34" fill={paper} opacity="0.92" />
        <text x={night ? 614 : 30} y={g.eaveY - 66} textAnchor={night ? "end" : "start"}
          fill={night ? glow : ink} fontSize="12" fontFamily="var(--font-utility)" letterSpacing="0.06em">
          {night ? "CHANNEL LIT" : "CHANNEL"}
        </text>
        {(() => {
          const label = (night ? (lit?.label ?? "warm white") : "reads as trim").toUpperCase();
          /* shrink to fit the 118px plate rather than truncating a brand name */
          const size = label.length > 18 ? 8.5 : label.length > 14 ? 9.8 : 11;
          return (
            <text x={night ? 614 : 30} y={g.eaveY - 52} textAnchor={night ? "end" : "start"}
              fill={ink} fontSize={size} fontFamily="var(--font-utility)" letterSpacing="0.02em">
              {label}
            </text>
          );
        })()}
      </g>
    </svg>
  );
}
