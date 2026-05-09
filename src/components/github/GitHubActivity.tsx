import React from "react";
import { Box, Container, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import { GitHubCalendar } from "react-github-calendar";
import RecentActivity from "./RecentActivity";

const GitHubActivity: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      id="github"
      sx={{
        py: { xs: 6, md: 8 },
        background: "#0a0a0a"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              color: "#0eaddf"
            }}
          >
            GitHub Activity
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#8b949e",
              fontWeight: 400
            }}
          >
            My open source contributions
          </Typography>
        </Box>

        <Box sx={{ position: "relative", maxWidth: 900, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              background: "#0d1117",
              border: "1px solid rgba(14, 173, 223, 0.15)",
              overflowX: "auto",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": {
                height: 6
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: 3,
                background: "rgba(255,255,255,0.2)"
              }
            }}
          >
            <GitHubCalendar
              username="anhvuFE"
              colorScheme="dark"
              fontSize={isMobile ? 11 : 14}
              blockSize={isMobile ? 10 : 14}
              blockMargin={isMobile ? 3 : 4}
              style={{ color: "#e6edf3" }}
              labels={{
                totalCount: "{{count}} contributions in the last year"
              }}
            />
          </Paper>
          {/* Right-edge fade hint for horizontal scroll on mobile */}
          <Box
            aria-hidden
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              top: 1,
              right: 1,
              bottom: 8,
              width: 24,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              pointerEvents: "none",
              background: "linear-gradient(to right, rgba(13,17,23,0) 0%, rgba(13,17,23,0.95) 100%)"
            }}
          />
        </Box>

        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
          <RecentActivity />
        </Box>
      </Container>
    </Box>
  );
};

export default GitHubActivity;
