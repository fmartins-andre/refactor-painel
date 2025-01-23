import { z } from '@/lib/translated-zod'
import { zodTransformApiDate } from '@/lib/zod-transform-api-date'

export enum StatusListaDasMeiVisaoGeralModelEnum {
  PROXIMO_VENCIMENTO = 'ProximoVencimento',
  VENCIDO = 'Vencido',
}

export const visaoGeralDasListarRequestPayloadSchema = z.object({
  status: z.nativeEnum(StatusListaDasMeiVisaoGeralModelEnum).nullish(),
})

export type VisaoGeralDasListarRequestPayload = z.input<
  typeof visaoGeralDasListarRequestPayloadSchema
>

export const visaoGeralDasSchema = z.object({
  documentoCliente: z.custom<string>(),
  nomeCliente: z.custom<string>(),
  status: z.custom<StatusListaDasMeiVisaoGeralModelEnum>(),
  mesReferencia: z.coerce.number().nullable(),
  anoReferencia: z.coerce.number().nullable(),
  mesAnoReferencia: z.coerce.number().nullable(),
  dataVencimento: z.custom<string>().transform(zodTransformApiDate),
})

export type VisaoGeralDas = z.output<typeof visaoGeralDasSchema>
