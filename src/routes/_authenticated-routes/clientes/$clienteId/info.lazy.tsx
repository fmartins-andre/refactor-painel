import { CustomerDetailsInfoForm } from '@/features/clientes/detalhes-cliente/cliente-info'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/info'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsInfoForm />
}
