import type { Metadata } from "next";
import { site } from "@/content/site";
import { Shell } from "@/app/layout-shell";
import { QuoteForm, SectionHead, Check, Breadcrumb, TextLink } from "@/components/sections/page-parts";
import { Elevation } from "@/components/sections/elevation";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Lighting Design Consultation | Omaha",
  description: "Book a free on-site permanent lighting design consultation in the Omaha metro. We measure, design after dark, and hand you a written quote. No obligation.",
  alternates: { canonical: "/free-design-consultation" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Free design consultation", href: "/free-design-consultation" }];

export default function Consult() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <section className="bg-primary">
        <div className="shell py-12 lg:py-14">
          <Breadcrumb trail={trail} />
          <p className="eyebrow eyebrow--on-dark">No charge, no obligation</p>
          <h1 className="mt-4 max-w-[42ch] text-[clamp(2.1rem,4.2vw,3.3rem)] text-on-dark">
            See it on your house before you buy.
          </h1>
          <p className="mt-5 max-w-[64ch] text-lg text-on-dark/85">
            We come out, walk the property after dark, design it with you, measure the roofline, and leave
            you with a written quote. If you decide against it you have lost an hour and gained a plan.
          </p>
        </div>
      </section>

      <section className="section bg-background">
        <div className="shell grid gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
          <QuoteForm variant="full" />
          <div>
            <SectionHead eyebrow="What happens next" title="About an hour, driveway to written quote." />
            <ol className="mt-8 space-y-6">
              {[
                ["You send this form", "We reply the same day to book a time. Evenings are usually better for this, because the design happens after dark."],
                ["We walk the property", "We talk through what you actually want lit rather than reading you a package. Bring your objections."],
                ["We measure and quote", "Linear feet, elevations, zones and tier. You get a real number in writing, not a range."],
                ["You decide, or you do not", "There is no follow-up sequence and no pressure. If it is not for you, that is a fine outcome."],
              ].map(([h, p], i) => (
                <li key={h} className="flex gap-5">
                  <span className="u grid size-11 shrink-0 place-items-center rounded-md bg-primary text-lg font-medium text-accent">{i + 1}</span>
                  <div>
                    <h3 className="text-lg text-foreground">{h}</h3>
                    <p className="mt-1.5 text-[0.95rem] text-muted-foreground">{p}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-9 space-y-3 border-t border-border pt-7">
              <Check>Free on-site assessment and design</Check>
              <Check>Written quote before any commitment</Check>
              <Check>Financing available on approved credit</Check>
              <Check>We handle HOA and covenant submissions</Check>
            </ul>
            <div className="mt-9 rounded-lg bg-primary p-6">
              <p className="label text-accent">Prefer to talk</p>
              <a href={site.phoneHref} className="u mt-2 block text-3xl font-medium text-on-dark hover:text-accent">{site.phone}</a>
              <p className="mt-3 text-sm text-on-dark-muted">Same-day reply, most days</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-border">
              <Elevation night massing="ranch" lit={{ hex: "#f5c518", label:"warm white" }} className="block w-full" />
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
