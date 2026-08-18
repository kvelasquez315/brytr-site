#!/usr/bin/env bash
# Mechanical slop gate. Catches the tells that are greppable.
# The screenshot loop catches the rest — this is a floor, not a ceiling.
# Run from the site repo root. Must exit 0 before deploy.

set -uo pipefail
FAIL=0
SRC="${1:-.}"
GLOBS=(--include='*.tsx' --include='*.ts' --include='*.jsx' --include='*.js' --include='*.css')

hit() { # name, pattern, why
  local out
  out=$(grep -rniE "${GLOBS[@]}" \
        --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
        -- "$2" "$SRC" 2>/dev/null | head -12)
  if [[ -n "$out" ]]; then
    echo ""
    echo "FAIL  $1"
    echo "      $3"
    echo "$out" | sed 's/^/      /'
    FAIL=1
  fi
}

echo "── slopcheck ──────────────────────────────────────────"

hit "lucide/feather icons" \
    "from ['\"](lucide-react|react-feather|@heroicons)" \
    "Generic thin-line glyphs. Build custom SVGs (references/icon-craft.md)."

hit "purple/indigo gradient" \
    "(from|via|to)-(purple|indigo|violet|fuchsia)-[0-9]|linear-gradient\([^)]*(#[0-9a-f]*(8b5cf6|6366f1|a855f7|7c3aed))" \
    "The single loudest AI tell of the era."

hit "banned font families" \
    "(font-family:[^;]*|['\"])(Inter|Roboto|Open Sans|Lato|Poppins|Montserrat|Space Grotesk|Geist|Instrument Serif)" \
    "Swap for the three roles in DESIGN.md."

hit "system font stack" \
    "font-(sans|family)[^;\"]*system-ui" \
    "system-ui as a display or body face reads as unset, not chosen."

hit "colored left/top card border strip" \
    "border-(l|t)-(2|4|8) " \
    "Colored border strips on cards are as reliable a tell as em-dashes in text."

hit "inline hex color" \
    "(className|class)=\"[^\"]*\[#[0-9a-fA-F]{3,8}\]|style=\{\{[^}]*#[0-9a-fA-F]{3,8}" \
    "All color comes from tokens. A hex outside globals.css means the brand lock broke."

hit "arbitrary pixel values" \
    "(w|h|top|left|right|bottom|gap|p|m)-\[[0-9]{2,}px\]" \
    "Magic numbers. Use the spacing scale."

hit "decorative geometry" \
    "(blur-3xl|blur-\[|radial-gradient\(circle|bg-\[radial|animate-pulse[^\"]*rounded-full|opacity-(10|20)[^\"]*rounded-full)" \
    "Glow orbs / floating circles / pattern wallpaper. Backgrounds are solid or photo. Only."

hit "sticky-scroll split" \
    "(sticky top-0[^\"]*h-screen|position:\s*sticky[^;]*;[^}]*height:\s*100vh|useScroll|scrollYProgress|ScrollTrigger|data-scroll)" \
    "No pinned panels, no scroll-jacking, no parallax. Sticky header only."

hit "glassmorphism" \
    "backdrop-blur-(md|lg|xl|2xl|3xl)|bg-white/(5|10|20|30) " \
    "The SaaS/bubbly look. Not a trades site."

hit "placeholder text" \
    "lorem ipsum|placeholder\.com|via\.placeholder|your-?company|example\.com|coming soon|TODO:" \
    "Placeholder content shipped."

hit "emoji as icon" \
    ">[[:space:]]*(🔧|🏠|⭐|✅|🚀|💡|📞|🛠️|🔥|💧)" \
    "Emoji are not an icon system."

# Density floor: warn if any grid is exactly 3 identical cards
TRIPLE=$(grep -rn "${GLOBS[@]}" --exclude-dir=node_modules --exclude-dir=.next \
         -- "grid-cols-3" "$SRC" 2>/dev/null | wc -l | tr -d ' ')
if [[ "$TRIPLE" -gt 0 ]]; then
  echo ""
  echo "WARN  $TRIPLE use(s) of grid-cols-3"
  echo "      Three identical feature cards in a row is the AI default. Bento or 6+ cards."
fi

# Token file must be filled in
if grep -q "#______" "$SRC/app/globals.css" 2>/dev/null; then
  echo ""
  echo "FAIL  globals.css still has unfilled token placeholders"
  echo "      Brand lock incomplete — fill from DESIGN.md before building."
  FAIL=1
fi
if [[ ! -f "$SRC/DESIGN.md" ]]; then
  echo ""
  echo "FAIL  no DESIGN.md at repo root"
  echo "      Brand lock is gate 1. Nothing gets built before it exists."
  FAIL=1
fi

echo ""
if [[ "$FAIL" -eq 0 ]]; then
  echo "PASS  no mechanical slop tells. Screenshot loop still required."
else
  echo "FAILED — fix the above before deploy."
fi
echo "───────────────────────────────────────────────────────"
exit "$FAIL"
