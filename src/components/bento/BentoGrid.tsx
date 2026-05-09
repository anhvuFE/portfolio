import React, { useState, lazy, Suspense, useCallback, useEffect, useMemo } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import BentoCard from "./BentoCard";
import SectionDrawer from "./SectionDrawer";
import {
  AboutPreview,
  SkillsPreview,
  ExperiencePreview,
  CertsPreview,
  ServicesPreview,
  ContactPreview
} from "./previews";
import GitHubPreview from "./GitHubPreview";

const About = lazy(() => import("../about/About"));
const GitHubActivity = lazy(() => import("../github/GitHubActivity"));
const Skills = lazy(() => import("../skills/Skills"));
const Services = lazy(() => import("../services/Services"));
const Qualification = lazy(() => import("../qualification/Qualification"));
const Certificate = lazy(() => import("../certificate/Certificate"));
const Contact = lazy(() => import("../contact/Contact"));

type SectionKey =
  | "about"
  | "github"
  | "skills"
  | "experience"
  | "certificates"
  | "services"
  | "contact";

const sectionContent: Record<SectionKey, React.LazyExoticComponent<React.FC>> = {
  about: About,
  github: GitHubActivity,
  skills: Skills,
  experience: Qualification,
  certificates: Certificate,
  services: Services,
  contact: Contact
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
  "contact"
]);

const BentoGrid: React.FC = () => {
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);

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
      contact: () => open("contact")
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
            preview={<AboutPreview />}
            onClick={handlers.about}
            gridColumn={{ xs: "1 / -1", md: "1 / span 4" }}
          />
          <BentoCard
            title="Tech Stack"
            subtitle="Skills"
            accent="#a855f7"
            preview={<SkillsPreview />}
            onClick={handlers.skills}
            gridColumn={{ md: "5 / span 2" }}
            gridRow={{ md: "span 2" }}
          />
          <BentoCard
            title="GitHub Activity"
            subtitle="Open Source"
            preview={<GitHubPreview />}
            onClick={handlers.github}
            gridColumn={{ md: "1 / span 4" }}
          />
          <BentoCard
            title="Experience"
            subtitle="Career"
            accent="#22c55e"
            preview={<ExperiencePreview />}
            onClick={handlers.experience}
            gridColumn={{ md: "1 / span 2" }}
          />
          <BentoCard
            title="Certificates"
            subtitle="Achievements"
            accent="#FFD700"
            preview={<CertsPreview />}
            onClick={handlers.certificates}
            gridColumn={{ md: "3 / span 2" }}
          />
          <BentoCard
            title="Services"
            subtitle="What I do"
            accent="#f5576c"
            preview={<ServicesPreview />}
            onClick={handlers.services}
            gridColumn={{ md: "5 / span 2" }}
          />
          <BentoCard
            title="Let's Connect"
            subtitle="Get in touch"
            preview={<ContactPreview />}
            onClick={handlers.contact}
            gridColumn={{ xs: "1 / -1", md: "1 / -1" }}
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
