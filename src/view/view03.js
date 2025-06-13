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
  {
    img: ["/scrollimage1.png", "/scrollimage8.png"],
    title: "새로운 시작",
    content:
      "전장에서 수많은 생명을 구해온 천재 외과의사 백강혁은 한국으로 돌아와 몰락 직전의 대학병원 중증외상팀에 부임합니다. 첫날부터 그는 병원 시스템의 문제와 동료들의 냉담한 태도에 직면하지만, 특유의 카리스마로 팀을 재건하기 위한 첫걸음을 내딛습니다."
  },
  {
    img: ["/scrollimage4.png", "/scrollimage11.png"],
    title: "갈등의 시작",
    content: "병원 경영진은 수익성 부족을 이유로 외상센터를 축소하려 하지만, 백강혁 교수와 팀원들은 이를 막기 위해 나섭니다. 또한, 한 사건을 계기로 백강혁 교수의 과거가 드러나면서 새로운 갈등이 발생합니다.",
  },
  {
    img: ["/scrollimage7.png", "/scrollimage10.png"],
    title: "생명의 은인",
    content: "적자를 바탕으로 백강혁을 비난하던 한유림은 그의 하나밖에 없는 딸이 교통사고로 응급실에 오게 되자 다급히 백강혁에게 살려달라 애원하고, 백강혁은 그에게 '살려준다'라는 말과 함께 그의 딸을 살려낸다. 이를 계기로 한유림은 백강혁에게 우호적으로 돌아서는 계기가 된다.",
  },
  {
    img: ["/scrollimage5.png", "/scrollimage6.png"],
    title: "블랙윙즈를 찾아간 백강혁",
    content: "이현종 대위를 살리기 위해 남수단으로 날아간 백강혁은 블랙윙즈의 의료시설을 사용하여 수술을 성공적으로 마무리한다. 또한 한국으로 이송하기 위한 에어앰뷸런스를 받아내는대까지 성공하며, 자신이 낙하산이 아니라는것을 증명하게 된다.",
  },
  {
    img: ["/scrollimage13.png", "/scrollimage12.png"],
    title: "해피앤딩",
    content: "중증외상센터의 적자를 원인으로 백강혁을 내치려던 병원장은 자신의 과거를 생각하며 백강혁을 내치는 대신 닥터헬기 도입을 결정하게 된다. 그렇게 닥터헬기 개소식 행사에 나타난 백강혁은 숨돌릴틈도 없이 닥터헬기를 타고 다시 한번 사람들을 살리기 위해 현장으로 떠난다.",
  },
];


  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const boxScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.8]);
  const boxY = useTransform(scrollYProgress, [0.7, 0.75], [500, 0]);
  const boxTextOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const translatey = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [30, 0, 0, -600]);
  const hideOpacity = useTransform(scrollYProgress, [0.93, 0.95], [1, 0]);

  const docMotion = documents.map((_, index) => {
    const total = documents.length;
    const sectionStart = 0.75;
    const sectionEnd = 0.98;
    const sectionSize = (sectionEnd - sectionStart) / total;

    const start = sectionStart + sectionSize * index;
    const mid = start + sectionSize * 0.6;
    const end = start + sectionSize;

    return {
      y: useTransform(scrollYProgress, [start, mid, end], [-200, -400, 0]),
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
    if (progress >= 0.98) setUnlockScroll(true);
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
    <div className="h-[700vh]" />

    {/* 박스 전체 컨테이너 */}
    <motion.div style={{ opacity: hideOpacity }}>
      <motion.div className="fixed top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300]">
        <div className="w-[300px] h-[300px] mx-auto flex justify-center items-center relative">
          {/* 박스 이미지 */}
          <motion.img
            src={process.env.PUBLIC_URL + "/box.png"}
            alt="box"
            className="w-full h-full object-contain"
            style={{ scale: boxScale, y: boxY }}
          />

          {/* 내부 문서 & 커버 이미지 */}
          {boxFullyFixed &&
            docMotion.map((motionStyle, index) => (
              <React.Fragment key={index}>
                {/* 커버 박스 이미지 */}
                <motion.img
                  src={process.env.PUBLIC_URL + "/list (2).png"}
                  alt="cover"
                  style={{
                    width: "500px",
                    height: "300px",
                    y: motionStyle.y,
                    x: 0,
                    opacity: motionStyle.opacity,
                  }}
                  className="absolute z-10 object-cover"
                />

                {/* 내부 문서 이미지 2장 */}
                {documents[index].img.map((src, i) => (
                  <motion.img
                    key={`${index}-${i}`}
                    src={process.env.PUBLIC_URL + src}
                    alt={`doc-${index}-${i}`}
                    className="absolute w-[300px] h-[200px] object-contain z-20"
                    style={{
                      y: motionStyle.y,
                      x: i === 0 ? -40 : 40,
                      rotate: i === 0 ? -4 : 4,
                      opacity: motionStyle.opacity,
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
        </div>
      </motion.div>

      {/* 왼쪽 숫자 */}
      {boxFullyFixed && (
        <>
          <motion.div
            className="fixed left-[20%] top-1/2 -translate-y-1/2 z-50 text-black text-5xl font-bold"
            style={{ opacity: boxTextOpacity }}
          >
            {currentIdx + 1}
          </motion.div>

          {/* 오른쪽 설명 텍스트 */}
          <motion.div
            className="fixed right-[10%] top-1/2 -translate-y-1/2 z-50 text-black text-right max-w-[300px]"
            style={{ opacity: boxTextOpacity }}
          >
            <div className="text-3xl text-center font-bold mb-4">
              {documents[currentIdx]?.title}
            </div>
            <div className="text-xl text-center font-medium">
              {documents[currentIdx]?.content}
            </div>
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
