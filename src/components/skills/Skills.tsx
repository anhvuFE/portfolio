import React, { useState, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
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
  AllInclusive as AllIcon
} from "@mui/icons-material";
import { skillsData, getSkillsByCategory, getCategories, Skill } from "./skillsData";
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

interface CategoryIconMap {
  [key: string]: React.ReactElement;
}

interface CategoryNameMap {
  [key: string]: string;
}

interface CategoryColorMap {
  [key: string]: string;
}

const categoryIconMap: CategoryIconMap = {
  all: <AllIcon />,
  frontend: <WebIcon />,
  backend: <CodeIcon />,
  database: <DatabaseIcon />,
  tools: <ToolsIcon />
};

const categoryNameMap: CategoryNameMap = {
  all: "All Skills",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools & Others"
};

const categoryColorMap: CategoryColorMap = {
  frontend: "#0eaddf",
  backend: "#f5576c",
  database: "#4facfe",
  tools: "#43e97b"
};

const getCategoryIcon = (category: string): React.ReactElement => {
  return categoryIconMap[category] || <CodeIcon />;
};

const getCategoryDisplayName = (category: string): string => {
  return categoryNameMap[category] || category;
};

const getSkillColor = (category: string): string => {
  return categoryColorMap[category] || categoryColorMap.frontend;
};

const ITEMS_PER_PAGE = 9;

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const categories: string[] = ["all", ...getCategories()];

  const filteredSkills = useMemo((): Skill[] => {
    const category = categories[activeCategory];
    if (category === "all") {
      return skillsData;
    }
    return getSkillsByCategory(category);
  }, [activeCategory, categories]);

  const handleChange = useCallback((_e: React.SyntheticEvent, newValue: number) => {
    setActiveCategory(newValue);
  }, []);

  const handleToggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <Box
      component="section"
      id="skills"
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
              Technical Skills
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#8b949e",
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
              background: "rgba(22, 22, 22, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 3,
              overflow: "hidden"
            }}
          >
            <Tabs
              value={activeCategory}
              onChange={handleChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  background: "#0eaddf"
                }
              }}
            >
              {categories.map((category: string, index: number) => (
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
                    color: activeCategory === index ? "#0eaddf" : "#8b949e",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(14, 173, 223, 0.05)"
                    }
                  }}
                />
              ))}
            </Tabs>
          </Paper>

        <Grid container spacing={3}>
          {filteredSkills
            .slice(0, showAll || activeCategory !== 0 ? undefined : ITEMS_PER_PAGE)
            .map((skill: Skill) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                <Card
                  sx={{
                    height: "100%",
                    background: "rgba(22, 22, 22, 0.9)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 3,
                    overflow: "visible",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `${slideIn} 0.5s ease-out`,
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(14, 173, 223, 0.15)",
                      borderColor: "rgba(14, 173, 223, 0.3)",
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
                          background: "#1a1a1a",
                          border: "2px solid rgba(14, 173, 223, 0.2)",
                          transition: "transform 0.5s ease",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
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
                            color: "#e6edf3",
                            mb: 0.5
                          }}
                        >
                          {skill.name}
                        </Typography>
                        <Chip
                          label={skill.level}
                          size="small"
                          sx={{
                            background: "rgba(14, 173, 223, 0.1)",
                            border: "1px solid rgba(14, 173, 223, 0.2)",
                            color: "#0eaddf",
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
                          color: "#8b949e",
                          fontSize: "0.875rem",
                          lineHeight: 1.6
                        }}
                      >
                        {skill.description}
                      </Typography>
                    )}

                    {skill.projects && skill.projects.length > 0 && (
                      <Box sx={{ mt: 2, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {skill.projects.slice(0, 3).map((project: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={project}
                            size="small"
                            sx={{
                              fontSize: "0.7rem",
                              height: 20,
                              background: "rgba(14, 173, 223, 0.08)",
                              color: "#0eaddf",
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
        {activeCategory === 0 && filteredSkills.length > ITEMS_PER_PAGE && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleToggleShowAll}
              sx={{
                borderColor: "#0eaddf",
                color: "#0eaddf",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  background: "rgba(14, 173, 223, 0.1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(14, 173, 223, 0.2)"
                }
              }}
            >
              {showAll ? "View Less" : `View More (${filteredSkills.length - ITEMS_PER_PAGE} more)`}
            </Button>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Skills;
