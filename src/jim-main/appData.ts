import { createContext } from "react";
import { cardImage, projects } from "./projectsData";
import { workData as workEntries } from "../jim-work/workData";
import { educationData as educationEntries } from "../jim-education/educationData";

export type genericAppData = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  linkText: string;
  link?: string;
};

// ── Projects ─────────────────────────────────────────────────────────────────
// Generated from src/jim-main/projectsData.ts,  one card per project, each
// opening its in-app detail page at /project/<slug>. Add new ones with:
//   make new-card slug=my-thing title="My Thing"
export const codingData: genericAppData[] = projects.map((p) => ({
  title: p.title,
  description: p.description,
  image: cardImage(p.slug),
  linkText: "Learn More",
  link: `project/${p.slug}`,
}));

// ── Work & Education home cards ──────────────────────────────────────────────
// One card per entry, built from each section's data file,  add a role/school
// there and a card shows up here automatically, the same way projects do. Each
// card opens the full section page (/work or /education). Edit the entries in:
//   Work       -> src/jim-work/workData.tsx          (/work)
//   Education  -> src/jim-education/educationData.tsx (/education)
// The blog (/blog) is reached from the "Blog" button in the top bar (Header.tsx).
const placeholderImg = cardImage("placeholder");

export const workData: genericAppData[] = workEntries.map((entry) => ({
  title: entry.headerData.title,
  description: entry.summary,
  image: entry.image ?? placeholderImg,
  linkText: "Learn More",
  link: "work",
}));

export const educationData: genericAppData[] = educationEntries.map(
  (entry) => ({
    title: entry.headerData.title,
    description: entry.summary,
    image: entry.image ?? placeholderImg,
    linkText: "Learn More",
    link: "education",
  }),
);

// Images preloaded by the home page (deduplicated,  most cards share the placeholder).
export const images = [
  ...new Set([
    ...codingData.map((c) => c.image),
    ...workData.map((c) => c.image),
    ...educationData.map((c) => c.image),
    placeholderImg,
  ]),
];

export const DialogContext = createContext<{
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}>({
  openDialog: false,
  setOpenDialog: () => {},
});
