import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId/'
)({
  beforeLoad: () => {
    throw redirect({
      from: '/clientes/$clienteId',
      to: '/clientes/$clienteId/info',
    })
  },
})
