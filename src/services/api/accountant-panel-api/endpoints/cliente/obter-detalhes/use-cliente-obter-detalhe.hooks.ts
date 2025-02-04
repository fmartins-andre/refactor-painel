import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  clienteObterDetalhe,
  ClienteObterDetalheResponse,
} from './cliente-obter-detalhe.endpoint'
import { ClienteObterDetalheRequestPayload } from './cliente-obter-detalhe.schemas'

const MAIN_QUERY_KEY = 'cliente-obter-detalhe'

// query options
export const clienteObterDetalheClientOptions = (
  params: ClienteObterDetalheRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) => await clienteObterDetalhe(params, signal),
  })
}

// normal hook
export function useClienteObterDetalhe(
  params: ClienteObterDetalheRequestPayload
) {
  return useQuery(clienteObterDetalheClientOptions(params))
}

// lazy hook
export function useLazyClienteObterDetalhe(): UseLazyClienteObterDetalheReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: ClienteObterDetalheResponse = queryClient.getQueryData(
    state.params
      ? clienteObterDetalheClientOptions(state.params).queryKey
      : [MAIN_QUERY_KEY]
  )

  const trigger = useCallback(
    async (params: ClienteObterDetalheRequestPayload) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          clienteObterDetalheClientOptions(params)
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
        isLoading: Boolean(state.isFetching && data),
      },
    ],
    [data, state.isFetching, trigger]
  )
}

type UseLazyQueryState = {
  isFetching: boolean
  params: ClienteObterDetalheRequestPayload | undefined
}

type UseLazyClienteObterDetalheReturn = [
  (
    params: ClienteObterDetalheRequestPayload
  ) => Promise<ClienteObterDetalheResponse>,
  {
    data: ClienteObterDetalheResponse
    isFetching: boolean
    isLoading: boolean
  },
]
