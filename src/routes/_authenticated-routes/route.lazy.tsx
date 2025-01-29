import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

import { Layout } from '@/components/layout'

export const Route = createLazyFileRoute('/_authenticated-routes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
