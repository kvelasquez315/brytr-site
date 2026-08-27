import type { Metadata } from "next";
import { reviewProof } from "@/content/reviews";
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
  /* The review count comes from content/reviews.ts. It was hardcoded here as 177 while the
   * Google Business Profile said 196, on the site's default description. */
  description: `Permanent outdoor lighting installed once for Omaha homes. Smart app control, every color, every holiday. ${reviewProof.average} from ${reviewProof.count} ${reviewProof.platform} reviews. Free design consultation.`,
  /* THE SHARE CARD, and it was missing on all seventy-four pages.
   *
   * `openGraph` declared a type, a locale and a site name and no image, so every link to this site
   * pasted into Facebook, LinkedIn, iMessage or a text thread rendered as a bare grey box with a
   * URL in it. For a company whose entire product is photographs of lit houses, that is the worst
   * possible first impression, and it is one object in one file.
   *
   * The frame is the home hero - scripts/hero-pick.mjs measured it as the brightest wide everyday-
   * warm-white photograph in the library. 1200x630 is the size every platform crops to.
   *
   * Declared here rather than per page so it applies everywhere by default. A page with a better
   * image of its own can still override `openGraph.images`; none does yet, and a good default beats
   * seventy-four bare cards. */
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Brytr Co",
    images: [{
      url: "/img/seq-everyday.jpg",
      width: 1200,
      height: 630,
      alt: "A brick and cedar ranch west of Omaha at dusk, its roofline picked out in warm white",
    }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/* THE REAL WORK LABS LOADER. Site key FJ-P6qy5SYgFADlj.
 *
 * Real Work Labs supplied this as "paste into the sitewide <head>", which on a plain HTML site
 * means one <script> in one template. Here it means this, and the two are not quite the same
 * thing, so the differences are written down.
 *
 * WHY A RAW <script> IN A RENDERED <head>, AND NOT next/script. This was built the documented way
 * first and the documented way is wrong for an inline script.
 *
 * next/script's own reference says beforeInteractive scripts "will always be injected inside the
 * head of the HTML document regardless of where it's placed in the component". That holds for a
 * script with a `src`. For an INLINE one it does not: Next serialises it into
 * `(self.__next_s=self.__next_s||[]).push([0,{"children":"..."}])` and emits that as the first
 * element of <body>, to be evaluated by its own bootstrap. Measured in the built HTML - </head> at
 * byte 5321, <body> at 5328, the snippet at 5627. Every route, so the behaviour was consistent
 * rather than a fluke of one page.
 *
 * That version would have worked. It runs on every route and it runs before hydration, which is
 * what beforeInteractive promises. Two reasons it is not what shipped: the instruction was
 * specifically the sitewide <head>, and routing a third-party loader through Next's bootstrap
 * array makes the widget depend on Next's own runtime parsing first. A tag in <head> does not.
 *
 * So the root layout renders <head> and puts the tag in it. Verified in the built HTML on /,
 * /recent-projects, /pricing and /service-areas/[slug]: the snippet and the site key are inside
 * <head> on all of them, and the generated metadata is untouched - title, description, og:image
 * and all eight font preloads still render, which is the thing a hand-written <head> in the App
 * Router is supposed to break and does not.
 *
 * WHY THE SNIPPET IS COPIED BYTE FOR BYTE AND NOT TIDIED. It registers its rwlPluginReady listener
 * BEFORE inserting loader.js into the document, which is the whole reason the init call ever fires.
 * Reordering it, promoting the listener, or replacing the insertBefore with an append is a race
 * condition waiting for a slow network. Third-party snippets get pasted, not refactored.
 *
 * THE ONE THING REMOVED. Real Work Labs' snippet ships with `<div id="rwl-neighborhood"></div>`
 * above the script. A <div> cannot live in <head> and would not render there in any case, so it is
 * not here. That is their second widget - a location strip meant for a page body - and it is
 * deliberately not installed yet. When it is wanted, the div goes in the template that should
 * carry it (the nineteen /service-areas/[slug] pages are the obvious home) and nothing about this
 * loader changes: one loader serves both widgets.
 *
 * KNOWN LIMIT, AND IT IS THE FIRST THING TO CHECK IF THE PROJECTS DO NOT DRAW. The plugin's init
 * runs once per full page load. A visitor who lands on the home page and then reaches
 * /recent-projects by clicking the nav is doing a client-side navigation, so no script re-runs and
 * the plugin is not asked to render again. Whether it copes with that depends on the plugin, not on
 * us, and app.realworklabs.com is not reachable from the environment this was built in, so it could
 * not be tested. If the widget is blank on a soft navigation but fine on a hard reload, that is
 * this, and the fix is a small client component on the page that calls window.rwlPlugin.init again
 * on mount. Do not guess at that API before seeing the loader.
 */
const RWL_LOADER = `(function(){
             var d = document, t = 'script',
                 o = d.createElement(t),
                 s = d.getElementsByTagName(t)[0];
                 o.src = 'https://app.realworklabs.com/static/plugin/loader.js?v=' + new Date().getTime();
                 window.addEventListener('rwlPluginReady', function () {
                     window.rwlPlugin.init('https://app.realworklabs.com', 'FJ-P6qy5SYgFADlj');
                }, false);
                s.parentNode.insertBefore(o, s);

            }());`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RWL_LOADER }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
