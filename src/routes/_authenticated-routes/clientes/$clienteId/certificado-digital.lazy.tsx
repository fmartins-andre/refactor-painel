import { CustomerDetailsDigitalCert } from '@/features/clientes/detalhes-cliente/cliente-certificado-digital'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated-routes/clientes/$clienteId/certificado-digital'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerDetailsDigitalCert />
}
