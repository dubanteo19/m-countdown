import { motion } from "framer-motion";

export default function LiquidText() {
  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-[150px]  overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: [0, 10,0] }}
      transition={{ repeat: Infinity, ease: "easeInOut", duration: 2.2 }}
    >
      <svg
        viewBox="0 0 1200 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* The text acts as a mask */}
          <mask id="text-mask">
            <text
              x="50%"
              y="50%"
              dy=".35em"
              textAnchor="middle"
              fontSize="160"
              fontWeight="bold"
              fontFamily="sans-serif"
              fill="white"
            >
              GRADUATION
            </text>
          </mask>

          <linearGradient id="liquidGradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#22c55e" /> {/* emerald green */}
            <stop offset="50%" stopColor="#86efac" /> {/* soft mint glow */}
            <stop offset="100%" stopColor="#16a34a" /> {/* rich forest green */}
          </linearGradient>
        </defs>

        {/* The moving liquid inside text */}
        <g mask="url(#text-mask)">
          {/* Animated gradient rectangle moving horizontally */}
          <motion.rect
            width="200%"
            height="100%"
            fill="url(#liquidGradient)"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Soft wavy overlay for realistic movement */}
          <motion.path
            fill="rgba(255,255,255,0.15)"
            d="M0 180 Q 150 160 300 180 T 600 180 T 900 180 T 1200 180 V300 H0 Z"
            animate={{
              d: [
                "M0 180 Q 150 160 300 180 T 600 180 T 900 180 T 1200 180 V300 H0 Z",
                "M0 180 Q 150 220 300 180 T 600 180 T 900 180 T 1200 180 V300 H0 Z",
                "M0 180 Q 150 100 300 180 T 600 180 T 900 180 T 1200 180 V300 H0 Z",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
