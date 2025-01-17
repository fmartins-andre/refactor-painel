import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'

interface TotalInvoicesResponse {
  total: number
  status: string
}

export const getCardsValues = () => {
  const queryKey = ['total-invoices']

  const queryFn = async (): Promise<
    { invoices: TotalInvoicesResponse[]; total: number } | undefined
  > => {
    // const { data } = await api.get<TotalInvoicesResponse[]>(
    //   '/contador/dashboard/notas/total'
    // )
    // let total = 0
    // for (const item of data) {
    //   total = total + item.total
    // }

    // return {
    //   total,
    //   invoices: data,
    // }
    return
  }

  const queryOptions = tanstackQueryOptions({
    queryKey,
    queryFn,
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnMount: false,
  })

  return { queryKey, queryOptions }
}

export function useGetInvoicesCards() {
  return useQuery(getCardsValues().queryOptions)
}

export function useLazyGetInvoicesCards() {
  const queryClient = useQueryClient()
  return () => queryClient.ensureQueryData(getCardsValues().queryOptions)
}
