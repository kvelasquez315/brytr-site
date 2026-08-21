import type { Metadata } from "next";
import Image from "next/image";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, BandCta, SectionHead } from "@/components/sections/page-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { galleryShots } from "@/content/images";
import { reviewProof } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Permanent Lighting Gallery | Real Omaha Installs",
  description:
    "Brytr permanent lighting on finished Omaha homes — warm white, game day, Christmas, Halloween and full-color scenes, photographed on completed installs.",
  alternates: { canonical: "/gallery" },
};
const trail = [{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }];

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-21/9",
  "4/3": "aspect-4/3",
};

export default function Gallery() {
  const [lead, ...rest] = galleryShots;

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <PageHero
        eyebrow="Gallery"
        h1="Finished installs, after dark."
        lede="Every photograph on this page is a Brytr system on a real Omaha home — the same fixture holding warm white on a Tuesday and scarlet on a Saturday. No renders, no stock houses, no borrowed photos."
        trail={trail}
        stats={[[reviewProof.average, `from ${reviewProof.count} ${reviewProof.platform} reviews`], ["18", "cities served"], ["1.2M", "lights installed"]]}
      />

      <section className="section bg-background">
        <div className="shell">
          <SectionHead
            eyebrow="By scene"
            title="One fixture. Every color you will ever want."
            lede="These are saved scenes running on installed systems around the metro. Homeowner addresses stay private, so each is captioned by scene and city."
          />

          {/* feature tile */}
          <figure className="mt-10 overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-lg)]">
            <div className={`relative ${ratioClass[lead.ratio]}`}>
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                priority
                sizes="(min-width:1280px) 1240px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="label text-accent">{lead.scene}</span>
              <span className="max-w-[70ch] text-[0.95rem] text-on-dark-muted">{lead.caption}</span>
            </figcaption>
          </figure>

          {/* the grid */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((shot) => (
              <figure
                key={shot.src + shot.scene}
                className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)]"
              >
                <div className={`relative ${ratioClass[shot.ratio]}`}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <span className="label text-accent-ink">{shot.scene}</span>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            eyebrow="What you are looking at"
            title="What to look for in any photo."
            lede="Permanent lighting is judged twice: how it performs after dark, and whether you can see the hardware at noon. A gallery can only settle the first one — which is why we will walk you to a finished install for the second."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              [
                "The line, not the dots",
                "Look at the roofline in these photos: it reads as one continuous line, not a string of bulbs. That is the diffuser doing its job, and it is the difference between a light fixture and a decoration.",
                "Zoom in on any gable above.",
              ],
              [
                "Where the color stops",
                "Color lands on the elevation the homeowner chose and stops there — gables scarlet, eaves left white, landscape left warm. Every run is a zone you can set on its own.",
                "The everyday setting is warm white, not color.",
              ],
              [
                "The parts nobody photographs",
                "Mitered corners, sealed terminations, capped ends, and channel color matched to the fascia so it disappears at noon. Ask any installer for a daylight photo from the curb before you sign.",
                "We will show you ours in person.",
              ],
            ].map(([h, p2, note]) => (
              <article key={h} className="flex flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)]">
                <h3 className="text-xl text-foreground">{h}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] text-muted-foreground">{p2}</p>
                <p className="label mt-4 border-t border-border pt-3 text-accent-ink">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BandCta
        title="Want to see one in person?"
        body="We will point you at a finished install near you. Seeing it from the curb in daylight is the real test."
      />
      <PageCta />
    </Shell>
  );
}
