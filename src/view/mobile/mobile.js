import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const Mobile = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [currentIdx, setCurrentIdx] = useState(0);

  const progress = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const showHiddenText = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);
  const showVerticalImages = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const boxScale = useTransform(scrollYProgress, [0.3, 0.35], [0.6, 1]);
  const showBox = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);

  const perDoc = 1 / 5;
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(Math.floor((p - 0.4) / perDoc), 4);
    if (idx >= 0 && idx <= 4) setCurrentIdx(idx);
  });

  const line2 = [
    "/넷2.png", "/플2.png", "/릭2.png", "/스2.png", "/시2.png", "/리2.png", "/즈2.png",
    "/중.png", "/증.png", "/외.png", "/상.png", "/센.png", "/터.png"
  ];

  const [initialPositions, setInitialPositions] = useState([]);
  useEffect(() => {
    const positions = line2.map(() => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      r: (Math.random() - 0.5) * 40,
    }));
    setInitialPositions(positions);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative w-full h-[800vh] bg-[#e1d4c4] overflow-hidden">
      <motion.div style={{ opacity: progress }} className="sticky top-[9%] text-center text-xl font-bold z-20">
        중증외상센터
      </motion.div>

      <div className="sticky top-[10%] z-10 flex justify-center">
        <div className="relative w-full h-[100px] flex justify-center items-center flex-wrap gap-2">
          {line2.map((src, i) => {
            const val = progress.get();
            const ratio = val !== undefined ? (1 - val) : 1;
            const p = initialPositions[i] || { x: 0, y: 0, r: 0 };
            const transformStyle = {
              transform: `translate(${p.x * ratio}px, ${p.y * ratio}px) rotate(${p.r * ratio}deg)`
            };
            return (
              <motion.div key={i} style={transformStyle} className="inline-block">
                <img src={process.env.PUBLIC_URL + src} alt={`img${i}`} className="w-6 h-6" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div style={{ opacity: progress }} className="sticky top-[11%] text-center text-sm text-gray-700 z-20">
        한 줄로 모이면, 진짜 이야기가 시작된다.
      </motion.div>

      <motion.div className="sticky top-[20%] z-20 text-center text-black" style={{ opacity: showHiddenText }}>
        <div className="text-xl font-bold">숨겨진 문장 등장</div>
      </motion.div>

      <motion.div
        className="sticky top-[50%] translate-y-[-50%] z-30 flex flex-col items-center gap-4"
        style={{ opacity: showVerticalImages }}
      ></motion.div>

      <motion.div
        className="sticky top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] z-40"
        style={{ scale: boxScale, opacity: showBox }}
      >
        <img src="/box.png" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div className="sticky top-[50%] -translate-y-1/2 z-50 flex flex-col items-center justify-center">
        <motion.img
          key={currentIdx}
          src={`/scrollimage${currentIdx + 1}.png`}
          className="w-[180px] h-[120px] object-cover mb-3 rounded shadow"
        />
        <div className="text-black font-bold text-xl">{currentIdx + 1}</div>
        <div className="text-center text-black text-sm mt-2">문서 설명</div>
      </motion.div>

      <div 
    onClick={scrollToTop} 
    className="z-[9999] fixed bottom-4 right-4 flex flex-col items-center hover:cursor-pointer gap-1">
      <img
        src={process.env.PUBLIC_URL + '/top.png'}
        alt="top"
        className="
          w-[40px] h-[40px]
          sm:w-[50px] sm:h-[50px]
          md:w-[60px] md:h-[60px]
          lg:w-[70px] lg:h-[70px]
          xl:w-[80px] xl:h-[80px]
          object-contain
        "
      />
      <p className="text-[10px] sm:text-[12px] md:text-[14px] text-black">TOP</p>
    </div>
    </section>
  );
};

export default Mobile;
