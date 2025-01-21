import { z } from '@/lib/translated-zod'

export const autenticacaoObterTokenRequestPayloadSchema = z.object({
  email: z.union([z.string().email().max(120), z.literal('admin')]),
  senha: z.union([z.string().min(3).max(32), z.literal('admin')]),
})

export type AutenticacaoObterTokenRequestPayload = z.input<
  typeof autenticacaoObterTokenRequestPayloadSchema
>

export const autenticacaoObterTokenResponseSchema = z.object({
  token: z.custom<string>(),
  expiresIn: z.custom<number>(),
  refreshExpiresIn: z.custom<number>(),
})

export type AutenticacaoObterTokenResponse = z.output<
  typeof autenticacaoObterTokenResponseSchema
>
