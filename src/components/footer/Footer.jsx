import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
  Paper
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ArrowUpward as ArrowUpIcon
} from "@mui/icons-material";
import Sakura from "../sakura/Sakura";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Certificates", href: "#certificates" }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <GitHubIcon />,
      href: "https://github.com/anhvuFE",
      color: "#333"
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      href: "https://www.facebook.com/xuananhvu2312/",
      color: "#1877F2"
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/",
      color: "#0A66C2"
    },
    {
      name: "Email",
      icon: <EmailIcon />,
      href: "mailto:vuxuananh2312@gmail.com",
      color: "#667eea"
    }
  ];

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      text: "+84 982 168 318"
    },
    {
      icon: <EmailIcon />,
      text: "vuxuananh2312@gmail.com"
    },
    {
      icon: <LocationIcon />,
      text: "Ha Noi, Vietnam"
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        pt: 8,
        pb: 4,
        overflow: "hidden"
      }}
    >
      <Sakura />

      {/* Scroll to Top Button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 30,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          width: 56,
          height: 56,
          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
          animation: `${float} 3s ease-in-out infinite`,
          zIndex: 1000,
          "&:hover": {
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            transform: "scale(1.1)"
          }
        }}
      >
        <ArrowUpIcon />
      </IconButton>

      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Vũ Xuân Anh
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 2,
                fontWeight: 500
              }}
            >
              Full Stack Developer
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.8,
                mb: 3
              }}
            >
              Passionate about creating innovative web solutions and delivering exceptional
              user experiences. Specialized in modern web technologies and full-stack development.
            </Typography>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      background: social.color,
                      color: "white",
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 16px ${social.color}40`
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "white",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 50,
                  height: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.95rem",
                    position: "relative",
                    transition: "all 0.3s ease",
                    pl: 2,
                    "&::before": {
                      content: '"→"',
                      position: "absolute",
                      left: 0,
                      opacity: 0,
                      transform: "translateX(-10px)",
                      transition: "all 0.3s ease"
                    },
                    "&:hover": {
                      color: "#667eea",
                      pl: 3,
                      "&::before": {
                        opacity: 1,
                        transform: "translateX(0)"
                      }
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "white",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 50,
                  height: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "rgba(255, 255, 255, 0.7)"
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: "rgba(102, 126, 234, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#667eea"
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
                    {info.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: { xs: "center", md: "left" }
            }}
          >
            © {currentYear} Vũ Xuân Anh. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: { xs: "center", md: "right" }
            }}
          >
            Built with ❤️ using React & Material-UI
          </Typography>
        </Box>
      </Container>

      {/* Background Decorations */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          opacity: 0.05,
          filter: "blur(60px)"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          opacity: 0.05,
          filter: "blur(40px)"
        }}
      />
    </Box>
  );
};

export default Footer;