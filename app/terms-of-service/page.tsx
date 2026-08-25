import type { Metadata } from "next";
import { Shell } from "@/app/layout-shell";
import { PageHero } from "@/components/sections/page-parts";
import { site } from "@/content/site";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to using the Brytr Co website and to requesting a quote.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};
const trail = [{ name: "Home", href: "/" }, { name: "Terms of service", href: "/terms-of-service" }];

export default function Page() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      {/* type variant: no photograph, no form, no closing band. A legal page should
        * look plain, and plain is the correct design for what this is. */}
      <PageHero
        variant="type"
        h1="Terms of service"
        lede="The terms that apply to this website. The terms that apply to an actual install are in your written quote, which is the document that governs the work."
        trail={trail}
      />
      <section className="section bg-background">
        <div className="shell">
          <div className="max-w-[76ch]">
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">About this site</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">This site is published by Brytr Co, a permanent outdoor lighting installer based in Omaha, Nebraska. It exists to explain what we do and to let you request a consultation.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Quotes and pricing</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Nothing on this website is a quote or an offer. Prices are described as ranges because the actual number depends on a measured survey of your property.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">A binding price only exists once we have measured on site and given you a written quote. If anything on this site conflicts with your written quote, the written quote governs.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Accuracy</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We try to keep product specifications, service areas and comparisons accurate and current. Manufacturers change specifications without telling installers, so treat any spec here as indicative and ask us to confirm anything you are relying on.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Comparisons of other manufacturers reflect our own experience installing in this category. They are opinion, offered in good faith, and other installers will reasonably disagree.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Illustrations</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Some images on this site are measured elevation drawings rather than photographs, and are labelled as such where they appear. They illustrate how the system is built and are not a representation of a specific property.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Liability</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">This site is provided as is. We are not liable for decisions made purely on the basis of website content rather than on a written quote and a site survey.</p>
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
