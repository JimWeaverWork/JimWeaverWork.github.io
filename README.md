# jimweaver.com

My personal developer portfolio and blog — a fully static React site deployed to GitHub Pages.

🔗 Live at **[jimweaver.com](https://jimweaver.com)**

## About me

Hi, I'm Jim (James) — an aspiring engineer working on my degree at Wayne State
University, with interests spanning electrical and software engineering. I enjoy
automation and building things end to end, and I use this site to showcase the
projects I've worked on and to keep a small blog along the way.

## Tech stack

- **React 19** + **TypeScript** — UI
- **Vite** — build tooling & dev server
- **MUI (Material UI)** — components & theming
- **Framer Motion** — animation
- **React Router** — client-side routing
- **Lottie** — the animated hero
- **GitHub Pages** — hosting (auto-deployed via GitHub Actions)

## Run it yourself

You're welcome to clone this and use it as a starting point for your own
portfolio.

### Prerequisites

- [Node.js](https://nodejs.org) 20+ (CI builds on Node 24)
- A code editor (VS Code recommended)

### Setup

```bash
git clone https://github.com/JimWeaverWork/JimWeaverWork.github.io.git
cd JimWeaverWork.github.io
npm install
npm run dev
```

The dev server runs at <http://localhost:5173>.

### Common commands

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                             |
| `npm run build`   | Type-check and produce a production build in `dist/`  |
| `npm run preview` | Preview the production build locally                  |
| `npm run lint`    | Run ESLint                                            |

## Making it your own

Most content lives in plain data files — edit these and the site updates:

- **Projects** — `src/jim-main/projectsData.ts`
- **Blog posts** — one file per post in `src/jim-blog/` (auto-collected)
- **Tech stack strip** — `src/jim-techstack/techStackData.ts`
- **Site info / footer** — `src/jim-commons/siteInfo.ts`

Two scaffolding helpers wire up the boilerplate for you:

```bash
make new-card slug=my-thing title="My Thing"   # project card + /project/<slug> page
make new-post slug=my-post  title="My Post"     # blog post  + /blog/<slug> page
```

Deploying to your own domain? Update `public/CNAME` and the `homepage` field in
`package.json`.

## Deployment

Every push to `main` runs the GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds the site and publishes `dist/` to
GitHub Pages.
