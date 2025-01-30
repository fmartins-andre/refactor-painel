import { z } from '@/lib/translated-zod'

import { clienteListarRequestPayloadSchema } from '../listar'

export const clienteTotalizarListagemRequestPayloadSchema =
  clienteListarRequestPayloadSchema.omit({
    page: true,
    perPage: true,
  })

export type ClienteTotalizarListagemRequestPayload = z.input<
  typeof clienteTotalizarListagemRequestPayloadSchema
>

export const sumarioTotalClientesSchema = z.object({
  clientesCadastrados: z.coerce.number(),
  clientesAtivos: z.coerce.number(),
  clientesBloqueados: z.coerce.number(),
  clientesCancelados: z.coerce.number(),
})

export type SumarioTotalClientes = z.output<typeof sumarioTotalClientesSchema>
