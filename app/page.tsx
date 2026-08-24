import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { ProofRail } from "@/components/sections/home-a";
import { Installs, Proof, Band, Work, Hardware, Closer } from "@/components/sections/home-v2";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* SEVEN SECTIONS, DOWN FROM THIRTEEN. The client's brief was trugreen.com: how little
          * you need when the typography and the photography are doing the work. Measured on the
          * old page: 66 boxed containers, 28 headings, 172 amber elements, 12.3 viewports, and
          * 187 pieces of 13-15px text against 13 large ones. Every section was a heading over a
          * grid of small rectangles, and the photography was inside the rectangles.
          *
          * WHAT LEFT THE HOME PAGE, AND WHERE IT LIVES NOW. Nothing was deleted. Each of these
          * was already a full page, said better, and the home page was repeating it:
          *
          *   the hardware craft band  →  /lighting-systems
          *   the crews argument       →  /about
          *   the deadline band        →  folded into the hero and the closer
          *   the towns and drive times→  /service-areas   (its map was also failing live)
          *   the five-step process    →  /how-it-works
          *   the questions            →  /faq
          *   the three article cards  →  /blog
          *   the tabbed house detail  →  /recent-projects
          *
          * THE GROUND CHANGE IS THE ONLY DIVIDER, and it alternates the whole way down:
          * photograph, muted, raise, background, primary, muted, background, then the dark
          * footer. No rules, no borders, nothing drawn between two sections. */}
        <Hero />          {/* 1 · full-bleed photograph + the form   · photo      */}
        <ProofRail />     {/*     the trust band, hero furniture     · primary    */}
        <Installs />      {/* 2 · one tall tile, then two            · muted      */}
        <SceneWipe />     {/* 3 · THE SIGNATURE, the only widget     · raise      */}
        <Proof />         {/* 4 · one quote at display size          · background */}
        <Band />          {/*     the amber band, a colour landmark   · accent     */}
        <Work />          {/* 6 · photographs of finished installs   · primary    */}
        <Hardware />      {/* 7 · Haven, set as type not as panels   · muted      */}
        <Closer />        {/* 8 · the form, and the phone number     · background */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
