import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import BentoGrid from "./components/bento/BentoGrid";
import Footer from "./components/footer/Footer";
import CursorGlow from "./components/effects/CursorGlow";

const CommandPalette = lazy(() => import("./components/palette/CommandPalette"));
// Lazy so returning visitors (who skip the intro) never download cobe/WebGL.
const GalaxyIntro = lazy(() => import("./components/intro/GalaxyIntro"));

const INTRO_SEEN_KEY = "introSeen_v1";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0eaddf",
      light: "#3dc4ee",
      dark: "#0c8db3",
    },
    secondary: {
      main: "#0c8db3",
      light: "#3dc4ee",
      dark: "#0a7a9c",
    },
    background: {
      default: "#0a0a0a",
      paper: "#161616",
    },
    text: {
      primary: "#e6edf3",
      secondary: "#8b949e",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0a0a0a",
          color: "#e6edf3",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.3s ease",
        },
        contained: {
          boxShadow: "0 4px 14px rgba(14, 173, 223, 0.2)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(14, 173, 223, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

function App(): React.ReactElement {
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Decide synchronously (before paint) so the portfolio never flashes before
  // the intro. Shown once per browser; skipped for reduced-motion users.
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const seen = localStorage.getItem(INTRO_SEEN_KEY);
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      return !seen && !reduced;
    } catch {
      return false;
    }
  });

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, []);

  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CursorGlow />
      <Header onOpenPalette={openPalette} />
      <main className="main">
        <Home />
        <BentoGrid />
        <Footer />
      </main>
      {paletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onClose={closePalette} />
        </Suspense>
      )}
      {showIntro && (
        <Suspense
          fallback={<div style={{ position: "fixed", inset: 0, zIndex: 20000, background: "#02030a" }} />}
        >
          <GalaxyIntro onFinish={finishIntro} />
        </Suspense>
      )}
    </ThemeProvider>
  );
}

export default App;
