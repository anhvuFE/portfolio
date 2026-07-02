import * as React from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";

/**
 * Ported from Animate UI's Gradient Text
 * (https://animate-ui.com/docs/texts/gradient) into inline styles. A gradient
 * sweeps horizontally across the text via `background-position`. Webkit
 * background-clip fallbacks are added so it renders in Chrome/Safari, and the
 * sweep is disabled when the user prefers reduced motion.
 */
type GradientTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
  gradient?: string;
  transition?: Transition;
};

function GradientText({
  text,
  style,
  gradient = "linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)",
  transition = { duration: 50, repeat: Infinity, ease: "linear" },
  ...props
}: GradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyle: React.CSSProperties = {
    backgroundImage: gradient,
    margin: 0,
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "700% 100%",
    backgroundPosition: "0% 0%",
  };

  return (
    <span
      data-slot="gradient-text"
      style={{ position: "relative", display: "inline-block", ...style }}
      {...props}
    >
      <motion.span
        style={baseStyle}
        initial={{ backgroundPosition: "0% 0%" }}
        animate={
          prefersReducedMotion
            ? { backgroundPosition: "0% 0%" }
            : { backgroundPosition: "500% 100%" }
        }
        transition={prefersReducedMotion ? { duration: 0 } : transition}
      >
        {text}
      </motion.span>
    </span>
  );
}

export { GradientText, type GradientTextProps };
