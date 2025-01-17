import { Pagination } from '@/@types/pagination'

import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { LoadingOrNotFoundDashboardCards } from '../tables/loading-or-not-found-dashboard-cards'
import { ExpiringDasMeiList } from '../validations/expiring-das-mei-list'
import { useDasMeiExpiring } from './hooks/use-das-mei-expiring'

interface Props {
  isLoading?: boolean
  data: Pagination<ExpiringDasMeiList> | undefined
}

export function DasMeiExpiringList({ isLoading, data }: Props) {
  const { tableColumns } = useDasMeiExpiring()

  return (
    <LoadingOrNotFoundDashboardCards
      isLoading={isLoading}
      hasData={Boolean(data?.data.length)}
    >
      <DataTable.Root
        columns={tableColumns}
        data={data?.data ?? []}
        limit={data?.per_page ?? 10}
        page={data?.current_page ?? 1}
        total={data?.total ?? 0}
      >
        <ScrollArea className="h-[500px]">
          <DataTable.Main />
        </ScrollArea>
      </DataTable.Root>
    </LoadingOrNotFoundDashboardCards>
  )
}
