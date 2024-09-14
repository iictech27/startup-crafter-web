/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6469EC",
        textColor: "#1C1C1C", //#000000
        btnColor: "#60A4F5",
        violetBtnColor: "#cf95d9",
        gradientStop1: "#005394",
        gradientStop2: "#67bdff",
        inputBg: "#E3F5FF",
        highlight: "#0AE4C9",
        newHighlight: "#1982B7",
        gradient1: "#F2E0F5",
      },
      fontFamily: {
        inter: ["Inter", "sans"],
        inknut: ["Inknut Antiqua", "serif"],
        imprima: ["Imprima", "sans"],
        inria: ["Inria Serif", "sans-serif"],
        italiana: ["Italiana", "sans-serif"],
        imfell: ["IM Fell English SC", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
