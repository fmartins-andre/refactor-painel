import { z } from '@/lib/translated-zod'

export const dasMeiObterArquivoPagamentoRequestPayloadSchema = z.object({
  dasMeiId: z.string().uuid(),
})

export type DasMeiObterArquivoPagamentoRequestPayload = z.input<
  typeof dasMeiObterArquivoPagamentoRequestPayloadSchema
>

export const dasMeiArquivoPagamentoSchema = z.custom<string>()

export type DasMeiArquivoPagamento = z.output<
  typeof dasMeiArquivoPagamentoSchema
>
