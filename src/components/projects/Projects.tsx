import React from "react";
import StaggerReveal from "../effects/StaggerReveal";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Divider
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Lightbulb as LightbulbIcon,
  Build as BuildIcon,
  TrendingUp as TrendingUpIcon,
  OpenInNew as OpenInNewIcon
} from "@mui/icons-material";
import { projects, ProjectCaseStudy } from "./projectsData";

const SectionTitle: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({
  icon,
  label,
  color
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
    <Box sx={{ color, display: "flex" }}>{icon}</Box>
    <Typography
      sx={{
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color
      }}
    >
      {label}
    </Typography>
  </Box>
);

const ProjectCard: React.FC<{ project: ProjectCaseStudy }> = ({ project }) => (
  <Card
    sx={{
      background: "rgba(22, 22, 22, 0.95)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: 4,
      overflow: "hidden",
      position: "relative",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: `${project.accent}40`,
        boxShadow: `0 16px 40px ${project.accent}15`
      }
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${project.accent}, transparent)`
      }}
    />

    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: project.accent
            }}
          >
            {project.role}
          </Typography>
          {project.company && (
            <>
              <Typography sx={{ fontSize: "0.7rem", color: "#6e7681" }}>·</Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#6e7681", fontWeight: 500 }}>
                {project.company}
              </Typography>
            </>
          )}
          <Box sx={{ flex: 1 }} />
          <Chip
            label={project.period}
            size="small"
            sx={{
              height: 22,
              fontSize: "0.7rem",
              background: "rgba(255,255,255,0.04)",
              color: "#8b949e"
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#e6edf3",
            mb: 1,
            fontSize: { xs: "1.25rem", md: "1.5rem" }
          }}
        >
          {project.title}
        </Typography>
        <Typography sx={{ color: "#8b949e", lineHeight: 1.6 }}>{project.oneLiner}</Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <SectionTitle
          icon={<LightbulbIcon sx={{ fontSize: 14 }} />}
          label="Problem"
          color="#f59e0b"
        />
        <Typography sx={{ color: "#cbd1d8", lineHeight: 1.7, fontSize: "0.95rem" }}>
          {project.problem}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <SectionTitle
          icon={<BuildIcon sx={{ fontSize: 14 }} />}
          label="Approach"
          color={project.accent}
        />
        <Stack spacing={1}>
          {project.approach.map((step, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
              <Box
                sx={{
                  flexShrink: 0,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: `${project.accent}15`,
                  color: project.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  mt: "2px"
                }}
              >
                {i + 1}
              </Box>
              <Typography sx={{ color: "#cbd1d8", lineHeight: 1.6, fontSize: "0.9rem", flex: 1 }}>
                {step}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <SectionTitle
          icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
          label="Result"
          color="#22c55e"
        />
        <Stack spacing={0.75}>
          {project.result.map((r, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <CheckIcon sx={{ fontSize: 14, color: "#22c55e", mt: "4px", flexShrink: 0 }} />
              <Typography sx={{ color: "#cbd1d8", lineHeight: 1.6, fontSize: "0.9rem" }}>
                {r}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
        {project.stack.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{
              height: 22,
              fontSize: "0.7rem",
              background: "rgba(14, 173, 223, 0.08)",
              color: "#0eaddf",
              border: "1px solid rgba(14, 173, 223, 0.15)"
            }}
          />
        ))}
        {project.links?.map((link) => (
          <Button
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: 12 }} />}
            sx={{
              ml: "auto",
              color: project.accent,
              fontSize: "0.75rem",
              textTransform: "none",
              "&:hover": { background: `${project.accent}10` }
            }}
          >
            {link.label}
          </Button>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const Projects: React.FC = () => {
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 6, md: 10 },
        background: "#0a0a0a",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="md">
        <StaggerReveal>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              color: "#0eaddf"
            }}
          >
            Project case studies
          </Typography>
          <Typography variant="h6" sx={{ color: "#8b949e", fontWeight: 400 }}>
            Problem · Approach · Result
          </Typography>
        </Box>

        <Stack spacing={3}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </Stack>
        </StaggerReveal>
      </Container>
    </Box>
  );
};

export default Projects;
