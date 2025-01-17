import type { Pagination } from '@/@types/pagination'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import type { ExpiringCertificatesListSchema } from '../validations/expiring-certificates-list'

export const getExpiringCertificates = (
  filterCertificateFromStatus: string
) => {
  const queryKey = ['expiring-certificates', filterCertificateFromStatus]

  const queryFn = async (): Promise<
    Pagination<ExpiringCertificatesListSchema> | undefined
  > => {
    // const { data } = await api.get<Pagination<ExpiringCertificatesListSchema>>(
    //   '/contador/dashboard/certificados-vencendo',
    //   {
    //     params: {
    //       status: filterCertificateFromStatus,
    //       perPage: 1000,
    //     },
    //   }
    // )

    // return data

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

export function useGetExpiringCertificates(
  filterCertificateFromStatus: string
) {
  return useQuery(
    getExpiringCertificates(filterCertificateFromStatus).queryOptions
  )
}

export function useLazyGetExpiringCertificates(
  filterCertificateFromStatus: string
) {
  const queryClient = useQueryClient()
  return () =>
    queryClient.ensureQueryData(
      getExpiringCertificates(filterCertificateFromStatus).queryOptions
    )
}
