import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

export function zodTransformApiDate(
  arg: unknown,
  _ctx: z.RefinementCtx
): Date | null {
  if (typeof arg !== 'string') return null

  const timezonedDate = arg.includes('T') ? arg : `${arg}T:00:00:00Z`

  const validDateTime = DateTime.fromISO(timezonedDate)

  if (!validDateTime.isValid) return null

  return validDateTime.toJSDate()
}
