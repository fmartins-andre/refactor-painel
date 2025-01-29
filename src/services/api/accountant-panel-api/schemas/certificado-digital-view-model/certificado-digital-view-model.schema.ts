import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

export const certificadoDigitalViewModelSchema = z.object({
  numeroSerie: z.custom<string>(),
  dataValidade: z.custom<string>().transform(zodTransformFromIsoToDate),
})

export type CertificadoDigitalViewModel = z.output<
  typeof certificadoDigitalViewModelSchema
>
