import type { Metadata } from "next";
import { Shell } from "@/app/layout-shell";
import { PageHero } from "@/components/sections/page-parts";
import { site } from "@/content/site";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Brytr Co collects, uses and stores the information you send through this site.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};
const trail = [{ name: "Home", href: "/" }, { name: "Privacy policy", href: "/privacy-policy" }];

export default function Page() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      {/* type variant: no photograph, no form, no closing band. A legal page should
        * look plain, and plain is the correct design for what this is. */}
      <PageHero
        variant="type"
        h1="Privacy policy"
        lede="What we collect when you send us a form, what we do with it, and what we will not do with it."
        trail={trail}
      />
      <section className="section bg-background">
        <div className="shell">
          <div className="max-w-[76ch]">
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">What we collect</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">When you submit a form on this site we collect the details you type into it: your name, phone number, email address, property address, the city you selected, what you are looking to light, and anything you write in the notes field.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We also receive standard technical information that any website receives, such as your approximate location, browser and the pages you viewed.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Why we collect it</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">To reply to your enquiry, to book and prepare for an on-site consultation, and to produce a written quote. That is the whole purpose.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We do not sell your information, we do not share it with other contractors, and we do not add you to a marketing list you did not ask for.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">How long we keep it</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Enquiries that do not become jobs are kept while there is a reasonable prospect of the conversation continuing, and then deleted. Records relating to actual installs are kept for as long as the warranty runs, because we need them to honour it.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Third parties</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">The service-area map on this site loads basemap tiles from CARTO, built on OpenStreetMap data, so CARTO will see your IP address when a page with the map on it loads. Web fonts are served from this site rather than from a third party. If Brytr later adds analytics, a booking tool or a finance application, it will be named here before it goes live.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Your choices</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Call the number below and we will handle it directly rather than routing you through a form.</p>
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
