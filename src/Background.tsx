/**
 * Hero background scene.
 *
 * Behind the animated "Jim" name there are two swappable layers:
 *   1. BACKGROUND – full-bleed image, furthest back        -> placeholderBg
 *   2. FOREGROUND – the "little piece" along the bottom     -> placeholderFg
 *
 * ── HOW TO CHANGE IT LATER ────────────────────────────────────────────────
 *   • Easiest: overwrite the two PNGs in place (keep the same names)
 *       src/assets/img-parallax/hero-bg.png         (full-bleed, 1920x1080)
 *       src/assets/img-parallax/placeholder-fg.png  (bottom piece, 1920x460,
 *                                                     transparent above the curve)
 *   • Or drop your own art in src/assets/img-parallax/ and repoint the two
 *     imports below (placeholderBg / placeholderFg). Any web format works
 *     (png / webp / jpg / svg).
 *   • Fine-tune placement in the JSX blocks marked {/* BACKGROUND *\/} and
 *     {/* FOREGROUND *\/}: zIndex (stacking), top/bottom, width, and the
 *     dark-mode `brightness(...)` value.
 *   • Hero height lives on StyledBox `height` (100dvh desktop / 42rem phone).
 *   • The animated name itself is the Lottie file public/img/text.json,
 *     played by the effect below,  not part of the background art.
 * ──────────────────────────────────────────────────────────────────────────
 */
import {
  Box,
  Skeleton,
  styled,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import placeholderBg from "./assets/img-parallax/hero-bg.png";
import placeholderFg from "./assets/img-parallax/placeholder-fg.png";
import { useGetImages } from "./jim-commons/Hooks";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import { motion } from "framer-motion";
import "./styles/Image.css";
import { ArrowCircleDownOutlined, SwipeUpOutlined } from "@mui/icons-material";

const heroImages = [placeholderBg, placeholderFg];

export default function Background() {
  const isLoading = useGetImages(heroImages);
  const isPhone = useMediaQuery("(max-width:600px)");
  const lottieRef = useRef<HTMLDivElement>(null);
  const { mode } = useColorScheme();
  const isLight = mode === "light";

  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = Lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/img/text.json",
    });

    // The name draws on (trim paths) by frame 239, then the source file
    // fades both layers out to nothing for the rest of the timeline. Play
    // only the reveal and hold on the fully-drawn frame so "Jim" stays put.
    const NAME_REVEAL_END_FRAME = 240;
    const playReveal = () =>
      anim.playSegments([0, NAME_REVEAL_END_FRAME], true);
    anim.addEventListener("DOMLoaded", playReveal);

    return () => {
      anim.removeEventListener("DOMLoaded", playReveal);
      anim.destroy();
    };
  }, []);

  // Dim the scene slightly in dark mode, matching the rest of the site.
  const dim = isLight ? "brightness(1)" : "brightness(0.5)";

  return (
    <>
      {isLoading && (
        <StyledSkeleton
          variant="rounded"
          height={isPhone ? "42rem" : "100dvh"}
        />
      )}
      <StyledBox
        className="Header"
        sx={{
          display: isLoading ? "none" : "block",
          height: isPhone ? "42rem" : "100dvh",
        }}
      >
        {/* BACKGROUND – full-bleed, furthest back */}
        <motion.img
          animate={{ filter: dim }}
          transition={{ duration: 0.4 }}
          src={placeholderBg}
          style={{ ...coverStyle, zIndex: -3 }}
        />

        {/* Soft radial scrim behind the name so the darker-red lettering keeps
            its contrast over the brighter parts of the scene. */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: isPhone ? "60%" : "65%",
            transform: "translate(-50%, -50%)",
            width: isPhone ? "26rem" : "46rem",
            height: isPhone ? "20rem" : "26rem",
            background:
              "radial-gradient(ellipse at center, rgba(10,0,14,0.62) 0%, rgba(10,0,14,0.4) 40%, rgba(10,0,14,0) 72%)",
            zIndex: -2,
            pointerEvents: "none",
          }}
        />

        {/* Animated "Jim" name (Lottie). Kept above the foreground so it stays readable. */}
        <StyledHead className="mainhead" sx={{ top: isPhone ? "60%" : "65%" }}>
          <div
            style={{
              scale: isPhone ? 2.4 : 1.5,
              filter: "drop-shadow(0 2px 10px rgba(8,0,12,0.65))",
            }}
            ref={lottieRef}
          ></div>
        </StyledHead>

        {/* Scroll-down arrow */}
        <motion.div
          animate={{ y: [0, 20, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: "calc(50% - 2rem)",
            top: isPhone ? "88%" : "65%",
            color: "var(--mui-palette-primary-main)",
            zIndex: 1,
          }}
        >
          {isPhone ? (
            <SwipeUpOutlined
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 50,
                  behavior: "smooth",
                });
              }}
              sx={{
                width: "4rem",
                fontSize: "2rem",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <ArrowCircleDownOutlined
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 50,
                  behavior: "smooth",
                });
              }}
              sx={{
                width: "4rem",
                fontSize: "2rem",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </motion.div>
      </StyledBox>
    </>
  );
}

const coverStyle: React.CSSProperties = {
  position: "absolute",
  left: -20,
  right: 0,
  top: 0,
  bottom: 0,
  width: "110%",
  height: "100%",
  objectFit: "cover",
};

const StyledHead = styled("div")({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 0,
});

const StyledBox = styled(Box)({
  position: "relative",
  width: "100%",
  maxWidth: "120rem",
  overflow: "hidden",
  maxHeight: "68rem",
  margin: "0 auto",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 0%, black 90%, transparent)",
  WebkitMaskComposite: "intersect",
  maskImage:
    "linear-gradient(to bottom, transparent, black 0%, black 90%, transparent)",
  maskComposite: "intersect",
});

const StyledSkeleton = styled(Skeleton)({
  borderRadius: "1rem",
  margin: "0 auto",
  width: "100%",
  maxWidth: "120rem",
  overflow: "hidden",
  maxHeight: "68rem",
});
