import { useCallback, useMemo, useState } from 'react'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  ibgeGovApiLocalidadesMunicipiosListar,
  IbgeGovApiLocalidadesMunicipiosListarResponse,
} from './localidades-municipios.endpoint'
import { IbgeGovApiLocalidadesMunicipiosListarRequestParams } from './localidades-municipios.schemas'

const MINUTE = 1000 * 60

const MAIN_QUERY_KEY = 'ibge-municipios'

// query options
export const ibgeGovApiLocalidadesMunicipiosClientOptions = (
  params: IbgeGovApiLocalidadesMunicipiosListarRequestParams
) => {
  return tanstackQueryOptions({
    queryKey: [MAIN_QUERY_KEY, params].filter(Boolean),
    queryFn: async ({ signal }) =>
      await ibgeGovApiLocalidadesMunicipiosListar(params, signal),
    staleTime: 60 * MINUTE,
    enabled: Boolean(params?.uf.length),
  })
}

// normal hook
export function useIbgeGovApiLocalidadesMunicipios(
  params: IbgeGovApiLocalidadesMunicipiosListarRequestParams
) {
  return useQuery(ibgeGovApiLocalidadesMunicipiosClientOptions(params))
}

// lazy hook
export function useLazyIbgeGovApiLocalidadesMunicipios(): UseLazyIbgeGovApiLocalidadesMunicipiosReturn {
  const queryClient = useQueryClient()

  const [state, setState] = useState<UseLazyQueryState>({
    isFetching: false,
    params: undefined,
  })

  const data: IbgeGovApiLocalidadesMunicipiosListarResponse =
    queryClient.getQueryData(
      state.params
        ? ibgeGovApiLocalidadesMunicipiosClientOptions(state.params).queryKey
        : [MAIN_QUERY_KEY]
    )

  const trigger = useCallback(
    async (params: IbgeGovApiLocalidadesMunicipiosListarRequestParams) => {
      try {
        setState({ isFetching: true, params })

        const response = await queryClient.fetchQuery(
          ibgeGovApiLocalidadesMunicipiosClientOptions(params)
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
        isLoading: Boolean(state.isFetching && !data),
      },
    ],
    [data, state.isFetching, trigger]
  )
}

type UseLazyQueryState = {
  isFetching: boolean
  params: IbgeGovApiLocalidadesMunicipiosListarRequestParams | undefined
}

type UseLazyIbgeGovApiLocalidadesMunicipiosReturn = [
  (
    params: IbgeGovApiLocalidadesMunicipiosListarRequestParams
  ) => Promise<IbgeGovApiLocalidadesMunicipiosListarResponse>,
  {
    data: IbgeGovApiLocalidadesMunicipiosListarResponse
    isFetching: boolean
    isLoading: boolean
  },
]
