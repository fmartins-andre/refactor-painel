import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/images/icons'

import { DashboardCardHeader } from '../dashboard-card-header'
import { InvoicesFromCustomer } from '../tables/invoices-from-customers'

export function CardLastInvoices() {
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
        updatedAt={0}
        refetch={handleRefreshCache}
      />
      <CardContent className="min-h-[380px]">
        <InvoicesFromCustomer data={undefined} isLoading={false} />
      </CardContent>
    </Card>
  )
}
