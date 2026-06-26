import "./../styles/App.css";
import HolderBox from "../jim-commons/HolderBox";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { sortedPosts } from "./posts";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Blog() {
  return (
    <HolderBox isWide>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" fontWeight={700}>
            Blog
          </Typography>
          <Typography color="text.primary" sx={{ opacity: 0.7 }}>
            Notes, write-ups, and the occasional deep dive.
          </Typography>
        </Box>
        <Stack spacing={2}>
          {sortedPosts.map((post) => (
            <Card
              key={post.slug}
              sx={{
                backgroundColor: "var(--mui-palette-background-paper)",
                borderRadius: "1rem",
              }}
            >
              <CardActionArea
                component={Link}
                to={`/blog/${post.slug}`}
                sx={{ p: 2.5 }}
              >
                <Typography
                  color="text.primary"
                  variant="body2"
                  sx={{ opacity: 0.6 }}
                >
                  {formatDate(post.date)}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography variant="h5" fontWeight={600}>
                    {post.title}
                  </Typography>
                  <ArrowForward />
                </Stack>
                <Typography color="text.primary" sx={{ mt: 1, opacity: 0.85 }}>
                  {post.summary}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1} mt={1.5}>
                  {post.tags.map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" />
                  ))}
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
    </HolderBox>
  );
}

export default Blog;
