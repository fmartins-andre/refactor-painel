import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

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
  clienteId: z.custom<string>(),
  documentoCliente: z.custom<string>(),
  nomeCliente: z.custom<string>(),
  status: z.custom<StatusListaDasMeiVisaoGeralModelEnum>(),
  mesReferencia: z.coerce.number().nullable(),
  anoReferencia: z.coerce.number().nullable(),
  mesAnoReferencia: z.coerce.number().nullable(),
  dataVencimento: z.custom<string>().transform(zodTransformFromIsoToDate),
})

export type VisaoGeralDas = z.output<typeof visaoGeralDasSchema>
