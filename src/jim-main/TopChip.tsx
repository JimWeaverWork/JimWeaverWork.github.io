import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

type TopChipProps = {
  img?: string;
  color: Record<string, string>;
  title: string;
  link: () => void;
};

function getIcon(title: string, img?: string) {
  switch (title) {
    case "GitHub":
      return (
        <GitHub
          sx={{
            color: "white!important",
            position: "relative",
            bottom: "0.075rem",
          }}
        />
      );
    case "LinkedIn":
      return (
        <LinkedIn
          sx={{
            color: "white!important",
            position: "relative",
            bottom: "0.075rem",
          }}
        />
      );
    default:
      return <img width={"20rem"} src={img}></img>;
  }
}

function TopChip({
  img,
  title,
  color,
  link,
  isPhone,
}: TopChipProps & { isPhone: boolean }) {
  return (
    <StyledChip
      variant="filled"
      icon={getIcon(title, img)}
      sx={{
        backgroundColor: color[800],
        ":hover": { backgroundColor: color[900] },
        width: isPhone ? "12rem" : "9rem",
      }}
      onClick={link}
      label={title}
    />
  );
}

const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1rem",
  margin: "0.5rem",
  height: "2.2rem",
});

export default TopChip;
