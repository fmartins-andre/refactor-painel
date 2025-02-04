import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { cnpjWsDadosEmpresa, CnpjWsDadosEmpresaResponse } from './cnpj.endpoint'
import { CnpjWsDadosEmpresaRequestParams } from './cnpj.schemas'

const MINUTE = 1000 * 60

const MAIN_QUERY_KEY = 'cnpjws-dados-empresa'

// query options
export const cnpjWsDadosEmpresaClientOptions = (
  params: CnpjWsDadosEmpresaRequestParams
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) => await cnpjWsDadosEmpresa(params, signal),
    staleTime: 2 * MINUTE,
    enabled: Boolean(params.cnpj.length),
  })
}

// normal hook
export function useCnpjWsDadosEmpresa(params: CnpjWsDadosEmpresaRequestParams) {
  return useQuery(cnpjWsDadosEmpresaClientOptions(params))
}

// lazy hook
export function useLazyCnpjWsDadosEmpresa(): UseLazyCnpjWsDadosEmpresaReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: CnpjWsDadosEmpresaResponse = queryClient.getQueryData(
    state.params
      ? cnpjWsDadosEmpresaClientOptions(state.params).queryKey
      : [MAIN_QUERY_KEY]
  )

  const trigger = useCallback(
    async (params: CnpjWsDadosEmpresaRequestParams) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          cnpjWsDadosEmpresaClientOptions(params)
        )

        setState((prev) => ({ ...prev, isFetching: false }))

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
        isLoading: Boolean(state.isFetching && !data),
      },
    ],
    [data, state.isFetching, trigger]
  )
}

type UseLazyQueryState = {
  isFetching: boolean
  params: CnpjWsDadosEmpresaRequestParams | undefined
}

type UseLazyCnpjWsDadosEmpresaReturn = [
  (
    params: CnpjWsDadosEmpresaRequestParams
  ) => Promise<CnpjWsDadosEmpresaResponse>,
  {
    data: CnpjWsDadosEmpresaResponse
    isFetching: boolean
    isLoading: boolean
  },
]
