import type { CSSProperties } from "react";
import {
  Skeleton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  useMediaQuery,
  type TooltipProps,
} from "@mui/material";
import { Code } from "@mui/icons-material";
import { motion } from "framer-motion";
import { techStack, techImages } from "./techStackData";
import HeaderChip from "../jim-main/HeaderChip";
import { useGetImages } from "../jim-commons/Hooks";
import "../styles/Image.css";

function TechStack() {
  const isLoading = useGetImages(techImages);
  const isPhone = useMediaQuery("(max-width:1000px)");

  return (
    <Stack alignItems="center" sx={{ margin: "4rem auto" }}>
      <HeaderChip
        title="Tech Stack"
        logo={<Code sx={{ color: "white !important", fontSize: "2rem" }} />}
      />
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ margin: "1rem auto", borderRadius: "1rem", maxWidth: "60rem" }}
          width="80%"
          height="12rem"
        />
      ) : (
        <CardRow
          direction={isPhone ? "column" : "row"}
          justifyContent="center"
          alignItems={isPhone ? "center" : "stretch"}
          flexWrap="wrap"
        >
          {techStack.map((group) => (
            <CategoryCard key={group.category}>
              <Typography variant="h6">{group.category}</Typography>
              <LogoRow>
                {group.items.map((item) => (
                  <StyledTooltip
                    key={item.title}
                    title={item.title}
                    arrow
                    placement="top"
                  >
                    <StyledHolder>
                      <motion.img
                        whileHover={{ y: -8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        style={imgStyle}
                        src={item.image}
                        alt={item.title}
                      />
                    </StyledHolder>
                  </StyledTooltip>
                ))}
              </LogoRow>
            </CategoryCard>
          ))}
        </CardRow>
      )}
    </Stack>
  );
}

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: "1rem",
    backgroundColor: "var(--mui-palette-background-surface)",
    color: "var(--mui-palette-text-secondary)",
    fontSize: "0.85rem",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "var(--mui-palette-background-surface)",
  },
}));

const CardRow = styled(Stack)({
  width: "100%",
  maxWidth: "max(95%, 55rem)",
  margin: "1rem auto 0",
});

const CategoryCard = styled(Stack)({
  backgroundColor: "var(--mui-palette-background-paper)",
  borderRadius: "1rem",
  margin: "0.5rem",
  padding: "1.25rem 1.25rem 1.5rem",
  flex: "1 1 0",
  minWidth: "12rem",
  maxWidth: "16rem",
  alignItems: "center",
  gap: "1rem",
});

const LogoRow = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.75rem",
  justifyContent: "center",
  alignItems: "center",
});

const StyledHolder = styled(Stack)({
  width: "2.25rem",
  height: "2.25rem",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
});

const imgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

export default TechStack;
