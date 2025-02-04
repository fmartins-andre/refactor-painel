import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  viaCepApiLocalidadeDetalhes,
  ViaCepApiLocalidadeDetalhesResponse,
} from './cep.endpoint'
import { ViaCepApiLocalidadeDetalhesRequestParams } from './cep.schemas'

const MINUTE = 1000 * 60

const MAIN_QUERY_KEY = 'viacepapi-localidade-detalhes'

// query options
export const viaCepApiLocalidadeDetalhesClientOptions = (
  params: ViaCepApiLocalidadeDetalhesRequestParams
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await viaCepApiLocalidadeDetalhes(params, signal),
    staleTime: 2 * MINUTE,
    enabled: Boolean(params.cep.length),
  })
}

// normal hook
export function useViaCepApíLocalidadeDetalhes(
  params: ViaCepApiLocalidadeDetalhesRequestParams
) {
  return useQuery(viaCepApiLocalidadeDetalhesClientOptions(params))
}

// lazy hook
export function useLazyViaCepApiLocalidadeDetalhes(): UseLazyViaCepApiLocalidadeDetalhesReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: ViaCepApiLocalidadeDetalhesResponse = queryClient.getQueryData(
    state.params
      ? viaCepApiLocalidadeDetalhesClientOptions(state.params).queryKey
      : [MAIN_QUERY_KEY]
  )

  const trigger = useCallback(
    async (params: ViaCepApiLocalidadeDetalhesRequestParams) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          viaCepApiLocalidadeDetalhesClientOptions(params)
        )

        return response
      } catch (_) {
        // precisa fazer nada
      } finally {
        setState((prev) => ({ ...prev, isFetching: false }))
      }
    },
    [queryClient]
  )

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
  params: ViaCepApiLocalidadeDetalhesRequestParams | undefined
}

type UseLazyViaCepApiLocalidadeDetalhesReturn = [
  (
    params: ViaCepApiLocalidadeDetalhesRequestParams
  ) => Promise<ViaCepApiLocalidadeDetalhesResponse>,
  {
    data: ViaCepApiLocalidadeDetalhesResponse
    isFetching: boolean
    isLoading: boolean
  },
]
