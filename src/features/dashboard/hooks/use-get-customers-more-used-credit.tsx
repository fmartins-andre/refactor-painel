import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import { customersMoreUsingCreditSchema } from '../validations/customers-more-using-credit'

interface GetLastInvoicesParams {
  searchFilter: string
  initialDateFilter: Date
  finallyDateFilter: Date
}

export const getCustomersMoreUsingCredit = ({
  finallyDateFilter,
  initialDateFilter,
  searchFilter,
}: GetLastInvoicesParams) => {
  const queryKey = [
    'more-using-credit',
    searchFilter,
    initialDateFilter,
    finallyDateFilter,
  ]

  const queryFn = async () => {
    let searchFilterApi = ''
    if (searchFilter.length > 0) {
      searchFilterApi = '&busca=' + searchFilter
    }

    // const { data } = await api.get(
    //   '/contador/dashboard/clientes/maiores-emissores?dataInicial=' +
    //     dateFormatterApi(initialDateFilter) +
    //     '&dataFinal=' +
    //     dateFormatterApi(finallyDateFilter) +
    //     searchFilterApi +
    //     '&page=1&perPage=1000'
    // )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {}

    const dataParsed = customersMoreUsingCreditSchema.safeParse(data.data)

    if (!dataParsed.success) {
      console.log(dataParsed.error)
    }

    if (dataParsed.success) {
      return dataParsed.data
    }

    return []
  }

  const queryOptions = tanstackQueryOptions({
    queryKey,
    queryFn,
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnMount: false,
  })

  return { queryKey, queryOptions }
}

export function useGetCustomersMoreUsingCredit(params: GetLastInvoicesParams) {
  return useQuery(getCustomersMoreUsingCredit(params).queryOptions)
}

export function useLazyGetCustomersMoreUsingCredit(
  params: GetLastInvoicesParams
) {
  const queryClient = useQueryClient()
  return () =>
    queryClient.ensureQueryData(
      getCustomersMoreUsingCredit(params).queryOptions
    )
}
