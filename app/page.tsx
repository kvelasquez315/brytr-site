import { Header, MobileCallBar } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { ProofRail, ServicesBento, MaterialsSplit, WhyBrytr } from "@/components/sections/home-a";
import { ProjectTabs } from "@/components/sections/project-tabs";
import {
  CompareGrid, Writing, ServiceArea, ProcessRow, HomeFaq, FinalCta,
} from "@/components/sections/home-b";
import { Jsonld, localBusiness, faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/content/faqs";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Jsonld data={faqSchema(homeFaqs)} />
      <Header />
      <main>
        {/* Thirteen sections, down from twenty. The cut was made on DESIGN duplication,
          * not on content value: the page had four separate lead forms, five card grids,
          * five two-column splits and two comparison sections. What went, and why:
          *
          *  QuickQuote   form #2 of 4. The hero has one and FinalCta has one.
          *  Financing    form #3, and a /pricing subject. Page kept, section cut.
          *  CtaBand      FinalCta already does this, better.
          *  SceneRail    said the same thing as SceneWipe with more pixels. The eight
          *               scene photographs all live on /gallery.
          *  AppSplit     the app interface was drawn in HTML rather than photographed.
          *               Comes back when Zac sends a real screenshot.
          *  Reviews      content/reviews.ts is deliberately empty — no real review text
          *               exists yet — so the section rendered as numbers we already
          *               state in the band above it.
          *  VersusTable  same argument as CompareGrid, twice. CompareGrid wins: it is
          *               specific brands, and it links nine pages that exist.
          *
          * Every archetype below is used exactly once. */}
        <Hero />            {/*  1 · full-bleed photo + form   · photo   */}
        <ProofRail />       {/*  2 · one compact row           · primary */}
        <ServicesBento />   {/*  3 · card grid                 · neutral */}
        <SceneWipe />       {/*  4 · THE SIGNATURE             · raise   */}
        <MaterialsSplit />  {/*  5 · split, hardware left      · deep    */}
        <WhyBrytr />        {/*  6 · four-up + bridge          · primary */}
        <CompareGrid />     {/*  7 · three brands + link       · neutral */}
        <ProjectTabs />     {/*  8 · tabbed photo gallery      · raise   */}
        <ServiceArea />     {/*  9 · photo + city tiles        · neutral */}
        <ProcessRow />      {/* 10 · numbered row              · primary */}
        <Writing />         {/* 11 · compact article list      · neutral */}
        <HomeFaq />         {/* 12 · accordion + aside         · deep    */}
        <FinalCta />        {/* 13 · split + full form         · primary */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
