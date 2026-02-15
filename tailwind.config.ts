import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Roversan Kurumsal Renkleri
        primary: {
          50: '#fef3e7',
          100: '#fde7cf',
          200: '#fbcf9f',
          300: '#f9b76f',
          400: '#f79f3f',
          500: '#f5870f', // Ana turuncu
          600: '#c46c0c',
          700: '#935109',
          800: '#623606',
          900: '#311b03',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Altın sarısı
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        roversan: {
          orange: '#f5870f', // Roversan turuncu
          blue: '#1e40af',   // Koyu mavi
          gray: '#6b7280',   // Gri
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        waveSlow: {
          '0%': { transform: 'translateX(-15%)' },
          '50%': { transform: 'translateX(15%)' },
          '100%': { transform: 'translateX(-15%)' },
        },
        waveMedium: {
          '0%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(20%)' },
          '100%': { transform: 'translateX(-10%)' },
        },
        waveFast: {
          '0%': { transform: 'translateX(8%) translateY(0px)' },
          '50%': { transform: 'translateX(-8%) translateY(-15px)' },
          '100%': { transform: 'translateX(8%) translateY(0px)' },
        },
      },
      animation: {
        waveSlow: 'waveSlow 12s ease-in-out infinite',
        waveMedium: 'waveMedium 10s ease-in-out infinite',
        waveFast: 'waveFast 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config

