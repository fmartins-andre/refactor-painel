import type { Pagination } from '@/@types/pagination'
import {
  queryOptions as tanstackQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { DASHBOARD_CACHE_TIME } from '../constants/dashboard-cache-time'
import type { TotalCustomersOutput } from '../types/total-customers-output'
import type { ExpiringCertificatesListSchema } from '../validations/expiring-certificates-list'

interface DueDasMeiResponse {
  empresaId: number
  inscricaoId: number
  cnpjCpf: string
  razaoSocial: string
  dataVencimento: string
  url: string
  codigoBarras: string
  situacao: string
}

const fetchTotalCustomers = async (): Promise<
  TotalCustomersOutput[] | undefined
> => {
  // const { data } = await api.get<TotalCustomersOutput[]>(
  //   '/contador/clientes/total'
  // )
  // return data

  return
}

const fetchDueDasMei = async (): Promise<
  Pagination<DueDasMeiResponse> | undefined
> => {
  // const { data } = await api.get<Pagination<DueDasMeiResponse>>(
  //   '/contador/dashboard/das-vencendo',
  //   {
  //     params: {
  //       page: 1,
  //       perPage: 1000,
  //     },
  //   }
  // )

  // return data

  return
}

const fetchExpiringCertificates = async (): Promise<
  Pagination<ExpiringCertificatesListSchema> | undefined
> => {
  // const { data } = await api.get<Pagination<ExpiringCertificatesListSchema>>(
  //   '/contador/dashboard/certificados-vencendo'
  // )

  // return data

  return
}

export const getCardsValues = () => {
  const queryKey = [
    'total-customers',
    'customers-due-das-mei',
    'expiring-certificates',
  ]

  const queryFn = async () => {
    const [totalCustomers, dueDasMeiData, expiringCertificates] =
      await Promise.all([
        fetchTotalCustomers(),
        fetchDueDasMei(),
        fetchExpiringCertificates(),
      ])

    return { totalCustomers, dueDasMeiData, expiringCertificates }
  }

  const queryOptions = tanstackQueryOptions({
    queryKey,
    queryFn,
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnMount: false,
  })

  return { queryKey, queryOptions }
}

export function useGetManagerMeiCards() {
  return useQuery(getCardsValues().queryOptions)
}

export function useLazyGetManagerMeiCards() {
  const queryClient = useQueryClient()
  return () => queryClient.ensureQueryData(getCardsValues().queryOptions)
}
