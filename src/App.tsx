import Home from "./Home.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles, CssBaseline } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Education from "./jim-education/Education.tsx";
import Work from "./jim-work/Work.tsx";
import ScrollToTop from "./jim-commons/ScrollToTop.tsx";
import { NotFound } from "./NotFound.tsx";
import Contact from "./jim-main/Contact.tsx";
import ProjectDetail from "./jim-main/ProjectDetail.tsx";
import Blog from "./jim-blog/Blog.tsx";
import BlogPost from "./jim-blog/BlogPost.tsx";

const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  typography: { fontFamily: "Trebuchet" },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#e60033",
          light: "#ff2d52",
          dark: "#a1002c",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#a23a6b",
          light: "#c76a95",
          dark: "#6b1f45",
          contrastText: "#ffffff",
        },
        background: {
          default: "#2a0418",
          normal: "#ffffff",
          paper: "#330820",
          surface: "#f8eef2",
          panel: "#ffffff",
          panelAlt: "#f8eef3",
          light: "#3d0a26",
          light2: "#3d0a26aa",
          button: "#e60033",
          buttondark: "#b8002a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#1d0710",
          light: "#aaaaaa",
          light2: "#999999",
          dark: "#dddddd",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#f70032",
          light: "#ff4d6d",
          dark: "#c10028",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#b3527e",
          light: "#d07ea3",
          dark: "#7a3457",
          contrastText: "#ffffff",
        },
        background: {
          default: "#120016",
          normal: "#120016",
          paper: "#200413",
          surface: "#2a0818",
          panel: "#1a0512",
          panelAlt: "#15040f",
          light: "#4a0a2a",
          light2: "#4a0a2a88",
          button: "#4a0820",
          buttondark: "#380618",
        },
        text: {
          primary: "#ffffff",
          secondary: "#ffffff",
          light: "#333333",
          light2: "#494949",
          dark: "#494949",
        },
      },
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={appTheme} defaultMode="light">
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, #root": {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
        }}
      />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/education" element={<Education />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
