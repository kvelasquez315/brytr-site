BRYTR SITE — update 4   (supersedes updates 1-3)
================================================
38 files, everything changed since the version in the repo.

UPLOAD
------
github.com/kvelasquez315/brytr-site -> Add file -> Upload files.
Unzip, drag the CONTENTS (app, components, content, public, scripts and the
loose root files) into the drop area — not the brytr-update folder itself.
Remove this README from the list. Commit to main; Vercel rebuilds.

package.json and package-lock.json must land in the SAME commit — Vercel runs
`npm ci`, which hard-fails when they disagree.

Optional: components/sections/hero-dusk.tsx is dead code, safe to delete.

THIS ROUND
----------
1. THE WIPE BUG YOU SPOTTED. Real bug, and it only happened on your machine.

   `.tap-44 { position: relative }` has the same CSS specificity as
   Tailwind's `.absolute` and sits later in the stylesheet, so it quietly
   won. That rule is inside @media (pointer: coarse) — a touchscreen query.
   On your touchscreen laptop the drag handle therefore lost absolute
   positioning, dropped into normal flow, and added its 48px of height to
   the container. The base photograph kept its own 16:9 height while the
   clipped warm-white layer filled the now-taller box, so one half ran 48px
   past the other. A headless browser reports pointer:fine, so three
   screenshot passes never reproduced it. The tell in your screenshot was
   the drag handle sitting at the BOTTOM edge instead of centered.

   Fixed twice over: tap-44 no longer promotes already-positioned elements,
   and the wipe now puts the aspect ratio on the track with both photos
   absolute inside it, so the two layers are the same box by construction.

2. "MAKING IT BIGGER, NOT FULLER." Fair, and you were right. Last round I
   widened the container, raised the headline size and split the section
   headers. That is scaling. So this round is content that was already
   written and simply never linked from the homepage:

   - Nine brand comparisons (Jellyfish, Gemstone, Trimlight, Oelo, Govee,
     Minleon, Ghouly, EverLights, plus one where neither system is ours).
     "Is Jellyfish any good" is the highest-intent question in this
     category, and carrying two systems is the differentiator — a
     single-brand dealer cannot publish these pages. Each card shows that
     page's own verdict text. No new copy was written for it.
   - Three of the twelve finished blog articles. The homepage linked the
     blog zero times, which is a straight SEO defect as well as a wasted
     trust signal.

   Headline clamp pulled back from 4.4rem to 4rem.

STILL OPEN
----------
- Haven + Jellyfish logo files, official asset packs. content/badges.ts is
  built to take them: drop files in /public/logo, set `logo`, add the cells
  back to the band. Each mark in its own colors.
- A daytime photograph. Nothing in the 223 GB archive is shot before dark.
- Crew shot, founder portraits (for /about), app screenshot, one commercial
  install.
- More density is available from real content if you want it: the eight
  lighting systems currently show as three tiers, and the warranty and
  financing terms are still placeholders pending Zac's numbers.
