import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const View03 = () => {
  const [showRelation, setShowRelation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("section03");
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollTop > sectionTop + sectionHeight * 0.05) {
        setShowRelation(true);
      } else {
        setShowRelation(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImage =
  `url(${process.env.PUBLIC_URL + '/sec2bg.png'})`;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' }); // 조금 일찍 감지됨

  return (
    <section
    ref={ref}
      id="section03"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
      className="w-screen h-[300vh]"
    >
      {showRelation && (
        <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/board2.png'})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
          <motion.div
            className="hidden lg:block absolute left-[23%] top-[18%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            생명의 은인 
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[62%] top-[31%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            조폭
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[47%] top-[34%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            노예 1호
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[73%] top-[19%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            낙하산 인사
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[80%] top-[30%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            병원 적자의 원흉
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[23%] top-[33%] text-white text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            마취과의 유일한 희망
          </motion.div>
          </motion.div>
        </>
      )}
      
    </section>
  );
};

export default View03;
