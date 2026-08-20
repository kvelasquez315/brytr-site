BRYTR SITE — update 7   (supersedes 1-6)
========================================
Upload: unzip, drag the CONTENTS into GitHub's uploader, commit to main.
package.json + package-lock.json must land together.

THE FONT — fourth pass, and the first one that fixed the right thing
-------------------------------------------------------------------
You flagged Plex Mono, then Barlow, then Archivo. Every screenshot you sent
had the same thing in common and I kept missing it: ALL CAPS WITH WIDE
LETTER-SPACING. The typeface was never the problem. Tracked-out uppercase is
a tech-brand tic — it reads machine-generated, and it is not how you speak to
a homeowner. Fifty-one labels across twenty-nine files are now small, bold,
sentence case, normal tracking. Checked in the browser: zero elements on the
homepage compute uppercase.

TWO BUGS, ONE ROOT CAUSE
------------------------
The new timeline gradient and the card-hover rule were both anchored next to
.tap-44, which lives inside a touch-device media query. So they only existed
on phones: the process section rendered near-white text on bare cream on
every desktop, and the hover highlight never fired. Same mistake as the drag
handle bug two rounds ago. Fixing it also caught that the 44px touch targets
had leaked out of that query, which would have put invisible click-catchers
over every text link on desktop. Both pointer modes verified explicitly.

DONE THIS ROUND
---------------
Service area   A real map, drawn not embedded. Every town plotted from its
               actual coordinates, longitude compressed for latitude so the
               metro is not stretched. Drive-time rings at 30/60/90 miles.
               No roads or rivers — it is an honest service-area diagram, not
               a pretend survey. First attempt labelled all eleven metro
               towns and they collided into mush, so the metro is one amber
               cluster and the names are in the grid beside it. City tiles are
               dark now with the drive time in amber.
Timeline       The 1-2-3-4-5 row is gone. Rebuilt on the amber channel line
               with each stage a node on it, over a background that runs
               dusk-blue to full night left to right. No numerals.
Service cards  Amber outline on hover. On touch, the card highlights as it
               crosses the middle of the screen (IntersectionObserver —
               scroll-linked CSS animation is Chromium-only).
Blog           A photograph on every row.
Hero           New photograph, a different property — warmer and wider.
FAQ            Off the homepage, and the FAQPage schema with it, since
               structured data has to describe what is on the page. /faq
               still carries both.
Comparisons    Off the homepage. Your call was "pictures or delete it", and
               white cards with text was the whole problem. Eleven sections
               now.

NOT DONE YET — next pass
------------------------
- The systems section (Brytr Signature / Basic / Landscape). Still white
  cards, still uneven left-to-right. Needs the brand logos to do properly.
- "Why Brytr" four-up. Needs imagery behind it; I have the photographs.

BLOCKED ON YOU
--------------
- Google's mark. content/badges.ts has the slot: drop the file at
  /public/logo/google.svg, set `googleLogo`. Get it from the Business Profile
  asset pack — I will not draw a trademark from memory, and I cannot pull one
  off a web page. Until then the band draws its own five stars, which are not
  a trademark, and says "reviews on Google" in body text rather than faking a
  wordmark.
- Haven and Jellyfish official asset packs, same reason.
- A daytime photograph. Nothing in the archive is shot before dark.
- App screenshot, crew shot, founder portraits, one commercial install.
- Real warranty and financing terms.
