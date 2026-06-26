# Project tasks for the Jim Weaver portfolio.
.PHONY: help new-card new-post dev build lint

help:
	@echo "Targets:"
	@echo "  make new-card slug=my-thing title=\"My Thing\"   scaffold a placeholder project card + /project/<slug> page"
	@echo "  make new-post slug=my-post title=\"My Post\"     scaffold an empty blog post + /blog/<slug> page"
	@echo "  make dev                                        start the vite dev server"
	@echo "  make build                                      type-check + production build"
	@echo "  make lint                                       run eslint"

# Scaffold a placeholder project card + detail page.
# Writes a card image and inserts a Project stub into src/jim-main/projectsData.ts.
#   make new-card slug=my-thing title="My Thing"
new-card:
	@node scripts/new-card.mjs slug="$(slug)" title="$(title)"

# Scaffold an empty blog post.
# Creates src/jim-blog/<slug>-blogData.ts (auto-collected by posts.ts).
#   make new-post slug=my-post title="My Post"
new-post:
	@node scripts/new-post.mjs slug="$(slug)" title="$(title)"

dev:
	@npm run dev

build:
	@npm run build

lint:
	@npm run lint
