import React, { useState, useEffect } from 'react';

const View01 = () => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const section1 = document.getElementById('merge-section');
      const section2 = document.getElementById('scatter-section');
      const scrollTop = window.scrollY;

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
        const triggerOffset = 300; // 300px 일찍 시작
        const relativeY2 = scrollTop - (offsetTop2 - triggerOffset);
        const effectiveHeight2 = height2 * 0.2;
        const p2 = Math.min(Math.max(relativeY2 / effectiveHeight2, 0), 1);
        setProgress2(p2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1 = ['T', 'R', 'A', 'U', 'M', 'A', '', 'C', 'E', 'N', 'T', 'E', 'R', ':'];
  const line2 = ['T', 'H', 'E', '', 'G', 'O', 'L', 'D', 'E', 'N', '', 'H', 'O', 'U', 'R'];

  const initialPositionsLine1 = [
    { x: -220, y: -30 }, { x: -300, y: 200 }, { x: -270, y: -100 }, { x: -220, y: 150 },
    { x: -200, y: -100 }, { x: -150, y: 120 }, { x: -120, y: -90 }, { x: -80, y: 180 },
    { x: -50, y: -60 }, { x: -20, y: 140 }, { x: 0, y: -100 }, { x: 30, y: 100 },
    { x: 60, y: -130 }, { x: 90, y: 160 },
  ];
  const initialRotationsLine1 = [10, -15, 8, -12, 5, -10, 15, -8, 12, -5, 10, -7, 6, -9];

  const initialPositionsLine2 = [
    { x: 120, y: -170 }, { x: 150, y: 130 }, { x: 180, y: -150 }, { x: 90, y: 40 },
    { x: 210, y: 90 }, { x: 240, y: -110 }, { x: 270, y: 70 }, { x: 300, y: -140 },
    { x: 330, y: 60 }, { x: 360, y: -120 }, { x: 0, y: 40 }, { x: 390, y: 40 },
    { x: 390, y: -30 }, { x: 200, y: 20 }, { x: 180, y: 180 },
  ];
  const initialRotationsLine2 = [12, -6, 10, 7, -14, 9, -11, 6, -13, 8, 10, -9, 4, -7, 5];

  const initialImagePositions = [
    { x: -100, y: -200 },
    { x: 250, y: -150 },
    { x: -200, y: 100 },
    { x: 150, y: 50 },
    { x: -100, y: 100 },
    { x: 200, y: -100 },
    { x: -70, y: 100 },
  ];
  const initialImageRotations = [15, -10, 12, -8, 10, -6, 9];

  const finalImagePositions = [
    { x: 400, y: -200 },
    { x: 400, y: -10 },
    { x: 350, y: -200 },
    { x: -150, y: -50 },
    { x: -450, y: -300 },
    { x: 150, y: -300 },
    { x: -100, y: -50 },
  ];
  const finalImageRotations = [-10, 15, -12, 14, -8, 11, -9];

  const scrollEffect = Math.min(scrollY / 5, 50);

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
  "이건 이미지 1번에 대한 설명입니다. 이 이미지는 매우 특별한 의미를 담고 있습니다.",
  "이건 이미지 2번에 대한 설명입니다. 두 번째 이미지는 감정적인 메시지를 전달합니다.",
  "이건 이미지 3번에 대한 설명입니다. 상징적인 요소들이 포함되어 있어요.",
  "이건 이미지 4번에 대한 설명입니다. 회복의 과정이 담겨 있습니다.",
  "이건 이미지 5번에 대한 설명입니다. 삶의 균형을 표현하고 있어요.",
  "이건 이미지 6번에 대한 설명입니다. 시간과 공간을 넘나드는 느낌을 줍니다.",
  "이건 이미지 7번에 대한 설명입니다. 치유와 연결의 메시지를 전달합니다.",
];
const imageName = [
  "백강혁","양재훈","천장미","박경원","한유림","강명희","홍재림"
]
const job =[
  "의사","간호사","물리치료사","작업치료사","심리상담사","사회복지사","영양사"
]

  return (
    <section
      id="merge-section"
      className="w-full h-[500vh] bg-gray-600 flex items-start justify-center relative z-10"
    >
      <div className="sticky top-[30%] flex flex-col items-center space-y-4">

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

        {/* Images */}
        <div className="fixed top-[300px] flex flex-wrap justify-center items-center gap-4 mt-10 z-50">
          {initialImagePositions.map((pos, index) => {
            const isSelected = selectedImage !== null;
            const currentX =  pos.x * (1 - progress) + finalImagePositions[index].x * progress2;
            const currentY =  pos.y * (1 - progress) + finalImagePositions[index].y * progress2 + scrollEffect;
            const rotate = initialImageRotations[index] * (1 - progress) + finalImageRotations[index] * progress2;

            return (
<img
  key={`image-${index}`}
  src={process.env.PUBLIC_URL + `/image${index + 1}.png`}
  alt={`image-${index + 1}`}
  className="w-32 h-32 object-cover transition-transform duration-75 cursor-pointer"
  style={{
    transform: `translate(${pos.x * (1 - progress) + finalImagePositions[index].x * progress2}px, ${
      pos.y * (1 - progress) + finalImagePositions[index].y * progress2 + scrollEffect
    }px) rotate(${initialImageRotations[index] * (1 - progress) + finalImageRotations[index] * progress2}deg)`,
  }}
onClick={() =>
  setSelectedImage({
    src: process.env.PUBLIC_URL + `/image${index + 1}.png`,
    description: imageDescriptions[index],
    name: imageName[index],
    job: job[index],
    index: index,
  })
}
/>
            );
          })}
        </div>
      </div>

      {/* Modal */}
{selectedImage !== null && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-60"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className=" p-4 bg-white h-[400px] flex max-w-4xl w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 왼쪽: 이미지 */}
      <div className="w-1/2 pr-6 flex items-center justify-center">
        <img
          src={alternativeImages[selectedImage.index]}
          alt="selected"
          className="w-64 h-[300px]  object-cover"
        />
      </div>

      {/* 오른쪽: 설명 */}
<div className="w-1/2 pl-6 flex flex-col justify-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    이름 : {selectedImage.name}
  </h2>
    <div className="text-gray-700 text-lg leading-relaxed">
    직업 : {selectedImage.job}
  </div>
  <div className="text-gray-700 text-lg leading-relaxed">
    {selectedImage.description}
  </div>
  </div>
    </div>
  </div>
)}

    </section>
  );
};

export default View01;
