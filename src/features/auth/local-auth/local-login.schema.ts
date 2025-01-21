import { z } from '@/lib/translated-zod'

export const localLoginSchema = z.object({
  email: z.union([z.string().email().max(120), z.literal('admin')]),
  senha: z.union([z.string().min(3).max(32), z.literal('admin')]),
})

export type LocalLoginFormSchema = z.infer<typeof localLoginSchema>
