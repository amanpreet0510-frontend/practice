/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        playfair: ["var(--font-playfair)"],
        cursive: ["var(--font-cursive)"],
        inter: ["var(--font-inter)"],
        manrope: ["var(--font-manrope)"],
        jakarta: ["var(--font-jakarta)"],
      },
    },
  },
};

export default config;
