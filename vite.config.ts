import path from 'path'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  process.env = { ...process.env, ...env }

  if (!mode.includes('production')) {
    console.log(`Starting ${mode} server with env:\n`, env)
  }

  return {
    plugins: [TanStackRouterVite({}), react(), ValidateEnv()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
