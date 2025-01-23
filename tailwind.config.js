/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {*} */
const getTheme = require('./themes/get-theme.mjs')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
      screens: {
        xs: '375px',
        '2xl': '1980px',
      },
    },

    colors: {
      dark: 'hsl(var(--black))',
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      light: 'hsl(var(--light))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',

      primary: {
        DEFAULT: 'hsl(var(--primary))',
        's-lighter': 'hsl(var(--primary-s-lighter))',
        lighter: 'hsl(var(--primary-lighter))',
        light: 'hsl(var(--primary-light))',
        dark: 'hsl(var(--primary-dark))',
        darker: 'hsl(var(--primary-darker))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        's-lighter': 'hsl(var(--secondary-s-lighter))',
        lighter: 'hsl(var(--secondary-lighter))',
        light: 'hsl(var(--secondary-light))',
        dark: 'hsl(var(--secondary-dark))',
        darker: 'hsl(var(--secondary-darker))',
        foreground: 'hsl(var(--secondary-foreground))',
      },

      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      active: {
        DEFAULT: 'hsl(var(--active-button))',
        foreground: 'hsl(var(--active-button-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },

      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },

      white: {
        DEFAULT: 'hsl(var(--white))',
      },
      black: {
        DEFAULT: 'hsl(var(--black))',
      },

      bgAccent: {
        DEFAULT: 'hsl(var(--bgAccent))',
      },

      warning: {
        DEFAULT: 'hsl(var(--warning))',
        foreground: 'hsl(var(--black))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--black))',
      },
      info: {
        DEFAULT: 'hsl(var(--info))',
        foreground: 'hsl(var(--black))',
      },
      alert: {
        DEFAULT: 'hsl(var(--alert))',
        foreground: 'hsl(var(--black))',
      },
      error: {
        DEFAULT: 'hsl(var(--error))',
        foreground: 'hsl(var(--black))',
      },
    },

    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        default: 'var(--shadow)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'tabContent-right': {
          from: { translate: '-500', opacity: '0' },
          to: { translate: '0', opacity: '100' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'tabContent-right': 'tabContent-right 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-motion'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    getTheme(),
  ],
}
