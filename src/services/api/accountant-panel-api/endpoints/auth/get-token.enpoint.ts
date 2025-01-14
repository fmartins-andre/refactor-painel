import { makeEndpoint } from '@zodios/core'
import { HttpStatusCode } from 'axios'

import { z } from '@/lib/translated-zod'

export const authGetToken = makeEndpoint({
  alias: 'authGetToken',
  method: 'get',
  path: '/v1/Autenticacao/ObterToken',

  parameters: [
    {
      type: 'Body',
      name: 'body',
      description: 'Credenciais de acesso',
      schema: z.object({
        email: z.string().email(),
        senha: z.string().min(1),
      }),
    },
  ],

  response: z.custom<{ token: string }>(),

  errors: [
    {
      status: HttpStatusCode.BadRequest,
      schema: z.custom<Erro400>(),
      description: 'Credenciais inválidas',
    },
    {
      status: HttpStatusCode.Unauthorized,
      schema: z.custom<Erro400>(),
      description: 'Credenciais inválidas',
    },
    { status: 'default', schema: z.unknown(), description: 'Erro' },
  ],
})

type Erro400 = {
  type: 'string'
  title: 'string'
  status: number
  detail: 'string'
  instance: 'string'
}
