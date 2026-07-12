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
        semantic: {
          primary: '#235377',
          success: '#1F915E',
          warning: '#D97706',
          error: '#DC2626',
          info: '#2F797E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['2.25rem', { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'label-md': ['0.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'label-sm': ['0.625rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        '2xl': '12px',
        '3xl': '16px',
        '4xl': '24px',
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      backdropBlur: {
        xs: '10px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.04)',
        medium: '0 8px 30px rgba(0,0,0,0.08)',
        elevated: '0 20px 60px rgba(0,0,0,0.12)',
        glow: '0 0 20px rgba(35, 83, 119, 0.15)',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        overlay: '300',
        modal: '400',
        popover: '500',
        toast: '600',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'ping-once': 'ping-once 0.4s ease-in-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
