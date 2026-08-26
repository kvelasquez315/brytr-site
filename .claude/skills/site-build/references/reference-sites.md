# Reference Sites

Study these before designing. Each one is the reference for something specific — do not treat them
as a single blended "good website."

| Site | Reference for |
|---|---|
| `freedom-exteriors-usa-website` (repo, owned) | Brand fit, layout, format, fonts. **Read the code** — tokens, components, section markup. Do not infer from a screenshot |
| `property-pest-control` (repo, owned) | The refined standard. 265 commits of Kaiden's own corrections. Where it disagrees with Freedom Exteriors, **this one wins** |
| phoenixroofingandrepair.com | "Thick," professional, substantial. Study why it feels heavy and finished |
| trugreen.com | Section layout and typography |
| propertypest.com | Overall design |
| brightsidelawns.com | **Interior pages.** Simple, states the service, gives value props, no slop text |
| jhlincoln.com | Custom icon quality bar. If icons are used at all, this is the target |

**Do not use** edentreepros.com. Explicitly rejected.

---

## Important context about these references

Both owned repos were built on **v0**, not Claude. That matters: v0 renders what it makes and shows
it to the user, so it was visually verified by construction. Claude writes code blind unless the
screenshot gate runs. **That difference — not the rulebook — is why v0 output looked better.** The
gates in this skill exist to close it.

The two repos sit at opposite ends of refinement, and the gap between them is the most useful signal
available:

- `freedom-exteriors-usa-website` — 17 commits. Close to raw v0 output.
- `property-pest-control` — 265 commits. Heavily corrected by Kaiden.

What changed between them is what Kaiden iterates *toward*: container widened 1280 → 1536, section
padding tightened, `font-bold` almost entirely replaced by `font-semibold`, radius rounded off hard,
elevation used far more, splits made deliberately asymmetric. Those numbers are in
`measured-profile.md`.

## The owned repos are references for MEASUREMENTS, not for COMPLIANCE

Verified by running `check.mjs` against `property-pest-control`. It violates the current house rules
in six systematic ways:

| Violation | Scale |
|---|---|
| `kicker` / `eyebrow` mechanism | 18 files, 175 uses |
| `#3A5F43` hardcoded instead of tokenised | 60 uses across 21 files |
| Raw `max-w-7xl` page containers | 12 |
| Gradients over imagery | 10 |
| `uppercase` on the h1 — including `components/home/hero.tsx` | 6 |
| Swipeable carousel component | `related-links-carousel.tsx` |
| Em dashes | 6 |

None of that is a contradiction. Most of these bans were established *later*, on dgr-painting,
brytr-site, anderson and holmes. Property Pest predates them.

**So: copy its numbers, its rhythm, and its structure. Do not copy its markup, and never cite it as
proof that a pattern is allowed.** If a reference repo and `rules.md` disagree, `rules.md` wins.
Run `check.mjs` on any reference before imitating something you saw in it.

## How to use a reference

**Default: unique to the brand.** Study the reference for *how* it solves a problem — rhythm,
hierarchy, density, how it separates sections — then solve the same problem in this client's own
visual language.

**Escalation only: replicate exactly.** When a build has come out badly and Kaiden says to copy a
named reference, then match its layout, format, and fonts directly and substitute only colours,
images, branding, and text. That is a recovery move, not the starting point.

## Ratchet

When Kaiden approves a site, profile it and fold its numbers into `measured-profile.md`, and add it
to this table. The standard should rise with each build. New sites become references — that is the
point, and it is why copying components from one repo forever is the wrong approach.
