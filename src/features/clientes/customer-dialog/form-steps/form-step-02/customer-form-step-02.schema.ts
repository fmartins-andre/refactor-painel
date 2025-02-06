import { UfBrasilEnum } from '@/@types/system-wide-enums'
import { clienteInputModelSchema } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { enderecoInputModelSchema } from '@/services/api/accountant-panel-api/schemas/endereco-models'

import { z } from '@/lib/translated-zod'

export const customerFormStep02Schema = clienteInputModelSchema
  .pick({
    endereco: true,
  })
  .extend({
    endereco: enderecoInputModelSchema.extend({
      uf: z
        .nativeEnum(UfBrasilEnum)
        .nullable()
        .refine((arg) => Boolean(arg), 'Obrigatório'),
    }),
  })

export type CustomerFormStep02Input = z.infer<typeof customerFormStep02Schema>

export type CustomerFormStep02Output = z.output<typeof customerFormStep02Schema>
