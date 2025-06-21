import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

const View03 = () => {
  const sectionRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [unlockScroll, setUnlockScroll] = useState(false);
  const [boxShowComplete, setBoxShowComplete] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [boxFixed, setBoxFixed] = useState(false);
const [boxVisible, setBoxVisible] = useState(true)

  const documents = [
    {
      img: ["/scrollimage1.png", "/scrollimage8.png"],
      title: "새로운 시작",
      content: "전장에서 수많은 생명을 구해온 천재 외과의사 백강혁은 한국으로 돌아와 몰락 직전의 대학병원 중증외상팀에 부임합니다. 첫날부터 그는 병원 시스템의 문제와 동료들의 냉담한 태도에 직면하지만, 특유의 카리스마로 팀을 재건하기 위한 첫걸음을 내딛습니다.",
    },
    {
      img: ["/scrollimage4.png", "/scrollimage11.png"],
      title: "갈등의 시작",
      content: "병원 경영진은 수익성 부족을 이유로 외상센터를 축소하려 하지만, 백강혁 교수와 팀원들은 이를 막기 위해 나섭니다.",
    },
    {
      img: ["/scrollimage7.png", "/scrollimage10.png"],
      title: "생명의 은인",
      content: "적자를 바탕으로 백강혁을 비난하던 한유림은 그의 하나뿐인 딸이 사고로 오자 도움을 청하고, 백강혁은 그녀를 살려냅니다.",
    },
    {
      img: ["/scrollimage5.png", "/scrollimage6.png"],
      title: "블랙윙즈를 찾아간 백강혁",
      content: "이현종 대위를 살리기 위해 남수단에 가서 수술을 성공적으로 마치며 낙하산이 아님을 증명합니다.",
    },
    {
      img: ["/scrollimage13.png", "/scrollimage12.png"],
      title: "해피앤딩",
      content: "닥터헬기 개소식에 나타난 백강혁은 다시 현장으로 떠납니다.",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

const boxScale = useTransform(scrollYProgress, [0.5, 0.6], [1, 1.5]);
const boxY = useTransform(scrollYProgress, (p) => {
  if (p < 0.5) return 0;
  if (p >= 0.5 && p <= 0.6) return (p - 0.5) * 2000; // 점점 내려옴
  return 200; // 고정
}); 
 const backgroundOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const boardOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.6], [0, 0.5, 1, 0]);
  const boardY = useTransform(scrollYProgress, [0.2, 0.5], [0, -1300]);
  const boxOpacity = useTransform(scrollYProgress, [0.95, 0.98], [1, 0]);


const yMotionValues = [
  useMotionValue(100),
  useMotionValue(100),
  useMotionValue(100),
  useMotionValue(100),
  useMotionValue(100),
];

const opacityMotionValues = [
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
];
  const interpolate = (p, input, output) => {
    if (p <= input[0]) return output[0];
    if (p >= input[2]) return output[2];
    if (p <= input[1]) return output[0] + ((p - input[0]) / (input[1] - input[0])) * (output[1] - output[0]);
    return output[1] + ((p - input[1]) / (input[2] - input[1])) * (output[2] - output[1]);
  };

  useEffect(() => {
    return scrollYProgress.on("change", (progress) => {
      const sectionStart = 0.7;
      const sectionEnd = 0.98;
      const per = (sectionEnd - sectionStart) / documents.length;

      documents.forEach((_, index) => {
        const start = sectionStart + per * index;
        const mid = start + per * 0.5;
        const end = start + per;
        const range = [start, mid, end];

        const y = interpolate(progress, range, [10, -250, 10]);
        const opacity = interpolate(progress, range, [0, 1, 0]);

        yMotionValues[index].set(y);
        opacityMotionValues[index].set(opacity);
      });
    });
  }, [scrollYProgress]);

useMotionValueEvent(scrollYProgress, "change", (p) => {
  setShowBoard(p < 0.6);
  setBoxShowComplete(p > 0.7); 
  if (p > 0.98) setUnlockScroll(true);

  const relativeProgress = (p - 0.7) / (0.95 - 0.7);
  const perDoc = 1 / documents.length;
const idx = Math.min(
  Math.floor(relativeProgress / perDoc),
  documents.length - 1
);
setCurrentIdx(idx);
});

useMotionValueEvent(scrollYProgress, "change", (p) => {
  setBoxFixed(p > 0.55 && p < 0.9); // 중간에만 fixed
  setBoxVisible(p < 0.99); // 마지막에 사라지게
});

  return (
    <section ref={sectionRef} id="section03" className="relative w-full h-[1000vh] bg-[#e1d4c4] ">
      {/* 배경 */}
      <motion.div  className="absolute inset-0 bg-[#e1d4c4] z-0" style={{ opacity: backgroundOpacity }} />

      {/* 보드 이미지 */}
      {showBoard && (
        <motion.div
          className="w-full z-10 fixed left-0 top-0"
          style={{ y: boardY, opacity: boardOpacity }}
        >
          <motion.img
            src={process.env.PUBLIC_URL + "/board2.png"}
            alt="board"
            className="w-full object-contain"
          />
        </motion.div>
      )}

{/* 박스 본체*/}
<motion.div
  className={`${
    boxFixed
      ? "fixed left-[45%] bottom-[20%] w-[300px] h-[300px] -translate-x-1/2 z-50"
      : "absolute left-[45%] bottom-[45%] -translate-x-1/2 w-[300px] h-[300px]"
  } z-50 pointer-events-none`}
  style={{
    scale: boxScale,
    y: 0,
    opacity: boxOpacity,
  }}
>
  <img
    src={process.env.PUBLIC_URL + "/box.png"}
    alt="box"
    className="w-full h-full object-contain absolute z-10"
/>

  {boxShowComplete && (
    <>
      {/* 문서 이미지 */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 1}}
  className="absolute inset-0 flex items-center justify-center"
>
{/* 박스 위 배경 커버 */}
  <motion.img
    src={process.env.PUBLIC_URL + "/imglist.png"}
    alt="imglist"
    className="absolute w-[500px] h-[200px] object-contain z-0"
    style={{
      y: yMotionValues[currentIdx],
      opacity: opacityMotionValues[currentIdx],
    }}
  />

{/* 문서 이미지들  */}
{documents[currentIdx].img.map((src, i) => (
  <motion.div
    key={`${currentIdx}-${i}`}
    className="absolute w-[100px] h-[80px]  z-0"
    style={{
      y: yMotionValues[currentIdx],
      opacity: opacityMotionValues[currentIdx],
      rotate: i === 0 ? -5 : 5,
      x: i === 0 ? -50 : 50,
    }}
  >
    <img
      src={process.env.PUBLIC_URL + src}
      className="w-full h-full object-cover"
    />
  </motion.div>
))}

</motion.div>


      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.2 }}
  className=" absolute top-[40%] left-1/2 w-[900px] -translate-x-1/2 -translate-y-1/2 flex justify-between items-center z-20 "
>
  {/* 왼쪽 숫자 */}
  <div className="text-white text-7xl font-bold">
    {currentIdx + 1}
  </div>

  

  {/* 오른쪽 텍스트 */}
  <div className="text-center text-white w-[300px]">
    <div className="text-2xl font-bold mb-6">
      {documents[currentIdx].title}
    </div>
    <div className="text-sm">
      {documents[currentIdx].content}
    </div>
  </div>
</motion.div>
    </>
  )}
</motion.div>

    </section>
  );
};

export default View03;
