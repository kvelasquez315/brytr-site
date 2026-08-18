import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted from @fontsource (npm), not fetched from Google at build time.
   Three roles per DESIGN.md: display / body / utility. */
const chivo = localFont({
  src: [
    { path: "./fonts/chivo-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/chivo-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-chivo",
  display: "swap",
});
const figtree = localFont({
  src: [
    { path: "./fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/figtree-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-figtree",
  display: "swap",
});
const plexMono = localFont({
  src: [{ path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" }],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brytrco.com"),
  title: {
    default: "Permanent Outdoor Lighting in Omaha, NE | Brytr Co",
    template: "%s | Brytr Co",
  },
  description:
    "Permanent outdoor lighting installed once for Omaha homes. Smart app control, every color, every holiday. 177 five star reviews. Free design consultation.",
  openGraph: { type: "website", locale: "en_US", siteName: "Brytr Co" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${chivo.variable} ${figtree.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
