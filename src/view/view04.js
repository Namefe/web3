import React, { useState, useEffect, useRef } from 'react';

const documents = [
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage1.png",
      process.env.PUBLIC_URL + "/scrollimage8.png"
    ],
    title: "새로운 시작",
    description: "전장에서 수많은 생명을 구해온 천재 외과의사 백강혁은 한국으로 돌아와 몰락 직전의 대학병원 중증외상팀에 부임합니다. 첫날부터 그는 병원 시스템의 문제와 동료들의 냉담한 태도에 직면하지만, 특유의 카리스마로 팀을 재건하기 위한 첫걸음을 내딛습니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage10.png",
      process.env.PUBLIC_URL + "/scrollimage7.png"
    ],
    title: "갈등의 시작",
    description: "병원 경영진은 수익성 부족을 이유로 외상센터를 축소하려 하지만, 백강혁 교수와 팀원들은 이를 막기 위해 나섭니다. 또한, 한 사건을 계기로 백강혁 교수의 과거가 드러나면서 새로운 갈등이 발생합니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage4.png",
      process.env.PUBLIC_URL + "/scrollimage11.png"
    ],
    title: "생명의 은인",
    description: "적자를 바탕으로 백강혁을 비난하던 한유림은 그의 하나밖에 없는 딸이 교통사고로 응급실에 오게 되자 다급히 백강혁에게 살려달라 애원하고, 백강혁은 그에게 '살려준다'라는 말과 함께 그의 딸을 살려낸다. 이를 계기로 한유림은 백강혁에게 우호적으로 돌아서는 계기가 된다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage5.png",
      process.env.PUBLIC_URL + "/scrollimage6.png"
    ],
    title: "블랙윙즈를 찾아간 백강혁",
    description: "이현종 대위를 살리기 위해 남수단으로 날아간 백강혁은 블랙윙즈의 의료시설을 사용하여 수술을 성공적으로 마무리한다. 또한 한국으로 이송하기 위한 에어앰뷸런스를 받아내는대까지 성공하며, 자신이 낙하산이 아니라는것을 증명하게 된다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage13.png",
      process.env.PUBLIC_URL + "/scrollimage12.png"
    ],
    title: "해피앤딩",
    description: "중증외상센터의 적자를 원인으로 백강혁을 내치려던 병원장은 자신의 과거를 생각하며 백강혁을 내치는 대신 닥터헬기 도입을 결정하게 된다. 그렇게 닥터헬기 개소식 행사에 나타난 백강혁은 숨돌릴틈도 없이 닥터헬기를 타고 다시 한번 사람들을 살리기 위해 현장으로 떠난다.",
  },
];

const HospitalDocuments = () => {
  const [progress, setProgress] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);
  const [fixedTop, setFixedTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const p = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
      const clampedP = Math.min(Math.max(p, 0), 1);
      setProgress(clampedP * documents.length);
      setScrollIndex(Math.round(clampedP * (documents.length - 1)));

      if (scrollTop >= sectionTop && scrollTop + windowHeight <= sectionBottom) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
        setFixedTop(sectionBottom - windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <section
        id="section04"
        ref={sectionRef}
        className="bg-gray-100 px-4 py-10 overflow-hidden"
        style={{ height: `${documents.length * 100}vh` }}
      >
        <div
          className="w-full flex items-center"
          style={{
            position: isFixed ? 'fixed' : 'absolute',
            top: isFixed ? 0 : `${fixedTop}px`,
            height: '100vh',
          }}
        >
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${scrollIndex * 100}%)` }}
            >
              {documents.map((doc, index) => (
                <div key={index} className="min-w-full px-4">
                  <h2 className="text-2xl font-bold mb-4 text-center">{doc.title}</h2>
                  <div className="flex justify-center flex-wrap gap-4 mb-4">
                    {doc.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`doc-${index}-${i}`}
                        className="w-[140px] h-[180px] object-cover rounded shadow"
                      />
                    ))}
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed text-center px-2">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const boxOpacity = Math.min(progress / 0.2, 1);
  const boxScale = Math.min(1 + progress * 0.3, 1.3);
  const boxTranslateY = `${-50 + Math.min((progress - 0.2) / 0.5, 1) * 70}%`;
  const calcTranslateY = (index) => {
    const local = progress - index;
    if (local < 0 || local > 1) return '100%';
    const move = Math.sin(local * Math.PI) * -20;
    return `${move}%`;
  };

  const currentIndex = Math.floor(progress);

  return (
    <section ref={sectionRef} id="document-section" className="h-[700vh] bg-gray-100 relative">
      <div className="sticky top-0 h-screen flex items-center justify-between px-20">
        <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-8xl font-bold w-[50px] text-gray-800">
          {currentIndex + 1}
        </div>

<div className="relative w-[700px] h-[500px] overflow-hidden flex justify-center items-center">

  {documents.map((doc, index) => (
    <div
      key={index}
      className="absolute top-1/2 left-1/2 w-[60%] h-[80%] z-20"
      style={{
        transform: `translate(-50%, -50%) scale(${boxScale}) translateY(${calcTranslateY(index)})`,
        transformOrigin: 'center center',
        opacity: boxOpacity > 0.7 ? 1 : 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
      }}
    >
      <div className="relative w-[500px] h-full flex items-center justify-center">
        <img
          src="/list (2).png"
          alt="document-bg"
          className="absolute top-0 left-0 w-full h-full object-contain z-10"
        />

<div className="absolute top-[100px] left-[30%] -translate-x-1/2  z-20" >
  <div className="relative ">
    {doc.images.map((img, i) => (
      <div
        key={i}
        className="absolute w-[160px] h-[100px]"
        style={{
          top: `${i * 100}px`,
          left: `${i * 10}px`,
          zIndex: 10 + i,
          transform: `rotate(${i % 2 === 0 ? -10 : 10}deg)`,
        }}
      >
        <img
          src={img}
          alt={`doc-${index}-${i}`}
          className="w-full h-full object-cover "
        />
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  ))}
</div>


        <div className="w-[400px] text-gray-800">
          <h2 className="text-3xl font-bold mb-4">{documents[currentIndex]?.title}</h2>
          <p className="text-xl leading-relaxed">{documents[currentIndex]?.description}</p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalDocuments;
