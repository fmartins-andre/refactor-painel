import { z } from '@/lib/translated-zod'

import { clienteViewModelSchema } from './cliente-view-model.schema'

export const clienteListagemViewModelSchema = clienteViewModelSchema.pick({
  id: true,
  status: true,
  tipoPessoa: true,
  documento: true,
  nomeRazaoSocial: true,
  nomeFantasia: true,
  email: true,
})

export type ClienteListagemViewModel = z.output<
  typeof clienteListagemViewModelSchema
>
