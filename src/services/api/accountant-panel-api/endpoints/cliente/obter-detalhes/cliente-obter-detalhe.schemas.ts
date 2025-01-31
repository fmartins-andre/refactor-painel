import { z } from '@/lib/translated-zod'

export const clienteObterDetalheRequestPayloadSchema = z.object({
  clienteId: z.string().uuid(),
})

export type ClienteObterDetalheRequestPayload = z.input<
  typeof clienteObterDetalheRequestPayloadSchema
>
