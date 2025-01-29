import { ClientesListarFiltersFormInput } from './cliente-listar-filters.schema'

export const filtersFormId = 'clientesListarFiltersForm' as const

export const formDefaultValues: ClientesListarFiltersFormInput = {
  clienteId: null,
  busca: null,
  dataCriacaoInicial: null,
  dataCriacaoFinal: null,
  status: null,
  regimeTributario: null,
  regimeSubstituicao: null,
  indicadorAtividade: null,
  estabelecimento: null,
  regimeEspecial: null,
}
