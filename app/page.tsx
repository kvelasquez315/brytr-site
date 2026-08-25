import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import {
  WhoWeAre,
  Services,
  HowWeWork,
  Reviews,
  RecentWork,
  Closer,
} from "@/components/sections/home-phx";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* EIGHT SECTIONS, DOWN FROM THIRTEEN, AND THE GROUND ALTERNATES EVERY TIME.
          *
          * The page was 12,431px over thirteen sections, and six of those thirteen sat on one
          * of two warm neutrals about ten per channel apart - a difference nobody can see. So
          * most of the scroll was a single undifferentiated beige field. Length is not density.
          * Density is how much a reader learns per screen, and this page was spending screens
          * on repetition.
          *
          * WHAT WENT, AND WHERE IT WENT. Nothing was thrown away:
          *
          *   the reviews strip      -> the rating line in the hero. It was 318px, no images,
          *                            one fact, and you had to scroll to reach it.
          *   the founders           -> the foot of WHO WE ARE. Same argument, one section.
          *   why homeowners trust   -> HOW WE WORK. Three of its seven ticks were already that
          *                            section's icon rows word for word; the other four moved.
          *   the amber CTA band     -> deleted. A booking CTA two screens above a booking form,
          *                            and the arithmetic of alternating grounds would not close
          *                            with nine sections. See the note in home-phx.tsx.
          *   four of eight FAQs     -> /faq, which already renders all twenty-five. The four
          *                            that stop a sale stayed and now sit beside the form.
          *
          * THE RHYTHM, WHICH IS NOW LOAD-BEARING RATHER THAN DECORATIVE. Four grounds exist:
          * night #111820, navy #202b38, bone #f1ede4, and white for cards only. Dark and light
          * alternate strictly, every seam, all the way down. That is only possible because the
          * services grid moved onto navy - with a dark hero, eight slots need four darks, and
          * six white cards read better on navy than they ever did on bone.
          *
          * scripts/section-rhythm.mjs now compares RESOLVED GROUNDS rather than class names, so
          * bg-background beside bg-muted fails the way it always should have. This file is the
          * first entry in that gate's STRICT list. */}
        <Hero />        {/* 1 · night   · the photograph, the offer, the rating, the form  */}
        <WhoWeAre />    {/* 2 · bone    · WHO WE ARE - night frames, features, founders    */}
        <Services />    {/* 3 · navy    · SERVICES - five cards and a consultation card    */}
        <HowWeWork />   {/* 4 · bone    · HOW WE WORK - method, the ticks, the warranty     */}
        <SceneWipe />   {/* 5 · night   · the signature - drag between warm white and color */}
        <RecentWork />  {/* 6 · bone    · RECENT WORK - six frames, all shot on site        */}
        <Reviews />     {/* 7 · navy    · WHAT OUR CLIENTS SAY - staggered white cards      */}
        <Closer />      {/* 8 · bone    · the four questions that block a sale, and the form */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
