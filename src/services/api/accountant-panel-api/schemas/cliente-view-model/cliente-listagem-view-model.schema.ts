import { z } from '@/lib/translated-zod'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-view-model'
import { clientePessoaJuridicaViewModelSchema } from './cliente-pessoa-juridica-view-model.schema'
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
  })
  .extend({
    regimeTributario:
      clientePessoaJuridicaViewModelSchema.shape.regimeTributario,
    dataValidadeCertificado:
      certificadoDigitalViewModelSchema.shape.dataValidade,
  })

export type ClienteListagemViewModel = z.output<
  typeof clienteListagemViewModelSchema
>
