import { z } from '@/lib/translated-zod'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-models'
import { clienteViewModelSchema } from './cliente-view-model.schema'

export const clienteListagemViewModelSchema = clienteViewModelSchema
  .pick({
    id: true,
    status: true,
    tipoPessoa: true,
    documento: true,
    nomeRazaoSocial: true,
    nomeFantasia: true,
    email: true,
    regimeTributario: true,
  })
  .extend({
    dataValidadeCertificado:
      certificadoDigitalViewModelSchema.shape.dataValidade,
  })

export type ClienteListagemViewModel = z.output<
  typeof clienteListagemViewModelSchema
>
