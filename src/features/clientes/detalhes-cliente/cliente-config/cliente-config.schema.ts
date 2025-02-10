import {
  clienteInputModelSchema,
  modulosEmissorInputModelSchema,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

export const clienteConfigFormSchema = clienteInputModelSchema
  .pick({
    modulosEmissor: true,
  })
  .extend({
    modulosEmissor: modulosEmissorInputModelSchema,
  })

export type ClienteConfigFormInput = z.input<typeof clienteConfigFormSchema>

export type ClienteConfigFormOutput = z.output<typeof clienteConfigFormSchema>
