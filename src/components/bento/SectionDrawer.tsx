import * as React from "react";
import { Modal, IconButton, Box, useTheme, useMediaQuery } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { motion, useReducedMotion } from "motion/react";

interface SectionDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Slide-over panel for the bento/section content. Built on MUI Modal (keeps
 * backdrop, focus trap, scroll lock and Esc-to-close) with a motion panel so
 * the entrance is a spring slide + subtle scale/fade instead of MUI's default
 * linear slide. Unmounts on close (Modal default) so the inner StaggerReveal
 * replays each time it opens. Honors prefers-reduced-motion.
 */
const SectionDrawer: React.FC<SectionDrawerProps> = ({ open, onClose, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const prefersReducedMotion = useReducedMotion();

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "92vh",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }
    : {
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: "min(1100px, 92vw)",
        maxWidth: "100%",
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
      };

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : isMobile
    ? { y: "100%", opacity: 0.5 }
    : { x: "100%", opacity: 0.5, scale: 0.98 };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-label="Section detail"
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      <Box
        component={motion.div}
        initial={initial}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 260, damping: 30 }
        }
        style={panelStyle}
        sx={{
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(14, 173, 223, 0.06) 0%, transparent 50%)",
          borderLeft: { md: "1px solid rgba(14, 173, 223, 0.15)" },
          borderTop: { xs: "1px solid rgba(14, 173, 223, 0.15)", md: "none" },
          outline: "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "flex-end",
            p: 1.5,
            background: "linear-gradient(to bottom, #0a0a0a 60%, transparent)",
          }}
        >
          <IconButton
            onClick={onClose}
            aria-label="Close section"
            sx={{
              color: "#8b949e",
              background: "rgba(22,22,22,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              "&:hover": { background: "#0eaddf", color: "#0a0a0a" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            "& section": { minHeight: "auto !important" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default SectionDrawer;
