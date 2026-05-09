import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import BentoGrid from "./components/bento/BentoGrid";
import Footer from "./components/footer/Footer";
import CursorGlow from "./components/effects/CursorGlow";
import ScrollReveal from "./components/effects/ScrollReveal";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CursorGlow />
      <Header />
      <main className="main">
        <Home />
        <ScrollReveal direction="up">
          <BentoGrid />
        </ScrollReveal>
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
