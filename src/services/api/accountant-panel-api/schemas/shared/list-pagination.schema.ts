import { z } from '@/lib/translated-zod'

const _lista = z.object({
  current_page: z.coerce.number(),
  per_page: z.coerce.number(),
  total: z.coerce.number(),
  to: z.coerce.number(),
})

export function listaPaginadaSchema<TData extends z.ZodTypeAny>(
  dataSchema: TData
) {
  return _lista.extend({
    data: dataSchema.array(),
  })
}

export interface ListaPaginada<TData> extends z.output<typeof _lista> {
  data: TData[]
}
