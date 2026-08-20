BRYTR SITE — update 8   (supersedes 1-7)
========================================
Upload: unzip, drag the CONTENTS into GitHub's uploader, commit to main.
package.json + package-lock.json MUST land together — leaflet was added.

Delete this file from the upload list. components/sections/service-map.tsx was
removed from the repo (replaced by service-leaflet.tsx); if it is still in
GitHub, delete it there — nothing imports it.

THE MAP — Leaflet, as you asked
-------------------------------
Real tiled basemap, amber pin on every town, dashed 30-mile metro radius, a
squared marker where the crews stage, town list on the left and map on the
right per the Freedom layout. CARTO dark tiles rather than the light grey
Freedom uses, because this site is a night palette and a bright basemap
fights it.

Three things worth knowing:
- Scroll-wheel zoom is OFF. A map that swallows page scroll is the most hated
  pattern in this category. Click once to interact.
- Leaflet ships white popups and blue links, which look pasted on over a dark
  palette, so its tooltips, zoom buttons and attribution are restyled to the
  brand. The OpenStreetMap/CARTO attribution is required — leave it.
- The tiles are third-party, so they will not render in my sandbox (no
  outbound network). Pins, radius and container all render. They will load
  normally on Vercel and on your machine — worth an eyeball on the deployment.

SYSTEMS SECTION — rebuilt, properly this time
---------------------------------------------
I listed this as "next pass" twice without touching it, which is why you saw
the same thing three times. The problem was structural: a left column with a
photo above a 2x2 of white cards, beside a right column of three more white
cards. Seven white boxes, and two columns whose counts did not line up, so
nothing aligned with anything. Now it is full-width rows, each internally
even — three tier panels inverted to the dark surface, the photograph full
width, then four craft details in a divided strip. Brand names read as part
of a sentence instead of a label parked where a logo belongs.

WHY BRYTR — on a photograph
---------------------------
You were right that it looked like a footer. It is the most important
argument on the page. Now a red-and-green roofline sits behind it, the claim
is set at near-hero size, and the four points are divided columns rather than
grey boxes.

BLOCKED ON YOU
--------------
- Google's mark: /public/logo/google.svg, then set googleLogo in
  content/badges.ts. From the Business Profile asset pack. I will not draw a
  trademark from memory and cannot pull one off a page.
- Haven + Jellyfish official asset packs, same reason. Their tier panels have
  the slot ready.
- A daytime photograph. Nothing in the archive is shot before dark.
- App screenshot, crew shot, founder portraits, one commercial install.
- Real warranty and financing terms.
