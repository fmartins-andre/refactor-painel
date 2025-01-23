import { z } from '@/lib/translated-zod'

export const contadorConfiguracaoViewModelSchema = z.object({
  utilizaRadarxml: z.coerce.boolean(),
  tokenRadarxml: z.custom<string>().nullable(),

  utilizaCobranca: z.coerce.boolean(),
  tokenCobranca: z.custom<string>().nullable(),

  utilizaEmissor: z.coerce.boolean(),
  tokenEmissor: z.custom<string>().nullable(),
})

export type ContadorConfiguracaoViewModel = z.output<
  typeof contadorConfiguracaoViewModelSchema
>
