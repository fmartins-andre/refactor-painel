import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Layout } from '@/components/layout'

export const Route = createFileRoute('/_authenticated-routes')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      context.auth.logout()

      throw redirect({ to: '/login' })
    }
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
