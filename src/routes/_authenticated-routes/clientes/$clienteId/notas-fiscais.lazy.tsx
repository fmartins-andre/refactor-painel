import { CustomerDetailsInvoicesTable } from '@/features/clientes/detalhes-cliente/cliente-notas-fiscias'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/notas-fiscais'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsInvoicesTable />
}
