import { z } from '@/lib/translated-zod'

export const customersListSchema = z
  .object({
    empresaId: z.number(),
    inscricaoId: z.number(),
    cnpjCpf: z.string(),
    razaoSocial: z.string(),
    nomeFantasia: z.string().nullable().optional(),
    dataVencimentoCertificado: z.string().optional().nullable(),
    status: z.string(),
    emiteNfe: z.number(),
    emiteNfce: z.number(),
    emiteNfse: z.number(),
    emiteMdfe: z.number(),
    emiteCte: z.number(),
    emiteCteos: z.number(),
    regimeEspecialId: z.string().optional().nullable(),
    regimeEspecialDescricao: z.string().optional().nullable(),
  })
  .transform((data) => ({
    ...data,
    modules: [
      { name: 'NFe', value: data.emiteNfe === 1 ? true : false },
      { name: 'NFCe', value: data.emiteNfce === 1 ? true : false },
      { name: 'NFS-e', value: data.emiteNfse === 1 ? true : false },
      { name: 'MDF-e', value: data.emiteMdfe === 1 ? true : false },
      { name: 'CT-e', value: data.emiteCte === 1 ? true : false },
      { name: 'CT-e OS', value: data.emiteCteos === 1 ? true : false },
    ],
  }))

export type CustomerListSchemaInput = z.input<typeof customersListSchema>
export type CustomerListSchemaOutput = z.output<typeof customersListSchema>
