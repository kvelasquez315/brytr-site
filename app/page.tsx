import { Header, MobileCallBar } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HeroDusk } from "@/components/sections/hero-dusk";
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
        <HeroDusk />        {/*  3 · signature hero      · photo   */}
        <QuickQuote />      {/*  4 · split + stats       · neutral */}
        <ProofRail />       {/*  5 · rail                · primary */}
        <ServicesBento />   {/*  6 · bento grid          · neutral */}
        <MaterialsSplit />  {/*  7 · split, photo left   · deep    */}
        <WhyBrytr />        {/*  8 · 4-up + bridge       · primary */}
        <SceneRail />       {/*  9 · media + chip rail   · raise   */}
        <AppSplit />        {/* 10 · split reversed      · neutral */}
        <Founders />        {/* 11 · portraits + story   · deep    */}
        <VersusTable />     {/* 12 · comparison table    · primary */}
        <ServiceArea />     {/* 13 · map + city tiles    · neutral */}
        <ProjectTabs />     {/* 14 · tabbed gallery      · raise   */}
        <CtaBand />         {/* 15 · short band          · primary */}
        <ProcessRow />      {/* 16 · numbered row        · neutral */}
        <Reviews />         {/* 17 · proof grid          · deep    */}
        <Financing />       {/* 18 · split + form        · primary */}
        <HomeFaq />         {/* 19 · accordion           · neutral */}
        <FinalCta />        {/* 20 · split + full form   · deep    */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
