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
 * CARTO dark tiles, because the site is a night-sky palette and a bright Google-grey
 * basemap would fight it. Attribution is required and is rendered — do not remove it.
 *
 * Scroll-wheel zoom is OFF deliberately. A map that swallows the page scroll is the most
 * hated pattern in local-business web design; you click once to interact, and the site
 * scroll never gets hijacked.
 */

const SHOP: [number, number] = [41.2565, -96.1951]; // west Omaha, where the crews stage

export function ServiceLeaflet() {
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
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      /* the metro radius, dashed — the same device the reference uses */
      L.circle(SHOP, {
        radius: 48000, // ~30 miles, which is the same-week metro
        color: "#f5c518",
        weight: 1.5,
        dashArray: "6 7",
        fillColor: "#f5c518",
        fillOpacity: 0.06,
      }).addTo(map);

      for (const c of cities) {
        const metro = c.tier === "metro" || c.tier === "iowa";
        L.circleMarker([c.lat, c.lon], {
          radius: metro ? 6 : 5,
          color: metro ? "#f5c518" : "#ccd3da",
          weight: 2,
          fillColor: metro ? "#f5c518" : "#ccd3da",
          fillOpacity: 1,
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
          html: '<span style="display:block;width:14px;height:14px;border-radius:2px 2px 5px 5px;background:#f5c518;box-shadow:0 0 0 5px rgba(245,197,24,.22)"></span>',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
      })
        .addTo(map)
        .bindTooltip("Brytr crews stage here", { direction: "top", opacity: 1 });

      map.fitBounds(
        L.latLngBounds(cities.map((c) => [c.lat, c.lon] as [number, number])).pad(0.12)
      );

      cleanup = () => map.remove();
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={host}
      className="brytr-map aspect-4/3 w-full rounded-lg bg-primary ring-1 ring-on-dark/12 lg:aspect-auto lg:h-[34rem]"
      role="application"
      aria-label="Map of the Brytr Co service area. Every city is also listed as a link beside this map."
    />
  );
}
