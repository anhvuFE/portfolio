import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
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
import AboutImg from "../../assets/avatar.jpg";
import CV from "../../assets/CV-VuXuanAnh.pdf";
import Info from "./Info";

interface TechItem {
  name: string;
  category: string;
  color: string;
  icon: string;
}

interface Achievement {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "React.js", category: "Frontend", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", category: "Frontend", color: "#e6edf3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", category: "Frontend", color: "#F7DF1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Material UI", category: "Frontend", color: "#007FFF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
  { name: "Node.js", category: "Backend", color: "#339933", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", category: "Backend", color: "#e6edf3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Python", category: "Backend", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Supabase", category: "Backend", color: "#3ECF8E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "MongoDB", category: "Database", color: "#47A248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", category: "Database", color: "#4169E1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", category: "Database", color: "#4479A1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", category: "Database", color: "#DC382D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Git", category: "Tools", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", category: "Tools", color: "#2496ED", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", category: "Tools", color: "#FF9900", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Firebase", category: "Tools", color: "#FFCA28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
];

const achievements: Achievement[] = [
  {
    icon: <BookOutlined style={{ fontSize: 32 }} />,
    title: "FPT University",
    description: "Bachelor's in Information Technology",
    color: "#0eaddf"
  },
  {
    icon: <LaptopOutlined style={{ fontSize: 32 }} />,
    title: "3+ Years Experience",
    description: "4 companies, full-time roles",
    color: "#0c8db3"
  },
  {
    icon: <TrophyOutlined style={{ fontSize: 32 }} />,
    title: "Certified",
    description: "AWS, Backend Dev & more",
    color: "#FFD700"
  }
];

const categories = ["Frontend", "Backend", "Database", "Tools"] as const;

const About: React.FC = () => {
  const techByCategory = useMemo(
    () =>
      categories.reduce(
        (acc, category) => {
          acc[category] = techStack.filter((tech) => tech.category === category);
          return acc;
        },
        {} as Record<string, TechItem[]>
      ),
    []
  );

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#0a0a0a",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
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
            About Me
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#8b949e",
              fontWeight: 400
            }}
          >
            Get to know me better
          </Typography>
        </Box>

        {/* Row 1: Info Stats */}
        <Info />

        {/* Row 2: My Journey Text */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#e6edf3"
              }}
            >
              My Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#8b949e",
                mb: 2,
                lineHeight: 1.8
              }}
            >
              I am a Developer with over two years of experience building modern, responsive, and user-focused web
              applications. I work mainly with ReactJS and Angular, and have experience integrating systems using
              Supabase and C#.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#8b949e",
                lineHeight: 1.8
              }}
            >
              I am comfortable working with RESTful APIs, state management, and building clean, scalable interfaces.
              I also have hands-on experience with database tools such as DBeaver. I enjoy working in Agile
              environments and collaborating closely with designers and other developers to deliver high-quality products.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                justifyContent: "center"
              }}
            >
              {achievements.map((achievement, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${achievement.color}15`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      boxShadow: `0 4px 12px ${achievement.color}15`,
                      borderColor: `${achievement.color}30`
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      background: `${achievement.color}15`,
                      color: achievement.color,
                      border: `1.5px solid ${achievement.color}25`
                    }}
                  >
                    {React.cloneElement(achievement.icon as React.ReactElement<any>, { style: { fontSize: 22 } })}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#e6edf3",
                        lineHeight: 1.3
                      }}
                    >
                      {achievement.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6e7681",
                        fontSize: "0.8rem",
                        lineHeight: 1.3
                      }}
                    >
                      {achievement.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Row 3: Core Technologies */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: "#e6edf3"
            }}
          >
            Core Technologies
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid size={{ xs: 6, sm: 3 }} key={category}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6e7681",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mb: 1.5,
                    display: "block"
                  }}
                >
                  {category}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {techByCategory[category].map((tech, index) => (
                      <Chip
                        key={index}
                        icon={
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            style={{
                              width: 16,
                              height: 16,
                              marginLeft: 6
                            }}
                          />
                        }
                        label={tech.name}
                        size="small"
                        sx={{
                          backgroundColor: `${tech.color}10`,
                          color: tech.color,
                          border: `1px solid ${tech.color}20`,
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 28,
                          "& .MuiChip-label": {
                            px: 1
                          },
                          "& .MuiChip-icon": {
                            marginRight: "-2px"
                          },
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: tech.color,
                            color: "#0a0a0a",
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
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Row 4: Photo + Buttons */}
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 3,
                background: "#161616",
                border: "1px solid rgba(14, 173, 223, 0.1)",
                overflow: "hidden"
              }}
            >
              <img
                src={AboutImg}
                alt="Vũ Xuân Anh"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 12,
                  display: "block"
                }}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#e6edf3",
                  fontSize: { xs: "1.5rem", md: "2rem" }
                }}
              >
                Let's build something great together
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#8b949e",
                  mb: 4,
                  lineHeight: 1.8,
                  maxWidth: 500
                }}
              >
                I'm always open to new opportunities, collaborations, and interesting projects.
                Feel free to download my CV or get in touch directly.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  href={CV}
                  download
                  startIcon={<DownloadOutlined />}
                  sx={{
                    background: "#0eaddf",
                    color: "#0a0a0a",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(14, 173, 223, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#0c8db3",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(14, 173, 223, 0.3)"
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
                    borderColor: "#0eaddf",
                    color: "#0eaddf",
                    borderWidth: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#3dc4ee",
                      color: "#3dc4ee",
                      background: "rgba(14, 173, 223, 0.05)",
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
