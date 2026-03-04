import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Paper,
  Grid,
  Avatar
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from "@mui/lab";
import {
  School as SchoolIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Code as CodeIcon,
  Assignment as ProjectIcon
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Qualification = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const education = [
    {
      title: "Computer Science",
      subtitle: "FPT University",
      date: "2020 - 2025",
      type: "degree",
      description: "Bachelor's Degree in Software Engineering"
    },
    {
      title: "High School Education",
      subtitle: "Ha Bac High School",
      date: "2017 - 2020",
      type: "school",
      description: "High School Diploma with honors"
    }
  ];

  const experience = [
    {
      title: "LCMS (Laundry Chain Management System)",
      subtitle: "FPT University - Project Manager, Full-stack Developer",
      date: "2025 - Graduation Project",
      type: "project",
      skills: ["React", "Node.js", "MongoDB", "Project Management"]
    },
    {
      title: "Mark Management System",
      subtitle: "FPT University - Backend & Frontend Developer",
      date: "2024",
      type: "project",
      skills: ["React", "Express", "PostgreSQL"]
    },
    {
      title: "Frontend Developer (ReactJs)",
      subtitle: "Technixo Software Company Limited",
      date: "Dec 2023 - Apr 2024",
      type: "work",
      skills: ["React", "TypeScript", "Material-UI"]
    },
    {
      title: "Sell Phone Card",
      subtitle: "FPT University - Java Developer",
      date: "2023 - Mini Project",
      type: "project",
      skills: ["Java", "Spring Boot", "MySQL"]
    },
    {
      title: "Frontend Developer",
      subtitle: "TrueConnect Joint Stock Company",
      date: "July 2022 - Nov 2022",
      type: "work",
      skills: ["React", "JavaScript", "CSS"]
    },
    {
      title: "Frontend Developer",
      subtitle: "Eztek Digital Solutions Company",
      date: "Mar 2022 - July 2022",
      type: "work",
      skills: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      title: "Thriffly – Mobile App",
      subtitle: "FPT University - Android Developer",
      date: "Project",
      type: "project",
      skills: ["Android", "Java", "Firebase"]
    },
    {
      title: "E-commerce Website",
      subtitle: "FPT University - Full-stack Developer",
      date: "Project",
      type: "project",
      skills: ["MERN Stack", "Payment Integration"]
    },
    {
      title: "Alex – Princess Rescue Game",
      subtitle: "FPT University - Game Developer (Unity)",
      date: "Project",
      type: "project",
      skills: ["Unity", "C#", "Game Design"]
    }
  ];

  const TabPanel = ({ children, value, index }) => {
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        sx={{
          animation: value === index ? `${fadeIn} 0.5s ease-out` : "none"
        }}
      >
        {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
      </Box>
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "work":
        return <BusinessIcon />;
      case "project":
        return <ProjectIcon />;
      case "degree":
        return <SchoolIcon />;
      default:
        return <CodeIcon />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "work":
        return "#667eea";
      case "project":
        return "#764ba2";
      case "degree":
      case "school":
        return "#00bcd4";
      default:
        return "#667eea";
    }
  };

  return (
    <Box
      component="section"
      id="portfolio"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)",
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
            Qualification
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400
            }}
          >
            My personal journey
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: 3,
            overflow: "hidden"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              "& .MuiTabs-indicator": {
                height: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }
            }}
          >
            <Tab
              icon={<SchoolIcon />}
              label="Education"
              iconPosition="start"
              sx={{
                textTransform: "none",
                fontWeight: value === 0 ? 600 : 500,
                fontSize: "1rem",
                color: value === 0 ? "#667eea" : "text.secondary",
                minHeight: 64,
                px: 4
              }}
            />
            <Tab
              icon={<WorkIcon />}
              label="Experience"
              iconPosition="start"
              sx={{
                textTransform: "none",
                fontWeight: value === 1 ? 600 : 500,
                fontSize: "1rem",
                color: value === 1 ? "#667eea" : "text.secondary",
                minHeight: 64,
                px: 4
              }}
            />
          </Tabs>

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <TabPanel value={value} index={0}>
              <Timeline position="alternate">
                {education.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{
                        display: { xs: "none", sm: "block" },
                        color: "#1a1a1a",
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#1a1a1a", mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666666" }}>
                        {item.subtitle}
                      </Typography>
                      <Chip
                        icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                        label={item.date}
                        sx={{
                          mt: 1,
                          background: "rgba(102, 126, 234, 0.1)",
                          color: "#667eea",
                          fontWeight: 600
                        }}
                      />
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          background: getTypeColor(item.type),
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${getTypeColor(item.type)}40`
                        }}
                      >
                        {getTypeIcon(item.type)}
                      </TimelineDot>
                      {index < education.length - 1 && (
                        <TimelineConnector sx={{ background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)" }} />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Card
                        sx={{
                          background: "white",
                          border: "2px solid rgba(102, 126, 234, 0.2)",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
                            borderColor: "#667eea"
                          }
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: "#1a1a1a",
                              fontSize: "1.2rem"
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#667eea",
                              mb: 1,
                              fontWeight: 600,
                              fontSize: "1rem"
                            }}
                          >
                            {item.subtitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666666",
                              mb: 1,
                              fontSize: "0.95rem",
                              lineHeight: 1.6
                            }}
                          >
                            {item.description}
                          </Typography>
                          <Box sx={{ display: { xs: "block", sm: "none" }, mt: 2 }}>
                            <Chip
                              icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                              label={item.date}
                              size="small"
                              sx={{
                                background: "rgba(102, 126, 234, 0.1)",
                                color: "#667eea"
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                {experience.map((item, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        background: "white",
                        border: `2px solid ${getTypeColor(item.type)}30`,
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "visible",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: `0 12px 24px ${getTypeColor(item.type)}25`,
                          borderColor: getTypeColor(item.type)
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              background: `linear-gradient(135deg, ${getTypeColor(item.type)}20 0%, ${getTypeColor(item.type)}10 100%)`,
                              color: getTypeColor(item.type),
                              mr: 2,
                              border: `2px solid ${getTypeColor(item.type)}30`
                            }}
                          >
                            {getTypeIcon(item.type)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                mb: 0.5,
                                color: "#1a1a1a",
                                fontSize: "1.1rem"
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#666666",
                                mb: 1,
                                fontSize: "0.95rem",
                                lineHeight: 1.5
                              }}
                            >
                              {item.subtitle}
                            </Typography>
                            <Chip
                              icon={<CalendarIcon sx={{ fontSize: 14 }} />}
                              label={item.date}
                              size="small"
                              sx={{
                                background: `${getTypeColor(item.type)}15`,
                                color: getTypeColor(item.type),
                                fontWeight: 600,
                                border: `1px solid ${getTypeColor(item.type)}30`
                              }}
                            />
                          </Box>
                        </Box>

                        {item.skills && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
                            {item.skills.map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill}
                                size="small"
                                sx={{
                                  fontSize: "0.8rem",
                                  background: `${getTypeColor(item.type)}12`,
                                  color: getTypeColor(item.type),
                                  border: `1px solid ${getTypeColor(item.type)}40`,
                                  fontWeight: 600
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </CardContent>

                      <Box
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${getTypeColor(item.type)}15 0%, ${getTypeColor(item.type)}05 100%)`,
                          filter: "blur(20px)"
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Qualification;