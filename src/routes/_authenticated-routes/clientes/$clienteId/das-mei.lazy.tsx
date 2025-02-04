import { CustomerDetailsDasMeiTable } from '@/features/clientes/detalhes-cliente/cliente-das-mei'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/das-mei'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsDasMeiTable />
}
