import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const View03 = () => {
  const [showRelation, setShowRelation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef(null);
  const sectionTopRef = useRef(0);
  const ref = useRef(null);

  const documents = [
    { img: "/scrollimage1.png", description: "첫 번째 이야기: 주인공의 귀환" },
    { img: "/scrollimage2.png", description: "두 번째 이야기: 팀과의 갈등" },
    { img: "/scrollimage3.png", description: "세 번째 이야기: 위기의 수술" },
    { img: "/scrollimage4.png", description: "네 번째 이야기: 감정의 변화" },
    { img: "/scrollimage5.png", description: "다섯 번째 이야기: 새로운 출발" },
  ];



  useEffect(() => {
    const section = document.getElementById("section03");
    if (section) sectionTopRef.current = section.offsetTop;
  }, []);



  

  // 스크롤 대상 ref
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  
  const boxScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 1.5, 1.8]);
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7], [0, 1, 2])
  const boxTranslateY = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 0, 50, 200])


  // 등장/사라짐 효과 설정
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.8], [0, 1, 1, 0]);
  const translatey = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [30, 0, -50, -200])



  return (
    <section
      ref={sectionRef}
      id="section03"
      className="w-full h-[500vh] relative "
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`,
        backgroundSize: "cover",

      }}
    >
      <div ref={ref} className="w-full h-full">
      <motion.div
      style={{
        opacity,
        y: translatey,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/board2.png'})`,
        backgroundSize: 'contain',            
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',   
      }}
      className=" w-screen h-screen   fixed top-0 left-0 z-10" 
    >
          <motion.div className="hidden lg:block absolute left-[22%] top-[5%] text-white text-2xl font-bold">생명의 은인</motion.div>
          <motion.div className="hidden lg:block absolute left-[62%] top-[12%] text-white text-2xl font-bold">조폭</motion.div>
          <motion.div className="hidden lg:block absolute left-[46%] top-[14%] text-white text-2xl font-bold">노예 1호</motion.div>
          <motion.div className="hidden lg:block absolute left-[73%] top-[6%] text-white text-2xl font-bold">낙하산 인사</motion.div>
          <motion.div className="hidden lg:block absolute left-[79%] top-[12%] text-white text-2xl font-bold">병원 적자의 원흉</motion.div>
          <motion.div className="hidden lg:block absolute left-[23%] top-[13%] text-white text-2xl font-bold">마취과의 유일한 희망</motion.div>
        </motion.div>
        </div>

      

      <motion.div
  className="fixed left-1/2 bottom-[20%] -translate-x-1/2 z-50 flex items-center gap-6 px-8 py-4 rounded-xl"
>
  {/* 숫자 */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: boxScale >= 1 ? 1 : 0, x: boxScale >= 1 ? 0 : -20 }}
    transition={{ duration: 0.5 }}
    className="text-black text-5xl font-bold"
  >
    {currentIdx + 1}
  </motion.div>

  {/* 박스 이미지 */}
  <div className="w-[200px] h-[200px] flex justify-center items-center">
    <motion.img
      src="/box.png"
      alt="box"
      className="w-full h-full object-contain"
      style={{
        opacity: boxOpacity,
        scale: boxScale,
        y: boxTranslateY,
      }}
    />
  </div>

  {/* 텍스트 설명 */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: boxScale >= 1 ? 1 : 0, x: boxScale >= 1 ? 0 : 20 }}
    transition={{ duration: 0.5 }}
    className="w-[300px] text-black text-lg"
  >
    {documents[currentIdx]?.description}
  </motion.div>
</motion.div>
    </section>
  );
};

export default View03;
