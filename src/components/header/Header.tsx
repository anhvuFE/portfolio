import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  useScrollTrigger,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Divider,
  Stack
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  MailOutline as MailIcon,
  Search as SearchIcon
} from "@mui/icons-material";

interface HeaderProps {
  onOpenPalette?: () => void;
}

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

const Header: React.FC<HeaderProps> = ({ onOpenPalette }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsApple(/Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

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
              Xuan <span>Anh</span>
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
                {onOpenPalette && (
                  <Box
                    component="button"
                    onClick={onOpenPalette}
                    aria-label="Open command palette"
                    sx={{
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 1.25,
                      py: 0.5,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 1.5,
                      background: "rgba(255, 255, 255, 0.02)",
                      color: "#6e7681",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.75rem",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: "#0eaddf",
                        borderColor: "rgba(14, 173, 223, 0.3)",
                        background: "rgba(14, 173, 223, 0.04)"
                      }
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 14 }} />
                    <Box component="span" sx={{ fontFamily: '"Fira Code", monospace' }}>
                      {isApple ? "⌘ K" : "Ctrl K"}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {onOpenPalette && (
                  <IconButton
                    onClick={onOpenPalette}
                    aria-label="Open command palette"
                    sx={{
                      color: "#e6edf3",
                      width: 40,
                      height: 40
                    }}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  sx={{
                    color: "#e6edf3",
                    width: 40,
                    height: 40
                  }}
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
              </Box>
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
            width: { xs: "min(320px, 88vw)", sm: 340 },
            background: "#0a0a0a",
            border: "none",
            display: "flex",
            flexDirection: "column"
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 2.5,
            pt: 2.5,
            pb: 1
          }}
        >
          <IconButton
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            sx={{
              color: "#6e7681",
              width: 40,
              height: 40,
              "&:hover": { color: "#0eaddf", background: "rgba(14, 173, 223, 0.06)" }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box component="nav" sx={{ px: 4, pt: 3, flex: 1 }}>
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <Box
                key={item.id}
                component="a"
                href={`#${item.id}`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 1.75,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.25s ease",
                  color: isActive ? "#0eaddf" : "#e6edf3",
                  "&:hover": { color: "#0eaddf" },
                  "&:hover .nav-num": { color: "#0eaddf" }
                }}
              >
                <Typography
                  className="nav-num"
                  sx={{
                    fontFamily: '"Fira Code", "JetBrains Mono", Menlo, monospace',
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: isActive ? "#0eaddf" : "#4a5560",
                    minWidth: 32,
                    transition: "color 0.25s ease"
                  }}
                >
                  {String(index + 1).padStart(2, "0")}.
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: "1.15rem",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "-0.01em"
                  }}
                >
                  {item.label}
                </Typography>
                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#0eaddf",
                      boxShadow: "0 0 8px rgba(14, 173, 223, 0.6)"
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ px: 4, pb: 4, pt: 2 }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)", mb: 3 }} />
          <Stack spacing={0.75} sx={{ mb: 3 }}>
            <Box
              component="a"
              href="mailto:vuxuananh22@gmail.com"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#8b949e",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "color 0.2s ease",
                "&:hover": { color: "#0eaddf" }
              }}
            >
              <MailIcon sx={{ fontSize: 14 }} />
              vuxuananh22@gmail.com
            </Box>
            <Typography sx={{ color: "#6e7681", fontSize: "0.8rem", pl: "22px" }}>
              Hanoi, Vietnam · GMT+7
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            {[
              { icon: <GitHubIcon sx={{ fontSize: 18 }} />, href: "https://github.com/anhvuFE", label: "GitHub" },
              { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/", label: "LinkedIn" },
              { icon: <FacebookIcon sx={{ fontSize: 18 }} />, href: "https://www.facebook.com/xuananhvu2312/", label: "Facebook" }
            ].map((s) => (
              <IconButton
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                size="small"
                sx={{
                  width: 36,
                  height: 36,
                  color: "#8b949e",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#0eaddf",
                    borderColor: "rgba(14, 173, 223, 0.3)",
                    background: "rgba(14, 173, 223, 0.04)"
                  }
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
