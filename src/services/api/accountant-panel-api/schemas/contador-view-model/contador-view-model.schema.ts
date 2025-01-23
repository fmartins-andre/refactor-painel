import { z } from '@/lib/translated-zod'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-view-model'
import { gestaoEstoqueViewModelSchema } from '../gestao-estoque-view-model '
import { planoContadorViewModelSchema } from '../plano-view-model'
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
  endereco: contadorEnderecoViewModelSchema.nullable(),
  certificadoDigital: certificadoDigitalViewModelSchema.nullable(),
  plano: planoContadorViewModelSchema.nullable(),
  configuracao: contadorConfiguracaoViewModelSchema.nullable(),
  gestaoEstoque: gestaoEstoqueViewModelSchema.nullable(),
})

export type ContadorViewModel = z.output<typeof contadorViewModelSchema>
