import React, { useState, useEffect } from 'react';

const documents = [
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage1.png",
      process.env.PUBLIC_URL + "/scrollimage3.png"
    ],
    title: "서류 1 제목",
    description: "서류 1의 상세 내용입니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage2.png",
      process.env.PUBLIC_URL + "/scrollimage4.png"
    ],
    title: "서류 2 제목",
    description: "서류 2의 상세 내용입니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage5.png",
      process.env.PUBLIC_URL + "/scrollimage6.png"
    ],
    title: "서류 3 제목",
    description: "서류 3의 상세 내용입니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage5.png",
      process.env.PUBLIC_URL + "/scrollimage6.png"
    ],
    title: "서류 4 제목",
    description: "서류 4의 상세 내용입니다.",
  },
  {
    images: [
      process.env.PUBLIC_URL + "/scrollimage5.png",
      process.env.PUBLIC_URL + "/scrollimage6.png"
    ],
    title: "서류 5 제목",
    description: "서류 5의 상세 내용입니다.",
  },
];

const HospitalDocuments = () => {
  const [progress, setProgress] = useState(0);
  const [boxOpacity, setBoxOpacity] = useState(0);
  const [boxScale, setBoxScale] = useState(1);
  const [boxTranslateY, setBoxTranslateY] = useState('-50%');

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('document-section');
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const p = (scrollTop - sectionTop) / (sectionHeight - window.innerHeight);

      const opacity = Math.min(Math.max(p / 0.2, 0), 1);
      setBoxOpacity(opacity);

      const scaleProgress = Math.min(Math.max((p - 0.2) / 0.3, 0), 1);
      const newScale = 1 + scaleProgress * 0.3;
      setBoxScale(newScale);

      const translateProgress = Math.min(Math.max((p - 0.2) / 0.5, 0), 1);
      const translateY = -50 + translateProgress * 70;
      setBoxTranslateY(`${translateY}%`);

      const docProgress = Math.min(Math.max((p - 0.7) / 0.3, 0), 1);
      setProgress(docProgress * documents.length);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calcTranslateY = (index) => {
    const local = progress - index;
    if (local < 0 || local > 1) return '100%';
    const move = Math.sin(local * Math.PI) * -20;
    return `${move}%`;
  };

  const currentIndex = Math.floor(progress);

  return (
    <section id="document-section" className="h-[500vh] bg-gray-100 relative">
      <div className="sticky top-0 h-screen flex items-center justify-between px-20">

        <div className="text-8xl font-bold text-gray-800">
          {currentIndex + 1}
        </div>

        <div className="relative w-[700px] h-[500px] flex justify-center items-center">
          <img
            src="/box.png"
            alt="box"
            className="absolute top-1/2 left-1/2 w-[300px] h-full object-contain z-30 transition-transform duration-300"
            style={{
              opacity: boxOpacity,
              transform: `translate(-50%, ${boxTranslateY}) scale(${boxScale})`
            }}
          />

          {documents.map((doc, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-[60%] h-[80%] flex items-center justify-center z-20"
              style={{
                transform: `translate(-50%, -50%) translateY(${calcTranslateY(index)}) scale(${boxScale})`,
                opacity: progress > 0 ? 1 : 0,
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
              }}
            >
              <img src="/list.png" alt="document-bg" className="w-full h-full object-contain" />

              {/* 겹쳐진 file 이미지들 */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-20 w-full h-full">
                <div className="relative w-full h-full">
                  {doc.images.map((img, i) => (
                    <div
                      key={i}
                      className="absolute w-[160px] h-[200px]"
                      style={{
                        top: `${0 + i * 20}px`,
                        left: `${100 + i * 40}px`,
                        zIndex: 10 + i,
                        transform: `rotate(${i % 2 === 0 ? -3 : 4}deg)`
                      }}
                    >
                      <div className="absolute inset-[10%] z-20 flex items-center justify-center">
                        <img
                          src={img}
                          alt={`doc-${index}-${i}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[400px] text-gray-800">
          <h2 className="text-4xl font-bold mb-4">{documents[currentIndex]?.title}</h2>
          <p className="text-xl leading-relaxed">{documents[currentIndex]?.description}</p>
        </div>

      </div>
    </section>
  );
};

export default HospitalDocuments;
