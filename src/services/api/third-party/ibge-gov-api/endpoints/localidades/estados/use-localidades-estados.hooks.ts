import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  ibgeGovApiLocalidadesEstadosListar,
  IbgeGovApiLocalidadesEstadosListarResponse,
} from './localidades-estados.endpoint'

const MINUTE = 1000 * 60

// query options
export const ibgeGovApiLocalidadesEstadosListarClientOptions = () => {
  return tanstackQueryOptions({
    queryKey: ['ibge-uf'],
    queryFn: async ({ signal }) =>
      await ibgeGovApiLocalidadesEstadosListar(undefined, signal),
    staleTime: 60 * MINUTE,
  })
}

// normal hook
export function useIbgeGovApiLocalidadesEstadosListar() {
  return useQuery(ibgeGovApiLocalidadesEstadosListarClientOptions())
}

// lazy hook
export function useLazyIbgeGovApiLocalidadesEstadosListar(): UseLazyIbgeGovApiLocalidadesEstadosListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
  })

  const data: IbgeGovApiLocalidadesEstadosListarResponse =
    queryClient.getQueryData(
      ibgeGovApiLocalidadesEstadosListarClientOptions().queryKey
    )

  const trigger = useCallback(async () => {
    try {
      setState({ isFetching: true })

      const response = await queryClient.fetchQuery(
        ibgeGovApiLocalidadesEstadosListarClientOptions()
      )

      return response
    } catch (_) {
      // precisa fazer nada
    } finally {
      setState((prev) => ({ ...prev, isFetching: false }))
    }
  }, [queryClient])

  return useMemo(
    () => [
      trigger,
      {
        data,
        isFetching: state.isFetching,
        isLoading: Boolean(state.isFetching && !data),
      },
    ],
    [data, state.isFetching, trigger]
  )
}

type UseLazyQueryState = {
  isFetching: boolean
}

type UseLazyIbgeGovApiLocalidadesEstadosListarReturn = [
  () => Promise<IbgeGovApiLocalidadesEstadosListarResponse>,
  {
    data: IbgeGovApiLocalidadesEstadosListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
