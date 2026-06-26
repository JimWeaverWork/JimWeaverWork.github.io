import "./../styles/App.css";
import HolderBox from "../jim-commons/HolderBox";
import { Container, Stack } from "@mui/material";
import HeaderRowPaper from "../jim-commons/HeaderRowPaper";
import { SidePaper } from "../jim-commons/SidePaper";
import { workData } from "./workData";

function Work() {
  return (
    <HolderBox>
      <Stack direction={"column"} gap={1.5}>
        {workData.map((item, index) => (
          <Container sx={{ padding: "0" }} key={index}>
            <HeaderRowPaper data={item.headerData} />
            <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mt={1.5}>
              <SidePaper
                title="What I did"
                description={item.description}
                chips={item.chips}
                style={{ width: "100%" }}
              />
            </Stack>
          </Container>
        ))}
      </Stack>
    </HolderBox>
  );
}

export default Work;
