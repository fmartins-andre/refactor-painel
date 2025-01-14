/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        active: {
          DEFAULT: 'hsl(var(--active-button))',
          foreground: 'hsl(var(--active-button-foreground))',
        },
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
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
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
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        light: 'hsl(var(--light))',
        dark: 'hsl(var(--black))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'tabContent-right': {
          from: { translate: '-500', opacity: '0' },
          to: { translate: '0', opacity: '100' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'tabContent-right': 'tabContent-right 0.5s ease-in-out',
      },
      letterSpacing: {
        xs: '0.4px',
        sm: '0.25px',
        md: '0.5px',
        lg: '0.15px',
        xl: '0px',
        '2xl': '0.25px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
