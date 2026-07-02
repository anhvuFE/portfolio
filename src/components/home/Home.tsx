import React, { useMemo } from "react";
import { Box, Container, Paper, IconButton, Typography, Button } from "@mui/material";
import { GitHub, Facebook, LinkedIn, Email, ArrowForward, KeyboardArrowDown } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import StarsBackground from "./StarsBackground";
import TypedRole from "./TypedRole";
import { CountingNumber } from "../text/CountingNumber";
import { GradientText } from "../text/GradientText";
import NewAvatarWebp from "../../assets/avatar.webp";
import NewAvatarJpg from "../../assets/avatar.jpg";
import "./home.css";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

interface StatItem {
  number: number;
  suffix?: string;
  label: string;
}

interface SocialLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}

const stats: StatItem[] = [
  { number: 3, suffix: "+", label: "Years Experience" },
  { number: 4, label: "Companies" },
  { number: 10, suffix: "+", label: "Technologies" },
];

const socialLinks: SocialLink[] = [
  { icon: <GitHub />, href: "https://github.com/anhvuFE", label: "GitHub" },
  { icon: <Facebook />, href: "https://www.facebook.com/xuananhvu2312/", label: "Facebook" },
  { icon: <LinkedIn />, href: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/", label: "LinkedIn" }
];

const Home: React.FC = () => {
  const statsRendered = useMemo(
    () =>
      stats.map((stat, index) => (
        <Box key={index} sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#0eaddf"
            }}
          >
            <CountingNumber number={stat.number} inView />
            {stat.suffix}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6e7681" }}>
            {stat.label}
          </Typography>
        </Box>
      )),
    []
  );

  const socialLinksRendered = useMemo(
    () =>
      socialLinks.map((social, index) => (
        <IconButton
          key={index}
          href={social.href}
          target="_blank"
          sx={{
            width: 50,
            height: 50,
            border: "2px solid rgba(14, 173, 223, 0.2)",
            background: "rgba(22, 22, 22, 0.9)",
            color: "#0eaddf",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              background: "#0eaddf",
              color: "#0a0a0a",
              boxShadow: "0 10px 20px rgba(14, 173, 223, 0.3)"
            }
          }}
        >
          {social.icon}
        </IconButton>
      )),
    []
  );

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 10, md: 0 },
        pb: { xs: 4, md: 0 },
        overflow: "hidden",
        background: "#0a0a0a"
      }}
    >
      <StarsBackground />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
            minHeight: "calc(100vh - 100px)"
          }}
        >
          {/* Left side - Avatar and Social */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              animation: `${float} 6s ease-in-out infinite`
            }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 1,
                borderRadius: "24px",
                background: "#161616",
                border: "2px solid rgba(14, 173, 223, 0.2)",
                position: "relative",
                overflow: "visible"
              }}
            >
              <Box
                component="picture"
                sx={{
                  display: "block",
                  width: { xs: 280, sm: 320, md: 360 },
                  height: { xs: 280, sm: 320, md: 360 }
                }}
              >
                <source type="image/webp" srcSet={NewAvatarWebp} />
                <Box
                  component="img"
                  src={NewAvatarJpg}
                  alt="Vũ Xuân Anh"
                  width={360}
                  height={360}
                  fetchPriority="high"
                  decoding="async"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    border: "4px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    display: "block"
                  }}
                />
              </Box>
            </Paper>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {socialLinksRendered}
            </Box>
          </Box>

          {/* Right side - Content */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#8b949e",
                mb: 2,
                fontWeight: 500
              }}
            >
              Hello, I'm
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                fontWeight: 800,
                mb: 2
              }}
            >
              <GradientText
                text="Vũ Xuân Anh"
                gradient="linear-gradient(90deg, #0eaddf 0%, #7cdcf3 25%, #a855f7 50%, #7cdcf3 75%, #0eaddf 100%)"
              />
            </Typography>

            <TypedRole />

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#8b949e",
                mb: 4,
                maxWidth: 600
              }}
            >
              I build fast, accessible web apps with React, TypeScript and Node.
              Currently shipping at neliSoftwares — open to freelance and full-time roles.
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
              {statsRendered}
            </Box>

            {/* CTA Buttons */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                href="#contact"
                endIcon={<Email />}
                sx={{
                  background: "#0eaddf",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#0a0a0a",
                  boxShadow: "0 10px 20px rgba(14, 173, 223, 0.2)",
                  "&:hover": {
                    background: "#0c8db3",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(14, 173, 223, 0.3)"
                  }
                }}
              >
                Get In Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#about"
                endIcon={<ArrowForward />}
                sx={{
                  borderColor: "#0eaddf",
                  color: "#0eaddf",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "#3dc4ee",
                    background: "rgba(14, 173, 223, 0.1)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Scroll Down Indicator - desktop only */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            // Hide on short viewports where the hero content reaches the
            // bottom and the hint would overlap the CTA buttons.
            "@media (max-height: 860px)": { display: "none" },
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            animation: `${bounce} 2s ease-in-out infinite`
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#0eaddf",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 1
            }}
          >
            Scroll Down
          </Typography>
          <KeyboardArrowDown sx={{ color: "#0eaddf", fontSize: 30 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
