import { Pagination } from '@/@types/pagination'

import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { LoadingOrNotFoundDashboardCards } from '../tables/loading-or-not-found-dashboard-cards'
import { ExpiringCertificatesListSchema } from '../validations/expiring-certificates-list'
import { useExpiringCertificates } from './hooks/use-expiring-certificates'

interface Props {
  data: Pagination<ExpiringCertificatesListSchema> | undefined
  isLoading: boolean
}

export function ExpiringCertificatesList({ data, isLoading }: Props) {
  const { tableColumns } = useExpiringCertificates()

  return (
    <LoadingOrNotFoundDashboardCards
      isLoading={isLoading}
      hasData={Boolean(data?.data.length)}
    >
      <DataTable.Root
        columns={tableColumns}
        data={data?.data ?? []}
        limit={data?.per_page ?? 1000}
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
