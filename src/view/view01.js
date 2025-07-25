import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

const View01 = () => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stopScrollY, setStopScrollY] = useState(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showLines13, setShowLines13] = useState(false); 
  const [shouldFix, setShouldFix] = useState(true);
  const [mergeSectionBottom, setMergeSectionBottom] = useState(0);
  const sectionRef = useRef(null);
  const [reScatter, setReScatter] = useState(false);
  const [imageFixed, setImageFixed] = useState(true); // 처음엔 fixed
  const section3Ref = useRef(null);
const { scrollYProgress } = useScroll();
  const [isFixed, setIsFixed] = useState(true);
  const [stopTop, setStopTop] = useState(0);

  const subSectionRef = useRef(null);

const { scrollYProgress: subScroll } = useScroll({
  target: subSectionRef,
  offset: ['start start', 'end end'], // 시작~끝 기준
});

const fadeOutOpacity = useTransform(subScroll, [ 0.9 , 1], [ 1, 0]);
  


useEffect(() => {
  const unsubscribe = scrollYProgress.on("change", (p) => {
    const triggerStart = 0.48;

    if (p > triggerStart && isFixed) {
      const currentTop = document
        .querySelector("#imageWrapper")
        .getBoundingClientRect().top + window.scrollY;

      console.log("🛑 fixed 해제됨! 현재 위치에 고정:", currentTop);

      setStopTop(currentTop); 
      setIsFixed(false);
    }

    if (p < triggerStart && !isFixed) {
      console.log("✅ fixed 다시 적용");
      setIsFixed(true);
    }
  });

  return () => unsubscribe();
}, [scrollYProgress, isFixed]);

useEffect(() => {
  const handleScroll = () => {
    if (section3Ref.current) {
      const sectionTop = section3Ref.current.offsetTop;
      const scrollTop = window.scrollY;

      if (scrollTop >= sectionTop) {
        setImageFixed(true);
      } else {
        setImageFixed(false);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



useEffect(() => {
  const section = document.getElementById('merge-section');
  if (section) {
    const bottom = section.offsetTop + section.offsetHeight;
    setMergeSectionBottom(bottom);
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight >= mergeSectionBottom) {
      setShouldFix(false);
    } else {
      setShouldFix(true);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [mergeSectionBottom]);


useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);

      const section1 = document.getElementById('merge-section');
      const section2 = document.getElementById('scatter-section');
      const section3 = document.getElementById('section03');

      if (section1) {
        const offsetTop1 = section1.offsetTop;
        const height1 = section1.offsetHeight;
        const relativeY1 = scrollTop - offsetTop1;
        const effectiveHeight1 = height1 * 0.1;
        const p1 = Math.min(Math.max(relativeY1 / effectiveHeight1, 0), 1);
        setProgress(p1);
      }

      if (section2) {
        const offsetTop2 = section2.offsetTop;
        const height2 = section2.offsetHeight;
        const relativeY2 = scrollTop - (offsetTop2 - 300);
        const effectiveHeight2 = height2 * 0.2;
        const p2 = Math.min(Math.max(relativeY2 / effectiveHeight2, 0), 1);
        setProgress2(p2);
      }

      if (section3 && stopScrollY === null) {
        const triggerOffset = 100;
          const scrollTop = window.scrollY;
        const sectionTop = section3.offsetTop;
        if (scrollTop >= sectionTop + triggerOffset) {
          setStopScrollY(sectionTop + triggerOffset);
        }
      }

      if (scrollTop <= 10) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stopScrollY, showScrollDown]);

  useEffect(() => {
    setShowLines13(progress > 0.98);
  }, [progress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const line1 = [ 
    <img src={process.env.PUBLIC_URL + '/넷2.png'} alt="넷" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/플2.png'} alt="플" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/릭2.png'} alt="릭" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/스2.png'} alt="스" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/시2.png'} alt="시" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/리2.png'} alt="리" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/즈2.png'} alt="즈" className="inline-block w-6 h-6" />,
   ];
  const line2 = [

    <img src={process.env.PUBLIC_URL + '/중.png'} alt="중" className="inline-block relative -top-2 left-6" />,
    <img src={process.env.PUBLIC_URL + '/증.png'} alt="증" className="inline-block relative left-1" />,
    <img src={process.env.PUBLIC_URL + '/외.png'} alt="외" className="inline-block relative top-1 -left-1" />,
    <img src={process.env.PUBLIC_URL + '/상.png'} alt="상" className="inline-block relative top-1 left-1" />,
    <img src={process.env.PUBLIC_URL + '/센.png'} alt="센" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/터.png'} alt="터" className="inline-block relative -top-2 -left-8" />,
  ];
  const line3 = [
    <img src={process.env.PUBLIC_URL + '/n.png'} alt="N" className="inline-block w-8 h-14 " />,
    <img src={process.env.PUBLIC_URL + '/e.png'} alt="E" className="inline-block w-8 h-14" />,
    <img src={process.env.PUBLIC_URL + '/t.png'} alt="T" className="inline-block w-8 h-14" />,
    <img src={process.env.PUBLIC_URL + '/f.png'} alt="F" className="inline-block w-8 h-14" />,
    <img src={process.env.PUBLIC_URL + '/l.png'} alt="L" className="inline-block w-8 h-14" />,
    <img src={process.env.PUBLIC_URL + '/i.png'} alt="I" className="inline-block w-3 h-14" />,
    <img src={process.env.PUBLIC_URL + '/x.png'} alt="X" className="inline-block w-8 h-14" />,
  ]
const generateInitialPositions = (count) => {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * window.innerWidth * 0.6,
    y: (Math.random() - 0.5) * window.innerHeight * 0.4,
  }));
};

const [initialPositionsLine2, setInitialPositionsLine2] = useState([]);

useEffect(() => {
  setInitialPositionsLine2(generateInitialPositions(line2.length));
}, [line2.length]);





  const alternativeImages = [
  process.env.PUBLIC_URL + '/clickimage1.png',
  process.env.PUBLIC_URL + '/clickimage2.png',
  process.env.PUBLIC_URL + '/clickimage3.png',
  process.env.PUBLIC_URL + '/clickimage4.png',
  process.env.PUBLIC_URL + '/clickimage5.png',
  process.env.PUBLIC_URL + '/clickimage6.png',
  process.env.PUBLIC_URL + '/clickimage7.png',
];

const imageDescriptions = [
  "실력도, 돈도, 사명감도 있지만 싸가지가 없는 천재 외과의사. 다소 거친 표현을 상대방들에게 쓰지만, 환자를 끝까지 포기하지 않고 어떻게든 살려내려는 성격을 지니고 있다. 다소 겁이 없고, 위급상황에서도 초인적인 능력으로 신들린 스킬을 발휘하며, 과거 ‘국제 평화 의사회’ '블랙 윙즈(민간군사기업)' 에이스로도 활약했다. 한국대학병원의 중증외상팀을 심폐 소생하기 위해 등판한다.",
  "백강혁의 현란한 수술 스킬에 반해 낚여버린 외상외과의 첫번째 제자. 항문외과 펠로우로 지내던 중 중증외상팀으로 스카웃된다. 허당미 넘치지만 실력만큼은 어디 내놔도 빠지지 않는 인물로, 백강혁을 따라 사선을 넘나드는 중증 환자들과 온몸을 내던진 사투를 벌이며 성장해 간다.",
  "중증외상팀 5년 차 시니어 간호사. 책임감도 강하고 실력도 좋은 베테랑으로, 백강혁이 별명을 붙일 만큼 당차고 깡다구가 좋다. 그 누구보다 화끈하게 중증외상팀을 지키고자 고군분투한다.",
  "백강혁도 인정한 마취통증의학과 레지던트. 환자의 상태를 세심하게 살피며, 어떤 상황에서도 감정의 동요 없이 무덤덤하고 침착하게 마취를 진행하는 센스가 남달라 첫 만남에 백강혁의 신뢰를 얻는다.",
  "스펙에 자부심이 넘치는 항문외과 과장. 차기 기조실장 자리를 노리며 병원 내 입지를 다지던 그의 앞에 비주류 백강혁이 등장해 산통을 깨고, 애제자인 양재원마저 중증외상팀으로 빼앗겨버린다.",
  "백강혁의 최고의 지원군으로, 백강혁을 한국대 외상외과 교수로 밀어주고 전폭적인 지원을 약속한다. 백강혁이 꾸준히 성과를 내면서 기대에 부응하자 지원으로 보답하기까지 한다. 그런 모습에 못마땅해 하는 최조은 원장과 홍재훈 기조실장의 표정은 덤. 마지막에는 한국대병원에 닥터헬기를 지원해주면서 중증외상센터에 대한 아낌없는 애정을 보여준다.",
  "한국대병원 기획조정실장으로 차기 원장을 노리고 있다. 환자보다 병원 수익을 중시하여 매 분기마다 각 진료과의 적자/흑자 순위를 매겨 대대적으로 발표할 정도다. 병원에 커다란 적자를 안겨주는 백강혁과 중증외상센터를 눈엣가시로 여기면서 계속 몰아낼 궁리를 하고 있다.",
];
const imageName = [
  "백강혁","양재훈","천장미","박경원","한유림","강명희","홍재림"
]
const job =[
  "한국대학교 병원 외상외과 교수 겸 중증외상센터장","한국대학교병원 외상외과 전임의","한국대학교 중증외상센터 시니어 간호사","한국대학교병원 마취통증의학과 전공의","한국대학교병원 외과 과장 겸 대장항문외과 과장","보건복지부 장관","한국대학교병원 기회조정실장 겸 감염내과 교수"
]



const pathRef = useRef(null);
const [pathLength, setPathLength] = useState(0);



useEffect(() => {
  if (pathRef.current) {
    setPathLength(pathRef.current.getTotalLength());
  }
}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollRange = rect.height - windowHeight;

      const scrolled = Math.min(
        Math.max((windowHeight - rect.top) / scrollRange, 0),
        1
      );

      setProgress(scrolled);

      if (scrolled < 1) {
        setReScatter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStyle = (xStart, yStart, rStart, index) => {
    const [xDest, yDest] = transformsDestination[index]; // 도착 위치
    const [w, h] = sizes[index];
  
    const screenWidth = window.innerWidth;
    const t = Math.min(1, Math.max(0, (screenWidth - 1024) / (1920 - 1024)));
    const scale = 0.6 + (1 - 0.6) * t;
  
    let x, y, r;
  
    if (!reScatter) {
      const ratio = Math.max(0, 1 - progress * 1.1);
      x = xStart * ratio;
      y = yStart * ratio;
      r = rStart * ratio;
    } else {
      x = xDest;
      y = yDest;
      r = 0;
    }
  
    return {
      transform: `translate(${x}px, ${y}px) rotate(${r}deg)`,
      transition: "transform 0.4s ease-out",
      zIndex: 10 + index,
      width: `${w * scale}px`,
      height: `${h * scale}px`,
    };
  };

const transforms = [
  [-200, -300, -40],
  [250, -150, 60],
  [-340, -180, 40],
  [300, -220, -80],
  [-500, -360, 250],
  [220, -160, -80],
  [100, -340, 160],
];

// 1. 사진의 마지막 도착지를 transformsDestination으로 적용
const transformsDestination = [
  [-200, -500, 0],
  [250, -450,0],
  [-340, -380,0],
  [300, -320, 0],
  [-500, -160, 0],
  [220, -160, 0],
  [100, -440, 0],
];

const sizes = [
  [160, 240],
  [130, 200],
  [180, 260],
  [150, 230],
  [170, 250],
  [120, 180],
  [165, 245],
];

  useEffect(() => {
    const nextSection = document.getElementById("next-section");
    if (!nextSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReScatter(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(nextSection);
    return () => observer.disconnect();
  }, []);

const shouldShowTape = progress > 0.98;


  return (
   <section id="merge-section" ref={sectionRef} className=" w-full h-[300vh]  relative z-50 bg-[#E1D4C4]">
        <div ref={subSectionRef} className=" h-[300vh]">
  <div className="sticky top-0 h-screen flex items-center justify-center">
  <motion.div
  style={{
    position: 'fixed',
    opacity : fadeOutOpacity , // 2. useTransform으로 스크롤에 따라 변경
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    zIndex: 50,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
> 

 {/* Line 1 */}
<div className={`flex space-x-1  mb-4 transition-opacity duration-1000 ${showLines13 ? 'opacity-100' : 'opacity-0'}`}>
    {line1.map((img, index) => (
      <div key={`line1-${index}`}>{img}</div>
    ))}
  </div> 
  {/* 
  
    3. 넷플릭스시리는 중증외상센터 텍스트 위로
    센터정렬중요!
 


  {/* Line 2 */}
<div className="flex flex-wrap justify-center gap-1 relative z-10">
{line2.map((img, index) => {
  const { x, y } = initialPositionsLine2[index] || { x: 0, y: 0 };
  const rotate = 10 * (1 - progress); 
  const currentX = x * (1 - progress);
  const currentY = y * (1 - progress);

  return (
    <div
      key={`line2-${index}`}
      className="inline-block"
      style={{
        transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
        transition: 'transform 0s linear',
      }}
    >
      {img}
    </div>
  );
})}
  </div>


{/* Line 3 */}
<div className={`flex flex-wrap justify-center mt-4 space-x-1 transition-opacity duration-1000 ${showLines13 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <p className='font-bold text-5xl text-white mr-4'>ONLY ON</p>
    {line3.map((img, index) => (
      <div key={`line3-${index}`}>{img}</div>
    ))}
  </div>


  {/* ------------------SVG------------------------------------- */}
  <div
    className={`mt-6 transition-opacity duration-1000 ease-out ${
      showLines13 ? 'opacity-100' : 'opacity-0'
    }`}
  >
 <div className="flex flex-wrap justify-center items-center gap-4 absolute top-2 left-1/2">
 <svg className="w-6 h-6 inline-block " viewBox="0 0 50 50" fill="none">
    <g>
      <path d="M48,16c0-.51.35.06-7.24-8.61C40.34,6.88,40.57,7,34,7V6a5,5,0,0,0-5-5H19a5,5,0,0,0-5,5V7H8c-.64,0-.21-.28-7.75,8.34C-.1,15.74,0,15.59,0,24a1,1,0,0,0,1,1V46c0,1.44-2.06,1,45,1,1.43,0,1,0,1-22a1,1,0,0,0,1-1C48,15.18,48,16.26,48,16ZM46,23H41c0-3.64.93-3-7-3-1.2,0-1,1.17-1,3H15c0-1.85.2-3-1-3-7.63,0-7-.78-7,3H2V17H46ZM35,22h4c0,6.53.7,6-3,6a1,1,0,0,1-1-1ZM9,22h4c0,6.53.7,6-3,6a1,1,0,0,1-1-1ZM16,6a3,3,0,0,1,3-3H29a3,3,0,0,1,3,3V7H16ZM8.45,9H14v3a1,1,0,0,0,2,0V9H32v3a1,1,0,0,0,2,0V9h5.55l5.25,6H3.2ZM45,45H3V25H7v2a3,3,0,0,0,3,3h2a3,3,0,0,0,3-3V25H33v2a3,3,0,0,0,3,3h2a3,3,0,0,0,3-3V25h4Z"/>
      <path d="M27,32c0-4.69.76-4-5-4-1.34,0-1,1.56-1,4H18a1,1,0,0,0-1,1c0,5.75-.72,5,4,5,0,4.68-.76,4,5,4,1.34,0,1-1.56,1-4h3a1,1,0,0,0,1-1C31,31.25,31.72,32,27,32Zm2,4c-4.57,0-4-.61-4,4H23c0-4.57.61-4-4-4V34c4.57,0,4,.61,4-4h2c0,4.57-.61,4,4,4Z" />
    </g>
  </svg>
  </div>
<div className='absolute top-[300px] left-[700px]'>
<svg className="w-12 h-12 inline-block rotate-6 " viewBox="0 0 50 50" fill="currentColor">
  <g>
    <path d="M43,4H41.9a5,5,0,0,0-9.8,0H31a5,5,0,0,0-5,5V25a5,5,0,0,0,4,4.9v3A1.14,1.14,0,0,0,31.15,34h.79c-.58,5.26-5.64,9.21-11.94,7.77v-11c0-2.74,2-3.17,2-6.6V13a3,3,0,0,0-4-2.82V7a3,3,0,0,0-4.12-2.78A3,3,0,0,0,8,5V6.18A3,3,0,0,0,4,9v7a4,4,0,0,0-4,4c0,4.35-.23,5.18.88,6.29C4.91,30.33,4,28.08,4,47a1,1,0,0,0,2,0C6,27.92,7,29.55,2.29,24.88,1.9,24.48,2,24.52,2,20a2,2,0,0,1,2-2v4a1,1,0,0,0,2,0V9A1,1,0,0,1,8,9v8a1,1,0,0,0,2,0V5a1,1,0,0,1,2,0V17a1,1,0,0,0,2,0V7a1,1,0,0,1,2,0V17a1,1,0,0,0,2,0V13a1,1,0,0,1,2,0V24.2c0,2.74-2,3.17-2,6.6V41.05a9.07,9.07,0,0,1-4.12-4.2A3,3,0,0,0,16,34V30a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v4a3,3,0,0,0,3,3h.76A11.07,11.07,0,0,0,18,43.24V47a1,1,0,0,0,2,0V43.81c7.7,1.42,13.39-3.65,14-9.81h.9A1.14,1.14,0,0,0,36,32.85V30h2v3a1,1,0,0,0,1,1h1v1a1,1,0,0,0,2,0V34h1a1,1,0,0,0,1-1V29.9A5,5,0,0,0,48,25V9A5,5,0,0,0,43,4ZM11,35c-1.33,0-1-1.38-1-5,0-1.2,1.17-1,3-1,1.33,0,1,1.38,1,5a1,1,0,0,1-.78,1A16.36,16.36,0,0,1,13,31a1,1,0,0,0-2,0v2C11,35.2,11.45,35,11,35Zm23-3H32V30h2Zm8,0H40V30h2Zm4-7a3,3,0,0,1-3,3H31a3,3,0,0,1-3-3V9a3,3,0,0,1,3-3c1.86,0,3,.2,3-1,0-4,6-4,6,0,0,1.2,1.17,1,3,1a3,3,0,0,1,3,3Z"/>
    <path d="M43,8H31a1,1,0,0,0-1,1V25a1,1,0,0,0,1,1H43a1,1,0,0,0,1-1V9A1,1,0,0,0,43,8ZM32,24V22h1a1,1,0,0,0,0-2H32V18h2a1,1,0,0,0,0-2H32V14h1a1,1,0,0,0,0-2H32V10H42v6H38a1,1,0,0,0,0,2h4v6Z"/>
    <path d="M37,6a1,1,0,0,0,0-2A1,1,0,0,0,37,6Z"/>
  </g>
</svg>
</div>
<div className='absolute top-0 left-[700px]'>
  <svg className="w-10 h-10 inline-block " viewBox="0 0 50 50" fill="none">
    <g>
      <path d="M24,42,7.66,25.66a11.32,11.32,0,0,1,0-16L8,9.32a11.32,11.32,0,0,1,16,0h0a11.32,11.32,0,0,1,16,0l.33.33a11.32,11.32,0,0,1,0,16Z" fill='none' stroke='red' strokeWidth={5}/>
    </g>
    </svg>
</div>
<div className='absolute top-2 left-[500px]'>
<svg viewBox="0 0 50 50" width="200" height="200" fill="none">
  <path
    ref={pathRef}
    d="
      M4 44 L12.57 35.43
      M18 35 L13 35 L13 30 L30 13 L35 18 L18 35
      M39 4 L44 9
      M40 5 L31 14
      M43 8 L34 17
      M25 25 L26 26
      M20.5 29.5 L21.5 30.5
      M28.5 21.5 L29.5 22.5
    "
    stroke="black"
    strokeWidth="1"

  />
</svg>
</div>
<div className='absolute top-[-70px] left-1/2 -translate-x-1/2'>
<svg >
  <path d="M52.7135 58.1516C44.4 52.6848 37.3731 47.1116 30.94 41.4718C24.507 35.8321 19.1131 29.9795 15.1048 24.1136C12.8285 20.7883 11.0965 17.4497 9.36449 14.1111L0.110755 14.8027C16.7378 28.237 35.1463 41.525 55.2868 54.6135C60.9281 58.2846 66.7178 61.9425 72.6561 65.5871C73.5963 66.1723 76.7139 66.3585 78.6933 66.1191C81.0686 65.8398 81.8603 65.2545 81.5139 64.5895C73.9427 49.9979 66.2725 35.4197 58.6518 20.8282C56.4744 16.6649 54.2971 12.4883 52.1197 8.325L42.965 9.00336C59.5425 22.5707 71.9138 36.4838 83.3944 50.4103C86.6604 54.4007 89.8769 58.3911 93.044 62.3681C94.1821 63.7781 102.694 63.4721 102.446 62.0223C99.7245 46.9652 96.8048 31.9215 93.8852 16.8777C93.0935 12.6346 92.2522 8.3915 91.5099 4.14839L82.7511 4.46762C93.5883 19.671 104.475 34.8744 115.312 50.0778C118.43 54.4273 121.498 58.7635 124.715 63.0997C125.704 64.4697 134.414 64.1771 133.919 62.7672C128.624 48.7476 123.477 34.6349 126.743 20.5223C127.684 16.5452 129.267 12.5814 131.791 8.65753H124.121C132.484 22.6106 140.847 36.5636 149.259 50.5167C151.634 54.4406 153.96 58.3645 156.336 62.2883C157.226 63.7382 165.045 63.2726 165.342 61.9558C169.202 46.1273 173.804 30.312 179.891 14.5234C181.623 10.0276 183.453 5.54503 185.433 1.04919H177.218C182.959 17.0905 185.977 33.2117 187.165 49.3196C187.511 53.8819 187.61 58.4443 187.66 63.0199C187.66 64.6826 196.518 64.6161 197.111 63.0199C202.505 48.6013 210.769 34.2891 221.607 20.0966C224.675 16.0663 227.891 12.0627 231.405 8.05897L222.695 7.73974C223.289 22.6372 223.289 37.5346 223.586 52.4321C223.685 56.622 223.734 60.8252 223.833 65.0151C223.833 66.6911 232.889 66.6379 233.384 65.0151C238.382 48.8008 251.793 32.7994 273.319 17.5827C279.356 13.313 286.086 9.10977 293.41 4.98637L284.75 4.36121C279.554 19.2454 274.358 34.1162 269.112 49.0003C267.628 53.2302 266.143 57.46 264.659 61.6765C264.164 63.0997 273.269 63.4588 274.061 62.0223C282.671 46.2204 298.012 30.6712 319.884 15.8136C326.07 11.6237 332.75 7.50032 339.975 3.44342L331.365 2.81826C324.239 18.6601 317.163 34.5152 310.037 50.3571C308.008 54.8662 305.979 59.3754 303.95 63.8978C303.307 65.3343 312.659 65.6802 313.402 64.2436C321.864 48.1757 338.293 32.4003 362.59 17.5428C369.369 13.3928 376.792 9.30929 384.809 5.31891L376.594 4.38782C365.806 20.2829 354.969 36.1779 344.082 52.0729C341.014 56.5289 337.996 60.9981 334.928 65.454L343.885 66.1191C353.089 51.8734 375.555 38.6785 400.644 26.0024C407.77 22.4111 415.193 18.8596 422.615 15.3082L414.995 14.4436C405.494 26.0822 395.943 37.7208 386.442 49.3728C383.72 52.7114 380.998 56.05 378.227 59.402C376.941 60.9715 385.798 61.6499 387.234 60.067C401.089 44.9168 429.345 31.1899 460.373 18.128C469.28 14.3904 478.385 10.6793 487.54 6.98157L479.326 6.05048C457.997 20.6021 438.896 35.3798 422.467 50.3837C417.815 54.6268 413.411 58.8965 409.205 63.1795C407.869 64.5229 415.589 65.5205 417.865 64.1638C440.133 50.9822 464.876 38.1066 491.994 25.6034C499.664 22.0652 507.532 18.567 515.549 15.0954L506.889 14.1111C491.845 24.8186 476.851 35.5261 461.808 46.2204C457.503 49.2664 453.247 52.3257 448.942 55.3717C446.962 56.7683 454.88 57.5398 457.651 56.356C485.214 44.4646 512.629 32.5599 540.143 20.6686C547.912 17.2901 555.731 13.9248 563.549 10.5463L555.731 9.32259C533.858 22.8633 511.936 36.4173 490.064 49.958C483.878 53.8021 477.643 57.6329 471.457 61.477C470.418 62.1154 470.765 62.847 473.189 63.2327C475.218 63.552 478.682 63.4056 479.721 62.7672C501.544 49.2132 523.268 35.6459 545.042 22.0785C551.228 18.2345 557.413 14.3904 563.549 10.5463C565.826 9.13638 558.898 7.95256 555.731 9.32259C528.217 21.2139 500.555 33.0787 472.942 44.9568C465.123 48.322 457.305 51.6872 449.486 55.0657L458.195 56.05C473.239 45.3425 488.233 34.635 503.276 23.9407C507.582 20.8947 511.837 17.8354 516.093 14.7894C518.072 13.3928 510.155 12.6213 507.433 13.8051C479.029 26.1088 452.9 38.785 429.247 51.7803C422.566 55.4515 416.083 59.1492 409.749 62.8736L418.409 63.8579C433.304 48.7476 450.624 33.797 470.517 19.099C476.158 14.9357 481.998 10.799 488.084 6.67564C490.064 5.33221 482.542 4.66714 479.87 5.74455C447.408 18.833 414.747 32.0811 393.221 46.7923C387.234 50.8891 382.186 55.0923 378.376 59.3754L387.382 60.0404C396.636 48.3752 405.939 36.7233 415.193 25.058C417.865 21.7061 420.537 18.3675 423.16 15.0155C424.1 13.8184 417.914 12.9937 415.539 14.151C389.213 26.8537 362.293 39.5963 345.864 53.5095C341.262 57.4201 337.55 61.3838 334.977 65.4274C333.987 66.997 342.895 67.6887 343.934 66.0925C354.672 50.1842 365.361 34.2891 376.149 18.3941C379.167 13.9248 382.236 9.46891 385.254 4.99968C386.095 3.73605 379.613 2.79166 377.04 4.06858C348.239 18.4606 326.614 33.8901 313.303 49.8383C309.542 54.3608 306.523 58.9364 304.098 63.5254L313.55 63.8712C320.577 48.0294 327.554 32.1742 334.581 16.3324C336.561 11.8232 338.59 7.3141 340.569 2.79166C341.113 1.56794 333.839 1.0891 331.959 2.1665C306.127 16.7447 286.284 32.0678 273.764 47.8564C270.251 52.3124 267.281 56.8082 264.807 61.3173L274.209 61.6632C279.356 46.779 284.453 31.9082 289.599 17.024C291.034 12.7942 292.519 8.56442 293.954 4.34791C294.35 3.13749 287.273 2.63205 285.294 3.72275C258.671 18.7 239.916 34.6483 230.019 51.0354C227.248 55.6643 225.12 60.333 223.734 65.0151H233.285C232.79 50.1177 232.295 35.2202 231.801 20.3228C231.652 16.1329 231.504 11.9296 231.454 7.73974C231.454 6.42291 223.932 6.09038 222.745 7.42051C209.928 21.6662 200.08 36.0848 192.955 50.6231C190.926 54.7465 189.144 58.8832 187.561 63.0199H197.012C196.913 46.8987 194.291 30.7776 189.738 14.7096C188.451 10.1606 186.917 5.61153 185.383 1.06249C184.889 -0.374046 177.812 -0.334142 177.169 1.06249C170.043 16.8245 164.204 32.6132 159.602 48.4417C158.315 52.9508 157.127 57.46 156.088 61.9691L165.094 61.6366C156.435 47.7101 147.725 33.7704 139.065 19.8439C136.64 15.92 134.166 12.0095 131.741 8.08558C131.098 7.06138 124.715 7.06138 124.071 8.08558C115.015 22.1849 116.401 36.4705 120.558 50.6763C121.745 54.7066 123.131 58.7369 124.467 62.7539L133.671 62.4213C122.983 47.2047 111.749 32.0279 100.714 16.8378C97.5471 12.5016 94.4296 8.15208 91.2625 3.81586C90.3223 2.48573 82.2562 2.79166 82.5036 4.13509C85.3243 19.1789 87.848 34.2359 90.4707 49.2797C91.213 53.5228 92.0048 57.7659 92.7965 62.009L102.199 61.6632C90.9656 47.7101 79.7325 33.7438 65.2333 20.0035C61.0765 16.0796 56.7218 12.1824 52.0207 8.2984C50.0908 6.70224 42.0742 7.39391 42.866 8.97676C50.4372 23.5683 57.959 38.1598 65.5797 52.7513C67.757 56.9146 69.9344 61.0912 72.1117 65.2545L80.9201 64.2569C60.1363 51.4744 41.035 38.5056 23.6657 25.364C18.7172 21.6263 13.9171 17.8753 9.26552 14.0978C7.28611 12.4883 -0.779979 13.18 0.0612697 14.7761C3.12935 20.642 7.92942 26.5212 13.8182 32.2407C19.7069 37.9603 26.1895 43.6798 34.404 49.2398C39.0556 52.3656 44.0536 55.4648 49.3485 58.5108C50.1898 58.9896 53.3568 58.6438 52.6146 58.1383L52.7135 58.1516Z" fill='white' />
</svg>
<svg className="absolute top-2 left-4 w-6 h-6 inline-block" viewBox="0 0 50 50" fill="none">
<path d="M3.22401 11.8356C0.44373 12.7652 7.72465 7.98528 10.3326 6.64986C13.6106 4.97136 17.7635 2.96432 21.6033 3.51467C24.9121 3.98891 24.636 7.85463 24.0122 10.3006C23.2823 13.1624 22.0139 15.8994 20.6944 18.5061C19.9996 19.8785 18.9193 21.4298 19.139 23.0848C19.5886 26.4703 22.9402 26.9253 25.4913 27.9999" stroke='white'/>
<path d="M36.7719 29.9131C36.2467 29.0973 35.1601 31.3105 34.2919 30.8662C32.7534 30.079 34.5089 29.3809 35.1725 29.0593" stroke='white'/>
  </svg>

  <svg
  className="absolute top-2 left-[400px] w-[400px] h-auto"
  viewBox="-250 0 700 350"
  fill="none"
  stroke="yellow"
  strokeWidth="4"
>
    <path 
    ref={pathRef}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
        style={{
          strokeDashoffset: pathLength * (1 - progress), 
          transition: 'stroke-dashoffset 0.3s linear'
        }}    d="M-213.361 204.185C-152.982 168.666 -92.0973 135.219 -31.214 102.428C9.78047 80.3492 60.4721 53.6428 102.361 33.4119C105.367 31.9601 163.32 4.54798 174.466 2.57728C176.248 2.26213 178.711 5.78129 177.456 7.77815C171.952 16.5327 164.548 22.7942 157.632 29.3527C129.823 55.7268 79.5725 97.2959 52.5415 118.613C5.66551 155.581 -27.596 179.003 -74.8047 212.959C-85.6642 220.77 -118.19 244.246 -107.097 237.352C-33.9975 191.921 -82.0797 218.726 7.32995 164.378C27.5195 152.106 47.7242 139.76 68.2213 129.121C78.8366 123.611 89.9135 115.485 100.503 116.017C104.134 116.2 98.274 126.652 95.3928 130.486C86.3212 142.558 75.7362 152.25 65.5832 162.486C43.3631 184.888 20.0043 204.849 -2.06476 227.561C-14.3963 240.251 -12.3868 240.21 -0.58191 233.531C19.9386 221.92 40.0986 208.523 60.5849 196.735C72.012 190.159 114.763 165.926 129.006 160.22C132.365 158.874 138.905 154.795 139.094 159.257C139.329 164.809 133.038 168.627 129.53 172.581C121.924 181.153 113.784 188.71 105.874 196.698C98.7261 203.916 72.0752 229.791 63.5518 240.499C52.6147 254.239 58.2741 253.058 70.7302 251.417C91.3312 248.702 139.581 235.634 155.862 231.405C160.668 230.157 230.633 210.712 244.517 209.747C246.481 209.61 250.402 212.648 248.686 214.384C240.656 222.508 231.142 226.653 222.245 232.279C198.663 247.189 174.547 259.75 151.12 275.304C127.932 290.7 156.511 278.511 162.074 276.479C186.631 267.51 211.089 257.263 235.627 248.037C244.874 244.56 254.116 240.922 263.394 237.976C267.161 236.781 271.287 234.339 274.709 235.631C276.146 236.173 272.822 239.684 271.419 241.006C265.949 246.164 260.074 250.293 254.361 254.816C242.613 264.117 219.215 281.914 207.537 291.643C202.277 296.025 196.373 299.405 192.015 305.473C190.883 307.049 192.845 310.057 194.316 310.049C206.762 309.984 255.708 293.055 259.557 291.796C292.067 281.161 323.216 270.372 355.614 258.874C364.244 255.811 372.836 251.998 381.49 249.48C382.518 249.181 379.782 251.515 378.794 252.13C370.192 257.477 361.426 262.048 352.805 267.311"/>
      </svg>
        </div>
        </div>
        </motion.div>
        </div>
          {/*------------------------------이미지---------------------------- */}

<motion.div
  id="imageWrapper"
  style={{
    position: isFixed ? "fixed" : "absolute",
    top: isFixed ? "80%" : `${stopTop}px`,
    left: "50%",
    transform: "translateX(-50%)",
  }}
  className="z-[90] flex justify-center items-end pointer-events-auto gap-4"
>
    <div   
    onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 0,
        name: imageName[0],
        job: job[0],
        description: imageDescriptions[0],
        img: alternativeImages[0],
      });
    }
  }} style={getStyle(...transforms[0], 0)} className={`relative img1 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage1.png"} alt="img1" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 1,
        name: imageName[1],
        job: job[1],
        description: imageDescriptions[1],
        img: alternativeImages[1],
      });
    }
  }} style={getStyle(...transforms[1], 1)} className={`relative img2 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage2.png"} alt="img2" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 2,
        name: imageName[2],
        job: job[2],
        description: imageDescriptions[2],
        img: alternativeImages[2],
      });
    }
  }} style={getStyle(...transforms[2], 2)} className={`relative img3 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage3.png"} alt="img3" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 3,
        name: imageName[3],
        job: job[3],
        description: imageDescriptions[3],
        img: alternativeImages[3],
      });
    }
  }} style={getStyle(...transforms[3], 3)} className={`relative img4 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage4.png"} alt="img4" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 4,
        name: imageName[4],
        job: job[4],
        description: imageDescriptions[4],
        img: alternativeImages[4],
      });
    }
  }} style={getStyle(...transforms[4], 4)} className={`relative img5 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage5.png"} alt="img5" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 5,
        name: imageName[5],
        job: job[5],
        description: imageDescriptions[5],
        img: alternativeImages[5],
      });
    }
  }} style={getStyle(...transforms[5], 5)} className={`relative img6 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage6.png"} alt="img6" className="w-full h-full object-cover" />
  </div>
  <div   onClick={() => {
    if (scrollY >= stopScrollY) {
      setSelectedImage({
        index: 6,
        name: imageName[6],
        job: job[6],
        description: imageDescriptions[6],
        img: alternativeImages[6],
      });
    }
  }} style={getStyle(...transforms[6], 6)} className={`relative img7 flex items-center justify-center ${shouldShowTape ? 'show-tape' : ''}`}>
    <img src={process.env.PUBLIC_URL + "/clickimage7.png"} alt="img7" className="w-full h-full object-cover" />
  </div>
</motion.div>


  {showScrollDown && (
      <div className='animate-float flex flex-col justify-center items-center absolute top-[800px] left-1/2 -translate-x-1/2 gap-3 transition-opacity duration-200'>
        <svg className='w-[150px] h-[21px]'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 21" fill='none' >
          <path d="M145.547 17.1406C145.547 17.0312 145.531 16.9766 145.5 16.9766C145.406 16.9766 145.336 17.0312 145.289 17.1406C145.289 17.2031 145.312 17.25 145.359 17.2812C145.484 17.2812 145.547 17.2344 145.547 17.1406ZM140.039 3.125C140.039 2.89062 139.953 2.82812 139.781 2.9375C139.594 3.03125 139.531 3.13281 139.594 3.24219C139.609 3.30469 139.68 3.33594 139.805 3.33594C139.961 3.33594 140.039 3.26562 140.039 3.125ZM137.766 1.20312C138.031 1.10938 138.195 1.0625 138.258 1.0625C138.289 1.0625 138.609 1.10938 139.219 1.20312C139.641 1.20312 140.023 1.39062 140.367 1.76562C140.695 2.1875 141.492 3.67969 142.758 6.24219C143.055 6.78906 143.234 7.14062 143.297 7.29688C144.891 10.5312 145.727 12.1484 145.805 12.1484C145.914 12.1484 145.969 10.7969 145.969 8.09375C146.016 4.90625 146.047 3.27344 146.062 3.19531C146.125 2.74219 146.281 2.34375 146.531 2C146.781 1.65625 147.094 1.48438 147.469 1.48438C148 1.48438 148.289 1.80469 148.336 2.44531C148.383 3.19531 148.406 4.32812 148.406 5.84375C148.406 8.40625 148.531 11.1172 148.781 13.9766C148.969 16.1328 149.062 17.6016 149.062 18.3828V18.5703C148.984 18.8984 148.633 19.2578 148.008 19.6484C147.398 20.0234 146.922 20.2109 146.578 20.2109C145.547 20.2109 144.523 19.3672 143.508 17.6797C143.133 17.0547 142.383 15.5859 141.258 13.2734C140.148 10.9453 139.438 9.38281 139.125 8.58594L138.398 6.6875L138.141 7.74219C137.703 9.89844 137.406 11.7031 137.25 13.1562C137.062 14.8438 136.914 15.8203 136.805 16.0859C136.68 16.3828 136.398 16.5312 135.961 16.5312C135.523 16.5312 135.305 16.4609 135.305 16.3203C135.305 16.2109 135.312 16.1406 135.328 16.1094C135.438 15.6875 135.555 14.6562 135.68 13.0156C135.789 11.5625 136.062 9.27344 136.5 6.14844C136.828 3.71094 137.094 2.22656 137.297 1.69531C137.406 1.46094 137.562 1.29688 137.766 1.20312Z" fill='white'/>
          <path d="M125.109 2.09375C125.109 1.21875 125.398 0.78125 125.977 0.78125C126.383 0.78125 126.766 0.96875 127.125 1.34375C127.484 1.70313 127.773 2.10938 127.992 2.5625C128.461 3.57813 128.938 4.82812 129.422 6.3125C130.109 8.3125 130.461 9.32031 130.477 9.33594C130.57 9.33594 130.742 8.74219 130.992 7.55469C131.242 6.49219 131.602 5.25781 132.07 3.85156C132.508 2.55469 132.93 1.8125 133.336 1.625C133.367 1.59375 133.453 1.57813 133.594 1.57813C133.875 1.57813 134.078 1.99219 134.203 2.82031C134.25 3.17969 134.273 3.4375 134.273 3.59375C134.273 4.03125 134.062 5.71094 133.641 8.63281C133.234 11.4141 132.938 13.2422 132.75 14.1172C132.609 14.7734 132.398 15.3281 132.117 15.7812C131.492 16.7031 130.789 17.1641 130.008 17.1641C129.57 17.1641 129.117 17.0234 128.648 16.7422C127.961 16.3203 127.375 15.4531 126.891 14.1406C126.484 13.0156 126.008 10.9688 125.461 8L125.367 7.41406L124.969 8.58594C124.078 11.3984 123.539 13.4375 123.352 14.7031C123.258 15.4375 123.172 15.875 123.094 16.0156C122.984 16.2031 122.75 16.4219 122.391 16.6719C121.922 16.9688 121.555 17.1172 121.289 17.1172C121.023 17.1172 120.695 17.0078 120.305 16.7891C119.82 16.5234 119.445 15.9766 119.18 15.1484C118.898 14.2578 118.461 12.2344 117.867 9.07812C117.164 5.375 116.812 3.35156 116.812 3.00781C116.812 2.82031 117.203 2.52344 117.984 2.11719L119.156 1.46094L119.602 1.95312C119.898 2.29688 120.312 3.30469 120.844 4.97656C121.375 6.66406 121.82 8.42188 122.18 10.25C122.305 10.7969 122.422 11.2031 122.531 11.4688C122.703 11.4688 123.18 10.0781 123.961 7.29688C124.727 4.5625 125.109 2.82813 125.109 2.09375Z" fill='white'/>
          <path d="M104.578 9.71094C104.578 10.6797 104.898 11.4453 105.539 12.0078C106.18 12.5703 107.016 12.8672 108.047 12.8984H108.141C110.031 12.8984 111.359 12.1172 112.125 10.5547C112.328 10.1484 112.43 9.58594 112.43 8.86719C112.43 8.02344 112.312 7.34375 112.078 6.82812C111.391 5.28125 110.273 4.36719 108.727 4.08594C108.57 4.05469 108.422 4.03906 108.281 4.03906C107.672 4.03906 107.367 4.11719 107.367 4.27344C107.367 4.41406 107.109 4.78125 106.594 5.375C106.156 5.8125 105.734 6.39844 105.328 7.13281C104.922 7.86719 104.68 8.53125 104.602 9.125C104.586 9.21875 104.578 9.41406 104.578 9.71094ZM107.273 0.804688C107.773 0.679688 108.188 0.617188 108.516 0.617188C108.953 0.617188 109.461 0.6875 110.039 0.828125C111.805 1.23438 113.234 2.20313 114.328 3.73438C115.438 5.28125 116 7.05469 116.016 9.05469C116.016 11.3516 115.148 13.2109 113.414 14.6328C111.555 16.1953 109.492 16.9766 107.227 16.9766C105.148 16.9766 103.391 16.2734 101.953 14.8672C100.656 13.6172 100.008 12.0078 100.008 10.0391C100.008 8.67969 100.289 7.42188 100.852 6.26562C101.43 5.10938 102.172 4.14062 103.078 3.35938C103.562 2.90625 104.234 2.41406 105.094 1.88281C105.969 1.33594 106.695 0.976563 107.273 0.804688Z" fill='white'/>
          <path d='M95.1562 8.46875C94.8594 7.5 94.1094 6.59375 92.9062 5.75C91.6719 4.875 90.3906 4.33594 89.0625 4.13281L88.3828 4.03906L88.4766 4.55469C88.5859 5.17969 88.7734 7.58594 89.0391 11.7734C89.1328 13.7891 89.2031 14.8203 89.25 14.8672C89.3125 14.8672 89.8828 14.6953 90.9609 14.3516C91.9609 14.0391 92.6406 13.7891 93 13.6016C93.3125 13.4609 93.7109 13.1484 94.1953 12.6641C94.6797 12.1797 94.9922 11.7812 95.1328 11.4688C95.3047 11.0781 95.3906 10.6016 95.3906 10.0391C95.3906 9.50781 95.3125 8.98438 95.1562 8.46875ZM84.6328 2.11719C85.3516 1.74219 85.9453 1.5 86.4141 1.39062C86.8984 1.26562 87.5938 1.20313 88.5 1.20313C90.375 1.20313 91.8984 1.46094 93.0703 1.97656C94.6172 2.63281 95.9844 3.59375 97.1719 4.85938C98.3594 6.10938 99.0391 7.49219 99.2109 9.00781C99.2422 9.32031 99.2578 9.65625 99.2578 10.0156C99.2578 11.875 98.5781 13.5078 97.2188 14.9141C94.8125 17.3516 92.1094 18.5703 89.1094 18.5703H88.7812C88.7344 18.5703 88.6719 18.5625 88.5938 18.5469H88.4766C88.0078 18.5312 87.6797 18.4688 87.4922 18.3594C87.3203 18.2656 87.0547 18.0156 86.6953 17.6094C86.1641 17.0469 85.8047 16.7656 85.6172 16.7656C85.5391 16.7656 85.4766 16.8047 85.4297 16.8828C85.3828 16.9766 85.2578 17.0234 85.0547 17.0234C84.7578 17.0234 84.5859 16.9453 84.5391 16.7891C84.4766 16.5703 84.4453 15.5547 84.4453 13.7422C84.4453 11.2422 84.4922 9.00781 84.5859 7.03906C84.6328 5.86719 84.6562 5.19531 84.6562 5.02344C84.6562 4.55469 84.625 4.28906 84.5625 4.22656C84.5 4.16406 84.4688 4.0625 84.4688 3.92188C84.4688 3.82812 84.3203 3.65625 84.0234 3.40625L83.5312 2.98438C83.5312 2.76562 83.8984 2.47656 84.6328 2.11719Z' fill='white'/>
          <path d="M68.4141 3.10156C69.3203 2.96094 69.8438 2.89062 69.9844 2.89062C70.3281 2.89062 70.5391 3.04688 70.6172 3.35938C70.8516 4.07812 71.0391 5.96094 71.1797 9.00781C71.3359 12.5703 71.5312 14.3906 71.7656 14.4688L71.7891 14.5391H71.8359C71.8984 14.5391 72.2656 14.4375 72.9375 14.2344C74.1719 13.8594 74.9453 13.6719 75.2578 13.6719C75.6484 13.6719 76.0234 13.9141 76.3828 14.3984C76.6016 14.6953 76.7109 14.8984 76.7109 15.0078L76.5938 15.7812C76.4688 16.3906 76.2656 16.8438 75.9844 17.1406C75.7188 17.4531 75.2891 17.7812 74.6953 18.125C73.4609 18.8125 72.2734 19.1562 71.1328 19.1562C69.6953 19.1562 68.6094 18.625 67.875 17.5625C67.2812 16.7031 66.9375 15.0625 66.8438 12.6406C66.8281 12.4531 66.8203 11.8828 66.8203 10.9297C66.8203 9.61719 66.8594 8.04688 66.9375 6.21875C67 4.625 67.0859 3.73438 67.1953 3.54688C67.3203 3.35938 67.7266 3.21094 68.4141 3.10156Z" fill='white'/>
          <path d="M57.3984 3.10156C58.3047 2.96094 58.8281 2.89062 58.9688 2.89062C59.3125 2.89062 59.5234 3.04688 59.6016 3.35938C59.8359 4.07812 60.0234 5.96094 60.1641 9.00781C60.3203 12.5703 60.5156 14.3906 60.75 14.4688L60.7734 14.5391H60.8203C60.8828 14.5391 61.25 14.4375 61.9219 14.2344C63.1562 13.8594 63.9297 13.6719 64.2422 13.6719C64.6328 13.6719 65.0078 13.9141 65.3672 14.3984C65.5859 14.6953 65.6953 14.8984 65.6953 15.0078L65.5781 15.7812C65.4531 16.3906 65.25 16.8438 64.9688 17.1406C64.7031 17.4531 64.2734 17.7812 63.6797 18.125C62.4453 18.8125 61.2578 19.1562 60.1172 19.1562C58.6797 19.1562 57.5938 18.625 56.8594 17.5625C56.2656 16.7031 55.9219 15.0625 55.8281 12.6406C55.8125 12.4531 55.8047 11.8828 55.8047 10.9297C55.8047 9.61719 55.8438 8.04688 55.9219 6.21875C55.9844 4.625 56.0703 3.73438 56.1797 3.54688C56.3047 3.35938 56.7109 3.21094 57.3984 3.10156Z" fill='white'/>
          <path d="M43.0078 9.71094C43.0078 10.6797 43.3281 11.4453 43.9688 12.0078C44.6094 12.5703 45.4453 12.8672 46.4766 12.8984H46.5703C48.4609 12.8984 49.7891 12.1172 50.5547 10.5547C50.7578 10.1484 50.8594 9.58594 50.8594 8.86719C50.8594 8.02344 50.7422 7.34375 50.5078 6.82812C49.8203 5.28125 48.7031 4.36719 47.1562 4.08594C47 4.05469 46.8516 4.03906 46.7109 4.03906C46.1016 4.03906 45.7969 4.11719 45.7969 4.27344C45.7969 4.41406 45.5391 4.78125 45.0234 5.375C44.5859 5.8125 44.1641 6.39844 43.7578 7.13281C43.3516 7.86719 43.1094 8.53125 43.0312 9.125C43.0156 9.21875 43.0078 9.41406 43.0078 9.71094ZM45.7031 0.804688C46.2031 0.679688 46.6172 0.617188 46.9453 0.617188C47.3828 0.617188 47.8906 0.6875 48.4688 0.828125C50.2344 1.23438 51.6641 2.20313 52.7578 3.73438C53.8672 5.28125 54.4297 7.05469 54.4453 9.05469C54.4453 11.3516 53.5781 13.2109 51.8438 14.6328C49.9844 16.1953 47.9219 16.9766 45.6562 16.9766C43.5781 16.9766 41.8203 16.2734 40.3828 14.8672C39.0859 13.6172 38.4375 12.0078 38.4375 10.0391C38.4375 8.67969 38.7188 7.42188 39.2812 6.26562C39.8594 5.10938 40.6016 4.14062 41.5078 3.35938C41.9922 2.90625 42.6641 2.41406 43.5234 1.88281C44.3984 1.33594 45.125 0.976563 45.7031 0.804688Z" fill='white'/>
          <path d="M29.9531 8.09375C29.9688 8.09375 30.2656 7.97656 30.8438 7.74219C31.4219 7.50781 31.7422 7.39062 31.8047 7.39062H31.8516C31.9766 7.39062 32.2734 7.22656 32.7422 6.89844C33.2109 6.57031 33.4453 6.36719 33.4453 6.28906C33.4453 6.13281 33.2734 5.89844 32.9297 5.58594C32.2734 4.97656 31.3828 4.60156 30.2578 4.46094C29.9453 4.41406 29.7578 4.39062 29.6953 4.39062C29.5391 4.39062 29.4609 4.4375 29.4609 4.53125C29.4609 4.57812 29.4688 4.60938 29.4844 4.625C29.5 4.65625 29.5312 4.96875 29.5781 5.5625C29.6875 7.25 29.8125 8.09375 29.9531 8.09375ZM28.9922 2.35156C29.4609 2.21094 29.9922 2.14062 30.5859 2.14062C31.6797 2.14062 32.6875 2.30469 33.6094 2.63281C34.5469 2.96094 35.2656 3.40625 35.7656 3.96875C36.3281 4.57812 36.6094 5.35156 36.6094 6.28906C36.6094 7.55469 35.8047 8.78125 34.1953 9.96875L33.1641 10.7422L34.8516 12.4297C37.3672 14.9453 38.625 16.625 38.625 17.4688C38.625 17.5781 38.5859 17.7344 38.5078 17.9375C38.4453 18.0938 38.2578 18.2969 37.9453 18.5469C37.6328 18.7969 37.3906 18.9219 37.2188 18.9219H37.1484C37.1328 18.9062 37.1172 18.8984 37.1016 18.8984C36.9609 18.8984 36.7188 19 36.375 19.2031C35.9375 19.4688 35.6484 19.6016 35.5078 19.6016C35.3047 19.6016 34.4922 18.75 33.0703 17.0469C32.7266 16.625 32.0781 15.9219 31.125 14.9375L30.1172 13.8359L30.0234 14.8438C29.8828 16.2188 29.6406 16.9844 29.2969 17.1406C29.0625 17.2812 28.4531 17.3516 27.4688 17.3516C27.0781 17.3516 26.8516 17.3203 26.7891 17.2578C26.5391 17.0234 26.4141 15.6328 26.4141 13.0859C26.4141 11.8203 26.4219 10.9766 26.4375 10.5547C26.5 6.02344 26.6953 3.46094 27.0234 2.86719C27.1641 2.67969 27.3984 2.58594 27.7266 2.58594C28.0703 2.58594 28.4922 2.50781 28.9922 2.35156Z" fill='white'/>
          <path d="M18.5391 0.921875C19.1953 0.703125 19.8203 0.59375 20.4141 0.59375C20.4297 0.59375 20.4844 0.601563 20.5781 0.617188C20.6719 0.617188 20.75 0.617188 20.8125 0.617188H21.2109C22.3359 0.664063 23.1719 0.8125 23.7188 1.0625C24.3281 1.3125 24.6328 1.5625 24.6328 1.8125C24.6328 2.09375 24.5312 2.4375 24.3281 2.84375L23.8828 3.71094L22.1016 3.875C20.9141 3.98438 19.9844 4.20312 19.3125 4.53125C18.1719 5.09375 17.3984 5.89062 16.9922 6.92188C16.8359 7.29688 16.7578 7.75 16.7578 8.28125C16.7578 10.2344 17.6484 11.6016 19.4297 12.3828C20.2734 12.7422 21.0781 12.9219 21.8438 12.9219C22.3594 12.9219 22.7734 12.9609 23.0859 13.0391C23.4297 13.1016 23.8984 13.3203 24.4922 13.6953C25.0391 14.0391 25.3125 14.2891 25.3125 14.4453C25.3125 14.6016 25.0078 14.9688 24.3984 15.5469C23.7891 16.125 23.3984 16.4688 23.2266 16.5781C22.7266 16.8281 22.0547 16.9531 21.2109 16.9531C18.6172 16.9531 16.4844 16.0781 14.8125 14.3281C13.9844 13.4531 13.3906 12.6172 13.0312 11.8203C12.6875 11.0078 12.5156 9.92969 12.5156 8.58594C12.5156 7.08594 12.7969 5.84375 13.3594 4.85938C13.9219 3.875 14.875 2.94531 16.2188 2.07031C17.0938 1.52344 17.8672 1.14062 18.5391 0.921875Z" fill='white'/>
          <path d="M5.20312 3.78125C4.71875 3.78125 4.38281 3.83594 4.19531 3.94531C4.00781 4.03906 3.91406 4.27344 3.91406 4.64844C3.91406 5.61719 4.35938 6.45312 5.25 7.15625C5.78125 7.5625 6.57031 8.04688 7.61719 8.60938C8.78906 9.25 9.61719 9.71875 10.1016 10.0156C10.5859 10.3125 11.0078 10.7109 11.3672 11.2109C11.7266 11.6953 11.9062 12.1953 11.9062 12.7109C11.9062 13.9141 11.1797 14.9922 9.72656 15.9453C8.38281 16.8672 6.88281 17.3281 5.22656 17.3281H5.0625C3.28125 17.2969 2.03125 16.8828 1.3125 16.0859C0.890625 15.5703 0.679687 15.0703 0.679687 14.5859C0.679687 14.3828 0.71875 14.2266 0.796875 14.1172C1.15625 13.6641 2.35156 13.4375 4.38281 13.4375C5.77344 13.4375 6.59375 13.375 6.84375 13.25C7.14062 13.1406 7.33594 13.0859 7.42969 13.0859C7.53906 13.0859 7.64844 13.1094 7.75781 13.1562C8.02344 13.2656 8.21094 13.3203 8.32031 13.3203C8.38281 13.3203 8.41406 13.3047 8.41406 13.2734C8.41406 13.0703 7.5625 12.4688 5.85938 11.4688C4.39062 10.625 3.42969 10 2.97656 9.59375C1.42969 8.25 0.65625 6.71875 0.65625 5C0.65625 4.3125 0.773437 3.75 1.00781 3.3125C1.25781 2.85938 1.64062 2.42188 2.15625 2C2.70312 1.5625 3.15625 1.27344 3.51562 1.13281C3.875 0.992188 4.44531 0.921875 5.22656 0.921875C6.08594 0.921875 6.80469 1.01563 7.38281 1.20313C8.67969 1.625 9.50781 2.125 9.86719 2.70312L10.1719 3.10156L9.53906 3.71094C9.13281 4.07031 8.72656 4.25 8.32031 4.25C8.02344 4.25 7.6875 4.17969 7.3125 4.03906C6.75 3.86719 6.04688 3.78125 5.20312 3.78125Z" fill='white'/>
        </svg>
        <svg className='w-[31px] h-[35px]'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 35" fill='none' >
          <path d="M23.9765 0.986872C17.4106 -0.750799 10.5993 -0.149742 4.34792 2.44328C3.99509 2.58969 3.87619 3.19075 4.34792 3.28707C10.676 4.58165 17.1959 4.82439 23.5968 3.97289C25.4262 3.73016 27.2365 3.3911 29.039 3.00581C29.6105 2.88251 29.6105 1.96937 29.039 1.84993C25.2191 1.03311 21.3149 0.898254 17.4222 1.06008C13.5294 1.2219 9.86679 1.54169 6.13897 2.06954C4.41312 2.31228 2.66427 2.8016 1.42933 4.10774C1.04581 4.5123 1.21072 5.19812 1.75532 5.35224C8.70089 7.30182 16.0491 7.87205 23.2095 6.98973C25.2383 6.73929 27.2441 6.36941 29.2346 5.91477C29.7102 5.80688 29.76 5.13648 29.365 4.90145C26.0859 2.92875 22.1011 3.37954 18.4615 3.64925C14.3348 3.94977 10.1276 4.16939 6.05843 4.96309C4.02193 5.35994 1.99311 6.03035 0.294108 7.25559C-0.120094 7.55611 -0.120094 8.27276 0.443682 8.41532C7.59251 10.1954 15.0635 10.7733 22.4041 10.2917C24.4636 10.1568 26.5193 9.92952 28.5596 9.62899C28.8434 9.58661 29.0083 9.24755 28.9738 8.99326C28.9316 8.68502 28.6977 8.5232 28.4062 8.48852C21.288 7.62932 13.959 7.76032 6.86382 8.80446C4.98841 9.07802 3.14367 9.49799 1.40248 10.2686C1.2299 10.3456 1.14936 10.5537 1.14169 10.7271C1.05348 12.4262 3.66142 12.3646 4.74679 12.4802C6.72575 12.6882 8.70472 12.8539 10.6914 12.9733C14.6915 13.2161 18.7031 13.2777 22.7109 13.1506C24.9814 13.0774 27.2518 12.9464 29.5146 12.7576C30.1129 12.7075 30.3506 11.7442 29.668 11.621C25.6487 10.912 21.5527 10.9467 17.5027 11.3628C13.4527 11.7789 9.3989 12.4378 5.42178 13.2893C3.9644 13.6014 2.23089 14.2679 1.87421 15.9093C1.78601 16.31 2.05063 16.6143 2.43799 16.6529C9.70188 17.3888 17.077 17.3233 24.3064 16.2907C24.9507 16.1982 24.7091 15.3005 24.1645 15.2389C18.9371 14.6532 13.6521 15.1965 8.67788 16.9341C8.21765 17.096 8.18314 17.7625 8.67788 17.9089C13.3722 19.2998 18.2966 19.3307 23.1481 19.2844V18.275C17.426 18.3828 11.7269 19.061 6.15814 20.4056C5.63272 20.5328 5.71326 21.234 6.15814 21.3997C8.75075 22.3475 11.6502 21.9468 14.3425 21.8158C17.3071 21.6694 20.2756 21.523 23.2402 21.3766V20.3132C19.1825 20.8256 15.1287 21.3535 11.0749 21.8774C10.4114 21.9622 10.3654 22.9293 11.0749 22.9524C13.8631 23.041 16.6513 23.0988 19.4433 23.1797L19.3206 22.2666C16.4403 23.0218 13.5563 23.7615 10.6722 24.5013C10.1928 24.6246 10.3193 25.3104 10.7834 25.3374C13.4872 25.4838 16.1757 25.8074 18.8412 26.2852L18.7453 25.5608C16.8315 26.5125 14.795 27.1521 12.6895 27.5027C12.2523 27.5759 12.3942 28.2117 12.7892 28.2386C14.7605 28.3773 16.7011 28.6702 18.6226 29.1287L18.5267 28.385C16.6705 29.2481 14.6761 29.8222 12.6358 30.0071C12.0375 30.0611 12.0145 30.9511 12.6358 30.9627C14.2389 30.9896 15.8459 31.163 17.4183 31.4751L17.192 30.6159C16.3176 31.5522 15.2936 32.2842 14.1315 32.8198C13.7327 33.0047 13.8784 33.5981 14.2466 33.7098C14.4422 33.7714 15.1555 34.0604 14.9599 34.3186C14.5918 34.804 15.4125 35.2779 15.773 34.7963C16.4595 33.887 15.2668 33.0163 14.5036 32.7658L14.6186 33.6558C15.8612 33.1049 16.9734 32.3189 17.9131 31.3364C18.1662 31.0744 18.0741 30.5581 17.6868 30.4772C16.0146 30.1266 14.3386 29.9725 12.632 30.0033V30.9588C14.8334 30.6814 16.9466 30.0803 18.9332 29.0824C19.2362 28.9283 19.171 28.4082 18.8373 28.3388C16.843 27.9265 14.818 27.6376 12.7892 27.4873L12.8889 28.2232C15.0597 27.8688 17.1614 27.1906 19.1442 26.2428C19.4433 26.1003 19.3743 25.5801 19.0483 25.5185C16.3176 24.9829 13.5563 24.6477 10.7796 24.482L10.8908 25.3181C13.7787 24.5938 16.6666 23.8694 19.5584 23.1566C20.08 23.0295 19.9457 22.2666 19.4356 22.2435C16.6474 22.124 13.8592 21.9815 11.0672 21.8697V22.9447C15.121 22.4207 19.1787 21.9044 23.2325 21.3727C23.8845 21.288 23.9305 20.2708 23.2325 20.3093C20.3292 20.4557 17.426 20.606 14.5266 20.7524C11.8726 20.8872 8.98469 21.3265 6.42277 20.4018V21.3958C11.8918 20.0512 17.5065 19.3114 23.1405 19.2844C23.7886 19.2844 23.7886 18.2788 23.1405 18.275C18.381 18.2557 13.5486 18.275 8.93484 16.9341V17.9089C13.7327 16.2136 18.9639 15.5972 24.011 16.2907L24.1529 15.2389C16.9274 16.0865 9.66736 16.2329 2.42649 15.4816L2.99026 16.2252C3.2664 14.9576 4.80815 14.5954 5.89735 14.3719C7.73825 13.9944 9.58682 13.6553 11.4392 13.3317C15.2169 12.6767 19.0291 12.1835 22.8682 12.1912C25.0427 12.1912 27.2096 12.3646 29.3497 12.7383L29.5031 11.6017C22.1126 12.2182 14.6723 12.2297 7.27803 11.621C6.23868 11.5362 5.20318 11.436 4.16767 11.3281C3.83784 11.2935 2.16186 11.3012 2.18487 10.7271L1.92407 11.1856C4.97306 9.77925 8.53214 9.49028 11.8343 9.21287C15.3511 8.91234 18.8949 8.87382 22.4194 9.08187C24.4176 9.20131 26.4081 9.40167 28.3947 9.65211L28.2413 8.51164C21.1346 9.52111 13.8746 9.45946 6.78328 8.36523C4.76213 8.05314 2.76015 7.64858 0.769674 7.19009L0.919248 8.34982C3.88386 6.12668 7.79194 5.81844 11.351 5.437C13.4029 5.21739 15.4585 5.044 17.5142 4.88603C19.3858 4.73962 21.265 4.55083 23.1405 4.55854C25.1041 4.56624 27.0792 4.84365 28.7936 5.85697L28.924 4.84365C22.0858 6.45418 14.8372 6.57362 7.93385 5.31371C5.97789 4.95539 4.04111 4.48533 2.13501 3.91124L2.461 5.15574C3.48117 4.1193 4.89252 3.7263 6.28471 3.49513C7.96069 3.21386 9.66736 3.08286 11.3549 2.90948C15.029 2.5319 18.7223 2.25449 22.4194 2.37778C24.5211 2.44713 26.6305 2.64363 28.7015 3.00195V1.84607C22.6189 3.41422 16.1834 3.79566 9.93966 3.21001C8.13328 3.04048 6.3384 2.78234 4.55886 2.43943V3.28322C10.5341 0.778813 17.4567 0.424344 23.6812 2.05799C24.3716 2.23907 24.663 1.16796 23.9765 0.986872Z" fill="white"/>
        </svg>
      </div>
)}



      {/* Modal */}
      {selectedImage !== null && scrollY >= stopScrollY && (
            <div
          className="fixed inset-0 bg-black bg-opacity-70 w-full flex justify-center items-center z-[300]"  
        >
          <div
            className=" flex w-full justify-center lg:gap-20 mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pr-12 flex items-center justify-center">
              <img
                src={alternativeImages[selectedImage.index]}
                alt="selected"
                className="  object-cover"
              />
            </div>
            <div className="relative w-fit h-fit">
              <img
                src={process.env.PUBLIC_URL + '/file.png'}
                alt="file"
                className="block"
              />
              <img
                src={process.env.PUBLIC_URL + '/close.png'}
                onClick={() => setSelectedImage(null)}
                className="absolute top-[100px] right-12 w-8 h-8 cursor-pointer z-20"
              />
              <div className="absolute top-0 left-2 w-full h-full p-20 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-[#e5501f] mb-4">
                  {selectedImage.name}
                </h2>
                <div className="text-black text-lg font-semibold mb-4  leading-snug">
                  {selectedImage.job}
                </div>
                <div className="text-black font-light leading-normal tracking-tight">
                  {selectedImage.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
      </div>
      
    </section>


  );
};

export default View01;
