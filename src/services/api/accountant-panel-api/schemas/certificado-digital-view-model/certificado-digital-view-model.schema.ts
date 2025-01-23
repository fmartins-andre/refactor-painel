import { z } from '@/lib/translated-zod'
import { zodTransformApiDate } from '@/lib/zod-transform-api-date'

export const certificadoDigitalViewModelSchema = z.object({
  numeroSerie: z.custom<string>(),
  dataValidade: z.custom<string>().transform(zodTransformApiDate),
})

export type CertificadoDigitalViewModel = z.output<
  typeof certificadoDigitalViewModelSchema
>
