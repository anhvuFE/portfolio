import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
  type Transition,
} from "motion/react";

/**
 * Parallax starfield background, ported from Animate UI's Stars Background
 * (https://animate-ui.com/docs/backgrounds/stars) into plain MUI + inline
 * styles (the original ships as Tailwind classes). Stars are drawn as a single
 * `box-shadow` paint per layer for cheap rendering; layers drift upward on a
 * loop and shift with the pointer via spring-smoothed motion values.
 */

function generateStars(count: number, starColor: string): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

interface StarLayerProps {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
}

const StarLayer: React.FC<StarLayerProps> = ({
  count,
  size,
  transition,
  starColor,
}) => {
  const [boxShadow, setBoxShadow] = React.useState("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  const dot: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: "transparent",
    boxShadow,
  };

  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -2000] }}
      transition={transition}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2000 }}
    >
      <div style={dot} />
      <div style={{ ...dot, top: 2000 }} />
    </motion.div>
  );
};

interface StarsBackgroundProps {
  /** Pointer parallax strength (higher = more shift). */
  factor?: number;
  /** Base drift duration in seconds for the densest layer. */
  speed?: number;
  /** Spring options for the pointer parallax. */
  transition?: SpringOptions;
  starColor?: string;
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#ffffff",
}) => {
  const prefersReducedMotion = useReducedMotion();

  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [offsetX, offsetY, factor, prefersReducedMotion]);

  const drift = (duration: number): Transition =>
    prefersReducedMotion
      ? { duration: 0 }
      : { repeat: Infinity, duration, ease: "linear" };

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "radial-gradient(ellipse at bottom, #10242e 0%, #0a0a0a 60%)",
      }}
    >
      <motion.div style={{ x: springX, y: springY, width: "100%", height: "100%" }}>
        <StarLayer count={1000} size={1} transition={drift(speed)} starColor={starColor} />
        <StarLayer count={400} size={2} transition={drift(speed * 2)} starColor={starColor} />
        <StarLayer count={200} size={3} transition={drift(speed * 3)} starColor={starColor} />
      </motion.div>
    </div>
  );
};

export default StarsBackground;
