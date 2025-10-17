import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState, type FC } from "react";

interface EnvelopeProps {
  showLetter: () => Promise<void>;
  playMusic: () => void;
}
export const Envelope: FC<EnvelopeProps> = ({ showLetter, playMusic }) => {
  const controls = useAnimation();
  const flapControls = useAnimation();
  const waxControls = useAnimation();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) {
      controls.start({
        y: [0, -10, 0, -6, 0],
        rotate: [0, 1.5, -1.5, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }
  }, [clicked, controls]);

  const sequence = useCallback(async () => {
    // Step 1: Small takeoff rotation and scale
    await controls.start({
      x: ["0vw", "15vw", "-20vw", "10vw", "0vw"],
      y: ["0vh", "-20vh", "15vh", "-15vh", "0vh"],
      scale: [1, 1.3, 1.6, 1.9, 2.2],
      rotate: [0, 10, -10, 5, 0],
      transition: {
        duration: 4,
        ease: [0.42, 0, 0.58, 1], // smooth cubic-bezier
      },
    });

    // ✨ Land gracefully
    await controls.start({
      scale: 2.5,
      y: [0, -8, 10],
      transition: { duration: 1.2, ease: "easeOut" },
    });

    await waxControls.start({
      opacity: [1, 0],
      y: [0, 10],
      transition: { duration: 0.5, ease: "easeOut" },
    });

    // ⏳ Step 3: Pause for dramatic effect
    await new Promise((res) => setTimeout(res, 500));

    // 💌 Step 4: Flap opens
    flapControls.start({
      rotateX: [0, -140],
      transition: { duration: 1, ease: "easeInOut" },
    });
    await new Promise((res) => setTimeout(res, 500));
    controls.start({
      opacity: [100, 0],
      transition: { duration: 1, ease: "easeOut" },
    });
    await new Promise((res) => setTimeout(res, 1000));
    // 💫 Step 5: Letter slides out
    await showLetter();
  }, [controls, flapControls, waxControls, showLetter]);

  useEffect(() => {
    if (clicked) {
      sequence();
    }
  }, [clicked, controls, sequence]);

  return (
    <motion.div
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      animate={controls}
      onClick={() => {
        playMusic();
        setClicked(true);
      }}
      className="z-20"
    >
      <div className="relative  w-30 h-20 cursor-pointer ">
        {/* BACK PANEL (behind everything) */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-400 rounded-sm shadow-lg" />
        {/* TOP FLAP */}
        <motion.div>
          <motion.div
            animate={flapControls}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-100 to-amber-300 border border-amber-400 shadow-md origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformStyle: "preserve-3d",
            }}
          />
          {/* WAX SEAL */}
          <motion.div
            animate={waxControls}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-red-500 rounded-full"
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
