import { credenciamentoObterDetalheUsuarioClientOptions } from '@/services/api/accountant-panel-api/endpoints/credenciamento'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-routes')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      credenciamentoObterDetalheUsuarioClientOptions()
    )
  },
})
