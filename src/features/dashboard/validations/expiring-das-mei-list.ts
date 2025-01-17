import { z } from '@/lib/translated-zod'

export const expiringDasMeiList = z.object({
  id: z.number(),
  empresaId: z.string(),
  inscricaoId: z.number(),
  cnpjCpf: z.string(),
  razaoSocial: z.string(),
  dataVencimento: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  codigoBarras: z.string().optional().nullable(),
  situacao: z.string().optional().nullable(),
  dataEdicao: z.string(),
  telefone: z.string().nullable().optional(),
})

export type ExpiringDasMeiList = z.infer<typeof expiringDasMeiList>
