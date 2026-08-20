import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
/* Section-level CSS, imported after the brand lock so its @layer components rules join
 * the layer Tailwind has already declared. Kept in its own sheet because globals.css is
 * the brand lock — tokens, type, the signature device — and it should not grow a rule
 * every time a page gets built. */
import "./sections.css";

/* Self-hosted from @fontsource (npm), not fetched from Google at build time.
   Three roles per DESIGN.md: display / body / utility. */
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/archivo-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});
const plexSans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-sans",
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
    <html lang="en" className={`${archivo.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
