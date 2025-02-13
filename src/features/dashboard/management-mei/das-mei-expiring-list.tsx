import { VisaoGeralDasListarResponse } from '@/services/api/accountant-panel-api/endpoints/visao-geral'

import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { LoadingOrNotFoundDashboardCards } from '../tables/loading-or-not-found-dashboard-cards'
import { useDasMeiExpiring } from './hooks/use-das-mei-expiring'

interface Props {
  isLoading?: boolean
  data: VisaoGeralDasListarResponse
}

export function DasMeiExpiringList({ isLoading, data }: Props) {
  const { tableColumns } = useDasMeiExpiring()

  return (
    <LoadingOrNotFoundDashboardCards
      isLoading={isLoading}
      hasData={Boolean(data?.length)}
    >
      <DataTable.Root
        columns={tableColumns}
        data={data ?? []}
        pageSize={data?.length ?? 999}
        // page={data?.current_page ?? 1}
        // total={data?.total ?? 0}
      >
        <ScrollArea className="h-[500px]">
          <DataTable.Main />
        </ScrollArea>
      </DataTable.Root>
    </LoadingOrNotFoundDashboardCards>
  )
}
