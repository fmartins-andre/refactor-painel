import { UfBrasilEnum } from '@/@types/system-wide-enums'

import { z } from '@/lib/translated-zod'

export const contadorEnderecoViewModelSchema = z.object({
  logradouro: z.custom<string>(),
  numero: z.custom<string>(),
  bairro: z.custom<string>(),
  complemento: z.custom<string>(),
  cidade: z.custom<string>(),
  uf: z.custom<UfBrasilEnum>(),
  cep: z.custom<string>(),
})

export type ContadorEnderecoViewModel = z.output<
  typeof contadorEnderecoViewModelSchema
>
