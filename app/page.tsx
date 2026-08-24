import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { Installs, Proof, Band, Work, Hardware, Crew, Closer } from "@/components/sections/home-v2";
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
          * footer. No rules, no borders, nothing drawn between two sections.
          *
          * NINE NOW, AND EVERY ONE A DIFFERENT SHAPE. The client's fourth read was "insanely
          * boxy", and he was right: the page had become four grids of identical cards. The fix
          * was subtraction, not rearrangement — see the note at the top of home-v2.tsx. The
          * crew argument came back off /about as its own full-width dark ground, because the
          * version of it that lived inside the hardware section was a rounded navy panel
          * floating in a cream field, which is the most card-like thing a layout can do. */}
        <Hero />          {/* 1 · photograph, form, trust bar on it   · photo      */}
        <Installs />      {/* 2 · staggered wide rows, flush photos   · muted      */}
        <SceneWipe />     {/* 3 · the signature, the only widget      · raise      */}
        <Proof />         {/* 4 · big number, quotes on bare ground   · background */}
        <Band />          {/* 5 · the amber band, a colour landmark   · accent     */}
        <Work />          {/* 6 · filmstrip off the right edge        · primary    */}
        <Hardware />      {/* 7 · Haven as a hairline-ruled list      · muted      */}
        <Crew />          {/* 8 · stat strip, full-width dark ground  · primary    */}
        <Closer />        {/* 9 · the form, and the phone number      · background */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
