import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { Installs, Proof, Band, Work, Hardware, Closer } from "@/components/sections/home-v2";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* EIGHT SECTIONS, AND THE VOCABULARY IS THE CARD, THE PILL AND THE BENTO.
          *
          * Which is what propertypest.com and trugreen.com actually use - see the note at the top
          * of home-v2.tsx for how four rounds went wrong on that point. Every section here is one
          * of the two references' own compositions, in Brytr's navy, cream and amber.
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
          * whole way down: photograph, muted, raise, background, accent, primary, muted, then
          * background into the dark footer. No rules, no borders drawn between two sections. */}
        <Hero />          {/* 1 · photograph, form card, trust bar on it · photo      */}
        <Installs />      {/* 2 · bento: one tall card, two stacked     · muted      */}
        <SceneWipe />     {/* 3 · the signature, the only widget        · raise      */}
        <Proof />         {/* 4 · Google-style review cards             · background */}
        <Band />          {/* 5 · the amber band, a colour landmark     · accent     */}
        <Work />          {/* 6 · bento gallery, one tall + a 2x2       · primary    */}
        <Hardware />      {/* 7 · Haven cards + the crew stat card      · muted      */}
        <Closer />        {/* 8 · the form, and the phone number        · background */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
