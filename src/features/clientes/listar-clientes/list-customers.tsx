import { ClienteListarResponse } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'

import { DataTable } from '@/components/data-table'

import { useAccountantCustomers } from './use-accountant-customers'
import { customersListSchema } from './validations/customer-list'

interface Props {
  customers: ClienteListarResponse
}

export function ListCustomers({ customers }: Props) {
  const customersMapped = customers?.data?.map((item) =>
    customersListSchema.parse(item)
  )

  const { tableColumns } = useAccountantCustomers()

  return (
    <>
      <DataTable.Root
        columns={tableColumns}
        data={customersMapped ?? []}
        limit={customers?.per_page ?? 10}
        page={customers?.current_page ?? 1}
        total={customers?.total ?? 0}
      >
        <ScrollArea>
          <div className="flex flex-col gap-2">
            <DataTable.Main />
            {/* <DataTable.Pagination /> */}
          </div>
          <Scrollbar orientation="horizontal" />
        </ScrollArea>
      </DataTable.Root>
    </>
  )
}
