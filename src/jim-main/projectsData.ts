// ─── Projects: single source of truth ───────────────────────────────────────
// Each Project renders both a card in the home "Projects" section and a detail
// page at /project/<slug>. Add a new one with:  make new-card slug=x title="X"

export type ProjectStatus = "live" | "in-progress" | "archived";
export type TechLayer = "frontend" | "backend" | "data" | "infra";

export interface TechDetail {
  /** Technology name, e.g. "Rust" */
  name: string;
  /** Short description of its role in this project */
  role: string;
  /** Architecture layer */
  layer: TechLayer;
}

export interface Project {
  /** URL-safe id used for routing + the card image file name (card-<slug>.svg) */
  slug: string;
  title: string;
  year: string;
  /** One-sentence card description shown on the homepage */
  description: string;
  /** Full paragraph shown on the project detail page */
  overview: string;
  tags: string[];
  /** Live deployment / source URL */
  link: string;
  status: ProjectStatus;
  /** Bullet-point achievements / notable technical details */
  highlights: string[];
  /** Ordered list of technologies with their roles + layer */
  techStack: TechDetail[];
}

export const projects: Project[] = [
  {
    slug: "commune",
    title: "Commune",
    year: "2026",
    description:
      "A cross-platform desktop chat app built to learn Tauri and utilize Elixir's incredible Phoenix and Ash frameworks for realtime message and voice chat.",
    overview:
      "Commune is a Discord-like application, that was designed to have a feature parallel web and desktop experience. The app itself is built with Phoenix and Ash frameworks, and is hosted on a small Fly.io server that spins up on demand. " +
      "The desktop binary is made via a github workflow and has releases made with with version tagging, as opposed to the webs continuious rollout with each release being immidiately deployed onto the Fly vm.",
    tags: ["Rust", "Tauri", "SurrealDB", "TypeScript", "Svelte"],
    link: "https://commune.jimweaver.com",
    status: "live",
    highlights: [
      "Rust's type safety and performance keep the app safe and fast",
      "Tauri ships a single codebase to every platform with ease",
      "SurrealDB provides a flexible store with native websocket realtime updates",
      "Svelte delivers a reactive frontend with no virtual-DOM overhead",
    ],
    techStack: [
      {
        name: "Rust",
        role: "Type-safe, performant core logic",
        layer: "backend",
      },
      {
        name: "Tauri",
        role: "Native shell bridging Rust + any frontend",
        layer: "backend",
      },
      {
        name: "SurrealDB",
        role: "Embedded store w/ native websockets",
        layer: "data",
      },
      {
        name: "TypeScript",
        role: "Frontend type safety & bindings",
        layer: "frontend",
      },
      {
        name: "Svelte",
        role: "Compiled, no-VDOM reactive UI",
        layer: "frontend",
      },
    ],
  },
  {
    slug: "nodepad",
    title: "nodepad",
    year: "2026",
    description:
      "A real-time multiplayer graph notebook,  Obsidian-style notes with a shared layout, live presence, and AI semantic search.",
    overview:
      "nodepad is an Obsidian-like graph notebook built around real-time multiplayer graphs. The backend is a Go service running on AWS Lambda behind an HTTP API; it verifies a Supabase access token on every request and authorizes by graph membership, so each user can keep multiple notebooks and share any of them with collaborators by email. Notes (nodes), links (edges), shared layout, membership, and profiles all live in Supabase Postgres, with Row-Level Security gating each member's direct Realtime subscription. Several people can view and edit one graph at once and it looks identical for everyone,  node coordinates live server-side and propagate over Supabase Realtime, while a presence layer shows collaborators' cursors and in-flight drags. pgvector powers AI \"related notes\" semantic search across a graph's notes. The Svelte + TypeScript frontend is served from CloudFront/S3 and opens on a dashboard of the user's graphs.",
    tags: ["Go", "Supabase", "AWS Lambda", "Svelte", "TypeScript"],
    link: "https://nodepad.jimweaver.com",
    status: "live",
    highlights: [
      "Go Lambda API verifies a Supabase JWT on every request and authorizes by graph membership",
      "Real-time multiplayer: shared server-side layout plus live cursors and drags over Supabase Realtime",
      'AI "related notes" semantic search backed by pgvector embeddings, re-indexed on save',
      "Obsidian-style @[note-links] reconciled into graph edges in a single round trip",
      "Postgres Row-Level Security gates each member's direct Realtime subscription",
      "Deployed on AWS SAM,  Lambda + HTTP API + CloudFront/S3 behind a single origin",
    ],
    techStack: [
      {
        name: "Go",
        role: "Lambda API: chi router + JWT auth",
        layer: "backend",
      },
      { name: "Supabase", role: "Postgres + Auth + Realtime", layer: "data" },
      {
        name: "pgvector",
        role: "Vector embeddings for AI search",
        layer: "data",
      },
      {
        name: "AWS Lambda",
        role: "Serverless API host (AWS SAM)",
        layer: "infra",
      },
      {
        name: "Svelte",
        role: "Compiled, no-VDOM reactive UI",
        layer: "frontend",
      },
      {
        name: "TypeScript",
        role: "Frontend type safety & bindings",
        layer: "frontend",
      },
    ],
  },
  {
    slug: "mixer",
    title: "mixer",
    year: "2026",
    description:
      "A proof-of-concept Twitter clone built to explore the Ash framework. A fully functioning social media that could support a reasonable userbase.",
    overview:
      "Mixer is a small Twitter clone built to explore the Ash framework and flesh out an application that could in theory gain a real userbase. It runs almost entirely on hardware I own, with the only external service being a Brevo mailer for development. The backend is entirely Elixir and uses Ash TypeScript to generate types and RPC modules for the frontend where pages aren't managed by Phoenix. Built this way, it deploys simply on any machine and clusters easily thanks to Elixir.",
    tags: ["Elixir", "Postgres", "Minio S3", "TypeScript", "React"],
    link: "https://mixer.jimweaver.com",
    status: "live",
    highlights: [
      "Elixir leveraged for easy clustering and concurrent workloads",
      "Postgres durability + pooled connections yield fast responses",
      "Feed surfaces people you follow plus recommended posts",
      "Secured by email login and magic-link tokens",
      "Mobile and desktop support out of the box",
    ],
    techStack: [
      {
        name: "Elixir",
        role: "Backend logic & server-side rendering",
        layer: "backend",
      },
      { name: "Postgres", role: "Durable primary datastore", layer: "data" },
      { name: "Minio S3", role: "Object store for user media", layer: "data" },
      {
        name: "TypeScript",
        role: "Frontend type safety & bindings",
        layer: "frontend",
      },
      { name: "React", role: "Client UI framework", layer: "frontend" },
    ],
  },
  {
    slug: "anon-chat",
    title: "anon-chat",
    year: "2025",
    description:
      "Anonymous realtime chat built on a Rust WASM module running inside SpacetimeDB. Messages self-destruct after 24 hours.",
    overview:
      "anon-chat is a lightweight anonymous real-time messaging application built as an exploration of SpacetimeDB's WebAssembly module system. The backend is a Rust module compiled to WASM and deployed directly inside SpacetimeDB, which manages the message store, enforces TTL logic to expire messages after 24 hours, and pushes updates to all connected clients over SpacetimeDB's built-in subscription protocol. The frontend is a React + TypeScript SPA that subscribes to the live message table and renders updates reactively, no polling, no external message broker. The project explored a novel paradigm where server logic lives inside the database itself.",
    tags: ["Rust", "SpacetimeDB", "TypeScript", "React"],
    link: "https://chat.jimweaver.com",
    status: "live",
    highlights: [
      "Backend is a Rust WASM module running inside SpacetimeDB, no separate server",
      "Messages auto-expire after 24h via TTL reducer logic in Rust",
      "Realtime updates over SpacetimeDB's subscription protocol, zero polling",
      "Anonymous by design: no accounts, no identity, no stored metadata",
      "Frontend subscribes directly to live database table state",
      "Deployed via Cloudflare Pages for global low latency",
    ],
    techStack: [
      {
        name: "Rust",
        role: "SpacetimeDB module (compiled to WASM)",
        layer: "backend",
      },
      {
        name: "SpacetimeDB",
        role: "DB + realtime subs + WASM host",
        layer: "data",
      },
      { name: "React", role: "Client UI framework", layer: "frontend" },
      {
        name: "TypeScript",
        role: "Type safety & client bindings",
        layer: "frontend",
      },
      {
        name: "Cloudflare Pages",
        role: "Frontend hosting & CDN",
        layer: "infra",
      },
    ],
  },
  {
    slug: "polyscope",
    title: "polyscope",
    year: "2025",
    description:
      "A lightweight data-viz tool that ingests Polymarket data into DuckDB and surfaces it in an organized, queryable interface.",
    overview:
      "polyscope is a lightweight data visualization and exploration tool that ingests public market data from Polymarket's API and surfaces it in an organized, queryable interface. The backend is a Python service that fetches and normalizes market data, caches responses in Redis to avoid hammering the upstream API, and stores records in an embedded DuckDB instance for fast analytical queries with no external database infrastructure. The frontend is a React + TypeScript SPA exposing filtering, sorting, and summary views. The goal was to make Polymarket's raw API data more approachable and visually digestible while keeping the whole stack lightweight and self-contained.",
    tags: ["Python", "Redis", "DuckDB", "TypeScript", "React"],
    link: "",
    status: "archived",
    highlights: [
      "DuckDB embedded analytics enables fast aggregation with no external DB infra",
      "Redis caching minimizes redundant Polymarket API calls and smooths rate limits",
      "Python backend normalizes raw Polymarket records into a consistent schema",
      "REST API serves pre-aggregated and raw data to the frontend",
      "Interactive filtering and sorting with no extra round-trips",
      "Minimal footprint, runs on a single small VM",
    ],
    techStack: [
      {
        name: "Python",
        role: "Ingestion service & REST API",
        layer: "backend",
      },
      {
        name: "DuckDB",
        role: "Embedded analytics & query engine",
        layer: "data",
      },
      { name: "Redis", role: "API response caching layer", layer: "data" },
      { name: "React", role: "Client UI framework", layer: "frontend" },
      { name: "TypeScript", role: "Frontend type safety", layer: "frontend" },
    ],
  },
  {
    slug: "be2100-capstone",
    title: "BE2100 Capstone",
    year: "2026",
    description:
      "A full-stack data management + reporting platform on Django and SQLite, built as a Basic Engineering course capstone.",
    overview:
      "The BE2100 Capstone is a full-stack web application developed as the final project for a Basic Engineering course. It provides a data management and reporting platform built on Django and SQLite, letting users input records, run basic statistical analyses, and visualize results through a browser-based interface. The project prioritized clean schema design, Django's ORM for structured data access, and clear data presentation. The entire application ships as a self-contained Django project with an embedded SQLite database.",
    tags: ["Python", "Django", "SQLite", "TypeScript", "Charts"],
    link: "https://be2100.jimweaver.com",
    status: "live",
    highlights: [
      "Django ORM-backed models for structured record management",
      "SQLite embedded database,  zero infrastructure to deploy",
      "Clean separation of models, views, and templates",
      "Self-contained deployment as a single Django project",
      "Rich charting integrated into a React frontend",
      "Type-safe frontend with clear, defined data contracts",
    ],
    techStack: [
      { name: "Python", role: "Application language", layer: "backend" },
      {
        name: "Django",
        role: "Web framework, ORM & templating",
        layer: "backend",
      },
      { name: "SQLite", role: "Embedded relational database", layer: "data" },
      { name: "React", role: "Client UI & charts", layer: "frontend" },
      {
        name: "Chart.js",
        role: "Client-side data visualization",
        layer: "frontend",
      },
    ],
  },
  // make:new-card-anchor,  `make new-card slug=foo title="Foo"` inserts new projects above this line. Keep it.
];

// ─── Presentation metadata ───────────────────────────────────────────────────

export const STATUS_META: Record<
  ProjectStatus,
  { color: string; word: string }
> = {
  live: { color: "#43a047", word: "LIVE" },
  "in-progress": { color: "#e0a417", word: "WIP" },
  archived: { color: "#8a9c92", word: "ARCHIVED" },
};

export const LAYER_ORDER: TechLayer[] = [
  "frontend",
  "backend",
  "data",
  "infra",
];

export const LAYER_LABEL: Record<TechLayer, string> = {
  frontend: "Frontend",
  backend: "Backend",
  data: "Data",
  infra: "Infra",
};

export const LAYER_COLOR: Record<TechLayer, string> = {
  frontend: "#4f86c6",
  backend: "#9b6cc6",
  data: "#43a047",
  infra: "#e0a417",
};

// ─── Card / banner image resolution ──────────────────────────────────────────
// Images in src/assets/img-main are auto-discovered (vector or raster), so a
// file dropped by `make new-card` (or replaced by you) is picked up with no
// edits. Two independent conventions per project slug:
//   card-<slug>.{svg,png,jpg,jpeg}    → the card on the home page
//   banner-<slug>.{svg,png,jpg,jpeg}  → the topbar on the project detail page
// A project page falls back to its card image when no dedicated banner exists.
import placeholderCard from "../assets/img-main/card-placeholder.svg";

const imageModules = import.meta.glob(
  "../assets/img-main/*.{svg,png,jpg,jpeg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/** Resolve the first image matching `<prefix>-<slug>` (any extension). */
function resolveImage(prefix: string, slug: string): string | undefined {
  const hit = Object.entries(imageModules).find(([path]) =>
    path.replace(/\.(svg|png|jpe?g)$/, "").endsWith(`/${prefix}-${slug}`),
  );
  return hit?.[1];
}

/** Resolve the home-page card image for a slug, falling back to the placeholder. */
export function cardImage(slug: string): string {
  return resolveImage("card", slug) ?? placeholderCard;
}

/**
 * Resolve the project-page topbar image for a slug. Uses a dedicated
 * `banner-<slug>` image when present, otherwise reuses the card image.
 */
export function bannerImage(slug: string): string {
  return resolveImage("banner", slug) ?? cardImage(slug);
}

/** Look up a single project by slug. */
export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
