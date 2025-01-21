import { z } from '@/lib/translated-zod'

import { TipoPessoaModelEnum } from '../shared'
import { contadorConfiguracaoViewModelSchema } from './contador-configuracao-view-model.schema'
import { contadorEnderecoViewModelSchema } from './contador-endereco-view-model.schema'
import { StatusContadorModelEnum } from './contador-view-model.enum'

export const contadorViewModelSchema = z.object({
  id: z.custom<string>(),
  status: z.custom<StatusContadorModelEnum>(),
  tipoPessoa: z.custom<TipoPessoaModelEnum>(),
  documento: z.custom<string>(),
  nomeRazaoSocial: z.custom<string>(),
  cpfResponsavel: z.custom<string>(),
  nomeResponsavel: z.custom<string>(),
  telefone: z.custom<string>(),
  email: z.custom<string>(),
  endereco: contadorEnderecoViewModelSchema,
  configuracao: contadorConfiguracaoViewModelSchema,
})

export type ContadorViewModel = z.output<typeof contadorViewModelSchema>
