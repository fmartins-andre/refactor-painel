import { StatusDasMeiModelEnum } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { fallback } from '@tanstack/zod-adapter'

import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

export const dasMeiListarPageSearchParamsSchema = z.object({
  dasMeiId: fallback(z.string().uuid().trim().optional(), undefined),

  clienteId: fallback(z.string().uuid().trim().optional(), undefined),

  status: fallback(
    z.nativeEnum(StatusDasMeiModelEnum).array().optional(),
    undefined
  ),

  mesReferencia: fallback(z.number().positive().optional(), undefined),

  anoReferencia: fallback(z.number().positive().optional(), undefined),

  valorInicial: fallback(z.number().positive().optional(), undefined),

  valorFinal: fallback(z.number().positive().optional(), undefined),

  dataVencimentoInicial: fallback(
    z.string().optional().transform(zodTransformFromIsoToDate),
    undefined
  ),

  dataVencimentoFinal: fallback(
    z.string().optional().transform(zodTransformFromIsoToDate),
    undefined
  ),

  page: fallback(z.number().positive().optional(), 1).default(1),

  perPage: fallback(z.number().positive().optional(), 10).default(10),
})

export type DasMeiListarPageSearchParamsInput = z.input<
  typeof dasMeiListarPageSearchParamsSchema
>
export type DasMeiListarPageSearchParamsOutput = z.output<
  typeof dasMeiListarPageSearchParamsSchema
>
