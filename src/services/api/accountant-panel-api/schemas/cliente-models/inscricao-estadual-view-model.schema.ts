import { z } from '@/lib/translated-zod'

import { enderecoViewModelSchema } from '../endereco-models'

export const inscricaoEstadualViewModelSchema = z.object({
  ie: z.custom<string>(),
  nomeFantasia: z.custom<string>().nullable(),
  endereco: enderecoViewModelSchema.nullable(),
})

export type InscricaoEstadualViewModel = z.output<
  typeof inscricaoEstadualViewModelSchema
>
