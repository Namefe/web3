import React, { useEffect, useState } from 'react';

const View02 = () => {
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('scatter-section');
      const scrollTop = window.scrollY;
      const offsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const relativeY = scrollTop - offsetTop;
      const effectiveHeight = sectionHeight * 0.6;
      const p = Math.min(Math.max(relativeY / effectiveHeight, 0), 1);

      setProgress2(p);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="scatter-section"
      className="w-full h-[300vh]"
        style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`,
            // backgroundSize: 'cover',
            backgroundRepeat : 'repeat-x',
            backgroundPosition: 'center',
            backgroundAttachment : 'fixed',
            position: 'relative',
        }}
    >
    </section>
  );
};


export default View02;