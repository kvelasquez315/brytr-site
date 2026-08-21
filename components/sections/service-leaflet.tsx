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

const CARTO = "https://{s}.basemaps.cartocdn.com";
const ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

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
      const base = L.tileLayer(`${CARTO}/dark_nolabels/{z}/{x}/{y}{r}.png`, {
        subdomains: "abcd",
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

      /* the metro radius, dashed — the same device the reference uses */
      const ring = L.circle(SHOP, {
        radius: 48000, // ~30 miles, which is the same-week metro
        color: accent,
        weight: 1.5,
        dashArray: "6 7",
        fillColor: accent,
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
          If you want the drive time to an address rather than a town, call and ask —{" "}
          <a href={site.phoneHref} className="u text-on-dark underline decoration-accent decoration-2 underline-offset-4">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={host}
        className={`brytr-map w-full rounded-lg bg-primary ring-1 ring-on-dark/12 ${className}`}
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
