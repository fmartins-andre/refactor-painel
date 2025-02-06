import { ClienteListagemViewModel } from '@/services/api/accountant-panel-api/schemas/cliente-models'

export type ClientesListarTableActionHandler = (
  row: ClienteListagemViewModel
) => Promise<void>
