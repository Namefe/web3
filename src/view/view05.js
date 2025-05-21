import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SupportHover = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1 }}
    >
      {/* SVG 병원 장식 아이콘 */}
      <svg
        className="absolute top-10 left-10 w-8 h-8 text-red-500 animate-bounce"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 2v4H5v4H1v4h4v4h4v4h4v-4h4v-4h4v-4h-4V6h-4V2H9z" />
      </svg>

      <svg
        className="absolute bottom-12 right-10 w-6 h-6 text-blue-600 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h18v2H3V3zm1 4h16v13H4V7zm4 3v2h8v-2H8z" />
      </svg>

      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.img
          src="/check.png"
          alt="중증외상센터 홍보 전단지"
          className="w-[300px] h-[400px] object-contain"
            animate={{
            rotate: [-2, 2, -2],  
            skewX: [0, 2, 0]     
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {isHovering && (
          <div
            className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-base font-semibold shadow-xl animate-pulse"
            style={{
              width: "120px",
              height: "120px",
              left: cursorPos.x - 60,
              top: cursorPos.y - 60,
              boxShadow: "0 0 20px rgba(153, 102, 255, 0.5)",
              transform: "scale(1.05)",
              backdropFilter: "blur(4px)",
            }}
          >
            지원하기
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default SupportHover;
