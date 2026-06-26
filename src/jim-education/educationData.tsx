import { Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import type { HeaderRowData } from "../jim-commons/HeaderRowPaper";

// ── Education ─────────────────────────────────────────────────────────────────
// Single source of truth for the education section. Each entry in the array
// below renders BOTH:
//   • one card in the home "Education" section (built in jim-main/appData.ts)
//   • one block on the /education page (HeaderRowPaper + optional SidePapers)
// To add a school or degree, just append a new EducationEntry,  no other file
// needs editing, the same way projects work (see src/jim-main/projectsData.ts).

/** An optional detail panel rendered under a school's header on /education. */
export type EducationSidePaper = {
  title: string;
  description: string[];
  chips?: string[];
};

export type EducationEntry = {
  /** School/degree header. `headerData.title` doubles as the home-card title. */
  headerData: HeaderRowData;
  /** One-sentence teaser shown on the home-page card. */
  summary: string;
  /** Optional detail panels rendered side-by-side under the header on /education. */
  sidePapers?: EducationSidePaper[];
  /** Optional home-card image (import an asset). Defaults to the placeholder. */
  image?: string;
};

export const educationData: EducationEntry[] = [
  {
    headerData: {
      title: "B.S. Computer Science",
      chipLabels: ["Wayne State University", "Computer Science"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>W</Avatar>,
        <SchoolIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Expected"],
      statValue: ["May 2028"],
      statSubLabel: ["B.S. Degree"],
    },
    summary:
      "Bachelor of Science in Computer Science at Wayne State University, with coursework spanning Python and C++.",
    sidePapers: [
      {
        title: "Relevant Coursework",
        description: [
          "BE 2100,  Engineering computation in Python",
          "BE 1600,  Programming fundamentals in Python",
          "CSC 1100,  Problem solving and programming in C++",
        ],
        chips: ["Python", "C++"],
      },
    ],
  },
  {
    headerData: {
      title: "B.S. Electrical & Computer Engineering",
      chipLabels: [
        "Wayne State University",
        "Electrical & Computer Engineering",
      ],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>W</Avatar>,
        <SchoolIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Expected"],
      statValue: ["May 2028"],
      statSubLabel: ["B.S. Degree"],
    },
    summary:
      "Bachelor of Science in Electrical & Computer Engineering at Wayne State University, pursued alongside Computer Science.",
    sidePapers: [
      {
        title: "Relevant Coursework",
        description: ["BE 1200,  3D modeling and design in Siemens NX"],
        chips: ["Siemens NX", "CAD"],
      },
    ],
  },
  {
    headerData: {
      title: "High School Diploma",
      chipLabels: ["High School Diploma", "AP Computer Science"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>H</Avatar>,
        <SchoolIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Graduated"],
      statValue: ["Jun 2024"],
      statSubLabel: ["Diploma"],
    },
    summary:
      "High school diploma with AP Computer Science (Java) and AP Computer Science Principles (Python).",
    sidePapers: [
      {
        title: "Relevant Coursework",
        description: [
          "AP Computer Science,  Java",
          "AP Computer Science Principles,  Python",
        ],
        chips: ["Java", "Python"],
      },
    ],
  },
];
