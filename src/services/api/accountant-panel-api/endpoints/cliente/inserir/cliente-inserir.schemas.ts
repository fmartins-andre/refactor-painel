import { z } from '@/lib/translated-zod'

export const clienteInserirReturnedIdSchema = z.custom<'string'>()

export type ClienteInserirReturnedId = z.output<
  typeof clienteInserirReturnedIdSchema
>
