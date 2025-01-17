import type { Pagination } from '@/@types/pagination'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import type { InvoicesFromCustomerSchema } from '../validations/invoices-from-customers'

export const getLastInvoices = () => {
  const queryKey = ['last-invoices']

  const queryFn = async (): Promise<
    Pagination<InvoicesFromCustomerSchema> | undefined
  > => {
    // const { data } = await api.get<Pagination<InvoicesFromCustomerSchema>>(
    //   '/contador/dashboard/notas?orderBy=dataEmissao'
    // )

    // return data

    return undefined
  }

  const queryOptions = tanstackQueryOptions({
    queryKey,
    queryFn,
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnMount: false,
  })

  return { queryKey, queryOptions }
}

export function useGetLastInvoices() {
  return useQuery(getLastInvoices().queryOptions)
}

export function useLazyGetLastInvoices() {
  const queryClient = useQueryClient()
  return () => queryClient.ensureQueryData(getLastInvoices().queryOptions)
}
