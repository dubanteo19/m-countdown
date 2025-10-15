import { useCallback, useEffect, useState } from "react";
import { FlipBox } from "./FlipBox";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export const CountDown = () => {
  const graduationDate = new Date("2025-10-21T11:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    seconds: 0,
    minutes: 0,
    days: 0,
    hours: 0,
  });

  const calcTimeLeft = useCallback(() => {
    const diff = graduationDate - new Date().getTime();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }, [graduationDate]);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [calcTimeLeft]);
  return (
    <div className="flex gap-2 justify-center">
      <FlipBox color="#B0CE88" label="Days" value={timeLeft.days} />
      <FlipBox label="Hours" value={timeLeft.hours} />
      <FlipBox label="Minutes" value={timeLeft.minutes} />
      <FlipBox label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};
