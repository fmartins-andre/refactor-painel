import { z } from '@/lib/translated-zod'

export const visaoGeralCardTotalizacaoSchema = z.object({
  totalClientesAtivos: z.coerce.number(),
  totalDasVencidos: z.coerce.number(),
  totalCertificadosVencidos: z.coerce.number(),
})

export type VisaoGeralCardTotalizacao = z.output<
  typeof visaoGeralCardTotalizacaoSchema
>
