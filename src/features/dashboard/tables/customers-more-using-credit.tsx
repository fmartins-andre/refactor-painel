import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { LoadingOrNotFoundDashboardCards } from './loading-or-not-found-dashboard-cards'
import { useCustomersMoreUsingCredit } from './use-customers-more-using-credit'

interface Props {
  data: unknown[] | undefined
  isLoading?: boolean
}

export function CustomersMoreUsingCredit({ data, isLoading }: Props) {
  const { columns } = useCustomersMoreUsingCredit()

  return (
    <LoadingOrNotFoundDashboardCards
      isLoading={isLoading}
      hasData={Boolean(data?.length)}
    >
      <DataTable.Root
        columns={columns}
        data={data ?? []}
        limit={1000}
        page={1}
        total={data?.length ?? 0}
      >
        <ScrollArea className="h-[500px]">
          <DataTable.Main />
        </ScrollArea>
      </DataTable.Root>
    </LoadingOrNotFoundDashboardCards>
  )
}
