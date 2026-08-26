/* THE ASSEMBLY. A measured section through the eave, drawn rather than iconified.
 *
 * The client, on a list of five steps with a small glyph beside each: "when I said make a graphic
 * that didn't mean just add icons. This means make a design. Also if you are using icons you need
 * to make them fully custom."
 *
 * Both halves are fair. A shield, a phone and a ruler are shapes anyone would draw - they were
 * legible, which was the bar the previous icon set failed, but legible is not the same as OURS. And
 * a row of glyphs beside a list is a list with decoration on it, not a graphic.
 *
 * SO THIS IS THE THING ITSELF: a cross-section through the roof edge showing what Brytr actually
 * fastens and where. The shingle course that nothing is fixed through, the fascia board that
 * everything is fixed INTO, the channel on its face, the sealed screws, the diode and the lens it
 * throws through. It is the most specific drawing this company could own, because it is the
 * argument the section is already making - "installed once, and installed properly" - stated as
 * geometry instead of as a claim. No competitor has it, because it is a drawing of their own
 * method.
 *
 * IT IS NOT NEW LANGUAGE EITHER. components/sections/elevation.tsx has drawn measured elevations
 * for this site since it was built - thin linework, a dimension line, callouts on leaders - against
 * a dedicated palette in globals.css (--draw-paper, --draw-line, --draw-faint, --draw-ink,
 * --draw-mass, --draw-run) with a night variant of every value. This is that vocabulary applied to
 * a detail rather than to a whole house, so the two read as sheets from one set.
 *
 * THE CALLOUTS ARE WRITTEN OUT RATHER THAN LOOPED. A drawing is not a data structure: each label
 * sits where it sits because of what is around it, and a shared component invited exactly the kind
 * of coordinate mix-up that put all five of them in one corner the first time this was rendered.
 *
 * Every colour is a token. No hex appears here, which is what scripts/hex-lock.mjs enforces.
 */

export function ChannelDetail({ className }: { className?: string }) {
  /* Night values, because this renders on the dark section. The day set exists in globals.css if
   * it is ever needed on a light ground. */
  const paper = "var(--draw-paper-night)";
  const line = "var(--draw-line-night)";
  const faint = "var(--draw-faint-night)";
  const ink = "var(--draw-ink-night)";
  const mass = "var(--draw-mass-night)";
  const run = "var(--draw-run-night)";
  const accent = "var(--brand-accent)";

  return (
    <svg
      viewBox="0 0 700 450"
      className={className}
 role="img"
      aria-label="A measured cross-section through a roof edge: the shingle course with nothing fastened through it, the fascia board every fixing lands in, the aluminium channel screwed to its face, the sealed fixings, and the addressable LED behind its lens."
    >
      <rect width="700" height="450" fill={paper} />

      {/* ── the roof deck, sloping down to the eave ── */}
      <path d="M110 60 330 150v34L110 94Z" fill={mass} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M150 77 372 167M190 93 372 167M230 110 372 167" stroke={faint} strokeWidth="0.9" fill="none" />
      {/* the shingle overhang, past the fascia */}
      <path d="M330 150 378 170l-6 14-42-18Z" fill={mass} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── the fascia board: everything fastens into this ── */}
      <rect x="298" y="184" width="34" height="150" fill={mass} stroke={line} strokeWidth="1.5" />
      <path d="M306 196v128M316 190v140M325 200v124" stroke={faint} strokeWidth="0.9" fill="none" />

      {/* ── the soffit ── */}
      <rect x="150" y="316" width="148" height="18" fill={mass} stroke={line} strokeWidth="1.5" />

      {/* ── THE CHANNEL, on the face of the fascia ──
        * Squared where it meets the board, radiused at the lens edge: the profile the whole brand
        * is built on. */}
      <path d="M332 214h46v56a20 20 0 0 1-20 20h-26Z" fill={run} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M332 268h44a18 18 0 0 1-18 22h-26Z" fill={accent} opacity="0.22" stroke={accent} strokeWidth="1.2" />

      {/* the diode, and what it throws */}
      <circle cx="356" cy="248" r="12" fill={accent} opacity="0.18" />
      <circle cx="356" cy="248" r="6" fill={accent} />
      <path d="M348 300 330 356M356 302 356 362M364 300 382 356" stroke={accent} strokeWidth="1.2" opacity="0.45" fill="none" />

      {/* the two sealed fixings, driven into the fascia */}
      <g stroke={line} strokeWidth="1.4" fill="none">
        <path d="M336 228h-30M336 278h-30" />
      </g>
      <circle cx="306" cy="228" r="3.4" fill={accent} />
      <circle cx="306" cy="278" r="3.4" fill={accent} />

      {/* ── the dimension: channel depth ── */}
      <g stroke={faint} strokeWidth="1" fill="none">
        <path d="M400 214v76M394 214h12M394 290h12" />
      </g>
      <text x="408" y="257" fill={ink} fontSize="11.5" opacity="0.75">1 3/8 in.</text>

      {/* ── callouts, written out so each label sits where it belongs ── */}
      <g>
        <circle cx="352" cy="162" r="3" fill={accent} />
        <path d="M352 162 430 104" stroke={faint} strokeWidth="1" fill="none" />
        <text x="438" y="100" fill={ink} fontSize="13" fontWeight="700">Shingle course</text>
        <text x="438" y="116" fill={ink} fontSize="11.5" opacity="0.75">Nothing fastens through it</text>
      </g>
      <g>
        <circle cx="315" cy="196" r="3" fill={accent} />
        <path d="M315 196 214 150" stroke={faint} strokeWidth="1" fill="none" />
        <text x="206" y="146" textAnchor="end" fill={ink} fontSize="13" fontWeight="700">Fascia board</text>
        <text x="206" y="162" textAnchor="end" fill={ink} fontSize="11.5" opacity="0.75">Every fixing lands here</text>
      </g>
      <g>
        <circle cx="306" cy="278" r="3" fill={accent} />
        <path d="M306 278 176 300" stroke={faint} strokeWidth="1" fill="none" />
        <text x="168" y="296" textAnchor="end" fill={ink} fontSize="13" fontWeight="700">Sealed fixing</text>
        <text x="168" y="312" textAnchor="end" fill={ink} fontSize="11.5" opacity="0.75">Sealed as it is made</text>
      </g>
      <g>
        <circle cx="356" cy="248" r="3" fill={paper} />
        <path d="M368 244 470 214" stroke={faint} strokeWidth="1" fill="none" />
        <text x="478" y="210" fill={ink} fontSize="13" fontWeight="700">Addressable LED</text>
        <text x="478" y="226" fill={ink} fontSize="11.5" opacity="0.75">One every 4 in.</text>
      </g>
      <g>
        <circle cx="352" cy="288" r="3" fill={accent} />
        <path d="M352 288 470 336" stroke={faint} strokeWidth="1" fill="none" />
        <text x="478" y="332" fill={ink} fontSize="13" fontWeight="700">Lens</text>
        <text x="478" y="348" fill={ink} fontSize="11.5" opacity="0.75">Channel matched to the trim</text>
      </g>

      {/* the sheet line, so the drawing reads as a drawing */}
      <path d="M40 402h620" stroke={faint} strokeWidth="1" fill="none" />
      <text x="40" y="424" fill={ink} fontSize="11" opacity="0.6">Section through the eave</text>
    </svg>
  );
}
