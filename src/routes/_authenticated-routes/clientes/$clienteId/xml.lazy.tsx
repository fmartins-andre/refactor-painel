import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/xml'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>cliente xmls</div>
}
