// Languages
import pythonLogo from "../assets/img-ui/pythonLogo.svg";
import rustLogo from "../assets/img-ui/rustLogo.svg";
import cppLogo from "../assets/img-ui/cppLogo.svg";
import elixirLogo from "../assets/img-ui/elixirLogo.svg";
import typescriptLogo from "../assets/img-ui/typescriptLogo.svg";
import htmlLogo from "../assets/img-ui/htmlLogo.svg";
import cssLogo from "../assets/img-ui/cssLogo.svg";

// Infrastructure
import postgresLogo from "../assets/img-ui/postgresLogo.svg";
import mysqlLogo from "../assets/img-ui/mysqlLogo.svg";
import supabaseLogo from "../assets/img-ui/supabaseLogo.svg";
import neonLogo from "../assets/img-ui/neonLogo.svg";
import clickhouseLogo from "../assets/img-ui/clickhouseLogo.svg";
import minioLogo from "../assets/img-ui/minioLogo.svg";
import redisLogo from "../assets/img-ui/redisLogo.svg";
import dockerLogo from "../assets/img-ui/dockerLogo.svg";
import vllmLogo from "../assets/img-ui/vllmLogo.svg";
import cloudflareLogo from "../assets/img-ui/cloudflareLogo.svg";
import awsLogo from "../assets/img-ui/awsLogo.svg";
import flyioLogo from "../assets/img-ui/flyioLogo.svg";

// Frameworks
import svelteLogo from "../assets/img-ui/svelteLogo.svg";
import reactLogo from "../assets/img-ui/reactLogo.svg";
import djangoLogo from "../assets/img-ui/djangoLogo.svg";
import flaskLogo from "../assets/img-ui/flaskLogo.svg";
import phoenixLogo from "../assets/img-ui/phoenixLogo.svg";

// Tools
import gitLogo from "../assets/img-ui/gitLogo.svg";
import vscodeLogo from "../assets/img-ui/vscodeLogo.svg";
import unityLogo from "../assets/img-ui/unityLogo.png";
import grafanaLogo from "../assets/img-ui/grafanaLogo.svg";
import ollamaLogo from "../assets/img-ui/ollamaLogo.svg";
import claudeLogo from "../assets/img-ui/claudeLogo.svg";

export type TechItem = { title: string; image: string };
export type TechGroup = { category: string; items: TechItem[] };

// Edit these groups to match your own stack,  each entry just needs a title + logo.
export const techStack: TechGroup[] = [
  {
    category: "Languages",
    items: [
      { title: "Python", image: pythonLogo },
      { title: "Rust", image: rustLogo },
      { title: "C++", image: cppLogo },
      { title: "Elixir", image: elixirLogo },
      { title: "TypeScript", image: typescriptLogo },
      { title: "HTML5", image: htmlLogo },
      { title: "CSS3", image: cssLogo },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { title: "Postgres", image: postgresLogo },
      { title: "MySQL", image: mysqlLogo },
      { title: "Supabase", image: supabaseLogo },
      { title: "Neon", image: neonLogo },
      { title: "Clickhouse", image: clickhouseLogo },
      { title: "Minio", image: minioLogo },
      { title: "Redis", image: redisLogo },
      { title: "Docker", image: dockerLogo },
      { title: "vLLM", image: vllmLogo },
      { title: "Cloudflare", image: cloudflareLogo },
      { title: "Amazon Web Services", image: awsLogo },
      { title: "Fly.io", image: flyioLogo },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { title: "Svelte", image: svelteLogo },
      { title: "React", image: reactLogo },
      { title: "Django", image: djangoLogo },
      { title: "Flask", image: flaskLogo },
      { title: "Phoenix", image: phoenixLogo },
    ],
  },
  {
    category: "Tools",
    items: [
      { title: "Git", image: gitLogo },
      { title: "Visual Studio Code", image: vscodeLogo },
      { title: "Unity", image: unityLogo },
      { title: "Grafana", image: grafanaLogo },
      { title: "Docker", image: dockerLogo },
      { title: "Ollama", image: ollamaLogo },
      { title: "Claude", image: claudeLogo },
    ],
  },
];

export const techImages = techStack.flatMap((g) => g.items.map((i) => i.image));
