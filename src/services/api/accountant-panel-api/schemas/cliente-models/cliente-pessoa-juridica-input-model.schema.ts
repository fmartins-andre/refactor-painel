import { z } from '@/lib/translated-zod'
import { zodTransformFromDateToIso } from '@/lib/zod-transforms'

import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from './cliente-view-model.enum'

export const clientePessoaJuridicaInputModelSchema = z.object({
  regimeTributario: z.nativeEnum(RegimeTributarioClienteModelEnum),
  regimeSubstituicao: z.nativeEnum(TipoRegimeSubstituicaoModelEnum),
  indicadorAtividade: z.nativeEnum(IndicadorAtividadeModelEnum),
  estabelecimento: z.nativeEnum(EstabelecimentoModelEnum),
  regimeEspecial: z.nativeEnum(RegimeEspecialModelEnum),
  inscricaoEstadual: z
    .string()
    .nullable()
    .transform<string | null>(
      (value) => value?.toUpperCase().replace(/[^\dA-Z]/g, '') ?? null
    ),
  inscricaoMunicipal: z
    .string()
    .nullable()
    .transform<string | null>(
      (value) => value?.toUpperCase().replace(/[^\dA-Z]/g, '') ?? null
    ),
  dataAbertura: z
    .date()
    .transform(zodTransformFromDateToIso)
    .transform<string | null>((arg) => (arg?.length ? arg.split('T')[0] : null)) // endpoint não aceita datetime
    .nullable(),
  monitorarDas: z.boolean(),
})

export type ClientePessoaJuridicaInputModel = z.output<
  typeof clientePessoaJuridicaInputModelSchema
>
