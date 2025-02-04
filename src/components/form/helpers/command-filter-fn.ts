import { removeAccents, removeNonCharOrNum } from '@/utils/string-methods'

export function filterEquivalentTerms(value: string, search: string): number {
  const _value = removeNonCharOrNum(removeAccents(value)).toLowerCase()

  const terms = removeNonCharOrNum(removeAccents(search))
    .toLowerCase()
    .split(/\s/)

  const hasTerm = terms.every((term) => _value.includes(term))

  return hasTerm ? 1 : 0
}
