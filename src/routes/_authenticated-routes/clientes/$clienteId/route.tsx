import { clienteObterDetalheClientOptions } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { z } from '@/lib/translated-zod'

function hasValidParams(params: unknown) {
  return z
    .object({
      clienteId: z.string().uuid(),
    })
    .safeParse(params).success
}

export const Route = createFileRoute(
  '/_authenticated-routes/clientes/$clienteId'
)({
  beforeLoad: ({ params }) => {
    if (!hasValidParams(params)) {
      throw redirect({ from: '/clientes/$clienteId', to: '/clientes' })
    }
  },
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      clienteObterDetalheClientOptions(params)
    )
  },
})
