#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// new-card,  scaffold a placeholder project card + detail page.
//
//   make new-card slug=my-thing title="My Thing"
//
// What it does:
//   1. Writes a labelled placeholder image  -> src/assets/img-main/card-<slug>.svg
//      (auto-picked up as the card/banner image via import.meta.glob)
//   2. Inserts a placeholder Project entry into src/jim-main/projectsData.ts at the
//      `make:new-card-anchor` marker. That entry instantly becomes:
//        • a card in the home "Projects" section
//        • a detail page at /project/<slug>
//
// Then just edit that entry in projectsData.ts and drop a real image over the SVG.
//
// Flags:
//   --image-only   only (re)generate the placeholder image, don't touch data
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = resolve(ROOT, "src/jim-main/projectsData.ts");
const IMG_DIR = resolve(ROOT, "src/assets/img-main");
const ANCHOR = "// make:new-card-anchor";

// ── args (supports `slug=x title="y"` and `--slug x --title y`) ───────────────
const args = process.argv.slice(2);
const imageOnly = args.includes("--image-only");
const opts = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--image-only") {
    continue; // boolean flag, handled above
  } else if (a.includes("=")) {
    const [k, ...rest] = a.split("=");
    opts[k.replace(/^--/, "")] = rest.join("=");
  } else if (
    a.startsWith("--") &&
    args[i + 1] &&
    !args[i + 1].startsWith("--")
  ) {
    opts[a.slice(2)] = args[++i];
  }
}

const slug = (opts.slug || "").trim().toLowerCase();
const title = (opts.title || opts.slug || "").trim();

if (!slug) {
  console.error(
    '✗ Missing slug.\n  Usage: make new-card slug=my-thing title="My Thing"',
  );
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(
    `✗ Invalid slug "${slug}",  use lowercase letters, numbers and dashes.`,
  );
  process.exit(1);
}

const xml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── deterministic per-slug "low-poly sunset" art ────────────────────────────
// Each card gets a unique scene (sun position/size, terrain facets) seeded from
// its slug, echoing the hero wallpaper's scarlet-on-dark low-poly look.
const seed = (str) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
};
const rngFrom = (state) => {
  let a = state >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const hx = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
const mix = (a, b, t) => {
  const c = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [ar, ag, ab] = c(a);
  const [br, bg, bb] = c(b);
  return `#${hx(ar + (br - ar) * t)}${hx(ag + (bg - ag) * t)}${hx(ab + (bb - ab) * t)}`;
};
const n2 = (v) => Math.round(v * 10) / 10;

function buildCardSvg(label, slug = label) {
  const r = rngFrom(seed(slug || "placeholder"));
  const W = 640;
  const H = 340;
  const sunX = 300 + r() * 170; // right-of-centre, leaves the title corner dark
  const sunY = 96 + r() * 34;
  const sunR = 34 + r() * 16;
  const horizon = 188 + r() * 18;
  const DARK = "#15001a";
  const BRIGHT = "#d8123c";

  // Triangulated terrain mesh below the horizon, watertight at the edges.
  const nx = 10;
  const ny = 4;
  const pts = [];
  for (let row = 0; row < ny; row++) {
    const line = [];
    for (let col = 0; col < nx; col++) {
      const bx = -20 + (col * (W + 40)) / (nx - 1);
      const by = horizon + (row * (H - horizon)) / (ny - 1);
      const edgeX = col === 0 || col === nx - 1;
      const jx = edgeX ? 0 : (r() - 0.5) * 46;
      const jy = row === ny - 1 ? 0 : (r() - 0.5) * (row === 0 ? 24 : 30);
      line.push({ x: bx + jx, y: by + jy });
    }
    pts.push(line);
  }
  const facets = [];
  for (let row = 0; row < ny - 1; row++) {
    for (let col = 0; col < nx - 1; col++) {
      const a = pts[row][col];
      const b = pts[row][col + 1];
      const c = pts[row + 1][col];
      const d = pts[row + 1][col + 1];
      for (const t of [
        [a, b, c],
        [c, b, d],
      ]) {
        const cx = (t[0].x + t[1].x + t[2].x) / 3;
        const cy = (t[0].y + t[1].y + t[2].y) / 3;
        const depth = (cy - horizon) / (H - horizon);
        const near = Math.exp(-(((cx - sunX) / 168) ** 2));
        const f = clamp(
          (1 - depth) * 0.42 + near * 0.55 + (r() - 0.5) * 0.16,
          0,
          1,
        );
        const dpath = `M${n2(t[0].x)} ${n2(t[0].y)}L${n2(t[1].x)} ${n2(t[1].y)}L${n2(t[2].x)} ${n2(t[2].y)}Z`;
        facets.push(`    <path d="${dpath}" fill="${mix(DARK, BRIGHT, f)}"/>`);
      }
    }
  }

  const len = (label || slug || "").length;
  const fontSize = len > 14 ? 30 : len > 9 ? 38 : 46;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" preserveAspectRatio="xMidYMid slice" width="640" height="340">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8a0b50"/>
      <stop offset="0.55" stop-color="#5a061f"/>
      <stop offset="1" stop-color="#1c0220"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ff5a76"/>
      <stop offset="0.4" stop-color="#f70032" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#f70032" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <rect width="640" height="340" fill="url(#sky)"/>
  <circle cx="${n2(sunX)}" cy="${n2(sunY)}" r="${n2(sunR * 2.4)}" fill="url(#glow)"/>
  <circle cx="${n2(sunX)}" cy="${n2(sunY)}" r="${n2(sunR)}" fill="#ff2c4e"/>
${facets.join("\n")}
  <rect width="640" height="340" fill="url(#ground)"/>
  <rect x="38" y="266" width="58" height="5" rx="2.5" fill="#ff2c4e"/>
  <text x="36" y="306" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" paint-order="stroke" stroke="#1c0212" stroke-width="3" stroke-opacity="0.55" stroke-linejoin="round">${xml(label || slug)}</text>
</svg>
`;
}

// ── 1. image ─────────────────────────────────────────────────────────────────
if (!existsSync(IMG_DIR)) mkdirSync(IMG_DIR, { recursive: true });
const imgPath = resolve(IMG_DIR, `card-${slug}.svg`);
writeFileSync(imgPath, buildCardSvg(title, slug));
console.log(`✓ image  src/assets/img-main/card-${slug}.svg`);

if (imageOnly) process.exit(0);

// ── 2. data entry ────────────────────────────────────────────────────────────
let src = readFileSync(DATA_FILE, "utf8");

if (new RegExp(`slug:\\s*["']${slug}["']`).test(src)) {
  console.log(
    `• project "${slug}" already exists in projectsData.ts,  skipped data insert.`,
  );
  process.exit(0);
}
if (!src.includes(ANCHOR)) {
  console.error(
    `✗ Could not find "${ANCHOR}" in projectsData.ts. Add it back inside the projects array.`,
  );
  process.exit(1);
}

const entry = `  {
    slug: "${slug}",
    title: "${title || slug}",
    year: "${new Date().getFullYear()}",
    description:
      "Placeholder,  one sentence describing ${title || slug}.",
    overview:
      "Placeholder overview for ${title || slug}. Replace this with the full write-up: the problem it solves, the architecture, and what you learned building it.",
    tags: ["Tag"],
    link: "https://example.com",
    status: "in-progress",
    highlights: ["Replace with a notable detail about ${title || slug}"],
    techStack: [
      { name: "Tech", role: "What it does in this project", layer: "backend" },
    ],
  },
`;

src = src.replace(new RegExp(`([ \\t]*)${ANCHOR}`), `${entry}$1${ANCHOR}`);
writeFileSync(DATA_FILE, src);
console.log(`✓ data   added project "${slug}" -> card + /project/${slug}`);
console.log(
  `\nNext: edit the "${slug}" entry in src/jim-main/projectsData.ts and replace the placeholder image.`,
);
