import { UfBrasilEnum } from '@/@types/system-wide-enums'
import { validateCep } from 'validations-br'

import { z } from '@/lib/translated-zod'

export const viaCepApiLocalidadeDetalhesRequestParamsSchema = z.object({
  cep: z.string().transform((arg, ctx): string => {
    const cleanedValue = arg.replace(/\D/g, '')

    if (!validateCep(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CEP inválido',
      })

      return z.NEVER
    }

    return cleanedValue
  }),
})

export type ViaCepApiLocalidadeDetalhesRequestParams = z.input<
  typeof viaCepApiLocalidadeDetalhesRequestParamsSchema
>

export const viaCepApiLocalidadeDetalhesSchema = z.object({
  cep: z.custom<string>().transform((arg) => {
    return typeof arg === 'string' ? arg.replace(/\D/g, '') : ''
  }),
  logradouro: z.custom<string>(),
  complemento: z.custom<string>(),
  unidade: z.custom<string>(),
  bairro: z.custom<string>(),
  localidade: z.custom<string>(),
  uf: z.custom<UfBrasilEnum>(),
  estado: z.custom<string>(),
  regiao: z.custom<string>(),
  ibge: z.custom<string>(),
  gia: z.custom<string>(),
  ddd: z.custom<string>(),
  siafi: z.custom<string>(),
})

export type ViaCepApiLocalidadeDetalhes = z.output<
  typeof viaCepApiLocalidadeDetalhesSchema
>
