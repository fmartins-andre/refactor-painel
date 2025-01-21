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
    VITE_ACCOUNTANT_PANEL_API_URL: z.string().url(),
    VITE_ACCOUNTANT_PANEL_API_KEY: z.string().min(5),
    VITE_ACCOUNTANT_PANEL_API_APP_ID: z.union([
      z.literal('8c219131-e367-4d9c-bcb0-a325c25915d2'), // emitte
      z.literal('aa958344-5cac-495d-bf37-cea286811580'), // efacil
      z.literal('947cae36-02e5-4cf3-a06d-28207b364594'), // iob
    ]),
  },
})
