import * as React from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import VietnamMap, { HANOI_PIN } from "./VietnamMap";

/**
 * Cinematic first-visit intro. Beats, each with a guiding caption:
 *   galaxy → press Enter → fly to a 3D WebGL globe (cobe) that spins and settles
 *   with Vietnam facing us → cross-fade to a vector map of Vietnam → zoom into
 *   Hanoi → dissolve into the portfolio.
 * Skippable any time (button / Esc); skipped entirely for reduced motion (the
 * parent decides whether to mount this at all).
 */

interface GalaxyIntroProps {
  onFinish: () => void;
}

const HANOI: [number, number] = [21.0278, 105.8342];
const deg2rad = (d: number): number => (d * Math.PI) / 180;

// cobe convention: a longitude faces the viewer when phi = 1.5π − longitude,
// and theta is the latitude. Add whole turns so we spin in before settling.
const FACE_HANOI = 1.5 * Math.PI - deg2rad(HANOI[1]);
const TARGET_PHI = FACE_HANOI + Math.PI * 2 * 3;
const TARGET_THETA = deg2rad(HANOI[0]);

const SPIN_MS = 3400;
const MAP_HOLD_MS = 1100;
const MAP_ZOOM_MS = 2000;
const REVEAL_MS = 1500;

const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

type Phase = "galaxy" | "earth" | "map" | "reveal" | "done";

function generateStars(count: number, spread: number): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * spread) - spread / 2;
    const y = Math.floor(Math.random() * spread) - spread / 2;
    shadows.push(`${x}px ${y}px #ffffff`);
  }
  return shadows.join(", ");
}

const GalaxyIntro: React.FC<GalaxyIntroProps> = ({ onFinish }) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = React.useState<Phase>("galaxy");
  const [caption, setCaption] = React.useState("");
  const [mapZoom, setMapZoom] = React.useState(false);
  const [size, setSize] = React.useState(0);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const phiRef = React.useRef(0);
  const scaleRef = React.useRef(1);
  const aliveRef = React.useRef(true);
  const startedRef = React.useRef(false);
  const finishedRef = React.useRef(false);

  const [starsFar] = React.useState(() => generateStars(400, 3000));
  const [starsNear] = React.useState(() => generateStars(150, 3000));

  const finish = React.useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    aliveRef.current = false;
    setPhase("done");
    window.setTimeout(onFinish, 650);
  }, [onFinish]);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  React.useEffect(() => {
    // Set true on (re)mount: under StrictMode the mount→cleanup→mount cycle
    // would otherwise leave this stuck false and abort the whole timeline.
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    const compute = () =>
      setSize(Math.min(window.innerWidth * 0.92, window.innerHeight * 0.92, 560));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Create the globe once sized, then draw each frame from the animated refs.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: TARGET_THETA,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.24, 0.28, 0.34],
      markerColor: [0.055, 0.68, 0.87],
      glowColor: [0.06, 0.22, 0.34],
      markers: [{ location: HANOI, size: 0.09 }],
      scale: 1,
      offset: [0, 0],
    });

    let raf: number;
    const render = () => {
      globe.update({
        phi: phiRef.current,
        theta: TARGET_THETA,
        scale: scaleRef.current,
        width: size * dpr,
        height: size * dpr,
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, [size]);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  // Spin from phi 0 → TARGET_PHI (fast, decelerating), landing on Hanoi.
  const runSpin = () =>
    new Promise<void>((resolve) => {
      const t0 = performance.now();
      const step = (now: number) => {
        if (!aliveRef.current) return resolve();
        const t = Math.min((now - t0) / SPIN_MS, 1);
        phiRef.current = TARGET_PHI * easeOutCubic(t);
        scaleRef.current = 1 + 0.25 * t;
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

  const startLaunch = React.useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    setPhase("earth");
    setCaption("Somewhere in the universe…");
    const spin = runSpin(); // start rotating immediately
    window.setTimeout(() => {
      if (aliveRef.current) setCaption("…following one developer home");
    }, 1800);

    await spin;
    if (!aliveRef.current) return;

    setPhase("map");
    setCaption("Vietnam");
    await sleep(MAP_HOLD_MS);
    if (!aliveRef.current) return;

    setMapZoom(true);
    await sleep(MAP_ZOOM_MS - 700);
    if (!aliveRef.current) return;
    setCaption("Hanoi");
    await sleep(700);
    if (!aliveRef.current) return;

    setPhase("reveal");
    setCaption("Vũ Xuân Anh — Full Stack Developer");
    await sleep(REVEAL_MS);
    if (!aliveRef.current) return;

    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish]);

  const skip = React.useCallback(() => finish(), [finish]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  const showGlobe = phase === "earth";
  const showMap = phase === "map" || phase === "reveal";
  const launched = phase !== "galaxy";
  const originX = (HANOI_PIN.x / 1024) * 100;
  const originY = (HANOI_PIN.y / 1024) * 100;

  const centerLayer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Intro animation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 45%, #0b1a2b 0%, #060912 55%, #02030a 100%)",
      }}
    >
      {/* Starfield — warps toward the centre and fades as we launch. */}
      <motion.div
        aria-hidden
        initial={{ scale: 1, opacity: 1 }}
        animate={launched ? { scale: 2.2, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeIn" }}
        style={centerLayer}
      >
        <div style={{ position: "absolute", width: 1, height: 1, borderRadius: "50%", boxShadow: starsFar }} />
        <div style={{ position: "absolute", width: 2, height: 2, borderRadius: "50%", boxShadow: starsNear }} />
      </motion.div>

      {/* Globe — flex-centred; motion only scales/fades the inner box. */}
      <div style={centerLayer}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            phase === "galaxy"
              ? { scale: 0.85, opacity: 0 }
              : showGlobe
              ? { scale: 1, opacity: 1 }
              : { scale: 1.4, opacity: 0 }
          }
          transition={{ duration: showGlobe ? 0.9 : 0.8, ease: "easeOut" }}
          style={{ width: size, height: size }}
        >
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        </motion.div>
      </div>

      {/* Vietnam map — fades in, holds, then zooms into the Hanoi pin. */}
      <div style={centerLayer}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={
            !showMap
              ? { opacity: 0, scale: 1.1 }
              : mapZoom
              ? { opacity: phase === "reveal" ? 0 : 1, scale: 7 }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: mapZoom ? MAP_ZOOM_MS / 1000 : 0.9,
            ease: mapZoom ? [0.6, 0, 0.4, 1] : "easeOut",
          }}
          style={{ width: size, height: size, transformOrigin: `${originX}% ${originY}%` }}
        >
          <VietnamMap />
        </motion.div>
      </div>

      {/* Guiding caption. */}
      <AnimatePresence mode="wait">
        {caption && phase !== "done" && (
          <motion.div
            key={caption}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: phase === "reveal" ? "46%" : "14%",
              textAlign: "center",
              padding: "0 24px",
              color: "#e6edf3",
              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              letterSpacing: "0.14em",
              textTransform: phase === "reveal" ? "none" : "uppercase",
              fontSize:
                phase === "reveal"
                  ? "clamp(1.1rem, 3vw, 1.9rem)"
                  : "clamp(0.85rem, 2vw, 1.15rem)",
              fontWeight: phase === "reveal" ? 700 : 500,
              textShadow: "0 0 24px rgba(14,173,223,0.55)",
            }}
          >
            {caption}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enter button — galaxy phase only. */}
      {phase === "galaxy" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.button
            onClick={startLaunch}
            autoFocus
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "relative",
              width: 168,
              height: 168,
              borderRadius: "50%",
              cursor: "pointer",
              color: "#0eaddf",
              background:
                "radial-gradient(circle at 50% 45%, rgba(14,173,223,0.18), rgba(6,9,18,0.6))",
              border: "1px solid rgba(14,173,223,0.5)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <motion.span
              aria-hidden
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              style={{ position: "absolute", inset: -1, borderRadius: "50%", border: "1px solid rgba(14,173,223,0.6)" }}
            />
            <span style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.1em" }}>ENTER</span>
            <span style={{ fontSize: "0.62rem", color: "#8b949e", letterSpacing: "0.12em" }}>
              BEGIN THE JOURNEY
            </span>
          </motion.button>
        </div>
      )}

      {/* Skip — available until done. */}
      {phase !== "done" && (
        <button
          onClick={skip}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            padding: "8px 16px",
            borderRadius: 999,
            cursor: "pointer",
            color: "#8b949e",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: '"Fira Code", monospace',
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          Skip intro →
        </button>
      )}
    </motion.div>
  );
};

export default GalaxyIntro;
