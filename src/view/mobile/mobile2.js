import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";

const Mobile2 = () => {
  const [boxShowComplete, setBoxShowComplete] = useState(false);
  const boxRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ["start start", "end end"],
  });

  // 박스 motion values
  const boxOpacity = useMotionValue(0);
  const boxY = useMotionValue(0);
  const boxScale = useMotionValue(1);

  // 각 문서 motion values
  const yMotionValues = [
    useMotionValue(100),
    useMotionValue(100),
    useMotionValue(100),
    useMotionValue(100),
    useMotionValue(100),
  ];
  const opacityMotionValues = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
  ];

  const documents = [
    ["/scrollimage1.png", "/scrollimage8.png"],
    ["/scrollimage4.png", "/scrollimage11.png"],
    ["/scrollimage7.png", "/scrollimage10.png"],
    ["/scrollimage5.png", "/scrollimage6.png"],
    ["/scrollimage13.png", "/scrollimage12.png"],
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      boxOpacity.set(progress < 0.3 ? progress / 0.3 : (progress > 0.8 ? (1 - progress) / 0.2 : 1));
      boxY.set(progress < 0.1 ? 0 : (progress < 0.3 ? (progress - 0.1) / 0.2 * 300 : 300));
      boxScale.set(progress < 0.1 ? 1 : (progress < 0.5 ? 1 + (progress - 0.1) / 0.4 * 0.5 : 1.5));

      const total = documents.length;
      const section = (1 - 0.6) / total;
      for (let idx = 0; idx < total; idx++) {
        const start = 0.6 + idx * section;
        const end = start + section;

        if ( progress < start || progress > end) {
          yMotionValues[idx].set(100);
          opacityMotionValues[idx].set(0);
        } else {
          const localProgress = (progress - start) / section;
        const y = localProgress < 0.5
          ? 100 - localProgress * 2 * 100     // 100 ➔ 0
          : (localProgress - 0.5) * 2 * 100;  // 0 ➔ 100
        const opacity = 1


          yMotionValues[idx].set(y);
          opacityMotionValues[idx].set(opacity);
        }
      }

      // box show flag
      if (progress > 0.6) setBoxShowComplete(true);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={boxRef} className="w-full h-[1000vh] relative bg-[#E1D4C4]">
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
        style={{
          scale: boxScale,
          opacity: boxOpacity,
          y: boxY,
        }}
      >
        {/* 박스 이미지 */}
        <img
          src={process.env.PUBLIC_URL + "/box.png"}
          alt="box"
          className="object-contain w-[350px] h-[200px] mx-auto max-w-[80%] max-h-[80%]"
        />

        {/* 문서 하나씩 올라갔다 내려가기 */}
        {boxShowComplete && (
          <>
            {/* 문서 0 */}
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/imglist.png"}
                alt="imglist"
                className="absolute top-[15%]  -translate-x-1/2 -translate-y-1/2 w-[250px] object-contain z-0"
                style={{
                  y: yMotionValues[0],
                  opacity: opacityMotionValues[0],
                }}
              />
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[0],
                  opacity: opacityMotionValues[0],
                  rotate: -5,
                  x: -30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[0][0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[0],
                  opacity: opacityMotionValues[0],
                  rotate: 5,
                  x: 30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[0][1]} className="w-full h-full object-cover" />
              </motion.div>
            </>

            {/* 문서 1 */}
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/imglist.png"}
                alt="imglist"
                className="absolute top-[15%]  -translate-x-1/2 -translate-y-1/2 w-[250px] object-contain z-0"
                style={{
                  y: yMotionValues[1],
                  opacity: opacityMotionValues[1],
                }}
              />
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[1],
                  opacity: opacityMotionValues[1],
                  rotate: -5,
                  x: -30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[1][0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[1],
                  opacity: opacityMotionValues[1],
                  rotate: 5,
                  x: 30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[1][1]} className="w-full h-full object-cover" />
              </motion.div>
            </>

            {/* 문서 2 */}
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/imglist.png"}
                alt="imglist"
                className="absolute top-[15%]  -translate-x-1/2 -translate-y-1/2 w-[250px] object-contain z-0"
                style={{
                  y: yMotionValues[2],
                  opacity: opacityMotionValues[2],
                }}
              />
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[2],
                  opacity: opacityMotionValues[2],
                  rotate: -5,
                  x: -30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[2][0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[2],
                  opacity: opacityMotionValues[2],
                  rotate: 5,
                  x: 30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[2][1]} className="w-full h-full object-cover" />
              </motion.div>
            </>

            {/* 문서 3 */}
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/imglist.png"}
                alt="imglist"
                className="absolute top-[15%]  -translate-x-1/2 -translate-y-1/2 w-[250px] object-contain z-0"
                style={{
                  y: yMotionValues[3],
                  opacity: opacityMotionValues[3],
                }}
              />
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[3],
                  opacity: opacityMotionValues[3],
                  rotate: -5,
                  x: -30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[3][0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[3],
                  opacity: opacityMotionValues[3],
                  rotate: 5,
                  x: 30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[3][1]} className="w-full h-full object-cover" />
              </motion.div>
            </>

            {/* 문서 4 */}
            <>
              <motion.img
                src={process.env.PUBLIC_URL + "/imglist.png"}
                alt="imglist"
                className="absolute top-[15%]  -translate-x-1/2 -translate-y-1/2 w-[250px] object-contain z-0"
                style={{
                  y: yMotionValues[4],
                  opacity: opacityMotionValues[4],
                }}
              />
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[4],
                  opacity: opacityMotionValues[4],
                  rotate: -5,
                  x: -30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[4][0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute top-[20%]  -translate-x-1/2 -translate-y-1/2 w-[130px] h-[80px]"
                style={{
                  y: yMotionValues[4],
                  opacity: opacityMotionValues[4],
                  rotate: 5,
                  x: 30,
                }}
              >
                <img src={process.env.PUBLIC_URL + documents[4][1]} className="w-full h-full object-cover" />
              </motion.div>
            </>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Mobile2;
