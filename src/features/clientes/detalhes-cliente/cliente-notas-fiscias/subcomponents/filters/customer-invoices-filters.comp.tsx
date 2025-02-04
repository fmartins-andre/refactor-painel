import { DataTable } from '@/components/data-table'

import { CustomerInvoicesFilterDatePeriod } from './sections/date-period-input.comp'
import { CustomerInvoicesFilterModulesSelect } from './sections/find-invoices-from-module'
import { CustomerInvoicesFilterRefreshButton } from './sections/refresh-button.comp'
import { CustomerInvoicesFilterStatus } from './sections/status-input'

export function CustomerInvoicesFilters() {
  return (
    <DataTable.Toolbar>
      <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
        <div className="mt-3 flex items-center gap-2">
          {/* <Icons.invoices_list className="size-7" /> */}
          <span className="font-lg font-bold">Notas Fiscais</span>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center md:flex-row md:items-end md:justify-end">
          <CustomerInvoicesFilterModulesSelect />
          <CustomerInvoicesFilterStatus />
          <CustomerInvoicesFilterDatePeriod />
          <div className="mt-5 flex w-auto flex-row gap-2">
            <CustomerInvoicesFilterRefreshButton />
          </div>
        </div>
      </div>
    </DataTable.Toolbar>
  )
}
