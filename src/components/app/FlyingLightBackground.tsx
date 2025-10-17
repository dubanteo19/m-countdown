import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";


export default function FlyingLightBackground() {
  const [visible, setVisible] = useState(true);
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  // ✅ Define motion values in a fixed order (hooks-safe)
  const x0 = useMotionValue(Math.random() * width);
  const y0 = useMotionValue(Math.random() * height);
  const x1 = useMotionValue(Math.random() * width);
  const y1 = useMotionValue(Math.random() * height);
  const x2 = useMotionValue(Math.random() * width);
  const y2 = useMotionValue(Math.random() * height);
  const x3 = useMotionValue(Math.random() * width);
  const y3 = useMotionValue(Math.random() * height);
  const x4 = useMotionValue(Math.random() * width);
  const y4 = useMotionValue(Math.random() * height);

  const lights = [
    { x: x0, y: y0, size: 150 },
    { x: x1, y: y1, size: 180 },
    { x: x2, y: y2, size: 160 },
    { x: x3, y: y3, size: 200 },
    { x: x4, y: y4, size: 170 },
  ];

  useEffect(() => {
    const timers: number[] = [];

    // Animate each light independently
    lights.forEach((l) => {
      const move = () => {
        animate(l.x, Math.random() * width, {
          duration: 2.5,
          ease: "easeInOut",
        });
        animate(l.y, Math.random() * height, {
          duration: 2.5,
          ease: "easeInOut",
        });
      };
      move();
      timers.push(window.setInterval(move, 2500));
    });

    const fade = window.setTimeout(() => setVisible(false), 5000);

    return () => {
      timers.forEach(clearInterval);
      clearTimeout(fade);
    };
  }, [width, height]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      animate={{ backgroundColor: visible ? "#000000" : "#ffffff" }}
      transition={{ duration: 1.5 }}
    >
      {lights.map((l, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            x: l.x,
            y: l.y,
            width: l.size,
            height: l.size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.6), rgba(59,130,246,0))",
          }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}
    </motion.div>
  );
}
