import { CustomerDetailsInvoicesTable } from '@/features/clientes/detalhes-cliente/cliente-notas-fiscias/customer-invoices.comp'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/xml'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsInvoicesTable />
}
