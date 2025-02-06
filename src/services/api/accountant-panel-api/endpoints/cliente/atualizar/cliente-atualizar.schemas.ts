import { z } from '@/lib/translated-zod'

import {
  clienteUpdateModelSchema,
  clienteViewModelSchema,
} from '../../../schemas/cliente-models'

export const clienteAtualizarRequestParamsSchema = z.object({
  clienteId: clienteViewModelSchema.shape.id,
  payload: clienteUpdateModelSchema,
})

export type ClienteAtualizarRequestParams = z.input<
  typeof clienteAtualizarRequestParamsSchema
>
