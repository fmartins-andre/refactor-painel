import { UfBrasilEnum } from '@/@types/system-wide-enums'

import { z } from '@/lib/translated-zod'

export const brasilApiIbgeMunicipiosListarRequestParamsSchema = z.object({
  uf: z.string().refine((arg) => arg in UfBrasilEnum, 'UF inválida'),
})

export type BrasilApiIbgeMunicipiosListarRequestParams = z.input<
  typeof brasilApiIbgeMunicipiosListarRequestParamsSchema
>

export const brasilApiIbgeMunicipioSchema = z.object({
  nome: z.custom<string>(),
  codigo_ibge: z.custom<string>(),
})

export type BrasilApiIbgeMunicipio = z.output<
  typeof brasilApiIbgeMunicipioSchema
>
