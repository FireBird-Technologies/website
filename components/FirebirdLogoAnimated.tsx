type Props = {
  className?: string;
};

const wirePaths: { tag: "polygon" | "polyline" | "path"; attrs: Record<string, string> }[] = [
  {
    tag: "polygon",
    attrs: {
      points:
        "85 27.3 85 35.5 85.3 35.5 100.6 20.4 100.6 35 110.5 35 110.9 34.8 110.9 2.7",
    },
  },
  {
    tag: "polygon",
    attrs: {
      points: "116.1 40.6 116.1 49.3 130.6 49.6 115.9 64.7 123.5 65.5 148.1 39.6 116.4 39.6",
    },
  },
  {
    tag: "polygon",
    attrs: { points: "76.4 43.1 76.4 65 85.6 74.2 107 74.2 92.4 59.4 89.9 57.3" },
  },
  {
    tag: "polygon",
    attrs: { points: "76.4 84.2 76.4 105.2 106.8 75.2 85.6 75.2" },
  },
  {
    tag: "polygon",
    attrs: {
      points: "77.2 105.9 85 114 85 122 110.6 146.9 110.6 114.8 99.9 104.2 89.1 93.5",
    },
  },
  {
    tag: "polygon",
    attrs: { points: "115.9 83.8 123.4 83.8 148.1 109.2 116.2 109.2 115.9 108.8" },
  },
  {
    tag: "path",
    attrs: {
      d: "m85 35.2-7.7 7.6 0.1 0.8 14.5 14.1 14.8 15.3 0.6 0.3 0.6-0.3 7.3-7.5v-24.6l-8.8 8.7h-11.9l-9.5 0.6",
    },
  },
  {
    tag: "polygon",
    attrs: { points: "85 35.2 109.5 35.2 100.6 43.4 85 55.6" },
  },
  {
    tag: "polyline",
    attrs: { points: "85.2 35.2 100.4 35.2 100.6 102.6 100.5 128.7 85.7 114.5" },
  },
  {
    tag: "polyline",
    attrs: { points: "79.2 67.6 90.1 57.1 100.4 48.7 100.6 43.4 100.5 65.5 115.5 65.5" },
  },
  {
    tag: "polyline",
    attrs: { points: "82.9 71.3 93.4 61.1 100.6 56.3 106.4 50.4 115.5 41.2" },
  },
  {
    tag: "polyline",
    attrs: { points: "79.1 81.5 89.8 91.9 109.6 114.3 100.4 114.5 85.6 114.5" },
  },
  {
    tag: "polyline",
    attrs: { points: "82.7 77.9 93.6 88.4 115.9 108.1 115.9 83.9 106.8 75.9" },
  },
  {
    tag: "polyline",
    attrs: { points: "85 98.7 120 98.7 130.6 98.7 115.5 83.8 100.5 83.8 100.5 105.1" },
  },
  // Mirror group (left wing) — mirrored across vertical center (x ≈ 74.9)
  {
    tag: "polygon",
    attrs: {
      points:
        "64.8 27.3 64.8 35.5 64.5 35.5 49.2 20.4 49.2 35 39.3 35 38.9 34.8 38.9 2.7",
    },
  },
  {
    tag: "polygon",
    attrs: {
      points: "33.7 40.6 33.7 49.3 19.2 49.6 33.9 64.7 26.3 65.5 1.7 39.6 33.4 39.6",
    },
  },
  {
    tag: "polygon",
    attrs: { points: "73.4 43.1 73.4 65 64.2 74.2 42.8 74.2 57.4 59.4 59.9 57.3" },
  },
  {
    tag: "polygon",
    attrs: { points: "73.4 84.2 73.4 105.2 43 75.2 64.2 75.2" },
  },
  {
    tag: "polygon",
    attrs: {
      points: "72.6 105.9 64.8 114 64.8 122 39.2 146.9 39.2 114.8 49.9 104.2 60.7 93.5",
    },
  },
  {
    tag: "polygon",
    attrs: { points: "33.9 83.8 26.4 83.8 1.7 109.2 33.6 109.2 33.9 108.8" },
  },
];

export function FirebirdLogoAnimated({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 149"
      className={className}
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="#FF2000"
        strokeWidth="0.6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {wirePaths.map((p, i) => {
          const Tag = p.tag;
          return (
            <Tag
              key={i}
              {...p.attrs}
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: "firebird-draw 6s ease-in-out infinite",
                animationDelay: `${(i % 14) * 0.18}s`,
              }}
            />
          );
        })}
      </g>
      <style>{`
        @keyframes firebird-draw {
          0%   { stroke-dashoffset: 1;  opacity: 0; }
          12%  { opacity: 1; }
          45%  { stroke-dashoffset: 0;  opacity: 1; }
          60%  { stroke-dashoffset: 0;  opacity: 1; }
          92%  { stroke-dashoffset: -1; opacity: 0.2; }
          100% { stroke-dashoffset: -1; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
