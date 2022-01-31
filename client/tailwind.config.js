module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0278E4",
        secondary: "#626262",
        light: "rgba(255, 255, 255, 0.2)",
      },
      spacing: {
        128: "32rem",
      },
      fontSize: {
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
    },
  },
  plugins: [],
};
