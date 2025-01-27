import { validateCep } from 'validations-br'

import { z } from '@/lib/translated-zod'

import { REQUIRED_FIELD_MESSAGE } from '../../constants'

export const customerFormStep02Schema = z.object({
  cep: z.string().transform((args, ctx) => {
    const cleanedValue = args.replace(/\D/g, '')

    if (!validateCep(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CEP inválido',
      })
      return z.NEVER
    }

    return cleanedValue
  }),
  logradouro: z
    .string()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .transform((arg) => arg.trim().replace(/\s{2,}/g, ' ')),
  bairro: z
    .string()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .transform((arg) => arg.trim().replace(/\s{2,}/g, ' ')),
  complemento: z
    .string()
    .nullish()
    .transform((arg) => arg?.trim().replace(/\s{2,}/g, ' ')),
  numero: z.string().transform((arg) => arg.trim() || 'SN'),
  cidadeId: z.string().nullable().refine(Boolean, REQUIRED_FIELD_MESSAGE),
  uf: z.string().nullable().refine(Boolean, REQUIRED_FIELD_MESSAGE),
  pais: z.string().nullish().default('1058'),
})

export type CustomerFormStep02Input = z.infer<typeof customerFormStep02Schema>

export type CustomerFormStep02Output = z.output<typeof customerFormStep02Schema>
