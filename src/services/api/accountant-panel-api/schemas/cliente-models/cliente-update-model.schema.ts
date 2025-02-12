import { z } from '@/lib/translated-zod'

import { clienteInputModelSchema } from './cliente-input-model.schema'

export const clienteUpdateModelSchema = clienteInputModelSchema.omit({
  tipoPessoa: true,
  documento: true,
  inscricoesEstaduais: true,
  certificadoDigital: true,
})

export type ClienteUpdateModel = z.input<typeof clienteUpdateModelSchema>
