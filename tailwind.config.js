/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ app directory
    "./pages/**/*.{js,ts,jsx,tsx}",     // optional if you use pages
    "./components/**/*.{js,ts,jsx,tsx}",// ✅ components directory
    "./lib/**/*.{js,ts,jsx,tsx}"        // include lib if you style components there
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb", // blue-600 as your brand color
          dark: "#1e40af",    // blue-800 for hover states
        },
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
}

