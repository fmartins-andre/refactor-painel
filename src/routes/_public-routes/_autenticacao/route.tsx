import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-routes/_autenticacao')({
  beforeLoad: async ({ context }) => {
    await context.queryClient.invalidateQueries()
    await context.queryClient.resetQueries()
    context.queryClient.clear()
  },

  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
