/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],      // Body text
      heading: ['Poppins', 'sans-serif'],       // Headings
      mono: ['"Fira Code"', 'monospace'],       // Code
      accent: ['"Playfair Display"', 'serif'],  // Special text
    },
    extend: {
      colors:{
        primary:'#C35029',
        secondary:'#ef9273',
      }
    },
  },
  plugins: [],
}