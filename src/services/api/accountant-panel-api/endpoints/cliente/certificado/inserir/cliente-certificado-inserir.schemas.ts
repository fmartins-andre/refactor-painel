import { clienteViewModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

const payloadSchema = z.object({
  certificado: z.string().base64().nonempty(),
  senhaCertificado: z.string().nonempty(),
})

export const clienteCertificadoInserirRequestPayloadSchema = z.object({
  clienteId: clienteViewModelSchema.shape.id,
  payload: payloadSchema,
})

export type ClienteCertificadoInserirRequestPayload = z.input<
  typeof clienteCertificadoInserirRequestPayloadSchema
>
