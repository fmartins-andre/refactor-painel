import { CustomerDetails } from '@/features/clientes/detalhes-cliente'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetails />
}
