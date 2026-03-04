import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Avatar
} from "@mui/material";
import {
  DownloadOutlined,
  MessageOutlined,
  TrophyOutlined,
  BookOutlined,
  LaptopOutlined
} from "@ant-design/icons";
import { keyframes } from "@emotion/react";
import AboutImg from "../../assets/new-avt.png";
import CV from "../../assets/CV-VuXuanAnh.pdf";
import Info from "./Info";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const About = () => {
  const techStack = [
    // Frontend
    { name: "React.js", category: "Frontend", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", category: "Frontend", color: "#000000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", category: "Frontend", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", category: "Frontend", color: "#F7DF1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Material UI", category: "Frontend", color: "#007FFF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },

    // Backend
    { name: "Node.js", category: "Backend", color: "#339933", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", category: "Backend", color: "#000000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Python", category: "Backend", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Supabase", category: "Backend", color: "#3ECF8E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },

    // Database
    { name: "MongoDB", category: "Database", color: "#47A248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", category: "Database", color: "#4169E1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MySQL", category: "Database", color: "#4479A1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Redis", category: "Database", color: "#DC382D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },

    // Tools & Others
    { name: "Git", category: "Tools", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", category: "Tools", color: "#2496ED", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", category: "Tools", color: "#FF9900", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Firebase", category: "Tools", color: "#FFCA28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
  ];

  const achievements = [
    {
      icon: <TrophyOutlined style={{ fontSize: 32 }} />,
      title: "Best Frontend Award",
      description: "University coding competition 2023",
      color: "#FFD700"
    },
    {
      icon: <BookOutlined style={{ fontSize: 32 }} />,
      title: "Computer Science Degree",
      description: "Bachelor's in Computer Science",
      color: "#667eea"
    },
    {
      icon: <LaptopOutlined style={{ fontSize: 32 }} />,
      title: "Professional Experience",
      description: "2+ years in web development",
      color: "#764ba2"
    }
  ];

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 252, 1) 100%)",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400
            }}
          >
            Get to know me better
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                animation: `${float} 4s ease-in-out infinite`
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  border: "2px solid rgba(102, 126, 234, 0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <img
                  src={AboutImg}
                  alt="Vũ Xuân Anh"
                  style={{
                    width: "100%",
                    maxWidth: 350,
                    height: "auto",
                    borderRadius: 16,
                    display: "block"
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    opacity: 0.1,
                    filter: "blur(40px)"
                  }}
                />
              </Paper>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ animation: `${slideIn} 0.8s ease-out` }}>
              <Info />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  mt: 4,
                  color: "text.primary"
                }}
              >
                My Journey
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  lineHeight: 1.8
                }}
              >
                Passionate full stack developer with expertise in building scalable web applications
                from backend to frontend. I specialize in React, Node.js, MongoDB, and cloud technologies,
                creating robust solutions that deliver exceptional user experiences.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  lineHeight: 1.8
                }}
              >
                With 2+ years of experience and 28+ GitHub repositories, I've developed complete
                full-stack applications including REST APIs, microservices, real-time features,
                and cloud deployments. Always focusing on clean architecture and best practices.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: "text.primary"
                  }}
                >
                  Core Technologies
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      icon={
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: 8
                          }}
                        />
                      }
                      label={tech.name}
                      sx={{
                        backgroundColor: `${tech.color}15`,
                        color: tech.color,
                        border: `1px solid ${tech.color}30`,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "4px 8px",
                        height: "auto",
                        "& .MuiChip-label": {
                          padding: "8px 12px"
                        },
                        "& .MuiChip-icon": {
                          marginRight: "-4px"
                        },
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: tech.color,
                          color: "white",
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 8px ${tech.color}40`,
                          "& img": {
                            filter: "brightness(0) invert(1)"
                          }
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: "text.primary"
                  }}
                >
                  Highlights
                </Typography>
                <Grid container spacing={2}>
                  {achievements.map((achievement, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Card
                        sx={{
                          height: "100%",
                          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(102, 126, 234, 0.15)",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 12px 24px rgba(102, 126, 234, 0.2)",
                            borderColor: "rgba(102, 126, 234, 0.4)"
                          }
                        }}
                      >
                        <CardContent sx={{ textAlign: "center", p: 3 }}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              mx: "auto",
                              mb: 2,
                              background: `linear-gradient(135deg, ${achievement.color}15 0%, ${achievement.color}08 100%)`,
                              color: achievement.color,
                              border: `2px solid ${achievement.color}20`
                            }}
                          >
                            {achievement.icon}
                          </Avatar>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.1rem",
                              mb: 1,
                              color: "#1a1a1a",
                              letterSpacing: "-0.01em"
                            }}
                          >
                            {achievement.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(0, 0, 0, 0.6)",
                              fontSize: "0.9rem",
                              lineHeight: 1.5
                            }}
                          >
                            {achievement.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  href={CV}
                  download
                  startIcon={<DownloadOutlined />}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
                    }
                  }}
                >
                  Download CV
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="#contact"
                  startIcon={<MessageOutlined />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "#667eea",
                    color: "#667eea",
                    borderWidth: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#764ba2",
                      color: "#764ba2",
                      background: "rgba(102, 126, 234, 0.05)",
                      transform: "translateY(-2px)",
                      borderWidth: 2
                    }
                  }}
                >
                  Let's Talk
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;