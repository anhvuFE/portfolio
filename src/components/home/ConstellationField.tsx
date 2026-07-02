import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Hero background: 12 well-known constellations drawn as stick figures over a
 * faint twinkling starfield. Layers shift with the pointer (parallax) via motion
 * springs; hovering a constellation lights up its lines and reveals its name.
 * Built as SVG for crisp lines, easy hit-testing and labels. Honors
 * prefers-reduced-motion (disables parallax + twinkle).
 */

interface Constellation {
  name: string;
  /** Star positions in a local 0..100 box. */
  stars: [number, number][];
  /** Edges as pairs of star indices. */
  lines: [number, number][];
  /** Placement in the 1000x700 viewBox: top-left origin + scale. */
  at: { x: number; y: number; scale: number };
}

const CONSTELLATIONS: Constellation[] = [
  {
    name: "Orion",
    stars: [
      [25, 15], [60, 20], [43, 5], [35, 50],
      [45, 52], [55, 54], [58, 88], [28, 90],
    ],
    lines: [[0, 1], [0, 2], [1, 2], [0, 3], [1, 5], [3, 4], [4, 5], [3, 7], [5, 6]],
    at: { x: 60, y: 40, scale: 1.3 },
  },
  {
    name: "Ursa Major",
    stars: [
      [78, 15], [78, 40], [55, 44], [55, 18],
      [40, 14], [22, 8], [5, 10],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
    at: { x: 330, y: 30, scale: 1.4 },
  },
  {
    name: "Cassiopeia",
    stars: [[5, 15], [25, 35], [45, 12], [65, 38], [88, 18]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    at: { x: 610, y: 50, scale: 1.25 },
  },
  {
    name: "Cygnus",
    stars: [[50, 5], [50, 45], [50, 90], [12, 40], [85, 52]],
    lines: [[0, 1], [1, 2], [3, 1], [1, 4]],
    at: { x: 850, y: 40, scale: 1.25 },
  },
  {
    name: "Leo",
    stars: [
      [12, 70], [14, 52], [20, 36], [30, 24],
      [42, 20], [68, 40], [92, 52],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
    at: { x: 40, y: 300, scale: 1.4 },
  },
  {
    name: "Gemini",
    stars: [
      [30, 8], [55, 12], [32, 35], [57, 38],
      [28, 62], [55, 64], [22, 88], [60, 86],
    ],
    lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 3], [4, 5]],
    at: { x: 330, y: 300, scale: 1.2 },
  },
  {
    name: "Taurus",
    stars: [
      [45, 50], [32, 42], [58, 44], [20, 35],
      [70, 38], [8, 12], [88, 18], [25, 20],
    ],
    lines: [[0, 1], [1, 3], [3, 5], [0, 2], [2, 4], [4, 6]],
    at: { x: 600, y: 290, scale: 1.3 },
  },
  {
    name: "Lyra",
    stars: [[18, 12], [30, 28], [48, 26], [44, 50], [26, 48]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]],
    at: { x: 860, y: 300, scale: 1.15 },
  },
  {
    name: "Scorpius",
    stars: [
      [8, 12], [5, 25], [14, 30], [24, 40], [34, 52],
      [46, 62], [58, 70], [62, 82], [52, 90], [40, 88],
    ],
    lines: [[0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    at: { x: 60, y: 470, scale: 1.3 },
  },
  {
    name: "Canis Major",
    stars: [
      [30, 25], [48, 22], [58, 38], [50, 62],
      [30, 70], [20, 52], [15, 15],
    ],
    lines: [[6, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    at: { x: 340, y: 480, scale: 1.2 },
  },
  {
    name: "Aquila",
    stars: [[45, 45], [40, 32], [50, 58], [15, 42], [78, 50], [60, 80]],
    lines: [[1, 0], [0, 2], [3, 0], [0, 4], [2, 5]],
    at: { x: 620, y: 490, scale: 1.2 },
  },
  {
    name: "Ursa Minor",
    stars: [
      [85, 10], [70, 20], [55, 30], [42, 42],
      [48, 60], [66, 58], [58, 42],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    at: { x: 840, y: 480, scale: 1.25 },
  },
];

interface BackdropStar {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
}

function makeBackdrop(count: number): BackdropStar[] {
  const stars: BackdropStar[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 1000,
      y: Math.random() * 700,
      r: Math.random() * 1.1 + 0.3,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    });
  }
  return stars;
}

const LINE_COLOR = "rgba(14, 173, 223, 0.28)";
const LINE_COLOR_ACTIVE = "rgba(61, 196, 238, 0.95)";
const STAR_COLOR = "#cfefff";

const ConstellationGroup: React.FC<{
  data: Constellation;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}> = ({ data, active, onEnter, onLeave }) => {
  const { stars, lines, at } = data;
  return (
    <g transform={`translate(${at.x} ${at.y}) scale(${at.scale})`}>
      {/* Transparent hit area so the thin lines are easy to hover. */}
      <rect
        x={-6}
        y={-16}
        width={112}
        height={122}
        fill="transparent"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a][0]}
          y1={stars[a][1]}
          x2={stars[b][0]}
          y2={stars[b][1]}
          stroke={active ? LINE_COLOR_ACTIVE : LINE_COLOR}
          strokeWidth={active ? 1.1 : 0.7}
          strokeLinecap="round"
          style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
        />
      ))}
      {stars.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 2.1 : 1.3}
          fill={STAR_COLOR}
          style={{
            filter: active
              ? "drop-shadow(0 0 3px rgba(61,196,238,0.9))"
              : "none",
            opacity: active ? 1 : 0.85,
            transition: "opacity 0.3s ease, filter 0.3s ease",
          }}
        />
      ))}
      <text
        x={50}
        y={-6}
        textAnchor="middle"
        fill={LINE_COLOR_ACTIVE}
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: 0.5,
          opacity: active ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          textTransform: "uppercase",
        }}
      >
        {data.name}
      </text>
    </g>
  );
};

const ConstellationField: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState<number | null>(null);
  const backdrop = React.useMemo(() => makeBackdrop(90), []);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 50, damping: 20 });
  const springY = useSpring(offsetY, { stiffness: 50, damping: 20 });

  // Backdrop drifts less than the constellations for a parallax depth effect.
  const backdropX = useTransform(springX, (v) => v * 0.4);
  const backdropY = useTransform(springY, (v) => v * 0.4);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      offsetX.set(-(e.clientX - cx) * 0.02);
      offsetY.set(-(e.clientY - cy) * 0.02);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [offsetX, offsetY, prefersReducedMotion]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "radial-gradient(ellipse at bottom, #10242e 0%, #0a0a0a 60%)",
      }}
    >
      {!prefersReducedMotion && (
        <style>{`@keyframes cf-twinkle{0%,100%{opacity:.25}50%{opacity:.9}}`}</style>
      )}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <motion.g style={{ x: backdropX, y: backdropY }}>
          {backdrop.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#ffffff"
              style={
                prefersReducedMotion
                  ? { opacity: 0.5 }
                  : {
                      animation: `cf-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                    }
              }
            />
          ))}
        </motion.g>

        <motion.g style={{ x: springX, y: springY }}>
          {CONSTELLATIONS.map((c, i) => (
            <ConstellationGroup
              key={c.name}
              data={c}
              active={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered((prev) => (prev === i ? null : prev))}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default ConstellationField;
