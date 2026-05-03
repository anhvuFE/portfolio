import React from "react";
import { Box, Typography } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";

export interface BentoCardProps {
  title: string;
  subtitle?: string;
  accent?: string;
  preview: React.ReactNode;
  onClick: () => void;
  gridColumn?: string | { xs?: string; md?: string };
  gridRow?: string | { xs?: string; md?: string };
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  accent = "#0eaddf",
  preview,
  onClick,
  gridColumn,
  gridRow
}) => {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        gridColumn,
        gridRow,
        position: "relative",
        cursor: "pointer",
        background: "rgba(22, 22, 22, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 4,
        p: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover, &:focus-visible": {
          transform: "translateY(-4px)",
          borderColor: `${accent}55`,
          boxShadow: `0 16px 40px ${accent}20`,
          "& .bento-arrow": { opacity: 1, transform: "translate(2px, -2px)" },
          "& .bento-glow": { opacity: 0.5 }
        },
        "&:focus-visible": { outline: `2px solid ${accent}` }
      }}
    >
      <Box
        className="bento-glow"
        aria-hidden
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: accent,
          opacity: 0.15,
          filter: "blur(60px)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none"
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, position: "relative", zIndex: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: accent,
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: 1.5,
              textTransform: "uppercase"
            }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#e6edf3",
              fontWeight: 700,
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.3,
              mt: 0.25
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          className="bento-arrow"
          sx={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `${accent}15`,
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
            transition: "all 0.3s ease"
          }}
        >
          <ArrowOutward sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
        {preview}
      </Box>
    </Box>
  );
};

export default BentoCard;
