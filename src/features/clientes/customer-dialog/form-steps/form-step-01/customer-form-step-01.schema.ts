import { clienteInputModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

export const customerFormStep01Schema = clienteInputModelSchema
  .pick({
    tipoPessoa: true,
    documento: true,
    nomeRazaoSocial: true,
    nomeFantasia: true,
    telefone: true,
    email: true,
    inscricaoMunicipal: true,
  })
  .extend({
    inscricaoEstadual: z.string().max(14).nullable(),
  })

export type CustomerFormStep01Input = z.input<typeof customerFormStep01Schema>

export type CustomerFormStep01Output = z.output<typeof customerFormStep01Schema>
