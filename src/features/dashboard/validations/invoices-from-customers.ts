import { z } from '@/lib/translated-zod'

export const invoicesFromCustomerSchema = z.object({
  id: z.number(),
  cnpjCpf: z.string(),
  razaoSocial: z.string(),
  modelo: z.string(),
  status: z.string(),
  dataEmissao: z.string(),
  horaEmissao: z.string(),
  valorTotalNota: z.number().or(z.string()),
})

export type InvoicesFromCustomerSchema = z.infer<
  typeof invoicesFromCustomerSchema
>
