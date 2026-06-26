import { Avatar } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import type { HeaderRowData } from "../jim-commons/HeaderRowPaper";

// ── Work experience ───────────────────────────────────────────────────────────
// Single source of truth for the work section. Each entry in the array below
// renders BOTH:
//   • one card in the home "Work Experience" section (built in jim-main/appData.ts)
//   • one block on the /work page (HeaderRowPaper + SidePaper)
// To add a role, just append a new WorkEntry,  no other file needs editing, the
// same way projects work (see src/jim-main/projectsData.ts).
export type WorkEntry = {
  /** Role header. `headerData.title` doubles as the home-card title. */
  headerData: HeaderRowData;
  /** One-sentence teaser shown on the home-page card. */
  summary: string;
  /** Bullet points for the "What I did" panel on /work. */
  description: string[];
  /** Skill chips shown under the description on /work. */
  chips?: string[];
  /** Optional home-card image (import an asset). Defaults to the placeholder. */
  image?: string;
};

export const workData: WorkEntry[] = [
  {
    headerData: {
      title: "Engineering Intern / Co-op",
      chipLabels: ["Persico USA", "Elixir", "Linux"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>P</Avatar>,
        <WorkOutlineIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Duration"],
      statValue: ["~1 yr"],
      statSubLabel: ["June 2025 – April 2026"],
    },
    summary:
      "Engineering co-op at Persico USA in Sterling Heights, MI,  modernizing internal infrastructure and replacing legacy systems with custom Elixir applications.",
    description: [
      "• Ported entire production services off aging Microsoft Server VMs onto Ubuntu 24.04 VMs.",
      "• Replaced internal systems previously built on SharePoint with custom-made Elixir applications.",
      "• Worked hands-on with Linux server administration, virtualization, and full-stack deployment.",
    ],
    chips: ["Elixir", "Linux", "Ubuntu", "Virtualization", "Migration"],
  },
  {
    headerData: {
      title: "Head Data Specialist",
      chipLabels: ["Warrior Racing FSAE", "Telemetry", "C++"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>W</Avatar>,
        <WorkOutlineIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Duration"],
      statValue: ["~1 yr"],
      statSubLabel: ["Feb 2025 – Jan 2026"],
    },
    summary:
      "Head data specialist for Wayne State's Formula SAE team, building the hardware and software that captures race-car telemetry.",
    description: [
      "• Led telemetry collection for the team's Formula SAE car, using custom hardware and software to log key performance data to .csv files.",
      "• Grew the number of data points captured by over 10× since taking on the role.",
      "• Cut turnaround time on car improvements by roughly 50% by getting actionable data to the team faster.",
    ],
    chips: ["Telemetry", "Data Logging", "Hardware", "C++", "CSV", "Arduino"],
  },
  {
    headerData: {
      title: "Teacher",
      chipLabels: ["iCode", "Unreal Engine 5", "C++"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>i</Avatar>,
        <WorkOutlineIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Duration"],
      statValue: ["1 yr"],
      statSubLabel: ["Apr 2023 – Jun 2024"],
    },
    summary:
      "Taught Unreal Engine 5 and C++ scripting at iCode in Novi, MI, building weekly curriculum for students across skill levels.",
    description: [
      "• Taught in-depth courses on Unreal Engine 5 and its related C++ scripting to students across a range of skill levels.",
      "• Produced weekly course material to a set curriculum standard, breaking large ideas down into lessons students could grasp.",
      "• Adapted explanations on the fly to make complex concepts relatable and approachable.",
    ],
    chips: ["Unreal Engine 5", "C++", "Teaching", "Curriculum"],
  },
  {
    headerData: {
      title: "Insider",
      chipLabels: ["Jet's Pizza", "Customer Service"],
      chipIcons: [
        <Avatar sx={{ width: "1.4rem", height: "1.4rem" }}>J</Avatar>,
        <WorkOutlineIcon sx={{ color: "white !important" }} />,
      ],
      statLabel: ["Duration"],
      statValue: ["3 yrs"],
      statSubLabel: ["Jun 2022 – Aug 2025"],
    },
    summary:
      "Part-time insider at Jet's Pizza in Plymouth, MI, balancing food prep and customer service alongside school.",
    description: [
      "• Handled food prep, order accuracy, and front-of-house customer service.",
      "• Balanced a steady work schedule alongside full-time coursework for over three years.",
    ],
    chips: ["Customer Service", "Teamwork", "Time Management"],
  },
];
