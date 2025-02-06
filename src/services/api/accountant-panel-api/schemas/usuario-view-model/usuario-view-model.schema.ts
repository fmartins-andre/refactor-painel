import { z } from '@/lib/translated-zod'

import { contadorViewModelSchema } from '../contador-models'
import { usuarioPermissaoViewModelSchema } from './usuario-permissao-view-model.schema'
import {
  StatusUsuarioModelEnum,
  TipoUsuarioModelEnum,
} from './usuario-view-model.enum'

export const usuarioViewModelSchema = z.object({
  id: z.custom<string>(),
  tipoUsuario: z.custom<TipoUsuarioModelEnum>(),
  status: z.custom<StatusUsuarioModelEnum>(),
  nome: z.custom<string>(),
  email: z.custom<string>(),
  contador: contadorViewModelSchema.nullable(),
  permissoes: usuarioPermissaoViewModelSchema.array().nullable(),
})

export type UsuarioViewModel = z.output<typeof usuarioViewModelSchema>
