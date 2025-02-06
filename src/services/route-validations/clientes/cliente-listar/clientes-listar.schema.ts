import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  StatusClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { fallback } from '@tanstack/zod-adapter'

import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

export const clientesListarPageSearchParamsSchema = z.object({
  clienteId: fallback(z.string().uuid().trim().optional(), undefined),

  busca: fallback(z.string().trim().min(3).optional(), undefined),

  dataCriacaoInicial: fallback(
    z.string().optional().transform(zodTransformFromIsoToDate),
    undefined
  ),

  dataCriacaoFinal: fallback(
    z.string().optional().transform(zodTransformFromIsoToDate),
    undefined
  ),

  status: fallback(z.nativeEnum(StatusClienteModelEnum).optional(), undefined),

  regimeTributario: fallback(
    z.nativeEnum(RegimeTributarioClienteModelEnum).optional(),
    undefined
  ),

  regimeSubstituicao: fallback(
    z.nativeEnum(TipoRegimeSubstituicaoModelEnum).optional(),
    undefined
  ),

  indicadorAtividade: fallback(
    z.nativeEnum(IndicadorAtividadeModelEnum).optional(),
    undefined
  ),

  estabelecimento: fallback(
    z.nativeEnum(EstabelecimentoModelEnum).optional(),
    undefined
  ),

  regimeEspecial: fallback(
    z.nativeEnum(RegimeEspecialModelEnum).optional(),
    undefined
  ),

  page: fallback(z.number().positive().optional(), 1).default(1),

  perPage: fallback(z.number().positive().optional(), 10).default(10),
})

export type ClientesListarPageSearchParamsInput = z.input<
  typeof clientesListarPageSearchParamsSchema
>
export type ClientesListarPageSearchParamsOutput = z.output<
  typeof clientesListarPageSearchParamsSchema
>
