import { dasMeiListarClientOptions } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { dasMeiListarPageSearchParamsSchema } from '@/services/route-validations/clientes'
import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId/das-mei'
)({
  validateSearch: zodValidator(dasMeiListarPageSearchParamsSchema),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(dasMeiListarClientOptions(deps.search))
  },
})
