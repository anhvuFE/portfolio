import React, { useState, lazy, Suspense, useCallback, useEffect, useMemo } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import BentoCard from "./BentoCard";
import SectionDrawer from "./SectionDrawer";
import {
  AboutPreview,
  SkillsPreview,
  ExperiencePreview,
  CertsPreview,
  ServicesPreview,
  ContactPreview,
  ProjectsPreview
} from "./previews";
import GitHubPreview from "./GitHubPreview";

const About = lazy(() => import("../about/About"));
const GitHubActivity = lazy(() => import("../github/GitHubActivity"));
const Skills = lazy(() => import("../skills/Skills"));
const Services = lazy(() => import("../services/Services"));
const Qualification = lazy(() => import("../qualification/Qualification"));
const Certificate = lazy(() => import("../certificate/Certificate"));
const Contact = lazy(() => import("../contact/Contact"));
const Projects = lazy(() => import("../projects/Projects"));

type SectionKey =
  | "about"
  | "github"
  | "skills"
  | "experience"
  | "certificates"
  | "services"
  | "contact"
  | "projects";

const sectionContent: Record<SectionKey, React.LazyExoticComponent<React.FC>> = {
  about: About,
  github: GitHubActivity,
  skills: Skills,
  experience: Qualification,
  certificates: Certificate,
  services: Services,
  contact: Contact,
  projects: Projects
};

const DrawerLoader: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <CircularProgress sx={{ color: "#0eaddf" }} />
  </Box>
);

const validKeys = new Set<SectionKey>([
  "about",
  "github",
  "skills",
  "experience",
  "certificates",
  "services",
  "contact",
  "projects"
]);

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

// Prop-less preview elements and grid placements are hoisted to stable
// module-level references so they don't change identity on every render and
// defeat BentoCard's React.memo when openSection changes.
const aboutPreview = <AboutPreview />;
const skillsPreview = <SkillsPreview />;
const githubPreview = <GitHubPreview />;
const experiencePreview = <ExperiencePreview />;
const certsPreview = <CertsPreview />;
const servicesPreview = <ServicesPreview />;
const projectsPreview = <ProjectsPreview />;
const contactPreview = <ContactPreview />;

const gridAbout = { xs: "1 / -1", md: "1 / span 4" };
const gridSkillsCol = { md: "5 / span 2" };
const gridSkillsRow = { md: "span 2" };
const gridGithub = { md: "1 / span 4" };
const gridExperience = { md: "1 / span 2" };
const gridCerts = { md: "3 / span 2" };
const gridServices = { md: "5 / span 2" };
const gridFull = { xs: "1 / -1", md: "1 / -1" };

const BentoGrid: React.FC = () => {
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const open = useCallback((key: SectionKey) => {
    setOpenSection(key);
    if (window.location.hash !== `#${key}`) {
      window.history.pushState(null, "", `#${key}`);
    }
  }, []);

  const close = useCallback(() => {
    setOpenSection(null);
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }, []);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "") as SectionKey;
      if (validKeys.has(hash)) {
        setOpenSection(hash);
      } else {
        setOpenSection(null);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const ActiveSection = openSection ? sectionContent[openSection] : null;

  const handlers = useMemo(
    () => ({
      about: () => open("about"),
      github: () => open("github"),
      skills: () => open("skills"),
      experience: () => open("experience"),
      certificates: () => open("certificates"),
      services: () => open("services"),
      contact: () => open("contact"),
      projects: () => open("projects")
    }),
    [open]
  );

  return (
    <Box
      component="section"
      id="explore"
      sx={{
        py: { xs: 6, md: 10 },
        background: "#0a0a0a",
        position: "relative"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              color: "#0eaddf"
            }}
          >
            Explore
          </Typography>
          <Typography variant="h6" sx={{ color: "#8b949e", fontWeight: 400 }}>
            Click any card to dive deeper
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={gridVariants}
          initial={prefersReducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(6, 1fr)" },
            gridAutoRows: { xs: "180px", md: "200px" },
            gap: { xs: 2, md: 2.5 }
          }}
        >
          <BentoCard
            title="About Me"
            subtitle="Profile"
            preview={aboutPreview}
            onClick={handlers.about}
            gridColumn={gridAbout}
          />
          <BentoCard
            title="Tech Stack"
            subtitle="Skills"
            accent="#a855f7"
            preview={skillsPreview}
            onClick={handlers.skills}
            gridColumn={gridSkillsCol}
            gridRow={gridSkillsRow}
          />
          <BentoCard
            title="GitHub Activity"
            subtitle="Open Source"
            preview={githubPreview}
            onClick={handlers.github}
            gridColumn={gridGithub}
          />
          <BentoCard
            title="Experience"
            subtitle="Career"
            accent="#22c55e"
            preview={experiencePreview}
            onClick={handlers.experience}
            gridColumn={gridExperience}
          />
          <BentoCard
            title="Certificates"
            subtitle="Achievements"
            accent="#FFD700"
            preview={certsPreview}
            onClick={handlers.certificates}
            gridColumn={gridCerts}
          />
          <BentoCard
            title="Services"
            subtitle="What I do"
            accent="#f5576c"
            preview={servicesPreview}
            onClick={handlers.services}
            gridColumn={gridServices}
          />
          <BentoCard
            title="Projects"
            subtitle="Case Studies"
            accent="#a855f7"
            preview={projectsPreview}
            onClick={handlers.projects}
            gridColumn={gridFull}
          />
          <BentoCard
            title="Let's Connect"
            subtitle="Get in touch"
            preview={contactPreview}
            onClick={handlers.contact}
            gridColumn={gridFull}
          />
        </Box>
      </Container>

      <SectionDrawer open={openSection !== null} onClose={close}>
        <Suspense fallback={<DrawerLoader />}>
          {ActiveSection ? <ActiveSection /> : null}
        </Suspense>
      </SectionDrawer>
    </Box>
  );
};

export default BentoGrid;
