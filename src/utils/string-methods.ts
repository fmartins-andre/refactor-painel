export function removeAccents(text: string): string {
  if (!text) return ''
  return String(text).normalize('NFD').replace(/\p{M}/gu, '').trim()
}

export function removeNonCharOrNum(text: string): string {
  const nonCharOrDigitsRegex = /[^\p{L}\d\s]/gu

  return text.replace(nonCharOrDigitsRegex, '').replace(/\s+/g, ' ')
}

export function isEquivalentTo(text1: string, text2: string): boolean {
  try {
    const _text1 = removeAccents(String(text1)).toLowerCase()
    const _text2 = removeAccents(String(text2)).toLowerCase()

    return _text1 === _text2
  } catch (_error) {
    return false
  }
}

export function hasEquivalentIn(text: string, texts: string[]): boolean {
  try {
    if (!Array.isArray(texts)) return false

    const _text = removeAccents(String(text)).toLowerCase()
    const _array = texts.map((txt) => removeAccents(String(txt)).toLowerCase())

    return _array.includes(_text)
  } catch (_error) {
    return false
  }
}

export function dateBrToIso(stringDate: string): string {
  const validDate = /^([0-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/([1-2]\d{3})$/
  if (validDate.test(String(stringDate).trim())) {
    return String(stringDate).trim().replace(validDate, '$3-$2-$1')
  }
  return String(stringDate)
}

export function validateDateIso(isoString: string): boolean {
  const validDate = /^([1-2]\d{3})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/
  return validDate.test(String(isoString).trim())
}

/**
 * Validates if string is correctly ISO formatted. Works for both date only and date and time format.
 * @export
 * @param {string} isoString
 * @return {*}  {boolean}
 */
export function validateDateTimeIso(isoString: string): boolean {
  const validDateTime =
    /^([1-2]\d{3})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])(T([01]\d|2[0-3]):([0-5]\d):([0-5]\d(\.\d{1,7})?)Z?)?$/
  return validDateTime.test(isoString.trim())
}

export function dateIsoToBr(stringDate: string): string {
  const validDate = /^([1-2]\d{3})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/
  if (validDate.test(String(stringDate).trim())) {
    return String(stringDate).trim().replace(validDate, '$3/$2/$1')
  }
  return String(stringDate)
}

export function isoStringToDate(stringDate: string, fallback?: Date): Date {
  if (!validateDateIso) return fallback ?? new Date()

  return new Date(`${stringDate}T12:00:00.000Z`)
}

export function enumerateList(list: string[]) {
  const formatter = new Intl.ListFormat('pt-BR', {
    style: 'long',
    type: 'conjunction',
  })
  return formatter.format(list)
}

export function numbersOnly(string: string | undefined | null) {
  return string?.replace(/\D/g, '')
}

export function brDecimalToNumber(value: string) {
  const validNumericValue = value
    .replace(/[^\d.,]/g, '')
    .replace('.', '')
    .replace(',', '.')

  return Number(validNumericValue || 0)
}

export function pluralize(
  text: string,
  count: number,
  suffix: string = 's',
  offset: number = 0
) {
  text = String(text)
  if (count < 2) return text
  if (offset > 0) text = text.substring(0, text.length - offset)

  return text + suffix
}

export function hashCode(value: string): number | undefined {
  const term = String(value)
  if (!term) return undefined

  let hash = 0
  if (term.length === 0) return hash
  for (let i = 0; i < term.length; i++) {
    const char = term.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}
