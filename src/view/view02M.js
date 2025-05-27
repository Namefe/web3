import React, { useEffect, useRef, useState } from 'react';

const View02M = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = sectionTop - windowHeight * 0.1;
      const end = sectionTop + sectionHeight;

      const p = (scrollY - start) / (end - start);
      const clamped = Math.min(Math.max(p, 0), 1);
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = [
    '/image1.png',
    '/image2.png',
    '/image3.png',
    '/image4.png',
    '/image5.png',
    '/image6.png',
    '/image7.png',
  ];

  // flex 전환 기준 (예: 0.5 이후부터 세로로)
  const isVertical = scrollProgress > 0.4;
  const gapValue = 24;

  return (
    <section
      ref={sectionRef}
      className="block lg:hidden w-full h-[500vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/longboard.png'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`sticky top-0 flex transition-all duration-700 ease-in-out`}
        style={{
          flexDirection: isVertical ? 'column' : 'row',
          gap: `${gapValue}px`,
          opacity: scrollProgress,
          transform: `scale(${0.8 + 0.2 * scrollProgress})`,
        }}
      >
        {images.map((src, i) => {
          const delayFactor = i * 0.05;
          const imgOpacity = Math.max(0, Math.min(1, (scrollProgress - delayFactor) / 0.3));
          const translateY = isVertical ? 0 : 30 * (1 - scrollProgress);

          return (
            <img
              key={i}
              src={process.env.PUBLIC_URL + src}
              alt={`scroll-img-${i}`}
              className="w-12 h-20 object-cover transition-all duration-700 ease-in-out"
              style={{
                opacity: imgOpacity,
                transform: `translateY(${translateY}px)`,
                
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default View02M;
