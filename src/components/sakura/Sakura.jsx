import React, { useEffect, useRef } from "react";
import "./sakura.css";

const Sakura = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    startCanvasAnimation();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const startCanvasAnimation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const numParticles = 25;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.6 + 0.4,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmount: Math.random() * 2 + 1
      });
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position with sway effect
        particle.x += particle.vx + Math.sin(timestamp * particle.swaySpeed) * particle.swayAmount * 0.1;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Reset if out of bounds
        if (particle.y > canvas.height + 20) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width + 20) {
          particle.x = -20;
        } else if (particle.x < -20) {
          particle.x = canvas.width + 20;
        }

        // Draw sakura petal
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;

        // Create gradient for petal
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.7, '#5dade2');
        gradient.addColorStop(1, '#3498db');

        // Draw petal shape (sakura-like)
        ctx.fillStyle = gradient;
        ctx.beginPath();

        // Create sakura petal shape
        const petalSize = particle.size;
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const x = Math.cos(angle) * petalSize * (i % 2 === 0 ? 1 : 0.4);
          const y = Math.sin(angle) * petalSize * (i % 2 === 0 ? 1 : 0.4);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();

        // Add subtle shadow
        ctx.shadowColor = 'rgba(52, 152, 219, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.restore();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const footer = canvas.closest('.footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sakura"
      className="sakura-canvas"
      width={800}
      height={400}
    />
  );
};

export default Sakura;