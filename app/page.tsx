import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import {
  Services,
  WhoWeAre,
  HowWeWork,
  Reviews,
  RecentWork,
  Faqs,
  Closer,
  faqItems,
} from "@/components/sections/home";
import { Jsonld, localBusiness, faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      {/* FAQPage, which /pricing and /faq already emit and this page did not.
        *
        * It matters more here than on either of those, because a collapsed Radix accordion item's
        * answer is NOT in the rendered HTML - only the open one is. So the eleven answers in
        * section 8 are about 700 words a reader can reach in one click and a crawler cannot reach
        * at all, and this is the only route by which they count. Built from the same `faqItems`
        * array the accordion renders, so the markup cannot drift from what a reader sees - which is
        * the one condition Google actually enforces on this schema type. */}
      <Jsonld data={faqSchema(faqItems)} />
      <Header nav={navTree} />
      <main>
        {/* NINE SECTIONS, DOWN FROM THIRTEEN.
          *
          * The thirteen were phoenixroofingandrepair.com's, in their order, on an explicit brief to
          * copy that layout slot for slot. The client's read of the built result: "the design of
          * this website is just awful, there is way too much text going on and it needs to be
          * simplified."
          *
          * Measured on the page that produced that verdict: 13 sections, 39 headings, 2 forms with
          * 10 fields, 65 fully-rounded elements, and every one of the 12 section headings set at
          * the same 54px as the h1. The rating - 5.0 from 196 Google reviews - was stated in six
          * separate places. See the header comment in components/sections/home.tsx for what came
          * out and why.
          *
          * FOUR SECTIONS WERE DELETED OUTRIGHT rather than shrunk, because each one existed to make
          * a point the page already made somewhere else:
          *
          *   ProofRail     a whole section for one number the hero states 400px above it
          *   Founders      two cards and six tick rows for a fact that is one sentence
          *   WhyTrust      seven ticks, four of them the HowWeWork items restated
          *   CallToAction  an amber band asking for the same click as the closing section
          *
          * SERVICES IS SECOND AND THE DRAG DEMO IS THIRD. The demo started seventh, which is far
          * too deep for the feature the product is bought for; second was an overcorrection. The
          * client: "I do like the interactive, but I don't think it should be the first thing at
          * all... what we do is the main thing." So the page answers "what do you do" in five
          * photographs, and THEN proves the part of that answer nobody believes.
          *
          * NO ICONS ANYWHERE ON THIS PAGE. There were ten: seven section-head glyphs and three
          * sets of tiles, all out of content/icon-map.tsx. "I can't even tell what's going on with
          * them... I would rather we bring our own visual sense to it with our images." Every one
          * is gone - see the note in components/sections/home.tsx for what replaced them.
          *
          * AND THE FOUNDERS ARE NOT MENTIONED. "I don't want to mention them. We shouldn't be
          * mentioning them." Their section went two rounds ago; the one sentence that survived
          * into WhoWeAre is gone too. They keep /about.
          *
          * THE GROUND runs photograph, background, muted, background, raise, muted, primary,
          * background, muted, into the primary footer - six light sections to three dark, where
          * the page this replaced read as dark because its two darkest were its first two. No
          * rules are drawn between sections; the ground change IS the seam. */}
        <Hero />          {/* 1 · photograph, one line of proof, 3-field form  · photo      */}
        <Services />      {/* 2 · WHAT WE DO, first. Five cards, card is link  · background */}
        <SceneWipe />     {/* 3 · the drag demo. Proof, after the claim        · muted      */}
        <WhoWeAre />      {/* 4 · photo mosaic | features + the founders line  · background */}
        <HowWeWork />     {/* 5 · four items | daylight photo. Absorbs trust   · raise      */}
        <Reviews />       {/* 6 · the one loud heading, three real reviews     · muted      */}
        <RecentWork />    {/* 7 · night photographs on the night ground        · primary    */}
        <Faqs />          {/* 8 · eight questions, and the page's SEO ballast  · background */}
        <Closer />        {/* 9 · one close: form, phone, hours. Was two       · muted      */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
