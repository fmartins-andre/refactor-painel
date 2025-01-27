import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transform-api-date'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-view-model'
import { enderecoViewModelSchema } from '../endereco-view-model'
import { StatusIntegracaoModelEnum, TipoPessoaModelEnum } from '../shared'
import { clientePessoaJuridicaViewModelSchema } from './cliente-pessoa-juridica-view-model.schema'
import { StatusClienteModelEnum } from './cliente-view-model.enum'
import { modulosEmissorInputModelSchema } from './modulos-emissor-input-model.schema'

export const clienteViewModelSchema = z.object({
  id: z.custom<string>(),
  status: z.custom<StatusClienteModelEnum>(),
  tipoPessoa: z.custom<TipoPessoaModelEnum>(),
  documento: z.custom<string>(),
  nomeRazaoSocial: z.custom<string>(),
  nomeFantasia: z.custom<string>(),
  telefone: z.custom<string>(),
  email: z.custom<string>(),
  endereco: enderecoViewModelSchema.nullable(),
  pessoaJuridica: clientePessoaJuridicaViewModelSchema.nullable(),
  certificadoDigital: certificadoDigitalViewModelSchema.nullable(),

  utilizaValidadorTributario: z.coerce.boolean(),
  integracaoGdfe: z.coerce.boolean(),
  integracaoDominio: z.coerce.boolean(),
  tokenIntegracaoDominio: z.custom<string>().nullable(),

  utilizaRadarxml: z.coerce.boolean(),
  statusSincronizacaoRadar: z.custom<StatusIntegracaoModelEnum>(),
  dataSincronizacaoRadar: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .nullable(),

  utilizaCobranca: z.coerce.boolean(),
  statusSincronizacaoCobranca: z.custom<StatusIntegracaoModelEnum>(),
  dataSincronizacaoCobranca: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .nullable(),

  utilizaEmissor: z.coerce.boolean(),
  statusSincronizacaoEmissor: z.custom<StatusIntegracaoModelEnum>(),
  modulosEmissor: modulosEmissorInputModelSchema.nullable(),
})

export type ClienteViewModel = z.output<typeof clienteViewModelSchema>
