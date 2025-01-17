import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/icons/icons'

import { DashboardCardHeader } from '../dashboard-card-header'
import { useGetLastInvoices } from '../hooks/use-get-last-invoices'
import { InvoicesFromCustomer } from '../tables/invoices-from-customers'

export function CardLastInvoices() {
  const { data, isLoading, isFetching, dataUpdatedAt } = useGetLastInvoices()

  async function handleRefreshCache() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['last-invoices'],
    // })
  }

  return (
    <Card className="size-full">
      <DashboardCardHeader
        title="Últimas Emissões de Notas"
        tooltipText="Neste card você acompanha a relação de clientes que emitiram notas fiscais nas últimas 24 horas."
        icon={<Icons.overview className="size-5" />}
        updatedAt={dataUpdatedAt}
        refetch={handleRefreshCache}
      />
      <CardContent className="min-h-[380px]">
        <InvoicesFromCustomer data={data} isLoading={isLoading || isFetching} />
      </CardContent>
    </Card>
  )
}
