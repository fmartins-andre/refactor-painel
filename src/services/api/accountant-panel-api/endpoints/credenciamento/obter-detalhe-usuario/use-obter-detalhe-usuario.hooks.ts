import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { UsuarioViewModel } from '../../../schemas'
import { credenciamentoObterDetalheUsuario } from './obter-detalhe-usuario.endpoint'

const MINUTE = 1000 * 60

// query options
export const credenciamentoObterDetalheUsuarioClientOptions = () => {
  return tanstackQueryOptions({
    queryKey: ['credenciamento-obter-detalhe-usuario'],
    queryFn: credenciamentoObterDetalheUsuario,
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

  const [state, setState] = useState<UseGetCustomerListState>({
    isFetching: false,
  })

  const data: UsuarioViewModel | undefined = queryClient.getQueryData(
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

type UseGetCustomerListState = {
  isFetching: boolean
}

type UseLazyCredenciamentoObterDetalheUsuarioReturn = [
  () => Promise<UsuarioViewModel>,
  {
    data: UsuarioViewModel | undefined
    isFetching: boolean
    isLoading: boolean
  },
]
