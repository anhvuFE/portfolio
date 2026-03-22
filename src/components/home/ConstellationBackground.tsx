import React, { useEffect, useRef } from "react";

const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particlesArray: Particle[] = [];
    const numberOfParticles = 60;
    const colors = [
      "rgba(14, 173, 223, 0.5)",
      "rgba(14, 173, 223, 0.3)",
      "rgba(14, 140, 223, 0.4)",
    ];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    };

    // Throttle mouse position updates to ~60fps
    let lastMouseUpdate = 0;
    const MOUSE_THROTTLE_MS = 16;

    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < MOUSE_THROTTLE_MS) return;
      lastMouseUpdate = now;
      mouse.x = event.x;
      mouse.y = event.y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Grid-based spatial partitioning for O(n) neighbor lookups
    // instead of O(n^2) brute-force distance checks.
    const MAX_CONNECTION_DISTANCE = 150; // baseDistance(100) + max mouseInfluence boost(50)
    const CELL_SIZE = MAX_CONNECTION_DISTANCE;

    const connect = () => {
      // Build spatial grid each frame
      const grid = new Map<string, number[]>();

      for (let i = 0; i < particlesArray.length; i++) {
        const cellX = Math.floor(particlesArray[i].x / CELL_SIZE);
        const cellY = Math.floor(particlesArray[i].y / CELL_SIZE);
        const key = `${cellX},${cellY}`;
        const cell = grid.get(key);
        if (cell) {
          cell.push(i);
        } else {
          grid.set(key, [i]);
        }
      }

      // Only check particles in same cell or adjacent cells
      const visited = new Set<string>();

      grid.forEach((indices, key) => {
        const parts = key.split(",");
        const cx = Number(parts[0]);
        const cy = Number(parts[1]);

        // Check this cell and 8 neighbors
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighborKey = `${cx + dx},${cy + dy}`;

            // Create a directional pair key to avoid checking the same pair of cells twice
            const pairKey =
              key < neighborKey
                ? `${key}|${neighborKey}`
                : `${neighborKey}|${key}`;
            if (key !== neighborKey && visited.has(pairKey)) continue;
            if (key !== neighborKey) visited.add(pairKey);

            const neighborIndices = grid.get(neighborKey);
            if (!neighborIndices) continue;

            // Compare particles between current cell and neighbor cell
            const isSameCell = key === neighborKey;
            for (let ai = 0; ai < indices.length; ai++) {
              const a = indices[ai];
              const pa = particlesArray[a];
              const startBi = isSameCell ? ai + 1 : 0;

              for (let bi = startBi; bi < neighborIndices.length; bi++) {
                const b = neighborIndices[bi];
                const pb = particlesArray[b];

                const pdx = pa.x - pb.x;
                const pdy = pa.y - pb.y;
                const distSq = pdx * pdx + pdy * pdy;

                // Quick reject using squared distance before computing sqrt
                const maxPossibleDist = MAX_CONNECTION_DISTANCE;
                if (distSq > maxPossibleDist * maxPossibleDist) continue;

                const distance = Math.sqrt(distSq);
                const baseDistance = 100;

                const mouseInfluence =
                  mouse.x !== null && mouse.y !== null
                    ? Math.max(
                        0,
                        1 -
                          Math.sqrt(
                            Math.pow(mouse.x - (pa.x + pb.x) / 2, 2) +
                              Math.pow(mouse.y - (pa.y + pb.y) / 2, 2)
                          ) / mouse.radius
                      )
                    : 0;

                const maxDistance = baseDistance + mouseInfluence * 50;

                if (distance < maxDistance) {
                  const opacity = 1 - distance / maxDistance;
                  ctx!.strokeStyle = `rgba(14, 173, 223, ${opacity * 0.8})`;
                  ctx!.lineWidth = 1;
                  ctx!.beginPath();
                  ctx!.moveTo(pa.x, pa.y);
                  ctx!.lineTo(pb.x, pb.y);
                  ctx!.stroke();
                }
              }
            }
          }
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default ConstellationBackground;
