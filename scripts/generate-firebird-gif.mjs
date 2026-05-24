// Generates firebird wireframe GIFs matching the hero CSS animations:
//   firebird-entrance — staggered draw-in (1s ease-out per path)
//   firebird-draw     — hold → dissolve → redraw loop (6s ease-in-out)
//
// Run: npm run gen:firebird-gif

import { Resvg } from "@resvg/resvg-js";
import gifenc from "gifenc";
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

const RED = "#FF2000";
const BG = "#000000";
const MIRROR_AXIS = 74.9;
const MIRROR_TRANSFORM = `translate(${MIRROR_AXIS * 2}, 0) scale(-1, 1)`;

// Same paths as FirebirdLogoAnimated.tsx (right wing only; left = mirror transform).
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

const PATH_COUNT = rightWingPaths.length;

// Matches FirebirdLogoAnimated / globals.css
const ENTRANCE_DURATION = 1;
const ENTRANCE_STAGGER = 0.05;
const DRAW_DURATION = 6;
const LOOP_ONSET = 5;
const LOOP_STAGGER = 0.2;

function easeOut(t) {
  return 1 - (1 - t) ** 3;
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** firebird-entrance keyframes */
function entranceState(localT) {
  if (localT <= 0) return { dashOffset: 1, opacity: 0 };
  if (localT >= 1) return { dashOffset: 0, opacity: 1 };
  const p = easeOut(localT);
  const opacity = localT < 0.2 ? localT / 0.2 : 1;
  return { dashOffset: 1 - p, opacity };
}

/** firebird-draw keyframes (one cycle, t in 0..1) */
function drawLoopState(t) {
  if (t <= 0.35) return { dashOffset: 0, opacity: 1 };
  if (t <= 0.55) {
    const p = easeInOut((t - 0.35) / 0.2);
    return { dashOffset: lerp(0, -1, p), opacity: lerp(1, 0, p) };
  }
  if (t <= 0.65) return { dashOffset: 1, opacity: 0 };
  if (t <= 0.85) {
    const p = easeInOut((t - 0.65) / 0.2);
    return { dashOffset: lerp(1, 0, p), opacity: lerp(0, 1, p) };
  }
  return { dashOffset: 0, opacity: 1 };
}

/** Per-path state at timeSec — mirrors hero timing */
function pathState(pathIndex, timeSec) {
  const entranceStart = pathIndex * ENTRANCE_STAGGER;
  const loopStart = LOOP_ONSET + (pathIndex % PATH_COUNT) * LOOP_STAGGER;

  if (timeSec < loopStart) {
    const local = (timeSec - entranceStart) / ENTRANCE_DURATION;
    return entranceState(local);
  }

  const loopT = ((timeSec - loopStart) % DRAW_DURATION) / DRAW_DURATION;
  return drawLoopState(loopT);
}

function pathElement(p, dashOffset, opacity) {
  const common = `pathLength="1" stroke-dasharray="1" stroke-dashoffset="${dashOffset.toFixed(4)}" opacity="${opacity.toFixed(4)}"`;
  if (p.tag === "polygon") return `<polygon points="${p.points}" ${common} />`;
  if (p.tag === "polyline") return `<polyline points="${p.points}" ${common} />`;
  return `<path d="${p.d}" ${common} />`;
}

function wingGroup(timeSec) {
  return rightWingPaths
    .map((p, i) => {
      const { dashOffset, opacity } = pathState(i, timeSec);
      return pathElement(p, dashOffset, opacity);
    })
    .join("\n      ");
}

function buildSvg(timeSec, size) {
  const right = wingGroup(timeSec);
  const left = wingGroup(timeSec);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 149" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="${BG}" />
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${RED}" stop-opacity="0.10"/>
      <stop offset="70%" stop-color="${RED}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="75" cy="74.5" rx="72" ry="70" fill="url(#glow)"/>
  <g fill="none" stroke="${RED}" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
    ${right}
  </g>
  <g transform="${MIRROR_TRANSFORM}" fill="none" stroke="${RED}" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
    ${left}
  </g>
</svg>`;
}

function svgToRgba(svgString, size) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: size },
    background: BG,
  });
  const pngData = resvg.render();
  return { pixels: pngData.pixels, width: pngData.width, height: pngData.height };
}

function encodeGif({ size, outPath, fps, paletteSize }) {
  // One full hero-like cycle: entrance completes by ~1.7s, loops begin at 5s,
  // capture through 11s so every path completes at least one draw loop.
  const totalDuration = LOOP_ONSET + DRAW_DURATION + LOOP_STAGGER * (PATH_COUNT - 1) + 0.5;
  const totalFrames = Math.ceil(totalDuration * fps);

  console.log(`\n→ ${outPath}`);
  console.log(`  ${totalFrames} frames @ ${fps}fps (${totalDuration.toFixed(1)}s), ${size}px`);

  const gif = GIFEncoder();

  for (let f = 0; f < totalFrames; f++) {
    const timeSec = f / fps;
    const svgString = buildSvg(timeSec, size);
    const { pixels, width, height } = svgToRgba(svgString, size);

    const palette = quantize(pixels, paletteSize, { format: "rgba4444" });
    const indexed = applyPalette(pixels, palette, "rgba4444");

    gif.writeFrame(indexed, width, height, {
      palette,
      delay: Math.round(1000 / fps),
    });

    if ((f + 1) % 15 === 0 || f + 1 === totalFrames) {
      process.stdout.write(`  frame ${f + 1}/${totalFrames}\r`);
    }
  }

  gif.finish();
  const bytes = gif.bytes();
  writeFileSync(outPath, bytes);
  console.log(`  done — ${(bytes.length / 1024).toFixed(1)} KB`);
}

function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true });

  const outputs = [
    { size: 800, outPath: resolve(PUBLIC_DIR, "firebird-wireframe.gif"), fps: 12, paletteSize: 24 },
    { size: 1200, outPath: resolve(PUBLIC_DIR, "firebird-wireframe-hd.gif"), fps: 15, paletteSize: 48 },
  ];

  const videosDir = resolve(__dirname, "..", "..", "videos");
  mkdirSync(videosDir, { recursive: true });

  console.log("Generating firebird wireframe GIFs (hero-matched animation)…");

  for (const cfg of outputs) {
    encodeGif(cfg);
  }

  const hdSrc = resolve(PUBLIC_DIR, "firebird-wireframe-hd.gif");
  const hdDest = resolve(videosDir, "firebird-wireframe.gif");
  writeFileSync(hdDest, readFileSync(hdSrc));
  console.log(`\nCopied HD GIF → ${hdDest}`);
}

main();
