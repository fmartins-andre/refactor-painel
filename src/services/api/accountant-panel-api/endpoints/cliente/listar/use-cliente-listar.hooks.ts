import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { clienteListar, ClienteListarResponse } from './cliente-listar.endpoint'
import { ClienteListarRequestPayload } from './cliente-listar.schemas'

// query options
export const clienteListarClientOptions = (
  params?: ClienteListarRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: ['cliente-listar'],
    queryFn: async ({ signal }) => await clienteListar(params, signal),
  })
}

// normal hook
export function useClienteListar(params?: ClienteListarRequestPayload) {
  return useQuery(clienteListarClientOptions(params))
}

// lazy hook
export function useLazyClienteListar(): UseLazyClienteListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: ClienteListarResponse = queryClient.getQueryData(
    clienteListarClientOptions(state.params).queryKey
  )

  const trigger = useCallback(
    async (params?: ClienteListarRequestPayload) => {
      setState({ isFetching: true, params })

      const response = await queryClient.fetchQuery(
        clienteListarClientOptions()
      )

      setState((prev) => ({ ...prev, isFetching: false }))

      return response
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
  params?: ClienteListarRequestPayload
}

type UseLazyClienteListarReturn = [
  (params?: ClienteListarRequestPayload) => Promise<ClienteListarResponse>,
  {
    data: ClienteListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
