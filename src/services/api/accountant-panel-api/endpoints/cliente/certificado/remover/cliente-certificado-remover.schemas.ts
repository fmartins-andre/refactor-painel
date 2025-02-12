import { clienteViewModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

export const clienteCertificadoRemoverRequestPayloadSchema = z.object({
  clienteId: clienteViewModelSchema.shape.id,
})

export type ClienteCertificadoRemoverRequestPayload = z.input<
  typeof clienteCertificadoRemoverRequestPayloadSchema
>
