import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type FC } from "react";

interface Friend {
  id: number;
  name: string;
}
const resolveName = (id: number): string => {
  const recipients: Friend[] = [
    { id: 1104, name: "Hary Lê" },
    { id: 1807, name: "Thanh Thúy" },
    { id: 2204, name: "Minh Tâm" },
    { id: 2809, name: "Minh Hiếu" },
    { id: 2405, name: "Thị Thiết" },
    { id: 2607, name: "Anh Thư" },
    { id: 2503, name: "Em iuuuu" },
  ];
  return recipients.find((f) => f.id == id)?.name ?? "Bạn thân mến";
};

export const Letter: FC = () => {
  const [recipient, setRecipient] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const name = resolveName(Number(id));
    setRecipient(name);
  }, []);

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.25, duration: 1 },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1, y: 50, scale: 1, filter: "blur(0px)" }}
        initial={{ opacity: 0, scale: 0.8, y: 0, filter: "blur(6px)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute w-[320px] z-15  md:w-[800px] left-1/2 -translate-x-1/2 p-4 md:p-8 bg-[url('/bg.jpg')] rounded-lg shadow-2xl text-gray-900 font-serif text-base "
        style={{
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
        }}
      >
        {/* Floating subtle animation */}
        <motion.div>
          <motion.h2
            className="text-xl md:text-4xl font-bold mb-4 text-center text-red-900"
            initial={{ opacity: 0.8, y: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🎓 THIỆP MỜI TỐT NGHIỆP 🎓
          </motion.h2>

          {[
            <>
              Kính gửi <span className="font-semibold">{recipient}</span>,
            </>,
            <>
              Tui rất vui mừng mời bạn tham dự lễ tốt nghiệp. Sự hiện diện của
              bạn sẽ làm ngày đặc biệt này thêm phần ý nghĩa.
            </>,
            <>
              Thời gian: <strong>21 tháng 10, 2025</strong>
            </>,
            <>
              Địa điểm: <strong>Trường Đại học Nông Lâm TP.HCM</strong>
            </>,
            <span className="text-2xl text-red-900 ">
              Tui rất mong được chào đón bạn!
            </span>,
            <>
              <span className="font-semibold">Trân trọng,</span> <br /> Du Ban
              Teo
            </>,
          ].map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
        <motion.img
          src="/avatar.jpeg"
          animate={{ rotate: [0, 360] }}
          initial={{ rotate: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
          className="rounded-full size-12 md:size-20 absolute right-[50px] md:right-[150px] bottom-[25px] md:bottom-[40px]"
        />
      </motion.div>
    </AnimatePresence>
  );
};
