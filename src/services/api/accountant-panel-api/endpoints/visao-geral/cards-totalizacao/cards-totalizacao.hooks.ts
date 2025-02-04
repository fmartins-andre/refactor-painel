import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  visaoGeralCardTotalizacao,
  VisaoGeralCardTotalizacaoResponse,
} from './cards-totalizacao.endpoint'

const SECOND = 1000

// query options
export const visaoGeralCardTotalizacaoClientOptions = () => {
  return tanstackQueryOptions({
    queryKey: ['visao-geral-cards-totalizacao'],
    queryFn: async ({ signal }) =>
      await visaoGeralCardTotalizacao(undefined, signal),
    staleTime: 30 * SECOND,
  })
}

// normal hook
export function useVisaoGeralCardTotalizacao() {
  return useQuery(visaoGeralCardTotalizacaoClientOptions())
}

// lazy hook
export function useLazyVisaoGeralCardTotalizacao(): UseLazyVisaoGeralCardTotalizacaoReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
  })

  const data: VisaoGeralCardTotalizacaoResponse = queryClient.getQueryData(
    visaoGeralCardTotalizacaoClientOptions().queryKey
  )

  const trigger = useCallback(async () => {
    try {
      setState({ isFetching: true })

      const response = await queryClient.fetchQuery(
        visaoGeralCardTotalizacaoClientOptions()
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
        isLoading: Boolean(state.isFetching && data),
      },
    ],
    [data, state.isFetching, trigger]
  )
}

type UseLazyQueryState = {
  isFetching: boolean
}

type UseLazyVisaoGeralCardTotalizacaoReturn = [
  () => Promise<VisaoGeralCardTotalizacaoResponse>,
  {
    data: VisaoGeralCardTotalizacaoResponse
    isFetching: boolean
    isLoading: boolean
  },
]
