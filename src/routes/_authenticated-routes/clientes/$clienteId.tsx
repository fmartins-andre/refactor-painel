import { clienteObterDetalheClientOptions } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId'
)({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      clienteObterDetalheClientOptions(params)
    )
  },
})
