# Brytr Co — full-site audit

Four independent critics, one batch of pages each, grading screenshots against the taste
rulebook and against the site's own standing rules. None of them built the pages they graded.
30 templates shot at 1440 and 390, desktop pages sliced into 1800px bands.

I have separated what is real from what the screenshot harness invented, because two of the
four critics led with a false positive and one of them called it the worst thing on the site.

---

## First: two findings that are not real

**"Sixteen of the twenty-two gallery photographs are empty boxes."** They are not. Every
photograph on the site loads. `next/image` lazy-loads anything below the fold, and a Playwright
full-page screenshot never scrolls, so the harness captured the placeholder state and three
critics reported the same void independently and convincingly. I checked it directly: on
`/gallery`, 4 of 23 images are loaded before scrolling and **23 of 23** after. Same on
`/recent-projects`, 7 → 16.

The only images that genuinely fail are the 24 CARTO basemap tiles on the home page and
`/service-areas`, and they fail because this sandbox has no route to `basemaps.cartocdn.com`.
In production they load. That also explains the "dashed amber ring with floating dots and a glow
orb" reported as the site's worst decorative-geometry offence — that is the service-radius
overlay with the map removed from underneath it.

**"The sticky Call now / Free quote bar covers the hero form."** Also an artifact. A
`position: fixed` element renders exactly once in a full-page screenshot, at whatever scroll
offset it happened to occupy, so it lands in the middle of the image looking like a collision.
I checked what is actually covered at maximum scroll on three pages: nothing.

Everything below this line I verified before writing it down.

---

## The one thing that matters most

**The site breaks its own hardest rule roughly twenty-five times, in the largest type on the
page.** No numbers in headings, and no section may count the list underneath it. As built:

> "Most people arrive saying one of three things." · "Five years, side by side." · "Feet times a
> rate, then four additions." · "Three things that will not happen in your driveway." · "The same
> board, four times." · "Six things that are not standard in this trade." · "Six decisions that
> make us less money." · "Five questions worth asking any installer." · "Six of them, in full." ·
> "Six practices, not six adjectives." · "Four ways in, and they are not interchangeable." · "The
> eight we get most, answered here." · "Three questions no FAQ page can answer." · "Nine rows, and
> what each one actually costs you." · "Eight pages, but only one of them is a choice." · "Three
> houses, and what we would put on each." · "Ten things sold as permanent lighting in this metro."
> · "Nine pages, three different kinds of argument." · "The same fixture, twenty-two ways." ·
> "Eighteen towns, and the drive to each one." · "10 subdivisions, and the ones next door." ·
> "Three finished systems, photographed on site." · "The three questions that decide it."

Plus the literal counters: `/faq`'s five category headings each print "N questions" and the jump
bar prints all five counts again; `/gallery` prints "· 3 shots", "· 7 shots" five times; the blog
chips print their counts in amber.

Every one of these is load-bearing. Add a seventh practice and the heading lies.

**And in four places the count is already wrong:**

| Where | Says | Actually |
|---|---|---|
| `/pricing` | "then four additions" | three additions — feet × rate, then corners, zones, tier |
| `/compare` | "Seven pages where we have a stake" | six cards |
| `/compare` | "Two we have no stake in" | one card |
| `/reviews` | "Six of them, in full" over a lede reading "five are the testimonials Brytr publishes, two come straight off the profile" | five + two = seven, six shown |

A page whose whole pitch is that it is more careful than the competition's cannot miscount itself
on screen.

---

## Boilerplate that leaked onto pages it does not fit

The `[slug]` templates print copy written for the general case onto pages where it is false. This
is the worst category on the site, because each one is a reader catching us out.

- **`/services/repairs-and-service`** opens by telling a customer with a dead run: *"It is
  installed once, by our own crew, and it stays on the building. Nothing goes up in November and
  nothing comes down in January."* That is verbatim from the new-install page.
- **`/lighting-systems/app-and-controls`** is a component, not a tier, and the template sells it
  like one: it closes the pricing panel with *"Two tiers means one of them is wrong for your
  house. We will tell you which."*, footnotes the spec table *"rated life and weather ratings are
  the manufacturer's published figures"* over a table containing neither row, asks *"How long does
  App and Controls take to install?"* and answers *"Most residential jobs are a single day"*, and
  carries a "2 tiers" stat in the closer.
- **The city pages** claim *"Every one of the eleven services is available at this address"* above
  a grid of four.
- **Norfolk's covenant section** opens *"Most Norfolk properties have no restriction at all"* and
  then runs the four metro bullets underneath promising to pull your covenant before quoting and
  eat the cost if the board refuses.

---

## Three templates that print the same page twice

**`brytr-signature` and `brytr-basic`.** Not "similar" — the lower halves are byte-identical
files. Above that: the spec-table subhead, the entire pricing panel including all four "not
paying for" rows and its closing line, the section intro, the caveat card's kicker, the whole
"one of two things that go on a house" block, and the first two FAQ answers are all verbatim
shared. These are Brytr's own two tiers, the single most important choice on the site.

Worse: **Basic's spec sheet contains no specs.** Where Signature gives 4 in., IP66, 25 years,
"1 to 100 percent per zone", Basic gives "Wider than Signature", "Shorter than Signature",
"Supported, fewer", "Value" — in a table headed "spec by spec" and footnoted "nothing rounded up
in either direction." A real admission gives you the figure. This gives you an adjective and a
reassurance, and the concession is styled as the subordinate right-hand column on both pages.

**`/services/permanent-outdoor-lighting` and `/services/repairs-and-service`.** Three whole
sections and all nine FAQs verbatim, in the same order, with the same open first answer.

**The city pages.** The first 40% is genuinely three different arguments — Omaha's subdivision
rack, Council Bluffs' proof that six Nebraska towns are further away than Iowa is, Norfolk's
route-day explainer. Credit where it is due. Then from "What [city] books" onward all three are
one page: the covenant block word for word, the same nine FAQs, the same glance card, the same
closer. And the shared 60% contains the worst density on all three pages, so the reader's lasting
impression of every tier is the same empty right column.

---

## Density

- **`/faq` runs an accordion in an 870px column, leaving roughly 540 × 3400px of dead
  background beside it** — the largest blank area on the site by an order of magnitude, on its
  longest page.
- The FAQ row on all three city pages leaves a quarter-page void, identically.
- `/lighting-systems/app-and-controls`'s "What it does well" panel holds two rows against a
  neighbour's five, and both rows are jokes rather than substance.
- `/reviews` finishes its social proof on a lone card in a wide row.
- `/compare` puts one card in a three-column grid, then two cards in another.
- `/warranty`'s five questions are five consecutive half-empty rows.
- The blog's three-column grids are ragged in three of four groups.

---

## Amber

The rule is that amber marks where light comes out. Across the hardware and comparison pages a
critic counted roughly twenty distinct amber roles and **zero** where light is leaving a fixture.
Some of that is over-literal — an accent colour has to do accent work, and the home page the
client signed off uses amber for eyebrows and link underlines. But two subsets are indefensible:

**Amber dressing a rival.** The table column rules bracketing the "Hung each season" column on
`/services/permanent-outdoor-lighting`. The amber "10 ladder trips" figure on `/pricing` — the
competitor's number, in our colour, at 48px. The amber divider heading "Two we have no stake in"
on `/compare`. The amber link on the Jellyfish-vs-Gemstone card, while the card next to it —
the one we actually compete in — gets a plain white link.

**Amber as ornament.** A 1375px dotted amber bar across the top of a text strip on `/pricing`.
Dotted amber top rules on home's five process cards. Vertical dotted amber lines running down
the inside of `/services`' three cards, connecting nothing.

**And one glyph, two opposite meanings.** The amber tick heads "Covered" and its grey twin heads
"Not covered"; same again for "What happens" and "What does not". Two columns badged identically,
distinguished by colour alone — which also fails for anyone with a colour deficiency.

---

## Copy against picture

Every hero in the hardware batch is lit blue, cyan, magenta or red, captioned "Photographed on a
Brytr install", while the copy on the same screen argues that **warm white is the setting most
houses sit on all year**. The product's own argument is being illustrated with six pictures of a
nightclub. On `/recent-projects` a thumbnail labelled "Everyday warm white" shows a house lit hot
pink.

Two smaller ones in the same family:

- The same shot — the blue-lit ranch across a pool — is on `/gallery` and `/recent-projects`,
  while `/recent-projects` explicitly promises not to rotate the same photographs.
- **Norfolk's disclaimer is the most creditable sentence on the page and is styled like a legal
  footnote.** "We have not shot a job in Norfolk yet, and we are not going to caption a metro
  house as one" sits in the same slot, at the same size and colour, as Omaha's ordinary photo
  credit. A reader skimming both sees no signal that one is a disclosure.

---

## Smaller, real, and worth doing

- **About 160 British spellings** in copy for an Omaha tradesman: *colour* ×56, *centre* ×35,
  *labour* ×17, *mitred/mitre* ×20, *neighbour/neighbourhood* ×23, *organis-* ×10, *aluminium* ×6,
  plus *swarf* and *tyre*. Both spellings appear inside single components — a heading reading "One
  colour, every zone" over an image overlay reading "One color, every zone". The one American
  instance makes it look like a half-finished find-and-replace.
- **The legal pages step 160px left below the fold.** Measured: H1 at x=192, body at x=32. The
  type hero is capped at 70rem while the body uses the full 100rem shell.
- **The three-column comparison table on a phone** shows one brand column clipped mid-word and
  the second brand entirely off-screen, with no scrollbar, fade or swipe hint — then footnotes a
  column the reader never saw. `/pricing` has the hint; the compare pages do not.
- **"See it on your house before you buy."** is the closer on eleven pages and the H1 of
  `/free-design-consultation`. It cannot be both the universal sign-off and one page's
  proposition.
- **The form's two select fields render their placeholders in solid dark text** at the same weight
  as a real value, so "Select your city" and "Roofline" look already answered. The two fields that
  need a decision are the two that look decided.
- `/contact` ends on two bands that both ask you to get in touch, inside one background with no
  break — on the page where the reader already arrived intending to make contact.
- `/faq` asks and answers seven of the same questions twice, and "How long does permanent lighting
  take to install?" appears under *Product and specs* while "How long does an install take?"
  appears under *Install*.
- The blog post is billed six minutes and runs about 300 words.
- `"Google, 20 Aug 2026"` is a hard-coded read date, already stale, presented as evidence.

---

## Claims to put back to the client

Some of these are already sourced in `content/site.ts` and some are not. Every one needs a yes
from Brytr before launch:

- **"1.2M lights installed locally."** Sourced in `content/site.ts` as a client figure, and it is
  plausible if "lights" means individual diodes — a 300ft roofline at 4in spacing is roughly 900
  of them. But a homeowner reads "lights" as fixtures and does the arithmetic, so it needs its
  unit made explicit or it reads as invented.
- **"Financing available"** appears in every closer and in the footer nav. No terms were supplied.
- **"1 day typical install"**, stated three different ways.
- **"Same-day reply, most days"** and the form's "We reply the same day."
- **"2026 holiday slots are filling. Book by November 15."** — a scarcity claim with a date.
- **"W2 / our own crews"** — a payroll claim, and jargon in a stat grid where a homeowner has to
  decode it.
- **"5.0 from 196 Google reviews"**, asserted a dozen times across the site.
- The **six named testimonials** on `/reviews`.

`/warranty` is the model for how the rest of these should read: it explicitly refuses to publish
component year counts and pushes the durations onto the written quote. No invented warranty terms
appear anywhere on the site.

---

## What came back clean

Worth recording, because it is the part that does not need touching:

- **No decorative geometry** on any page once the map tiles are accounted for. No rings, arcs,
  connecting lines, dot or plus grids, lattices, glow orbs or icon wallpaper. Every ground is a
  solid colour or a photograph.
- **No glassmorphism, no glossy gradients, no pastel glows.**
- **Two typefaces throughout**, all 30 templates, no weight drift. One critic's only note on the
  typography was to leave it alone.
- **No placeholder text, no lorem, no broken links, no console errors** beyond the unreachable
  tile server.
- **Zero horizontal overflow on all 30 templates at 390px** — the spec table was pushing every
  system page to 656px inside a 390px viewport, found and fixed during this audit.
- `tsc` clean · `next build` 81 pages · contrast all 15 token pairs pass · slopcheck PASS.

---
---

# Second pass — the photography, and three more critics

The first audit found no decorative geometry, two typefaces, no placeholder text and zero
overflow, and it was right about all of that. It missed the thing the client raised the moment he
looked at a page below the fold: **twenty of the twenty-four templates carried exactly one
photograph — the hero — and then several thousand words.** An audit measuring density section by
section will pass a page that is a document, because every section on it is correctly built.

Three more critics ran after the photography work. None of them built anything. Between them they
returned thirty-four findings. Nine were false positives, and I am recording those first, because
the ratio matters more than the count: roughly a quarter of what an independent critic reports
about a screenshot is an artifact of the screenshot.

## The false positives, and how each was killed

**"The service-area map is the worst thing on the site — a dashed amber ring, floating dots and a
glow orb on an empty field."** Two critics, independently, and both led with it. It is the
service-radius overlay with the basemap missing, exactly as the first audit recorded. But calling
it an artifact twice and moving on was the wrong response, because *the failure is silent and it
will happen to real readers* on any network that cannot reach the tile CDN. So it is now a real
fix rather than a note: three tile errors tear the map down and put up a plain panel saying the
map did not load, the legend moved inside the component so it cannot outlive the map it describes,
and the copy that read "inside the dashed ring" now reads "within about half an hour of the shop".
Nothing decorative survives the failure.

**"The drag module's two halves do not line up — the stone cap steps 15px at the divider."**
Measured by normalised cross-correlation over integer shifts: best match at dx=2, dy=0 on a
1200px reduction, correlation 0.92. The two frames are registered to within two pixels. The
"step" is the lighting changing across the seam, which is the entire point of the device.

**"The right half is globally recoloured — sky (239,87,73) against (166,114,111), canopy (79,43,32)
against (13,11,10) — and the caption says nothing was recolored."** Sampling identical rectangles
in the two source files: sky differs by R+5 G0 B0, canopy by R+3 G0 B0, lawn by R+2 G0 B0. The
ambient scene is unchanged to within rounding and only lit surfaces differ. The critic sampled a
composited wipe, so they were comparing two different parts of the scene. The caption stands.

**"The hero photograph contains no permanent lighting."** It does — roofline, pergola fascia, wall
washers and fire bowls, all lit. The same critic's *other* point about that image was correct and
is dealt with below.

**"A row of amber dots along the top of each process card is decorative geometry."** It is the LED
run: 1.9px points on a 15px pitch whose opacity and glow climb from 0.42 to 1.0 across the five
stages, dim at the walk-around and full output on the night it turns on. Amber where light comes
out of a fixture is the one sanctioned use, and this is the site's signature device.

**"The cream alternation is a 4% step nobody will see."** The RGB delta is 10/12/16; the
*luminance* delta is 10.9%, a contrast ratio of 1.115. That is a legitimate soft band. The dark
pair steps 1.246. Neither is invisible; the critic measured the wrong quantity.

**"A heading and a lede in the left half with the right half empty, 18 times."** That is the
site's section-head pattern, and the client's own rule is that body copy never sits beside a
heading. Filling that space is the defect, not the space.

Plus two adjacency reports that were mutually exclusive conditional branches — only one of the
pair ever renders.

## What was real

**The hero type was sitting at 1.7:1 on bare photograph.** The worst finding of the whole audit,
and nothing in the toolchain could see it. The scrim ramp fell to 34% opacity by 38% of the width
and 8% by 56%, while the lede is capped at 62ch and runs to 52% — so the last third of every hero
paragraph stood on unprotected image. Measured by hiding the type and sampling the composited
background behind it: 1.73 on `/gallery`, 1.81 on `/about`, 1.87 on `/pricing`, 2.09 on
`/warranty`, 2.10 on `/recent-projects`, against a 4.5 floor. `npm run contrast` passed
throughout, because it checks a named foreground against a named surface and a JPEG is neither.
The ramp now holds above 80% out to 52% and the worst hero on the site is 7.13.

**Three photographs appeared twice each on the home page, and only thirteen appeared at all.**
Cause: two hand-maintained maps of article photographs, one in `content/blog-detail.ts` and one
local to `home-b.tsx`, which drifted the moment the archive grew. One source of truth now, the
twelve articles carry twelve distinct photographs, the nine service slots were repointed, and
every photograph on the home page is unique.

**The home hero was the same house as the signature drag module** — same property, same angle,
same fire bowl. The two most prominent image slots on the site showed one install, on a page whose
job is to establish range. The hero is a front elevation of a different property now.

**A photograph key that does not resolve renders nothing, silently.** The photo components return
`null` for an unfilled slot, which is right for a slot nobody has shot and indistinguishable from
a typo. Three pages were written against `crewRoofFascia` while the manifest called that slot
`crewWide`, so the crew photograph — the single most useful image a warranty page can carry — was
absent from three pages through a clean tsc, build, contrast run and slopcheck.

**Twenty-one adjacent sections shared a background**, across fourteen files: seven photograph
sections that picked a ground without looking at their neighbours, seven closers whose component
hard-coded its own ground so the page could not choose, and Reviews and MaterialsSplit sitting on
2,700px of identical warm neutral on the home page with no seam at all.

**The service template claimed every photograph was shot at night, and some are noon.** The strip
lede — "photographed on nights these were already running" — was a template constant above a set
of photographs that varies. On the repairs page all three are daylight and their own captions say
so. The section was calling its own images liars, on eleven pages.

**Structural voids in five templates.** A grid row with empty cells on `/gallery` (three groups
whose sizes were not multiples of three), `/reviews` (seven quotes in a two-column grid) and
`/blog`; `items-start` on two-column comparisons so the shorter card simply stopped, at 267px on
the system template and 176px on `/services`; `h-fit` asides that ran out a third of the way down
an accordion on twenty-nine pages; a 208px table-of-contents column holding two links beside six
hundred pixels of article, on all twelve posts; a four-column grid holding a three-item
neighbourhood list; and the service-page drawings stretched to 1328px, which scaled their own
internal margins into voids.

**Two closers on three pages**, plus the tier cards carrying a 4px amber bar across the top edge —
the coloured-strip-on-card tell, which slopcheck greps for as `border-t-4` and missed because I
drew it with an absolutely positioned span.

**Four headings counted the list underneath them.** This is the rule the client has corrected me
on most often and I broke it four more times in one session, three of them in headings I wrote
that day.

**The pair verdict, which is the finding that matters most.** Asked to compare two pages from the
same template, a critic said the service pages read as "one page with the nouns swapped — seven of
about ten sections string-for-string identical". That is still substantially true and it is the
deepest problem left on this site. What changed: the photograph section is now per-service, the
strip lede is per-service, one duplicated section was deleted, and the city pages' design section
is per band. What has not: the spec-card label, the "everything in the written quote" head and
lede, and the nearest-crews rail are identical on all eleven.

## What the toolchain could not see, and can now

Three gates were added, each for a class of defect that shipped clean through every existing check:

- `scripts/photo-keys.mjs` — fails on a photograph key that is not a slot in the manifest.
- `scripts/hero-contrast.py` — hides the hero type, samples the background it stood on, and
  reports the composited ratio at 1440 and 390.
- `scripts/section-rhythm.mjs` — fails on two adjacent sections sharing a background, exempting
  mutually exclusive branches.

`npm run check` runs all three alongside tsc, contrast and slopcheck.

## Still open, and said out loud on the site

No commercial install photograph, nothing outside the Omaha metro, no screenshot of the app, and
no portrait of either founder. `/recent-projects` lists all four as open and marks the three that
closed. The service template is still too close to a form letter.
