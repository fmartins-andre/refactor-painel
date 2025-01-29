import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transforms'

import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from './cliente-view-model.enum'

export const clientePessoaJuridicaViewModelSchema = z.object({
  regimeTributario: z.custom<RegimeTributarioClienteModelEnum>(),
  regimeSubstituicao: z.custom<TipoRegimeSubstituicaoModelEnum>(),
  indicadorAtividade: z.custom<IndicadorAtividadeModelEnum>(),
  estabelecimento: z.custom<EstabelecimentoModelEnum>(),
  regimeEspecial: z.custom<RegimeEspecialModelEnum>(),
  inscricaoEstadual: z.custom<string>(),
  inscricaoMunicipal: z.custom<string>(),
  dataAbertura: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate)
    .nullable(),
  monitorarDas: z.coerce.boolean(),
})

export type ClientePessoaJuridicaViewModel = z.output<
  typeof clientePessoaJuridicaViewModelSchema
>
