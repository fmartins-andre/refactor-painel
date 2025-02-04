import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  dasMeiObterArquivoPagamento,
  DasMeiObterArquivoPagamentoResponse,
} from './das-mei-obter-arquivo-pagamento.endpoint'
import { DasMeiObterArquivoPagamentoRequestPayload } from './das-mei-obter-arquivo-pagamento.schemas'

const MAIN_QUERY_KEY = 'das-mei-obter-arquivo-pagamento'

// query options
export const dasMeiObterArquivoPagamentoClientOptions = (
  params: DasMeiObterArquivoPagamentoRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await dasMeiObterArquivoPagamento(params, signal),
  })
}

// normal hook
export function useDasMeiObterArquivoPagamento(
  params: DasMeiObterArquivoPagamentoRequestPayload
) {
  return useQuery(dasMeiObterArquivoPagamentoClientOptions(params))
}

// lazy hook
export function useLazyDasMeiObterArquivoPagamento(): UseLazyDasMeiObterArquivoPagamentoReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: DasMeiObterArquivoPagamentoResponse = queryClient.getQueryData(
    state.params
      ? dasMeiObterArquivoPagamentoClientOptions(state.params).queryKey
      : [MAIN_QUERY_KEY]
  )

  const trigger = useCallback(
    async (params: DasMeiObterArquivoPagamentoRequestPayload) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          dasMeiObterArquivoPagamentoClientOptions(params)
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
  params: DasMeiObterArquivoPagamentoRequestPayload | undefined
}

type UseLazyDasMeiObterArquivoPagamentoReturn = [
  (
    params: DasMeiObterArquivoPagamentoRequestPayload
  ) => Promise<DasMeiObterArquivoPagamentoResponse>,
  {
    data: DasMeiObterArquivoPagamentoResponse
    isFetching: boolean
    isLoading: boolean
  },
]
