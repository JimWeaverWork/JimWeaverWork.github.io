import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, Typography } from "@mui/material";
import dialogLogo from "../assets/img-ui/dialogLogo.png";
import dialogLogoAlt from "../assets/img-ui/dialogLogoAlt.svg";
import jimWeaverLogo from "../assets/logo.webp";
import restartLogo from "../assets/img-ui/restart.svg";
import shutdownLogo from "../assets/img-ui/shutdown.svg";

const imgSrc = [
  dialogLogo,
  dialogLogoAlt,
  jimWeaverLogo,
  restartLogo,
  shutdownLogo,
];

type AppDialogProps = {
  heading: string;
  description: string;
  visible: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  imgCode?: number;
  onClose: () => void;
  onCloseSecondary?: () => void;
};

function AppDialog({
  heading,
  description,
  visible,
  imgCode = 0,
  onClose,
  onCloseSecondary,
  primaryButtonText,
  secondaryButtonText,
}: AppDialogProps) {
  const isPower = ["Shut Down", "Restart"].includes(primaryButtonText!);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dialog"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center center",
            zIndex: 5,
          }}
        >
          <StyledAppDialog>
            <LeftAlign>
              <img
                src={imgSrc[imgCode]}
                style={{
                  width: "5rem",
                  paddingLeft: [2, 3, 4].includes(imgCode) ? "0.3rem" : "0",
                }}
              />
              <p className="dialog-header">{heading}</p>
              <p className="dialog-description">{description}</p>
              {isPower && (
                <Stack mb={2} direction="row" alignItems="center" gap={1}>
                  <input type="checkbox" style={{ accentColor: "#f38008" }} />
                  <Typography
                    sx={{ fontSize: "0.7rem", fontFamily: "San Francisco" }}
                    variant="body2"
                  >
                    Reopen windows when logging back in
                  </Typography>
                </Stack>
              )}
            </LeftAlign>
            <Stack
              direction={isPower ? "row-reverse" : "column"}
              alignItems="center"
              gap={1.5}
              style={{
                marginBottom: "1.5rem",
                width: isPower ? "calc(100% - 3rem)" : "100%",
              }}
            >
              <div className="dialog-ok dialog-button" onClick={onClose}>
                {primaryButtonText ?? "OK"}
              </div>
              {secondaryButtonText && (
                <div
                  className="dialog-secondary dialog-button"
                  onClick={onCloseSecondary}
                >
                  {secondaryButtonText ?? "Cancel"}
                </div>
              )}
            </Stack>
          </StyledAppDialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const LeftAlign = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: calc(100% - 3rem);
`;

const StyledAppDialog = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  top: 50%;
  left: 50%;
  -webkit-backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  background-color: color-mix(
    in srgb,
    var(--mui-palette-background-surface) 95%,
    transparent
  );
  color: var(--mui-palette-text-secondary);
  transform: translate(-50%, -50%);
  font-family: "San Francisco";
  transform-origin: center;
  text-align: center;
  width: 17rem;
  z-index: 5;

  img {
    width: 5rem;
    margin: 2rem;
    position: relative;
    left: -2.5rem;
  }

  p.dialog-header {
    margin: 0;
    font-weight: 800;
    font-size: 0.9rem;
    font-family: "San Francisco Bold";
  }

  p.dialog-description {
    margin: 1rem 2rem;
    font-size: 0.7rem;
    margin-left: 0;
    margin-right: 0;
  }

  div.dialog-button {
    width: 85%;
    padding: 0.25rem;
    font-size: 0.9rem;
    font-weight: 800;
    border-radius: 3rem;
  }

  div.dialog-ok {
    background-color: #f38008;
    color: white;
  }

  div.dialog-secondary {
    background-color: #877c72;
    color: white;
  }

  div.dialog-ok:active {
    background-color: #c96c08;
  }

  div.dialog-secondary:active {
    background-color: #6e665e;
  }

  div.dialog-button:hover {
    cursor: pointer;
  }
`;

export default AppDialog;
