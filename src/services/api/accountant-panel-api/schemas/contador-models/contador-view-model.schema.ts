import { z } from '@/lib/translated-zod'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-models'
import { enderecoViewModelSchema } from '../endereco-models'
import { gestaoEstoqueViewModelSchema } from '../gestao-estoque-models'
import { planoContadorViewModelSchema } from '../plano-models'
import { TipoPessoaModelEnum } from '../shared'
import { contadorConfiguracaoViewModelSchema } from './contador-configuracao-view-model.schema'
import { StatusContadorModelEnum } from './contador-view-model.enum'

export const contadorViewModelSchema = z.object({
  id: z.custom<string>(),
  status: z.custom<StatusContadorModelEnum>(),
  tipoPessoa: z.custom<TipoPessoaModelEnum>(),
  documento: z.custom<string>(),
  nomeRazaoSocial: z.custom<string>(),
  cpfResponsavel: z.custom<string>().nullable(),
  nomeResponsavel: z.custom<string>().nullable(),
  telefone: z.custom<string>().nullable(),
  email: z.custom<string>().nullable(),
  endereco: enderecoViewModelSchema.nullable(),
  certificadoDigital: certificadoDigitalViewModelSchema.nullable(),
  plano: planoContadorViewModelSchema.nullable(),
  configuracao: contadorConfiguracaoViewModelSchema.nullable(),
  gestaoEstoque: gestaoEstoqueViewModelSchema.nullable(),
})

export type ContadorViewModel = z.output<typeof contadorViewModelSchema>
