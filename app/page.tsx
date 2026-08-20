import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { ProofRail, ServicesBento, MaterialsSplit, WhyBrytr } from "@/components/sections/home-a";
import { ProjectTabs } from "@/components/sections/project-tabs";
import {
  Writing, ServiceArea, ProcessRow, FinalCta, CtaBand,
} from "@/components/sections/home-b";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* Thirteen sections, down from twenty. The cut was made on DESIGN duplication,
          * not on content value: the page had four separate lead forms, five card grids,
          * five two-column splits and two comparison sections. What went, and why:
          *
          *  QuickQuote   form #2 of 4. The hero has one and FinalCta has one.
          *  Financing    form #3, and a /pricing subject. Page kept, section cut.
          *  CtaBand      cut here, then brought back mid-page in the audit: the stretch
          *               from the systems section to the final form had nothing to act on.
          *  SceneRail    said the same thing as SceneWipe with more pixels. The eight
          *               scene photographs all live on /gallery.
          *  AppSplit     the app interface was drawn in HTML rather than photographed.
          *               Comes back when Zac sends a real screenshot.
          *  Reviews      content/reviews.ts is deliberately empty — no real review text
          *               exists yet — so the section rendered as numbers we already
          *               state in the band above it.
          *  VersusTable  same argument as the brand comparisons, twice.
          *  CompareGrid  white cards and text with no photography. The nine comparison
          *               pages are strong; a card grid of them on the homepage was not.
          *               Reached from the systems section and the nav instead.
          *  HomeFaq      client asked for no FAQ on the homepage. The FAQPage schema
          *               went with it — structured data has to describe what is on the
          *               page, and /faq still carries both.
          *
          * Every archetype below is used exactly once. */}
        <Hero />            {/*  1 · full-bleed photo + form   · photo   */}
        <ProofRail />       {/*  2 · one compact row           · primary */}
        <ServicesBento />   {/*  3 · card grid                 · neutral */}
        <SceneWipe />       {/*  4 · THE SIGNATURE             · raise   */}
        <MaterialsSplit />  {/*  5 · split, hardware left      · deep    */}
        <WhyBrytr />        {/*  6 · four-up + bridge          · primary */}
        <ProjectTabs />     {/*  8 · tabbed photo gallery      · raise   */}
        {/* AUDIT FIX: from the systems section to the final form was ten phone screens
          * with nothing to act on. One short centred band here, which is also an
          * archetype the page does not otherwise use. */}
        <CtaBand />         {/*  8b · short centred band       · primary */}
        <ServiceArea />     {/*  9 · photo + city tiles        · neutral */}
        <ProcessRow />      {/* 10 · numbered row              · primary */}
        <Writing />         {/* 11 · compact article list      · neutral */}
        <FinalCta />        {/* 13 · split + full form         · primary */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
