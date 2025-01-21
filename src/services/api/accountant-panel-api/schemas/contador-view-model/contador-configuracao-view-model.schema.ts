import { z } from '@/lib/translated-zod'

export const contadorConfiguracaoViewModelSchema = z.object({
  utilizaRadarxml: z.coerce.boolean(),
  tokenRadarxml: z.custom<string>(),

  utilizaCobranca: z.coerce.boolean(),
  tokenCobranca: z.custom<string>(),

  utilizaEmissor: z.coerce.boolean(),
  tokenEmissor: z.custom<string>(),
})

export type ContadorConfiguracaoViewModel = z.output<
  typeof contadorConfiguracaoViewModelSchema
>
