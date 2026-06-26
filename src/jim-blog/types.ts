// ─── Blog types ──────────────────────────────────────────────────────────────
// Shared shape for every post. Each post lives in its own
// `src/jim-blog/<slug>-blogData.ts` file and default-exports a `BlogPost`.
// They are collected automatically in `posts.ts`,  no registry to edit.

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export interface BlogPost {
  /** URL-safe id used for routing */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD),  used for sorting + display */
  date: string;
  /** One-sentence summary shown on the blog index card */
  summary: string;
  tags: string[];
  /** Ordered content blocks rendered top-to-bottom on the post page */
  body: BlogBlock[];
}
