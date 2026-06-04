// ─── Portfolio data ───────────────────────────────────────────────────────────
// Single source of truth for the SYSTEM://JIM_WEAVER portfolio. Mirrors the
// Claude Design handoff bundle, typed for the live Svelte app.

// ─── Identity / hero ──────────────────────────────────────────────────────────

export type LedState = "live" | "active" | "idle" | "amber" | "red";

export interface StatusChip {
    label: string;
    state: LedState;
}

export interface Identity {
    handle: string;
    name: string;
    role: string;
    oneLiner: string;
    location: string;
    status: StatusChip[];
    stack: string[];
}

export const identity: Identity = {
    handle: "jim_weaver",
    name: "JIM WEAVER",
    role: "Backend / Systems Engineer",
    oneLiner:
        "I build systems that are scalable, reliable, and fast — from schema design and concurrency down to observability and deployment.",
    location: "United States",
    status: [
        { label: "OPEN TO WORK", state: "live" },
        { label: "STUDYING ECE", state: "active" },
        { label: "ALWAYS BUILDING", state: "idle" },
    ],
    stack: ["Rust", "Python", "Elixir", "PostgreSQL", "Docker"],
};

// ─── About ────────────────────────────────────────────────────────────────────

export interface AboutFact {
    k: string;
    v: string;
}

export interface AboutMe {
    lead: string;
    paragraphs: string[];
    facts: AboutFact[];
}

export const aboutMe: AboutMe = {
    lead: "I'm Jim — a backend-focused developer who loves engineering systems that are scalable, reliable, and operate at speed.",
    paragraphs: [
        "My work lives at the intersection of performance and correctness. I gravitate toward Elixir, Rust, and Python for server-side work, and I design around the full stack of a system: schema design, concurrency, observability, and deployment.",
        "Outside of code, I'm studying Electrical & Computer Engineering, which keeps me grounded in real-world constraints and the weight of building things that actually matter.",
    ],
    facts: [
        { k: "LOCATION", v: "United States" },
        { k: "STUDYING", v: "Electrical & Computer Eng." },
        { k: "FOCUS", v: "Distributed systems, databases" },
        { k: "STATUS", v: "Open to work" },
    ],
};

// ─── Live terminal command map (About section) ────────────────────────────────

export interface TerminalCommand {
    kind: "lines";
    lines: string[];
}

export interface TerminalConfig {
    motd: string[];
    commands: Record<string, TerminalCommand>;
}

export const terminal: TerminalConfig = {
    motd: [
        "jim_weaver shell — type `help` for commands.",
        "(or click a suggestion below)",
    ],
    commands: {
        help: {
            kind: "lines",
            lines: [
                "AVAILABLE COMMANDS",
                "  whoami      who is this",
                "  about       the short version",
                "  stack       current tooling",
                "  interests   what i think about",
                "  projects    list shipped work",
                "  contact     how to reach me",
                "  uptime      current status",
                "  clear       wipe the screen",
            ],
        },
        whoami: {
            kind: "lines",
            lines: ["jim_weaver  # backend / systems engineer"],
        },
        about: {
            kind: "lines",
            lines: [
                "Backend-focused developer. I care about performance AND",
                "correctness — schema design, concurrency, observability,",
                "and clean deployment. Currently studying ECE.",
            ],
        },
        stack: {
            kind: "lines",
            lines: [
                "languages   Rust · Python · Elixir · C++",
                "databases   PostgreSQL · Redis · SQLite · DuckDB",
                "devops      Docker · GitHub Actions · AWS · Cloudflare",
            ],
        },
        interests: {
            kind: "lines",
            lines: [
                "# systems programming, distributed systems",
                "# databases, devops, security",
                "# building things that actually matter",
            ],
        },
        contact: {
            kind: "lines",
            lines: [
                "github    github.com/JimWeaverWork",
                "linkedin  /in/james-weaver-43bba5308",
                "email     jim.weaver.work@gmail.com",
            ],
        },
        uptime: {
            kind: "lines",
            lines: ["up 4 yrs,  load avg: building, shipping, learning"],
        },
    },
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = "live" | "in-progress" | "archived";
export type TechLayer = "frontend" | "backend" | "data" | "infra";

export interface TechDetail {
    /** Technology name, e.g. "Rust" */
    name: string;
    /** Short description of its role */
    role: string;
    /** Architecture layer — drives the system-architecture diagram */
    layer: TechLayer;
}

export interface Project {
    /** URL-safe identifier used for routing, e.g. "anon-chat" */
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
        slug: "oxyde",
        title: "oxyde",
        year: "2025",
        description:
            "A cross-platform desktop chat app built to learn Tauri and push Rust's performance + safety guarantees onto every platform.",
        overview:
            "Oxyde is a small chat application built as an exploration of the Tauri framework and Rust's capabilities for building cross-platform desktop applications. The backend is a Rust module that manages chat rooms, messages, and user presence, compiled to a native binary that runs on the user's machine. The frontend is built with Svelte and TypeScript, providing a reactive UI that communicates with the Rust backend via Tauri's IPC system. SurrealDB is used as an embedded database to store messages and user data locally, with its native WebSocket support enabling real-time updates across multiple instances of the app.",
        tags: ["Rust", "Tauri", "SurrealDB", "TypeScript", "Svelte"],
        link: "https://github.com/Qdust41/Oxyde",
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
        slug: "mixer",
        title: "mixer",
        year: "2026",
        description:
            "A proof-of-concept Twitter clone built to explore the Ash framework — a fully functioning app real people can actually use.",
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
            {
                name: "Postgres",
                role: "Durable primary datastore",
                layer: "data",
            },
            {
                name: "Minio S3",
                role: "Object store for user media",
                layer: "data",
            },
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
            "anon-chat is a lightweight anonymous real-time messaging application built as an exploration of SpacetimeDB's WebAssembly module system. The backend is a Rust module compiled to WASM and deployed directly inside SpacetimeDB, which manages the message store, enforces TTL logic to expire messages after 24 hours, and pushes updates to all connected clients over SpacetimeDB's built-in subscription protocol. The frontend is a React + TypeScript SPA that subscribes to the live message table and renders updates reactively — no polling, no external message broker. The project explored a novel paradigm where server logic lives inside the database itself.",
        tags: ["Rust", "SpacetimeDB", "TypeScript", "React"],
        link: "https://chat.jimweaver.com",
        status: "live",
        highlights: [
            "Backend is a Rust WASM module running inside SpacetimeDB — no separate server",
            "Messages auto-expire after 24h via TTL reducer logic in Rust",
            "Realtime updates over SpacetimeDB's subscription protocol — zero polling",
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
        link: "https://polyscope.jimweaver.com",
        status: "archived",
        highlights: [
            "DuckDB embedded analytics enables fast aggregation with no external DB infra",
            "Redis caching minimizes redundant Polymarket API calls and smooths rate limits",
            "Python backend normalizes raw Polymarket records into a consistent schema",
            "REST API serves pre-aggregated and raw data to the frontend",
            "Interactive filtering and sorting with no extra round-trips",
            "Minimal footprint — runs on a single small VM",
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
            {
                name: "Redis",
                role: "API response caching layer",
                layer: "data",
            },
            { name: "React", role: "Client UI framework", layer: "frontend" },
            {
                name: "TypeScript",
                role: "Frontend type safety",
                layer: "frontend",
            },
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
            "SQLite embedded database — zero infrastructure to deploy",
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
            {
                name: "SQLite",
                role: "Embedded relational database",
                layer: "data",
            },
            { name: "React", role: "Client UI & charts", layer: "frontend" },
            {
                name: "Chart.js",
                role: "Client-side data visualization",
                layer: "frontend",
            },
        ],
    },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export interface SkillGroup {
    name: string;
    items: string[];
}

export const skills: SkillGroup[] = [
    { name: "Backend", items: ["Python", "Rust", "Elixir", "C++"] },
    {
        name: "Databases",
        items: [
            "PostgreSQL",
            "SQLite",
            "Redis",
            "Valkey",
            "SurrealDB",
            "Minio",
            "GarageS3",
            "SpacetimeDB",
            "DuckDB",
        ],
    },
    {
        name: "DevOps",
        items: ["Docker", "GitHub Actions", "AWS", "Cloudflare"],
    },
    { name: "Frontend", items: ["TypeScript", "Svelte", "React", "Vue"] },
];

// ─── Social / contact routing table ───────────────────────────────────────────

export interface SocialLink {
    label: string;
    href: string;
    handle: string;
}

export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/JimWeaverWork",
        handle: "@JimWeaverWork",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/james-weaver-43bba5308",
        handle: "/in/james-weaver",
    },
    {
        label: "Email",
        href: "mailto:jim.weaver.work@gmail.com",
        handle: "jim.weaver.work@gmail.com",
    },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navSections = ["about", "projects", "skills", "contact"] as const;
export type NavSection = (typeof navSections)[number] | "home";

export interface NavItem {
    id: (typeof navSections)[number];
    idx: string;
    label: string;
}

/** Section nav metadata — exposed indices + brutalist labels. */
export const navItems: NavItem[] = [
    { id: "about", idx: "01", label: "ABOUT" },
    { id: "projects", idx: "02", label: "WORK" },
    { id: "skills", idx: "03", label: "STACK" },
    { id: "contact", idx: "04", label: "CONTACT" },
];

// ─── Status → label/LED mapping ───────────────────────────────────────────────

export const STATUS_META: Record<
    ProjectStatus,
    { cls: LedState; word: string }
> = {
    live: { cls: "live", word: "LIVE" },
    "in-progress": { cls: "amber", word: "WIP" },
    archived: { cls: "idle", word: "ARCHIVED" },
};

/** Architecture-layer accent colours (CSS custom-property refs). */
export const LAYER_COLOR: Record<TechLayer, string> = {
    frontend: "var(--blue)",
    backend: "var(--purple)",
    data: "var(--green)",
    infra: "var(--amber)",
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
