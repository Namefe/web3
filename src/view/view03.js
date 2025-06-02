import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const View03 = () => {
  const [showRelation, setShowRelation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isFixed, setIsFixed] = useState(true);
const [boxStopY, setBoxStopY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("section03");
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollTop > sectionTop - window.innerHeight * 0.4) {
        setShowRelation(true);
      } else {
        setShowRelation(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImage =
  `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' }); // 조금 일찍 감지됨

    const sectionRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"],
});
useEffect(() => {
  const section04 = document.getElementById("section04");
  if (!section04) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const section04Top = section04.offsetTop;

    if (scrollY + window.innerHeight / 2 >= section04Top) {
      setIsFixed(false); // 고정 해제
      setBoxStopY(section04Top - window.innerHeight / 2); // 박스 멈출 위치 기억
    } else {
      setIsFixed(true); // 계속 fixed 상태 유지
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

    const boxScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
const boxY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
const boxOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
     ref={sectionRef}
      id="section03"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
      className="w-screen h-[300vh] relative"
    >
      {showRelation && (
        <>
      <motion.div
      ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/board2.png'})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
          <motion.div
            className="hidden lg:block absolute left-[23%] top-[18%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            생명의 은인 
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[62%] top-[31%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            조폭
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[47%] top-[34%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            노예 1호
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[73%] top-[19%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            낙하산 인사
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[80%] top-[30%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            병원 적자의 원흉
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[23%] top-[33%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            마취과의 유일한 희망
          </motion.div>
          </motion.div>
        </>
      )}
<motion.div

  className={`z-50 w-[200px] h-[200px] absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none `}
>
  <img
    src="/box.png"
    alt="box"
    className="w-full h-full object-contain"
  />
</motion.div>
    </section>
  );
};

export default View03;
