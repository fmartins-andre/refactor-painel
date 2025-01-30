import { ClientesListarTableActionHandler } from './table-actions.types'

export function useNavigateToEmissorTableActionHandler(): ClientesListarTableActionHandler {
  const handler: ClientesListarTableActionHandler = async (row) => {
    alert(`abre emissor de "${row.nomeRazaoSocial}"`)
  }

  return handler
}
