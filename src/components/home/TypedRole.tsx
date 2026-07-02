import * as React from "react";
import { Typography } from "@mui/material";

const roles = [
  "Full Stack Developer",
  "Frontend-leaning Engineer",
  "React & TypeScript",
];

/**
 * Self-contained typing effect for the hero role line. Kept out of Home so its
 * ~10 updates/sec re-render only this element instead of the whole hero
 * (avatar, stats, buttons). Pauses while off-screen or the tab is hidden.
 */
const TypedRole: React.FC = () => {
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateVisible = () => setIsActive(!document.hidden);
    document.addEventListener("visibilitychange", updateVisible);

    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            setIsActive(e.isIntersecting && !document.hidden);
          }
        },
        { threshold: 0 }
      );
      io.observe(el);
      return () => {
        document.removeEventListener("visibilitychange", updateVisible);
        io.disconnect();
      };
    }
    return () => document.removeEventListener("visibilitychange", updateVisible);
  }, []);

  React.useEffect(() => {
    if (!isActive) return;
    const currentRole = roles[currentIndex];
    let index = 0;
    let nextTimeout: ReturnType<typeof setTimeout> | null = null;
    const timer = setInterval(() => {
      setDisplayText(currentRole.slice(0, index));
      index++;
      if (index > currentRole.length) {
        clearInterval(timer);
        nextTimeout = setTimeout(
          () => setCurrentIndex((prev) => (prev + 1) % roles.length),
          2000
        );
      }
    }, 100);

    return () => {
      clearInterval(timer);
      if (nextTimeout) clearTimeout(nextTimeout);
    };
  }, [currentIndex, isActive]);

  return (
    <Typography
      ref={ref}
      variant="h4"
      sx={{
        fontSize: { xs: "1.5rem", md: "2rem" },
        fontWeight: 600,
        mb: 3,
        color: "#0eaddf",
        minHeight: "40px",
      }}
    >
      {displayText}
      <span style={{ animation: "blink 1s infinite", color: "#0eaddf" }}>|</span>
    </Typography>
  );
};

export default TypedRole;
