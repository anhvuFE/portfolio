import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Services from "./components/services/Services";
import Qualification from "./components/qualification/Qualification";
import Certificate from "./components/certificate/Certificate";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      light: "#8b9dfa",
      dark: "#4558c9",
    },
    secondary: {
      main: "#764ba2",
      light: "#9b6fc7",
      dark: "#5a3a7e",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.65)",
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
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.3s ease",
        },
        contained: {
          boxShadow: "0 4px 14px rgba(102, 126, 234, 0.25)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
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

const antTheme = {
  token: {
    colorPrimary: "#667eea",
    colorLink: "#667eea",
    colorLinkHover: "#764ba2",
    borderRadius: 8,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    Button: {
      controlHeight: 40,
      fontSize: 16,
      borderRadiusLG: 8,
    },
    Input: {
      controlHeight: 40,
      fontSize: 14,
      borderRadiusLG: 8,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={antTheme}>
        <CssBaseline />
        <Header />
        <main className="main">
          <Home />
          <About />
          <Skills />
          <Services />
          <Qualification />
          <Certificate />
          <Contact />
          <Footer />
        </main>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;