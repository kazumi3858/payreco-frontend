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
        "main-button": "#C8DDE0",
        "sub-button": "#A3C1C5",
        "gray-button": "#F5F3F2",
        "dark-blue-text": "#7DACB3",
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
