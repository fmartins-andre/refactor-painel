import { z } from '@/lib/translated-zod'

import { REQUIRED_FIELD_MESSAGE } from '../../constants'

export const customerFormStep03Schema = z.object({
  crt: z.string().trim().min(1, REQUIRED_FIELD_MESSAGE),
  emiteCte: z.boolean(),
  emiteCteos: z.boolean(),
  emiteMdfe: z.boolean(),
  emiteNfce: z.boolean(),
  emiteNfe: z.boolean(),
  emiteNfse: z.boolean(),
  isProdutorRural: z
    .union([z.literal('0'), z.literal('1')])
    .default('0')
    .transform((arg) => arg === '1'),
  regimeEspecialId: z.string().trim().min(1, REQUIRED_FIELD_MESSAGE),
})

export type CustomerFormStep03Input = z.input<typeof customerFormStep03Schema>

export type CustomerFormStep03Output = z.output<typeof customerFormStep03Schema>
