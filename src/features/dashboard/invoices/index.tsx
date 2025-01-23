import { TabsContent } from '@/components/ui/tabs'

import { CardCustomersMoreUsedCredits } from '../management-mei/card-customers-more-used-credits'
import { CardLastInvoices } from './card-last-invoices'
import { CardTotalInvoices } from './card-total-invoices'
import { RenderInvoicesCard } from './render-invoices-card'

export function ManagementInvoicesContent() {
  return (
    <TabsContent value="invoices">
      <div className="mt-2 flex flex-col gap-4">
        <RenderInvoicesCard
          isLoading={false}
          data={{
            totalNotas: 0,
            totalNotasCanceladas: 0,
            totalNotasRejeitadas: 0,
            totalNotasValidadas: 0,
          }}
        />
        <div className="my-2 flex w-full flex-col items-start gap-10 md:flex-row">
          <CardTotalInvoices />
          <CardLastInvoices />
        </div>
        <CardCustomersMoreUsedCredits />
      </div>
    </TabsContent>
  )
}
