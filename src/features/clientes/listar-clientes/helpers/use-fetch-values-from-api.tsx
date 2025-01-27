import { Pagination } from '@/@types/pagination'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'

import { CustomerListSchemaInput } from '../validations/customer-list'
import { SearchCustomers } from '../validations/search-customers'

export interface TotalCustomersOutput {
  total: number
  status: string
}

export function useFetchCustomers() {
  const { searchStr } = useLocation()
  const searchParams = new URLSearchParams(searchStr)

  const perPage = searchParams.get('perPage')
    ? Math.max(parseInt(searchParams.get('perPage')!), 10)
    : 10
  const page = searchParams.get('page')
    ? Math.max(parseInt(searchParams.get('page')!), 1)
    : 1

  const {
    data: customerList,
    isLoading: isLoadingCustomerList,
    isFetching: isFetchingCustomerList,
    error: errorCustomerList,
    refetch: refetchCustomerList,
  } = useQuery({
    queryKey: ['customers-list', page, perPage],
    queryFn: async (): Promise<Pagination<CustomerListSchemaInput>> => {
      const query: Partial<Record<keyof SearchCustomers, string>> = {
        busca: searchParams.get('busca') ?? undefined,
        status: searchParams.get('status') ?? undefined,
        regimeEspecialId: searchParams.get('regimeEspecialId') ?? undefined,
        dataInicial: searchParams.get('dataInicial') ?? undefined,
        dataFinal: searchParams.get('dataFinal') ?? undefined,
      }

      // const { data } = await api.get<Pagination<CustomerListSchemaInput>>(
      //   '/contador/clientes',
      //   {
      //     params: {
      //       page,
      //       perPage,
      //       ...removeNullUndefinedKeys(query),
      //     },
      //   }
      // )
      // return data

      return {} as Pagination<CustomerListSchemaInput>
    },
  })

  const {
    data: customersTotals,
    isLoading: isLoadingCustomersTotals,
    error: errorCustomersTotals,
    refetch: refetchCustomersTotals,
  } = useQuery({
    queryKey: ['total-customers-card'],
    queryFn: async () => {
      // const { data } = await api.get<TotalCustomersOutput[]>(
      //   '/contador/clientes/total'
      // )
      // return data
    },
  })

  return {
    customersTotals: customersTotals ?? [],
    refresh: {
      refetchCustomerList,
      refetchCustomersTotals,
    },
    loadings: {
      isLoadingCustomerList: isLoadingCustomerList || isFetchingCustomerList,
      isLoadingCustomersTotals,
    },
    errors: {
      errorCustomerList,
      errorCustomersTotals,
    },
    customers: customerList,
    page,
    perPage,
  }
}
