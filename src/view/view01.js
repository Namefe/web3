import React, { useState, useEffect } from 'react';

const View01 = () => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [section3Top, setSection3Top] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stopScrollY, setStopScrollY] = useState(null);

useEffect(() => {
  const handleScroll = () => {
    const section3 = document.getElementById('section03');
    const scrollTop = window.scrollY;

    // 기존 progress 계산 유지
    const section1 = document.getElementById('merge-section');
    const section2 = document.getElementById('scatter-section');
    const offsetTop1 = section1.offsetTop;
    const height1 = section1.offsetHeight;
    const relativeY1 = scrollTop - offsetTop1;
    const effectiveHeight1 = height1 * 0.6;
    const p1 = Math.min(Math.max(relativeY1 / effectiveHeight1, 0), 1);
    setProgress(p1);
    setScrollY(scrollTop);

    if (section2) {
      const offsetTop2 = section2.offsetTop;
      const height2 = section2.offsetHeight;
      const relativeY2 = scrollTop - (offsetTop2 - 300);
      const effectiveHeight2 = height2 * 0.2;
      const p2 = Math.min(Math.max(relativeY2 / effectiveHeight2, 0), 1);
      setProgress2(p2);
    }

    if (section3 && stopScrollY === null) {
      const triggerOffset = 200; // 언제 고정시킬지 결정
      const sectionTop = section3.offsetTop;

      if (scrollTop >= sectionTop + triggerOffset) {
        setStopScrollY(sectionTop + triggerOffset);
      }
    }

    setScrollY(scrollTop);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [stopScrollY]);


  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
};

  const line1 = [ 
   <img src={process.env.PUBLIC_URL + '/우.png'} alt="우" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/린.png'} alt="린" className="inline-block w-6 h-6" />, 
   <img src={process.env.PUBLIC_URL + '/계.png'} alt="계" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/속.png'} alt="속" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/뛰.png'} alt="뛰" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/어.png'} alt="어" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/야.png'} alt="야" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/한.png'} alt="한" className="inline-block w-6 h-6" />,
   <img src={process.env.PUBLIC_URL + '/다.png'} alt="다" className="inline-block w-6 h-6" />,
   ];
  const line2 = [
    <img src={process.env.PUBLIC_URL + '/넷2.png'} alt="넷" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/플2.png'} alt="플" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/릭2.png'} alt="릭" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/스2.png'} alt="스" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/시2.png'} alt="시" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/리2.png'} alt="리" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/즈2.png'} alt="즈" className="inline-block w-6 h-6" />,
    <img src={process.env.PUBLIC_URL + '/중.png'} alt="중" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/증.png'} alt="증" className="inline-block" />,
    <img src={process.env.PUBLIC_URL + '/외.png'} alt="외" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/상.png'} alt="상" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/센.png'} alt="센" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/터.png'} alt="터" className="inline-block " />,
  ];
  const line3 = [
    <img src={process.env.PUBLIC_URL + '/o2.png'} alt="O" className="inline-block w-8 h-8 " />,
    <img src={process.env.PUBLIC_URL + '/n2.png'} alt="N" className="inline-block w-8 h-8" />,
    <img src={process.env.PUBLIC_URL + '/l2.png'} alt="L" className="inline-block w-8 h-8 " />,
    <img src={process.env.PUBLIC_URL + '/y2.png'} alt="Y" className="inline-block w-8 h-8 " />,
    <img src={process.env.PUBLIC_URL + '/o2.png'} alt="O" className="inline-block w-8 h-8 " />,
    <img src={process.env.PUBLIC_URL + '/n2.png'} alt="N" className="inline-block w-8 h-8 mr-4" />,
    <img src={process.env.PUBLIC_URL + '/n.png'} alt="N" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/e.png'} alt="E" className="inline-block" />,
    <img src={process.env.PUBLIC_URL + '/t.png'} alt="T" className="inline-block" />,
    <img src={process.env.PUBLIC_URL + '/f.png'} alt="F" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/l.png'} alt="L" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/i.png'} alt="I" className="inline-block " />,
    <img src={process.env.PUBLIC_URL + '/x.png'} alt="X" className="inline-block" />,
  ]

  const initialPositionsLine1 = [
    { x: -620, y: -100 }, { x: -380, y: 100 }, { x: -570, y: 300 }, { x: -520, y: 350 },
    { x: -200, y: -100 }, { x: -150, y: 10 }, { x: 420, y: -90 }, { x: 480, y: 180 },
    { x: -150, y: -30 }, 
  ];
  const initialRotationsLine1 = [154, -150, 80, -52, 35, -110, 135, -84, 122];

  const initialPositionsLine2 = [
    { x: -200, y: -150 },
    { x: 0, y: 200 },
    { x: 100, y: -170 },
    { x: -220, y: 600 },
    { x: 340, y: 50 },
    { x: 460, y: -100 },
    { x: 580, y: 400 },
    { x: -400, y: 320 },
    { x: -320, y: 300 },
    { x: 240, y: -50 },
    { x: 600, y: 600 },
    { x: -100, y: 500 },
    { x: 400, y: 0 },
  ];
  const initialRotationsLine2 = [12, -6, 10, 7, -14, 9, -11, 6, -13, 8, 10, -9, 4];

  const initialPositionsLine3 = [
    { x: 120, y: -170 }, { x: 150, y: 130 }, { x: 180, y: -150 }, { x: 90, y: 40 },
    { x: 210, y: 90 }, { x: 240, y: -110 }, { x: 270, y: 70 }, { x: 300, y: -140 },
    { x: 330, y: 60 }, { x: 360, y: -120 }, { x: 0, y: 40 }, { x: 390, y: 40 },
    { x: 390, y: -30 }, 
  ];
  const initialRotationsLine3 = [12, -6, 10, 7, -14, 9, -11, 6, -13, 8, 10, -9, 4];

  const initialImagePositions = [
    { x: -200, y: -200 },
    { x: 250, y: 150 },
    { x: -400, y: 400 },
    { x: 150, y: 150 },
    { x: 300, y: 200 },
    { x: 200, y: -100 },
    { x: 150, y: 400 },
  ];
  const initialImageRotations = [15, -10, 12, -8, 10, -6, 9];

  const finalImagePositions = [
    { x: 400, y: -200 },
    { x: 270, y: 200 },
    { x: 400, y: 80 },
    { x: -400, y: 150 },
    { x: -600, y: -300 },
    { x: 200, y: -250 },
    { x: 170, y: 50 },
  ];
  const finalImageRotations = [-10, 15, -12, 14, -8, 11, -9];

  const scrollEffect = Math.min(scrollY / 5, 100);

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

  return (
   <section id="merge-section" className="hidden lg:block w-full h-[500vh] flex items-start justify-center relative z-10">
      <img
    src={process.env.PUBLIC_URL + '/hospitalbg.png'}
    alt="병원 배경"
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  />
      <div className="sticky top-[10%] flex flex-col items-center space-y-4">

        {/* Line 1 */}
        <div className="flex space-x-2">
          {line1.map((letter, index) => {
            const { x, y } = initialPositionsLine1[index];
            const rotate = initialRotationsLine1[index] * (1 - progress);
            const currentX = x * (1 - progress);
            const currentY = y * (1 - progress);
            return (
              <span
                key={`line1-${index}`}
                className="font-medical text-6xl tracking-wide text-white"
                style={{
                  transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Line 2 */}
        <div className="flex space-x-2">
          {line2.map((letter, index) => {
            const { x, y } = initialPositionsLine2[index];
            const rotate = initialRotationsLine2[index] * (1 - progress);
            const currentX = x * (1 - progress);
            const currentY = y * (1 - progress);
            return (
              <span
                key={`line2-${index}`}
                className="font-medical text-6xl tracking-wide text-white"
                style={{
                  transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Line 3 */}
        <div className="flex space-x-2">
          {line3.map((letter, index) => {
            const { x, y } = initialPositionsLine3[index];
            const rotate = initialRotationsLine3[index] * (1 - progress);
            const currentX = x * (1 - progress);
            const currentY = y * (1 - progress);
            return (
              <span
                key={`line3-${index}`}
                className="font-medical text-6xl  text-white"
                style={{
                  transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
        </div>

                {/* Images */}
<div
  className={`${
    stopScrollY !== null && scrollY >= stopScrollY ? 'absolute' : 'fixed'
  } left-1/2 transform -translate-x-1/2 flex flex-nowrap items-center justify-center gap-4 z-50`}
  style={{
    top:
      stopScrollY !== null && scrollY >= stopScrollY
        ? `${stopScrollY - section3Top + window.innerHeight * 0.4}px`
        : '40%',
    transform: 'translateX(-50%)',
  }}
>
  {initialImagePositions.map((pos, index) => {
    const isFixed = stopScrollY !== null && scrollY >= stopScrollY;

    const progressValue = isFixed ? 1 : progress;
    const progress2Value = isFixed ? 1 : progress2;

    const currentX =
      pos.x * (1 - progressValue) + finalImagePositions[index].x * progress2Value;
    const currentY =
      pos.y * (1 - progressValue) + finalImagePositions[index].y * progress2Value;
    const rotate =
      initialImageRotations[index] * (1 - progressValue) +
      finalImageRotations[index] * progress2Value;

    return (
<img
  key={`image-${index}`}
  src={process.env.PUBLIC_URL + `/image${index + 1}.png`}
  alt={`image-${index + 1}`}
  className="w-32 h-auto object-cover transition-transform duration-300 cursor-pointer"
  style={{
    transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`,
    opacity: 1,
  }}
  onClick={() =>
    setSelectedImage({
      index,
      name: imageName[index],
      job: job[index],
      description: imageDescriptions[index],
    })
  }
/>
    );
  })}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[300]"
          
        >
          <div
            className="p-4 bg-white h-[400px] flex max-w-4xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
          <img
          src={process.env.PUBLIC_URL + '/close.png'}
          alt="닫기"
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-8 w-6 h-6 cursor-pointer"
          />
            <div className="w-1/2 pr-12 flex items-center justify-center">
              <img
                src={alternativeImages[selectedImage.index]}
                alt="selected"
                className="w-64 h-[300px] object-cover"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                이름 : {selectedImage.name}
              </h2>
              <div className="text-gray-700 text-lg font-semibold mb-4 leading-relaxed">
                직업 : {selectedImage.job}
              </div>
              <div className="text-gray-700 text-lg leading-relaxed">
                {selectedImage.description}
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

    </section>
  );
};

export default View01;
