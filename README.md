# brytr-site

Marketing site for Brytr Co, permanent outdoor lighting in Omaha, NE. Built by Nexus Advantage.

Next.js 16 App Router · Tailwind v4 · TypeScript · 77 statically prerendered pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run contrast   # APCA + WCAG gate on every token pair
npm run slopcheck  # mechanical design-tell gate
```

- **`DESIGN.md`** — the brand lock. Every colour and type decision derives from it. No hex value
  appears anywhere outside `app/globals.css`.
- **`HANDOFF.md`** — what the client still owes (photos, financing terms, warranty terms, review
  text), how to wire the forms, and what not to change.
- **`content/`** — all site data. 11 services, 18 cities, 8 systems, 9 comparisons, 12 articles.
  Adding a service or a city generates its page, nav, footer and sitemap entries automatically.
