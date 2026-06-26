import "./styles/App.css";
import Header from "./jim-commons/Header";
import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import logo from "./assets/logo2.jpeg";
import {
  codingData,
  educationData,
  images,
  workData,
} from "./jim-main/appData";
import { openGitHub, openLinkedIn } from "./jim-commons/Utils";
import { grey, blue } from "@mui/material/colors";
import TopChip from "./jim-main/TopChip";
import MainSection from "./jim-main/MainSection";
import {
  DataObject,
  WorkOutline as Work,
  SchoolOutlined as School,
  PersonOutlined,
} from "@mui/icons-material";
import Footer from "./jim-commons/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetImages } from "./jim-commons/Hooks";
import AppDialog from "./jim-commons/AppDialog";
import { DialogContext } from "./jim-main/appData";
import TechStack from "./jim-techstack/TechStack";
import Background from "./Background";
import useGeneralInfo from "./jim-commons/siteInfo";
import HeaderChip from "./jim-main/HeaderChip";

function Home() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("homeScroll");
    if (saved) {
      window.scrollTo(0, Number(saved));
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
    const handleScroll = () => {
      sessionStorage.setItem("homeScroll", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoading = useGetImages([...images, logo]);
  const isPhone = useMediaQuery("(max-width:1000px)");

  const { aboutMe: aboutMeText } = useGeneralInfo();

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header />
      <motion.div
        style={{ transformOrigin: "top center" }}
        initial={{
          opacity: 0,
          scale: sessionStorage.getItem("homeScroll") ? 1 : 0.95,
          x: sessionStorage.getItem("homeScroll") ? 50 : 0,
          y: 0,
        }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.05, 0.8, 0.35, 0.99] }}
      >
        <Box sx={{ marginBottom: "4rem" }}>
          <Background />
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ margin: "2rem 0", marginTop: "4rem" }}
          >
            {isLoading && (
              <Skeleton variant="circular" width={88} height={88} />
            )}
            <Box sx={{ position: "relative" }}>
              <StyledImg
                src={logo}
                style={{
                  display: isLoading ? "none" : "block",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{
              maxWidth: "55rem",
              width: "calc(100% - 2rem)",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <HeaderChip
              title="About Me"
              logo={<PersonOutlined sx={ChipIconStyle} />}
            />
            <Box height="0.5rem" />
            {!aboutMeText ? (
              <>
                <Skeleton variant="text" width="100%" animation="wave" />
                <Skeleton variant="text" width="100%" animation="wave" />
                <Skeleton variant="text" width="100%" animation="wave" />
                <Skeleton variant="text" width="100%" animation="wave" />
              </>
            ) : (
              <p
                className="about"
                style={{
                  fontSize: isPhone ? "0.9rem" : "1rem",
                  marginTop: "0.75rem",
                }}
              >
                {aboutMeText}
              </p>
            )}
          </Stack>
          <br />
          <Stack
            direction={isPhone ? "column" : "row"}
            spacing={0}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            sx={{ width: "100%", margin: "0" }}
          >
            <TopChip
              isPhone={isPhone}
              title="LinkedIn"
              color={blue}
              link={openLinkedIn}
            />
            <TopChip
              isPhone={isPhone}
              title="GitHub"
              color={grey}
              link={openGitHub}
            />
          </Stack>
          <TechStack />
          <DialogContext.Provider
            value={{ openDialog, setOpenDialog }}
          >
            <AppDialog
              heading="Not Implemented"
              description="This feature is still under development. Stay tuned for updates!"
              visible={openDialog}
              onClose={() => setOpenDialog(false)}
            />
            <Stack
              direction="column"
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "2rem" }}
            >
              <MainSection
                heading="Projects"
                icon={<DataObject sx={ChipIconStyle} />}
                genericData={codingData}
                isLoading={isLoading}
              />
              <MainSection
                heading="Work Experience"
                icon={<Work sx={ChipIconStyle} />}
                genericData={workData}
                isLoading={isLoading}
              />
              <MainSection
                heading="Education"
                icon={<School sx={ChipIconStyle} />}
                genericData={educationData}
                isLoading={isLoading}
              />
            </Stack>
          </DialogContext.Provider>
        </Box>
      </motion.div>
      <Footer />
    </>
  );
}

const StyledImg = styled.img`
  width: 5.5rem;
`;

const ChipIconStyle = { color: "white !important", fontSize: "2rem" };

export default Home;
