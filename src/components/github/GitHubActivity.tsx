import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { GitHubCalendar } from "react-github-calendar";

const GitHubActivity: React.FC = () => {
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

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            background: "#0d1117",
            border: "1px solid rgba(14, 173, 223, 0.15)",
            overflow: "auto",
            maxWidth: 900,
            mx: "auto",
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
            fontSize={14}
            blockSize={14}
            blockMargin={4}
            style={{ color: "#e6edf3", width: "100%" }}
            labels={{
              totalCount: "{{count}} contributions in the last year"
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default GitHubActivity;
