/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // System font stack with modern alternatives
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'sans-serif'],
        
        // Slightly more geometric headline font
        headline: ['Montserrat', 'sans-serif'],
        
        // Clean, tech-friendly body font
        body: ['Open Sans', 'sans-serif']
      },
      container: {
        center: true,
        padding: "20px",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "100%", 
        md: "768px", 
        lg: "1024px", 
        xl: "1200px",
      },
    },
  },
  plugins: [],
}