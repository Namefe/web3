import React, { useState, useEffect } from 'react';

const View01 = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('merge-section');
      const scrollTop = window.scrollY;
      const offsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const relativeY = scrollTop - offsetTop;
      const effectiveHeight = sectionHeight * 0.6;
      const p = Math.min(Math.max(relativeY / effectiveHeight, 0), 1);

      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1 = ['T', 'R', 'A', 'U', 'M', 'A', '', 'C', 'E', 'N', 'T', 'E', 'R', ':'];
  const line2 = ['T', 'H', 'E', 'G', 'O', 'L', 'D', 'E', 'N', 'H', 'O', 'U', 'R'];

  const initialPositionsLine1 = [
    { x: -220, y: -30 }, { x: -300, y: 200 }, { x: -270, y: -100 }, { x: -220, y: 150 },
    { x: -200, y: -100 }, { x: -150, y: 120 }, { x: -120, y: -90 },  { x: -80, y: 180 },
    { x: -50, y: -60 },   { x: -20, y: 140 },  { x: 0, y: -100 },     { x: 30, y: 100 },
    { x: 60, y: -130 },   { x: 90, y: 160 },
  ];

  const initialPositionsLine2 = [
    { x: 120, y: -170 },  { x: 150, y: 130 },  { x: 180, y: -150 },  { x: 210, y: 90 },
    { x: 240, y: -110 },  { x: 270, y: 70 },   { x: 300, y: -140 },  { x: 330, y: 60 },
    { x: 360, y: -120 },  { x: 390, y: 40 },   { x: 410, y: -70 },  { x: 200, y: 20 },
    { x: 180, y: 180 },
  ];

  return (
    <section
      id="merge-section"
      className="w-full h-[500vh] bg-gray-600 flex items-start justify-center relative"
    >
      <div className="sticky top-[30%] flex flex-col items-center space-y-4">
        
        {/* Line 1 */}
        <div className="flex space-x-2">
          {line1.map((letter, index) => {
            const { x, y } = initialPositionsLine1[index];
            const currentX = x * (1 - progress);
            const currentY = y * (1 - progress);
            return (
              <span
                key={`line1-${index}`}
                className="text-6xl font-extrabold text-white mx-1 transition-transform duration-75"
                style={{
                  transform: `translate(${currentX}px, ${currentY}px)`,
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
            const currentX = x * (1 - progress);
            const currentY = y * (1 - progress);
            return (
              <span
                key={`line2-${index}`}
                className="text-6xl font-extrabold text-white mx-1 transition-transform duration-75"
                style={{
                  transform: `translate(${currentX}px, ${currentY}px)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default View01;
