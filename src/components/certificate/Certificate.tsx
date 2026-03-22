import React, { useState, useCallback, useEffect, useRef } from "react";
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

import ssl from "../../assets/SSL.jpg";
import nwc from "../../assets/NWC.jpg";
import swe from "../../assets/SWE.jpg";
import wed from "../../assets/WED.jpg";
import enw from "../../assets/ENW.jpg";
import project from "../../assets/Project.jpg";
import pmg from "../../assets/PMG.jpg";
import design from "../../assets/Design.jpg";
import aws from "../../assets/CERTIFICATE_LANDING_PAGE~HN06MIP031ZR.jpeg";
import backend from "../../assets/CERTIFICATE_LANDING_PAGE~JX9RP6QIBWPS.jpeg";

interface CertificateItem {
  id: number;
  image: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
}

const certificates: CertificateItem[] = [
  { id: 1, image: aws, title: "AWS Cloud Solutions Architect", issuer: "Amazon Web Services", date: "02/2026", credentialId: "HN06MIP031ZR" },
  { id: 2, image: backend, title: "Backend Development: Node.js, Express, MongoDB & REST APIs", issuer: "Board Infinity", date: "02/2026", credentialId: "JX9RP6QIBWPS" },
  { id: 3, image: design, title: "User Experience Research and Design", issuer: "University of Michigan", date: "07/2024", credentialId: "V9C7RMH479" },
  { id: 4, image: project, title: "Project Management Principles and Practices", issuer: "UC Irvine", date: "05/2024", credentialId: "DEXX1PW8E9T" },
  { id: 5, image: pmg, title: "CertNexus Certified Ethical Emerging Technologist", issuer: "CertNexus", date: "05/2023", credentialId: "VUG77BHSPE" },
  { id: 6, image: swe, title: "Software Development Lifecycle", issuer: "University of Minnesota", date: "02/2023", credentialId: "4P2STACCYAWU" },
  { id: 7, image: wed, title: "Web Design for Everybody", issuer: "University of Michigan", date: "10/2022", credentialId: "VN33EN84WNK" },
  { id: 8, image: nwc, title: "Computer Communications", issuer: "University of Colorado", date: "07/2022", credentialId: "CZXTNCMPJ88N" },
  { id: 9, image: enw, title: "Academic English: Writing", issuer: "UC Irvine", date: "01/2024", credentialId: "6SLU4WAG2D4T" },
  { id: 10, image: ssl, title: "Academic Skills for University Success", issuer: "University of Sydney", date: "01/2022", credentialId: "P728LUQZ555T" },
];

const CARD_W = 280;
const CARD_H = 280; // approx card height
const GAP = 24;
const OFFSET_Y = 100; // zigzag vertical offset

const Certificate: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [scrollX, setScrollX] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const cardWidth = isMobile ? 260 : CARD_W;
  const totalWidth = certificates.length * (cardWidth + GAP);
  const stripHeight = CARD_H + OFFSET_Y + 40; // total height of zigzag strip

  const maxScroll = totalWidth - (typeof window !== "undefined" ? window.innerWidth * 0.7 : 800);

  const handleNext = useCallback(() => {
    setScrollX((prev) => {
      const next = prev + cardWidth + GAP;
      if (next > maxScroll) return 0;
      return next;
    });
  }, [maxScroll, cardWidth]);

  const handlePrev = useCallback(() => {
    setScrollX((prev) => {
      if (prev <= 0) return maxScroll > 0 ? maxScroll : 0;
      return prev - cardWidth - GAP;
    });
  }, [maxScroll, cardWidth]);

  const openModal = useCallback((cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedCertificate(null);
  }, []);

  useEffect(() => {
    if (modalOpen) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [modalOpen, handleNext]);

  // Build SVG connector paths
  const connectorPaths = certificates.slice(0, -1).map((_, i) => {
    const isCurrentDown = i % 2 !== 0;
    const isNextDown = (i + 1) % 2 !== 0;

    // Start: right-center of current card
    const x1 = i * (cardWidth + GAP) + cardWidth;
    const y1 = (isCurrentDown ? OFFSET_Y : 0) + CARD_H / 2;

    // End: left-center of next card
    const x2 = (i + 1) * (cardWidth + GAP);
    const y2 = (isNextDown ? OFFSET_Y : 0) + CARD_H / 2;

    return { x1, y1, x2, y2, key: i };
  });

  return (
    <Box
      component="section"
      id="certificates"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#0a0a0a",
        overflow: "hidden"
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
            Certificates
          </Typography>
          <Typography variant="h6" sx={{ color: "#8b949e", fontWeight: 400 }}>
            My professional certifications
          </Typography>
        </Box>

        <Box sx={{ position: "relative" }}>
          {/* Navigation */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              zIndex: 5, width: 40, height: 40,
              background: "rgba(22, 22, 22, 0.95)", border: "1px solid rgba(14, 173, 223, 0.2)",
              color: "#0eaddf", backdropFilter: "blur(8px)",
              "&:hover": { background: "#0eaddf", color: "#0a0a0a" }
            }}
          >
            <PrevIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
              zIndex: 5, width: 40, height: 40,
              background: "rgba(22, 22, 22, 0.95)", border: "1px solid rgba(14, 173, 223, 0.2)",
              color: "#0eaddf", backdropFilter: "blur(8px)",
              "&:hover": { background: "#0eaddf", color: "#0a0a0a" }
            }}
          >
            <NextIcon />
          </IconButton>

          {/* Scrollable zigzag */}
          <Box
            ref={scrollRef}
            sx={{ overflow: "hidden", mx: 6 }}
          >
            <Box
              sx={{
                position: "relative",
                width: totalWidth,
                height: { xs: "auto", md: stripHeight },
                transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                transform: `translateX(-${scrollX}px)`
              }}
            >
              {/* SVG connectors overlay */}
              {!isMobile && (
                <svg
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: totalWidth,
                    height: stripHeight,
                    pointerEvents: "none",
                    zIndex: 1
                  }}
                >
                  {connectorPaths.map(({ x1, y1, x2, y2, key }) => (
                    <g key={key}>
                      <line
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#0eaddf"
                        strokeWidth="2.5"
                        strokeOpacity="0.7"
                      />
                      {/* Dots at connection points */}
                      <circle cx={x1} cy={y1} r="5" fill="#0eaddf" fillOpacity="0.9" />
                      <circle cx={x2} cy={y2} r="5" fill="#0eaddf" fillOpacity="0.9" />
                      {/* Glow */}
                      <circle cx={x1} cy={y1} r="10" fill="#0eaddf" fillOpacity="0.2" />
                      <circle cx={x2} cy={y2} r="10" fill="#0eaddf" fillOpacity="0.2" />
                    </g>
                  ))}
                </svg>
              )}

              {/* Cards */}
              {certificates.map((cert, index) => {
                const isDown = index % 2 !== 0;
                const left = index * (cardWidth + GAP);

                return (
                  <Box
                    key={cert.id}
                    sx={{
                      position: { xs: "relative", md: "absolute" },
                      left: { xs: "auto", md: left },
                      top: { xs: "auto", md: isDown ? OFFSET_Y : 0 },
                      width: cardWidth,
                      mb: { xs: 3, md: 0 },
                      display: { xs: index < 4 ? "block" : "none", md: "block" },
                      zIndex: 2
                    }}
                  >
                    <Card
                      sx={{
                        background: "#161616",
                        border: "1px solid rgba(14, 173, 223, 0.08)",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 16px 32px rgba(14, 173, 223, 0.15)",
                          borderColor: "rgba(14, 173, 223, 0.3)",
                          "& .cert-overlay": { opacity: 1 },
                          "& .cert-img": { transform: "scale(1.05)" }
                        }
                      }}
                      onClick={() => openModal(cert)}
                    >
                      <CardActionArea>
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <CardMedia
                            component="img"
                            image={cert.image}
                            alt={cert.title}
                            className="cert-img"
                            loading="lazy"
                            sx={{
                              height: 150,
                              objectFit: "cover",
                              transition: "transform 0.4s ease"
                            }}
                          />
                          <Box
                            className="cert-overlay"
                            sx={{
                              position: "absolute", inset: 0,
                              background: "rgba(10, 10, 10, 0.7)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              opacity: 0, transition: "opacity 0.3s ease"
                            }}
                          >
                            <Box sx={{
                              display: "flex", alignItems: "center", gap: 0.5,
                              color: "#0eaddf", fontSize: "0.8rem", fontWeight: 600
                            }}>
                              <OpenIcon sx={{ fontSize: 16 }} /> View
                            </Box>
                          </Box>

                          <Box sx={{
                            position: "absolute", top: 8, left: 8,
                            width: 24, height: 24, borderRadius: "50%",
                            background: "rgba(14, 173, 223, 0.85)", color: "#0a0a0a",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.65rem", fontWeight: 700
                          }}>
                            {String(index + 1).padStart(2, "0")}
                          </Box>
                        </Box>

                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{
                            fontWeight: 700, color: "#e6edf3", fontSize: "0.8rem",
                            mb: 0.75, lineHeight: 1.3,
                            display: "-webkit-box", WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical", overflow: "hidden"
                          }}>
                            {cert.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                            <SchoolIcon sx={{ fontSize: 13, color: "#0eaddf" }} />
                            <Typography variant="caption" sx={{
                              color: "#8b949e", fontSize: "0.7rem",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                            }}>
                              {cert.issuer}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <DateIcon sx={{ fontSize: 12, color: "#6e7681" }} />
                            <Typography variant="caption" sx={{ color: "#6e7681", fontSize: "0.7rem" }}>
                              {cert.date}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Progress bar */}
          <Box sx={{
            mt: 4, mx: "auto", width: 200, height: 3,
            borderRadius: 2, background: "rgba(255, 255, 255, 0.08)"
          }}>
            <Box sx={{
              height: "100%", borderRadius: 2, background: "#0eaddf",
              width: `${Math.min(100, ((scrollX + (scrollRef.current?.offsetWidth || 800)) / totalWidth) * 100)}%`,
              transition: "width 0.6s ease"
            }} />
          </Box>
        </Box>

        {/* Modal */}
        <Dialog
          open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth
          PaperProps={{ sx: { borderRadius: 3, background: "#161616" } }}
        >
          {selectedCertificate && (
            <>
              <DialogTitle sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)", pb: 2
              }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#e6edf3" }}>
                    {selectedCertificate.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Chip icon={<VerifiedIcon sx={{ fontSize: 16 }} />} label="Verified" size="small"
                      sx={{ background: "rgba(14, 173, 223, 0.1)", color: "#0eaddf", fontWeight: 600 }} />
                    <Chip icon={<SchoolIcon sx={{ fontSize: 16 }} />} label={selectedCertificate.issuer}
                      size="small" variant="outlined" sx={{ borderColor: "#0eaddf", color: "#0eaddf" }} />
                  </Box>
                </Box>
                <IconButton onClick={closeModal} sx={{ color: "#8b949e" }}><CloseIcon /></IconButton>
              </DialogTitle>
              <DialogContent sx={{ p: 0 }}>
                <Box sx={{
                  width: "100%", maxHeight: "60vh", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.02)"
                }}>
                  <img src={selectedCertificate.image} alt={selectedCertificate.title}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }} />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="subtitle2" sx={{ color: "#8b949e", mb: 0.5 }}>Issue Date</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#e6edf3" }}>{selectedCertificate.date}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="subtitle2" sx={{ color: "#8b949e", mb: 0.5 }}>Credential ID</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#e6edf3" }}>{selectedCertificate.credentialId}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <Button variant="outlined" onClick={closeModal}
                  sx={{ borderColor: "rgba(255, 255, 255, 0.2)", color: "#8b949e" }}>Close</Button>
                <Button variant="contained" startIcon={<VerifiedIcon />}
                  sx={{ background: "#0eaddf", color: "#0a0a0a", "&:hover": { background: "#0c8db3" } }}>
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
