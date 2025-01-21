import { z } from '@/lib/translated-zod'

export const usuarioPermissaoViewModelSchema = z.object({
  id: z.custom<string>(),
  nome: z.custom<string>(),
  descricao: z.custom<string>(),
  autorizado: z.custom<string>(),
})

export type UsuarioPermissaoViewModel = z.output<
  typeof usuarioPermissaoViewModelSchema
>
