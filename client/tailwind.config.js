module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0278E4",
        "primary-light": "#0F8CFF",
        "primary-dark": "#51acff",
        darkLight: "#EDEDED",
        dark: "#191A19",
        darkSecondary: "#2b2b2b",
        secondary: "#626262",
        light: "rgba(255, 255, 255, 0.2)",
      },
      spacing: {
        128: "32rem",
      },
      fontSize: {
        mxs: "0.8rem",
        xsm: ".6rem",
      },
    },
    screens: {
      xsm: "400px",
      msm: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
  },
  plugins: [],
  darkMode: "class",
};
