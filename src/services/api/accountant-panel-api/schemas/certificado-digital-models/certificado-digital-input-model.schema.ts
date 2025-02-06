import { z } from '@/lib/translated-zod'

export const certificadoDigitalInputModelSchema = z.object({
  certificado: z.string().nonempty(),
  senhaCertificado: z.string().nonempty(),
})

export type CertificadoDigitalInputModel = z.output<
  typeof certificadoDigitalInputModelSchema
>
