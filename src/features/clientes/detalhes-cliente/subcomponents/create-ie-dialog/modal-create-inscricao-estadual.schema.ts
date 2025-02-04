import { AccountantIEStatusEnum } from '@/@types/accountant/accountant-customer'

import { z } from '@/lib/translated-zod'

const REQUIRED_MESSAGE = 'Obrigatório'

export const createInscricaoEstadualSchema = z.object({
  status: z.nativeEnum(AccountantIEStatusEnum),
  inscricaoEstadual: z.string().min(1, REQUIRED_MESSAGE),
  razaoSocial: z.string().min(1, REQUIRED_MESSAGE),
  nomeFantasia: z.string().min(1, REQUIRED_MESSAGE),
  endereco: z.object({
    cep: z.string().transform((args, ctx) => {
      const cleanedValue = args.replace(/\D/g, '')

      if (cleanedValue.length !== 8) {
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
      .min(1, REQUIRED_MESSAGE)
      .transform((arg) => arg.trim().replace(/\s{2,}/g, ' ')),
    bairro: z.string().min(1, REQUIRED_MESSAGE).trim(),
    complemento: z
      .string()
      .nullable()
      .transform((arg) => arg?.trim().replace(/\s{2,}/g, ' ')),
    numero: z.string().transform((arg) => arg.trim() || 'SN'),
    cidadeId: z.string().refine(Boolean, REQUIRED_MESSAGE),
    uf: z.string().refine(Boolean, REQUIRED_MESSAGE),
    paisId: z.literal('1058').default('1058'),
  }),
})

export type CreateInscricaoEstadualSchema = z.infer<
  typeof createInscricaoEstadualSchema
>

export type CreateInscricaoEstadualSchemaOutput = z.output<
  typeof createInscricaoEstadualSchema
>
