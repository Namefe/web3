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
    "실력도, 돈도, 사명감도 있지만 싸가지가 없는 천재 외과의사...",
    "백강혁의 현란한 수술 스킬에 반해 낚여버린 외상외과의 첫번째 제자...",
    "중증외상팀 5년 차 시니어 간호사...",
    "백강혁도 인정한 마취통증의학과 레지던트...",
    "스펙에 자부심이 넘치는 항문외과 과장...",
    "백강혁의 최고의 지원군으로, 보건복지부 장관...",
    "한국대병원 기획조정실장으로 차기 원장을 노리는 인물...",
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
