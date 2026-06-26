#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// new-post,  scaffold an empty blog post.
//
//   make new-post slug=my-post title="My Post"
//
// What it does:
//   Creates src/jim-blog/<slug>-blogData.ts with a placeholder BlogPost that
//   default-exports itself. posts.ts picks it up automatically, so it instantly
//   becomes:
//     • a card on the /blog index
//     • a detail page at /blog/<slug>
//
// Then just edit that file to write your post.
// ─────────────────────────────────────────────────────────────────────────────
import { existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = resolve(ROOT, "src/jim-blog");

// ── args (supports `slug=x title="y"` and `--slug x --title y`) ───────────────
const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.includes("=")) {
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
    '✗ Missing slug.\n  Usage: make new-post slug=my-post title="My Post"',
  );
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(
    `✗ Invalid slug "${slug}",  use lowercase letters, numbers and dashes.`,
  );
  process.exit(1);
}

const file = resolve(BLOG_DIR, `${slug}-blogData.ts`);
if (existsSync(file)) {
  console.log(
    `• post "${slug}" already exists (${slug}-blogData.ts),  nothing to do.`,
  );
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const safeTitle = (title || slug).replace(/"/g, '\\"');
const contents = `import type { BlogPost } from "./types";

const post: BlogPost = {
  slug: "${slug}",
  title: "${safeTitle}",
  date: "${today}",
  summary: "Placeholder,  one sentence summarising this post.",
  tags: ["tag"],
  body: [
    { type: "heading", text: "Section heading" },
    {
      type: "paragraph",
      text: "Placeholder,  write your first paragraph here.",
    },
  ],
};

export default post;
`;

writeFileSync(file, contents);
console.log(
  `✓ created src/jim-blog/${slug}-blogData.ts -> card + /blog/${slug}`,
);
console.log(
  `\nNext: edit src/jim-blog/${slug}-blogData.ts to write your post.`,
);
