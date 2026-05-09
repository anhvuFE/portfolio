import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import {
  Commit as CommitIcon,
  CallSplit as ForkIcon,
  Star as StarIcon,
  MergeType as PRIcon,
  BugReport as IssueIcon,
  Folder as RepoIcon,
  GitHub as GitHubIcon,
  OpenInNew as OpenInNewIcon
} from "@mui/icons-material";
import data from "./recent-activity.json";

const USERNAME = "anhvuFE";

interface ActivityEvent {
  type: "commit" | "pr" | "issue" | "star" | "fork" | "create";
  repo: string;
  message: string;
  url?: string;
  date: string;
}

interface ActivityData {
  fetchedAt: string;
  events: ActivityEvent[];
}

const activity = data as ActivityData;

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const iconMap: Record<ActivityEvent["type"], React.ReactElement> = {
  commit: <CommitIcon sx={{ fontSize: 14 }} />,
  pr: <PRIcon sx={{ fontSize: 14 }} />,
  issue: <IssueIcon sx={{ fontSize: 14 }} />,
  star: <StarIcon sx={{ fontSize: 14 }} />,
  fork: <ForkIcon sx={{ fontSize: 14 }} />,
  create: <RepoIcon sx={{ fontSize: 14 }} />
};

const colorMap: Record<ActivityEvent["type"], string> = {
  commit: "#0eaddf",
  pr: "#a855f7",
  issue: "#f59e0b",
  star: "#FFD700",
  fork: "#22c55e",
  create: "#3dc4ee"
};

const RecentActivity: React.FC = () => {
  const events = activity.events;

  return (
    <Box
      sx={{
        background: "rgba(22, 22, 22, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
        backdropFilter: "blur(10px)"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <GitHubIcon sx={{ fontSize: 16, color: "#0eaddf" }} />
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#0eaddf"
          }}
        >
          Recent activity
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography
          sx={{
            fontSize: "0.65rem",
            color: "#6e7681",
            fontFamily: '"Fira Code", monospace'
          }}
        >
          updated {relativeTime(activity.fetchedAt)}
        </Typography>
      </Box>

      {events.length === 0 ? (
        <Box
          component="a"
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "#0eaddf",
            textDecoration: "none",
            fontSize: "0.85rem",
            "&:hover": { textDecoration: "underline" }
          }}
        >
          View activity on github.com/{USERNAME}
          <OpenInNewIcon sx={{ fontSize: 12 }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {events.map((e, i) => (
            <Box
              key={i}
              component={e.url ? "a" : "div"}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 0.5,
                textDecoration: "none",
                color: "#e6edf3",
                transition: "color 0.2s ease",
                "&:hover": { color: "#0eaddf" }
              }}
            >
              <Box sx={{ color: colorMap[e.type], display: "flex", flexShrink: 0 }}>
                {iconMap[e.type]}
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: "0.78rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {e.message}
              </Typography>
              <Chip
                label={relativeTime(e.date)}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  background: "rgba(255,255,255,0.04)",
                  color: "#6e7681",
                  flexShrink: 0,
                  "& .MuiChip-label": { px: 0.75 }
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecentActivity;
