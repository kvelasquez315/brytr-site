---
name: site-build
description: "Build or revise a local-business marketing site (Next.js + Tailwind) to Nexus Advantage house standard. Use when asked to build, create, redesign, revise, fix, audit, or improve a website or landing page for a local business (roofing, HVAC, painting, pest, lawn, glass, plumbing, restoration, sports academy, etc.), or when a section, hero, or page 'looks bad / looks AI / isn't designed'. Runs measured checks and a mandatory screenshot loop; never asserts the site looks good without looking at it."
---

# Site Build

House standard for Nexus Advantage sites. Stack: **Next.js (App Router) + Tailwind v4 + TypeScript**,
deployed to Vercel from GitHub.

**This skill is enforcement-first, not prose-first.** The rules live in scripts that fail the build.
Read `references/rules.md` for the ban list and `references/measured-profile.md` for the numbers.
Do not re-derive design opinions from scratch — they were extracted from repos Kaiden already approved.

---

## The three gates. None are optional.

```bash
node scripts/check.mjs --fix-hint          # 1. static rules. exits 1 on blockers.
python scripts/shoot.py --url http://localhost:3000 --out .shots/pass1
python scripts/measure.py --url http://localhost:3000 --paths / /services /about
```

**Gate 1 — static.** `check.mjs` greps for em dashes, eyebrows, stock icons, gradients over photos,
inline hex, raw container widths, duplicate heroes, banned per-client terms. Must exit 0.

**Gate 2 — look at it.** `shoot.py` writes PNGs of every page at 1440/768/375 plus per-section crops.
**Then open the PNGs with Read and actually look at them.** You do not get to claim the site looks
good. Grade each screenshot against `references/rules.md`, triage Blocker/High/Medium, fix, re-shoot
into `pass2`. Minimum two passes.

**Gate 3 — measure the render.** `measure.py` catches what source cannot: fonts that silently fell
back to the system stack (this is what "robotic font" means), real container width, undesigned
sections, adjacent grounds that read as one flat field, a section hogging the page copy. Must exit 0.

If a gate cannot run, **say so and stop**. A skipped gate is why sites have shipped blind.
One-time setup: `pip install playwright && python -m playwright install chromium`.

---

## MODE A — Revise an existing repo (the common case)

1. Read `CLAUDE.md`, `app/globals.css`, and the hero + section components. Learn the existing tokens.
2. Run all three gates on the current state. That output *is* the to-do list.
3. Create `nexus.rules.json` with this client's `neverMention` list if it doesn't exist.
4. Fix in this order: Gate 1 blockers → Gate 3 blockers → screenshot Blockers → Highs.
5. Fixes live in **shared templates**, never per page. If the same defect appears on 3 pages, the fix
   belongs in the component.
6. Re-run all three. Commit to `staging`, never `main`.

Do not redesign what wasn't asked about. Revision means closing the gap to the standard, not
restarting.

## MODE B — New build

1. **Intake — ask, don't guess.** Business, trade, city, phone, real photos yes/no, existing URL.
   Browse the existing site for real copy, services, service areas, and brand equity.
   For anything Kaiden can only judge by eye, **render options and let him pick a letter**: hero
   crops, font specimens, palette, radius. Never describe an image in words and ask him to approve it.
2. **Draw the skin — before writing DESIGN.md.**
   ```bash
   node scripts/variation.mjs <client-slug>          # see the draw
   node scripts/variation.mjs <client-slug> --log     # record it once locked
   ```
   This hands you **bounds, not a design**: radius base, type pairing, ground rotation, accent
   strategy, container and padding values, a 6-form palette, forms excluded this build, and the
   source the signature device must derive from. Chosen to differ from the last three logged builds.

   Work inside the draw. Do not substitute your own preferences for it — the whole point is that
   your preferences are the same every time, which is why sites converged. If a drawn value is
   genuinely wrong for the brand, say so and why, then re-draw; do not silently ignore it.

3. **Brand lock.** Write `DESIGN.md` + `globals.css` tokens from the draw, with
   `references/measured-profile.md` as the range reference. Includes the page-width token, the radius
   scale derived from the drawn base, the type scale, and the named signature device.
   No component code until this is committed.
4. **Home page first.** It defines the component library. Every interior page composes from it.
5. **Interior pages.** Only components that already exist in the shared library. A new section form
   gets added to the library and built from tokens — never inlined on one page.
6. Run all three gates. Ship.

---

## Direction, not dictation

The two failure modes are opposite and both real: a fixed spec makes every site identical, a vague
brief makes every site boring. This skill avoids both by being specific about **budgets and bounds**
and silent about **composition**.

- **Budgets** say what the page must add up to — light-ground share, form variety, photo bands,
  copy distribution. Many different good pages satisfy the same budget; no boring one does.
- **The draw** (`variation.mjs`) fixes the palette you build from and rules out what you used last
  time. Divergence is enforced instead of hoped for.
- **Nothing dictates placement.** No rule says which form goes in which slot, what the photograph
  shows, what the device is, or how a section is composed. That is the design work, and it is yours.

If you find yourself reproducing the last site's page with new colours, you have followed the letter
and missed the point. The gates will not catch that. You have to.

---

## What cannot be scripted — your judgement, every build

**The hero is a closed set.** Left column: H1, one short body paragraph, one blue phone button.
Right column: the bordered 4-field form (name, phone, property address, what do you need). Nothing
above the H1. Nothing below the button. No eyebrow, pill, badge, stars, stats, bullet list, second
paragraph, or secondary CTA. If you are adding something to the hero, you are wrong.

**Page order.** Hero → trust banner → image + value-prop + CTA → 3–4 image-led sections →
text-heavier sections → form closer. The 800-word floor is met by **adding sections**, never by
fattening one. Every page.

**Hero photos.** Wide landscape, no people, bright enough to carry white text, unique per page.
Render a contact sheet of candidate crops, look at it, present lettered options. Never pick from a
written description — that has been rejected every time it was tried.

**Tint is a last resort.** Prefer a photo that carries white text unaided. If none does, apply the
minimum flat tint that clears contrast. If a photo needs a heavy tint, reject the photo, not the rule.

**Interior pages inherit the design language** — component forms, radius, type treatment, image
density, colour rhythm — without duplicating the home page's layout. This is the most common failure:
interior pages arriving as plain prose boxes that look nothing like the home page.

**Signature device.** One ownable idea per site, derived from the logo, name, or the physical work.
Must appear in at least three sections, and must differ from the last three builds. This is where
uniqueness comes from — not from rearranging the structure.

**Density is scoped.** It never applies to the hero or the first 3–4 sections, and never justifies a
word-heavy section. Default posture is subtraction: build the closed set, then justify additions.

---

## References

- `references/rules.md` — the full ban list and section specs
- `references/measured-profile.md` — observed numbers from approved repos; the source of truth for
  container width, padding, radius, weight, type scale, grid ratios
- `references/reference-sites.md` — what to study, and what each one is the reference for

## Standing rules

- Never invent stats, warranties, credentials, licence numbers, review counts, awards, or years.
- Photos vendored in `/public`. No stock, no AI imagery, no empty slots.
- No hex outside `globals.css`.
- Commit and push to `staging`. Never `main`.
- After a site is approved, re-run the profiler and fold its numbers back into
  `measured-profile.md` so the standard ratchets up.
