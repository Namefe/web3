import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const neonImages = [
  {src: process.env.PUBLIC_URL + "/sec5_01.png", alt: "주사기"},
  {src: process.env.PUBLIC_URL + "/sec5_02.png",alt: "앰뷸런스"},
  {src: process.env.PUBLIC_URL + "/sec5_03.png",alt: "병원"},
  {src: process.env.PUBLIC_URL + "/sec5_04.png",alt: "병원"},
  {src: process.env.PUBLIC_URL + "/sec5_05.png",alt: "병원"},
  {src: process.env.PUBLIC_URL + "/sec5_06.png",alt: "병원"},
];

const SupportHover = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const svgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: svgRef, offset: ["start end", "center start"] });
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="w-full h-[100vh] flex items-center justify-center bg-gray-100 relative"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1 }}
    >
      <motion.svg
        ref={svgRef}
        viewBox="0 0 450 50"
        className="absolute top-[10%] left-0 w-full h-auto"
        style={{ opacity: opacity2 }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="black"
        strokeWidth="2"
      >
        <g transform="translate(40, 10)">
          <motion.path d="M0.4 4V1H22.2V4H13.1V30H9.6V4H0.4Z" transform="translate(-20, 0) rotate(-2)" />
          <motion.path d="M0 0H10C15 0 15 10 10 10H0Z M0 10L10 30" transform="translate(15, 2) rotate(3)" />
          <motion.path d="M10 0L0 30H5L10 15L15 30H20L10 0Z" transform="translate(50, -1) rotate(-4)" />
          <motion.path d="M0 0V20C0 25 5 30 10 30C15 30 20 25 20 20V0" transform="translate(85, 3) rotate(2)" />
          <motion.path d="M0 30V0L10 15L20 0V30" transform="translate(120, 1) rotate(-3)" />
          <motion.path d="M10 0L0 30H5L10 15L15 30H20L10 0Z" transform="translate(155, -2) rotate(4)" />
          <motion.path d="M20 5C15 0 5 0 0 15C5 30 15 30 20 25" transform="translate(190, 2) rotate(-2)" />
          <motion.path d="M20 0H0V30H20M0 15H15" transform="translate(225, 0) rotate(3)" />
          <motion.path d="M0 30V0L20 30V0" transform="translate(260, -1) rotate(-1)" />
          <motion.path d="M0.4 4V1H22.2V4H13.1V30H9.6V4H0.4Z" transform="translate(295, 1) rotate(1)" />
          <motion.path d="M20 0H0V30H20M0 15H15" transform="translate(330, 4) rotate(-3)" />
          <motion.path d="M0 0H10C15 0 15 10 10 10H0Z M0 10L10 30" transform="translate(365, 3) rotate(-2)" />
        </g>
      </motion.svg>

      <div
        className="relative w-[300px] h-[400px]"
        
      >
        <motion.img
          src="/check.png"
          onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
          alt="중증외상센터 홍보 전단지"
          className="w-full h-full relative top-[100px] object-contain hover:cursor-pointer"
          animate={{
            rotate: [-2, 2, -2],
            skewX: [0, 2, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {neonImages.map((item, index) => {
          const positions = [
            { top: "120px", left: "-220px" },
            { top: "120px", right: "-100px" },
            { top: "300px", left: "-100px" },
            { top: "200px", left: "500px" },
            { top: "300px", left: "360px" },
            { top: "200px", left: "-230px" },
          ];

          return (
            <motion.img
              key={index}
              src={item.src}
              alt={item.alt}
              className="absolute w-[100px] h-[100px] object-contain"
              style={positions[index]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.5,
                duration: 1,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {isHovering && (
        <div
          className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-yellow-500 to-pink-500 text-white text-base font-semibold shadow-xl animate-pulse"
          style={{
            width: "120px",
            height: "120px",
            left: cursorPos.x - 60,
            top: cursorPos.y - 60,
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
            transform: "scale(1.05)",
            backdropFilter: "blur(4px)",
          }}
        >
          지원하기 Click!
        </div>
      )}
    </motion.section>
  );
};

export default SupportHover;
