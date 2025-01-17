import { z } from '@/lib/translated-zod'

export const expiringCertificatesListSchema = z.object({
  empresaId: z.number(),
  inscricaoId: z.number(),
  cnpjCpf: z.string(),
  razaoSocial: z.string(),
  dataVencimentoCertificado: z.string(),
})

export type ExpiringCertificatesListSchema = z.infer<
  typeof expiringCertificatesListSchema
>
