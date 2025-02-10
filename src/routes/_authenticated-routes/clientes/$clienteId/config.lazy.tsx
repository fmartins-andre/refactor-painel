import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/config'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated-routes/clientes/$clienteId/config"!</div>
}
