// Generates `public/firebird-wireframe.gif` by rasterizing N SVG frames
// of the firebird wireframe at varying draw-progress points, then encoding
// the frame sequence into a GIF.
//
// Run with: node scripts/generate-firebird-gif.mjs

import { Resvg } from "@resvg/resvg-js";
import gifenc from "gifenc";
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "..", "public", "firebird-wireframe.gif");

const RED = "#FF2000";
const BG = "#000000";
const SIZE = 800; // px square output

// Same wire paths as the React component, kept in sync manually.
const rightWingPaths = [
  { tag: "polygon", points: "85 27.3 85 35.5 85.3 35.5 100.6 20.4 100.6 35 110.5 35 110.9 34.8 110.9 2.7" },
  { tag: "polygon", points: "116.1 40.6 116.1 49.3 130.6 49.6 115.9 64.7 123.5 65.5 148.1 39.6 116.4 39.6" },
  { tag: "polygon", points: "76.4 43.1 76.4 65 85.6 74.2 107 74.2 92.4 59.4 89.9 57.3" },
  { tag: "polygon", points: "76.4 84.2 76.4 105.2 106.8 75.2 85.6 75.2" },
  { tag: "polygon", points: "77.2 105.9 85 114 85 122 110.6 146.9 110.6 114.8 99.9 104.2 89.1 93.5" },
  { tag: "polygon", points: "115.9 83.8 123.4 83.8 148.1 109.2 116.2 109.2 115.9 108.8" },
  { tag: "path", d: "m85 35.2-7.7 7.6 0.1 0.8 14.5 14.1 14.8 15.3 0.6 0.3 0.6-0.3 7.3-7.5v-24.6l-8.8 8.7h-11.9l-9.5 0.6" },
  { tag: "polygon", points: "85 35.2 109.5 35.2 100.6 43.4 85 55.6" },
  { tag: "polyline", points: "85.2 35.2 100.4 35.2 100.6 102.6 100.5 128.7 85.7 114.5" },
  { tag: "polyline", points: "79.2 67.6 90.1 57.1 100.4 48.7 100.6 43.4 100.5 65.5 115.5 65.5" },
  { tag: "polyline", points: "82.9 71.3 93.4 61.1 100.6 56.3 106.4 50.4 115.5 41.2" },
  { tag: "polyline", points: "79.1 81.5 89.8 91.9 109.6 114.3 100.4 114.5 85.6 114.5" },
  { tag: "polyline", points: "82.7 77.9 93.6 88.4 115.9 108.1 115.9 83.9 106.8 75.9" },
  { tag: "polyline", points: "85 98.7 120 98.7 130.6 98.7 115.5 83.8 100.5 83.8 100.5 105.1" },
];

const MIRROR_AXIS = 74.9;
function mirrorPoints(points) {
  return points
    .split(/\s+/)
    .filter(Boolean)
    .map((val, i) => (i % 2 === 0 ? (MIRROR_AXIS * 2 - parseFloat(val)).toFixed(2) : val))
    .join(" ");
}

const leftWingPaths = rightWingPaths.map((p) => {
  if (p.tag === "polygon" || p.tag === "polyline") {
    return { tag: p.tag, points: mirrorPoints(p.points) };
  }
  // mirrored beak approximation
  return {
    tag: "polyline",
    points:
      "64.8 35.2 72.5 42.8 72.4 43.6 57.9 57.7 43.1 73 42.5 73.3 41.9 73 34.6 65.5 34.6 40.9 43.4 49.6 55.3 49.6 64.8 50.2",
  };
});

const allPaths = [...rightWingPaths, ...leftWingPaths];

/**
 * Build an SVG string showing the wireframe at the given progress (0 → 1).
 * Each path is normalized via pathLength=1 and progressively revealed using
 * stroke-dasharray / stroke-dashoffset. Paths are staggered so the bird
 * assembles itself line by line over the course of the animation.
 *
 * progress in [0, 1.2]:
 *   0     → fully invisible
 *   1     → fully drawn
 *   1→1.2 → "hold" tail (kept fully drawn briefly so the GIF doesn't snap reset)
 */
function buildSvg(progress) {
  const N = allPaths.length;
  const stagger = 0.025; // fraction of total progress between successive paths
  const drawWindow = 1 - stagger * (N - 1);

  const paths = allPaths.map((p, i) => {
    const startAt = i * stagger;
    const endAt = startAt + drawWindow;
    // Clamp progress relative to this path's window.
    const local =
      progress <= startAt ? 0 : progress >= endAt ? 1 : (progress - startAt) / (endAt - startAt);
    const dashOffset = 1 - local; // 1 (hidden) → 0 (drawn)
    const opacity = local < 0.02 ? 0 : 1;

    const common = `pathLength="1" stroke-dasharray="1" stroke-dashoffset="${dashOffset.toFixed(
      3
    )}" opacity="${opacity}"`;

    if (p.tag === "polygon") {
      return `<polygon points="${p.points}" ${common} />`;
    }
    if (p.tag === "polyline") {
      return `<polyline points="${p.points}" ${common} />`;
    }
    return `<path d="${p.d}" ${common} />`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 149" width="${SIZE}" height="${SIZE}">
  <rect width="100%" height="100%" fill="${BG}" />
  <g fill="none" stroke="${RED}" stroke-width="0.55" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
    ${paths.join("\n    ")}
  </g>
</svg>`;
}

function svgToRgba(svgString) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: SIZE },
    background: BG,
  });
  const pngData = resvg.render();
  return {
    pixels: pngData.pixels, // Uint8Array RGBA
    width: pngData.width,
    height: pngData.height,
  };
}

function main() {
  mkdirSync(dirname(OUT_PATH), { recursive: true });

  const FPS = 24;
  // Frame sequence: start at FULLY DRAWN (so social previews that show only
  // the first frame look great), then play one full draw/redraw loop.
  //   - hold:     fully drawn (so first frame is "perfect" for thumbnails)
  //   - dissolve: drawn → invisible
  //   - redraw:   invisible → drawn (returns to first-frame state for loop)
  const holdSeconds = 0.5;
  const dissolveSeconds = 1.0;
  const redrawSeconds = 1.5;
  const tailSeconds = 0.3; // little pause at end before GIF loops

  const holdFrames = Math.round(holdSeconds * FPS);
  const dissolveFrames = Math.round(dissolveSeconds * FPS);
  const redrawFrames = Math.round(redrawSeconds * FPS);
  const tailFrames = Math.round(tailSeconds * FPS);
  const totalFrames = holdFrames + dissolveFrames + redrawFrames + tailFrames;

  console.log(`Encoding ${totalFrames} frames @ ${FPS}fps (${SIZE}x${SIZE})...`);
  const gif = GIFEncoder();

  for (let f = 0; f < totalFrames; f++) {
    let progress;
    if (f < holdFrames) {
      progress = 1; // fully drawn
    } else if (f < holdFrames + dissolveFrames) {
      const t = (f - holdFrames) / (dissolveFrames - 1);
      progress = 1 - t; // 1 → 0 (dissolve)
    } else if (f < holdFrames + dissolveFrames + redrawFrames) {
      const t = (f - holdFrames - dissolveFrames) / (redrawFrames - 1);
      progress = t; // 0 → 1 (redraw)
    } else {
      progress = 1; // tail hold
    }

    const svgString = buildSvg(progress);
    const { pixels, width, height } = svgToRgba(svgString);

    const palette = quantize(pixels, 16, { format: "rgba4444" });
    const indexed = applyPalette(pixels, palette, "rgba4444");

    gif.writeFrame(indexed, width, height, {
      palette,
      delay: Math.round(1000 / FPS),
    });

    if ((f + 1) % 8 === 0) {
      process.stdout.write(`  frame ${f + 1}/${totalFrames}\r`);
    }
  }

  gif.finish();
  const bytes = gif.bytes();
  writeFileSync(OUT_PATH, bytes);
  const kb = (bytes.length / 1024).toFixed(1);
  console.log(`\nWrote ${OUT_PATH} (${kb} KB)`);
}

main();
