import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId/notas-fiscais'
)({
  loader: () => {},
})
