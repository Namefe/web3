import React, { useRef, useEffect } from "react";


const View02 = () => {


  return (
    <div
      id="next-section"
      className="w-full h-[300vh] bg-[#1a1721] relative overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/sec2bg.png"})`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
    </div>
  );
};

export default View02;
