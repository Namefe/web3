import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const View03 = () => {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const [showBox, setShowBox] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [boxFullyFixed, setBoxFullyFixed] = useState(false);
  const [unlockScroll, setUnlockScroll] = useState(false);

  const documents = [
    { img: "/scrollimage1.png", description: "첫 번째 이야기: 주인공의 귀환" },
    { img: "/scrollimage2.png", description: "두 번째 이야기: 팀과의 갈등" },
    { img: "/scrollimage3.png", description: "세 번째 이야기: 위기의 수술" },
    { img: "/scrollimage4.png", description: "네 번째 이야기: 감정의 변화" },
    { img: "/scrollimage5.png", description: "다섯 번째 이야기: 새로운 출발" },
  ];

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const boxScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.8]);
  const boxY = useTransform(scrollYProgress, [0.5, 0.7], [200, 0]);
  const boxTextOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const translatey = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [30, 0, 0, -600]);
  const hideOpacity = useTransform(scrollYProgress, [0.93, 0.95], [1, 0]);

  const docMotion = documents.map((_, index) => {
    const total = documents.length;
    const sectionStart = 0.75;
    const sectionEnd = 0.95;
    const sectionSize = (sectionEnd - sectionStart) / total;

    const start = sectionStart + sectionSize * index;
    const mid = start + sectionSize * 0.6;
    const end = start + sectionSize;

    return {
      y: useTransform(scrollYProgress, [start, mid, end], [0, -400, 0]),
      opacity: useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]),
    };
  });

  useEffect(() => {
    if (boxFullyFixed && !unlockScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [boxFullyFixed, unlockScroll]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    setShowBox(y >= top && y <= bottom);
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (boxFullyFixed) {
      const startProgress = 0.75;
      const endProgress = 0.98;
      const docProgress = (progress - startProgress) / (endProgress - startProgress);
      const perDoc = 1 / documents.length;
      const idx = Math.floor(docProgress / perDoc);
      if (idx >= 0 && idx < documents.length) {
        setCurrentIdx(idx);
      }
    }

    setBoxFullyFixed(progress >= 0.7);
    if (progress >= 0.95) setUnlockScroll(true);
  });

  return (
    <section
      ref={sectionRef}
      id="section03"
      className="w-full h-[1000vh] relative overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/sec2bg.png"})`,
        backgroundSize: "cover",
      }}
    >
      <div ref={ref} className="w-full h-full">
        <motion.div
          className="w-screen h-screen fixed top-0 left-0 z-10 overflow-hidden"
          style={{ opacity, y: translatey }}
        >
          <motion.img
            src={process.env.PUBLIC_URL + "/board2.png"}
            alt="board"
            className="w-full h-full object-contain"
          />
          <motion.div className="hidden lg:block absolute left-[22%] top-[5%] text-white text-2xl font-bold">생명의 은인</motion.div>
          <motion.div className="hidden lg:block absolute left-[62%] top-[12%] text-white text-2xl font-bold">조폭</motion.div>
          <motion.div className="hidden lg:block absolute left-[46%] top-[14%] text-white text-2xl font-bold">노예 1호</motion.div>
          <motion.div className="hidden lg:block absolute left-[73%] top-[6%] text-white text-2xl font-bold">낙하산 인사</motion.div>
          <motion.div className="hidden lg:block absolute left-[79%] top-[12%] text-white text-2xl font-bold">병원 적자의 원흉</motion.div>
          <motion.div className="hidden lg:block absolute left-[23%] top-[13%] text-white text-2xl font-bold">마취과의 유일한 희망</motion.div>
        </motion.div>
      </div>

      {showBox && (
        <>
          <div className="h-[600vh]" />
          <motion.div style={{ opacity: hideOpacity }}>
            <motion.div className="fixed left-1/2 bottom-[10%] -translate-x-1/2 z-50">
              <div className="w-[200px] h-[200px] mx-auto flex justify-center items-center relative">
                <motion.img
                  src={process.env.PUBLIC_URL + "/box.png"}
                  alt="box"
                  className="w-full h-full object-contain"
                  style={{ scale: boxScale, y: boxY }}
                />
                {boxFullyFixed &&
                  docMotion.map((motionStyle, index) => (
                    <motion.img
                      key={index}
                      src={process.env.PUBLIC_URL + documents[index].img}
                      alt={`doc-${index}`}
                      className="absolute w-[300px] h-[200px] object-contain z-20"
                      style={{
                        y: motionStyle.y,
                        opacity: motionStyle.opacity,
                      }}
                    />
                  ))}
              </div>
            </motion.div>

            {boxFullyFixed && (
              <>
                <motion.div
                  className="fixed left-[20%] bottom-[30%] z-50 text-black text-5xl font-bold"
                  style={{ opacity: boxTextOpacity }}
                >
                  {currentIdx + 1}
                </motion.div>

                <motion.div
                  className="fixed right-[20%] bottom-[30%] z-50 text-black text-lg max-w-[300px] text-right"
                  style={{ opacity: boxTextOpacity }}
                >
                  {documents[currentIdx]?.description}
                </motion.div>
              </>
            )}
          </motion.div>
        </>
      )}
    </section>
  );
};

export default View03;
