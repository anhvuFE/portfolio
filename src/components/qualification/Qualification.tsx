import React, { useState, useCallback } from "react";
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

interface EducationItem {
  title: string;
  subtitle: string;
  date: string;
  type: string;
  description: string;
}

interface ExperienceItem {
  title: string;
  subtitle: string;
  date: string;
  type: string;
  skills?: string[];
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const education: EducationItem[] = [
  {
    title: "Bachelor's degree, Information Technology",
    subtitle: "FPT University",
    date: "Oct 2020 - Apr 2025",
    type: "degree",
    description: "React.js, C# and 5+ other skills"
  },
  {
    title: "High School Diploma",
    subtitle: "Ha Bac High School",
    date: "2017 - 2020",
    type: "school",
    description: "High School Diploma with honors"
  }
];

const experience: ExperienceItem[] = [
  {
    title: "Software Engineer",
    subtitle: "neliSoftwares",
    date: "Jul 2025 - Present",
    type: "work",
    skills: ["React.js", "HTML5", "Node.js", "TypeScript"]
  },
  {
    title: "Frontend Developer",
    subtitle: "Technixo",
    date: "Dec 2023 - Apr 2024 · 5 months",
    type: "work",
    skills: ["React.js", "TypeScript"]
  },
  {
    title: "Frontend Developer",
    subtitle: "True Connect",
    date: "Jul 2022 - Feb 2023 · 8 months",
    type: "work",
    skills: ["TypeScript", "JavaScript"]
  },
  {
    title: "Frontend Developer",
    subtitle: "EZTek Solutions",
    date: "Jan 2022 - Jul 2022 · 7 months",
    type: "work",
    skills: ["React.js", "JavaScript", "HTML", "CSS"]
  }
];

const getTypeIcon = (type: string): React.ReactElement => {
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

const getTypeColor = (type: string): string => {
  switch (type) {
    case "work":
      return "#0eaddf";
    case "project":
      return "#0c8db3";
    case "degree":
    case "school":
      return "#00bcd4";
    default:
      return "#0eaddf";
  }
};

const Qualification: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }, []);

  const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
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

  return (
    <Box
      component="section"
      id="portfolio"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#0a0a0a",
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
              color: "#0eaddf"
            }}
          >
            Qualification
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#8b949e",
              fontWeight: 400
            }}
          >
            My personal journey
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            background: "rgba(22, 22, 22, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 3,
            overflow: "hidden"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              "& .MuiTabs-indicator": {
                height: 3,
                background: "#0eaddf"
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
                color: value === 0 ? "#0eaddf" : "#8b949e",
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
                color: value === 1 ? "#0eaddf" : "#8b949e",
                minHeight: 64,
                px: 4
              }}
            />
          </Tabs>

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <TabPanel value={value} index={0}>
              <Timeline position="alternate">
                {education.map((item: EducationItem, index: number) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Chip
                        icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                        label={item.date}
                        sx={{
                          background: "rgba(14, 173, 223, 0.1)",
                          color: "#0eaddf",
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
                        <TimelineConnector sx={{ background: "#0eaddf" }} />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Card
                        sx={{
                          background: "#161616",
                          border: "2px solid rgba(14, 173, 223, 0.2)",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 20px rgba(14, 173, 223, 0.3)",
                            borderColor: "#0eaddf"
                          }
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: "#e6edf3",
                              fontSize: "1.2rem"
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#0eaddf",
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
                              color: "#8b949e",
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
                                background: "rgba(14, 173, 223, 0.1)",
                                color: "#0eaddf"
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
                {experience.map((item: ExperienceItem, index: number) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        background: "#161616",
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
                              background: `${getTypeColor(item.type)}20`,
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
                                color: "#e6edf3",
                                fontSize: "1.1rem"
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#8b949e",
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
                            {item.skills.map((skill: string, idx: number) => (
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
                          background: `${getTypeColor(item.type)}15`,
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
