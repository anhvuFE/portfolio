import React from "react";
import { Drawer, IconButton, Box, useTheme, useMediaQuery } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface SectionDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SectionDrawer: React.FC<SectionDrawerProps> = ({ open, onClose, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      keepMounted={false}
      PaperProps={{
        sx: {
          width: { xs: "100%", md: "min(1100px, 92vw)" },
          height: { xs: "92vh", md: "100%" },
          maxWidth: "100%",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(14, 173, 223, 0.06) 0%, transparent 50%)",
          borderTopLeftRadius: { xs: 24, md: 24 },
          borderTopRightRadius: { xs: 24, md: 0 },
          borderBottomLeftRadius: { xs: 0, md: 24 },
          borderLeft: { md: "1px solid rgba(14, 173, 223, 0.15)" },
          borderTop: { xs: "1px solid rgba(14, 173, 223, 0.15)", md: "none" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }
      }}
      ModalProps={{ keepMounted: false }}
    >
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "flex-end", p: 1.5, background: "linear-gradient(to bottom, #0a0a0a 60%, transparent)" }}>
        <IconButton
          onClick={onClose}
          aria-label="Close section"
          sx={{
            color: "#8b949e",
            background: "rgba(22,22,22,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            "&:hover": { background: "#0eaddf", color: "#0a0a0a" }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", "& section": { minHeight: "auto !important" } }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default SectionDrawer;
