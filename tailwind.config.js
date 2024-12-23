/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ss: "350px",
      sm: "500px",
      sl: "670px",
      md: "830px",
      ml: "900px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      height: {
        "90screen": "90vh",
        "60screen": "69vh",
      },
    },
  },
  plugins: [],
};
