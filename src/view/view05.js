import { useState, useEffect } from "react";

const SupportHover = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100 relative"
             onMouseMove={handleMouseMove}>
      <div
        className=" relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src="/check.png"
          alt="중증외상센터 홍보 전단지"
          className="w-[300px] h-[400px] object-contain"
        />

        {isHovering && (
          <div
            className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold"
            style={{
              width: "100px",
              height: "100px",
              left: cursorPos.x - 50,
              top: cursorPos.y - 50,
            }}
          >
            지원하기
          </div>
        )}
      </div>
    </section>
  );
};

export default SupportHover;
