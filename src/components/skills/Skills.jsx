import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Button
} from "@mui/material";
import {
  Code as CodeIcon,
  Storage as DatabaseIcon,
  Build as ToolsIcon,
  Web as WebIcon,
  AllInclusive as AllIcon,
  MenuBook as BookIcon
} from "@mui/icons-material";
import { skillsData, getSkillsByCategory, getCategories } from "./skillsData";
import { keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const categories = ["all", ...getCategories()];
  const ITEMS_PER_PAGE = 9;

  const getFilteredSkills = () => {
    const category = categories[activeCategory];
    if (category === "all") {
      return skillsData;
    }
    return getSkillsByCategory(category);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      all: <AllIcon />,
      frontend: <WebIcon />,
      backend: <CodeIcon />,
      database: <DatabaseIcon />,
      tools: <ToolsIcon />
    };
    return icons[category] || <CodeIcon />;
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      all: "All Skills",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools & Others"
    };
    return categoryNames[category] || category;
  };


  const getSkillColor = (category) => {
    const colors = {
      frontend: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      backend: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      database: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tools: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    };
    return colors[category] || colors.frontend;
  };

  return (
    <Box
      component="section"
      id="skills"
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
              Technical Skills
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto"
              }}
            >
              My expertise in modern web technologies and tools
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              mb: 6,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 3,
              overflow: "hidden"
            }}
          >
            <Tabs
              value={activeCategory}
              onChange={(e, newValue) => setActiveCategory(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }
              }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  label={getCategoryDisplayName(category)}
                  icon={getCategoryIcon(category)}
                  iconPosition="start"
                  sx={{
                    textTransform: "none",
                    fontWeight: activeCategory === index ? 600 : 500,
                    fontSize: "1rem",
                    minHeight: 64,
                    color: activeCategory === index ? "#667eea" : "text.secondary",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(102, 126, 234, 0.05)"
                    }
                  }}
                />
              ))}
            </Tabs>
          </Paper>

        <Grid container spacing={3}>
          {getFilteredSkills()
            .slice(0, showAll || activeCategory !== 0 ? undefined : ITEMS_PER_PAGE)
            .map((skill, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                <Card
                  sx={{
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: 3,
                    overflow: "visible",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `${slideIn} 0.5s ease-out`,
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
                      borderColor: "rgba(102, 126, 234, 0.3)",
                      "& .skill-icon": {
                        transform: "rotate(360deg) scale(1.1)"
                      },
                      "& .skill-progress": {
                        transform: "scaleX(1.02)"
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2
                      }}
                    >
                      <Avatar
                        className="skill-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          background: "white",
                          border: "2px solid rgba(102, 126, 234, 0.2)",
                          transition: "transform 0.5s ease",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <Box
                          component="img"
                          src={skill.icon}
                          alt={skill.name}
                          sx={{
                            width: "70%",
                            height: "70%",
                            objectFit: "contain"
                          }}
                        />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: "text.primary",
                            mb: 0.5
                          }}
                        >
                          {skill.name}
                        </Typography>
                        <Chip
                          label={skill.level}
                          size="small"
                          sx={{
                            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                            border: "1px solid rgba(102, 126, 234, 0.2)",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            fontSize: "0.75rem"
                          }}
                        />
                      </Box>
                    </Box>


                    {skill.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.875rem",
                          lineHeight: 1.6
                        }}
                      >
                        {skill.description}
                      </Typography>
                    )}

                    {skill.projects && skill.projects.length > 0 && (
                      <Box sx={{ mt: 2, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {skill.projects.slice(0, 3).map((project, idx) => (
                          <Chip
                            key={idx}
                            label={project}
                            size="small"
                            sx={{
                              fontSize: "0.7rem",
                              height: 20,
                              background: "rgba(102, 126, 234, 0.08)",
                              color: "#667eea",
                              fontWeight: 500,
                              "& .MuiChip-label": {
                                px: 1
                              }
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>

                  <Box
                    sx={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      width: 40,
                      height: 40,
                      background: getSkillColor(skill.category),
                      borderRadius: "50%",
                      opacity: 0.1,
                      filter: "blur(20px)",
                      transform: "scale(2)"
                    }}
                  />
                </Card>
            </Grid>
          ))}
        </Grid>

        {/* View More/Less Button */}
        {activeCategory === 0 && getFilteredSkills().length > ITEMS_PER_PAGE && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShowAll(!showAll)}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  background: "rgba(102, 126, 234, 0.1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)"
                }
              }}
            >
              {showAll ? "View Less" : `View More (${getFilteredSkills().length - ITEMS_PER_PAGE} more)`}
            </Button>
          </Box>
        )}

          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center"
            }}
          >
            {/* Left side - Decorative element */}
            <Box
              sx={{
                flex: { xs: "0 0 auto", md: "0 0 40%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }}
            >
              <Box
                sx={{
                  width: { xs: 200, md: 280 },
                  height: { xs: 200, md: 280 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    opacity: 0.3,
                    animation: `${keyframes`
                      0% { transform: scale(1); opacity: 0.3; }
                      50% { transform: scale(1.1); opacity: 0.1; }
                      100% { transform: scale(1); opacity: 0.3; }
                    `} 3s ease-in-out infinite`
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "120%",
                    height: "120%",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    opacity: 0.2,
                    animation: `${keyframes`
                      0% { transform: scale(1); opacity: 0.2; }
                      50% { transform: scale(1.15); opacity: 0.05; }
                      100% { transform: scale(1); opacity: 0.2; }
                    `} 4s ease-in-out infinite`
                  }
                }}
              >
                <BookIcon
                  sx={{
                    fontSize: { xs: 80, md: 100 },
                    color: "white",
                    position: "relative",
                    zIndex: 1
                  }}
                />
              </Box>
            </Box>

            {/* Right side - Content */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Continuous Learning Journey
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: "1.1rem"
                }}
              >
                Staying at the forefront of web development through continuous learning and adaptation.
                Every day brings new opportunities to enhance my skills and explore emerging technologies.
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background: "rgba(102, 126, 234, 0.05)",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(102, 126, 234, 0.2)",
                        borderColor: "#667eea"
                      }
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1
                      }}
                    >
                      10+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      New Technologies Yearly
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background: "rgba(118, 75, 162, 0.05)",
                      border: "1px solid rgba(118, 75, 162, 0.2)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(118, 75, 162, 0.2)",
                        borderColor: "#764ba2"
                      }
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1
                      }}
                    >
                      50+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Courses Completed
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background: "rgba(102, 126, 234, 0.05)",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(102, 126, 234, 0.2)",
                        borderColor: "#667eea"
                      }
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1
                      }}
                    >
                      24/7
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Learning Mindset
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
      </Container>
    </Box>
  );
};

export default Skills;