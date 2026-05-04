import React from "react";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import { GitHub, Email, Code, Cloud, Api } from "@mui/icons-material";
import { GitHubCalendar } from "react-github-calendar";
import AvatarImg from "../../assets/avatar.jpg";
import awsCert from "../../assets/CERTIFICATE_LANDING_PAGE~HN06MIP031ZR.jpeg";

const techIcons = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" }
];

export const AboutPreview: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: "100%", mt: "auto" }}>
    <Avatar src={AvatarImg} alt="Vũ Xuân Anh" sx={{ width: 56, height: 56, border: "2px solid rgba(14, 173, 223, 0.3)", flexShrink: 0 }} />
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ color: "#e6edf3", fontWeight: 600, fontSize: "0.95rem" }}>
        Full Stack Developer
      </Typography>
      <Typography sx={{ color: "#8b949e", fontSize: "0.8rem", lineHeight: 1.5 }}>
        3+ years building modern web apps with React &amp; TypeScript
      </Typography>
    </Box>
  </Box>
);

export const SkillsPreview: React.FC = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.25, alignContent: "center", height: "100%" }}>
    {techIcons.map((t) => (
      <Box
        key={t.name}
        sx={{
          aspectRatio: "1",
          borderRadius: 2,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1.25
        }}
      >
        <Box component="img" src={t.src} alt={t.name} sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </Box>
    ))}
  </Box>
);

export const GitHubPreview: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%",
      gap: 1,
      overflow: "hidden",
      "& .react-activity-calendar": { width: "100% !important" },
      "& .react-activity-calendar__scroll-container": { overflow: "hidden" },
      "& article > div": { gap: "3px !important" }
    }}
  >
    <Box sx={{ pointerEvents: "none" }}>
      <GitHubCalendar
        username="anhvuFE"
        colorScheme="dark"
        blockSize={10}
        blockMargin={3}
        blockRadius={2}
        fontSize={0}
        showColorLegend={false}
        showMonthLabels={false}
        showTotalCount={false}
        showWeekdayLabels={false}
        labels={{ totalCount: "" }}
        style={{ color: "transparent" }}
      />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#8b949e" }}>
      <GitHub sx={{ fontSize: 14 }} />
      <Typography sx={{ fontSize: "0.75rem" }}>@anhvuFE — live contributions</Typography>
    </Box>
  </Box>
);

export const ExperiencePreview: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: "auto" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)"
        }}
      />
      <Typography sx={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
        Currently
      </Typography>
    </Box>
    <Typography sx={{ color: "#e6edf3", fontWeight: 700, fontSize: "1rem" }}>Software Engineer</Typography>
    <Typography sx={{ color: "#0eaddf", fontSize: "0.85rem", fontWeight: 500 }}>neliSoftwares</Typography>
    <Typography sx={{ color: "#6e7681", fontSize: "0.75rem" }}>Jul 2025 — Present</Typography>
  </Box>
);

export const CertsPreview: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: "auto" }}>
    <Box
      component="img"
      src={awsCert}
      alt="Featured certificate"
      sx={{
        width: 64,
        height: 48,
        objectFit: "cover",
        borderRadius: 1,
        border: "1px solid rgba(255,255,255,0.1)",
        flexShrink: 0
      }}
    />
    <Box>
      <Typography sx={{ color: "#e6edf3", fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
        10
      </Typography>
      <Typography sx={{ color: "#8b949e", fontSize: "0.75rem" }}>Certifications earned</Typography>
    </Box>
  </Box>
);

export const ServicesPreview: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, mt: "auto" }}>
    {[
      { icon: <Code sx={{ fontSize: 16 }} />, label: "Frontend Development" },
      { icon: <Api sx={{ fontSize: 16 }} />, label: "Backend Development" },
      { icon: <Cloud sx={{ fontSize: 16 }} />, label: "Full-Stack Solutions" }
    ].map((s) => (
      <Box key={s.label} sx={{ display: "flex", alignItems: "center", gap: 1, color: "#8b949e" }}>
        <Box sx={{ color: "#0eaddf", display: "flex" }}>{s.icon}</Box>
        <Typography sx={{ fontSize: "0.8rem" }}>{s.label}</Typography>
      </Box>
    ))}
  </Box>
);

export const ContactPreview: React.FC = () => (
  <Box sx={{ mt: "auto" }}>
    <Chip
      icon={<Email sx={{ fontSize: 14 }} />}
      label="vuxuananh22@gmail.com"
      size="small"
      sx={{
        background: "rgba(14, 173, 223, 0.1)",
        color: "#0eaddf",
        border: "1px solid rgba(14, 173, 223, 0.2)",
        fontWeight: 500,
        fontSize: "0.75rem",
        mb: 1
      }}
    />
    <Typography sx={{ color: "#8b949e", fontSize: "0.85rem", lineHeight: 1.5 }}>
      Open to freelance & full-time opportunities. Response within 24h.
    </Typography>
  </Box>
);
