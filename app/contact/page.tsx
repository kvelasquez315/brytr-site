import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead, Check, TextLink, CityTiles } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { site } from "@/content/site";
import { QuoteForm } from "@/components/sections/page-parts";
import { localBusiness } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Brytr Co | Omaha, NE",
  description: "Call Brytr Co on 402-810-3973 or send a message. Permanent outdoor lighting across the Omaha metro, Lincoln, eastern Nebraska and western Iowa.",
  alternates: { canonical: "/contact" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];

export default function Contact() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={localBusiness()} />
      <PageHero
        eyebrow="Contact"
        h1="Talk to Zac or Sam."
        lede="Calls go to us, not to a call center. If we are on a roof we will call you back the same day."
        trail={trail}
        aside={<QuoteForm variant="financing" heading="Send a message" submitLabel="Send" />}
        stats={[["Same day", "reply"], ["Free", "on-site design"], ["18", "cities served"]]}
      />

      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div>
            <p className="label text-muted-foreground">By phone</p>
            <a href={site.phoneHref} className="u mt-3 block text-3xl font-medium text-foreground hover:text-accent-deep">{site.phone}</a>
            <p className="mt-4 text-sm text-muted-foreground">We reply the same day, most days</p>
            <p className="mt-4 text-[0.95rem] text-muted-foreground">
              Best for anything urgent, and for service calls on an existing system.
            </p>
          </div>
          <div>
            <p className="label text-muted-foreground">Where we are</p>
            <address className="mt-3 not-italic">
              <p className="font-display text-xl font-bold text-foreground">{site.name}</p>
              <p className="mt-2 text-muted-foreground">{site.city}, {site.state}</p>
            </address>
            <p className="mt-4 text-[0.95rem] text-muted-foreground">
              We are a field business rather than a showroom, so the useful visit is us coming to you.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={site.social.facebook} className="u text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4">Facebook</a>
              <a href={site.social.instagram} className="u text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4">Instagram</a>
            </div>
          </div>
          <div>
            <p className="label text-muted-foreground">What to expect</p>
            <ul className="mt-4 space-y-3">
              <Check>Same day reply on anything sent before 6pm</Check>
              <Check>No follow-up sequence if you go quiet</Check>
              <Check>We will tell you if you are outside our service radius</Check>
              <Check>Service calls on other brands are welcome</Check>
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead eyebrow="Coverage" title="Where the trucks go." />
          <div className="mt-9"><CityTiles /></div>
        </div>
      </section>
    </Shell>
  );
}
