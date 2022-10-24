module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#08070c",
        secondary: "#14191c",
        infoBG: "#5f58bf",
        heading: "#a9a4d7",
        normal: "#fff",
        uiBlack: "#070F18",
        uiGray: "#575455",
        footerBG: "#191046",
        darkWhite: "#a0a0a0",
        tealGreen: "#05c46b",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
