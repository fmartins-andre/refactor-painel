import { Pagination } from '@/@types/pagination'

import { DataTable } from '@/components/data-table'

import { InvoicesFromCustomerSchema } from '../validations/invoices-from-customers'
import { useInvoicesFromCustomer } from './helpers/use-invoices-from-customers'
import { LoadingOrNotFoundDashboardCards } from './loading-or-not-found-dashboard-cards'

interface Props {
  data: Pagination<InvoicesFromCustomerSchema> | undefined
  isLoading?: boolean
}

export function InvoicesFromCustomer({ data, isLoading }: Props) {
  const { columns } = useInvoicesFromCustomer()

  return (
    <LoadingOrNotFoundDashboardCards
      isLoading={isLoading}
      hasData={Boolean(data?.data.length)}
    >
      <DataTable.Root
        columns={columns}
        data={data?.data ?? []}
        pageSize={data?.per_page ?? 10}
        page={data?.current_page ?? 1}
        total={data?.total ?? 0}
      >
        <DataTable.Main />
      </DataTable.Root>
    </LoadingOrNotFoundDashboardCards>
  )
}
