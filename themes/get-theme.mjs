/* eslint-disable @typescript-eslint/no-require-imports */
export default function getTheme() {
  switch (process.env.VITE_BRAND_NAME) {
    case 'emitte':
      return require('./emitte.mjs')

    case 'iob':
      return require('./iob.mjs')

    case 'efacil':
      return require('./efacil.mjs')

    default:
      return require('./emitte.mjs')
  }
}
