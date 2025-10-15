import { motion, type TargetAndTransition } from "framer-motion";
import { useEffect, useState, type FC } from "react";

interface LetterProps {
  control: TargetAndTransition;
}
const resolveName = (id: number): string => {
  const recipients = {
    1: "Du Ban Teo",
    2: "Harry Lê",
    3: "Thanh Thúy",
  };
  return recipients[id] || "Bạn thân mến";
};
export const Letter: FC<LetterProps> = ({ control }) => {
  const [recipient, setRecipient] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const name = resolveName(Number(id));
    setRecipient(name);
  }, []);
  return (
    <motion.div
      animate={control}
      initial={{opacity:1}}
      className="absolute w-[320px] md:w-[800px]   left-1/2 -translate-x-1/2 p-4  bg-white border border-amber-300 rounded-sm shadow-lg  text-gray-700 font-serif text-sm z-10"
    >
      <h2 className="text-xl font-bold mb-4 text-center">🎓 THƯ MỜI TỐT NGHIỆP 🎓</h2>
      <p className="mb-2">
        Kính gửi <span className="font-semibold">{recipient}</span>,
      </p>
      <p className="mb-4">
        Tui rất vui mừng mời bạn tham dự lễ tốt nghiệp. Sự hiện diện của bạn sẽ
        làm ngày đặc biệt này thêm phần ý nghĩa.
      </p>
      <p className="mb-2">📅 Thời gian: 21 tháng 10, 2025</p>
      <p className="mb-2">📍 Địa điểm: Trường Đại học Nông Lâm TP.HCM</p>
      <p className="mt-4">Tui rất mong được chào đón bạn!</p>
      <p className="mt-4 font-semibold">Trân trọng,</p>
      <p>Du Ban Teo</p>
    </motion.div>
  );
};
