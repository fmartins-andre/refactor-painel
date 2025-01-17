import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import {
  totalInvoicesPerYearSchema,
  type TotalInvoicesPerYearInput,
  type TotalInvoicesPerYearOutput,
} from '../validations/total-invoices-per-year'

export const getTotalInvoices = () => {
  const queryKey = ['total-invoices-per-year']

  const queryFn = async (): Promise<TotalInvoicesPerYearOutput | undefined> => {
    // const { data } = await api.get<TotalInvoicesPerYearInput[]>(
    //   '/contador/dashboard/notas/total/emitidas'
    // )

    // if (!data || !Array.isArray(data)) {
    //   console.error(
    //     'Os dados retornados não são válidos ou não estão no formato esperado.'
    //   )
    //   return null
    // }

    // const dataParsed = totalInvoicesPerYearSchema.safeParse(data)

    // if (!dataParsed.success) {
    //   console.error('Erro na validação do schema:', dataParsed.error.format())
    //   return null
    // }

    // return dataParsed.data

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

export function useGetChartTotalInvoices() {
  return useQuery(getTotalInvoices().queryOptions)
}

export function useLazyGetChartTotalInvoices() {
  const queryClient = useQueryClient()
  return () => queryClient.ensureQueryData(getTotalInvoices().queryOptions)
}
