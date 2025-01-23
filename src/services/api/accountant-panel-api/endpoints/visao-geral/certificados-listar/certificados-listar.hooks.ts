import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  visaoGeralCertificadosListar,
  VisaoGeralCertificadosListarResponse,
} from './certificados-listar.endpoint'
import { VisaoGeralCertificadosListarRequestPayload } from './certificados-listar.schemas'

const SECOND = 1000

// query options
export const visaoGeralCertificadosListarClientOptions = (
  params: VisaoGeralCertificadosListarRequestPayload
) => {
  return tanstackQueryOptions({
    queryKey: ['visao-geral-certificados-listar', params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await visaoGeralCertificadosListar(params, signal),
    staleTime: 30 * SECOND,
  })
}

// normal hook
export function useVisaoGeralCertificadosListar(
  params: VisaoGeralCertificadosListarRequestPayload
) {
  return useQuery(visaoGeralCertificadosListarClientOptions(params))
}

// lazy hook
export function useLazyVisaoGeralCertificadosListar(): UseLazyVisaoGeralCertificadosListarReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: {
      status: null,
    },
  })

  const data = queryClient.getQueryData(
    visaoGeralCertificadosListarClientOptions(state.params).queryKey
  )

  const trigger = useCallback(async () => {
    setState((prev) => ({ ...prev, isFetching: true }))

    const response = await queryClient.fetchQuery(
      visaoGeralCertificadosListarClientOptions(state.params)
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
  params: VisaoGeralCertificadosListarRequestPayload
}

type UseLazyVisaoGeralCertificadosListarReturn = [
  () => Promise<VisaoGeralCertificadosListarResponse>,
  {
    data: VisaoGeralCertificadosListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
