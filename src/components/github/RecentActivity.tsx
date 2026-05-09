import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import {
  Commit as CommitIcon,
  CallSplit as ForkIcon,
  Star as StarIcon,
  MergeType as PRIcon,
  BugReport as IssueIcon,
  Folder as RepoIcon,
  GitHub as GitHubIcon
} from "@mui/icons-material";

const USERNAME = "anhvuFE";
const CACHE_KEY = "gh-activity-v1";
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_EVENTS = 5;

interface ActivityEvent {
  type: "commit" | "pr" | "issue" | "star" | "fork" | "create";
  repo: string;
  message: string;
  url: string;
  date: string;
}

interface ApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    action?: string;
    pull_request?: { title: string; html_url: string; merged?: boolean };
    issue?: { title: string; html_url: string };
    ref_type?: string;
    ref?: string;
  };
}

function shorten(text: string, max = 60): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

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

function mapEvent(e: ApiEvent): ActivityEvent | null {
  const repoUrl = `https://github.com/${e.repo.name}`;
  switch (e.type) {
    case "PushEvent": {
      const first = e.payload.commits?.[0];
      if (!first) return null;
      return {
        type: "commit",
        repo: e.repo.name,
        message: shorten(first.message.split("\n")[0]),
        url: `${repoUrl}/commit/${first.sha}`,
        date: e.created_at
      };
    }
    case "PullRequestEvent":
      if (!e.payload.pull_request) return null;
      return {
        type: "pr",
        repo: e.repo.name,
        message: `${e.payload.action} PR: ${shorten(e.payload.pull_request.title)}`,
        url: e.payload.pull_request.html_url,
        date: e.created_at
      };
    case "IssuesEvent":
      if (!e.payload.issue) return null;
      return {
        type: "issue",
        repo: e.repo.name,
        message: `${e.payload.action} issue: ${shorten(e.payload.issue.title)}`,
        url: e.payload.issue.html_url,
        date: e.created_at
      };
    case "WatchEvent":
      return {
        type: "star",
        repo: e.repo.name,
        message: `starred ${e.repo.name}`,
        url: repoUrl,
        date: e.created_at
      };
    case "ForkEvent":
      return {
        type: "fork",
        repo: e.repo.name,
        message: `forked ${e.repo.name}`,
        url: repoUrl,
        date: e.created_at
      };
    case "CreateEvent":
      if (e.payload.ref_type === "repository" || e.payload.ref_type === "branch") {
        return {
          type: "create",
          repo: e.repo.name,
          message: `created ${e.payload.ref_type}${e.payload.ref ? ` ${e.payload.ref}` : ""}`,
          url: repoUrl,
          date: e.created_at
        };
      }
      return null;
    default:
      return null;
  }
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
  const [events, setEvents] = useState<ActivityEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const fetched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.disconnect();
            load();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    if (fetched.current) return;
    fetched.current = true;

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { ts: number; data: ActivityEvent[] };
        if (Date.now() - parsed.ts < CACHE_TTL_MS) {
          setEvents(parsed.data);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    try {
      const res = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`);
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const json = (await res.json()) as ApiEvent[];
      const mapped = json.map(mapEvent).filter((e): e is ActivityEvent => e !== null).slice(0, MAX_EVENTS);
      setEvents(mapped);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: mapped }));
      } catch {
        /* quota exceeded */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activity");
    }
  };

  return (
    <Box
      ref={ref}
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
          Live activity
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
            animation: "pulse-dot 2s ease-in-out infinite",
            "@keyframes pulse-dot": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.4 }
            }
          }}
        />
      </Box>

      {events === null && !error && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 2 }}>
          <CircularProgress size={14} sx={{ color: "#6e7681" }} />
          <Typography sx={{ fontSize: "0.8rem", color: "#6e7681" }}>
            Fetching from github.com…
          </Typography>
        </Box>
      )}

      {error && (
        <Typography sx={{ fontSize: "0.8rem", color: "#6e7681" }}>
          Couldn't load — see github.com/{USERNAME}
        </Typography>
      )}

      {events && events.length === 0 && (
        <Typography sx={{ fontSize: "0.8rem", color: "#6e7681" }}>
          No public activity in the past few days.
        </Typography>
      )}

      {events && events.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {events.map((e, i) => (
            <Box
              key={i}
              component="a"
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
