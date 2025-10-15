import { motion, useAnimation } from "framer-motion";
import "./App.css";
import { CountDown } from "./components/app/CountDown";
import LiquidText from "./components/app/liquid-text";
import { SparkleBackground } from "./components/app/SparkleBackgroundBase";
import { Letter } from "./components/app/Letter";
import { Envelope } from "./components/app/Envelope";
function App() {
  const letterControls = useAnimation();
  const showLetter = async () => {
    await letterControls.start({
      y: ["50%", "-40%"],
      opacity: [0, 1],
      transition: { duration: 1.2, ease: "easeOut" },
    });
  };
  return (
    <motion.div className="min-h-screen  flex-center flex-col  relative overflow-hidden bg-black p-4 ">
      <SparkleBackground />
      <Envelope showLetter={showLetter} />
      <Letter control={letterControls} />
      <LiquidText />
      <CountDown />
    </motion.div>
  );
}

export default App;
