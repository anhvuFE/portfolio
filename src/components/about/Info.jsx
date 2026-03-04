import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  EmojiEvents as AwardIcon,
  BusinessCenter as BriefcaseIcon,
  Support as SupportIcon
} from "@mui/icons-material";

const Info = () => {
  const stats = [
    {
      icon: <AwardIcon sx={{ fontSize: 28 }} />,
      title: "Experience",
      subtitle: "2+ Years Working",
      color: "#667eea"
    },
    {
      icon: <BriefcaseIcon sx={{ fontSize: 28 }} />,
      title: "GitHub",
      subtitle: "28+ Projects",
      color: "#764ba2"
    },
    {
      icon: <SupportIcon sx={{ fontSize: 28 }} />,
      title: "Support",
      subtitle: "Online 24/7",
      color: "#00bcd4"
    }
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              background: "rgba(255, 255, 255, 0.9)",
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
                background: `linear-gradient(135deg, ${stat.color}05 0%, ${stat.color}10 100%)`
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
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
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
                  color: "#1a1a1a",
                  mb: 0.5
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgba(0, 0, 0, 0.6)"
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
};

export default Info;