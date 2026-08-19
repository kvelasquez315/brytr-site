BRYTR SITE — update 2
=====================
Supersedes the earlier update zip. These 17 files are everything that has
changed since the version now in the repo. Nothing else needs touching.

TO UPLOAD (GitHub web, no clone needed)
---------------------------------------
1. github.com/kvelasquez315/brytr-site  ->  Add file  ->  Upload files
2. Unzip this archive, then drag the CONTENTS (app, components, content,
   public, scripts, and the 4 loose files) into the drop area. Do NOT drag
   the brytr-update folder itself or everything lands one level too deep.
3. Remove UPLOAD-README.txt from the drop list before committing.
4. Commit to main. Vercel rebuilds brytr-site.vercel.app on its own.

CRITICAL: package.json and package-lock.json must land in the SAME commit.
The font dependencies changed (archivo + ibm-plex-sans in, barlow/chivo/
figtree out). Vercel runs `npm ci`, which hard-fails when those two files
disagree — a failed build, not a bad render. Both are in here; don't
cherry-pick.

OPTIONAL CLEANUP
----------------
components/sections/hero-dusk.tsx is dead code — the hero split into
hero.tsx and scene-wipe.tsx. Nothing imports it. Delete it in the GitHub UI
whenever convenient.

WHAT CHANGED IN THIS ROUND
--------------------------
content/badges.ts    NEW. The credential band's data, with a `logo` field
                     per badge. Drop official logo files into /public/logo
                     and set the path — the cell renders the image instead
                     of the typographic lockup. Use each mark's OWN colors;
                     never recolor a third-party mark to Brytr amber.
home-a.tsx           Credential band rebuilt: 5 structured cells instead of
                     7 text pills, and the internal note about missing logo
                     files is gone from the page. Services grid: the two
                     cards with no photograph now invert to the dark
                     surface so the gap reads as a decision.
layout.tsx           Body font is IBM Plex Sans (was Barlow).
globals.css          --font-body repointed to Plex Sans.
scripts/fonts.mjs    copies Plex Sans out of node_modules.
package.json         @fontsource/ibm-plex-sans in; barlow out.
hero.tsx             form column 25rem -> 27rem. Plex Sans is wider than
                     Barlow and was clipping two placeholders.
DESIGN.md            records that body type took two attempts and why
                     Barlow failed, so it does not come back.

STILL OPEN
----------
- Logo files for Haven and Jellyfish (ask Zac for official asset packs).
- A daytime photograph. Nothing in the 223 GB archive is shot before dark.
- Crew shot, founder portraits, app screenshot, one commercial install.
