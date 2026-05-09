import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number | null = null;
    let pendingFrame = false;

    const tick = () => {
      pendingFrame = false;
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;

      // Stop animating once we're effectively at rest
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        frameId = null;
        return;
      }
      frameId = requestAnimationFrame(tick);
    };

    const requestTick = () => {
      if (pendingFrame || frameId !== null) return;
      pendingFrame = true;
      frameId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      requestTick();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Box
      ref={glowRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14, 173, 223, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        display: { xs: "none", md: "block" }
      }}
    />
  );
};

export default CursorGlow;
