import "./../styles/App.css";
import HolderBox from "../jim-commons/HolderBox";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircleOutline,
  GitHub,
  OpenInNew,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import {
  bannerImage,
  getProject,
  LAYER_COLOR,
  LAYER_LABEL,
  LAYER_ORDER,
  STATUS_META,
} from "./projectsData";

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const isPhone = useMediaQuery("(max-width:600px)");

  if (!project) {
    return (
      <HolderBox>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h4">Project not found</Typography>
          <Typography color="text.primary">
            No project matches “{slug}”.
          </Typography>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBack />}
            variant="contained"
          >
            Back home
          </Button>
        </Stack>
      </HolderBox>
    );
  }

  const status = STATUS_META[project.status];
  const isGitHub = project.link.includes("github.com");
  const usedLayers = LAYER_ORDER.filter((layer) =>
    project.techStack.some((t) => t.layer === layer),
  );

  return (
    <HolderBox isWide>
      <Stack spacing={3}>
        <Box
          component="img"
          src={bannerImage(project.slug)}
          alt={project.title}
          sx={{
            width: "100%",
            height: isPhone ? "10rem" : "16rem",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />

        {/* Title + status + live link */}
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap={1.5}
        >
          <Stack spacing={0.5}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1.5}
              flexWrap="wrap"
            >
              <Typography variant={isPhone ? "h4" : "h3"} fontWeight={700}>
                {project.title}
              </Typography>
              <Chip
                label={status.word}
                size="small"
                sx={{ bgcolor: status.color, color: "#fff", fontWeight: 700 }}
              />
            </Stack>
            <Typography color="text.primary" sx={{ opacity: 0.7 }}>
              {project.year}
            </Typography>
          </Stack>
          {project.link && (
            <Button
              variant="contained"
              endIcon={isGitHub ? <GitHub /> : <OpenInNew />}
              onClick={() => window.open(project.link, "_blank")}
            >
              {isGitHub ? "View source" : "Visit live"}
            </Button>
          )}
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {project.tags.map((t) => (
            <Chip key={t} label={t} variant="outlined" />
          ))}
        </Stack>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography color="text.primary" sx={{ lineHeight: 1.7 }}>
            {project.overview}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Highlights
          </Typography>
          <Stack spacing={1}>
            {project.highlights.map((h, i) => (
              <Stack key={i} direction="row" gap={1} alignItems="flex-start">
                <CheckCircleOutline
                  fontSize="small"
                  sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
                />
                <Typography color="text.primary">{h}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Tech stack
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {usedLayers.map((layer) => (
              <Paper
                key={layer}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "1rem",
                  flex: "1 1 16rem",
                  minWidth: "14rem",
                }}
              >
                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: LAYER_COLOR[layer],
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      opacity: 0.8,
                    }}
                  >
                    {LAYER_LABEL[layer]}
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {project.techStack
                    .filter((t) => t.layer === layer)
                    .map((t) => (
                      <Box key={t.name}>
                        <Typography fontWeight={600}>{t.name}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {t.role}
                        </Typography>
                      </Box>
                    ))}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          variant="text"
          sx={{ alignSelf: "flex-start" }}
        >
          Back to all projects
        </Button>
      </Stack>
    </HolderBox>
  );
}

export default ProjectDetail;
