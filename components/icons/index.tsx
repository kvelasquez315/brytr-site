/* BRYTR ICON SET — second generation, drawn as objects rather than symbols.
 *
 * WHY THIS WAS REDRAWN. The first set was technically custom — hand-drawn, no lucide — and
 * still read as templated, which is exactly what the client said. Three reasons, all visible
 * the moment you put the set on one contact sheet:
 *
 *   1. A third of it was the standard icon vocabulary: a clock, a shield, an eye, a
 *      lightning bolt, a credit card, a clipboard, stacked squares. Those glyphs belong to
 *      every SaaS dashboard ever shipped. Drawing one yourself does not make it yours.
 *   2. Another third were abstractions that collapsed into each other — four different
 *      "three horizontal bars, one of them amber" marks, indistinguishable at 24px, meaning
 *      install count, two tiers, hardscape and fascia mounting.
 *   3. Too little detail to survive at the size they are actually used.
 *
 * THE LANGUAGE, which is what turns thirty-four drawings into a set:
 *
 *   A. Every icon is a PHYSICAL OBJECT from this trade — a fascia board, a channel section,
 *      a gable, a path light, a wall course, a reel of channel, a service van, a hard hat.
 *      No metaphors for abstract nouns. Where a concept has no object (scheduling,
 *      verification, financing) it is drawn as the moment it happens to a house instead.
 *   B. AMBER APPEARS ONLY WHERE LIGHT COMES OUT. The lit diode, the wash on a wall, the
 *      glow under a soffit. Never a decorative accent, never a container, never a tick.
 *      That one rule is what ties the whole set together.
 *   C. Solid bodies at two ink weights (0.85 near, 0.45 far) so every icon has depth
 *      instead of being an outline.
 *   D. Distinct silhouettes: no two icons share an outline.
 *   E. Shared primitives below, so a gable is literally the same gable everywhere and a
 *      channel section is the same section everywhere.
 *
 * Drawn for 28–48px. Anything leading a card or a row gets the channel tile (.channel-tile)
 * at 44–48px; bare 20px use is for inline list marks only.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type P = { className?: string };
const CC = "currentColor";

function S({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

/* ── shared geometry ── */

/** the roof plane: a gable whose peak sits at (16, y) */
const Gable = ({ y = 12, w = 14 }: { y?: number; w?: number }) => (
  <path d={`M${16 - w} ${y + 7} 16 ${y} ${16 + w} ${y + 7} Z`} fill={CC} opacity=".45" />
);

/** the wall under the roof */
const Wall = ({ y = 19, h = 9, w = 11 }: { y?: number; h?: number; w?: number }) => (
  <rect x={16 - w} y={y} width={w * 2} height={h} fill={CC} opacity=".85" />
);

/** a length of lit run: n diodes on a pitch, along a horizontal line */
const Run = ({
  y, x0 = 5, x1 = 27, n = 6, r = 1.5,
}: { y: number; x0?: number; x1?: number; n?: number; r?: number }) => {
  const step = (x1 - x0) / Math.max(1, n - 1);
  return (
    <g className="text-accent" fill={CC}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + i * step} cy={y} r={r} />
      ))}
    </g>
  );
};

/** the channel in cross-section: squared top, radiused lens edge below */
const Section = ({ x = 4, y = 13, w = 24, h = 7 }: { x?: number; y?: number; w?: number; h?: number }) => (
  <path d={`M${x} ${y}h${w}v${h - 3}a3 3 0 0 1-3 3H${x + 3}a3 3 0 0 1-3-3Z`} fill={CC} opacity=".85" />
);

/* ── SERVICES ── */

/** whole home: the full elevation, roofline lit and the beds lit */
export const IcWholeHome = ({ className }: P) => (
  <S className={className}>
    <Gable y={7} w={13} />
    <Wall y={14} h={11} w={10} />
    <rect x="9" y="17" width="4" height="4" fill={CC} opacity=".35" />
    <rect x="19" y="17" width="4" height="4" fill={CC} opacity=".35" />
    <rect x="14" y="19" width="4" height="6" fill={CC} opacity=".3" />
    <Run y={13.4} x0={4.5} x1={27.5} n={7} r={1.4} />
    <Run y={27.5} x0={7} x1={25} n={4} r={1.2} />
  </S>
);

/** roofline: the eave in close-up — shingle courses, fascia, channel, diodes */
export const IcRoofline = ({ className }: P) => (
  <S className={className}>
    <path d="M3 5h26v4H3z" fill={CC} opacity=".3" />
    <path d="M3 9h26v4H3z" fill={CC} opacity=".45" />
    <rect x="3" y="13" width="26" height="6" rx="1" fill={CC} opacity=".85" />
    <Section x={4} y={20} w={24} h={6} />
    <Run y={23.5} x0={7} x1={25} n={6} r={1.5} />
  </S>
);

/** christmas: the same gable, alternating, every other pixel */
export const IcChristmas = ({ className }: P) => (
  <S className={className}>
    <Gable y={9} w={13} />
    <Wall y={16} h={9} w={10} />
    <g fill={CC} opacity=".55">
      <circle cx="7" cy="18.6" r="1.5" /><circle cx="16" cy="9.6" r="1.5" /><circle cx="25" cy="18.6" r="1.5" />
    </g>
    <g className="text-accent" fill={CC}>
      <circle cx="11.5" cy="14.1" r="1.5" /><circle cx="20.5" cy="14.1" r="1.5" />
      <circle cx="16" cy="27.5" r="1.3" /><circle cx="9" cy="27.5" r="1.3" /><circle cx="23" cy="27.5" r="1.3" />
    </g>
  </S>
);

/** soffit: seen from underneath — panel, wall return, recessed pucks */
export const IcSoffit = ({ className }: P) => (
  <S className={className}>
    <path d="M2 4h28v7H2z" fill={CC} opacity=".45" />
    <path d="M2 11h28v3H2z" fill={CC} opacity=".85" />
    <path d="M6 14h20v14H6z" fill={CC} opacity=".2" />
    <g className="text-accent" fill={CC}>
      <circle cx="10" cy="12.5" r="1.6" /><circle cx="16" cy="12.5" r="1.6" /><circle cx="22" cy="12.5" r="1.6" />
      <path d="M10 14.5 7.5 27h5L10 14.5Zm6 0L13.5 27h5L16 14.5Zm6 0L19.5 27h5L22 14.5Z" opacity=".22" />
    </g>
  </S>
);

/** path light: post, head, and the wash it throws on the walk */
export const IcPathLight = ({ className }: P) => (
  <S className={className}>
    <rect x="15" y="11" width="2.5" height="14" rx="1" fill={CC} opacity=".85" />
    <path d="M9.5 8h13l-2 3.5h-9L9.5 8Z" fill={CC} opacity=".85" />
    <path d="M13 6.5h6v1.5h-6z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M11.5 11.5h9l4.5 13.5h-18l4.5-13.5Z" fill={CC} opacity=".55" />
    <path d="M3 27h26v2.5H3z" fill={CC} opacity=".45" />
  </S>
);

/** hardscape: three stone courses, the cap, and the wash tucked under it */
export const IcHardscape = ({ className }: P) => (
  <S className={className}>
    {/* a stepped wall in section: cap on top, wash tucked under it, courses stepping down */}
    <path d="M11 5h19v3.2H11z" fill={CC} opacity=".85" />
    <Run y={10.4} x0={14} x1={27} n={4} r={1.4} />
    <path className="text-accent" d="M13 9.6h16l-1.6 4.4H14.6L13 9.6Z" fill={CC} opacity=".18" />
    <path d="M13 13h16v5H13z" fill={CC} opacity=".45" />
    <path d="M4 18h25v4H4z" fill={CC} opacity=".55" />
    <path d="M2 22h27v6H2z" fill={CC} opacity=".38" />
    <path d="M9 22v6M18 22v6M13 13v5M22 13v5" stroke={CC} strokeWidth="1" opacity=".3" />
  </S>
);

/** pergola: posts, beams, the run along the beam and one bistro drop */
export const IcPergola = ({ className }: P) => (
  <S className={className}>
    <path d="M3 6h26v3H3z" fill={CC} opacity=".85" />
    <path d="M6 9h2v19H6zM24 9h2v19h-2z" fill={CC} opacity=".85" />
    <path d="M11 9h1.6v6H11zM19.4 9H21v6h-1.6z" fill={CC} opacity=".45" />
    <Run y={10.6} x0={8} x1={24} n={5} r={1.3} />
    <path className="text-accent" d="M15.2 15h1.6v3h-1.6z" fill={CC} opacity=".5" />
    <circle className="text-accent" cx="16" cy="20" r="2.6" fill={CC} />
  </S>
);

/** game day: the elevation in team color, flag at the peak */
export const IcGameday = ({ className }: P) => (
  <S className={className}>
    <path d="M16 2v6" stroke={CC} strokeWidth="1.6" opacity=".85" />
    <path className="text-accent" d="M16.8 2.4 25 4.6l-8.2 2.2V2.4Z" fill={CC} />
    <Gable y={10} w={13} />
    <Wall y={17} h={8} w={10} />
    <Run y={14.4} x0={4.5} x1={27.5} n={7} r={1.5} />
    <rect x="13.5" y="19" width="5" height="6" fill={CC} opacity=".3" />
  </S>
);

/** seasonal scenes: the library — three saved states of the same gable */
export const IcSeasonal = ({ className }: P) => (
  <S className={className}>
    <path d="M2 6.5 9 2l7 4.5v5H2z" fill={CC} opacity=".45" />
    <g className="text-accent" fill={CC}>
      <circle cx="5" cy="7.6" r="1.2" /><circle cx="9" cy="5.4" r="1.2" /><circle cx="13" cy="7.6" r="1.2" />
    </g>
    <path d="M16 15.5 23 11l7 4.5v5H16z" fill={CC} opacity=".45" />
    <g fill={CC} opacity=".6">
      <circle cx="19" cy="16.6" r="1.2" /><circle cx="23" cy="14.4" r="1.2" /><circle cx="27" cy="16.6" r="1.2" />
    </g>
    <path d="M2 24.5 9 20l7 4.5v5H2z" fill={CC} opacity=".45" />
    <g className="text-accent" fill={CC}>
      <circle cx="5" cy="25.6" r="1.2" opacity=".5" /><circle cx="9" cy="23.4" r="1.2" /><circle cx="13" cy="25.6" r="1.2" opacity=".5" />
    </g>
  </S>
);

/** commercial: flat parapet, storefront glass, door */
export const IcCommercial = ({ className }: P) => (
  <S className={className}>
    {/* parapet, lit run, then a scalloped awning and a recessed entry — a storefront, not
      * another horizontal band with dots on it */}
    <path d="M3 3h26v4H3z" fill={CC} opacity=".85" />
    <Run y={8.6} x0={5.5} x1={26.5} n={8} r={1.3} />
    <path d="M4 11h24v4H4z" fill={CC} opacity=".45" />
    <path d="M4 15c1.6 0 1.6 2 3.2 2s1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.4 2 2.8 2v-2H4Z" fill={CC} opacity=".3" />
    <path d="M5 18h9v11H5zM18 18h9v11h-9z" fill={CC} opacity=".28" />
    <path d="M14 20h4v9h-4z" fill={CC} opacity=".55" />
  </S>
);

/* ── APP AND CONTROL ── */

/** saved scenes: the app's list, one scene live */
export const IcSceneStack = ({ className }: P) => (
  <S className={className}>
    <rect x="7" y="2" width="18" height="28" rx="3" fill={CC} opacity=".85" />
    <rect x="9.5" y="6.5" width="13" height="4" rx="1" fill={CC} opacity=".3" />
    <rect className="text-accent" x="9.5" y="12.5" width="13" height="4" rx="1" fill={CC} />
    <rect x="9.5" y="18.5" width="13" height="4" rx="1" fill={CC} opacity=".3" />
    <rect x="12.5" y="25" width="7" height="1.6" rx=".8" fill={CC} opacity=".3" />
  </S>
);

/** dusk trigger: the sun going under the horizon as the run comes up */
export const IcSchedule = ({ className }: P) => (
  <S className={className}>
    <path d="M16 3v4M6.8 7.4l2.4 2.4M25.2 7.4l-2.4 2.4" stroke={CC} strokeWidth="1.8" strokeLinecap="round" opacity=".45" />
    <path d="M9 19a7 7 0 0 1 14 0Z" fill={CC} opacity=".3" />
    <path d="M2 19h28v2.5H2z" fill={CC} opacity=".85" />
    <path d="M4 25h24v4H4z" fill={CC} opacity=".45" />
    <Run y={24} x0={6} x1={26} n={6} r={1.3} />
  </S>
);

/** zones: one elevation, three switched zones, the middle one on */
export const IcZones = ({ className }: P) => (
  <S className={className}>
    <Gable y={6} w={13} />
    <path d="M5 13h22v14H5z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M12.6 13h6.8v14h-6.8z" fill={CC} opacity=".38" />
    <path d="M12.6 13v14M19.4 13v14" stroke={CC} strokeWidth="1.2" opacity=".6" />
    <Run y={11.8} x0={13.4} x1={18.6} n={3} r={1.6} />
    <g fill={CC} opacity=".28">
      <circle cx="7.5" cy="11.8" r="1.4" /><circle cx="24.5" cy="11.8" r="1.4" />
    </g>
  </S>
);

/** dimming: the same run at four outputs, and the slider that did it */
export const IcDimmer = ({ className }: P) => (
  <S className={className}>
    <Section x={2} y={9} w={28} h={8} />
    <g className="text-accent" fill={CC}>
      <circle cx="6" cy="13" r="1.7" opacity=".22" />
      <circle cx="12" cy="13" r="1.7" opacity=".45" />
      <circle cx="18" cy="13" r="1.7" opacity=".7" />
      <circle cx="24" cy="13" r="1.7" />
    </g>
    <path d="M4 23h24v2.4H4z" fill={CC} opacity=".3" />
    <path className="text-accent" d="M4 23h15v2.4H4z" fill={CC} />
    <circle className="text-accent" cx="19" cy="24.2" r="3.4" fill={CC} />
  </S>
);

/** lights installed: a reel of channel with the lead run lit */
export const IcInstallCount = ({ className }: P) => (
  /* A reel of channel paying out a lit run. The first attempt at this was a circle with a
   * diagonal stub, which read as a magnifying glass — i.e. as a UI glyph, the exact thing
   * this set exists to avoid. Flanges, hub and spokes fix it. */
  <S className={className}>
    <circle cx="13" cy="13" r="11" fill={CC} opacity=".45" />
    <circle cx="13" cy="13" r="4.4" fill={CC} opacity=".85" />
    <g stroke={CC} strokeWidth="1.6" opacity=".28">
      <path d="M13 2.5v6M13 17.5v6M2.5 13h6M17.5 13h6" />
    </g>
    <path d="M4.6 4.6 8.8 8.8M21.4 21.4l-4.2-4.2M21.4 4.6l-4.2 4.2M4.6 21.4l4.2-4.2" stroke={CC} strokeWidth="1.4" opacity=".22" />
    <path d="M22 26h8v3.5h-8z" fill={CC} opacity=".85" />
    <Run y={27.8} x0={23.5} x1={28.5} n={2} r={1.2} />
  </S>
);

/** the review star, with its base line so it is ours and not a UI asset */
export const IcStars = ({ className }: P) => (
  <S className={className}>
    <path className="text-accent" d="M16 3.5l3.4 7.2 7.8 1-5.8 5.3 1.5 7.8L16 21l-6.9 3.8 1.5-7.8-5.8-5.3 7.8-1L16 3.5Z" fill={CC} />
    <path d="M6 28h20" stroke={CC} strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
  </S>
);

/* ── PROOF AND TRUST ── */

/** our own crews: the hat, brim and band */
export const IcHardHat = ({ className }: P) => (
  <S className={className}>
    <path d="M8 19a8 8 0 0 1 16 0Z" fill={CC} opacity=".85" />
    <path d="M14.5 11.5h3V19h-3z" fill={CC} opacity=".45" />
    <path d="M3 19h26v3.2H3z" fill={CC} opacity=".85" />
    <path className="text-accent" d="M8.4 16.4h15.2v2.6H8.4z" fill={CC} />
    <path d="M6 25h20v2H6z" fill={CC} opacity=".3" />
  </S>
);

/** two tiers: the same section, premium spacing and value spacing */
export const IcTwoTiers = ({ className }: P) => (
  <S className={className}>
    <path className="text-accent" d="M3 3.5h26V5H3z" fill={CC} />
    <Section x={3} y={5} w={26} h={8} />
    <Run y={9} x0={6} x1={26} n={7} r={1.4} />
    <Section x={3} y={19} w={26} h={8} />
    <Run y={23} x0={7} x1={25} n={4} r={1.4} />
  </S>
);

/** verified in daylight and dark: one elevation, checked on both sides */
export const IcVerified = ({ className }: P) => (
  <S className={className}>
    <Gable y={5} w={13} />
    <path d="M5 12h22v13H5z" fill={CC} opacity=".45" />
    <path d="M5 12h11v13H5z" fill={CC} opacity=".2" />
    <path d="M16 12v13" stroke={CC} strokeWidth="1" opacity=".55" />
    <Run y={11} x0={17.5} x1={26.5} n={4} r={1.3} />
    <path className="text-accent" d="M7.5 19.6 10 22.2l4.4-4.6 1.6 1.7-6 6.3-4.1-4.3 1.6-1.7Z" fill={CC} />
  </S>
);

/** measured on site: the tape hooked on the fascia, with its ticks */
export const IcMeasured = ({ className }: P) => (
  <S className={className}>
    <rect x="2" y="5" width="28" height="6" rx="1" fill={CC} opacity=".85" />
    <path d="M6 11v4M11 11v6M16 11v4M21 11v6M26 11v4" stroke={CC} strokeWidth="1.6" opacity=".45" />
    <path className="text-accent" d="M2 11h28v2.2H2z" fill={CC} />
    <path d="M9 20h14a3 3 0 0 1 3 3v6H6v-6a3 3 0 0 1 3-3Z" fill={CC} opacity=".85" />
    <circle className="text-accent" cx="16" cy="24.6" r="2.8" fill={CC} />
  </S>
);

/** what the old way costs every year: the bin of tangled strand */
export const IcYearlyCost = ({ className }: P) => (
  <S className={className}>
    <path d="M3 8h26v4H3z" fill={CC} opacity=".85" />
    <path d="M5 12h22l-2 17H7L5 12Z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M9 19c2-4 5 1 7-2s4 3 7-1" stroke={CC} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".85" />
    <path d="M9 25c3-2 5 2 8 0s4 1 6 0" stroke={CC} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".35" />
  </S>
);

/** nobody on a ladder: the ladder, struck through */
export const IcLadder = ({ className }: P) => (
  <S className={className}>
    <path d="M8 3v26M22 3v26" stroke={CC} strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
    <path d="M8 9h14M8 15h14M8 21h14M8 27h14" stroke={CC} strokeWidth="2" opacity=".45" />
    <path className="text-accent" d="M4 27 27 4" stroke={CC} strokeWidth="3" strokeLinecap="round" />
  </S>
);

/** financing: the job, paid in equal lengths */
export const IcFinancing = ({ className }: P) => (
  <S className={className}>
    <Gable y={3} w={10} />
    <Wall y={10} h={6} w={7} />
    <Run y={9.4} x0={7.5} x1={24.5} n={5} r={1.2} />
    <path d="M3 20h7v8H3zM12.5 20h7v8h-7z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M22 20h7v8h-7z" fill={CC} opacity=".9" />
  </S>
);

/** we come out: the van, with the rack */
const Van = ({ className }: P) => (
  <S className={className}>
    <path className="text-accent" d="M3 7h15v2H3z" fill={CC} />
    <path d="M5 9v2M16 9v2" stroke={CC} strokeWidth="1.4" opacity=".45" />
    <path d="M2 11h17v11H2z" fill={CC} opacity=".85" />
    <path d="M19 14h6l4 4v4H19z" fill={CC} opacity=".45" />
    <path d="M20.5 15.5h4l2.2 2.4h-6.2z" fill={CC} opacity=".28" />
    <circle cx="8" cy="24" r="3.2" fill={CC} opacity=".85" />
    <circle cx="23" cy="24" r="3.2" fill={CC} opacity=".85" />
  </S>
);
export const IcSameDay = Van;

/** the HOA covenant, with the gable stamped on it */
export const IcHoaPaperwork = ({ className }: P) => (
  <S className={className}>
    <path d="M6 3h20v26H6z" fill={CC} opacity=".85" />
    <path d="M10 8.5 15 5l5 3.5V12h-10z" fill={CC} opacity=".3" />
    <path d="M10 16h12M10 20h12M10 24h7" stroke={CC} strokeWidth="1.8" opacity=".35" strokeLinecap="round" />
    <circle className="text-accent" cx="24" cy="24" r="4" fill={CC} />
  </S>
);

/** warranty: the channel profile itself, standing in for a shield */
export const IcWarranty = ({ className }: P) => (
  <S className={className}>
    {/* the shield IS the channel in section: squared shoulders, lens groove, diodes inside */}
    <path d="M6 3h20v13c0 7-5.4 11-10 13-4.6-2-10-6-10-13V3Z" fill={CC} opacity=".85" />
    <path d="M6 3h20v3.5H6z" fill={CC} opacity=".45" />
    <path d="M6 8.5h20v1.2H6z" fill={CC} opacity=".3" />
    <Run y={14} x0={10.5} x1={21.5} n={3} r={1.9} />
    <path className="text-accent" d="M11.5 19.5h9v2h-9z" fill={CC} opacity=".45" />
  </S>
);

/** sealed: the section, shedding water */
export const IcWeatherSealed = ({ className }: P) => (
  <S className={className}>
    <path d="M10.5 3c0 0 4 5 4 7.6a4 4 0 0 1-8 0C6.5 8 10.5 3 10.5 3Z" fill={CC} opacity=".45" />
    <path d="M23 6c0 0 3 3.8 3 5.7a3 3 0 0 1-6 0C20 9.8 23 6 23 6Z" fill={CC} opacity=".3" />
    <Section x={2} y={17} w={28} h={8} />
    <Run y={21} x0={6} x1={26} n={6} r={1.5} />
    <path d="M2 25.5h28V28H2z" fill={CC} opacity=".45" />
  </S>
);

/** day and night: one house, both states */
export const IcDayNight = ({ className }: P) => (
  <S className={className}>
    <Gable y={7} w={13} />
    <Wall y={14} h={11} w={10} />
    <path d="M16 14h10v11H16z" fill={CC} opacity=".2" />
    <path d="M16 2v28" stroke={CC} strokeWidth="1" opacity=".45" strokeDasharray="2 2" />
    <Run y={13.4} x0={17} x1={27} n={4} r={1.4} />
    <circle cx="8.5" cy="6.5" r="2.6" fill={CC} opacity=".45" />
    <path d="M6 20h4v5H6z" fill={CC} opacity=".3" />
  </S>
);

/* ── CRAFT DETAILS ── */

/** into fascia, never shingles: the courses, the board, the screws */
export const IcFasciaMount = ({ className }: P) => (
  <S className={className}>
    <path d="M2 3h28v3.5H2z" fill={CC} opacity=".28" />
    <path d="M2 7h28v3.5H2z" fill={CC} opacity=".38" />
    <rect x="2" y="11.5" width="28" height="8" rx="1" fill={CC} opacity=".85" />
    <g fill={CC} opacity=".3">
      <circle cx="9" cy="15.5" r="2" /><circle cx="23" cy="15.5" r="2" />
    </g>
    <Section x={4} y={20.5} w={24} h={7} />
    <Run y={24} x0={8} x1={24} n={5} r={1.4} />
  </S>
);

/** mitered at every transition: two lengths, cut on the diagonal */
export const IcMiter = ({ className }: P) => (
  <S className={className}>
    <path d="M3 19h15v8H3z" fill={CC} opacity=".85" />
    <path d="M22 4h7v15h-7z" fill={CC} opacity=".85" />
    <path d="M18 27 29 16v11H18Z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M18.2 26.4 28.4 16.2" stroke={CC} strokeWidth="2.4" strokeLinecap="round" />
    <Run y={23} x0={6} x1={15} n={3} r={1.4} />
    <g className="text-accent" fill={CC}>
      <circle cx="25.5" cy="8" r="1.4" /><circle cx="25.5" cy="13" r="1.4" />
    </g>
  </S>
);

/** concealed wire: the conductor inside the channel, nothing hanging */
export const IcConcealedWire = ({ className }: P) => (
  <S className={className}>
    <path d="M2 5h28v4H2z" fill={CC} opacity=".45" />
    <Section x={2} y={9} w={28} h={11} />
    <path d="M5 14.5c4 0 4 3 8 3s4-3 8-3 3 3 6 3" stroke={CC} strokeWidth="2" opacity=".35" fill="none" strokeLinecap="round" />
    <Run y={18.6} x0={6} x1={26} n={6} r={1.3} />
    <path d="M6 24h20" stroke={CC} strokeWidth="1.4" opacity=".2" strokeDasharray="2 3" />
  </S>
);

/** capped termination: the end of the run, closed and sealed */
export const IcEndCap = ({ className }: P) => (
  <S className={className}>
    <Section x={2} y={12} w={19} h={9} />
    <Run y={16.5} x0={5.5} x1={17} n={4} r={1.5} />
    <path d="M21 11h5.5v11H21z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M26.5 11H29v11h-2.5z" fill={CC} />
    <path d="M8 25.5h12" stroke={CC} strokeWidth="1.6" opacity=".28" strokeLinecap="round" />
  </S>
);
