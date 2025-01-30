import { ClienteListagemViewModel } from '@/services/api/accountant-panel-api/schemas/cliente-view-model'

export type ClientesListarTableActionHandler = (
  row: ClienteListagemViewModel
) => Promise<void>
