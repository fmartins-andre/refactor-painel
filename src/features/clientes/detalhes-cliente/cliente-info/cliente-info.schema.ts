import { UfBrasilEnum } from '@/@types/system-wide-enums'
import { clienteInputModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { enderecoInputModelSchema } from '@/services/api/accountant-panel-api/schemas/endereco-models'

import { z } from '@/lib/translated-zod'

export const customerFormSchema = clienteInputModelSchema
  .pick({
    tipoPessoa: true,
    documento: true,
    nomeRazaoSocial: true,
    nomeFantasia: true,
    telefone: true,
    email: true,
    endereco: true,
    regimeTributario: true,
    regimeSubstituicao: true,
    indicadorAtividade: true,
    estabelecimento: true,
    regimeEspecial: true,
    inscricaoMunicipal: true,
    monitorarDas: true,
  })
  .extend({
    endereco: enderecoInputModelSchema.extend({
      uf: z
        .nativeEnum(UfBrasilEnum)
        .nullable()
        .transform<UfBrasilEnum>((arg, ctx) => {
          if (!arg) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Obrigatório',
            })
            return z.NEVER
          }

          return arg
        }),
    }),
  })

export type CustomerFormInput = z.input<typeof customerFormSchema>

export type CustomerFormOutput = z.output<typeof customerFormSchema>
