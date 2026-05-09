import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  EmojiEvents as AwardIcon,
  BusinessCenter as BriefcaseIcon,
  Support as SupportIcon
} from "@mui/icons-material";

interface StatItem {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <AwardIcon sx={{ fontSize: 28 }} />,
    title: "Experience",
    subtitle: "3+ Years Working",
    color: "#0eaddf"
  },
  {
    icon: <BriefcaseIcon sx={{ fontSize: 28 }} />,
    title: "GitHub",
    subtitle: "28+ Projects",
    color: "#0c8db3"
  },
  {
    icon: <SupportIcon sx={{ fontSize: 28 }} />,
    title: "Support",
    subtitle: "Online 24/7",
    color: "#00bcd4"
  }
];

const Info: React.FC = React.memo(() => {
  return (
    <Grid container spacing={2} sx={{ mb: 4, alignItems: "stretch" }}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index} sx={{ display: "flex" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              width: "100%",
              background: "rgba(22, 22, 22, 0.9)",
              border: `1px solid ${stat.color}20`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 8px 16px ${stat.color}20`,
                borderColor: `${stat.color}40`,
                background: "rgba(255, 255, 255, 0.05)"
              }
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${stat.color}15`,
                color: stat.color
              }}
            >
              {stat.icon}
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e6edf3",
                  mb: 0.5
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "#8b949e"
                }}
              >
                {stat.subtitle}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
});

Info.displayName = "Info";

export default Info;
