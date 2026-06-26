// ─── Blog index ──────────────────────────────────────────────────────────────
// Collects every post file in this directory. To add a post, just create a new
//   src/jim-blog/<slug>-blogData.ts
// that default-exports a BlogPost,  it shows up here automatically. Scaffold one
// with:  make new-post slug=my-post title="My Post"

import type { BlogPost } from "./types";

export type { BlogBlock, BlogPost } from "./types";

// Eagerly import every `*-blogData.ts` post file alongside this index.
const modules = import.meta.glob<{ default: BlogPost }>("./*-blogData.ts", {
  eager: true,
});

export const posts: BlogPost[] = Object.values(modules).map((m) => m.default);

/** Posts sorted newest-first for the index page. */
export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Look up a single post by slug. */
export function getPost(slug: string | undefined): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
