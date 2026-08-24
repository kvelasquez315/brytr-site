import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { ProofRail } from "@/components/sections/proof-rail";
import { Installs, Proof, Band, Work, Hardware, Closer } from "@/components/sections/home-v2";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* NINE SECTIONS, IN FREEDOM EXTERIORS' ORDER, AND EVERY ONE OF THEM SAYS WHAT IT IS.
          *
          * The client, scrolling the live page: "I'm not sure what I'm looking at when I'm
          * scrolling through. It needs to be like I know what I'm looking at." So I opened
          * freedomexteriorsusa.com, which he named, and the thing it does relentlessly is label
          * every section - OUR SERVICES, WHY HOMEOWNERS CHOOSE US, WHO WE ARE, AREAS WE SERVE -
          * with an accent eyebrow, a plain headline that names the section, and exactly one line
          * of explanation. Every header on this page now goes through one SectionHead component so
          * none of them can drift, and the comments beside the calls below are those labels.
          *
          * THE ORDER IS FREEDOM'S TOO. Trust band immediately under the hero, then services, then
          * the product demo, then the work, then the reasons, then reviews LATE (Freedom puts its
          * testimonials near the foot, not in the middle), then one coloured call to action, then
          * the form. Reviews used to sit fourth, which spent the page's proof before the reader
          * had seen any of the work it was about.
          *
          * The vocabulary is still the card, the pill and the bento, which is what
          * propertypest.com and trugreen.com actually use - see the note at the top of
          * home-v2.tsx for how four rounds went wrong on that point.
          *
          * WHAT LEFT THE HOME PAGE, AND WHERE IT LIVES NOW. Nothing was deleted. Each of these
          * was already a full page, said better, and the home page was repeating it:
          *
          *   the towns and drive times → /service-areas
          *   the five-step process     → /how-it-works
          *   the questions             → /faq
          *   the three article cards   → /blog
          *   the tabbed house detail   → /recent-projects
          *
          * THE GROUND CHANGE IS STILL THE ONLY DIVIDER between sections, and it alternates the
          * whole way down: photograph, primary, muted, raise, primary, muted, background, accent,
          * background into the dark footer. No rules, no borders drawn between two sections. */}
        <Hero />          {/* 1 · photograph, headline, form card       · photo      */}
        <ProofRail />     {/* 2 · the trust band, Property Pest's shape · primary    */}
        <Installs />      {/* 3 · OUR SERVICES - bento of three         · muted      */}
        <SceneWipe />     {/* 4 · HOW THE COLOR WORKS - the wipe        · raise      */}
        <Work />          {/* 5 · OUR WORK - bento gallery              · primary    */}
        <Hardware />      {/* 6 · WHY HOMEOWNERS CHOOSE US - Haven      · muted      */}
        <Proof />         {/* 7 · REVIEWS - Google-style cards          · background */}
        <Band />          {/* 8 · the amber call to action              · accent     */}
        <Closer />        {/* 9 · FREE CONSULTATION - the form          · background */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
