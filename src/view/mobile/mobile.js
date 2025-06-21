import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const Mobile = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [scatterRatio, setScatterRatio] = useState(0);

  const progress = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const boxScale = useTransform(scrollYProgress, [0.3, 0.35], [0.6, 1]);
  const showBox = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);


  const perDoc = 1 / 5;
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(Math.floor((p - 0.4) / perDoc), 4);
    if (idx >= 0 && idx <= 4) setCurrentIdx(idx);
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.min(Math.max((v - 0.02) / (0.1 - 0.02), 0), 1);
    setScatterRatio(clamped);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickImagePositions = [
    { x: -120, y: 0 },
    { x: -60, y: 0 },
    { x: 0, y: 0 },
    { x: 60, y: 0 },
    { x: 120, y: 0 },
    { x: 180, y: 0 },
    { x: 240, y: 0 }
  ];

  const initialClickImagePositions = [
    { x: -150, y: -100 }, { x: 0, y: 100 }, { x: 100, y: -120 },
    { x: -180, y: 200 }, { x: 160, y: 50 }, { x: -100, y: 180 }, { x: 200, y: -30 }
  ];

  const line2 = [
    "/넷2.png", "/플2.png", "/릭2.png", "/스2.png", "/시2.png", "/리2.png", "/즈2.png",
    "/중.png", "/증.png", "/외.png", "/상.png", "/센.png", "/터.png"
  ];

  const initialPositionsLine2 = [
    { x: -100, y: -100 }, { x: 0, y: 100 }, { x: 50, y: -100 },
    { x: -120, y: 300 }, { x: 140, y: 50 }, { x: 160, y: -60 },
    { x: 200, y: 250 }, { x: -200, y: 200 }, { x: -160, y: 180 },
    { x: 120, y: -30 }, { x: 280, y: 300 }, { x: -50, y: 250 },
    { x: 200, y: 0 },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-[800vh] bg-[#e1d4c4] overflow-hidden">

{/* line2 + 설명 텍스트 묶음 */}
<div className="fixed top-[35%] z-30 w-full flex flex-col items-center pointer-events-none">
  {/* 위쪽 텍스트 */}
  <motion.div
    style={{ opacity: progress }}
    className="mb-2 text-center text-xl font-bold"
  >
    우린계속뛰어야한다
  </motion.div>

  {/* line2 흩어졌다 정렬 */}
  <div className="relative w-[350px] h-[40px] flex justify-start items-center">
    {line2.map((src, i) => {
      const { x, y } = initialPositionsLine2[i];
      const alignX = i * 26;
      const currentX = x * (1 - scatterRatio) + alignX * scatterRatio;
      const currentY = y * (1 - scatterRatio);
      const rotate = 10 * (1 - scatterRatio);

      return (
        <motion.div
          key={`line2-${i}`}
          style={{
            transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute"
        >
          <img src={process.env.PUBLIC_URL + src} className="w-6 h-6" />
        </motion.div>
      );
    })}
  </div>

  {/* 아래쪽 텍스트 */}
  <motion.div
    style={{ opacity: progress }}
    className="mt-2 text-center text-sm text-gray-700"
  >
    ONLYON <div className="text-red-500 font-bold">NETFLIX</div>
  </motion.div>
</div>


      {/* 박스 이미지 */}
      <motion.div className="sticky top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] z-40" style={{ scale: boxScale, opacity: showBox }}>
        <img src="/box.png" className="w-full h-full object-contain" />
      </motion.div>

      {/* 문서 애니메이션 */}
      <motion.div className="sticky top-[50%] -translate-y-1/2 z-50 flex flex-col items-center justify-center">
        <motion.img key={currentIdx} src={`/scrollimage${currentIdx + 1}.png`} className="w-[180px] h-[120px] object-cover mb-3 rounded shadow" />
        <div className="text-black font-bold text-xl">{currentIdx + 1}</div>
        <div className="text-center text-black text-sm mt-2">문서 설명이 여기에 들어갑니다</div>
      </motion.div>

      <div onClick={scrollToTop} className="z-[9999] fixed bottom-4 right-4 flex flex-col items-center hover:cursor-pointer gap-1">
        <img src={process.env.PUBLIC_URL + '/top.png'} alt="top" className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] object-contain" />
        <p className="text-[10px] sm:text-[12px] md:text-[14px] text-black">TOP</p>
      </div>
    </section>
  );
};

export default Mobile;