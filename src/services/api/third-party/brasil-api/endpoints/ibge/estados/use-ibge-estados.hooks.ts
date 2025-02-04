import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  brasilApiIbgeEstadosListar,
  BrasilApiIbgeEstadosListarResponse,
} from './ibge-estados.endpoint'

const MINUTE = 1000 * 60

// query options
export const brasilApiIbgeEstadosListarClientOptions = () => {
  return tanstackQueryOptions({
    queryKey: ['ibge-uf'],
    queryFn: async ({ signal }) =>
      await brasilApiIbgeEstadosListar(undefined, signal),
    staleTime: 60 * MINUTE,
  })
}

// normal hook
export function useBrasilApiIbgeEstadosListar() {
  return useQuery(brasilApiIbgeEstadosListarClientOptions())
}

// lazy hook
export function useLazyBrasilApiIbgeEstadosListar(): UseLazyBrasilApiIbgeEstadosListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
  })

  const data: BrasilApiIbgeEstadosListarResponse = queryClient.getQueryData(
    brasilApiIbgeEstadosListarClientOptions().queryKey
  )

  const trigger = useCallback(async () => {
    try {
      setState({ isFetching: true })

      const response = await queryClient.fetchQuery(
        brasilApiIbgeEstadosListarClientOptions()
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

type UseLazyBrasilApiIbgeEstadosListarReturn = [
  () => Promise<BrasilApiIbgeEstadosListarResponse>,
  {
    data: BrasilApiIbgeEstadosListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
