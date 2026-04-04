import type { SimpleIcon } from "simple-icons"
import { siGithub, siGmail } from "simple-icons";
import linkedInIcon from "../assets/linkedin.svg?raw";


export interface AboutMe {
  lead: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
  terminal: TerminalLine[];
}

export interface AboutHighlight {
  icon: string;
  label: string;
}

export interface TerminalLine {
  text: string;
  prompt?: boolean;
  comment?: boolean;
  output?: boolean;
}

// ─── Project types ────────────────────────────────────────────────────────────

export interface TechDetail {
  /** Technology name, e.g. "Rust" */
  name: string;
  /** Short description of its role, e.g. "Backend runtime & SpacetimeDB module" */
  role: string;
}

export interface Project {
  /** URL-safe identifier used for routing, e.g. "anon-chat" */
  slug: string;
  title: string;
  /** One-sentence card description shown on the homepage */
  description: string;
  /** Full paragraph(s) shown on the project detail page */
  overview: string;
  tags: string[];
  /** Live deployment URL */
  link: string;
  /** Source repository URL (optional) */
  repo?: string;
  /** Bullet-point achievements / notable technical details */
  highlights: string[];
  /** Ordered list of technologies with their roles */
  techStack: TechDetail[];
  status: 'live' | 'in-progress' | 'archived';
}

// ─────────────────────────────────────────────────────────────────────────────

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
  icon: SimpleIcon | string;
}

export const navSections = ['about', 'projects', 'skills', 'contact'] as const;
export type NavSection = typeof navSections[number] | 'home';

export const heroTitles = [
  'an Engineer',
  'a Problem Solver',
  'a Developer',
  'an Innovator'
];

export const aboutMe: AboutMe = {
  lead: "I'm Jim — a backend-focused developer who loves engineering systems that are scalable, reliable, and operate at speed.",
  paragraphs: [
    "My work lives at the intersection of performance and correctness. I gravitate toward Elixir, Rust, and Python for server-side work, and I design around the full stack of a system: including schema design, concurrency, observability, and deployment.",
    "Outside of code, I'm studying Electrical Engineering, which keeps me grounded in real-world constraints and the weight of building things that actually matter.",
  ],
  highlights: [
    { icon: "📍", label: "Based in the US" },
    { icon: "🎓", label: "Electrical & Computer Engineering" },
    { icon: "💜", label: "Elixir enthusiast" },
    { icon: "🦀", label: "Rust enjoyer" },
    { icon: "🐍", label: "Python proponent" },
  ],
  terminal: [
    { text: "whoami", prompt: true },
    { text: "jim-weaver  # backend developer", output: true },
    { text: "cat interests.txt", prompt: true },
    { text: "# Systems programming, distributed systems", comment: true },
    { text: "# Databases, DevOps, security", comment: true },
    { text: "echo $CURRENT_STACK", prompt: true },
    { text: "Rust · Python · PostgreSQL · Docker", output: true },
    { text: "git log --oneline -1", prompt: true },
    { text: "a3f91bc  always be designing", output: true },
  ],
};

export const projects: Project[] = [
  {
    slug: "mixer",
    title: "mixer",
    description: "A proof of concept twitter clone designed to test the ash framework and build out a fully functioning app that actual people can use.",
    overview:
      "Mixer is a small twitter clone application that was built to explore the ash framework and flesh out an application where in theory it could gain a real userbase." +
      "It runs almost entirely on my machine or hardware I own, with the only service being the mailing service designed for use with Brevo for development." +
      "The backend is entirely done in elixir and utilizes ash typescript to create types and rpc modules for the frontend to use if they're not manage by phoenix." +
      "With it being built like this it allows for simple deployment on any machine or hardware and simple clustering from elixir.",
    tags: ["Elixir", "Postgres", "Minio S3", "Typescript", "React"],
    link: "https://mixer.jimweaver.com",
    highlights: [
      "Elixir strenghts utilized as a easy clustering and concurrent system",
      "Postgres durability and pooled interactions result in fast responses",
      "Feed designed to let you view people you follow and recommended posts",
      "Secured by your email login and magic link logins/tokens",
      "Easy to use frontend with both mobile and desktop support",
    ],
    techStack: [
      { name: "Elixir", role: "Backend business logic & server side rendering" },
      { name: "Postgres", role: "Database of choice for its basic durability" },
      { name: "Minio S3", role: "S3 bucket host for users media uploads" },
      { name: "TypeScript", role: "Frontend type safety and client bindings" },
      { name: "React", role: "Frontend framework of choice for a basic app" },
    ],
    status: "live",
  },
  {
    slug: "anon-chat",
    title: "anon-chat",
    description: "A small anonymous chat app built with Rust and SpacetimeDB with a React and TypeScript frontend. It is a realtime chat application that automatically deletes messages after 24 hours.",
    overview:
      "anon-chat is a lightweight anonymous real-time messaging application built as an exploration of SpacetimeDB's WebAssembly module system. " +
      "The backend is a Rust module compiled to WASM and deployed directly inside SpacetimeDB, which manages the message store, enforces TTL logic to automatically expire messages after 24 hours, and pushes updates to all connected clients over SpacetimeDB's built-in subscription protocol. " +
      "The frontend is a React + TypeScript SPA that subscribes to the live message table and renders updates reactively — no polling, no external message broker. " +
      "The project was an exercise in exploring a novel database paradigm where server logic lives inside the database itself rather than a separate application layer.",
    tags: ["Rust", "SpacetimeDB", "TypeScript", "React"],
    link: "https://chat.jimweaver.com",
    highlights: [
      "Backend implemented as a Rust WASM module running inside SpacetimeDB — no separate server process",
      "Messages automatically expire after 24 hours via TTL reducer logic written in Rust",
      "Real-time updates delivered over SpacetimeDB's subscription protocol — zero polling",
      "Anonymous by design: no accounts, no persistent identity, no stored metadata",
      "Frontend subscribes directly to database table state for reactive UI updates",
      "Deployed and served via Cloudflare Pages for global low-latency access",
    ],
    techStack: [
      { name: "Rust", role: "SpacetimeDB module / backend logic (compiled to WASM)" },
      { name: "SpacetimeDB", role: "Database, real-time subscriptions, and WASM hosting" },
      { name: "React", role: "Frontend UI framework" },
      { name: "TypeScript", role: "Frontend type safety and SpacetimeDB client bindings" },
      { name: "Cloudflare Pages", role: "Frontend hosting & CDN" },
    ],
    status: "live",
  },
  {
    slug: "polyscope",
    title: "polyscope",
    description: "A small lightweight data visualization tool built with Python and DuckDB that looks at some basic metrics from Polymarket and lets you organize and view them in a pleasant way.",
    overview:
      "polyscope is a lightweight data visualization and exploration tool that ingests public market data from Polymarket's API and surfaces it in an organized, queryable interface. " +
      "The backend is a Python service that fetches and normalizes market data, caches responses in Redis to avoid hammering the upstream API, and stores records in an embedded DuckDB instance that supports fast analytical queries without any external database infrastructure. " +
      "The frontend is a React + TypeScript SPA that exposes filtering, sorting, and summary views over the market data. " +
      "The goal of the project was to make Polymarket's raw API data more approachable and visually digestible, with a focus on keeping the entire stack lightweight and self-contained.",
    tags: ["Python", "Redis", "Duckdb", "TypeScript", "React"],
    link: "https://poly.jimweaver.com",
    highlights: [
      "DuckDB embedded analytics engine enables fast aggregation queries with no external database infrastructure",
      "Redis caching layer minimizes redundant Polymarket API calls and smooths over rate limits",
      "Python backend normalizes and stores raw Polymarket market records into a consistent schema",
      "REST API serves pre-aggregated and raw data to the frontend",
      "Interactive filtering and sorting on the frontend without additional round-trips",
      "Minimal footprint — no heavy ORM, no managed database, runs on a single small VM",
    ],
    techStack: [
      { name: "Python", role: "Backend service, data ingestion, and REST API" },
      { name: "DuckDB", role: "Embedded analytics and query engine" },
      { name: "Redis", role: "API response caching layer" },
      { name: "React", role: "Frontend UI framework" },
      { name: "TypeScript", role: "Frontend type safety" },
    ],
    status: "live",
  },
  {
    slug: "be2100-capstone",
    title: "BE2100 Capstone Project",
    description: "A full-stack web application for managing and visualizing data. Built with Django and SQLite, it provides a user-friendly interface for data analysis and reporting.",
    overview:
      "The BE2100 Capstone is a full-stack web application developed as the final project for a Basic Engineering course. " +
      "It provides a data management and reporting platform built on Django and SQLite, allowing users to input survey records, run basic statistical analyses, and visualize results through a browser-based interface. " +
      "The project prioritized clean schema design, Django's ORM for structured data access, and clear data presentation without the overhead of a heavy frontend framework. " +
      "All views are server-rendered, keeping the architecture simple and the deployment footprint small — the entire application ships as a self-contained Django project with an embedded SQLite database.",
    tags: ["Python", "Django", "SQLite", "Data Visualization"],
    link: "https://be2100.jimweaver.com",
    highlights: [
      "Django ORM-backed data models for structured experiment record management",
      "SQLite embedded database — zero infrastructure required to deploy",
      "Server-rendered HTML views for data entry, analysis, and report generation",
      "Basic charting and data visualization integrated directly into Django templates",
      "Clean separation of data models, views, and templates following Django conventions",
      "Self-contained deployment: the entire app ships as a single Django project",
    ],
    techStack: [
      { name: "Python", role: "Application language" },
      { name: "Django", role: "Web framework, ORM, and templating engine" },
      { name: "SQLite", role: "Embedded relational database" },
      { name: "Chart.js", role: "Client-side data visualization" },
      { name: "HTML / CSS", role: "Server-rendered templates and styling" },
    ],
    status: "live",
  },
];

export const skills: SkillGroup[] = [
  { name: "Backend", items: ["Python", "Rust", "Elixir", "C++"] },
  { name: "Databases", items: ["PostgreSQL", "SQLite", "Redis", "SpacetimeDB", "DuckDB"] },
  { name: "DevOps", items: ["Docker", "GitHub Actions", "AWS", "Cloudflare"] },
  { name: "Frontend", items: ["TypeScript", "Svelte", "React", "Vue"] },
];

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/JimWeaverWork", label: "GitHub", external: true, icon: siGithub },
  { href: "https://www.linkedin.com/in/james-weaver-43bba5308", label: "Linkedin", external: true, icon: linkedInIcon },
  { href: "mailto:jim.weaver.work@gmail.com", label: "Email", external: false, icon: siGmail },
];
