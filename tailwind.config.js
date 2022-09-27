/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-gradient-l": "#A8D5DD",
        "main-gradient-r": "#E3E3E3",
        "sub-gradient-l": "#A8D5DD",
        "sub-gradient-r": "#E3E3E3",
        "sub-color": "#AD679B",
        "main-button-color": "#C8DDE0",
        "sub-button-color": "#A3C1C5",
        "yellow-button": "#CEDEBB",
        "point-color": "#58307F",
      },
      dropShadow: {
        "3xl": "0 30px 55px rgba(0, 0, 0, 0.2)",
        "4xl": "0 40px 40px rgba(0, 0, 0, 0.2)",
      },
    },
    fontFamily: {
      body: [
        "Hiragino Sans",
        "ヒラギノ角ゴシック",
        "メイリオ",
        "Meiryo",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
