import { AccountantCustomerTypeEnum } from '@/@types/accountant/accountant-customer'
import { DateTime } from 'luxon'
import { validateCNPJ, validateCPF, validatePhone } from 'validations-br'

import { z } from '@/lib/translated-zod'

import { REQUIRED_FIELD_MESSAGE } from '../../constants'

export const customerFormStep01Schema = z.object({
  tipoPessoa: z.nativeEnum(AccountantCustomerTypeEnum),
  cnpjCpf: z.string().transform((value, ctx) => {
    const cleanedValue = value.replace(/\D/g, '')

    if (!validateCNPJ(cleanedValue) && !validateCPF(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CNPJ / CPF inválido',
      })

      return z.NEVER
    }

    return cleanedValue
  }),
  telefoneWhatsapp: z.string().transform((value, ctx) => {
    const cleanedValue = value.replace(/\D/g, '')

    if (cleanedValue.length < 10 || !validatePhone(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Telefone inválido',
      })

      return z.NEVER
    }

    return cleanedValue
  }),
  razaoSocial: z.string().min(1, REQUIRED_FIELD_MESSAGE),
  email: z.string().email('E-mail inválido'),
  isMei: z.boolean(),
  meiDataAbertura: z
    .date({ invalid_type_error: 'Data inválida' })
    .nullable()
    .transform((value) => {
      if (!value) return null

      return DateTime.fromJSDate(value).toISODate()
    }),
  inscricaoEstadual: z
    .string()
    .nullable()
    .transform((value) => value?.toUpperCase().replace(/[^\dA-Z]/g, '')),
  inscricaoMunicipal: z
    .string()
    .nullable()
    .transform((value) => value?.toUpperCase().replace(/[^\dA-Z]/g, '')),
})

export type CustomerFormStep01Input = z.input<typeof customerFormStep01Schema>

export type CustomerFormStep01Output = z.output<typeof customerFormStep01Schema>
