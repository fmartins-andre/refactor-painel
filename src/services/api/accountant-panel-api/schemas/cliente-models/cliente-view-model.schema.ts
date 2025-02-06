import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

import { certificadoDigitalViewModelSchema } from '../certificado-digital-models'
import { enderecoViewModelSchema } from '../endereco-models'
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
  nomeFantasia: z.custom<string>().nullable(),
  telefone: z.custom<string>().nullable(),
  email: z.custom<string>().nullable(),
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
  dataSincronizacaoEmissor: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .nullable(),

  modulosEmissor: modulosEmissorInputModelSchema.nullable(),
})

export type ClienteViewModel = z.output<typeof clienteViewModelSchema>
