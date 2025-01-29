import { z } from '@/lib/translated-zod'
import {
  zodTransformFromDateToIso,
  zodTransformNullToUndefined,
} from '@/lib/zod-transforms'

import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  StatusClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from '../../../schemas/cliente-view-model'

export const clienteListarRequestPayloadSchema = z.object({
  clienteId: z
    .string()
    .uuid()
    .nullish()
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  busca: z
    .string()
    .nullish()
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  dataCriacaoInicial: z
    .date()
    .nullish()
    .transform(zodTransformFromDateToIso)
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  dataCriacaoFinal: z
    .date()
    .nullish()
    .transform(zodTransformFromDateToIso)
    .transform<string | undefined>(zodTransformNullToUndefined(['falsy'])),

  status: z
    .nativeEnum(StatusClienteModelEnum)
    .nullish()
    .transform<StatusClienteModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  regimeTributario: z
    .nativeEnum(RegimeTributarioClienteModelEnum)
    .nullish()
    .transform<RegimeTributarioClienteModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  regimeSubstituicao: z
    .nativeEnum(TipoRegimeSubstituicaoModelEnum)
    .nullish()
    .transform<TipoRegimeSubstituicaoModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  indicadorAtividade: z
    .nativeEnum(IndicadorAtividadeModelEnum)
    .nullish()
    .transform<IndicadorAtividadeModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  estabelecimento: z
    .nativeEnum(EstabelecimentoModelEnum)
    .nullish()
    .transform<EstabelecimentoModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  regimeEspecial: z
    .nativeEnum(RegimeEspecialModelEnum)
    .nullish()
    .transform<RegimeEspecialModelEnum | undefined>(
      zodTransformNullToUndefined(['falsy'])
    ),

  page: z.number().positive().optional().default(1),

  perPage: z.number().positive().optional().default(10),
})

export type ClienteListarRequestPayload = z.input<
  typeof clienteListarRequestPayloadSchema
>
