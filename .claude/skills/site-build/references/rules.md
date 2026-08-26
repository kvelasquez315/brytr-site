# House Rules

Every rule here came from Kaiden's own corrections across 30 repos — 102 verbatim prompts and 916
real commits. Where a rule has a code in brackets it maps to a check in `scripts/check.mjs` or
`scripts/measure.py`.

Grade every screenshot against this list. Triage **Blocker / High / Medium / Nit**. Fix Blockers and
Highs. Do not chase Nits into over-engineering — subtraction beats addition.

---

## Absolute bans — any one of these is a Blocker

- **Em dashes.** Anywhere in copy. Comma, colon, or full stop. `[D1]`
- **Eyebrow / kicker headings.** The small label above a section title. Delete; never replace. `[D2]`
- **Sub-heading or sub-body text under a heading.** Heading goes straight into content. Kaiden calls
  this "random text" — *"it looks very jumbled, like we're just throwing on random words."* `[D3]`
- **Numbers describing a section.** No numbers in headings or descriptive labels. No leading-zero
  steps (01 / 02 / 03). No decorative stat figures. Use words. `[D4]`
- **Pills and badges.** Anywhere. `[D5]`
- **Motion.** No carousels, sliders, marquees, tickers, ken-burns pans, or auto-rotating anything. `[D6]`
- **Fades.** No gradient scrim, fade-to-dark, or opacity ramp over imagery. Solid ground or real
  photo. Sole exception: the minimum flat hero tint. `[D7]`
- **Parallel two-beat headings.** "Straight Talk, Honest Work." Headings describe the section. `[D8]`
- **Gimmicky slogan lines.** `[D9]`
- **Fabricated anything.** No invented stats, warranties, timelines, credentials, licence numbers,
  review counts, awards, or years in business. `[D10]`
- **Self-attributed company pull-quotes.** A motivational line the company credits to itself is
  filler. Use a real photograph. `[D11]`
- **Reviewer names** in review cards. `[D12]`
- **Stock glyph libraries.** lucide, Feather, Heroicons, react-icons. `[E2]`
- **Inline hex** outside `globals.css`. `[brand-lock]`
- **More than one hero component** in the tree. `[B1]`

## PASSING THE CHECKS IS THE FLOOR, NOT THE GOAL

Read this before anything else. The scripts can only prove a page is not *wrong*. They cannot make it
*good*. A page that clears every gate and is still boring has failed — and "boring and white" is the
failure mode this rule set produces when followed literally, because most of it is prohibitions.

So on every screenshot pass, ask two questions the scripts cannot:

1. **Is anything here interesting to look at?** If every section is a white band with a heading and
   some cards, no gate will catch it and the site is dead.
2. **Could this be any other company?** If yes, the skin is doing no work.

When a ban and "this section is lifeless" collide, **fix the lifelessness** — with photography, a
brand-colour ground, a distinctive container form, scale contrast, or the signature device. Never by
reaching for a banned pattern, and never by leaving it plain because plain is safe.

## Service cards — required content, not an icon slot

Cards are the most common place this goes wrong. A card that is a title and a sentence is a failure.
Every card carries **at least four** of:

1. A **real photograph** of that service — the default visual layer, and what replaced the banned
   generic icon
2. Title
3. One tight paragraph, 2–3 lines
4. A 3–4 item list of what's actually included
5. A price-from, timeframe, or warranty line, set in the utility face
6. A text-link CTA ("See gutter repair →")
7. Optionally: a hand-authored brand mark at **jhlincoln.com** quality — permitted and encouraged
   here, but never a stock glyph and never the only visual layer

**Cards in a grid must not all be the same size.** One feature cell larger than the rest is what
separates a designed grid from a template. Rows still fill evenly — no orphan card.

## Icons

Default is **no icons.** Carry meaning with real photography, type hierarchy, and designed container
forms. Where an icon genuinely helps, it must be hand-authored SVG at the quality bar of
**jhlincoln.com** — that standard is the permission, not a prohibition. "Make a graphic" means design
an illustration; it does not mean add icons. `[E1, E3]`

## Hero — closed set

Left: H1 → one short body paragraph → one blue phone button.
Right: bordered form, 4 fields (full name, phone, property address, what do you need).

Banned by position:
- **Above the H1:** nothing at all.
- **Below the button:** nothing at all.
- **Anywhere in the hero:** subheadings, second paragraphs, ledes, bullet lists, service lists,
  secondary CTAs, establishment dates, urgency lines, review stars, stat numbers, check icons.

Full-bleed background photo. Heading block left, form right. Fills the viewport on desktop — the next
section must not peek at the fold. H1 large, two lines, Title Case, never ALL CAPS, no background box,
side-aligned. Identical on every page; only image and wording change. `[B1–B10]`

**Hero photos:** wide landscape, no people, bright enough for white text, undistorted, unique per
page. **Always choose from a rendered contact sheet with lettered options.** Picking from a written
description has been rejected every time.

## Trust banner

Directly under the hero on every page. Thin, centre-aligned, small height — with large type inside.
Raising type size must not grow the banner. One lead figure that is actually the point, a supporting
rail, one line of copy saying what it adds up to. Never a row of equal-weight numbers.

## Page order

Hero → trust banner → image + value-prop + CTA → 3–4 image-led sections → text-heavier sections →
form closer.

- First 3–4 sections after the hero are **image-led only** — lead capture, CTAs, pictures, value
  props. No text-heavy section in those slots. `[A2]`
- **800-word floor on every page**, met by **adding sections**, never by fattening one. No section
  may hold more than ~35% of the page's copy. `[A3]`
- Interior pages inherit the home page's **design language** — component forms, radius, type
  treatment, image density, colour rhythm — without duplicating its layout. `[A5]`
- Interior pages compose only from components already in the shared library.

## Colour distribution — the fix for "boring and white"

Requiring adjacent sections to differ is not enough: white → off-white → white passes and the page
still reads as one pale field. So the page as a whole is measured. Per page: `[F6]`

| Requirement | Value |
|---|---|
| Light grounds (L\* > 90) as a share of page height | **≤ 55%** |
| Sections on a brand-colour or brand-dark ground | **≥ 2** |
| Full-bleed photograph bands | **≥ 1** |
| Distinct grounds in rotation | **≥ 3** (not just white/off-white) |

Precedent: fixing "it's very beige" on brytr-site meant sweeping 35 sections — beige 53% → 40%,
white 0% → 21%, with cards recoloured to stay contrast-safe. A distribution, deliberately set.

## Section form variety — the fix for "they all look the same"

A page must not be one layout repeated. Every section has a **form**, and the page needs range: `[F7]`

`full-bleed-photo` · `split-left` · `split-right` · `grid-3` · `grid-4` · `feature-bento`
(one large cell) · `colour-band` · `overlap-card` (straddling two sections) · `map` · `accordion` ·
`gallery`

- A page with 6+ sections uses **at least 4 distinct forms**
- **Never the same form twice in a row**
- Splits alternate direction down the page and use the 0.9/1.1 ratio

## Cross-site variation — the fix for "every site is identical"

Structure is fixed; the **skin** is what makes each site its own. Log every build's skin decisions in
`skin-log.json` at repo root:

```json
{ "client": "dgr-painting", "radiusBase": "0.625rem", "displayFont": "Fraunces",
  "bodyFont": "Karla", "accent": "#c8102e", "groundRotation": ["white","navy","offwhite"],
  "sectionForms": ["full-bleed-photo","split-left","feature-bento","colour-band"],
  "signatureDevice": "roller-edge motif as section divider" }
```

A new build must differ from the **last three** logged skins on at least **three** axes. If it
doesn't, the brand work hasn't been done — go back to `DESIGN.md`. `[M4]`

## Designed vs undesigned

A section is **undesigned** if it is heading + paragraphs in a box. That is a build failure, not a
nit. To count as designed it needs at least **two** of:

1. a real photograph, background image, or custom graphic
2. a ground colour shift from its neighbour (dE ≥ 10)
3. a non-prose content form (cards, map, gallery, table)

Plus: **container form must vary between sections.** Not every section is the same full-width
rectangle. Use overlapping cards, offset panels, images bleeding off the edge, framed insets,
asymmetric splits. A page where every section is the same box fails. `[F3]`

## Numbers that are not negotiable

From `measured-profile.md`:

| | value |
|---|---|
| Page container | `max-w-page` = 96rem / **1536px** — a named token, never a raw utility `[F1]` |
| Section padding | `py-12`–`py-14` desktop (48–56px), `py-10` mobile. **Not** 96–128px |
| Radius | `rounded-2xl` (18px) cards/panels, `rounded-full` chips/buttons. Squared needs justifying |
| Heading weight | `font-semibold`. `font-bold` needs justifying (refined reference: bold 3×, semibold 135×) |
| Body type | `text-sm` workhorse, `text-base` for lede. Section heads `text-3xl`. Hero `text-5xl`–`text-7xl` |
| Splits | `0.9fr/1.1fr` or `1.05fr/0.95fr`, alternating direction. Never plain 50/50 |
| Card grids | 3 or 4 columns, rows filled evenly — **no orphan card alone in a row** |
| Elevation | whitespace → ground shift → shadow. `shadow-sm` resting, `shadow-lg` raised. 1px grey border last |
| Line length | 45–95 characters |

## Section specs

- **Reviews** — Google-style cards, stars + Google G logo, no names, equal heights aligned in a row,
  no "read all N reviews" button. State the rating as a sentence.
- **FAQ** — stacked single-column accordion, one after another, never side by side. Short answers.
  Brand colour. FAQPage schema.
- **CTAs** — more of them, throughout every page.
- **Service area** — a real map with brand-styled pins, not a photo and not Leaflet's default blue
  marker. Verify tiles render unwatermarked by *looking at one* (CARTO returns HTTP 200 with
  "API KEY REQUIRED" burned into the image).
- **Process** — never a plain 1-2-3 timeline. Needs real design and brand treatment.
- **Comparison tables** — almost never build one.
- **Header** — nav centred, logo larger top-left, links to the money pages.

## Still-valid slop tells

Indigo→purple gradients, coloured glows or box-shadows, untouched shadcn defaults, glassmorphism,
pastel glows, decorative geometry (rings, arcs, connecting lines, floating dots, plus-grids, lattice,
glow orbs, icon wallpaper), sticky-scroll split sections, pinned side panels, heavy parallax, emoji as
icons, three identical feature cards with a thin-line icon on top, AI or stock photography, empty
image slots.

Backgrounds are solid colour or a real photo. Only.

## Per-client bans

Create `nexus.rules.json` at repo root. `check.mjs` enforces it. `[I1]`

```json
{ "neverMention": ["licensed", "insured", "bonded", "W-2", "subcontract", "founder names"] }
```

Observed real cases: licence/insurance/bonding (dgr), W-2 vs subcontracting and founder names (brytr).

## The two questions at the end of every pass

1. Would a design-conscious person think *"this is well made"* or *"a developer made this"*?
2. Would I have produced this exact page for any other business in this trade? If yes, the brand is
   undefined — go back to `DESIGN.md` and the signature device.
