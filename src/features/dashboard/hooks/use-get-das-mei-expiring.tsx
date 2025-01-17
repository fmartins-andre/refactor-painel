import type { Pagination } from '@/@types/pagination'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import type { ExpiringDasMeiList } from '../validations/expiring-das-mei-list'

export const getExpiringDasMei = (filterDasMeiFromStatus: string) => {
  const queryKey = ['total-expiring-das-mei', filterDasMeiFromStatus]

  const queryFn = async (): Promise<
    Pagination<ExpiringDasMeiList> | undefined
  > => {
    // const { data } = await api.get<Pagination<ExpiringDasMeiList>>(
    //   '/contador/dashboard/das-vencendo',
    //   {
    //     params: {
    //       status: filterDasMeiFromStatus,
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

export function useGetExpiringDasMei(filterDasMeiFromStatus: string) {
  return useQuery(getExpiringDasMei(filterDasMeiFromStatus).queryOptions)
}

export function useLazyGetExpiringDasMei(filterDasMeiFromStatus: string) {
  const queryClient = useQueryClient()
  return () =>
    queryClient.ensureQueryData(
      getExpiringDasMei(filterDasMeiFromStatus).queryOptions
    )
}
