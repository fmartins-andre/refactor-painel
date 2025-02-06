import { z } from '@/lib/translated-zod'

export const gestaoEstoqueViewModelSchema = z.object({
  estoqueNotaFiscal: z.coerce.number(),
  estoqueCertificadoBrinde: z.coerce.number(),
})

export type GestaoEstoqueViewModel = z.output<
  typeof gestaoEstoqueViewModelSchema
>
