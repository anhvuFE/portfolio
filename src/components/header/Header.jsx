import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useScrollTrigger,
  Box,
  useTheme,
  useMediaQuery,
  Container
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  FolderSpecial as PortfolioIcon,
  ContactMail as ContactIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "about", label: "About", icon: <PersonIcon /> },
    { id: "skills", label: "Skills", icon: <CodeIcon /> },
    { id: "services", label: "Services", icon: <WorkIcon /> },
    { id: "qualification", label: "Portfolio", icon: <PortfolioIcon /> },
    { id: "contact", label: "Contact", icon: <ContactIcon /> },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: trigger
            ? "rgba(255, 255, 255, 0.98)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: trigger
            ? "0 8px 32px rgba(0, 0, 0, 0.1)"
            : "0 2px 16px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1
            }}
          >
              <Typography
                variant="h5"
                component="a"
                href="#home"
                onClick={() => handleNavClick("home")}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)"
                  }
                }}
              >
                Xuan Anh
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "inline-block",
                    animation: "pulse 2s infinite"
                  }}
                />
              </Typography>

            {!isMobile ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                {navItems.map((item, index) => (
                    <Button
                      key={item.id}
                      color="inherit"
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      startIcon={item.icon}
                      sx={{
                        color: activeSection === item.id
                          ? "transparent"
                          : "rgba(0, 0, 0, 0.7)",
                        background: activeSection === item.id
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                        backgroundClip: activeSection === item.id ? "text" : "unset",
                        WebkitBackgroundClip: activeSection === item.id ? "text" : "unset",
                        WebkitTextFillColor: activeSection === item.id ? "transparent" : "unset",
                        position: "relative",
                        fontWeight: activeSection === item.id ? 600 : 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: activeSection === item.id
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : "rgba(102, 126, 234, 0.08)",
                          backgroundClip: activeSection === item.id ? "text" : "unset",
                          WebkitBackgroundClip: activeSection === item.id ? "text" : "unset",
                          transform: "translateY(-2px)",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: activeSection === item.id ? "60%" : "0%",
                          height: 2,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          transition: "width 0.3s ease",
                        },
                        "& .MuiButton-startIcon": {
                          color: activeSection === item.id
                            ? "#667eea"
                            : "inherit",
                          transition: "color 0.3s ease"
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                ))}
              </Box>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setIsMenuOpen(true)}
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "rotate(90deg)"
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
          }
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Menu
          </Typography>
          <IconButton
            onClick={() => setIsMenuOpen(false)}
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(90deg)"
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 2, py: 3 }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "all 0.3s ease",
                background: activeSection === item.id
                  ? "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)"
                  : "transparent",
                "&:hover": {
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                  transform: "translateX(8px)"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeSection === item.id ? "#667eea" : "rgba(0, 0, 0, 0.6)",
                  minWidth: 40
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 600 : 500,
                  color: activeSection === item.id ? "#667eea" : "rgba(0, 0, 0, 0.8)"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;