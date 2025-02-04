import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'

import { DataTable } from '@/components/data-table'

import { useCustomerInvoices } from './helpers/use-customers-invoices'
import { CustomerInvoicesFilters } from './subcomponents/filters/customer-invoices-filters.comp'

export function CustomerDetailsInvoicesTable() {
  const { tableColumns } = useCustomerInvoices()

  return (
    <DataTable.Root
      columns={tableColumns}
      data={[]}
      pageSize={0}
      page={1}
      total={0}
    >
      <ScrollArea>
        <div className="flex flex-col gap-2">
          <CustomerInvoicesFilters />
          {/* <DataTable.Filters filters={appliedFilters} /> */}
          <DataTable.Main />
          <DataTable.Pagination />
        </div>
        <Scrollbar orientation="horizontal" />
      </ScrollArea>
    </DataTable.Root>
  )
}
