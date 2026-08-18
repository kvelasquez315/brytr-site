# Brytr Co site — handoff

Built for Nexus Advantage. Next.js 16 (App Router) + Tailwind v4 + TypeScript, statically
prerendered to 77 pages, no database and no CMS.

`DESIGN.md` is the source of truth for every color and type decision. Read it before changing
anything visual. No hex value exists outside `app/globals.css`.

---

## 1. Photography — done, and what is still missing

**Status: 29 real photographs are live on the site.** They were developed from Brytr's own drone
raws in the `Brytr Shoots` Dropbox — three completed west-Omaha installs, shot 2, 14 and 19 October
2025. Nothing on the site is stock, AI, or recolored.

How they were made, in case they ever need to be redone:

- Every frame in that archive is a 3-to-5 shot exposure bracket of 18 MB DJI DNG raws. Each bracket
  was merged to a single radiance map (weighted by exposure time *and* ISO, since shoot 6 brackets
  ISO rather than shutter), then tone-mapped once with a shared filmic curve so all 29 images share
  one grade.
- The homepage hero pair is the *same frame* of the *same house* two minutes apart — warm white and
  a red/blue scene — registered to the pixel with a measured 3 px / 18 px / 0.07° warp so the drag
  handle wipes one cleanly into the other. If either file is replaced, the pair must be re-registered
  or the wipe will visibly jump.
- Frames shot at 0.8–1.0 s were discarded: the drone drifts during the exposure and every LED
  smears into a comet. Three otherwise-good compositions were lost that way.

Every image slot is still declared in **`content/images.ts`** and nowhere else. Drop a file into
`public/img/`, set its `src`, done — no code changes. Any slot left `null` renders a designed
no-photo state, never a grey box.

### What the archive could not provide

| Slot | What to shoot | Why it matters |
|---|---|---|
| **A daytime pair** | One house, two exposures, identical angle and framing: daylight, then after dark. | **There is not a single daytime frame in the entire 223 GB archive** — every folder is 19:30–21:05. The hero was therefore rebuilt as a warm-white ↔ game-day wipe, which is a stronger product argument anyway. But "you cannot see it at noon" is Brytr's biggest objection-handler and the site currently has to *assert* it rather than show it. One daylight shoot from the curb closes it. |
| `crewWide` | The crew on a job, 21:9 wide | Trust. Currently a designed no-photo state. |
| `founderZac`, `founderSam` | Portraits, vertical 4:5 | Currently an initials monogram. |
| `appScreen` | Phone screenshot of the scene list | The section renders real UI instead, which is fine, but a screenshot is better. |
| Commercial | One finished storefront, parapet or canopy install | `/services/commercial-outdoor-lighting` is the only service card with no photograph, because the archive is entirely residential. Do **not** put a house on it. |
| Repair / takeover | A before/after of a failed run being re-seated | Same reason. |

Per-city project photos are the next tier: three to five per city, tagged by city, wired the same way.

**Do not** substitute stock or AI imagery, and do not recolor a warm-white photo to fake a scene —
that shows a color Brytr never installed. Also: never publish a customer's street. The Dropbox folder
names contain addresses; every caption on the site stops at "west Omaha" deliberately.

## 2. Real values still needed from Zac and Sam

These are deliberately absent from the site rather than invented. Each one has a home already built:

- **Financing**: lender name and the actual advertised terms → `/pricing`
- **Warranty**: exact term lengths on LED, controller and power supply for both tiers, the
  workmanship term, and whether coverage transfers automatically → `/warranty`
- **Pricing**: real per-linear-foot ranges for Signature and Basic, deposit percentage, quote
  validity window → `/pricing`
- **Google review text**: paste real reviews into `content/reviews.ts` and both `/reviews` and the
  homepage switch from the proof-grid layout to review cards automatically. **Do not write these.**
  Fabricated testimonials are an FTC problem, not just a taste problem.
- **Badge assets**: official-color files for Google, BBB, Angi, Nextdoor. Third-party marks must
  never be recolored to amber. Anything missing renders as a text pill.
- **Commercial**: confirm whether Brytr wants it. Currently one stub page; a yes turns it into a
  five-page branch.
- **Outstate radius**: confirm Brytr will actually drive to Norfolk, Columbus and Grand Island. If
  not, delete those three from `content/cities.ts` and the pages disappear.
- **Trimlight in Omaha**: active competitor? Decides whether that comparison page is worth keeping.

## 3. Forms are not wired

Every form posts to `/free-design-consultation` as a GET placeholder. Before launch, point them at
LeadConnector (or whatever Nexus is using for this client) and add success and error states. The
markup is in `components/ui/bits.tsx` → `QuoteForm`, one component for all three variants.

## 4. Content model

Everything is data. To change the site you almost never touch a component:

- `content/services.ts` — 11 services. Add one and its page, nav entry, footer link, city-page row and sitemap entry all appear.
- `content/cities.ts` — 18 cities. Same.
- `content/systems.ts` — 8 lighting systems
- `content/compares.ts` — 9 head-to-head comparisons
- `content/blog.ts` — 12 articles
- `content/faqs.ts`, `content/reviews.ts`, `content/images.ts`, `content/site.ts`

## 5. Gates before any deploy

```bash
npm run contrast    # APCA + WCAG on every token pair. Must pass.
npm run slopcheck   # greps for the mechanical AI tells. Must exit 0.
npx next build      # must prerender all 77 pages
```

Then screenshot the result at 1440 / 768 / 375 and actually look at it. The full-page view at 25%
zoom is the density check: if you see stripes of empty background, it is not done.

## 6. Things that are deliberate, so please don't "fix" them

- **The site is mostly dark.** A lighting company rendered in light-mode blue-and-white is arguing
  against its own product. The four surfaces (`primary`, `raise`, `bone`, `bone-deep`) alternate as
  the day/night cycle of the thing being sold.
- **Amber is CTA-only.** Not for body text, not for stat numerals, not for decoration. It appears on
  buttons, the signature channel edge (max twice per page), active states, and one accent detail
  inside each icon.
- **No pure white section backgrounds.** White is for cards.
- **The comparison pages give the cheaper system real reasons to win.** That is the site's biggest
  trust asset and the reason both columns get identical visual treatment. Do not add a highlight to
  the Haven column.
- **Review text is absent, not "coming soon".** See above.
