import React, { lazy, Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import ScrollUp from "./components/scrollup/ScrollUp";

// Lazy load all components
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/about/About"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Services = lazy(() => import("./components/services/Services"));
const Qualification = lazy(() => import("./components/qualification/Qualification"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Project = lazy(() => import("./components/projectidea/Project"));
const Certificate = lazy(() => import("./components/certificate/Certificate"));

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh"
    }}
  >
    <CircularProgress
      sx={{
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    />
  </Box>
);

const App = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Suspense fallback={<LoadingSpinner />}>
          <Home />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Qualification />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Certificate />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Project />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <ScrollUp />
    </>
  );
};

export default App;