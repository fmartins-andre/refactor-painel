import { z } from '@/lib/translated-zod'
import { zodTransformApiDate } from '@/lib/zod-transform-api-date'

import { StatusRecorrenciaPlanoModelEnum } from './plano-view-model.enum'

export const recorrenciaPlanoViewModelSchema = z.object({
  sequencia: z.coerce.number(),
  status: z.custom<StatusRecorrenciaPlanoModelEnum>(),
  dataPrevista: z.custom<string>().transform(zodTransformApiDate),
  dataProcessamento: z.custom<string>().transform(zodTransformApiDate),
  quantidadeCertificadosBrindes: z.coerce.number(),
  quantidadeNotasEmissor: z.coerce.number(),
  mensagemErroProcessamento: z.custom<string>(),
})

export type RecorrenciaPlanoViewModel = z.output<
  typeof recorrenciaPlanoViewModelSchema
>
