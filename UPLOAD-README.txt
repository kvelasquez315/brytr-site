BRYTR SITE — hero rebuild + type/radius fix
===========================================
These 16 files are the ONLY things that changed. Everything else in the repo
is already current.

TO UPLOAD (GitHub web, no clone needed)
---------------------------------------
1. github.com/kvelasquez315/brytr-site  ->  Add file  ->  Upload files
2. Unzip this archive, then drag the CONTENTS (app, components, public,
   scripts, and the 4 loose files) into the drop area. Do NOT drag the
   brytr-update folder itself, or everything lands one level too deep.
3. Delete UPLOAD-README.txt from the drop list before committing.
4. Commit to main. Vercel rebuilds brytr-site.vercel.app automatically.

CRITICAL: package.json and package-lock.json must go up TOGETHER, in the
same commit. package.json now depends on @fontsource/archivo and
@fontsource/barlow. Vercel runs `npm ci`, which hard-fails when the two
files disagree — that's a failed build, not a bad render. Both are in this
archive, so just don't cherry-pick.

OPTIONAL CLEANUP
----------------
components/sections/hero-dusk.tsx is now dead code — the hero was split
into hero.tsx (the new full-bleed hero) and scene-wipe.tsx (the drag
device, now its own section). Nothing imports hero-dusk.tsx, so leaving it
is harmless. Delete it in the GitHub UI when convenient.

WHAT CHANGED, AND WHY
---------------------
app/globals.css      --radius 14px -> 3px; fonts repointed to Archivo and
                     Barlow; new .hero-scrim and .hero-baseline, plus a
                     separate mobile scrim.
app/layout.tsx       loads Archivo + Barlow instead of Chivo + Figtree.
app/page.tsx         section order: Hero, ProofRail, Services, SceneWipe...
                     The mid-page quote form moved down so it does not sit
                     directly under the hero form.
hero.tsx             NEW. Full-bleed photograph, short keyword-forward H1,
                     quote form inside the hero. Follows the Freedom layout.
scene-wipe.tsx       NEW. The warm-white/game-day drag wipe, now a
                     full-width section instead of a card in the hero.
home-a.tsx           squared pills; lead services card takes a taller crop.
scene-rail.tsx       squared the scene chips.
blog / compare /     squared the remaining pill-shaped tags.
faq / service-areas
scripts/fonts.mjs    copies Archivo + Barlow out of node_modules.
public/img/hero-bg.jpg  NEW. 2600x1300 crop for the hero background.
DESIGN.md            records all three regressions (hero-as-widget, 14px
                     radius, Figtree) and why, so they don't come back.
