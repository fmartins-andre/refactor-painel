import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

export const certificadoDigitalViewModelSchema = z.object({
  numeroSerie: z.custom<string>().nullable(),
  dataValidade: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .nullable(),
})

export type CertificadoDigitalViewModel = z.output<
  typeof certificadoDigitalViewModelSchema
>
