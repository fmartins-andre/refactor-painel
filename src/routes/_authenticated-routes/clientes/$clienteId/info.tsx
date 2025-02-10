import { ibgeGovApiLocalidadesEstadosListarClientOptions } from '@/services/api/third-party/ibge-gov-api/endpoints/localidades'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId/info'
)({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      ibgeGovApiLocalidadesEstadosListarClientOptions()
    )
  },
})
