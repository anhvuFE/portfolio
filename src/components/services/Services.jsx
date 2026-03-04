import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
  Avatar
} from "@mui/material";
import {
  Code as CodeIcon,
  Storage as ServerIcon,
  Devices as DevicesIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowIcon,
  Web as WebIcon,
  Api as ApiIcon,
  Cloud as CloudIcon
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 1,
      icon: <WebIcon sx={{ fontSize: 40 }} />,
      color: "#667eea",
      title: "Frontend Development",
      description: "Modern web applications with React & JavaScript",
      features: [
        "Responsive UI/UX development with HTML5, CSS3, JavaScript ES6+",
        "Modern React applications with hooks and state management",
        "Interactive user interfaces with smooth animations",
        "Performance optimization and SEO implementation",
        "Cross-browser compatibility and mobile-first design"
      ]
    },
    {
      id: 2,
      icon: <ApiIcon sx={{ fontSize: 40 }} />,
      color: "#764ba2",
      title: "Backend Development",
      description: "Robust server-side solutions with Node.js & Python",
      features: [
        "RESTful API development with Node.js and Express",
        "Database design and optimization with MongoDB & PostgreSQL",
        "Microservices architecture and cloud deployment",
        "Authentication and authorization systems",
        "Performance monitoring and error handling"
      ]
    },
    {
      id: 3,
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      color: "#00bcd4",
      title: "Full-Stack Solutions",
      description: "End-to-end web application development",
      features: [
        "Complete MERN stack development (MongoDB, Express, React, Node.js)",
        "E-commerce platforms with payment integration",
        "Content Management Systems (CMS) and admin panels",
        "Real-time applications with WebSocket connectivity",
        "DevOps and CI/CD pipeline implementation"
      ]
    }
  ];

  const openModal = (serviceId) => {
    setActiveModal(serviceId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            Services
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
            What I can do for you
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid key={service.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "visible",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${service.color}20`,
                    borderColor: `${service.color}30`,
                    "& .service-icon": {
                      transform: "scale(1.1) rotate(5deg)"
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                    <Avatar
                      className="service-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}08 100%)`,
                        color: service.color,
                        border: `2px solid ${service.color}20`,
                        transition: "transform 0.3s ease",
                        mb: 2
                      }}
                    >
                      {service.icon}
                    </Avatar>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "text.primary"
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    {service.description}
                  </Typography>

                  <List sx={{ mb: 3 }}>
                    {service.features.slice(0, 3).map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon sx={{ color: service.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            color: "text.secondary"
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => openModal(service.id)}
                      endIcon={<ArrowIcon />}
                      sx={{
                        borderColor: service.color,
                        color: service.color,
                        borderWidth: 2,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        "&:hover": {
                          borderWidth: 2,
                          background: `${service.color}08`,
                          borderColor: service.color,
                          transform: "translateY(-2px)"
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>

                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}05 100%)`,
                    filter: "blur(30px)",
                    zIndex: -1
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modern Modal */}
        {services.map((service) => (
          <Dialog
            key={service.id}
            open={activeModal === service.id}
            onClose={closeModal}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)"
              }
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                pb: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)"
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}08 100%)`,
                  color: service.color
                }}
              >
                {service.icon}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {service.description}
                </Typography>
              </Box>
              <IconButton onClick={closeModal} sx={{ color: "text.secondary" }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: service.color
                }}
              >
                What's included:
              </Typography>
              <List>
                {service.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckIcon sx={{ color: service.color }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        lineHeight: 1.6
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2.5, borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
              <Button
                variant="outlined"
                onClick={closeModal}
                sx={{
                  borderColor: "text.disabled",
                  color: "text.secondary",
                  mr: 1
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                href="#contact"
                onClick={closeModal}
                sx={{
                  background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                  px: 3
                }}
              >
                Get Started
              </Button>
            </DialogActions>
          </Dialog>
        ))}
      </Container>
    </Box>
  );
};

export default Services;