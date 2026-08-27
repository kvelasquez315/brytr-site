import type { Metadata } from "next";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /recent-projects — THE REAL WORK LABS WIDGET PAGE.
 *
 * WHAT THIS PAGE USED TO BE, so it can be found again. Four hand-built case studies: a brick
 * two-story, a single-story ranch, a pool house with a pergola, and the ninety-second drone
 * sequence, each with a lead photograph, a fact table, a what-made-this-work list and four
 * thumbnails. Plus the shot list, which published the photographs the site wanted and did not
 * have. It was replaced on instruction when Brytr subscribed to Real Work Labs, whose plugin
 * publishes finished jobs from Brytr's own project records instead.
 *
 * That copy is not gone, it is in git. `git show b6e9ce2:app/recent-projects/page.tsx` is the
 * last version that had it, and the four case studies can be lifted back out of that file
 * verbatim if the widget ever needs supplementing rather than replacing.
 *
 * HOW THE WIDGET WORKS, and what each half of the install is for.
 *
 *   the loader          a single script, in the sitewide <head>, in app/layout.tsx. It is
 *                       sitewide rather than on this page because Real Work Labs ships more than
 *                       one widget off the same loader and the second one is a location strip
 *                       intended for other templates. See the note there.
 *   the target          `<div id="rwl-output">` below. The plugin finds it by id and renders into
 *                       it. The id is exactly what Real Work Labs specified and nothing else on
 *                       the site may use it. Do not add children to it: the plugin owns the
 *                       inside of that element and React must not fight it for them.
 *
 * WHAT IS AROUND IT, AND WHY IT IS NOT JUST THE DIV. The plugin renders client-side, which means
 * the HTML a crawler is first served for this route contains no project content at all. A page
 * whose entire body arrives by JavaScript is a page that can be indexed as empty. So the hero, the
 * value band and the split with /gallery are real server-rendered copy that says what this page is
 * before a single script runs, and the route keeps its sitemap entry and its breadcrumb schema.
 * If the widget is ever removed, what is left still reads as a page rather than a blank.
 *
 * THE ONE THING NOT VERIFIED HERE. app.realworklabs.com is not reachable from the environment this
 * was built in, so the plugin's own output has never been seen rendering. What is verified is that
 * the loader lands in the <head> of every route and that this target exists with the right id.
 * Whether the projects draw, and how they look, has to be checked on the deployed site.
 */

export const metadata: Metadata = {
  title: "Recent Permanent Lighting Projects | Omaha",
  /* The old description named the three case studies by elevation. They are no longer on the page,
   * so it described something a visitor would not find - the exact defect the lede on the old
   * version of this page carried twice before it. Nothing here counts anything. */
  description:
    "Finished Brytr permanent lighting installs around the Omaha metro, published from our own project records as each job is completed.",
  alternates: { canonical: "/recent-projects" },
  /* SAID OUT LOUD RATHER THAN ASSUMED. The install instructions asked for this page to be
   * indexable. It already inherits index/follow from the root layout and it already has a sitemap
   * entry pointing at this file, so this is belt and braces: a page whose body is client-rendered
   * is the one page on the site where nobody should have to go and check. */
  robots: { index: true, follow: true },
};

const trail = [{ name: "Home", href: "/" }, { name: "Recent projects", href: "/recent-projects" }];

export default function RecentProjects() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        photo="/img/patio-pergola.jpg"
        photoAlt="Lit pergola, pool deck and fire bowls at an Omaha home at dusk"
        objectPosition="50% 52%"
        h1="Finished installs, published as we complete them."
        lede="Not renders and not stock houses. Brytr jobs around the Omaha metro, photographed on the properties with the systems running. Homeowner addresses stay private, so none of them are named."
        trail={trail}
      />

      {/* The value band, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. */}
      <ValueBand {...valueProps["/recent-projects"]} ground="card" />

      {/* ── THE WIDGET ─────────────────────────────────────────────────────────────
        * Real Work Labs renders the projects into the div below. Everything in this section
        * outside that div is ours and is server-rendered, so the section is never empty even
        * before the plugin has run - which is also what a crawler is served.
        *
        * `min-h` on the target is deliberate. An empty div is zero pixels tall, and a `section`
        * whose only child is zero pixels tall reads as a mistake in the half second before the
        * plugin draws, and reads as a mistake permanently if the plugin ever fails. Holding the
        * height means the page looks like it is loading rather than broken.
        *
        * NO CHILDREN INSIDE THE TARGET. The plugin owns that element's contents. Anything React
        * renders in there is either wiped by the plugin or fights it on the next render, and the
        * failure mode of the second one is content that flickers. The fallback sentence therefore
        * sits OUTSIDE the div, where it is honest either way: it points at the gallery, which is
        * useful when the projects have loaded and is the whole rescue when they have not. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Every job, as it is finished."
            lede="Fed from Brytr's own project records rather than written up by hand, so this list moves when the work does."
          />
          <div id="rwl-output" className="mt-10 min-h-[28rem]" />
          <p className="mt-8 text-[0.95rem] leading-relaxed text-muted-foreground">
            Looking for one specific look rather than one specific house?{" "}
            <TextLink href="/gallery">The scene library</TextLink> has the same systems organized by
            what they are set to.
          </p>
        </div>
      </section>

      {/* ── THE SPLIT WITH /gallery ──
        * Two pages showing the same product from different angles, each saying which one it is.
        * Kept from the previous version of this page: it is the internal link that stops these two
        * competing for the same search, and it is the only place on the site that explains the
        * difference between them. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="rounded-lg bg-background p-7 shadow-[var(--shadow-lg)] ring-1 ring-border">
            <p className="label flex items-center gap-3 text-accent-ink">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              You are on this one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">The installs, by property</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
              Organized by job: the house, the neighbourhood it is in, and what went on it. Use it
              to find the elevation closest to yours.
            </p>
          </div>

          <div className="rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            <p className="label flex items-center gap-3 text-on-dark-muted">
              <span className="block h-4 w-1 bg-on-dark/25" aria-hidden />
              The other one
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-on-dark">The scene library</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark-muted">
              The same photographs organized by what the system is set to instead: the everyday warm
              white, the saved occasions, one colour across every zone, and the two-zone splits.
            </p>
            <div className="mt-6 border-t border-on-dark/12 pt-5">
              <TextLink onDark href="/gallery">Open the scene library</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* NO `ground` OVERRIDE, and the reason is in a screenshot.
        *
        * This closed on `ground="primary"` for one build. The rhythm gate passed it - card then
        * primary is a real alternation - and it was still wrong, because the phone variant's
        * heading and body are `text-muted-foreground`, which is ink for a light ground. On navy
        * that is near-black on near-black: the section rendered as a dark slab with a barely
        * readable heading in it, and the closer photograph sat in a grey box.
        *
        * A gate that checks whether two grounds differ cannot check whether a component can render
        * on the ground it was handed. The default is muted, the section above is card, and that is
        * both a real alternation and a ground this variant was built for. */}
      <PageCta
        variant="phone"
        photos={valueProps["/recent-projects"].photos}
        panelLink={{ href: "/gallery", label: "The scene library" }}
      />
    </Shell>
  );
}
