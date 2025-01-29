import { CustomerList } from '@/features/clientes/listar-clientes'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated-routes/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerList />
}
