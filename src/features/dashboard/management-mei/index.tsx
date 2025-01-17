import { TabsContent } from '@/components/ui/tabs'

import { CardDasMeiExpiring } from './card-das-mei-expiring'
import { CardExpiringCertificates } from './card-expiring-certificates'
import { RenderManagementMeiCards } from './render-management-mei-cards'

export function ManagementMeiContent() {
  return (
    <TabsContent value="mei">
      <div className="mt-2 flex flex-col gap-4">
        <RenderManagementMeiCards />
        <div className="grid-cols grid w-full gap-8 py-2 xl:grid-cols-2">
          <CardExpiringCertificates />
          <CardDasMeiExpiring />
        </div>
      </div>
    </TabsContent>
  )
}
