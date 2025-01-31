import { useClienteObterDetalhe } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { useParams } from '@tanstack/react-router'

export function useGetCurrentCustomerData() {
  const clienteId = useParams({
    from: '/_authenticated-routes/clientes/$clienteId',
    select: ({ clienteId }) => clienteId,
  })

  return useClienteObterDetalhe({ clienteId })
}
