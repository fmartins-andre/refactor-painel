export type BrandDetails = {
  logoPath: {
    collapsed: string
    default: string
    alternative: string
  }
  name: string
  favicon: string
}

export function getBrandDetails(
  brand?: ImportMetaEnv['VITE_BRAND_NAME']
): BrandDetails {
  const BRAND = (brand || import.meta.env.VITE_BRAND_NAME) ?? 'default'

  const details: BrandDetails = {
    name: 'Painel Contábil',
    favicon: `/${BRAND}/favicon.svg`,
    logoPath: {
      default: `/${BRAND}/logo.svg`,
      collapsed: `/${BRAND}/logo-collapse.svg`,
      alternative: `/${BRAND}/logo-alt.svg`,
    },
  }

  switch (BRAND) {
    case 'emitte':
      return {
        ...details,
        name: 'Emitte Contábil',
      }

    case 'iob':
      return {
        ...details,
        name: 'IOB MEI',
      }

    case 'efacil':
      return {
        ...details,
        name: 'Emissor Fácil Contador',
      }

    default:
      return details
  }
}
