import React, { useState, useEffect } from 'react';

const View01M = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById('merge-section');
    if (section) {
      setSectionTop(section.offsetTop);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);

      const section = document.getElementById('merge-section');
      if (section) {
        const offsetTop = section.offsetTop;
        const height = section.offsetHeight;
        const relativeY = scrollTop - offsetTop;
        const effectiveHeight = height * 0.6;
        const p = Math.min(Math.max(relativeY / effectiveHeight, 0), 1);
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 위치 및 회전 값
  const initialPositionsLine1 = [
    { x: -200, y: -60 }, { x: -140, y: 80 }, { x: -180, y: 160 },
    { x: -160, y: 180 }, { x: -60, y: -60 }, { x: -40, y: 5 },
    { x: 140, y: -40 }, { x: 160, y: 120 }, { x: -50, y: -20 }
  ];
  const initialRotationsLine1 = [40, -40, 30, -20, 15, -30, 45, -25, 35];

  const initialPositionsLine2 = [
    { x: -80, y: -60 }, { x: 0, y: 80 }, { x: 40, y: -70 },
    { x: -100, y: 200 }, { x: 140, y: 40 }, { x: 180, y: -60 },
    { x: 220, y: 160 }, { x: -160, y: 140 }, { x: -120, y: 120 },
    { x: 100, y: -20 }, { x: 240, y: 200 }, { x: -40, y: 160 },
    { x: 180, y: 0 }
  ];
  const initialRotationsLine2 = [10, -4, 8, 6, -10, 7, -9, 5, -8, 6, 8, -7, 3];

  const initialPositionsLine3 = [
    { x: 60, y: -90 }, { x: 80, y: 60 }, { x: 100, y: -80 },
    { x: 40, y: 20 }, { x: 110, y: 40 }, { x: 120, y: -60 },
    { x: 140, y: 40 }, { x: 160, y: -70 }, { x: 180, y: 30 },
    { x: 200, y: -60 }, { x: 0, y: 20 }, { x: 220, y: 20 },
    { x: 220, y: -10 }
  ];
  const initialRotationsLine3 = [8, -4, 7, 5, -10, 6, -8, 4, -7, 5, 6, -5, 3];

  // 이미지 파일명
  const line1Files = ['우.png', '린.png', '계.png', '속.png', '뛰.png', '어.png', '야.png', '한.png', '다.png'];
  const line2Files = ['넷2.png', '플2.png', '릭2.png', '스2.png', '시2.png', '리2.png', '즈2.png', '중.png', '증.png', '외.png', '상.png', '센.png', '터.png'];
  const line3Files = ['o2.png', 'n2.png', 'l2.png', 'y2.png', 'o2.png', 'n2.png', 'n.png', 'e.png', 't.png', 'f.png', 'l.png', 'i.png', 'x.png'];

  return (
    <section id="merge-section" className="block lg:hidden w-full h-[300vh] flex items-start justify-center relative z-10 bg-black">
      <img
        src={process.env.PUBLIC_URL + '/hospitalbg.png'}
        alt="배경"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="sticky top-[30%] flex flex-col items-center space-y-4 z-10">
        {/* Line 1 */}
        <div className="flex space-x-2">
          {line1Files.map((file, index) => {
            const x = initialPositionsLine1[index].x * (1 - progress);
            const y = initialPositionsLine1[index].y * (1 - progress);
            const rotate = initialRotationsLine1[index] * (1 - progress);
            return (
              <span
                key={`line1-${index}`}
                className="font-medical text-white"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + '/' + file}
                  alt={file}
                  className="inline-block w-6 h-6"
                />
              </span>
            );
          })}
        </div>

        {/* Line 2 */}
        <div className="flex space-x-2">
          {line2Files.map((file, index) => {
            const x = initialPositionsLine2[index].x * (1 - progress);
            const y = initialPositionsLine2[index].y * (1 - progress);
            const rotate = initialRotationsLine2[index] * (1 - progress);
            return (
              <span
                key={`line2-${index}`}
                className="font-medical text-white"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + '/' + file}
                  alt={file}
                  className="inline-block w-6 h-6"
                />
              </span>
            );
          })}
        </div>

        {/* Line 3 */}
        <div className="flex space-x-2">
          {line3Files.map((file, index) => {
            const x = initialPositionsLine3[index].x * (1 - progress);
            const y = initialPositionsLine3[index].y * (1 - progress);
            const rotate = initialRotationsLine3[index] * (1 - progress);
            return (
              <span
                key={`line3-${index}`}
                className="font-medical text-white"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + '/' + file}
                  alt={file}
                  className="inline-block w-8 h-8"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default View01M;
