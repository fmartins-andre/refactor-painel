import { useNavigate } from '@tanstack/react-router'

import { ClientesListarTableActionHandler } from './table-actions.types'

export function useNavigateToCustomerDetailsTableActionHandler(): ClientesListarTableActionHandler {
  const navigate = useNavigate({ from: '/clientes' })

  const handler: ClientesListarTableActionHandler = async (row) => {
    navigate({ to: '/clientes/$clienteId', params: { clienteId: row.id } })
  }

  return handler
}
