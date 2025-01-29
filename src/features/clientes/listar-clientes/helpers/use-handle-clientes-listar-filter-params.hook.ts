import {
  ClientesListarPageSearchParamsInput,
  ClientesListarPageSearchParamsOutput,
} from '@/services/route-validations/clientes'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateTime } from 'luxon'

export function useHandleClientesListarFilters(): {
  filters: ClientesListarPageSearchParamsOutput
  setFilters: (params: ClientesListarPageSearchParamsInput) => void
} {
  const navigate = useNavigate({ from: '/clientes' })

  const filters = useSearch({
    from: '/_authenticated-routes/clientes/',
  })

  const setFilters = (filters: ClientesListarPageSearchParamsInput) =>
    navigate({
      from: '/clientes',
      search: (prev) => ({
        ...prev,
        dataCriacaoInicial: prev.dataCriacaoInicial
          ? (DateTime.fromJSDate(prev.dataCriacaoInicial).toISO() ?? undefined)
          : undefined,
        dataCriacaoFinal: prev.dataCriacaoFinal
          ? (DateTime.fromJSDate(prev.dataCriacaoFinal).toISO() ?? undefined)
          : undefined,
        ...filters,
      }),
    })

  return {
    filters,
    setFilters,
  }
}
