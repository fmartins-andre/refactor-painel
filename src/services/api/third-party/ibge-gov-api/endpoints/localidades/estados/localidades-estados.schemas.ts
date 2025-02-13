import { UfBrasilEnum } from '@/@types/system-wide-enums'

import { z } from '@/lib/translated-zod'

const regiaoSchema = z.object({
  id: z.coerce.number(),
  sigla: z.custom<string>(),
  nome: z.custom<string>(),
})

export const ibgeGovApiLocalidadesUfSchema = z.object({
  id: z.coerce.number(),
  sigla: z.custom<UfBrasilEnum>(),
  nome: z.custom<string>(),
  regiao: regiaoSchema.nullable(),
})

export type IbgeGovApiLocalidadesUf = z.output<
  typeof ibgeGovApiLocalidadesUfSchema
>
