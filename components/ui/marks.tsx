/* THE MARKS. Three of them, drawn for the three cards in Who We Are and nowhere else.
 *
 * ICONS CAME BACK, AND IT IS WORTH SAYING WHY THAT IS NOT A REVERSAL. The client killed the last
 * set outright - twenty-eight glyphs, deleted along with components/icons/index.tsx - and the
 * reason he gave was the diagnosis: "I can't even tell what's going on with them." He was right.
 * That set tried to draw IDEAS: wholeHome, twoTiers, dayNight, weatherSealed, hoaPaperwork. Nobody
 * decodes "two tiers" from a shape at 24px, so the glyph was decoration in the most prominent
 * position of every row it appeared in.
 *
 * These three draw OBJECTS, and that is the whole difference:
 *
 *     Local, not a franchise        a map pin
 *     Two brands on the truck       a van
 *     The same crew, start to finish  a person
 *
 * A pin, a van and a person are legible at any size to anyone, in a way that a pictogram of
 * "whole-home coverage" never was. If a fourth card ever needs a mark and the honest drawing of it
 * would be abstract, that card should have no mark rather than a bad one.
 *
 * DRAWN, THEN LOOKED AT. Rendered to PNG at 20, 24 and 48px and inspected before shipping, the same
 * way the favicon was - because "is this legible small" is not a question that can be answered by
 * reading path data.
 *
 * One weight, one geometry: a 24 grid, 1.75 stroke, round caps and joins, no fills except the pin's
 * centre. They take colour from `currentColor`, so no hex appears here and scripts/hex-lock.mjs
 * stays satisfied.
 */

type MarkProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Local, not a franchise — a map pin. */
export function MarkPin({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Two brands on the truck — a van, seen from the side. */
export function MarkVan({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 16.5V7.5a1 1 0 0 1 1-1h10.5v10H2Z" />
      <path d="M13.5 9.5h3.9a1 1 0 0 1 .82.43l2.6 3.74a1 1 0 0 1 .18.57v2.26h-7.5" />
      <circle cx="7" cy="16.5" r="2.2" />
      <circle cx="17" cy="16.5" r="2.2" />
    </svg>
  );
}

/** The same crew, start to finish — a person. */
export function MarkPerson({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

/* ── the five steps in How We Work ──
 *
 * These replace `.run-spine`, the vertical amber diode line that used to run down the left of the
 * list. The client, on a screenshot of it: "this here should be a graphic". He is right and the
 * screenshot shows why - at the size that column gives it, a 3px-wide dotted rule reads as a
 * rendering artefact or a border that failed to load, not as a length of lit channel. The device
 * works on /services where it runs tall beside a whole branch; it does not work as a 300px sliver.
 *
 * Same rule as the three above: draw the OBJECT, not the idea. A rule, a screw, a phone, a shield
 * and a double tick are all things rather than concepts. */

/** Measured on site, after dark — a rule with its ticks. */
export function MarkRule({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="8.5" width="19" height="7" rx="1.2" />
      <path d="M7 8.5v3M12 8.5v4M17 8.5v3" />
    </svg>
  );
}

/** Into fascia, never shingles — a fixing, with a head and a driven point.
 *
 * Second drawing. The first was a vertical rule with three horizontal ticks and a solid triangle at
 * the foot, and rendered at 24px it read as a DOWN ARROW with marks on it - which is a different
 * instruction entirely. A screw is recognised by its head, so this one has a flat head and a slot
 * at the top, threads that taper, and a point. */
export function MarkScrew({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7.5 4.25h9" />
      <path d="M10 4.25v2.5M14 4.25v2.5" />
      <path d="M10 6.75h4l-.5 9.5L12 20l-1.5-3.75-.5-9.5Z" />
      <path d="M10.15 9.75h3.7M10.3 12.75h3.4" />
    </svg>
  );
}

/** One app, every zone — a phone. */
export function MarkPhone({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
      <path d="M10.5 5.5h3" />
      <circle cx="12" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** We hold the warranty — a shield. */
export function MarkShield({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.75 4.5 6v6.2c0 4.4 3.1 7.7 7.5 9.05 4.4-1.35 7.5-4.65 7.5-9.05V6L12 2.75Z" />
    </svg>
  );
}

/** Checked twice before we leave — two ticks. */
export function MarkCheckTwice({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="m2.5 12.5 4 4 7-8.5" />
      <path d="m10.5 15 1.5 1.5 8.5-10" />
    </svg>
  );
}
