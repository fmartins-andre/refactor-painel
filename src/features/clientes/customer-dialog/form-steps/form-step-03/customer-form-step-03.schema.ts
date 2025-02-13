import { clienteInputModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { z } from '@/lib/translated-zod'

export const customerFormStep03Schema = clienteInputModelSchema.pick({
  modulosEmissor: true,
  regimeEspecial: true,
  regimeTributario: true,
})

export type CustomerFormStep03Input = z.input<typeof customerFormStep03Schema>

export type CustomerFormStep03Output = z.output<typeof customerFormStep03Schema>
