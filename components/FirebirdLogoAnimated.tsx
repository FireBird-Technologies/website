type Props = {
  className?: string;
  /** Stroke color. Default red brand color. */
  stroke?: string;
  /** Animation cycle in seconds. Default 6. */
  duration?: number;
};

type WirePath = {
  tag: "polygon" | "polyline" | "path";
  attrs: Record<string, string>;
};

// Right half wireframe paths (from original firebird logo wire SVG).
const rightWingPaths: WirePath[] = [
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
];

// Left half = right half mirrored across x = 74.9 (vertical center of viewBox).
const MIRROR_AXIS = 74.9;

function mirrorPoints(points: string): string {
  return points
    .split(/\s+/)
    .filter(Boolean)
    .reduce<string[]>((acc, val, i) => {
      const num = parseFloat(val);
      if (i % 2 === 0) {
        // x coordinate — mirror it
        acc.push((MIRROR_AXIS * 2 - num).toFixed(2));
      } else {
        acc.push(val);
      }
      return acc;
    }, [])
    .join(" ");
}

const leftWingPaths: WirePath[] = rightWingPaths.map((p) => {
  if (p.tag === "polygon" || p.tag === "polyline") {
    return { tag: p.tag, attrs: { points: mirrorPoints(p.attrs.points) } };
  }
  // For the single path element, hand-mirror by negating x deltas in the M and L commands.
  // The path uses relative commands which makes pure-text mirroring fragile, so we render a
  // simplified mirrored polygon that approximates the same beak region on the left side.
  return {
    tag: "polyline",
    attrs: {
      points:
        "64.8 35.2 72.5 42.8 72.4 43.6 57.9 57.7 43.1 73 42.5 73.3 41.9 73 34.6 65.5 34.6 40.9 43.4 49.6 55.3 49.6 64.8 50.2",
    },
  };
});

function WirePathsGroup({
  paths,
  stroke,
  duration,
  startDelay,
}: {
  paths: WirePath[];
  stroke: string;
  duration: number;
  startDelay: number;
}) {
  // Tight stagger on the entrance so the bird assembles itself in ~1.7s,
  // then the loop kicks in well after the hero text has settled.
  const entranceDuration = 1;
  const entranceStagger = 0.05;
  const loopOnsetDelay = 5; // when (in seconds) each path's looping cycle begins

  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth="0.6"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((p, i) => {
        const Tag = p.tag;
        const entranceDelay = startDelay + i * entranceStagger;
        const loopDelay = loopOnsetDelay + (i % paths.length) * 0.2;
        return (
          <Tag
            key={i}
            {...p.attrs}
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `firebird-entrance ${entranceDuration}s ease-out ${entranceDelay}s forwards, firebird-draw ${duration}s ease-in-out ${loopDelay}s infinite`,
            }}
          />
        );
      })}
    </g>
  );
}

/**
 * Right half of the firebird wireframe — animated.
 */
export function FirebirdHalfRight({
  className,
  stroke = "#FF2000",
  duration = 6,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="74.9 0 75.1 149"
      className={className}
      aria-hidden="true"
    >
      <WirePathsGroup paths={rightWingPaths} stroke={stroke} duration={duration} startDelay={0} />
    </svg>
  );
}

/**
 * Left half of the firebird wireframe — animated.
 */
export function FirebirdHalfLeft({
  className,
  stroke = "#FF2000",
  duration = 6,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74.9 149"
      className={className}
      aria-hidden="true"
    >
      <WirePathsGroup paths={leftWingPaths} stroke={stroke} duration={duration} startDelay={0} />
    </svg>
  );
}

/**
 * Full firebird wireframe — both halves, drawing in sync.
 */
export function FirebirdLogoAnimated({
  className,
  stroke = "#FF2000",
  duration = 6,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 149"
      className={className}
      aria-hidden="true"
    >
      <WirePathsGroup paths={rightWingPaths} stroke={stroke} duration={duration} startDelay={0} />
      <WirePathsGroup
        paths={leftWingPaths}
        stroke={stroke}
        duration={duration}
        startDelay={0}
      />
    </svg>
  );
}
