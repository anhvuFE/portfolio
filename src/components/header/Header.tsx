import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Box,
  useTheme,
  useMediaQuery,
  Container
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import "./header.css";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  });

  useEffect(() => {
    const syncActive = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveSection(hash);
      else setActiveSection("home");
    };
    syncActive();
    window.addEventListener("hashchange", syncActive);
    return () => window.removeEventListener("hashchange", syncActive);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    if (sectionId === "home") {
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = sectionId;
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: trigger
            ? "rgba(10, 10, 10, 0.95)"
            : "transparent",
          backdropFilter: trigger ? "blur(20px)" : "none",
          boxShadow: trigger
            ? "0 1px 0 rgba(255, 255, 255, 0.05)"
            : "none",
          transition: "all 0.4s ease",
          borderBottom: trigger ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 0.5,
              minHeight: { xs: 56, md: 64 }
            }}
          >
            <Typography
              variant="h6"
              component="a"
              href="#home"
              onClick={() => handleNavClick("home")}
              sx={{
                color: "#e6edf3",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                textDecoration: "none",
                fontSize: { xs: "1.2rem", md: "1.35rem" },
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#0eaddf"
                },
                "& span": {
                  color: "#0eaddf"
                }
              }}
            >
              Xuan<span>Anh</span>
            </Typography>

            {!isMobile ? (
              <Box
                component="nav"
                sx={{
                  display: "flex",
                  gap: 0.5
                }}
              >
                {navItems.map((item) => (
                  <Box
                    key={item.id}
                    component="a"
                    href={`#${item.id}`}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    sx={{
                      color: activeSection === item.id ? "#0eaddf" : "#6e7681",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: activeSection === item.id ? 600 : 500,
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1,
                      position: "relative",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#e6edf3",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: activeSection === item.id ? "100%" : "0%",
                        height: "1px",
                        background: "#0eaddf",
                        transition: "width 0.3s ease",
                      }
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            ) : (
              <IconButton
                edge="end"
                onClick={() => setIsMenuOpen(true)}
                sx={{
                  color: "#e6edf3",
                  width: 40,
                  height: 40
                }}
              >
                <MenuIcon fontSize="small" />
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
            width: 260,
            background: "#111111",
            borderLeft: "1px solid rgba(255, 255, 255, 0.05)"
          }
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <IconButton
            onClick={() => setIsMenuOpen(false)}
            sx={{
              color: "#6e7681",
              width: 36,
              height: 36,
              "&:hover": { color: "#e6edf3" }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                cursor: "pointer",
                py: 1.5,
                transition: "all 0.2s ease",
                borderLeft: activeSection === item.id
                  ? "2px solid #0eaddf"
                  : "2px solid transparent",
                background: activeSection === item.id
                  ? "rgba(14, 173, 223, 0.05)"
                  : "transparent",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.03)",
                }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: activeSection === item.id ? 600 : 400,
                  color: activeSection === item.id ? "#0eaddf" : "#8b949e",
                  letterSpacing: "0.02em"
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
