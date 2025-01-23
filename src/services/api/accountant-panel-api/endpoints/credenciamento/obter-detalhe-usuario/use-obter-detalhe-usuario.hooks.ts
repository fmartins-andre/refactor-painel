import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  credenciamentoObterDetalheUsuario,
  CredenciamentoObterDetalheUsuarioResponse,
} from './obter-detalhe-usuario.endpoint'

const MINUTE = 1000 * 60

// query options
export const credenciamentoObterDetalheUsuarioClientOptions = () => {
  return tanstackQueryOptions({
    queryKey: ['credenciamento-obter-detalhe-usuario'],
    queryFn: async ({ signal }) =>
      await credenciamentoObterDetalheUsuario(undefined, signal),
    staleTime: MINUTE * 2, // two minutes
  })
}

// normal hook
export function useCredenciamentoObterDetalheUsuario() {
  return useQuery(credenciamentoObterDetalheUsuarioClientOptions())
}

// lazy hook
export function useLazyCredenciamentoObterDetalheUsuario(): UseLazyCredenciamentoObterDetalheUsuarioReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
  })

  const data: CredenciamentoObterDetalheUsuarioResponse =
    queryClient.getQueryData(
      credenciamentoObterDetalheUsuarioClientOptions().queryKey
    )

  const trigger = useCallback(async () => {
    setState({ isFetching: true })

    const response = await queryClient.fetchQuery(
      credenciamentoObterDetalheUsuarioClientOptions()
    )

    setState((prev) => ({ ...prev, isFetching: false }))

    return response
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

type UseLazyCredenciamentoObterDetalheUsuarioReturn = [
  () => Promise<CredenciamentoObterDetalheUsuarioResponse>,
  {
    data: CredenciamentoObterDetalheUsuarioResponse
    isFetching: boolean
    isLoading: boolean
  },
]
