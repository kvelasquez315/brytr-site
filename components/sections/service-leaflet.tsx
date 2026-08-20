"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { cities } from "@/content/cities";

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

const CARTO = "https://{s}.basemaps.cartocdn.com";
const ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export function ServiceLeaflet({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const made = useRef(false);

  useEffect(() => {
    if (!host.current || made.current) return;
    made.current = true;

    let cleanup = () => {};

    (async () => {
      const L = (await import("leaflet")).default;

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
      L.tileLayer(`${CARTO}/dark_nolabels/{z}/{x}/{y}{r}.png`, {
        subdomains: "abcd",
        maxZoom: 19,
        className: "brytr-tiles-base",
        attribution: ATTR,
      }).addTo(map);

      /* the metro radius, dashed — the same device the reference uses */
      const ring = L.circle(SHOP, {
        radius: 48000, // ~30 miles, which is the same-week metro
        color: "#f5c518",
        weight: 1.5,
        dashArray: "6 7",
        fillColor: "#f5c518",
        fillOpacity: 0.05,
      }).addTo(map);

      /* type on its own pane, above the circle and the pins' glow */
      map.createPane("labels");
      const labelPane = map.getPane("labels")!;
      labelPane.style.zIndex = "650";
      labelPane.style.pointerEvents = "none";
      L.tileLayer(`${CARTO}/dark_only_labels/{z}/{x}/{y}{r}.png`, {
        subdomains: "abcd",
        maxZoom: 19,
        pane: "labels",
        className: "brytr-tiles-labels",
      }).addTo(map);

      for (const c of cities) {
        const metro = c.tier === "metro" || c.tier === "iowa";
        const size = metro ? 13 : 10;
        L.marker([c.lat, c.lon], {
          icon: L.divIcon({
            className: "",
            html: `<span class="brytr-pin${metro ? " is-metro" : ""}"></span>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
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
          iconSize: [15, 15],
          iconAnchor: [7.5, 7.5],
        }),
      })
        .addTo(map)
        .bindTooltip("Brytr crews stage here", { direction: "top", opacity: 1 });

      /* Fit the towns AND the dashed ring. Fitting the towns alone put Omaha hard on the
       * right edge and sliced the ring in half, because the ring reaches ~30 miles past
       * the easternmost pin. zoomSnap is off above, so this lands on a fractional zoom and
       * Grand Island sits just inside the left edge instead of a whole level short. */
      map.fitBounds(
        L.latLngBounds(cities.map((c) => [c.lat, c.lon] as [number, number])).extend(ring.getBounds()),
        { paddingTopLeft: [20, 16], paddingBottomRight: [20, 26] } // room for scale + attribution
      );

      /* the box is sized by the column beside it, so it can change after Leaflet has
       * already measured — without this the tiles tile out to the old height and leave
       * a grey band on the bottom edge. */
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(host.current!);

      cleanup = () => {
        ro.disconnect();
        map.remove();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={host}
      className={`brytr-map w-full rounded-lg bg-primary ring-1 ring-on-dark/12 ${className}`}
      role="application"
      aria-label="Map of the Brytr Co service area. Every city is also listed as a link beside this map."
    />
  );
}
