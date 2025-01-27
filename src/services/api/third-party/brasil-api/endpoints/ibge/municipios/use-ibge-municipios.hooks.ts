import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  brasilApiIbgeMunicipiosListar,
  BrasilApiIbgeMunicipiosListarResponse,
} from './ibge-municipios.endpoint'
import { BrasilApiIbgeMunicipiosListarRequestParams } from './ibge-municipios.schemas'

const MINUTE = 1000 * 60

const MAIN_QUERY_KEY = 'ibge-municipios'

// query options
export const brasilApiIbgeMunicipiosClientOptions = (
  params: BrasilApiIbgeMunicipiosListarRequestParams
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await brasilApiIbgeMunicipiosListar(params, signal),
    staleTime: 60 * MINUTE,
    enabled: Boolean(params?.uf.length),
  })
}

// normal hook
export function useBrasilApiIbgeMunicipios(
  params: BrasilApiIbgeMunicipiosListarRequestParams
) {
  return useQuery(brasilApiIbgeMunicipiosClientOptions(params))
}

// lazy hook
export function useLazyBrasilApiIbgeMunicipios(): UseLazyBrasilApiIbgeMunicipiosReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: BrasilApiIbgeMunicipiosListarResponse = queryClient.getQueryData(
    state.params
      ? brasilApiIbgeMunicipiosClientOptions(state.params).queryKey
      : [MAIN_QUERY_KEY]
  )

  const trigger = useCallback(
    async (params: BrasilApiIbgeMunicipiosListarRequestParams) => {
      setState({ isFetching: true, params })

      const response = await queryClient.fetchQuery(
        brasilApiIbgeMunicipiosClientOptions(params)
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
  params: BrasilApiIbgeMunicipiosListarRequestParams | undefined
}

type UseLazyBrasilApiIbgeMunicipiosReturn = [
  (
    params: BrasilApiIbgeMunicipiosListarRequestParams
  ) => Promise<BrasilApiIbgeMunicipiosListarResponse>,
  {
    data: BrasilApiIbgeMunicipiosListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
