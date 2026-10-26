/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'oac-black': '#0C0C0C',
        'oac-dark': '#121212',
        'oac-surface': '#181818',
        'oac-card': '#141414',
        'oac-red': '#D91515',
        'oac-crimson': '#BF1010',
        'oac-gold': '#F3B334',
        'oac-amber': '#D49419',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Outfit', '"Noto Sans JP"', '"Nirmala UI"', 'system-ui', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(217, 21, 21, 0.4)',
        'glow-gold': '0 0 25px rgba(243, 179, 52, 0.3)',
        'glow-crimson': '0 0 35px rgba(217, 21, 21, 0.6)',
        'aura': '0 0 50px rgba(217, 21, 21, 0.25), 0 0 100px rgba(243, 179, 52, 0.15)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out infinite 2.5s',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 14s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'radar': 'radar 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'badge-pulse': 'badgePulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217, 21, 21, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(243, 179, 52, 0.6)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        radar: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
