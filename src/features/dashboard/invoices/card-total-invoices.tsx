import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/images/icons'

import { DashboardCardHeader } from '../dashboard-card-header'
import { OverviewChart } from './overview-chart'

export function CardTotalInvoices() {
  async function handleRefreshCache() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['total-invoices-per-year'],
    // })
  }

  return (
    <Card className="size-full">
      <DashboardCardHeader
        title="Total de notas emitidas"
        tooltipText="Neste card você acompanha o quantitativo anual de notas fiscais emitidas, categorizadas por tipo."
        icon={<Icons.overview className="size-5" />}
        updatedAt={0}
        refetch={handleRefreshCache}
      >
        <div className="flex w-full items-center justify-between py-2">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-1">
              <span className="font-bold">Total:</span>
              <span className="font-bold">{0}</span>
            </div>
            <span className="text-xs font-light">Notas validadas</span>
          </div>
          <div className="ml-4 flex flex-wrap items-center gap-2 md:ml-0">
            <span className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#0050DC]" />
              <span className="text-xs text-[#7D93B8]">NFe</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#06C2FD]" />
              <span className="text-xs text-[#7D93B8]">NFCe</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#03CBBE]" />
              <span className="text-xs text-[#7D93B8]">NFSe</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#00D37F]" />
              <span className="text-xs text-[#7D93B8]">CTe</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-[#0A0A56]" />
              <span className="text-xs text-[#7D93B8]">MDFe</span>
            </span>
          </div>
        </div>
      </DashboardCardHeader>
      <CardContent className="pl-2">
        <OverviewChart data={undefined} isLoading={false} />
      </CardContent>
    </Card>
  )
}
