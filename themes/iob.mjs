/* eslint-disable @typescript-eslint/no-require-imports */
const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--background': '220 0% 100%',
      '--foreground': '0 0% 10%',

      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',

      '--popover': '0 0% 100%',
      '--popover-foreground': '222.2 84% 4.9%',

      '--primary-s-lighter': '294 100% 94%',
      '--primary-lighter': '290 83% 84%',
      '--primary-light': '290 62% 67%',
      '--primary': '282 100% 22%',
      '--primary-dark': '280 100% 19%',
      '--primary-darker': '283 84% 15%',
      '--primary-foreground': '220 0% 100%',

      '--active-button': '282 100% 10%',
      '--active-button-foreground': '220 0% 100%',

      '--secondary-lighter': '337 72% 90%',
      '--secondary-light': '350 84% 85%',
      '--secondary': '339 100% 50%',
      '--secondary-dark': '339 100% 33%',
      '--secondary-darker': '339 82% 22%',
      '--secondary-foreground': '220 0% 100%',

      '--blue': '218 29% 61%',
      '--blue-foreground': '339 100% 50%',

      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',

      '--accent': '210 40% 96%',
      '--accent-foreground': '222.2 47.4% 11.2%',

      '--destructive': '2 100% 63%',
      '--destructive-foreground': '220 0% 100%',

      '--white': '220 0% 100%',
      '--light': '210 40% 96%',
      '--black': '0 0% 7%',
      '--bgAccent': '210 22% 96%',

      '--success': '160 96% 40%',
      '--warning': '50 100% 50%',
      '--info': '194 98% 51%',
      '--error': '354 100% 67%',
      '--danger': '354 100% 67%',

      '--gray100': '35 0% 96%',
      '--gray200': '35 0% 91%',
      '--gray300': '35 0% 64%',
      '--gray400': '35 0% 39%',
      '--gray500': '35 0% 40%',
      '--gray600': '35 0% 45%',
      '--gray700': '35 0% 16%',
      '--gray900': '35 0% 10%',

      '--blue100': '203 90% 92%',
      '--blue300': '203 91% 58%',
      '--blue500': '203 88% 30%',
      '--blue700': '203 90% 26%',
      '--blue900': '203 90% 92%',

      '--orange100': '31 100% 83%',
      '--orange300': '31 100% 69%',
      '--orange500': '31 100% 56%',
      '--orange700': '31 98% 37%',
      '--orange900': '31 100% 23%',

      '--green100': '111 100% 88%',
      '--green300': '111 90% 50%',
      '--green500': '111 100% 40%',
      '--green700': '111 100% 25%',
      '--green900': '111 100% 21%',

      '--yellow100': '47 100% 81%',
      '--yellow300': '47 100% 66%',
      '--yellow500': '47 71% 53%',
      '--yellow900': '47 87% 25%',

      '--red100': '22 100% 93%',
      '--red300': '12 100% 78%',
      '--red500': '2 100% 63%',
      '--red700': '352 69% 42%',
      '--red900': '341 82% 26%',

      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '220 100% 24%',

      '--radius': '0.5rem',

      '--shadow':
        '0px 16px 32px rgba(145, 158, 171, 0.25), 0px 0px 2px rgba(145, 158, 171, 0.25)',

      '--chart-1': '282 100% 22%',
      '--chart-2': '339 100% 50%',
      '--chart-3': '290 83% 84%',
      '--chart-4': '350 84% 85%',
      '--chart-5': '47 100% 66%',

      '--brand-accent-1': '282 100% 22%',
      '--brand-accent-2': '0 0% 100%',
      '--brand-accent-3': '290 83% 84%',
      '--brand-accent-4': '339 100% 50%',
      '--brand-accent-5': '0 0% 100%',
    },
  })
})
