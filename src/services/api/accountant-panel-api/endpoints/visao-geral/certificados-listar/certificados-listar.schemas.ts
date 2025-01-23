import { z } from '@/lib/translated-zod'
import { zodTransformApiDate } from '@/lib/zod-transform-api-date'

export enum StatusListaCertificadosVisaoGeralModelEnum {
  PROXIMO_VENCIMENTO = 'ProximoVencimento',
  VENCIDO = 'Vencido',
}

export const visaoGeralCertificadosListarRequestPayloadSchema = z.object({
  status: z.nativeEnum(StatusListaCertificadosVisaoGeralModelEnum).nullish(),
})

export type VisaoGeralCertificadosListarRequestPayload = z.input<
  typeof visaoGeralCertificadosListarRequestPayloadSchema
>

export const visaoGeralCertificadoSchema = z.object({
  documentoCliente: z.custom<string>(),
  nomeCliente: z.custom<string>(),
  status: z.custom<StatusListaCertificadosVisaoGeralModelEnum>(),
  dataVencimento: z.custom<string>().transform(zodTransformApiDate),
})

export type VisaoGeralCertificado = z.output<typeof visaoGeralCertificadoSchema>
