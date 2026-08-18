import { Header, MobileCallBar } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { SceneWipe } from "@/components/sections/scene-wipe";
import { QuickQuote, ProofRail, ServicesBento, MaterialsSplit, WhyBrytr } from "@/components/sections/home-a";
import { SceneRail } from "@/components/sections/scene-rail";
import { ProjectTabs } from "@/components/sections/project-tabs";
import {
  AppSplit, Founders, VersusTable, ServiceArea, CtaBand, ProcessRow, Reviews, Financing, HomeFaq, FinalCta,
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
        <Hero />            {/*  3 · full-bleed photo + form in hero · photo   */}
        <ProofRail />       {/*  4 · certification band, thin        · primary */}
        <ServicesBento />   {/*  5 · bento grid                      · neutral */}
        <SceneWipe />       {/*  6 · THE SIGNATURE: the dusk line    · raise   */}
        <MaterialsSplit />  {/*  7 · split, photo left               · deep    */}
        <WhyBrytr />        {/*  8 · 4-up + bridge                   · primary */}
        <QuickQuote />      {/*  9 · form + stats, mid-page convert  · neutral */}
        <SceneRail />       {/* 10 · media + chip rail               · raise   */}
        <AppSplit />        {/* 11 · split reversed                  · neutral */}
        <Founders />        {/* 12 · portraits + story               · deep    */}
        <VersusTable />     {/* 13 · comparison table                · primary */}
        <ServiceArea />     {/* 14 · map + city tiles                · neutral */}
        <ProjectTabs />     {/* 15 · tabbed gallery                  · raise   */}
        <CtaBand />         {/* 16 · short band                      · primary */}
        <ProcessRow />      {/* 17 · numbered row                    · neutral */}
        <Reviews />         {/* 18 · proof grid                      · deep    */}
        <Financing />       {/* 19 · split + form                    · primary */}
        <HomeFaq />         {/* 20 · accordion                       · neutral */}
        <FinalCta />        {/* 21 · split + full form               · deep    */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
