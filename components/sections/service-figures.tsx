import Image from "next/image";
import { sceneImages } from "@/content/images";
import type { FigureKey } from "@/content/service-detail";

/* SERVICE PAGE CENTERPIECES — one per service, no two alike.
 *
 * One template generates eleven service pages. Before this, all eleven carried the same
 * drawn elevation or the same photograph in the same slot, which is how eleven pages end
 * up being one page with the nouns swapped. Each service now has a figure that only makes
 * sense on that service: the roofline page gets the eave in cross-section, the soffit page
 * gets beam angle against overhang depth, the hardscape page gets a wall in section, the
 * Christmas page gets the year as a calendar, the gameday page gets Saturday next to
 * Sunday in real photographs.
 *
 * Drawing language, same as the icon set: solid bodies at two ink weights, and AMBER ONLY
 * WHERE LIGHT COMES OUT. Everything is drawn on a 0–100 grid in a fixed aspect so the
 * figures scale with the column instead of being sized in pixels.
 */

const INK = "currentColor";

function Frame({
  label, caption, children, tall,
}: { label: string; caption: string; children: React.ReactNode; tall?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
        <p className="label flex items-center gap-3 text-on-dark">
          <span className="block h-4 w-1 bg-accent" aria-hidden />
          {label}
        </p>
        <p className="text-sm text-on-dark-muted">Drawn to what we actually install</p>
      </div>
      {/* text-on-dark, because every drawing below is built on currentColor: without it the
        * inherited body color is near-black and the whole figure renders black-on-night.
        * The two ink weights are opacities of THIS color. */}
      <div className={`text-on-dark ${tall ? "py-7" : "py-6"} px-6`}>{children}</div>
      <figcaption className="border-t border-on-dark/12 px-6 py-4 text-sm text-on-dark-muted">{caption}</figcaption>
    </figure>
  );
}

/** shared: a row of diodes along a line */
function Diodes({ y, x0, x1, n, r = 1.1, dim }: { y: number; x0: number; x1: number; n: number; r?: number; dim?: number }) {
  const step = (x1 - x0) / Math.max(1, n - 1);
  return (
    <g className="text-accent" fill={INK} opacity={dim ?? 1}>
      {Array.from({ length: n }, (_, i) => <circle key={i} cx={x0 + i * step} cy={y} r={r} />)}
    </g>
  );
}

/* ── 1. WHOLE HOME: the zones ── */
const zoneRows: [string, string, string][] = [
  ["Front elevation", "Roofline and gables", "Warm white, most nights"],
  ["Side elevations", "Eaves only", "Off unless you want them"],
  ["Landscape", "Trees, beds and walks", "Warm white, dusk to eleven"],
  ["Structures", "Pergola, patio, hardscape", "Dimmed for dinner"],
];

function ZonesFigure() {
  return (
    <Frame
      label="One property, four switches"
      caption="Zones are decided on the walk-around and wired that way, which is why the back of the house can stay dark while the front is lit."
      tall
    >
      <div className="grid gap-7 lg:grid-cols-[52fr_48fr] lg:items-center">
        <svg viewBox="0 0 100 62" className="w-full" role="img" aria-label="An elevation with four separately switched lighting zones">
          {/* house */}
          <path d="M14 26 50 8l36 18v28H14Z" fill={INK} opacity=".2" />
          <path d="M14 26 50 8l36 18-2 3-34-17-34 17-2-3Z" fill={INK} opacity=".5" />
          <rect x="22" y="30" width="12" height="10" fill={INK} opacity=".28" />
          <rect x="66" y="30" width="12" height="10" fill={INK} opacity=".28" />
          <rect x="44" y="34" width="12" height="20" fill={INK} opacity=".33" />
          {/* zone 1: front roofline */}
          <Diodes y={25.4} x0={16} x1={84} n={16} />
          {/* zone 2: side eave, banked */}
          <Diodes y={30} x0={6} x1={13} n={3} dim={0.28} />
          {/* zone 3: landscape */}
          <Diodes y={56} x0={20} x1={80} n={7} r={1.3} />
          {/* zone 4: structure — a pergola off to the side */}
          <path d="M88 34h10v1.6H88zM89 36h1.2v18H89zM96 36h1.2v18H96z" fill={INK} opacity=".5" />
          <Diodes y={35} x0={89.5} x1={96.5} n={3} />
          <path d="M2 55h96v1.4H2z" fill={INK} opacity=".3" />
        </svg>

        <dl className="divide-y divide-on-dark/10 border-y border-on-dark/10">
          {zoneRows.map(([z, what, setting]) => (
            <div key={z} className="py-3">
              <dt className="font-display text-[0.95rem] font-bold text-on-dark">{z}</dt>
              <dd className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-4 text-sm text-on-dark-muted">
                <span>{what}</span>
                <span className="u text-accent">{setting}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  );
}

/* ── 2. CHRISTMAS: the year ── */
const months: [string, string, string][] = [
  ["Jan", "warm", "Warm white"], ["Feb", "warm", "Warm white"], ["Mar", "green", "St Patrick's"],
  ["Apr", "warm", "Warm white"], ["May", "warm", "Warm white"], ["Jun", "warm", "Warm white"],
  ["Jul", "rwb", "Fourth"], ["Aug", "warm", "Warm white"], ["Sep", "scarlet", "Game days"],
  ["Oct", "violet", "Halloween"], ["Nov", "redgreen", "Christmas from Thanksgiving"], ["Dec", "redgreen", "Christmas"],
];

function CalendarFigure() {
  return (
    <Frame
      label="A year on one run"
      caption="Nothing on this strip involves a ladder. Every block is a saved scene with a date range, and the run underneath it is the same run all twelve months."
    >
      <ol className="grid grid-cols-6 gap-2 sm:grid-cols-12">
        {months.map(([m, tone, label]) => (
          <li key={m} className="min-w-0">
            <div className={`scene-bar scene-bar--${tone}`} aria-hidden />
            <p className="mt-2 font-display text-xs font-bold text-on-dark">{m}</p>
            <p className="mt-0.5 text-2xs leading-tight text-on-dark-muted">{label}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-on-dark/10 pt-4 text-sm text-on-dark-muted">
        Eleven of the twelve are the everyday setting or a scene that runs itself. December is the
        one people buy it for.
      </p>
    </Frame>
  );
}

/* ── 3. ROOFLINE: the eave in section ── */
function EaveFigure() {
  return (
    <Frame
      label="The eave, in section"
      caption="This is the join every argument about permanent lighting comes down to: the channel is fastened into the fascia board, and the shingles are never touched."
      tall
    >
      <div className="grid gap-7 lg:grid-cols-[56fr_44fr] lg:items-center">
        <svg viewBox="0 0 100 66" className="w-full" role="img" aria-label="Cross-section of a roof edge showing shingles, decking, fascia board and the lighting channel">
          {/* roof deck and shingles */}
          <path d="M6 10h80l-6 8H12Z" fill={INK} opacity=".22" />
          <path d="M6 10h80l-2 3H8Z" fill={INK} opacity=".38" />
          <path d="M12 18h68v5H12z" fill={INK} opacity=".3" />
          {/* fascia board */}
          <rect x="12" y="23" width="68" height="14" rx="1" fill={INK} opacity=".5" />
          {/* screws */}
          <circle cx="26" cy="30" r="1.8" fill={INK} opacity=".75" />
          <circle cx="66" cy="30" r="1.8" fill={INK} opacity=".75" />
          {/* channel */}
          <path d="M14 38h64v7a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4Z" fill={INK} opacity=".62" />
          {/* diffuser */}
          <path d="M16 46h60v2.5a2.5 2.5 0 0 1-2.5 2.5h-55A2.5 2.5 0 0 1 16 48.5Z" fill={INK} opacity=".28" />
          {/* the diodes, and the light leaving */}
          <Diodes y={43} x0={20} x1={72} n={11} r={1.3} />
          <g className="text-accent" fill={INK} opacity=".14">
            {[20, 33, 46, 59, 72].map((x) => (
              <path key={x} d={`M${x - 3} 51h6l5 14h-16Z`} />
            ))}
          </g>
          {/* the conductor, inside */}
          <path d="M18 41c8 0 8 2.5 16 2.5s8-2.5 16-2.5 8 2.5 16 2.5" fill="none" stroke={INK} strokeWidth="1.2" opacity=".3" />
        </svg>

        <ol className="divide-y divide-on-dark/10 border-y border-on-dark/10">
          {[
            ["Shingles", "Untouched. Nothing is fastened through a roof covering."],
            ["Fascia board", "The structural fixing. Every penetration sealed as it is made."],
            ["Aluminum channel", "Extruded, color matched, mitered at each transition."],
            ["Diffuser", "Frosted, facing down, so you see light rather than dots."],
            ["Conductor", "Inside the channel. Nothing crosses a soffit or a downspout."],
          ].map(([k, v]) => (
            <li key={k} className="py-3">
              <p className="font-display text-[0.95rem] font-bold text-on-dark">{k}</p>
              <p className="mt-0.5 text-sm text-on-dark-muted">{v}</p>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

/* ── 4. SOFFIT: beam angle against overhang depth ── */
function BeamFigure() {
  const cases: [string, string, number, number][] = [
    ["Shallow overhang", "Narrow beam, aimed straight down", 22, 8],
    ["Standard overhang", "Medium beam, slight wall wash", 50, 14],
    ["Deep overhang", "Wide beam, full wall wash", 78, 20],
  ];
  return (
    <Frame
      label="Beam angle against overhang depth"
      caption="A 16 inch soffit and a 30 inch soffit are not the same fixture. We measure the overhang before choosing one, which is why soffit lighting is quoted separately from roofline."
    >
      <svg viewBox="0 0 100 52" className="w-full" role="img" aria-label="Three overhang depths, each with the beam spread that suits it">
        {cases.map(([, , x, w]) => (
          <g key={x}>
            <rect x={x - w / 2} y="8" width={w} height="4" fill={INK} opacity=".5" />
            <rect x={x - 2.5} y="12" width="5" height="2.4" fill={INK} opacity=".72" />
            <path className="text-accent" d={`M${x - 2.5} 14.4h5l${w * 0.55} 30h-${w * 1.1 + 5}Z`} fill={INK} opacity=".2" />
            <Diodes y={13.2} x0={x - 1} x1={x + 1} n={2} r={0.9} />
          </g>
        ))}
        <path d="M2 44h96v2H2z" fill={INK} opacity=".3" />
      </svg>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        {cases.map(([h, p]) => (
          <div key={h}>
            <dt className="font-display text-[0.95rem] font-bold text-on-dark">{h}</dt>
            <dd className="mt-1 text-sm text-on-dark-muted">{p}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

/* ── 5. HARDSCAPE: the wall in section ── */
function WallFigure() {
  return (
    <Frame
      label="A seat wall, in section"
      caption="The fixture sits under the cap and aims down the face. Nothing is at seated eye height, which is the difference between hardscape lighting and glare."
    >
      <svg viewBox="0 0 100 58" className="w-full" role="img" aria-label="Section through a seat wall showing the cap, the under-cap washer and the light on the stone">
        {/* cap */}
        <rect x="18" y="12" width="64" height="5" rx="1" fill={INK} opacity=".55" />
        {/* fixture under the cap */}
        <rect x="26" y="17" width="48" height="3" rx="1.2" fill={INK} opacity=".7" />
        <Diodes y={18.5} x0={30} x1={70} n={9} r={1} />
        {/* the wash on the stone */}
        <path className="text-accent" d="M28 20h44l4 18H24Z" fill={INK} opacity=".15" />
        {/* courses */}
        <rect x="20" y="22" width="60" height="8" fill={INK} opacity=".38" />
        <rect x="20" y="31" width="60" height="8" fill={INK} opacity=".33" />
        <rect x="20" y="40" width="60" height="8" fill={INK} opacity=".28" />
        <path d="M40 22v26M60 22v26M30 31v17M50 31v17M70 31v17" stroke={INK} strokeWidth=".6" opacity=".3" />
        {/* step and its light */}
        <rect x="80" y="40" width="18" height="4" fill={INK} opacity=".45" />
        <rect x="86" y="36" width="6" height="2" rx="1" fill={INK} opacity=".7" />
        <Diodes y={37} x0={87.5} x1={90.5} n={2} r={0.9} />
        <path className="text-accent" d="M86 38h6l3 10H83Z" fill={INK} opacity=".12" />
        <path d="M2 48h96v2H2z" fill={INK} opacity=".3" />
      </svg>
    </Frame>
  );
}

/* ── 6. LANDSCAPE: what each fixture is for ── */
function FixturesFigure() {
  const kinds: [string, string, React.ReactNode][] = [
    ["Uplight", "Two or three per mature tree, aimed up the trunk into the canopy.",
      <g key="u">
        <path d="M50 6c10 6 14 16 12 26H38C36 22 40 12 50 6Z" fill={INK} opacity=".22" />
        <rect x="47" y="32" width="6" height="26" fill={INK} opacity=".5" />
        <rect x="38" y="58" width="24" height="4" rx="1" fill={INK} opacity=".55" />
        <path className="text-accent" d="M44 58h12l8-26H36Z" fill={INK} opacity=".16" />
        <Diodes y={57} x0={46} x1={54} n={3} r={1.3} />
      </g>],
    ["Path light", "Spaced to light the walk, not to line it with runway markers.",
      <g key="p">
        <rect x="47" y="26" width="5" height="32" rx="1" fill={INK} opacity=".55" />
        <path d="M36 18h28l-5 8H41Z" fill={INK} opacity=".55" />
        <path className="text-accent" d="M40 26h20l10 32H30Z" fill={INK} opacity=".16" />
        <Diodes y={25} x0={44} x1={56} n={3} r={1.2} />
      </g>],
    ["Wall wash", "Low and wide behind planting, so the light lands on the house.",
      <g key="w">
        <rect x="8" y="8" width="10" height="50" fill={INK} opacity=".3" />
        <rect x="60" y="50" width="16" height="6" rx="2" fill={INK} opacity=".6" />
        <path className="text-accent" d="M60 50 18 14v42Z" fill={INK} opacity=".14" />
        <Diodes y={52} x0={63} x1={73} n={3} r={1.1} />
      </g>],
    ["Well light", "Flush in the bed or the walk, for a tree you do not want a fixture beside.",
      <g key="l">
        <rect x="2" y="52" width="96" height="6" fill={INK} opacity=".4" />
        <rect x="42" y="48" width="16" height="6" rx="1" fill={INK} opacity=".65" />
        <path className="text-accent" d="M44 48h12l14 -34H30Z" fill={INK} opacity=".13" />
        <Diodes y={50} x0={46} x1={54} n={3} r={1.1} />
      </g>],
  ];
  return (
    <Frame
      label="Four fixtures, four jobs"
      caption="A landscape quote is a list of decisions about which of these goes where, and how many. It is not a package."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kinds.map(([h, p, art]) => (
          <div key={h}>
            <div className="rounded-md bg-raise p-4 ring-1 ring-on-dark/10">
              <svg viewBox="0 0 100 66" className="w-full" role="img" aria-label={`${h}: ${p}`}>{art}</svg>
            </div>
            <p className="mt-3 font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
            <p className="mt-1 text-sm text-on-dark-muted">{p}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── 7. PATIO AND PERGOLA: where the runs go ── */
function PergolaFigure() {
  return (
    <Frame
      label="Where a run goes on a structure"
      caption="On a pergola the light comes off the beam faces and down onto the table. Bistro spans are tensioned to a post, never to a gutter."
    >
      <svg viewBox="0 0 100 56" className="w-full" role="img" aria-label="A pergola elevation showing the beam run, the rafter shadows and a bistro span">
        {/* posts and beam */}
        <rect x="8" y="10" width="76" height="4" fill={INK} opacity=".55" />
        <rect x="10" y="14" width="5" height="34" fill={INK} opacity=".5" />
        <rect x="77" y="14" width="5" height="34" fill={INK} opacity=".5" />
        {/* rafters */}
        {[22, 32, 42, 52, 62, 72].map((x) => <rect key={x} x={x} y="14" width="3" height="8" fill={INK} opacity=".3" />)}
        {/* the run on the beam face, and the light on the table */}
        <Diodes y={12} x0={12} x1={80} n={14} r={1.1} />
        <path className="text-accent" d="M14 14h64l10 24H4Z" fill={INK} opacity=".16" />
        {/* bistro span to a post */}
        <path className="text-accent" d="M84 16c6 4 10 8 12 14" fill="none" stroke={INK} strokeWidth="1" opacity=".45" />
        <g className="text-accent" fill={INK}>
          <circle cx="87" cy="19" r="1.6" /><circle cx="91" cy="23" r="1.6" /><circle cx="94.5" cy="28" r="1.6" />
        </g>
        {/* table */}
        <rect x="34" y="36" width="30" height="3" rx="1" fill={INK} opacity=".45" />
        <rect x="38" y="39" width="3" height="9" fill={INK} opacity=".35" />
        <rect x="57" y="39" width="3" height="9" fill={INK} opacity=".35" />
        <path d="M2 48h96v2H2z" fill={INK} opacity=".3" />
      </svg>
    </Frame>
  );
}

/* ── 8. HOLIDAY SCENES: the library, in real photographs ── */
function ScenesFigure() {
  const shots = Object.entries(sceneImages).filter(([, v]) => v.src).slice(0, 8);
  return (
    <Frame
      label="The library, photographed"
      caption="Eight of the scenes on this list are the same two Omaha houses on different nights. Nothing here is a render and nothing was recolored."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {shots.map(([name, slot]) => (
          <li key={name} className="overflow-hidden rounded-md bg-raise ring-1 ring-on-dark/10">
            <span className="relative block aspect-video">
              <Image src={slot.src!} alt={slot.alt} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
            </span>
            <span className="block px-3 py-2.5 font-display text-xs font-bold text-on-dark">{name}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ── 9. GAMEDAY: Saturday and the rest of the week ── */
function GamedayFigure() {
  const pair: [string, string, string, string][] = [
    ["Saturday", "/img/scene-husker-red.jpg", "An Omaha ranch home with its roofline in scarlet for a Nebraska game day", "Scarlet, saved as its own scene"],
    ["Sunday", "/img/scene-warm-white.jpg", "The same kind of Omaha elevation back on everyday warm white", "Back to warm white, on schedule"],
  ];
  return (
    <Frame
      label="One tap apart"
      caption="Both of these are saved scenes on the same hardware. The house changes on a schedule; nobody goes outside."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pair.map(([day, src, alt, note]) => (
          <figure key={day} className="overflow-hidden rounded-md bg-raise ring-1 ring-on-dark/10">
            <span className="relative block aspect-video">
              <Image src={src} alt={alt} fill sizes="(min-width:640px) 45vw, 100vw" className="object-cover" />
            </span>
            <figcaption className="px-4 py-3">
              <p className="label text-accent">{day}</p>
              <p className="mt-1 text-sm text-on-dark-muted">{note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Frame>
  );
}

/* ── 10. COMMERCIAL: the parapet ── */
function ParapetFigure() {
  return (
    <Frame
      label="A storefront, in elevation"
      caption="On a building the run follows the parapet and the canopy edge, and the take-off comes off the building's own elevations rather than a tape measure and an estimate."
    >
      <svg viewBox="0 0 100 52" className="w-full" role="img" aria-label="A storefront elevation with the lit parapet, canopy and glazing">
        {/* parapet */}
        <rect x="4" y="8" width="92" height="6" fill={INK} opacity=".5" />
        <Diodes y={16} x0={8} x1={92} n={22} r={1} />
        {/* facade */}
        <rect x="6" y="18" width="88" height="28" fill={INK} opacity=".28" />
        {/* canopy */}
        <rect x="16" y="26" width="68" height="3" rx="1" fill={INK} opacity=".45" />
        <Diodes y={30.5} x0={20} x1={80} n={14} r={0.9} dim={0.75} />
        {/* glazing and entry */}
        <rect x="12" y="33" width="30" height="13" fill={INK} opacity=".18" />
        <rect x="58" y="33" width="30" height="13" fill={INK} opacity=".18" />
        <rect x="45" y="33" width="10" height="13" fill={INK} opacity=".33" />
        <path d="M2 46h96v2H2z" fill={INK} opacity=".3" />
      </svg>
    </Frame>
  );
}

/* ── 11. REPAIRS: what a dead section actually is ── */
function TakeoverFigure() {
  return (
    <Frame
      label="What a dead section usually is"
      caption="A run that has gone dark past a point is almost never a whole strip. It is one termination, one splice or one supply — which is why we diagnose before we quote."
      tall
    >
      <svg viewBox="0 0 100 26" className="w-full" role="img" aria-label="A channel run lit at one end and dark past a failed termination">
        <path d="M4 8h92v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill={INK} opacity=".6" />
        <Diodes y={13} x0={9} x1={54} n={9} r={1.4} />
        <g fill={INK} opacity=".22">
          {[60, 66, 72, 78, 84, 90].map((x) => <circle key={x} cx={x} cy="13" r="1.4" />)}
        </g>
        <path d="M57 4v18" stroke={INK} strokeWidth="1.2" opacity=".55" strokeDasharray="2 2" />
        <path className="text-accent" d="M55.4 2.4h3.2v3.2h-3.2z" fill={INK} />
      </svg>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ["A termination that was taped", "Water tracks in, corrodes the joint, and everything past it goes out."],
          ["A failed power supply", "One leg of a long run drops. The strip is usually fine."],
          ["A controller nobody can source", "Common on installs from companies that have since stopped answering."],
          ["Channel fastened through shingles", "The reason some of these calls start as a roof leak rather than a lighting fault."],
        ].map(([h, p]) => (
          <li key={h} className="border-t border-on-dark/10 pt-3">
            <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
            <p className="mt-1 text-sm text-on-dark-muted">{p}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const figures: Record<FigureKey, () => React.ReactElement> = {
  zones: ZonesFigure,
  calendar: CalendarFigure,
  eave: EaveFigure,
  beam: BeamFigure,
  wall: WallFigure,
  fixtures: FixturesFigure,
  pergola: PergolaFigure,
  scenes: ScenesFigure,
  gameday: GamedayFigure,
  parapet: ParapetFigure,
  takeover: TakeoverFigure,
};

export function ServiceFigure({ figure }: { figure: FigureKey }) {
  const F = figures[figure];
  return <F />;
}
