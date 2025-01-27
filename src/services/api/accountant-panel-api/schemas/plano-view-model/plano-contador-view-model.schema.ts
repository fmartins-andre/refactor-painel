import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transform-api-date'

import { faturaPlanoViewModelSchema } from './fatura-plano-view-model.schema'
import {
  StatusPagamentoPlanoModelEnum,
  TipoPagamentoPlanoModelEnum,
  TipoPlanoModelEnum,
} from './plano-view-model.enum'
import { recorrenciaPlanoViewModelSchema } from './recorrencia-plano-view-model.schema'

export const planoContadorViewModelSchema = z.object({
  nome: z.custom<string>(),
  statusPagamento: z.custom<StatusPagamentoPlanoModelEnum>(),
  tipoPlano: z.custom<TipoPlanoModelEnum>(),
  tipoPagamento: z.custom<TipoPagamentoPlanoModelEnum>(),
  quantidadeCertificadosBrindes: z.coerce.number(),
  quantidadeNotasEmissor: z.coerce.number(),
  quantidadeNotasRadar: z.coerce.number(),
  quantidadeArmazenamento: z.coerce.number(),
  quantidadeUsuariosConvidados: z.coerce.number(),
  diasValidadeNotaAdicional: z.coerce.number(),
  permiteRadarxml: z.coerce.boolean(),
  permiteCobranca: z.coerce.boolean(),
  permiteEmissor: z.coerce.boolean(),
  valor: z.coerce.number(),
  inicioVigencia: z.custom<string>().transform(zodTransformFromIsoToDate),
  finalVigencia: z.custom<string>().transform(zodTransformFromIsoToDate),
  quantidadeParcelas: z.coerce.boolean(),
  diaProcessamentoRecorrencia: z.coerce.boolean(),
  referenciaAssinatura: z.custom<string>(),
  recorrencias: recorrenciaPlanoViewModelSchema.array().nullable(),
  faturas: faturaPlanoViewModelSchema.array().nullable(),
})

export type PlanoContadorViewModel = z.output<
  typeof planoContadorViewModelSchema
>
