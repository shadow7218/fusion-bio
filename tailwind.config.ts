import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#071638',
          800: '#0E2F76',
        },
        powder: '#A9C0E0',
        ice: '#F4FEFF',
      },
      animation: {
        'aurora-1': 'aurora1 18s ease-in-out infinite alternate',
        'aurora-2': 'aurora2 24s ease-in-out infinite alternate',
        'aurora-3': 'aurora3 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        aurora1: {
          '0%': { transform: 'translate(0%, 0%) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(15%, 10%) scale(1.15) rotate(12deg)' },
          '100%': { transform: 'translate(-10%, 20%) scale(0.95) rotate(-8deg)' },
        },
        aurora2: {
          '0%': { transform: 'translate(0%, 0%) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(-20%, -15%) scale(1.2) rotate(-15deg)' },
          '100%': { transform: 'translate(15%, -10%) scale(0.9) rotate(10deg)' },
        },
        aurora3: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(10%, -20%) scale(1.1)' },
          '100%': { transform: 'translate(-15%, 15%) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
