import { defineConfig } from '@julr/vite-plugin-validate-env'
import { z } from 'zod'

// ATENÇÃO: todas as variáveis de ambiente são recebidas como string
// para tratá-las de outra forma, utiliza preprocessors ou transforms

export default defineConfig({
  validator: 'zod',
  schema: {
    VITE_BRAND_NAME: z.union([
      z.literal('emitte'),
      z.literal('efacil'),
      z.literal('iob'),
    ]),
  },
})
