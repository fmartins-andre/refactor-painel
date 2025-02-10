import { CustomerDetailsConfig } from '@/features/clientes/detalhes-cliente/cliente-config'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/config'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsConfig />
}
