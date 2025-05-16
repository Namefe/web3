// src/view/clickEffect.jsx
import { useEffect } from "react";

const ClickEffect = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const img = document.createElement("img");
      img.src = process.env.PUBLIC_URL + "/click.png"; // ✅ public 폴더에서 확실하게 불러오기
      img.style.position = "fixed";
      img.style.left = `${e.clientX - 20}px`;
      img.style.top = `${e.clientY - 20}px`;
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.pointerEvents = "none";
      img.style.zIndex = 9999;
      img.style.transform = "scale(0)";
      img.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
      img.style.opacity = 1;

      document.body.appendChild(img);

      // 트리거 (애니메이션 시작)
      requestAnimationFrame(() => {
        img.style.transform = "scale(3)";
        img.style.opacity = 0;
      });

      setTimeout(() => img.remove(), 500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default ClickEffect;
