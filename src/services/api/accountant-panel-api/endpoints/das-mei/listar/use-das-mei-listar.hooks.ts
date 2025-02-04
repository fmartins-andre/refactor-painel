import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { dasMeiListar, DasMeiListarResponse } from './das-mei-listar.endpoint'
import { DasMeiListarRequestPayload } from './das-mei-listar.schemas'

// query options
export const dasMeiListarClientOptions = (
  params?: DasMeiListarRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: ['das-mei-listar', params].filter(Boolean),
    queryFn: async ({ signal }) => await dasMeiListar(params, signal),
  })
}

// normal hook
export function useDasMeiListar(params?: DasMeiListarRequestPayload) {
  return useQuery(dasMeiListarClientOptions(params))
}

// lazy hook
export function useLazyDasMeiListar(): UseLazyDasMeiListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: DasMeiListarResponse = queryClient.getQueryData(
    dasMeiListarClientOptions(state.params).queryKey
  )

  const trigger = useCallback(
    async (params?: DasMeiListarRequestPayload) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          dasMeiListarClientOptions(params)
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
  params?: DasMeiListarRequestPayload
}

type UseLazyDasMeiListarReturn = [
  (params?: DasMeiListarRequestPayload) => Promise<DasMeiListarResponse>,
  {
    data: DasMeiListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
