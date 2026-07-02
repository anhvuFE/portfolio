import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "motion/react";

/**
 * Parallax starfield background, ported from Animate UI's Stars Background
 * (https://animate-ui.com/docs/backgrounds/stars) into plain MUI + inline
 * styles. Stars are drawn as a single `box-shadow` paint per layer; layers
 * drift and shift with the pointer.
 *
 * Performance: box-shadow starfields are paint-heavy, so we (1) keep star
 * counts modest, (2) set `will-change: transform` to promote each layer to its
 * own GPU layer (drift/parallax then composite instead of repainting), and
 * (3) pause the pointer parallax and drift while the hero is off-screen.
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
  driftDuration: number;
  starColor: string;
  active: boolean;
}

const StarLayer: React.FC<StarLayerProps> = ({
  count,
  size,
  driftDuration,
  starColor,
  active,
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
      animate={active ? { y: [0, -2000] } : undefined}
      transition={{ repeat: Infinity, duration: driftDuration, ease: "linear" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 2000,
        willChange: "transform",
      }}
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(true);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  // Only run drift/parallax while the hero is on screen.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [offsetX, offsetY, factor, prefersReducedMotion, inView]);

  const active = !prefersReducedMotion && inView;

  return (
    <div
      ref={containerRef}
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
      <motion.div
        style={{ x: springX, y: springY, width: "100%", height: "100%", willChange: "transform" }}
      >
        <StarLayer count={300} size={1} driftDuration={speed} starColor={starColor} active={active} />
        <StarLayer count={120} size={2} driftDuration={speed * 2} starColor={starColor} active={active} />
        <StarLayer count={60} size={3} driftDuration={speed * 3} starColor={starColor} active={active} />
      </motion.div>
    </div>
  );
};

export default StarsBackground;
