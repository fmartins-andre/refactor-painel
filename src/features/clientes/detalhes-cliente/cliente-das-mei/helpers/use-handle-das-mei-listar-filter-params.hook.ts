import {
  DasMeiListarPageSearchParamsInput,
  DasMeiListarPageSearchParamsOutput,
} from '@/services/route-validations/clientes'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateTime } from 'luxon'

export function useHandleDasMeiListarFilters(): {
  filters: DasMeiListarPageSearchParamsOutput
  setFilters: (params: DasMeiListarPageSearchParamsInput) => void
} {
  const navigate = useNavigate({ from: '/clientes/$clienteId/das-mei' })

  const filters = useSearch({
    from: '/_authenticated-routes/clientes/$clienteId/das-mei',
  })

  const setFilters = (filters: DasMeiListarPageSearchParamsInput) =>
    navigate({
      from: '/clientes/$clienteId/das-mei',
      search: (prev) => ({
        ...prev,
        dataVencimentoInicial: prev.dataVencimentoInicial
          ? (DateTime.fromJSDate(prev.dataVencimentoInicial).toISO() ??
            undefined)
          : undefined,
        dataVencimentoFinal: prev.dataVencimentoFinal
          ? (DateTime.fromJSDate(prev.dataVencimentoFinal).toISO() ?? undefined)
          : undefined,
        ...filters,
      }),
    })

  return {
    filters,
    setFilters,
  }
}
