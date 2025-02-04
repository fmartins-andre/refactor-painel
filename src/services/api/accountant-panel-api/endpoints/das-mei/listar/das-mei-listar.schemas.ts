import { z } from '@/lib/translated-zod'
import {
  zodTransformFromDateToIso,
  zodTransformFromIsoToDate,
  zodTransformNullToUndefined,
} from '@/lib/zod-transforms'

import { StatusDasMeiModelEnum } from './das-mei-listar.enums'

export const dasMeiListarRequestPayloadSchema = z.object({
  dasMeiId: z
    .string()
    .uuid()
    .nullish()
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  clienteId: z
    .string()
    .uuid()
    .nullish()
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  status: z
    .nativeEnum(StatusDasMeiModelEnum)
    .array()
    .nullish()
    .transform<StatusDasMeiModelEnum[] | undefined>(
      zodTransformNullToUndefined(['falsy', 'empty-array'])
    ),

  mesReferencia: z.coerce
    .number()
    .positive()
    .nullish()
    .transform<number | undefined>(zodTransformNullToUndefined(['falsy'])),

  anoReferencia: z.coerce
    .number()
    .positive()
    .nullish()
    .transform<number | undefined>(zodTransformNullToUndefined(['falsy'])),

  valorInicial: z.coerce
    .number()
    .positive()
    .nullish()
    .transform<number | undefined>(zodTransformNullToUndefined(['falsy'])),

  valorFinal: z.coerce
    .number()
    .positive()
    .nullish()
    .transform<number | undefined>(zodTransformNullToUndefined(['falsy'])),

  dataVencimentoInicial: z
    .date()
    .nullish()
    .transform(zodTransformFromDateToIso)
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  dataVencimentoFinal: z
    .date()
    .nullish()
    .transform(zodTransformFromDateToIso)
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  page: z.number().positive().optional().default(1),

  perPage: z.number().positive().optional().default(10),
})

export type DasMeiListarRequestPayload = z.input<
  typeof dasMeiListarRequestPayloadSchema
>

export const dasMeiViewModelSchema = z.object({
  id: z.custom<string>(),

  clienteId: z.custom<string>(),

  documentoCliente: z.custom<string>().nullable(),

  nomeCliente: z.custom<string>().nullable(),

  status: z.custom<StatusDasMeiModelEnum>(),

  mesReferencia: z.coerce.number(),

  anoReferencia: z.coerce.number(),

  mesAnoReferencia: z.custom<string>().nullable(),

  dataVencimento: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .transform<Date | null>((arg) => arg ?? null),

  valor: z.coerce.number().nullable(),

  juros: z.coerce.number().nullable(),

  multa: z.coerce.number().nullable(),

  total: z.coerce.number().nullable(),
})

export type DasMeiViewModel = z.output<typeof dasMeiViewModelSchema>
