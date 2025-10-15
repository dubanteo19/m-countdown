import { memo, useMemo } from "react";
import { motion } from "framer-motion";

function SparkleBackgroundBase() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 1.5,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute size-2 bg-green-400 rounded-full opacity-70"
          initial={{ x: s.x, y: s.y, scale: s.scale, opacity: 0 }}
          animate={{ y: [s.y, -20], opacity: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

// 👇 Memoized — will never re-render again
export const SparkleBackground = memo(SparkleBackgroundBase);
