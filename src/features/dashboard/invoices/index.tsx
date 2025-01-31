import { TabsContent } from '@/components/ui/tabs'

import { CardCustomersMoreUsedCredits } from '../management-mei/card-customers-more-used-credits'
import { CardLastInvoices } from './card-last-invoices'
import { CardTotalInvoices } from './card-total-invoices'
import { RenderInvoicesCard } from './render-invoices-card'

export function ManagementInvoicesContent() {
  return (
    <TabsContent className="mt-0" value="invoices">
      <div className="flex flex-col gap-8">
        <RenderInvoicesCard
          isLoading={false}
          data={{
            totalNotas: 0,
            totalNotasCanceladas: 0,
            totalNotasRejeitadas: 0,
            totalNotasValidadas: 0,
          }}
        />
        <div className="flex w-full flex-col items-start gap-8 md:flex-row">
          <CardTotalInvoices />
          <CardLastInvoices />
        </div>
        <CardCustomersMoreUsedCredits />
      </div>
    </TabsContent>
  )
}
