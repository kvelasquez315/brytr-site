BRYTR SITE — update 3   (supersedes updates 1 and 2)
====================================================
38 files. This is everything that has changed since the version currently in
the repo. The label-font change touched most pages, hence the file count.

TO UPLOAD
---------
1. github.com/kvelasquez315/brytr-site -> Add file -> Upload files
2. Unzip, then drag the CONTENTS (app, components, content, public, scripts
   and the loose root files) into the drop area. Not the brytr-update folder
   itself, or everything lands one level too deep.
3. Remove UPLOAD-README.txt from the list before committing.
4. Commit to main. Vercel rebuilds on its own.

CRITICAL: package.json and package-lock.json must land in the SAME commit.
Vercel runs `npm ci`, which hard-fails when they disagree — a failed build,
not a bad render.

OPTIONAL: components/sections/hero-dusk.tsx is dead code. Nothing imports it.
Delete it in the GitHub UI whenever convenient.

THIS ROUND
----------
Labels off the mono face   The font you flagged was IBM Plex Mono, the
                           utility face — both screenshots were micro-labels.
                           It had spread to ~50 eyebrows, figcaption tags and
                           spec keys. Mono is now restricted to actual
                           numbers; labels use Archivo 700 uppercase. This is
                           why so many files changed.
Founders off the homepage  Zac and Sam keep their section on /about.
Even cards                 The Christmas card spanned two columns with its own
                           layout, which forced every neighbour in the row to
                           stretch or fall short. All cards are one shape now,
                           heights stretch, links pin to the bottom: 11
                           services + CTA cell = an even 4 x 3.
Band down to three         Reviews, licensed + insured, W2 crews — each with a
                           line of substance. Haven and Jellyfish are out
                           until you send official logo files.
Wider, and fuller          Container 1440 -> 1600px, and section headers now
                           split into title-left / lede-right so the width is
                           actually used. The split did more than the width.
Service-area void          That section embedded an OpenStreetMap iframe that
                           rendered as an empty grey box when blocked. Now a
                           photograph of a finished install.

STILL OPEN
----------
- Haven + Jellyfish logo files (official asset packs from Zac). The band and
  content/badges.ts are built to take them: drop files in /public/logo, set
  `logo` on the badge, add the cells back. Use each mark's own colors.
- A daytime photograph. Nothing in the 223 GB archive is shot before dark.
- Crew shot, founder portraits (for /about), app screenshot, one commercial
  install.
