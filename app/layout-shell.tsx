import { Header, MobileCallBar } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
