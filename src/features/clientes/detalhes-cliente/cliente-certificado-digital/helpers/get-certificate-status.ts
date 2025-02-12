import { ensureType } from '@/utils/ensure-type'
import { DateTime } from 'luxon'

const OkStatus = {
  status: 'ok',
  class: 'success',
  label: 'Válido',
} as const

const ExpiringStatus = {
  status: 'expiring',
  class: 'warning',
  label: 'Expirando',
} as const

const ExpiredStatus = {
  status: 'expired',
  class: 'error',
  label: 'Expirado',
} as const

const MissingStatus = {
  status: 'missing',
  class: 'error',
  label: 'Inexistente',
} as const

type CertStatus =
  | typeof OkStatus
  | typeof ExpiringStatus
  | typeof ExpiredStatus
  | typeof MissingStatus

export function getCertStatus(expirationDate: Date | null): CertStatus {
  if (!ensureType(expirationDate, 'date')) return MissingStatus

  const date = DateTime.fromJSDate(expirationDate!)

  const diffInHours = date.diffNow().hours

  if (diffInHours > 0) return ExpiredStatus

  return diffInHours < 30 ? ExpiringStatus : OkStatus
}
