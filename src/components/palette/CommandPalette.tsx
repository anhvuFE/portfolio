import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Typography,
  InputAdornment,
  Chip
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Work as WorkIcon,
  EmojiEvents as TrophyIcon,
  Build as BuildIcon,
  FolderSpecial as ProjectsIcon,
  MailOutline as MailIcon,
  Description as ResumeIcon,
  LinkedIn as LinkedInIcon,
  Home as HomeIcon,
  KeyboardReturn as EnterIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon
} from "@mui/icons-material";

interface PaletteItem {
  id: string;
  label: string;
  group: "Sections" | "Contact" | "Links";
  hint?: string;
  icon: React.ReactElement;
  hash?: string;
  url?: string;
  scrollTop?: boolean;
}

const ITEMS: PaletteItem[] = [
  { id: "home", label: "Home", group: "Sections", icon: <HomeIcon sx={{ fontSize: 18 }} />, scrollTop: true },
  { id: "about", label: "About", group: "Sections", icon: <PersonIcon sx={{ fontSize: 18 }} />, hash: "about" },
  { id: "skills", label: "Skills", group: "Sections", icon: <CodeIcon sx={{ fontSize: 18 }} />, hash: "skills" },
  { id: "github", label: "GitHub Activity", group: "Sections", icon: <GitHubIcon sx={{ fontSize: 18 }} />, hash: "github" },
  { id: "experience", label: "Experience", group: "Sections", icon: <WorkIcon sx={{ fontSize: 18 }} />, hash: "experience" },
  { id: "certificates", label: "Certificates", group: "Sections", icon: <TrophyIcon sx={{ fontSize: 18 }} />, hash: "certificates" },
  { id: "services", label: "Services", group: "Sections", icon: <BuildIcon sx={{ fontSize: 18 }} />, hash: "services" },
  { id: "projects", label: "Projects", group: "Sections", icon: <ProjectsIcon sx={{ fontSize: 18 }} />, hash: "projects" },
  {
    id: "contact",
    label: "Contact form",
    group: "Sections",
    icon: <MailIcon sx={{ fontSize: 18 }} />,
    hash: "contact"
  },
  {
    id: "email",
    label: "Email vuxuananh22@gmail.com",
    group: "Contact",
    hint: "mailto",
    icon: <MailIcon sx={{ fontSize: 18 }} />,
    url: "mailto:vuxuananh22@gmail.com"
  },
  {
    id: "github-link",
    label: "GitHub @anhvuFE",
    group: "Links",
    hint: "external",
    icon: <GitHubIcon sx={{ fontSize: 18 }} />,
    url: "https://github.com/anhvuFE"
  },
  {
    id: "linkedin-link",
    label: "LinkedIn",
    group: "Links",
    hint: "external",
    icon: <LinkedInIcon sx={{ fontSize: 18 }} />,
    url: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/"
  },
  {
    id: "cv",
    label: "Download CV",
    group: "Links",
    hint: "PDF",
    icon: <ResumeIcon sx={{ fontSize: 18 }} />,
    url: process.env.PUBLIC_URL + "/portfolio/static/media/CV-VuXuanAnh.pdf"
  }
];

function score(query: string, label: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const l = label.toLowerCase();
  if (l === q) return 100;
  if (l.startsWith(q)) return 80;
  if (l.includes(q)) return 60;
  // fuzzy: each query char appears in order
  let li = 0;
  for (let qi = 0; qi < q.length; qi++) {
    while (li < l.length && l[li] !== q[qi]) li++;
    if (li === l.length) return 0;
    li++;
  }
  return 30;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return ITEMS.map((item) => ({ item, s: score(query, item.label) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.item);
  }, [query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, PaletteItem[]>();
    for (const item of filtered) {
      const existing = groups.get(item.group);
      if (existing) existing.push(item);
      else groups.set(item.group, [item]);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const execute = useCallback(
    (item: PaletteItem) => {
      onClose();
      if (item.scrollTop) {
        if (window.location.hash) {
          window.history.pushState(null, "", window.location.pathname + window.location.search);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (item.hash) {
        window.location.hash = item.hash;
        return;
      }
      if (item.url) {
        if (item.url.startsWith("http")) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = item.url;
        }
      }
    },
    [onClose]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) execute(item);
      }
    },
    [filtered, activeIndex, execute]
  );

  let runningIndex = -1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "rgba(13, 17, 23, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(14, 173, 223, 0.2)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
          mt: { xs: 4, sm: 8 },
          alignSelf: "flex-start"
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <TextField
            inputRef={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search sections, contacts, links…"
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#6e7681" }} />
                </InputAdornment>
              ),
              sx: { fontSize: "1rem", color: "#e6edf3" }
            }}
            inputProps={{ "aria-label": "Command palette search" }}
          />
        </Box>

        <Box sx={{ maxHeight: { xs: 380, md: 440 }, overflowY: "auto", p: 1 }}>
          {filtered.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography sx={{ color: "#6e7681", fontSize: "0.875rem" }}>
                No results for "{query}"
              </Typography>
            </Box>
          ) : (
            grouped.map(([group, items]) => (
              <Box key={group} sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#6e7681",
                    px: 1.5,
                    py: 0.75
                  }}
                >
                  {group}
                </Typography>
                {items.map((item) => {
                  runningIndex++;
                  const isActive = runningIndex === activeIndex;
                  return (
                    <Box
                      key={item.id}
                      onClick={() => execute(item)}
                      onMouseEnter={() => setActiveIndex(runningIndex)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 1.5,
                        py: 1.25,
                        borderRadius: 1.5,
                        cursor: "pointer",
                        background: isActive ? "rgba(14, 173, 223, 0.12)" : "transparent",
                        border: "1px solid",
                        borderColor: isActive ? "rgba(14, 173, 223, 0.25)" : "transparent",
                        transition: "all 0.12s ease",
                        color: isActive ? "#0eaddf" : "#e6edf3"
                      }}
                    >
                      <Box sx={{ display: "flex", color: isActive ? "#0eaddf" : "#8b949e" }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ flex: 1, fontSize: "0.9rem" }}>{item.label}</Typography>
                      {item.hint && (
                        <Chip
                          label={item.hint}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.65rem",
                            background: "rgba(255,255,255,0.04)",
                            color: "#6e7681",
                            "& .MuiChip-label": { px: 0.75 }
                          }}
                        />
                      )}
                      {isActive && (
                        <EnterIcon sx={{ fontSize: 14, color: "#0eaddf", opacity: 0.8 }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1.25,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "#6e7681",
            fontSize: "0.7rem"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <UpIcon sx={{ fontSize: 14 }} />
            <DownIcon sx={{ fontSize: 14 }} />
            <span>navigate</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EnterIcon sx={{ fontSize: 14 }} />
            <span>open</span>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box component="span" sx={{ fontFamily: "monospace" }}>
            esc to close
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
