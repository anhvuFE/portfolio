import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Chip,
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  VerifiedUser as VerifiedIcon,
  CalendarToday as DateIcon,
  OpenInNew as OpenIcon
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

// Import certificate images
import ssl from "../../assets/SSL.jpg";
import nwc from "../../assets/NWC.jpg";
import swe from "../../assets/SWE.jpg";
import wed from "../../assets/WED.jpg";
import enw from "../../assets/ENW.jpg";
import project from "../../assets/Project.jpg";
import pmg from "../../assets/PMG.jpg";
import design from "../../assets/Design.jpg";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Certificate = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const certificates = [
    {
      id: 1,
      image: design,
      title: "Design",
      issuer: "Coursera",
      date: "January 2025",
      credentialId: "DES2025001"
    },
    {
      id: 2,
      image: enw,
      title: "English for Networking",
      issuer: "Coursera",
      date: "December 2024",
      credentialId: "ENW2024012"
    },
    {
      id: 3,
      image: nwc,
      title: "Network Configuration",
      issuer: "Coursera",
      date: "November 2024",
      credentialId: "NWC2024011"
    },
    {
      id: 4,
      image: pmg,
      title: "Ethics In IT",
      issuer: "Coursera",
      date: "October 2024",
      credentialId: "ETH2024010"
    },
    {
      id: 5,
      image: project,
      title: "Project Management",
      issuer: "Coursera",
      date: "September 2024",
      credentialId: "PMG2024009"
    },
    {
      id: 6,
      image: ssl,
      title: "SSL Certificate",
      issuer: "Coursera",
      date: "August 2024",
      credentialId: "SSL2024008"
    },
    {
      id: 7,
      image: swe,
      title: "Software Engineering",
      issuer: "Coursera",
      date: "July 2024",
      credentialId: "SWE2024007"
    },
    {
      id: 8,
      image: wed,
      title: "Web Development",
      issuer: "Coursera",
      date: "June 2024",
      credentialId: "WED2024006"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [autoSlide, setAutoSlide] = useState(true);

  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, certificates.length - slidesToShow);

  // Auto slide effect
  useEffect(() => {
    let interval;
    if (autoSlide && !modalOpen) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoSlide, modalOpen, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
    setAutoSlide(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCertificate(null);
    setAutoSlide(true);
  };

  return (
    <Box
      component="section"
      id="certificates"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
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
            Certificates
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400
            }}
          >
            My coursera certifications
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: 3,
            p: 4,
            overflow: "hidden"
          }}
        >
          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: 8, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white"
              }
            }}
          >
            <PrevIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 8, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white"
              }
            }}
          >
            <NextIcon />
          </IconButton>

          {/* Certificates Grid */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              transition: "transform 0.5s ease",
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
            }}
          >
            {certificates.map((cert, index) => (
              <Box
                key={cert.id}
                sx={{
                  minWidth: `calc(${100 / slidesToShow}% - ${(slidesToShow - 1) * 24 / slidesToShow}px)`,
                  animation: `${slideIn} 0.5s ease-out`
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: "white",
                    border: "2px solid rgba(102, 126, 234, 0.2)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
                      borderColor: "#667eea",
                      "& .certificate-overlay": {
                        opacity: 1
                      }
                    }
                  }}
                  onClick={() => openModal(cert)}
                >
                  <CardActionArea sx={{ height: "100%" }}>
                    <Box sx={{ position: "relative", paddingTop: "75%", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        image={cert.image}
                        alt={cert.title}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                      <Box
                        className="certificate-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(180deg, transparent 0%, rgba(102, 126, 234, 0.8) 100%)",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          p: 2,
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                          }}
                        >
                          <OpenIcon /> View Certificate
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#1a1a1a",
                          fontSize: "1.1rem"
                        }}
                      >
                        {cert.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <SchoolIcon sx={{ fontSize: 18, color: "#667eea" }} />
                        <Typography variant="body2" sx={{ color: "#667eea", fontWeight: 600 }}>
                          {cert.issuer}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DateIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {cert.date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Pagination Dots */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 4
            }}
          >
            {Array.from({ length: Math.ceil(certificates.length / slidesToShow) }).map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index * slidesToShow)}
                sx={{
                  width: index === Math.floor(currentIndex / slidesToShow) ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: index === Math.floor(currentIndex / slidesToShow)
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Certificate Modal */}
        <Dialog
          open={modalOpen}
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "white"
            }
          }}
        >
          {selectedCertificate && (
            <>
              <DialogTitle
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  pb: 2
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                    {selectedCertificate.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Chip
                      icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                      label="Verified"
                      size="small"
                      sx={{
                        background: "rgba(102, 126, 234, 0.1)",
                        color: "#667eea",
                        fontWeight: 600
                      }}
                    />
                    <Chip
                      icon={<SchoolIcon sx={{ fontSize: 16 }} />}
                      label={selectedCertificate.issuer}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "#667eea",
                        color: "#667eea"
                      }}
                    />
                  </Box>
                </Box>
                <IconButton onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "60vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.02)"
                  }}
                >
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain"
                    }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 0.5 }}>
                        Issue Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedCertificate.date}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 0.5 }}>
                        Credential ID
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedCertificate.credentialId}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 3,
                      p: 2,
                      background: "rgba(102, 126, 234, 0.05)",
                      borderRadius: 2,
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                      color: "text.secondary",
                      lineHeight: 1.8
                    }}
                  >
                    This certificate was issued by {selectedCertificate.issuer} upon successful completion
                    of the {selectedCertificate.title} course. The certificate validates proficiency in
                    the subject matter and can be verified using the credential ID.
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
                <Button
                  variant="outlined"
                  onClick={closeModal}
                  sx={{
                    borderColor: "text.disabled",
                    color: "text.secondary"
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VerifiedIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white"
                  }}
                >
                  Verify Certificate
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Certificate;