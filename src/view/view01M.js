import React, { useState, useEffect, useRef } from 'react';

const View01M = () => {
  const sectionRef = useRef(null);
  const section2Ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressSection2, setProgressSection2] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);

      const section1 = sectionRef.current;
      if (section1) {
        const offsetTop = section1.offsetTop;
        const sectionHeight = section1.offsetHeight;
        const relativeY = scrollTop - offsetTop;
        const effectiveHeight = sectionHeight * 0.3;
        const p = Math.min(Math.max(relativeY / effectiveHeight, 0), 1);
        setProgress(p);
      }

      const section2 = section2Ref.current;
  if (section2) {
    const offsetTop = section2.offsetTop;
    const end = offsetTop + window.innerHeight * 1.2;
    const delayOffset = 0.2 * window.innerHeight; // 등장 늦추기
    const p2 = Math.min(Math.max((scrollTop - offsetTop - delayOffset) / (end - offsetTop), 0), 1);
    setProgressSection2(p2);
  }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(() => handleScroll(), 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1Files = ['우.png', '린.png', '계.png', '속.png', '뛰.png', '어.png', '야.png', '한.png', '다.png'];
  const line2Files = ['넷2.png', '플2.png', '릭2.png', '스2.png', '시2.png', '리2.png', '즈2.png', '중.png', '증.png', '외.png', '상.png', '센.png', '터.png'];
  const line3Files = ['o2.png', 'n2.png', 'l2.png', 'y2.png', 'o2.png', 'n2.png', 'n.png', 'e.png', 't.png', 'f.png', 'l.png', 'i.png', 'x.png'];
  const extraImages = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png','image6.png', 'image7.png'];

  const initialPositionsLine1 = [
    { x: -120, y: -80 }, { x: -80, y: 60 }, { x: -100, y: 100 },
    { x: -60, y: 120 }, { x: 0, y: -60 }, { x: 20, y: 20 },
    { x: 80, y: -40 }, { x: 100, y: 80 }, { x: 40, y: -20 }
  ];
  const initialRotationsLine1 = [40, -40, 30, -20, 15, -30, 45, -25, 35];

  const initialPositionsLine2 = [
    { x: -100, y: -80 }, { x: -60, y: 60 }, { x: -20, y: -70 },
    { x: -90, y: 100 }, { x: 80, y: 40 }, { x: 100, y: -60 },
    { x: 120, y: 100 }, { x: -110, y: 90 }, { x: -80, y: 70 },
    { x: 60, y: -20 }, { x: 130, y: 90 }, { x: 0, y: 100 },
    { x: 90, y: 0 }
  ];
  const initialRotationsLine2 = [10, -4, 8, 6, -10, 7, -9, 5, -8, 6, 8, -7, 3];

  const initialPositionsLine3 = [
    { x: -40, y: -90 }, { x: -20, y: 60 }, { x: 0, y: -80 },
    { x: -30, y: 20 }, { x: 10, y: 40 }, { x: 20, y: -60 },
    { x: 40, y: 40 }, { x: 60, y: -70 }, { x: 80, y: 30 },
    { x: 100, y: -60 }, { x: -60, y: 20 }, { x: 120, y: 20 },
    { x: 130, y: -10 }
  ];
  const initialRotationsLine3 = [8, -4, 7, 5, -10, 6, -8, 4, -7, 5, 6, -5, 3];

  const isFixed = progressSection2 >= 1;

  return (
    <>
      <section ref={sectionRef} id="merge-section" className="block lg:hidden w-full h-[500vh] flex items-start justify-center relative z-10 bg-black">
        <img src={process.env.PUBLIC_URL + '/hospitalbg.png'} alt="배경" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="sticky top-[30%] flex flex-col items-center space-y-4 z-10">
          <div className="flex space-x-2">
            {line1Files.map((file, index) => {
              const { x, y } = initialPositionsLine1[index];
              const rotate = initialRotationsLine1[index] * (1 - progress);
              const currentX = x * (1 - progress);
              const currentY = y * (1 - progress);
              return (
                <span key={`line1-${index}`} className="inline-block" style={{ transform: `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`, transition: 'transform 0.3s ease-out' }}>
                  <img src={process.env.PUBLIC_URL + '/' + file} alt={`letter-${index}`} className="w-8 h-8 object-contain" />
                </span>
              );
            })}
          </div>
          <div className="flex space-x-2">
            {line2Files.map((file, index) => {
              const x = initialPositionsLine2[index].x * (1 - progress);
              const y = initialPositionsLine2[index].y * (1 - progress);
              const rotate = initialRotationsLine2[index] * (1 - progress);
              return (
                <span key={`line2-${index}`} className="font-medical text-white" style={{ transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`, transition: 'transform 0.3s ease-out' }}>
                  <img src={process.env.PUBLIC_URL + '/' + file} alt={file} className="inline-block w-6 h-6" />
                </span>
              );
            })}
          </div>
          <div className="flex space-x-2">
            {line3Files.map((file, index) => {
              const x = initialPositionsLine3[index].x * (1 - progress);
              const y = initialPositionsLine3[index].y * (1 - progress);
              const rotate = initialRotationsLine3[index] * (1 - progress);
              return (
                <span key={`line3-${index}`} className="font-medical text-white" style={{ transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`, transition: 'transform 0.3s ease-out' }}>
                  <img src={process.env.PUBLIC_URL + '/' + file} alt={file} className="inline-block w-8 h-8" />
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* <div
        ref={section2Ref}
        className={`${
          isFixed ? 'absolute top-[120vh]' : 'fixed top-[30vh]'
        } left-1/2 -translate-x-1/2 z-30 transition-all`}
      >
        <div
          className="flex gap-4"
          style={{
            flexDirection: progressSection2 < 1 ? 'row' : 'column',
            transition: 'all 0.6s ease',
            opacity: progressSection2,
            transform: `scale(${0.5 + progressSection2 * 0.5})`,
          }}
        >
          {extraImages.map((file, i) => (
            <img
              key={i}
              src={process.env.PUBLIC_URL + '/' + file}
              alt={file}
              className="w-24 h-24 object-cover"
              style={{
                transition: 'transform 0.4s, opacity 0.4s',
                transform: `translateY(${(1 - progressSection2) * 20}px)`,
                opacity: progressSection2,
              }}
            />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default View01M;
