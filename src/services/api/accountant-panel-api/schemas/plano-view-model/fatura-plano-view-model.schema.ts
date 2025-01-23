import { z } from '@/lib/translated-zod'
import { zodTransformApiDate } from '@/lib/zod-transform-api-date'

import {
  StatusCobrancaFaturaPlanoModelEnum,
  StatusTributacaoFaturaPlanoModelEnum,
} from './plano-view-model.enum'

export const faturaPlanoViewModelSchema = z.object({
  parcela: z.coerce.number(),
  totalParcelas: z.coerce.number(),
  descricao: z.custom<string>(),
  statusCobranca: z.custom<StatusCobrancaFaturaPlanoModelEnum>(),
  vencimentoCobranca: z.custom<string>().transform(zodTransformApiDate),
  ultimoStatusCobranca: z.custom<string>().transform(zodTransformApiDate),
  statusTributacao: z.custom<StatusTributacaoFaturaPlanoModelEnum>(),
})

export type FaturaPlanoViewModel = z.output<typeof faturaPlanoViewModelSchema>
