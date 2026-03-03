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

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

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
    title: "anon-chat",
    description: "A small anonymous chat app built with Rust and SpacetimeDB with a React and TypeScript frontend. It is a realtime chat application that automatically deletes messages after 24 hours.",
    tags: ["Rust", "SpacetimeDB", "TypeScript", "React"],
    link: "https://chat.jimweaver.com"
  },
  {
    title: "BE2100 Capstone Project",
    description: "A full-stack web application for managing and visualizing data. Built with Django and Sqlite, it provides a user-friendly interface for data analysis and reporting.",
    tags: ["Python", "Django", "SQLite", "Data Visualization"],
    link: "https://be2100.jimweaver.com"
  },
];

export const skills: SkillGroup[] = [
  { name: "Backend", items: ["Python", "Rust", "Elixir", "C++"] },
  { name: "Databases", items: ["PostgreSQL", "SQLite", "Redis", "SpacetimeDB"] },
  { name: "DevOps", items: ["Docker", "GitHub Actions", "AWS", "Cloudflare"] },
  { name: "Frontend", items: ["TypeScript", "Svelte", "React", "Vue"] },
];

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/JimWeaverWork", label: "GitHub", external: true, icon: siGithub },
  { href: "https://www.linkedin.com/in/james-weaver-43bba5308", label: "Linkedin", external: true, icon: linkedInIcon },
  { href: "mailto:jim.weaver.work@gmail.com", label: "Email", external: false, icon: siGmail },
];