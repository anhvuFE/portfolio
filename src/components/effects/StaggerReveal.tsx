import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Wraps a list of block-level children and reveals them one after another
 * (fade + rise) when the wrapper mounts — used for the drawer section content,
 * which remounts each time a bento card is opened. Each direct child becomes a
 * motion item; the container drives the stagger. Reduced motion shows them
 * immediately.
 */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

interface StaggerRevealProps {
  children: React.ReactNode;
}

const StaggerReveal: React.FC<StaggerRevealProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  return (
    <motion.div
      variants={containerVariants}
      initial={prefersReducedMotion ? "show" : "hidden"}
      animate="show"
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerReveal;
