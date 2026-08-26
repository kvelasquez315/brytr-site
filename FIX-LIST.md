# Brytr Co — fix list

Measured on the live staging deploy at 1440px. Every number below is observed, not estimated.

## Scope: DO NOT TOUCH THE HOMEPAGE

The homepage passes every check — 40% light ground, 8% imageless, **zero** low-contrast adjacent
sections, 53 images, clean dark→white→cream rotation across 9 sections. It is the reference for this
site. Do not "improve" it. Every fix below is on **interior pages only**.

---

## 1. BLOCKER — lazy images render as solid black rectangles

On `/services/permanent-roofline-lighting`, **8 of 14 images** were `loading="lazy"` with
`naturalWidth === 0` at load, and two of them sat **in the viewport as solid black rounded
rectangles**, 726px wide. On a slow connection this page shows black voids where photos belong.

Fix, sitewide in the shared image component:

- Above-the-fold images: `priority` / `loading="eager"`. Never lazy in the first viewport.
- Every other image: placeholder must be a **neutral or brand-tinted tone, or a blur-up**, never the
  near-black surface colour. An unloaded image should read as a quiet panel, not a hole.
- Verify: `[...document.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).length`
  should be 0 for anything in the first viewport on load.

## 2. BLOCKER — the 12 service-area pages are one page with the town swapped

Fetched and compared four of them:

| Page | Sections | Words | Images |
|---|---|---|---|
| `/service-areas/elkhorn` | 10 | 1,115 | 10 |
| `/service-areas/millard` | 10 | 1,113 | 10 |
| `/service-areas/papillion` | 10 | 1,115 | 10 |
| `/service-areas/gretna` | 10 | 1,114 | 10 |

**Word counts within two of each other. Identical H2 sequence, only the proper noun changes:**

```
[TOWN] is a drive, not a route day. | The subdivisions here, and the towns next |
What [TOWN] books. | We handle the paperwork, not you. | How we design it in [TOWN]. |
Where else we are, near [TOWN]. | Permanent lighting in [TOWN]. | See it on your house before you buy.
```

That is near-duplicate content across 12 URLs — a ranking liability as well as a design one.

**Fix — each page must carry things that are only true of that town:**

- Real named subdivisions and streets for that town, not a generic list
- A real map centred on that town with pins, replacing the "Where else we are" text block
- At least one photo of actual work in or near that town
- Real drive time and crew notes for that town
- A different section *order* for at least half the towns — not just different words in the same slots

**If a town has nothing genuinely specific to say, delete the page.** Five real area pages outrank
twelve templated ones, and they stop looking mail-merged.

## 3. BLOCKER — sections with no visual at all, and trailing runs

### `/services/permanent-roofline-lighting`
Sections **2, 4, 5, 8** have no image, no graphic, no background image:

| Section | Height | Words |
|---|---|---|
| 2 — "What permanent roofline lighting actually is" | 478px | 133 |
| 4 — "Everything in the written quote" | 487px | 89 |
| 5 — "What you get for installing it once" | 619px | 182 |
| 8 — "Permanent Roofline Lighting: what…" | 680px | 151 |

Sections 4 and 5 are consecutive — 1,106px of unbroken text. **32% of the page has no visual**
(section 3 does have the eave drawing, which I've credited).

### `/service-areas/elkhorn`
**Six of ten sections have zero visuals — 45% of the page.** Worse, **sections 7, 8 and 9 run
consecutively with nothing at all: 1,759px.** The page dies exactly where the conversion should be.

| Section | Height | Words | Note |
|---|---|---|---|
| 2 | 140px | 20 | stat strip |
| 3 | 474px | 130 | subdivisions — should be the map |
| 5 | 649px | 175 | paperwork |
| 7 | 334px | 56 | "Where else we are" — should be the map |
| 8 | 679px | 136 | SEO block |
| 9 | 746px | 127 | closer |

**Rule to apply to the shared interior templates:** every section carries at least one of — a
photograph, a custom graphic, a map, or a real data form (spec table, comparison, gallery).
**Never two consecutive sections without one, and never a trailing run.** The last two sections
before the form especially.

## 4. The signature device exists and is used once

The eave cross-section drawing is the best thing on the site and appears on **one section of one
page type**. Service-area pages have **zero** graphics.

Build 3–4 variants of it from the same visual language — the run along a roofline, the diode
spacing, the colour range, the fascia detail — and place them across interior pages. This is the
cheapest possible fix for "every page looks the same," and the asset already exists.

## 5. Stacked paragraphs — 12 and 15 per page

`p + p` count: **12** on the service page, **15** on the Elkhorn page. Heading, paragraph, then a
second smaller grey paragraph underneath.

This is the "random text below the heading" rule. Fix it in the shared section-header component so
it can only render one body paragraph, then delete the orphaned second paragraphs from content.

## 6. Stat strip — equal-weight numbers again

Elkhorn section 2: `15 min · Drive from the shop · 6…` — 140px of equal-weight figures with nothing
ranked. Same defect as the trust banner. One lead figure, a quieter supporting rail, one line of copy
saying what it adds up to.

---

## Verify when done

```
node .claude/skills/site-build/scripts/check.mjs --fix-hint
python .claude/skills/site-build/scripts/measure.py --url http://localhost:3000 --paths / /services/permanent-roofline-lighting /service-areas/elkhorn /service-areas/millard
python .claude/skills/site-build/scripts/shoot.py --url http://localhost:3000 --out .shots/pass1 --paths / /services/permanent-roofline-lighting /service-areas/elkhorn
```

Then **open the PNGs and look at them** — especially the section crops for the middle and bottom of
each interior page, which is where the failures are. Commit to `staging`, never `main`.
