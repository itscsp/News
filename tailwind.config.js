/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "20px",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "100%", // Full width on small screens
        md: "768px", // Adjust width on medium screens
        lg: "1024px", // Adjust width on large screens
        xl: "1200px", // 1200px max width for extra-large screens
      },
    },
  },
  plugins: [],
}
