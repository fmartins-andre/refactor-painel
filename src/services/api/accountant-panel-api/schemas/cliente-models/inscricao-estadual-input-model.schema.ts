import { validateIE } from 'validations-br'

import { z } from '@/lib/translated-zod'

import { enderecoInputModelSchema } from '../endereco-models'

export const inscricaoEstadualInputModelSchema = z
  .object({
    ie: z.string().min(2).max(14),
    nomeFantasia: z.string().max(60).nullable(),
    endereco: enderecoInputModelSchema,
  })
  .superRefine((arg, ctx) => {
    if (!validateIE(arg.ie, arg.endereco.uf)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Inscrição Estadual inválida para ${arg.endereco.uf}`,
        path: ['ie'],
      })
    }
  })

export type InscricaoEstadualInputModel = z.output<
  typeof inscricaoEstadualInputModelSchema
>
