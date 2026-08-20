import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header nav={navTree} />
      <main>{children}</main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
