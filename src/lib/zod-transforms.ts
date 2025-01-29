import { ensureType } from '@/utils/ensure-type'
import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

export function zodTransformFromIsoToDate(
  arg: string | null | undefined,
  _ctx: z.RefinementCtx
): Date | undefined {
  if (typeof arg !== 'string') return undefined

  const timezonedDate = arg.includes('T') ? arg : `${arg}T:00:00:00Z`

  const validDateTime = DateTime.fromISO(timezonedDate)

  if (!validDateTime.isValid) return undefined

  return validDateTime.toJSDate()
}

export function zodTransformFromDateToIso(
  arg: Date | null | undefined,
  _ctx: z.RefinementCtx
): string | undefined {
  if (!ensureType(arg, 'date')) return undefined
  const date = arg as Date

  return date.toISOString()
}

export function zodTransformNullToUndefined(
  includeTypes?: ('empty-string' | 'empty-array' | 'falsy')[]
) {
  return function <TData>(
    arg: TData,
    _ctx: z.RefinementCtx
  ): NonNullable<TData> | undefined {
    if (arg == null) return undefined

    if (includeTypes?.includes('falsy') && !arg) return undefined

    if (
      includeTypes?.includes('empty-array') &&
      Array.isArray(arg) &&
      !arg.length
    )
      return undefined

    if (
      includeTypes?.includes('empty-string') &&
      typeof arg === 'string' &&
      !arg.length
    )
      return undefined

    return arg
  }
}
