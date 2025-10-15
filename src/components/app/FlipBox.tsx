import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

interface FlipBoxProps {
  label: string;
  value: number;
  color?: string;
}
export const FlipBox: FC<FlipBoxProps> = ({
  value,
  label,
  color = "#ffffff",
}) => (
  <div className="text-center">
    <div
      className="flex-center font-serif relative w-[70px] md:w-[100px] h-[80px] md:h-[120px] overflow-hidden rounded-2xl text-[30px] md:text-[36px] shadow-xl/20"
      style={{ backgroundColor: color }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full text-center"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <div className="mt-2 text-white text-lg">{label}</div>
  </div>
);
