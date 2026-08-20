/* Brytr custom icon set — 30 subjects, drawn in one pass on a 32-unit grid.
 * Solid / duotone. Primary form is currentColor; exactly ONE accent detail per icon
 * (class `text-accent`, which re-binds currentColor for that element).
 * No lucide, no Feather, no Heroicons. Every subject is an object a Brytr tech touches.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type P = { className?: string };

function S({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}
const CC = "currentColor";

/* ── Services (11) ─────────────────────────────────────────────── */

export const IcWholeHome = ({ className }: P) => (
  <S className={className}>
    <path d="M4 15 16 6l12 9v11a1 1 0 0 1-1 1h-9v-7h-4v7H5a1 1 0 0 1-1-1V15Z" fill={CC} opacity=".9" />
    <path className="text-accent" d="M3 15.4 16 5.6l13 9.8-1.2 1.6L16 8.1 4.2 17 3 15.4Z" fill={CC} />
  </S>
);

export const IcRoofline = ({ className }: P) => (
  <S className={className}>
    <path d="M2 19 16 8l14 11" fill="none" stroke={CC} strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M5 21h22v7H5z" fill={CC} opacity=".55" />
    <rect className="text-accent" x="4" y="18.6" width="24" height="3" rx="1.5" fill={CC} />
    <line x1="11" y1="21" x2="11" y2="28" stroke="#fff" strokeWidth="1.2" opacity=".35" />
    <line x1="21" y1="21" x2="21" y2="28" stroke="#fff" strokeWidth="1.2" opacity=".35" />
  </S>
);

export const IcChristmas = ({ className }: P) => (
  <S className={className}>
    <path d="M3 21 16 10l13 11-1.6 1.9L16 13.2 4.6 22.9 3 21Z" fill={CC} />
    <g className="text-accent" fill={CC}>
      <circle cx="8" cy="22" r="2" /><circle cx="16" cy="16" r="2" /><circle cx="24" cy="22" r="2" />
    </g>
  </S>
);

export const IcSoffit = ({ className }: P) => (
  <S className={className}>
    <path d="M3 8h26v5H3z" fill={CC} opacity=".85" />
    <path d="M3 13h26v2H3z" fill={CC} opacity=".45" />
    <path className="text-accent" d="M14 14h4l6 13h-16l6-13Z" fill={CC} opacity=".9" />
  </S>
);

export const IcPathLight = ({ className }: P) => (
  <S className={className}>
    <rect x="15" y="12" width="2.5" height="16" rx="1" fill={CC} />
    <path d="M9 10h14l-2.5 4h-9L9 10Z" fill={CC} />
    <path className="text-accent" d="M12 15h8l4 11H8l4-11Z" fill={CC} opacity=".8" />
  </S>
);

export const IcHardscape = ({ className }: P) => (
  <S className={className}>
    <rect x="2" y="7" width="28" height="4.5" rx="1.5" fill={CC} />
    <path className="text-accent" d="M4 12.5h24l-3 5H7z" fill={CC} opacity=".55" />
    <rect className="text-accent" x="3" y="11.8" width="26" height="2" rx="1" fill={CC} />
    <rect x="4" y="18.5" width="10" height="4.5" rx="1" fill={CC} opacity=".75" />
    <rect x="16" y="18.5" width="12" height="4.5" rx="1" fill={CC} opacity=".75" />
    <rect x="4" y="24.5" width="14" height="4.5" rx="1" fill={CC} opacity=".6" />
    <rect x="20" y="24.5" width="8" height="4.5" rx="1" fill={CC} opacity=".6" />
  </S>
);

export const IcPergola = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="6" width="26" height="3" rx="1" fill={CC} />
    <rect x="6" y="9" width="2" height="19" rx="1" fill={CC} opacity=".8" />
    <rect x="24" y="9" width="2" height="19" rx="1" fill={CC} opacity=".8" />
    <rect x="12" y="9" width="2" height="6" rx="1" fill={CC} opacity=".55" />
    <rect x="18" y="9" width="2" height="6" rx="1" fill={CC} opacity=".55" />
    <circle className="text-accent" cx="16" cy="19" r="4" fill={CC} />
  </S>
);

export const IcGameday = ({ className }: P) => (
  <S className={className}>
    <g transform="rotate(-22 16 16)">
      <path d="M16 7c5.5 0 9.5 4 9.5 9s-4 9-9.5 9-9.5-4-9.5-9 4-9 9.5-9Z" fill={CC} />
      <path className="text-accent" d="M11.5 16h9" stroke={CC} strokeWidth="2.2" strokeLinecap="round" />
      <g stroke={CC} strokeWidth="1.6" strokeLinecap="round" className="text-accent">
        <path d="M13.5 14v4M16 13.2v5.6M18.5 14v4" />
      </g>
    </g>
  </S>
);

export const IcSeasonal = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="6" width="26" height="23" rx="3" fill={CC} opacity=".92" />
    <rect x="3" y="6" width="26" height="7" rx="3" fill={CC} />
    <rect x="9" y="2.5" width="2.5" height="6" rx="1.25" fill={CC} />
    <rect x="20.5" y="2.5" width="2.5" height="6" rx="1.25" fill={CC} />
    <g fill="#fff" opacity=".5">
      <rect x="7" y="17" width="4.5" height="3.5" rx="1" /><rect x="20.5" y="17" width="4.5" height="3.5" rx="1" />
      <rect x="7" y="23" width="4.5" height="3.5" rx="1" /><rect x="13.8" y="23" width="4.5" height="3.5" rx="1" />
      <rect x="20.5" y="23" width="4.5" height="3.5" rx="1" />
    </g>
    <rect className="text-accent" x="13.5" y="16.5" width="5" height="4.5" rx="1.2" fill={CC} />
  </S>
);

export const IcCommercial = ({ className }: P) => (
  <S className={className}>
    <path d="M4 13h24v15H4z" fill={CC} opacity=".85" />
    <path d="M2 8h28v5H2z" fill={CC} />
    <rect className="text-accent" x="2" y="13" width="28" height="2.6" rx="1.3" fill={CC} />
    <path d="M6 17h8l-1.5 4H7.5z" fill="#fff" opacity=".35" />
    <rect x="18" y="17" width="8" height="11" rx="1" fill="#fff" opacity=".38" />
    <line x1="22" y1="17" x2="22" y2="28" stroke={CC} strokeWidth="1.2" opacity=".5" />
  </S>
);

export const IcRepair = ({ className }: P) => (
  <S className={className}>
    <rect className="text-accent" x="3" y="14" width="26" height="4" rx="1.5" fill={CC} />
    <path d="M21 5a6 6 0 0 0-4.6 9.9l-1.9 1.9 3.8 3.8 1.9-1.9A6 6 0 1 0 21 5Zm0 3.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" fill={CC} />
    <path d="M13.6 18.9 8 24.5l3 3 5.6-5.6-3-3Z" fill={CC} opacity=".8" />
  </S>
);

/* ── App & control (4) ─────────────────────────────────────────── */

export const IcSceneStack = ({ className }: P) => (
  <S className={className}>
    <rect x="4" y="12" width="16" height="14" rx="2.5" fill={CC} opacity=".45" />
    <rect x="8" y="9" width="16" height="14" rx="2.5" fill={CC} opacity=".7" />
    <rect className="text-accent" x="12" y="6" width="16" height="14" rx="2.5" fill={CC} />
  </S>
);

export const IcSchedule = ({ className }: P) => (
  <S className={className}>
    <circle cx="16" cy="16" r="11" stroke={CC} strokeWidth="2.5" />
    <path d="M16 9v7h6" stroke={CC} strokeWidth="2.5" strokeLinecap="round" />
    <path className="text-accent" d="M5 21h22" stroke={CC} strokeWidth="3" strokeLinecap="round" />
  </S>
);

export const IcZones = ({ className }: P) => (
  <S className={className}>
    <rect x="4" y="6" width="24" height="20" rx="2" stroke={CC} strokeWidth="2.5" />
    <path d="M16 6v20M16 16h12" stroke={CC} strokeWidth="2.5" />
    <rect className="text-accent" x="6" y="8" width="8" height="16" rx="1" fill={CC} />
  </S>
);

export const IcDimmer = ({ className }: P) => (
  <S className={className}>
    <rect x="13" y="4" width="6" height="24" rx="3" fill={CC} opacity=".35" />
    <rect x="13" y="4" width="6" height="11" rx="3" fill={CC} />
    <circle className="text-accent" cx="16" cy="15" r="5" fill={CC} />
  </S>
);

/* ── Trust & objection (9) ─────────────────────────────────────── */

export const IcInstallCount = ({ className }: P) => (
  <S className={className}>
    <rect x="4" y="8" width="24" height="4" rx="1.5" fill={CC} opacity=".55" />
    <rect x="4" y="14" width="24" height="4" rx="1.5" fill={CC} opacity=".78" />
    <rect x="4" y="20" width="24" height="4" rx="1.5" fill={CC} />
    <path className="text-accent" d="M6 27h20" stroke={CC} strokeWidth="3" strokeLinecap="round" />
  </S>
);

export const IcStars = ({ className }: P) => (
  <S className={className}>
    <path className="text-accent" d="M16 4l3.2 6.8 7.3.9-5.4 5 1.4 7.3L16 20.4 9.5 24l1.4-7.3-5.4-5 7.3-.9L16 4Z" fill={CC} />
    <path d="M5 27h22" stroke={CC} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
  </S>
);

export const IcHardHat = ({ className }: P) => (
  <S className={className}>
    <path d="M7 20a9 9 0 0 1 18 0H7Z" fill={CC} />
    <path d="M16 11v9" stroke="#fff" strokeWidth="1.6" opacity=".45" />
    <path d="M12.2 12.6 11 20M19.8 12.6 21 20" stroke="#fff" strokeWidth="1.4" opacity=".35" />
    <rect className="text-accent" x="3" y="20" width="26" height="4.2" rx="2.1" fill={CC} />
  </S>
);

export const IcOtherBrand = ({ className }: P) => (
  <S className={className}>
    <path d="M3 12h26v8H3z" fill={CC} opacity=".4" />
    <path d="M3 12h26v3H3z" fill={CC} opacity=".8" />
    <path className="text-accent" d="M20 6.5 25.5 12l-2 2-5.5-5.5 2-2Zm-4.5 9.5 3 3-9 9L6 24l9.5-8Z" fill={CC} />
  </S>
);

export const IcTwoTiers = ({ className }: P) => (
  <S className={className}>
    <rect className="text-accent" x="3" y="7" width="26" height="7" rx="2" fill={CC} />
    <rect x="3" y="18" width="26" height="4" rx="1.5" fill={CC} opacity=".7" />
    <path d="M5 26h22" stroke={CC} strokeWidth="2" strokeLinecap="round" opacity=".45" />
  </S>
);

export const IcVerified = ({ className }: P) => (
  <S className={className}>
    <path d="M16 8c7 0 12 8 12 8s-5 8-12 8S4 16 4 16s5-8 12-8Z" stroke={CC} strokeWidth="2.5" />
    <path d="M16 11.5a4.5 4.5 0 0 0 0 9V11.5Z" fill={CC} />
    <circle className="text-accent" cx="18.5" cy="16" r="2.5" fill={CC} />
  </S>
);

export const IcMeasured = ({ className }: P) => (
  <S className={className}>
    <path d="M4 14a7 7 0 0 1 7-7h10a7 7 0 0 1 0 14H11a7 7 0 0 1-7-7Z" fill={CC} opacity=".9" />
    <circle cx="11" cy="14" r="3.4" fill="#fff" opacity=".55" />
    <rect className="text-accent" x="6" y="23" width="23" height="4.4" rx="1" fill={CC} />
    <g stroke={CC} strokeWidth="1.5" opacity=".9">
      <path d="M11 23v2.2M16 23v3M21 23v2.2M26 23v3" />
    </g>
  </S>
);

export const IcYearlyCost = ({ className }: P) => (
  <S className={className}>
    <path d="M7 4h18v22l-4.5-2.5L16 26l-4.5-2.5L7 26V4Z" fill={CC} opacity=".85" />
    <path d="M11 10h10M11 15h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".7" />
    <path className="text-accent" d="M23 27a6 6 0 1 1 5-9l-2.5 1.2A3.4 3.4 0 1 0 26 24l-3.4.2 3.6 3.6" fill={CC} />
  </S>
);

export const IcLadder = ({ className }: P) => (
  <S className={className}>
    <path d="M2 24 16 12l14 12v2H2v-2Z" fill={CC} opacity=".3" />
    <g stroke={CC} strokeWidth="2.6" strokeLinecap="round">
      <path d="M11 28 15 6M19 28 23 6" />
      <path d="M12.7 21.5h7.6M14 15.5h7.6" />
    </g>
    <path className="text-accent" d="M13.4 9h7.6" stroke={CC} strokeWidth="2.6" strokeLinecap="round" />
  </S>
);

/* ── Financing & process (6) ───────────────────────────────────── */

export const IcFinancing = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="8" width="26" height="17" rx="3" fill={CC} opacity=".85" />
    <rect x="3" y="12" width="26" height="3" fill={CC} />
    <circle className="text-accent" cx="22" cy="20" r="3.5" fill={CC} />
  </S>
);

export const IcSameDay = ({ className }: P) => (
  <S className={className}>
    <path d="M4 8a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-9l-7 5v-5H7a3 3 0 0 1-3-3V8Z" fill={CC} opacity=".85" />
    <path className="text-accent" d="M17.5 7 11 15h4l-1.5 6 6.5-8.5h-4L17.5 7Z" fill={CC} />
  </S>
);

export const IcHoaPaperwork = ({ className }: P) => (
  <S className={className}>
    <rect x="6" y="5" width="20" height="24" rx="2.5" fill={CC} opacity=".85" />
    <rect x="12" y="2.5" width="8" height="5" rx="1.5" fill={CC} />
    <path d="M11 14h10M11 19h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".65" />
    <path className="text-accent" d="m13 24.5 2.6 2.6L23 20" stroke={CC} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export const IcWarranty = ({ className }: P) => (
  <S className={className}>
    <path d="M16 3l11 4v9c0 7-5 11.5-11 13C10 27.5 5 23 5 16V7l11-4Z" fill="none" stroke={CC} strokeWidth="2.4" />
    <path className="text-accent" d="M16 10a4.2 4.2 0 0 0-2.4 7.7V20h4.8v-2.3A4.2 4.2 0 0 0 16 10Z" fill={CC} />
    <path d="M13.8 22h4.4M14.4 24.4h3.2" stroke={CC} strokeWidth="1.8" strokeLinecap="round" />
  </S>
);

export const IcWeatherSealed = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="16" width="26" height="6" rx="2" fill={CC} opacity=".85" />
    <rect x="3" y="16" width="26" height="2.5" fill={CC} />
    <path className="text-accent" d="M16 2c0 0 5 6.2 5 9.4A5 5 0 0 1 11 11.4C11 8.2 16 2 16 2Z" fill={CC} />
  </S>
);

export const IcDayNight = ({ className }: P) => (
  <S className={className}>
    <path d="M16 4a12 12 0 0 0 0 24V4Z" fill={CC} />
    <path d="M16 9.5a6.5 6.5 0 0 1 0 13 6.5 6.5 0 0 0 0-13Z" fill={CC} opacity=".4" />
    <path className="text-accent" d="M16 2v28" stroke={CC} strokeWidth="3" />
  </S>
);

/* ── Craft details (4) ─────────────────────────────────────────────
 * Added in the home-page audit. The four craft rows in the hardware section were
 * borrowing IcRoofline, IcMeasured, IcSoffit and IcWeatherSealed from the service
 * grid, so the same glyph meant three different things on one page. These four draw
 * the actual detail: the channel screwed into fascia rather than through shingles, a
 * mitred corner, a wire run hidden inside the channel, and a sealed end cap.
 */

export const IcFasciaMount = ({ className }: P) => (
  <S className={className}>
    {/* shingle course above, fascia board below, channel screwed into the fascia */}
    <path d="M2 4h28v3H2zM2 8h28v3H2z" fill={CC} opacity=".4" />
    <rect x="2" y="12" width="28" height="7" rx="1" fill={CC} opacity=".85" />
    <rect className="text-accent" x="4" y="20" width="24" height="5" rx="1.6" fill={CC} />
    <circle cx="9" cy="15.5" r="1.5" fill={CC} />
    <circle cx="23" cy="15.5" r="1.5" fill={CC} />
  </S>
);

export const IcMiter = ({ className }: P) => (
  <S className={className}>
    {/* two lengths of channel meeting at a mitred 90°, cut line on the diagonal */}
    <path d="M4 20h13v6H4z" fill={CC} opacity=".85" />
    <path d="M20 4h6v13h-6z" fill={CC} opacity=".85" />
    <path d="M17 26 26 17v9h-9Z" fill={CC} opacity=".5" />
    <path className="text-accent" d="M17.6 25.4 25.4 17.6" stroke={CC} strokeWidth="2.6" strokeLinecap="round" />
  </S>
);

export const IcConcealedWire = ({ className }: P) => (
  <S className={className}>
    {/* channel in section with the conductor tucked inside, nothing hanging below */}
    <path d="M3 9h26v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Z" fill={CC} opacity=".8" />
    <path className="text-accent" d="M5 13c4 0 4 4 8 4s4-4 8-4 4 4 6 4" fill="none" stroke={CC} strokeWidth="2.4" strokeLinecap="round" />
    <rect x="2" y="6" width="28" height="3" rx="1.4" fill={CC} />
  </S>
);

export const IcEndCap = ({ className }: P) => (
  <S className={className}>
    {/* the run stops in a capped, sealed termination — not tape */}
    <rect x="2" y="12" width="19" height="8" rx="1" fill={CC} opacity=".8" />
    <rect className="text-accent" x="21" y="10" width="6" height="12" rx="2" fill={CC} />
    <path d="M5 16h11" stroke="#fff" strokeWidth="1.6" opacity=".35" strokeLinecap="round" />
    <path d="M29 13v6" stroke={CC} strokeWidth="2.2" strokeLinecap="round" />
  </S>
);
