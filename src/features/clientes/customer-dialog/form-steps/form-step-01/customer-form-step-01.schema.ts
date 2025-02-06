import {
  clienteInputModelSchema,
  clientePessoaJuridicaInputModelSchema,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

export const customerFormStep01Schema = clienteInputModelSchema
  .pick({
    tipoPessoa: true,
    documento: true,
    nomeRazaoSocial: true,
    telefone: true,
    email: true,
    pessoaJuridica: true,
  })
  .extend({
    pessoaJuridica: clientePessoaJuridicaInputModelSchema
      .pick({
        inscricaoEstadual: true,
        inscricaoMunicipal: true,
        dataAbertura: true,
      })
      .extend({
        isMei: z.boolean(),
        dataAbertura: z.date().nullable(),
      }),
  })
  .transform((arg, ctx) => {
    if (arg.pessoaJuridica.isMei && !arg.pessoaJuridica.dataAbertura) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Obrigatório',
        path: ['pessoaJuridica.dataAbertura'],
      })

      return z.NEVER
    }

    return arg
  })

export type CustomerFormStep01Input = z.input<typeof customerFormStep01Schema>

export type CustomerFormStep01Output = z.output<typeof customerFormStep01Schema>
