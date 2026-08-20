BRYTR SITE — update 6   (supersedes updates 1-5)
================================================
Everything changed since the version in the repo.

UPLOAD
------
github.com/kvelasquez315/brytr-site -> Add file -> Upload files.
Unzip, drag the CONTENTS into the drop area (not the brytr-update folder
itself). Remove this README. Commit to main; Vercel rebuilds.

package.json and package-lock.json must land in the SAME commit — the font
dependencies changed again (ibm-plex-mono removed).

Optional: components/sections/hero-dusk.tsx is dead code, safe to delete.

THIS ROUND
----------
TWO FONTS, FULL STOP. The "robotic" font was IBM Plex Mono. I had it holding
numbers — review score, install count, the phone placeholder, spec values —
and kept defending that as principled. You were right twice over: monospace
in a stat tile reads as a terminal, and running three families on one page is
itself the tell. It is deleted. Archivo for headings and labels, IBM Plex
Sans for everything else. Numbers still align in spec tables (tabular
figures, same typeface). Verified in the browser: the page computes exactly
two font families. The leftover Chivo and Figtree files were still sitting in
app/fonts and are gone too.

HERO. Accent button is now the phone number — a second "get a consultation"
button was competing with the form six inches to its right. The stat row and
the "serving 18 cities" line are gone; both repeated the band below.

THE BAND. Reviews left, the three things we install right, one row, about a
third of its old height. Licensed/insured and W2 crews are off the trust side
completely.

  The Google mark needs the official file. Drop it at
  /public/logo/google.svg and set `googleLogo` in content/badges.ts. Until
  then the band draws its own five-star row (stars are not a trademark) with
  "Google" set in Archivo. Google publishes an asset pack for review
  displays — grab it from the Business Profile rather than saving one off a
  web page.

  ASSUMPTION TO CHECK: "three different things that are also offered" I read
  as Roofline / Landscape / Patio and pergola, using three of the custom
  icons. If you meant the three SYSTEMS instead (Signature, Basic, Landscape
  and Bistro), say so and it is a two-line change.

LENGTH. Twenty sections down to thirteen. I cut on duplicated DESIGN, not on
content value — the page had four lead forms, five card grids, five
two-column splits and two comparison sections.

  QuickQuote   form #2 of 4
  Financing    form #3, and really a /pricing subject
  CtaBand      the final CTA does this better
  SceneRail    same argument as the drag wipe with more pixels; all eight
               scene photos are on /gallery
  AppSplit     the app interface was DRAWN in HTML, not photographed. Comes
               back when Zac sends a screenshot.
  Reviews      content/reviews.ts is empty on purpose — no real review text
               exists — so it rendered as numbers the band already states
  VersusTable  same argument as the brand comparisons, twice

Comparisons went from nine cards to three plus a link (nine was a second
twelve-card grid), and the articles became a list instead of a third card
grid. Every layout archetype is now used exactly once.

Page height: 19,163px -> 13,542px.

STILL OPEN
----------
- Google logo file; Haven + Jellyfish official asset packs.
- A daytime photograph. Nothing in the archive is shot before dark.
- App screenshot, crew shot, founder portraits for /about, one commercial install.
- Real warranty terms, financing terms, review text. Placeholders on purpose.
