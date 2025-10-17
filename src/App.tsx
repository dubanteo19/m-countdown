import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import "./App.css";
import { CountDown } from "./components/app/CountDown";
import { Envelope } from "./components/app/Envelope";
import { Letter } from "./components/app/Letter";
import { SparkleBackground } from "./components/app/SparkleBackgroundBase";
import LiquidText from "./components/app/liquid-text";
function App() {
  const [showLetter, setShowLetter] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleShowLetter = async () => {
    setShowLetter(true);
  };
  return (
    <div className="min-h-screen  flex-center flex-col  relative overflow-hidden bg-black p-4 ">
      <SparkleBackground />
      <LiquidText />
      <AnimatePresence mode="wait">
        {!showLetter && (
          <Envelope
            key="envelope"
            showLetter={handleShowLetter}
            playMusic={() => {
              if (audioRef.current) {
                audioRef.current.volume = 1.0;
                audioRef.current.play();
              }
            }}
          />
        )}
        {showLetter && <Letter key="letter" />}
      </AnimatePresence>
      <CountDown />
      <audio ref={audioRef}>
        <source src="/bg.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
