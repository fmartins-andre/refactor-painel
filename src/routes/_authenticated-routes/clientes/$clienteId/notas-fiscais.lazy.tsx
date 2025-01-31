import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/notas-fiscais'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>cliente notas fiscais</div>
}
