/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        maxWidth:"100%",
        center:true,
        padding:"2rem",
      }
    },
  },
  plugins: [],
}

