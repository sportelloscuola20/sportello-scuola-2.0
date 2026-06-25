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
          oro: '#B45309',
          ambra: '#D97706',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          warm: '#FDFBF7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '12px',
        '3xl': '16px',
      },
      backdropBlur: {
        xs: '10px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.04)',
        medium: '0 8px 30px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ping-once': 'ping-once 0.4s ease-in-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
