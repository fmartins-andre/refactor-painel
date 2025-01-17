import { z } from '@/lib/translated-zod'

export const customersMoreUsingCreditSchema = z
  .array(
    z.object({
      empresaId: z.number(),
      inscricaoId: z.number(),
      cnpjCpf: z.string(),
      razaoSocial: z.string(),
      status: z.string(),
      emiteNfe: z.number(),
      emiteNfce: z.number(),
      emiteNfse: z.number(),
      emiteMdfe: z.number(),
      emiteCte: z.number(),
      emiteCteos: z.number(),
      validadas: z.number(),
      canceladas: z.number(),
      total: z.number(),
    })
  )
  .transform((data) => {
    return data.map((item) => {
      return {
        ...item,
        modules: [
          { name: 'NFe', value: item.emiteNfe === 0 ? true : false },
          { name: 'NFCe', value: item.emiteNfce === 0 ? true : false },
          { name: 'NFS-e', value: item.emiteNfse === 0 ? true : false },
          { name: 'MDF-e', value: item.emiteMdfe === 0 ? true : false },
          { name: 'CT-e', value: item.emiteCte === 0 ? true : false },
          { name: 'CT-e OS', value: item.emiteCteos === 0 ? true : false },
        ],
      }
    })
  })

export type CustomersMoreUsingCreditInput = z.input<
  typeof customersMoreUsingCreditSchema
>

export type CustomersMoreUsingCreditOutput = z.output<
  typeof customersMoreUsingCreditSchema
>
