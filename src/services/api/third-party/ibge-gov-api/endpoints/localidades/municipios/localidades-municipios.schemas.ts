import { UfBrasilEnum } from '@/@types/system-wide-enums'

import { z } from '@/lib/translated-zod'

export const ibgeGovApiLocalidadesMunicipiosListarRequestParamsSchema =
  z.object({
    uf: z
      .string()
      .refine(
        (arg) => Object.values(UfBrasilEnum).includes(arg as UfBrasilEnum),
        'UF inválida'
      ),
  })

export type IbgeGovApiLocalidadesMunicipiosListarRequestParams = z.input<
  typeof ibgeGovApiLocalidadesMunicipiosListarRequestParamsSchema
>

interface base {
  id: string
  nome: string
}

interface regiao extends base {
  sigla: string
}

interface uf extends regiao {
  regiao: regiao
}

interface mesorregiao extends base {
  UF: uf
}

interface microrregiao extends base {
  mesorregiao: mesorregiao
}

interface regiaoImediata extends base {
  'regiao-intermediara': mesorregiao
}

export const ibgeGovApiLocalidadesMunicipioSchema = z.object({
  id: z.custom<string>(),
  nome: z.custom<string>(),
  microrregiao: z.custom<microrregiao>(),
  'regiao-imediata': z.custom<regiaoImediata>(),
})

export type IbgeGovApiLocalidadesMunicipio = z.output<
  typeof ibgeGovApiLocalidadesMunicipioSchema
>
