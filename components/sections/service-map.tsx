import Link from "next/link";
import { cities } from "@/content/cities";

/* SERVICE AREA MAP — drawn, not embedded.
 *
 * The section used to carry an OpenStreetMap iframe, which rendered as an empty grey box
 * whenever the embed was blocked, then a photograph, which the client correctly said was
 * not a map. This is a map: every town is plotted from its real coordinates on a simple
 * equirectangular projection, so relative positions are accurate. It makes no claim to be
 * a survey — no roads, no borders, no river — because a half-drawn basemap is worse than
 * an honest diagram. Omaha is the origin and is marked as such.
 *
 * Being an SVG it costs nothing, cannot fail to load, scales on any screen, and is the
 * only map in this trade that will match its own site's palette.
 */

const PAD = 58;
const W = 1240;
const H = 460;

export function ServiceMap() {
  const lats = cities.map((c) => c.lat);
  const lons = cities.map((c) => c.lon);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLon, maxLon] = [Math.min(...lons), Math.max(...lons)];

  /* longitude compresses with latitude; at 41°N a degree of longitude is ~0.75 of a
   * degree of latitude, so the aspect is corrected or the metro looks stretched */
  const cos = Math.cos((41.2 * Math.PI) / 180);
  const spanX = (maxLon - minLon) * cos;
  const spanY = maxLat - minLat;
  const scale = Math.min((W - PAD * 2) / spanX, (H - PAD * 2) / spanY);
  const offX = (W - spanX * scale) / 2;
  const offY = (H - spanY * scale) / 2;

  const at = (lat: number, lon: number) => ({
    x: offX + (lon - minLon) * cos * scale,
    y: offY + (maxLat - lat) * scale,
  });

  const omaha = cities.find((c) => c.slug === "omaha")!;
  const hub = at(omaha.lat, omaha.lon);

  /* rings at roughly 30 / 60 / 90 miles, drawn in the same projection units */
  const mileRing = (miles: number) => (miles / 69) * scale;

  return (
    <figure className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label="Map of the Brytr Co service area, centred on Omaha and reaching Lincoln, Norfolk, Columbus and Grand Island in Nebraska and Council Bluffs in Iowa"
      >
        {[90, 60, 30].map((m) => (
          <circle
            key={m}
            cx={hub.x}
            cy={hub.y}
            r={mileRing(m)}
            fill="none"
            stroke="var(--on-dark)"
            strokeOpacity="0.1"
            strokeDasharray="3 6"
          />
        ))}

        {/* spokes from the shop to every town: the drive, not the road */}
        {cities.map((c) => {
          if (c.slug === "omaha") return null;
          const p = at(c.lat, c.lon);
          return (
            <line
              key={`l-${c.slug}`}
              x1={hub.x}
              y1={hub.y}
              x2={p.x}
              y2={p.y}
              stroke="var(--brand-accent)"
              strokeOpacity={c.tier === "outstate" ? 0.16 : 0.3}
              strokeWidth="1"
            />
          );
        })}

        {cities.map((c) => {
          const p = at(c.lat, c.lon);
          const isHub = c.slug === "omaha";
          const right = p.x < W * 0.62;
          const labelled = isHub || c.tier !== "metro" || c.slug === "blair";
          return (
            <g key={c.slug}>
              {isHub ? (
                <>
                  <circle cx={p.x} cy={p.y} r="9" fill="var(--brand-accent)" fillOpacity="0.22" />
                  <rect x={p.x - 4.5} y={p.y - 4.5} width="9" height="9" rx="1.5" fill="var(--brand-accent)" />
                </>
              ) : (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={c.tier === "outstate" ? 3 : 3.6}
                  fill={c.tier === "outstate" ? "var(--on-dark-muted)" : "var(--brand-accent)"}
                />
              )}
              {labelled && (
                <text
                  x={right ? p.x + 10 : p.x - 10}
                  y={p.y + 4}
                  textAnchor={right ? "start" : "end"}
                  fill={isHub ? "var(--on-dark)" : "var(--on-dark-muted)"}
                  fontFamily="var(--font-display)"
                  fontWeight={isHub ? 700 : 600}
                  fontSize={isHub ? 16 : 13}
                >
                  {c.name}
                </text>
              )}
            </g>
          );
        })}

        {/* the metro cluster gets one label instead of eleven overlapping ones */}
        <text
          x={hub.x + 16}
          y={hub.y + 26}
          fill="var(--brand-accent)"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="12"
        >
          + ten more across the metro
        </text>

        {/* ring legend, sitting on the outer ring rather than in a corner box */}
        <text
          x={hub.x}
          y={hub.y - mileRing(90) - 7}
          textAnchor="middle"
          fill="var(--on-dark-muted)"
          fontFamily="var(--font-display)"
          fontSize="10.5"
          fontWeight="600"
          opacity="0.75"
        >
          rings at thirty, sixty and ninety miles
        </text>
      </svg>

      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-on-dark/10 px-5 py-4">
        <span className="label text-accent">Every town, its own page</span>
        <span className="text-[0.95rem] text-on-dark-muted">
          Not on the map?{" "}
          <Link href="/contact" className="text-on-dark underline decoration-accent decoration-2 underline-offset-4">
            Call and ask
          </Link>
          .
        </span>
      </figcaption>
    </figure>
  );
}
