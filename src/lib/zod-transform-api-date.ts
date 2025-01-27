import { ensureType } from '@/utils/ensure-type'
import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

export function zodTransformFromIsoToDate(
  arg: string | null | undefined,
  _ctx: z.RefinementCtx
): Date | null {
  if (typeof arg !== 'string') return null

  const timezonedDate = arg.includes('T') ? arg : `${arg}T:00:00:00Z`

  const validDateTime = DateTime.fromISO(timezonedDate)

  if (!validDateTime.isValid) return null

  return validDateTime.toJSDate()
}

export function zodTransformFromDateToIso(
  arg: Date | null | undefined,
  _ctx: z.RefinementCtx
): string | null {
  if (!ensureType(arg, 'date')) return null
  const date = arg as Date

  return date.toISOString()
}
