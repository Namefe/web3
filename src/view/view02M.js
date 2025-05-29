import React, { useEffect, useRef, useState } from 'react';

const View02M = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [angle, setAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = sectionTop - windowHeight * 1;
      const end = sectionTop + sectionHeight;

      const p = (scrollY - start) / (end - start);
      const clamped = Math.min(Math.max(p, 0), 1);
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let frameId;
    const animate = () => {
      setAngle(prev => prev + 0.03);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const images = [
    '/image1.png',
    '/image2.png',
    '/image3.png',
    '/image4.png',
    '/image5.png',
    '/image6.png',
    '/image7.png',
  ];

  const altImages = [
    '/clickimage1.png',
    '/clickimage2.png',
    '/clickimage3.png',
    '/clickimage4.png',
    '/clickimage5.png',
    '/clickimage6.png',
    '/clickimage7.png',
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

  const imageName = ["백강혁", "양재훈", "천장미", "박경원", "한유림", "강명희", "홍재림"];
  const job = [
    "외상외과 교수 겸 중증외상센터장",
    "외상외과 전임의",
    "중증외상센터 시니어 간호사",
    "마취통증의학과 전공의",
    "외과 과장 겸 대장항문외과 과장",
    "보건복지부 장관",
    "기획조정실장 겸 감염내과 교수",
  ];

  return (
    <section
      ref={sectionRef}
      className="block lg:hidden w-full h-[500vh] flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/longboard.png'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* 이미지 */}
      <div
        className="sticky top-[5vh] flex flex-col items-center z-10"
        style={{
          gap: `80px`,
          opacity: scrollProgress,
          transform: `scale(${0.8 + 0.2 * scrollProgress})`,
          transition: 'all 0.7s ease-in-out',
        }}
      >
        {images.map((src, i) => {
          const delayFactor = i * 0.03;
          const imgOpacity = Math.max(0, Math.min(1, (scrollProgress - delayFactor) / 0.2));
          const randomOffsetX = ((i % 2 === 0 ? 1 : -1) * (15 + (i * 13) % 40)).toFixed(1);
          const swingY = 10 * Math.sin(angle + i);
          const rotate = (Math.sin(angle + i) * 5).toFixed(2);

          return (
            <img
              key={i}
              src={process.env.PUBLIC_URL + src}
              alt={`scroll-img-${i}`}
              className="w-16 h-28 object-cover transition-transform duration-[200ms] ease-in-out cursor-pointer"
              style={{
                opacity: imgOpacity,
                transform: `translateX(${randomOffsetX}px) translateY(${swingY}px) rotate(${rotate}deg)`,
              }}
              onClick={() =>
                setSelectedImage({
                  src: process.env.PUBLIC_URL + altImages[i],
                  name: imageName[i],
                  job: job[i],
                  description: imageDescriptions[i],
                })
              }
            />
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]">
          <div className="p-4 bg-white h-[400px] flex flex-col w-[90%] max-w-md relative rounded-xl shadow-lg">
            <img
              src={process.env.PUBLIC_URL + '/close.png'}
              alt="닫기"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
            />
            <div className="flex justify-center mb-4">
              <img src={selectedImage.src} alt="modal" className="w-40 h-40 object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">이름: {selectedImage.name}</h2>
            <p className="text-sm text-gray-600 font-semibold mb-2">직업: {selectedImage.job}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{selectedImage.description}</p>
          </div>
        </div>
      )}

    </section>
  );
};

export default View02M;
