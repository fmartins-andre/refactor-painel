import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

import type { TotalCustomersOutput } from '../types/total-customers-output'

export const getTotalCustomersCards = () => {
  const queryKey = ['total-customers-cards']

  const queryOptions = tanstackQueryOptions({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<TotalCustomersOutput[]>(
        'contador/clientes/total'
      )

      return undefined
    },
  })

  return { queryKey, queryOptions }
}

export function useGetTotalCustomersCards() {
  return useQuery(getTotalCustomersCards().queryOptions)
}

export function useLazyGetTotalCustomersCards() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.ensureQueryData(getTotalCustomersCards().queryOptions)
}
