import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const View03 = () => {
  const [showRelation, setShowRelation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef(null);
  const sectionTopRef = useRef(0);

  const documents = [
    { img: "/scrollimage1.png", description: "첫 번째 이야기: 주인공의 귀환" },
    { img: "/scrollimage2.png", description: "두 번째 이야기: 팀과의 갈등" },
    { img: "/scrollimage3.png", description: "세 번째 이야기: 위기의 수술" },
    { img: "/scrollimage4.png", description: "네 번째 이야기: 감정의 변화" },
    { img: "/scrollimage5.png", description: "다섯 번째 이야기: 새로운 출발" },
  ];

  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const section = document.getElementById("section03");
    if (section) sectionTopRef.current = section.offsetTop;
  }, []);

  const boxScale = useTransform(scrollY, (y) => {
    const scrollOffset = y - sectionTopRef.current - window.innerHeight * 0.3;
    if (scrollOffset < 0) return 1;
    return scrollOffset < 300 ? 1 + scrollOffset / 600 : 1.5;
  });

  const textOpacity = useTransform(scrollY, (y) => {
    const showStart = sectionTopRef.current + 300;
    const showEnd = sectionTopRef.current + 400;
    return y < showStart ? 0 : y > showEnd ? 1 : (y - showStart) / 100;
  });

  const rawIndex = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8, 0.95], [0, 1, 2, 3, 4]);
  useMotionValueEvent(rawIndex, "change", (latest) => {
    setCurrentIdx(Math.floor(latest));
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("section03");
      if (!section) return;
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      if (scrollTop > sectionTop - window.innerHeight * 0.3) {
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

  return (
    <section
      ref={sectionRef}
      id="section03"
      className="w-screen h-[600vh] relative bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showRelation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/board2.png'})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <motion.div className="hidden lg:block absolute left-[23%] top-[18%] text-white text-2xl font-bold">생명의 은인</motion.div>
          <motion.div className="hidden lg:block absolute left-[62%] top-[31%] text-white text-2xl font-bold">조폭</motion.div>
          <motion.div className="hidden lg:block absolute left-[47%] top-[34%] text-white text-2xl font-bold">노예 1호</motion.div>
          <motion.div className="hidden lg:block absolute left-[73%] top-[19%] text-white text-2xl font-bold">낙하산 인사</motion.div>
          <motion.div className="hidden lg:block absolute left-[80%] top-[30%] text-white text-2xl font-bold">병원 적자의 원흉</motion.div>
          <motion.div className="hidden lg:block absolute left-[23%] top-[33%] text-white text-2xl font-bold">마취과의 유일한 희망</motion.div>
        </motion.div>
      )}

      {/* 박스 + 숫자 + 텍스트 */}
      <motion.div
        className="absolute left-1/2 bottom-[10%] -translate-x-1/2 z-50 flex items-center gap-4"
        style={{ scale: boxScale }}
      >
        <motion.div className="text-5xl font-bold text-white" style={{ opacity: textOpacity }}>
          {currentIdx + 1}
        </motion.div>

        <div className="w-[200px] h-[200px] flex justify-center items-center">
          <img src="/box.png" alt="box" className="w-full h-full object-contain" />
        </div>

        <motion.div className="w-[300px] text-lg text-white" style={{ opacity: textOpacity }}>
          {documents[currentIdx]?.description}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default View03;
