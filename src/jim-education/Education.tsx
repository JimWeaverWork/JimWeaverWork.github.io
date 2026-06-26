import "./../styles/App.css";
import HolderBox from "../jim-commons/HolderBox";
import { Container, Stack } from "@mui/material";
import HeaderRowPaper from "../jim-commons/HeaderRowPaper";
import { SidePaper } from "../jim-commons/SidePaper";
import { educationData } from "./educationData";

function Education() {
  return (
    <HolderBox>
      <Stack direction={"column"} gap={1.5}>
        {educationData.map((entry, index) => (
          <Container sx={{ padding: "0" }} key={index}>
            <HeaderRowPaper data={entry.headerData} />
            {entry.sidePapers && entry.sidePapers.length > 0 && (
              <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mt={1.5}>
                {entry.sidePapers.map((paper, paperIndex) => (
                  <SidePaper
                    key={paperIndex}
                    title={paper.title}
                    description={paper.description}
                    chips={paper.chips}
                    style={{ width: "100%" }}
                  />
                ))}
              </Stack>
            )}
          </Container>
        ))}
      </Stack>
    </HolderBox>
  );
}

export default Education;
