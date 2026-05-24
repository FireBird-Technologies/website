import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FireBird Technologies — AI . Tech . Fire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#FF2000";

// Firebird wireframe paths — copied verbatim from FirebirdLogoAnimated so the
// OG card shows the bird in its fully-drawn final state. Drawn once at a
// larger stroke width than the on-site version since the OG image is rendered
// at small sizes in feed previews.
const wirePaths: { tag: "polygon" | "polyline" | "path"; attrs: Record<string, string> }[] = [
  { tag: "polygon", attrs: { points: "85 27.3 85 35.5 85.3 35.5 100.6 20.4 100.6 35 110.5 35 110.9 34.8 110.9 2.7" } },
  { tag: "polygon", attrs: { points: "116.1 40.6 116.1 49.3 130.6 49.6 115.9 64.7 123.5 65.5 148.1 39.6 116.4 39.6" } },
  { tag: "polygon", attrs: { points: "76.4 43.1 76.4 65 85.6 74.2 107 74.2 92.4 59.4 89.9 57.3" } },
  { tag: "polygon", attrs: { points: "76.4 84.2 76.4 105.2 106.8 75.2 85.6 75.2" } },
  { tag: "polygon", attrs: { points: "77.2 105.9 85 114 85 122 110.6 146.9 110.6 114.8 99.9 104.2 89.1 93.5" } },
  { tag: "polygon", attrs: { points: "115.9 83.8 123.4 83.8 148.1 109.2 116.2 109.2 115.9 108.8" } },
  { tag: "path", attrs: { d: "m85 35.2-7.7 7.6 0.1 0.8 14.5 14.1 14.8 15.3 0.6 0.3 0.6-0.3 7.3-7.5v-24.6l-8.8 8.7h-11.9l-9.5 0.6" } },
  { tag: "polygon", attrs: { points: "85 35.2 109.5 35.2 100.6 43.4 85 55.6" } },
  { tag: "polyline", attrs: { points: "85.2 35.2 100.4 35.2 100.6 102.6 100.5 128.7 85.7 114.5" } },
  { tag: "polyline", attrs: { points: "79.2 67.6 90.1 57.1 100.4 48.7 100.6 43.4 100.5 65.5 115.5 65.5" } },
  { tag: "polyline", attrs: { points: "82.9 71.3 93.4 61.1 100.6 56.3 106.4 50.4 115.5 41.2" } },
  { tag: "polyline", attrs: { points: "79.1 81.5 89.8 91.9 109.6 114.3 100.4 114.5 85.6 114.5" } },
  { tag: "polyline", attrs: { points: "82.7 77.9 93.6 88.4 115.9 108.1 115.9 83.9 106.8 75.9" } },
  { tag: "polyline", attrs: { points: "85 98.7 120 98.7 130.6 98.7 115.5 83.8 100.5 83.8 100.5 105.1" } },
];

const MIRROR_AXIS = 74.9;

function mirrorPoints(points: string): string {
  return points
    .split(/\s+/)
    .filter(Boolean)
    .map((val, i) => (i % 2 === 0 ? (MIRROR_AXIS * 2 - parseFloat(val)).toFixed(2) : val))
    .join(" ");
}

const mirroredPaths = wirePaths.map((p) => {
  if (p.tag === "polygon" || p.tag === "polyline") {
    return { tag: p.tag, attrs: { points: mirrorPoints(p.attrs.points) } };
  }
  return {
    tag: "polyline" as const,
    attrs: {
      points:
        "64.8 35.2 72.5 42.8 72.4 43.6 57.9 57.7 43.1 73 42.5 73.3 41.9 73 34.6 65.5 34.6 40.9 43.4 49.6 55.3 49.6 64.8 50.2",
    },
  };
});

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Red top bar — brand signature */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: RED,
          }}
        />

        {/* Soft red glow behind the bird */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 700,
            height: 700,
            transform: "translate(-50%, -50%)",
            background: RED,
            opacity: 0.12,
            filter: "blur(120px)",
            borderRadius: 9999,
          }}
        />

        {/* Wireframe firebird emblem */}
        <svg
          width="520"
          height="520"
          viewBox="0 0 150 149"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.85,
          }}
        >
          <g
            fill="none"
            stroke={RED}
            strokeWidth="1.0"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {[...wirePaths, ...mirroredPaths].map((p, i) => {
              const Tag = p.tag as "polygon" | "polyline" | "path";
              return <Tag key={i} {...p.attrs} />;
            })}
          </g>
        </svg>

        {/* Text stack centered on top of the emblem */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: RED,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            AI . Tech . Fire
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              marginBottom: 28,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            FireBird Technologies
            <span style={{ color: RED, marginLeft: 4 }}>.</span>
          </div>

          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 28,
              fontWeight: 400,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Open-source AI analytics & bespoke LLM systems.
          </div>
        </div>

        {/* Bottom-left signature */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 4,
              height: 28,
              background: RED,
            }}
          />
          <div
            style={{
              color: "rgba(255, 255, 255, 0.45)",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            firebird-technologies.com
          </div>
        </div>

        {/* Bottom-right signature */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 48,
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Singapore · est. 2023
        </div>
      </div>
    ),
    { ...size }
  );
}
