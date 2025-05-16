import React, { useState, useEffect } from 'react';

const documents = [
  {
    image: process.env.PUBLIC_URL + "/image1.png",
    title: "서류 1 제목",
    description: "서류 1의 상세 내용입니다.",
  },
  {
    image: process.env.PUBLIC_URL + "/image2.png",
    title: "서류 2 제목",
    description: "서류 2의 상세 내용입니다.",
  },
  {
    image: process.env.PUBLIC_URL + "/image3.png",
    title: "서류 3 제목",
    description: "서류 3의 상세 내용입니다.",
  },
  {
    image: process.env.PUBLIC_URL + "/image4.png",
    title: "서류 4 제목",
    description: "서류 4의 상세 내용입니다.",
  },
  {
    image: process.env.PUBLIC_URL + "/image5.png",
    title: "서류 5 제목",
    description: "서류 5의 상세 내용입니다.",
  },
];

const HospitalDocuments = () => {
  const [progress, setProgress] = useState(0);
  const [boxOpacity, setBoxOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('document-section');
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const startOffset = 0.2;
      const p = (scrollTop - sectionTop) / (sectionHeight - window.innerHeight);

      const boxProgress = Math.min(Math.max(p / startOffset, 0), 1);
      setBoxOpacity(boxProgress);

      const adjustedProgress = Math.max(0, (p - startOffset) / (1 - startOffset));
      setProgress(Math.min(adjustedProgress, 1) * documents.length);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calcTranslateY = (index) => {
    const localProgress = progress - index;
    if (localProgress < 0 || localProgress > 1) return '0%';

    const movement = Math.sin(localProgress * Math.PI) * -80;
    return `${movement}%`;
  };

  const currentIndex = Math.floor(progress);

  return (
    <section id="document-section" className="h-[500vh] bg-gray-100 relative">
      <div className="sticky top-0 h-screen flex items-center justify-between px-20">

        {/* 왼쪽: 번호 */}
        <div className="text-8xl font-bold text-gray-800">
          {currentIndex + 1}
        </div>

        {/* 중앙: 박스 + 서류 */}
        <div className="relative w-[700px] h-[500px] flex justify-center items-center">
          {/* 박스 */}
          <img
            src="/box.png"
            alt="box"
            className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-full object-contain z-10"
            style={{ opacity: boxOpacity }}
          />

          {/* 서류들 */}
          {documents.map((doc, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-[60%] h-[80%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0"
              style={{
                transform: `translate(-50%, -50%) translateY(${calcTranslateY(index)})`,
                opacity: boxOpacity,
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              }}
            >
              <img src="/list.png" alt="document-bg" className="w-full h-full object-contain" />
              <img src={doc.image} alt={`document-${index}`} className="absolute w-[50%] top-[20%]" />
            </div>
          ))}
        </div>

        {/* 오른쪽: 설명 텍스트 */}
        <div className="w-[400px] text-gray-800">
          <h2 className="text-4xl font-bold mb-4">{documents[currentIndex]?.title}</h2>
          <p className="text-xl leading-relaxed">{documents[currentIndex]?.description}</p>
        </div>

      </div>
    </section>
  );
};

export default HospitalDocuments;
