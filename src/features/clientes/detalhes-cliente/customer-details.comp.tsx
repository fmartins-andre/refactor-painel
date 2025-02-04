import { PropsWithChildren } from 'react'

import { CustomerDataCard } from './subcomponents/customer-data-card.comp'
import { CustomerDetailsFeatures } from './subcomponents/features.comp'
import { CustomerDetailsHeader } from './subcomponents/header'
import { StateTaxIdCard } from './subcomponents/state-tax-id-card.comp'

export function CustomerDetails({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-8">
      <CustomerDetailsHeader />

      <div className="grid grid-cols-1 xl:grid-cols-[24rem_minmax(0px,_1fr)] gap-8 w-full">
        <aside className="flex flex-col gap-8">
          <StateTaxIdCard />

          <CustomerDataCard />
        </aside>

        <main>
          <CustomerDetailsFeatures>{children}</CustomerDetailsFeatures>
        </main>
      </div>
    </div>
  )
}
