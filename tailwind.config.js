/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // ⬅ 필요시 jsx도 추가
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        fowell: ['Fowell', 'sans-serif'],
      },
      keyframes: {
        PathDraw: {
          '0%': { strokeDashoffset: '999' },
          '100%': { strokeDashoffset: '0' },
        },
        drawStroke: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        PathDraw: 'PathDraw 1s ease forwards',
        drawStroke: 'drawStroke 1s ease forwards',
      },
    },
  },
  plugins: [],
};
