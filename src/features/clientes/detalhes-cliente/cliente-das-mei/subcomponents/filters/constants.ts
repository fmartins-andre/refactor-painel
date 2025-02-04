import { DasMeiListarFiltersFormInput } from './das-mei-listar-filters.schema'

export const filtersFormId = 'clientesListarFiltersForm' as const

export const formDefaultValues: DasMeiListarFiltersFormInput = {
  anoReferencia: null,
  clienteId: null,
  dasMeiId: null,
  dataVencimentoFinal: null,
  dataVencimentoInicial: null,
  mesReferencia: null,
  page: 1,
  perPage: 10,
  status: null,
  valorFinal: null,
  valorInicial: null,
}
