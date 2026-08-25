import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { ProofRail } from "@/components/sections/proof-rail";
import { SceneWipe } from "@/components/sections/scene-wipe";
import {
  WhoWeAre,
  Services,
  HowWeWork,
  Founders,
  WhyTrust,
  Reviews,
  RecentWork,
  CallToAction,
  Faqs,
  Closer,
} from "@/components/sections/home-phx";
import { Jsonld, localBusiness } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        {/* THIRTEEN SECTIONS, IN PHOENIXROOFINGANDREPAIR.COM'S ORDER, SLOT FOR SLOT.
          *
          * The brief: "Look at phoenixroofingandrepair.com and basically copy their exact layout
          * of their website, just with our brand colors and information and pictures. The layout
          * should be exactly the same." So the page below is their page. I opened it in Chrome and
          * measured it rather than reading a markdown conversion of it - the mistake that cost
          * three rounds earlier - and what came back was thirteen sections in a fixed order, a
          * card radius of 12px with 38 pill elements, one soft warm shadow, and H2s at 50px/800
          * in a condensed face with a single 64px exception over the reviews.
          *
          * WHAT MAPS ONE-TO-ONE. Their hero with the badge row above the headline and a dark form
          * card on the photograph; their who-we-are with a photo mosaic against a 2x2 feature
          * grid; their five photo service cards plus a sixth dark promo card; their split with
          * four icon rows against a tall photograph; their founders; their why-trust ticks; their
          * dark staggered review band; their work grid; their coloured call-to-action; their card
          * accordion; their closing form.
          *
          * WHERE I DEPART FROM THEM, AND IT IS ONLY EVER FOR THE SAME REASON. Phoenix's second
          * section is eight industry marks - GAF Master Elite, HAAG, TRI, BBB A+, Inc. 5000.
          * Brytr holds none of those. That slot keeps Phoenix's shape and carries the one thing
          * that is true and checkable, the Google rating, which is also what the client asked for
          * two rounds ago: "It should just have reviews and then the Google logo." Their video
          * testimonial card is a photograph here because there is no video. Their award card is a
          * review. Nothing on this page is a credential Brytr does not hold.
          *
          * THE COLOUR TRANSLATION. Their orange #FD7206 is our amber, their near-black #1E1E1E is
          * our navy, their cream #FFF6F0 is our warm neutral, their dark brown gradient is our
          * raise. Every value comes from a token in globals.css - there is no hex in this tree.
          *
          * THE GROUND ALTERNATES THE WHOLE WAY DOWN and never repeats across a seam: photograph,
          * cream, white, cream, white, cream, dark, white, dark, cream, amber, white, cream, into
          * the footer. No rules drawn between sections. */}
        <Hero />          {/*  1 · photograph, badge row, dark form card      · photo      */}
        <ProofRail />     {/*  2 · their certifications slot → the rating     · muted      */}
        <WhoWeAre />      {/*  3 · WHO WE ARE - photo mosaic | 2x2 features   · background */}
        <Services />      {/*  4 · OUR SERVICES - 5 photo cards + 1 dark      · muted      */}
        <HowWeWork />     {/*  5 · HOW WE WORK - 4 icon rows | tall photo     · background */}
        <Founders />      {/*  6 · their two-brothers slot - Zac and Sam      · muted      */}
        <SceneWipe />     {/*  7 · their find-your-service slot - the wipe    · raise      */}
        <WhyTrust />      {/*  8 · WHY HOMEOWNERS TRUST US - ticks | photo    · background */}
        <Reviews />       {/*  9 · WHAT OUR CLIENTS SAY - staggered cards     · raise      */}
        <RecentWork />    {/* 10 · RECENT WORK - the photo grid               · muted      */}
        <CallToAction />  {/* 11 · their ready-for-a-roof band, two pills     · accent     */}
        <Faqs />          {/* 12 · MOST ASKED - the card accordion            · background */}
        <Closer />        {/* 13 · the form above the footer                  · muted      */}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
