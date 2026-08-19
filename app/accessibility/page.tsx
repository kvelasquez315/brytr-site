import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { Breadcrumb, SectionHead } from "@/components/sections/page-parts";
import { site } from "@/content/site";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "How the Brytr Co website is built for accessibility, and how to tell us about a barrier.",
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};
const trail = [{ name: "Home", href: "/" }, { name: "Accessibility", href: "/accessibility" }];

export default function Page() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <section className="bg-primary">
        <div className="shell py-12">
          <Breadcrumb trail={trail} />
          <h1 className="mt-2 text-[clamp(1.9rem,3.6vw,2.8rem)] text-on-dark">Accessibility</h1>
          <p className="mt-4 max-w-[70ch] text-lg text-on-dark/85">What we have done, what we know is imperfect, and how to tell us if something on this site does not work for you.</p>
        </div>
      </section>
      <section className="section bg-background">
        <div className="shell max-w-[76ch]">
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">What we aim for</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We build to WCAG 2.2 AA as a working target. In practice that means every color pair on this site was checked rather than eyeballed, body text is never set in low-contrast gray, every interactive element has a visible focus state, and tap targets on mobile are at least 44 pixels.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Specific choices</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">The day and night control on the home page is a real slider element: it is reachable by keyboard, it announces its state, and it can be operated with the arrow keys rather than requiring a drag.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Nothing on this site is pinned, scroll-jacked or parallaxed, because those patterns are hostile to people using zoom or a screen reader. The only fixed elements are the header and the mobile call bar.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Any moving element respects your reduced-motion setting and stops completely when it is on.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Elevation drawings carry text alternatives describing what state the lighting is in, and decorative marks are hidden from assistive technology rather than announced as meaningless images.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Known gaps</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Embedded maps come from a third party and we do not control their internal accessibility. The service area is also written out as a text list of every city for exactly that reason, so the map is never the only way to get the information.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Tell us</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">If something here does not work for you, call and say so. We would rather fix it than have you work around it.</p>
          <div className="mt-10 rounded-lg bg-muted p-6">
            <p className="label text-2xs uppercase tracking-[0.14em] text-muted-foreground">Questions</p>
            <p className="mt-2 text-[0.95rem] text-muted-foreground">
              Anything on this page you want explained, call{" "}
              <a href={site.phoneHref} className="u text-foreground underline decoration-accent decoration-2 underline-offset-4">{site.phone}</a>{" "}
              and ask for Zac or Sam. We would rather answer it directly.
            </p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
