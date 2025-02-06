import { UfBrasilEnum } from '@/@types/system-wide-enums'
import { validateCep } from 'validations-br'

import { z } from '@/lib/translated-zod'

export const enderecoInputModelSchema = z.object({
  logradouro: z.string().trim().max(150).nonempty(),
  numero: z.string().trim().max(10).nullable(),
  bairro: z.string().trim().max(50).nonempty(),
  complemento: z.string().trim().max(100).nullable(),
  cidade: z.string().trim().max(60).nonempty(),
  uf: z.nativeEnum(UfBrasilEnum),
  cep: z.string().transform((arg, ctx) => {
    const value = arg.replace(/\D/g, '')

    if (validateCep(value)) return value

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'CEP inválido',
    })

    return z.NEVER
  }),
})

export type EnderecoInputModel = z.output<typeof enderecoInputModelSchema>
