import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  visaoGeralDasListar,
  VisaoGeralDasListarResponse,
} from './das-listar.endpoint'
import { VisaoGeralDasListarRequestPayload } from './das-listar.schemas'

const SECOND = 1000

// query options
export const visaoGeralDasListarClientOptions = (
  params: VisaoGeralDasListarRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: ['visao-geral-das-listar', params].filter(Boolean),
    queryFn: async ({ signal }) => await visaoGeralDasListar(params, signal),
    staleTime: 30 * SECOND,
  })
}

// normal hook
export function useVisaoGeralDasListar(
  params: VisaoGeralDasListarRequestPayload
) {
  return useQuery(visaoGeralDasListarClientOptions(params))
}

// lazy hook
export function useLazyVisaoGeralDasListar(): UseLazyVisaoGeralDasListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: {
      status: null,
    },
  })

  const data = queryClient.getQueryData(
    visaoGeralDasListarClientOptions(state.params).queryKey
  )

  const trigger = useCallback(async () => {
    setState((prev) => ({ ...prev, isFetching: true }))

    const response = await queryClient.fetchQuery(
      visaoGeralDasListarClientOptions(state.params)
    )

    setState((prev) => ({ ...prev, isFetching: false }))

    return response
  }, [queryClient, state.params])

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
  params: VisaoGeralDasListarRequestPayload
}

type UseLazyVisaoGeralDasListarReturn = [
  () => Promise<VisaoGeralDasListarResponse>,
  {
    data: VisaoGeralDasListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
