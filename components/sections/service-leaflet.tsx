"use client";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { cities } from "@/content/cities";
import { site } from "@/content/site";

/* SERVICE AREA MAP — Leaflet, per the reference (freedomexteriorsusa.com).
 *
 * Third attempt at this section and the first one the client asked for by name. It was an
 * OpenStreetMap iframe (an empty grey box whenever the embed was blocked), then a
 * photograph (not a map), then an SVG I plotted by hand — accurate, but a scatter of dots
 * with no coastline or roads, so nobody could tell where they were looking. A real tiled
 * basemap gives the pins something to sit on, which is the whole point.
 *
 * Vanilla Leaflet rather than react-leaflet: one dependency instead of two, no peer-range
 * argument with React 19, and this map is written once and never re-renders.
 *
 * BRIGHTNESS: the first pass used CARTO dark_all straight, which on a night-sky page was
 * near-black on near-black — roads and town names were technically there and practically
 * invisible. Three changes, not one:
 *   1. Basemap and labels are separate layers. Labels ride in their own pane ABOVE the
 *      dashed metro circle, so the towns stay readable instead of being washed out by it.
 *   2. Both layers are brightened in CSS (.brytr-tiles-*) rather than swapped for a light
 *      basemap — a white Google-grey map would fight the rest of the page.
 *   3. Every city is a LIT pin: an amber dot with a real glow, so the map reads like a
 *      map of lights rather than a scatter plot. That is the product.
 *
 * Scroll-wheel zoom is OFF deliberately. A map that swallows the page scroll is the most
 * hated pattern in local-business web design; you click once to interact, and the site
 * scroll never gets hijacked.
 *
 * Height comes from the parent (the column it shares with the city list), so the map fills
 * whatever the list leaves rather than stopping short and leaving a dead band beneath it.
 * That means the box can resize after Leaflet has measured it, hence the ResizeObserver.
 */

const SHOP: [number, number] = [41.2565, -96.1951]; // west Omaha, where the crews stage

/* THE BASEMAP MOVED OFF CARTO, AND THE WAY IT BROKE IS WORTH RECORDING.
 *
 * CARTO now require an API key for basemaps.cartocdn.com. They did not start returning 403 - they
 * return HTTP 200 with a tile that has "API KEY REQUIRED / carto.com/basemaps/apikey" printed
 * diagonally across it. So the map kept "working": every tile loaded, the tileerror handler never
 * fired, the written fallback never showed, and the service-area map on nineteen pages quietly
 * became a wall of watermarks.
 *
 * It also passed my own check. I verified this CDN with `curl -o /dev/null -w "%{http_code}"` and
 * got 200, which told me nothing at all - the failure is in the pixels. Checking an image endpoint
 * means looking at the image.
 *
 * Esri's Dark Gray Canvas needs no key, has the same two-layer split this component already relies
 * on (a base with roads and county lines, a reference layer carrying place names), and is a genuine
 * dark basemap rather than a light one dimmed in CSS. Attribution is required and is set below.
 *
 * NOTE THE AXIS ORDER: Esri serves {z}/{y}/{x}, not Leaflet's usual {z}/{x}/{y}. Getting that wrong
 * does not error either - it renders a coherent map of somewhere else. */
const OSM = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function ServiceLeaflet({
  className = "",
  legend = false,
}: {
  className?: string;
  /* THE LEGEND BELONGS TO THE MAP, so it renders in here rather than as a sibling.
   *
   * It used to sit in the calling page as its own panel: an amber glowing dot for "Metro, same
   * week", a grey dot for "Outstate, by route day", and a short dashed amber rule for "Roughly a
   * half hour from the shop". Correct next to a map. Next to a panel apologising that the map did
   * not load, it is three floating marks captioning nothing — and one of them is a dashed amber
   * line, which on its own is decorative geometry in the accent colour.
   *
   * Inside the component it disappears with the thing it describes. */
  legend?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const made = useRef(false);
  /* WHEN THE TILES DO NOT ARRIVE.
   *
   * Everything drawn on top of the basemap — the dashed thirty-mile ring, the amber pin for
   * every town, the glow on each pin — is cartography while there is a map under it. With the
   * tiles missing it is a dashed circle and a scatter of glowing dots on a flat dark panel,
   * which is precisely the decorative geometry this site is not allowed to contain: a ring, a
   * field of dots, and amber used where no light is coming out of anything.
   *
   * A design critic looking at a screenshot called it the worst thing on the site, and was
   * right about what they were looking at. It happens whenever the tile CDN is unreachable —
   * a blocked egress, an outage, a corporate network — and the failure is silent, so the site
   * would ship looking like that to some fraction of readers with nobody ever seeing it.
   *
   * So a tile error tears the whole thing down and puts up a plain panel that says the map did
   * not load and points at the list of towns, which is on every page that carries this map and
   * is the better answer to the question anyway. Nothing decorative survives the failure. */
  const [tilesFailed, setTilesFailed] = useState(false);

  useEffect(() => {
    if (!host.current || made.current) return;
    made.current = true;

    let cleanup = () => {};

    (async () => {
      const L = (await import("leaflet")).default;

      /* Leaflet's vector options take a colour STRING, not a class, so this is the one place on
       * the site that needs the accent as a value rather than as a Tailwind token. It is read off
       * the document instead of written as a literal, because the brand-lock rule is that no hex
       * appears outside globals.css and app/sections.css and there is no reason for this to be
       * the exception. If the variable ever moves, this follows it. */
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--brand-accent").trim() ||
        "currentColor";

      const map = L.map(host.current!, {
        center: [41.15, -96.6],
        zoom: 8,
        /* fractional zoom, or fitBounds rounds DOWN to the next whole level and the
         * whole service area sits in the middle of the frame with a third of the map
         * spare on every side. With zoomSnap off, Grand Island lands on the edge —
         * which is where the furthest town should be. */
        zoomSnap: 0,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      /* base: roads and county lines, no type */
      const base = L.tileLayer(OSM, {
        maxZoom: 19,
        className: "brytr-tiles-base",
        attribution: ATTR,
      });
      /* One failed tile is a transient; several means the CDN is not reachable from wherever
       * this reader is. Three is enough to be sure and few enough to fail fast. */
      let tileErrors = 0;
      base.on("tileerror", () => {
        tileErrors += 1;
        if (tileErrors >= 3) {
          map.remove();
          setTilesFailed(true);
        }
      });
      base.addTo(map);

      /* THE 30-MILE RING IS GONE, AND THE SERVICE AREA CHANGE IS WHY.
       *
       * It was drawn to say "everything inside here is the same-week metro" while six towns sat
       * outside it, out to Grand Island. With the area now Omaha metro plus Council Bluffs, the
       * ring encloses every pin on the map and says nothing the pins do not already say.
       *
       * It was also setting the zoom, and badly. fitBounds was fed the pins AND the ring, and the
       * ring reaches 30 miles past the outermost pin in every direction - so a 60-mile circle was
       * being fitted into a container running about 2.9:1, which fits the circle vertically and
       * then shows 170 miles of Nebraska either side of it. The towns came out as a small gold
       * cluster in a lot of empty farmland.
       *
       * Fitting the pins alone roughly doubles the zoom and the metro fills the frame. */

      /* NO SECOND LAYER. The dark canvas needed one - the basemap carried roads and the labels
       * came separately, so type could ride above the metro ring instead of under it. OSM standard
       * is a single rendered tile with its labels already in it, so the extra pane would be an
       * empty layer and a z-index to maintain. */

/* THE PINS POINT AT THE TOWN INSTEAD OF SITTING ON IT, and the reason is the basemap change.
       *
       * On the dark canvas the town names arrived in their own reference layer, in a pane ABOVE the
       * markers, so a dot centred on the coordinate was drawn UNDER the label and nothing was lost.
       * OSM standard renders its labels into the tile itself, so that stacking inverts: every pin
       * became a blob sitting in the middle of the word it was marking. The first screenshot after
       * the swap read "N(dot)lk", "Co(dot)bus", "F(dot)nt" and "(dot)rand Island".
       *
       * So the marker is a teardrop now - the tip on the coordinate, the body above it, which is
       * the ordinary map convention and clears the label by its whole height. It also unstacks the
       * metro: eleven dots inside thirty miles were one gold mass, and eleven teardrops of two
       * sizes leaning out of the same cluster can at least be counted.
       *
       * THE TIP IS NOT THE BOX CORNER. The shape is a square with three round corners rotated -45
       * degrees, so the sharp corner lands 0.207 x size BELOW the box - the anchor has to account
       * for it or every pin points slightly above where it means. */
      const tip = (size: number) => Math.round(size * 1.207);

      /* PIN SIZE FOLLOWS THE CONTAINER, and this is not polish - at a phone width it is the
       * difference between a map and a gold smear.
       *
       * The box is 754px on desktop and 327px on a 375px phone, but Leaflet sizes an icon in
       * absolute pixels, so the same 19px teardrop is 2.5 percent of the desktop map and 6 percent
       * of the mobile one. Twelve of them inside a thirty-mile ring that is itself only about
       * ninety pixels across came out as one mass with the word "Omaha" somewhere underneath it.
       *
       * Shrinking them does not make the metro individually clickable at that size and it is not
       * meant to - the towns are all listed as their own cards beside the map, which is where
       * anyone on a phone will actually tap. What the map has to do there is show WHERE the work
       * is, and it can only do that if the ring, the labels and the count of pins survive.
       *
       * Read once, at init. Markers are built once and the anchor is baked into each icon, so a
       * CSS-only shrink would leave every tip pointing above its town. */
      const compact = host.current!.clientWidth < 480;

      for (const c of cities) {
        const metro = c.tier === "metro" || c.tier === "iowa";
        const size = metro ? (compact ? 12 : 19) : (compact ? 10 : 15);
        L.marker([c.lat, c.lon], {
          icon: L.divIcon({
            className: "",
            html: `<span class="brytr-pin${metro ? " is-metro" : ""}"></span>`,
            iconSize: [size, tip(size)],
            iconAnchor: [size / 2, tip(size)],
          }),
          keyboard: false,
        })
          .addTo(map)
          .bindTooltip(`${c.name} · ${c.drive}`, { direction: "top", opacity: 1 })
          .on("click", () => {
            window.location.href = `/service-areas/${c.slug}`;
          });
      }

      /* the shop itself, squared off like the channel end-cap */
      L.marker(SHOP, {
        icon: L.divIcon({
          className: "",
          html: '<span class="brytr-shop"></span>',
          iconSize: [compact ? 11 : 16, compact ? 13 : 20],
          iconAnchor: [compact ? 5.5 : 8, compact ? 13 : 20],
        }),
      })
        .addTo(map)
        .bindTooltip("Brytr crews stage here", { direction: "top", opacity: 1 });

      /* Fit the towns AND the dashed ring. Fitting the towns alone put Omaha hard on the
       * right edge and sliced the ring in half, because the ring reaches ~30 miles past
       * the easternmost pin. zoomSnap is off above, so this lands on a fractional zoom and
       * Grand Island sits just inside the left edge instead of a whole level short. */
      map.fitBounds(
        L.latLngBounds(cities.map((c) => [c.lat, c.lon] as [number, number])).extend([SHOP]),
        /* PADDING WENT UP WITH THE PIN HEIGHT. It was 20px a side, set when a pin was a 10px dot
         * centred on its point and 20px cleared it easily. A teardrop is 19px wide and hangs its
         * whole body ABOVE the coordinate, and the tile draws the town name beside the point too -
         * so at 20px, Grand Island (the westernmost town, hard against the left edge by design)
         * lost the left half of its pin and the "G" of its label to the container edge. */
        compact
          ? { paddingTopLeft: [26, 22] as [number, number], paddingBottomRight: [22, 26] as [number, number] }
          : { paddingTopLeft: [46, 40] as [number, number], paddingBottomRight: [40, 34] as [number, number] }
      );

      /* the box is sized by the column beside it, so it can change after Leaflet has
       * already measured — without this the tiles tile out to the old height and leave
       * a grey band on the bottom edge. */
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(host.current!);

      cleanup = () => {
        ro.disconnect();
        /* The tileerror handler may already have removed the map. Calling remove() twice
         * throws, and it throws inside a cleanup function, where React swallows nothing. */
        try {
          map.remove();
        } catch {
          /* already torn down */
        }
      };
    })();

    return () => cleanup();
  }, []);

  if (tilesFailed) {
    /* Drop any aspect or min-height the caller passed. Those exist to give a MAP a shape while
     * it loads; applied to four lines of text they produce a tall box with ninety pixels of dead
     * space above the copy and ninety below it, which is the blank-space failure appearing as a
     * side effect of an error state. The fallback sizes to its own content. */
    const shape = className
      .split(/\s+/)
      .filter((c) => c && !/^(lg:)?(aspect-|min-h-|h-|flex-1$)/.test(c))
      .join(" ");
    return (
      <div className={`w-full rounded-lg bg-primary p-7 ring-1 ring-on-dark/12 ${shape}`}>
        <p className="label flex items-center gap-3 text-on-dark">
          <span className="block h-4 w-1 bg-accent" aria-hidden />
          The map did not load
        </p>
        <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-on-dark-muted">
          Something between you and the map service is blocking it. Nothing is missing: every town
          we drive to is written out beside this panel, with the drive from our shop against each
          one, and each is a page of its own.
        </p>
        <p className="mt-5 text-sm text-on-dark-muted">
          If you want the drive time to an address rather than a town, call and ask.{" "}
          <a href={site.phoneHref} className="u text-on-dark underline decoration-accent decoration-2 underline-offset-4">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={host}
        className={`brytr-map w-full rounded-lg bg-muted ring-1 ring-border ${className}`}
        role="application"
        aria-label="Map of the Brytr Co service area. Every city is also listed as a link beside this map."
      />
      {legend ? (
        <ul className="flex flex-wrap gap-x-6 gap-y-2 rounded-md bg-primary px-4 py-3 ring-1 ring-on-dark/10">
          <li className="flex items-center gap-2 text-sm text-on-dark-muted">
            <span className="size-2.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--brand-accent)]" aria-hidden />
            Metro, same week
          </li>
          <li className="flex items-center gap-2 text-sm text-on-dark-muted">
            <span className="size-2.5 rounded-full bg-on-dark/70" aria-hidden />
            Outstate, by route day
          </li>
          <li className="flex items-center gap-2 text-sm text-on-dark-muted">
            <span className="h-0 w-6 border-t border-dashed border-accent" aria-hidden />
            Roughly a half hour from the shop
          </li>
        </ul>
      ) : null}
    </>
  );
}
