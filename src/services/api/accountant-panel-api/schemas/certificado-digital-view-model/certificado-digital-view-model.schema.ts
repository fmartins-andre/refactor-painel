import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transform-api-date'

export const certificadoDigitalViewModelSchema = z.object({
  numeroSerie: z.custom<string>(),
  dataValidade: z.custom<string>().transform(zodTransformFromIsoToDate),
})

export type CertificadoDigitalViewModel = z.output<
  typeof certificadoDigitalViewModelSchema
>
