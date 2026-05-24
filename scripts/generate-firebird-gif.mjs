// Generates firebird wireframe GIFs by rasterizing SVG frames and encoding
// them with gifenc. Matches the hero animation: lines draw in, hold,
// dissolve, then redraw in a seamless loop.
//
// Run: npm run gen:firebird-gif
//
// Outputs:
//   public/firebird-wireframe.gif          (800px — web / OG)
//   public/firebird-wireframe-hd.gif       (1200px — LinkedIn, decks, etc.)

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
  return {
    tag: "polyline",
    points:
      "64.8 35.2 72.5 42.8 72.4 43.6 57.9 57.7 43.1 73 42.5 73.3 41.9 73 34.6 65.5 34.6 40.9 43.4 49.6 55.3 49.6 64.8 50.2",
  };
});

const allPaths = [...rightWingPaths, ...leftWingPaths];

function buildSvg(progress, size) {
  const N = allPaths.length;
  const stagger = 0.025;
  const drawWindow = 1 - stagger * (N - 1);

  const paths = allPaths.map((p, i) => {
    const startAt = i * stagger;
    const endAt = startAt + drawWindow;
    const local =
      progress <= startAt ? 0 : progress >= endAt ? 1 : (progress - startAt) / (endAt - startAt);
    const dashOffset = 1 - local;
    const opacity = local < 0.02 ? 0 : 1;

    const common = `pathLength="1" stroke-dasharray="1" stroke-dashoffset="${dashOffset.toFixed(
      3
    )}" opacity="${opacity}"`;

    if (p.tag === "polygon") return `<polygon points="${p.points}" ${common} />`;
    if (p.tag === "polyline") return `<polyline points="${p.points}" ${common} />`;
    return `<path d="${p.d}" ${common} />`;
  });

  // Soft red glow behind the bird (matches hero aesthetic)
  const glow = `
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${RED}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${RED}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="75" cy="74.5" rx="70" ry="68" fill="url(#glow)"/>
  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 149" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="${BG}" />
  ${glow}
  <g fill="none" stroke="${RED}" stroke-width="0.55" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
    ${paths.join("\n    ")}
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
  const holdFrames = Math.round(0.3 * fps); // brief black before draw
  const drawFrames = Math.round(2.0 * fps);
  const dissolveFrames = Math.round(0.8 * fps);
  const redrawFrames = Math.round(1.5 * fps);
  const tailFrames = Math.round(0.5 * fps);
  const totalFrames = holdFrames + drawFrames + Math.round(1.0 * fps) + dissolveFrames + redrawFrames + tailFrames;

  console.log(`\n→ ${outPath}`);
  console.log(`  ${totalFrames} frames @ ${fps}fps, ${size}px, ${paletteSize}-color palette`);

  const gif = GIFEncoder();

  for (let f = 0; f < totalFrames; f++) {
    const holdEnd = holdFrames;
    const drawEnd = holdEnd + drawFrames;
    const holdDrawEnd = drawEnd + Math.round(1.0 * fps);
    const dissolveEnd = holdDrawEnd + dissolveFrames;
    const redrawEnd = dissolveEnd + redrawFrames;

    let progress;
    if (f < holdEnd) progress = 0;
    else if (f < drawEnd) progress = (f - holdEnd) / (drawFrames - 1);
    else if (f < holdDrawEnd) progress = 1;
    else if (f < dissolveEnd) progress = 1 - (f - holdDrawEnd) / (dissolveFrames - 1);
    else if (f < redrawEnd) progress = (f - dissolveEnd) / (redrawFrames - 1);
    else progress = 1;

    const svgString = buildSvg(progress, size);
    const { pixels, width, height } = svgToRgba(svgString, size);

    const palette = quantize(pixels, paletteSize, { format: "rgba4444" });
    const indexed = applyPalette(pixels, palette, "rgba4444");

    gif.writeFrame(indexed, width, height, {
      palette,
      delay: Math.round(1000 / fps),
    });

    if ((f + 1) % 12 === 0) process.stdout.write(`  frame ${f + 1}/${totalFrames}\r`);
  }

  gif.finish();
  const bytes = gif.bytes();
  writeFileSync(outPath, bytes);
  console.log(`  done — ${(bytes.length / 1024).toFixed(1)} KB`);
  return outPath;
}

function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true });

  const outputs = [
    { size: 800, outPath: resolve(PUBLIC_DIR, "firebird-wireframe.gif"), fps: 24, paletteSize: 32 },
    { size: 1200, outPath: resolve(PUBLIC_DIR, "firebird-wireframe-hd.gif"), fps: 24, paletteSize: 48 },
  ];

  // Also drop HD copy in project videos/ folder for easy access
  const videosDir = resolve(__dirname, "..", "..", "videos");
  mkdirSync(videosDir, { recursive: true });

  console.log("Generating firebird wireframe GIFs…");

  for (const cfg of outputs) {
    encodeGif(cfg);
  }

  // Copy HD version to videos folder
  const hdSrc = resolve(PUBLIC_DIR, "firebird-wireframe-hd.gif");
  const hdDest = resolve(videosDir, "firebird-wireframe.gif");
  const hdBytes = readFileSync(hdSrc);
  writeFileSync(hdDest, hdBytes);
  console.log(`\nCopied HD GIF → ${hdDest}`);
  console.log("\nUse these files:");
  console.log("  website/public/firebird-wireframe.gif     (800px, web)");
  console.log("  website/public/firebird-wireframe-hd.gif  (1200px, social/decks)");
  console.log("  videos/firebird-wireframe.gif             (1200px copy)");
}

main();
