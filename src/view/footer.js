import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <img src="/logo.png" alt="회사 로고" className="w-32 h-auto" />
          <p className="text-xs text-gray-400 leading-snug">
            글로벌 콘텐츠 제작 및 유통<br />
            드라마 · 영화 · OTT 서비스 전문 배급
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <h3 className="text-sm font-semibold">CONTACT</h3>
          <p>+82 2-1234-5678 | 서울 강남구 123</p>
          <p>business@yourcompany.com</p>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex gap-3">
            <a href="#" className="hover:text-gray-300">YouTube</a>
            <a href="#" className="hover:text-gray-300">Instagram</a>
            <a href="#" className="hover:text-gray-300">LinkedIn</a>
          </div>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4 text-[10px] text-gray-500 text-center">
        © 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
