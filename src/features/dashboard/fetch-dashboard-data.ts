import type { Pagination } from '@/@types/pagination'

import {
  customersMoreUsingCreditSchema,
  type CustomersMoreUsingCreditInput,
} from './validations/customers-more-using-credit'
import type { ExpiringCertificatesListSchema } from './validations/expiring-certificates-list'
import type { ExpiringDasMeiList } from './validations/expiring-das-mei-list'
import type { InvoicesFromCustomerSchema } from './validations/invoices-from-customers'
import {
  totalInvoicesPerYearSchema,
  type TotalInvoicesPerYearInput,
} from './validations/total-invoices-per-year'

export type TotalInvoices = { total: number; status: string }
export type TotalCustomers = TotalInvoices

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServerFetchService: any = {}

export async function fetchDashboardData() {
  const fetchTotalInvoices = undefined
  // const fetchTotalInvoices = async () => {
  //   try {
  //     const data = await ServerFetchService.make<TotalInvoices[]>(
  //       'GET',
  //       'contador/dashboard/notas/total',
  //       null,
  //       {
  //         next: {
  //           tags: ['dashboard-total-invoices'],
  //         },
  //       }
  //     )
  //     return data
  //   } catch (error) {
  //     console.error(error)
  //     return []
  //   }
  // }

  const fetchLastInvoices = undefined
  // const fetchLastInvoices = async () => {
  //   try {
  //     const data = await ServerFetchService.make<
  //       Pagination<InvoicesFromCustomerSchema>
  //     >('GET', 'contador/dashboard/notas?orderBy=dataEmissao')
  //     return data
  //   } catch (error) {
  //     return []
  //   }
  // }

  const fetchTotalInvoicesPerYear = undefined
  // const fetchTotalInvoicesPerYear = async () => {
  //   try {
  //     const data = await ServerFetchService.make<TotalInvoicesPerYearInput>(
  //       'GET',
  //       'contador/dashboard/notas/total/emitidas'
  //     )

  //     const dataParsed = totalInvoicesPerYearSchema.safeParse(data)
  //     if (!dataParsed.success) {
  //       return []
  //     }

  //     return dataParsed.data
  //   } catch (error) {
  //     return []
  //   }
  // }

  const fetchCustomersMoreUseCredit = undefined
  // const fetchCustomersMoreUseCredit = async () => {
  //   try {
  //     const data = await ServerFetchService.make<
  //       Pagination<CustomersMoreUsingCreditInput>
  //     >('GET', 'contador/dashboard/clientes/maiores-emissores')

  //     const dataParsed = customersMoreUsingCreditSchema.safeParse(data.data)

  //     if (!dataParsed.success) {
  //       return []
  //     }

  //     return dataParsed.data
  //   } catch (error) {
  //     console.error(error)
  //     return []
  //   }
  // }

  const fetchTotalCustomers = undefined
  // const fetchTotalCustomers = async () => {
  //   try {
  //     const data = await ServerFetchService.make<TotalCustomers[]>(
  //       'GET',
  //       'contador/clientes/total'
  //     )

  //     return data
  //   } catch (error) {
  //     console.error(error)
  //     return []
  //   }
  // }

  const fetchDueDasMei = undefined
  // const fetchDueDasMei = async () => {
  //   try {
  //     const data = await ServerFetchService.make<
  //       Pagination<ExpiringDasMeiList>
  //     >('GET', 'contador/dashboard/das-vencendo')

  //     return data
  //   } catch (error) {
  //     console.error(error)
  //     return []
  //   }
  // }

  const fetchExpiringCertificates = undefined
  // const fetchExpiringCertificates = async () => {
  //   try {
  //     const data = await ServerFetchService.make<
  //       Pagination<ExpiringCertificatesListSchema>
  //     >('GET', 'contador/dashboard/certificados-vencendo')
  //     return data
  //   } catch (error) {
  //     console.error(error)
  //     return []
  //   }
  // }

  return {
    fetchTotalInvoices,
    fetchTotalCustomers,
    fetchDueDasMei,
    fetchExpiringCertificates,
    fetchLastInvoices,
    fetchCustomersMoreUseCredit,
    fetchTotalInvoicesPerYear,
  }
}
