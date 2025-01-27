import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'
import { zodTransformFromDateToIso } from '@/lib/zod-transform-api-date'

import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  StatusClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from '../../../schemas/cliente-view-model'

export const clienteListarRequestPayloadSchema = z
  .object({
    clienteId: z.string().uuid(),
    busca: z.string(),
    dataCriacaoInicial: z.date().transform(zodTransformFromDateToIso),
    dataCriacaoFinal: z.date().transform(zodTransformFromDateToIso),
    status: z.nativeEnum(StatusClienteModelEnum),
    regimeTributario: z.nativeEnum(RegimeTributarioClienteModelEnum),
    regimeSubstituicao: z.nativeEnum(TipoRegimeSubstituicaoModelEnum),
    indicadorAtividade: z.nativeEnum(IndicadorAtividadeModelEnum),
    estabelecimento: z.nativeEnum(EstabelecimentoModelEnum),
    regimeEspecial: z.nativeEnum(RegimeEspecialModelEnum),
    page: z.number().positive(),
    perPage: z.number().positive(),
  })
  .partial()
  .refine((arg) => {
    if (
      arg.dataCriacaoFinal &&
      arg.dataCriacaoInicial &&
      DateTime.fromISO(arg.dataCriacaoFinal) <
        DateTime.fromISO(arg.dataCriacaoInicial)
    ) {
      return false
    }

    return true
  }, 'A data final deve ser posterior à data inicial.')

export type ClienteListarRequestPayload = z.input<
  typeof clienteListarRequestPayloadSchema
>
