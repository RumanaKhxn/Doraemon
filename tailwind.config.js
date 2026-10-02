/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#050914',
        bgDarkNavy: '#071426',
        bgDeepBlue: '#0C2740',
        skyBlue: '#7DD3FC',
        warmCream: '#FDF6E2',
        sunsetOrange: '#FB923C',
        softYellow: '#FEF08A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        ui: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.35em',
      },
    },
  },
  plugins: [],
}
