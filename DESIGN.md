# DESIGN.md — Brytr Co

**Trade:** Permanent outdoor lighting (installed architectural LED). Not in `industry-presets.md` —
row derived below using the preset rules.
**Service area:** Omaha, NE metro + Lincoln + eastern Nebraska + Council Bluffs, IA. 18 named cities.
**Media status:** Real photos exist (Zac's Google Drive albums + Dropbox drone footage) but are not
in this environment yet. Every photo slot is a real `next/image` driven by `content/images.ts`.
Until files land, slots render as designed editorial frames with the intended subject named — never
a gray box, never stock, never AI.
**Brand equity to honor:** Existing logo is black + yellow.
`BYRTR-LOGO-Black-and-Yellow.png` and `BRYTR-LOGO-WHITE-Y-1024x453.png`. Existing hero copy worth
keeping: "Permanent smart exterior lighting for Omaha homes." / "Disappears by day, wows by night."

## Overview

Brytr installs a permanent aluminum channel into the eave of a house, loads it with individually
addressable LEDs behind a diffuser, and hands the homeowner an app. The channel is invisible from
the street in daylight. At night the house can be warm white for a dinner party, Husker red on a
Saturday, orange on Halloween, or off. Zac Van Buren and Sam Greguska run it with W2 crews, not
subcontractors, and they carry both the premium system (Haven Evolution) and the value system
(Jellyfish) — which means they are the rare installer with no incentive to lie about which one a
given house needs.

The site should feel like the product: quiet and near-invisible in its light state, then genuinely
theatrical in its dark state. The feeling to produce is *restrained hardware confidence* — this is
a permanent building material, not a seasonal decoration. It should read closer to a lighting
manufacturer's product site than to a holiday-lights contractor.

## Signature

**The one thing this site is remembered by: The Dusk Line.**

Derived from: the physical work and the tagline in the same stroke. Brytr's product promise is that
the hardware disappears by day and performs at night, so the signature is a single 2px amber line
that *is* the light channel, and it does exactly two jobs:

1. **As a vertical line** it is the draggable divider on the hero. Two exposures of the same house
   at the same angle are stacked in one frame — daylight above, lit night below. Dragging the amber
   line across the house turns the lights on. The gesture is the value proposition.
2. **As a horizontal line** it is the same element rotated: the lens edge of a channel in
   cross-section. It caps the icon container, and it appears as a full-bleed section edge at
   **exactly two places per page**, no more. Overused, a signature becomes wallpaper.

Where it appears: the base edge of the hero, the drag handle in the Scene Wipe section, the icon
container top edge, and at most two section edges per page.
Where it does NOT appear: everywhere else. One bold move, everything else quiet.

**Icon container** is the channel in cross-section: a 56px tile with the top two corners squared and
the bottom two rounded at 12px, carrying the 2px amber lens line along its top edge. Looking at the
end of a piece of extrusion. This is the ONE place a soft corner is allowed.

### Hero (revised after the first review)

The hero is **one full-bleed photograph** with short, keyword-forward type on the left over a scrim,
and the quote form as a solid card on the right. Layout follows freedomexteriorsusa.com, which is
the reference the client specified.

The first build got this wrong in a way worth recording: it put the photograph inside a rounded card
in a right-hand column, with three spec boxes stacked beneath it. That is a dashboard, not a hero —
and a photo treated as a widget is one of the clearest tells of a generated site. The draggable
warm-white/game-day wipe that used to live in that card is now its own full-width section
(`components/sections/scene-wipe.tsx`), where it reads as a deliberate device rather than as hero
furniture.

## Colors

Pulled from the material and the environment of the work, per the preset rule — not from a color
wheel, and not from the existing site's defaults. The material is anodized aluminum extrusion and a
warm 2700K LED. The environment is a roofline against a night sky and a limestone-and-siding
Nebraska street in daylight. The logo's yellow is the bridge between the two, so it earns the accent
slot honestly rather than by decoration.

| Token | Hex | Role |
|---|---|---|
| `--primary` | `#111820` | Night sky above a lit roofline. Dominant, ~60%. |
| `--secondary` | `#4A5560` | Anodized aluminum channel body. Supporting, ~30%. |
| `--accent` | `#F5C518` | The logo yellow / warm LED at full output. ~10%, **CTA only, never decorative.** |
| `--neutral` | `#F1EDE4` | Warm limestone, the daytime state. Light section background. |
| `--foreground` | `#0C0F13` | Near-black text. |

Two support surfaces for section rhythm, so the page never runs three light or three dark sections
in a row and never needs pure white as a large field:
`--surface-raise #1A222C` (elevated dark, cards on night) and `--neutral-deep #E7E1D4` (second warm
neutral). White is for cards only.

Rationale: a lighting company that renders itself in light-mode-blue-and-white is arguing against its
own product. The dark surfaces are the night state the product exists for; the warm neutral is the
daylight state where the hardware disappears. Amber is the light itself, which is why it is
restricted to the actions we want taken.

Contrast: verified with APCA, not estimated. See `npm run contrast`. Every body pair ≥ Lc 75 and
≥ 4.5:1 WCAG.

## Typography

Three roles. Display is used with restraint — hero and H2 only.

| Role | Family | Usage |
|---|---|---|
| Display | **Archivo** 700/800 | Hero + H2 + H3 only. `-0.028em` tracking at display sizes. |
| Body | **IBM Plex Sans** 400/500/600 | All body copy, 1.6 line-height. |
| Micro-label | **Archivo** 700, uppercase, `.label` | Eyebrows, spec keys, figcaption tags. |

**TWO FACES. That is the whole system.** Archivo for headings and micro-labels, IBM Plex
Sans for everything else. There is no third face and no utility face.

IBM Plex Mono used to hold the numbers — phone, prices, review scores, spec values. It
survived three rounds of review and the client kept spotting it: "that very robotic
font", "it looks like we're using three or four different fonts." Both true. A monospace
face in a stat tile reads as a terminal, and mixing three families on one page is itself
the tell. `.u` still exists but now only asks for tabular figures, so numbers stay
column-aligned in spec tables without changing typeface.

**Revised after the first review — the original pairing read as generated.** Chivo (display) and
Figtree (body) were both too soft: wide apertures, round dots, generous shoulders. Figtree in
particular is a geometric sans in the Poppins family, and Poppins is the single most recognisable
body font on AI-built sites — it was the thing that made this site feel machine-made on sight.

Archivo replaces it on display: a grotesque with squarer terminals and tighter shoulders, which
holds a 62px hero without looking friendly.

Body went through two attempts. Barlow was the first, and the client still read it as generated —
correctly: Barlow is one of the most-used faces in web templates, and its narrow, slightly rounded
letterforms read webby at 17px. The body face is now **IBM Plex Sans**, chosen for a systemic
reason rather than a taste one: the utility face is already IBM Plex Mono, so prose and numbers now
come from one family. Three unrelated Google fonts is itself a template tell; two siblings plus one
display face is a system. Plex Sans is also wider and more open than Barlow, with enough character
in the `g` and `a` to not read as a default.

Do not reintroduce Barlow, Chivo or Figtree.

**The mono face had crept onto ~50 decorative labels** — every eyebrow, every figcaption
tag, every spec key. Monospace on a label is its own techy tell, and it was what the client
kept pointing at even after the body face was fixed. Mono is now restricted to things that
are literally numbers; labels use `.label` (Archivo 700 uppercase). If a label ever needs
the mono face again, it is because it contains a figure. IBM Plex Mono makes every real number on the
site — 1.2M lights, 402-810-3973, linear-foot pricing — read as data rather than as marketing.

Modular scale: **1.2** (dense, not airy — this site is a lot of pages with a lot of substance).
Banned and unused anywhere: Inter, Roboto, Roboto Mono, Open Sans, Lato, Poppins, Montserrat,
system-ui, Space Grotesk, Geist, Instrument Serif.

## Copy rules

Three rules, all from client review, all absolute.

**No numbers in a heading.** A heading paints a picture; it does not count the items
underneath it. `Eleven ways to light an Omaha property` became `Every surface worth
lighting on an Omaha property`. `The eight questions we get every week` became `The
questions we get every week`. `One roofline, 365 nights a year` became `The same
roofline, every night of the year`. This applies to every `h1`, `h2` and `h3`, in
components and in `content/*.ts`. Numbers still belong in stat tiles, spec tables and
body copy — set in the mono utility face, where a figure is the point.

Why it matters beyond taste: a counted heading dates instantly. "Eleven ways" is wrong
the moment a twelfth service is added, and the count is already visible in the grid
below it, so the heading is spending its only line on information the reader can see.

**Body copy never sits beside a heading.** Eyebrow, then title, then lede, stacked.
`SectionHead` briefly split into title-left / lede-right to fill a 1600px container —
that reads as a magazine deck, breaks the vertical rhythm of the page, and was a lazy
substitute for having enough content. Width gets filled with content. A form or a
photograph may sit beside a heading; a paragraph may not.

**No em dashes anywhere a visitor can read.** Not the character, not `&mdash;`, not a
unicode escape. Client instruction, and it is a house style rather than a preference
about one sentence, so it is a gate: `npm run emdash`, wired into `npm run check`.

The gate is `scripts/em-dash.mjs`, and the thing worth knowing about it is that a flat
grep is useless here. This codebase carries more prose in its comments than on its
pages, and those comments are full of em dashes: a plain search reports 336 hits, 77 of
which are copy. So the script walks each file as a character stream, tracks whether it
is inside a line comment, a block comment, a quoted string or a template literal, and
reports only what a browser would render. Comments are exempt. Documentation is exempt.

Replacing them is not a substitution. A dash does different grammatical work in
different sentences, and swapping all of them for one character leaves comma splices
across the site. Three cases, and it is worth knowing which one you have:

- It introduces an apposition or a list, so a colon: `all of it on one channel`.
- It hangs a dependent clause off the end, so a comma: `, which is the only thing that
  makes any of the rest of this checkable`.
- It joins two independent clauses, so they become two sentences: `Nothing else goes
  into it. There is no design fee`.

One case was not punctuation at all. A cell in the pricing table used a bare em dash as
a glyph meaning nothing happens in this year. An en dash there would be the same mark
under a different name, so it is a drawn 14px rule instead, which sits better than a
character hanging on a text baseline.

## Layout

Freedom Exteriors' section skeleton (the client-approved layout reference) at Phoenix Roofing's
density (the client-approved fullness reference), rendered in Brytr's own brand. 18 content sections
on the homepage, no archetype twice in a row, no background token twice in a row, and never more
than two consecutive light or two consecutive dark sections.

```
 #  ARCHETYPE                       BG            FREEDOM SLOT
 ─  ──────────────────────────────  ────────────  ─────────────
 1  urgency strip (thin, solid)     accent        —  (Phoenix)
 2  sticky header                   primary       —
 3  HERO signature-device           photo         slot 1
      (The Dusk Line day/night wipe)
 4  asymmetric split: form + stats  neutral       slot 2
 5  proof rail (credential marks)   primary       —  (Phoenix)
 6  bento grid: 11 services         neutral       slot 3
 7  material showcase split         neutral-deep  slot 4
 8  4-up feature grid + bridge card primary       slot 5
 9  SCENE RAIL (media + chip rail)  surface-raise slot 6
10  asymmetric split reversed: app  neutral       —
11  founders: 2 portraits + story   neutral-deep  slot 7
12  comparison table                primary       slot 8
13  service-area map + city tiles   neutral       slot 9
14  tabbed project gallery          surface-raise slot 10
15  CTA band (short breather)       primary       slot 11
16  numbered process row, 5 steps   neutral       slot 12
17  reviews, 6 real, mixed length   neutral-deep  slot 13
18  financing split + second form   primary       slot 14
19  FAQ accordion, 8 rows           neutral       —  (Phoenix)
20  final CTA band + full form      neutral-deep  slot 15
21  footer, 5 columns               primary       —
```

Adjacency check: no archetype repeats adjacently; longest light run is 2 (6–7, 10–11, 16–17, 19–20);
longest dark run is 2 (8–9, 14–15, 17 is light so 18 stands alone).

Container: **1600px** (`--container: 100rem`), and actually filled. It was 90rem, which left
roughly 240px of dead gutter each side on a 1920 monitor and made the whole site read thin —
the client's words were "a lot of blank space on the sides."

Widening a container does not by itself fill it. `SectionHead` therefore splits at `lg` into
two columns — title left, lede right, baselines aligned — because a left-aligned title with a
narrow paragraph beneath it leaves the right half of a wide container empty. That single change
did more for density than the width did. Grid: 12 col. Spacing: 8pt base,
broken deliberately for hierarchy — primary elements are larger and heavier rather than uniformly
padded.

### Fullness rule — the client's, stated three times

**A section is full because it has more to say, not because one element got scaled up.** Every time
a section has read "lazy" to the client it was the same move: one photograph or one heading enlarged
to occupy the space that should have been carrying additional pieces.

Caught and corrected, in order:

1. Container 90rem to 100rem *plus* a bigger H1 — the width was right, the type scale was not.
2. The systems split: one 21/9 photograph with a caption strip → a photograph at 4/3, a how-it-goes-on
   list, and a spec table, all the same height.
3. The project gallery: one 16/10 lead tile spanning 2x2 beside two small ones → six equal cells,
   five photographs and a detail cell, two even rows.
4. The service-area map: a fixed 34rem box beside eighteen city tiles, which left a dead band under
   the map → both columns are flex columns, the map takes the remaining height, and the legend and
   route notes below it are content, not packing.

Test before shipping a section: **count the pieces, then count the pieces the reference has.** If
ours is fuller only because our elements are larger, it is not fuller.

### The icon language (second generation)

The first set was hand-drawn, had no lucide in it, and still read as templated — the client
called it, and a contact sheet made it obvious why:

1. A third of it was the standard icon vocabulary: clock, shield, eye, lightning bolt, credit
   card, clipboard, stacked squares. Drawing a clock yourself does not make the clock yours.
2. Another third were abstractions that collapsed into each other — four different "three
   horizontal bars, one amber" marks meaning install count, two tiers, hardscape and fascia
   mounting, indistinguishable at 24px.
3. Not enough detail to survive at the size they were used.

The rules the set is drawn to now:

- **Every icon is a physical object from this trade.** Fascia board, channel section, gable,
  path light, wall course, reel of channel, service van, hard hat, tape measure, ladder,
  storefront parapet. Where a concept has no object — scheduling, verification, financing —
  draw the moment it happens to a house instead.
- **Amber appears ONLY where light comes out.** The lit diode, the wash on a wall, the glow
  under a soffit. Never a decorative accent, never a container, never a tick. This single rule
  is what makes thirty-four drawings read as one set.
- **Solid bodies at two ink weights** (0.85 near, 0.45 far) so each icon has depth instead of
  being an outline. No thin-line glyphs anywhere.
- **Shared primitives** (`Gable`, `Wall`, `Run`, `Section`) so the geometry is literally the
  same geometry across the set.
- **Distinct silhouettes** — checked on a contact sheet at 24px, 48px and in the channel tile.
- **Size matters as much as drawing.** A 24px icon floating next to a heading reads as a stock
  glyph no matter how it was drawn. Anything leading a card or a row goes in the channel tile
  at 40–48px; bare use is for inline list marks only.

Known weak spot to revisit: `IcHoaPaperwork` is still a document, because a covenant is a
document. It is the one icon in the set that could belong to another industry.

### Proof, and the numbers behind it

Review text is now real (`content/reviews.ts`) and the source of every line is recorded in that
file's header: five are the testimonials Brytr publishes on brytrco.com, verbatim; the rest are
quoted verbatim from the Google Business Profile with the reviewer's name and the age Google shows.
The rating and count come off the profile — **5.0 from 196**, read 20 Aug 2026. The client's own site
still says "135+" and their Instagram says "170+"; the profile is the live number and the one to
publish. It only goes up, so re-check it before quoting it anywhere permanent.

The profile also gave us two things the site was missing and one thing it was getting wrong:

- **A real street address** (13436 C St, Omaha NE 68144), now in the footer and in the LocalBusiness
  schema, matching the profile character for character. A site with no street address is the most
  common reason a listing and a site fail to associate for the local pack.
- **Google's own review tags with its own counts** ("professional team 46", and so on) — data, not
  our summary of what customers say.
- **Opening hours were invented.** "Mon to Sat · 8am to 6pm" appeared in the footer, the schema and
  four page templates, and nobody had ever confirmed it. All of it is gone; the schema now carries no
  `openingHours` at all. Ask Zac for the real week. Wrong hours in schema are worse than none.

Standing rule, restated because it nearly slipped: **never write a testimonial, and never publish a
number, an hour, a licence or a warranty term the client has not given us.** The empty state of every
proof block is designed for exactly this reason.

### What the home-page audit changed (and the rules that came out of it)

Three independent critics graded the page against the rulebook with no knowledge of how it was built.
The findings that generalise:

- **A grid of N identical cards highlights nothing and reads as machine output.** Eleven services in
  eleven identical cards, each with exactly three bullets, was 2,440px of one archetype. The fix is
  three objects, not one object eleven times: a few photographed leads, a compact rack for the rest,
  a wide band for the qualifying questions. Vary bullet counts — uniformity is itself a tell.
- **A list of things is a list, not a grid of boxes.** Eighteen city tiles became one framed rack with
  hairlines and right-aligned drive times, at a third of the height.
- **Count the archetypes down the page.** Seven card grids in a row is invisible while building each
  section and obvious in one full-page screenshot. Take the full-page shot.
- **Copy: contractions, and cap the "X, not Y" construction.** Prose with no contractions and ten
  antitheses reads as a language model even when every fact in it is true.
- **One glyph, one meaning.** Four craft icons were borrowing service-grid glyphs, so the gable mark
  meant three different things on one page.
- **A section that ends before its neighbour leaves a hole in the page.** Fill it with proof that
  belongs there, not with padding.
- **Never put a stat block beside a section heading to fill the right side.** The client's rule —
  nothing sits next to a heading — outranks the density instinct. Left-aligned heads with air to the
  right are correct here.

### Two sections in a row cannot be the same object

The hardware section's craft band was three dark panels sitting directly under three dark
tier panels — same silhouette, same surface, same rhythm. The client read the lower one as "a
copy" of the upper one, because it was. Fix: change the FORM, not the palette. The craft band
is now a single wide strip with its own header rail and internal hairline divisions, the
photograph bleeding to its edges, and the amber mark on the left instead of across the top.
Variety comes from silhouette and structure; introducing a new colour would break the lock.

### A section about lighting has to look lit

The process row went through four designs. Numbers, then a line with nodes, then five tidy
panels on a gradient — "still super boring. Doesn't fit the theme at all," and right. A
layout is not a lighting company. It now sits on our own twilight frame (the evening the
system came up on its own), scrimmed dusk-blue on the left to full night on the right, with
each stage carrying a length of real LED run — round diodes at the channel's own pitch, dim
at the walk-around and blooming at full output on the last panel. No backdrop-blur: frosted
glass is a UI trend, and slopcheck flags it. Plain transparency over the photograph does the
same job.

### Highlighting means ONE thing is highlighted

Three panels with identical amber rings highlight nothing — the client's read of the hardware
section was "I don't see how it's highlighting anything... just a lot of text, and a bit
disorganized." Two rules came out of it:

1. If a section presents options, one of them is the recommendation and it is the only lit
   element: brighter surface, full-strength accent edge, a tag, and the only filled button.
   The others are deliberately quiet.
2. Options are compared with the SAME rows in the SAME order, not with a paragraph each. The
   eye reads across a table; it cannot read across three blocks of prose. Where a section has
   supporting material under the options, put a labelled hairline band above it so it reads as
   subordinate rather than as three more things of equal weight.

### Hover is desktop, scroll is phone — and `(hover: hover)` cannot tell you which

The card spotlight was gated on `@media (hover: hover)` / `matchMedia("(hover: hover)")`. On the
client's touchscreen laptop Chrome reports `hover: none`, so that machine got the phone
behaviour on a desktop layout — two to four cards lighting up as he scrolled — and no hover
highlight at all. The hover rule is now unconditional and the scroll pass is gated on viewport
width below `lg`, re-checked on resize. Test both by width, not by media feature.

### The run (process section) — third design, and why

A timeline drawn *over* the content will always look like a mistake. Version one was
1-2-3-4-5 ("really bad and honestly just super lazy"). Version two was the amber channel line
run across the section with nodes clipped onto it — and the line landed on the stage headings
while the nodes read as five random squares floating above them. Both versions drew a graphic
on top of text it had no relationship to.

Version three makes the timeline **out of** the content: each stage is a panel with a length of
lit channel along its own top edge, and the segments brighten left to right — barely on at the
walk-around, full output with a glow on the night it turns on. A border on the element it
belongs to cannot land on anything else. Each panel also carries what the homeowner walks away
holding, which is the part a process section usually forgets.

### Header

Nav is centred in the HEADER, not in the space left beside the wordmark: the bar is
`1fr auto 1fr`, so the links sit on the page centre line whatever the wordmark and the phone
number do. `mx-auto` in a flex row centres in the remainder, which is what makes most sites
look almost-centred.

Anything with more than one page under it has a dropdown panel: lighting systems, services,
comparisons, service areas. Panels are full-bleed, not anchored to the trigger — a nineteen-city
menu hung under the last nav item runs off the right edge. Lists are generated from
`content/*.ts` via `content/nav.ts`, so the menu cannot drift from the pages that exist, and
that module is imported by SERVER components only: importing `content/services.ts` into the
client header would ship every word of body copy on 81 pages to the browser for eleven labels.

### Leaflet, two things that will bite again

- The map background is set with `.brytr-map.leaflet-container` — a **compound** selector, not a
  descendant one. Leaflet puts `leaflet-container` on the element we put `brytr-map` on, so
  `.brytr-map .leaflet-container` matches nothing and the map sits on Leaflet's own `#ddd`: a white
  slab in the middle of a night page for as long as a tile request is in flight.
- CARTO's dark basemap is built to sit under bright data on a white page. Dropped into a night-sky
  section it is black on black. Fix is three parts: labels on their own pane **above** the metro
  circle, both tile layers brightened in CSS (`.brytr-tiles-*`), and every city drawn as a lit pin
  with a real glow rather than a flat dot. A light basemap is not the fix — it fights the page.

## Elevation & Depth

Separation order: whitespace → background shift → elevation. Never a 1px gray border as the primary
separator.

Shadows are layered, ambient + direct, and differ on light vs dark surfaces because a dark-surface
card cannot be separated by a dark shadow:
- On light: `0 1px 2px ink/6%, 0 12px 28px -12px ink/16%`
- On dark: `0 18px 40px -18px black/70%` plus a `1px` amber-at-14% hairline, which is the only place
  a hairline does the work.

Section backgrounds alternate per the table above across four tokens: `neutral`, `neutral-deep`,
`primary`, `surface-raise`.

## Shape & Motion

Radius: **`2px` on inputs and buttons, `3px` on cards, `4px` on the largest panels. Nothing on this
site is a pill.** The icon container is the deliberate exception — squared top corners, rounded
bottom — because that shape *is* the signature.

**Revised after the first review.** The first build ran `--radius: 14px` with fully-round pills on
every chip and a 48px circular drag handle. 14px corners plus a soft shadow on a dark navy card is
close to a fingerprint for AI-generated design, and the client read it as "bubbly" within seconds of
opening the site. The reference (freedomexteriorsusa.com) is squared throughout. Extruded aluminum
channel has a machined edge; the shape language should say so. If a future change reintroduces a
radius above 4px anywhere but the icon tile, it is a regression.

Motion: one orchestrated staggered load on the hero only. Durations 150 / 240 / 400ms on a single
easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`). The scene rail and the Scene Wipe respond to input,
not to scroll. Everything respects `prefers-reduced-motion` — the badge rail freezes, the hero
settles to its night state.

No scroll-jacking, no pinned panels, no parallax, no sticky-scroll splits. The sticky header and the
mobile call bar are the only fixed elements.

## Icons

Container shape: the channel cross-section tile described under Signature.
Style: solid/duotone, `currentColor` primary form + exactly one amber accent detail, 32-unit grid,
drawn in a single pass so the set is cohesive.

Set (30). Subjects are the objects a Brytr tech actually touches, per the preset rule that specific
beats abstract:

*Services (11)* — whole-home channel run, roofline eave section, christmas roofline, soffit
cross-section, path light, retaining-wall course, pergola beam with bistro bulb, football with light
rays, scene calendar, storefront parapet, wrench over channel segment.

*App and control (4)* — scene swatch stack, clock with sunset line, house plan zones, dimmer slider.

*Trust and objection (9)* — install count, five stars, hard hat, other-brand channel with wrench,
two channel profiles stacked, verified eye with sun and moon, tape measure on eave, receipt with
repeating arrow, ladder on eave.

*Financing and process (6)* — card with bulb, lightning speech bubble, clipboard with approval
stamp, shield with filament, IP-rating droplet, day/night verification pair.

## Do's and Don'ts

**Do**
- Lead with the day/night duality in every hero on the site. It is the product and the brand at once.
- Put real numbers in the utility face: 1.2M lights installed, 177 five-star reviews, 25-year LED
  rating, linear-foot pricing ranges, drive times per city.
- Be honest about Jellyfish. Brytr sells both tiers, so the comparison pages must give the value
  system real reasons to win. That honesty is the site's single biggest trust asset — do not
  undercut it with visual favoritism on the head-to-head pages.
- Name every one of the 18 cities. Never "and surrounding areas."
- Show the channel itself in close-up at least once. Nobody in this trade shows the hardware.

**Don't**
- Never invent a review count, an award, a certification, a license number, or a years-in-business
  figure. Confirmed real: 177 five-star Google reviews, 5.0 average, 1.2M lights installed locally,
  W2 crews, founded by Zac and Sam.
- Never render a Husker-red or Halloween roofline with a CSS filter on a warm-white photo. That is
  showing a color this company never installed.
- Never recolor third-party marks (Google, BBB, Angi, Nextdoor) to amber. Official colors on a white
  pill, or a text pill instead.
- No pure white as a large section field. Warm neutrals only.
- The accent is for CTAs and the signature line. Never for body text, never as a decorative fill.

Site-wide bans (always): decorative geometry of any kind — rings, arcs, connecting lines, floating
dots, plus/dot grids, lattice, glow orbs, wavy dividers, icon wallpaper; sticky-scroll splits;
AI/stock photography; empty image slots; purple/indigo gradients; lucide icons in finished sections;
colored left-border card strips; badge-above-centered-H1; exactly-three-identical-cards.

## Plan critique — required before code

> Would I have produced this same plan for any other business in this trade?

First honest answer: **partly yes, and two things were wrong.**

1. **The palette was doing the least work.** My first pass was "black + the logo's yellow," which is
   defensible but is also what you get from eyedropping a logo and stopping. Any permanent-lighting
   company with a yellow logo would have landed there. The revision derives the whole system from
   the *material and the two states of the product* — anodized aluminum, 2700K LED, night sky,
   daytime limestone — which is why there are now two dark surfaces and two warm neutrals rather
   than one of each. The rhythm of the page is now the day/night cycle of the product, which is
   Brytr's specifically and not transferable to a competitor who sells the same hardware.

2. **The signature device was decoration pretending to be a system.** I had "an amber bar used as a
   section divider," which is a rule, not an idea — and worse, I had it firing on every dark-to-light
   transition, which would have put ten amber stripes on the homepage. That is wallpaper, which is
   the house's #1 hate wearing a brand's clothes. The revision makes the hero handle and the section
   edge *the same element rotated*, caps it at two per page, and ties it to the one sentence the
   client already says about themselves: disappears by day, wows by night. Now the device is doing
   argumentative work, not filling space.

Third change, smaller: I had specified Inter as the body face across an entire 8-prompt build spec.
It is the single most banned face in the rulebook and I had it as the default for 77 pages. Replaced
with a real three-role system where the utility face exists specifically because this site is full of
real numbers that should look like data.

What is genuinely non-transferable now: the Dusk Line gesture, the four-surface day/night section
rhythm, the both-tiers honesty argument on the comparison pages, and the hardware close-up. A
competitor installing identical Haven extrusion could not ship this page.
