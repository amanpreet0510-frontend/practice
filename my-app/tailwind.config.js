/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
        script:['var(--font-cursive)'],
        poppins: ["var(--font-poppins)", "poppins"],
        playfair: ["var(--font-playfair)",'playfair' ],
        inter: ["var(--font-inter)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        jakarta: ["var(--font-jakarta-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
