import {
  Box,
  Button,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  useColorScheme,
  useMediaQuery,
  type TooltipProps,
} from "@mui/material";
import { motion } from "framer-motion";
import { Close, GitHub, LinkedIn, MailOutline } from "@mui/icons-material";
import { openEmail, openGitHub, openLinkedIn } from "../jim-commons/Utils";
import { useNavigate } from "react-router";
import { ContactWavesDark, ContactWavesLight } from "./ContactWaves";

function Contact() {
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const navigate = useNavigate();
  const isPhone = useMediaQuery("(max-width:1000px)");

  const goHome = () => {
    sessionStorage.setItem("homeScroll", "0");
    navigate("/");
  };

  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        {isLight ? <ContactWavesLight /> : <ContactWavesDark />}
      </Box>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <CenterWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.05, 0.8, 0.35, 0.99],
          }}
          style={{ width: "100%", maxWidth: "30rem" }}
        >
          <Card spacing={2.5} alignItems="center">
            {!isPhone && (
              <StyledTooltip title="Close" placement="top">
                <CircularButton
                  variant="text"
                  onClick={goHome}
                  sx={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    color: "red",
                  }}
                >
                  <Close />
                </CircularButton>
              </StyledTooltip>
            )}
            <h1
              style={{
                fontSize: isPhone ? "1.5rem" : "2rem",
                margin: 0,
                textAlign: "center",
              }}
            >
              Let's get you connected
            </h1>
            <p style={{ margin: 0, textAlign: "center" }}>
              If you have a question or just want to say hi, feel free to reach
              out!
            </p>
            <SubmitButton
              variant="contained"
              startIcon={<MailOutline />}
              onClick={openEmail}
              sx={{
                color: "var(--mui-palette-text-primary)",
                minWidth: "12rem",
              }}
            >
              Email Me
            </SubmitButton>
            <p style={{ margin: 0, textAlign: "center" }}>
              More ways to connect
            </p>
            <Stack direction="row" spacing={2} justifyContent="center">
              <StyledTooltip title="GitHub" placement="bottom">
                <CircularButton variant="outlined" onClick={openGitHub}>
                  <GitHub />
                </CircularButton>
              </StyledTooltip>
              <StyledTooltip title="LinkedIn" placement="bottom">
                <CircularButton variant="outlined" onClick={openLinkedIn}>
                  <LinkedIn />
                </CircularButton>
              </StyledTooltip>
            </Stack>
            <SubmitButton variant="text" onClick={goHome}>
              Back to Home
            </SubmitButton>
          </Card>
        </motion.div>
      </CenterWrapper>
    </>
  );
}

export default Contact;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--mui-palette-background-panel)",
    borderRadius: "1rem",
    fontSize: "0.85rem",
    color: "var(--mui-palette-text-secondary)",
    fontFamily: "Segoe UI",
  },
}));

const SubmitButton = styled(Button)({
  fontFamily: "Segoe UI",
  textTransform: "none",
  fontSize: "1rem",
});

const CircularButton = styled(Button)({
  borderRadius: "50%",
  width: "3rem",
  height: "3rem",
  minWidth: "3rem",
  padding: "0",
});

const CenterWrapper = styled(Box)({
  minHeight: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1.5rem",
});

const Card = styled(Stack)({
  position: "relative",
  width: "100%",
  padding: "2.5rem 2rem",
  fontFamily: "Segoe UI",
  backgroundColor: "var(--mui-palette-background-panelAlt)",
  color: "var(--mui-palette-text-secondary)",
  borderRadius: "1rem",
  boxShadow: "0 1.5rem 3rem rgba(0, 0, 0, 0.25)",
});
