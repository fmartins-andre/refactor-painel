import {
  clienteListarClientOptions,
  clienteTotalizarListagemClientOptions,
} from '@/services/api/accountant-panel-api/endpoints/cliente'
import { clientesListarPageSearchParamsSchema } from '@/services/route-validations/clientes'
import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

export const Route = createFileRoute('/_authenticated-routes/clientes/')({
  validateSearch: zodValidator(clientesListarPageSearchParamsSchema),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(clienteListarClientOptions(deps.search))
    context.queryClient.ensureQueryData(
      clienteTotalizarListagemClientOptions(deps.search)
    )
  },
})
