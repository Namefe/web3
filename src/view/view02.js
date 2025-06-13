// ScrollSmoother 없이 ScrollTrigger로 이미지 스크롤 효과 및 스큐 적용 + 튕김 효과
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const View02 = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 50%',
          scrub: true,
        },
      });

      tl.fromTo(
        el,
        {
          y: 200,
          opacity: 0,
          skewY: -10,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 5,
          duration: 0.4,
          ease: 'power3.out',
        }
      ).to(
        el,
        {
          skewY: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  const images = [
    '/clickimage1.png',
    '/clickimage2.png',
    '/clickimage3.png',
    '/clickimage4.png',
    '/clickimage5.png',
    '/clickimage6.png',
    '/clickimage7.png',
  ];

  const positions = [
    { top: '0vh', left: '15%' },
    { top: '30vh', left: '55%' },
    { top: '50vh', left: '30%' },
    { top: '75vh', left: '70%' },
    { top: '80vh', left: '10%' },
    { top: '100vh', left: '40%' },
    { top: '120vh', left: '60%' },
  ];

  return (
    <section
      id="scatter-section"
      className="w-full h-[300vh] bg-[#1a1721] relative overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative w-full h-[300vh]">
        {images.map((src, index) => (
          <img
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            src={process.env.PUBLIC_URL + src}
            alt={`img${index + 1}`}
            className="absolute w-[250px] h-auto object-cover"
            style={{
              top: positions[index].top,
              left: positions[index].left,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default View02;
