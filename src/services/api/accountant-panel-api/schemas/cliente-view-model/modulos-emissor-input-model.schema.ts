import { z } from '@/lib/translated-zod'

export const modulosEmissorInputModelSchema = z.object({
  nfe: z.coerce.boolean(),
  nfce: z.coerce.boolean(),
  nfse: z.coerce.boolean(),
  cte: z.coerce.boolean(),
  mdfe: z.coerce.boolean(),
})

export type ModulosEmissorInputModel = z.output<
  typeof modulosEmissorInputModelSchema
>
