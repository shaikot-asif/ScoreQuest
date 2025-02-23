/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          midNight: "#1E2939",
          blackRussian: "#101828",
        },
        secondary: {
          goldenPoppy: "#FDC700",
          cloudBrust: "#364153",
        },
        natural: {
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
