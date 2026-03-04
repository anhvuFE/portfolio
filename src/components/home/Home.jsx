import React from "react";
import { Box, Container, Paper, IconButton, Typography, Button } from "@mui/material";
import { GitHub, Facebook, LinkedIn, Email, ArrowForward, KeyboardArrowDown } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import ConstellationBackground from "./ConstellationBackground";
import NewAvatar from "../../assets/new-avt.png";
import "./home.css";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Home = () => {
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const roles = ["Full Stack Developer", "React & Node.js Expert", "Software Engineer"];

  React.useEffect(() => {
    const currentRole = roles[currentIndex];
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(currentRole.slice(0, index));
      index++;
      if (index > currentRole.length) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "28+", label: "GitHub Projects" },
    { value: "10+", label: "Technologies" },
  ];

  const socialLinks = [
    { icon: <GitHub />, href: "https://github.com/anhvuFE", label: "GitHub" },
    { icon: <Facebook />, href: "https://www.facebook.com/xuananhvu2312/", label: "Facebook" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/", label: "LinkedIn" }
  ];

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}
    >
      <ConstellationBackground />
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "visible"
              }}
            >
              <Box
                component="img"
                src={NewAvatar}
                alt="Vũ Xuân Anh"
                sx={{
                  width: { xs: 280, sm: 320, md: 360 },
                  height: { xs: 280, sm: 320, md: 360 },
                  borderRadius: "20px",
                  border: "4px solid white",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  display: "block"
                }}
              />
            </Paper>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  target="_blank"
                  sx={{
                    width: 50,
                    height: 50,
                    border: "2px solid rgba(102, 126, 234, 0.3)",
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#667eea",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      boxShadow: "0 10px 20px rgba(102, 126, 234, 0.4)"
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Right side - Content */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
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
                mb: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Vũ Xuân Anh
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 600,
                mb: 3,
                color: "#667eea",
                minHeight: "40px"
              }}
            >
              {displayText}
              <span style={{ animation: "blink 1s infinite" }}>|</span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "rgba(0, 0, 0, 0.7)",
                mb: 4,
                maxWidth: 600
              }}
            >
              I build end-to-end web applications with modern technologies.
              Passionate about clean architecture, scalable solutions, and delivering
              full-stack applications from database to deployment.
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
              {stats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA Buttons */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                href="#contact"
                endIcon={<Email />}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(102, 126, 234, 0.4)"
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
                  borderColor: "#667eea",
                  color: "#667eea",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    background: "rgba(102, 126, 234, 0.1)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Scroll Down Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            animation: `${bounce} 2s ease-in-out infinite`
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#667eea",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 1
            }}
          >
            Scroll Down
          </Typography>
          <KeyboardArrowDown sx={{ color: "#667eea", fontSize: 30 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
