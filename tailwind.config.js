/** @type {import('tailwindcss').Config} */
/* eslint-disable max-len */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,md}',
    './pages/**/*.{ts,tsx,mdx,md}',
    './components/**/*.{ts,tsx,mdx,md}',
    './app/**/*.{ts,tsx,mdx,md}',
    './src/**/*.{ts,tsx,mdx,md}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        '2xs': '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      borderWidth: {
        sm: 1,
        md: 2,
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        endless: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-245px)' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        gradient: { to: { backgroundPosition: 'var(--bg-size) 0' } },
        indeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'lb-line': {
          '0%': {
            backgroundPosition: '50% 0, 100% 100%, 0 100%, 0 0',
          },
          '25%': {
            backgroundPosition: '0 0, 100% 50%, 0 100%, 0 0',
          },
          '50%': {
            backgroundPosition: '0 0, 100% 0, 50% 100%, 0 0',
          },
          '75%': {
            backgroundPosition: '0 0, 100% 0, 100% 100%, 0 50%',
          },
          '75.01%': {
            backgroundPosition: '100% 0, 100% 0, 100% 100%, 0 50%',
          },
          '100%': {
            backgroundPosition: '50% 0, 100% 0, 100% 100%, 0 100%',
          },
        },
        'credit-scroll': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-66%)' },
        },
        'shake-horizontal': {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-in-out',
        'accordion-up': 'accordion-up 0.2s ease-in-out',
        endless: 'endless 20s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        gradient: 'gradient 8s linear infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        indeterminate: 'indeterminate 1s infinite linear',
        'lb-line': 'lb-line 3s infinite ease-in-out',
        'credit-scroll': 'credit-scroll 20s linear infinite',
        'shake-horizontal': 'shake-horizontal 0.6s ease-in-out',
      },
    },
  },
};
