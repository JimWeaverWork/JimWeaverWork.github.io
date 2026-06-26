import "./../styles/App.css";
import HolderBox from "../jim-commons/HolderBox";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { getPost } from "./posts";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

  if (!post) {
    return (
      <HolderBox>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h4">Post not found</Typography>
          <Typography color="text.primary">
            No post matches “{slug}”.
          </Typography>
          <Button
            component={Link}
            to="/blog"
            startIcon={<ArrowBack />}
            variant="contained"
          >
            Back to blog
          </Button>
        </Stack>
      </HolderBox>
    );
  }

  return (
    <HolderBox isWide>
      <Stack spacing={2}>
        <Typography color="text.primary" variant="body2" sx={{ opacity: 0.6 }}>
          {formatDate(post.date)}
        </Typography>
        <Typography variant="h3" fontWeight={700}>
          {post.title}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {post.tags.map((t) => (
            <Chip key={t} label={t} variant="outlined" />
          ))}
        </Stack>
        <Divider />
        <Box>
          {post.body.map((block, i) =>
            block.type === "heading" ? (
              <Typography key={i} variant="h6" sx={{ mt: 2, mb: 1 }}>
                {block.text}
              </Typography>
            ) : (
              <Typography
                key={i}
                color="text.primary"
                sx={{ lineHeight: 1.8, mb: 1.5 }}
              >
                {block.text}
              </Typography>
            ),
          )}
        </Box>
        <Button
          component={Link}
          to="/blog"
          startIcon={<ArrowBack />}
          variant="text"
          sx={{ alignSelf: "flex-start" }}
        >
          Back to blog
        </Button>
      </Stack>
    </HolderBox>
  );
}

export default BlogPost;
