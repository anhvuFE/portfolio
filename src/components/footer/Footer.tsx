import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { ArrowUpward as ArrowUpIcon } from "@mui/icons-material";
import MatrixRain from "../sakura/MatrixRain";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const MONO = '"Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace';

interface Line {
  prompt?: string;
  command?: string;
  output?: React.ReactNode;
}

const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear: number = new Date().getFullYear();

  const lines: Line[] = [
    { command: "whoami" },
    { output: <Box component="span" sx={{ color: "#e6edf3" }}>Vũ Xuân Anh — Full Stack Developer</Box> },
    {},
    { command: "cat /status" },
    {
      output: (
        <Box component="span" sx={{ color: "#22c55e", display: "inline-flex", alignItems: "center", gap: 1 }}>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34, 197, 94, 0.8)"
            }}
          />
          available for new opportunities
        </Box>
      )
    },
    {},
    { command: "ls ~/contact" },
    {
      output: (
        <Box component="span">
          <Box component="a" href="https://github.com/anhvuFE" target="_blank" rel="noopener noreferrer" sx={linkSx}>github.com/anhvuFE</Box>
          {"  "}
          <Box component="a" href="https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/" target="_blank" rel="noopener noreferrer" sx={linkSx}>linkedin.com/xu...</Box>
          {"  "}
          <Box component="a" href="mailto:vuxuananh22@gmail.com" sx={linkSx}>vuxuananh22@gmail.com</Box>
        </Box>
      )
    },
    {},
    { command: "echo $LOCATION" },
    { output: <Box component="span" sx={{ color: "#e6edf3" }}>Hanoi, Vietnam · GMT+7</Box> }
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(14, 173, 223, 0.08)",
        overflow: "hidden",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 5 }
      }}
    >
      <MatrixRain />

      <IconButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 30 },
          right: { xs: 20, md: 30 },
          background: "#0eaddf",
          color: "#0a0a0a",
          width: 48,
          height: 48,
          boxShadow: "0 8px 24px rgba(14, 173, 223, 0.4)",
          animation: `${float} 3s ease-in-out infinite`,
          zIndex: 1000,
          "&:hover": { background: "#3dc4ee", transform: "scale(1.08)" }
        }}
      >
        <ArrowUpIcon />
      </IconButton>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {/* Terminal window */}
        <Box
          sx={{
            background: "#0d1117",
            borderRadius: 2.5,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(14, 173, 223, 0.05)",
            overflow: "hidden",
            fontFamily: MONO
          }}
        >
          {/* Title bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.25,
              background: "rgba(255, 255, 255, 0.02)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <Box sx={{ display: "flex", gap: 0.75 }}>
              <Box sx={dotSx("#ff5f56")} />
              <Box sx={dotSx("#ffbd2e")} />
              <Box sx={dotSx("#27c93f")} />
            </Box>
            <Typography
              sx={{
                flex: 1,
                textAlign: "center",
                color: "#6e7681",
                fontSize: "0.75rem",
                fontFamily: MONO,
                letterSpacing: 0.3,
                userSelect: "none"
              }}
            >
              vuxuananh@portfolio: ~
            </Typography>
            <Box sx={{ width: 52 }} />
          </Box>

          {/* Body */}
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              lineHeight: 1.7,
              fontFamily: MONO,
              color: "#8b949e",
              overflowX: "auto"
            }}
          >
            {lines.map((line, i) => (
              <Box key={i} sx={{ minHeight: "1.7em", whiteSpace: "nowrap" }}>
                {line.command && (
                  <>
                    <Box component="span" sx={{ color: "#22c55e" }}>vu@portfolio</Box>
                    <Box component="span" sx={{ color: "#6e7681" }}>:</Box>
                    <Box component="span" sx={{ color: "#0eaddf" }}>~</Box>
                    <Box component="span" sx={{ color: "#6e7681" }}>$ </Box>
                    <Box component="span" sx={{ color: "#e6edf3" }}>{line.command}</Box>
                  </>
                )}
                {line.output && <Box sx={{ pl: 0 }}>{line.output}</Box>}
                {!line.command && !line.output && <>&nbsp;</>}
              </Box>
            ))}

            {/* Active prompt with blinking cursor */}
            <Box sx={{ minHeight: "1.7em", display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#22c55e" }}>vu@portfolio</Box>
              <Box component="span" sx={{ color: "#6e7681" }}>:</Box>
              <Box component="span" sx={{ color: "#0eaddf" }}>~</Box>
              <Box component="span" sx={{ color: "#6e7681" }}>$&nbsp;</Box>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "0.55em",
                  height: "1em",
                  background: "#0eaddf",
                  animation: `${blink} 1s step-end infinite`,
                  verticalAlign: "text-bottom"
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Below-terminal credit */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            color: "#6e7681",
            fontFamily: MONO,
            fontSize: "0.7rem"
          }}
        >
          <Box component="span">{`// © ${currentYear} Vũ Xuân Anh`}</Box>
          <Box component="span">{"// built with React, TypeScript & MUI"}</Box>
        </Box>
      </Container>
    </Box>
  );
};

const dotSx = (color: string) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: color,
  flexShrink: 0
});

const linkSx = {
  color: "#0eaddf",
  textDecoration: "underline",
  textDecorationColor: "rgba(14, 173, 223, 0.3)",
  textUnderlineOffset: 3,
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#3dc4ee",
    textDecorationColor: "#3dc4ee"
  }
};

export default Footer;
