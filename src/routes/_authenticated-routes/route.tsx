import { credenciamentoObterDetalheUsuarioClientOptions } from '@/services/api/accountant-panel-api/endpoints/credenciamento'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Layout } from '@/components/layout'

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
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
