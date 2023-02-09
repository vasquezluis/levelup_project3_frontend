/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cardinal": "#C41E3D",
        "burgundy": "#7D1128",
        "light-white": "rgba(255,255,255,0.18)",
      },
    },
  },
  plugins: [],
};
