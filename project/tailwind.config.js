/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blu: '#235377',
          verde: '#1F915E',
          ottanio: '#2F797E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '12px',
        '3xl': '16px',
      },
      backdropBlur: {
        xs: '10px',
      },
    },
  },
  plugins: [],
};
