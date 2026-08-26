import type { Metadata } from "next";
import { Shell } from "@/app/layout-shell";
import { PageHero } from "@/components/sections/page-parts";
import { site } from "@/content/site";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "How the Brytr Co website is built for accessibility: the standard we hold it to, what we test, the parts we know are imperfect, and how to tell us about a barrier.",
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};
const trail = [{ name: "Home", href: "/" }, { name: "Accessibility", href: "/accessibility" }];

export default function Page() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      {/* type variant: no photograph, no form, no closing band. A legal page should
        * look plain, and plain is the correct design for what this is. */}
      <PageHero
        variant="type"
        h1="Accessibility"
        lede="What we have done, what we know is imperfect, and how to tell us if something on this site does not work for you."
        trail={trail}
      />
      <section className="section bg-card">
        <div className="shell">
          <div className="max-w-[76ch]">
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">What we aim for</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We build to WCAG 2.2 AA as a working target. In practice that means every color pair on this site was checked rather than eyeballed, body text is never set in low-contrast gray, every interactive element has a visible focus state, and tap targets on mobile are at least 44 pixels.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Specific choices</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">The day and night control on the home page is a real slider element: it is reachable by keyboard, it announces its state, and it can be operated with the arrow keys rather than requiring a drag.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Nothing on this site is pinned, scroll-jacked or parallaxed, because those patterns are hostile to people using zoom or a screen reader. The only fixed elements are the header and the mobile call bar.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Any moving element respects your reduced-motion setting and stops completely when it is on.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Elevation drawings carry text alternatives describing what state the lighting is in, and decorative marks are hidden from assistive technology rather than announced as meaningless images.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Known gaps</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">The service-area map is a pan-and-zoom map. We build and label it ourselves rather than embedding someone else&apos;s widget, so the markers carry names, but a map you have to drag is still a poor way to answer a simple question. Every city in the service area is therefore written out as a text list on the same page, and the map is never the only route to the information.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Tell us</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">If something here does not work for you, call and say so. We would rather fix it than have you work around it.</p>
          <div className="mt-10 rounded-lg bg-muted p-6">
            <p className="label text-muted-foreground">Questions</p>
            <p className="mt-2 text-[0.95rem] text-muted-foreground">
              Anything on this page you want explained, call{" "}
              <a href={site.phoneHref} className="u text-foreground underline decoration-accent decoration-2 underline-offset-4">{site.phone}</a>{" "}
              and ask for Zac or Sam. We would rather answer it directly.
            </p>
          </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
