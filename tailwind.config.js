/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        PathDraw: 'PathDraw 1s ease forwards',
        drawStroke: 'drawStroke 1s ease forwards',
        float: 'float 1.5s ease-in-out infinite',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
