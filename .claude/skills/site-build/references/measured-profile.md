# Measured Design Profile

Extracted from Kaiden's two gold-standard repos. **These are observed values, not opinions.**

- `freedom-exteriors-usa-website` — 44 tsx, 12 pages, **17 commits** (near-original v0 output)
- `property-pest-control` — 109 tsx, 50 pages, **265 commits** (heavily refined)

The gap between them is the signal: it shows what Kaiden iterates *toward* once he starts fixing a
v0 site. Where they disagree, **property-pest wins** — it's the evolved one.

---

## The headline numbers

| Property | freedom-ext (v0-fresh) | property-pest (refined) | **Rule** |
|---|---|---|---|
| Container | `max-w-7xl` (1280px) ×27 | **`max-w-page`** ×102 | Named token, 1536px |
| Section padding Y | `py-16` (64px) ×25 | `py-12`(48) ×36, `py-10`(40) ×33, `py-14`(56) ×20 | **40–56px**, not 96–128 |
| Container padding X | `px-4` ×38 | `px-4` ×175, `px-5` ×48, `px-6` ×35 | `px-4` → `px-6` |
| Primary radius | `rounded-2xl` ×19 | `rounded-2xl` ×95, `rounded-full` ×93 | 2xl default, full for chips/buttons |
| Heading weight | `font-bold` ×74 | **`font-semibold` ×135, `font-medium` ×90, `font-bold` ×3** | semibold, not bold |
| Elevation | `shadow-sm` ×6 | `shadow-sm` ×60, `shadow-lg` ×27, `shadow-md` ×17 | Layered, used freely |
| Body size | `text-sm` ×69 | `text-sm` ×316, `text-base` ×50 | `text-sm` is the workhorse |
| Display sizes | `text-3xl`/`2xl`, `7xl` hero | `text-3xl` ×83, `2xl` ×60, `4xl` ×14 | 3xl section heads |
| Grid | `lg:grid-cols-2/3/4` | same + asymmetric `minmax()` fractions | see below |

---

## 1. Container — a NAMED token, not scattered utilities

`property-pest` uses **`max-w-page` 102 times**. `freedom-exteriors` scatters `max-w-7xl` 27 times.

**Rule:** one semantic token, `--max-page: 96rem` (1536px), exposed as `max-w-page`. No raw
`max-w-*` for page containers anywhere. This is directly greppable and becomes a build check.

Nested measure constraints stay utility-based and are legitimate: `max-w-2xl` (24×) and `max-w-xl`
(21×) for prose columns, `max-w-[38ch]` for measured line length.

## 2. Section padding is TIGHTER than the skill says

Current skill: *"Section padding: 96–128px desktop, 56–72px mobile."*
Observed in both gold standards: **`py-10` to `py-16` — 40 to 64px.**

The skill is prescribing roughly **double** the padding of the sites Kaiden actually likes. This is
almost certainly a contributor to the "too much blank space" complaint — the fix he kept asking for
was wider content AND tighter vertical rhythm, and the skill was pushing the opposite on both axes.

**Rule:** section padding `py-12` to `py-14` desktop (48–56px), `py-10` (40px) mobile. Deviations
must be deliberate hierarchy, not default.

## 3. Weight: semibold, never bold

The single clearest refinement signal in the whole dataset.

- v0-fresh: `font-bold` ×74, `font-semibold` ×23
- refined: `font-bold` **×3**, `font-semibold` ×135, `font-medium` ×90

Kaiden systematically removed bold. Heavy weights read cheap and generic; semibold plus size
contrast carries hierarchy instead.

**Rule:** `font-semibold` is the heading default. `font-medium` for sub-elements. `font-bold`
requires justification.

## 4. Radius — rounded, and more than v0 shipped

`rounded-2xl` ×95 and `rounded-full` ×93 in the refined repo, vs 19 and 7 in the fresh one. Kaiden
rounded things off aggressively during refinement. Confirms the "boxy looks wrong, make it rounded"
ruling.

Token scale from `freedom-exteriors/globals.css`: base `--radius: 0.625rem`, scaled
×0.6 / 0.8 / 1.0 / 1.4 / 1.8 / 2.2 / 2.6 → sm / md / lg / xl / 2xl / 3xl / 4xl.
So `rounded-2xl` = `0.625 × 1.8` = **1.125rem / 18px**.

**Rule:** `rounded-2xl` (18px) on cards and panels. `rounded-full` on chips, pills, buttons, avatars.
Squared corners require justification.

## 5. Elevation carries the depth, not borders

Refined repo uses shadows ~10× more than the fresh one (`shadow-sm` 60, `shadow-lg` 27, `shadow-md`
17), plus two hand-tuned shadows with color:
```
shadow-[0_10px_30px_-8px_oklch(0.6_0.13_42/0.6)]
shadow-[0_20px_60px_-20px_oklch(0.18_0.03_150/0.9)]
```
Note those are *brand-tinted* shadows, not neutral gray — a real craft detail.

**Rule:** separate content with whitespace → ground shift → elevation. `shadow-sm` for resting
cards, `shadow-lg` for raised/feature elements. 1px gray borders are the last resort.

## 6. Grids are deliberately asymmetric

The refined repo's splits are near-50/50 but intentionally off:
```
lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]   ×6
lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]   ×4
lg:grid-cols-[1.05fr_0.95fr]                     ×3
```
Matching the commit *"46/54 intro split."* Card grids run `lg:grid-cols-3` ×12 and
`lg:grid-cols-4` ×12.

**Rule:** two-column splits use a 0.9/1.1 or 1.05/0.95 ratio and alternate direction down the page.
Never a plain 50/50. Card grids are 3 or 4 columns and must fill rows evenly (no orphan card).

## 7. Type scale in practice

`text-sm` is the body workhorse (316×). Section headings are `text-3xl` (83×). `text-4xl` appears
only 14× and `text-5xl`+ is hero-only.

**Rule:** body `text-sm`/`text-base`. Section headings `text-3xl`. Hero H1 `text-5xl` → `text-7xl`
responsive. Small print `text-xs`. That's four steps — resist inventing more.

---

## Metrics that came out unreliable

`<Image>` and `<section>` tag counts (12 imgs / 31 sections in freedom-ext; 29 / 120 in
property-pest) are **not** per-page counts — both repos render sections and images from data arrays
inside reusable components, so the static tag count undercounts badly. Images-per-page and
sections-per-page have to be measured from the **rendered page** in the screenshot pass, not from
source. Noted so nobody trusts these numbers later.

---

## How this gets used

1. New build reads this file and sets its tokens from it.
2. `slopcheck` greps for violations: raw `max-w-*` page containers, `font-bold` on headings,
   `py-16`+ section padding, squared corners outside the radius scale, plain 50/50 splits.
3. The screenshot pass measures the **rendered** result — images per page, sections per page,
   adjacent-ground contrast, real line lengths — and grades against these ranges.
4. Every site Kaiden approves gets re-profiled and folded back in, so the ranges tighten over time.
