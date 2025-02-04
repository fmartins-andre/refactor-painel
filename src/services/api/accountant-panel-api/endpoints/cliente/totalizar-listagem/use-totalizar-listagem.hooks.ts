import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  clienteTotalizarListagem,
  ClienteTotalizarListagemResponse,
} from './totalizar-listagem.endpoint'
import { ClienteTotalizarListagemRequestPayload } from './totalizar-listagem.schemas'

// query options
export const clienteTotalizarListagemClientOptions = (
  params?: ClienteTotalizarListagemRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: ['cliente-totalizar-listagem', params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await clienteTotalizarListagem(params, signal),
  })
}

// normal hook
export function useClienteTotalizarListagem(
  params?: ClienteTotalizarListagemRequestPayload
) {
  return useQuery(clienteTotalizarListagemClientOptions(params))
}

// lazy hook
export function useLazyClienteTotalizarListagem(): UseLazyClienteTotalizarListagemReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: ClienteTotalizarListagemResponse = queryClient.getQueryData(
    clienteTotalizarListagemClientOptions(state.params).queryKey
  )

  const trigger = useCallback(
    async (params?: ClienteTotalizarListagemRequestPayload) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          clienteTotalizarListagemClientOptions(params)
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
  params?: ClienteTotalizarListagemRequestPayload
}

type UseLazyClienteTotalizarListagemReturn = [
  (
    params?: ClienteTotalizarListagemRequestPayload
  ) => Promise<ClienteTotalizarListagemResponse>,
  {
    data: ClienteTotalizarListagemResponse
    isFetching: boolean
    isLoading: boolean
  },
]
